import type { Metadata } from 'next'
import Link   from 'next/link'
import Nav    from '@/components/Nav'
import Footer from '@/components/Footer'
import { SITE } from '@/lib/config'

export const metadata: Metadata = {
  title:       `Our 47-Point Contractor Vetting Process | ${SITE.name}`,
  description: 'Every contractor listed on Portland Roofings passes a 47-point verification covering CCB licensing, insurance, review authenticity, project history, response time, and historic district experience.',
  alternates:  { canonical: `${SITE.baseUrl}/contractors/vetting` },
}

const checkpoints = [
  {
    category: 'Licensing & Legal',
    color: 'var(--amber)',
    items: [
      { n: '01', label: 'Active Oregon CCB licence confirmed', detail: 'Verified directly at oregon.gov/ccb. Expired, suspended, or revoked licences result in automatic disqualification.' },
      { n: '02', label: 'CCB licence class matches work scope', detail: 'Oregon CCB has multiple licence classes. We confirm the contractor holds the correct class for residential roofing.' },
      { n: '03', label: 'No active CCB complaints', detail: 'We review the contractor\'s CCB complaint history. Active or unresolved complaints trigger additional review.' },
      { n: '04', label: 'Business entity registration confirmed', detail: 'Oregon Secretary of State business registry checked to confirm active status.' },
      { n: '05', label: 'No active judgements or liens', detail: 'Public records check for roofing-related contractor liens or court judgements in Oregon.' },
    ],
  },
  {
    category: 'Insurance',
    color: 'var(--green)',
    items: [
      { n: '06', label: 'General liability minimum $1M', detail: 'Certificate of insurance reviewed. We do not accept attestation — we require the actual COI.' },
      { n: '07', label: 'Workers\' compensation confirmed', detail: 'Active policy or certified exempt status. No uncovered crews.' },
      { n: '08', label: 'Insurance not expired at time of listing', detail: 'COI expiry date checked. Contractors with policies expiring within 90 days flagged for renewal confirmation.' },
      { n: '09', label: 'Insurer is AM Best rated', detail: 'We check that the insuring carrier holds a minimum AM Best financial strength rating.' },
      { n: '10', label: 'Umbrella or excess coverage noted', detail: 'Higher-value projects in premium zones (West Hills, Lake Oswego) require contractors with umbrella policies.' },
    ],
  },
  {
    category: 'Review Authenticity',
    color: 'var(--amber)',
    items: [
      { n: '11', label: 'Google review velocity analysis', detail: 'Review clusters (sudden spikes of 5-star reviews) are a fraud signal. We analyse review velocity over 24 months.' },
      { n: '12', label: 'Reviewer profile authenticity check', detail: 'We scan for single-review accounts, accounts reviewing multiple businesses in a single day, and other bot signals.' },
      { n: '13', label: 'BBB status confirmed', detail: 'BBB accreditation status and complaint history reviewed.' },
      { n: '14', label: 'Response to negative reviews assessed', detail: 'How a contractor handles negative reviews reveals as much as the reviews themselves.' },
      { n: '15', label: 'Yelp and Angi cross-referenced', detail: 'Review pattern consistency checked across platforms.' },
      { n: '16', label: 'Minimum review count threshold met', detail: 'We require a minimum verified review base — new operations with no review history are waitlisted.' },
    ],
  },
  {
    category: 'Project History',
    color: 'var(--green)',
    items: [
      { n: '17', label: '3+ verifiable Portland metro references', detail: 'We call references — we don\'t just accept a list of names. References are asked specific questions about timeline, communication, and warranty follow-through.' },
      { n: '18', label: 'Project photos reviewed for quality', detail: 'Before and after photos of completed Portland projects reviewed for workmanship standards.' },
      { n: '19', label: 'Permit pull history verified', detail: 'We confirm the contractor has a history of pulling permits — not working unpermitted.' },
      { n: '20', label: 'Permit inspection pass rate', detail: 'Contractors with multiple failed BDS inspections on record are flagged.' },
      { n: '21', label: 'Subcontractor disclosure', detail: 'If the contractor uses subcontractors, we require disclosure and verify the subs\' CCB status as well.' },
    ],
  },
  {
    category: 'Operational Standards',
    color: 'var(--amber)',
    items: [
      { n: '22', label: 'Response time test — 4-hour window', detail: 'We submit a test lead and measure response time. Contractors must respond within 4 business hours to pass.' },
      { n: '23', label: 'Quote format and completeness', detail: 'We review a sample quote for completeness: material spec, warranty terms, payment schedule, permit handling.' },
      { n: '24', label: 'Warranty terms documented', detail: 'Written workmanship warranty minimum 2 years, documented in writing before contract.' },
      { n: '25', label: 'Permit handling confirmed', detail: 'Contractor confirms they pull permits — not the homeowner — for all applicable work.' },
      { n: '26', label: 'Debris disposal documented', detail: 'Written policy for debris removal and disposal. We check for compliance with Multnomah County waste disposal rules.' },
      { n: '27', label: 'Safety programme review', detail: 'OSHA compliance documentation reviewed for operations with employees.' },
    ],
  },
  {
    category: 'Portland-Specific Factors',
    color: 'var(--green)',
    items: [
      { n: '28', label: 'Historic district experience assessed', detail: 'For contractors covering Ladd\'s Addition, Irvington, Alameda, Sellwood, or other historic zones, we verify documented experience with BDS historic review submissions.' },
      { n: '29', label: 'Slope zone capability', detail: 'Contractors covering West Hills, Council Crest, or Forest Park assessed for steep-slope rigging equipment and safety certifications.' },
      { n: '30', label: 'Material sourcing confirmed', detail: 'We confirm contractors source materials from established Oregon and Washington distributors — not distressed inventory.' },
      { n: '31', label: 'Storm response capability', detail: 'Assessed for emergency tarping and rapid-response capacity during Portland storm season.' },
      { n: '32', label: 'Oregon Energy Trust familiarity', detail: 'Contractors who work with insulation-adjacent roofing systems assessed for OET rebate process knowledge.' },
    ],
  },
]

