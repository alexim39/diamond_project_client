const DEFAULT_IMAGE = '/assets/images/hero-bg2.jpg';
const DEFAULT_IMAGE_WIDTH = '2560';
const DEFAULT_IMAGE_HEIGHT = '1436';

const RESERVED = new Set([
  'get-started', 'legal', 'faq', 'contact', 'events',
  'assets', 'api', 'video', '_vercel', 'index.html',
  'favicon.ico', 'robots.txt', 'sitemap.xml', '_redirects'
]);

const STATIC_META = {
  '/get-started': {
    title: 'Get Started | Diamond Project',
    description: 'Complete the Diamond Project survey and a consultant will contact you about mentorship, training and the online business opportunity.',
    path: '/get-started',
    image: DEFAULT_IMAGE,
    width: DEFAULT_IMAGE_WIDTH,
    height: DEFAULT_IMAGE_HEIGHT
  },
  '/faq': {
    title: 'Frequently Asked Questions | Diamond Project',
    description: 'Answers to common questions about Diamond Project, getting started, the opportunity, training and earnings.',
    path: '/faq',
    image: DEFAULT_IMAGE,
    width: DEFAULT_IMAGE_WIDTH,
    height: DEFAULT_IMAGE_HEIGHT
  },
  '/contact': {
    title: 'Contact | Diamond Project',
    description: 'Contact Diamond Project for questions about the opportunity, training, partnership or your next step.',
    path: '/contact',
    image: DEFAULT_IMAGE,
    width: DEFAULT_IMAGE_WIDTH,
    height: DEFAULT_IMAGE_HEIGHT
  },
  '/events': {
    title: 'Events & Stories | Diamond Project',
    description: 'Watch highlights from Diamond Project events, including the 10th Anniversary “The Invincibles” celebrations in Abuja.',
    path: '/events',
    image: '/assets/events/kUQ-n9mrXkI.jpg',
    width: '1280',
    height: '720'
  },
  '/legal': {
    title: 'Terms of Service | Diamond Project',
    description: 'The terms that govern use of the Diamond Project website and services.',
    path: '/legal/terms',
    image: DEFAULT_IMAGE,
    width: DEFAULT_IMAGE_WIDTH,
    height: DEFAULT_IMAGE_HEIGHT
  },
  '/legal/terms': {
    title: 'Terms of Service | Diamond Project',
    description: 'The terms that govern use of the Diamond Project website and services.',
    path: '/legal/terms',
    image: DEFAULT_IMAGE,
    width: DEFAULT_IMAGE_WIDTH,
    height: DEFAULT_IMAGE_HEIGHT
  },
  '/legal/privacy': {
    title: 'Privacy Policy | Diamond Project',
    description: 'How Diamond Project collects, uses and protects personal information.',
    path: '/legal/privacy',
    image: DEFAULT_IMAGE,
    width: DEFAULT_IMAGE_WIDTH,
    height: DEFAULT_IMAGE_HEIGHT
  },
  '/legal/cookies': {
    title: 'Cookie Policy | Diamond Project',
    description: 'How Diamond Project uses cookies and how you can control them.',
    path: '/legal/cookies',
    image: DEFAULT_IMAGE,
    width: DEFAULT_IMAGE_WIDTH,
    height: DEFAULT_IMAGE_HEIGHT
  }
};

const passThrough = () => new Response(null, {
  headers: { 'x-middleware-next': '1' }
});

const escapeAttr = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const setMeta = (html, attribute, key, content) => {
  const pattern = new RegExp(`<meta ${attribute}="${key}" content="[^"]*"\\s*/?>`, 'i');
  const tag = `<meta ${attribute}="${key}" content="${escapeAttr(content)}">`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `${tag}\n</head>`);
};

const removeMeta = (html, attribute, key) => {
  const pattern = new RegExp(`\\s*<meta ${attribute}="${key}" content="[^"]*"\\s*/?>`, 'i');
  return html.replace(pattern, '');
};

