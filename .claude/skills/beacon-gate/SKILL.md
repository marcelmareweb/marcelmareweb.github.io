---
name: beacon-gate
description: How the homepage's hold-to-enter intro (public/beacon-gate.js) works and how to change it. Use when editing, tuning, debugging or re-integrating the intro animation, its sound, or its reveal.
---

# Beacon Gate: hold-to-enter intro

A full-screen canvas layer over the homepage. Nodes drift at random; pressing and holding
drops a yellow beacon that pulls them into rotating rings. Holding builds speed for 5 s,
then the layer opens and the homepage underneath becomes usable.

## Design intent (keep these unless the owner asks otherwise)
- Metaphor: chaotic dispersion → coherent form, which matches the site's message about consequential choices.
- Brand colours: background #0d0b0a (the site's ink), beacon #ffff00 (the logo yellow), Inter type inherited from the site.
- Logo + name top-left and buttons top-right mirror the homepage header, so the reveal lines up.
- One page, not two: the homepage is already rendered underneath; the gate is an overlay that
  makes the rest of the page `inert` until it opens. No navigation happens.

## How it works (all in public/beacon-gate.js)
- **One number drives everything:** hold progress `p` from 0 to 1 over `holdMs`. `e = p^accel`
  (ease-in) scales ring speed (×1 → ×14), ring tightness, spring stiffness, pulse rate, glow,
  arrow length and, near the end, a slight tremor.
- **Planes:** each node is drawn as the plane from `public/plane.svg` (nose up in the file, turned to face its heading).
  The file is fetched on mount (option `plane`); a built-in copy of its path is used until or unless it loads.
  Two fainter, smaller background flocks (`PLANE_LAYERS`) wander the same way, wrap at the edges, speed up slightly
  with the hold and burst outward on reveal. They never join the rings.
- **Releasing early** scatters the nodes and drains `p` over `drainMs`. Pressing again continues from the remaining charge.
- **Point of no return** at p = 1: state `climax` (0.45 s; the rings collapse into the beacon), then
  `reveal`, where the nodes burst outward and the layer opens, then `done`, when the layer is removed and the page unlocked.
- **Reveal styles:** `iris` (a soft-edged hole grows from the beacon via canvas `destination-out`,
  the default), `fade` (overlay opacity), `dissolve` (background fades first, nodes float over the page).
- **Formation:** the nodes nearest the beacon fill the inner ring first; each ring keeps its members' angular
  order so paths don't cross; neighbouring rings rotate in opposite directions. Each ring integrates its own `phase`
  so a change in speed doesn't jump the angle.
- **Sound:** Web Audio, synthesised, no files. Two detuned saws plus a sub go through a resonant low-pass, with
  band-passed noise for air. An LFO on the level gives the "whup-whup", whose rate follows ring speed
  (2.5 → ~50 Hz) until it blurs into a whine. The pitch rises 45 → ~390 Hz. On reveal it spins down and plays a rush of air.
  The AudioContext is created on the first press, because browsers only allow audio after a user gesture. The audio is suspended when the tab is hidden.
  The Sound on/off choice is stored in localStorage `beacon-gate-sound`.
- **Returning visitors:** `remember: 'session'` (default) uses sessionStorage `beacon-gate-seen`.
  The alternatives are `'always'` (localStorage) and `'never'`.

## Options (BeaconGate.mount)
holdMs 5000 · drainMs 1200 · accel 2.2 · reveal 'iris'|'fade'|'dissolve' · remember · sound true ·
brand · logo · hint/holdingHint/skipText · exclude (elements that stay interactive) · onReveal.
API: `gate.set({...})`, `gate.replay()`, `gate.skip()`, `gate.destroy()`, `gate.state`, `gate.progress`.

## Integration rules
- Homepage only. A head snippet adds `html.bgate-pending` (when not seen this session), which hides
  `body > :not(.bgate)` and paints the background dark so the homepage never flashes first. Remove the class right after `mount()`.
- Use `is:inline` scripts in Astro. With view transitions, run it only on a full page load of "/".

## Accessibility and edge cases (don't regress these)
- Escape or "Skip intro" opens the page quickly with a fade. Space/Enter on the focused canvas holds the beacon.
- prefers-reduced-motion: slower drift, no pulses or tremor.
- On mobile, disable the long-press menu and text selection (`touch-action:none`, `-webkit-touch-callout:none`, contextmenu prevented).
  Treat window blur, pointercancel and a hidden tab as letting go.

## Testing
Synthetic `PointerEvent('pointerdown'/'pointerup')` dispatched on `.bgate-canvas` work for checking timing.
Expected: the state reaches `climax` at ~5.0 s, `reveal` at ~5.45 s and `done` at ~6.7 s. Audio needs one real click first,
because synthetic events don't count as a user gesture.

## Possible next tweaks the owner has considered
A shorter hold on phones (3–4 s), the sound's tone and volume, and whether the intro should show on every visit.
