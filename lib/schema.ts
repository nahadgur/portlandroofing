import { SITE } from './config'
import type { Neighborhood } from './neighborhoods'

// ─── Shared helpers ────────────────────────────────────────────────────────
const logoUrl   = `${SITE.baseUrl}/android-chrome-512x512.png`
const ogDefault = `${SITE.baseUrl}/images/hero-blog-hub.jpeg`

/** Returns ISO date string for the last day of the current year */
function endOfYear() {
  return `${new Date().getFullYear()}-12-31`
}

// ─── LocalBusiness ────────────────────────────────────────────────────────
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    ['LocalBusiness', 'RoofingContractor'],
    '@id':      `${SITE.baseUrl}/#localbusiness`,
    name:       SITE.name,
    url:        SITE.baseUrl,
    logo: { '@type': 'ImageObject', url: logoUrl, width: 512, height: 512 },
    image:       ogDefault,
    telephone:   SITE.phone,
    email:       SITE.email,
    description: SITE.defaultDescription,
    priceRange:  '$$',
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '15:00' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Portland', addressRegion: 'OR', postalCode: '97201', addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'City', name: 'Portland',     sameAs: 'https://en.wikipedia.org/wiki/Portland,_Oregon' },
      { '@type': 'City', name: 'Beaverton' },
      { '@type': 'City', name: 'Hillsboro' },
      { '@type': 'City', name: 'Gresham' },
      { '@type': 'City', name: 'Lake Oswego' },
      { '@type': 'City', name: 'Tigard' },
      { '@type': 'City', name: 'Tualatin' },
      { '@type': 'City', name: 'West Linn' },
      { '@type': 'City', name: 'Milwaukie' },
      { '@type': 'City', name: 'Oregon City' },
    ],
    aggregateRating: {
      '@type': 'AggregateRating', ratingValue: 4.9, reviewCount: 312, bestRating: 5, worstRating: 1,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name:    'Portland Roofing Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Roof Replacement', url: `${SITE.baseUrl}/roof-replacement` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Roof Repair',      url: `${SITE.baseUrl}/roof-repair`      } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Roof Inspection',  url: `${SITE.baseUrl}/roof-inspection`  } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gutter Installation', url: `${SITE.baseUrl}/gutter-installation` } },
      ],
    },
    sameAs: [SITE.baseUrl, `https://twitter.com/${SITE.twitter.replace('@','')}`],
  }
}

// ─── Organization ─────────────────────────────────────────────────────────
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'Organization',
    '@id':      `${SITE.baseUrl}/#organization`,
    name:       SITE.name,
    url:        SITE.baseUrl,
    logo: { '@type': 'ImageObject', url: logoUrl, width: 512, height: 512 },
    email:      SITE.email,
    telephone:  SITE.phone,
    sameAs: [`https://twitter.com/${SITE.twitter.replace('@','')}`],
    contactPoint: {
      '@type': 'ContactPoint', telephone: SITE.phone,
      contactType: 'customer service', areaServed: 'US-OR', availableLanguage: 'English',
    },
  }
}

// ─── Article ──────────────────────────────────────────────────────────────
export function articleSchema({ headline, description, url, datePublished, dateModified, imageUrl }: {
  headline: string; description: string; url: string
  datePublished: string; dateModified?: string; imageUrl?: string
}) {
  return {
    '@context':    'https://schema.org',
    '@type':       'Article',
    headline,
    description,
    url,
    datePublished,
    dateModified:  dateModified ?? datePublished,
    image:         imageUrl ?? ogDefault,
    author:    { '@type': 'Organization', name: SITE.name, url: SITE.baseUrl },
    publisher: {
      '@type': 'Organization', name: SITE.name, url: SITE.baseUrl,
      logo: { '@type': 'ImageObject', url: logoUrl, width: 512, height: 512 },
    },
  }
}

// ─── Neighborhood LocalBusiness ───────────────────────────────────────────
export function neighborhoodBusinessSchema(n: Neighborhood) {
  return {
    '@context': 'https://schema.org',
    '@type':    ['LocalBusiness', 'RoofingContractor'],
    '@id':      `${SITE.baseUrl}/portland/${n.slug}#localbusiness`,
    name:       `${SITE.name} — ${n.name}`,
    description: n.description,
    url:        `${SITE.baseUrl}/portland/${n.slug}`,
    telephone:  SITE.phone,
    image:      ogDefault,
    priceRange: n.range,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Portland', addressRegion: 'OR', postalCode: n.zip, addressCountry: 'US',
    },
    areaServed: {
      '@type': 'Place', name: n.name,
      address: { '@type': 'PostalAddress', addressLocality: 'Portland', addressRegion: 'OR', postalCode: n.zip, addressCountry: 'US' },
    },
    parentOrganization: { '@id': `${SITE.baseUrl}/#organization` },
    sameAs: [SITE.baseUrl],
  }
}

// ─── Service ──────────────────────────────────────────────────────────────
export function serviceSchema({ name, description, url, neighborhood, zip, lowPrice, highPrice }: {
  name: string; description: string; url: string
  neighborhood: string; zip: string; lowPrice: number; highPrice: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type':    'Service',
    name,
    description,
    url,
    provider: { '@type': 'Organization', name: SITE.name, url: SITE.baseUrl },
    areaServed: {
      '@type': 'Place', name: neighborhood,
      address: { '@type': 'PostalAddress', postalCode: zip, addressLocality: 'Portland', addressRegion: 'OR', addressCountry: 'US' },
    },
    offers: { '@type': 'Offer', priceCurrency: 'USD', lowPrice, highPrice, priceValidUntil: endOfYear() },
  }
}

// ─── FAQ ──────────────────────────────────────────────────────────────────
export function faqSchema(faqs: ({ q: string; a: string } | { question: string; answer: string })[]) {
  return {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: faqs.map((item) => {
      const q = 'q' in item ? item.q : item.question
      const a = 'a' in item ? item.a : item.answer
      return { '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }
    }),
  }
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: item.url })),
  }
}

// ─── WebPage ──────────────────────────────────────────────────────────────
export function webPageSchema({ name, description, url }: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type':    'WebPage',
    name, description, url,
    isPartOf:  { '@id': `${SITE.baseUrl}/#website` },
    publisher: { '@id': `${SITE.baseUrl}/#organization` },
  }
}

// ─── Legacy alias ─────────────────────────────────────────────────────────
export function neighborhoodSchema(n: Neighborhood) { return neighborhoodBusinessSchema(n) }
