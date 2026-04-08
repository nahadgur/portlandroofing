import { neighborhoods } from '@/lib/neighborhoods'

// Pull 7 representative zones sorted by avg cost — stays in sync with lib/neighborhoods.ts
const ZONES = [
  'west-hills',
  'lake-oswego',
  'alameda',
  'pearl-district',
  'hawthorne',
  'st-johns',
  'gresham',
]

export default function PriceIndex() {
  const rows = ZONES
    .map(slug => neighborhoods.find(n => n.slug === slug))
    .filter(Boolean) as typeof neighborhoods

  const maxCost = Math.max(...rows.map(n => n.avgCost))

  return (
    <section id="index" className="section-pad" style={{ background: 'var(--bg2)' }}>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
          [ PDX Roofing Price Index ]
        </div>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem,3.5vw,3.5rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.5rem' }}>
          COST BY ZONE
        </h2>
        <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.95rem', color: 'var(--muted)', maxWidth: '520px', fontWeight: 300 }}>
          Updated quarterly. Based on verified contractor quotes across the Portland metro.
        </p>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Zone / Neighborhood', 'Avg. Project Cost', 'Range', 'Index vs PDX Avg', 'Common Type'].map(h => (
                <th key={h} style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', padding: '0.7rem 1rem', borderBottom: '1px solid var(--bdr)', textAlign: 'left' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(n => {
              const isAvg  = n.slug === 'hawthorne' // closest to PDX avg
              const barPct = Math.round((n.avgCost / maxCost) * 100)
              return (
                <tr key={n.slug} style={{ background: isAvg ? 'rgba(245,166,35,0.04)' : undefined }}>
                  <td style={{ padding: '1rem', borderBottom: '1px solid var(--bdr)', fontFamily: 'var(--font-barlow-cond)', fontSize: '0.95rem', fontWeight: 600, color: isAvg ? 'var(--amber)' : 'var(--text)' }}>
                    {n.name}{isAvg ? ' ≈ PDX Avg' : ''}
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid var(--bdr)', fontFamily: 'var(--font-bebas)', fontSize: '1.3rem', color: 'var(--amber)' }}>
                    ${n.avgCost.toLocaleString()}
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid var(--bdr)', fontFamily: 'var(--font-space-mono)', fontSize: '0.7rem', color: 'var(--muted)' }}>
                    {n.range}
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid var(--bdr)', width: '140px' }}>
                    <div className="pi-bar">
                      <div className="pi-bar-fill" style={{ width: `${barPct}%` }} />
                    </div>
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid var(--bdr)' }}>
                    <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'rgba(245,166,35,0.08)', color: 'var(--amber)', border: '1px solid rgba(245,166,35,0.2)', display: 'inline-block' }}>
                      {n.commonMaterial}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
