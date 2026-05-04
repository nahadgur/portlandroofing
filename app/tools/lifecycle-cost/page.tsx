import type { Metadata } from 'next'
import Script from 'next/script'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import PageHero from '@/components/PageHero'
import LifecycleCost from '@/components/calculators/LifecycleCost'
import { SITE } from '@/lib/config'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'

const PAGE_URL = `${SITE.baseUrl}/tools/lifecycle-cost`

export const metadata: Metadata = {
  title: `Portland Roof Material Lifecycle Cost — Asphalt vs Metal vs Cedar | ${SITE.name}`,
  description: 'Free Portland roof lifecycle cost calculator. Compare 25/50-year ownership cost for architectural asphalt, standing seam metal, and cedar shake including maintenance, moss treatment, and replacement cycles. Resolves the metal vs asphalt question with math.',
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Portland Roof Material Lifecycle Cost', description: '25/50-year ownership cost comparison for asphalt vs metal vs cedar in Portland\'s climate.', url: PAGE_URL, type: 'website' },
}

const faqs = [
  { question: 'Why does Portland\'s climate compress asphalt life so much?', answer: 'Manufacturer warranties (25-30 years for architectural asphalt) assume average national conditions. Portland\'s 144 rain days plus dense tree canopy in many neighborhoods compress real-world life to 22-28 years, less without moss treatment. The lifecycle cost calculator uses 25 years as the asphalt baseline — actual life depends heavily on canopy density and moss management discipline.' },
  { question: 'Is the metal premium really worth it for a typical Portland home?', answer: 'For homeowners staying 15+ years, almost always yes. The breakeven year (when metal\'s total ownership cost falls below asphalt) is typically 18-22 years for canopied PDX neighborhoods. After breakeven, metal continues saving money each year. For homeowners selling within 7-10 years, asphalt is the more rational call — metal recovers maybe 50-70% of premium in resale value, not the full lifecycle savings.' },
  { question: 'Why is cedar so expensive over the long term?', answer: 'Cedar combines high install cost ($13/sf) with demanding ongoing maintenance: biennial moss treatment ($300-$700/cycle in canopied PDX), fire retardant renewal every 8-10 years ($1,500), and shorter expected life than metal. The lifecycle cost calculator shows cedar typically as the highest 50-year cost. Cedar is justified only when historic district design review mandates it (Eastmoreland, Lake Oswego sub-associations) — not on cost.' },
  { question: 'Does the calculator account for the April 2026 manufacturer price increases?', answer: 'Yes for initial install. The Q2 2026 baseline pricing includes the GAF/CertainTeed/Atlas/TAMKO 5-8% increases. Replacement cost projections assume 50% inflation per cycle (compound), which is conservative — actual roofing inflation has averaged 4-7% annually over the last decade.' },
  { question: 'How does the calculator account for neighborhood variation?', answer: 'Each neighborhood has a cost index multiplier based on PDX baseline (Hawthorne = 71% of state, baseline). West Hills (92% index) projects higher; St. Johns (63% index) lower. The neighborhood selector applies that multiplier to all costs. Maintenance costs are constant across kept neighborhoods because canopy density and moss pressure are roughly equivalent in canopied PDX areas; the major exceptions are St. Johns and Beaverton which see 30% lower asphalt maintenance.' },
]

export default function LifecycleCostPage() {
  return (
    <>
      <Script id="s1" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema([
        { name: 'Home', url: SITE.baseUrl },
        { name: 'Tools', url: `${SITE.baseUrl}/tools` },
        { name: 'Lifecycle Cost', url: PAGE_URL },
      ]))}</Script>
      <Script id="s2" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(faqSchema(faqs))}</Script>

      <Nav />
      <PageHero
        imageUrl="/images/hero-services-hub.jpeg"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }, { label: 'Lifecycle Cost' }]}
        eyebrow="Tool 03 · Free"
        title={<>MATERIAL LIFECYCLE<br /><span style={{ color: '#F5A623' }}>COST COMPARISON</span></>}
        subtitle="Compare 25/50-year ownership cost for asphalt vs metal vs cedar in Portland's specific climate. Includes maintenance cycles, moss treatment, fire retardant renewal, and end-of-life replacement. Shows the metal vs asphalt breakeven year for your inputs."
      />

      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap">
          <LifecycleCost />
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap">
          <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>[ FAQ ]</div>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '2rem' }}>LIFECYCLE COST QUESTIONS</h2>
          {faqs.map((faq) => (
            <div key={faq.question} style={{ borderTop: '1px solid var(--bdr)', padding: '1.4rem 0' }}>
              <h3 style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>{faq.question}</h3>
              <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
