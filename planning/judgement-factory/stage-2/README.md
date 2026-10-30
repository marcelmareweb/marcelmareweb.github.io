# Stage 2 — working judgement factory prototype

Status: implemented for review following the instruction to continue from the revised Stage 1 illustration. Stage 3 integration is not started.

Open the running [local prototype](http://localhost:4324/lab/monkey-factory/), the [capture gallery](index.html) or the [14-second demonstration](animation-loop.mp4).

## What is implemented

The approved hand-drawn world is retained. Registered SVG masks and clipped image layers articulate the existing artwork; small vector paths supply the peel, release arm, track revealed beneath the loaf and a mechanical joint. This is a raster/SVG hybrid prototype, not a complete vector redraw. The Stage 1 masters and original brand assets remain unchanged.

Three tiny desktop workers make small task gestures. The mobile composition keeps one small inspector within the larger apparatus. Only whole banana skins and discarded peel carry yellow. The product cycle has six phases:

| Time | Visible action |
| --- | --- |
| 0–2s | Arrival and climbing intake |
| 2–4s | Peeling; skin and white fruit follow separate paths |
| 4–7s | Mixer drive, beater and batter transfer |
| 7–10s | Oven door and emerging loaf |
| 10–12s | Loaf held behind the closed stop; inspector leans towards it |
| 12–14s | Small approving reach, lever rotation, lowered stop and outgoing loaf |

The machinery has its own continuous timeline. The product timeline can stop at inspection while the pulley, mixer and other upstream processes continue. Default viewing releases the loaf after its two-second inspection. Recycling happens beyond the scene boundary or in the oven, rather than moving the visible loaf backwards.

## Try the interactions

1. Let the factory run through one cycle.
2. Select **Hold next loaf**. After its inspection, that loaf stays at the closed stop. The upstream mechanism continues operating.
3. Select **Approve loaf**. The inspector operates the lever, the stop lowers and the loaf leaves. Holding is a one-loaf intervention; automatic viewing resumes.
4. Select **Pause animation**. Every active part and the product clock stop. Resume preserves the current phase and any held loaf.
5. Try **Boost mixer**, or hover the mixer. Only the local drive/beater speed rises to 1.4×. Inspection timing and product travel do not speed up.
6. Select **Check intake** on desktop or **Check inspector** on mobile for a small task reaction. The intake worker also responds to hover.

Approval requested before inspection is queued until the safe release boundary. Repeated clicks do not stack releases. The native buttons support keyboard and touch; hover is supplementary. Controls and status text stay outside the illustration, with black-and-white focus and pressed states.

## Motion, fallback and layout

- `IntersectionObserver` pauses the scene when it leaves view. Native `visibilitychange` pauses it when the tab is hidden. A manual pause survives scrolling, resizing and motion-preference changes.
- Reduced motion on load produces a complete still. Approval changes the release state instantly while the loaf stays in place; a second action prepares the next inspection. Automatic movement, local speed changes and worker reactions remain disabled. A live preference change also stops motion.
- Without JavaScript, the responsive static picture, description and process sequence remain. Inactive controls stay hidden. Their space and the scene's aspect ratio are reserved for enhancement.
- Desktop and mobile have separate registered compositions. Only the active scene animates. It loads the corresponding artwork; resizing can load the other composition. The same asset is reused from cache for the still and SVG layers.
- No animation library, Canvas, WebGL, video playback asset, external service or new application dependency is used by the prototype. The review MP4 is documentation only.

The browser animates transform/opacity keyframes through the Web Animations API. A small TypeScript controller schedules phase boundaries and manages pause/approval state. There is no per-frame JavaScript loop or continuous layout measurement.

## Files

| File | Responsibility |
| --- | --- |
| [MonkeyFactory.astro](../../../src/components/interactive/MonkeyFactory.astro) | Semantic still, live scene, description and native controls |
| [FactoryScene.astro](../../../src/components/interactive/FactoryScene.astro) | Desktop/mobile registered cutouts and articulated SVG layers |
| [factory-animation.ts](../../../src/lib/factory-animation.ts) | Native animation timing, inspection hold, queued approval, pause reasons and local reactions |
| [monkey-factory.css](../../../src/styles/monkey-factory.css) | Isolated layout, responsive scene, focus and control states |
| [Lab route](../../../src/pages/lab/monkey-factory/index.astro) | Dedicated noindex review page |
| `public/images/judgement-factory/*.webp` | WebP delivery copies of the approved PNG masters |

The two new image files are format-compressed copies, not newly generated illustrations. The full original art is retained in Stage 1. No changes were made to existing content/source files, dependencies, homepage, Find Formation, deployment settings or DNS.

## Verification and measurements

- `npx astro check`: 40 files, zero errors, warnings or hints.
- `npm run build`: successful static build, including `/lab/monkey-factory/`.
- Chrome: two automatic loop boundaries; inspection hold with continuous upstream motion; keyboard pause/release; queued/repeated approval; local speed change; reaction cancellation; offscreen and native hidden-tab pausing; live reduced-motion changes; reduced-motion approval without moving the loaf; no-JavaScript fallback; desktop/mobile resize and 320/375/768/1440px widths.
- Runtime exception checks: none in the tested flows.
- Desktop artwork: 317,590 bytes. Mobile artwork: 334,908 bytes. Only one composition is required on an initial viewport load.
- Enhancement bundle: approximately 3.2KB gzip. Exact build sizes and content-preservation hashes are recorded in [implementation-validation.json](implementation-validation.json).
- Browser observations and visible SVG node counts are recorded in [browser-validation.json](browser-validation.json). Automatic-loop observations are in [motion-samples.json](motion-samples.json).
- [Demonstration](animation-loop.mp4): 14 seconds, sampled at 6fps. Browser motion uses its native animation timeline; the recording's sample rate is not a performance measurement.

The installed system Node executable references a missing Homebrew library. Verification used an official, checksum-verified Node 22.22.0 x64 runtime under `/tmp/tsa-factory-node/`, matching the existing x64 native modules. No system libraries, package versions or lockfiles were changed. The native arm64 runtime was also tested, but the existing modules target x64.

Current background server: `http://localhost:4324`. Its management commands use the same temporary runtime:

```sh
PATH=/tmp/tsa-factory-node/node-v22.22.0-darwin-x64/bin:$PATH npx astro dev status
PATH=/tmp/tsa-factory-node/node-v22.22.0-darwin-x64/bin:$PATH npx astro dev logs
PATH=/tmp/tsa-factory-node/node-v22.22.0-darwin-x64/bin:$PATH npx astro dev stop
```

Restart with `npx astro dev --background` using a working compatible runtime. The port may differ if the previous port is occupied.

## Review before Stage 3

Assess the movement at normal display sizes, the balance between continuous machinery and tiny workers, the legibility of the inspection/release action and the mobile composition. Registered image cutouts are appropriate for this prototype; fine ink joins, full vector production artwork, broader browser/device performance and final placement remain refinement decisions.

The lab route is unlinked from the homepage and marked noindex. It is included in the local static build, including the project's automatically generated sitemap; it must be excluded or removed before any public deployment. No build has been published. Stage 3 refinement and homepage integration await review and approval.
