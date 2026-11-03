// Progressive enhancement for the homepage work strip: step buttons over native horizontal scroll.
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const fine = matchMedia('(hover: hover) and (pointer: fine)');

document.querySelectorAll<HTMLElement>('[data-work-strip]').forEach((strip) => {
  const track = strip.querySelector<HTMLElement>('[data-strip-track]');
  const controls = strip.querySelector<HTMLElement>('[data-strip-controls]');
  if (!track || !controls) return;
  const buttons = [...controls.querySelectorAll<HTMLButtonElement>('[data-strip-step]')];

  const update = () => {
    const max = track.scrollWidth - track.clientWidth;
    controls.hidden = max <= 1;
    buttons.forEach((button) => {
      const forward = button.dataset.stripStep === '1';
      // aria-disabled rather than disabled, so keyboard focus stays on the button at either end.
      const atEnd = forward ? track.scrollLeft >= max - 1 : track.scrollLeft <= 1;
      button.setAttribute('aria-disabled', String(atEnd));
    });
  };

  buttons.forEach((button) =>
    button.addEventListener('click', () => {
      if (button.getAttribute('aria-disabled') === 'true') return;
      const item = track.querySelector<HTMLElement>('li');
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const step = (item?.offsetWidth ?? track.clientWidth) + gap;
      track.scrollBy({
        left: step * Number(button.dataset.stripStep),
        behavior: reduced.matches ? 'auto' : 'smooth',
      });
    }),
  );

  // Drag to scroll with a mouse. Touch keeps native swiping; a drag never opens the card under it.
  let start = 0;
  let origin = 0;
  let dragged = false;
  track.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || !fine.matches) return;
    start = event.clientX;
    origin = track.scrollLeft;
    dragged = false;
    track.classList.add('is-dragging');
    const move = (moveEvent: PointerEvent) => {
      const distance = moveEvent.clientX - start;
      if (Math.abs(distance) > 6) dragged = true;
      track.scrollLeft = origin - distance;
    };
    const end = () => {
      track.classList.remove('is-dragging');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end);
  });
  track.addEventListener('click', (event) => {
    if (!dragged) return;
    event.preventDefault();
    event.stopPropagation();
    dragged = false;
  }, true);
  track.addEventListener('dragstart', (event) => event.preventDefault());

  track.addEventListener('scroll', update, { passive: true });
  new ResizeObserver(update).observe(track);
  update();
});
