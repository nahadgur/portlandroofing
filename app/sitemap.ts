import type { MetadataRoute } from 'next'
import { neighborhoods } from '@/lib/neighborhoods'
import { SITE } from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.baseUrl

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url:              base,
      lastModified:     new Date(),
      changeFrequency:  'weekly',
      priority:         1.0,
    },
    {
      url:              `${base}/pdx-cost-index`,
      lastModified:     new Date(),
      changeFrequency:  'monthly',
      priority:         0.9,
    },
  ]

  const neighborhoodRoutes: MetadataRoute.Sitemap = neighborhoods.map(n => ({
    url:              `${base}/portland/${n.slug}`,
    lastModified:     new Date(),
    changeFrequency:  'monthly' as const,
    priority:         0.8,
  }))

  return [...staticRoutes, ...neighborhoodRoutes]
}
