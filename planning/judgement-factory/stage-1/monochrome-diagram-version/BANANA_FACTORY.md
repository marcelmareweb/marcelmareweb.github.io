# Stage 1 revision — monochrome banana-bread factory

Date: 25 October 2026. Status: awaiting design review. Stage 2 is not authorised.

## Current specimens and preserved versions

- [Current desktop drawing](factory-composition.svg)
- [Six-frame storyboard](index.html)
- [Mobile crop](mobile-composition.svg)
- [Display-size specimens and previous versions](comparison.html)

The earlier miniature strategic factory is preserved in `miniature-strategic-version/`; the first large-character concept remains in `original/`. Their SVG artwork is unchanged. Only archive HTML references were adjusted to work from their new locations. Older review PNGs are historical; the current drawings and `banana-*` captures are authoritative for this revision.

## Visual direction

Strictly black and white: white ground, black outlines/silhouettes, white negative space and limited black hatching on the peel bin. No yellow, grey fills, opacity effects, gradient, shadow or gloss is authored. Rasterised edges may be antialiased by the browser; that does not introduce another design colour.

The miniature worker remains nominally 40 units high in a 1000-unit-wide desktop illustration: **4%**, the approved scale. Small white twin-lobed faces and ringed ears carry the logo relationship through silhouette. The existing logo files are neither recoloured nor replaced. No coloured logo appears within the new illustration.

The desktop is wide and shallow: 1000×340, approximately 2.94:1. Large but economical machines dominate. Two belt runs are linked by a peeling chute, mixer, tin-filling spout and oven. This is one physical production line, not five disconnected panels. Supporting details are limited to a drive, ingredient hopper, oven gauge and simple manual release gate. No industrial campus, dense network, decision dashboards or humanoid robots.

No explanatory labels appear inside the SVG artwork. Whole fruit, peeling fingers, falling skins, a segregated collection bin, bowl/beater, baking tin, oven door and scored loaf communicate the transformation. Captions and accessible text stay outside the illustration. The process is a stylised production metaphor, not a recipe or claim about real baking duration.

## Proposed six-frame / 14-second cycle

| Time | Process | Human role |
|---|---|---|
| 0–2s | Whole bananas enter on a turning belt. | Tiny receiving worker checks an incoming sample. |
| 2–4s | A gripping fork/collar separates the peel. Fruit continues by chute; skins drop into a separate bin. | The receiver supervises; no expressive performance. |
| 4–7s | A beater mashes the fruit with simple ingredient shapes; a spout fills a tin. | Workers remain in the scene while machinery leads. |
| 7–10s | The tin enters the oven; a finished loaf emerges as its door opens. | A small worker checks the temperature or adjusts its control. |
| 10–12s | A release gate holds the loaf while other mechanisms continue. | The inspector pauses and checks it. This is the consequential moment. |
| 12–14s | The release gate opens and the loaf travels towards the exit. The next batch is already entering. | A small approving reach operates the release; no celebration or exaggerated face. |

This is a continuously filled pipeline. These times indicate narrative emphasis, not camera cuts or a requirement to stop other stations. Conveyors, local beater rotation and the peeler's routine continue during inspection. Buffer the next item before the gate rather than allowing an item to pass through it.

Use repeating background periods that meet the 14-second cycle, e.g. 2s belt detail and 3.5s mixer detail. The short inspection dwell must remain readable. Hide product recycling only inside housings or outside clipped scene edges; never reset a visible loaf abruptly. Validate the loop boundary after implementation.

The automatic inspection is authored illustrative behaviour representing supervision. It does not claim software performs real human judgement. Clicking Approve requests the same character action at an inspection boundary; it does not turn the scene into a scoring system, game or route-choice exercise.

## Restrained humour

Primary proposal: a peel briefly needs the little flap to redirect it into the skin bin. It stays on a separate waste path and never appears to fall into the food mixture. Treat this as an occasional event rather than an exaggerated bounce on every cycle.

Optional secondary detail: the loaf has a slightly fuller dome than the tin suggests. Keep the difference small, with an ordinary inspection rather than a surprised face. If the first joke is enough, omit the second. No running, slapstick, waving or acrobatics.

## Mobile

Crop the oven and final inspection from the same world: one small worker, one principal machine, loaf, belt and release gate. The crop is 500×260; the worker retains the same 40-unit geometry. At a 335px illustration width it is approximately 27px high, versus approximately 53px at a 1320px desktop illustration width. It is not enlarged into a mobile focal character.

The preceding peel/mix steps remain described in accessible text. Do not try to squeeze every station into a phone. Native controls sit below the drawing, with comfortable touch targets. The Stage 1 outlined control boxes are placement studies only.

## Minimal interaction specification

