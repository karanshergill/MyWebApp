export const SITE = {
  name: 'Karan Shergill',
  url: 'https://karanshergill.com',
  title: 'Karan Shergill',
  description:
    'Karan Shergill is a full-stack software engineer and security researcher. Engineer by day, professional hacker by night.',
  email: 'email[at]karanshergill.com',
  socials: {
    github: 'https://github.com/karanshergill',
    x: 'https://x.com/imkaranshergill',
    linkedin: 'https://linkedin.com/in/karanshergill',
    instagram: 'https://instagram.com/im_karanshergill',
  },
  umami: {
    src: 'https://umami.up.railway.app/script.js',
    websiteId: '0311b62c-a331-4696-a4a4-c7783ba4be5f',
  },
  repo: 'https://github.com/karanshergill/MyWebApp',
} as const;

/** hover/focus captions for the hand-drawn tooltip, keyed by href */
export const TOOLTIP_MAP: Record<string, string> = {
  '/about': 'full-stack by day, hacker by night',
  '/work': 'consulting, selectively',
  '/projects': 'recon tools, trading bots, saas',
  '/blog': 'research & rants',
  '/gallery': 'proof i go outside',
  '/now': "what i'm doing rn",
  '/uses': 'the gear behind the terminal',
  'https://github.com/karanshergill': 'where the tools live',
  'https://x.com/imkaranshergill': 'unfiltered, mostly',
  'https://linkedin.com/in/karanshergill': '"let\'s connect" :)',
  'https://instagram.com/im_karanshergill': 'strictly non-professional',
  'mailto:email[at]karanshergill.com': 'pgp key on request',
};
