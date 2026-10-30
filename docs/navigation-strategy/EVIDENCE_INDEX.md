# Evidence index

Audit date: 30 October 2026. Evidence supports [AUDIT.md](AUDIT.md) and the proposals in [STRATEGY.md](STRATEGY.md).

Browser data records the local site at http://localhost:4328 unless explicitly labelled external. Current route/status observations do not certify production parity. Screenshots show the existing site, not a mockup of the proposed architecture.

## Browser and provenance records

| File | What it records |
| --- | --- |
| [accessibility-navigation.json](evidence/accessibility-navigation.json) | No-JavaScript fallbacks, reduced motion, course header breakpoint and landscape menu. |
| [desktop-about.json](evidence/desktop-about.json) | Desktop rendered page inventory for about. |
| [desktop-case.json](evidence/desktop-case.json) | Desktop rendered page inventory for case. |
| [desktop-courses.json](evidence/desktop-courses.json) | Desktop rendered page inventory for courses. |
| [desktop-decision-map.json](evidence/desktop-decision-map.json) | Desktop rendered page inventory for decision-map. |
| [desktop-home.json](evidence/desktop-home.json) | Desktop rendered page inventory for home. |
| [desktop-journeys.json](evidence/desktop-journeys.json) | Actual formation, capability, Work/case and workshop-enquiry actions. |
| [desktop-masterclass.json](evidence/desktop-masterclass.json) | Desktop rendered page inventory for masterclass. |
| [desktop-thinking.json](evidence/desktop-thinking.json) | Desktop rendered page inventory for thinking. |
| [desktop-workshops.json](evidence/desktop-workshops.json) | Desktop rendered page inventory for workshops. |
| [documentation-checks.json](evidence/documentation-checks.json) | Final local documentation, image, JSON and protected-scope checks. |
| [enquiry-mocked.json](evidence/enquiry-mocked.json) | Synthetic success/failure responses with all POST requests intercepted. |
| [external-resources.json](evidence/external-resources.json) | Twelve public GET checks and three rendered public-resource entries. |
| [local-link-checks.json](evidence/local-link-checks.json) | Twenty-two local URL/fragment reachability checks. |
| [mobile-about.json](evidence/mobile-about.json) | Mobile rendered page inventory for about. |
| [mobile-case.json](evidence/mobile-case.json) | Mobile rendered page inventory for case. |
| [mobile-courses.json](evidence/mobile-courses.json) | Mobile rendered page inventory for courses. |
| [mobile-decision-map.json](evidence/mobile-decision-map.json) | Mobile rendered page inventory for decision-map. |
| [mobile-home.json](evidence/mobile-home.json) | Mobile rendered page inventory for home. |
| [mobile-journeys.json](evidence/mobile-journeys.json) | Settled menu behaviour, course and programme touch journeys, formation and capability disclosure. |
| [mobile-masterclass.json](evidence/mobile-masterclass.json) | Mobile rendered page inventory for masterclass. |
| [mobile-thinking.json](evidence/mobile-thinking.json) | Mobile rendered page inventory for thinking. |
| [mobile-workshops.json](evidence/mobile-workshops.json) | Mobile rendered page inventory for workshops. |
| [programme-journeys.json](evidence/programme-journeys.json) | All five executive days, preview/selection/reload/Escape and course module handoff. |
| [provenance.json](evidence/provenance.json) | Baseline, scope, viewports, source fingerprints and input attachments. |

Page inventories include links in the DOM that can be hidden in the current disclosure state; they do not prove every captured link is visible initially. The mobile inventories explicitly record first-viewport link geometry. The form inventories include anti-spam honeypots; customer-facing field counts exclude them.

The immediate menu-close sample in mobile-home.json precedes the close handler settling. Use mobile-journeys.json for the completed Escape/focus/scroll-unlock result.

## Screenshots

Primary captures use a 1× pixel scale. The Astro development toolbar is temporarily hidden. Desktop selected-course captures used reduced motion; normal-motion entry and programme interaction were checked separately.

