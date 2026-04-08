import { SITE } from './config'
import type { Neighborhood } from './neighborhoods'

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.name,
    url: SITE.baseUrl,
    telephone: SITE.phone,
    email: SITE.email,
    description: SITE.defaultDescription,
    areaServed: {
      '@type': 'City',
      name: 'Portland',
      sameAs: 'https://en.wikipedia.org/wiki/Portland,_Oregon',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Portland Roofing Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Roof Replacement' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Roof Repair' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Roof Inspection' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gutter Installation' } },
      ],
    },
  }
}

export function neighborhoodSchema(n: Neighborhood) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${n.name} Roofing Contractors & Costs | ${SITE.name}`,
    description: n.description,
    url: `${SITE.baseUrl}/portland/${n.slug}`,
    about: {
      '@type': 'Place',
      name: n.name,
      address: {
        '@type': 'PostalAddress',
        postalCode: n.zip,
        addressLocality: 'Portland',
        addressRegion: 'OR',
        addressCountry: 'US',
      },
    },
  }
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
