import type { City } from '@/lib/cities';

interface Props {
  city: City;
}

const SCORE_LABELS: Record<number, { label: string; colour: string; bg: string; border: string }> = {
  1: { label: 'Very Simple',  colour: '#166534', bg: '#F0FDF4', border: '#BBF7D0' },
  2: { label: 'Simple',       colour: '#166534', bg: '#F0FDF4', border: '#BBF7D0' },
  3: { label: 'Moderate',     colour: '#0066CC', bg: '#EFF6FF', border: '#BFDBFE' },
  4: { label: 'Complex',      colour: '#B45309', bg: '#FFFBEB', border: '#FDE68A' },
  5: { label: 'Very Complex', colour: '#9A1C1C', bg: '#FFF1F2', border: '#FECDD3' },
};

export default function PermitComplexity({ city }: Props) {
  const score = city.permitScore;
  const meta = SCORE_LABELS[score] ?? SCORE_LABELS[3];

  return (
    <section className="section-pad">
      <div className="content-wrap">
        <div
          style={{
            background: meta.bg,
            border: `1px solid ${meta.border}`,
            borderLeft: `4px solid ${meta.colour}`,
            borderRadius: 12,
            padding: '20px 24px',
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
              marginBottom: 12,
            }}
          >
            <h3
              style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: meta.colour,
                margin: 0,
              }}
            >
              {city.name} Permit Requirements
            </h3>

            {/* Score meter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    style={{
                      width: 20,
                      height: 8,
                      borderRadius: 4,
                      background: n <= score ? meta.colour : '#E2E8F0',
                      transition: 'background 0.2s',
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: meta.colour,
                }}
              >
                {meta.label}
              </span>
            </div>
          </div>

          {/* Notes */}
          <p
            className="body-sm"
            style={{ color: meta.colour, opacity: 0.85, marginBottom: 10 }}
          >
            {city.permitNotes}
          </p>

          <p
            style={{
              fontSize: '0.75rem',
              color: meta.colour,
              opacity: 0.65,
              margin: 0,
            }}
          >
            ZIP: {city.zip} · CCB-licensed contractors handle all permit applications on your behalf.
          </p>
        </div>
      </div>
    </section>
  );
}
