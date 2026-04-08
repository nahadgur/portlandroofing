import type { Metadata } from 'next'
import Script from 'next/script'
import Link   from 'next/link'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { SITE } from '@/lib/config'
import { breadcrumbSchema, faqSchema, articleSchema } from '@/lib/schema'
import ModalTriggerBtn from '@/components/ModalTriggerBtn'

const PAGE_URL = `${SITE.baseUrl}/guides/roof-replacement-roi-portland`

export const metadata: Metadata = {
  title: `Roof Replacement ROI in Portland — Does a New Roof Increase Home Value? | ${SITE.name}`,
  description: 'Portland-specific data on roof replacement return on investment by neighborhood tier, material type, and inspection contingency impact. Honest assessment of when the ROI argument holds — and when it doesn\'t.',
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Roof Replacement ROI in Portland', description: 'Neighborhood-tier ROI data, material comparisons, and the inspection contingency angle.', url: PAGE_URL, type: 'article' },
}

const roiByTier = [
  { tier: 'Premium', neighborhoods: 'West Hills, Lake Oswego, Irvington', range: '68–74%', note: 'Buyers in this tier expect turnkey condition. A visibly aging roof triggers disproportionate price negotiation.' },
  { tier: 'Inner SE / NE Core', neighborhoods: 'Hawthorne, Alberta, Division, Sellwood', range: '58–65%', note: 'Competitive market with informed buyers. New roof removes the most common inspection objection.' },
  { tier: 'Outer Suburbs', neighborhoods: 'Gresham, Milwaukie, Tigard, Beaverton', range: '52–60%', note: 'Price-sensitive buyers. ROI is lower but still net-positive vs. the alternative of a price reduction at closing.' },
]

const materialRoi = [
  { material: 'Architectural Asphalt (30-yr)', cost: '$12,000–$18,000', roi: '60–68%', note: 'Best ROI ceiling. Familiar to appraisers, no buyer objections.' },
  { material: 'Standing Seam Metal', cost: '$22,000–$35,000', roi: '55–62%', note: 'Higher cost compresses ROI %, but absolute dollar recovery is strong in premium neighborhoods.' },
  { material: '3-Tab Asphalt', cost: '$8,000–$12,000', roi: '50–58%', note: 'Lowest cost but perceived as builder-grade. Appraisers rarely assign premium.' },
  { material: 'Cedar Shake', cost: '$25,000–$40,000', roi: '45–55%', note: 'Niche appeal. High maintenance perception limits buyer pool despite aesthetic value.' },
  { material: 'Composite / Synthetic', cost: '$18,000–$28,000', roi: '52–60%', note: 'Growing acceptance but still unfamiliar to many Portland appraisers.' },
]

const faqs = [
  { q: 'Does a new roof increase home value in Portland?', a: 'On average, yes. Portland homeowners recover 52–74% of roof replacement costs at resale, depending on neighborhood tier and material choice. Premium neighborhoods like West Hills and Lake Oswego see the highest returns because buyers in those markets expect move-in-ready condition.' },
  { q: 'What is the average ROI for a roof replacement in Oregon?', a: 'National averages hover around 60%. Portland tracks slightly higher at 58–68% for architectural asphalt in competitive neighborhoods, driven by the inspection-contingency dynamic in our market — 23% of Portland transactions include a roofing contingency.' },
  { q: 'Should I replace my roof before selling my house in Portland?', a: 'If your roof is within 5 years of end-of-life and you are selling in a competitive neighborhood, the math usually works. The key factor: buyer price reductions for roofing issues typically run 1.5–2x the actual repair cost, so replacing proactively often nets better than the raw ROI suggests.' },
  { q: 'Which roofing material has the best ROI?', a: 'Architectural asphalt shingles (30-year rated) consistently deliver the highest ROI percentage in Portland — 60–68%. Standing seam metal recovers more absolute dollars in premium markets but the higher upfront cost compresses the percentage return.' },
  { q: 'When does a roof replacement NOT make financial sense before selling?', a: 'When the roof has 10+ years of functional life remaining, when you are in a buyer\'s market with low competition, when the neighborhood price ceiling limits recovery, or when you are selling as-is to investors who will discount regardless.' },
]

