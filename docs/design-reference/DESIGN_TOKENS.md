# Design tokens

Labels: **[O]** measured in the browser; **[S]** extracted declaration; **[P]** proposed for The Spotted Ape. Reference and proposal values are deliberately separated. These are documentation specimens, not applied styles.

## 1. Reference foundations

Source evidence: [CSS tokens](evidence/css-tokens-and-rules.json), [component rules](evidence/component-css-rules.json), [font inventory](evidence/home-inventory.json), and the per-page computed-style JSON files.

### Colour roles [S]

| Role / actual variable | Value | Observed use or limitation |
| --- | --- | --- |
| `--color-brand-magenta`, `--color-brand-pink` | `#FF0090` | Logo, accents, selected interaction treatments, text-reveal colour |
| `--color-neutral-950`, `--color-base-dark` | `#0D0B0A` | Dark theme background; primary text on light |
| `--color-neutral-0`, `--color-white` | `#FFFFFF` | White theme; inverse text |
| `--color-neutral-25` | `#FAF8F4` | Subtle light surfaces and capability cards |
| `--color-neutral-50`, `--color-surface-cream` | `#F7F4EE` | Warm neutral scene |
| `--color-neutral-75` | `#F0EBE2` | Deeper warm scene |
| `--color-neutral-100` | `#EDE8E0` | Neutral supporting surface |
| `--color-neutral-300` | `#D5D2CF` | Secondary text on dark |
| `--color-neutral-500` | `#76726E` | Secondary text on white |
| `--color-neutral-800` | `#292624` | Dark support tone |
| `--theme-border-subtle` on white | `#0000004D` | 30% black |
| `--theme-border-strong` on white | `#000000B3` | 70% black |
| Corresponding dark borders | `#FFFFFF4D` / `#FFFFFFB3` | Light-on-dark equivalents |
| `--theme-link` on white | `#BA116F` | Darker magenta link token |
| `--color-brand-green` | `#00FF75` | Declared; not a universal visible accent in this survey |

There are complete magenta and slate ramps in the extracted evidence. Their existence is not a reason to use every shade. Theme selectors bundle background, text, border, link, and button roles. The five inspected theme definitions are `white`, `subtle`, `normal`, `deep`, and `dark`.

### Font families and weights [O/S]

| Role | Declaration / evidence |
| --- | --- |
| Display | `matter`, `matter Fallback`, sans-serif |
| Body | Same Matter family; headings and body are not separate visual families |
| Loaded font-face weights | 400, 500, 600 |
| Display weight commonly measured | 600 |
| Standard body / nav | 400, with selected body-sized emphasis at 600 |
| Mono token | JetBrains Mono stack declared; no loaded JetBrains face in the initial home inventory |

Matter is a reference observation, not a font asset supplied for reuse. No Huge font files were copied into this project.

## 2. Reference type scale [S]

Actual exported CSS values, assuming a 16px root. Computed numbers below are rounded to 2 decimals; the evidence retains browser precision.

| Token | Fluid size | Line-height | Tracking | Approx. size at 1440px |
| --- | --- | --- | --- | ---: |
| `display-2xl` | `clamp(11.875rem, 2.8rem + 14.18vw, 18.75rem)` | .88 | −.05em | 249.0px |
| `display-xl` | `clamp(9.125rem, 4.67rem + 6.96vw, 12.5rem)` | .88 | −.05em | 174.94px |
| `display-l` | `clamp(7.625rem, 4rem + 5.67vw, 10.375rem)` | .9 | −.05em | 145.65px |
| `h1` | `clamp(5.25rem, 3.11rem + 3.35vw, 6.875rem)` | 1 | −.05em | 98px |
| `h2` | `clamp(4.125rem, 2.31rem + 2.84vw, 5.5rem)` | 1.05 | −.05em | 77.86px |
| `h3` | `clamp(3.25rem, 2.43rem + 1.29vw, 3.875rem)` | 1.1 | −.05em | 57.46px |
| `h4` / `body-xl` | `clamp(2.5rem, 2.01rem + .77vw, 2.875rem)` | 1.15 / 1.5 token defaults | −.05em / 0 | 43.25px |
| `h5` | `clamp(1.875rem, 1.55rem + .52vw, 2.125rem)` | 1.2 | −.04em | 32.29px |
| `h6` / `body-large` | `clamp(1.5rem, 1.34rem + .26vw, 1.625rem)` | 1.3 for h6 | −.04em for h6 | 25.18px |
| `body` | `clamp(1.125rem, .96rem + .26vw, 1.25rem)` | Contextual | Normal | 19.1px |
| `body-small` | `.875rem` | Contextual | Contextual | 14px |
| `body-tiny` | `.6875rem` | Contextual | Contextual | 11px |
| `nav-link` | `1rem` | 1 | −.03em | 16px |

