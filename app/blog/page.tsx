import type { Metadata } from 'next'
import Link   from 'next/link'
import Nav    from '@/components/Nav'
import Footer from '@/components/Footer'
import { posts, postCategoryLabels, postCategoryColors } from '@/lib/posts'
import { SITE } from '@/lib/config'

export const metadata: Metadata = {
  title:       `Portland Roofing Blog — Market Data, Storm Reports & Local Insight | ${SITE.name}`,
  description: 'The Portland Roofings blog. Real contractor quote data, neighborhood roofing demand reports, storm damage coverage, and market insight for Portland homeowners.',
  alternates:  { canonical: `${SITE.baseUrl}/blog` },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function BlogPage() {
  const [lead, ...rest] = posts.slice().sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())

  return (
    <>
      <Nav />

      {/* Breadcrumb */}
      <div style={{ padding: '0.8rem 2rem', borderBottom: '1px solid var(--bdr)', background: 'var(--bg2)' }}>
        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--muted)', display: 'flex', gap: '0.5rem' }}>
          <Link href="/" style={{ color: 'var(--amber)', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <span style={{ color: 'var(--text)' }}>Blog</span>
        </div>
      </div>

      {/* Header */}
      <div className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ Portland Roofings ]</div>
        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem,6vw,4rem)', lineHeight: 0.9, color: 'var(--text)', marginBottom: '1rem' }}>
          THE BLOG
        </h1>
        <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '1.05rem', color: 'var(--muted)', maxWidth: '520px', lineHeight: 1.7, fontWeight: 300 }}>
          Contractor quote data, neighborhood demand reports, storm coverage, and market intelligence. All Portland, all local.
        </p>
      </div>

      {/* Lead post */}
      {lead && (
        <section style={{ borderBottom: '1px solid var(--bdr)', background: 'var(--bg)' }}>
          <Link href={`/blog/${lead.slug}`} style={{ textDecoration: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="grid-hero" >
            {/* Left — big text */}
            <div style={{ padding: 'clamp(2rem,5vw,4rem) clamp(1.5rem,4vw,3rem)', borderRight: '1px solid var(--bdr)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'var(--bg2)', minHeight: '400px' }}>
              <div style={{ display: 'inline-block', fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.2rem 0.5rem', background: `${postCategoryColors[lead.category]}15`, color: postCategoryColors[lead.category], border: `1px solid ${postCategoryColors[lead.category]}33`, marginBottom: '1.2rem', width: 'fit-content' }}>
                {postCategoryLabels[lead.category]}
              </div>
              <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.8rem,4vw,3rem)', lineHeight: 0.95, color: 'var(--text)', marginBottom: '1rem' }}>{lead.title}</h2>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--bdr)' }}>
                <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--muted)' }}>{formatDate(lead.published)}</span>
                <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--muted)' }}>{lead.readTime} min read</span>
                <span style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '0.85rem', color: 'var(--amber)', letterSpacing: '0.06em', marginLeft: 'auto' }}>Read →</span>
              </div>
            </div>
            {/* Right — excerpt */}
            <div style={{ padding: 'clamp(2rem,5vw,4rem) clamp(1.5rem,4vw,3rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontFamily: 'var(--font-barlow)', fontSize: 'clamp(1rem,2vw,1.15rem)', color: 'var(--muted)', lineHeight: 1.75, fontWeight: 300 }}>{lead.excerpt}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
                {lead.tags.slice(0, 4).map(tag => (
                  <span key={tag} style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', padding: '0.2rem 0.5rem', background: 'var(--bg3)', color: 'var(--muted)', border: '1px solid var(--bdr)' }}>#{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Remaining posts */}
      {rest.length > 0 && (
        <section className="section-pad" style={{ background: 'var(--bg)' }}>
          <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2rem' }}>[ Recent Posts ]</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1px', background: 'var(--bdr)' }}>
            {rest.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="nbhd-card-hover" style={{ background: 'var(--bg2)', padding: '2rem', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'inline-block', fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.2rem 0.5rem', background: `${postCategoryColors[post.category]}15`, color: postCategoryColors[post.category], border: `1px solid ${postCategoryColors[post.category]}33`, width: 'fit-content' }}>
                  {postCategoryLabels[post.category]}
                </div>
                <h2 style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>{post.title}</h2>
                <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300, flex: 1 }}>{post.excerpt}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--bdr)' }}>
                  <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', color: 'var(--muted)' }}>{formatDate(post.published)} · {post.readTime} min</span>
                  <span style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '0.82rem', color: 'var(--amber)', letterSpacing: '0.06em' }}>Read →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}
