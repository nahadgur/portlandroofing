import type { Metadata } from 'next'
import Script from 'next/script'
import Link   from 'next/link'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { SITE } from '@/lib/config'
import { breadcrumbSchema, faqSchema, articleSchema } from '@/lib/schema'
import ModalTriggerBtn from '@/components/ModalTriggerBtn'

const PAGE_URL = `${SITE.baseUrl}/guides/solar-ready-roofing-oregon-incentives`

export const metadata: Metadata = {
  title: `Solar-Ready Roofing in Oregon — Incentives, Tax Credits & Roof Requirements (2026) | ${SITE.name}`,
  description: 'Oregon solar incentives for 2026: RETC up to $6,000, Energy Trust rebates, federal ITC at 30%. Roof requirements solar installers need, timing strategies, and Portland-specific rules for cedar shake, HOAs, and historic districts.',
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Solar-Ready Roofing in Oregon — 2026 Incentives Guide', description: 'RETC, Energy Trust rebates, federal ITC, and the roof requirements solar installers actually need.', url: PAGE_URL, type: 'article' },
}

const incentives = [
  { program: 'Oregon RETC', value: 'Up to $6,000', detail: 'Oregon Residential Energy Tax Credit. Applied to state income tax liability. Must use ODOE-approved contractor. Credit taken over the tax year the system is installed.', status: 'Active through 2026' },
  { program: 'Energy Trust of Oregon', value: '$0.25\u2013$0.30/watt', detail: 'Cash incentive paid directly to installer and passed through to homeowner. Available to Portland General Electric and Pacific Power customers. Typical 6kW system: $1,500\u2013$1,800.', status: 'Funding available' },
  { program: 'Federal ITC', value: '30% of system cost', detail: 'Investment Tax Credit under the Inflation Reduction Act. Applies to total installed cost including roofing work done as part of solar installation. No cap. Claimed on federal tax return.', status: 'Through 2032' },
  { program: 'Net Metering (OR)', value: 'Retail rate credit', detail: 'Oregon requires utilities to credit excess solar generation at full retail rate. Credits roll over month-to-month, trued up annually in April.', status: 'Active' },
]

const roofRequirements = [
  { req: '10+ years remaining roof life', detail: 'Solar installers will not mount panels on a roof with less than 10 years of estimated remaining life. Most require 15+ years for warranty alignment. A roof inspection report is standard before any installation contract.' },
  { req: 'Structural load capacity', detail: 'Standard solar panels add 2.5\u20134 lbs/sq ft. Most Portland homes with standard truss or rafter framing handle this without modification. Older homes (pre-1960) and flat-roof structures may need engineering review.' },
  { req: 'Pitch between 15\u00b0\u201345\u00b0', detail: 'Optimal for Portland is 25\u00b0\u201335\u00b0 south-facing. Panels can be installed on lower or steeper pitches with reduced efficiency. Flat roofs use tilt-mount racking systems.' },
  { req: 'No significant shading', detail: 'Trees, chimneys, and neighboring structures that shade the roof between 9am\u20133pm reduce system viability. Portland\u2019s mature tree canopy is the most common disqualifier in inner neighborhoods.' },
  { req: 'Adequate south/west exposure', detail: 'South-facing is ideal (100% production). West-facing produces ~85%. East-facing ~80%. North-facing is not viable. Portland\u2019s overcast winters make orientation more critical than in sunnier climates.' },
]

