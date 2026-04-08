'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const PORTLAND_ZONES   = ['ORZ006', 'ORZ007', 'ORZ604']
const ROOFING_EVENTS   = ['Wind Advisory','High Wind Warning','High Wind Watch','Winter Storm Warning','Winter Storm Watch','Ice Storm Warning','Blizzard Warning']
const CACHE_KEY        = 'pdx_storm_banner'
const CACHE_TTL_MS     = 30 * 60 * 1000

interface CachedResult {
  ts: number
  alerts: { event: string; severity: string }[]
}

function getSeverityColor(severity: string) {
  if (severity === 'Extreme' || severity === 'Severe') return 'var(--red)'
  return 'var(--amber-btn)'
}

export default function StormBanner() {
  const [alerts, setAlerts] = useState<{ event: string; severity: string }[]>([])
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const raw = sessionStorage.getItem(CACHE_KEY)
        if (raw) {
          const cached: CachedResult = JSON.parse(raw)
          if (Date.now() - cached.ts < CACHE_TTL_MS) {
            setAlerts(cached.alerts)
            return
          }
        }
      } catch { /* ignore */ }

      try {
        const res = await fetch('https://api.weather.gov/alerts/active?area=OR', {
          headers: { 'User-Agent': 'portlandroofings.com contact@portlandroofings.com' },
        })
        if (!res.ok) return
        const data = await res.json()

        const filtered = (data.features ?? [])
          .filter((f: any) => {
            const zones: string[] = f.properties?.geocode?.UGC ?? []
            const event: string   = f.properties?.event ?? ''
            return zones.some(z => PORTLAND_ZONES.includes(z)) && ROOFING_EVENTS.includes(event)
          })
          .map((f: any) => ({
            event:    f.properties.event    ?? 'Unknown',
            severity: f.properties.severity ?? 'Unknown',
          }))

        setAlerts(filtered)
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), alerts: filtered }))
      } catch { /* silent fail */ }
    }
    load()
  }, [])

  if (!alerts.length || dismissed) return null

  const top   = alerts[0]
  const color = getSeverityColor(top.severity)
  const isRed = color === 'var(--red)'
  const label = alerts.length > 1 ? `${alerts.length} Active Alerts` : top.event

  return (
    <div style={{
      background: isRed ? '#1a0505' : '#1a0f00',
      borderBottom: `2px solid ${color}`,
      padding: '0.65rem 1.5rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: '1rem', flexWrap: 'wrap',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: color, animation: 'blink 1s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', color, textTransform: 'uppercase' as const }}>NWS Alert</span>
        </div>
        <span style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.88rem', color: '#fff' }}>
          <strong style={{ color }}>{label}</strong>{' '}in effect for Portland metro.{' '}
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>Roofing work may be affected.</span>
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
        <Link href="/storm-tracker/pdx-active-warnings" style={{
          background: color, color: isRed ? '#fff' : '#000',
          fontFamily: 'var(--font-barlow-cond)', fontWeight: 700,
          fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const,
          padding: '0.4rem 0.9rem', textDecoration: 'none', whiteSpace: 'nowrap' as const,
        }}>View Alerts →</Link>
        <button onClick={() => setDismissed(true)} aria-label="Dismiss" style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontFamily: 'var(--font-space-mono)', fontSize: '0.9rem', padding: '0.2rem' }}>✕</button>
      </div>
    </div>
  )
}
