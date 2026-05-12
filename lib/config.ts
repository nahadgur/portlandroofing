// ─────────────────────────────────────────────────────────────────────────────
// SITE CONFIG — update DOMAIN here once decided, everything else inherits it
// ─────────────────────────────────────────────────────────────────────────────

export const DOMAIN = 'portlandorroofing.com'

export const SITE = {
  domain:     DOMAIN,
  name:       'Portland Roofing',
  tagline:    'The Only Roofing Platform PDX Trusts.',
  phone:      '(503) 555-0100',
  email:      `hello@${DOMAIN}`,
  baseUrl:    process.env.NEXT_PUBLIC_BASE_URL || `https://${DOMAIN}`,
  ga4:        process.env.NEXT_PUBLIC_GA4_ID   || 'G-XXXXXXXXXX',
  gasWebhook: process.env.NEXT_PUBLIC_GAS_WEBHOOK_URL || '',
  twitter:    '@pdxroofing',
  // Default OG/SEO
  defaultTitle:       'Portland Roofing, The PDX Roofing Authority',
  defaultDescription: 'Portland\'s definitive roofing platform. Real local pricing data, vetted contractors, and hyper-local guides for 50+ Portland metro neighborhoods.',
}
