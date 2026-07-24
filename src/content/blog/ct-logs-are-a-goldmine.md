---
title: CT Logs Are a Goldmine
description: Treating Certificate Transparency as a recon dataset instead of a compliance artifact.
pubDate: 2025-11-12
tags: [security, recon, certificate-transparency]
---

Every TLS certificate ever issued is sitting in a public, append-only log, waiting for
someone to read it. Most people don't. That's the goldmine.

> This is a starter post — real writing lands here. It exists so the blog listing, RSS
> feed, reading-time, and post layout all have something to render.

When I built [certsight](/projects), the goal was simple: treat Certificate Transparency
as a recon dataset instead of a compliance artifact. Subdomains, internal hostnames,
staging environments — organizations leak their entire topology one certificate at a time.

```bash
$ ctlogger --follow --filter "*.target.com" \
    | certsight extract --fields san,issuer,notBefore
watching 47 CT logs...
[+] dev-api.target.com        (issued 3m ago)
[+] vpn-backup.target.com     (issued 41s ago)
```

The typographic column you're reading — 65 characters, 1.75 line height, Lexend — is the
reading experience every post gets. Code sits on the `--code-bg` token, dates are
handwritten in the margin font, and the settings gear up top lets you resize all of it.
