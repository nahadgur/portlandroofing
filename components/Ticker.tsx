'use client'

const items = [
  { label: 'PDX Avg Roof Replacement', value: '$9,400', delta: '▲2.1%', dir: 'up' },
  { label: 'Asphalt Shingle', value: '$6,800–$11,200', delta: null, dir: null },
  { label: 'Metal Roof (Standing Seam)', value: '$14,000–$24,000', delta: null, dir: null },
  { label: 'Cedar Shake', value: '$11,000–$18,500', delta: '▼1.4%', dir: 'dn' },
  { label: 'Leak Repair (Emergency)', value: '$350–$1,200', delta: null, dir: null },
  { label: 'Gutters + Installation', value: '$1,100–$2,800', delta: null, dir: null },
  { label: 'Lake Oswego Index', value: '$12,400', delta: '▲3.8%', dir: 'up' },
  { label: 'West Hills Index', value: '$13,200', delta: '▲1.9%', dir: 'up' },
  { label: 'Storm Damage Repair', value: '$800–$4,500', delta: null, dir: null },
]

// Duplicate for seamless loop
const tickerItems = [...items, ...items]

export default function Ticker() {
  return (
    <div
      style={{
        background: 'var(--amber)',
        overflow: 'hidden',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="ticker-track">
        {tickerItems.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#000',
              padding: '0 2rem',
              borderRight: '1px solid rgba(0,0,0,0.2)',
              whiteSpace: 'nowrap',
            }}
          >
            {item.label}&nbsp;
            <strong>{item.value}</strong>
            {item.delta && (
              <>&nbsp;<span style={{ color: item.dir === 'up' ? '#005c27' : '#8b0000' }}>{item.delta}</span></>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
