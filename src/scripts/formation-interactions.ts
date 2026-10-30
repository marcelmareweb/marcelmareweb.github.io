interface FormationInteractions {
  selector: string;
  attribute: string;
  onPreview: (id: string | null) => void;
  onActivate: (id: string) => void;
}

/** Shared native-card behaviour for Find Formation and its programme variation. */
export function bindFormationChoices(root: Element, options: FormationInteractions) {
  let hovered: string | null = null;
  let focused: string | null = null;
  const preview = () => options.onPreview(hovered || focused);

  root.querySelectorAll<HTMLButtonElement>(options.selector).forEach((button) => {
    const id = button.getAttribute(options.attribute);
    if (!id) return;
    button.disabled = false;
    button.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'touch') return;
      hovered = id;
      preview();
    });
    button.addEventListener('pointerleave', () => {
      hovered = null;
      preview();
    });
    button.addEventListener('focus', () => {
      if (!button.matches(':focus-visible')) return;
      hovered = null;
      focused = id;
      preview();
    });
    button.addEventListener('blur', () => {
      focused = null;
      preview();
    });
    button.addEventListener('click', () => options.onActivate(id));
  });

  return {
    clearPreview() {
      hovered = null;
      focused = null;
      preview();
    },
  };
}
