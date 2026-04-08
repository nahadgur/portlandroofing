import type { Metadata } from 'next'
import Link   from 'next/link'
import Nav    from '@/components/Nav'
import Footer from '@/components/Footer'
import { guides, categoryLabels } from '@/lib/guides'
import { SITE } from '@/lib/config'

export const metadata: Metadata = {
  title:       `Portland Roofing Guides & Resources 2026 | ${SITE.name}`,
  description: 'Expert roofing guides for Portland homeowners. Material comparisons, permit walkthroughs by neighborhood, storm damage checklists, and cost breakdowns — all based on local data.',
  alternates:  { canonical: `${SITE.baseUrl}/guides` },
}

const categoryColors: Record<string, string> = {
  material:  'var(--amber)',
  permits:   'var(--green)',
  emergency: 'var(--red)',
  cost:      'var(--amber)',
  historic:  '#C8A96E',
}

export default function GuidesPage() {
  const featured = guides.filter(g => g.featured)
  const rest     = guides.filter(g => !g.featured)

  return (
    <>
      <Nav />

      {/* Breadcrumb */}
      <div style={{ padding: '0.8rem 2rem', borderBottom: '1px solid var(--bdr)', background: 'var(--bg2)' }}>
        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--muted)', display: 'flex', gap: '0.5rem' }}>
          <Link href="/" style={{ color: 'var(--amber)', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <span style={{ color: 'var(--text)' }}>Guides</span>
        </div>
      </div>

      {/* Header */}
      <div className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ Portland Roofing Intelligence ]</div>
        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem,6vw,4rem)', lineHeight: 0.9, color: 'var(--text)', marginBottom: '1rem' }}>
          ROOFING GUIDES<br /><span style={{ color: 'var(--amber)' }}>& RESOURCES</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '1.05rem', color: 'var(--muted)', maxWidth: '560px', lineHeight: 1.7, fontWeight: 300 }}>
          Everything a Portland homeowner needs to make an informed roofing decision — material comparisons, permit walkthroughs by neighbourhood, storm damage checklists, and cost data. No fluff.
        </p>
      </div>

      {/* Featured guides */}
      <section className="section-pad" style={{ background: 'var(--bg)' }}>
        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2rem' }}>[ Featured ]</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1px', background: 'var(--bdr)' }}>
          {featured.map(g => (
            <Link key={g.slug} href={`/guides/${g.slug}`} style={{ background: 'var(--bg2)', padding: '2rem', textDecoration: 'none', display: 'block', borderBottom: '3px solid transparent', transition: 'border-color 0.2s' }}
              className="nbhd-card-hover">
              {/* Category tag */}
              <div style={{ display: 'inline-block', fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.2rem 0.5rem', background: 'rgba(245,166,35,0.08)', color: categoryColors[g.category] ?? 'var(--amber)', border: `1px solid ${categoryColors[g.category] ?? 'var(--amber)'}22`, marginBottom: '1rem' }}>
                {categoryLabels[g.category]}
              </div>
              <h2 style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.25, marginBottom: '0.8rem' }}>{g.title}</h2>
              <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1.2rem', fontWeight: 300 }}>{g.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--muted)' }}>{g.readTime} min read · {new Date(g.published).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                <span style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '0.82rem', color: 'var(--amber)', letterSpacing: '0.06em' }}>Read Guide →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All other guides — will grow as you add more */}
      {rest.length > 0 && (
        <section className="section-pad" style={{ background: 'var(--bg2)' }}>
          <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2rem' }}>[ All Guides ]</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
            {rest.map(g => (
              <Link key={g.slug} href={`/guides/${g.slug}`} style={{ background: 'var(--bg)', padding: '1.4rem 1.8rem', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.6rem', color: categoryColors[g.category] ?? 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{categoryLabels[g.category]}</div>
                  <div style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>{g.title}</div>
                </div>
                <span style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '0.82rem', color: 'var(--amber)', flexShrink: 0 }}>Read →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}