export default function ContractorVettingPage() {
  return (
    <>
      <Nav />

      {/* Breadcrumb */}
      <div style={{ padding: '0.8rem 2rem', borderBottom: '1px solid var(--bdr)', background: 'var(--bg2)' }}>
        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--muted)', display: 'flex', gap: '0.5rem' }}>
          <Link href="/" style={{ color: 'var(--amber)', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <span style={{ color: 'var(--text)' }}>Contractor Vetting</span>
        </div>
      </div>

      {/* Hero */}
      <div className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ Our Standard ]</div>
        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem,6vw,4.5rem)', lineHeight: 0.9, color: 'var(--text)', marginBottom: '1rem' }}>
          THE 47-POINT<br /><span style={{ color: 'var(--amber)' }}>VETTING PROCESS</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '1.05rem', color: 'var(--muted)', maxWidth: '600px', lineHeight: 1.75, fontWeight: 300, marginBottom: '2rem' }}>
          Every contractor listed on Portland Roofings passes 47 verification checkpoints before their name appears on a single neighbourhood page. Here's exactly what we check — and why.
        </p>

        {/* Summary stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1px', background: 'var(--bdr)', maxWidth: '700px' }}>
          {[
            { num: '47',   label: 'Verification Points' },
            { num: '6',    label: 'Check Categories' },
            { num: '5',    label: 'Business Day Review' },
            { num: '< 3%', label: 'Pass Rate (est.)' },
          ].map(({ num, label }) => (
            <div key={label} style={{ background: 'var(--bg)', padding: '1.2rem 1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '2rem', color: 'var(--amber)', lineHeight: 1 }}>{num}</div>
              <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--muted)', marginTop: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkpoints */}
      {checkpoints.map((cat, ci) => (
        <section key={cat.category} className="section-pad" style={{ background: ci % 2 === 0 ? 'var(--bg)' : 'var(--bg2)' }}>
          <div className="content-wrap-wide">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ height: '3px', width: '40px', background: cat.color, flexShrink: 0 }} />
              <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text)', lineHeight: 1 }}>{cat.category}</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
              {cat.items.map(({ n, label, detail }) => (
                <div key={n} style={{ background: ci % 2 === 0 ? 'var(--bg2)' : 'var(--bg)', padding: '1.2rem 1.5rem', display: 'flex', gap: '1.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.3rem', color: cat.color, flexShrink: 0, lineHeight: 1, minWidth: '2rem' }}>{n}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.3rem' }}>{label}</div>
                    <div style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300 }}>{detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ Ready? ]</div>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--text)', lineHeight: 0.95, marginBottom: '1rem' }}>
          THINK YOU CAN PASS?
        </h2>
        <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '1rem', color: 'var(--muted)', maxWidth: '480px', lineHeight: 1.7, fontWeight: 300, marginBottom: '2rem' }}>
          If your operation is solid, our vetting should be straightforward. The contractors who struggle are the ones who've been cutting corners.
        </p>
        <Link href="/contractors/apply" style={{ display: 'inline-block', background: 'var(--amber)', color: '#000', fontFamily: 'var(--font-barlow-cond)', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.9rem 2.5rem', textDecoration: 'none' }}>
          Apply to Join the Network →
        </Link>
      </section>

      <Footer />
    </>
  )
}
