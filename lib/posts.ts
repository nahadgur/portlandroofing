export interface Post {
  slug:       string
  title:      string
  excerpt:    string
  category:   'data' | 'market' | 'storm' | 'contractor' | 'neighbourhood'
  tags:       string[]
  published:  string   // ISO date
  readTime:   number
  featured:   boolean
  body:       PostSection[]
  hub?:           string      // parent guide slug this spoke supports (silo link)
  draft?:         boolean     // true = not listed, sitemapped or built until a human flips it
  relatedSpokes?: string[]    // in-site sibling slugs only (no cross-site links)
  faqs?:          { q: string; a: string }[]  // structured Q&A -> styled list + FAQPage schema
}

export interface PostSection {
  heading?: string   // optional, some sections are just prose
  body:     string   // paragraphs separated by \n\n
}

// Build-time directory loader: every file in data/posts/ exporting `post` is
// aggregated here, so adding a spoke is a single new file and there is no
// shared array to hand-edit. Webpack (Next 14 default build) provides
// require.context; the cast keeps `tsc --noEmit` happy without webpack types.
const ctx = (require as unknown as {
  context(dir: string, useSubdirs: boolean, regExp: RegExp): {
    keys(): string[]
    (id: string): { post: Post }
  }
}).context('../data/posts', false, /\.ts$/)

export const posts: Post[] = ctx
  .keys()
  .map((k) => ctx(k).post)
  .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())


export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(p => p.slug === slug)
}

export function getStaticPostPaths() {
  // Drafts build no page -> 404 until a human flips draft:false.
  return posts.filter(p => !p.draft).map(p => ({ slug: p.slug }))
}

// Spokes published under a given hub guide (drafts excluded), for the hub's
// spoke grid and a spoke's sibling links. Silo-tight: same-hub only.
export function getSpokesByHub(hubSlug: string): Post[] {
  return posts.filter(p => p.hub === hubSlug && !p.draft)
}

export const postCategoryLabels: Record<Post['category'], string> = {
  data:         'Data & Research',
  market:       'Market Insight',
  storm:        'Storm Report',
  contractor:   'Contractor News',
  neighbourhood:'Neighborhood Report',
}

export const postCategoryColors: Record<Post['category'], string> = {
  data:         '#F5A623',
  market:       '#2ECC71',
  storm:        '#E63946',
  contractor:   '#7A7F8E',
  neighbourhood:'#F5A623',
}
