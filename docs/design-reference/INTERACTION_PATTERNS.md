# Interaction patterns and test record

Investigated in a real Playwright browser on 29 October 2026. **[O]** actual interaction/state; **[S]** implementation evidence; **[I]** interpretation; **[P]** original adaptation proposal. Screenshots capture particular moments, while the state changes below establish behavior.

## 1. Navigation and orientation

### Desktop link hover [O/S]

Hovering Solutions did not open a mega-menu. It split the link text into individual spans and animated characters vertically, using a repeated text shadow to create a rollover. Each character received a .01s incremental delay. The plain nav link remained an anchor to `/solutions`.

The contact pill uses a different pattern: a circular background expands from a pointer-relative position inside a clipped rounded control. DOM inspection showed the circle's inline left/top/width changing after hover. CSS confirms .7s transform timing; this is not merely a colour crossfade.

Evidence: [hover state](screenshots/huge-02-nav-hover.png), [CTA state](screenshots/huge-03-cta-hover.png), [header markup](evidence/header-markup.json), [CSS rules](evidence/component-css-rules.json).

### Route selection and transitions [O/S]

The primary navigation leads to separate URLs. Selecting Work from the home header changed the URL and title to `/work` / Shipped. | Huge. A fixed transition surface exists at z-index 100. Outgoing home markup remained in the DOM alongside the new page for part of the client transition; therefore, querying every `main h1` immediately after navigation can return both titles.

The captured [transition moment](screenshots/huge-70-route-transition.png) and [destination state](screenshots/huge-71-route-arrived.png) document this path. They do not establish a frame-perfect route-animation duration. The normal page inspections used direct navigations or later settled states. Source includes link interception and a reduced-motion guard; exact route-transition timing is left unclaimed.

### Mobile menu [O/S]

| Action | Actual result |
| --- | --- |
| Click Menu at 390 × 844 | Full-viewport white dialog; magenta wordmark; six route links; contact CTA; footer phrase. Trigger's expanded state becomes true. |
| Inspect overflow | Body overflow becomes hidden. |
| Press Escape | Expanded state becomes false and overlay closes. |
| Reopen and choose Solutions | Destination eventually becomes `/solutions`; overlay is dismissed. A single 700ms delay was insufficient to establish destination arrival, so the result was verified with a URL wait and later direct navigation. |
| Resize to 844 × 390, reopen | Links occupy a two-column landscape grid, with compact layout around the top controls. |

Closed markup carries `inert`; open markup declares a modal dialog. Source includes focus placement/restoration. The first desktop-to-mobile test still reported the trigger as the active element during the opening interval; no complete Tab-cycle/focus-trap conformance claim is made. A future adaptation should implement and test this explicitly.

## 2. Browsing work and capabilities

### Homepage work sequence [O/S]

Moving from scroll position about 3400 to 5600 at 1440 × 1000 changed the visible project from the beginning of the gallery to Big Green Egg while the scene stayed in view. Neighboring cards remained partially visible. The section occupied about 6600px of document height in that run. Loaded scripts contain pinned horizontal-translation logic and stacked-card logic.

The correct abstraction is **scroll progress through a visual sequence**. It is not an ordinary auto-playing slideshow, nor evidence that the mouse wheel itself was blocked. Source maps wheel scrolling through Lenis and GSAP scroll mechanisms; mobile presents vertically accessible cards.

The Work listing was also scrolled independently through all nine visible project destinations. No category filter or search control was found there. Its reveal behavior should not be confused with the Ideas filter interface.

### Work hover [O]

The NBCU card was hovered after revealing the listing. It remained a whole-card anchor. The sampled image's computed transform was `none`; no image-zoom behavior is asserted for this card. The site also exposes contextual cursor/follower treatments in its interface, but those should be attributed to the components where they were actually observed.

### Solutions pointer preview [O/S]

Hovering AI activation in the Solutions tile grid produced a floating project/image preview near the pointer. The source card contains a `data-follower-visual` image and `data-follower-item` marker. Source uses smoothed x/y updates (0.4s, `power3`) for this follower family. It is a decorative preview: the title and proposition remain text in the anchor.

