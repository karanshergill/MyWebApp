# Tasks: Sketchbook Personal Site Redesign

**Feature**: [spec.md](./spec.md) · **Plan**: [plan.md](./plan.md) · **Branch**: `redesign`
Ordering: T1→T6 sequential (shared design system); [P] = parallelizable within its task.

## T1 — Foundation (US1/US2 prerequisites) ✅ mostly done
- [x] Clone repo, branch `redesign`, purge legacy app (components, styles, tailwind ×2, shadcn, react/three/framer deps, old assets)
- [x] package.json → astro ^7.1.3, @astrojs/rss ^4.0.19, @astrojs/sitemap ^3.7.3, @astrojs/check ^0.9.9, typescript ~5.9.3, wrangler ^4.114
- [x] astro.config.mjs → site, trailingSlash ignore, compressHTML true, build{directory, inlineStylesheets always}, security.csp (hashed inline, umami allowlisted), fonts[] (local Excalifont + OpenDyslexic ×4, google Comfortaa 700 + Lexend var)
- [x] Font files in src/assets/fonts/ (Excalifont latin 25KB; OpenDyslexic ×4)
- [x] Spec-kit: constitution v1.0.0, spec.md, checklists, plan.md, tasks.md
- [ ] tokens.css (3 themes, AA-fixed: accent #1565c0 light/cream, --on-accent, --ink, --scribble, --selection-*) + global.css (reset, base, focus-visible, sr-only, skip-link, reduced-motion block)
- [ ] BaseLayout.astro: lang="en", meta/OG/JSON-LD Person (worksFor HackerOne/Basiq360/Litass draft), <Font> tags (preload Excalifont+Comfortaa; Lexend + OpenDyslexic non-preload), inline theme-init (pre-paint, localStorage+system), inline ink-hidden FOUT script (fonts.load + catch + 2.5s timeout), RSS autodiscovery, Umami defer
- **Accept**: `astro check` clean; a placeholder page builds with correct meta CSP tag, font-face blocks, no theme flash.

## T2 — Sketchbook homepage (US1)
- [ ] home.css (menu ledger, corner layer, sketch notes, ruler, socials, mobile footer, two-stage degradation ≤1100px/≤576px)
- [ ] SketchbookLayout + index.astro: sr-only h1, [meta]/[tech]/[misc] menu, corner annotations (scramble quote TL, ThemeSwitcher TR, TodoList BL, corner-nav BR), SketchNotes, LayoutGuide "5vh", SocialRow (5 redrawn single-stroke icons, ≥44px, noopener, email [at]-obfuscated), MobileFooter
- [ ] JS: hand-tooltip (seeded-PRNG border, hover+focus, per-link captions), jitter (seeded 0.92–1.08, reduced-motion off), todo escalation (buttons, aria-live status, :p finale), bracket-swap, scramble (reduced-motion → crossed-out static), email de-obfuscation
- **Accept**: US1 scenarios 1–3 pass manually; decorative layer aria-hidden; keyboard operates everything.

## T3 — Inner shell + blog (US2)
- [ ] PageLayout/PostLayout, SiteHeader (fixed blur, hide-on-scroll, aria-current), SettingsMenu (theme/font/size, localStorage keys theme|font|fontSize, aria-expanded/pressed, Esc), print.css
- [ ] content.config.ts (blog glob + zod4; projects file loader; gallery glob with alt≥15 + junk-alt regex refine)
- [ ] blog/index listing (handwritten dates), blog/[slug] via render(entry), PostMeta (real dates + reading time), starter post, rss.xml.js, robots.txt
- **Accept**: US2 scenarios 1–3 pass; rss.xml valid; prefs persist; dark default pre-paint.

## T4 — Content pages (US1/US3)
- [ ] about (3-para arc + photo + GPS-overlay gag + socials grid) — copy DRAFT flagged
- [ ] projects (impact banner + updated-scribble + 8 What/Why/How cards from projects.json) — stars manual for now
- [ ] now + uses (StickyNoteList: hover+focus, sr-visible inline notes) — copy DRAFT
- [ ] work (funnel: what/why/process/go-no-go/risk-reversal + scope disclaimer + mailto CTA) — copy DRAFT
- [ ] gallery (coming-soon scribble state; masonry + <dialog> lightbox wired for when photos arrive)
- [ ] 404 (voice + recovery nav)
- **Accept**: US3 scenarios pass; every page reachable from home; both slash forms OK in dev.

## T5 — A11y/motion audit + View Transitions
- [ ] Audit against plan §D split table; axe-style pass; reduced-motion emulation pass
- [ ] <ClientRouter /> with astro:page-load bindings + astro:after-swap theme re-apply; drop if any script non-idempotent
- **Accept**: SC-002, SC-005 verified; no console errors across navigation.

## T6 — Delivery
- [ ] wrangler.jsonc (assets-only, 404-page, observability) + public/_headers (HSTS, XCTO, XFO DENY, Referrer-Policy, Permissions-Policy, COOP, frame-ancestors/base-uri/form-action CSP header; immutable cache /_astro/*)
- [ ] `npm run build` + `wrangler dev` route walk + `curl -I` assertions + gzip budget measurement + Lighthouse
- [ ] `wrangler deploy` → workers.dev verification. **DNS cutover: separate, owner-confirmed step**
- **Accept**: SC-004, SC-006 verified on workers.dev; cutover checklist ready.
