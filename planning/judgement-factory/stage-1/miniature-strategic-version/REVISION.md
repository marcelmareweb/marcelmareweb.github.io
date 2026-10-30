# Stage 1 revision — a miniature working world

Date: 25 October 2026. Status: revised composition awaiting review. Stage 2 remains paused.

Open [the original/revised comparison](comparison.html) and [the revised storyboard](index.html). The first proposal is archived under `original/`; its SVG artwork remains unchanged. The archived HTML's relative logo/font paths were adjusted for its new directory.

## What changed

The miniature factory is the subject. Three tiny workers provide moments of activity within it. Large machinery, one continuous conveyor with several visible horizontal/inclined spans, drive wheels, indexed pockets, control shafts, fixtures and feedback lines dominate the composition. These are original drawings, not a reconstruction of the reference factory.

| Item | Original | Revised |
|---|---|---|
| Desktop character height | Tallest central character approximately 114 units in a 1000-unit scene | Nominal 40-unit worker in a 1000-unit scene: **4%** |
| At 1320 CSS px illustration width | Approximately 151px | Approximately 53px |
| Mobile, 375px viewport / 335px illustration | Approximately 100px character | Approximately 24px worker |
| Hierarchy | Three prominent characters | Two dominant AI machines and connected work; workers reward inspection |
| Acting vocabulary | Ten expressive poses | Walking, reaching, inspecting, pausing, operating a lever |
| Mobile approach | Reconstructed scene with a prominent monkey | Crop of the same miniature world; no character enlargement |

The revised desktop worker is about 65% shorter than the original central character. These numbers describe vector geometry at stated CSS widths, not physical millimetres. A walking lean can alter the precise bounding box slightly; the intended scale remains within 3–5%.

The 1440px comparison panels intentionally contain fixed 1320px illustrations. The 375px panels contain fixed 335px illustrations. Both comparison rows can be scrolled horizontally without shrinking. The overview above them scales to fit and is labelled accordingly. Normal browser zoom is assumed when judging actual CSS display sizes.

## Re-examining the reference

