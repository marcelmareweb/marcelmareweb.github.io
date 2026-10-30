# Find Formation — detailed interaction specification

Status: functional isolated prototype, subject to approval. Concept: Choose what to back. Visual direction: Constellations of Judgement.

## Meaning

A formation is a set of commitments, dependencies, exclusions and unresolved questions. It does not demonstrate that the chosen strategy is optimal. The field is an authored editorial composition; it is not an AI-generated recommendation or a generic animated network.

## Fictional scenario

A fictional organisation has capacity for up to two commitments. The limit and resource relationships are explicit authored constraints, not an assertion about organisations in general. No real business data is requested, stored or transmitted.

| Alternative | Dependency | Shared demand | Open question |
|---|---|---|---|
| Enter another market | Customer evidence; local delivery capability | Leadership attention | What evidence would justify entering? |
| Deepen customer relationships | Customer research; service capacity | Leadership attention | Which customers and unmet needs matter? |
| Improve operational reliability | Process observation; operational learning time | Change capacity | Which failures matter, and what sustains them? |
| Introduce AI into a workflow | Workflow evidence; review rights; retained practice | Change capacity | Where can a person challenge or stop an action? |

The constraints do not calculate the cost of these alternatives. They expose questions and interdependence without pretending to solve them.

## Composition

Four offset typographic slips occupy a bounded field. Their connector routes terminate at different positions on a finite capacity rail. Dependency labels remain in position. Brackets keep assumptions and consequences visibly open. Avoid radial node clouds, decorative particles or a diagram that resembles a machine-learning architecture.

Initial state: no choice is backed. All alternatives show OPEN. Nothing converges or chooses on the visitor's behalf.

On selection: the chosen slip fills, its label becomes BACKED, its dependency route receives emphasis, and the adjacent text explains its obligations. Positions remain stable, so the visitor can compare revisions.

With two selected: unchosen alternatives remain visible as DEFERRED with dashed boundaries. If both draw on the same authored resource, the capacity rail changes treatment and the consequence text names the unresolved demand. There is no green success state.

On a third attempted selection: preserve both earlier choices, clear the attempted third choice and announce the limit and revision instruction. Do not silently exchange commitments or disable unchosen alternatives without explanation.

On deselection: restore the alternative to OPEN, reopen deferred alternatives when fewer than two commitments remain, and revise consequences immediately. Reset reopens all four. No persistence across navigation or page reload.

## Consequences

The result has five parallel parts: commitments; dependencies; trade-off; deferred/still-open alternatives; questions to investigate. Changes appear progressively without a mandatory Review button. The concise live region announces the selection count or capacity message; the full result is readable in normal document flow without repeatedly announcing a long block.

The separate illustrative Decision Record structure is: question, alternatives, assumptions, trade-offs, owner, review. No downloadable established product is implied by this specification.

## Native controls and keyboard

Each alternative has a labelled native checkbox alongside/below the composition. The full label is a touch target. Tab follows source order, Space changes the choice, and the native Reset button works with Enter/Space. The SVG is decorative to assistive technologies because all its meaning is duplicated in readable controls, consequences and the worked example. No custom SVG focus model, drag gesture or roving tabindex is needed.

Focus stays on the action's control. Selection does not move focus or scroll to the result. A polite atomic status explains a rejected third commitment. Contrast, text labels, fill and dash treatments work together.

## No JavaScript and reduced motion

The source HTML contains the complete worked example in an open native disclosure. It explains commitments, dependencies, conflict, deferrals and unanswered questions. The inactive controls are hidden until the interaction script finishes initialisation. Thus a script failure never leaves a misleading interactive form. The visual remains supplementary; navigation and CTA do not depend on enhancement.

With JavaScript, controls become available and the worked example stays available in a collapsed disclosure. With reduced motion, all colour/line transitions and smooth scrolling are disabled. The same states and text remain.

## Astro implementation proposal for Phase 4

Use a static Astro component containing SVG, fieldset, result container and native disclosure; keep scenario content in a small local data object. Enhance with an isolated scoped script and native events. No frontend framework, animation library, backend or CMS is needed. Maintain unique IDs and root-scoped selectors if multiple instances are introduced. Do not insert the review prototype directly into production without the approved component and verification work.

## Acceptance cases

1. No automatic selection on load.
2. Keyboard and touch can back and clear any priority.
3. Every combination of two preserves explicit dependencies and deferrals.
4. Shared-demand pairs expose unresolved tension.
5. Third attempts preserve earlier choices and explain revision.
6. Reset returns all alternatives to OPEN.
7. No-JS worked example, navigation and enquiry CTA remain usable.
8. Reduced motion removes transitions without removing meaning.
9. No page overflow from 375–1920px and at a 320px reflow check.
10. No storage, telemetry, requests, score or strategic recommendation.
