// ─────────────────────────────────────────────────────────────────────────────
// SITE CONFIG, update DOMAIN here once decided, everything else inherits it
// ─────────────────────────────────────────────────────────────────────────────

export const DOMAIN = 'portlandorroofing.com'

export const SITE = {
  domain:     DOMAIN,
  // SERP / schema brand (matches URL: portlandorroofing.com). The visible
  // logo / hero copy can still read "Portland Roofing", only the SERP
  // site-name signal needs to reflect the registered domain.
  name:       'Portland OR Roofing',
  tagline:    'The Only Roofing Platform PDX Trusts.',
  phone:      '(503) 555-0100',
  email:      `hello@${DOMAIN}`,
  baseUrl:    process.env.NEXT_PUBLIC_BASE_URL || `https://${DOMAIN}`,
  ga4:        process.env.NEXT_PUBLIC_GA4_ID   || 'G-10H8J1J51J',
  googleSiteVerification: 'tYShE7VyrtEp3xwHQyBNdCiOH-U6hhvKOsv0-fD9qT0',
  gasWebhook: process.env.NEXT_PUBLIC_GAS_WEBHOOK_URL || '',
  twitter:    '@pdxroofing',
  // Default OG/SEO
  defaultTitle:       'Portland OR Roofing | The PDX Roofing Authority',
  defaultDescription: 'Portland\'s definitive roofing platform. Real local pricing data, vetted contractors, and hyper-local guides for 50+ Portland metro neighborhoods.',
  // Digipeak partner network handoff (live as of 2026-05-13).
  // sub2 carries the site identifier so the partner can attribute traffic
  // back to the originating domain; sub5 carries the ZIP code (dynamic).
  partnerOffer: {
    base: process.env.NEXT_PUBLIC_PARTNER_OFFER_URL || 'https://www.fui4j3kd.com/98BZMH/XCQZJ/',
    uid: process.env.NEXT_PUBLIC_PARTNER_UID || '760',
    sourceId: process.env.NEXT_PUBLIC_PARTNER_SOURCE_ID || 'google',
    /** Site identifier passed as sub2 for partner attribution. */
    siteId: process.env.NEXT_PUBLIC_PARTNER_SITE_ID || 'portlandorroofing',
  },
}
