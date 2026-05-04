import type { MetadataRoute } from 'next'
import { neighborhoods } from '@/lib/neighborhoods'
import { services }      from '@/lib/services'
import { guides }        from '@/lib/guides'
import { posts }         from '@/lib/posts'
import { SITE }          from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.baseUrl

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                     lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/tools`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${base}/tools/cost-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/tools/permit-lookup`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/tools/lifecycle-cost`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/tools/wind-risk`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/tools/roi`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/pdx-cost-index`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/storm-tracker/pdx-active-warnings`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${base}/guides`,         lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${base}/blog`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${base}/services`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contractors/vetting`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = services.map(s => ({
    url: `${base}/services/${s.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.85,
  }))

  const neighborhoodRoutes: MetadataRoute.Sitemap = neighborhoods.map(n => ({
    url: `${base}/portland/${n.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8,
  }))

  const guideRoutes: MetadataRoute.Sitemap = guides.map(g => ({
    url: `${base}/guides/${g.slug}`, lastModified: new Date(g.published), changeFrequency: 'monthly' as const, priority: 0.85,
  }))

  const postRoutes: MetadataRoute.Sitemap = posts.map(p => ({
    url: `${base}/blog/${p.slug}`, lastModified: new Date(p.published), changeFrequency: 'weekly' as const, priority: 0.8,
  }))

  return [...staticRoutes, ...serviceRoutes, ...neighborhoodRoutes, ...guideRoutes, ...postRoutes]
}
