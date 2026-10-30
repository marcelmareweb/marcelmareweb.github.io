# Component library

This is a reconstruction of **rendered component responsibilities**, not a claim to know Huge's private React source tree. **[O]** means observed DOM/computed state; **[S]** means loaded source supports the mechanism; **[I]** means an inferred component boundary. Proposed Spotted Ape components are separately marked **[P]**. Current implementation requirements are in [DEFINITIVE_DIRECTION.md](DEFINITIVE_DIRECTION.md).

## 1. Reference component map

**[I]** The inspected pages can be understood as a shared site shell surrounding several deliberately different content families:

```text
Site shell
  Fixed navigation + separate progressive blur
  Mobile navigation dialog
  Page transition surface
  Content/full-bleed outer grid
  Page-specific scenes
  Two destination invitations
  Farewell + subscription + navigation footer

Page-specific scenes
  Typographic opening | Image/video opening | Article opening
  Statement | Narrative/media split | Stats | Logo wall
  Work gallery | Capability grid | Capability sequence
  Leadership/office carousel | History/accelerator cards
  Benefits selector | Editorial list | Form | Legal index
```

The source exposes names such as `NavMobile`, `ParagraphSweep`, and `RevealOnScroll`, and DOM attributes such as `data-follower-item`, `data-projects-stacking-card`, and `data-radial-cards-marquee`. These support the existence of reusable behaviors, while the diagram above remains an analytical grouping.

## 2. Shared shell

### R01 — Desktop navigation [O/S]

- **Anatomy:** SVG wordmark link; six plain text links; separate solid contact pill.
- **Geometry:** fixed top edge, 70px high, 40px left/right padding at 1440px. Wordmark approximately 70.71 × 30px. Navigation links 16px, 400, −.03em tracking. Main nav gap derives from the fluid `spacing-12` token (about 47.49px at 1440px).
- **Contact control:** measured approximately 120.7 × 44px, 16px/600, 999px radius. Light on dark scenes, dark on white scenes.
- **States:** normal; character-rollover link hover; circle-fill pill hover; pressed opacity/colour; focus-ring declarations; theme changes as content moves behind the header.
- **Responsive:** full navigation starts at 1024px. The wordmark remains visible when the rest becomes a Menu button.
- **Evidence:** [home DOM](evidence/home-dom-desktop.json), [header markup](evidence/header-markup.json), [header measurement](evidence/header-and-logo-css.json), screenshots [01](screenshots/huge-01-home-desktop.png), [02](screenshots/huge-02-nav-hover.png), [03](screenshots/huge-03-cta-hover.png).

### R02 — Progressive blur canopy [O/S]

A separate fixed layer sits beneath the sharp header. The measured `.progressive-blur.is--top` was 1440px wide, approximately 286.55px high, and z-index 40; header z-index was 50. Three absolutely positioned masked layers progressively increase blur. They obscure passing content near the top edge without blurring the navigation itself.

Do not implement this as `backdrop-filter` on the whole header and expect the same effect. Reference measurements are in [fixed layers](evidence/fixed-layers.json). Blur values were state-dependent; they are not universal constants.

### R03 — Mobile navigation dialog [O/S]

- **Trigger:** compact pill reading Menu, `aria-haspopup="dialog"`, changing `aria-expanded`.
- **Panel:** `role="dialog"`, `aria-modal="true"`, full viewport, white theme, magenta wordmark, circular outlined Close control at top right. Closed state is inert, invisible, opacity 0.
- **Content:** six links at 32px/600 with tight .9 leading; black contact pill below; magenta final line near the bottom.
- **Layout:** 20px side margins at 390px. Portrait links stack. Short landscape layout uses two columns and three rows, with smaller spacing and repositioned close/CTA/footer elements.
- **States tested:** open, Escape close, link selection. Body overflow became hidden. Source attempts focus placement and restores trigger focus on close; a complete focus-trap audit was not performed.
- **Evidence:** screenshots [portrait](screenshots/huge-39-mobile-menu.png), [landscape](screenshots/huge-63-mobile-menu-landscape.png); [source detail](evidence/animation-source-detail.json).

### R04 — Footer and paired invitations [O]

