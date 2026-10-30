# Huge reference investigation → The Spotted Ape

Reference investigated **29 October 2026** using the live rendered site in Playwright. The reference evidence is retained. The current redesign follows the [Definitive direction](DEFINITIVE_DIRECTION.md), which supersedes earlier proposals and historical local-site observations.

The local implementation and checks are documented in [Redesign review](REDESIGN_REVIEW.md).

The later approved five-day executive programme is specified in [Masterclass implementation](MASTERCLASS_IMPLEMENTATION.md), including the shared Find Formation behaviour, programme-only curriculum and verification evidence.

Start with [Definitive direction](DEFINITIVE_DIRECTION.md), then consult the measured reference analysis and implementation strategy. The active identity is black, white and yellow; oversized sans-serif typography; independent strategic decision and behavioural design.

| Document | Contents |
| --- | --- |
| [DESIGN_ANALYSIS.md](DESIGN_ANALYSIS.md) | Scope, page-by-page findings, visual language, responsive observations, aesthetic principles, and local-site audit |
| [DESIGN_TOKENS.md](DESIGN_TOKENS.md) | Extracted reference tokens, measured values, and a separate proposed black/white/yellow system |
| [COMPONENT_LIBRARY.md](COMPONENT_LIBRARY.md) | Component anatomy, dimensions, states, responsive variants, and proposed Astro mapping |
| [INTERACTION_PATTERNS.md](INTERACTION_PATTERNS.md) | Actual interaction tests, state changes, navigation, media, filters, and accessibility observations |
| [ANIMATION_SPECIFICATIONS.md](ANIMATION_SPECIFICATIONS.md) | CSS and JavaScript timings, easing, scroll mechanisms, reduced motion, and proposed motion budget |
| [IMPLEMENTATION_STRATEGY.md](IMPLEMENTATION_STRATEGY.md) | Original art direction, concrete page composition, priorities, Astro architecture, and future verification |

Evidence is in [evidence/](evidence/). Rendered captures are in [screenshots/](screenshots/); [SCREENSHOT_INDEX.md](SCREENSHOT_INDEX.md) lists every capture and its dimensions. The [desktop contact sheet](screenshots/contact-sheet-desktop.jpg) and [mobile contact sheet](screenshots/contact-sheet-mobile.jpg) are browsing aids, not substitutes for the individual images.

## Evidence convention

- **[O] Observed:** visible behavior, accessibility/DOM inspection, computed style, or an actual control activation.
- **[S] Source-confirmed:** a declaration or mechanism found in the loaded public stylesheet or JavaScript. A declaration's presence does not prove that every instance uses it.
- **[I] Inferred:** interpretation of the system or intent, explicitly separated from implementation facts.
- **[P] Proposed:** an original specification for The Spotted Ape; it is not an observed Huge detail or implemented change.

Measurements use CSS pixels, a 16px root, and the captured viewport. Dynamic media, logo cycling, lazy reveals, and scroll progress can change subsequent captures. Browser viewport tests do not establish behavior on physical touch devices or in every browser engine.