At mobile width the cards expose an explicit circular arrow affordance and stack. A hover-only interaction must not become the sole indication that a card can be opened.

### Home statement image trail [O/S]

Moving the pointer across the large statement created multiple small images with individual transforms and opacity. During a captured movement, visible items had distinct rotation/scale matrices. Source defaults include a 15px movement threshold, a 300ms stop interval, and a 992px minimum-width guard inside the trail initializer. The effective behavior can have additional enclosing media conditions; the inner default is not a universal site breakpoint.

This effect is decoration over the statement, not part of its semantic content. The six adjacent destination links remain usable without it. Evidence: [active trail](screenshots/huge-65-image-trail-active.png), [source excerpts](evidence/home-js-animation-excerpts.json).

## 3. Carousels, expanding content, and continuous movement

### Leadership and offices [O/S]

Company Next slide was activated on desktop and mobile. Wrapper transform changed from zero to **−342px** on desktop and **−315px** on mobile. Previous/Next labels are exposed to assistive technology. The wrapper advertises `cursor: grab`; Swiper class names and a loaded Swiper implementation support draggable/swipeable architecture. Actual drag/swipe inertia was not quantified.

The first mobile lookup failed before the reveal populated the accessible heading. Scrolling through the preceding content and letting reveals settle exposed the working carousel; the later screenshots and successful control activation are the valid result. This matters for automation and for any adaptation that hides essential content until JavaScript runs.

### Benefits [O]

Clicking Huge Holidays on Careers expanded the explanation next to the selection and set `aria-expanded="true"`. The corresponding image appeared in the same dark panel. No dialog opened. Other choices include Summer Fridays, Flex Vacation Time, Sick and Safe Leave, The GOAT, and Life Essentials. Only the demonstrated selection is claimed as tested; repeat-open/close and every option were not exhaustively audited.

### Marquees, logo cycles, history [O/S]

Careers repeats a values collection in a moving marquee. Public source includes direction-dependent timeScale changes and additional scroll-linked x translation. Client-logo tiles cycle their internal logos; the inspected tiles themselves had no actionable semantics. Company history and Approach accelerator cards use long visual sequences; source includes radial rotation about an origin below the cards. See [Animation specifications](ANIMATION_SPECIFICATIONS.md).

## 4. Ideas filters and incremental results

**[O]** All, Ideas, News, and Makers are actual buttons with `aria-pressed`. Selecting News:

1. Changed the URL to `https://www.hugeinc.com/ideas?topic=news`.
2. Set News to pressed true and other categories false.
3. Changed its background to `rgb(13,11,10)`.
4. Changed the regular listing to news items while the featured content remained separately composed.

Load more was then activated. Main article elements increased from 7 to 8; the control no longer appeared in the returned button list. This proves additional content was displayed in that state. It does not establish a universal page size, API contract, or infinite-scroll mechanism.

Evidence: [News state](screenshots/huge-36-ideas-news-filter.png), [initial listing](evidence/ideas-desktop.json). The URL behavior is useful for sharing/back navigation, although full history restoration and keyboard focus after loading were not tested.

## 5. Video lifecycle

### Showreel test [O/S]

| State/action | Verified result |
| --- | --- |
| Scroll past opening | Fixed lower-right poster visible on desktop; initially idle, collapsed, player hidden. |
| Click poster | Expanded phase, player visible, video `paused=false`, readyState 4, currentTime advanced. The checked initial playback was unmuted. |
| Click Pause | Video became paused; control label changed to Play. |
| Click Mute | Video became muted; control label changed to Unmute. |
| Inspect timeline | A `div` with `role="slider"`, accessible name Seek, was present. Seeking/arrow-key increments were not tested. |
| Escape | Player collapsed, paused, and muted in the inspected state. |

The player has explicit idle/playing/paused and expansion-phase data attributes. GSAP Flip handles geometric expansion; it is not merely scaling a bitmap. The collapsed box itself is a focusable div, so keyboard activation and close-target semantics deserve explicit validation in any future recreation.

