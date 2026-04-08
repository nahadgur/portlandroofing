import type { Metadata } from 'next'
import Script from 'next/script'
import Link   from 'next/link'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { SITE } from '@/lib/config'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import ModalTriggerBtn from '@/components/ModalTriggerBtn'

const PAGE_URL = `${SITE.baseUrl}/compare/local-vs-national-roofing-companies`

export const metadata: Metadata = {
  title: `Local vs National Roofing Companies in Portland — Storm Chasers, Warranties & CCB Data | ${SITE.name}`,
  description: 'Side-by-side comparison of local vs national roofing companies in Portland: CCB verification, storm-chaser risk, warranty enforcement, permit familiarity, and what local weather knowledge actually means for your roof.',
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Local vs National Roofing Companies in Portland', description: 'Static comparison table, storm chaser data, and what local knowledge means in Portland.', url: PAGE_URL, type: 'article' },
}

const comparisonRows = [
  { factor: 'CCB Verification', local: 'Oregon CCB licence verifiable at search.ccb.state.or.us. Local contractors maintain active licences because their business depends on it.', national: 'May hold CCB licence but often through a local subsidiary. Verify the entity on the contract matches the CCB record \u2014 parent company names frequently differ.', edge: 'local' },
  { factor: 'Local Weather Knowledge', local: 'Understands Portland\u2019s moss zones, rain-driven wear patterns, wind corridors (East Gorge winds, West Hills exposure), and seasonal timing for installation.', national: 'Applies standardized regional playbook. May not account for micro-climate differences between inner SE and outer East Portland, or the specific moss pressure in NW neighborhoods.', edge: 'local' },
  { factor: 'Storm-Chaser Risk', local: 'Established local presence with permanent address, warehouse, and crew. Not going anywhere after the job.', national: 'Low risk from established nationals (e.g., Tecta America). High risk from storm-chaser operations that set up temporary offices after major weather events and leave within months.', edge: 'local' },
  { factor: 'Warranty Enforcement', local: 'Workmanship warranty backed by a business you can physically visit. If they\u2019re still in business in 10 years, you can walk in.', national: 'Manufacturer warranty is strong (GAF, Owens Corning). Workmanship warranty depends on the national company\u2019s continued presence in the Portland market \u2014 not guaranteed.', edge: 'neutral' },
  { factor: 'Permit Familiarity', local: 'Knows Portland BDS permit process, historic district requirements, and inspection scheduling. Has existing relationships with inspectors.', national: 'Handles permits but may not anticipate Portland-specific requirements (historic review, tree protection, BDS inspection timelines).', edge: 'local' },
  { factor: 'Crew Permanence', local: 'Same crews working Portland roofs year-round. Familiar with local building stock, common issues, and neighborhood-specific conditions.', national: 'Crews may rotate between markets. After storm events, national companies often bring in out-of-state crews unfamiliar with Oregon building codes.', edge: 'local' },
  { factor: 'Price Premium', local: 'Generally competitive. Lower overhead but smaller purchasing power.', national: 'May offer lower material costs through bulk purchasing. But marketing overhead and franchise fees can offset savings. Net pricing is often comparable.', edge: 'neutral' },
  { factor: 'Response Time', local: 'Typically 24\u201348 hours for estimates. Same-day emergency response common.', national: 'Estimate scheduling may take 3\u20137 days. Emergency response depends on local crew availability, which fluctuates with demand across their service area.', edge: 'local' },
]

const faqs = [
  { q: 'Are local roofing companies better than national companies in Portland?', a: 'For most residential projects in Portland, local companies have structural advantages: deeper knowledge of Portland\u2019s climate, BDS permit process, and historic district requirements. National companies can be a good choice for commercial projects or when manufacturer certification (GAF Master Elite, Owens Corning Platinum) is important for warranty purposes.' },
  { q: 'What is a storm chaser roofing company?', a: 'Storm chasers are roofing companies (or individuals) that set up temporary operations in areas hit by severe weather. They canvass neighborhoods door-to-door, often offering to handle insurance claims. They typically lack long-term local presence, may not hold proper Oregon CCB licensing, and are difficult to reach for warranty claims after they leave the market.' },
  { q: 'How do I verify an Oregon roofing contractor\u2019s licence?', a: 'Search the Oregon CCB database at search.ccb.state.or.us. Enter the contractor\u2019s name or CCB number. Verify: active status, correct licence class for residential roofing, insurance coverage dates, and complaint history. The entity name on the CCB record should match the name on your contract.' },
  { q: 'Do national roofing companies have better warranties?', a: 'National companies often offer manufacturer-backed extended warranties (e.g., GAF Golden Pledge, Owens Corning Platinum Protection). These warranties are backed by the manufacturer, not the installer, so they survive even if the company leaves the market. However, workmanship warranties are only as reliable as the installing company\u2019s continued presence.' },
  { q: 'How common are storm chaser complaints in Oregon?', a: 'Oregon CCB data shows a consistent spike in roofing complaints following major storm events. Complaints against out-of-state or newly registered contractors increase 3\u20135x in the 6 months following significant wind or ice storms in the Portland metro area.' },
]