const absoluteUrl = (origin, value, fallback) => {
  const path = value?.trim() || fallback;
  if (/^https?:\/\//i.test(path)) return path;
  return `${origin}${path.startsWith('/') ? '' : '/'}${path}`;
};

const injectPageMeta = (html, meta, origin) => {
  const canonical = `${origin}${meta.path}`;
  const image = absoluteUrl(origin, meta.image, DEFAULT_IMAGE);

  let output = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(meta.title)}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${escapeAttr(canonical)}">`);

  output = setMeta(output, 'name', 'description', meta.description);
  output = setMeta(output, 'property', 'og:title', meta.title);
  output = setMeta(output, 'property', 'og:description', meta.description);
  output = setMeta(output, 'property', 'og:image', image);
  output = setMeta(output, 'property', 'og:image:alt', meta.title);
  output = setMeta(output, 'property', 'og:url', canonical);
  output = setMeta(output, 'property', 'og:type', meta.type || 'website');
  output = setMeta(output, 'name', 'twitter:card', 'summary_large_image');
  output = setMeta(output, 'name', 'twitter:title', meta.title);
  output = setMeta(output, 'name', 'twitter:description', meta.description);
  output = setMeta(output, 'name', 'twitter:image', image);
  output = setMeta(output, 'name', 'twitter:image:alt', meta.title);

  if (meta.width && meta.height) {
    output = setMeta(output, 'property', 'og:image:width', meta.width);
    output = setMeta(output, 'property', 'og:image:height', meta.height);
  } else {
    output = removeMeta(output, 'property', 'og:image:width');
    output = removeMeta(output, 'property', 'og:image:height');
  }

  return output;
};

export const injectPartnerMeta = (html, partner, username, origin) => {
  const fullName = [partner.name, partner.surname].filter(Boolean).join(' ').trim() || username;
  const description = (partner.subHeadline || partner.bio || `Join ${fullName} on Diamond Project and start building a flexible online business.`).slice(0, 300);

  return injectPageMeta(html, {
    title: `${fullName} | Diamond Project Partner`,
    description,
    path: `/${encodeURIComponent(username)}`,
    image: partner.profileImage || DEFAULT_IMAGE,
    type: 'profile'
  }, origin);
};

export const config = {
  matcher: ['/((?!assets/|api/|video/|_vercel/).*)']
};

export default async function middleware(request) {
  try {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/, '') || '/';

    if (pathname === '/' || pathname.includes('.') || pathname.startsWith('/_')) {
      return passThrough();
    }

    const staticMeta = STATIC_META[pathname];
    if (staticMeta) {
      const shellResponse = await fetch(new URL('/index.html', request.url));
      if (!shellResponse.ok) return passThrough();
      const html = await shellResponse.text();
      return new Response(injectPageMeta(html, staticMeta, url.origin), {
        status: 200,
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'public, s-maxage=3600, stale-while-revalidate=86400'
        }
      });
    }

    const segments = pathname.split('/').filter(Boolean);
    if (segments.length !== 1) return passThrough();

    const username = decodeURIComponent(segments[0]);
    if (!username || RESERVED.has(username.toLowerCase()) || username.includes('.') || !/^[a-zA-Z0-9_]+$/.test(username)) {
      return passThrough();
    }

    const apiBase = (process.env.PARTNER_API_URL || process.env.API_BASE_URL || 'https://c21fg-f054fmrs.b4a.run').replace(/\/+$/, '');
    const partnerResponse = await fetch(`${apiBase}/partners/check-username/${encodeURIComponent(username)}`, {
      headers: { accept: 'application/json' },
      signal: typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(2500) : undefined
    });

    if (!partnerResponse.ok) return passThrough();

    const payload = await partnerResponse.json();
    if (!payload?.success || !payload?.partner) return passThrough();

    const shellResponse = await fetch(new URL('/index.html', request.url));
    if (!shellResponse.ok) return passThrough();

    const html = await shellResponse.text();
    const injected = injectPartnerMeta(html, payload.partner, username, url.origin);

    return new Response(injected, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });
  } catch {
    return passThrough();
  }
}