The footer is a major scene: oversized white farewell on near-black; primary destination links in a substantial text scale; smaller social/contact/legal links; a wide white email field with circular arrow submit control; privacy note; compact copyright row. The farewell varies by page (for example Bye., Done., Made it.).

Above it, paired link panels offer a content destination and contact destination. The two invitation links can contain large media/text treatments; they are not ordinary small buttons. Footer and invitations should be modeled separately.

Evidence: [footer capture](screenshots/huge-09-home-footer.png), newsletter and Work captures. Input's accessible name is Company email; arrow button has Subscribe label. Success/error submission states were not tested.

## 3. Openings and editorial modules

| Component | Anatomy and measured specification | Responsive / state behavior |
| --- | --- | --- |
| **R05 Home greeting** [O/S] | Full `min-height: 100svh` scene; dark background; object image fills a large central area; greeting and short display paragraph anchored lower left. Greeting 284.8px at desktop, 600, −.07em. | 161.85px at 390px. Image recrops rather than becoming a small thumbnail. Showreel shifts from desktop fixed behavior into the mobile content flow. |
| **R06 Typographic opening** [O] | Huge headline, short explanatory paragraph below, optional CTA. 1440px secondary titles measured 248.992px with .77 leading; paragraph 43.248px. No card container around the text. | Each title has its own fit/wrapping decisions. Work 95px, Solutions 108px, Contact 39px at 390px. |
| **R07 Media opening** [O] | Full-height case/solution media; breadcrumb near top; lower-left title and deck; theme chosen for contrast. Title 174.944/.9 at 1440px; deck about 57.456/.9. | Reframed image/video; title wraps into available width. This differs from the typographic opening. |
| **R08 Statement + link rail** [O/S] | Broad left statement; narrower right list of six route links with arrows. Home statement uses line-based text-colour sweep. Large spaces above/below. | Columns collapse; all destinations remain text links. Pointer trail is decorative and desktop-gated. |
| **R09 Narrative/media split** [O] | Repeated half-width media and editorial content; heading roughly 43.248px; body often 25.184px. Case article column around 672px at desktop. | Stacks to one column; reading remains document flow. |
| **R10 Outcome/stat group** [O] | Large numerals, compact descriptive labels, ample separation; no chart chrome unless content requires it. Company numbers measured 98px; labels about 25.184px. | Groups wrap/stack. Numbers should remain associated with their descriptions. |
| **R11 Article opening/body** [O] | Large rounded landscape image, breadcrumb, display title/deck, side metadata/sharing, narrower reading body. Article title 145.648px desktop; body 25.184px in 672px column. | Article title 68px in the measured mobile state; body width 350px. Subheadings 32/36.8px. |

Representative captures: [home](screenshots/huge-01-home-desktop.png), [typographic opening](screenshots/huge-12-solutions-desktop.png), [media opening](screenshots/huge-28-ai-activation-desktop.png), [statement](screenshots/huge-04-home-statement.png), [case body](screenshots/huge-31-case-cointracker-1800.png), [article](screenshots/huge-32-article-desktop.png).

## 4. Galleries, capabilities, and selectors

### R12 — Client logo wall [O/S]

Wrapped flex list with **8px gaps**, rounded **8px** neutral tiles, centred monochrome logos. Tile proportions are square, established through a 100% padding spacer. Desktop items use `calc(25% - 6px)`; the smaller layout uses `calc(50% - 4px)`. CSS hides items from the ninth onward in the inspected list, while runtime cycling replaces visible logos.

At 1440px and 1360px content width, a four-column tile is 334px wide. Logo containers occupy a much smaller central portion. The inspected wall contained no links, buttons, or tabindex targets: it should not be described as a filter or selectable partner list. Evidence: [logo CSS](evidence/header-and-logo-css.json), [capture](screenshots/huge-64-client-logos.png).

### R13 — Work feature card and gallery [O/S]

Full-card anchor with background image, lower-left client name and description, strong image crop, rounded corners. In the homepage gallery, viewport-sized feature cards move laterally while the section is pinned; neighboring card edges help reveal the sequence. The listing page uses vertical document progression instead of requiring the same homepage scroll scene. Work-card hover was inspected; the sampled image's computed transform remained `none`, so a generic image-zoom specification is not justified.

