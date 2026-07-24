# Implementation Plan: Sketchbook Personal Site Redesign

**Feature**: [spec.md](./spec.md) · **Branch**: `redesign` · **Date**: 2026-07-25
**Source of record for design decisions**: owner-approved plan at
`/home/me/.claude/plans/build-me-a-similar-temporal-newell.md` + approved interactive mock
(artifact b8755333). This document adds the verified technical context and the
research-driven stack updates.

## Technical Context (verified against official docs, 2026-07-25)

| Concern | Decision | Verified source |
|---|---|---|
| Framework | **Astro 7.1.3** (was planned as 5.x — superseded) | npm + docs.astro.build |
| Language/tooling | TypeScript ~5.9.3 (@astrojs/check peers `^5\|\|^6`, not TS 7), Node 22.22 (≥22.12 required) | npm peerDependencies |
| Content | Content Layer API: `src/content.config.ts`, `glob()`/`file()` loaders, `render(entry)`, Zod 4 via `astro/zod` | docs: content collections |
| Fonts | **Stable Astro Fonts API** — `fontProviders.local()` for Excalifont + OpenDyslexic (woff2 in `src/assets/fonts/`), `fontProviders.google()` for Comfortaa 700 + Lexend (build-time download, self-hosted, zero runtime third-party) — replaces the manual `public/fonts` plan | docs: fonts |
| CSP | **Stable `security.csp`** — build-time hashes for all inline scripts/styles (meta tag), umami allowlisted in scriptDirective + connect-src; **no `'unsafe-inline'` anywhere** (improves on the approved plan's compromise). Header-only directives (frame-ancestors, base-uri, form-action) stay in `_headers` | docs: configuration reference |
| HTML output | Rust compiler (strict — all tags closed); `compressHTML: true` (v7 default `'jsx'` would collapse the menu's inline whitespace) | docs: v7 upgrade |
| Routing | `trailingSlash: 'ignore'` + `build.format: 'directory'` (both defaults, set explicitly) + Workers `html_handling: auto-trailing-slash` (default) → both slash forms of every route resolve | docs: config + wrangler reference |
| Delivery | Assets-only Worker (`main` optional — confirmed valid), `wrangler.jsonc`: `assets.directory: ./dist`, `not_found_handling: "404-page"`, `observability.enabled`, custom domains later via `routes[].custom_domain: true` | developers.cloudflare.com |
| Headers | `_headers` file in `public/` (copied into `dist/`) — confirmed supported for Workers static assets (100 rules max) | developers.cloudflare.com |
| View Transitions | `<ClientRouter />` (v6 renamed from `<ViewTransitions />`); scripts bind `astro:page-load`, theme re-applied `astro:after-swap`; drop if non-idempotent | docs: v6 upgrade |
| Markdown | v7 default processor (Sätteri); no remark/rehype plugins needed for launch content | docs: v7 upgrade |

## Constitution Check

- I Zero-framework: ✓ no UI framework deps; vanilla `<script>` modules only.
- II Tokens: ✓ `src/styles/tokens.css` is the single color/type source; AA-verified values from approved plan §B.
- III A11y: ✓ split table from approved plan §D implemented as component props (`decorative`/`interactive`).
- IV Perf budget: ✓ inlined CSS, self-hosted fonts, ≤40KB gzip page budget; Fonts API removes even the build-time Google runtime dependency.
- V Whimsy: ✓ v1 sketchbook only; terminal layer stays out (constitution V).

## Project Structure

Per approved plan §A, updated for the Fonts API (no `public/fonts/`; woff2 live in
`src/assets/fonts/` for local provider, google-provider fonts are fetched at build):

```
astro.config.mjs        # site, sitemap, fonts[], security.csp, compressHTML:true, build opts
wrangler.jsonc          # assets-only worker
src/content.config.ts   # blog (glob md), projects (file→src/data/projects.json), gallery (glob)
src/data/{site.ts, projects.json}
src/assets/fonts/*.woff2 (Excalifont ×1, OpenDyslexic ×4)
src/styles/{tokens.css, global.css, home.css, print.css}
src/layouts/{BaseLayout, SketchbookLayout, PageLayout, PostLayout}.astro
src/components/{ThemeSwitcher, SketchNote, HandTooltip, SocialRow, TodoList,
                LayoutGuide, SiteHeader, SettingsMenu, StickyNoteList, PostMeta}.astro
src/pages/{index, about, projects, now, uses, work, gallery, 404}.astro
src/pages/blog/{index.astro, [slug].astro} · src/pages/rss.xml.js
src/content/blog/hello-world.md
public/{_headers, robots.txt, favicon.svg}
specs/001-sketchbook-redesign/{spec.md, plan.md, tasks.md, checklists/}
```

## Design & copy specifications

All visual/interaction/copy specs are fixed by the approved plan §§B–E and the
approved mock; implementation ports them 1:1 (tokens with AA fixes, seeded-PRNG
tooltip algorithm with stream-alignment note, todo escalation, FOUT choreography
renamed `ink-hidden` targeting `document.fonts.load("1em Excalifont")`).

## Library adoption (added 2026-07-25 — owner directive: prefer libraries over custom code; 12-agent verified research)

| Area | Decision | Evidence |
|---|---|---|
| Sketchy borders/ruler/arrows | **roughjs 4.6.6, build-time only** — `rough.generator().toPaths()` verified headless in Node, `seed` verified deterministic → static inline SVG, 0KB client JS | 10.7M dl/wk; Excalidraw/Mermaid dependency |
| Crossed-out/underline text gags | **rough-notation 0.5.1** (4KB gzip, zero deps) — needs browser line-wrap geometry, earns its runtime slot. CSP: own the `@keyframes rough-notation-dash` in build CSS; patch `aria-hidden` on injected SVGs; gate `animate` on reduced-motion | source audit verified CSSOM-only styling |
| Gallery lightbox | **photoswipe 5.4.4** (MIT; 4.5KB eager + 16.4KB lazy on first open) — verified focus trap, keyboard, aria; replaces custom `<dialog>` code | dist audit |
| Masonry | build-time precomputed spans, 0KB — `display: grid-lanes` is Safari-only stable in mid-2026, not Baseline | browser-support research |
| Reading time | **reading-time 1.5.0** via ~10-line remark plugin (build-time) | 852k dl/wk, dep-free |
| Code highlighting | Astro built-in **Prism** + own token CSS — expressive-code emits inline style attributes (empirically reproduced) = CSP-incompatible | render test |
| Kept custom (libraries verified worse/absent) | theme boot (no lib does 3-theme pre-paint), scramble (~20 lines; all libs dead/React/tiny), storage try/catch, live-region announcer, dialog keydown | per-topic research |
| Rejected | GSAP (free since 3.13 but 27KB for one effect), motion (until scope grows), floating-ui/tippy (no positioning math needed), glightbox (CSP), lightgallery (GPLv3), astro-seo/@astrolib/seo (redundant / Astro-7-blocked), astro-robots-txt (3 lines), @playform/compress (redundant, CSS-pass bug), theme-change/astro-themes (no system fallback / 2-theme only), focus-trap (native dialog), hotkeys libs, astro-icon+iconify (unmaintained; approved mock's static hand-drawn SVGs are markup, not logic) | verified research |

## Verification plan

Spec SC-001…SC-006 map to: build gates (`astro check` + build), `wrangler dev`
route walk (slash pairs, 404, rss.xml, sitemap), `curl -I` header assertions,
keyboard-only + reduced-motion passes, gzip payload measurement, WCAG re-check of
token pairs. Detailed per-task acceptance in tasks.md.
