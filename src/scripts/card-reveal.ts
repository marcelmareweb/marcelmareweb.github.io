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
cards.forEach((card) =>
  card.addEventListener('focusin', () => {
    card.classList.remove('is-pending');
    const header = document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 0;
    const rect = card.getBoundingClientRect();
    const fits = rect.height <= innerHeight - header;
    if (fits && (rect.top < header || rect.bottom > innerHeight)) card.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }),
);

export {};
