const RESERVED = new Set([
  'get-started', 'legal', 'faq', 'contact', 'events',
  'assets', 'api', 'video', '_vercel', 'index.html',
  'favicon.ico', 'robots.txt', 'sitemap.xml', '_redirects'
]);

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

const absoluteUrl = (origin, value, fallback) => {
  const path = value?.trim() || fallback;
  if (/^https?:\/\//i.test(path)) return path;
  return `${origin}${path.startsWith('/') ? '' : '/'}${path}`;
};

export const injectPartnerMeta = (html, partner, username, origin) => {
  const fullName = [partner.name, partner.surname].filter(Boolean).join(' ').trim() || username;
  const title = `${fullName} | Diamond Project Partner`;
  const description = (partner.subHeadline || partner.bio || `Join ${fullName} on Diamond Project and start building a flexible online business.`).slice(0, 300);
  const image = absoluteUrl(origin, partner.profileImage, '/assets/images/black-diamond.png');
  const canonical = `${origin}/${encodeURIComponent(username)}`;

  let output = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(title)}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${escapeAttr(canonical)}">`);

  output = setMeta(output, 'name', 'description', description);
  output = setMeta(output, 'property', 'og:title', title);
  output = setMeta(output, 'property', 'og:description', description);
  output = setMeta(output, 'property', 'og:image', image);
  output = setMeta(output, 'property', 'og:image:alt', fullName);
  output = setMeta(output, 'property', 'og:url', canonical);
  output = setMeta(output, 'property', 'og:type', 'profile');
  output = setMeta(output, 'name', 'twitter:title', title);
  output = setMeta(output, 'name', 'twitter:description', description);
  output = setMeta(output, 'name', 'twitter:image', image);

  return output;
};

export const config = {
  matcher: ['/:username']
};

export default async function middleware(request) {
  try {
    const url = new URL(request.url);
    const username = decodeURIComponent(url.pathname.split('/').filter(Boolean)[0] || '');

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
