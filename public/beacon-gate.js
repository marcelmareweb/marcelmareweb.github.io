/* Beacon Gate: a hold-to-enter intro layer that sits over a page.
   24 planes wander on their own; pressing and holding drops a beacon they circle in six flights
   of four, and when the hold completes they join into one arrowhead that flies off as the page opens.
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
    plane: '/plane.svg',   // SVG whose <path> data draws each plane (nose pointing up)
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
  const CLIMAX = 1.1;      // s: the flights join into one arrowhead before the reveal
  const FLIGHTS = 6;
  // Finger-four, in plane spacings: [ahead, to the right] of the lead, which flies at [0, 0].
  const FINGER = [[0, 0], [-1, -1], [-1, 1], [-2, 2]];
  const REVEAL = { iris: 1.25, fade: 0.9, dissolve: 1.6, skip: 0.45 };

  // Built-in copy of public/plane.svg (500×500, nose up), used until or unless the file loads.
  const PLANE_D = 'M250 20C290 100 300 150 300 170L460 300L460 360L300 290L270 380L340 430L340 480L250 440'
    + 'L160 480L160 430L230 380L200 290L40 360L40 300L200 170C200 150 210 100 250 20Z';
  const PLANE_BOX = 500;
  const PLANE_LAYERS = [   // background flights of four, furthest first; density is px² per plane
    { size: 9, alpha: 0.16, speed: 0.45, density: 26000 },
    { size: 13, alpha: 0.26, speed: 0.7, density: 42000 },
  ];
  // Rotate [ahead, right] by heading a into screen x/y.
  const rot = (fx, ly, a) => [fx * Math.cos(a) - ly * Math.sin(a), fx * Math.sin(a) + ly * Math.cos(a)];

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
    let nodes = [], flights = [], ring = null, flock = [];
    let planeSize = 24, spacing = 28;
    const V = { x: 0, y: 0, ang: -Math.PI / 2, v: 0, v0: 0, a: 0 };   // the arrowhead's centre and flight
    let plane = new Path2D(PLANE_D), planeBox = PLANE_BOX;
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
      root.addEventListener('touchend', unlockAudio, { passive: true });
      root.addEventListener('pointerup', unlockAudio);
      cv.addEventListener('pointercancel', letGo);
      cv.addEventListener('contextmenu', prevent);
      cv.addEventListener('keydown', onKeyDown);
      cv.addEventListener('keyup', onKeyUp);
      root.addEventListener('keydown', onEscape);
      skipEl.addEventListener('click', api.skip);
      global.addEventListener('blur', letGo);
      global.addEventListener('resize', resize);
      document.addEventListener('visibilitychange', onVisibility);

      loadPlane();
      lockPage();
      resize();
      seed();
      state = 'idle'; p = 0; holding = false;
      B.active = false; B.s = 0; B.pulses = []; ring = null;
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
      for (const fl of flights) {
        const t0 = t + Math.hypot(fl.lead.x - x, fl.lead.y - y) / WAVE;
        for (const n of fl.members) n.t0 = t0;
      }
      hintEl.textContent = opts.holdingHint;
      hintEl.classList.add('is-holding');
    }

    function letGo() {
      if (!holding) return;
      holding = false;
      if (state !== 'idle') return;   // past the point of no return
      B.active = false;
      for (const n of nodes) { n.t0 = Infinity; kickOutward(n, rand(40, 120) * (reduced ? 0.4 : 1)); }
      ungroupFlock();
      hintEl.textContent = opts.hint;
      hintEl.classList.remove('is-holding');
    }

    // Use the plane from the SVG file when it loads; keep the built-in copy otherwise.
    function loadPlane() {
      if (!opts.plane || typeof fetch !== 'function') return;
      fetch(opts.plane).then((r) => (r.ok ? r.text() : '')).then((text) => {
        const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
        const svg = doc.querySelector('svg');
        const paths = doc.querySelectorAll('path[d]');
        if (!svg || !paths.length) return;
        const path = new Path2D();
        paths.forEach((el) => path.addPath(new Path2D(el.getAttribute('d'))));
        const vb = (svg.getAttribute('viewBox') || '').split(/[\s,]+/).map(Number);
        plane = path;
        planeBox = vb.length === 4 && vb[2] > 0 ? Math.max(vb[2], vb[3]) : PLANE_BOX;
      }).catch(() => {});
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
        audio.ac.resume().catch(() => {});
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
      if (soundOn) unlockAudio();
      try { cv.focus({ preventScroll: true }); } catch (_) {}
    }

    function startAudio() {
      unlockAudio();
    }

    // iPhone needs more than other browsers:
    // - It only lets audio start from a finished tap (touchend), not a press, so this also runs on
    //   every release and on the Sound button. A press-and-hold then sounds from the next press,
    //   or at once if iOS accepts the press.
    // - It mutes page audio with the silent switch unless the session is marked as playback.
    // - A context can be 'interrupted' as well as 'suspended'; anything but 'running' needs a resume,
    //   and a silent one-sample buffer completes the unlock on older iOS.
    function unlockAudio() {
      if (!soundOn || state === 'done') return;
      try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (_) {}
      if (!audio) audio = createAudio();
      if (!audio) return;
      const ac = audio.ac;
      if (ac.state !== 'running') {
        try { const r = ac.resume(); if (r && r.catch) r.catch(() => {}); } catch (_) {}
      }
      if (!audio.unlocked) {
        try {
          const src = ac.createBufferSource();
          src.buffer = ac.createBuffer(1, 1, 22050);
          src.connect(ac.destination);
          src.start(0);
          audio.unlocked = true;
        } catch (_) {}
      }
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
      planeSize = 24 * clamp(scale, 0.7, 1);
      spacing = planeSize * 1.15;
      const m = edge();
      for (const n of nodes) {
        n.x = clamp(n.x, m, W - m);
        n.y = clamp(n.y, m, H - m);
      }
    }

    function edge() { return MARGIN + planeSize; }

    // 24 planes, each wandering on its own until the beacon calls them into flights.
    function seed() {
      const m = edge();
      nodes = Array.from({ length: FLIGHTS * 4 }, () => {
        const h = rand(0, Math.PI * 2), sp = rand(22, 40) * (reduced ? 0.4 : 1);
        return { x: rand(m, W - m), y: rand(m, H - m), vx: Math.cos(h) * sp, vy: Math.sin(h) * sp,
          h, sp, ang: h, charge: 0, t0: Infinity, fl: null, k: 0 };
      });
      flights = [];
      flock = [];
      for (const layer of PLANE_LAYERS) {
        const count = 4 * Math.round(clamp((W * H) / layer.density / 4, 2, 15));
        for (let i = 0; i < count; i++) {
          const h = rand(0, Math.PI * 2), sp = rand(18, 42) * layer.speed * (reduced ? 0.4 : 1);
          flock.push({ x: rand(0, W), y: rand(0, H), vx: Math.cos(h) * sp, vy: Math.sin(h) * sp,
            h, sp, ang: h, layer, lead: null, k: 0 });
        }
      }
    }

    // On a press the planes split into six flights of four by their angle round the beacon, so
    // neighbours fly together and paths don't cross. Within a flight, the plane furthest along
    // the direction of travel leads. The flights share one ring, 60° apart, and circle the way
    // most planes are already flying.
    function assignFormation() {
      let turn = 0;
      for (const n of nodes) {
        n._a = Math.atan2(n.y - B.y, n.x - B.x);
        turn += (n.x - B.x) * n.vy - (n.y - B.y) * n.vx;
      }
      const dir = turn < 0 ? -1 : 1;
      const sorted = nodes.slice().sort((a, b) => a._a - b._a);
      // Start the split at a random plane so the six groups don't always break at the same angle.
      const start = Math.floor(Math.random() * sorted.length);
      const order = [];
      for (let f = 0; f < FLIGHTS; f++) {
        const members = [];
        for (let j = 0; j < 4; j++) members.push(sorted[(start + f * 4 + j) % sorted.length]);
        if (dir < 0) members.reverse();
        // members now run with the turn; the last one is furthest ahead.
        const lead = members.pop(), a = members.pop(), b = members.pop(), c = members.pop();
        const fl = { members: [lead, a, b, c], lead, slot: 0, mirror: 1 };
        fl.members.forEach((n, k) => { n.fl = fl; n.k = k; });
        fl._a = Math.atan2(lead.y - B.y, lead.x - B.x);
        order.push(fl);
      }
      order.sort((a, b) => a._a - b._a);
      let sx = 0, sy = 0;
      order.forEach((fl, j) => {
        const d = fl._a - (2 * Math.PI * j) / FLIGHTS;
        sx += Math.cos(d); sy += Math.sin(d);
      });
      const off = Math.atan2(sy, sx);
      order.forEach((fl, j) => { fl.slot = off + (2 * Math.PI * j) / FLIGHTS; });
      flights = order;
      ring = { R: 150 * scale, dir, phase: 0, order };
      groupFlock();
    }

    // Background planes pair up with their nearest neighbours in the same layer: a lead and three wingmen.
    function groupFlock() {
      for (const layer of PLANE_LAYERS) {
        const free = flock.filter((f) => f.layer === layer);
        while (free.length >= 4) {
          const lead = free.shift();
          lead.lead = null; lead.k = 0;
          free.sort((a, b) => Math.hypot(a.x - lead.x, a.y - lead.y) - Math.hypot(b.x - lead.x, b.y - lead.y));
          free.splice(0, 3).forEach((f, j) => { f.lead = lead; f.k = j + 1; });
        }
      }
    }

    function ungroupFlock() {
      for (const f of flock) if (f.lead) { f.lead = null; f.h = Math.atan2(f.vy, f.vx); }
    }

    // The arrowhead flies off upward, towards whichever side of the screen has more room.
    // Flights keep their left-to-right order; the left side mirrors its finger-four so both wings sweep out.
    function formArrowhead() {
      const room = W - B.x - B.x;
      const tx = Math.abs(room) < W * 0.16 ? B.x : room > 0 ? W : 0;
      V.ang = Math.atan2(-Math.max(B.y, H * 0.35), tx - B.x);
      V.x = B.x; V.y = B.y; V.v = 0;
      const DX = spacing * 4, DY0 = spacing * 2.2, DY = spacing * 4.6;
      const slots = [];
      for (const side of [-1, 1]) for (let r = 0; r < 3; r++) slots.push({ fx: -r * DX, ly: side * (DY0 + r * DY), side });
      const mx = slots.reduce((a, sl) => a + sl.fx, 0) / slots.length;
      slots.sort((a, b) => a.ly - b.ly);
      const px = -Math.sin(V.ang), py = Math.cos(V.ang);
      flights.slice()
        .sort((a, b) => ((a.lead.x - B.x) * px + (a.lead.y - B.y) * py) - ((b.lead.x - B.x) * px + (b.lead.y - B.y) * py))
        .forEach((fl, j) => { fl.vslot = { fx: slots[j].fx - mx, ly: slots[j].ly }; fl.mirror = slots[j].side; });
    }

    function commit(t) {
      state = 'climax';
      tCommit = t;
      for (const n of nodes) { n.t0 = Math.min(n.t0, t); n.charge = Math.max(n.charge, 0.6); }
      formArrowhead();
      root.classList.add('is-leaving');
    }

    function beginReveal(t, mode) {
      if (state === 'idle') root.classList.add('is-leaving');
      state = 'reveal';
      tReveal = t;
      revealMode = mode === 'skip' ? 'fade' : mode;
      revealDur = REVEAL[mode] || 1;
      B.active = false;
      if (mode === 'skip') {
        for (const n of nodes) n.t0 = Infinity;
        V.a = 0;
      } else {
        // Accelerate so the arrowhead is well off screen as the reveal ends.
        const dist = Math.hypot(W, H) + 400, T = revealDur;
        V.v0 = V.v; V.a = Math.max(0, (2 * (dist - V.v0 * T)) / (T * T));
        for (const f of flock) if (!f.lead) kickOutward(f, rand(200, 500) * f.layer.speed * (reduced ? 0.3 : 1));
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
      const radiusF = 1 - 0.38 * e;
      const mult = 1 + 13 * e * (reduced ? 0.25 : 1);
      if (state === 'climax' && t - tCommit >= CLIMAX) beginReveal(t, opts.reveal);
      const formed = state === 'climax' || (state === 'reveal' && V.a > 0);
      if (state === 'climax') V.v = 40 + 80 * clamp((t - tCommit) / CLIMAX, 0, 1);
      else if (formed) V.v = V.v0 + V.a * (t - tReveal);
      if (formed) { V.x += Math.cos(V.ang) * V.v * dt; V.y += Math.sin(V.ang) * V.v * dt; }

      if (B.active) {
        const f = Math.min(1, dt * 12);
        B.x += (B.px - B.x) * f; B.y += (B.py - B.y) * f;
        B.s = Math.min(1, B.s + dt * 4);
        const interval = 0.85 - 0.68 * e;
        if (!reduced && state === 'idle' && t - B.lastPulse > interval) { B.pulses.push(t); B.lastPulse = t; }
        if (ring) ring.phase += ring.dir * 0.34 * mult * dt;
      } else {
        B.s = Math.max(0, B.s - dt * (state === 'reveal' ? 2.2 : 1.6));
      }
      B.pulses = B.pulses.filter((pt) => t - pt < 2.2);

      // Free planes wander and steer back in from the edges.
      const m = edge();
      for (const n of nodes) {
        if (formed || (B.active && t >= n.t0)) continue;
        n.h += (Math.random() - 0.5) * dt * 2.6;
        if (state === 'idle' && (n.x < m || n.x > W - m || n.y < m || n.y > H - m)) {
          let d = Math.atan2(H / 2 - n.y, W / 2 - n.x) - n.h;
          d = Math.atan2(Math.sin(d), Math.cos(d));
          n.h += d * Math.min(1, dt * 2.5);
        }
      }

      for (const n of nodes) {
        const fl = n.fl;
        const [fx, ly] = FINGER[n.k];
        const engaged = B.active && t >= n.t0 && state === 'idle';
        let tx, ty, tvx, tvy, k;
        if (formed) {
          // Into the arrowhead, then away with it.
          const [sx, sy] = rot(fl.vslot.fx + fx * spacing, fl.vslot.ly + ly * spacing * fl.mirror, V.ang);
          tx = V.x + sx; ty = V.y + sy;
          tvx = Math.cos(V.ang) * V.v; tvy = Math.sin(V.ang) * V.v;
          k = state === 'reveal' ? 60 : 9 + 30 * clamp((t - tCommit) / CLIMAX, 0, 1);
          n.charge = Math.min(1, n.charge + dt * 2.5);
        } else if (engaged) {
          // Around the beacon, nose first; the flight turns as one.
          n.charge = Math.min(1, n.charge + dt * 2.5);
          const R = ring.R * radiusF, w = ring.dir * 0.34 * mult;
          const a = fl.slot + ring.phase, hd = a + ring.dir * Math.PI / 2;
          const [sx, sy] = rot(fx * spacing, ly * spacing, hd);
          tx = B.x + R * Math.cos(a) + sx; ty = B.y + R * Math.sin(a) + sy;
          tvx = -w * (ty - B.y); tvy = w * (tx - B.x);
          k = 10 + 26 * e;
        } else {
          n.charge = Math.max(0, n.charge - dt * 0.55);
          n.vx += (Math.cos(n.h) * n.sp - n.vx) * dt * 0.9;
          n.vy += (Math.sin(n.h) * n.sp - n.vy) * dt * 0.9;
        }
        if (k) {
          const c = 2 * Math.sqrt(k) * 0.85;
          n.vx += (k * (tx - n.x) + c * (tvx - n.vx)) * dt;
          n.vy += (k * (ty - n.y) + c * (tvy - n.vy)) * dt;
        }
        n.x += n.vx * dt; n.y += n.vy * dt;
      }

      // Background planes wander the same way, a little faster as the charge builds, and wrap at the edges.
      // While grouped, wingmen close up on their lead and wrap with it.
      const boost = 1 + 1.5 * e * (reduced ? 0.25 : 1);
      for (const f of flock) {
        const L = f.lead;
        if (L) {
          const sp = f.layer.size * 1.15, [fx, ly] = FINGER[f.k];
          const [sx, sy] = rot(fx * sp, ly * sp, L.ang);
          const k = 3, c = 2 * Math.sqrt(k) * 0.9;
          f.vx += (k * (L.x + sx - f.x) + c * (L.vx - f.vx)) * dt;
          f.vy += (k * (L.y + sy - f.y) + c * (L.vy - f.vy)) * dt;
        } else if (state !== 'reveal') {
          f.h += (Math.random() - 0.5) * dt * 2.6;
          f.vx += (Math.cos(f.h) * f.sp * boost - f.vx) * dt * 0.9;
          f.vy += (Math.sin(f.h) * f.sp * boost - f.vy) * dt * 0.9;
        }
        f.x += f.vx * dt; f.y += f.vy * dt;
      }
      if (state !== 'reveal') {
        for (const f of flock) {
          if (f.lead) continue;
          const pad = f.layer.size * 4, x0 = f.x, y0 = f.y;
          if (f.x < -pad) f.x = W + pad; else if (f.x > W + pad) f.x = -pad;
          if (f.y < -pad) f.y = H + pad; else if (f.y > H + pad) f.y = -pad;
          const dx = f.x - x0, dy = f.y - y0;
          if (dx || dy) for (const w of flock) if (w.lead === f) { w.x += dx; w.y += dy; }
        }
      }
      for (const n of nodes.concat(flock)) {
        const sp = Math.hypot(n.vx, n.vy);
        if (sp > 3) {
          let d = Math.atan2(n.vy, n.vx) - n.ang;
          d = Math.atan2(Math.sin(d), Math.cos(d));
          n.ang += d * Math.min(1, dt * 10);
        }
      }
      return { e, radiusF };
    }

    // ---- drawing ---------------------------------------------------------

    // The plane's nose points up in the SVG, so turn it a quarter to face its heading.
    function drawPlane(x, y, ang, size, color, outline) {
      const k = size / planeBox;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(ang + Math.PI / 2);
      ctx.scale(k, k);
      ctx.translate(-planeBox / 2, -planeBox / 2);
      if (outline) {
        ctx.strokeStyle = outline; ctx.lineWidth = 3 / k; ctx.lineJoin = 'round';
        ctx.stroke(plane);
      }
      ctx.fillStyle = color;
      ctx.fill(plane);
      ctx.restore();
    }

    // The 24 planes. Over the opening page they get an ink edge so the yellow still reads on white.
    function drawFlights(overPage) {
      for (const n of nodes) {
        if (n.charge > 0.02 && !overPage) {
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 22);
          glow.addColorStop(0, rgba(C.beacon, 0.32 * n.charge));
          glow.addColorStop(1, rgba(C.beacon, 0));
          ctx.fillStyle = glow;
          ctx.beginPath(); ctx.arc(n.x, n.y, 22, 0, Math.PI * 2); ctx.fill();
        }
        drawPlane(n.x, n.y, n.ang, planeSize, rgba(mix(C.idle, C.beacon, n.charge), 1),
          overPage ? rgba(C.bg, 1) : null);
      }
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

      for (const f of flock) drawPlane(f.x, f.y, f.ang, f.layer.size, rgba(C.idle, f.layer.alpha * nodeA));

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

      const circling = ring && state === 'idle' ? B.s : 0;
      if (circling > 0.01) {
        ctx.setLineDash([2, 6]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = rgba(C.beacon, (0.13 + 0.12 * e) * circling);
        ctx.beginPath(); ctx.arc(B.x, B.y, ring.R * radiusF, 0, Math.PI * 2); ctx.stroke();
      }

      ctx.setLineDash([]);

      if (state !== 'reveal') drawFlights(false);

      if (B.s > 0.01) {
        const s = B.s;
        const cq = state === 'climax' ? clamp((t - tCommit) / CLIMAX, 0, 1) : state === 'reveal' ? 1 : 0;
        const haloR = 70 + 160 * e + 60 * cq;
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
        ctx.beginPath(); ctx.arc(B.x, B.y, 4.5 + 3 * e + 6 * cq, 0, Math.PI * 2); ctx.fill();
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
      if (state === 'reveal') {
        ctx.globalAlpha = nodeA;
        drawFlights(true);
        ctx.globalAlpha = 1;
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
