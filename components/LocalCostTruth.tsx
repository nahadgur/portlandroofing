import type { City } from '@/lib/cities';
import type { Service } from '@/lib/services';

interface Props {
  city: City;
  service: Service;
}

function fmt(n: number) {
  return '$' + n.toLocaleString();
}

export default function LocalCostTruth({ city, service }: Props) {
  const isAbove = city.indexPct >= 70;
  const marketLabel =
    city.indexPct >= 80
      ? 'above the Oregon median'
      : city.indexPct >= 65
      ? 'near the Oregon median'
      : 'below the Oregon median';

  const marketColour =
    city.indexPct >= 80 ? '#B45309' : city.indexPct >= 65 ? '#0066CC' : '#166534';
  const marketBg =
    city.indexPct >= 80 ? '#FFFBEB' : city.indexPct >= 65 ? '#EFF6FF' : '#F0FDF4';
  const marketBorder =
    city.indexPct >= 80 ? '#FDE68A' : city.indexPct >= 65 ? '#BFDBFE' : '#BBF7D0';

  return (
    <section className="section-pad" style={{ background: '#F8FAFC' }}>
      <div className="content-wrap">

        {/* Label */}
        <div style={{ marginBottom: 12 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: '#0066CC',
              color: '#fff',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '3px 10px',
              borderRadius: 999,
            }}
          >
            📍 Local Pricing — {city.name}
          </span>
        </div>

        <h2
          className="h-section"
          style={{ marginBottom: 8 }}
        >
          {service.name} Cost in {city.name}, Oregon
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
            marginTop: 20,
          }}
        >
          {/* Price prose */}
          <div
            style={{
              background: '#fff',
              border: '1px solid var(--bdr)',
              borderRadius: 12,
              padding: '20px 24px',
            }}
          >
            <p className="body-main" style={{ marginBottom: 16 }}>
              A typical residential {service.shortName.toLowerCase()} in{' '}
              <strong style={{ color: '#0F172A' }}>{city.name}</strong> costs between{' '}
              <strong style={{ color: '#0066CC' }}>
                {fmt(city.range[0])} and {fmt(city.range[1])}
              </strong>
              . Final cost depends on roof size, material choice, pitch, and whether
              structural work is needed beneath.
            </p>

            {/* Market index pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: marketBg,
                border: `1px solid ${marketBorder}`,
                borderRadius: 999,
                padding: '5px 14px',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: marketColour,
              }}
            >
              <span>{city.indexPct}% of Oregon average</span>
              <span style={{ opacity: 0.6, fontWeight: 400 }}>·</span>
              <span style={{ fontWeight: 400, opacity: 0.8 }}>{marketLabel}</span>
            </div>
          </div>

          {/* Freshness + context */}
          <div
            style={{
              background: '#fff',
              border: '1px solid var(--bdr)',
              borderLeft: '4px solid #0066CC',
              borderRadius: 12,
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#94A3B8',
                  marginBottom: 6,
                }}
              >
                Data verified — April 2026
              </p>
              <p className="body-sm">
                Pricing reflects current {city.region} regional labour rates,
                post-April 2026 material costs, and {city.name} permit requirements.
                Get a personalised quote for an exact figure.
              </p>
            </div>

            <a
              href="/contact"
              style={{
                display: 'inline-block',
                background: '#0066CC',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: '9px 18px',
                borderRadius: 8,
                textDecoration: 'none',
                transition: 'background 0.2s',
                alignSelf: 'flex-start',
              }}
            >
              Get {city.name} Quote →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
