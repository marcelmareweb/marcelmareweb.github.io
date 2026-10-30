> Historical planning record. Superseded for implementation by [the definitive direction](../docs/design-reference/DEFINITIVE_DIRECTION.md) and the current AGENTS.md. Earlier palette, serif, positioning and approval-stage choices below are archival, not active instructions.

# The Spotted Ape — design and release planning

These files are review artefacts. Nothing in this directory is imported by the existing Astro application or copied to its `dist/` output.

- [Phase 4 Astro homepage review](phase-4/REVIEW.md) — local homepage implementation, screenshots and verification. The application's new homepage has its own layout and styles; planning artefacts remain outside the build.

- [Phase 3 review](phase-3/REVIEW.md)
- [Local visual gallery](phase-3/prototype/index.html) — three comparable directions and typography specimens. Open in a browser; assets and classic JavaScript work locally without a build.
- [Design system](phase-3/DESIGN_SYSTEM.md)
- [Find Formation](phase-3/FIND_FORMATION.md)
- [Decision record](DECISIONS.md)
- [Release-readiness checklist](RELEASE_READINESS.md)
- [Route preservation map](phase-2/route-preservation-map.csv)
- [Dependency inventory](phase-2/dependency-inventory.csv)

The Phase 2 CSV files were copied byte-for-byte from the temporary audit artefacts on 24 October 2026. They describe observed public routes and dependencies, not an approved deployment manifest. The map includes 61 public production HTML URLs (including aliases) and nine local development routes. The production sitemap/search index each contained 47 pages. Preserve this distinction when counting content.

For HTTP preview, from the repository root:

```sh
python3 -m http.server 4783 --bind 127.0.0.1 --directory planning
```

Open `http://127.0.0.1:4783/phase-3/prototype/`. Stop with Ctrl-C. This is a static review server, not the Astro development server. Any later Astro development server must use `astro dev --background` and its corresponding management commands.

No production route, dependency, contact address, domain, partnership statement or framework identity has been resolved by this review prototype. Current publication claims remain subject to source verification and approval.
