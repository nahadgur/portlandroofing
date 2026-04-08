'use client'

import { useState } from 'react'

type Material = 'asphalt' | 'metal' | 'cedar' | 'flat'

interface ComparisonEngineProps {
  defaultTab?: Material   // set by service page for contextual default
  neighborhood?: string  // for localised cost data
  avgCost?: number       // neighbourhood average, used in break-even
}

const MATERIALS: Record<Material, { label: string; color: string }> = {
  asphalt: { label: 'Asphalt',     color: '#6B6860' },
  metal:   { label: 'Metal',       color: '#C8780A' },
  cedar:   { label: 'Cedar Shake', color: '#7C4A1E' },
  flat:    { label: 'Flat / TPO',  color: '#1A7A3A' },
}

interface Row {
  label:    string
  asphalt:  string
  metal:    string
  cedar:    string
  flat:     string
  winner?:  Material | 'tie'
}

const ROWS: Row[] = [
  {
    label:   'Portland install cost (avg)',
    asphalt: '$7,500–$12,000',
    metal:   '$16,000–$22,000',
    cedar:   '$14,500–$18,500',
    flat:    '$7,200–$11,500',
    winner:  'asphalt',
  },
  {
    label:   'Functional lifespan in PDX',
    asphalt: '18–24 yrs',
    metal:   '50–60 yrs',
    cedar:   '22–28 yrs (maintained)',
    flat:    '15–22 yrs',
    winner:  'metal',
  },
  {
    label:   'Moss susceptibility',
    asphalt: 'High',
    metal:   'None',
    cedar:   'High',
    flat:    'Low',
    winner:  'metal',
  },
  {
    label:   'Fire rating',
    asphalt: 'Class A',
    metal:   'Class A',
    cedar:   'Class B',
    flat:    'Class A',
    winner:  'tie',
  },
  {
    label:   'Contractor availability PDX',
    asphalt: '200+ contractors',
    metal:   '31 certified',
    cedar:   '31 certified',
    flat:    '45+ contractors',
    winner:  'asphalt',
  },
  {
    label:   'Annual maintenance cost',
    asphalt: '$300–$550 (moss)',
    metal:   '$0',
    cedar:   '$350–$600 (moss + inspect)',
    flat:    '$150–$300 (inspect)',
    winner:  'metal',
  },
  {
    label:   'Portland permit complexity',
    asphalt: 'Standard',
    metal:   'Standard / Structural review in West Hills',
    cedar:   'Historic review in landmark districts',
    flat:    'Standard',
    winner:  'tie',
  },
  {
    label:   'Best suited for',
    asphalt: 'Most homeowners, <20yr horizon',
    metal:   '15+ yr tenure, premium properties',
    cedar:   'Historic districts, long-term owners',
    flat:    'Low-slope / commercial-adjacent',
    winner:  'tie',
  },
]

function winnerStyle(winner: Material | 'tie' | undefined, col: Material): React.CSSProperties {
  if (!winner || winner === 'tie') return {}
  if (winner === col) return { background: 'rgba(200,120,10,0.06)', fontWeight: 600 }
  return {}
}

