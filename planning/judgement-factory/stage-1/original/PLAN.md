# The Judgement Factory — Stage 1

Date: 25 October 2026. Status: concept and storyboard for approval. This is a separate staged animation task; it does not approve the remaining website pages or a production release.

Open [the static concept board](index.html), [desktop composition](factory-composition.svg), [character poses](character-states.svg) and [mobile composition](mobile-composition.svg). The six SVG storyboard frames are still images, not a working animation. No application files were created or modified.

## 1. Reference analysis: observation versus inference

Reference: https://automated-cloud-factory.netlify.app/ — inspected in a rendered Chrome browser, with multiple moments captured, representative pointer targets, a 375px viewport and an emulated reduced-motion preference. No reference drawing or source code is incorporated into the proposed artwork.

| Subject | Observed | Transfer or limit |
|---|---|---|
| Overall style | Monochrome cutaway factory, many levels, thick structural beams, fine outlines and dense hatching. | Borrow the coherence of a working system, not the architecture, hatching or industrial composition. |
| Characters | Small human operators, narrow silhouettes and small heads relative to the visible workplace. | Our characters must be much larger and related to the monkey identity. The reference proportions would lose that identity at homepage scale. |
| Mechanical motion | Conveyor loads, articulated arms, lift/press positions and smoke change across captures; activities run together. | Use a few independent mechanical rhythms with visible hand-offs. Do not reproduce the reference's mechanisms or their precise sequences. |
| Repetition and timing | Repeated activity is visible. The DOM exposes no CSS/Web Animations records for the drawing. | No common master-loop duration or easing curve was established. The proposed 16-second cycle is our choreography, not a measurement of the reference. |
| Hover | The page instructs visitors to hover to speed activity. The central press, lower-arm and worker sample positions produce a pointer cursor on the canvas. | A local reaction is a useful model. Exact acceleration, affected rig boundaries and hover easing were not measured; screenshots alone do not prove a particular speed multiplier. |
| Feedback | Movement and pointer feedback occur in the illustration itself; no separate button/link/input controls were exposed in inspected page markup. | Provide native controls and readable state feedback in our version. This is not a full accessibility audit of the reference. |
| Technical surface | One canvas, no rendered SVG elements; the desktop canvas occupied approximately 1343×1000 CSS pixels. | The reference's renderer does not justify Canvas for this smaller scene. Use SVG for accessible, composable parts. |
| Mobile | The entire canvas scaled to 375×279px, centred vertically in the inspected 375×812 viewport. Its workers became very small. | Recompose with one monkey and one machine rather than shrinking the desktop factory. |
| Reduced motion | Pixel samples continued changing after enabling reduced motion. After a separate reload with the preference set, a six-second settling interval and four subsequent samples also showed changing pixels. | Our version must explicitly provide a stable composition and non-spatial state changes. Do not infer compliance or non-compliance of the entire reference from this limited test. |

The transferable principle is **many small activities forming one legible system**. The Spotted Ape's original emphasis is **a deliberate human decision interrupting a predictable machine rhythm**.

## 2. Visual direction and character proposal

Flat vector forms, cream negative space, black silhouettes and selective acid-yellow activity. No gradients, glow, glossy machinery, clouds, humanoid robots or factory-building cutaway. The environment is an open editorial workbench with mechanical details rather than an industrial campus.

Use the brief's illustration colours: black `#0B0B0B`, yellow `#EFFF00`, cream `#F5F3ED`, with a restrained neutral `#77786D`. These are local illustration swatches; the selected warm mineral homepage palette and its `#FFFF00` brand signal remain unchanged. Existing logo pixels are not recoloured. Yellow marks machine activity and a committed route; labels and line treatments carry meaning as well.

The primary reference is `public/logo.png`: circular ringed ears, a double-lobed yellow face, pronounced eye rings, small nostrils and the broad upturned smile. `public/logo3.png` supports a curious, slightly tilted expression, but its tonal treatment is not copied. Both existing files remain unchanged.

The new character is a compact articulated body beneath a recognisably related face. Head width is approximately 1.7–2 times torso width; body and limbs stay economical. There is no tail because neither existing mark supplies one. Structure/face outlines are roughly 2.5 SVG units, limbs 5–6 units, with rounded ends. No complex skinning or simulated anatomy.

Reusable parts: head/face, eye groups, torso, upper arm/forearm groups, hand endpoints, legs and feet. Default curiosity comes from the gaze and a small head tilt, not repeated exaggerated smiles. The pose sheet supplies ten visual studies:

| State | Intended motion envelope |
|---|---|
| Idle | Tiny breathing/settling movement, <=1.5px; no constant bouncing. |
| Blink | Eyelid close/open over 120–160ms, infrequently and with fixed actor offsets. |
| Look left/right | Pupil shift about 1.5–2 SVG units; head rotation <=5 degrees. |
| Reach | Upper arm/forearm rotations that preserve an intelligible hand path. |
| Pick up | Short reach below the shoulder, hand meets the object before it moves. |
| Place | Hand and object travel together; object settles before the hand withdraws. |
| Inspect | Brief held object and <=7-degree head tilt. |
| Think | Hand near temple; a genuine still interval before commitment. |
| Approve | Deliberate reach to the manual gate lever; no celebration or claim of correctness. |

