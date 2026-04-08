import type { Metadata } from 'next'
import Link                  from 'next/link'
import Nav                   from '@/components/Nav'
import Footer                from '@/components/Footer'
import ContractorApplyForm   from '@/components/ContractorApplyForm'
import { SITE }              from '@/lib/config'

export const metadata: Metadata = {
  title:       `Join the Portland Roofings Contractor Network | ${SITE.name}`,
  description: 'Apply to join Portland\'s most rigorous contractor vetting platform. CCB-licensed Oregon roofing contractors only. 47-point verification process.',
  alternates:  { canonical: `${SITE.baseUrl}/contractors/apply` },
  robots:      { index: false }, // Don't need this indexed — it's a pipeline page
}

const vetPoints = [
  { num: '01', label: 'CCB Licence Verified',        note: 'Active Oregon CCB status confirmed at oregon.gov/ccb' },
  { num: '02', label: 'Insurance Confirmed',          note: 'COI requested and reviewed — minimum $1M GL' },
  { num: '03', label: 'Review Authenticity Check',   note: 'Google and BBB reviews audited for pattern anomalies' },
  { num: '04', label: 'Project History Review',       note: 'Minimum 3 verifiable Portland metro references' },
  { num: '05', label: 'Historic District Experience', note: 'Assessed for relevant neighbourhoods in coverage area' },
  { num: '06', label: 'Response Time Test',           note: 'Contractors must respond to test lead within 4 hours' },
]

export default function ContractorsApplyPage() {
  return (
    <>
      <Nav />

      {/* Breadcrumb */}
      <div style={{ padding: '0.8rem 2rem', borderBottom: '1px solid var(--bdr)', background: 'var(--bg2)' }}>
        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--muted)', display: 'flex', gap: '0.5rem' }}>
          <Link href="/" style={{ color: 'var(--amber)', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link href="/contractors/vetting" style={{ color: 'var(--muted)', textDecoration: 'none' }}>For Contractors</Link>
          <span>›</span>
          <span style={{ color: 'var(--text)' }}>Apply</span>
        </div>
      </div>

      {/* Page split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '90vh', borderBottom: '1px solid var(--bdr)' }} className="grid-hero">

        {/* Left — pitch */}
        <div className="grid-bg" style={{ padding: 'clamp(2.5rem,5vw,5rem) clamp(1.5rem,4vw,3.5rem)', borderRight: '1px solid var(--bdr)', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(10,11,13,0.8) 0%,rgba(10,11,13,0.95) 100%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.72rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
              ▸ For Oregon CCB-Licensed Contractors
            </div>
            <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', lineHeight: 0.9, color: 'var(--text)', marginBottom: '1.5rem' }}>
              JOIN THE<br />NETWORK.<br /><span style={{ color: 'var(--amber)' }}>OWN THE SHELF.</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '1rem', color: 'var(--muted)', maxWidth: '440px', lineHeight: 1.75, fontWeight: 300, marginBottom: '2.5rem' }}>
              We already rank for roofing searches across 50 Portland metro neighborhoods. The leads are coming in. We're vetting contractors to fill the listed slots — and only the top 1% pass.
            </p>

            {/* Mini checklist */}
            <div style={{ marginBottom: '2rem' }}>
              {[
                'Leads delivered directly — no bidding, no marketplace fee',
                'Your profile shown on 50+ neighborhood pages',
                'We market your listing — you just answer the phone',
                '47-point vetting gives homeowners confidence before they call',
              ].map(item => (
                <div key={item} style={{ display: 'flex', gap: '0.75rem', padding: '0.6rem 0', borderBottom: '1px solid var(--bdr)' }}>
                  <span style={{ color: 'var(--green)', flexShrink: 0, fontFamily: 'var(--font-space-mono)', fontSize: '0.8rem' }}>✓</span>
                  <span style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.92rem', color: 'var(--muted)' }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Vetting preview */}
            <div>
              <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>Sample Vetting Checkpoints</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {vetPoints.map(({ num, label }) => (
                  <div key={num} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '1rem', color: 'var(--bdr)', flexShrink: 0, lineHeight: 1.2 }}>{num}</span>
                    <span style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.4 }}>{label}</span>
                  </div>
                ))}
              </div>
              <Link href="/contractors/vetting" style={{ display: 'inline-block', marginTop: '1rem', fontFamily: 'var(--font-barlow-cond)', fontSize: '0.82rem', color: 'var(--amber)', textDecoration: 'underline', textDecorationColor: 'rgba(245,166,35,0.4)', textUnderlineOffset: '3px' }}>
                See all 47 checkpoints →
              </Link>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div style={{ padding: 'clamp(2.5rem,5vw,4rem) clamp(1.5rem,4vw,3rem)', background: 'var(--bg2)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <ContractorApplyForm />
        </div>
      </div>

      <Footer />
    </>
  )
}
