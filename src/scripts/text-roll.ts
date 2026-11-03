// Character roll on text links: each letter slides up one line and an identical copy rises
// from below. The readable label stays in a visually hidden span; the split letters are
// aria-hidden. Nothing is split under reduced motion, so links stay plain text.
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

const split = (link: HTMLElement) => {
  const node = [...link.childNodes].find((child) => child.nodeType === Node.TEXT_NODE && child.textContent?.trim());
  if (!node?.textContent) return;
  const raw = node.textContent;
  const label = raw.trim();
  const lead = raw.slice(0, raw.indexOf(label));
  const trail = raw.slice(raw.indexOf(label) + label.length);

  const roll = document.createElement('span');
  roll.className = 'roll';
  const hidden = document.createElement('span');
  hidden.className = 'sr-only';
  hidden.textContent = label;
  const visual = document.createElement('span');
  visual.className = 'roll-visual';
  visual.setAttribute('aria-hidden', 'true');

  let index = 0;
  label.split(' ').forEach((word, wordIndex) => {
    if (wordIndex > 0) visual.append(' ');
    const wordSpan = document.createElement('span');
    wordSpan.className = 'roll-word';
    [...word].forEach((char) => {
      const charSpan = document.createElement('span');
      charSpan.className = 'roll-char';
      charSpan.style.setProperty('--c', String(index++));
      charSpan.textContent = char;
      wordSpan.append(charSpan);
    });
    visual.append(wordSpan);
  });

  roll.append(hidden, visual);
  node.replaceWith(...[lead, roll, trail].filter(Boolean));
  link.dataset.rollReady = '';
};

if (!reduced.matches) {
  document.querySelectorAll<HTMLElement>('.text-link, [data-roll]').forEach((link) => {
    if (!('rollReady' in link.dataset)) split(link);
  });
}

export {};