Evidence: [expanded](screenshots/huge-51-showreel-expanded.png), [paused and muted](screenshots/huge-69-showreel-paused-muted.png), [expanded-state JSON](evidence/showreel-expanded.json).

CoinTracker's case hero is different: it contains native video with autoplay, muted, and loop enabled. Do not transfer the showreel's user-initiated sound behavior to ambient hero media.

## 6. Forms and utilities

**[O]** Contact mode selection changes `aria-pressed` between New Business and Press. The four visible fields remain Name, Email address, Company name, Message. The form's custom validation hooks, required attributes, success/error icon containers, and hidden honeypot were inspected. No personal data was entered and no form was submitted.

The newsletter input has the accessible name Company email and a Subscribe button. Submitted, pending, success, invalid-email, and server-error states are **not observed**. The article includes a Copy article link button; its clipboard/confirmation behavior was not activated. Privacy contains an internal index; reading those links is distinct from accepting legal terms.

## 7. Historical local interaction tests [O]

| Local component | Test result |
| --- | --- |
| Formation | Selected market and customers; attempted reliability as a third choice. First two remained checked, third remained unchecked. Status explained the two-commitment capacity and how to revise it. |
| Formation reset | Reset cleared the selected controls. |
| Homepage mobile menu | Native details menu opened; Escape closed it. |
| Workshop stage inspector | Clicking stage 04 displayed Architect. ArrowDown selected Steward; only Steward had `aria-selected=true` and tabindex 0, others had tabindex −1. |

The Formation exercise has a static worked-example fallback and states in source that no information is saved or sent. The matrix uses a semantic table with row/column headers, rather than making meaning depend on visual coordinates alone. Source-only observations remain separate from the tests above.

## 8. Original interaction direction [P]

- Let **choosing, deferring, and reviewing** drive interaction. The yellow marker should move only when a meaningful state changes.
- Keep normal scroll as the primary navigation. Use a static or native overflow evidence sequence instead of a long compulsory pinned gallery.
- Make hover/focus previews optional and supplementary. Essential diagram labels, outcomes, and destinations remain visible.
- Use one site-wide mobile-menu contract with Escape, restored focus, explicit expanded state, and no hidden active controls. A contained disclosure may be more appropriate than a modal for the current small navigation.
- Preserve course-module keyboard behavior and the Formation limit/status. Remove the retired five-stage workshop inspector and its enquiry fields.
- Add query-string filtering to Thinking only when content quantity makes it useful; do not build filters around two items for visual imitation.
- Use native controls wherever possible. Any future media player needs tested seek, pause, mute, keyboard operation, and a clear close control before it is considered complete.

These proposals were not implemented by the original investigation. Later local implementations are specified below.

## 9. Current Formation interaction — implemented and tested locally

The later implementation in `FindFormation.astro` and `formation.js` replaces the separate checkbox list with native buttons occupying the actual illustrated shapes. This contract supersedes the historical local checkbox test above; it is an original Spotted Ape interaction, not an observation of Huge.

| Input / state | Rendered response |
| --- | --- |
| Hover or keyboard focus | Yellow outline, restrained dark preview fill and highlighted dependency connector. The matching information card exposes requirements, resource demand and the question to investigate. Hover alone does not select. |
| Click, tap, Enter or Space | Toggles `aria-pressed`. A backed choice has solid yellow fill, black text, a check mark and a solid yellow connector. Its information card remains visible after the pointer or focus moves elsewhere. |
| Explore another shape | Shows that preview alongside every backed card. It does not remove or alter existing commitments. Keyboard focus takes precedence over a resting pointer. |
| Attempt a third commitment | Preserves the two earlier commitments and announces the capacity limit through a polite status region. Deferred choices remain available to inspect. |
| Select a backed shape again | Clears it and releases capacity; its preview remains only while hovered or keyboard focused. |
| Reset | Clears commitments and previews and restores the open state. |

The summary still identifies shared resource demands and unchosen alternatives. The illustration uses two aligned rows around a central capacity marker; it does not require sideways scrolling. The detail panel follows the diagram below 1024px and sits alongside it at larger widths. Touch selects directly without a synthetic hover. Native Tab order, focus rings, Enter/Space activation and `aria-describedby` connect each shape to its description. The worked example and all four choices' requirements/questions remain readable without JavaScript.

