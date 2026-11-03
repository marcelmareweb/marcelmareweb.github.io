// Colour sweep on [data-sweep] paragraphs: words move from the muted colour to full colour in
// step with scroll, from when the paragraph's top reaches 80% of the viewport until its bottom
// reaches 60%. The muted state stays readable; reduced motion and no JavaScript show full colour.
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const paragraphs = [...document.querySelectorAll<HTMLElement>('[data-sweep]')];

if (!reduced.matches && paragraphs.length) {
  const groups = paragraphs.map((paragraph) => {
    const words = (paragraph.textContent ?? '').trim().split(/\s+/);
    paragraph.textContent = '';
    const spans = words.map((word, index) => {
      const span = document.createElement('span');
      span.className = 'sweep-word';
      span.textContent = word;
      paragraph.append(span, index < words.length - 1 ? ' ' : '');
      return span;
    });
    paragraph.classList.add('is-sweeping');
    return { paragraph, spans };
  });

  const update = () => {
    groups.forEach(({ paragraph, spans }) => {
      const box = paragraph.getBoundingClientRect();
      const start = innerHeight * 0.8;
      const travel = start - innerHeight * 0.6 + box.height;
      const progress = Math.min(Math.max((start - box.top) / travel, 0), 1);
      const lit = Math.round(progress * spans.length);
      spans.forEach((span, index) => span.classList.toggle('is-lit', index < lit));
    });
  };
  let frame = 0;
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(() => { frame = 0; update(); });
  };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  update();
}

export {};
