# Design analysis — Huge, October 2026

## 1. Findings

Huge's current visual language combines **large, compressed Matter typography; almost empty neutral surfaces; richly art-directed media; and substantial changes of scale and movement between sections**. It is not primarily a card-and-shadow interface. The header is small and persistent; the main statements are enormous; image regions take over the viewport; the footer delivers another oversized word rather than quietly disappearing.

The most transferable principle for The Spotted Ape is **decisive hierarchy**. One claim, image, or relationship dominates each scene. The strongest original opportunity is to give that same compositional confidence to the existing choices, commitments, evidence, and human review material, using black, white, and yellow.

Unless otherwise marked, factual findings below are **[O]**, with implementation corroboration identified as **[S]**. Interpretations are **[I]**. Proposed changes are **[P]** and are developed in the other documents.

## 2. Investigation method and boundaries

The actual website was navigated, scrolled, hovered, clicked, and resized in Playwright. The investigation included DOM and accessibility snapshots, `getComputedStyle`, bounding rectangles, loaded font faces, CSSOM rules, public JavaScript excerpts, video state, pressed/expanded states, and URL changes. Screenshots include both settled and transitional states.

Primary desktop: **1440 × 1000**. Primary mobile viewport: **390 × 844**. Additional viewport checks: **768, 1023, 1024, and 1920px** widths; landscape menu at **844 × 390**. Reduced-motion mode was explicitly emulated and the homepage reloaded.

The six primary navigation destinations and contact were explored, all six solution detail pages were scrolled, and representative case, article, profile, newsletter, and legal templates were inspected. This covers **20 distinct reference URLs**, plus the Ideas query-string state. It is a template and significant-page investigation, not a claim to have read every historical article or case-study URL.

Forms were inspected and their modes switched; no inquiry or subscription was sent. External social links, Greenhouse application flows, and embedded third-party destinations were not completed. No authenticated access was needed. Some visits produced asset/analytics console warnings and an occasional resource error; these do not establish a site-wide defect. No formal performance benchmark or comprehensive accessibility certification is claimed.

Several offscreen headings are initially empty and populated/split during reveal setup. The saved JSON is a record of that runtime state, not proof that a CMS field was missing. A client-side page transition briefly retained outgoing page markup; the mobile Solutions measurements were recaptured after a direct navigation to avoid mixing the two pages.

## 3. Page and template inventory

