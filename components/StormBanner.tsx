'use client'

import { useState } from 'react'

// ─── STORM CONFIG ───────────────────────────────────────────────────────
// Set `active: true` and update the fields below when a storm hits PDX.
// Set `active: false` to hide the banner entirely.
const STORM = {
  active:    true,
  date:      'April 5, 2026',
  type:      'High Wind & Rain Event',
  areas:     'West Hills, Alameda Ridge, Council Crest, Forest Park',
  maxWind:   '58 mph gusts',
  action:    'If your roof was affected, emergency inspection slots are available.',
  urgency:   'LIMITED SLOTS',
}
// ───────────────────────────────────────────────────────────────────────

export default function StormBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (!STORM.active || dismissed) return null

  return (
    <div style={{
      background: '#1a0a0a',
      borderBottom: '2px solid var(--red)',
      padding: '0.75rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      flexWrap: 'wrap',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        {/* Pulse dot */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <span style={{
            display: 'inline-block', width: 8, height: 8,
            borderRadius: '50%', background: 'var(--red)',
            animation: 'blink 1s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: '0.68rem', letterSpacing: '0.12em',
            color: 'var(--red)', textTransform: 'uppercase',
          }}>
            Storm Alert
          </span>
        </div>

        <div style={{
          fontFamily: 'var(--font-barlow)',
          fontSize: '0.9rem', color: 'var(--text)',
        }}>
          <strong style={{ color: 'var(--red)' }}>{STORM.type}</strong>
          {' '}detected {STORM.date} · {STORM.maxWind} recorded in {STORM.areas}.{' '}
          <span style={{ color: 'var(--muted)' }}>{STORM.action}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
        <a href="/#quote" style={{
          background: 'var(--red)', color: '#fff',
          fontFamily: 'var(--font-barlow-cond)', fontWeight: 700,
          fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '0.45rem 1rem', textDecoration: 'none', whiteSpace: 'nowrap',
        }}>
          {STORM.urgency} — Book Now →
        </a>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss storm alert"
          style={{
            background: 'transparent', border: 'none',
            color: 'var(--muted)', cursor: 'pointer',
            fontFamily: 'var(--font-space-mono)', fontSize: '0.9rem',
            lineHeight: 1, padding: '0.2rem',
          }}
        >
          ✕
        </button>
      </div>
    </div>
  )
}
