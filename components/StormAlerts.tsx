'use client'

import { useState, useEffect } from 'react'

interface Alert {
  id: string
  event: string
  headline: string
  description: string
  severity: 'Extreme' | 'Severe' | 'Moderate' | 'Minor' | 'Unknown'
  urgency: string
  onset: string
  expires: string
  senderName: string
}

const PORTLAND_ZONES = ['ORZ006', 'ORZ007', 'ORZ604']
const ROOFING_EVENTS = ['Wind Advisory', 'High Wind Warning', 'High Wind Watch', 'Winter Storm Warning', 'Winter Storm Watch', 'Ice Storm Warning', 'Blizzard Warning']

const severityColor: Record<string, { bg: string; border: string; text: string }> = {
  Extreme:  { bg: 'rgba(200,32,44,.08)', border: 'var(--red)', text: 'var(--red)' },
  Severe:   { bg: 'rgba(200,32,44,.06)', border: 'var(--red)', text: 'var(--red)' },
  Moderate: { bg: 'rgba(245,166,35,.06)', border: 'var(--amber-btn)', text: 'var(--amber)' },
  Minor:    { bg: 'rgba(26,138,69,.06)', border: 'var(--green)', text: 'var(--green)' },
  Unknown:  { bg: 'var(--bg2)', border: 'var(--bdr)', text: 'var(--muted)' },
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })
  } catch {
    return iso
  }
}

export default function StormAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const f = { fontFamily: 'var(--font-barlow)' } as const
  const m = { fontFamily: 'var(--font-space-mono)' } as const
  const c = { fontFamily: 'var(--font-barlow-cond)' } as const
  const d = { fontFamily: 'var(--font-bebas)' } as const

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const res = await fetch('https://api.weather.gov/alerts/active?area=OR', {
          headers: { 'User-Agent': 'portlandroofings.com contact@portlandroofings.com' },
        })
        if (!res.ok) throw new Error('API error')
        const data = await res.json()

        const filtered: Alert[] = (data.features ?? [])
          .filter((f: { properties: { geocode?: { UGC?: string[] }; event?: string } }) => {
            const zones: string[] = f.properties?.geocode?.UGC ?? []
            const event = f.properties?.event ?? ''
            const inPortland = zones.some((z: string) => PORTLAND_ZONES.includes(z))
            const isRoofingRelevant = ROOFING_EVENTS.includes(event)
            return inPortland && isRoofingRelevant
          })
          .map((f: { properties: { id?: string; event?: string; headline?: string; description?: string; severity?: string; urgency?: string; onset?: string; expires?: string; senderName?: string } }) => ({
            id: f.properties.id ?? crypto.randomUUID(),
            event: f.properties.event ?? 'Unknown',
            headline: f.properties.headline ?? '',
            description: f.properties.description ?? '',
            severity: (f.properties.severity ?? 'Unknown') as Alert['severity'],
            urgency: f.properties.urgency ?? '',
            onset: f.properties.onset ?? '',
            expires: f.properties.expires ?? '',
            senderName: f.properties.senderName ?? '',
          }))

        setAlerts(filtered)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchAlerts()
  }, [])

  if (loading) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{ ...m, fontSize: '0.72rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase' }} className="blink">Checking NWS Portland alerts...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', background: 'rgba(200,32,44,.05)', border: '1px solid rgba(200,32,44,.15)' }}>
        <div style={{ ...c, fontSize: '1rem', fontWeight: 700, color: 'var(--red)', marginBottom: '0.3rem' }}>Unable to load alerts</div>
        <div style={{ ...f, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>The National Weather Service API is temporarily unavailable. Check weather.gov/portland for current alerts.</div>
      </div>
    )
  }

  if (alerts.length === 0) {
    return (
      <div style={{ padding: '2.5rem', background: 'rgba(26,138,69,.05)', border: '1px solid rgba(26,138,69,.15)', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} />
        <div>
          <div style={{ ...d, fontSize: '1.6rem', color: 'var(--green)', lineHeight: 1, marginBottom: '0.3rem' }}>ALL CLEAR</div>
          <div style={{ ...f, fontSize: '0.92rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>No active wind or winter storm advisories for the Portland metro area. Good conditions for roofing work.</div>
          <div style={{ ...m, fontSize: '0.62rem', color: 'var(--muted)', marginTop: '0.5rem' }}>Source: National Weather Service \u00b7 Zones ORZ006, ORZ007, ORZ604</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
      {alerts.map((alert) => {
        const colors = severityColor[alert.severity] ?? severityColor.Unknown
        return (
          <div key={alert.id} style={{ background: colors.bg, borderLeft: `4px solid ${colors.border}`, padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <div style={{ ...c, fontSize: '1.1rem', fontWeight: 700, color: colors.text }}>{alert.event}</div>
              <span className="mono-badge" style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>{alert.severity}</span>
            </div>
            <div style={{ ...f, fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.6, fontWeight: 400, marginBottom: '0.6rem' }}>{alert.headline}</div>
            <div style={{ ...f, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300, marginBottom: '0.8rem' }}>{alert.description.slice(0, 400)}{alert.description.length > 400 ? '...' : ''}</div>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              {alert.onset && <div style={{ ...m, fontSize: '0.62rem', color: 'var(--muted)' }}>Onset: {formatDate(alert.onset)}</div>}
              {alert.expires && <div style={{ ...m, fontSize: '0.62rem', color: 'var(--muted)' }}>Expires: {formatDate(alert.expires)}</div>}
              {alert.senderName && <div style={{ ...m, fontSize: '0.62rem', color: 'var(--muted)' }}>Source: {alert.senderName}</div>}
            </div>
          </div>
        )
      })}
      <div style={{ background: 'var(--bg2)', padding: '0.8rem 1.5rem' }}>
        <div style={{ ...m, fontSize: '0.6rem', color: 'var(--muted)' }}>Data from api.weather.gov \u00b7 Zones: ORZ006, ORZ007, ORZ604 \u00b7 Filtered for roofing-relevant events</div>
      </div>
    </div>
  )
}