The [Automated Cloud Factory](https://automated-cloud-factory.netlify.app/) was reopened in Chrome. Across captured moments, its small workers sit within structural bays, while tanks, hoppers, conveyors and transfer mechanisms define the larger silhouette. The density of connected activities gives the impression of a world that continues operating beyond any one worker's action.

The reference's worker proportions vary across its composition; no single measured worker percentage is claimed. Its useful lesson here is relational scale and distributed activity. Our 4% target follows the user's requested range and is measured from our own drawings.

The revised drawing does not copy the reference's buildings, roofline, cutaway arrangement, hatching, character silhouettes, source code or exact machine sequences. It uses an open mechanical chassis with large analytical machines and a human-operated gate. Flat cream fields and black lines preserve a restrained editorial character. Acid yellow remains a limited machine/route signal, with black boundaries and labels.

## Character design at small scale

The worker is approximately 40 units from head top to foot baseline. A small yellow twin-lobed face, ear rings and dark eye marks retain a connection to the Spotted Ape identity. The head is reduced relative to the torso; there are no large animated eyes, mouth performances, waves or head scratches.

Use five actions only:

1. **Walk:** a short step between a work position and the control, not a travelling character performance.
2. **Reach:** one economical arm movement that contacts a sample or part.
3. **Inspect:** hold or angle a small sample; use the surrounding task to make the action readable.
4. **Pause:** still posture beside the decision control, with the factory continuing around it.
5. **Operate the lever:** the hand contacts the control before the output gate moves.

At narrow display sizes, identity is carried by silhouette, ear rings and yellow face rather than fine expression. The pose sheet presents workers at scene scale. It does not introduce a large character portrait as the new visual subject.

## Continuously operating choreography

Keep 16 seconds provisionally, but treat these as changes in attention inside a running system, not six stops or camera cuts.

| Time | Main event | Background continues |
|---|---|---|
| 0–2.5s | A receiver checks incoming information. | Conveyor rollers, transmission wheels, a local counterweight. |
| 2.5–5s | The sorter indexes; alternatives appear in the large analysis machine. | The same upstream flow and local mechanisms. |
| 5–8s | The decision worker inspects and pauses; the authorisation gate stays closed. | Sorting and small background motions continue. A buffer holds candidates before the gate. |
| 8–10s | A short step/reach operates the lever; the shaft moves the gate. | Other mechanisms keep their rhythm; no global speed change. |
| 10–13s | A selected piece reaches the fixture; a small worker positions it. | More information arrives, and both output alternatives remain drawn. |
| 13–16s | A feedback cue prompts inspection and a small adjustment. | The factory flows into the next cycle; the structure is retained. |

Candidate background periods are 2s (roller detail), 3.2s (transmission wheel) and 4s (local indexing), all meeting a 16s boundary. These are proposals to test, not implemented timings. Keep amplitude and simultaneous token motion modest. The authorisation pause belongs to the gate and worker, not to the entire factory.

The AI machines organise and present. There is no actuator from the analysis machine to the manual gate. The worker's hand contact precedes the shaft/gate response. In automatic mode this is authored illustrative choreography; it does not imply that software is exercising actual human judgement.

On a visitor's route request, retain the inspect-before-commit sequence. Keep the other route visible. A late revision queues at a safe boundary rather than reversing a piece already in transit. No success score or claim of an optimal decision is introduced.

## Mobile crop

Use the right-hand region of the same world: one analysis machine, one worker, the conveyor/gate and both output paths. The source crop is 560 units wide; the worker geometry stays 40 units tall. At a 335px display width it renders at approximately 24px high. It is physically smaller than the approximately 53px worker in the 1320px desktop specimen.

A passive gauge and fixture are supporting mechanical details, not additional AI machines. The other two workers and the sorting machine are omitted. Large input controls stay in HTML below the illustration; never force visitors to hit a 24px worker or a tiny lever. The comparison's outlined control boxes are labelled static placement studies, not functional buttons.

## Interaction and accessibility implications

- Retain explicit pause/play, route A/B controls, readable process text and a polite status for requests/commitments.
- Tiny-worker hover reactions become task-related reaches or inspection, not facial performances. Provide a named keyboard/touch equivalent outside the drawing; do not require precision over the worker.
- Local machine hover/focus can speed only a small cam or indicator, at most 1.5×; do not accelerate the whole cycle or shorten the human pause.
- A visible pause state overrides automatic viewport/tab resumption.
- Reduced motion uses a stable complete miniature composition with immediate text/route-state changes. No walk, reach, blink, gear turn or conveyor travel is required for meaning.
- No JavaScript leaves the static composition and process explanation intact. Inactive controls stay hidden until enhancement is ready.
- Offscreen and hidden-tab handling must pause the motion and phase clock together, not restart the decision on return.

The more intricate environment does not authorise expensive animation. Most detail remains static. Animate a few nested transform groups and six reusable information objects; avoid frame-by-frame SVG reconstruction or layout reads.

## Stage 2 boundary and technical plan

After approval, build only `/lab/monkey-factory/` with Astro, SVG, CSS and lightweight TypeScript. Keep the component responsibilities from the earlier plan: scene, small reusable worker, two machine variants, one conveyor, one decision station and a deterministic phase controller. Reuse SVG definitions where practical; use unique IDs.

Measure the visible SVG tree and compressed payload before adding detail. The additional mechanical detail is a static-design choice, not permission for more continuous computation. The existing Node-runtime preflight issue remains to be checked before any Astro diagnostics/build; no application dependency or global runtime change is part of this revision.

The homepage, Find Formation, logos, routes, DNS and deployment settings remain untouched. No Stage 2 component, TypeScript controller or animation has been implemented.

## Review checks

The revised board was rendered at 375, 768 and 1440px with no document overflow or missing images. The comparison was rendered at 375 and 1440px: its fixed desktop panels remained 1440px wide, illustration widths 1320px; fixed mobile panels remained 375px wide, illustration widths 335px. Overflow is contained in the labelled horizontal comparison regions.

All revised SVGs parse. Existing `src/` and `public/` files are checked against the hashes recorded before this revision. Static image and layout verification is not animation QA or an Astro build claim.

Please review the miniature scale, mechanical hierarchy, simplified actions and mobile crop before authorising Stage 2.
