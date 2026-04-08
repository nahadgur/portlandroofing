import type { ReactNode } from 'react'

const stats = [
  { num: '50+',   label: 'Neighborhoods Covered' },
  { num: '$9.4K', label: 'Avg. Project Value' },
  { num: '48h',   label: 'Quote Response Time' },
]

interface Props {
  children?: ReactNode   // receives the floating form card from page.tsx
}

export default function Hero({ children }: Props) {
  return (
    <div className="hero-wrap">

      {/* Full-bleed background photo */}
      <div className="hero-bg" />

      {/* Content grid over photo */}
      <div className="hero-content">

        {/* LEFT — headline + stats */}
        <div>
          {/* Eyebrow */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.8rem',
            fontFamily: 'var(--font-space-mono)',
            fontSize: '0.72rem', color: '#F5A623',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            marginBottom: '1.2rem', whiteSpace: 'nowrap', flexWrap: 'nowrap',
          }}>
            <span style={{ display: 'block', width: 32, height: 1, background: '#F5A623', flexShrink: 0 }} />
            PDX Roofing Authority
          </div>

          {/* Amber accent bar */}
          <div style={{ width: 48, height: 3, background: '#F5A623', marginBottom: '1.5rem' }} />

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(3.5rem, 6vw, 7rem)',
            lineHeight: 0.87,
            color: '#fff',
            letterSpacing: '0.02em',
            marginBottom: '1.5rem',
          }}>
            THE ONLY<br />
            ROOFING<br />
            PLATFORM<br />
            <span style={{ color: '#F5A623' }}>PDX TRUSTS.</span>
          </h1>

          {/* Subheadline */}
          <p style={{
            fontFamily: 'var(--font-barlow)',
            fontSize: 'clamp(1rem, 2vw, 1.1rem)',
            color: 'rgba(255,255,255,0.68)',
            maxWidth: '440px',
            lineHeight: 1.75,
            fontWeight: 300,
            marginBottom: '2.5rem',
          }}>
            We vet, rank, and connect Portland homeowners with the top 1% of roofing
            contractors — with real pricing data across 50+ neighborhoods.
          </p>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: '2.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.15)',
          }}>
            {stats.map(({ num, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
                  color: '#F5A623',
                  lineHeight: 1,
                }}>
                  {num}
                </div>
                <div style={{
                  fontFamily: 'var(--font-barlow-cond)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.42)',
                  marginTop: '0.25rem',
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — floating form card (injected from page) */}
        {children}
      </div>
    </div>
  )
}
