# Rendered website and navigation audit

Date: 30 October 2026. Local baseline commit: 1a39ca9d28ff14331dbd0cdbbeb7d8b9de970562. The tracked working tree was clean at the start.

## 1. Method and boundaries

The primary subject was the local Astro site at http://localhost:4328. The preview was started using the prescribed background command. Eight page families/destinations were navigated and inspected at 1440 × 1000 and 390 × 844:

- Homepage.
- Workshops.
- Strategic Design Leadership in the Age of AI.
- Courses.
- About.
- Thinking.
- The Strategy Illusion decision map.
- Policy-analyst strategic-review case account.

Additional checks covered the desktop header at 1024 × 768, the menu at 844 × 390, JavaScript-disabled home/programme/course fallbacks, reduced motion, course keyboard selection, formation choices, capability disclosures, all five programme sessions and enquiry context.

Twelve linked public destinations were checked with GET requests. Research and both course entry destinations were also rendered in a browser. This was a boundary check of linked resources, not a full audit of the deployed website. Public and local navigation were kept distinct.

Twenty-two local URL/anchor combinations returned HTTP 200; every tested fragment target existed. Mail links were inspected without opening an email application. All POST requests in the isolated form test were intercepted and answered with synthetic success/failure responses; no real enquiry was sent. Live email delivery, payment, physical touch devices and screen-reader behaviour were not certified.

Screenshots hide the Astro development toolbar through temporary browser-only styling. The formation element capture also hides the sticky header to expose the whole illustration. Other viewport captures retain the shared header. Main page entry captures use normal motion; the five-session direct-navigation sweep and its following desktop course/module enquiry captures used reduced motion after a normal-motion Day 03 check. See [evidence index](EVIDENCE_INDEX.md).

The mobile-home inventory records body overflow immediately after Escape, before the close handler settled. The later settled test confirms it returns to an empty value. This is a sampling-timing artefact, not a reported menu defect. One early mobile automation run was retried after a navigation destroyed the evaluation context; only completed runs were used.

### Evidence labels

- **[O] Observed:** rendered content, an inspected link/control state, or an actual browser interaction.
- **[S] Source-confirmed:** supported by the current Astro/component/script source.
- **[I] Inferred:** a possible customer need or consequence requiring customer validation.
- **[P] Proposed:** a strategic recommendation, not current behaviour.

This is an expert audit. No customer interviews, analytics, conversion baseline or measured preference data were supplied. Scroll distances and automation actions do not measure customer frustration, time-on-task or conversion loss.

## 2. Current navigation map

| Location | Labels and destinations [O/S] |
| --- | --- |
| Desktop header | Practice → /#practice; Work → /#evidence; Thinking → /thinking/; Workshops → /workshops; Courses → /courses; About → /about; Let’s talk → mailto:hello@thespottedape.com |
| Mobile menu | Same six destinations, displayed with terminal periods; same contact email. One full-viewport native dialog. |
| Footer | Practice → /#practice; Workshops → /workshops; Work & research → /#evidence; Courses → /courses; Thinking → /thinking/; About → /about; email and Privacy/Terms. |
| Home in-content | Contact email; Explore the practice; Explore decision workshops; research/DOI; policy case; Thinking/map/essay; contact invitation. |
| Workshops | In-page process/situations/enquiry links; masterclass route near the opening and in a later teaser. |
| Programme | Return to Workshops; in-page five-day progression; subject-specific email per day and programme. |
| Courses | Curriculum/resources/enquiry anchors; module tabs; live course/module links and downloads; contextual cohort enquiry. |
| Case | Return to home evidence; Print / Save as PDF. Contact remains available through the shared shell. |
| Thinking/map | Index → map or external essay; map → index and email invitation. |
| About | Principles/practitioner anchors; external biography; email. |

There is no dedicated local service hub, evidence index, learning overview or contact page among the audited routes. Two general enquiry forms are embedded on Workshops and Courses. The primary navigation mixes homepage sections and separate pages. This works technically; the effect on visitor expectations remains a hypothesis.

Sources: [Header](../../src/components/Header.astro), [Footer](../../src/components/Footer.astro), [page inventory](evidence/desktop-home.json), [local link checks](evidence/local-link-checks.json).

## 3. Findings and implications

