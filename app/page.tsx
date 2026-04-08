import type { Metadata } from 'next'
import Script from 'next/script'
import Link   from 'next/link'
import Nav              from '@/components/Nav'
import Ticker           from '@/components/Ticker'
import Hero             from '@/components/Hero'
import LeadForm         from '@/components/LeadForm'
import DataBar          from '@/components/DataBar'
import NeighborhoodGrid from '@/components/NeighborhoodGrid'
import PriceIndex       from '@/components/PriceIndex'
import ComparisonEngine from '@/components/ComparisonEngine'
import Footer           from '@/components/Footer'
import { SITE }         from '@/lib/config'
import { localBusinessSchema, faqSchema } from '@/lib/schema'
import { guides }       from '@/lib/guides'
import { posts, postCategoryLabels, postCategoryColors } from '@/lib/posts'
import { services }     from '@/lib/services'
import { categoryLabels } from '@/lib/guides'

export const metadata: Metadata = {
  title:       SITE.defaultTitle,
  description: SITE.defaultDescription,
  alternates:  { canonical: SITE.baseUrl },
}

const faqs = [
  {
    q: 'How much does a new roof cost in Portland, Oregon?',
    a: 'The average roof replacement in Portland costs $9,400, ranging from $6,500 for basic asphalt shingle to $24,000+ for standing-seam metal on larger homes. Costs vary significantly by neighborhood — West Hills and Lake Oswego average $12,000–$13,000+ while North Portland averages $7,500–$8,000.',
  },
  {
    q: "What roofing materials are best for Portland's rainy climate?",
    a: "For Portland's 144+ annual rain days, architectural asphalt shingles (30-year rated), standing-seam metal, and Class 4 impact-resistant shingles all perform well. Metal roofing offers the best long-term ROI for most Portland homeowners who plan to stay 15+ years.",
  },
  {
    q: 'Do I need a permit to replace my roof in Portland?',
    a: "Yes. Portland's Bureau of Development Services requires a permit for full replacements. Historic districts (Ladd's Addition, Irvington, Alameda) have additional review requirements. Check our neighborhood pages for your specific area's permit difficulty score (1–5).",
  },
  {
    q: 'How do I vet a roofing contractor in Oregon?',
    a: 'All Oregon roofing contractors must hold a valid CCB licence. Verify at oregon.gov/ccb, confirm they carry at least $1M general liability insurance, and check reviews on Google and the BBB. Our platform runs all 47 checks before any contractor is listed.',
  },
  {
    q: 'How long does a roof replacement take in Portland?',
    a: "A standard residential roof replacement in Portland takes 1–3 days for the actual installation work. The bigger variable is lead time — in peak season (April through September), vetted Portland contractors book out 4–8 weeks. Add permit approval time on top: 1–2 weeks for standard zones, 4–6 weeks in historic districts. If your roof needs replacing, start the quote process before you need it urgently.",
  },
  {
    q: 'What is the best time of year to replace a roof in Portland?',
    a: "Late summer through early fall — August through October — is the optimal window for Portland roof replacements. Rain is minimal, temperatures are stable for proper asphalt adhesion, and daylight hours allow full working days. Spring (April–May) is the second-best option. Avoid scheduling full replacements in November through February unless there's an emergency — wet conditions slow installation and can affect material performance.",
  },
]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function HomePage() {
  const featuredGuides = guides.filter(g => g.featured).slice(0, 3)
  const featuredPosts  = posts
    .slice()
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
    .slice(0, 3)

  return (
    <>
      <Script id="schema-lb"  type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(localBusinessSchema())}</Script>
      <Script id="schema-faq" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(faqSchema(faqs))}</Script>

      <Nav />
      <Ticker />

      <section id="quote" className="grid-hero">
        <Hero />
        <LeadForm />
      </section>

      <DataBar />

      {/* Services strip */}
      <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--bdr)', padding: '1.5rem 3rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: '0.5rem', flexShrink: 0 }}>Services:</span>
        {services.map(s => (
          <Link key={s.slug} href={`/services#${s.slug}`} style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '0.82rem', letterSpacing: '0.04em', color: 'var(--amber)', padding: '0.35rem 0.85rem', border: '1px solid var(--bdr)', textDecoration: 'none', background: 'var(--bg)', whiteSpace: 'nowrap' }}>
            {s.shortName}
          </Link>
        ))}
        <Link href="/services" style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '0.82rem', color: 'var(--muted)', padding: '0.35rem 0.85rem', border: '1px solid var(--bdr)', textDecoration: 'none', background: 'var(--bg)', whiteSpace: 'nowrap' }}>
          All Services →
        </Link>
      </div>

      <NeighborhoodGrid />
      <PriceIndex />

      {/* Comparison Engine */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ Material Intelligence ]</div>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem,4vw,3.2rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.5rem' }}>METAL VS ASPHALT</h2>
        <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '1rem', color: 'var(--muted)', maxWidth: '520px', fontWeight: 300, marginBottom: '2.5rem' }}>
          Portland gets 144 rain days a year. Toggle between materials to see how that changes the real numbers.
        </p>
        <ComparisonEngine />
      </section>

      {/* Guides teaser */}
      <section className="section-pad" style={{ background: 'var(--bg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>[ Guides ]</div>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: 'var(--text)', lineHeight: 1 }}>PORTLAND ROOFING GUIDES</h2>
          </div>
          <Link href="/guides" style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '0.85rem', color: 'var(--amber)', textDecoration: 'none', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>All Guides →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1px', background: 'var(--bdr)' }}>
          {featuredGuides.map(g => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="nbhd-card-hover" style={{ background: 'var(--bg2)', padding: '1.8rem', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--amber)' }}>{categoryLabels[g.category]}</div>
              <div style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.25 }}>{g.title}</div>
              <div style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, flex: 1, fontWeight: 300 }}>{g.description.slice(0, 100)}…</div>
              <div style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '0.82rem', color: 'var(--amber)', letterSpacing: '0.04em' }}>{g.readTime} min read →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Blog teaser */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>[ Latest ]</div>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: 'var(--text)', lineHeight: 1 }}>FROM THE BLOG</h2>
          </div>
          <Link href="/blog" style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '0.85rem', color: 'var(--amber)', textDecoration: 'none', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>All Posts →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1px', background: 'var(--bdr)' }}>
          {featuredPosts.map(p => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="nbhd-card-hover" style={{ background: 'var(--bg)', padding: '1.8rem', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <div style={{ display: 'inline-block', fontFamily: 'var(--font-space-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.15rem 0.45rem', background: `${postCategoryColors[p.category]}15`, color: postCategoryColors[p.category], border: `1px solid ${postCategoryColors[p.category]}33`, width: 'fit-content' }}>
                {postCategoryLabels[p.category]}
              </div>
              <div style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.25 }}>{p.title}</div>
              <div style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, flex: 1, fontWeight: 300 }}>{p.excerpt.slice(0, 100)}…</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.6rem', color: 'var(--muted)' }}>{formatDate(p.published)}</span>
                <span style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '0.82rem', color: 'var(--amber)', letterSpacing: '0.04em' }}>Read →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ — 6 questions */}
      <section id="guides" className="section-pad" style={{ background: 'var(--bg)' }}>
        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ Common Questions ]</div>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem,3.5vw,3rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '3rem' }}>PORTLAND ROOFING FAQ</h2>
        <div className="grid-faq">
          {faqs.map(({ q, a }) => (
            <div key={q} style={{ borderTop: '1px solid var(--bdr)', paddingTop: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.8rem' }}>{q}</h3>
              <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contractor CTA strip */}
      <div style={{ background: 'var(--bg2)', borderTop: '1px solid var(--bdr)', borderBottom: '1px solid var(--bdr)', padding: '2rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.4rem', color: 'var(--text)', lineHeight: 1 }}>ARE YOU A PORTLAND ROOFING CONTRACTOR?</div>
          <div style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.88rem', color: 'var(--muted)', marginTop: '0.3rem' }}>We're vetting contractors across the metro. 47-point process. Top 1% only.</div>
        </div>
        <Link href="/contractors/apply" style={{ background: 'transparent', border: '1px solid var(--amber)', color: 'var(--amber)', fontFamily: 'var(--font-barlow-cond)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.75rem 1.8rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Apply to Join →
        </Link>
      </div>

      <Footer />
    </>
  )
}
