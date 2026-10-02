import { SITE } from './config'
import type { Neighborhood } from './neighborhoods'

// ─── Shared helpers ────────────────────────────────────────────────────────
const logoUrl   = `${SITE.baseUrl}/android-chrome-512x512.png`
const ogDefault = `${SITE.baseUrl}/images/hero-blog-hub.jpeg`


// ─── LocalBusiness ────────────────────────────────────────────────────────
// Compatibility name used by older pages. The site is a referral publisher.
export function localBusinessSchema() { return organizationSchema() }

// ─── WebSite (site-name signal for Google SERP) ───────────────────────────
export function webSiteSchema() {
  return {
    '@context':      'https://schema.org',
    '@type':         'WebSite',
    '@id':           `${SITE.baseUrl}/#website`,
    name:            SITE.name,
    alternateName:   ['Portland Roofing', 'PortlandORRoofing'],
    url:             SITE.baseUrl,
    inLanguage:      'en-US',
    publisher:       { '@id': `${SITE.baseUrl}/#organization` },
  }
}

// ─── Organization ─────────────────────────────────────────────────────────
export function organizationSchema() {
  return { '@context':'https://schema.org', '@type':'Organization', '@id':`${SITE.baseUrl}/#organization`, name:SITE.name, url:SITE.baseUrl,
    description:'Roofing information and referral website for Portland-area homeowners.',
    logo:{'@type':'ImageObject',url:logoUrl,width:512,height:512} }
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
  return webPageSchema({name:`Roofing in ${n.name}`,description:n.description,url:`${SITE.baseUrl}/portland/${n.slug}/`})
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
