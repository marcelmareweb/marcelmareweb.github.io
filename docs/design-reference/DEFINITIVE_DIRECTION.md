# Definitive design direction — The Spotted Ape

This is the authoritative implementation direction. It supersedes earlier proposals and historical descriptions of the local site. Huge observations and measurements remain research evidence, not Spotted Ape positioning.

## Identity and practice

The Spotted Ape is an independent strategic decision and behavioural design practice. Preserve the current narrative, services and content. Its capabilities are Strategic Decision Design, Behavioural Design and Human–AI Decision Design. Workshops, applied courses, research and advisory support the practice. AI is one relevant context, not the identity of the whole business.

The earlier AI-agency positioning, !Kharos Strategy and five-stage Agentic Mastery framework are retired from the active experience and instructions.

The later approved **Strategic Design Leadership in the Age of AI** executive masterclass uses Explorer → Practitioner → Integrator → Architect → Steward as five strategic decision sessions. This programme-specific E–P–I–A–S curriculum is current; it does not restore the retired automation-maturity framework or replace the practice's broader positioning. Use the five connected, angular Find Formation cards and editorial session expansion specified in the current masterclass documentation. AI supports options, assumptions and human judgement; executive participants retain responsibility for decisions.

## Visual system

Predominantly black `#0D0B0A` and white `#FFFFFF`, with yellow `#FFFF00` as the distinctive signal. Neutral greys support secondary content and rules. No terracotta, ochre, sand or stone surfaces. Original relationship diagrams, explicit trade-offs and real evidence supply visual specificity.

The logo wordmark reads **THE SPOTTED APE** on a single unbroken line in the header, navigation dialog and footer.

Use confident editorial compositions, substantial changes of scale, generous measured space and selective high-contrast scenes. Redesign page structure and hierarchy rather than reskin old layouts.

## Typography from actual reference evidence

The reference uses Matter at 400/500/600, not an editorial serif. The implementation uses the existing self-hosted Archivo at 400–800 as a practical sans-serif alternative, predominantly 400 for reading and 600 for display.

At 1440px, the measured reference scale is:

| Role | Size / leading | Tracking |
| --- | --- | --- |
| Large display | 248.992px / .88 token; .77 in short typographic openings | −.05em |
| Image/statement display | 174.944px / .88–.9 | −.05em |
| Section display | 145.648px / .9 | −.05em |
| Large heading | 98px / 1 | −.05em |
| Heading | 77.856px / 1.05 | −.05em |
| Card/row heading | 57.456px / 1.1 | −.05em |
| Large supporting copy | 43.248px / 1.15 | −.05em |
| Reading/lead | 25.184px / readable contextual leading | restrained |
| UI/body | 19.104px / readable contextual leading | restrained |
| Navigation | 16px / 1 | −.03em |

Use the extracted clamp formulas in DESIGN_TOKENS.md. Headlines receive content-specific wrapping and mobile limits, as the reference does (95px Work, 108px Solutions, 39px Contact at 390px). Do not apply one display size to every long title. No editorial serif exception is authorized.

## Layout and behavior

Use reference grid boundaries: 4 columns below 768px, 8 through 1023px, 12 from 1024px; 20/40px page margins and 8/16px grid gutters. Content max 1800px. Section spacing draws from the measured fluid 46/60/74/116/197px roles at 1440px.

Use purposeful native interactions: decision choices and consequences, capability disclosures, course modules, enquiry forms and accessible navigation. Optional 800ms entrances, 600ms hover type responses and 700ms button fills may draw from the measured animation system. Native scroll is sufficient; no animation library is required. Motion must not hide required reading or change accessible meaning.

## Local implementation and verification

Implement directly in Astro. Review actual rendered pages in Playwright, refine desktop/mobile composition and test keyboard, reduced motion, state changes and enquiry delivery using network mocks. Run `npx astro check` and `npm run build`. No GitHub push or deployment.
