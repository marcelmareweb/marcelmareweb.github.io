# AGENTS.md — The Spotted Ape

## Project and development

- Project root: operate in `.` when already inside `the-spotted-ape`; otherwise use `./the-spotted-ape`.
- Framework: Astro with strict TypeScript. Preserve static-first rendering and existing routes, metadata and content qualifications.
- Install dependencies only when needed: `npm install`.
- Start the dev server in background mode: `npx astro dev --background`.
- Manage it with `npx astro dev status`, `npx astro dev logs`, and `npx astro dev stop`.
- After creating or modifying any `.astro` or `.ts` files, run `npx astro check` and `npm run build`. Resolve all errors before finishing.
- Inspect visual and interaction changes in Playwright at desktop and mobile widths; include keyboard and reduced-motion checks for changed interactions.
- Do not push or deploy unless explicitly instructed. The current redesign is local-only.

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

Website: https://thespottedape.com. Use the current public contact: hello@thespottedape.com.

## Authoritative design system

Before any visual or interaction change, consult [docs/design-reference/README.md](docs/design-reference/README.md) and [DEFINITIVE_DIRECTION.md](docs/design-reference/DEFINITIVE_DIRECTION.md), then the relevant specifications:

- [Visual principles and observed reference](docs/design-reference/DESIGN_ANALYSIS.md)
- [Typography, grids and spacing](docs/design-reference/DESIGN_TOKENS.md)
- [Components](docs/design-reference/COMPONENT_LIBRARY.md)
- [Interactions](docs/design-reference/INTERACTION_PATTERNS.md)
- [Animation](docs/design-reference/ANIMATION_SPECIFICATIONS.md)
- [Implementation strategy](docs/design-reference/IMPLEMENTATION_STRATEGY.md)

Use black and white as the predominant visual system, with yellow as the distinctive accent. Neutral greys may support hierarchy. Do not use the previous terracotta, ochre, sand or stone palette.

Typography is central to the identity: oversized expressive sans-serif, weight 600, sharp scale contrasts, deliberate line breaks, tight tracking and optical alignment. Use the measured Huge reference scale, leading, spacing and interaction timings documented in the investigation. Use self-hosted Archivo as the available sans-serif; do not copy proprietary reference fonts. Do not introduce editorial serifs: the actual reference provides no justification for them.

Build original compositions for the practice's own material. Preserve the distinctive ape identity, decision instruments, research and current narrative; do not copy Huge branding or assets. Historical audit observations describe the old site, not the required direction. Resolve conflicts in favour of the definitive direction; do not retain competing design systems.

## Architecture and accessibility

- Use static Astro components and scoped browser scripts for focused interactions; avoid unnecessary client frameworks and dependencies.
- Share typography, containers, navigation, buttons and surface/text roles across page families.
- Essential content must remain available without animation and without JavaScript. Respect reduced motion, keyboard operation, focus visibility and readable contrast.
- Preserve qualified research findings, real case content, external course resources, SEO, canonical links and print functionality.

## Astro documentation

Consult relevant official guides before related changes:

- Routing: https://docs.astro.build/en/guides/routing/
- Components: https://docs.astro.build/en/basics/astro-components/
- Styles: https://docs.astro.build/en/guides/styling/
- Content: https://docs.astro.build/en/guides/content-collections/
- Framework components: https://docs.astro.build/en/guides/framework-components/
- Internationalization: https://docs.astro.build/en/guides/internationalization/
