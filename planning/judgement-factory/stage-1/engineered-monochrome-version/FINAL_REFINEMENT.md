# Final Stage 1 aesthetic refinement

Date: 25 October 2026. Status: revised illustration for approval; Stage 2 remains paused.

## Review artefacts

- [Revised full-width illustration and six-frame storyboard](index.html)
- [Before/after at intended display sizes](comparison.html)
- [Six frames with captions removed](storyboard-without-captions.svg)
- [Desktop vector drawing](factory-composition.svg)
- [Mobile vector crop](mobile-composition.svg)
- `banana-desktop.png`, `banana-mobile.png`, `banana-full-review.png`: current rendered captures.
- `refined-desktop-comparison.png`, `refined-mobile-comparison.png`: captured fixed-size comparison rows.

The immediately preceding monochrome concept is preserved in `monochrome-diagram-version/`. Its illustration SVGs are unchanged. Its archived HTML paths were adjusted for the subdirectory. The earlier miniature strategic version and original prominent-character proposal remain preserved in their existing archives.

## What changed visually

### One mechanical world

A single chassis now supports the process. A low shaft, bearing blocks and restrained flywheels connect to the belt drive and oven conveyor/door mechanism. An upstream drive belt rises to the overhead pulley run, linking the peeling and mixing assemblies. These are limited functional connections, not background pipes added for atmosphere.

The peeling and mixer heads share chamfered housings, restrained corner bolts and related paired gears. The oven uses the same casing treatment around an arched, dark opening, with sparse insulation marks instead of generic domestic-appliance styling. Pulleys use the same rim, hub and spoke grammar throughout.

There are three main line roles: approximately 1.8–2.2 units for chassis/castings, 1.2–1.5 for mechanisms, and 0.7–0.9 for restrained functional detail. There is no sketch jitter, gradient, authored grey, shadow, opacity effect or decorative colour.

### Purposeful height variation

The infeed rises to the peeling head. Fruit then descends along an elevated chute into the mixer. A hopper and drive sit above the bowl; the oven remains lower, and the inspector uses a small raised platform with access rungs. The composition stays shallow at 1000×360, with white space around its silhouette.

### Recognisable material transformation

- Whole bananas have stalks, a pronounced curved skin and restrained longitudinal ridges.
- The exposed fruit has a separate soft, rounded contour without the dark stalk/ridged skin treatment.
- Split peel fans away from the fruit; a separate waste chute directs skins into the collection bin.
- Coarse irregular pieces make the mash stage visible beneath the exposed beater.
- Smooth surface waves and a pouring ribbon distinguish batter from pieces of fruit.
- A filled tin becomes a scored, distinctly domed loaf, emerging through the raised oven door.

The full-width overview shows several stages operating at once, consistent with a continuous production line. The storyboard isolates the changing material and mechanism in six working-detail crops. Those crops are explicitly not the scale-comparison specimens. No explanatory text is authored inside the factory SVGs.

### Tiny workers with a working silhouette

Nominal worker height remains **40 units / 1000-unit desktop scene width = 4%**. At the 1320px desktop illustration width, the height is approximately 53px. Compact filled shoulders/hips, bent limbs, rounded ears and the logo-related double-lobed white face replace the stick-like anatomy. Fine facial performance is intentionally absent.

The receiver checks an arrival. The mixer attendant is clear of the filled tin and can supervise the filling spout. The final inspector leans towards the loaf from its platform, then steps to the manual release. Its hand reaches the lever before the stop is lifted. The scene does not treat the monkeys as decorative machine mascots.

The mobile crop is the same right-hand world region: oven, conveyor, domed loaf and one inspector on its platform. Its 500-unit crop retains the 40-unit character, approximately 27px at a 335px display width. The character is not redesigned or enlarged for mobile.

## Side-by-side comparison

The overview fits the browser and is labelled as such. The desktop comparison contains two fixed **1440 CSS px** panels, each with a **1320px** illustration; both have approximately **53px** workers. The mobile comparison contains two fixed **375px** panels with **335px** illustrations and approximately **27px** workers. Scroll these contained rows at 100% browser zoom for display-size assessment.

This separates improved composition from artificial character enlargement. Previous and revised drawings retain their different aspect ratios; neither is stretched to match the other.

## Six-frame production progression

| Frame | Provisional time | Visible change independent of caption |
|---|---|---|
| 1 | 0–2s | Intact stalked fruit travels up the input belt; the head is waiting. |
| 2 | 2–4s | Peel splays away from the core. One skin is on the waste path while exposed fruit moves down the separate food chute. |
| 3 | 4–7s | Irregular mash, a turned beater, ingredient grains and a smooth pouring ribbon appear; a tin is filled. |
| 4 | 7–10s | The oven door is raised and a domed loaf is emerging from its dark mouth. |
| 5 | 10–12s | The loaf meets the closed stop; the inspector's working arm reaches towards it. |
| 6 | 12–14s | The inspector is at the lever, the stop is lifted, and the loaf is travelling towards the exit. |

