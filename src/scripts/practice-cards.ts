document.querySelectorAll<HTMLElement>('[data-practice-cards]').forEach((root) => {
  const scene = root.querySelector<HTMLElement>('[data-practice-scene]');
  const viewport = root.querySelector<HTMLElement>('[data-practice-viewport]');
  const track = root.querySelector<HTMLElement>('[data-practice-track]');
  const cards = [...root.querySelectorAll<HTMLElement>('[data-practice-card]')];
  const controls = root.querySelector<HTMLElement>('[data-practice-controls]');
  const previous = root.querySelector<HTMLButtonElement>('[data-practice-previous]');
  const next = root.querySelector<HTMLButtonElement>('[data-practice-next]');
  const steps = [...root.querySelectorAll<HTMLButtonElement>('[data-practice-step]')];
  const counter = root.querySelector<HTMLElement>('[data-practice-index]');
  const status = root.querySelector<HTMLElement>('[data-practice-status]');
  const hint = root.querySelector<HTMLElement>('[data-practice-hint]');
  const instructions = root.querySelector<HTMLElement>('#practice-instructions');
  if (!scene || !viewport || !track || !controls || !previous || !next || !cards.length) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 1024px) and (min-height: 760px)');
  let mode: 'pinned' | 'native' | 'stacked' = 'native';
  let current = -1;
  let travel = 0;
  let frame = 0;
  const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
  const stickyTop = () =>
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) + 24;

  function select(index: number) {
    if (index === current) return;
    current = index;
    if (counter) counter.textContent = String(index + 1).padStart(2, '0');
    previous!.disabled = index === 0;
    next!.disabled = index === cards.length - 1;
    steps.forEach((step, position) => {
      if (position === index) step.setAttribute('aria-current', 'step');
      else step.removeAttribute('aria-current');
    });
    if (status)
      status.textContent = `Practice ${index + 1} of ${cards.length}: ${cards[index].querySelector('h3')?.getAttribute('aria-label')}`;
  }

  function update() {
    frame = 0;
    if (mode === 'stacked') return;
    const distance =
      mode === 'pinned'
        ? clamp(stickyTop() - scene!.getBoundingClientRect().top, 0, travel)
        : viewport!.scrollLeft;
    if (mode === 'pinned') track!.style.transform = `translate3d(${-distance}px, 0, 0)`;
    const index = cards.reduce(
      (nearest, card, position) =>
        Math.abs(card.offsetLeft - distance) < Math.abs(cards[nearest].offsetLeft - distance)
          ? position
          : nearest,
      0,
    );
    select(index);
  }

  function requestUpdate() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  function measure() {
    const nextMode = reduced.matches ? 'stacked' : desktop.matches ? 'pinned' : 'native';
    if (nextMode !== mode) {
      track!.style.removeProperty('transform');
      viewport!.scrollLeft = 0;
    }
    mode = nextMode;
    root.dataset.mode = mode;
    controls!.hidden = mode === 'stacked';
    viewport!.setAttribute(
      'aria-roledescription',
      mode === 'stacked' ? 'practice collection' : 'carousel',
    );
    if (hint)
      hint.textContent = mode === 'pinned' ? 'Scroll to explore' : 'Swipe or use the arrows';
    if (instructions)
      instructions.textContent =
        mode === 'stacked'
          ? 'Three areas of practice. Open Questions and outcomes on each card for more detail.'
          : `${mode === 'pinned' ? 'Scroll down' : 'Swipe or scroll sideways'} to explore the three practice areas. Use the navigation buttons, or Left and Right arrow keys when this region is focused. Open Questions and outcomes for more detail.`;
    travel = Math.max(0, track!.scrollWidth - viewport!.clientWidth);
    scene!.style.setProperty('--practice-travel', `${travel}px`);
    update();
  }

  function goTo(index: number, instant = false) {
    index = clamp(index, 0, cards.length - 1);
    const behavior = instant || reduced.matches ? 'instant' : 'smooth';
    if (mode === 'pinned') {
      viewport!.scrollLeft = 0;
      const start = scene!.getBoundingClientRect().top + window.scrollY - stickyTop();
      window.scrollTo({ top: start + cards[index].offsetLeft, behavior });
    } else if (mode === 'native') {
      viewport!.scrollTo({ left: cards[index].offsetLeft, behavior });
    }
    requestUpdate();
  }

  previous.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));
  steps.forEach((step, index) => step.addEventListener('click', () => goTo(index)));
  viewport.addEventListener('keydown', (event) => {
    if (event.target !== viewport || mode === 'stacked') return;
    const targets: Record<string, number> = {
      ArrowLeft: current - 1,
      ArrowRight: current + 1,
      Home: 0,
      End: cards.length - 1,
    };
    if (!(event.key in targets)) return;
    event.preventDefault();
    goTo(targets[event.key]);
  });
  // Tab can reach every native disclosure, including a card outside the clipped frame.
  track.addEventListener('focusin', (event) => {
    if (mode !== 'pinned' || !(event.target instanceof Element)) return;
    const card = event.target.closest<HTMLElement>('[data-practice-card]');
    const index = card ? cards.indexOf(card) : -1;
    if (index >= 0 && index !== current) goTo(index, true);
  });
  window.addEventListener('scroll', requestUpdate, { passive: true });
  viewport.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', measure, { passive: true });
  reduced.addEventListener('change', measure);
  desktop.addEventListener('change', measure);
  document.fonts.ready.then(measure);
  measure();
});
