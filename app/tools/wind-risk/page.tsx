import type { Metadata } from 'next'
import Script from 'next/script'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import PageHero from '@/components/PageHero'
import WindRisk from '@/components/calculators/WindRisk'
import { SITE } from '@/lib/config'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'

const PAGE_URL = `${SITE.baseUrl}/tools/wind-risk`

export const metadata: Metadata = {
  title: `Portland Wind Damage Risk Score — Material Spec by Address | ${SITE.name}`,
  description: 'Free Portland wind damage risk score calculator. 1-5 wind exposure rating for your address based on Gorge corridor proximity, ridge-line exposure, and historical major-event data. Recommends material wind rating spec.',
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Portland Wind Damage Risk Score', description: 'Wind exposure rating + material spec recommendation for any Portland metro address.', url: PAGE_URL, type: 'website' },
}

const faqs = [
  { question: 'How is the wind risk score calculated?', answer: 'The score (1-5) reflects three factors per neighborhood: Columbia River Gorge corridor proximity (Gresham/Troutdale terminus = highest), ridge-line / hilltop exposure (West Hills = direct hits from all directions), and historical major-event damage data (post-2020 Labor Day, 2021 ice storm, 2024 ice/wind event). Score 1-2 = standard 90 mph spec adequate; 3-4 = upgrade to 110 mph; 5 = concealed-fastener metal recommended.' },
  { question: 'Why is West Hills rated 5/5 (Maximum)?', answer: 'Hilltop and ridge exposure to all wind directions, sustained 30-50 mph during major events with 70+ mph gusts, plus steep-pitch hillside lots that complicate emergency tarp deployment. Concealed-fastener standing seam metal is the practical West Hills standard because exposed-fastener systems and standard asphalt fail at the wind ratings this corridor regularly produces.' },
  { question: 'Why is Gresham not in the kept-set but flagged for high wind exposure?', answer: 'Gresham was absorbed under Hawthorne in our 10-market kept-set (East Multnomah catchment). For wind exposure purposes, eastern Hawthorne addresses near Mt Tabor or beyond SE 50th carry similar exposure to Gresham proper. The wind risk calculator routes Gresham ZIPs (97030, 97080) to Hawthorne but the recommended spec includes the East Wind corridor upgrade.' },
  { question: 'Does the recommended spec apply to my specific home?', answer: 'It\'s a baseline. The recommendation reflects typical homes in your wind exposure category. Specific factors that may modify it: orientation of your home relative to prevailing winds (a south-facing slope sheltered from north-east winds may not need the full upgrade), tree canopy buffer, building height, and current shingle wind rating. A CCB-licensed contractor familiar with your area can refine the spec recommendation.' },
  { question: 'Should I check live wind conditions before calling a contractor?', answer: 'Yes — our storm tracker page (linked at the bottom of every wind risk result) shows current Portland wind conditions and 24-hour gust forecast from Open-Meteo, plus active NWS alerts. If a high wind warning is active, no contractor should be doing rooftop work; rescheduling is the right call. Use the wind risk score for material spec decisions and the storm tracker for scheduling decisions.' },
]

export default function WindRiskPage() {
  return (
    <>
      <Script id="s1" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema([
        { name: 'Home', url: SITE.baseUrl },
        { name: 'Tools', url: `${SITE.baseUrl}/tools` },
        { name: 'Wind Risk', url: PAGE_URL },
      ]))}</Script>
      <Script id="s2" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(faqSchema(faqs))}</Script>

      <Nav />
      <PageHero
        imageUrl="/images/hero-guide-storm.jpeg"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }, { label: 'Wind Risk' }]}
        eyebrow="Tool 04 · Free"
        title={<>WIND DAMAGE<br /><span style={{ color: '#F5A623' }}>RISK SCORE</span></>}
        subtitle="1-5 wind exposure rating for your Portland address based on Gorge corridor proximity, ridge-line exposure, and historical major-event data. Includes recommended material wind rating spec for new installations."
      />

      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap">
          <WindRisk />
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap">
          <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>[ FAQ ]</div>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '2rem' }}>WIND RISK QUESTIONS</h2>
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