The changing crops support reading but do not replace the object/state changes. The separate caption-free contact sheet exposes the sequence without explanatory prose. Approval should assess whether the transformations read visually, not just whether the captions describe them.

## Final proposed animation plan

No motion has been implemented. The following is the specific plan for Stage 2 after approval.

| Element | Proposed movement | Purpose and restraint |
|---|---|---|
| Infeed and output rollers | Small continuous rotations; product paths follow their belt runs. | Transport is visibly connected to the process. Avoid rotating every static bolt. |
| Main shaft and flywheels | Steady, low-amplitude/constant-speed rotation. | Provides a common mechanical rhythm. |
| Rising and overhead drive belts | A few travelling seam marks; pulleys turn consistently. | Shows the common drive without moving whole housings. |
| Peeling gear pair and fork | Opposite gear rotation; a short indexed fork pull. | Fruit meets the fork before skins separate. Maintain plausible direction/ratios when rigging. |
| Fruit and skins | A curved fruit path, separate peel opening and gravity-led skin drop. | Whole banana → exposed fruit is readable. Keep the waste path separate. |
| Waste flap | One small deflection on an occasional peel, then return. | Single understated joke; no repeated slapstick bounce. |
| Mixer drive and beater | Local gear rotation and a constrained paddle turn. | Clearly mashes the fruit; bowl and frame stay fixed. |
| Ingredients, mash and batter | A few grains/pieces; coarse pieces settle into smoother waves; a short ribbon fills a tin. | No particle system or continuous path regeneration. Use a few authored shapes. |
| Oven door rack | Short controlled lift when a loaf is ready. | Opens before the loaf exits; no cartoon steam plume. |
| Loaf and release stop | Loaf reaches stop, waits approximately two seconds, then leaves after approval. | The stop is not opened directly by an AI display or automatic route selector. |
| Receiver and mixer attendant | Occasional short reach/inspection within the existing silhouettes. | No exaggerated eyes, head scratches, waving or character show. |
| Inspector | Small lean towards loaf; still inspection interval; short step/reach presses lever. | The central judgement beat. Hand contact precedes the linkage response. |
| Inspection linkage | Small lever movement drives the shaft/stop to its open state. | Makes authorisation mechanically visible. |

The proposed master cycle remains **14 seconds**, within the approved 12–16s range. Conveyor/drive detail may use 2s or 3.5s repeating periods that meet the cycle boundary. Upstream movement continues during the inspection dwell, with a small buffer preventing collisions. Retain a manually paused state, and never clear it automatically on viewport re-entry.

Do not hard-reset a visible loaf or worker at the boundary. Recycle products only inside opaque housings or outside clipped edges. The pipeline may contain different batches at once, as shown in the full-width overview. Test the 13.5–14.5s boundary and repeated loops.

## Interaction and accessibility, carried forward

- Automatic watching remains the default when visible and motion is permitted.
- Native pause/play holds the scene and phase clock together.
- A single approval control requests the inspector's action at a safe boundary; it is not a game or decision simulator.
- Machine hover/focus affects only a local mechanism. Worker hover/focus gives only a small working reaction. Provide touch/keyboard equivalents without requiring tiny SVG hit targets.
- Reduced motion presents a complete still and non-spatial textual/outline states. No moving gears, doors, reaching or product transport is needed to understand it.
- No JavaScript leaves the illustration and process description readable; inactive controls are hidden until enhancement.
- Use readable HTML controls and one concise status, not dozens of narrated SVG parts. Keep touch controls outside the drawing.
- Pause the hidden responsive composition, offscreen scene and hidden-tab phase clock. Avoid per-frame layout reads and continuous DOM reconstruction.

## Technical and verification boundary

After illustration approval, use the already proposed isolated Astro route, reusable SVG groups, scoped CSS and a small TypeScript controller. No homepage integration, frontend framework, animation library, Canvas/WebGL or global runtime/dependency changes are authorised by this design revision. The prior Node preflight issue must be checked before Stage 2 builds.

The current full drawing is approximately 300 SVG elements and about 4.5KB gzip of markup. These are static artefact measurements, not animation-performance results. Most geometry will remain still; the additional connections are not a reason to animate every part.

Static specimens were rendered at 375, 768 and 1440px without missing images or document overflow. Fixed desktop and mobile comparison widths were checked in-browser. Current SVGs parse, use only black/white/none for fills/strokes, and contain no in-scene text elements or authored opacity/filter effects. Existing `src/` and `public/` files are verified unchanged against their pre-revision hashes. No `.astro` or `.ts` implementation was created or modified, and no Astro build or animation verification is claimed.

Stage 2 stays paused until this refined illustration is approved.