| Capture | Pixels | State |
| --- | --- | --- |
| [desktop-about-entry.png](screenshots/desktop-about-entry.png) | 1440 × 1000 | Existing desktop about opening. |
| [desktop-behavioural-card.png](screenshots/desktop-behavioural-card.png) | 1440 × 1000 | Settled behavioural capability disclosure and direct controls. |
| [desktop-case-entry.png](screenshots/desktop-case-entry.png) | 1440 × 1000 | Existing desktop case opening. |
| [desktop-course-context-enquiry.png](screenshots/desktop-course-context-enquiry.png) | 1440 × 1000 | Module 05 context retained in the cohort enquiry; reduced-motion capture. |
| [desktop-course-module05.png](screenshots/desktop-course-module05.png) | 1440 × 1000 | Selected Decide module; reduced-motion capture. |
| [desktop-courses-entry.png](screenshots/desktop-courses-entry.png) | 1440 × 1000 | Existing desktop courses opening. |
| [desktop-decision-map-entry.png](screenshots/desktop-decision-map-entry.png) | 1440 × 1000 | Existing desktop decision map opening. |
| [desktop-footer.png](screenshots/desktop-footer.png) | 1440 × 1000 | Shared footer, evidence label and contact destinations. |
| [desktop-formation-selected.png](screenshots/desktop-formation-selected.png) | 1440 × 2316 | Two selected fictional priorities and their implications; sticky header hidden for the element capture. |
| [desktop-home-entry.png](screenshots/desktop-home-entry.png) | 1440 × 1000 | Existing desktop home opening. |
| [desktop-masterclass-day03.png](screenshots/desktop-masterclass-day03.png) | 1440 × 1000 | Day 03 expansion after normal-motion navigation. |
| [desktop-masterclass-entry.png](screenshots/desktop-masterclass-entry.png) | 1440 × 1000 | Existing desktop masterclass opening. |
| [desktop-practitioner.png](screenshots/desktop-practitioner.png) | 1440 × 1000 | About practitioner/authority section. |
| [desktop-thinking-entry.png](screenshots/desktop-thinking-entry.png) | 1440 × 1000 | Existing desktop thinking opening. |
| [desktop-work-destination.png](screenshots/desktop-work-destination.png) | 1440 × 1000 | Actual landing after choosing Work from the header. |
| [desktop-workshop-enquiry.png](screenshots/desktop-workshop-enquiry.png) | 1440 × 1000 | In-page workshop enquiry destination. |
| [desktop-workshops-entry.png](screenshots/desktop-workshops-entry.png) | 1440 × 1000 | Existing desktop workshops opening. |
| [external-alternative-course-entry.png](screenshots/external-alternative-course-entry.png) | 1440 × 1000 | Alternative public host of the solar learning case. |
| [external-live-course-entry.png](screenshots/external-live-course-entry.png) | 1440 × 1000 | Branded public solar learning-case entry. |
| [external-research-entry.png](screenshots/external-research-entry.png) | 1440 × 1000 | Working public research page; different navigation shell from local redesign. |
| [mobile-about-entry.png](screenshots/mobile-about-entry.png) | 390 × 844 | Existing mobile about opening. |
| [mobile-behavioural-card.png](screenshots/mobile-behavioural-card.png) | 390 × 844 | Settled behavioural capability disclosure on touch viewport. |
| [mobile-case-entry.png](screenshots/mobile-case-entry.png) | 390 × 844 | Existing mobile case opening. |
| [mobile-course-context-enquiry.png](screenshots/mobile-course-context-enquiry.png) | 390 × 844 | Team-oriented enquiry opening reached from module 05. |
| [mobile-courses-entry.png](screenshots/mobile-courses-entry.png) | 390 × 844 | Existing mobile courses opening. |
| [mobile-decision-map-entry.png](screenshots/mobile-decision-map-entry.png) | 390 × 844 | Existing mobile decision map opening. |
| [mobile-home-entry.png](screenshots/mobile-home-entry.png) | 390 × 844 | Existing mobile home opening. |
| [mobile-masterclass-day02.png](screenshots/mobile-masterclass-day02.png) | 390 × 844 | Selected customer-choice day on mobile. |
| [mobile-masterclass-entry.png](screenshots/mobile-masterclass-entry.png) | 390 × 844 | Existing mobile masterclass opening. |
| [mobile-menu-landscape.png](screenshots/mobile-menu-landscape.png) | 844 × 390 | Menu at 844 × 390; contact remains visible. |
| [mobile-menu.png](screenshots/mobile-menu.png) | 390 × 844 | Full-viewport menu at 390 × 844. |
| [mobile-thinking-entry.png](screenshots/mobile-thinking-entry.png) | 390 × 844 | Existing mobile thinking opening. |
| [mobile-workshops-entry.png](screenshots/mobile-workshops-entry.png) | 390 × 844 | Existing mobile workshops opening. |

## Interpretation limits

- Evidence is an expert inspection, not an observation of real customers making purchase decisions.
- Browser emulation does not certify physical touch devices, screen readers or every browser engine.
- Public downloads returned the expected file types; their substantive contents were not revalidated in this audit.
- Mocked enquiry acceptance/error states do not demonstrate live delivery. Synthetic addresses use the reserved .invalid domain.
- New destinations in the strategy are proposals. No website implementation, push or deployment was performed.
- Application files and existing design-reference documentation remain unchanged; see provenance and documentation checks.
