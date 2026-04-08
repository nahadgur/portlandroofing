const cells = [
  { label: 'Avg. Replacement Cost',   value: '$9,400',  delta: '▲ 2.1%', type: 'up',  note: 'vs last quarter' },
  { label: 'Active Projects (PDX)',   value: '1,247',   delta: '▲ 14%',  type: 'up',  note: 'year over year' },
  { label: 'Fastest Response Zone',   value: '97201',   delta: null,     type: 'neu', note: 'Inner SW Portland' },
  { label: 'Metal Roof Premium',      value: '+68%',    delta: null,     type: 'neu', note: 'vs asphalt baseline' },
  { label: 'Storm Season Uplift',     value: '+31%',    delta: '▼ demand', type: 'dn', note: 'seasonal shift' },
]

const deltaColor = { up: '#1A8A45', dn: '#C8202C', neu: '#6B6860' } as const

export default function DataBar() {
  return (
    <div style={{ background: '#fff', borderBottom: '3px solid #0A0B0D' }}>
      <div className="grid-data-bar">
        {cells.map((c, i) => (
          <div key={c.label} style={{
            padding: '1.4rem 1.5rem',
            borderRight: i < cells.length - 1 ? '1px solid var(--bdr)' : 'none',
          }}>
            <div style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '0.6rem', color: 'var(--muted)',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              marginBottom: '0.4rem',
            }}>
              {c.label}
            </div>
            <div style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: '1.8rem', color: 'var(--text)', lineHeight: 1,
            }}>
              {c.value}
            </div>
            <div style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '0.62rem', marginTop: '0.25rem',
              color: deltaColor[c.type as keyof typeof deltaColor],
            }}>
              {c.delta ? `${c.delta} · ` : ''}{c.note}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