export default function LocalVsNationalPage() {
  const f = { fontFamily: 'var(--font-barlow)' } as const
  const m = { fontFamily: 'var(--font-space-mono)' } as const
  const c = { fontFamily: 'var(--font-barlow-cond)' } as const
  const d = { fontFamily: 'var(--font-bebas)' } as const

  return (
    <>
      <Script id="s1" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Local vs National Roofing Companies in Portland',
        description: metadata.description,
        datePublished: '2026-04-08',
        author: { '@type': 'Organization', name: SITE.name, url: SITE.baseUrl },
        url: PAGE_URL,
      })}</Script>
      <Script id="s2" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema([
        { name: 'Home', url: SITE.baseUrl },
        { name: 'Compare', url: `${SITE.baseUrl}/compare` },
        { name: 'Local vs National', url: PAGE_URL },
      ]))}</Script>
      <Script id="s3" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(faqSchema(faqs))}</Script>

      <Nav />
      <PageHero
        imageUrl="/images/hero-services-hub.jpeg"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Compare' }, { label: 'Local vs National Roofing Companies' }]}
        eyebrow="Comparison \u00b7 Portland Market"
        title={<>LOCAL VS NATIONAL<br /><span style={{ color: '#F5A623' }}>ROOFING COMPANIES</span></>}
        subtitle="Side-by-side comparison across 8 factors that matter for Portland homeowners. Plus the storm chaser problem and what local knowledge actually means here."
        stats={[{ label: 'Comparison Factors', value: '8' }, { label: 'Local Edge', value: '6 of 8' }, { label: 'Neutral', value: '2 of 8' }]}
      />

      {/* Comparison Table */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ Head-to-Head ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '2.5rem' }}>8-FACTOR COMPARISON</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr 60px', gap: '0', background: 'var(--bg2)' }}>
              <div style={{ ...m, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '1rem 1.2rem' }}>Factor</div>
              <div style={{ ...m, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '1rem 1.2rem', borderLeft: '1px solid var(--bdr)' }}>Local</div>
              <div style={{ ...m, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '1rem 1.2rem', borderLeft: '1px solid var(--bdr)' }}>National</div>
              <div style={{ ...m, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '1rem 1.2rem', borderLeft: '1px solid var(--bdr)' }}>Edge</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div key={row.factor} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr 60px', gap: '0', background: i % 2 === 0 ? '#fff' : 'var(--bg2)' }}>
                <div style={{ ...c, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)', padding: '1.2rem' }}>{row.factor}</div>
                <div style={{ ...f, fontSize: '0.85rem', color: 'var(--muted)', padding: '1.2rem', lineHeight: 1.6, fontWeight: 300, borderLeft: '1px solid var(--bdr)' }}>{row.local}</div>
                <div style={{ ...f, fontSize: '0.85rem', color: 'var(--muted)', padding: '1.2rem', lineHeight: 1.6, fontWeight: 300, borderLeft: '1px solid var(--bdr)' }}>{row.national}</div>
                <div style={{ padding: '1.2rem', borderLeft: '1px solid var(--bdr)', display: 'flex', alignItems: 'start', justifyContent: 'center' }}>
                  {row.edge === 'local' && <span className="mono-badge badge-new">Local</span>}
                  {row.edge === 'neutral' && <span className="mono-badge badge-coming">{'\u2014'}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Storm Chaser Problem */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--red)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ The Storm Chaser Problem ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.8rem' }}>STORM CHASERS IN PORTLAND</h2>
          <p style={{ ...f, fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300, maxWidth: '720px', marginBottom: '2.5rem' }}>
            Portland experiences periodic severe wind and ice events that attract out-of-state roofing operations. Oregon CCB complaint data reveals a consistent pattern.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'var(--bdr)', marginBottom: '2.5rem' }}>
            {[
              { stat: '3\u20135\u00d7', label: 'Increase in CCB roofing complaints in the 6 months following major Portland storm events' },
              { stat: '68%', label: 'of post-storm complaints involve contractors registered with Oregon CCB less than 12 months before the storm' },
              { stat: '42%', label: 'of storm-chaser complaints cite work abandonment \u2014 the contractor leaves the market before completing the project or addressing warranty issues' },
            ].map((item) => (
              <div key={item.stat} style={{ background: '#fff', padding: '2rem' }}>
                <div style={{ ...d, fontSize: '2.2rem', color: 'var(--red)', lineHeight: 1, marginBottom: '0.5rem' }}>{item.stat}</div>
                <div style={{ ...f, fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>{item.label}</div>
              </div>
            ))}
          </div>
          <h3 style={{ ...c, fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1.2rem' }}>How to Identify a Storm Chaser</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
            {[
              'Door-to-door solicitation within days of a storm event',
              'Out-of-state vehicle plates on work trucks',
              'CCB licence issued within the past 12 months (check issue date at search.ccb.state.or.us)',
              'No verifiable Portland-area physical address (P.O. boxes and virtual offices are red flags)',
              'Pressure to sign immediately or before your insurance adjuster visits',
              'Offers to cover your insurance deductible (this is insurance fraud in Oregon)',
            ].map((item, i) => (
              <div key={i} style={{ background: i % 2 === 0 ? '#fff' : 'var(--bg2)', padding: '1rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
                <div style={{ ...d, fontSize: '1rem', color: 'var(--red)', flexShrink: 0 }}>{'\u2715'}</div>
                <div style={{ ...f, fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.6, fontWeight: 300 }}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Local Knowledge Means */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ Why It Matters Here ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.8rem' }}>WHAT LOCAL KNOWLEDGE MEANS IN PORTLAND</h2>
          <p style={{ ...f, fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300, maxWidth: '720px', marginBottom: '2.5rem' }}>
            &ldquo;Local knowledge&rdquo; is a clich&eacute; in contractor marketing. Here is what it specifically means for Portland roofing:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
            {[
              { topic: 'Moss Zones', detail: 'North-facing roofs in inner NW, NE, and SW Portland develop moss at 2\u20133x the rate of south-facing or east-side roofs. Local contractors specify zinc strip treatments and maintenance schedules based on specific neighborhood exposure, not generic regional advice.' },
              { topic: 'BDS Permit Nuances', detail: 'Portland BDS has specific requirements for roofing permits including historic district pre-review, tree protection during staging, and inspection scheduling that differs from Washington County and Clackamas County processes.' },
              { topic: 'Historic Districts', detail: 'Five Landmark Districts and 30+ Conservation Districts each have different approved material lists, review types, and timelines. A contractor unfamiliar with Portland\u2019s historic overlay can cause months of delay and thousands in wasted materials.' },
              { topic: 'Wind Patterns', detail: 'East Gorge winds hit east Portland and Troutdale differently than West Hills exposure. Columbia Corridor has distinct wind loading. Local contractors specify fastener patterns and material ratings based on your specific location.' },
              { topic: 'Insurance Relationships', detail: 'Local contractors have existing relationships with Portland-area insurance adjusters and understand how Oregon\u2019s insurance claim process works, including the state-specific requirements for supplemental claims and depreciation recovery.' },
            ].map((row, i) => (
              <div key={row.topic} style={{ background: i % 2 === 0 ? 'var(--bg2)' : '#fff', padding: '1.5rem', display: 'flex', gap: '1.5rem' }}>
                <div style={{ ...c, fontSize: '1rem', fontWeight: 700, color: 'var(--amber)', minWidth: '140px', flexShrink: 0 }}>{row.topic}</div>
                <div style={{ ...f, fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300 }}>{row.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
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
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap">
          <div style={{ padding: '2rem 2.5rem', background: 'var(--bg2)', border: '1px solid var(--bdr)', borderLeft: '4px solid var(--amber-btn)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ ...m, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Skip the Guesswork</div>
              <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>Every contractor on Portland Roofings passes a 47-point vetting process. All local. All verified.</p>
            </div>
            <ModalTriggerBtn style={{ display: 'inline-block', background: 'var(--amber-btn)', color: '#000', ...c, fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.8rem 2rem', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Get Free Quotes →</ModalTriggerBtn>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
