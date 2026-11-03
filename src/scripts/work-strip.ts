// Progressive enhancement for the homepage work strip: step buttons over native horizontal scroll.
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

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

  track.addEventListener('scroll', update, { passive: true });
  new ResizeObserver(update).observe(track);
  update();
});