Approval should focus on resemblance and restraint. If the face reads as a generic cartoon or the eye rings feel too mechanical, refine those drawings before building animation.

## 3. Initial composition

One wide 1000×560 conceptual field, close to 16:9, contains exactly the simplified brief's actors and mechanisms:

- Three monkeys: receiver, decision-maker and builder/reviewer.
- Two machines: AI sorter and AI alternatives/consequences display.
- One conveyor with six moving information objects in the future animation.
- One hand-operated decision gate, with two visible output paths.
- A small provisional assembly and feedback cue; these are not a third AI machine.

Explore and Imagine share the input/sorting/display pipeline. Decide is spatially central and has a slightly larger character. Act & Learn is a small bench, not a full fourth mechanical station. The unchosen path remains drawn. The AI display has no actuator opening the human gate.

The storyboard text labels are review annotations. The working illustration should use minimal permanent labels, with readable HTML context and concise station descriptions available outside the SVG.

## 4. Six-frame storyboard and 16-second timeline

| Time | Frame | Mechanical activity | Human activity |
|---|---|---|---|
| 0–2.5s | Information arrives | Six tokens feed at a steady speed; only a few change position at once. | Receiver notices an incoming object. |
| 2.5–5s | AI organises | Sorter indexes; two different arrangements and consequence marks appear. | Receiver inspects; decision-maker looks between options. |
| 5–8s | A person examines | Local machine indicators keep a restrained rhythm; gate remains closed. | Look left, look right, hold still. This pause is the narrative emphasis. |
| 8–10s | The human commits | A route is activated only after the lever moves. | Decision-maker reaches, contacts the lever, then selects. |
| 10–13s | The system responds | Selected piece is handed onward; the other arrangement remains visible. | Builder picks up and places the piece. |
| 13–16s | Review and begin again | Feedback cue appears; next information enters. | Builder adjusts the provisional structure; receiver turns back to the input. |

The drawings express these events; they do not yet encode timing or a functioning material flow. Stage 2 must make the hand/object contacts, lever actuation and timing causal in the browser.

### Loop continuity

Do not erase a completed structure at 16s or teleport an object through open space. Keep a base module and one provisional piece as persistent state. The next cycle starts with those pieces still present; the builder can lift/reseat or exchange the provisional piece. Tokens reset only when fully inside an opaque sorting housing or outside the clipped entry. Actor phase offsets and belt travel should meet their starting transforms at the cycle boundary. Verify the 15.5–16.5s interval explicitly.

For a relaxed default, demonstrate route A in the authored loop. A visitor's request for B overrides that route until revised/reset. This is fictional choreography representing the human role; it is not an autonomous system exercising real human judgement.

## 5. Interaction specification

| Input | Behaviour | Boundary |
|---|---|---|
| Watch | Automatic 16s loop when in view, tab visible, motion permitted and not manually paused. | Never hides or delays the page's explanation/CTA. |
| Pause/play | Explicit native control stops the scene in place. | Scrolling away/back must not clear a manual pause. |
| Monkey hover/focus | One short glance/blink, then return to the current task. | Do not interrupt a held object or an in-progress lever movement. |
| Monkey tap/activation | Same named reaction, discoverable through visible labelled controls. | No hover-only functionality or tiny mandatory SVG target. |
| Machine hover/focus | Only that machine's indicator or piston speeds to at most 1.5×. | No global clock, conveyor or decision pause acceleration. |
| Machine tap/activation | Bounded local processing reaction, then normal rhythm. | No permanent mode change hidden behind hover. |
| Request route A/B | A native button requests a route; the monkey visibly examines then selects it. | A request never instantly opens a machine-controlled gate. |
| Revise request | Latest request replaces the queued request; acknowledgement updates immediately. | If the handoff is already committed, finish it and apply the revision to the next examination phase. |

Separate **requested** from **committed** states. Buttons' pressed state describes the requested route. The polite status first says that route B is requested and the character is inspecting, then announces the illustrated human commitment when the lever moves. It should not announce every belt movement or automatic blink.

Normal motion minimum examination interval after a manual request: approximately 700ms. A late request queues for the next safe boundary. Choosing the other route changes its highlighting and resulting piece/assembly arrangement; both alternatives remain visible. No score, judgement-quality rating or invented business recommendation.

## 6. Accessibility and responsive behaviour

