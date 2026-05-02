'use client'

import Link from 'next/link'
import { neighborhoods } from '@/lib/neighborhoods'

export default function NeighborhoodGrid() {
  const f = { fontFamily: 'var(--font-barlow)' } as const
  const m = { fontFamily: 'var(--font-space-mono)' } as const
  const c = { fontFamily: 'var(--font-barlow-cond)' } as const
  const d = { fontFamily: 'var(--font-bebas)' } as const

  return (
    <section id="neighborhoods" className="section-pad" style={{ background: 'var(--bg)' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ Coverage Map ]</div>
        <h2 style={{ ...d, fontSize: 'clamp(2rem,3.5vw,3.5rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.5rem' }}>10 PORTLAND COST MARKETS</h2>
        <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', maxWidth: '640px', fontWeight: 300, lineHeight: 1.7 }}>
          Bespoke local cost intelligence for Portland&apos;s 10 most distinct roofing markets — what drives quotes locally, three worked examples per neighborhood, real permit detail. Smaller adjacent areas absorbed into each kept market&apos;s service area.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1px', background: 'var(--bdr)' }}>
        {neighborhoods.map(n => (
          <Link
            key={n.slug}
            href={`/portland/${n.slug}`}
            className="nbhd-card-hover"
            style={{
              background: 'var(--bg2)',
              padding: '1.4rem 1.3rem',
              textDecoration: 'none',
              display: 'block',
              position: 'relative',
            }}
          >
            <div style={{ ...m, fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              {n.zip} · {n.area}
            </div>
            <div style={{ ...d, fontSize: '1.4rem', color: 'var(--text)', lineHeight: 1, marginBottom: '0.6rem' }}>
              {n.name.toUpperCase()}
            </div>
            <div style={{ ...d, fontSize: '1.6rem', color: 'var(--amber)', lineHeight: 1, marginBottom: '0.3rem' }}>
              ${n.avgCost.toLocaleString()}
            </div>
            <div style={{ ...m, fontSize: '0.7rem', color: 'var(--muted)', marginBottom: '0.8rem' }}>
              avg replacement · range {n.range}
            </div>
            <div style={{ ...m, fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
              Top cost driver
            </div>
            <div style={{ ...c, fontSize: '0.85rem', color: 'var(--text)', fontWeight: 600, lineHeight: 1.4, marginBottom: '0.2rem' }}>
              {n.costDrivers[0].factor}
            </div>
            <div style={{ ...m, fontSize: '0.75rem', color: 'var(--amber)', fontWeight: 500 }}>
              {n.costDrivers[0].impact}
            </div>
            {n.badge && (
              <span
                className={`mono-badge ${n.badge === 'hot' ? 'badge-hot' : n.badge === 'premium' ? 'badge-hot' : 'badge-new'}`}
                style={{ position: 'absolute', top: '0.9rem', right: '0.9rem' }}
              >
                {n.badge === 'hot' ? 'HOT' : n.badge === 'premium' ? 'PREMIUM' : 'NEW'}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
