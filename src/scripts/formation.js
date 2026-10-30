import { bindFormationChoices } from './formation-interactions';

/* Local, fictional design exercise. No storage, requests, scoring or advice. */
document.querySelectorAll('[data-formation]').forEach((root) => {
  const buttons = [...root.querySelectorAll('[data-node]')];
  const cards = [...root.querySelectorAll('[data-detail]')];
  const selected = new Set();
  const status = root.querySelector('[data-status]');
  const output = root.querySelector('[data-consequences]');
  const reset = root.querySelector('[data-reset]');
  let preview = null;
  let message = '';
  const items = new Map(buttons.map((button) => [button.dataset.node, button.dataset]));

  function render() {
    const full = selected.size === 2;
    const backed = [...selected];
    const shared = full && items.get(backed[0]).constraint === items.get(backed[1]).constraint;
    root.dataset.state = full ? 'committed' : selected.size ? 'exploring' : 'open';
    buttons.forEach((button) => {
      const id = button.dataset.node;
      const active = selected.has(id);
      const inspecting = preview === id;
      button.classList.toggle('is-backed', active);
      button.classList.toggle('is-preview', inspecting);
      button.classList.toggle('is-deferred', full && !active);
      button.setAttribute('aria-pressed', String(active));
      button.querySelector('.status-word').textContent = active
        ? 'Backed'
        : inspecting
          ? 'Preview'
          : full
            ? 'Deferred'
            : 'Open';
      button.querySelector('.choice-mark').textContent = active ? '✓' : '+';
      root.querySelectorAll(`[data-link="${id}"]`).forEach((link) => {
        link.classList.toggle('is-backed', active);
        link.classList.toggle('is-preview', inspecting);
      });
    });
    cards.forEach((card) => {
      const id = card.dataset.detail;
      const active = selected.has(id);
      card.hidden = !active && preview !== id;
      card.classList.toggle('is-backed', active);
      card.classList.toggle('is-preview', !active && preview === id);
      card.querySelector('[data-detail-state]').textContent = active
        ? 'Backed'
        : 'Preview / not selected';
    });
    root.querySelector('[data-empty]').hidden = !!preview || selected.size > 0;
    root.querySelector('.constraint-ring').classList.toggle('is-contested', shared);
    root.querySelector('[data-constraint-label]').textContent = shared
      ? 'Shared demand'
      : 'Capacity';
    // Hover previews never replace the selection announcement or a pinned card.
    const announcement =
      message ||
      `${selected.size} of 2 commitments backed. ${full ? 'Select a backed shape to clear it before choosing another.' : 'Choose a shape to back a priority.'}`;
    if (status.textContent !== announcement) status.textContent = announcement;
    output.hidden = selected.size === 0;
    root.querySelector('[data-trade-off]').textContent = shared
      ? `Both commitments draw on ${items.get(backed[0]).constraint.toLowerCase()}. The exercise leaves this conflict unresolved.`
      : 'Different resource demands still compete for organisational time. Selecting these priorities does not establish feasibility.';
    root.querySelector('[data-alternatives-label]').textContent = full
      ? 'Deferred for now'
      : 'Still open';
    root.querySelector('[data-alternatives]').textContent =
      buttons
        .filter((button) => !selected.has(button.dataset.node))
        .map((button) => button.dataset.name)
        .join('; ') + '.';
  }

  const interaction = bindFormationChoices(root, {
    selector: '[data-node]',
    attribute: 'data-node',
    onPreview(id) {
      preview = id;
      render();
    },
    onActivate(id) {
      if (selected.has(id)) {
        selected.delete(id);
        message = `${items.get(id).name} cleared. ${selected.size} of 2 commitments backed.`;
      } else if (selected.size < 2) {
        selected.add(id);
        message = `${items.get(id).name} backed. ${selected.size} of 2 commitments backed.`;
      } else {
        message =
          'Capacity is limited to two commitments. Select a yellow shape to clear it before backing another. Your earlier choices are unchanged.';
      }
      render();
    },
  });
  reset.addEventListener('click', () => {
    selected.clear();
    message = 'Choices reset. All four alternatives are open.';
    interaction.clearPreview();
  });
  root.querySelectorAll('[data-enhancement]').forEach((element) => {
    element.hidden = false;
  });
  root.querySelector('[data-worked-example]').open = false;
  render();
});
