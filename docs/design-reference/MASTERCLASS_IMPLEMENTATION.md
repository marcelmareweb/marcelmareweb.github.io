# Executive masterclass — current implementation

Route: `/workshops/strategic-design-leadership/`. Title: **Strategic Design Leadership in the Age of AI — The Five-Day Executive Masterclass**. This programme is the later approved E–P–I–A–S strategic-decision curriculum, scoped to the workshop offering. It does not replace the practice's positioning or restore the retired automation-maturity framework.

## Content and programme logic

`src/data/executive-masterclass.ts` is the single source for the five days, questions, problems, decision tools, morning/afternoon sessions and executive outputs. It follows the concise implementation brief; AI-generated scenarios are inputs for examining assumptions, not claims of validated strategies or reliable predictions.

| Day | Stage | Decision | Executive output |
| --- | --- | --- | --- |
| 01 | Explorer | What does success mean? | Opportunity Landscape |
| 02 | Practitioner | Why will customers choose us? | Strategic Hypothesis & Scenario Assessment |
| 03 | Integrator | What must we do exceptionally well? | Enterprise Alignment Map |
| 04 | Architect | Where will we compete and exclude? | Strategic Choice Cascade |
| 05 | Steward | How will we govern and sustain advantage? | Executive Strategy Dossier & Governance Charter |

Each day can stand alone. The expanded session also explains its connection to the full progression. Visitors are free to open any day; there are no maturity levels, prerequisites or gated stages. Enquiry links now carry the relevant day/programme to `/contact/`, where the context is visible and editable. The programme interface does not itself send messages or call an AI service. Contact delivery and recovery remain explicit visitor actions.

## Reuse and architecture

The primary interaction model is the existing Find Formation instrument, not the separate PracticeSection horizontal card sequence.

| Source | Responsibility |
| --- | --- |
| `formation-interactions.ts` | Shared native-button pointer preview, keyboard focus preview, activation and preview clearing. Extracted from Find Formation; also used by the new programme. Touch does not synthesize hover. |
| `formation.js` | Keeps the original exercise's two-commitment policy, dependencies, deferred alternatives, status and reset. Its card-event binding delegates to the shared helper. |
| `MasterclassFormation.astro` | Connected five-card composition, preview area, static native-disclosure fallback, session collection and responsibility statement. |
| `MasterclassCard.astro` | Angular SVG outline, day/stage/question/cue, native disclosure button and yellow selected state. |
| `MasterclassProgression.astro` | Sticky direct navigation across the five days. Mobile shows day numbers and E–P–I–A–S with complete accessible labels. |
| `MasterclassDetail.astro` | Reusable editorial expansion: question, problem, decision tool, two working sessions, output, programme connection and enquiry/navigation. |
| `masterclass-formation.ts` | Programme-only single-session state, `#session-<day-id>` deep links, reload/Back/Forward restoration, focus/scroll positioning, keyboard movement, return and Escape. |
| Dedicated Astro page | Existing shared layout, measured long headline, introduction, formation and programme enquiry. |
| `RaykisWorkshopTeaser.astro` | Existing teaser entry point rewritten for the current programme and added to Workshops. Technical filename retained; no unsupported partnership claim added. |

The original `FindFormation.astro` markup and styles are unchanged. Existing workshop content/routes and the shared header/footer remain. No dependency, animation library or client framework was added.

## Interaction contract

| State / input | Behaviour |
| --- | --- |
| Initial | All five strategic questions form one connected composition. Full agendas stay closed. |
| Hover or keyboard focus | Preview outline and corresponding method/problem appear. No day is selected by hover alone. |
| Activate a card | That shape stays yellow; one complete session opens in normal page flow. Focus moves to its question. No modal or scroll lock. |
| Direct progression / next or previous | Opens another complete session; other stages remain identifiable and accessible. |
| Reactivate selected card / return / Escape | Restores the formation and returns focus to that card. |
| Arrow keys / Home / End on a card | Moves exploration focus between the five cards. Enter/Space uses native button activation. |
| No JavaScript | All five sessions remain available as native disclosures; enhanced-only controls remain hidden. |

A selected day is represented by its existing session fragment. Direct loading and reload open that day; Back/Forward restore the session and question focus. Return/Escape expose the formation and restore the selected card. Other anchors, including Back to top, retain their native destination.

The progression stays below the existing site header. Its measured height is shared with scroll-margin calculations so expanded sessions land 24px beneath it. This avoids counting the header offset twice. Native smooth scrolling preserves spatial continuity; reduced motion uses instant positioning. Fill/stroke responses use the existing 200ms `--out` role and become effectively instant under reduced motion.

## Visual and responsive specification

The introduction uses the measured long-title role (98px at 1440px). Formation and expanded questions use the 77.856px heading role; body/lead derive from 19.104px/25.184px. Self-hosted Archivo and sparse 11px mono labels remain the shared foundation. Palette is black, white and yellow.

Cards use the original angular Find Formation outline and explicit spatial connections, without rounded course tiles or decorative imagery. Desktop ≥1200px shows five columns. Tablet 768–1199px shows three cards then two; narrower screens show two pairs followed by the full-width Steward card. The progression remains accessible during expansion. No horizontal overflow or hover-only information is required.

White editorial session panels contrast with the black formation. Yellow identifies the chosen shape and tangible executive output. Supporting morning/afternoon headings are specific to each day; substantive brief content is retained.

## Verification and evidence

- Playwright covered all five complete sessions, exact decision-tool names, direct/next navigation, hover, focus, keyboard activation, Escape, focus restoration and touch switching/return.
- All five expanded sessions and the initial formation passed width checks at 320, 390, 768, 1024, 1440 and 1920px. Card titles stay inside their shapes; there is no document/session overflow. Geometry used reduced motion for stable measurement; default-motion interaction was checked separately.
- No-JavaScript native disclosures and reduced-motion interaction passed.
- The original homepage exercise passed desktop/mobile regression: hover, persistent selected details, two-choice rejection/status and reset.
- `npx astro check`: 57 files, zero errors/warnings/hints. `npm run build`: 12 pages, successful. `git diff --check`: passed.

[Audit](evidence/masterclass-audit.json). Chromium/emulation does not certify physical devices or screen readers. The existing Substack build fallback was used when its feed was unavailable. Work is local; no push or deployment.

Captures: [desktop introduction](screenshots/masterclass-hero-desktop.png), [desktop formation](screenshots/masterclass-formation-desktop.png), [expanded desktop](screenshots/masterclass-session-desktop.png), [complete session](screenshots/masterclass-session-full-desktop.png), [mobile introduction](screenshots/masterclass-hero-mobile.png), [mobile formation](screenshots/masterclass-formation-mobile.png), [expanded mobile](screenshots/masterclass-session-mobile.png), [Workshops teaser](screenshots/masterclass-workshops-teaser-mobile.png). Component captures hide browser tooling/header; formation captures keep the progression in its normal-flow position for inspection. Viewport captures retain the live sticky navigation.
