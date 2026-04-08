import type { Metadata } from 'next'
import Script    from 'next/script'
import { notFound } from 'next/navigation'
import Link      from 'next/link'
import Nav       from '@/components/Nav'
import Footer    from '@/components/Footer'
import { posts, getPostBySlug, getStaticPostPaths, postCategoryLabels, postCategoryColors } from '@/lib/posts'
import { SITE }  from '@/lib/config'
import { breadcrumbSchema } from '@/lib/schema'

export function generateStaticParams() {
  return getStaticPostPaths()
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPostBySlug(params.slug)
  if (!p) return {}
  const url = `${SITE.baseUrl}/blog/${p.slug}`
  return {
    title:      `${p.title} | ${SITE.name}`,
    description: p.excerpt,
    alternates: { canonical: url },
    openGraph:  { title: p.title, description: p.excerpt, url, type: 'article', publishedTime: p.published },
    twitter:    { title: p.title, description: p.excerpt },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const p = getPostBySlug(params.slug)
  if (!p) notFound()

  const related = posts
    .filter(x => x.slug !== p.slug)
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
    .slice(0, 2)

  const catColor = postCategoryColors[p.category]

  /* ── shared typography ── */
  const mono = { fontFamily: 'var(--font-space-mono)' } as const
  const cond = { fontFamily: 'var(--font-barlow-cond)' } as const
  const body = { fontFamily: 'var(--font-barlow)' } as const
  const disp = { fontFamily: 'var(--font-bebas)' } as const

  const blogPostingSchema = {
    '@context':       'https://schema.org',
    '@type':          'BlogPosting',
    headline:         p.title,
    description:      p.excerpt,
    datePublished:    p.published,
    dateModified:     p.published,
    keywords:         p.tags.join(', '),
    author:           { '@type': 'Organization', name: SITE.name, url: SITE.baseUrl },
    publisher:        { '@type': 'Organization', name: SITE.name, url: SITE.baseUrl },
    url:              `${SITE.baseUrl}/blog/${p.slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.baseUrl}/blog/${p.slug}` },
  }

  return (
    <>
      <Script id="schema-post"       type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(blogPostingSchema)}</Script>
      <Script id="schema-breadcrumb" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema([
        { name: 'Home', url: SITE.baseUrl },
        { name: 'Blog', url: `${SITE.baseUrl}/blog` },
        { name: p.title, url: `${SITE.baseUrl}/blog/${p.slug}` },
      ]))}</Script>

      <Nav />

      {/* Breadcrumb */}
      <div style={{ padding: '0.8rem 3rem', borderBottom: '1px solid var(--bdr)', background: 'var(--bg2)' }}>
        <div style={{ ...mono, fontSize: '0.68rem', color: 'var(--muted)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'var(--amber)', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link href="/blog" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Blog</Link>
          <span>›</span>
          <span style={{ color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '260px' }}>{p.title}</span>
        </div>
      </div>

      {/* Post hero — full width */}
      <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--bdr)', padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,4vw,3rem)' }}>
        <div style={{ maxWidth: '900px' }}>
          {/* Category + meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.4rem', flexWrap: 'wrap' }}>
            <span style={{ ...mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.25rem 0.65rem', background: `${catColor}15`, color: catColor, border: `1px solid ${catColor}33` }}>
              {postCategoryLabels[p.category]}
            </span>
            <span style={{ ...mono, fontSize: '0.65rem', color: 'var(--muted)' }}>{formatDate(p.published)}</span>
            <span style={{ ...mono, fontSize: '0.65rem', color: 'var(--muted)' }}>{p.readTime} min read</span>
          </div>

          <h1 style={{ ...disp, fontSize: 'clamp(2.2rem,5vw,4rem)', lineHeight: 0.95, color: 'var(--text)', marginBottom: '1.2rem' }}>
            {p.title}
          </h1>

          <p style={{ ...body, fontSize: 'clamp(1rem,2vw,1.15rem)', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300, marginBottom: '1.5rem', maxWidth: '720px' }}>
            {p.excerpt}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {p.tags.map(tag => (
              <span key={tag} style={{ ...mono, fontSize: '0.62rem', padding: '0.2rem 0.5rem', background: 'var(--bg3)', color: 'var(--muted)', border: '1px solid var(--bdr)' }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Post body — full width centered */}
      <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--bdr)' }}>
        <article style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(2.5rem,5vw,4rem) clamp(1.5rem,4vw,3rem)' }}>
          {p.body.map((section, i) => (
            <div key={i} style={{ marginBottom: '2.8rem' }}>
              {section.heading && (
                <h2 style={{ ...disp, fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '1.4rem', paddingTop: i > 0 ? '2rem' : 0, borderTop: i > 0 ? '1px solid var(--bdr)' : 'none' }}>
                  {section.heading}
                </h2>
              )}
              {section.body.split('\n\n').map((para, j) => (
                <p key={j} style={{ ...body, fontSize: 'clamp(0.95rem,1.8vw,1.05rem)', color: 'var(--text)', lineHeight: 1.8, marginBottom: '1.3rem', fontWeight: 300 }}>
                  {para}
                </p>
              ))}
            </div>
          ))}

          {/* CTA */}
          <div style={{ marginTop: '3rem', padding: '2rem 2.5rem', background: 'var(--bg2)', border: '1px solid var(--bdr)', borderLeft: `4px solid ${catColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ ...mono, fontSize: '0.65rem', color: catColor, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Get Matched with Vetted Portland Contractors</div>
              <p style={{ ...body, fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>
                Free quotes in your zip code. 48-hour response. No spam.
              </p>
            </div>
            <a href="/#quote" style={{ display: 'inline-block', background: 'var(--amber)', color: '#000', ...cond, fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.8rem 2rem', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
              Get Free Quotes →
            </a>
          </div>
        </article>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="section-pad" style={{ background: 'var(--bg2)' }}>
          <div style={{ ...mono, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>[ More From The Blog ]</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1px', background: 'var(--bdr)' }}>
            {related.map(r => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="nbhd-card-hover" style={{ background: 'var(--bg)', padding: '1.8rem', textDecoration: 'none', display: 'block' }}>
                <div style={{ ...mono, fontSize: '0.62rem', color: postCategoryColors[r.category], letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>{postCategoryLabels[r.category]}</div>
                <div style={{ ...cond, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.3, marginBottom: '0.5rem' }}>{r.title}</div>
                <div style={{ ...mono, fontSize: '0.62rem', color: 'var(--muted)', marginBottom: '0.8rem' }}>{formatDate(r.published)}</div>
                <div style={{ ...cond, fontSize: '0.82rem', color: 'var(--amber)' }}>Read →</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}
