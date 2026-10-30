# Evidence notes

Captured from the live rendered reference and the existing local Astro site on 29 October 2026. This directory preserves computed measurements, bounded DOM excerpts, loaded CSS declarations, public script signatures, and media state. Full-page prose is omitted from the measurement files because it is not needed to establish the design observations.

## Read the records by purpose

- `home-inventory.json`: links, loaded font faces, scripts, and stylesheets at the initial desktop visit.
- `home-dom-desktop.json`: initial home geometry and computed styles, including the 284.8px greeting.
- `css-tokens-and-rules.json`: root custom properties and initial CSS inventory. Use `component-css-rules.json` for the fuller recursive component-rule extraction.
- `component-css-rules.json`: theme roles, grid, optical text alignment, button wipes, character animations, and reduced-motion declarations, including surrounding media/layer context.
- `header-and-logo-css.json` and `fixed-layers.json`: separate header, CTA, logo tile, and progressive-blur measurements.
- `javascript-signatures.json`, `home-js-animation-excerpts.json`, `animation-source-detail.json`: bounded source excerpts supporting library identification and timing/mechanism observations.
- `route-transition-source.json`: actual transition markup and public link-interception/transition excerpts.
- `*-desktop.json`, `*-mobile.json`: per-template headings, content/control samples, geometry, links, fonts, and video/iframe metadata.
- `home-reduced-motion.json`: explicit reduced-motion run. Compare with the normal-motion records; absolute document heights are run-specific.
- `ape-*.json`: the existing local site; these are not captures of an implemented proposal.
- `screenshot-manifest.json`: every individual PNG capture with dimensions, byte size, and reference/local classification.

## Interpretation limits

CSS custom properties are often unresolved strings such as `clamp(...)`; element `fontSize`, `lineHeight`, and rectangles are computed CSS-pixel values. Offscreen reveal targets can have empty text or temporary transforms until activated. Some visual transitions retain outgoing markup, so page content must be scoped by visibility or captured after direct navigation. The mobile Solutions record was recaptured to remove that ambiguity.

Script signatures establish what is present in loaded/prefetched assets. Component attributes, actual interaction tests, and screenshots are used to determine where that code plausibly applies. Raw source excerpts are not an invitation to copy the implementation.

Some browser console entries reported external resource/analytics warnings. Inspection continued through the rendered site. Unsuccessful early automation lookups were retried where reveal timing or duplicate selectors explained them; the reports distinguish successful tests from unverified behavior.

No application source files were changed. The temporary dev server used to inspect the local pages was stopped after the audit.