**Component overrides matter.** The home greeting uses `min(28.5vw, 17.8rem)` on desktop and `min(41.5vw, 11.4rem)` below 1024px, with −.07em tracking. Secondary typographic openings measured a .77 line-height; image-backed case/solution heroes use the display-xl size with .9 line-height. Paragraphs frequently override their token's default leading to .9 or 1.1.

### Measured component samples [O]

| Sample | Desktop 1440px | Mobile 390px |
| --- | --- | --- |
| Home greeting | 284.8 / 250.624px; 600; −19.936px tracking | 161.85 / 142.428px; −11.3295px tracking |
| Work opening | Large typographic hero family | 95 / 73.15px |
| Solutions opening | 248.992 / 191.724px; −12.4496px | 108 / 83.16px |
| Contact opening | 248.992 / 191.724px | 39 / 30.03px; content-sensitive fit |
| Main section display | 145.648 / 131.083px | Often 68 / 61.2px |
| Solution tile title | 77.856 / 81.7488px | 40 / 42px |
| Article subsection | 43.248 / 49.7352px | 32 / 36.8px |
| Article reading paragraph | 25.184 / 27.7024px, 672px column | 350px available column |
| Desktop nav | 16 / 16px, −.48px tracking | Replaced by menu |
| Mobile overlay nav | Hidden on desktop | 32 / 28.8px, 600 |

Do not apply the extreme display tracking to small body copy. At 16px, the same −.07em would be a very different reading experience.

## 3. Reference grid and spacing [S/O]

| Variable / role | Extracted value or actual behavior |
| --- | --- |
| `--content-max` | `112.5rem` / 1800px |
| `--header-height` | `4.375rem` / 70px |
| Grid templates | `repeat(4, minmax(0, 1fr))`, then 8 at 48rem, then 12 at 64rem |
| Page margin below 64rem | 1.25rem / 20px |
| Page margin at 1024–1799px | 2.5rem / 40px |
| Gutter below 64rem | .5rem / 8px |
| Gutter at 1024–1799px | 1rem / 16px |
| Wide-screen margin | `clamp(2.5rem, -.4605rem + 2.6316vw, 3.75rem)` |
| Wide-screen gutter | `clamp(1rem, -.1842rem + 1.0526vw, 1.5rem)` |
| `section-gap-xs` | `clamp(2.75rem, 2.42rem + .52vw, 3rem)` ≈46.21px at 1440 |
| `section-gap-sm` | `clamp(3.4375rem, 2.7rem + 1.16vw, 4rem)` ≈59.90px |
| `section-gap-md` | `clamp(4.1875rem, 3.12rem + 1.68vw, 5rem)` ≈74.11px |
| `section-gap-lg` | `clamp(6.375rem, 4.23rem + 3.35vw, 8rem)` ≈115.92px |
| `section-gap-xl` | `clamp(10.625rem, 6.5rem + 6.44vw, 13.75rem)` ≈196.74px |
| Measure tokens | display 11ch; heading 16ch; subhead 20ch; lead 40ch; prose 60ch |

The full-bleed outer grid has named `full` and `content` lines; `.layout-grid` handles inner columns. They solve different problems and should not be conflated into a single max-width wrapper.

## 4. Reference shape and motion primitives [S]

- Radius vocabulary: 0, 2, 4, 6, 8, 10, 12, 16, 20, 24, and 999px. Common visible roles: 8px logo tiles, 16–20px media/cards, full pills for controls. Declared vocabulary is broader than any one template uses.
- Border widths: 1, 1.5, 2, 3px. Showreel has a prominent white border; ordinary page sections are often separated by space rather than boxes.
- Primary named easing: `--ease-osmo: cubic-bezier(.625,.05,0,1)`.
- UI defaults: .2s; slow UI .3s; press .16s; overlay in .4s and out .2s. Actual mobile-menu exit source uses .3s, so the generic token is not a universal behavior specification.
- Button circle wipe: .7s transform, .4s background-colour, Osmo easing. Character rollover: .6s, .01s per-character delay. See [Animation specifications](ANIMATION_SPECIFICATIONS.md) for source-specific values.

## 5. Definitive Spotted Ape implementation

See [DEFINITIVE_DIRECTION.md](DEFINITIVE_DIRECTION.md). Use the measured reference display/heading clamp formulas above with self-hosted Archivo, weights 400 and 600. Black `#0D0B0A`, white `#FFFFFF`, yellow `#FFFF00`; greys `#F3F3F3`, `#D9D9D9`, `#626262`. No warm neutral palette or serif option.

Use 174.944px display for the longer homepage lines and 145.648px section display at 1440px. Short page openings may use 248.992px; longer course/about titles use the measured 98/145.648px roles with deliberate wrapping. Preserve .88/.9 display leading and −.05em tracking; allow readable leading for substantive body text. Shared navigation is 16px with −.03em tracking.

The shared source of runtime values is `src/styles/global.css`. The grid uses 1800px content max, 20/40px margins and 8/16px gutters with 4/8/12 columns. Major rhythm uses the measured section-gap formulas above. All page families use this system.