| ID | Direct finding | Possible customer consequence [I] | Evidence |
| --- | --- | --- | --- |
| F01 | [O/S] The homepage opens with a clear broad proposition and a persistent menu. Its first main links are email and Explore the practice. The first body link to Workshops follows the formation and practice sequence. | A visitor can navigate directly through the header, but the editorial body offers fewer immediate routes by customer intent. Test whether an early plain-language route improves orientation. | [Home desktop](screenshots/desktop-home-entry.png), [mobile](screenshots/mobile-home-entry.png), [inventory](evidence/desktop-home.json), [index](../../src/pages/index.astro). |
| F02 | [O/S] Find Formation is explicitly fictional, allows two priorities, shows implications and rejects a third commitment without removing prior choices. It has no outbound link and saves/sends no choices. | It demonstrates the practice’s approach, but does not route a visitor to a service. Treat participation as optional; preserve its educational identity. | [Selected exercise](screenshots/desktop-formation-selected.png), [desktop actions](evidence/desktop-journeys.json), [mobile actions](evidence/mobile-journeys.json), [component](../../src/components/home/FindFormation.astro). |
| F03 | [O/S] All three capability cards expose specific questions and outputs. Their shared section has one onward link: Explore decision workshops. The behavioural card does not link directly to behavioural support or a relevant enquiry. | A person seeking research or Human–AI support must infer an onward route from a workshop invitation or global email. This is a routing gap, not evidence that those services are unavailable. | [Behavioural card](screenshots/desktop-behavioural-card.png), [mobile](screenshots/mobile-behavioural-card.png), [journey record](evidence/desktop-journeys.json), [PracticeSection](../../src/components/PracticeSection.astro). |
| F04 | [O/S] Work opens the homepage’s research section. That section contains a cookstove study, references and one case link. The footer calls the same destination Work & research. There is no local work listing page. | The label may suggest a broader portfolio than the destination initially exposes. A stable evidence destination could explain both the nature and limits of the available proof. | [Actual Work landing](screenshots/desktop-work-destination.png), [case](evidence/desktop-case.json), [Header](../../src/components/Header.astro), [Footer](../../src/components/Footer.astro). |
| F05 | [O/S] Workshops is a custom decision-facilitation page. It exposes assumptions, trade-offs and ownership, offers a masterclass link near the opening, and has an enquiry form. | This already serves a team buyer. It should retain that purpose rather than become a generic ticket catalogue. A learning overview can clarify the relationship to courses/programmes. | [Workshops entry](screenshots/desktop-workshops-entry.png), [mobile](screenshots/mobile-workshops-entry.png), [content](evidence/desktop-workshops.json). |
| F06 | [O/S] Each executive day has a strategic question, working tool and named output. Hover previews; activation opens a session in flow and focuses its question. All five direct controls worked; Escape closes and returns focus. | The substantive programme is a strong destination. Visitors may benefit from seeing fit, delivery status and an appropriate enquiry earlier, without learning E–P–I–A–S terminology first. | [Day 03](screenshots/desktop-masterclass-day03.png), [Day 02 mobile](screenshots/mobile-masterclass-day02.png), [five-day tests](evidence/programme-journeys.json). |
| F07 | [O/S] On the programme, no global header item is current; day activation leaves the URL unchanged, and reload closes the session. A back-to-Workshops link and sticky progression remain available. | Category ancestry and a shareable day link would support revisiting and internal discussion. The current experience still permits navigation; it is not a dead end. | [Programme entry](evidence/desktop-masterclass.json), [activation/reload](evidence/programme-journeys.json), [exact-path current helper](../../src/components/Header.astro), [session script](../../src/scripts/masterclass-formation.ts). |
| F08 | [O/S] Courses currently centres on one solar-investment case, with a six-module inspector, accessible resources and a separate cohort-enquiry option. Module 05 changes the live link to Decide and carries module 05 into the form. Keyboard ArrowDown selects Reflect. | This is both a useful self-paced resource and a basis for facilitated learning. Those routes can be stated directly instead of presenting the page as an unspecified catalogue. | [Course entry](screenshots/desktop-courses-entry.png), [selected module](screenshots/desktop-course-module05.png), [contextual form](screenshots/desktop-course-context-enquiry.png), [tests](evidence/programme-journeys.json), [CourseSyllabus](../../src/components/CourseSyllabus.astro). |
| F09 | [O] At 390 × 844, the programme’s Explore the five days link begins around y=1196. On Courses, the direct live-course link begins around y=7745, although the opening provides curriculum/resources anchor shortcuts and the module panel also has a live link. | A visitor ready to start can benefit from an earlier direct route. Document depth alone does not prove a usability problem: the shortcuts already reduce required scrolling. | [Programme entry mobile](screenshots/mobile-masterclass-entry.png), [course mobile inventory](evidence/mobile-courses.json), [programme inventory](evidence/mobile-masterclass.json). |
| F10 | [O/S] Global and homepage Let’s talk buttons use a plain email link. Programme/day email links include a subject. Workshops/Courses use six customer-facing fields: five required, optional team size. The five-interest dropdown includes research, Human–AI work and advisory, despite the team/workshop framing. | Contact options do not always communicate a consistent destination or preserve the same context. Mandatory organisational framing may be a poor fit for some individual enquiries. Test a neutral contact entry and prefilled intent. | [Workshop enquiry](screenshots/desktop-workshop-enquiry.png), [mobile cohort enquiry](screenshots/mobile-course-context-enquiry.png), [form source](../../src/components/BookingSection.astro), [mocked test](evidence/enquiry-mocked.json). |
| F11 | [O/S] The policy case is clearly marked as a case account/reported outcome. It has a return link and print action but no contextual engagement link in its main content. The research finding retains an explicit limitation about paraffin ownership. | Add a relevant invitation after proof while preserving the distinction between a reported case result, academic research and a proposed service outcome. | [Case content](evidence/desktop-case.json), [case entry](screenshots/desktop-case-entry.png), [case template](../../src/pages/cases/%5Bslug%5D.astro), [home evidence](../../src/pages/index.astro). |
| F12 | [O/S] About contains principles, Marcel Maré’s practice narrative and an external professional-biography link. Thinking contains one featured map and one essay. | Place relevant authority beside offers while retaining these deeper destinations. A large content taxonomy, search or filter system is not justified by the current inventory. | [Practitioner](screenshots/desktop-practitioner.png), [Thinking](screenshots/desktop-thinking-entry.png), [About](evidence/desktop-about.json), [Thinking inventory](evidence/desktop-thinking.json). |
| F13 | [O] The twelve tested public destinations responded 200, including all six listed toolkit resources. Research and course pages rendered. The research page has a different public header: Courses, Workshops & Labs, Challenges, Methodology, Thinking, About. | Preserve access to these working resources. Make boundaries clear and plan navigation/asset continuity; do not treat the public shell as the current local redesign or copy its labels automatically. | [External checks and rendered text](evidence/external-resources.json), [public research entry](screenshots/external-research-entry.png), [public course](screenshots/external-live-course-entry.png). |
| F14 | [O/S] Mobile menu routing and settled Escape/focus restoration worked. The 1024px header fit without document overflow. JavaScript-disabled fallbacks exposed four exercise choices, five native programme sessions and six course modules. Reduced motion made practice cards a static stack. | These are existing strengths and acceptance requirements for future navigation work. Label clarity, not a complete interaction rewrite, is the primary recommendation. | [Menu portrait](screenshots/mobile-menu.png), [landscape](screenshots/mobile-menu-landscape.png), [accessibility checks](evidence/accessibility-navigation.json), [settled menu test](evidence/mobile-journeys.json). |
| F15 | [O/S] The local routes, visible journeys and inspected source expose enquiries and open resources, not dates/prices/inventory/checkout. The blueprint’s example sprint is not an established local offering. | Do not promise immediate purchase or public attendance. Treat commerce and public scheduling as conditional future capabilities. | [Routes/current links](evidence/local-link-checks.json), [programme inventory](evidence/desktop-masterclass.json), [blueprint review](BLUEPRINT_REVIEW.md), [source scope](../../src/pages/). |