export default function ComparisonEngine({ defaultTab = 'asphalt', neighborhood, avgCost = 9400 }: ComparisonEngineProps) {
  const [active, setActive] = useState<Material>(defaultTab)

  // Break-even: only meaningful when comparing metal to something else
  const metalPremium  = 19000 - avgCost
  const maintenanceSavings = 400 * Math.floor(50 / 3) // ~$6,700 saved over 50 yrs
  const breakEvenYears = Math.round(metalPremium / (maintenanceSavings / 50))

  const m = { fontFamily:'var(--font-space-mono)' } as const
  const c = { fontFamily:'var(--font-barlow-cond)' } as const
  const b = { fontFamily:'var(--font-barlow)' } as const
  const d = { fontFamily:'var(--font-bebas)' } as const

  return (
    <div>
      {/* Material tabs */}
      <div style={{ display:'flex', gap:'1px', background:'var(--bdr)', marginBottom:'1px', flexWrap:'wrap' }}>
        {(Object.entries(MATERIALS) as [Material, { label: string; color: string }][]).map(([key, { label, color }]) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            style={{
              flex: '1 1 auto',
              padding: '0.75rem 1rem',
              background: active === key ? '#0A0B0D' : '#fff',
              color:      active === key ? '#F5A623'  : 'var(--muted)',
              border:     'none',
              cursor:     'pointer',
              ...c,
              fontSize:       '0.8rem',
              fontWeight:     700,
              letterSpacing:  '0.08em',
              textTransform:  'uppercase',
              borderBottom:   active === key ? `3px solid ${color}` : '3px solid transparent',
              transition:     'all 0.15s',
              whiteSpace:     'nowrap',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Comparison table */}
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:'#0A0B0D' }}>
              <th style={{ ...m, fontSize:'0.65rem', color:'rgba(255,255,255,0.4)', letterSpacing:'0.1em', textTransform:'uppercase', padding:'0.9rem 1rem', textAlign:'left', whiteSpace:'nowrap' }}>
                Metric
              </th>
              <th style={{ ...m, fontSize:'0.65rem', color: active === 'asphalt' ? '#F5A623' : 'rgba(255,255,255,0.4)', letterSpacing:'0.1em', textTransform:'uppercase', padding:'0.9rem 1rem', textAlign:'left', whiteSpace:'nowrap' }}>
                Asphalt
              </th>
              <th style={{ ...m, fontSize:'0.65rem', color: active === 'metal' ? '#F5A623' : 'rgba(255,255,255,0.4)', letterSpacing:'0.1em', textTransform:'uppercase', padding:'0.9rem 1rem', textAlign:'left', whiteSpace:'nowrap' }}>
                Metal
              </th>
              <th style={{ ...m, fontSize:'0.65rem', color: active === 'cedar' ? '#F5A623' : 'rgba(255,255,255,0.4)', letterSpacing:'0.1em', textTransform:'uppercase', padding:'0.9rem 1rem', textAlign:'left', whiteSpace:'nowrap' }}>
                Cedar
              </th>
              <th style={{ ...m, fontSize:'0.65rem', color: active === 'flat' ? '#F5A623' : 'rgba(255,255,255,0.4)', letterSpacing:'0.1em', textTransform:'uppercase', padding:'0.9rem 1rem', textAlign:'left', whiteSpace:'nowrap' }}>
                Flat/TPO
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={row.label} style={{ background: i % 2 === 0 ? '#fff' : 'var(--bg2)' }}>
                <td style={{ ...m, fontSize:'0.65rem', color:'var(--muted)', letterSpacing:'0.06em', padding:'0.85rem 1rem', borderBottom:'1px solid var(--bdr)', verticalAlign:'top', textTransform:'uppercase' }}>
                  {row.label}
                </td>
                {(['asphalt','metal','cedar','flat'] as Material[]).map(col => (
                  <td
                    key={col}
                    style={{
                      ...b,
                      fontSize: '0.88rem',
                      color: active === col ? 'var(--text)' : 'var(--muted)',
                      fontWeight: active === col ? 400 : 300,
                      padding: '0.85rem 1rem',
                      borderBottom: '1px solid var(--bdr)',
                      verticalAlign: 'top',
                      opacity: active === col ? 1 : 0.5,
                      ...winnerStyle(row.winner, col),
                    }}
                  >
                    {row.winner === col && (
                      <span style={{ ...m, fontSize:'0.55rem', color:'var(--amber)', marginRight:'0.35rem', letterSpacing:'0.08em' }}>▲</span>
                    )}
                    {(row as unknown as Record<string, string>)[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Break-even — ONLY shows when metal tab is active */}
      {active === 'metal' && (
        <div style={{
          marginTop: '1px',
          padding: '1.2rem 1.5rem',
          background: 'rgba(200,120,10,0.06)',
          border: '1px solid rgba(200,120,10,0.2)',
          borderLeft: '3px solid var(--amber-btn)',
          display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center',
        }}>
          <div>
            <div style={{ ...m, fontSize:'0.6rem', color:'var(--amber)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'0.3rem' }}>Break-Even vs Asphalt</div>
            <div style={{ ...d, fontSize:'2rem', color:'var(--text)', lineHeight:1 }}>~{breakEvenYears} years</div>
          </div>
          <div>
            <div style={{ ...m, fontSize:'0.6rem', color:'var(--amber)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'0.3rem' }}>Premium Over Asphalt</div>
            <div style={{ ...d, fontSize:'2rem', color:'var(--text)', lineHeight:1 }}>${(metalPremium).toLocaleString()}</div>
          </div>
          <p style={{ ...b, fontSize:'0.82rem', color:'var(--muted)', lineHeight:1.65, fontWeight:300, maxWidth:'380px' }}>
            Based on {neighborhood ? `${neighborhood} avg of $${avgCost.toLocaleString()}` : `Portland metro avg of $${avgCost.toLocaleString()}`} for asphalt.
            Metal savings from eliminated moss treatment (~$400 every 3 years) offset the premium at this horizon.
          </p>
        </div>
      )}

      {/* Source note */}
      <div style={{ ...m, fontSize:'0.58rem', color:'var(--muted)', letterSpacing:'0.08em', padding:'0.6rem 1rem', background:'var(--bg2)', borderTop:'1px solid var(--bdr)' }}>
        PDX MARKET DATA 2026 · Portland Roofings · Costs reflect Portland metro contractor quotes · Lifespans reflect Pacific Northwest climate conditions
      </div>
    </div>
  )
}