- **Watch:** runs automatically only while in view, document visible, motion permitted and not manually paused. Default loop includes the brief inspection and release.
- **Pause/play:** a real native control holds all moving mechanisms and the phase clock in place. Manual pause survives scrolling away/back.
- **Machine hover/focus:** a small local component briefly speeds up, capped around 1.3–1.5×. No whole-factory speed change or shorter inspection dwell. Provide a keyboard/touch equivalent with a named control rather than requiring precise hover.
- **Worker hover/focus:** a small task-related glance or arm movement; avoid a larger head, zoom or expressive eye animation.
- **Approve loaf:** one native button, plus the inspection hit target if useful. It works by keyboard and touch. A request during another phase queues for the next safe inspection boundary and is acknowledged in a concise polite status. It does not teleport a loaf or bypass examination.
- **Reduced motion:** complete static drawing; approval changes textual release/inspection state and a clear black outline/gate-state cue without spatial movement. No automatic conveyor, blink, beater or door animation.
- **No JavaScript:** meaningful still and process explanation remain. Inactive controls stay hidden until enhancement succeeds.

The previous A/B buttons, pressed route states, alternative-path selection and strategic decision simulator are removed from the proposed interaction. Avoid announcing every automatic movement to assistive technology.

## Stage 2 technical plan, reserved until approval

Use an isolated noindex `/lab/monkey-factory/` route after approval. Keep the homepage and Find Formation unchanged. Use Astro for static semantic markup, inline SVG for drawings, CSS transforms/keyframes for mechanical movement and a small TypeScript phase controller. No animation library, Canvas, WebGL, physics or external service.

Suggested responsibilities, adapted to avoid unnecessary files:

| Proposed file | Responsibility |
|---|---|
| `MonkeyFactory.astro` | Continuous scene, desktop/mobile layout, summary and controls. |
| `MonkeyCharacter.astro` | Tiny monochrome worker with a few task poses; unique SVG IDs where needed. |
| `FactoryMachine.astro` | Peeler, mixer and oven variants, only if reuse/readability warrants extraction. |
| `ConveyorBelt.astro` | Two economical belt spans and reusable products. |
| `factory-animation.ts` | Active elapsed time, six phases, pause reasons, queued approval and local reactions. |
| `monkey-factory.css` | Prefixed line drawing, transforms, mechanical timing, responsive/reduced-motion rules. |

The former `DecisionStation` becomes a simple inspection/release gate, not a separate simulation subsystem. Reuse small banana, peel, tin and loaf groups. Transform parts rather than rebuilding paths each frame. Reserve requestAnimationFrame for a demonstrated need; scheduled phase boundaries and CSS animation should suffice.

`IntersectionObserver`, `visibilitychange` and a live reduced-motion listener govern motion. Save elapsed active time when pausing; resume consistently rather than skipping inspection. Pause the hidden responsive scene if both layouts exist in markup. Avoid per-frame layout measurements, continuous pixel calculations and unnecessary network requests. Reserve scene dimensions to prevent layout shifts.

Initial review targets: <=350 visible SVG elements, <=20KB gzip drawing markup and <=6KB gzip enhancement code; measure rather than promise these results. Most details remain static. The scene should be simpler than the prior miniature strategic machinery.

After approval, verify a working project-compatible Node runtime first; the previously recorded local runtime issue must not be silently worked around with application dependency changes. Then run `npx astro check` and `npm run build`. Start any Astro preview with `astro dev --background` and use status/logs/stop to manage it.

Browser checks must cover: whole bananas→peels→mixture→loaf legibility; separate waste route; continuous background work; inspection hold and manual release; repeated clicks; pause/resume; offscreen/tab hidden; reduced motion on load and after preference changes; no JavaScript; keyboard/touch; desktop/mobile crops; product/hand contact; and at least two complete loop boundaries. Capture screenshots and a short demonstration if available.

## Review boundary

Stage 1 contains static design specimens only. No Astro component, TypeScript controller, lab route or animation has been implemented. No application source, original logo, homepage, route, deployment setting or DNS is changed.

Approve the monochrome visual direction, clarity of the five production activities, inspection pause, shallow composition and mobile crop before Stage 2 begins.


## Static design validation

The current board was rendered in Chrome at 375, 768 and 1440 CSS pixels with no document overflow or missing images. Fixed desktop/mobile panels were verified at 1440/375px with 1320/335px illustrations. All current SVGs parse, contain no in-scene text elements and use only #000000, #FFFFFF and none for authored fills/strokes. No gradient, opacity or filter is authored. Existing src/public files match their pre-revision hashes.

Current captures: banana-desktop.png, banana-mobile.png and banana-full-review.png. Browser layout results are in banana-layout-validation.json. These checks validate static specimens, not animation behaviour or Astro builds. No .astro or .ts source was created or changed.
