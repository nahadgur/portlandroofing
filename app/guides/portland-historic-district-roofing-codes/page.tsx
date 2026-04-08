import type { Metadata } from 'next'
import Script from 'next/script'
import Link   from 'next/link'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { SITE } from '@/lib/config'
import { breadcrumbSchema, faqSchema, articleSchema } from '@/lib/schema'
import ModalTriggerBtn from '@/components/ModalTriggerBtn'

const PAGE_URL = `${SITE.baseUrl}/guides/portland-historic-district-roofing-codes`

export const metadata: Metadata = {
  title: `Portland Historic District Roofing Rules — Ladd's Addition, Irvington & More | ${SITE.name}`,
  description: 'Portland historic district roofing requirements by district: approved materials, review types, timelines, and fees. Covers all 5 Landmark Districts and 30+ Conservation Districts including Ladd\'s Addition, Irvington, Sellwood, and Alameda.',
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Portland Historic District Roofing Rules', description: 'District-by-district rules table, Type I vs Type II review, and step-by-step application process.', url: PAGE_URL, type: 'article' },
}

const landmarkDistricts = [
  { name: "Ladd\u2019s Addition", materials: 'Slate, wood shingle, composition (period-appropriate colors only)', review: 'Type II', timeline: '6\u20138 weeks', fee: '$500\u2013$1,200', notes: 'Most restrictive district. Original roof form must be maintained. No standing seam metal. Color samples required.' },
  { name: 'Skidmore / Old Town', materials: 'Flat membrane, built-up (commercial). Period materials for visible slopes', review: 'Type II or III', timeline: '8\u201312 weeks', fee: '$1,000\u2013$2,500', notes: 'Primarily commercial. Visible roofing must match historic character. Requires historic resource review.' },
  { name: 'Alphabet District (NW)', materials: 'Composition, slate, wood shingle, flat membrane', review: 'Type II', timeline: '6\u20138 weeks', fee: '$500\u2013$1,200', notes: 'Mixed residential/commercial. Contributing structures have stricter rules than non-contributing.' },
  { name: 'Lair Hill', materials: 'Composition, wood shingle (matching original)', review: 'Type II', timeline: '6\u20138 weeks', fee: '$500\u2013$1,200', notes: 'Small district. Roofing visible from right-of-way must match historic documentation.' },
  { name: 'Thirteenth Avenue (South Portland)', materials: 'Composition, slate, wood shingle', review: 'Type II', timeline: '6\u20138 weeks', fee: '$500\u2013$1,200', notes: 'Residential character. Like-for-like replacements generally approved at staff level.' },
]

const conservationDistricts = [
  { name: 'Irvington', review: 'Type I (staff)', restriction: 'Moderate', notes: 'Composition and architectural shingles generally approved. Metal roofing allowed on non-contributing structures. Color guidance but not prescriptive.' },
  { name: 'Sellwood-Moreland', review: 'Type I (staff)', restriction: 'Low\u2013Moderate', notes: 'Largely permissive for residential. Like-for-like replacements approved routinely. New materials reviewed for compatibility.' },
  { name: 'Alameda', review: 'Type I (staff)', restriction: 'Moderate', notes: 'Tudor and Craftsman homes dominate. Roof form changes require additional review. Material swaps (e.g., shake to composition) generally approved.' },
  { name: 'Laurelhurst', review: 'Type I (staff)', restriction: 'Low\u2013Moderate', notes: 'Contributing structures have roof form protections. Material replacement is flexible if color and profile are compatible.' },
  { name: 'Woodstock', review: 'Type I (staff)', restriction: 'Low', notes: 'Commercial corridor focus. Residential roofing rarely triggers review unless altering visible roof form.' },
  { name: 'Eliot', review: 'Type I (staff)', restriction: 'Moderate', notes: 'Mixed-era housing stock. Victorian-era homes have stricter material expectations. Post-war homes are flexible.' },
]

