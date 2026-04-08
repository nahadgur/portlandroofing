const rows = [
  { zone: 'West Hills / Forest Park', price: '$13,200', range: '$10k–$22k', barPct: 100, type: 'Cedar Shake' },
  { zone: 'Lake Oswego',              price: '$12,400', range: '$9.5k–$19k', barPct: 94,  type: 'Metal / Cedar' },
  { zone: 'Alameda / Irvington',      price: '$11,000', range: '$8.5k–$16k', barPct: 83,  type: 'Asphalt Premium' },
  { zone: 'Pearl / NW District',      price: '$10,200', range: '$8k–$14k',   barPct: 77,  type: 'Flat / TPO' },
  { zone: 'PDX Average',              price: '$9,400',  range: '$6.5k–$14k', barPct: 71,  type: 'Asphalt', isAvg: true },
  { zone: 'SE Portland (general)',    price: '$8,700',  range: '$6k–$13k',   barPct: 66,  type: 'Asphalt' },
  { zone: 'St. Johns / N Portland',   price: '$7,800',  range: '$5.5k–$11k', barPct: 59,  type: 'Asphalt' },
]

export default function PriceIndex() {
  return (
    <section
      id="index"
      style={{ padding: '5rem 3rem', borderBottom: '1px solid var(--bdr)', background: 'var(--bg2)' }}
    >
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: '0.68rem', color: 'var(--amber)',
          letterSpacing: '0.15em', textTransform: 'uppercase',
          marginBottom: '0.8rem',
        }}>
          [ PDX Roofing Price Index ]
        </div>
        <h2 style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
          color: 'var(--text)', lineHeight: 1,
          marginBottom: '0.5rem',
        }}>
          COST BY ZONE
        </h2>
        <p style={{
          fontFamily: 'var(--font-barlow)',
          fontSize: '0.95rem', color: 'var(--muted)',
          maxWidth: '520px', fontWeight: 300,
        }}>
          Updated quarterly. Based on verified contractor quotes across the Portland metro.
        </p>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Zone / Neighborhood', 'Avg. Project Cost', 'Range', 'Index vs PDX Avg', 'Common Type'].map(h => (
                <th key={h} style={{
                  fontFamily: 'var(--font-space-mono)',
                  fontSize: '0.68rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'var(--muted)',
                  padding: '0.7rem 1rem', borderBottom: '1px solid var(--bdr)',
                  textAlign: 'left',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr
                key={row.zone}
                style={{ background: row.isAvg ? 'rgba(245,166,35,0.04)' : undefined }}
              >
                <td style={{
                  padding: '1rem',
                  borderBottom: '1px solid var(--bdr)',
                  fontFamily: 'var(--font-barlow-cond)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: row.isAvg ? 'var(--amber)' : 'var(--text)',
                }}>
                  {row.zone}
                </td>
                <td style={{
                  padding: '1rem',
                  borderBottom: '1px solid var(--bdr)',
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '1.3rem',
                  color: row.isAvg ? 'var(--amber)' : 'var(--amber)',
                }}>
                  {row.price}
                </td>
                <td style={{
                  padding: '1rem',
                  borderBottom: '1px solid var(--bdr)',
                  fontFamily: 'var(--font-space-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--muted)',
                }}>
                  {row.range}
                </td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--bdr)', width: '140px' }}>
                  <div className="pi-bar">
                    <div className="pi-bar-fill" style={{ width: `${row.barPct}%` }} />
                  </div>
                </td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--bdr)' }}>
                  <span style={{
                    fontFamily: 'var(--font-space-mono)',
                    fontSize: '0.7rem',
                    padding: '0.2rem 0.5rem',
                    background: 'rgba(245,166,35,0.08)',
                    color: 'var(--amber)',
                    border: '1px solid rgba(245,166,35,0.2)',
                    display: 'inline-block',
                  }}>
                    {row.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
