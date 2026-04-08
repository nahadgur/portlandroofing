const heroStats = [
  { num: '50+',   label: 'Neighborhoods Covered' },
  { num: '$9.4K', label: 'Avg. Project Value' },
  { num: '48h',   label: 'Quote Response' },
]

export default function Hero() {
  return (
    <div className="grid-bg" style={{
      padding: 'clamp(2.5rem, 5vw, 5rem) clamp(1.5rem, 4vw, 3rem) clamp(2.5rem, 5vw, 4rem)',
      borderRight: '1px solid var(--bdr)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg,rgba(10,11,13,0.75) 0%,rgba(10,11,13,0.93) 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Eyebrow */}
        <div style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: 'clamp(0.72rem, 1.8vw, 0.82rem)',
          color: 'var(--amber)', letterSpacing: '0.15em',
          textTransform: 'uppercase', marginBottom: '1.2rem',
        }}>
          ▸ Portland Metro Roofing Authority
        </div>

        {/* H1 — minimum now 3rem so it's always big on mobile */}
        <h1 style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(3.2rem, 8vw, 6rem)',
          lineHeight: 0.9, letterSpacing: '0.02em',
          color: 'var(--text)', marginBottom: '1.5rem',
        }}>
          THE ONLY<br />
          ROOFING<br />
          PLATFORM<br />
          <span style={{ color: 'var(--amber)' }}>PDX TRUSTS.</span>
        </h1>

        {/* Sub */}
        <p style={{
          fontFamily: 'var(--font-barlow)',
          fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
          color: 'var(--muted)', maxWidth: '440px',
          lineHeight: 1.7, marginBottom: '2rem', fontWeight: 300,
        }}>
          We vet, rank, and connect Portland homeowners with the top 1% of roofing
          contractors — with real pricing data across 50+ neighborhoods.
        </p>

        {/* Stats */}
        <div className="hero-stats-row" style={{
          display: 'flex', gap: '2rem',
          marginTop: '2rem', paddingTop: '2rem',
          borderTop: '1px solid var(--bdr)',
        }}>
          {heroStats.map(({ num, label }) => (
            <div key={label}>
              <div style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(2rem, 4vw, 2.4rem)',
                color: 'var(--amber)', lineHeight: 1,
              }}>
                {num}
              </div>
              <div style={{
                fontFamily: 'var(--font-barlow-cond)',
                fontSize: 'clamp(0.72rem, 1.5vw, 0.8rem)',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--muted)', marginTop: '0.2rem',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