const commonMistakes = [
  { mistake: 'Starting work before review approval', detail: 'Work begun before review approval can result in stop-work orders, fines, and mandatory removal of non-approved materials. Portland BDS enforces this actively in Landmark Districts.' },
  { mistake: 'Assuming like-for-like is always exempt', detail: 'Like-for-like material replacement is exempt from review in Conservation Districts but NOT in Landmark Districts. Ladd\u2019s Addition requires review even for same-material replacement if the roof is visible from public right-of-way.' },
  { mistake: 'Ignoring color requirements', detail: 'Landmark Districts regulate roofing color, not just material. Submitting a material sample without a color specification will delay your application.' },
  { mistake: 'Using a contractor unfamiliar with historic review', detail: 'Contractors who don\u2019t understand the review process cause delays by starting permits before design review, submitting incomplete applications, or installing non-compliant materials.' },
  { mistake: 'Confusing Landmark vs Conservation District rules', detail: 'Conservation Districts (Irvington, Sellwood, Alameda) have significantly lighter requirements than Landmark Districts (Ladd\u2019s Addition, Skidmore). The rules are not interchangeable.' },
]

const applicationSteps = [
  { step: '01', title: 'Determine your district classification', detail: 'Use Portland Maps (portlandmaps.com) to confirm whether your property is in a Landmark District, Conservation District, or neither. Also check if your structure is classified as contributing or non-contributing.' },
  { step: '02', title: 'Identify review type required', detail: 'Landmark Districts: Type II (or III for major alterations). Conservation Districts: Type I for most roofing work. Non-contributing structures in Conservation Districts may be exempt.' },
  { step: '03', title: 'Prepare application materials', detail: 'Include: current roof photos (all elevations), proposed material samples and colors, manufacturer specifications, site plan showing roof visibility from public right-of-way, and historic photos if available.' },
  { step: '04', title: 'Submit to Portland BDS', detail: 'Type I reviews are staff-level decisions (no hearing). Type II reviews involve a public notice period and potential hearing. Submit through Portland BDS Development Services Center or online portal.' },
  { step: '05', title: 'Wait for decision before contracting', detail: 'Do not sign a roofing contract or order materials until your review is approved. Type I: 2\u20134 weeks. Type II: 6\u20138 weeks. Type III: 8\u201312+ weeks with potential appeal periods.' },
  { step: '06', title: 'Pull building permit after approval', detail: 'Design review approval is separate from the building permit. After review approval, submit for the standard roofing permit through BDS. The permit references the approved design review.' },
]

const faqs = [
  { q: 'Do I need a permit to replace my roof in a Portland historic district?', a: 'Yes. All roofing work in Portland Landmark Districts requires design review before a building permit is issued. Conservation Districts require review for changes visible from public right-of-way. The building permit itself is required for all roof replacements in Portland regardless of district.' },
  { q: 'What roofing materials are allowed in Ladd\u2019s Addition?', a: 'Ladd\u2019s Addition allows slate, wood shingle, and composition shingles in period-appropriate colors. Standing seam metal, concrete tile, and synthetic materials are generally not approved for contributing structures. Color samples must be submitted with the application.' },
  { q: 'What is the difference between Type I and Type II historic review?', a: 'Type I is a staff-level decision with no public notice or hearing \u2014 typically 2\u20134 weeks. Type II involves public notice to neighbors, a comment period, and potential hearing \u2014 typically 6\u20138 weeks. Landmark Districts require Type II. Conservation Districts typically require Type I.' },
  { q: 'Can I use metal roofing in a Portland historic district?', a: 'In Conservation Districts (Irvington, Sellwood, Alameda), metal roofing is generally approved for non-contributing structures and may be approved for contributing structures depending on profile and color. In Landmark Districts, metal roofing is rarely approved for contributing structures.' },
  { q: 'How much does historic review add to roofing project cost?', a: 'Direct fees range from $500\u2013$2,500 depending on review type. Indirect costs include 2\u201312 weeks of project delay, potential material restrictions that limit competitive bidding, and application preparation time. Budget an additional $1,000\u2013$3,000 total beyond the roofing work itself.' },
  { q: 'What happens if I replace my roof without historic review approval?', a: 'Portland BDS can issue stop-work orders, levy fines, and require removal and replacement with approved materials at the homeowner\u2019s expense. In Landmark Districts, enforcement is active. Conservation Districts see less enforcement but complaints from neighbors can trigger review.' },
]

