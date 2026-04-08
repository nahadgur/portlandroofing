import { contractors } from '@/lib/contractors'
import CCBBadge        from '@/components/CCBBadge'

export default function ContractorGrid() {
  return (
    <section id="contractors" className="section-pad" style={{ background: 'var(--bg)' }}>

      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
          [ Verified Provider Network ]
        </div>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem,3.5vw,3.5rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.5rem' }}>
          TOP RATED IN PDX
        </h2>
        <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.95rem', color: 'var(--muted)', maxWidth: '560px', fontWeight: 300 }}>
          Every listed contractor passes our 47-point checklist. Oregon CCB licence status is verified directly at{' '}
          <a href="https://search.ccb.state.or.us" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--amber)', textDecoration: 'underline', textDecorationColor: 'rgba(245,166,35,0.4)', textUnderlineOffset: '3px' }}>
            oregon.gov/ccb
          </a>
          {' '}— you can confirm it yourself in one click.
        </p>
      </div>

      {/* Grid */}
      <div className="grid-contractors">
        {contractors.map(c => (
          <div key={c.id} style={{ background: 'var(--bg2)', padding: '1.8rem', position: 'relative', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Rank watermark */}
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '4rem', color: 'var(--bdr)', position: 'absolute', top: '1rem', right: '1.5rem', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
              {c.rank}
            </div>

            {/* Status badge */}
            <div
              className={`mono-badge ${c.status === 'vetting' ? 'badge-vetting' : 'badge-coming'}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', width: 'fit-content' }}
            >
              <span className="blink" style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
              {c.status === 'vetting' ? 'Vetting in Progress' : 'Coming Soon'}
            </div>

            {/* Name & area */}
            <div>
              <div style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.25rem' }}>
                {c.name}
              </div>
              <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--muted)' }}>
                {c.area}
              </div>
            </div>

            {/* ── CCB BADGE ── */}
            <CCBBadge
              ccbNumber={c.ccbNumber}
              ccbStatus={c.ccbStatus}
              ccbLastVerified={c.ccbLastVerified}
            />

            {/* Specs */}
            <ul style={{ listStyle: 'none', flex: 1 }}>
              {c.liabilityAmount !== 'Verification pending' && (
                <li style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.85rem', color: 'var(--muted)', padding: '0.35rem 0', borderBottom: '1px solid var(--bdr)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--bdr)', fontSize: '0.7rem', flexShrink: 0 }}>—</span>
                  GL Insurance: {c.liabilityAmount}
                </li>
              )}
              {c.specialities.map(s => (
                <li key={s} style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.85rem', color: 'var(--muted)', padding: '0.35rem 0', borderBottom: '1px solid var(--bdr)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--bdr)', fontSize: '0.7rem', flexShrink: 0 }}>—</span>
                  {s}
                </li>
              ))}
              {c.responseTime && (
                <li style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.85rem', color: 'var(--muted)', padding: '0.35rem 0', borderBottom: '1px solid var(--bdr)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--bdr)', fontSize: '0.7rem', flexShrink: 0 }}>—</span>
                  Avg. response: {c.responseTime}
                </li>
              )}
              {c.note && (
                <li style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.82rem', color: 'var(--muted)', padding: '0.5rem 0', fontStyle: 'italic', lineHeight: 1.5 }}>
                  {c.note}
                </li>
              )}
            </ul>

            {/* CTA */}
            <button style={{
              width: '100%', padding: '0.75rem',
              background: 'transparent', border: '1px solid var(--amber)',
              color: 'var(--amber)',
              fontFamily: 'var(--font-barlow-cond)', fontSize: '0.85rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.2s',
            }}>
              {c.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Footer note — legal clarity */}
      <div style={{ marginTop: '1.5rem', padding: '1rem 1.2rem', background: 'var(--bg2)', border: '1px solid var(--bdr)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0, paddingTop: '0.1rem' }}>Note</span>
        <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          CCB numbers displayed are verified manually by Portland Roofings staff at the time of vetting and may not reflect real-time licence status. Always confirm a contractor's current CCB status directly at{' '}
          <a href="https://search.ccb.state.or.us" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--amber)' }}>search.ccb.state.or.us</a>{' '}
          before signing a contract. Portland Roofings is an independent referral platform and is not affiliated with the Oregon Construction Contractors Board.
        </p>
      </div>
    </section>
  )
}
