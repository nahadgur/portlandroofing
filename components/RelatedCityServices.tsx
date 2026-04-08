import Link from 'next/link';
import type { City } from '@/lib/cities';
import type { Service } from '@/lib/services';

interface Props {
  city: City;
  currentServiceSlug: string;
  allServices: Service[];
}

export default function RelatedCityServices({ city, currentServiceSlug, allServices }: Props) {
  const others = allServices.filter((s) => s.slug !== currentServiceSlug);

  return (
    <section className="section-pad" style={{ background: '#F8FAFC' }}>
      <div className="content-wrap">
        <h2 className="h-section" style={{ marginBottom: 6 }}>
          Other Roofing Services in {city.name}
        </h2>
        <p className="body-sm" style={{ marginBottom: 20 }}>
          Need something other than {allServices.find(s => s.slug === currentServiceSlug)?.shortName ?? 'this service'}?
          Compare all available services for {city.name} below.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 12,
          }}
        >
          {others.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}/${city.slug}`}
              style={{
                display: 'block',
                border: '1.5px solid var(--bdr)',
                borderRadius: 10,
                padding: '14px 16px',
                background: '#fff',
                textDecoration: 'none',
                transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
              }}
              className="card-hover"
            >
              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#0F172A',
                  marginBottom: 4,
                }}
              >
                {s.name}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#0066CC', fontWeight: 600 }}>
                ${s.avgLow.toLocaleString()}–${s.avgHigh.toLocaleString()}
              </div>
              <div
                style={{
                  fontSize: '0.7rem',
                  color: '#94A3B8',
                  marginTop: 6,
                  fontWeight: 500,
                }}
              >
                View {city.name} pricing →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