export default function HistoricDistrictRoofingPage() {
  const f = { fontFamily: 'var(--font-barlow)' } as const
  const m = { fontFamily: 'var(--font-space-mono)' } as const
  const c = { fontFamily: 'var(--font-barlow-cond)' } as const
  const d = { fontFamily: 'var(--font-bebas)' } as const

  return (
    <>
      <Script id="s1" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(articleSchema({ headline: "Portland Historic District Roofing Rules — Ladd's Addition, Irvington & More", description: metadata.description as string, url: PAGE_URL, datePublished: '2026-04-08', imageUrl: `${SITE.baseUrl}/images/hero-guide-permits.jpeg` }))}</Script>
      <Script id="s2" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema([
        { name: 'Home', url: SITE.baseUrl },
        { name: 'Guides', url: `${SITE.baseUrl}/guides` },
        { name: 'Historic District Roofing Codes', url: PAGE_URL },
      ]))}</Script>
      <Script id="s3" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(faqSchema(faqs))}</Script>

      <Nav />
      <PageHero
        imageUrl="/images/hero-historic-neighborhoods.jpeg"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }, { label: 'Historic District Roofing Codes' }]}
        eyebrow="Permits & Codes \u00b7 Portland Historic Districts"
        title={<>HISTORIC DISTRICT<br /><span style={{ color: '#F5A623' }}>ROOFING CODES</span></>}
        subtitle="Portland\u2019s two-tier system: 5 Landmark Districts with strict oversight, 30+ Conservation Districts with lighter review. District-by-district rules."
        stats={[{ label: 'Landmark Districts', value: '5' }, { label: 'Conservation Districts', value: '30+' }, { label: 'Review Types', value: 'I / II / III' }]}
      />

      {/* Two-Tier System Explainer */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ How It Works ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.8rem' }}>PORTLAND&apos;S TWO-TIER HISTORIC SYSTEM</h2>
          <p style={{ ...f, fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300, maxWidth: '720px', marginBottom: '2.5rem' }}>
            Portland separates historic protections into two categories with very different levels of oversight. Confusing them is one of the most common mistakes homeowners make.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1px', background: 'var(--bdr)', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--bg2)', padding: '2rem' }}>
              <div style={{ ...d, fontSize: '1.8rem', color: 'var(--red)', lineHeight: 1, marginBottom: '0.5rem' }}>LANDMARK DISTRICTS</div>
              <div style={{ ...m, fontSize: '0.65rem', color: 'var(--muted)', marginBottom: '1rem' }}>5 Districts &middot; Strict Oversight</div>
              <ul style={{ ...f, fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.8, fontWeight: 300, listStyle: 'none' }}>
                <li style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--red)', marginBottom: '0.5rem' }}>Type II or III design review required</li>
                <li style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--red)', marginBottom: '0.5rem' }}>Specific material and color restrictions</li>
                <li style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--red)', marginBottom: '0.5rem' }}>Public notice and hearing possible</li>
                <li style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--red)', marginBottom: '0.5rem' }}>6\u201312 week review timeline</li>
                <li style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--red)' }}>Even like-for-like may require review</li>
              </ul>
            </div>
            <div style={{ background: 'var(--bg2)', padding: '2rem' }}>
              <div style={{ ...d, fontSize: '1.8rem', color: 'var(--green)', lineHeight: 1, marginBottom: '0.5rem' }}>CONSERVATION DISTRICTS</div>
              <div style={{ ...m, fontSize: '0.65rem', color: 'var(--muted)', marginBottom: '1rem' }}>30+ Districts &middot; Lighter Review</div>
              <ul style={{ ...f, fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.8, fontWeight: 300, listStyle: 'none' }}>
                <li style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--green)', marginBottom: '0.5rem' }}>Type I (staff-level) review typical</li>
                <li style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--green)', marginBottom: '0.5rem' }}>Material guidance, not prescriptive</li>
                <li style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--green)', marginBottom: '0.5rem' }}>No public hearing for most roofing work</li>
                <li style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--green)', marginBottom: '0.5rem' }}>2\u20134 week review timeline</li>
                <li style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--green)' }}>Like-for-like often exempt from review</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Landmark District Table */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--red)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ Landmark Districts ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '2.5rem' }}>RULES BY LANDMARK DISTRICT</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
            {landmarkDistricts.map((dist, i) => (
              <div key={dist.name} style={{ background: i % 2 === 0 ? '#fff' : 'var(--bg2)', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.8rem' }}>
                  <div style={{ ...c, fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)' }}>{dist.name}</div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <span className="mono-badge badge-hot">{dist.review}</span>
                    <span style={{ ...m, fontSize: '0.68rem', color: 'var(--muted)' }}>{dist.timeline}</span>
                    <span style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)' }}>{dist.fee}</span>
                  </div>
                </div>
                <div style={{ ...f, fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.6, fontWeight: 400, marginBottom: '0.4rem' }}><strong>Approved materials:</strong> {dist.materials}</div>
                <div style={{ ...f, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>{dist.notes}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conservation District Table */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--green)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ Conservation Districts ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '2.5rem' }}>KEY CONSERVATION DISTRICTS</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
            {conservationDistricts.map((dist, i) => (
              <div key={dist.name} style={{ background: i % 2 === 0 ? 'var(--bg2)' : '#fff', padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'start' }}>
                <div style={{ minWidth: '160px' }}>
                  <div style={{ ...c, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>{dist.name}</div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem' }}>
                    <span className="mono-badge badge-new">{dist.review}</span>
                  </div>
                </div>
                <div>
                  <div style={{ ...m, fontSize: '0.68rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>Restriction: {dist.restriction}</div>
                  <div style={{ ...f, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>{dist.notes}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--red)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ Avoid These ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '2.5rem' }}>COMMON MISTAKES</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
            {commonMistakes.map((item, i) => (
              <div key={item.mistake} style={{ background: i % 2 === 0 ? '#fff' : 'var(--bg2)', padding: '1.5rem', display: 'flex', gap: '1.2rem' }}>
                <div style={{ ...d, fontSize: '1.2rem', color: 'var(--red)', flexShrink: 0, lineHeight: 1, minWidth: '1.5rem' }}>{'\u2715'}</div>
                <div>
                  <div style={{ ...c, fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.3rem' }}>{item.mistake}</div>
                  <div style={{ ...f, fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Application */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ Application Process ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '2.5rem' }}>STEP-BY-STEP PROCESS</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
            {applicationSteps.map((item) => (
              <div key={item.step} style={{ background: '#fff', padding: '1.5rem', display: 'flex', gap: '1.5rem' }}>
                <div style={{ ...d, fontSize: '1.5rem', color: 'var(--amber)', flexShrink: 0, lineHeight: 1, minWidth: '2.5rem' }}>{item.step}</div>
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
              <div style={{ ...m, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>In a Historic District?</div>
              <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>Get quotes from Portland contractors experienced with historic district review and approved materials.</p>
            </div>
            <ModalTriggerBtn style={{ display: 'inline-block', background: 'var(--amber-btn)', color: '#000', ...c, fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.8rem 2rem', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Get Free Quotes →</ModalTriggerBtn>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
