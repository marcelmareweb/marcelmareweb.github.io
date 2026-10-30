# Implementation evidence

Read [IMPLEMENTATION.md](IMPLEMENTATION.md) for delivered behaviour and limits. The earlier strategy-audit evidence lives in the parent directory; these captures and records concern the implemented site.

## Machine-readable checks

| Record | Coverage |
| --- | --- |
| [documentation-checks.json](evidence/documentation-checks.json) | Final documentation links, image decoding and diff checks. |
| [build-checks.json](evidence/build-checks.json) | Final Astro diagnostics and production-build output. |
| [case-print.json](evidence/case-print.json) | Print-media visibility and retained print control. |
| [context-and-history.json](evidence/context-and-history.json) | Programme URL/history, enquiry return paths and course-module context; final focus samples replace the initial transient samples. |
| [desktop-pages.json](evidence/desktop-pages.json) | Desktop route/metadata/navigation observations; contact current-page cues updated after final verification. |
| [enquiry-final.json](evidence/enquiry-final.json) | Final success and recovery-email regression, including edits after a failed request. |
| [enquiry-states.json](evidence/enquiry-states.json) | Pending/confirmation/failure and context changes; invalid-query sample updated with the final guard. |
| [final-interface.json](evidence/final-interface.json) | Final permalink focus, card fit, contact cues, mobile support route, hover and menu boundary tests. |
| [mobile-journeys.json](evidence/mobile-journeys.json) | Touch journeys, programme/module handoff, formation limit/reset and landscape menu. |
| [mobile-pages.json](evidence/mobile-pages.json) | Mobile openings and first actions; final contact layout positions included. |
| [production-links.json](evidence/production-links.json) | Built HTML links/assets, fragments, IDs, ARIA targets, canonical metadata and original-exercise fingerprints. |
| [progressive-enhancement.json](evidence/progressive-enhancement.json) | Native fallbacks, intercepted no-JavaScript keyboard submission, final menu Tab cycle and reduced motion. |
| [public-resource-continuity.json](evidence/public-resource-continuity.json) | Twelve linked public-resource GET responses. |
| [responsive-large.json](evidence/responsive-large.json) | 24 reduced-motion geometry checks at 1024, 1440 and 1920px. |
| [responsive-small.json](evidence/responsive-small.json) | 24 reduced-motion geometry checks at 320, 390 and 768px. |
| [verification-summary.json](evidence/verification-summary.json) | Final verification rollup and unchanged deployment/dependency scope. |

## Rendered captures

Primary viewports are 1440 × 1000 and 390 × 844. The development toolbar is hidden only in the browser capture. Normal-motion openings were reviewed; the programme deep-link capture uses reduced motion. The practice-support image is a card crop; other named entries are viewport captures.

| Capture | Pixels | State |
| --- | --- | --- |
| [desktop-behavioural-service.png](screenshots/desktop-behavioural-service.png) | 1440 × 1000 | Behavioural support, working output, research evidence and contextual enquiry. |
| [desktop-contact-day.png](screenshots/desktop-contact-day.png) | 1440 × 1000 | Desktop contact day. |
| [desktop-contact.png](screenshots/desktop-contact.png) | 1440 × 1000 | Desktop contact. |
| [desktop-courses.png](screenshots/desktop-courses.png) | 1440 × 1000 | Desktop courses. |
| [desktop-home-evidence.png](screenshots/desktop-home-evidence.png) | 1440 × 1000 | Selected proof moved ahead of the capability sequence. |
| [desktop-home.png](screenshots/desktop-home.png) | 1440 × 1000 | Desktop home. |
| [desktop-learning.png](screenshots/desktop-learning.png) | 1440 × 1000 | Desktop learning. |
| [desktop-masterclass.png](screenshots/desktop-masterclass.png) | 1440 × 1000 | Desktop masterclass. |
| [desktop-practice-support.png](screenshots/desktop-practice-support.png) | 1361 × 563 | Settled selected practice-card element, with its capability-specific link. This is an element crop. |
| [desktop-programme-deep-link.png](screenshots/desktop-programme-deep-link.png) | 1440 × 1000 | Selected Day 03 restored from its fragment; reduced-motion capture. |
| [desktop-services.png](screenshots/desktop-services.png) | 1440 × 1000 | Desktop services. |
| [desktop-work.png](screenshots/desktop-work.png) | 1440 × 1000 | Desktop work. |
| [desktop-workshops.png](screenshots/desktop-workshops.png) | 1440 × 1000 | Desktop workshops. |
| [mobile-behavioural-contact.png](screenshots/mobile-behavioural-contact.png) | 390 × 844 | Touch route from behavioural support to its selected enquiry. |
| [mobile-contact-day.png](screenshots/mobile-contact-day.png) | 390 × 844 | Day 02 and individual enquiry context visible near the contact opening. |
| [mobile-contact.png](screenshots/mobile-contact.png) | 390 × 844 | Mobile contact. |
| [mobile-courses.png](screenshots/mobile-courses.png) | 390 × 844 | Mobile courses. |
| [mobile-home.png](screenshots/mobile-home.png) | 390 × 844 | Mobile home. |
| [mobile-learning.png](screenshots/mobile-learning.png) | 390 × 844 | Mobile learning. |
| [mobile-masterclass.png](screenshots/mobile-masterclass.png) | 390 × 844 | Mobile masterclass. |
| [mobile-menu-landscape.png](screenshots/mobile-menu-landscape.png) | 844 × 390 | Five grouped destinations and contact action at 844 × 390. |
| [mobile-menu.png](screenshots/mobile-menu.png) | 390 × 844 | Mobile menu. |
| [mobile-services.png](screenshots/mobile-services.png) | 390 × 844 | Mobile services. |
| [mobile-work.png](screenshots/mobile-work.png) | 390 × 844 | Mobile work. |
| [mobile-workshops.png](screenshots/mobile-workshops.png) | 390 × 844 | Mobile workshops. |

## Limits

- Every enquiry POST in these tests was mocked or aborted before network delivery. Synthetic addresses use .invalid.
- The native no-JavaScript form was submitted with the keyboard; request payload was captured and the POST aborted.
- Automatic contact-query prefilling requires JavaScript; native optional topic/day/module selectors remain usable without it.
- Browser emulation is not physical-device or screen-reader certification.
- The experiment at /lab/monkey-factory/ remains an unchanged noindex,nofollow document with its own metadata.
- Public archive URLs were checked for reachability, not migrated into this build.
- Customer preference and conversion improvement have not been measured.