The gallery carries substantial scroll distance. Its section height cannot be treated as a static component height. Mobile cards are vertically browseable. Evidence: [home mid-gallery](screenshots/huge-06-home-work-mid.png), [Work listing](screenshots/huge-67-work-grid.png), [mobile listing](screenshots/huge-43-work-cards-mobile.png).

### R14 — Capability tile [O/S]

On Solutions: six full-card links in two columns. Warm neutral surface; 20px radius; title at upper left and short proposition below. DOM uses a desktop minimum height of 500px and 4:3 aspect ratio, approximately 62.2px horizontal padding from the fluid token in this viewport. Title 77.856px, 600. This produces a content width around 552px inside a roughly 677px tile in the measured run.

Desktop hover adds a floating preview image near the pointer. Mobile: one column, 300px minimum height in the class contract, title 40px, explicit circular arrow cue, no need to discover the link through hover. Evidence: [hover](screenshots/huge-14-solution-card-hover.png), [mobile](screenshots/huge-41-solutions-cards-mobile.png), [solutions measurements](evidence/solutions-desktop.json).

### R15 — Oversized capability sequence [O/S]

Homepage services are a separate component from R14. Numbered indices in magenta, enormous black titles, short summaries, cream/white rounded sheets, long scroll progression and stacking transformations. Sample title uses display-l (145.648px desktop); index and text create a strong vertical sequence. Do not reuse the desktop tile dimensions for these scenes.

### R16 — Leadership / office carousel [O/S]

Overflowing media cards, visible adjacent items, circular Previous/Next controls, and a draggable Swiper wrapper. Leadership names measured 57.456px desktop, with smaller role copy. Card widths vary with their visual composition; the inspected set included 318px and 432px content widths. Next moved the wrapper **−342px** in desktop testing and **−315px** in mobile testing. Those are measured slide advances, not a universal carousel token.

Retain names and roles in document semantics; images alone cannot communicate the destination. Evidence: [desktop advanced state](screenshots/huge-19-leadership-carousel.png), [mobile advanced state](screenshots/huge-57-leadership-mobile.png), `company-desktop.json`.

### R17 — Benefits selector [O/S]

Dark rounded panel with compact vertical pill-like choices at left and large workplace photography at right. Clicking Huge Holidays expanded copy in place and set `aria-expanded="true"`; it did **not** open a modal. A Close button is present in the feature's DOM. Selected choice, expanded explanatory content, and image form one component. Mobile stacks/reflows this relationship.

Evidence: [open state](screenshots/huge-24-benefit-open.png), `careers-desktop.json`. Closing/toggling all six options was not exhaustively tested; only the demonstrated selection behavior is asserted.

### R18 — Editorial filters and listing [O/S]

All/Ideas/News/Makers are buttons with `aria-pressed`, not an inferred tablist. The active News control becomes dark with inverse text. Selection updates query state. Featured content, regular rows/cards, newsletter insert, and Load more are distinct row variants. In the tested News state, Load more increased main article elements from 7 to 8. Do not interpret that count as a fixed backend page size.

### R19 — Contact form [O/S]

New Business/Press buttons use `aria-pressed`. Four labelled fields: Name, Email address, Company name, Message. Form has `novalidate` and custom validation hooks; inputs include success/error-icon containers. There is also a hidden honeypot. Rounded white input surfaces sit on a warm light background; Submit is a black pill with an arrow. Right-side contact alternatives become subsequent content on mobile.

Mode changes were tested; submission and custom validation outcomes were not. Decorative icons alone do not establish accessible error announcements. Evidence: [desktop form](screenshots/huge-26-contact-form.png), [mobile form](screenshots/huge-53-contact-form-mobile.png), `contact-mobile.json`.

### R20 — Sticky showreel / expanded player [O/S]

Collapsed desktop box: lower-right fixed, width 25vw, aspect 16:10, 16px corner radius, visible white border, poster and glass-like Play pill. It becomes visible after passing the opening scene. The containing div has `tabindex="0"`; controls and state are managed by the player rather than a plain linked thumbnail.

