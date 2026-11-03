// Floating preview over ledger rows. On hover-capable fine pointers it scales in beside the
// pointer and trails it within the ledger; keyboard focus shows it beside the row's end.
// It repeats the row's own content and is aria-hidden. Reduced motion shows it without movement.
const fine = matchMedia('(hover: hover) and (pointer: fine)');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll<HTMLElement>('.ledger').forEach((ledger) => {
  const preview = ledger.querySelector<HTMLElement>('[data-ledger-preview]');
  const text = preview?.querySelector('p');
  if (!preview || !text) return;

  const moveTo = (x: number, y: number, instant = false) => {
    const box = ledger.getBoundingClientRect();
    const width = preview.offsetWidth;
    const height = preview.offsetHeight;
    // Sit just right of the pointer, vertically centred on it, and inside the ledger's width.
    const left = Math.min(Math.max(x - box.left + 32, 0), box.width - width);
    const top = y - box.top - height / 2;
    if (instant || reduced.matches) preview.classList.add('is-placing');
    preview.style.setProperty('--preview-x', `${left}px`);
    preview.style.setProperty('--preview-y', `${top}px`);
    if (instant || reduced.matches) {
      preview.getBoundingClientRect();
      preview.classList.remove('is-placing');
    }
  };
  const show = (row: HTMLElement) => {
    text.textContent = row.dataset.preview ?? '';
    preview.classList.add('is-active');
  };
  const hide = () => preview.classList.remove('is-active');

  ledger.querySelectorAll<HTMLElement>('[data-preview]').forEach((row) => {
    row.addEventListener('pointerenter', (event) => {
      if (!fine.matches || event.pointerType !== 'mouse') return;
      moveTo(event.clientX, event.clientY, !preview.classList.contains('is-active'));
      show(row);
    });
    row.addEventListener('pointermove', (event) => {
      if (preview.classList.contains('is-active')) moveTo(event.clientX, event.clientY);
    });
    row.addEventListener('pointerleave', hide);
    row.addEventListener('focus', () => {
      if (!row.matches(':focus-visible')) return;
      const box = row.getBoundingClientRect();
      moveTo(box.right - preview.offsetWidth - 96, box.top + box.height / 2, true);
      show(row);
    });
    row.addEventListener('blur', hide);
  });
});

export {};
