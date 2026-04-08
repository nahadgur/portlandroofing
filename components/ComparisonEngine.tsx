'use client'

import { useState } from 'react'

type Material = 'asphalt' | 'metal'

const data = {
  asphalt: {
    label:     'Asphalt Architectural',
    costRange: '$7,500 – $12,000',
    costLow:   7500, costHigh: 12000,
    lifespan:  28,
    annualCost: Math.round(9750 / 28),
    rainScore: 72,
    windScore: 58,
    mossMould: 'HIGH RISK',
    mossColor: '#E63946',
    weightLbs: 250,
    co2:       'Moderate',
    portland: [
      'Moss growth common after 5–7 years — budget for annual cleaning',
      'Algae-resistant (AR) shingles strongly recommended for PNW climate',
      'Class 4 impact rating available — can lower insurance premiums',
      'Most Portland roofers experienced with asphalt — competitive pricing',
      'Historic districts may restrict colour but material itself is acceptable',
    ],
    verdict: 'Best for homeowners planning to sell within 10–15 years or working to a budget. Easiest to permit across all 50 Portland neighborhoods including historic districts.',
  },
  metal: {
    label:     'Metal Standing Seam',
    costRange: '$14,000 – $24,000',
    costLow:   14000, costHigh: 24000,
    lifespan:  55,
    annualCost: Math.round(19000 / 55),
    rainScore: 97,
    windScore: 94,
    mossMould: 'NEGLIGIBLE',
    mossColor: '#2ECC71',
    weightLbs: 100,
    co2:       'Low (recyclable)',
    roiYears:  18,   // break-even vs asphalt — only shown when metal is active
    portland: [
      'Ideal for PDX — water sheds instantly, no absorption, no moss',
      'Standing seam handles wind uplift significantly better than shingles',
      "Approved by Portland's historic boards when colour-matched correctly",
      'Specialist contractor pool is smaller — vet carefully before hiring',
      'Can qualify for Oregon Energy Trust rebates if paired with insulation',
    ],
    verdict: "Best for long-term owners, high-wind zones (West Hills, Council Crest, Alameda Ridge), and anyone staying 15+ years. The annual cost per year beats asphalt over the roof's lifetime.",
  },
}

export default function ComparisonEngine() {
  const [active, setActive] = useState<Material>('asphalt')
  const d = data[active]

  const barStyle = (score: number): React.CSSProperties => ({
    height: '100%', width: `${score}%`, background: 'var(--amber)', transition: 'width 0.5s ease',
  })

  // Build metrics list — exclude break-even when asphalt is active (meaningless self-comparison)
  const metrics: { key: string; label: string; format: (v: unknown) => string }[] = [
    { key: 'costRange',  label: 'Project Cost',      format: v => String(v) },
    { key: 'lifespan',   label: 'Lifespan',          format: v => `${v} years` },
    { key: 'annualCost', label: 'Annual Cost / Year', format: v => `$${Number(v).toLocaleString()}` },
    ...(active === 'metal'
      ? [{ key: 'roiYears', label: 'Break-even vs Asphalt', format: (v: unknown) => `${v} years` }]
      : []
    ),
    { key: 'weightLbs', label: 'Weight (per sq)',    format: v => `${v} lbs` },
    { key: 'co2',       label: 'Environmental',      format: v => String(v) },
  ]

  const btnBase: React.CSSProperties = {
    padding: '0.55rem 1.4rem', background: 'transparent',
    color: 'var(--muted)', border: 'none', cursor: 'pointer',
    fontFamily: 'var(--font-barlow-cond)', fontWeight: 700,
    fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase',
    transition: 'all 0.2s',
  }

  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--bdr)' }}>

      {/* Header + toggle */}
      <div style={{ padding: '1.8rem 2rem', borderBottom: '1px solid var(--bdr)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
            ▸ Portland Climate Analysis
          </div>
          <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text)', lineHeight: 1 }}>
            METAL VS ASPHALT
          </h3>
        </div>
        <div style={{ display: 'flex', background: 'var(--bg3)', border: '1px solid var(--bdr)', padding: '3px' }}>
          {(['asphalt', 'metal'] as Material[]).map(m => (
            <button key={m} onClick={() => setActive(m)} style={{
              ...btnBase,
              background: active === m ? 'var(--amber)' : 'transparent',
              color: active === m ? '#000' : 'var(--muted)',
            }}>
              {m === 'asphalt' ? 'Asphalt' : 'Metal'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'var(--bdr)' }}>

        {/* PDX scores */}
        <div style={{ background: 'var(--bg)', padding: '1.8rem' }}>
          <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
            PDX Performance Scores
          </div>
          {[
            { label: 'Rain Resistance', score: d.rainScore },
            { label: 'Wind Resistance', score: d.windScore },
          ].map(({ label, score }) => (
            <div key={label} style={{ marginBottom: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '0.88rem', color: 'var(--text)' }}>{label}</span>
                <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.2rem', color: 'var(--amber)', lineHeight: 1 }}>{score}/100</span>
              </div>
              <div style={{ height: '6px', background: 'var(--bdr)' }}>
                <div style={barStyle(score)} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: '1.5rem', padding: '0.8rem', background: 'var(--bg2)', border: '1px solid var(--bdr)' }}>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>MOSS & MOULD RISK</div>
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.1rem', color: d.mossColor }}>{d.mossMould}</div>
          </div>
        </div>

        {/* Specs */}
        <div style={{ background: 'var(--bg)', padding: '1.8rem' }}>
          <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
            Key Figures
          </div>
          {metrics.map(({ key, label, format }) => (
            <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid var(--bdr)' }}>
              <span style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.88rem', color: 'var(--muted)' }}>{label}</span>
              <span style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)', textAlign: 'right', maxWidth: '55%' }}>
                {format((d as Record<string, unknown>)[key])}
              </span>
            </div>
          ))}
        </div>

        {/* Portland factors */}
        <div style={{ background: 'var(--bg)', padding: '1.8rem' }}>
          <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
            Portland-Specific Factors
          </div>
          <ul style={{ listStyle: 'none' }}>
            {d.portland.map(point => (
              <li key={point} style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.55, padding: '0.5rem 0', borderBottom: '1px solid var(--bdr)', display: 'flex', gap: '0.6rem' }}>
                <span style={{ color: 'var(--amber)', flexShrink: 0, marginTop: '0.1rem' }}>▸</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Verdict */}
      <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid var(--bdr)', background: 'rgba(245,166,35,0.04)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', flexShrink: 0, paddingTop: '0.1rem' }}>Verdict</div>
        <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.65, fontWeight: 300 }}>{d.verdict}</p>
      </div>

      {/* CTA */}
      <div style={{ padding: '1.2rem 2rem', borderTop: '1px solid var(--bdr)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.88rem', color: 'var(--muted)' }}>
          Get quotes for {d.label.toLowerCase()} from vetted Portland contractors.
        </span>
        <a href="/#quote" style={{ background: 'var(--amber)', color: '#000', fontFamily: 'var(--font-barlow-cond)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.65rem 1.5rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Get {active === 'asphalt' ? 'Asphalt' : 'Metal'} Quotes →
        </a>
      </div>
    </div>
  )
}
