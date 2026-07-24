# Feature Specification: Sketchbook Personal Site Redesign

**Feature Branch**: `redesign` (spec dir: `001-sketchbook-redesign`)
**Created**: 2026-07-24
**Status**: Approved (owner approved the interactive mock and the implementation plan)
**Input**: User description: "Build me a site like somdev.in for myself with modern tweaks" — a hand-annotated 'designer's sketchbook' personal site, personalized for Karan Shergill, replacing the stale single-page site at karanshergill.com.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - First-time visitor understands who Karan is (Priority: P1)

A visitor lands on the homepage and, within seconds, understands this is Karan
Shergill — a full-stack engineer and security researcher — and can reach any
section (about, work, projects, blog, gallery, now, uses) or his social profiles.

**Why this priority**: The homepage is the identity statement; everything else
hangs off it.

**Independent Test**: Open `/` cold; verify identity is discoverable (page title,
hidden h1, hover captions), all 7 sections + 5 social links reachable by mouse
AND keyboard alone, on desktop and a 375px viewport.

**Acceptance Scenarios**:

1. **Given** a desktop visitor, **When** they hover or focus any menu/social link,
   **Then** a handwritten caption previews the destination before they click.
2. **Given** a phone visitor (<576px), **When** the page loads, **Then** decorative
   margin annotations are absent and a plain handwritten footer nav provides the
   secondary links (now, uses).
3. **Given** a keyboard-only visitor, **When** they Tab through the page, **Then**
   focus is always visible and every interactive element (menu, socials, theme
   switcher, todo list) is operable with Enter/Space.

### User Story 2 - Visitor reads content comfortably, their way (Priority: P2)

A reader opens a blog post or any inner page and gets a clean reading column with
their choice of theme (light/dark/cream), body font (including a dyslexia-friendly
option), and font size — all remembered across visits.

**Independent Test**: Open a post, change theme+font+size via the settings menu,
reload and navigate — preferences persist; system dark-mode preference is used as
the default when nothing was chosen.

**Acceptance Scenarios**:

1. **Given** an OS set to dark mode and no stored choice, **When** any page loads,
   **Then** the dark theme applies before first paint (no flash).
2. **Given** a reader who selects the dyslexia-friendly font, **When** they return
   next week, **Then** the choice is still active.
3. **Given** a reader with `prefers-reduced-motion`, **When** they browse, **Then**
   no jitter/shake/typing animations play and all content remains available in a
   designed static form.

### User Story 3 - Prospective client evaluates and contacts Karan (Priority: P2)

A potential client reads /work, understands the narrow offer (security product
R&D, product engineering), the process (intro call → groundwork → go/no-go), and
contacts Karan by email.

**Independent Test**: Navigate home → work with me → tap the email CTA; a correct
`mailto:` opens despite the address being published obfuscated.

**Acceptance Scenarios**:

1. **Given** the /work page, **When** read top to bottom, **Then** offer, process,
   risk-reversal ("no charge in case of no-go") and out-of-scope list are explicit.
2. **Given** JS enabled, **When** the email link is used, **Then** the address is
   de-obfuscated to a valid mailto target.

### Edge Cases

- Handwriting font fails to load → annotations must still appear (loader has
  catch + timeout fallback; never permanently hidden).
- Visitor requests `/about/` vs `/about` → both resolve (no trailing-slash 404s).
- Unknown URL → custom 404 in the site's voice with recovery navigation.
- Gallery has no photos yet → page ships wired with a "coming soon" note, no
  broken grid.
- Screen-reader users → decorative jokes/annotations are silent; interactive
  easter-egg replies are announced politely.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Homepage presents a centered 3-group menu ([meta] about, work with
  me · [tech] projects, blog · [misc] gallery), corner nav (now, uses), and a
  5-icon social row (GitHub, X, LinkedIn, Instagram, email).
- **FR-002**: Site offers exactly three themes (light paper, dark, cream);
  default follows OS preference; choice persists locally; switchable from the
  homepage corner switcher and the inner-page settings menu.
- **FR-003**: Inner pages provide a settings menu: theme, body font (Lexend /
  system / OpenDyslexic), font size stepper (0.7–2.5rem), all persisted.
- **FR-004**: Blog is markdown-driven with a listing page, individual post pages
  with visible handwritten dates + reading time, a valid RSS feed, and RSS
  autodiscovery on every page.
- **FR-005**: Sections shipped: home, about, projects, blog, now, uses, work,
  gallery, 404. Projects shows curated What/Why/How cards + an impact banner.
- **FR-006**: Sketchbook personality layer: handwritten margin annotations,
  sketch notes on links, procedural hand-drawn hover/focus tooltips, todo-list
  easter egg with escalating replies, bracket-swap hover gag, "5vh" layout-guide
  ruler, handwriting size jitter — all decorative pieces hidden from assistive
  tech, all interactive pieces keyboard-accessible.
- **FR-007**: Accessibility: server-rendered skip link, correct `lang`, visible
  focus, AA contrast in all three themes, `prefers-reduced-motion` respected
  everywhere with designed fallbacks, print styles for posts.
- **FR-008**: Delivery: fully static, security headers (CSP/HSTS/XCTO/XFO/
  Referrer-Policy/Permissions-Policy/COOP), no third-party requests except the
  owner's self-hosted analytics; both slash forms of every URL resolve.
- **FR-009**: All owner-voice copy (about, work, jokes, tooltip captions) is
  draft-flagged for owner review before public cutover.
- **FR-010**: The old site's "build/break things for/of the web" line survives as
  the top-left handwritten scramble annotation (static crossed-out variant under
  reduced motion).

### Key Entities

- **Blog post**: title, description, publish date, optional updated date, tags,
  draft flag, markdown body.
- **Project**: name, what/why/how descriptions, URL, optional repo/stars,
  featured flag, order.
- **Gallery photo**: image, mandatory real alt text (schema-enforced), optional
  wide flag, order.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can name the owner's two professions and reach
  any section within 15 seconds without scrolling on desktop.
- **SC-002**: Every page is fully usable with keyboard only and with a screen
  reader hearing zero decorative-joke noise in link names.
- **SC-003**: Reading preferences (theme/font/size) survive reload and revisit in
  100% of cases with storage available.
- **SC-004**: Each page's HTML+CSS+JS payload ≤ 40KB gzip before fonts; no
  render-blocking third-party requests; Lighthouse ≥ 95 on home and a post.
- **SC-005**: All text tokens pass WCAG AA (≥4.5:1) in all three themes.
- **SC-006**: Zero 404s among `/x` vs `/x/` URL-form pairs across all sections.

## Assumptions

- Owner-approved plan + interactive mock (artifact b8755333) fix the visual
  design; v1 sketchbook direction is final — terminal/hacker layer was rejected.
- Gallery launches in "coming soon" state until the owner supplies photos with
  alt text.
- Analytics remains the owner's existing self-hosted Umami instance.
- Cutover to Cloudflare happens only after owner confirmation; Vercel stays as
  rollback until verified.
