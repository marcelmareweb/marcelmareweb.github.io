// Cursor pill: on hover-capable fine pointers, the card's pill scales in at the pointer,
// fills yellow and trails it, kept inside the card's edges. Keyboard focus shows it in place
// through CSS. Touch, coarse pointers and reduced motion get no follower.
const fine = matchMedia('(hover: hover) and (pointer: fine)');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll<HTMLElement>('[data-card]').forEach((card) => {
  const cue = card.querySelector<HTMLElement>('[data-card-cue]');
  if (!cue) return;

  const place = (event: PointerEvent) => {
    const rect = card.getBoundingClientRect();
    const halfW = cue.offsetWidth / 2 + 8;
    const halfH = cue.offsetHeight / 2 + 8;
    const x = Math.min(Math.max(event.clientX - rect.left, halfW), rect.width - halfW);
    const y = Math.min(Math.max(event.clientY - rect.top, halfH), rect.height - halfH);
    cue.style.setProperty('--cue-x', `${x}px`);
    cue.style.setProperty('--cue-y', `${y}px`);
  };

  card.addEventListener('pointerenter', (event) => {
    if (!fine.matches || reduced.matches || event.pointerType !== 'mouse') return;
    // Start at the entry point rather than flying in from the corner.
    cue.classList.add('is-placing');
    place(event);
    cue.getBoundingClientRect();
    cue.classList.remove('is-placing');
    cue.classList.add('is-active');
  });
  card.addEventListener('pointermove', (event) => {
    if (cue.classList.contains('is-active')) place(event);
  });
  card.addEventListener('pointerleave', () => cue.classList.remove('is-active'));
});

export {};