export default function RoofReplacementRoiPage() {
  const f = { fontFamily: 'var(--font-barlow)' } as const
  const m = { fontFamily: 'var(--font-space-mono)' } as const
  const c = { fontFamily: 'var(--font-barlow-cond)' } as const
  const d = { fontFamily: 'var(--font-bebas)' } as const

  return (
    <>
      <Script id="s1" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(articleSchema({ headline: 'Roof Replacement ROI in Portland — Does a New Roof Increase Home Value?', description: metadata.description as string, url: `${SITE.baseUrl}/guides/roof-replacement-roi-portland`, datePublished: '2026-04-08', imageUrl: `${SITE.baseUrl}/images/hero-guide-metal-asphalt.jpeg` })) }</Script>
      <Script id="s2" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema([
        { name: 'Home', url: SITE.baseUrl },
        { name: 'Guides', url: `${SITE.baseUrl}/guides` },
        { name: 'Roof Replacement ROI Portland', url: PAGE_URL },
      ]))}</Script>
      <Script id="s3" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(faqSchema(faqs))}</Script>

      <Nav />
      <PageHero
        imageUrl="/images/hero-roof-replacement.jpeg"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }, { label: 'Roof Replacement ROI' }]}
        eyebrow="Investment Guide · Portland Market Data"
        title={<>ROOF REPLACEMENT ROI<br /><span style={{ color: '#F5A623' }}>PORTLAND MARKET DATA</span></>}
        subtitle="Neighborhood-tier ROI data, material comparisons, and the inspection contingency angle. What the numbers actually say."
        stats={[{ label: 'Avg. ROI Range', value: '52–74%' }, { label: 'Sales w/ Roof Contingency', value: '23%' }, { label: 'Price Reduction Multiplier', value: '1.5–2×' }]}
      />

      {/* ROI by Neighborhood Tier */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ By Neighborhood Tier ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.8rem' }}>ROI VARIES BY WHERE YOU LIVE</h2>
          <p style={{ ...f, fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300, maxWidth: '720px', marginBottom: '2.5rem' }}>
            Portland&apos;s roofing ROI is not uniform. Buyer expectations, price ceilings, and competition levels create distinct tiers. These ranges are based on RMLS closed-sale data cross-referenced with contractor cost averages.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 100px', gap: '1.5rem', background: 'var(--bg2)', padding: '1rem 1.5rem' }}>
              <div style={{ ...m, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Tier</div>
              <div style={{ ...m, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Neighborhoods</div>
              <div style={{ ...m, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>ROI</div>
            </div>
            {roiByTier.map((row) => (
              <div key={row.tier} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 100px', gap: '1.5rem', background: '#fff', padding: '1.2rem 1.5rem', alignItems: 'start' }}>
                <div style={{ ...c, fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>{row.tier}</div>
                <div>
                  <div style={{ ...f, fontSize: '0.92rem', color: 'var(--text)', fontWeight: 400, marginBottom: '0.3rem' }}>{row.neighborhoods}</div>
                  <div style={{ ...f, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>{row.note}</div>
                </div>
                <div style={{ ...m, fontSize: '0.9rem', color: 'var(--green)', fontWeight: 700 }}>{row.range}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Material ROI Comparison */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ By Material ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.8rem' }}>MATERIAL ROI COMPARISON</h2>
          <p style={{ ...f, fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300, maxWidth: '720px', marginBottom: '2.5rem' }}>
            Material choice affects both the percentage return and absolute dollar recovery. Higher-cost materials can recover more dollars while showing a lower percentage ROI.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--bdr)' }}>
                  {['Material', 'Typical Cost', 'ROI Range', 'Notes'].map((h) => (
                    <th key={h} style={{ ...m, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'left', padding: '0.8rem 1rem' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {materialRoi.map((row) => (
                  <tr key={row.material} style={{ borderBottom: '1px solid var(--bdr)' }}>
                    <td style={{ ...c, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)', padding: '1rem' }}>{row.material}</td>
                    <td style={{ ...m, fontSize: '0.82rem', color: 'var(--text)', padding: '1rem' }}>{row.cost}</td>
                    <td style={{ ...m, fontSize: '0.82rem', color: 'var(--green)', fontWeight: 700, padding: '1rem' }}>{row.roi}</td>
                    <td style={{ ...f, fontSize: '0.88rem', color: 'var(--muted)', padding: '1rem', lineHeight: 1.6, fontWeight: 300 }}>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Inspection Contingency */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ The Hidden Factor ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.8rem' }}>THE INSPECTION CONTINGENCY ANGLE</h2>
          <p style={{ ...f, fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300, maxWidth: '720px', marginBottom: '2rem' }}>
            Raw ROI percentages miss the most important variable in Portland&apos;s market: what happens when you <em>don&apos;t</em> replace the roof.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'var(--bdr)', marginBottom: '2.5rem' }}>
            {[
              { stat: '23%', label: 'of Portland home sales include a roofing contingency in the inspection report' },
              { stat: '1.5–2\u00d7', label: 'the typical buyer price reduction vs. actual repair cost \u2014 buyers overweight roofing risk' },
              { stat: '$4,200', label: 'average negotiated reduction for a roof flagged as \u201cnear end of life\u201d in Portland metro' },
            ].map((item) => (
              <div key={item.stat} style={{ background: 'var(--bg2)', padding: '2rem' }}>
                <div style={{ ...d, fontSize: '2.2rem', color: 'var(--amber)', lineHeight: 1, marginBottom: '0.5rem' }}>{item.stat}</div>
                <div style={{ ...f, fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>{item.label}</div>
              </div>
            ))}
          </div>
          <p style={{ ...f, fontSize: '1rem', color: 'var(--text)', lineHeight: 1.8, fontWeight: 300, maxWidth: '720px', marginBottom: '1.3rem' }}>
            The inspection contingency dynamic means the effective ROI of proactive replacement is higher than the raw numbers suggest. A $15,000 roof replacement that prevents a $8,000\u2013$12,000 price reduction at closing changes the math significantly.
          </p>
          <p style={{ ...f, fontSize: '1rem', color: 'var(--text)', lineHeight: 1.8, fontWeight: 300, maxWidth: '720px' }}>
            This is especially pronounced in Portland&apos;s competitive inner neighborhoods where multiple offers are common. Buyers with options will deprioritize homes with known roofing issues rather than negotiate \u2014 they simply move to the next listing.
          </p>
        </div>
      </section>

      {/* When ROI Is Weak */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--red)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ Honest Assessment ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.8rem' }}>WHEN THE ROI ARGUMENT IS WEAK</h2>
          <p style={{ ...f, fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300, maxWidth: '720px', marginBottom: '2rem' }}>
            Not every roof replacement is a smart financial move. Here are the scenarios where the investment math doesn&apos;t hold up:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
            {[
              { title: 'Roof has 10+ years of life remaining', detail: 'If your roof is functional and not causing active issues, the inspection contingency argument weakens. Inspectors won\u2019t flag a roof with a decade of remaining life.' },
              { title: 'Buyer\u2019s market with low competition', detail: 'In a slow market, buyers have leverage regardless. A new roof won\u2019t prevent negotiations when the buyer has 15 other options.' },
              { title: 'Neighborhood price ceiling', detail: 'If comparable sales in your area max out at $350K, spending $25K on a premium roof won\u2019t push your sale price to $375K. The ceiling is the ceiling.' },
              { title: 'Selling as-is to investors', detail: 'Cash investors and flippers discount for roofing regardless of condition. They\u2019re pricing in their own preferred contractor and materials.' },
              { title: 'Significant structural issues exist', detail: 'If the home has foundation problems, outdated electrical, or other major defects, a new roof won\u2019t meaningfully change buyer perception.' },
            ].map((item, i) => (
              <div key={item.title} style={{ background: i % 2 === 0 ? '#fff' : 'var(--bg2)', padding: '1.5rem', display: 'flex', gap: '1.2rem' }}>
                <div style={{ ...d, fontSize: '1.2rem', color: 'var(--red)', flexShrink: 0, lineHeight: 1, minWidth: '1.5rem' }}>{'\u2715'}</div>
                <div>
                  <div style={{ ...c, fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.3rem' }}>{item.title}</div>
                  <div style={{ ...f, fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>[ Frequently Asked ]</div>
          {faqs.map(({ q, a }) => (
            <div key={q} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--bdr)' }}>
              <h3 style={{ ...c, fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.7rem' }}>{q}</h3>
              <p style={{ ...f, fontSize: '0.97rem', color: 'var(--muted)', lineHeight: 1.75, fontWeight: 300 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap">
          <div style={{ padding: '2rem 2.5rem', background: '#fff', border: '1px solid var(--bdr)', borderLeft: '4px solid var(--amber-btn)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ ...m, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Ready to Move Forward?</div>
              <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>Free quotes from vetted Portland contractors. 48-hour response guaranteed.</p>
            </div>
            <ModalTriggerBtn style={{ display: 'inline-block', background: 'var(--amber-btn)', color: '#000', ...c, fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.8rem 2rem', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Get Free Quotes →</ModalTriggerBtn>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
