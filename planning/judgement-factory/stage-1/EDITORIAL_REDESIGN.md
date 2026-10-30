# A new drawing, not another diagram revision

25 October 2026 · Stage 1 · awaiting illustration approval

The factory is rebuilt as a climbing, hanging, uneven invention. The old shared chassis and row of geometric housings give way to crooked timber trestles, an elevated peeling rig, a suspended basket, a large low bowl and a bent-chimney oven. Fine irregular contours and selective hatching carry the materials. Yellow is confined to whole banana skins, separating peel and discarded skins; peeled fruit, batter and bread are white with black drawing.

## Reference study before drawing

These are observations of the referenced drawings and principles selected for this project, rather than claims that either artist designed a similar banana factory. No reference artwork was incorporated into the new assets.

| Example studied | Observation | Principle adopted |
| --- | --- | --- |
| Heath Robinson, table-driven kitchen mixer, reproduced on the [museum website](https://www.heathrobinsonmuseum.org/) | Hand-operated wheels connect through shafts to one household task. Uneven supports and practical connections make the absurdity readable. | Give the drive train a job: large wheel → belt → small pulley → mixer. Let the supports look assembled rather than manufactured. |
| Heath Robinson, [pancake-making machine](https://fortuitousnovelties.wordpress.com/2012/10/13/pleasingly-pointless/) | Vertical ropes, suspended utensils and a large wheel surround an ordinary cooking process. Empty space separates its actions. | Use height and suspension to organise arrival, peeling, mixing and baking; make excessive ingenuity the joke. Do not reuse the wheel/utensil arrangement. |
| Sempé, [The New Yorker cover, 25 June 1979](https://www.newyorker.com/magazine/1979/06/25) | A huge tree contains many tiny activities. Small postures become discoveries within an encompassing environment. | Make the machinery the first read, the workers the second. Let the inspector's quiet lean communicate attention. No tree or cover composition is reproduced. |
| Sempé, [Vive la vie!, Artcurial lot 99](https://www.artcurial.com/ventes/3892/lots/99-a) | A tall, imperfectly drawn building and broad blank space dwarf the people. | Keep open areas between mechanisms and use irregular proportions; resist filling every void with mechanical detail. |

The [Heath Robinson Museum's exhibition introduction](https://www.heathrobinsonmuseum.org/whats-on/permanent-exhibition/) describes the elaborate-machine/simple-task relationship. [Fondation Folon's Sempé exhibition](https://fondationfolon.be/en/expo/sempe-infiniment-votre/) provided additional context for his humorous drawing practice. The new composition translates selected principles; it is not a reproduction of either artist's work.

## Scene and scale

- Desktop master: `editorial-assets/factory-desktop.png`, 1983 × 793px. Intended display: 1320 × approximately 528 CSS px in a 1440px viewport.
- Three workers, visually approximately 4–5% of full scene width in height. Round ears, compact black bodies and white faces relate to the existing logo without pasting it into the scene. The drawings use minimal facial marks; posture does the main storytelling.
- Mobile master: `editorial-assets/factory-mobile.png`, 1345 × 1169px. Intended display: 335 × approximately 291 CSS px within a 375px viewport. One worker is approximately 18–20px tall. This is a recomposition of the oven/transfer/inspection scene, not a shrunken panorama or enlarged character portrait.
- The review includes fixed 1440px desktop and 375px mobile comparison viewports. Horizontally scroll these to inspect actual CSS sizes. Thumbnail pairs use a common width to test silhouette immediately.

## Six-frame process, proposed 14-second cycle

1. **0–2s: Arrival.** Yellow-skinned bananas climb the feed. A small supervisor checks intake.
2. **2–4s: Peeling.** The rotating fork separates yellow skins into the suspended basket; white fruit falls towards the bowl.
3. **4–7s: Mixing and transfer.** The belt and counterweight drive the beater; the ladle transfers white batter to the tin.
4. **7–10s: Baking.** A door linkage opens and the monochrome loaf emerges.
5. **10–12s: Inspection.** The loaf waits at a closed stop. The inspector's hand remains away from the upright release handle.
6. **12–14s: Authorise and release.** The inspector operates the lever; the stop lowers and the loaf passes. A small reset prepares the next cycle.

The contact sheet uses detail framings to explain actions. It does not set character size for the website; the full desktop/mobile specimens do that. The final two drawings explicitly distinguish the closed and lowered stop. These are storyboard drawings, not registered animation keyframes.

## Stage 2 boundary and technical implications

All new art is static raster imagery created using the built-in image generation tool. The prompts and refinement record are in `IMAGE_PROMPTS.md`. No animation, tracing, interactive prototype, Astro integration or deployment has been started.

If the composition is approved, the next step is to resolve the mechanical linkages and prepare articulated artwork from this master: separate pulley, peeling fork, skin, beater, ladle, oven door, loaf, stop, lever and a few worker poses. The apparent linkages in this drawing establish the story; they have not been validated as an animation rig. Preserve its irregular contours when preparing any vector artwork. Avoid automatic tracing that creates an excessive node count or replaces the drawing with basic shapes. Asset weight and motion performance still need validation at that stage.

The eventual motion proposal remains a restrained 12–16s loop, with continuous small upstream movement during inspection. A pause control outside the art and a static reduced-motion state remain requirements for Stage 2. Colour cannot be the sole cue: skin shape, white fruit and the separate paths also distinguish the material states. No interactive authorisation control has been added in this stage.

## Preservation and review decisions

The immediately preceding design is preserved in `engineered-monochrome-version/`, including its HTML, SVGs, PNGs and notes. Earlier archives remain. Existing root SVG files are historical specimens; the current review explicitly references the new PNGs in `editorial-assets/`. Original logo files and all homepage/source assets remain unchanged.

Please review the new drawing language, interconnected vertical composition, banana-only colour, worker scale at actual sizes, mobile recomposition and the inspection/release sequence. Approval is needed before Stage 2 artwork preparation or animation.
