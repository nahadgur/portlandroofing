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
    '@context':       'https://schema.org',
    '@type':          'Article',
    headline:         g.title,
    description:      g.description,
    datePublished:    g.published,
    dateModified:     g.published,
    author:           { '@type': 'Organization', name: SITE.name, url: SITE.baseUrl },
    publisher:        { '@type': 'Organization', name: SITE.name, url: SITE.baseUrl },
    url:              `${SITE.baseUrl}/guides/${g.slug}`,
  }

  return (
    <>
      <Script id="schema-article"    type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(articleSchema)}</Script>
      <Script id="schema-breadcrumb" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema([
        { name: 'Home',   url: SITE.baseUrl },
        { name: 'Guides', url: `${SITE.baseUrl}/guides` },
        { name: g.headline, url: `${SITE.baseUrl}/guides/${g.slug}` },
      ]))}</Script>
      <Script id="schema-faq"        type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(faqSchema(g.faqs))}</Script>

      <Nav />

      {/* Breadcrumb */}
      <div style={{ padding: '0.8rem 2rem', borderBottom: '1px solid var(--bdr)', background: 'var(--bg2)' }}>
        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--muted)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'var(--amber)', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link href="/guides" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Guides</Link>
          <span>›</span>
          <span style={{ color: 'var(--text)' }}>{g.headline}</span>
        </div>
      </div>

      {/* Article hero */}
      <div className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div style={{ maxWidth: '780px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.2rem 0.6rem', background: 'rgba(245,166,35,0.08)', color: 'var(--amber)', border: '1px solid rgba(245,166,35,0.2)' }}>
              {categoryLabels[g.category]}
            </span>
            <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--muted)' }}>
              {g.readTime} min read · Updated {new Date(g.published).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 0.95, color: 'var(--text)', marginBottom: '1.2rem' }}>
            {g.title}
          </h1>
          <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '1.1rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>
            {g.description}
          </p>
        </div>
      </div>

      {/* Article body */}
      <div style={{ padding: '0', display: 'grid', gridTemplateColumns: '1fr', background: 'var(--bg)' }}>
        <article style={{ maxWidth: '780px', padding: 'clamp(2rem,5vw,4rem) clamp(1.5rem,4vw,3rem)', borderRight: '1px solid var(--bdr)' }}>

          {/* Table of contents */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--bdr)', padding: '1.5rem', marginBottom: '3rem' }}>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>In This Guide</div>
            <ol style={{ listStyle: 'none', counterReset: 'toc' }}>
              {g.sections.map((s, i) => (
                <li key={i} style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.9rem', color: 'var(--muted)', padding: '0.3rem 0', borderBottom: i < g.sections.length - 1 ? '1px solid var(--bdr)' : 'none', display: 'flex', gap: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.7rem', color: 'var(--amber)', flexShrink: 0, marginTop: '0.15rem' }}>{String(i + 1).padStart(2, '0')}</span>
                  {s.heading}
                </li>
              ))}
            </ol>
          </div>

          {/* Sections */}
          {g.sections.map((s, i) => (
            <div key={i} style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '1.2rem', borderTop: '1px solid var(--bdr)', paddingTop: '2rem' }}>
                {s.heading}
              </h2>
              {s.body.split('\n\n').map((para, j) => (
                <p key={j} style={{ fontFamily: 'var(--font-barlow)', fontSize: '1rem', color: 'var(--text)', lineHeight: 1.75, marginBottom: '1.2rem', fontWeight: 300 }}>
                  {para}
                </p>
              ))}
            </div>
          ))}

          {/* FAQ */}
          {g.faqs.length > 0 && (
            <div style={{ marginTop: '2rem', borderTop: '1px solid var(--bdr)', paddingTop: '2.5rem' }}>
              <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>[ Frequently Asked ]</div>
              {g.faqs.map(({ q, a }) => (
                <div key={q} style={{ marginBottom: '1.8rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.6rem' }}>{q}</h3>
                  <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>{a}</p>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--bg2)', border: '1px solid var(--bdr)', borderLeft: '4px solid var(--amber)' }}>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Ready to Move Forward?</div>
            <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300, marginBottom: '1.2rem' }}>
              Get matched with vetted Portland contractors in your zip code. Free quotes within 48 hours.
            </p>
            <a href="/#quote" style={{ display: 'inline-block', background: 'var(--amber)', color: '#000', fontFamily: 'var(--font-barlow-cond)', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.75rem 1.8rem', textDecoration: 'none' }}>
              Get Free Quotes →
            </a>
          </div>
        </article>
      </div>

      {/* Related guides */}
      {related.length > 0 && (
        <section className="section-pad" style={{ background: 'var(--bg2)' }}>
          <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>[ Related Guides ]</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1px', background: 'var(--bdr)' }}>
            {related.map(r => (
              <Link key={r.slug} href={`/guides/${r.slug}`} className="nbhd-card-hover" style={{ background: 'var(--bg)', padding: '1.8rem', textDecoration: 'none', display: 'block' }}>
                <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>{categoryLabels[r.category]}</div>
                <div style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>{r.title}</div>
                <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--amber)', marginTop: '0.8rem' }}>Read Guide →</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}
