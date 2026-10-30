> Historical planning record. Superseded for implementation by [the definitive direction](../../docs/design-reference/DEFINITIVE_DIRECTION.md) and the current AGENTS.md. Earlier palette, serif, positioning and approval-stage choices below are archival, not active instructions.

# Phase 3 design-system proposal

This is an isolated proposal, not a change to `src/styles/global.css`. Preferred visual direction: B, pending approval.

The user selected warm mineral B following the [focused colour review](COLOUR_REVIEW.md). The table below is the selected palette. The earlier palette remains in the original control specimen. Phase 4 approval remains separate.

## Colour

| Token | Value | Role |
|---|---|---|
| Ink | `#121211` | Text, dark composition, primary controls |
| Paper | `#F6F4F0` | Main reading surface; text on ink |
| Signal | `#FFFF00` | Backed commitments, focal emphasis, invitation |
| Muted ink | `#5C5C58` | Secondary text on paper |
| Muted light | `#BDBBB5` | Secondary text on ink |
| Surface | `#ECE8E1` | Evidence background |
| Decorative rule | `#D4D0C7` | Layout divisions on paper; never the sole control/state boundary |
| Interactive dark rule | `#77766F` | Selection rows and dividers on ink |

Yellow does not mean successful, approved or correct. BACKED and DEFERRED labels carry the selection meaning. Never place yellow body text on cream. Use ink text on signal, paper text on ink, and muted pairs only on their specified surfaces. Contrast calculations and limits belong in the QA report.

## Type and reading

- Candidate commercial family: Archivo, 400/500/600; reserve 700–800 for A/C comparisons rather than loading extra families.
- Candidate editorial family: Newsreader, 400, optically suitable for reading. Keep optional and route-specific until approved.
- Current control: Newsreader, Plus Jakarta Sans and JetBrains Mono.
- Metadata: JetBrains Mono or system monospace; avoid turning ordinary paragraphs into system labels.
- Body: 16–18px, approximately 1.6 line height; reading specimen 19.2px/1.65. Main copy max 60–65 characters.
- Display: fluid sizes, approximately 48–145px on the reference desktop and 39–68px on narrow screens; exact natural wrapping is evaluated in-browser. Retain words and punctuation, not brittle line breaks.
- Long uppercase display is limited to the approved provocation; normal-case capability/project headings maintain variety.
- Don't shrink functional text to force a preferred arrangement. Diagram text is supplementary to the readable controls and consequences, not an alternative source of essential information.

## Grid and spacing

Use a conceptual 12-column desktop grid, eight-column tablet and four-column mobile grid. Individual components can implement the same alignments with CSS Grid fractions rather than twelve empty columns.

Base spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px. Container: maximum 1440px, with fluid 20–80px outer gutters. Major movement spacing: approximately 64–144px; internal groups 24–48px. Do not apply the largest spacing uniformly.

Hero copy and CTA precede the interaction on mobile. Capability descriptions remain expanded. Project art and account stack without a carousel. Touch targets in the proposal aim for 44–52px, exceeding the 24px WCAG 2.2 minimum where applicable.

## Component principles

| Component | Visual behaviour | Semantic/accessibility contract |
|---|---|---|
| Header | Restrained brand, six destinations, distinct enquiry | Landmark, active page, meaningful labels; mobile disclosure works without JS |
| Hero | One provocation, immediate explanation, two actions | One h1; no text hidden by animation; CTA independent of exercise |
| Formation | Authored field, constraints and exclusions | Equivalent native inputs plus readable consequence text; no pointer-only operation |
| Capability | Large editorial heading with substantive description | Entire description present; no hover-only content or icon-only meaning |
| Project | Situation, question, contribution, learning | Role/provenance explicit; outcomes distinguished from interpretation |
| Method | Narrow explanation connected to evidence | Attribution, context and limits |
| Instrument | Inspectable structure | Status: real, adapted or illustrative; no unsupported validation claim |
| Engagement | Process and intended outputs | Proposed format/scoping clearly stated; no unapproved price or guaranteed result |
| Invitation | A clear organisational question and next step | Provider-confirmed receipt in eventual form; accessible direct email |

## Motion language

Orientation, selection and reconsideration are the only reasons to move.

- Input/hover feedback: 160ms.
- Relationship colour and line emphasis: 200–240ms.
- Optional later spatial transition: no more than 320ms, only when it explains a state change. The Phase 3 implementation deliberately keeps positions stable.
- Easing: `cubic-bezier(.2,.8,.2,1)`; immediate interruption on another action.
- No autonomous convergence, looping, staggered text entrance, scroll hijacking, cursor replacement or mandatory completion.
- Reduced motion: no transitions, transforms or smooth scrolling triggered by state updates.

## Progressive enhancement and performance

The prototype consists of static HTML, scoped-by-directory CSS and one classic deferred JavaScript file. Event handlers change only state labels, classes and the consequence text. No frameworks, animation packages, storage, analytics or network requests are needed for the interaction.

Phase 4 target budgets, to be measured rather than promised: interaction module <= 5KB gzip; initial page JavaScript <= 10KB gzip; commercial-page critical fonts <= 80KB transferred; editorial fonts <= 150KB total after subsetting; initial page assets <= 250KB excluding optional below-fold images. Current Newsreader comparison font is deliberately broader and is not approved production delivery.

Load the chosen family and necessary weights only; no runtime font services. Reserve dimensions for assets, use the existing logo without distortion, and avoid preloading comparison/control fonts in production. Neither the review gallery nor its screenshots ship with the public site.

References: [WCAG contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [WCAG target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html). A proposal targeting WCAG 2.2 AA is not a conformance certification.
