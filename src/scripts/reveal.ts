// Entrances below the fold. Section headlines rise line by line from behind a mask; other
// [data-reveal] elements fade and rise. Anything on screen at load is never hidden, and
// nothing is hidden under reduced motion or without JavaScript. A split headline is restored
// to its original markup as soon as its lines have landed, so it rewraps normally.
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const HEADLINES = 'main h2.section-title, main h2.h2, main h2.invitation-title, main .choice .section-heading h2';
const LINE_MS = 600;
const LINE_STAGGER_MS = 60;

// Only headlines made of plain text and line breaks are split; anything richer just fades and rises.
const splittable = (heading: HTMLElement) =>
  [...heading.childNodes].every((node) => node.nodeType === Node.TEXT_NODE || (node as Element).tagName === 'BR');

const splitIntoLines = (heading: HTMLElement) => {
  const original = heading.innerHTML;
  const words: HTMLSpanElement[] = [];
  heading.textContent = '';
  const source = new DOMParser().parseFromString(`<div>${original}</div>`, 'text/html').body.firstElementChild!;
  source.childNodes.forEach((node) => {
    if (node.nodeType !== Node.TEXT_NODE) {
      heading.append(document.createElement('br'));
      return;
    }
    (node.textContent ?? '').split(/\s+/).filter(Boolean).forEach((word) => {
      const span = document.createElement('span');
      span.textContent = word;
      heading.append(span, ' ');
      words.push(span);
    });
  });

  // Group words by their rendered line, then rebuild the heading as one mask per line.
  const lines: string[][] = [];
  let top: number | null = null;
  words.forEach((word) => {
    if (top === null || Math.abs(word.offsetTop - top) > 2) {
      lines.push([]);
      top = word.offsetTop;
    }
    lines[lines.length - 1].push(word.textContent ?? '');
  });
  heading.textContent = '';
  lines.forEach((line, index) => {
    const mask = document.createElement('span');
    mask.className = 'line-mask';
    const inner = document.createElement('span');
    inner.className = 'line-inner';
    inner.style.setProperty('--l', String(index));
    inner.textContent = line.join(' ');
    mask.append(inner);
    // A space between lines keeps the accessible name readable while the heading is split.
    heading.append(mask, ' ');
  });
  window.setTimeout(() => {
    heading.innerHTML = original;
  }, LINE_MS + LINE_STAGGER_MS * (lines.length - 1) + 50);
};

if (!reduced.matches && 'IntersectionObserver' in window) {
  const reveal = async (element: HTMLElement) => {
    if (element.matches(HEADLINES) && splittable(element)) {
      await document.fonts.ready;
      splitIntoLines(element);
    } else {
      element.classList.add('is-rising');
    }
    element.classList.remove('is-pending');
  };

  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        reveal(entry.target as HTMLElement);
      }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
  );

  document.querySelectorAll<HTMLElement>(`${HEADLINES}, [data-reveal]`).forEach((element) => {
    if (element.closest('[data-card]') || element.getBoundingClientRect().top < innerHeight) return;
    element.classList.add('is-pending');
    observer.observe(element);
  });
}

export {};
