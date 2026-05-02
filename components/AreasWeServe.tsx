import type { Neighborhood } from '@/lib/neighborhoods'

interface Props {
  neighborhood: Neighborhood
}

export default function AreasWeServe({ neighborhood }: Props) {
  const areas = neighborhood.serviceAreas
  if (!areas || areas.length === 0) return null

  const f = { fontFamily: 'var(--font-barlow)' } as const
  const m = { fontFamily: 'var(--font-space-mono)' } as const
  const c = { fontFamily: 'var(--font-barlow-cond)' } as const
  const d = { fontFamily: 'var(--font-bebas)' } as const

  return (
    <section className="section-pad" style={{ background: '#fff' }}>
      <div className="content-wrap">
        <div
          style={{
            ...m,
            fontSize: '0.68rem',
            color: 'var(--amber)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '0.8rem',
          }}
        >
          [ Areas We Serve Near {neighborhood.name} ]
        </div>
        <h2
          style={{
            ...d,
            fontSize: 'clamp(1.6rem,3vw,2.5rem)',
            color: 'var(--text)',
            lineHeight: 1,
            marginBottom: '1rem',
          }}
        >
          {neighborhood.name.toUpperCase()} CATCHMENT
        </h2>
        <p
          style={{
            ...f,
            fontSize: '0.95rem',
            color: 'var(--muted)',
            lineHeight: 1.7,
            fontWeight: 300,
            marginBottom: '1.5rem',
            maxWidth: '640px',
          }}
        >
          Our {neighborhood.name} crews also cover these adjacent neighborhoods and surrounding
          communities. Same pricing, same CCB-licensed work, same local permit knowledge.
        </p>
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          {areas.map((area) => (
            <li
              key={area}
              style={{
                ...c,
                display: 'inline-block',
                background: 'var(--bg2)',
                border: '1px solid var(--bdr)',
                padding: '0.45rem 0.95rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text)',
                whiteSpace: 'nowrap',
              }}
            >
              {area}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