| Live page | Specific observed composition and behavior | Evidence |
| --- | --- | --- |
| [Home](https://www.hugeinc.com/) | Dark full-height opening; pink dimensional H behind a bottom-left greeting; rotating audience word; large statement and six right-side links; cycling logo wall; pinned work sequence; partnership narrative; oversized service sequence; ideas; paired invitations; enormous farewell/footer. A showreel becomes fixed at lower right on desktop. | `home-dom-desktop.json`, `home-scroll-implementation.json`; screenshots 01, 04–09, 51, 64–65 |
| [Work](https://www.hugeinc.com/work) | Oversized short opening, supporting paragraph, logo wall, image-led project listing, paired final invitations. Project content reveals as it enters view. **No work-category filter, search, or pagination control was found** in the inspected main DOM. | `work-desktop.json`; screenshots 10–11, 67–68 |
| [Solutions](https://www.hugeinc.com/solutions) | Short typographic opening, large media region, six two-column capability tiles, leadership carousel, extended working-principles section, invitations. Capability hover produces an image near the pointer. | `solutions-desktop.json`; screenshots 12–14 |
| [Approach](https://www.hugeinc.com/approach) | Two-line typographic opening; human/AI operating model; HugeOS, HATs, LIVE product highlights; accelerator cards; partner logos. Sections use much larger type than ordinary body copy. | `approach-desktop.json`; screenshots 15–16 |
| [Company](https://www.hugeinc.com/company) | Cream opening, large team image, grouped numbers, statement, leadership carousel, chronological history in a scroll-driven card arrangement, values, invitations. | `company-desktop.json`; screenshots 17–19 |
| [Ideas](https://www.hugeinc.com/ideas) | Large title; featured article; All/Ideas/News/Makers controls; editorial image/text listing; newsletter interruption; Load more. News selection changes the URL to `?topic=news`. | `ideas-desktop.json`; screenshots 20–21, 36 |
| [Careers](https://www.hugeinc.com/careers) | Large invitation; moving values marquee; large workplace photography; benefits selector with expanding copy and changing image; axe story; office carousel; values; live job links. | `careers-desktop.json`; screenshots 22–24 |
| [Contact](https://www.hugeinc.com/contact) | Large opening followed by a restrained light form, New Business/Press toggle, contact alternatives, and office-address grid. Fields remain the same when inquiry mode changes. | `contact-desktop.json`; screenshots 25–27, 52–53 |
| [Brand strategy & design](https://www.hugeinc.com/solutions/brand-strategy-and-design) | Media hero and breadcrumb; payback/introduction; challenge; capabilities grouped as Define/Create/Measure; related work and reading. | `brand-detail.json`; screenshot 44 |
| [Marketing & content](https://www.hugeinc.com/solutions/marketing-and-content) | Same family; Strategy/Execution/Optimization capability groups; related work and reading. | `marketing-detail.json`; screenshot 46 |
| [Products & platforms](https://www.hugeinc.com/solutions/products-and-platforms) | Same family; Strategy/Development/Technology groups; wide-media proof. | `products-detail.json`; screenshot 45 |
| [Composable commerce](https://www.hugeinc.com/solutions/composable-commerce) | Same family; Strategy/Production/Optimization groups; commerce-specific media. | `commerce-detail.json`; screenshot 47 |
| [Customer experience](https://www.hugeinc.com/solutions/customer-experience) | Same family; Strategy/Journey building/Enablement groups. | `experience-detail.json`; screenshot 48 |
| [AI activation](https://www.hugeinc.com/solutions/ai-activation) | Dark sculptural hero; Transformation/Infrastructure/Performance groups; NBCU proof; related reading. Capability content is presented as content, not an accordion in this inspected template. | `ai-activation-desktop.json`; screenshots 28–29 |
| [CoinTracker](https://www.hugeinc.com/case-study/cointracker) | Full-height moving-image hero; Overview and partnership metadata; key idea; alternating narrative/media; Outcomes. Native video was autoplaying, muted, and looping. | `case-cointracker-desktop.json`; screenshots 30–31 |
| [NBCU](https://www.hugeinc.com/case-study/nbcu) | Full-height media hero; Overview; key idea; use-case narrative; large numerical outcome section. Shares the case template while changing media and content emphasis. | `case-nbcu-desktop.json`; screenshots 49–50 |
| [Design article](https://www.hugeinc.com/ideas/every-designer-now-leads-an-orchestra) | Rounded landscape image before headline; breadcrumb; large headline/deck; author/date/sharing metadata beside narrower reading column; embedded media; newsletter. | `article-desktop.json`; screenshots 32–33, 61 |
| [Josh profile](https://www.hugeinc.com/profile/josh) | Large portrait/name/role treatment, biography, related leadership carousel. | `profile-desktop.json`; screenshots 34–35 |
| [Newsletter](https://www.hugeinc.com/newsletter) | Large typographic opening, subscription region, past issues. Reuses the compact email/arrow control from the footer and Ideas page. | `newsletter-desktop.json`; screenshot 37 |
| [Privacy](https://www.hugeinc.com/privacy) | Branded large opening gives way to an indexed long-form legal document with internal links and much denser text. | `privacy-desktop.json`; screenshot 66 |

Evidence filenames above resolve inside [evidence/](evidence/). Numbered images are indexed in [SCREENSHOT_INDEX.md](SCREENSHOT_INDEX.md).

## 4. Typography and composition

### One family, several degrees of authority

**[O/S] Matter** is the actual loaded family. Font faces at 400, 500, and 600 were loaded. Display statements commonly use **600**, not a conventional 700/900 heavy font. The root also declares JetBrains Mono, but it was not a loaded face in the initial inventory; its declaration is not evidence of a visible monospace-led design.

At 1440px, the home greeting measured **284.8px**, line-height **250.624px**, tracking **−19.936px**. Secondary typographic openings measured **248.992px** with a deliberately compressed **191.724px** line-height. Ordinary large section titles measured **145.648/131.083px**. These are distinct component roles, not one universal `h1` scale. See [tokens](DESIGN_TOKENS.md).

**[S]** `.cap-height` uses `text-box: cap alphabetic`; `.optical-left` uses `text-indent: -.065em`. These details explain why the type feels aligned by its visible shape rather than by the font's invisible box. Tight tracking and trimmed boxes produce a dense silhouette even against very large empty margins.

**[O]** Short words and sentence fragments frequently end with a period. Headline wrapping is actively composed. Large opening paragraphs are themselves display-sized: **43.248px**, weight 600, with contextual line-height around .9 or 1.15. The actual reading column is a separate, quieter scale, about **25.184px** in the inspected article. There is no serif/sans contrast driving this reference.

**[I]** The effect is conversational authority: very plain language given monumental scale. It works because navigation, labels, and repeated control chrome remain restrained.

### Layout logic

**[S]** The outer system has full-bleed and content tracks, capped by `--content-max: 112.5rem` (1800px). The inner layout switches among 4, 8, and 12 columns. At 1440px: 40px side margins, 1360px content width, 16px gutters, approximately 98.67px column width. A common editorial composition gives 8 columns to a statement and about 3 to supporting links, separated by deliberate space.

Section spacing is unusually generous. Fluid major gaps reach roughly **197px at 1440px**, and larger scenes include scroll travel beyond the visible content height. The homepage Latest work section occupied approximately **6600px of document height** in the initial 1000px-tall desktop run. That is animation travel, not a recommendation to add thousands of pixels of padding.

The Work listing, Solutions tiles, leadership strip, article reading column, and homepage pinned gallery are different layout families. Describing them all as a uniform card grid would miss the system's defining changes of rhythm.

## 5. Colour, material, and image direction

**[O/S]** Structural colours are near-black `#0D0B0A`, white `#FFFFFF`, cream `#F7F4EE`, and subtle warm off-whites such as `#FAF8F4`. Brand magenta is `#FF0090`. Images supply green, blue, metallic, flesh, and other high-chroma fields. The interface does not put every project into the brand's magenta palette.

**[O]** Opening media include reflective, soft, or sculptural forms; project imagery uses confident cropping, product-scale objects, or large interface compositions. The inflated H is a branded object, not a reusable stock decorative blob. Text overlaps media in the home and case heroes. Rounded media corners are typically modest relative to the image size; pills are reserved for compact controls.

**[O/S]** The soft haze beneath the top navigation is a **separate fixed progressive-blur layer**, not a blurred header background. At one desktop state its three masked children had backdrop blurs of approximately 1.79, 7.16, and 28.66px. The transparent header itself had `backdrop-filter: none`. This separation preserves sharp nav text while blurring material that passes behind it. See `fixed-layers.json`.

**[I]** Neutral space is the stable frame; media is the changing stage; magenta provides recognition and interaction emphasis. Much of the sophistication depends on media quality and editing, not CSS decoration.

## 6. Responsive decisions actually checked

| Condition | Observed change |
| --- | --- |
| 390px | 20px page margins, 8px gutters, 4 columns. Full-viewport navigation dialog replaces desktop links. Work media stack vertically. Solutions tiles become single-column and expose circular arrow affordances. Form spans the available 350px. |
| 768–1023px | 8 columns; 20px margins and 8px gutters in the measured root. Menu remains in use. |
| 1024px | 12 columns, 40px margins and 16px gutters; six desktop links and compact contact pill appear. Home greeting jumps to its desktop-specific capped size. |
| 1920px | 12 columns remain; page margins/gutters become fluid again; content max prevents unbounded expansion. |
| 844 × 390 landscape | Mobile menu links form two columns × three rows. Captured columns measured 390px each with a 24px gap inside 804px width. |
| Reduced motion, desktop | Homepage root lost its `lenis` class; no `.pin-spacer` nodes were present in the checked state. Captured height was 18,366px versus roughly 22,804px in the earlier normal-motion run. Treat these heights as run-specific; the structural change is the meaningful observation. |

The greeting remains unusually large on mobile (**161.85px at 390px**), but secondary openings do not blindly use that same size: Work measured 95px, Solutions 108px, Contact 39px. This is strong evidence of content-sensitive headline sizing. Tested reference mobile routes did not show document-wide horizontal overflow. Mouse-driven viewport resizing does not prove touch inertia, iOS browser-bar behavior, or every intermediate width.

## 7. Distinctive aesthetic principles

These are **[I] interpretations grounded in the observations above**:

1. **Make the hierarchy visible from a distance.** A short opening can dominate a screen; details become available later.
2. **Change the rhythm, keep the grammar.** Plain sans type and neutral framing unify very different gallery, story, list, and carousel layouts.
3. **Use movement to change the reading mode.** Pinned work asks for viewing; paragraph sweeps ask for reading; carousels ask for browsing. These are different interactions with different purposes.
4. **Let images carry specificity.** A case is recognizable before the explanatory text is read.
5. **Give the interface a light footprint.** No ubiquitous heavy borders, gradients, shadows, or chip clusters. Small affordances sit beside large content.
6. **Treat beginnings and endings as designed scenes.** Greetings, short section claims, CTA panels, and farewell words are recurring editorial devices.
7. **Use optical corrections.** Tight tracking, cap trimming, and carefully chosen line breaks create precision that a font-size change alone cannot achieve.

## 8. Historical baseline audit — superseded by the definitive direction

The local working tree already contained substantial user changes before this investigation. It was inspected as found. The local dev server was started with the prescribed background command. Rendered pages checked: `/`, `/about`, `/workshops`, `/courses`, `/thinking/`; mobile checks included home, workshops, and courses. Sources for the case template, matrix, content collections, and animation components were also read. Source-only inspections are not presented as browser-tested pages.

| Observed local condition | Implication and opportunity |
| --- | --- |
| Home and Thinking use `HomeLayout.astro` + `home.css`: Archivo, warm paper, black, pure yellow. About, workshops, courses, legal, and cases use `BaseLayout.astro` + `global.css`: Newsreader/Inter, dark surfaces, pale yellow-green. | The visual transition is currently a change of typographic system as well as theme. **[P]** Establish shared type, spacing, and shell rules so colour changes feel deliberate. |
| Home heading at 1440px is Archivo 600, 129.6/120.528px, tracking −8.424px. Secondary hero headings are Newsreader 400 at 76/79.04px. | The homepage already has strong editorial scale. **[P]** Bring secondary page hierarchy closer to this confidence while retaining an intentional long-reading style. |
| Homepage has a yellow underline, bracket notation, a relationship board, numbered practice rows, source-labelled evidence, and a quadrant map. | These are original assets and ideas. They can become a coherent language of commitments and consequences, rather than adding Huge's branded objects. |
| Formation accepts two priorities and rejects a third while keeping earlier choices. The status explains the limit. Reset and mobile-menu Escape both worked. | The meaningful signature interaction already exists. **[P]** Improve its framing, responsive typography, and consequence hierarchy before adding decorative effects. |
| `home.css` uses 4vw gutters with a 1440px content cap; secondary `.editorial-container` caps at 84rem with different gutters. Headers and mobile-menu implementations differ too. | **[P]** Share container and navigation contracts. A theme change should not move the logo or change available destinations unexpectedly. |
| Home footer brand text computed as black `rgb(0,0,0)` on `rgb(18,18,17)`. Its nested word also has a fixed dark grey rule. | A concrete contrast defect. **[P]** Scope brand colours by surface. This investigation records it; no CSS was changed. Screenshot `ape-11-footer-mobile.png`. |
| Global styles explicitly include a Huge-inspired radial button, with pointer positioning bound in `BaseLayout`. Home uses a simpler 160ms colour change. | Existing borrowing is fragmented. **[P]** Replace both with one original button treatment aligned to the yellow commitment marker. |
| Workshop stages, course artifacts, research, and the case collection offer substantive content. Some artifacts use external links. | **[P]** Art-direct real instruments and evidence; avoid invented client logos, unverified outcomes, or generic AI imagery. Keep external destinations labelled. |

This baseline records the site before redesign. Current requirements are defined in [DEFINITIVE_DIRECTION.md](DEFINITIVE_DIRECTION.md): pure black/white/yellow, reference-informed sans-serif typography, and the existing independent strategic decision and behavioural design positioning. Historical stage/serif/paper descriptions do not authorize their reintroduction.
