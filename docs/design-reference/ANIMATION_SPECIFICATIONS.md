# Animation specifications

This document distinguishes **[O] browser behavior**, **[S] loaded implementation evidence**, **[I] interpretation**, and **[P] proposed Spotted Ape behavior**. Timings are source values unless explicitly described as measured. A screenshot is not a stopwatch; fixed waits used during capture do not establish animation duration.

## 1. Actual reference technology [O/S]

The live document uses Next.js assets under `/_next/static/chunks/`, React-rendered markup, a Contentstack image/media delivery origin, and route-specific public chunks. These signatures establish the observed stack, not the private component source architecture.

The loaded assets contain **GSAP**, **ScrollTrigger**, text-splitting code, **GSAP Flip**, **Lenis**, and **Swiper**. Runtime DOM corroborates them through transforms, pin wrappers, the `lenis` root class, Swiper classes, text spans, and a showreel `data-flip-id`. Presence of a library in a prefetched chunk does not prove that every page uses every feature.

Evidence:

- [Library signatures](evidence/javascript-signatures.json)
- [Homepage source excerpts](evidence/home-js-animation-excerpts.json)
- [Detailed menu/reveal/player source](evidence/animation-source-detail.json)
- [CSS component rules](evidence/component-css-rules.json)
- [Route-transition source](evidence/route-transition-source.json)

No reference libraries, assets, or scripts were installed in The Spotted Ape.

## 2. Reference timing and easing matrix

| Pattern | Actual mechanism | Timing / progress | Easing and evidence status |
| --- | --- | --- | --- |
| Text-link rollover | Individual character spans move from 0 to −1 line-height; a text shadow one line below supplies the second rendering | **.6s** transform; **.01s** incremental delay per character | `cubic-bezier(.625,.05,0,1)` [S]; spans and hover observed [O] |
| Solid-button wipe | Pointer-relative expanding circle inside overflow-clipped pill; translate to its centre + scale 0→1 | **.7s** transform; **.4s** circle background-colour transition | Same Osmo curve [S]; pointer-relative left/top/width mutation observed [O] |
| Ordinary link colour | CSS transition-colors utility | **.15s** in measured nav link | `cubic-bezier(.4,0,.2,1)` [O/S]; not the duration of the character animation |
| Mobile-menu panel enter | GSAP autoAlpha 0→1 | **.4s** from timeline position 0 | `power2.out` [S] |
| Menu icons | Rotation and autoAlpha cross-change where icon targets exist | **.4s**, starting at **.05s** | `power2.inOut` [S]; conditional targets in source |
| Mobile-menu link reveal | Split lines with moving clipped background gradient | **.9s**, stagger **.06s**, starts at **.15s** | `power2.out` [S]; gradient spans observed [O] |
| Menu CTA/footer reveal | autoAlpha | **.4s**, starts at **.25s** | `power2.out` [S] |
| Mobile-menu exit | Whole panel autoAlpha→0; then reset enter timeline | **.3s** | `power2.inOut` [S]; Escape close observed [O] |
| General content reveal | Translate and autoAlpha; children/nested groups stagger; clear inline styles when complete | **.8s** per item; start and stagger configurable | Source references configured easing [S]; initial 2em translation seen on a group [O]. Do not infer one universal distance/stagger. |
| Paragraph colour sweep | Split lines; 300%-wide text-clipped gradient; background position progresses from 100% to 0% | Scroll-linked, start **top 80%**, end **bottom 60%**; line stagger **.25** in timeline units; `scrub:true` | `none` [S]; partial magenta/grey/black phrase captured [O] |
| Pointer preview/follower family | GSAP `quickTo` on x/y, centred with xPercent/yPercent −50 | **.4s** for the sampled reusable follower family | `power3` [S]; floating solution preview observed [O]. A separate follower source also uses .6s. |
| Image-trail disappearance | Opacity→0, scale→0, rotation→240°, then hidden | **.7s** | `power2.in` [S]; multiple intermediate transforms observed [O] |
| Sticky showreel entrance | yPercent 150→0 after previous scene leaves top | **.8s** | `power4.inOut` [S] |
| Showreel expand/collapse geometry | GSAP Flip from saved bounds, scale false; clip radius animates with it | **.6s** geometry/radius; blackout approximately **.45s** | `power3.inOut` geometry; `power2.out` / `power2.inOut` blackout [S] |
| Expanded player surface enter | Surface autoAlpha; delayed video start callback | **.35s** fade; video start callback at **.5s** in source branch | `power2.out` [S]; actual playback verified [O] |
| Expanded player surface exit | autoAlpha→0 | **.25s** | `power2.in` [S] |
| Homepage showreel reveal wrapper | Fade from hidden on mount | Source default delay **.2s**, duration **.9s** in the inspected wrapper | `expo.out` [S]; distinct from sticky box entrance |
| Carousel | Swiper transform between slides | Exact configured transition duration not established | Wrapper CSS declares `cubic-bezier(.625,.05,0,1)` [S]; actual Next advances recorded [O] |
| Route transition | Fixed panel with curved top/bottom, destination label split into letters | Source has default duration **.6** and timeline timeScale **2.25/1.45**; total route sequence not measured | Registered `osmo` ease [S]; curved dark panel visible during actual navigation [O] |