const faqs = [
  { q: 'What is the Oregon RETC for solar in 2026?', a: 'The Oregon Residential Energy Tax Credit (RETC) provides up to $6,000 for residential solar installations in 2026. The credit is applied to your Oregon state income tax liability. You must use an ODOE-approved contractor to qualify.' },
  { q: 'Can I install solar on an old roof in Portland?', a: 'Solar installers require a minimum of 10 years remaining roof life, with most preferring 15+ years. If your roof is nearing end-of-life, replacing it before solar installation saves $3,000\u2013$8,000 in future panel removal and reinstallation costs.' },
  { q: 'How much does solar-ready roofing cost in Portland?', a: 'A roof replacement optimized for solar (standing seam metal with S-5! clamps or new architectural asphalt with reinforced decking) typically costs $14,000\u2013$28,000 depending on material and roof size. The incremental cost of solar-ready features is $1,500\u2013$3,000 over a standard replacement.' },
  { q: 'Does the federal solar tax credit cover roofing work?', a: 'Yes, if roofing work is performed as part of the solar installation (same project scope), the cost can be included in the federal ITC calculation at 30%. This applies to roof repairs or structural upgrades required for solar mounting.' },
  { q: 'Can I install solar panels in a Portland historic district?', a: 'Yes, but with restrictions. Portland\u2019s Landmark Districts require Type II or Type III design review for visible solar installations. Conservation Districts typically allow solar with a Type I (staff-level) review. Panels must generally not be visible from the primary street frontage.' },
  { q: 'What is the best roofing material for solar panels?', a: 'Standing seam metal with S-5! clamp attachments is the gold standard \u2014 no roof penetrations required. Architectural asphalt works well with standard rail-mount systems. Cedar shake and tile require specialized mounting and cost more to install solar on.' },
]

