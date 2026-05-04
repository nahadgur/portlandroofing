import type { Metadata } from 'next'
import Script from 'next/script'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import PageHero from '@/components/PageHero'
import CostCalculatorDeep from '@/components/calculators/CostCalculatorDeep'
import { SITE } from '@/lib/config'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'

const PAGE_URL = `${SITE.baseUrl}/tools/cost-calculator`

export const metadata: Metadata = {
  title: `Portland Roof Cost Calculator — Local Cost Drivers & Line-Item Breakdown | ${SITE.name}`,
  description: 'Free Portland roof replacement cost calculator. Input ZIP + sq ft + material + pitch + age. Output: estimate range with line-item breakdown including deck repair allowance, ventilation upgrade, permit fees, and historic district design review.',
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Portland Roof Cost Calculator', description: 'Bespoke Portland roof cost estimator with line-item breakdown and neighborhood-specific cost drivers.', url: PAGE_URL, type: 'website' },
}

const faqs = [
  { question: 'How accurate is this Portland roof cost calculator?', answer: 'More accurate than national calculators because it routes your ZIP to the closest of 10 PDX cost markets and applies that market\'s specific cost drivers. Pre-1925 Hawthorne Craftsmans automatically include skip-sheathed deck overlay; West Hills addresses include steep-pitch labour premium and crane staging; historic district properties include design review fees. Range reflects typical 20% contractor variance on identical scope.' },
  { question: 'Why does the calculator add a deck repair allowance based on roof age?', answer: 'Pre-1970 Portland homes frequently have skip-sheathed decks (1×4 boards with gaps) that require full plywood overlay before modern shingles can be installed. 1980s-1990s homes have CDX plywood that delaminates under sustained moss in canopied neighborhoods. The age-based allowance reflects what a reputable Portland contractor would build into a quote pre-bid; ones that don\'t are setting up a change order.' },
  { question: 'Why does my West Hills quote include crane staging?', answer: 'Steep hillside lots in Council Crest, Forest Park, and West Hills frequently have driveway access on one side only, with upper-roof areas inaccessible from ground-level material staging. Crane day adds $1,400-$3,500 but is meaningfully cheaper than manually carrying material up steep slopes — and OSHA fall-protection requirements make manual staging legally questionable on 10:12+ pitches.' },
  { question: 'How is the historic district design review fee calculated?', answer: 'Properties in Pearl District (Central City review), Eastmoreland Historic District, Irvington Historic District, Ladd\'s Addition, or on Portland\'s Historic Resource Inventory require Type II Historic Resource Review before BDS issues a roofing permit. Review fees run $400-$700 depending on jurisdiction; the timeline adds 4-6 weeks for cedar in kind, 6-9 weeks for material substitution.' },
  { question: 'Can I trust the estimate range from this calculator?', answer: 'For typical scope on a kept-market property, yes — within ~20%. For unusual situations (major structural retrofit, flat-to-pitched conversion, premium custom materials), get actual contractor quotes. The calculator does not know about: existing structural deficiencies, asbestos remediation requirements on pre-1980 homes, HOA-mandated material restrictions, or solar panel removal/reinstall costs.' },
]

export default function CostCalculatorPage() {
  return (
    <>
      <Script id="s1" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema([
        { name: 'Home', url: SITE.baseUrl },
        { name: 'Tools', url: `${SITE.baseUrl}/tools` },
        { name: 'Cost Calculator', url: PAGE_URL },
      ]))}</Script>
      <Script id="s2" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(faqSchema(faqs))}</Script>

      <Nav />
      <PageHero
        imageUrl="/images/hero-services-hub.jpeg"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }, { label: 'Cost Calculator' }]}
        eyebrow="Tool 01 · Free"
        title={<>ROOF COST<br /><span style={{ color: '#F5A623' }}>CALCULATOR</span></>}
        subtitle="Estimate your Portland roof replacement cost with line-item breakdown. ZIP routing detects the closest cost market and applies neighborhood-specific drivers — deck repair allowance, ventilation upgrade, permit fee, design review where applicable."
      />

      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap">
          <CostCalculatorDeep />
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap">
          <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>[ FAQ ]</div>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '2rem' }}>COST CALCULATOR QUESTIONS</h2>
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
