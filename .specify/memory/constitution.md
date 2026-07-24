# karanshergill.com Constitution

## Core Principles

### I. Minimal, Vetted Dependencies (amended 1.1.0)
No client-side UI framework. Prefer well-maintained libraries over bespoke code when
they demonstrably reduce bug surface (owner directive, 2026-07-25), but every
dependency must earn its place with verified evidence: current maintenance or
feature-frozen-at-scale, license (MIT/OFL preferred; no copyleft runtime JS),
CSP compatibility (no inline style attributes, no eval), and build-time-over-runtime
preference. Custom code is kept only where research shows no healthy library exists
(pre-paint theme boot, text scramble, storage wrapper, live-region announcer).
Adopted for feature 001 after verified research: roughjs (build-time sketch SVG),
rough-notation (runtime text annotations), photoswipe (lightbox), reading-time
(build-time), Prism via Astro built-in (highlighting).

### II. Design Tokens Are Law
Every color, font role, and hand-writing size comes from the CSS custom-property
token system in `src/styles/tokens.css` (3 themes: light / dark / cream). No
hard-coded colors in components. New tokens require a WCAG AA contrast check
(≥4.5:1 for text) against all three theme backgrounds before merge.

### III. Accessibility Is Not Decor (NON-NEGOTIABLE)
Decorative sketchbook elements (annotations, sketch notes, tooltips, ruler) are
`aria-hidden` and never leak into accessible names. Interactive elements (theme
switcher, todo easter egg, nav, settings) are native buttons/links with keyboard
paths and visible focus. Every animation respects `prefers-reduced-motion` with a
designed static fallback, not a broken one. Images require real descriptive alt
text — enforced by content schema where possible.

### IV. Performance Budget
HTML+CSS+JS ≤ 40KB gzip per page before fonts. Fonts are self-hosted woff2, with
only the two personality fonts (Excalifont, Comfortaa) preloaded. No third-party
requests except the self-hosted Umami analytics instance. CSS is fully inlined at
build; there are no render-blocking external resources.

### V. Whimsy With A Reason
Every playful element must either communicate something true (sketch-note social
proof, layout-guide documenting a real measurement) or be a deliberate, contained
easter egg that never blocks a user task. The v1 sketchbook aesthetic is the
approved direction; terminal/hacker visual elements were explicitly rejected by
the owner and must not be reintroduced without his request.

## Security & Delivery Constraints

Static output only (Astro 5, `output: static`, no adapter), served as a Cloudflare
assets-only Worker. Security headers (CSP, HSTS, X-Content-Type-Options,
X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP) ship via
`public/_headers`. External links use `rel="noopener noreferrer"`. The contact
email is published obfuscated (`[at]`) and de-obfuscated client-side.

## Development Workflow

Work happens on the `redesign` branch of `karanshergill/MyWebApp`. Gates before
deploy: `astro check` clean, `astro build` clean, route walk in `wrangler dev`
(both slash forms + 404 + rss + sitemap), keyboard-only pass, reduced-motion pass,
header check via `curl -I`. All owner-voice copy (about, work, jokes) is draft
until the owner reviews it. DNS cutover from Vercel requires explicit owner
confirmation.

## Governance

This constitution supersedes ad-hoc preferences. Amendments are recorded here with
a version bump and a dated entry. The approved plan at
`/home/me/.claude/plans/build-me-a-similar-temporal-newell.md` is the source
of record for scope and design decisions of the initial redesign feature.

**Version**: 1.1.0 | **Ratified**: 2026-07-24 | **Last Amended**: 2026-07-25 (Principle I: zero-dependency stance relaxed to minimal-vetted-dependencies per owner directive; library adoption list recorded)
