/* Local, fictional design exercise. No storage, requests, scoring or advice. */
(() => {
  document.querySelectorAll('.mobile-nav').forEach(menu => {
    menu.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.open) {
        event.preventDefault();
        menu.open = false;
        menu.querySelector('summary').focus({preventScroll:true});
      }
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
  });
  const root = document.querySelector('[data-formation]');
  if (!root) return;
  const controls = [...root.querySelectorAll('input[data-choice]')];
  const status = root.querySelector('[data-status]');
  const output = root.querySelector('[data-consequences]');
  const items = {
    market: {name:'Enter another market', needs:'Customer evidence and a local delivery capability', constraint:'Leadership attention', question:'What evidence would justify entering this market?'},
    customers: {name:'Deepen customer relationships', needs:'Customer research and service capacity', constraint:'Leadership attention', question:'Which customers and unmet needs deserve attention?'},
    reliability: {name:'Improve operational reliability', needs:'Process observation and time for operational learning', constraint:'Change capacity', question:'Which recurring failures matter, and what sustains them?'},
    ai: {name:'Introduce AI into a workflow', needs:'Workflow evidence, review rights and retained human practice', constraint:'Change capacity', question:'Where can a person meaningfully challenge or stop an action?'}
  };
  function render(message) {
    const backed = controls.filter(c => c.checked).map(c => c.value);
    const deferred = Object.keys(items).filter(id => !backed.includes(id));
    const full = backed.length === 2;
    root.dataset.state = backed.length ? (full ? 'committed' : 'exploring') : 'open';
    controls.forEach(c => {
      const node = root.querySelector(`[data-node="${c.value}"]`);
      const active = backed.includes(c.value);
      node.classList.toggle('is-backed', active);
      node.classList.toggle('is-deferred', full && !active);
      node.querySelector('.status-word').textContent = active ? 'BACKED' : full ? 'DEFERRED' : 'OPEN';
      c.closest('label').querySelector('small').textContent = active ? 'BACKED' : full ? 'DEFERRED' : 'OPEN';
      root.querySelectorAll(`[data-link="${c.value}"]`).forEach(l => l.classList.toggle('is-backed', active));
    });
    const shared = full && items[backed[0]].constraint === items[backed[1]].constraint;
    root.querySelector('.constraint-ring').classList.toggle('is-contested', shared);
    root.querySelector('[data-constraint-label]').textContent = shared ? 'SHARED DEMAND' : 'CAPACITY';
    status.textContent = message || `${backed.length} of 2 commitments selected. ${full ? 'Revise by clearing a choice.' : 'Choose a priority to reveal its implications.'}`;
    output.replaceChildren();
    const heading = document.createElement('h3');
    heading.textContent = backed.length ? 'Your provisional formation' : 'A choice creates obligations.';
    output.append(heading);
    if (!backed.length) {
      const p = document.createElement('p');
      p.textContent = 'Back a priority to reveal what it requires. Nothing is selected for you. The unchosen alternatives remain visible.';
      output.append(p);
      return;
    }
    const dl = document.createElement('dl');
    const rows = [
      ['Commitments', backed.map(id => items[id].name).join('; ') + '.'],
      ['Dependencies', backed.map(id => items[id].needs).join('; ') + '.'],
      ['Trade-off', shared ? `Both commitments draw on ${items[backed[0]].constraint.toLowerCase()}. The exercise leaves this conflict unresolved.` : 'Different resource demands still compete for organisational time. Selecting these priorities does not establish feasibility.'],
      [full ? 'Deferred for now' : 'Still open', deferred.map(id => items[id].name).join('; ') + '.'],
      ['Questions to investigate', backed.map(id => items[id].question).join(' ')]
    ];
    rows.forEach(([term,description]) => {const dt=document.createElement('dt');dt.textContent=term;const dd=document.createElement('dd');dd.textContent=description;dl.append(dt,dd);});
    output.append(dl);
  }
  controls.forEach(control => control.addEventListener('change', () => {
    if (controls.filter(c => c.checked).length > 2) {
      control.checked = false;
      render('Capacity is limited to two commitments. Clear a selected priority before backing another. Your earlier choices are unchanged.');
      return;
    }
    render();
  }));
  root.querySelector('[data-reset]').addEventListener('click', () => {controls.forEach(c => c.checked=false);render('Choices reset. All four alternatives are open.');});
  root.querySelector('[data-enhancement]').hidden = false;
  root.querySelector('[data-worked-example]').open = false;
  render();
})();