Selection and description changes are immediate. Shape fills and connector colours transition for 200ms with the existing `--out` easing; the global reduced-motion rule makes these effectively instant. No movement or delayed text reveal is needed to understand a choice.

Verified in Playwright at widths 320, 390, 600, 768, 1024, 1200, 1440 and 1920px, including two selected choices: no document, button or label overflow. Separate desktop, keyboard, touch-emulation, no-JavaScript and reduced-motion checks passed. [Audit](evidence/formation-direct-interaction-audit.json). Touch emulation does not certify physical-device or screen-reader behaviour.

Rendered states: [preview with retained commitment](screenshots/ape-formation-direct-preview-desktop.png), [two backed choices](screenshots/ape-formation-direct-backed-desktop.png), [keyboard focus](screenshots/ape-formation-direct-keyboard-desktop.png), [mobile touch selection](screenshots/ape-formation-direct-backed-mobile.png).

### Later typography and layout refinement

The current layout replaces the earlier staggered positions with equal-height shapes and shared text baselines. Each title has two deliberate lines. At 1440px, the illustrated titles are 30px/1.04 at weight 600, increased from 19.44px; they are 22px at 1024px, 20.3px at 390px and 18px at 320px. Index and state labels use 11px desktop / 10px mobile mono type. Shapes are 156px high on desktop and 144px on mobile, with consistent optical insets and precise SVG outlines. The rotated annotations that crowded the old nodes have been removed. Dependency labels have opaque backing so connector lines never cross the letters.

Diagram and notes begin on the same baseline from 1024px. Selected cards use a restrained yellow left rule; a preview follows backed cards so it does not displace their reading order. The explanation panel uses half its allocated desktop column width (about 285px instead of 570px at a 1440px viewport); its labels stack above their explanations to suit the narrower measure. The figure keeps its existing size, and the stacked mobile panel stays full-width. The formation summary spans below both columns. Instructions and reset share a separate toolbar; mobile instructions use the full available width. At tablet widths, notes use the available grid rather than leaving a narrow, offset column.

Rendered review covered 320, 390, 768, 1024 and 1440px. DOM Range measurements confirm every title line remains inside its shape; dependency labels clear all shapes and the capacity marker. Desktop diagram/detail start positions match exactly. Interaction, keyboard, touch, reduced-motion and no-JavaScript checks still pass. [Layout audit](evidence/formation-layout-refinement-audit.json), [desktop](screenshots/ape-formation-refined-1440.png), [mobile](screenshots/ape-formation-refined-390.png), [preview](screenshots/ape-formation-refined-preview.png). These later captures supersede the earlier direct-interaction captures for visual specification.

## 10. Practice feature-card sequence — implemented locally

`PracticeSection.astro` now uses the large editorial feature-card family observed on Huge's Approach page, replacing the previous capability rows. The three capabilities, summaries, questions, outputs and workshop destination are preserved. The artwork is original local SVG, not copied reference imagery.

At widths ≥1024px and heights ≥760px, normal document scrolling passes through a sticky stage. Vertical travel equals `track.scrollWidth − viewport.clientWidth`, and maps linearly to the negative horizontal translation. No wheel/touch interception, autoplay, smooth-scroll framework or animation library is used. At 1440 × 900, a card is 1360 × 561.6px with 20px corners, 59.904px padding, 77.856px headings and 25.184px summary text. White lead words and grey supporting lines retain the reference hierarchy; yellow identifies the practice number, active navigation and original sculptural visual.

Previous/Next and numbered buttons navigate directly. The first/last arrow is disabled at its boundary. With the card region focused, Left/Right/Home/End navigate; Tab also reaches each native disclosure and brings its card into view. Selection updates a polite status region. Questions & outcomes opens a native disclosure: on desktop, the question and output replace the decorative visual; mobile expands the content beneath the summary. Essential information is never hover-only.

