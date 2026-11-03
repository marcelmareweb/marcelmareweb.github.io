// Stacking sheets: while the next sheet in a .card-stack slides over a stuck sheet, the covered
// sheet shrinks slightly and its content dims, in step with scroll. Layout and stickiness are
// CSS; outside the stacking media query every sheet is left at full size.
const stacking = matchMedia('(min-width: 1024px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)');
const stacks = [...document.querySelectorAll<HTMLElement>('.card-stack')];

const update = () => {
  stacks.forEach((stack) => {
    const items = [...stack.children] as HTMLElement[];
    items.forEach((item, index) => {
      const card = item.querySelector<HTMLElement>('[data-card]');
      const next = items[index + 1];
      if (!card) return;
      let covered = 0;
      if (stacking.matches && next) {
        const own = item.getBoundingClientRect();
        const incoming = next.getBoundingClientRect();
        covered = Math.min(Math.max((own.bottom - incoming.top) / Math.max(own.height - 20, 1), 0), 1);
      }
      card.style.setProperty('--stack-scale', String(1 - 0.05 * covered));
      card.style.setProperty('--stack-content', String(1 - 0.75 * covered));
    });
  });
};

if (stacks.length) {
  let frame = 0;
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(() => { frame = 0; update(); });
  };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  stacking.addEventListener('change', schedule);
  update();

  // Keyboard focus on a covered sheet scrolls back until the sheet after it no longer covers it.
  stacks.forEach((stack) =>
    stack.addEventListener('focusin', (event) => {
      if (!stacking.matches) return;
      const item = (event.target as HTMLElement).closest<HTMLElement>('.card-stack > li');
      const next = item?.nextElementSibling as HTMLElement | null;
      if (!item || !next) return;
      for (let attempt = 0; attempt < 4; attempt++) {
        const overlap = item.getBoundingClientRect().bottom + 24 - next.getBoundingClientRect().top;
        if (overlap <= 1) break;
        window.scrollBy({ top: -overlap, behavior: 'instant' });
      }
      update();
    }),
  );
}

export {};
