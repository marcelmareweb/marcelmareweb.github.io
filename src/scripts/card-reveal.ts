// Cards below the fold fade and rise as they scroll into view. Without JavaScript, or with
// reduced motion, every card is simply shown; cards already on screen are never hidden.
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const cards = document.querySelectorAll<HTMLElement>('[data-card]');

if (!reduced.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('is-pending');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
  );

  cards.forEach((card) => {
    if (card.getBoundingClientRect().top < innerHeight) return;
    card.classList.add('is-pending');
    observer.observe(card);
  });
}

// Keyboard focus lands on the title link; bring the whole card into view, and never leave it hidden.
// The adjustment runs after the browser's own focus scroll, and scrolls by the exact shortfall so it
// also works for sticky stacked sheets.
cards.forEach((card) =>
  card.addEventListener('focusin', () => {
    card.classList.remove('is-pending');
    requestAnimationFrame(() => {
      const header = document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 0;
      const rect = card.getBoundingClientRect();
      const margin = 16;
      if (rect.height > innerHeight - header - margin * 2) return;
      if (rect.bottom > innerHeight - margin) window.scrollBy({ top: rect.bottom - innerHeight + margin, behavior: 'instant' });
      else if (rect.top < header + margin) window.scrollBy({ top: rect.top - header - margin, behavior: 'instant' });
      if (card.scrollIntoView && (rect.left < 0 || rect.right > innerWidth)) card.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
  }),
);

export {};
