# The Judgement Factory — revised Stage 1 plan

Date: 25 October 2026. Status: revised composition awaiting review. **Stage 2 remains paused.**

The user's provisional approval requires a substantially smaller worker scale and a machinery-led composition. The revised specification in [REVISION.md](REVISION.md) supersedes the first proposal's character scale, ten-pose vocabulary and mobile treatment.

- [Revised concept and six-frame storyboard](index.html)
- [Original/revised scale comparison](comparison.html), including fixed desktop/mobile display sizes
- [Desktop miniature composition](factory-composition.svg)
- [Mobile miniature crop](mobile-composition.svg)
- [Five worker actions](character-actions.svg)
- [Scale metrics](scale-metrics.json)
- [Browser layout checks](review-validation.json)
- [Original Stage 1 analysis and technical plan](original/PLAN.md), preserved for provenance; its large-character and expressive-pose proposals are superseded

## Current direction

A 1000-unit-wide mechanical world with nominally 40-unit-tall workers: 4% of scene width. Two dominant AI machines, one continuous multi-level conveyor and three small monkey workers remain. Five task actions replace ten expressive states: walk, reach, inspect, pause and operate a lever.

The 16-second cycle is provisional. Background processes continue while a worker pauses before authorising a consequential action. AI organises and presents alternatives; the human-operated lever causes the gate response. Both paths remain visible and the formation remains provisional.

Mobile is a crop of the same factory world with one small worker, one AI machine and the essential decision. Character geometry is not enlarged. Native touch controls would sit outside the drawing.

## Constraints carried forward

Use original flat SVG artwork, black #0B0B0B, acid yellow #EFFF00 and cream #F5F3ED within the illustration. Do not change existing logo pixels or homepage palette. Use Astro/CSS/lightweight TypeScript after approval; no unnecessary dependencies, Canvas, WebGL, physics or image sequences. Pause offscreen/hidden-tab motion, support reduced motion and no JavaScript, and provide explicit pause/play and keyboard/touch controls.

Stage 2 is an isolated /lab/monkey-factory/ prototype only. It must be browser-tested and pass Astro diagnostics and a production build. Integration remains a separate Stage 3 approval; Find Formation is preserved. Check the previously recorded Node-runtime preflight issue before Stage 2 instead of silently changing global installations.

No application source files, homepage, existing assets, deployment settings or DNS were modified by this design revision.
