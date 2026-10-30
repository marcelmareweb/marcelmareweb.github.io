import { bindFormationChoices } from './formation-interactions';

document.querySelectorAll<HTMLElement>('[data-masterclass]').forEach((root) => {
  const cards = [...root.querySelectorAll<HTMLButtonElement>('[data-masterclass-card]')];
  const sessions = [...root.querySelectorAll<HTMLDetailsElement>('[data-masterclass-session]')];
  const progression = root.querySelector<HTMLElement>('[data-masterclass-progression]');
  const previewBox = root.querySelector<HTMLElement>('[data-masterclass-preview]');
  const status = root.querySelector<HTMLElement>('[data-masterclass-status]');
  const empty = root.querySelector<HTMLElement>('[data-masterclass-empty]');
  const previews = [...root.querySelectorAll<HTMLElement>('[data-masterclass-preview-day]')];
  if (!cards.length || !sessions.length || !progression || !previewBox || !status || !empty) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let selected: string | null = null;
  let preview: string | null = null;
  const behavior = (): ScrollBehavior => (reduced.matches ? 'instant' : 'smooth');

  function render() {
    cards.forEach((card) => {
      const id = card.dataset.masterclassCard;
      const active = id === selected;
      card.classList.toggle('is-selected', active);
      card.classList.toggle('is-preview', id === preview);
      card.setAttribute('aria-expanded', String(active));
      const cue = card.querySelector('[data-card-state]');
      if (cue) cue.textContent = active ? 'Session open' : 'Explore day';
    });
    sessions.forEach((session) => {
      const active = session.dataset.masterclassSession === selected;
      session.hidden = !active;
      session.open = active;
    });
    root.querySelectorAll<HTMLButtonElement>('[data-masterclass-go]').forEach((control) => {
      if (control.dataset.masterclassGo === selected) control.setAttribute('aria-current', 'step');
      else control.removeAttribute('aria-current');
    });
    previewBox!.hidden = selected !== null;
    empty!.hidden = preview !== null;
    previews.forEach((panel) => {
      panel.hidden = panel.dataset.masterclassPreviewDay !== preview;
    });
    root.dataset.state = selected ? 'expanded' : preview ? 'exploring' : 'formation';
  }

  function closeSession() {
    const prior = selected;
    selected = null;
    status!.textContent = 'Back to the five-day formation. Choose any strategic question.';
    interaction.clearPreview();
    const card = cards.find((item) => item.dataset.masterclassCard === prior);
    card?.focus({ preventScroll: true });
    card?.scrollIntoView({ block: 'center', behavior: behavior() });
  }

  function openSession(id: string) {
    const session = sessions.find((item) => item.dataset.masterclassSession === id);
    const card = cards.find((item) => item.dataset.masterclassCard === id);
    if (!session || !card) return;
    selected = id;
    const stage = card.querySelector('.card-stage')?.textContent;
    status!.textContent = `${stage} session open. All five days remain available in the programme progression.`;
    render();
    session.scrollIntoView({ block: 'start', behavior: behavior() });
    session.querySelector<HTMLElement>('h3')?.focus({ preventScroll: true });
  }

  const interaction = bindFormationChoices(root, {
    selector: '[data-masterclass-card]',
    attribute: 'data-masterclass-card',
    onPreview(id) {
      preview = id;
      render();
    },
    onActivate(id) {
      if (selected === id) closeSession();
      else openSession(id);
    },
  });
  root.querySelectorAll<HTMLButtonElement>('[data-masterclass-go]').forEach((control) => {
    control.addEventListener('click', () => {
      if (control.dataset.masterclassGo) openSession(control.dataset.masterclassGo);
    });
  });
  root
    .querySelectorAll<HTMLButtonElement>('[data-masterclass-return]')
    .forEach((control) => control.addEventListener('click', closeSession));
  cards.forEach((card, index) =>
    card.addEventListener('keydown', (event) => {
      const moves: Record<string, number> = {
        ArrowRight: (index + 1) % cards.length,
        ArrowDown: (index + 1) % cards.length,
        ArrowLeft: (index + cards.length - 1) % cards.length,
        ArrowUp: (index + cards.length - 1) % cards.length,
        Home: 0,
        End: cards.length - 1,
      };
      if (!(event.key in moves)) return;
      event.preventDefault();
      cards[moves[event.key]].focus();
    }),
  );
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && selected) {
      event.preventDefault();
      closeSession();
    }
  });
  root.dataset.enhanced = 'true';
  root.querySelector<HTMLElement>('[data-masterclass-fallback]')?.setAttribute('hidden', '');
  root.querySelectorAll<HTMLElement>('[data-masterclass-enhancement]').forEach((element) => {
    element.hidden = false;
  });
  progression.hidden = false;
  const measureProgression = () =>
    root.style.setProperty('--progression-height', `${progression.offsetHeight}px`);
  new ResizeObserver(measureProgression).observe(progression);
  measureProgression();
  render();
});