The named GSAP eases above are retained as source names. They are not claimed to equal approximate CSS cubic-bezier curves.

## 3. Scroll behavior and scene mechanics

### A. Smooth document scroll [O/S]

Normal-motion homepage had `html.lenis`. Public code contains Lenis initialization and its scroll integration. CSS explicitly handles stopped scrolling, contained nested scroll regions, and pointer-event treatment for iframes during smooth scroll.

**[I]** Smooth scrolling provides a common progress signal for the scenes. This does not require The Spotted Ape to adopt scroll smoothing. The source's exact runtime damping/lerp setting was not established, so none is invented here.

### B. Horizontal pinned scene [O/S]

Loaded horizontal-scroll code:

- Finds a horizontal track and its scene wrapper.
- Translates the track by the negative overflow width: `scrollWidth − clientWidth`.
- Pins from `top top`.
- Sets end travel to the same overflow distance.
- Uses linear easing, `scrub:true`, and invalidates on refresh.

The homepage work gallery visibly progressed laterally as document scroll changed. Its approximately 6600px document footprint in the 1440 × 1000 run includes scroll travel. A card's height and its section's scroll budget are separate design parameters.

### C. Stacking sheets and dimming [O/S]

Homepage services and related feature sequences expose stack-related attributes and transforms. Public source includes measured intro/card CSS variables, sticky relationships, dynamic top offsets, and an underlying-card dim variable whose target depends on stack index (`.75` raised to an index). That dimming tween uses **scrub .5** in the inspected source branch.

**[I]** The impression is of one large editorial sheet yielding to the next. The exact number of stack levels and all per-card offsets are content/viewport dependent; the capture does not justify a single universal stacking recipe.

### D. Radial card sequences [S/O]

Public radial-card code sets a transform origin at 50% horizontally and a distance below the card assembly. It rotates the assembly by a per-card angle across the collection; the section pins from `bottom bottom`, with end travel based on viewport height × `(cardCount − 1)` × **.6**. Rotation uses linear easing and `scrub:true`.

Company history and Approach accelerator scenes have the corresponding long card-sequence presentation. This is a different construction from the horizontal track; a shared word such as “carousel” would hide that distinction.

### E. Marquees and autonomous movement [O/S]

Careers values repeat in a continuous marquee. Source changes timeScale with scroll direction and also applies a linear x offset while the marquee is in view (`scrub:0`). Logo walls cycle individual logos inside fixed tiles. The rotating homepage audience word changes among people, businesses, and culture.

Cycle intervals for the logo wall and audience word were not established. Do not substitute arbitrary three- or five-second timers and label them observed specifications.

### F. Footer and sticky-media coordination [S/O]

The sticky player source computes a vertical correction from overlap with a `data-footer-parallax` target. The player is moved away as the footer enters instead of permanently covering the subscription/nav area. The footer screenshot captures the player displaced toward the top edge. This is content-aware positioning, not a fixed bottom-right box for the entire document.

## 4. Reduced motion and responsive gates

**[O]** Under `prefers-reduced-motion: reduce`, reloaded desktop homepage:

- Root had no `lenis` class.
- The checked DOM had **zero `.pin-spacer` nodes**.
- Character-span computed transition duration was approximately **one microsecond**.
- The page still displayed work/content in document flow; a screenshot was captured at scrollY 4000.

The run's document height was **18,366px**; the earlier normal-motion run was about **22,804px**. Content loading and viewport state affect absolute height; these are corroborating measurements, not normative layout values.

