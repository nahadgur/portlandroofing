import type { MetadataRoute } from 'next'
import { neighborhoods }    from '@/lib/neighborhoods'
import { guides }           from '@/lib/guides'
import { posts }            from '@/lib/posts'
import { services }         from '@/lib/services'
import { SITE }             from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.baseUrl

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                     lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/pdx-cost-index`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/guides`,         lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${base}/blog`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${base}/services`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  const neighborhoodRoutes: MetadataRoute.Sitemap = neighborhoods.map(n => ({
    url: `${base}/portland/${n.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8,
  }))

  const guideRoutes: MetadataRoute.Sitemap = guides.map(g => ({
    url: `${base}/guides/${g.slug}`, lastModified: new Date(g.published), changeFrequency: 'monthly' as const, priority: 0.85,
  }))

  const postRoutes: MetadataRoute.Sitemap = posts.map(p => ({
    url: `${base}/blog/${p.slug}`, lastModified: new Date(p.published), changeFrequency: 'weekly' as const, priority: 0.8,
  }))

  // 5 services × 50 neighborhoods = 250 pages
  const serviceRoutes: MetadataRoute.Sitemap = services.flatMap(s =>
    neighborhoods.map(n => ({
      url:             `${base}/${s.slug}/${n.slug}`,
      lastModified:    new Date(),
      changeFrequency: 'monthly' as const,
      priority:        0.75,
    }))
  )

  return [...staticRoutes, ...neighborhoodRoutes, ...guideRoutes, ...postRoutes, ...serviceRoutes]
}
