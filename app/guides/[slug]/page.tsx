import type { Metadata } from 'next'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import Link   from 'next/link'
import Nav    from '@/components/Nav'
import Footer from '@/components/Footer'
import { guides, getGuideBySlug, getStaticGuidePaths, categoryLabels } from '@/lib/guides'
import { SITE } from '@/lib/config'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'

export function generateStaticParams() {
  return getStaticGuidePaths()
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = getGuideBySlug(params.slug)
  if (!g) return {}
  const url = `${SITE.baseUrl}/guides/${g.slug}`
  return {
    title:      `${g.title} | ${SITE.name}`,
    description: g.description,
    alternates: { canonical: url },
    openGraph:  { title: g.title, description: g.description, url, type: 'article' },
    twitter:    { title: g.title, description: g.description },
  }
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = getGuideBySlug(params.slug)
  if (!g) notFound()

  const related = guides.filter(x => x.slug !== g.slug && (x.category === g.category || x.featured)).slice(0, 2)

  const articleSchema = {
    '@context':   'https://schema.org',
    '@type':      'Article',
    headline:     g.title,
    description:  g.description,
    datePublished: g.published,
    dateModified:  g.published,
    author:       { '@type': 'Organization', name: SITE.name, url: SITE.baseUrl },
    publisher:    { '@type': 'Organization', name: SITE.name, url: SITE.baseUrl },
    url:          `${SITE.baseUrl}/guides/${g.slug}`,
  }

  /* ── shared typography styles ── */
  const mono = { fontFamily: 'var(--font-space-mono)' } as const
  const cond = { fontFamily: 'var(--font-barlow-cond)' } as const
  const body = { fontFamily: 'var(--font-barlow)' } as const
  const disp = { fontFamily: 'var(--font-bebas)' } as const

  return (
    <>
      <Script id="schema-article"    type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(articleSchema)}</Script>
      <Script id="schema-breadcrumb" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema([
        { name: 'Home',   url: SITE.baseUrl },
        { name: 'Guides', url: `${SITE.baseUrl}/guides` },
        { name: g.headline, url: `${SITE.baseUrl}/guides/${g.slug}` },
      ]))}</Script>
      <Script id="schema-faq" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(faqSchema(g.faqs))}</Script>

      <Nav />

      {/* Breadcrumb */}
      <div style={{ padding: '0.8rem 3rem', borderBottom: '1px solid var(--bdr)', background: 'var(--bg2)' }}>
        <div style={{ ...mono, fontSize: '0.68rem', color: 'var(--muted)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'var(--amber)', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link href="/guides" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Guides</Link>
          <span>›</span>
          <span style={{ color: 'var(--text)' }}>{g.headline}</span>
        </div>
      </div>

      {/* Guide hero — full width */}
      <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--bdr)', padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,4vw,3rem)' }}>
        <div style={{ maxWidth: '900px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
            <span style={{ ...mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.25rem 0.65rem', background: 'rgba(245,166,35,0.08)', color: 'var(--amber)', border: '1px solid rgba(245,166,35,0.25)' }}>
              {categoryLabels[g.category]}
            </span>
            <span style={{ ...mono, fontSize: '0.65rem', color: 'var(--muted)' }}>
              {g.readTime} min read · Updated {new Date(g.published).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          </div>
          <h1 style={{ ...disp, fontSize: 'clamp(2.2rem,5vw,4rem)', lineHeight: 0.95, color: 'var(--text)', marginBottom: '1.2rem' }}>
            {g.title}
          </h1>
          <p style={{ ...body, fontSize: 'clamp(1rem,2vw,1.15rem)', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300, maxWidth: '720px' }}>
            {g.description}
          </p>
        </div>
      </div>

      {/* Article — full width with comfortable reading width */}
      <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--bdr)' }}>
        <article style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(2.5rem,5vw,4rem) clamp(1.5rem,4vw,3rem)' }}>

          {/* Table of contents */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--bdr)', padding: '1.5rem 2rem', marginBottom: '3.5rem', borderLeft: '3px solid var(--amber)' }}>
            <div style={{ ...mono, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>In This Guide</div>
            <ol style={{ listStyle: 'none' }}>
              {g.sections.map((s, i) => (
                <li key={i} style={{ ...body, fontSize: '0.92rem', color: 'var(--muted)', padding: '0.4rem 0', borderBottom: i < g.sections.length - 1 ? '1px solid var(--bdr)' : 'none', display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
                  <span style={{ ...mono, fontSize: '0.68rem', color: 'var(--amber)', flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                  {s.heading}
                </li>
              ))}
            </ol>
          </div>

          {/* Sections */}
          {g.sections.map((s, i) => (
            <div key={i} style={{ marginBottom: '3.5rem' }}>
              <h2 style={{ ...disp, fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '1.4rem', paddingTop: '2rem', borderTop: '1px solid var(--bdr)' }}>
                {s.heading}
              </h2>
              {s.body.split('\n\n').map((para, j) => (
                <p key={j} style={{ ...body, fontSize: 'clamp(0.95rem,1.8vw,1.05rem)', color: 'var(--text)', lineHeight: 1.8, marginBottom: '1.3rem', fontWeight: 300 }}>
                  {para}
                </p>
              ))}
            </div>
          ))}

          {/* FAQ */}
          {g.faqs.length > 0 && (
            <div style={{ marginTop: '2rem', borderTop: '2px solid var(--bdr)', paddingTop: '2.5rem' }}>
              <div style={{ ...mono, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>[ Frequently Asked ]</div>
              {g.faqs.map(({ q, a }) => (
                <div key={q} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--bdr)' }}>
                  <h3 style={{ ...cond, fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.7rem' }}>{q}</h3>
                  <p style={{ ...body, fontSize: '0.97rem', color: 'var(--muted)', lineHeight: 1.75, fontWeight: 300 }}>{a}</p>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div style={{ marginTop: '3rem', padding: '2rem 2.5rem', background: 'var(--bg2)', border: '1px solid var(--bdr)', borderLeft: '4px solid var(--amber)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ ...mono, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Ready to Move Forward?</div>
              <p style={{ ...body, fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>
                Free quotes from vetted Portland contractors. 48-hour response guaranteed.
              </p>
            </div>
            <a href="/#quote" style={{ display: 'inline-block', background: 'var(--amber)', color: '#000', ...cond, fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.8rem 2rem', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
              Get Free Quotes →
            </a>
          </div>
        </article>
      </div>

      {/* Related guides */}
      {related.length > 0 && (
        <section className="section-pad" style={{ background: 'var(--bg2)' }}>
          <div style={{ ...mono, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>[ Related Guides ]</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1px', background: 'var(--bdr)' }}>
            {related.map(r => (
              <Link key={r.slug} href={`/guides/${r.slug}`} className="nbhd-card-hover" style={{ background: 'var(--bg)', padding: '1.8rem', textDecoration: 'none', display: 'block' }}>
                <div style={{ ...mono, fontSize: '0.62rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>{categoryLabels[r.category]}</div>
                <div style={{ ...cond, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.3, marginBottom: '0.5rem' }}>{r.title}</div>
                <div style={{ ...mono, fontSize: '0.65rem', color: 'var(--amber)', marginTop: '0.8rem' }}>Read Guide →</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}
