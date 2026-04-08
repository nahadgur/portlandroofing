'use client'

import { useRouter } from 'next/navigation'
import { neighborhoods } from '@/lib/neighborhoods'

interface Props {
  serviceSlug: string
  serviceName: string
}

export default function ServiceLocationSelect({ serviceSlug, serviceName }: Props) {
  const router = useRouter()

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <div style={{
        fontFamily: 'var(--font-space-mono)',
        fontSize: '0.62rem',
        color: 'var(--muted)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: '0.6rem',
      }}>
        Go to a specific location
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <select
          defaultValue=""
          onChange={e => e.target.value && router.push(`/${serviceSlug}/${e.target.value}`)}
          style={{
            padding: '0.65rem 2.5rem 0.65rem 1rem',
            background: 'var(--bg)',
            border: '2px solid var(--bdr)',
            color: 'var(--text)',
            fontFamily: 'var(--font-barlow-cond)',
            fontSize: '0.9rem',
            outline: 'none',
            cursor: 'pointer',
            appearance: 'none',
            WebkitAppearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C47D0A' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.8rem center',
            minWidth: '260px',
          }}
          aria-label={`Select neighborhood for ${serviceName}`}
        >
          <option value="" disabled>Select neighborhood…</option>
          {neighborhoods.map(n => (
            <option key={n.slug} value={n.slug}>
              {n.name} ({n.zip}) — avg ${n.avgCost.toLocaleString()}
            </option>
          ))}
        </select>

        <span style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.78rem', color: 'var(--muted)' }}>or</span>

        {/* Quick picks */}
        {['pearl-district','lake-oswego','irvington','st-johns'].map(slug => {
          const n = neighborhoods.find(x => x.slug === slug)
          if (!n) return null
          return (
            <button
              key={slug}
              onClick={() => router.push(`/${serviceSlug}/${slug}`)}
              style={{
                fontFamily: 'var(--font-barlow-cond)',
                fontSize: '0.78rem',
                letterSpacing: '0.04em',
                color: 'var(--amber)',
                padding: '0.5rem 0.85rem',
                border: '1px solid var(--bdr)',
                background: 'var(--bg)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'border-color 0.15s, background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--amber)'; e.currentTarget.style.background = 'var(--bg2)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bdr)'; e.currentTarget.style.background = 'var(--bg)' }}
            >
              {n.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