export default function SolarReadyRoofingPage() {
  const f = { fontFamily: 'var(--font-barlow)' } as const
  const m = { fontFamily: 'var(--font-space-mono)' } as const
  const c = { fontFamily: 'var(--font-barlow-cond)' } as const
  const d = { fontFamily: 'var(--font-bebas)' } as const

  return (
    <>
      <Script id="s1" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(articleSchema({ headline: 'Solar-Ready Roofing in Oregon — Incentives, Tax Credits & Roof Requirements (2026)', description: metadata.description as string, url: PAGE_URL, datePublished: '2026-04-08', imageUrl: `${SITE.baseUrl}/images/hero-cedar-roofing.jpeg` }))}</Script>
      <Script id="s2" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema([
        { name: 'Home', url: SITE.baseUrl },
        { name: 'Guides', url: `${SITE.baseUrl}/guides` },
        { name: 'Solar-Ready Roofing Oregon', url: PAGE_URL },
      ]))}</Script>
      <Script id="s3" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(faqSchema(faqs))}</Script>

      <Nav />
      <PageHero
        imageUrl="/images/hero-metal-roofing.jpeg"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }, { label: 'Solar-Ready Roofing Oregon' }]}
        eyebrow="Incentives Guide \u00b7 2026 Oregon Data"
        title={<>SOLAR-READY ROOFING<br /><span style={{ color: '#F5A623' }}>OREGON INCENTIVES 2026</span></>}
        subtitle="Oregon RETC, Energy Trust rebates, federal ITC, and the roof requirements solar installers actually need. Plus Portland-specific rules."
        stats={[{ label: 'RETC Credit', value: '$6K' }, { label: 'Federal ITC', value: '30%' }, { label: 'Energy Trust', value: '$0.25+/W' }]}
      />

      {/* Incentive Stack */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ 2026 Incentive Stack ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.8rem' }}>OREGON SOLAR INCENTIVES</h2>
          <p style={{ ...f, fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300, maxWidth: '720px', marginBottom: '2.5rem' }}>
            Oregon homeowners can stack three separate incentive programs. On a typical 6kW residential system ($18,000\u2013$22,000 installed), the combined incentives reduce net cost by 40\u201350%.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
            {incentives.map((row, i) => (
              <div key={row.program} style={{ background: i % 2 === 0 ? 'var(--bg2)' : '#fff', padding: '1.5rem', display: 'grid', gridTemplateColumns: '180px 120px 1fr', gap: '1.5rem', alignItems: 'start' }}>
                <div>
                  <div style={{ ...c, fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>{row.program}</div>
                  <div style={{ ...m, fontSize: '0.62rem', color: 'var(--green)', marginTop: '0.3rem' }}>{row.status}</div>
                </div>
                <div style={{ ...d, fontSize: '1.4rem', color: 'var(--amber)', lineHeight: 1 }}>{row.value}</div>
                <div style={{ ...f, fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300 }}>{row.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roof Requirements */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ What Installers Need ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.8rem' }}>ROOF REQUIREMENTS FOR SOLAR</h2>
          <p style={{ ...f, fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300, maxWidth: '720px', marginBottom: '2.5rem' }}>
            Solar installers evaluate your roof against five criteria before signing an installation contract. Failing any one can delay or disqualify your project.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
            {roofRequirements.map((row, i) => (
              <div key={row.req} style={{ background: i % 2 === 0 ? '#fff' : 'var(--bg2)', padding: '1.5rem', display: 'flex', gap: '1.5rem' }}>
                <div style={{ ...d, fontSize: '1.3rem', color: 'var(--green)', flexShrink: 0, lineHeight: 1, minWidth: '2rem' }}>{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <div style={{ ...c, fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.3rem' }}>{row.req}</div>
                  <div style={{ ...f, fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300 }}>{row.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timing Opportunity */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ The Timing Angle ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.8rem' }}>REPLACE BEFORE SOLAR, NOT AFTER</h2>
          <p style={{ ...f, fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300, maxWidth: '720px', marginBottom: '2rem' }}>
            If your roof has fewer than 15 years of remaining life and you plan to go solar, replacing the roof first is almost always the correct sequence.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'var(--bdr)', marginBottom: '2.5rem' }}>
            {[
              { stat: '$3\u2013$8K', label: 'Saved by avoiding future panel removal, storage, and reinstallation when the roof eventually needs replacement' },
              { stat: '25 yrs', label: 'Typical solar panel warranty. A new roof ensures the substrate lasts the full panel lifecycle without mid-life disruption' },
              { stat: '30%', label: 'Federal ITC can cover roof work done as part of the solar project scope \u2014 combining projects may qualify roofing costs' },
            ].map((item) => (
              <div key={item.stat} style={{ background: 'var(--bg2)', padding: '2rem' }}>
                <div style={{ ...d, fontSize: '2.2rem', color: 'var(--amber)', lineHeight: 1, marginBottom: '0.5rem' }}>{item.stat}</div>
                <div style={{ ...f, fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standing Seam + Portland Rules */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ Material & Local Rules ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.8rem' }}>STANDING SEAM METAL + PORTLAND SPECIFICS</h2>
          <p style={{ ...f, fontSize: '1rem', color: 'var(--text)', lineHeight: 1.8, fontWeight: 300, maxWidth: '720px', marginBottom: '1.5rem' }}>
            Standing seam metal roofing with S-5! clamp attachments is the optimal solar-ready material. The clamps grip the raised seams without penetrating the roof surface, eliminating leak risk from mounting holes. The system also allows panels to be removed and reinstalled without roof damage.
          </p>
          <p style={{ ...f, fontSize: '1rem', color: 'var(--text)', lineHeight: 1.8, fontWeight: 300, maxWidth: '720px', marginBottom: '2.5rem' }}>
            Architectural asphalt with standard rail-mount systems is the most common and cost-effective option. Flashing boots around lag bolts provide waterproofing, and modern installation techniques make leak risk minimal when done by experienced crews.
          </p>
          <h3 style={{ ...c, fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1.5rem' }}>Portland-Specific Rules</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
            {[
              { rule: 'Cedar Shake + Solar', detail: 'Portland Fire Marshal requires fire-rated underlayment beneath solar panels on cedar shake roofs. Some installers refuse cedar shake entirely due to fire classification concerns. Consider replacing cedar with Class A material before solar.' },
              { rule: 'HOA Restrictions', detail: 'Oregon law (ORS 105.880) limits HOA ability to prohibit solar installations, but HOAs can impose reasonable aesthetic requirements (e.g., panel placement, visibility from street). Review CC&Rs before contracting.' },
              { rule: 'Historic District Rules', detail: 'Portland\u2019s 5 Landmark Districts require design review for solar panels visible from public right-of-way. Conservation Districts are less restrictive but still require notification. Rear-facing and low-visibility installations are generally approved.' },
            ].map((row, i) => (
              <div key={row.rule} style={{ background: i % 2 === 0 ? '#fff' : 'var(--bg2)', padding: '1.5rem' }}>
                <div style={{ ...c, fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.3rem' }}>{row.rule}</div>
                <div style={{ ...f, fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300 }}>{row.detail}</div>
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
              <div style={{ ...m, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Planning a Solar-Ready Roof?</div>
              <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>Get quotes from Portland contractors experienced with solar-ready installations.</p>
            </div>
            <ModalTriggerBtn style={{ display: 'inline-block', background: 'var(--amber-btn)', color: '#000', ...c, fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.8rem 2rem', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Get Free Quotes →</ModalTriggerBtn>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
