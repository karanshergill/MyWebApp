import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://karanshergill.com',
  trailingSlash: 'ignore',
  // v7 default 'jsx' collapses inline whitespace; the hand-set menu relies on it
  compressHTML: true,
  integrations: [sitemap()],
  markdown: {
    // Prism emits class-based tokens (no inline style attrs) — the only CSP-clean
    // highlighter; theme CSS rides the 3-theme token system.
    // (reading time is computed from entry.body at build — no remark plugin, so
    // the v7 Sätteri processor stays.)
    syntaxHighlight: 'prism',
  },
  build: {
    // directory format + Workers' auto-trailing-slash: both /about and /about/ resolve
    format: 'directory',
    inlineStylesheets: 'always',
  },
  security: {
    // Hashes every inline script/style at build — no 'unsafe-inline' anywhere.
    csp: {
      scriptDirective: {
        resources: ["'self'", 'https://umami.up.railway.app'],
      },
      styleDirective: {
        resources: ["'self'"],
      },
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self' https://umami.up.railway.app",
        "object-src 'none'",
      ],
    },
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Excalifont',
      cssVariable: '--font-hand',
      fallbacks: ['Segoe Print', 'Comic Sans MS', 'cursive'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/Excalifont-Regular.woff2'],
            weight: 'normal',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
    {
      provider: fontProviders.google(),
      name: 'Comfortaa',
      cssVariable: '--font-display',
      weights: [700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Lexend',
      cssVariable: '--font-body',
      weights: ['300 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.local(),
      name: 'OpenDyslexic',
      cssVariable: '--font-dyslexic',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          { src: ['./src/assets/fonts/OpenDyslexic-Regular.woff2'], weight: 'normal', style: 'normal', display: 'swap' },
          { src: ['./src/assets/fonts/OpenDyslexic-Bold.woff2'], weight: 'bold', style: 'normal', display: 'swap' },
          { src: ['./src/assets/fonts/OpenDyslexic-Italic.woff2'], weight: 'normal', style: 'italic', display: 'swap' },
          { src: ['./src/assets/fonts/OpenDyslexic-BoldItalic.woff2'], weight: 'bold', style: 'italic', display: 'swap' },
        ],
      },
    },
  ],
});
