const items = [
  { label: 'PDX Avg. Roof Replacement', value: '$9,400', delta: '▲2.1%', deltaType: 'up' },
  { label: 'Asphalt Shingle',           value: '$6,800–$11,200' },
  { label: 'Metal Standing Seam',       value: '$14,000–$24,000' },
  { label: 'Cedar Shake',               value: '$11,000–$18,500', delta: '▼1.4%', deltaType: 'dn' },
  { label: 'Lake Oswego Index',         value: '$12,400', delta: '▲3.8%', deltaType: 'up' },
  { label: 'Emergency Repair',          value: '$350–$1,200' },
  { label: 'Flat / TPO Install',        value: '$5,500–$10,000' },
  { label: 'West Hills Premium',        value: '$13,200', delta: '▲5.2%', deltaType: 'up' },
]

export default function Ticker() {
  const doubled = [...items, ...items]

  return (
    <div style={{
      background: '#F5A623',
      height: '34px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
    }}>
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: '0.7rem',
            fontWeight: 700,
            color: '#000',
            padding: '0 2rem',
            borderRight: '1px solid rgba(0,0,0,0.15)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            whiteSpace: 'nowrap',
          }}>
            {item.label}&nbsp;
            <strong>{item.value}</strong>
            {item.delta && (
              <span style={{ color: item.deltaType === 'up' ? '#005c20' : '#8b0000' }}>
                {item.delta}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
