'use client'

import { useRouter } from 'next/navigation'
import { neighborhoods } from '@/lib/neighborhoods'

interface Props {
  currentSlug:  string
  serviceSlug:  string
  serviceName:  string
}

export default function NeighborhoodSwitcher({ currentSlug, serviceSlug, serviceName }: Props) {
  const router = useRouter()

  return (
    <section style={{
      background: 'var(--bg2)',
      borderBottom: '1px solid var(--bdr)',
      padding: '2rem 3rem',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        flexWrap: 'wrap',
      }}>
        <div style={{ flexShrink: 0 }}>
          <div style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: '0.62rem',
            color: 'var(--amber)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '0.3rem',
          }}>
            {serviceName} in another neighborhood
          </div>
          <div style={{
            fontFamily: 'var(--font-barlow-cond)',
            fontSize: '0.88rem',
            color: 'var(--muted)',
          }}>
            Switch location →
          </div>
        </div>

        {/* Dropdown */}
        <select
          defaultValue={currentSlug}
          onChange={e => router.push(`/${serviceSlug}/${e.target.value}`)}
          style={{
            flex: 1,
            minWidth: '220px',
            maxWidth: '380px',
            padding: '0.75rem 1rem',
            background: 'var(--bg3)',
            border: '2px solid var(--bdr)',
            color: 'var(--text)',
            fontFamily: 'var(--font-barlow-cond)',
            fontSize: '0.95rem',
            outline: 'none',
            cursor: 'pointer',
            appearance: 'none',
            WebkitAppearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23F5A623' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem center',
            paddingRight: '2.5rem',
          }}
          aria-label="Select neighborhood"
        >
          {neighborhoods.map(n => (
            <option key={n.slug} value={n.slug}>
              {n.name} — Avg ${n.avgCost.toLocaleString()} ({n.zip})
            </option>
          ))}
        </select>

        {/* Quick popular picks */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {['pearl-district', 'lake-oswego', 'irvington', 'west-hills', 'st-johns'].filter(s => s !== currentSlug).slice(0, 4).map(slug => {
            const n = neighborhoods.find(x => x.slug === slug)
            if (!n) return null
            return (
              <button
                key={slug}
                onClick={() => router.push(`/${serviceSlug}/${slug}`)}
                style={{
                  fontFamily: 'var(--font-barlow-cond)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.04em',
                  color: 'var(--muted)',
                  padding: '0.35rem 0.7rem',
                  border: '1px solid var(--bdr)',
                  background: 'var(--bg)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.15s, border-color 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--amber)'; e.currentTarget.style.borderColor = 'var(--amber)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--bdr)' }}
              >
                {n.name}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
