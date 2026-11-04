/* Beacon Gate: a hold-to-enter intro layer that sits over a page.
   Nodes drift at random; pressing and holding drops a beacon that pulls them into rings.
   Holding builds speed for holdMs, then the layer opens and reveals the page beneath.

   Usage:  const gate = BeaconGate.mount({ holdMs: 5000, reveal: 'iris' });
   API:    gate.set({...}), gate.replay(), gate.skip(), gate.destroy(), gate.state, gate.progress */
(function (global) {
  'use strict';

  const DEFAULTS = {
    holdMs: 5000,          // how long a hold takes to open the page
    drainMs: 1200,         // how long a full charge takes to drain after letting go
    accel: 2.2,            // exponent on progress: higher = slower start, harder finish
    reveal: 'iris',        // 'iris' | 'fade' | 'dissolve'
    remember: 'session',   // 'session' | 'always' | 'never': skip the gate for returning visitors
    storageKey: 'beacon-gate-seen',
    brand: '',             // wordmark text, top-left
    logo: '',              // logo image URL, top-left
    label: 'Intro',
    hint: 'Press and hold anywhere to enter',
    holdingHint: 'Keep holding',
    skipText: 'Skip intro',
    sound: true,           // whir that speeds up with the hold; visitors can switch it off
    soundOnText: 'Sound on',
    soundOffText: 'Sound off',
    exclude: [],           // elements that stay interactive while the gate is up
    zIndex: 2147483000,
    onReveal: null,
    colors: {
      bg: '#0d0b0a',
      grid: '#1c1a18',
      idle: '#b9b6b0',
      beacon: '#ffff00',
      ink: '#f4f2ee',
      muted: '#aeaaa3',
    },
  };

  const STYLE = `
    .bgate { position: fixed; inset: 0; overflow: hidden; color: var(--bgate-ink);
      font-family: var(--bgate-font, inherit); user-select: none; -webkit-user-select: none;
      -webkit-touch-callout: none; touch-action: none; }
    .bgate-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block;
      cursor: crosshair; outline: none; touch-action: none; }
    .bgate-canvas:focus-visible { box-shadow: inset 0 0 0 2px var(--bgate-beacon); }
    .bgate-brand { position: absolute; top: calc(20px + env(safe-area-inset-top, 0px));
      left: max(20px, env(safe-area-inset-left, 0px)); display: flex; align-items: center; gap: 10px;
      font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
      pointer-events: none; transition: opacity 0.4s ease; }
    .bgate-brand img { width: 28px; height: 28px; display: block; }
    .bgate-hint { position: absolute; left: 50%; bottom: calc(28px + env(safe-area-inset-bottom, 0px));
      transform: translateX(-50%); margin: 0; width: max-content; max-width: calc(100% - 40px);
      text-align: center; font-size: 14px; letter-spacing: 0.01em; color: var(--bgate-muted);
      pointer-events: none; transition: opacity 0.4s ease, color 0.4s ease; }
    .bgate-hint.is-holding { color: var(--bgate-beacon); }
    .bgate-actions { position: absolute; top: calc(16px + env(safe-area-inset-top, 0px));
      right: max(20px, env(safe-area-inset-right, 0px)); display: flex; gap: 8px;
      transition: opacity 0.4s ease; }
    .bgate-btn { font: inherit; font-size: 13px; color: var(--bgate-muted); background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.18); border-radius: 999px; padding: 8px 15px; cursor: pointer;
      transition: color 0.2s ease, border-color 0.2s ease; }
    .bgate-btn:hover, .bgate-btn:focus-visible { color: var(--bgate-ink); border-color: var(--bgate-ink); outline: none; }
    .bgate-btn[aria-pressed="true"] { color: var(--bgate-ink); }
    .bgate.is-leaving .bgate-brand, .bgate.is-leaving .bgate-hint, .bgate.is-leaving .bgate-actions { opacity: 0; }
  `;

  const WAVE = 650;        // px/s: speed of the activation front from the beacon
  const MARGIN = 18;
  const CLIMAX = 0.45;     // s: rings collapse into the beacon before the reveal
  const REVEAL = { iris: 1.25, fade: 0.9, dissolve: 1.6, skip: 0.45 };

  const rand = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const easeInOut = (q) => (q < 0.5 ? 4 * q * q * q : 1 - Math.pow(-2 * q + 2, 3) / 2);
  const now = () => performance.now() / 1000;
  const toRgb = (hex) => {
    const h = hex.replace('#', '');
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  };
  const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

  function safeStorage(kind) {
    try {
      const s = global[kind];
      s.getItem('bgate-probe');
      return s;
    } catch (_) {
      return null;
    }
  }

  let styleInjected = false;
  function injectStyle() {
    if (styleInjected) return;
    const el = document.createElement('style');
    el.textContent = STYLE;
    document.head.appendChild(el);
    styleInjected = true;
  }

  function mount(userOpts) {
    userOpts = userOpts || {};
    const opts = Object.assign({}, DEFAULTS, userOpts);
    opts.colors = Object.assign({}, DEFAULTS.colors, userOpts.colors || {});
    const reduced = global.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const store = opts.remember === 'always' ? safeStorage('localStorage')
      : opts.remember === 'session' ? safeStorage('sessionStorage') : null;

    const prefs = safeStorage('localStorage');
    const SOUND_KEY = 'beacon-gate-sound';
    const AudioCtx = global.AudioContext || global.webkitAudioContext;
    let soundOn = !!(opts.sound && AudioCtx) && !(prefs && prefs.getItem(SOUND_KEY) === 'off');
    let audio = null;
    let root, cv, ctx, hintEl, skipEl, soundEl;
    let W = 0, H = 0, dpr = 1, scale = 1;
    let nodes = [], links = [], rings = [];
    let state = 'done', holding = false, p = 0, raf = 0, last = 0;
    let tCommit = 0, tReveal = 0, revealMode = 'iris', revealDur = 1;
    let locked = [], prevOverflow = '';
    let C = null;
    const B = { x: 0, y: 0, px: 0, py: 0, active: false, t0: 0, s: 0, pulses: [], lastPulse: 0 };

    const api = {
      get state() { return state; },
      get progress() { return p; },
      set(o) { Object.assign(opts, o); return api; },
      replay() { teardown(); start(); return api; },
      skip() {
        if (state === 'idle' || state === 'climax') beginReveal(now(), 'skip');
        return api;
      },
      destroy() { teardown(); return api; },
    };

    injectStyle();
    if (!(store && store.getItem(opts.storageKey))) start();
    return api;

    // ---- lifecycle -------------------------------------------------------

    function start() {
      if (state !== 'done') return;
      C = {};
      for (const k in opts.colors) C[k] = toRgb(opts.colors[k]);

      root = document.createElement('div');
      root.className = 'bgate';
      root.setAttribute('role', 'dialog');
      root.setAttribute('aria-modal', 'true');
      root.setAttribute('aria-label', opts.label);
      root.style.zIndex = opts.zIndex;
      root.style.background = opts.colors.bg;
      root.style.setProperty('--bgate-ink', opts.colors.ink);
      root.style.setProperty('--bgate-muted', opts.colors.muted);
      root.style.setProperty('--bgate-beacon', opts.colors.beacon);

      cv = document.createElement('canvas');
      cv.className = 'bgate-canvas';
      cv.tabIndex = 0;
      cv.setAttribute('role', 'button');
      cv.setAttribute('aria-label', `${opts.hint}, or press Escape to skip`);
      root.appendChild(cv);

      if (opts.brand || opts.logo) {
        const brand = document.createElement('div');
        brand.className = 'bgate-brand';
        if (opts.logo) {
          const img = document.createElement('img');
          img.src = opts.logo; img.alt = ''; img.width = 28; img.height = 28;
          brand.appendChild(img);
        }
        if (opts.brand) {
          const span = document.createElement('span');
          span.textContent = opts.brand;
          brand.appendChild(span);
        }
        root.appendChild(brand);
      }

      hintEl = document.createElement('p');
      hintEl.className = 'bgate-hint';
      hintEl.setAttribute('aria-live', 'polite');
      hintEl.textContent = opts.hint;
      root.appendChild(hintEl);

      const actions = document.createElement('div');
      actions.className = 'bgate-actions';
      if (opts.sound && AudioCtx) {
        soundEl = document.createElement('button');
        soundEl.type = 'button';
        soundEl.className = 'bgate-btn';
        soundEl.addEventListener('click', toggleSound);
        actions.appendChild(soundEl);
        renderSoundButton();
      }
      skipEl = document.createElement('button');
      skipEl.type = 'button';
      skipEl.className = 'bgate-btn';
      skipEl.textContent = opts.skipText;
      actions.appendChild(skipEl);
      root.appendChild(actions);

      document.body.appendChild(root);
      ctx = cv.getContext('2d');

      cv.addEventListener('pointerdown', onDown);
      cv.addEventListener('pointermove', onMove);
      cv.addEventListener('pointerup', letGo);
      cv.addEventListener('pointercancel', letGo);
      cv.addEventListener('contextmenu', prevent);
      cv.addEventListener('keydown', onKeyDown);
      cv.addEventListener('keyup', onKeyUp);
      root.addEventListener('keydown', onEscape);
      skipEl.addEventListener('click', api.skip);
      global.addEventListener('blur', letGo);
      global.addEventListener('resize', resize);
      document.addEventListener('visibilitychange', onVisibility);

      lockPage();
      resize();
      seed();
      state = 'idle'; p = 0; holding = false;
      B.active = false; B.s = 0; B.pulses = []; rings = [];
      last = now();
      raf = requestAnimationFrame(frame);
      try { cv.focus({ preventScroll: true }); } catch (_) {}
    }

    function teardown() {
      if (state === 'done') return;
      cancelAnimationFrame(raf);
      global.removeEventListener('blur', letGo);
      global.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      stopAudio();
      root.remove();
      unlockPage();
      state = 'done';
      holding = false;
    }

    function finish() {
      teardown();
      if (store) { try { store.setItem(opts.storageKey, '1'); } catch (_) {} }
      if (typeof opts.onReveal === 'function') opts.onReveal();
    }

    // Everything else on the page is inert (no focus, no clicks, hidden from screen readers)
    // until the gate opens.
    function lockPage() {
      const keep = new Set([root].concat(opts.exclude || []));
      locked = Array.from(document.body.children).filter((el) =>
        !keep.has(el) && !el.inert && !/^(SCRIPT|STYLE|LINK|TEMPLATE)$/.test(el.tagName));
      for (const el of locked) { el.inert = true; el.setAttribute('aria-hidden', 'true'); }
      prevOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
    }

    function unlockPage() {
      for (const el of locked) { el.inert = false; el.removeAttribute('aria-hidden'); }
      locked = [];
      document.documentElement.style.overflow = prevOverflow;
    }

    // ---- input -----------------------------------------------------------

    function prevent(e) { e.preventDefault(); }

    function onDown(e) {
      if (e.button !== 0 || state !== 'idle') return;
      try { cv.setPointerCapture(e.pointerId); } catch (_) {}
      const r = cv.getBoundingClientRect();
      grab(e.clientX - r.left, e.clientY - r.top, now());
    }

    function onMove(e) {
      if (!B.active) return;
      const r = cv.getBoundingClientRect();
      B.px = e.clientX - r.left; B.py = e.clientY - r.top;
    }

    function onKeyDown(e) {
      if ((e.code === 'Space' || e.code === 'Enter') && !e.repeat && state === 'idle' && !holding) {
        e.preventDefault();
        grab(W / 2, H / 2, now());
      }
    }

    function onKeyUp(e) {
      if (e.code === 'Space' || e.code === 'Enter') letGo();
    }

    function onEscape(e) {
      if (e.key === 'Escape') { e.preventDefault(); api.skip(); }
    }

    function grab(x, y, t) {
      holding = true;
      startAudio();
      B.px = B.x = x; B.py = B.y = y;
      B.active = true; B.t0 = t; B.lastPulse = -1;
      assignFormation();
      for (const n of nodes) n.t0 = t + Math.hypot(n.x - x, n.y - y) / WAVE;
      hintEl.textContent = opts.holdingHint;
      hintEl.classList.add('is-holding');
    }

    function letGo() {
      if (!holding) return;
      holding = false;
      if (state !== 'idle') return;   // past the point of no return
      B.active = false;
      for (const n of nodes) {
        n.t0 = Infinity;
        kickOutward(n, rand(40, 120) * (reduced ? 0.4 : 1));
      }
      hintEl.textContent = opts.hint;
      hintEl.classList.remove('is-holding');
    }

    function kickOutward(n, speed) {
      const dx = n.x - B.x, dy = n.y - B.y, d = Math.hypot(dx, dy) || 1;
      n.vx += (dx / d) * speed + rand(-20, 20);
      n.vy += (dy / d) * speed + rand(-20, 20);
      n.h = Math.atan2(n.vy, n.vx);
    }

    function onVisibility() {
      if (document.hidden) {
        letGo();
        if (audio) audio.ac.suspend();
      } else if (audio) {
        audio.ac.resume();
      }
    }

    // ---- sound -----------------------------------------------------------
    // A synthesised rotor: detuned saws plus a sub through a resonant low-pass, and filtered
    // noise for air. An LFO on the output level gives the "whup-whup" that speeds up with the
    // rings until it blurs into a whine. Built on the first press, since browsers only allow
    // audio to start from a user gesture.

    function renderSoundButton() {
      if (!soundEl) return;
      soundEl.textContent = soundOn ? opts.soundOnText : opts.soundOffText;
      soundEl.setAttribute('aria-pressed', String(soundOn));
    }

    function toggleSound() {
      soundOn = !soundOn;
      if (prefs) { try { prefs.setItem(SOUND_KEY, soundOn ? 'on' : 'off'); } catch (_) {} }
      renderSoundButton();
      if (soundOn && holding) startAudio();
      try { cv.focus({ preventScroll: true }); } catch (_) {}
    }

    function startAudio() {
      if (!soundOn) return;
      if (!audio) audio = createAudio();
      if (audio && audio.ac.state === 'suspended') audio.ac.resume();
    }

    function stopAudio() {
      if (!audio) return;
      const a = audio;
      audio = null;
      a.master.gain.setTargetAtTime(0, a.ac.currentTime, 0.05);
      setTimeout(() => { a.ac.close().catch(() => {}); }, 400);
    }

    function createAudio() {
      let ac;
      try { ac = new AudioCtx(); } catch (_) { return null; }
      const master = ac.createGain();
      master.gain.value = 0;
      const comp = ac.createDynamicsCompressor();
      master.connect(comp);
      comp.connect(ac.destination);

      const am = ac.createGain();
      am.gain.value = 0.6;
      am.connect(master);
      const lfo = ac.createOscillator();
      lfo.frequency.value = 2.5;
      const lfoDepth = ac.createGain();
      lfoDepth.gain.value = 0.4;
      lfo.connect(lfoDepth);
      lfoDepth.connect(am.gain);

      const filter = ac.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 250;
      filter.Q.value = 6;
      filter.connect(am);
      const oscs = [['sawtooth', 1, 0.45], ['sawtooth', 1.007, 0.45], ['sine', 0.5, 0.8]].map(([type, ratio, level]) => {
        const o = ac.createOscillator();
        o.type = type;
        o.frequency.value = 45 * ratio;
        const g = ac.createGain();
        g.gain.value = level;
        o.connect(g);
        g.connect(filter);
        return { o, ratio };
      });

      const len = ac.sampleRate * 2;
      const buf = ac.createBuffer(1, len, ac.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      const noise = ac.createBufferSource();
      noise.buffer = buf;
      noise.loop = true;
      const band = ac.createBiquadFilter();
      band.type = 'bandpass';
      band.frequency.value = 600;
      band.Q.value = 0.8;
      const noiseGain = ac.createGain();
      noiseGain.gain.value = 0;
      noise.connect(band);
      band.connect(noiseGain);
      noiseGain.connect(am);

      const t = ac.currentTime;
      oscs.forEach(({ o }) => o.start(t));
      lfo.start(t);
      noise.start(t);
      return { ac, master, lfo, lfoDepth, filter, oscs, band, noiseGain };
    }

    // cq: 0..1 through the climax; rq: 0..1 through the reveal.
    function updateAudio(e, cq, rq) {
      if (!audio) return;
      const a = audio, at = a.ac.currentTime, k = 0.05;
      let level = clamp(p * 6, 0, 1) * (0.04 + 0.14 * e);
      let f = 45 + 190 * e;
      let cutoff = 250 + 3200 * e;
      let rate = 2.5 + 30 * e;
      let air = 0.15 + 0.5 * e, airF = 600 + 3000 * e;
      if (state === 'climax') {
        f *= 1 + 0.7 * cq; cutoff += 2500 * cq; rate += 20 * cq; level *= 1 + 0.4 * cq; air += 0.3 * cq;
      } else if (state === 'reveal') {
        // Spin down and exhale as the page opens.
        f = 400 * (1 - 0.5 * rq);
        cutoff = 200 + 5750 * (1 - rq);
        rate = 52 * (1 - 0.7 * rq);
        level = 0.25 * Math.pow(1 - rq, 1.5);
        air = 1.2 * Math.pow(1 - rq, 2);
        airF = 300 + 3300 * (1 - rq);
      }
      if (!soundOn) level = 0;
      a.master.gain.setTargetAtTime(level, at, k);
      a.filter.frequency.setTargetAtTime(cutoff, at, k);
      a.lfo.frequency.setTargetAtTime(rate, at, k);
      a.lfoDepth.gain.setTargetAtTime(0.4 * (1 - 0.5 * e), at, k);
      a.noiseGain.gain.setTargetAtTime(air, at, k);
      a.band.frequency.setTargetAtTime(airF, at, k);
      for (const { o, ratio } of a.oscs) o.frequency.setTargetAtTime(f * ratio, at, k);
    }

    // ---- simulation ------------------------------------------------------

    function resize() {
      dpr = Math.min(global.devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      scale = clamp(Math.min(W, H) / 820, 0.55, 1);
      for (const n of nodes) {
        n.x = clamp(n.x, MARGIN, W - MARGIN);
        n.y = clamp(n.y, MARGIN, H - MARGIN);
      }
    }

    function seed() {
      const count = Math.round(clamp((W * H) / 30000, 16, 34));
      nodes = Array.from({ length: count }, () => {
        const h = rand(0, Math.PI * 2), sp = rand(18, 42) * (reduced ? 0.4 : 1);
        return {
          x: rand(MARGIN, W - MARGIN), y: rand(MARGIN, H - MARGIN),
          vx: Math.cos(h) * sp, vy: Math.sin(h) * sp,
          h, sp, charge: 0, t0: Infinity, ring: -1, slot: 0,
        };
      });
      links = nodes.map((n, i) => {
        let j = Math.floor(Math.random() * count);
        if (j === i) j = (j + 1) % count;
        return [n, nodes[j]];
      });
    }

    // Nearest nodes take the inner ring; each ring keeps its members' angular order.
    function assignFormation() {
      const R0 = 72 * scale, RSTEP = 60 * scale, SPACING = 50 * scale;
      const d2 = (n) => (n.x - B.x) ** 2 + (n.y - B.y) ** 2;
      const sorted = nodes.slice().sort((a, b) => d2(a) - d2(b));
      rings = [];
      let i = 0, k = 0;
      while (i < sorted.length) {
        const R = R0 + k * RSTEP;
        const cap = Math.max(5, Math.floor((2 * Math.PI * R) / SPACING));
        const members = sorted.slice(i, i + cap);
        i += cap;
        members.forEach((n) => { n._a = Math.atan2(n.y - B.y, n.x - B.x); });
        members.sort((a, b) => a._a - b._a);
        const m = members.length;
        let sx = 0, sy = 0;
        members.forEach((n, j) => {
          const d = n._a - (2 * Math.PI * j) / m;
          sx += Math.cos(d); sy += Math.sin(d);
        });
        const off = Math.atan2(sy, sx);
        const omega = (k % 2 ? -1 : 1) * (0.34 / (1 + k * 0.4));
        members.forEach((n, j) => { n.ring = k; n.slot = off + (2 * Math.PI * j) / m; });
        rings.push({ R, omega, phase: 0, members });
        k++;
      }
    }

    function commit(t) {
      state = 'climax';
      tCommit = t;
      for (const n of nodes) n.t0 = Math.min(n.t0, t);
      root.classList.add('is-leaving');
    }

    function beginReveal(t, mode) {
      if (state === 'idle') root.classList.add('is-leaving');
      state = 'reveal';
      tReveal = t;
      revealMode = mode === 'skip' ? 'fade' : mode;
      revealDur = REVEAL[mode] || 1;
      const burst = mode === 'skip' ? 0 : 1;
      B.active = false;
      for (const n of nodes) {
        n.t0 = Infinity;
        if (burst) kickOutward(n, rand(380, 820) * (reduced ? 0.3 : 1));
      }
      root.style.background = 'transparent';
    }

    function update(t, dt) {
      if (state === 'idle') {
        p = holding
          ? Math.min(1, p + dt / (opts.holdMs / 1000))
          : Math.max(0, p - dt / (opts.drainMs / 1000));
        if (p >= 1) commit(t);
      }
      const e = Math.pow(p, opts.accel);

      // Hold progress drives everything: ring speed, tightness, spring stiffness, pulse rate.
      let radiusF = 1 - 0.38 * e;
      const mult = 1 + 13 * e * (reduced ? 0.25 : 1);
      if (state === 'climax') {
        const q = Math.min(1, (t - tCommit) / CLIMAX);
        radiusF = 0.62 - 0.56 * q * q;
        if (q >= 1) beginReveal(t, opts.reveal);
      }
      const k = 10 + 26 * e, c = 2 * Math.sqrt(k) * 0.85;

      if (B.active) {
        const f = Math.min(1, dt * 12);
        B.x += (B.px - B.x) * f; B.y += (B.py - B.y) * f;
        B.s = Math.min(1, B.s + dt * 4);
        const interval = 0.85 - 0.68 * e;
        if (!reduced && t - B.lastPulse > interval) { B.pulses.push(t); B.lastPulse = t; }
        for (const ring of rings) ring.phase += ring.omega * mult * dt;
      } else {
        B.s = Math.max(0, B.s - dt * (state === 'reveal' ? 2.2 : 1.6));
      }
      B.pulses = B.pulses.filter((pt) => t - pt < 2.2);

      for (const n of nodes) {
        const engaged = B.active && t >= n.t0;
        if (engaged) {
          n.charge = Math.min(1, n.charge + dt * 2.5);
          const ring = rings[n.ring];
          const R = ring.R * radiusF, w = ring.omega * mult;
          const a = n.slot + ring.phase, ca = Math.cos(a), sa = Math.sin(a);
          const tx = B.x + R * ca, ty = B.y + R * sa;
          n.vx += (k * (tx - n.x) + c * (-R * w * sa - n.vx)) * dt;
          n.vy += (k * (ty - n.y) + c * (R * w * ca - n.vy)) * dt;
        } else {
          n.charge = Math.max(0, n.charge - dt * 0.55);
          n.h += (Math.random() - 0.5) * dt * 2.6;
          n.vx += (Math.cos(n.h) * n.sp - n.vx) * dt * 0.9;
          n.vy += (Math.sin(n.h) * n.sp - n.vy) * dt * 0.9;
        }
        n.x += n.vx * dt; n.y += n.vy * dt;

        if (!engaged && state === 'idle') {
          let hit = false;
          if (n.x < MARGIN) { n.x = MARGIN; n.vx = Math.abs(n.vx); hit = true; }
          if (n.x > W - MARGIN) { n.x = W - MARGIN; n.vx = -Math.abs(n.vx); hit = true; }
          if (n.y < MARGIN) { n.y = MARGIN; n.vy = Math.abs(n.vy); hit = true; }
          if (n.y > H - MARGIN) { n.y = H - MARGIN; n.vy = -Math.abs(n.vy); hit = true; }
          if (hit) n.h = Math.atan2(n.vy, n.vx);
        }
      }
      return { e, radiusF };
    }

    // ---- drawing ---------------------------------------------------------

    function arrow(x, y, ux, uy, len, color) {
      const ex = x + ux * len, ey = y + uy * len;
      ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(ex - ux * 4, ey - uy * 4); ctx.stroke();
      const px = -uy, py = ux;
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(ex - ux * 8 + px * 4.2, ey - uy * 8 + py * 4.2);
      ctx.lineTo(ex - ux * 8 - px * 4.2, ey - uy * 8 - py * 4.2);
      ctx.closePath(); ctx.fill();
    }

    function draw(t, e, radiusF) {
      const q = state === 'reveal' ? clamp((t - tReveal) / revealDur, 0, 1) : 0;
      let bgA = 1, nodeA = 1;
      if (state === 'reveal' && revealMode === 'dissolve') {
        bgA = 1 - easeInOut(clamp(q / 0.55, 0, 1));
        nodeA = 1 - easeInOut(clamp((q - 0.4) / 0.6, 0, 1));
      }
      if (state === 'reveal' && revealMode === 'fade') root.style.opacity = String(1 - easeInOut(q));

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = rgba(C.bg, bgA);
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = rgba(C.grid, bgA); ctx.lineWidth = 1; ctx.setLineDash([]);
      ctx.beginPath();
      const g = 44;
      for (let x = (W % g) / 2; x < W; x += g) { ctx.moveTo(Math.round(x) + 0.5, 0); ctx.lineTo(Math.round(x) + 0.5, H); }
      for (let y = (H % g) / 2; y < H; y += g) { ctx.moveTo(0, Math.round(y) + 0.5); ctx.lineTo(W, Math.round(y) + 0.5); }
      ctx.stroke();

      // A slight tremor as the charge nears the threshold.
      const shake = reduced || state === 'reveal' ? 0
        : 2.5 * clamp((e - 0.55) / 0.45, 0, 1) + (state === 'climax' ? 2.5 : 0);
      ctx.save();
      if (shake) ctx.translate(rand(-shake, shake), rand(-shake, shake));
      ctx.globalAlpha = nodeA;

      if (B.active && state === 'idle') {
        const r = (t - B.t0) * WAVE, diag = Math.hypot(W, H);
        if (r < diag) {
          ctx.strokeStyle = rgba(C.beacon, 0.28 * (1 - r / diag));
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(B.x, B.y, r, 0, Math.PI * 2); ctx.stroke();
        }
      }
      for (const pt of B.pulses) {
        const age = t - pt, r = 14 + age * (190 + 260 * e);
        ctx.strokeStyle = rgba(C.beacon, (0.22 + 0.18 * e) * (1 - age / 2.2) * B.s);
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(B.x, B.y, r, 0, Math.PI * 2); ctx.stroke();
      }

      if (B.s > 0.01) {
        ctx.setLineDash([2, 6]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = rgba(C.beacon, (0.13 + 0.12 * e) * B.s);
        for (const ring of rings) {
          ctx.beginPath(); ctx.arc(B.x, B.y, ring.R * radiusF, 0, Math.PI * 2); ctx.stroke();
        }
      }

      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 1;
      for (const [a, b] of links) {
        const c = Math.min(a.charge, b.charge);
        const alpha = 0.34 * (1 - 0.8 * c);
        if (alpha < 0.01) continue;
        ctx.strokeStyle = rgba(mix(C.idle, C.beacon, c), alpha);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }

      ctx.setLineDash([]);
      for (const ring of rings) {
        const m = ring.members;
        if (m.length < 2) continue;
        for (let j = 0; j < m.length; j++) {
          const a = m[j], b = m[(j + 1) % m.length];
          const c = Math.min(a.charge, b.charge);
          if (c < 0.02) continue;
          ctx.strokeStyle = rgba(C.beacon, (0.32 + 0.25 * e) * c);
          ctx.lineWidth = 1 + e;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      if (B.s > 0.01 && rings[0]) {
        ctx.lineWidth = 1.6;
        for (const n of rings[0].members) {
          const c = n.charge * B.s;
          if (c < 0.02) continue;
          ctx.strokeStyle = rgba(C.beacon, 0.55 * c);
          ctx.beginPath(); ctx.moveTo(B.x, B.y); ctx.lineTo(n.x, n.y); ctx.stroke();
        }
      }

      const R = 6.5;
      for (const n of nodes) {
        const col = mix(C.idle, C.beacon, n.charge);
        if (n.charge > 0.02) {
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 22);
          glow.addColorStop(0, rgba(C.beacon, 0.32 * n.charge));
          glow.addColorStop(1, rgba(C.beacon, 0));
          ctx.fillStyle = glow;
          ctx.beginPath(); ctx.arc(n.x, n.y, 22, 0, Math.PI * 2); ctx.fill();
        }
        const sp = Math.hypot(n.vx, n.vy);
        if (sp > 3) {
          const ux = n.vx / sp, uy = n.vy / sp;
          const len = Math.min(34 + 26 * e, 12 + sp * 0.22);
          arrow(n.x + ux * (R + 1), n.y + uy * (R + 1), ux, uy, len, rgba(col, 0.55 + 0.3 * n.charge));
        }
        ctx.fillStyle = rgba(col, 1);
        ctx.beginPath(); ctx.arc(n.x, n.y, R, 0, Math.PI * 2); ctx.fill();
      }

      if (B.s > 0.01) {
        const s = B.s;
        const cq = state === 'climax' ? clamp((t - tCommit) / CLIMAX, 0, 1) : state === 'reveal' ? 1 : 0;
        const haloR = 70 + 160 * e + 220 * cq;
        const halo = ctx.createRadialGradient(B.x, B.y, 0, B.x, B.y, haloR);
        halo.addColorStop(0, rgba(C.beacon, (0.3 + 0.25 * e) * s));
        halo.addColorStop(1, rgba(C.beacon, 0));
        ctx.fillStyle = halo;
        ctx.beginPath(); ctx.arc(B.x, B.y, haloR, 0, Math.PI * 2); ctx.fill();

        ctx.setLineDash([4, 4]);
        ctx.lineDashOffset = -t * (14 + 60 * e);
        ctx.strokeStyle = rgba(C.beacon, 0.45 * s);
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(B.x, B.y, 30, 0, Math.PI * 2); ctx.stroke();
        ctx.setLineDash([]); ctx.lineDashOffset = 0;

        // Progress: fills clockwise from twelve o'clock over the hold.
        if (p > 0) {
          ctx.strokeStyle = rgba(C.beacon, s);
          ctx.lineWidth = 2.5;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.arc(B.x, B.y, 30, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p);
          ctx.stroke();
          ctx.lineCap = 'butt';
        }

        ctx.fillStyle = rgba(mix(C.bg, C.beacon, 0.45), s);
        ctx.beginPath(); ctx.arc(B.x, B.y, 11 + 6 * e, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = rgba(C.beacon, s);
        ctx.beginPath(); ctx.arc(B.x, B.y, 4.5 + 3 * e + 20 * cq, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();

      // Iris: a soft-edged hole opens from the beacon and the page shows through.
      if (state === 'reveal' && revealMode === 'iris') {
        const maxR = Math.hypot(Math.max(B.x, W - B.x), Math.max(B.y, H - B.y)) + 90;
        const r = Math.max(1, easeInOut(q) * maxR), edge = 90;
        const hole = ctx.createRadialGradient(B.x, B.y, Math.max(0, r - edge), B.x, B.y, r);
        hole.addColorStop(0, 'rgba(0,0,0,1)');
        hole.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = hole;
        ctx.beginPath(); ctx.arc(B.x, B.y, r, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }

      return q;
    }

    function frame() {
      const t = now();
      const dt = Math.min(0.05, t - last);
      last = t;
      const { e, radiusF } = update(t, dt);
      if (state === 'done') return;
      const q = draw(t, e, radiusF);
      const cq = state === 'climax' ? clamp((t - tCommit) / CLIMAX, 0, 1) : state === 'reveal' ? 1 : 0;
      updateAudio(e, cq, q);
      if (state === 'reveal' && q >= 1) { finish(); return; }
      raf = requestAnimationFrame(frame);
    }
  }

  global.BeaconGate = { mount, defaults: DEFAULTS };
})(window);
