import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const origin = 'https://diamondproject.c21fg.online';
const defaultImage = '/assets/images/hero-bg2.jpg';
const defaultWidth = '2560';
const defaultHeight = '1436';

const pages = [
  {
    path: '/get-started',
    title: 'Get Started | Diamond Project',
    description: 'Complete the Diamond Project survey and a consultant will contact you about mentorship, training and the online business opportunity.'
  },
  {
    path: '/faq',
    title: 'Frequently Asked Questions | Diamond Project',
    description: 'Answers to common questions about Diamond Project, getting started, the opportunity, training and earnings.'
  },
  {
    path: '/contact',
    title: 'Contact | Diamond Project',
    description: 'Contact Diamond Project for questions about the opportunity, training, partnership or your next step.'
  },
  {
    path: '/events',
    title: 'Events & Stories | Diamond Project',
    description: 'Watch highlights from Diamond Project events, including the 10th Anniversary “The Invincibles” celebrations in Abuja.',
    image: '/assets/events/kUQ-n9mrXkI.jpg',
    width: '1280',
    height: '720'
  },
  {
    path: '/legal',
    title: 'Terms of Service | Diamond Project',
    description: 'The terms that govern use of the Diamond Project website and services.',
    canonicalPath: '/legal/terms'
  },
  {
    path: '/legal/terms',
    title: 'Terms of Service | Diamond Project',
    description: 'The terms that govern use of the Diamond Project website and services.'
  },
  {
    path: '/legal/privacy',
    title: 'Privacy Policy | Diamond Project',
    description: 'How Diamond Project collects, uses and protects personal information.'
  },
  {
    path: '/legal/cookies',
    title: 'Cookie Policy | Diamond Project',
    description: 'How Diamond Project uses cookies and how you can control them.'
  }
];

const escapeAttr = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const setMeta = (html, attribute, key, content) => {
  const pattern = new RegExp(`<meta ${attribute}="${key}" content="[^"]*"\\s*/?>`, 'gi');
  const tag = `<meta ${attribute}="${key}" content="${escapeAttr(content)}">`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `${tag}\n</head>`);
};

const absolute = (value) => /^https?:\/\//i.test(value) ? value : `${origin}${value}`;

const outputDir = join(process.cwd(), 'dist', 'diamondproject', 'browser');
const shellPath = join(outputDir, 'index.html');

if (!existsSync(shellPath)) {
  throw new Error(`Build output not found: ${shellPath}`);
}

const shell = readFileSync(shellPath, 'utf8');

for (const page of pages) {
  const canonical = `${origin}${page.canonicalPath || page.path}`;
  const image = absolute(page.image || defaultImage);
  const width = page.width || defaultWidth;
  const height = page.height || defaultHeight;

  let html = shell
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(page.title)}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${escapeAttr(canonical)}">`);

  html = setMeta(html, 'name', 'description', page.description);
  html = setMeta(html, 'property', 'og:title', page.title);
  html = setMeta(html, 'property', 'og:description', page.description);
  html = setMeta(html, 'property', 'og:image', image);
  html = setMeta(html, 'property', 'og:image:alt', page.title);
  html = setMeta(html, 'property', 'og:image:width', width);
  html = setMeta(html, 'property', 'og:image:height', height);
  html = setMeta(html, 'property', 'og:url', canonical);
  html = setMeta(html, 'property', 'og:type', 'website');
  html = setMeta(html, 'name', 'twitter:card', 'summary_large_image');
  html = setMeta(html, 'name', 'twitter:title', page.title);
  html = setMeta(html, 'name', 'twitter:description', page.description);
  html = setMeta(html, 'name', 'twitter:image', image);
  html = setMeta(html, 'name', 'twitter:image:alt', page.title);

  const targetDir = join(outputDir, ...page.path.split('/').filter(Boolean));
  mkdirSync(targetDir, { recursive: true });
  writeFileSync(join(targetDir, 'index.html'), html, 'utf8');
}

console.log(`Generated static SEO pages: ${pages.length}`);
