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
  tagline:    'Roofing information for Portland homeowners.',
  email:      `hello@${DOMAIN}`,
  // www, because that is the host the deploy serves; the apex redirects to it.
  // Not read from NEXT_PUBLIC_BASE_URL: that is set to the apex on Vercel and
  // was overriding this, so every canonical named the redirecting host.
  // DOMAIN itself stays bare, it also builds the contact address.
  baseUrl:    `https://www.${DOMAIN}`,
  ga4:        process.env.NEXT_PUBLIC_GA4_ID   || 'G-10H8J1J51J',
  googleSiteVerification: 'tYShE7VyrtEp3xwHQyBNdCiOH-U6hhvKOsv0-fD9qT0',
  gasWebhook: process.env.NEXT_PUBLIC_GAS_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbw3NUhKsrhgSIcr3SaOTRRS1S2Vg0aUKXD3Z9lsoomCk_z6x9kl0p3lpEC-HRRUghaEBg/exec',
  // Default OG/SEO
  defaultTitle:       'Portland OR Roofing | Roof Planning & Referrals',
  defaultDescription: 'Roofing repair, replacement, material, and permit guides for Portland-area homeowners. Compare project scopes and request a contractor referral.',
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