Smaller/shorter viewports use a native horizontal swipe/scroll rail with snap points and the same controls. A live emulated touch swipe and touch navigation/disclosure were tested. Reduced motion removes pinning/translation and presents all three cards as a regular vertical stack. With JavaScript disabled, native scrolling, keyboard focus and disclosures still expose all three cards; unavailable enhanced controls remain hidden.

The image hover response and disclosure controls are original adaptations, not claimed as Huge observations. All three card titles/summaries fit at 320, 390, 768, 1024, 1440 and 1920px and in short landscape; mobile artwork clears the text. Desktop progression, controls, keyboard focus, native disclosures, touch swipe, reduced motion and no-JavaScript access passed. [Audit](evidence/practice-cards-audit.json), [desktop card](screenshots/ape-practice-card-1-desktop.png), [mobile card](screenshots/ape-practice-card-mobile.png), [expanded mobile content](screenshots/ape-practice-card-details-mobile.png).


## 11. Shared pill-button reveal — live reinspection, 30 October 2026

**Observed/source-confirmed reference:** the black Let’s talk pill on Huge's Approach/Work headers reveals magenta `#FF0090` through a circular layer clipped by its pill outline. Pointer entry sets the circle's x/y; pointer exit sets them again so it collapses toward the departure point. Moving inside the pill does not recenter the layer. The circle scales 0→1 on hover and back to 0 on exit, using 700ms `cubic-bezier(.625,.05,0,1)`. Its background-colour transition is 400ms with the same curve. The sampled black variant retains white text; theme-dependent white variants have different fill colours.

The public source sizes the circle from horizontal distance to the button centre: `diameterPercent = 115 + 2 × round(abs((localX − width/2) / (width/2) × 50), 1)`. This gives 115% at the ideal centre and 215% at a horizontal edge; exit coordinates can lie outside the bounding box. Entry and exit are separate events. See [audit and current public-script URL](evidence/button-hover-audit-2026-10-30.json), [reference entry](screenshots/huge-talk-entry-2026-10-30.png), [reference hover](screenshots/huge-talk-hover-2026-10-30.png) and [reference exit](screenshots/huge-talk-exit-2026-10-30.png).

**Current local implementation:** `button-hover.ts` is imported once through SiteLayout and attaches to the shared `.button` / `.btn-huge` family. CSS uses a genuine circular pseudo-element with a 1:1 aspect ratio, the reference sizing/timing and the measured entry/exit point. Pixel coordinates account for each control's actual border width. The active “Let’s talk” pills use `.button--talk`: no border, arrow or hover outline, horizontally and vertically centred text, and the existing visible keyboard focus ring. Destinations are preserved. The default fill is Spotted Ape yellow `#FFFF00`, with ink text for readable contrast. Text colour changes over the same 700ms curve; the existing yellow-button variant retains its white reveal.

Keyboard focus starts the reveal from the centre. Pointer hover is limited to hover-capable fine-pointer devices; touch does not record pointer origins or leave a latched yellow state. Reduced motion makes the transition effectively instant. Without JavaScript the centred CSS reveal and native link remain usable.

The borderless contact pill initially exposed a thin dark fringe because its black base showed through the anti-aliased edge of the clipped yellow layer. Its base now switches to yellow after the 700ms reveal completes, then immediately returns to black on exit so the circle can contract normally. This removes the dark fringe at full hover without adding a border, shadow or clipping the keyboard outline. Reduced motion removes the base-colour delay too.

Verified: left/top entry, right/bottom exit, unchanged origin while moving inside the actual pill, fully filled yellow/ink state, return to white-on-black, centred keyboard focus, homepage CTA, mobile menu/contact activation and close behaviour, no-JavaScript fallback and reduced motion. Contact activation was intercepted. Astro check: 58 files, zero errors/warnings/hints; production build: 12 pages, successful. [Local entry](screenshots/ape-talk-entry-2026-10-30.png), [hover](screenshots/ape-talk-hover-2026-10-30.png), [exit](screenshots/ape-talk-exit-2026-10-30.png), [keyboard focus](screenshots/ape-talk-focus-2026-10-30.png).