Expanded state: video surface fills a large overlay; border radius animates away; Pause and Mute controls appear; progress line runs along bottom. Click started real playback (readyState 4, currentTime advancing). Escape collapsed it, paused it, and changed muted state to true in the checked run. The expanded box's dataset recorded collapsed/expanding/expanded/collapsing phases. Source uses GSAP Flip; see [motion spec](ANIMATION_SPECIFICATIONS.md).

### R21 — Approach horizontal feature cards [O/S]

The user's HugeOS capture is from [Approach](https://www.hugeinc.com/approach), a different component from the homepage service sheets (R15). A fresh rendered inspection confirmed three black articles (HugeOS, HATs and Huge LIVE) in a pinned horizontal sequence. At 1440 × 1000, an article measured 1360 × 513px, 20px corners and 59.904px padding. The existing detailed measurement records 77.856px/70.0704px headings at weight 600, with white lead text and grey supporting lines, and 25.184px/27.7024px supporting copy. Large sculptural media occupies the right side. The sampled article itself has no link or button; scrolling drives the sequence. Live mobile heading: 40px/36px. See [fresh visual state](screenshots/huge-approach-card-reference-desktop.png), [later scroll state](screenshots/huge-approach-card-reference-scroll.png) and [audit](evidence/practice-cards-audit.json).

## 5. Spotted Ape component contracts

The adaptation should consolidate existing capabilities rather than multiply effects.

| Proposed component / responsibility | Existing starting point | Design contract |
| --- | --- | --- |
| Shared site shell | `HomeLayout.astro`, `BaseLayout.astro`, both headers/footers | Same logo size, navigation order, container edge, focus behavior. Explicit light/dark theme roles. |
| Decision hero | Homepage hero markup | Archivo 600; two clearly composed lines; one yellow commitment mark; short explanation; primary contact plus practice link. No inflated brand object. |
| Formation instrument | `home/FindFormation.astro`, `formation.js` | The illustrated shapes are native toggle buttons. Hover/focus previews dependencies and questions; click/tap keeps the shape yellow and its detail card visible. Two-priority limit, deferred alternatives, consequence text, reset and complete static fallback. See the implemented contract in INTERACTION_PATTERNS.md §9. |
| Executive masterclass formation | `masterclass/`, `executive-masterclass.ts`, `masterclass-formation.ts` | Five connected angular day cards, preview and single-session editorial expansion, persistent progression, keyboard/touch support and native disclosures without JavaScript. Reuses `formation-interactions.ts` with the original exercise; its selection policy stays programme-specific. See MASTERCLASS_IMPLEMENTATION.md. |
| Practice feature cards | `PracticeSection.astro`, `practice-cards.ts` | Three large black cards, 20px corners, measured 77.856px display headings at 1440px, original yellow/graphite SVG sculpture, preserved summary and native Questions & outcomes disclosure. Desktop scroll sequence; direct/previous/next and keyboard navigation; native mobile swipe; reduced-motion vertical stack. See INTERACTION_PATTERNS.md §10. |
| Evidence spread | Homepage project + case template | One large real artifact or semantic diagram; question/approach/finding/implication; source caption. Use research terminology accurately. |
| Method index | Existing evidence methods and `StrategicMatrix.astro` | Semantic table/diagram with yellow highlighted relationship. Never turn meaningful labels into a hover-only image. |
| Course inspector | `CourseSyllabus.astro` | Preserve the real six-module solar case and keyboard selection. Remove the unrelated retired automation-stage framework from workshops and enquiries. |
| Course artifact row | `courses.astro` | Document title, format, purpose, destination, and clear download/open affordance. Preview from an actual authorized artifact. |
| Thinking list / article | Thinking routes and content data | Clear content type, date/source when known, strong title, narrow reading measure; optional query-state filtering only when content volume warrants it. |
| Decision invitation | `BookingSection.astro` and home contact area | One question, one accountable next action, legible contact destination. Black text on yellow for a single emphatic ending. |

Component data should describe content and meaning (for example `finding`, `reviewPoint`, `source`) rather than encode animation coordinates into every content record. Implementation order and scope are in [Implementation strategy](IMPLEMENTATION_STRATEGY.md).