Include a visible pause/play control because the automatic movement lasts more than five seconds beside other content. This follows [WCAG's Pause, Stop, Hide guidance](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html), not merely a hover convention.

- Native controls with visible labels, focus rings and approximately 44px touch targets.
- Focus does not move automatically after choosing or revising a route.
- A meaningful SVG title/description and a visible text summary explain the entire process.
- Decorative parts do not create dozens of accessibility-tree nodes. Describe the figure once; put interactions in HTML controls, not an inaccessible canvas hit map.
- Reduced motion shows the complete static composition. Selection changes words, outlines and state directly, with no moving lever, token transfer, blink or spatial transition. Explicit play does not override this preference.
- Without JavaScript, show a complete still and the process explanation. Hide non-functional controls until enhancement is ready. Do not start CSS animation before the controller confirms visibility/motion permissions.
- At tablet widths, reduce empty station gaps while preserving character proportions.
- Below approximately 640px, use the dedicated one-monkey/one-machine composition. The same actor receives, inspects, commits and reviews. This preserves the story rather than the desktop headcount.

Prefer one set of HTML controls/summary shared by the responsive scenes. If desktop and mobile SVG layouts are both present in markup, pause all animation in the hidden layout and scope internal IDs uniquely. An alternative single SVG is acceptable only if its mobile arrangement truly increases character size instead of simply shrinking the desktop scene.

## 7. Stage 2 technical plan

After concept approval, add only `/lab/monkey-factory/`, with no homepage integration. Proposed files:

| File | Responsibility |
|---|---|
| `src/components/interactive/MonkeyFactory.astro` | Figure, scene composition, readable summary and native controls. |
| `MonkeyCharacter.astro` | Reusable SVG character groups/pose attributes with unique prefixes. |
| `FactoryMachine.astro` | Two simple machine variants; local motion scope. |
| `ConveyorBelt.astro` | One belt and six token paths. |
| `DecisionStation.astro` | Human lever and persistent alternative paths. Split only if it improves clarity. |
| `src/lib/factory-animation.ts` | Small deterministic phase controller and local interaction state. |
| `src/styles/monkey-factory.css` | Component-prefixed drawing, motion and responsive rules. |
| `src/pages/lab/monkey-factory.astro` | Isolated noindex review route, with the site's existing typography. |

Use CSS transforms/keyframes for the repetitive motions and a controller that schedules phase boundaries, rather than rebuilding SVG paths every frame. `IntersectionObserver`, `visibilitychange` and a live `matchMedia` listener determine whether motion may run. Track elapsed active time so pausing/resuming does not restart the scene or skip the decision. Local hover reactions must not change the main phase clock.

Avoid continuous layout reads, per-frame bounding boxes, physics, Canvas/WebGL, image sequences or external services. Use requestAnimationFrame only if a particular synchronisation need cannot be satisfied with scheduled boundaries; demonstrate that need before adding it.

Initial targets: <=350 visible SVG elements, <=30KB gzip SVG markup and <=6KB gzip interaction code. These are review budgets to measure, not achieved results. Preserve aspect ratio to avoid layout shift; no new network request is needed for scene animation.

### Stage 2 verification

Run `npx astro check` and `npm run build`; start any dev server with `astro dev --background` and manage it with status/logs/stop. Test desktop/tablet/mobile, native keyboard/touch, queued/revised choices, pause/resume, offscreen/tab-hidden behaviour, reduced motion at load and when changed, and no-JavaScript meaning. Inspect multiple loops and transitions across the cycle boundary. Capture desktop/mobile screenshots and a short motion demonstration if available.

Environment preflight: the currently installed Node executable failed to load `libllhttp.9.3.dylib` during this Stage 1 inspection. No global installation or library change was attempted. Stage 1 browser research and static rendering used Python's standard library instead. Verify a working project-compatible Node runtime before Stage 2; this issue does not justify modifying application dependencies or claiming an Astro build passed now.

## 8. Integration recommendation, reserved for Stage 3

Keep Find Formation intact. The factory should explain differentiated human/AI contributions; Find Formation explains commitments, constraints and exclusions. The strongest eventual home is within Human–AI Decision Design or How We Work. If added to the homepage after approval, treat it as an editorial illustration inside the Practice movement rather than a competing hero or another automatic experience above Find Formation.

The current workspace hero reads “If AI does the work, what are you doing?” and uses the user's revised supporting copy. These edits are preserved. The older headline quoted in the brief is not an instruction to restore it during this task.

## 9. Stage 1 validation and approval

Static SVG documents parse successfully. The concept board was rendered at 1440px and 375px; both reported no horizontal overflow or missing images. Rendered views were inspected to check pose legibility, decision-gate placement and the mobile reduction. This is not animation or accessibility conformance testing.

Source/asset file hashes captured at the start are used to verify that existing `src/` and `public/` files remain unchanged. No `.astro` or `.ts` implementation was created, so no Astro check/build was required or claimed for Stage 1.

Approve or revise: character resemblance, open-workbench composition, the examination pause and 16-second cycle, visitor-request/illustrated-human-commitment distinction, mobile reduction and the scoped illustration palette. Only then build the isolated Stage 2 prototype. Stage 3 integration and production publication remain separate approvals.
