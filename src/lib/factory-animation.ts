const CYCLE = 14_000;
const INSPECTION_END = 12_000;
const BOUNDARIES = [2_000, 4_000, 7_000, 10_000, INSPECTION_END, CYCLE];
const PHASES = ['arrival', 'peeling', 'mixing', 'baking', 'inspection', 'release'];
type Motion = { animation: Animation; name: string; background: boolean; boost: boolean };
type Scene = { svg: SVGSVGElement; motions: Motion[]; loaded: boolean };

function mountFactory(root: HTMLElement) {
  if (root.dataset.mounted) return;
  root.dataset.mounted = 'true';
  const abort = new AbortController();
  const { signal } = abort;
  const query = <T extends Element>(selector: string) => {
    const result = root.querySelector<T>(selector);
    if (!result) throw new Error(`Factory element missing: ${selector}`);
    return result;
  };
  const controls = query<HTMLElement>('.factory-controls');
  const live = query<HTMLElement>('.factory-live');
  const hotspots = query<HTMLElement>('.factory-hotspots');
  const status = query<HTMLElement>('[data-status]');
  const buttons = Object.fromEntries(['play','hold','approve','boost','worker'].map(name =>
    [name, query<HTMLButtonElement>(`[data-control="${name}"]`)])) as Record<string, HTMLButtonElement>;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 640px)');
  const scenes: Scene[] = [...root.querySelectorAll<SVGSVGElement>('[data-factory-scene]')]
    .map(svg => ({ svg, motions: [], loaded: false }));
  let active = scenes[mobile.matches ? 1 : 0];
  let ready = false;
  let visible = false;
  let paused = false;
  let holding = false;
  let holdNext = false;
  let queued = false;
  let staticApproved = false;
  let boosted = false;
  let hovered = false;
  let elapsed = 0;
  let anchor = 0;
  let running = false;
  let boundaryTimer: ReturnType<typeof setTimeout> | undefined;
  let reactionTimer: ReturnType<typeof setTimeout> | undefined;
  let reaction: Animation | undefined;
  let generation = 0;
  let inspectedCycle = -1;
  const time = () => elapsed + (running ? performance.now() - anchor : 0);
  const say = (message: string) => { status.textContent = message; };
  const pressed = (name: string, value: boolean) => buttons[name].setAttribute('aria-pressed', String(value));
  const phase = () => Math.min(5, BOUNDARIES.findIndex(end => time() % CYCLE < end));

  function animate(element: SVGElement, name: string, frames: Keyframe[], duration: number,
    background = true, boost = false) {
    const animation = element.animate(frames, { duration, iterations: Infinity, fill: 'both' });
    animation.pause();
    animation.currentTime = 0;
    active.motions.push({ animation, name, background, boost });
  }

  function register(scene: Scene) {
    const isMobile = scene.svg.dataset.factoryScene === 'mobile';
    for (const element of scene.svg.querySelectorAll<SVGElement>('[data-motion]')) {
      const name = element.dataset.motion || '';
      const a = (frames: Keyframe[], duration = CYCLE, background = false, boost = false) =>
        animate(element, name, frames, duration, background, boost);
      switch (name) {
        case 'wheel': case 'pulley':
          a([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], name === 'wheel' ? 7_000 : 3_500, true, true); break;
        case 'weight':
          a([{ transform:'translateY(0px)' }, { transform:'translateY(7px)' }, { transform:'translateY(0px)' }], 3_500, true); break;
        case 'basket':
          a([{ transform:'rotate(-0.7deg)' }, { transform:'rotate(0.7deg)' }, { transform:'rotate(-0.7deg)' }], 7_000, true); break;
        case 'beater':
          a([{ transform:'scaleX(1)' }, { transform:'scaleX(.72)' }, { transform:'scaleX(1)' }], 1_750, true, true); break;
        case 'fork':
          a([{ transform:'rotate(-1deg)' }, { transform:'rotate(2deg)' }, { transform:'rotate(-1deg)' }], 3_500, true); break;
        case 'receiver': case 'mixerWorker':
          a([{ transform:'rotate(0deg)', offset:0 }, { transform:'rotate(0deg)', offset:.15 },
            { transform:`rotate(${name === 'receiver' ? '-2' : '1.2'}deg)`, offset:.24 },
            { transform:'rotate(0deg)', offset:.34 }, { transform:'rotate(0deg)', offset:1 }], CYCLE, true); break;
        case 'travelling-banana':
          a([{ transform:'translate(0px,0px)', opacity:0, offset:0 },
            { transform:'translate(0px,0px)', opacity:1, offset:.03 },
            { transform:'translate(70px,-86px)', opacity:1, offset:.36 },
            { transform:'translate(157px,-204px)', opacity:1, offset:.75 },
            { transform:'translate(253px,-249px)', opacity:1, offset:.96 },
            { transform:'translate(264px,-250px)', opacity:0, offset:1 }], 7_000, true); break;
        case 'fruit':
          a([{ transform:'translate(0px,-65px)', opacity:0, offset:0 },
            { transform:'translate(0px,-65px)', opacity:1, offset:.28 },
            { transform:'translate(25px,30px)', opacity:1, offset:.55 },
            { transform:'translate(33px,42px)', opacity:0, offset:.62 },
            { transform:'translate(33px,42px)', opacity:0, offset:1 }], 3_500, true); break;
        case 'falling-peel':
          a([{ transform:'translate(0px,0px)', opacity:0, offset:0 },
            { transform:'translate(0px,0px)', opacity:1, offset:.25 },
            { transform:'translate(-34px,74px)', opacity:1, offset:.65 },
            { transform:'translate(-36px,83px)', opacity:0, offset:.7 },
            { transform:'translate(-36px,83px)', opacity:0, offset:1 }], 3_500, true); break;
        case 'stream':
          a([{ opacity:0, offset:0 }, { opacity:0, offset:.28 }, { opacity:1, offset:.32 },
            { opacity:1, offset:.47 }, { opacity:0, offset:.5 }, { opacity:0, offset:1 }]); break;
        case 'door':
          a([{ transform:'rotate(0deg)', offset:0 }, { transform:'rotate(0deg)', offset:.51 },
            { transform:'rotate(24deg)', offset:.56 }, { transform:'rotate(24deg)', offset:.66 },
            { transform:'rotate(0deg)', offset:.7 }, { transform:'rotate(0deg)', offset:1 }]); break;
        case 'loaf': {
          const start = isMobile ? -240 : -220;
          const end = isMobile ? 410 : 370;
          a([{ transform:`translateX(${start}px)`, opacity:0, offset:0 },
            { transform:`translateX(${start}px)`, opacity:0, offset:.54 },
            { transform:`translateX(${start+25}px)`, opacity:1, offset:.57 },
            { transform:'translateX(0px)', opacity:1, offset:10/14 },
            { transform:'translateX(0px)', opacity:1, offset:12.35/14 },
            { transform:`translateX(${end}px)`, opacity:1, offset:.985 },
            { transform:`translateX(${end}px)`, opacity:0, offset:1 }]); break;
        }
        case 'stop':
          a([{ transform:'translateY(0px)', offset:0 }, { transform:'translateY(0px)', offset:12/14 },
            { transform:`translateY(${isMobile ? 120 : 90}px)`, offset:12.3/14 },
            { transform:`translateY(${isMobile ? 120 : 90}px)`, offset:.986 },
            { transform:'translateY(0px)', offset:1 }]); break;
        case 'lever':
          a([{ transform:'rotate(0deg)', offset:0 }, { transform:'rotate(0deg)', offset:12/14 },
            { transform:'rotate(-35deg)', offset:12.25/14 }, { transform:'rotate(-35deg)', offset:.95 },
            { transform:'rotate(0deg)', offset:.99 }, { transform:'rotate(0deg)', offset:1 }]); break;
        case 'inspector':
          a([{ transform:'rotate(0deg)', offset:0 }, { transform:'rotate(0deg)', offset:.68 },
            { transform:'rotate(2deg)', offset:10.15/14 }, { transform:'rotate(2deg)', offset:11.95/14 },
            { transform:'rotate(0deg)', offset:12.2/14 }, { transform:'rotate(0deg)', offset:1 }]); break;
        case 'approval-arm':
          a([{ opacity:0, offset:0 }, { opacity:0, offset:12.05/14 }, { opacity:1, offset:12.2/14 },
            { opacity:1, offset:13/14 }, { opacity:0, offset:13.2/14 }, { opacity:0, offset:1 }]); break;
      }
    }
  }

  function setClock(next: boolean) {
    if (next === running) return;
    if (running) elapsed = time();
    anchor = performance.now();
    running = next;
  }

  function updateButtons() {
    pressed('play', paused);
    pressed('hold', holdNext);
    pressed('boost', boosted);
    buttons.play.textContent = reduced.matches ? 'Reduced motion' : paused ? 'Play animation' : 'Pause animation';
    buttons.play.disabled = reduced.matches;
    buttons.hold.disabled = reduced.matches;
    buttons.boost.disabled = reduced.matches;
    buttons.worker.disabled = reduced.matches;
    buttons.worker.textContent = mobile.matches ? 'Check inspector' : 'Check intake';
    buttons.approve.disabled = !reduced.matches && queued;
    buttons.approve.textContent = reduced.matches ? staticApproved ? 'Inspect next loaf' : 'Approve loaf' : queued ? 'Approval queued' : 'Approve loaf';
  }

  function sync() {
    clearTimeout(boundaryTimer);
    const allowed = ready && visible && !document.hidden && !paused && !reduced.matches;
    if (!allowed) reaction?.cancel();
    setClock(allowed && !holding);
    root.dataset.state = reduced.matches ? staticApproved ? 'approved' : 'inspection' : holding ? 'held' : paused ? 'paused' : allowed ? 'running' : 'suspended';
    root.dataset.phase = reduced.matches || holding ? 'inspection' : PHASES[Math.max(0, phase())];
    root.dataset.cycle = String(Math.floor(time()/CYCLE));
    for (const scene of scenes) for (const item of scene.motions) {
      const { animation, background, name, boost } = item;
      if (scene !== active || !allowed || (!background && holding)) animation.pause();
      if (scene === active) {
        if (reduced.matches) {
          animation.currentTime = background ? 0 : staticApproved && ['stop','lever'].includes(name) ? 12_600 : 11_000;
        } else if (!background) {
          animation.currentTime = time() % CYCLE;
        }
        if (boost) animation.updatePlaybackRate(boosted || hovered ? 1.4 : 1);
        if (allowed && (background || !holding)) animation.play();
      }
    }
    updateButtons();
    if (running) {
      const t = time() % CYCLE;
      const next = BOUNDARIES.find(end => end > t + 1) ?? CYCLE;
      boundaryTimer = setTimeout(advance, Math.max(1, next - t + 3));
    }
  }

  function advance() {
    const t = time();
    const cycle = Math.floor(t/CYCLE);
    const local = t % CYCLE;
    if (local >= INSPECTION_END && inspectedCycle !== cycle) {
      inspectedCycle = cycle;
      if (queued) {
        queued = false;
        holdNext = false;
        say('The inspector has approved this loaf. The release is open.');
      } else if (holdNext) {
        setClock(false);
        elapsed = cycle * CYCLE + INSPECTION_END;
        holding = true;
        say('The loaf is held for your approval. The upstream machinery keeps working.');
      }
    }
    sync();
  }

  function release() {
    if (reduced.matches) {
      staticApproved = !staticApproved;
      say(staticApproved ? 'Loaf approved. The release is open. No movement is required.' : 'The next loaf is held for inspection.');
    } else if (holding) {
      holding = false;
      holdNext = false;
      queued = false;
      say('Approved. The inspector is operating the release lever.');
    } else {
      queued = true;
      say('Approval queued. The inspector will complete the two-second inspection before releasing the next loaf.');
    }
    sync();
  }

  function react() {
    if (reduced.matches || paused || !visible || document.hidden || !ready) return;
    clearTimeout(reactionTimer);
    const worker = active.motions.find(m => m.name === (mobile.matches ? 'inspector' : 'receiver'));
    if (!worker) return;
    const target = (worker.animation.effect as KeyframeEffect).target;
    if (!(target instanceof SVGElement)) return;
    reaction?.cancel();
    reaction = target.animate([{ translate:'0px 0px' }, { translate:'0px -2px' }, { translate:'0px 0px' }], { duration:700 });
    reactionTimer = setTimeout(() => reaction?.cancel(), 750);
    say(mobile.matches ? 'The inspector takes another look at the loaf.' : 'The intake supervisor checks the next banana.');
  }

  buttons.play.addEventListener('click', () => {
    paused = !paused;
    say(paused ? 'Animation paused. Your inspection state is preserved.' : holding ? 'Machinery running. The loaf still awaits your approval.' : 'Animation playing. Each loaf pauses for inspection.');
    sync();
  }, { signal });
  buttons.hold.addEventListener('click', () => {
    holdNext = !holdNext;
    if (!holdNext && holding) holding = false;
    say(holdNext ? 'The next loaf will wait for your approval after its inspection.' : 'Automatic release restored. The inspection pause is preserved.');
    sync();
  }, { signal });
  buttons.approve.addEventListener('click', release, { signal });
  buttons.boost.addEventListener('click', () => {
    boosted = !boosted;
    say(boosted ? 'The mixer drive is running a little faster. Inspection timing is unchanged.' : 'The mixer drive is back at its normal speed.');
    sync();
  }, { signal });
  buttons.worker.addEventListener('click', react, { signal });
  query<HTMLElement>('[data-hover="mixer"]').addEventListener('pointerenter', () => { hovered = true; sync(); }, { signal });
  query<HTMLElement>('[data-hover="mixer"]').addEventListener('pointerleave', () => { hovered = false; sync(); }, { signal });
  query<HTMLElement>('[data-hover="worker"]').addEventListener('pointerenter', react, { signal });
  document.addEventListener('visibilitychange', sync, { signal });
  reduced.addEventListener('change', () => {
    staticApproved = false;
    say(reduced.matches ? 'Reduced motion: a still factory. Approve the loaf to change the release state.' : 'Motion preference updated. Your playback choice is preserved.');
    sync();
  }, { signal });

  async function selectScene() {
    const token = ++generation;
    ready = false;
    sync();
    delete root.dataset.ready;
    active = scenes[mobile.matches ? 1 : 0];
    try {
      if (!active.loaded) {
        const art = active.svg.querySelector<SVGImageElement>('[data-art-src]');
        if (!art?.dataset.artSrc) throw new Error('Missing factory artwork');
        const image = new Image();
        image.src = art.dataset.artSrc;
        await image.decode();
        if (signal.aborted || token !== generation) return;
        art.setAttribute('href', art.dataset.artSrc);
        register(active);
        active.loaded = true;
      }
      if (signal.aborted || token !== generation) return;
      live.hidden = false;
      controls.hidden = false;
      hotspots.hidden = false;
      ready = true;
      root.dataset.ready = 'true';
      if (reduced.matches) say('Reduced motion: a still factory. Approve the loaf to change the release state.');
      sync();
    } catch {
      say('The still factory is available. Animation could not load.');
      controls.hidden = true;
      live.hidden = true;
      hotspots.hidden = true;
      delete root.dataset.ready;
    }
  }
  mobile.addEventListener('change', selectScene, { signal });
  const observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    sync();
  }, { threshold:0 });
  observer.observe(query('.factory-stage'));
  document.addEventListener('astro:before-swap', () => {
    abort.abort();
    observer.disconnect();
    clearTimeout(boundaryTimer);
    clearTimeout(reactionTimer);
    reaction?.cancel();
    scenes.forEach(scene => scene.motions.forEach(({ animation }) => animation.cancel()));
  }, { once:true });
  void selectScene();
}

export function mountFactories() {
  document.querySelectorAll<HTMLElement>('[data-monkey-factory]').forEach(mountFactory);
}
