# Implementation strategy — definitive direction

This document replaces the earlier redesign proposal. The [Definitive direction](DEFINITIVE_DIRECTION.md) is authoritative. Reference observations in the investigation remain evidence; baseline local-site descriptions and archived prototypes are historical.

## Practice and content

The Spotted Ape is an independent strategic decision and behavioural design practice. Preserve the current Strategic Decision Design, Behavioural Design and Human–AI Decision Design capabilities. Workshops, applied courses, research and advisory conversations support those capabilities. AI is relevant within this practice, not its overarching identity.

The former AI-agency positioning, !Kharos Strategy and Agentic Mastery automation-maturity framework are retired from active instructions, workshop content, enquiry options and content collections. The later approved E–P–I–A–S executive masterclass is a programme-specific strategic-decision curriculum, not an automation ladder. The real six-module solar investment course is unrelated to either programme and remains intact.

## Shared foundations

`src/styles/global.css` is the single visual foundation. `SiteLayout.astro` renders the shared header, footer, metadata and progressive enhancement. `HomeLayout.astro` and `BaseLayout.astro` delegate to it so existing import paths remain compatible without creating separate design systems.

- Predominant white `#FFFFFF` and black `#0D0B0A`; signal yellow `#FFFF00`; neutral greys only for supporting surfaces, rules and secondary text.
- Self-hosted Archivo, 400 for reading and 600 for display. JetBrains supports sparse system labels. No editorial serif or remote Google Fonts stylesheet.
- Measured Huge display formulas: 248.992px, 174.944px and 145.648px at 1440px; .88/.9 leading and −.05em tracking. Long-title roles use 98px and contextual wrapping. Body/lead roles derive from 19.104px and 25.184px; supporting statements from 43.248px.
- 1800px content cap, 40px desktop/20px mobile margins, 16px/8px gutters and 12/8/4-column design boundaries. Fluid section rhythms use the actual reference formulas.
- Native scroll, native disclosures, semantic forms, native modal navigation, visible keyboard focus and reduced-motion handling. No client framework or animation library added.

## Compositions implemented in Astro

### Homepage

Oversized two-line current proposition → dark Formation instrument → large practice feature-card sequence with native disclosures → research spread → decision map and editorial material → yellow decision invitation → shared dark footer. The yellow underline, explicit commitment relationships and ape wordmark retain the practice's identity.

Formation retains all alternatives, the two-commitment limit, live status, consequence copy, reset and static worked example. The diagram is a labelled horizontally scrollable region at narrow widths; its readable HTML choices and consequences remain in normal flow.

### About

A large current question → black orientation-field scene → four numbered principles → practitioner spread. Existing practitioner copy and biography link remain. The original orientation graphic remains purposeful, using the definitive yellow and neutral colours.

### Workshops

A large facilitation proposition → yellow discussion statement → three numbered process movements → situations and questions on black → workshop specification → enquiry form. Expose assumptions, confront trade-offs and assign responsibility remain the process. No automation ladder or maturity-stage selection is included.

Workshops also links to `/workshops/strategic-design-leadership/` through the programme invitation. This separate page uses the original Find Formation interaction family: five connected angular cards, hover/focus preview, single-session editorial expansion, sticky E–P–I–A–S navigation, native fallbacks and day-specific enquiry. The shared interaction helper preserves the homepage exercise's two-choice policy. See [Masterclass implementation](MASTERCLASS_IMPLEMENTATION.md).

### Courses

Content-sensitive opening → yellow solar-case introduction → contrasts that explain what the case tests → real proposal comparison and six-module inspector → video/toolkit resources → audience and learning outcomes → enquiry form. Existing proposal data, module content, live-module links and all six toolkit destinations are retained.

The course inspector preserves ArrowUp/ArrowDown/Home/End selection and module-to-enquiry context. Without JavaScript, all modules remain available as native disclosures. Course data are illustrative training content, not live investment guidance.

### Thinking and case study

The Thinking index uses a short large opening, a featured semantic matrix and an editorial essay row. The map article uses a wider introduction/quotation, focused reading column, full-scale matrix and clear story sequence. The case template gives context, pattern, intervention, shift and qualified reported outcome a deliberate editorial hierarchy; print remains available.

### Supporting pages

Privacy, terms and 404 use the same foundation. Legal substance is preserved; privacy implementation disclosures reflect self-hosted fonts, optional course context and the embedded video. The experimental factory stays scoped to its existing noindex lab route and is not made the identity of the practice.

## Component responsibilities

| Component | Responsibility |
| --- | --- |
| `SiteLayout` | Metadata, fonts, shared shell, optional entrance observer |
| `Header` | Shared destination order, current-page indication, native modal menu, Escape/focus return, no-JS links |
| `Footer` | Shared invitation, legible reversed wordmark, contact and legal destinations |
| `PageIntro` | Content-sensitive measured display roles, explicit heading slot, supporting copy and page links |
| `PracticeSection` | Three current capabilities in large editorial cards; original SVG visuals; desktop horizontal scroll progression, mobile native swipe, keyboard/direct navigation, native disclosures and a reduced-motion vertical stack |
| `FindFormation` | Existing decision exercise and consequences |
| `CourseSyllabus` | Real course data, proposal table, accessible module selection and static fallback |
| `BookingSection` | Current service interests, optional course-module context, provider delivery/pending/success/failure, email fallback |
| `StrategicMatrix` | Semantic table and explicit axes; no client runtime |

Compatibility entry points for retired components do not render the retired methodology. Unused historical data and planning artifacts are not active brand direction.

## Interactions and motion

Use measured Osmo easing `cubic-bezier(.625,.05,0,1)`, 700ms button fill, 600ms navigation underline and optional 800ms entrances. Essential text is never dependent on an animated reveal. Reduced motion removes translations, entrance waiting and smooth scrolling. Native modal behavior provides keyboard containment and Escape; closing restores trigger focus.

Enquiries preserve the configured Web3Forms/custom-endpoint/FormSubmit order. The form no longer carries retired stage fields. Test delivery states with mocked network responses, never by sending test messages to the actual practice.

## Verification and local-only scope

After `.astro` or `.ts` changes run `npx astro check` and `npm run build`. Inspect actual pages in Playwright at 320, 390, 768, 1024 and 1440px; test long headings, contained diagram/table overflow, menu, disclosures, course keyboard selection, no-JS fallback, reduced motion, enquiry success/failure and case printing.

Keep the existing route paths, metadata, canonical links, qualified research findings and external resources. Preserve pre-existing user work. No push, Site registration, repository synchronization or deployment is part of this implementation.
