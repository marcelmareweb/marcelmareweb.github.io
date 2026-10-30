/** Huge-informed pill reveal: measure only on entry/exit, not on every pointer move. */
document.querySelectorAll<HTMLElement>('.button, .btn-huge').forEach((button) => {
  const placeCircle = (clientX?: number, clientY?: number) => {
    const bounds = button.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    const x = clientX === undefined ? bounds.width / 2 : clientX - bounds.left;
    const y = clientY === undefined ? bounds.height / 2 : clientY - bounds.top;
    const distanceFromCentre = Math.abs(((x - bounds.width / 2) / (bounds.width / 2)) * 50);
    // The reference grows from 115% at the centre to 215% at either horizontal edge.
    const diameter = bounds.width * ((115 + 2 * Number(distanceFromCentre.toFixed(1))) / 100);

    // Account for our 1px border so the circle starts at the actual pointer position.
    button.style.setProperty('--button-circle-x', `${x - button.clientLeft}px`);
    button.style.setProperty('--button-circle-y', `${y - button.clientTop}px`);
    button.style.setProperty('--button-circle-size', `${diameter}px`);
  };

  button.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'touch') return;
    placeCircle(event.clientX, event.clientY);
  });
  button.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'touch') return;
    if (button.matches(':focus-visible')) placeCircle();
    else placeCircle(event.clientX, event.clientY);
  });
  button.addEventListener('focus', () => {
    if (button.matches(':focus-visible')) placeCircle();
  });
});
