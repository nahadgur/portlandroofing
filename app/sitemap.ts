import type { MetadataRoute } from 'next'
import { neighborhoods } from '@/lib/neighborhoods'
import { services }      from '@/lib/services'
import { guides }        from '@/lib/guides'
import { posts }         from '@/lib/posts'
import { SITE }          from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.baseUrl

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                     changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/tools`,          changeFrequency: 'monthly', priority: 0.95 },
    { url: `${base}/tools/cost-calculator`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/tools/permit-lookup`,   changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/tools/lifecycle-cost`,  changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/tools/wind-risk`,       changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/tools/roi`,             changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/pdx-cost-index`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/storm-tracker/pdx-active-warnings`, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${base}/guides`,         changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${base}/blog`,           changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${base}/services`,       changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`,        changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contractors/vetting`, changeFrequency: 'monthly', priority: 0.7 },
  ]

  staticRoutes.push(...[
    'guides/portland-historic-district-roofing-codes',
    'guides/roof-replacement-roi-portland',
    'guides/solar-ready-roofing-oregon-incentives',
  ].map(path => ({url:`${base}/${path}`,lastModified:new Date('2026-10-02')})))

  const serviceRoutes: MetadataRoute.Sitemap = services.map(s => ({
    url: `${base}/services/${s.slug}`, changeFrequency: 'monthly' as const, priority: 0.85,
  }))

  const neighborhoodRoutes: MetadataRoute.Sitemap = neighborhoods.map(n => ({
    url: `${base}/portland/${n.slug}`, changeFrequency: 'monthly' as const, priority: 0.8,
  }))

  const guideRoutes: MetadataRoute.Sitemap = guides.map(g => ({
    url: `${base}/guides/${g.slug}`, lastModified: new Date(g.updated ?? g.published), changeFrequency: 'monthly' as const, priority: 0.85,
  }))

  const postRoutes: MetadataRoute.Sitemap = posts.filter(p => !p.draft).map(p => ({
    url: `${base}/blog/${p.slug}`, lastModified: new Date(p.updated ?? p.published), changeFrequency: 'weekly' as const, priority: 0.8,
  }))

  // Match the final URLs served by trailingSlash: true. Omit lastModified
  // unless a content date is known; a rebuild is not a content revision.
  return [...staticRoutes, ...serviceRoutes, ...neighborhoodRoutes, ...guideRoutes, ...postRoutes]
    .map(route => ({ ...route, url: `${route.url.replace(/\/+$/, '')}/` }))
}
