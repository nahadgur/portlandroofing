import type { Metadata } from 'next'
import Script from 'next/script'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import PageHero from '@/components/PageHero'
import RoiCalculator from '@/components/calculators/RoiCalculator'
import { SITE } from '@/lib/config'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'

const PAGE_URL = `${SITE.baseUrl}/tools/roi`

export const metadata: Metadata = {
  title: `Portland Roof ROI Calculator — Replace Before Selling? | ${SITE.name}`,
  description: 'Free Portland roof replacement ROI calculator. Should you replace before selling? Estimates resale recovery using PDX-specific recovery percentages and accounts for buyer-inspection contingency dynamics.',
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Portland Roof Replacement ROI Calculator', description: 'Replace-before-selling decision tool with PDX-specific resale recovery percentages.', url: PAGE_URL, type: 'website' },
}

const faqs = [
  { question: 'Why are Portland recovery percentages higher than national averages?', answer: 'National Association of Realtors cost-vs-value reports show 60% national average recovery on roof replacement; Portland metro typically lands 58-72% depending on neighborhood and material. The premium is partly Portland\'s home-value appreciation, partly the high incidence of roof contingencies in PDX transactions (23% of deals include them, vs 14% national average) — buyers will negotiate hard on aging roofs, so replacement before listing genuinely preserves sale value.' },
  { question: 'Why does the calculator recommend replacing for roofs only 60% through their life?', answer: 'It doesn\'t — for a typical hold scenario. The recommendation depends on years to sale plus current age. A 15-year-old roof with a 2-year sale horizon has 17 years total at sale (about 70% of life). The calculator typically says "keep it" in this scenario. The "replace before listing" recommendation triggers when ageAtSale exceeds about 80% of expected life, where buyer inspection contingencies become high-probability.' },
  { question: 'What does "23% of PDX deals include roofing contingencies" actually mean?', answer: 'About one in four Portland real estate transactions has a buyer\'s inspection contingency that flags the roof, requiring either seller credit, replacement before close, or contingency negotiation that delays/kills the deal. Portland\'s aging housing stock plus aggressive buyer-inspector culture makes this materially more common than national average. Past-end-of-life roofs effectively guarantee contingency triggers — replacement removes the risk entirely.' },
  { question: 'How does the calculator estimate replacement cost?', answer: 'Roughly, based on home value as a proxy for square footage. For more accurate estimates, use our Roof Cost Calculator which takes actual sq ft + material + pitch + age. The ROI calculator uses approximate cost to keep the input simple — the recommendation logic is robust to ±20% cost variance.' },
  { question: 'Should I get metal instead of asphalt before selling?', answer: 'Generally no, unless your home is in a market where metal is heavily favored (West Hills, Lake Oswego high-end). Metal recovers a lower percentage of premium in resale than the recovery calculation assumes — buyers pay for the new roof, not the metal premium specifically. For quick-sale scenarios (1-3 years), architectural asphalt at premium tier (CertainTeed Landmark Pro, GAF Timberline UHDZ) usually delivers better dollar-recovery than metal upgrade.' },
]

export default function RoiPage() {
  return (
    <>
      <Script id="s1" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema([
        { name: 'Home', url: SITE.baseUrl },
        { name: 'Tools', url: `${SITE.baseUrl}/tools` },
        { name: 'ROI Calculator', url: PAGE_URL },
      ]))}</Script>
      <Script id="s2" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(faqSchema(faqs))}</Script>

      <Nav />
      <PageHero
        imageUrl="/images/hero-services-hub.jpeg"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }, { label: 'ROI Calculator' }]}
        eyebrow="Tool 05 · Free"
        title={<>ROI / RESALE<br /><span style={{ color: '#F5A623' }}>CALCULATOR</span></>}
        subtitle="Should you replace before selling? Estimates resale recovery using PDX-specific recovery percentages (58-72% Portland average) and accounts for buyer-inspection contingency dynamics that hit Portland harder than most markets."
      />

      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap">
          <RoiCalculator />
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap">
          <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>[ FAQ ]</div>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '2rem' }}>ROI CALCULATOR QUESTIONS</h2>
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
