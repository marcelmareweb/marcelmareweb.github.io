# Redesign implementation review

Implemented locally on 29 October 2026. Nothing was pushed to GitHub or deployed.

## Definitive direction applied

- One active black/white/yellow identity and self-hosted sans-serif system across the public page families.
- Current independent strategic decision and behavioural design positioning retained, including Strategic Decision Design, Behavioural Design and Human–AI Decision Design.
- AGENTS.md and the design-reference implementation specifications reconciled. Earlier planning/prototypes are explicitly historical.
- Retired strategy/stage records moved to `planning/archive/retired-agentic-framework/`; removed from Astro collections, workshop presentation and enquiries. Compatibility component entry points no longer render the retired framework.

## Structural implementation

`SiteLayout.astro` now provides shared metadata, fonts, navigation, footer and optional progressive enhancement. Existing layout imports delegate to it. `PageIntro` gives content-sensitive measured display roles; `PracticeSection` provides meaningful capability disclosures.

Home, About, Workshops, Courses, Thinking, the map article and case template have new editorial compositions. Legal pages and 404 share the same foundation. Existing research qualifications, practitioner narrative, course data, resource URLs, canonical routes and print action are retained. The noindex factory lab remains a separate experimental experience.

## Rendered review

- [Desktop page overview](screenshots/redesign-final-1440-overview.jpg)
- [Mobile page overview](screenshots/redesign-final-390-overview.jpg)
- [Complete homepage — desktop](screenshots/redesign-final-home-full-desktop.png)
- [Complete homepage — mobile](screenshots/redesign-final-home-full-mobile.png)
- [Formation scene](screenshots/redesign-final-desktop-formation.png)
- [Research spread](screenshots/redesign-final-desktop-research.png)
- [Course inspector](screenshots/redesign-course-inspector.png)
- [Mobile navigation](screenshots/redesign-mobile-menu.png)
- [Mobile map](screenshots/redesign-final-mobile-map.png)

The saved Playwright captures show the actual rendered Astro implementation. Astro's development toolbar was hidden in final captures; application content was not replaced or mocked for visual review.

## Measured typography

At 1440px the computed Archivo sizes are 174.944px for the homepage proposition, 145.648px for About/Workshops, 248.992px for Thinking, and 98px for the longer course/article/case headings. These are the actual reference-derived clamp results, with weight 600 and deliberate tight leading/tracking. Supporting copy, section rhythm and grid values also use the extracted formulas.

## Verification completed

| Check | Result |
| --- | --- |
| `npx astro check` | 48 files; 0 errors, 0 warnings, 0 hints |
| `npm run build` | Successful static build; 11 pages generated |
| Public page/viewport sweep | 45 combinations: 9 routes × 320, 390, 768, 1024, 1440px. Correct 200 responses, one main h1, no document overflow, no retired positioning text |
| 404 | Correct custom page and HTTP 404 |
| Built internal routes, anchors and IDs | 11 HTML pages checked; no missing internal routes/anchors or duplicate IDs |
| Mobile menu | Open/close, body scroll lock, native focus containment, Tab wrap, Escape and focus return verified; short landscape layout checked |
| Formation | Two selected commitments retained when a third was attempted; status explained the limit; reset worked |
| Practice disclosure | Native open state and visible content verified |
| Course modules | Click, End, Home and ArrowDown selected the correct panel; roving tabindex and selected state verified; module 02 propagated into enquiry context |
| Enquiry | Pending, success, failure, retained input and email fallback verified with intercepted POST requests. No real enquiry sent; no retired stage field in payload |
| JavaScript disabled | Native menu, open worked example and all six course modules remained available; module disclosure opened |
| Reduced motion | Preference detected, no pending reveal targets, native scroll behavior became auto |
| Case print | Print button binding verified with a stub; print media hides header/footer/actions and retains case content |
| Source audit | No editorial serif families, retired palette literals or retired framework copy in active source/public SVGs |
| `git diff --check` | Passed |

Responsive audit data: [final route audit](evidence/redesign-final-route-audit.json). Form-state data: [mocked enquiry audit](evidence/redesign-enquiry-audit.json).

## Refinements from inspection

The initial narrow sweep found the footer title/arrow exceeding 320px width. Its narrow layout was refined and the final sweep passed. Navigation spacing was tightened at mobile widths. Diagram and proposal-table overflow are deliberately contained inside labelled scroll regions, with equivalent readable HTML content outside the diagram. Footer branding is now white on black.

## Practical verification limits

The Substack feed was unavailable during the local build, which successfully used the existing local fallback mechanism. External course destinations and actual enquiry-provider delivery were not certified end to end. Form tests intercepted requests locally; they demonstrate UI/request behavior rather than live email delivery. Print CSS and its trigger were tested, not a physical printer or exported PDF. Browser checks used Chromium viewport emulation, not physical devices.

The local preview server used for the audit is stopped during teardown. Restart with `npx astro dev --background` to review interactively.


## Later practice-card redesign

`PracticeSection.astro` now presents the same three current capabilities as large black editorial cards with measured reference typography and original yellow/graphite SVG sculptures. The former row styles were removed from the shared stylesheet. The evidence, thinking, enquiry and footer content remain outside this component's scope.

A fresh browser inspection of Huge's Approach page confirmed the screenshot's horizontal pinned card family. The local implementation adds direct/previous/next navigation, keyboard access, native Questions & outcomes disclosures, a mobile swipe rail and a reduced-motion vertical stack. No-JavaScript native scrolling and disclosures remain usable. No dependencies were added.

Rendered geometry passed at 320×844, 390×844, 768×1024, 1024×768, 1440×900, 1920×1080 and 844×390: no card/document overflow, all title/summary text inside its card, and mobile art clear of headings. Scroll progression, direct/arrow controls, Home/End/ArrowRight, Tab into offscreen disclosures, Enter/Space, emulated touch swipe, touch disclosure, no-JavaScript access and reduced motion passed. Astro check reports 0 errors, 0 warnings and 0 hints; production build succeeds.

[Audit](evidence/practice-cards-audit.json), [desktop](screenshots/ape-practice-card-1-desktop.png), [mobile](screenshots/ape-practice-card-mobile.png), [expanded mobile content](screenshots/ape-practice-card-details-mobile.png), [reduced motion](screenshots/ape-practice-cards-reduced-motion.png). Browser tooling/header were hidden in component captures. Browser tests use Chromium and emulation, not physical-device or screen-reader certification.


## Later executive masterclass

The approved E–P–I–A–S executive curriculum is implemented at `/workshops/strategic-design-leadership/`, linked from Workshops through the existing teaser component. It is scoped to this programme. The original Find Formation component's markup/styles are unchanged; its event binding now shares a typed helper with the masterclass, while its original two-choice policy remains intact.

All five complete sessions, supplied tools, morning/afternoon content, outputs, direct/next navigation, pointer preview, keyboard activation/movement, Escape, focus restoration, touch, no-JavaScript native disclosures and reduced motion passed Playwright review. Geometry passed at 320, 390, 768, 1024, 1440 and 1920px for every expanded session. Original Formation desktop/mobile regression passed. Both built workshop routes have valid internal links/anchors, one h1 and no duplicate IDs.

Astro check: 57 files, zero errors/warnings/hints. Production build: 12 static pages, successful. No dependency added, enquiries sent, push or deployment. [Implementation](MASTERCLASS_IMPLEMENTATION.md), [audit](evidence/masterclass-audit.json), [desktop formation](screenshots/masterclass-formation-desktop.png), [expanded mobile](screenshots/masterclass-session-mobile.png).