**[S]** Shared animation hooks use a `prefers-reduced-motion: no-preference` media gate. Button/character CSS removes transitions in reduced-motion mode. Flip/player timing multiplies by the absence of reduced motion or uses duration 0. Mobile-menu source jumps its timeline to the relevant end state.

**[S/O]** Desktop-only and hover-capable conditions govern some followers; the image-trail initializer has its own minimum-width check. The desktop showreel uses fixed positioning at ≥1024px while its mobile box is in content flow. Therefore, reducing animation duration alone is not an adequate responsive adaptation.

Reduced motion was not used to certify that every autoplay video and third-party embed pauses. That behavior would need a separate media audit.

## 5. Definitive implementation motion

Follow [DEFINITIVE_DIRECTION.md](DEFINITIVE_DIRECTION.md). Use the measured reference `cubic-bezier(.625,.05,0,1)` for 700ms button fills and restrained hover responses. Optional entrances use the observed 800ms role and small translations, only after progressive enhancement. Native scrolling remains the baseline.

Navigation must support keyboard, Escape and focus return. Native disclosures expose meaningful capability detail. Formation updates selected/deferred fill/strokes and live consequence text. Course tabs update their panel immediately with roving tabindex and ArrowUp/Down/Home/End. No retired automation-stage inspector is used.

The implemented Formation diagram uses 200ms `--out` colour transitions on shape backgrounds and dependency strokes. Hover/focus previews and selected detail cards update immediately; the selected yellow fill persists independently of hover. No translation, entrance animation or delayed text is applied to these essential details. See INTERACTION_PATTERNS.md §9 for the current control contract and test evidence.

Reduced motion removes optional translations/entrances and smooth scrolling. Essential content is visible without JavaScript. Do not split or hide whole paragraphs for a decorative reveal. Suspend existing experimental loops when offscreen and keep the factory experience scoped to its lab route.


## 6. Implemented practice feature-card sequence

The Approach feature-card reference is a horizontal pinned scene (section 3B), rather than a service-card stack. `practice-cards.ts` reproduces that interaction family with native document scroll and one requestAnimationFrame update per scroll frame. Horizontal translation equals the negative clamped vertical distance through the scene; travel is the track overflow width. There is no independent duration or easing on the scroll translation.

The sticky scene is enabled only at widths ≥1024px, heights ≥760px and without reduced motion. Smaller/shorter screens use native horizontal scrolling and snap points. Navigation calls browser-native smooth scrolling; its timing is browser-defined. Keyboard focus moving to another desktop disclosure uses instant positioning so the focused content is visible.

Original local responses: 600ms `--out` artwork transform on desktop hover (−6px and 2°), 300ms visual opacity when opening a disclosure, 300ms disclosure-icon rotation and control colour responses. Text is never animated away. Mobile does not move its artwork on hover. Reduced motion uses a static vertical card stack and the global effectively-zero transition durations. See [interaction contract](INTERACTION_PATTERNS.md#10-practice-feature-card-sequence--implemented-locally) and [audit](evidence/practice-cards-audit.json).


## 7. Implemented shared pill-button reveal

Live reinspection on 30 October 2026 confirmed the reference circle geometry and its entry/exit handler in Huge's current public chunk (linked in the [audit](evidence/button-hover-audit-2026-10-30.json)). The local `.button` / `.btn-huge` family now uses that pointer-relative circular scale reveal in yellow, replacing its former fixed-origin translation. It does not follow the pointer while inside a button.

- Circle transform: `translate(-50%, -50%) scale(0→1) rotate(.001deg)`, 700ms Osmo easing.
- Circle origin: entry point; updated again at exit. Diameter: 115% at the ideal centre, increasing to 215% at horizontal edges according to the inspected formula.
- Fill colour transition: 400ms Osmo; local default fill `#FFFF00`.
- Local foreground: white→ink over 700ms Osmo, preserving readability on yellow.
- Borderless contact-pill base: switches to yellow after the 700ms reveal, eliminating the black anti-aliasing fringe at full hover/focus; resets immediately on exit. Reduced motion removes this delay.
- Keyboard focus: centred origin. Touch: native activation without hover latching. Reduced motion: existing global 0.01ms duration removes visible movement. No JavaScript: centred CSS fallback.

See INTERACTION_PATTERNS.md §11 for behaviour, accessibility checks and rendered states. No library, layout change or extra decorative DOM layer was introduced.