## 4. Actual journey traces

These are successful scripted paths through the current interface, not observations of customer choices.

| Task | Actual trace [O] | Destination / limitation |
| --- | --- | --- |
| Understand strategic trade-offs | Home → hover market → select market/customers → attempt third choice → reset | Preview and persistent explanations work; two-choice limit is announced. No service recommendation or enquiry context is generated. |
| Explore behavioural support | Header Practice → card 02 → Questions & outcomes | Relevant research/intervention description; shared onward link leads to Workshops. |
| Find work evidence | Header Work → homepage evidence → A decision in practice | Policy case account; return and print actions; global email remains available. |
| Explore an executive day | Workshops opening link → masterclass → Day 03; direct progression across all five | Correct outputs and day-specific mail subjects. Day state is not represented in the URL. |
| Commission a course module | Courses → module 05 Decide → Commission Module 05 Cohort | Form selects Strategy Course (DLA), stores module 05 and shows the module name. Mobile carries the same context. |
| Start learning independently | Courses resources/module → linked public course/module | Public course and Decide module returned 200; both course entry hosts rendered. No purchase step was encountered on the inspected entries. |
| Enquire about a workshop | Workshops → Discuss a workshop | In-page form with Strategic Decision Workshop preselected. |
| Assess credibility | About → practitioner section; Work → research references | Biography link and public research destination available; no relationship outcome is assumed from a publication. |

## 5. Form and resource verification limits

The mock success response displayed confirmation and retained module 05 in the captured payload. The mock failure displayed an explanatory status, retained typed context and exposed a contextual email fallback. These tests verify client-side behaviour under simulated responses, not receipt by the practice.

The raw page inventories contain the two anti-spam honeypot inputs because those elements have measurable DOM rectangles inside a visually hidden container. They are excluded from the six customer-facing fields reported here.

Resource checks establish reachability and returned file types at the audit time. They do not establish permanent availability, validate every spreadsheet calculation or certify each downloadable document’s content.

Absolute links to the public research/article/course paths leave the local preview. The research/article paths and uppercase public Courses learning tree are not supplied by the local page routes inspected here. Future deployment planning must preserve their content or explicitly migrate them; no deployment changes were made.

## 6. Strategic interpretation

[I] The strongest opportunity is to connect the existing material more directly: customer problem → relevant capability or learning format → specific proof/output → contextual conversation or resource access.

The audit does not justify abandoning the brand’s art direction, deleting its signature exercises or turning the practice into an academy. It supports a small, stable navigation hierarchy with earlier task links and clearer boundaries between commissioned work, structured programmes and independently accessible resources.

See [recommended strategy](STRATEGY.md) for the proposed architecture, journeys, content order and validation plan.
