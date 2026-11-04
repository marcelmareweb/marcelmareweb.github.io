# AGENTS.md — The Spotted Ape

## Project and development

- Project root: operate in `.` when already inside `the-spotted-ape`; otherwise use `./the-spotted-ape`.
- Framework: Astro with strict TypeScript. Preserve static-first rendering and existing routes, metadata and content qualifications.
- Install dependencies only when needed: `npm install`.
- Start the dev server in background mode: `npx astro dev --background`.
- Manage it with `npx astro dev status`, `npx astro dev logs`, and `npx astro dev stop`.
- After creating or modifying any `.astro` or `.ts` files, run `npx astro check` and `npm run build`. Resolve all errors before finishing.
- Inspect visual and interaction changes in Playwright at desktop and mobile widths; include keyboard and reduced-motion checks for changed interactions.
- Do not push or deploy unless explicitly instructed. Publish this repository only at `https://marcelmareweb.github.io`; use the existing `main` deployment workflow and no custom domain.

## Definitive practice and positioning

The Spotted Ape (Pty) Ltd is an independent strategic decision and behavioural design practice in Cape Town, South Africa.

Preserve the current website's positioning, capabilities, services and strategic narrative:

- Strategic Decision Design: examine alternatives, assumptions and trade-offs.
- Behavioural Design: understand incentives, barriers and working conditions that shape action.
- Human–AI Decision Design: define decision authority, review points and accountability.
- Strategic decision workshops, applied strategy courses, research and advisory conversations support this practice.
- AI is relevant within these capabilities; it does not define the whole business.

Do not reintroduce the superseded AI-agency positioning, !Kharos Strategy, or Agentic Mastery automation-maturity framework.

The explicitly approved **Strategic Design Leadership in the Age of AI** executive masterclass uses E–P–I–A–S (Explorer, Practitioner, Integrator, Architect, Steward) as five standalone strategic decision days. Keep this curriculum scoped to `/workshops/strategic-design-leadership/` and its programme invitations. It is not an automation ladder or the positioning of the whole practice. AI supports exploration and human judgement; it does not establish validated strategies or reliable predictions. Preserve the original Find Formation exercise and its two-choice limit when extending its shared interaction code.

Website: https://marcelmareweb.github.io. Use the current public contact: hello@thespottedape.com. Existing research, article and course resources on thespottedape.com remain external links on their current host; this GitHub Pages site does not replace or migrate that domain.

Source materials live outside the repository in `../the-spotted-ape-sources/` (a sibling folder, never committed). Check research, course and case claims against them, and check its `CLEARANCES.md` before publishing an image or quote.

## Authoritative design system

Before any visual or interaction change, consult [docs/design-reference/README.md](docs/design-reference/README.md) and [DEFINITIVE_DIRECTION.md](docs/design-reference/DEFINITIVE_DIRECTION.md), then the relevant specifications:

- [Visual principles and observed reference](docs/design-reference/DESIGN_ANALYSIS.md)
- [Typography, grids and spacing](docs/design-reference/DESIGN_TOKENS.md)
- [Components](docs/design-reference/COMPONENT_LIBRARY.md)
- [Interactions](docs/design-reference/INTERACTION_PATTERNS.md)
- [Animation](docs/design-reference/ANIMATION_SPECIFICATIONS.md)
- [Implementation strategy](docs/design-reference/IMPLEMENTATION_STRATEGY.md)

Use black and white as the predominant visual system, with yellow as the distinctive accent. Neutral greys may support hierarchy. Do not use the previous terracotta, ochre, sand or stone palette.

Typography is central to the identity: oversized expressive sans-serif, weight 600, sharp scale contrasts, deliberate line breaks, tight tracking and optical alignment. Use the measured Huge reference scale, leading, spacing and interaction timings documented in the investigation. Use self-hosted Inter (variable, with optical sizes) as the available sans-serif, the closest open-licence match to the reference's Matter; do not copy proprietary reference fonts. Do not introduce editorial serifs: the actual reference provides no justification for them.

### Structural reference: hugeinc.com

Borrow hugeinc.com's structure and typography only, never its colours, text, images, logo or code:

- Oversized display headlines, short and confident, ending in a period.
- A full-width hero/showreel area directly under a big opening headline.
- Minimal top navigation with a single call-to-action button.
- A horizontally scrolling strip of project images, followed by a client logo wall.
- A numbered services list (01, 02, 03…) with one-line descriptions.
- Generous whitespace, a strong grid and a minimal footer of period-ended links.

Apply these on black and white. Use yellow sparingly as the accent: CTAs, highlights and hover states. No terracotta, ochre, sand, stone or warm off-white backgrounds. The legacy branch name `design/phase-4-warm-mineral-home` does not indicate a direction.

Build original compositions for the practice's own material. Preserve the distinctive ape identity, decision instruments, research and current narrative; do not copy Huge branding or assets. Historical audit observations describe the old site, not the required direction. Resolve conflicts in favour of the definitive direction; do not retain competing design systems.

## Architecture and accessibility

- Use static Astro components and scoped browser scripts for focused interactions; avoid unnecessary client frameworks and dependencies.
- Share typography, containers, navigation, buttons and surface/text roles across page families.
- Essential content must remain available without animation and without JavaScript. Respect reduced motion, keyboard operation, focus visibility and readable contrast.
- Preserve qualified research findings, real case content, external course resources, SEO, canonical links and print functionality.

## Navigation and customer journeys

The approved navigation strategy is implemented. Read [the implementation record](docs/navigation-strategy/implementation/IMPLEMENTATION.md) alongside the design-reference documents. Its local-only scope records that task's status; later publication instructions take precedence. The original audit and strategy remain the rationale and historical baseline.

- Primary navigation is defined in `src/data/navigation.ts`: How we help, Workshops & learning, Work & research, Thinking, About, and the separate Let’s talk contact action. Keep desktop/mobile labels and category ancestry consistent.
- `/services/`, `/learning/`, `/work/` and `/contact/` are the main destinations. Preserve existing workshop, course, case, thinking and homepage-anchor URLs.
- Use `contactHref` from `src/lib/contact.ts` for offering context. Only offering/day/module/audience/origin identifiers belong in these URLs; never personal details or a visitor’s written question.
- Contact requires name, email and the question only. Preserve optional organisation/team fields, editable programme/module context, provider order, native form fallback and email recovery. Test requests with interception, never real messages.
- Programme sessions use `#session-<day-id>` fragments. Preserve direct loading, reload, Back/Forward, Escape, focus restoration and native disclosures.
- Public research, article and uppercase `/Courses/` learning archives remain linked resources, separate from local lowercase `/courses`. Do not delete, case-fold or silently redirect these resources. Any future deployment must explicitly preserve or migrate their content; deployment is not authorised by this implementation.
- No public cohort dates, seat prices, guarantees, cart or checkout are established. Keep enquiries and resource access truthful; preserve the original Find Formation exercise and its no-data-sent promise.

## Astro documentation

Consult relevant official guides before related changes:

- Routing: https://docs.astro.build/en/guides/routing/
- Components: https://docs.astro.build/en/basics/astro-components/
- Styles: https://docs.astro.build/en/guides/styling/
- Content: https://docs.astro.build/en/guides/content-collections/
- Framework components: https://docs.astro.build/en/guides/framework-components/
- Internationalization: https://docs.astro.build/en/guides/internationalization/
