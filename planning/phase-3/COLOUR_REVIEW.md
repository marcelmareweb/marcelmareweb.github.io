> Historical planning record. Superseded for implementation by [the definitive direction](../../docs/design-reference/DEFINITIVE_DIRECTION.md) and the current AGENTS.md. Earlier palette, serif, positioning and approval-stage choices below are archival, not active instructions.

# Colour review before selecting direction B

Status: recommendation for review, not approval to start Phase 4. Existing A/B/C specimens are preserved. Date: 24 October 2026.

Outcome: the user selected **warm mineral B**. The main B specimen now uses that palette, and the earlier B remains in `prototype/direction-b-control.html`. The observations below document the review that led to the choice; Phase 4 remains unauthorised.

Open [the controlled colour specimens](prototype/colour-review.html). They repeat B's content, typography, geometry and state examples, changing the colour treatment only. The swatches and labels remain readable without JavaScript.

## Findings

Direction B's composition is recommended, but its current palette should not be treated as settled. A's dark field, B's cream field and C's yellow field are different colour distributions; choosing B does not require accepting every original colour value.

1. **Brand yellow:** lossless decoding of `public/logo.png` found 304,610 fully opaque/near-opaque yellow pixels at RGB(255,255,0), the dominant yellow in that file. B's `#EFFF00` lowers the red channel by 16 and appears slightly greener. The other monkey asset contains tonal variation; sampling one asset does not establish a formal brand standard. Recommend `#FFFF00` as the interface yellow for closer continuity with the main mark, subject to approval. Do not recolour either logo.
2. **Neutral temperature:** current `#E9E7DE`, `#5B5D55`, `#BFC2B6` and several line colours introduce olive undertones. That is a design judgement, not a contrast failure. The combination with yellow-green can make the whole palette feel more botanical than the intended black/yellow identity.
3. **Colour hierarchy:** B sensibly reserves a dark field for the Choice and uses cream for reading. Keep this distribution. C's large yellow hero competes more strongly with the interaction; A's persistent dark treatment gives less surface contrast between explanation and exercise.
4. **Yellow on cream:** current signal/paper is approximately 1.00:1. The underline may remain decoration; it cannot be the only focus, state or essential relationship indicator. Small capability signs retain a contrasting ink boundary.
5. **Rules:** current light rule/paper is 1.54:1 and rule/evidence 1.38:1. Fine for decorative divisions, insufficient when a line alone conveys an essential control boundary or relationship. Keep separate decorative and functional tokens.
6. **Semantic overload:** yellow currently marks selection, labels, constraints and decoration. Reserve strong fills for backed commitments. A constraint can use yellow as emphasis only with an explicit SHARED DEMAND label and distinct dashed treatment. Do not use a yellow fill to imply that conflict has been solved.
7. **Selection bug:** global `::selection` uses `var(--ink)`, while B's project art locally overrides `--ink` to pale text. Selecting that panel's text can therefore yield pale lettering on yellow (approximately 1.00:1). Use independent selection foreground/background roles in the later palette revision. The colour specimens demonstrate that separation; the original B file remains a control.

## Options

| Role | Current B — control | Warm mineral B — recommended | Dark B — alternative |
|---|---|---|---|
| Main text | `#10110F` | `#121211` | `#F6F4F0` |
| Reading surface | `#F5F3ED` | `#F6F4F0` | `#121211` |
| Evidence surface | `#E9E7DE` | `#ECE8E1` | `#1D1D1B` |
| Brand signal | `#EFFF00` | `#FFFF00` | `#FFFF00` |
| Secondary text | `#5B5D55` | `#5C5C58` | `#BDBBB5` |
| Secondary on dark | `#BFC2B6` | `#BDBBB5` | `#BDBBB5` |
| Decorative light rule | `#C6C7BB` | `#D4D0C7` | Use the dark-surface functional rule where needed |
| Functional rule | `#73776A` on ink | `#77766F` | `#77766F` |

Warm mineral B connects the new black/yellow direction to the established Namib Stone, Elevated Sand and Obsidian neutrals in AGENTS.md. It does not bring terracotta or ochre back as competing interface accents. The yellow stays intense; reducing its area matters more than trying to make an almost-neon yellow into a quiet body-text colour.

Dark B is a legitimate brand-forward alternative, not a dark-mode feature. Supporting both themes would require its own implementation and QA decision. The review does not add a production theme toggle.

## Contrast calculations

Calculated using WCAG relative luminance. Ratios describe specific pairs, not whole-page conformance.

| Current pair | Ratio | Use |
|---|---:|---|
| Ink / paper | 17.06:1 | Strong text contrast |
| Muted ink / paper | 6.02:1 | Ordinary text threshold met |
| Muted ink / evidence | 5.40:1 | Ordinary text threshold met |
| Muted light / ink | 10.47:1 | Strong text contrast |
| Signal / ink | 17.11:1 | Strong graphic/text contrast |
| Signal / paper | 1.00:1 | Decoration only; use an ink boundary for meaningful marks |
| Light rule / paper | 1.54:1 | Decorative separation only |
| Functional dark rule / ink | 4.13:1 | Functional line threshold met |
| Button text / hover fill | 10.93:1 | Strong text contrast |

The recommended palette retains strong primary and secondary text pairs and gives functional rules their own role. The exact recommended-pair calculations are included in the colour specimens.

WCAG references: [ordinary text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) requires 4.5:1, with exceptions including large text; [essential non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) uses 3:1; [use of colour](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) requires visible information beyond colour alone.

## Recommendation

Proceed with **B's composition and a warm mineral palette**, after approval:

- Stone for sustained reading, sand for evidence, obsidian for the Choice.
- Existing-logo yellow for backed choices and a limited invitation accent.
- Dark body text on yellow; never yellow text on stone.
- Strong functional rules separate from quiet editorial hairlines.
- Dedicated selection/focus tokens for each surface; do not infer them from a locally inverted text token.
- Preserve BACKED/DEFERRED words, dash patterns, native checked states and unresolved-question copy.
- Keep the full-width yellow Invitation as a review choice. If it feels too dominant in the full page, use stone with a yellow CTA; do not add another accent hue.

Before Phase 4: approve the neutral temperature, yellow value and large yellow Invitation treatment. Until then, B remains a composition recommendation with its palette under review.

## Verification of the review artefact

The new colour comparison was rendered in headless Chrome at 1440×1200, inspected visually and captured in `screenshots/colour-review-desktop.png`. Local references and same-page anchors resolve. The existing B and shared study stylesheet were not changed, so the earlier interaction results remain attached to their original specimen. The new static comparison is not represented as having undergone that full interaction/viewport test suite. No application source, logo pixels or deployment settings changed.
