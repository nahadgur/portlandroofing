import Link from 'next/link';
import type { City } from '@/lib/cities';

interface Props {
  currentCity: City;
  allCities: City[];
}

function fmt(n: number) {
  return '$' + n.toLocaleString();
}

export default function NearbyCities({ currentCity, allCities }: Props) {
  /* Same region first, excluding current city */
  let nearby = allCities.filter(
    (c) => c.slug !== currentCity.slug && c.region === currentCity.region
  );

  /* If same region yields fewer than 3, pull from all other cities by cost proximity */
  if (nearby.length < 3) {
    const others = allCities.filter(
      (c) => c.slug !== currentCity.slug && c.region !== currentCity.region
    );
    const byProximity = [...others].sort(
      (a, b) =>
        Math.abs(a.avgCost - currentCity.avgCost) -
        Math.abs(b.avgCost - currentCity.avgCost)
    );
    nearby = [...nearby, ...byProximity].slice(0, 5);
  } else {
    nearby = nearby.slice(0, 5);
  }

  if (nearby.length === 0) return null;

  return (
    <section className="section-pad" style={{ background: 'var(--bg2)' }}>
      <div className="content-wrap-wide">
        <h2 className="h-section" style={{ marginBottom: 6 }}>
          Nearby Oregon Cities
        </h2>
        <p className="body-sm" style={{ marginBottom: 20 }}>
          Compare roofing costs and contractor availability in cities near {currentCity.name}.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 12,
          }}
        >
          {nearby.map((c) => {
            const cheaper = c.avgCost < currentCity.avgCost;
            const diff = Math.round(
              Math.abs(c.avgCost - currentCity.avgCost) / 100
            ) * 100;
            const sameRegion = c.region === currentCity.region;

            return (
              <Link
                key={c.slug}
                href={`/oregon/${c.slug}`}
                style={{
                  display: 'block',
                  background: '#fff',
                  border: '1.5px solid var(--bdr)',
                  borderRadius: 10,
                  padding: '14px 16px',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
                  position: 'relative',
                }}
                className="card-hover"
              >
                {/* Region badge */}
                {sameRegion && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      background: '#EFF6FF',
                      color: '#0066CC',
                      padding: '2px 6px',
                      borderRadius: 4,
                    }}
                  >
                    Same region
                  </div>
                )}

                <div
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: '#0F172A',
                    marginBottom: 4,
                    paddingRight: sameRegion ? 60 : 0,
                  }}
                >
                  {c.name}
                </div>

                <div
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#0066CC',
                    marginBottom: 4,
                  }}
                >
                  Avg {fmt(c.avgCost)}
                </div>

                {diff > 0 && (
                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: cheaper ? '#166534' : '#B45309',
                      fontWeight: 500,
                    }}
                  >
                    {cheaper ? `~${fmt(diff)} less` : `~${fmt(diff)} more`} than {currentCity.name}
                  </div>
                )}

                <div
                  style={{
                    fontSize: '0.7rem',
                    color: '#94A3B8',
                    marginTop: 8,
                    fontWeight: 500,
                  }}
                >
                  View costs →
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
