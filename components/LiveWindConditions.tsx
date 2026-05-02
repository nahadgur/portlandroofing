'use client'

import { useEffect, useState } from 'react'

/**
 * Live wind & precipitation conditions for Portland metro using Open-Meteo.
 * Free, no API key required.
 *
 * https://open-meteo.com/en/docs
 *
 * Portland coords: 45.5152, -122.6784
 * Refresh on mount (page is also revalidated server-side hourly).
 */

interface Current {
  windSpeed: number      // mph
  windGusts: number      // mph
  windDirection: number  // degrees
  temperature: number    // F
  precipitation: number  // inches/hr
  isDay: boolean
  weatherCode: number
  time: string
}

interface Hourly {
  time: string
  windGusts: number
  windSpeed: number
  precipitation: number
}

const LAT = 45.5152
const LON = -122.6784

const WMO_CODE: Record<number, string> = {
  0: 'Clear',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Rime fog',
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Heavy drizzle',
  61: 'Light rain',
  63: 'Rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Freezing rain',
  71: 'Light snow',
  73: 'Snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Light showers',
  81: 'Showers',
  82: 'Violent showers',
  85: 'Light snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm w/ hail',
  99: 'Severe thunderstorm w/ hail',
}

function compass(deg: number): string {
  const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW']
  return dirs[Math.round(deg / 22.5) % 16] ?? '—'
}

function riskBand(gust: number): { label: string; color: string; pct: number } {
  if (gust >= 70) return { label: 'EXTREME', color: 'var(--red)', pct: 100 }
  if (gust >= 58) return { label: 'SEVERE',  color: 'var(--red)', pct: 85 }
  if (gust >= 45) return { label: 'HIGH',    color: 'var(--amber-btn)', pct: 65 }
  if (gust >= 35) return { label: 'MODERATE',color: 'var(--amber-btn)', pct: 45 }
  if (gust >= 25) return { label: 'LOW',     color: '#1A8A45', pct: 28 }
  return                { label: 'CALM',     color: '#1A8A45', pct: 10 }
}

export default function LiveWindConditions() {
  const [current, setCurrent] = useState<Current | null>(null)
  const [hourly,  setHourly]  = useState<Hourly[]>([])
  const [error,   setError]   = useState(false)
  const [loading, setLoading] = useState(true)

  const f = { fontFamily: 'var(--font-barlow)' } as const
  const m = { fontFamily: 'var(--font-space-mono)' } as const
  const c = { fontFamily: 'var(--font-barlow-cond)' } as const
  const d = { fontFamily: 'var(--font-bebas)' } as const

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
          `&current=temperature_2m,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m` +
          `&hourly=wind_gusts_10m,wind_speed_10m,precipitation` +
          `&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles&forecast_hours=24`
        const res = await fetch(url, { next: { revalidate: 1800 } })
        if (!res.ok) throw new Error('open-meteo error')
        const data = await res.json()
        setCurrent({
          windSpeed:     data.current?.wind_speed_10m ?? 0,
          windGusts:     data.current?.wind_gusts_10m ?? 0,
          windDirection: data.current?.wind_direction_10m ?? 0,
          temperature:   data.current?.temperature_2m ?? 0,
          precipitation: data.current?.precipitation ?? 0,
          isDay:         data.current?.is_day === 1,
          weatherCode:   data.current?.weather_code ?? 0,
          time:          data.current?.time ?? '',
        })
        const times: string[] = data.hourly?.time ?? []
        const gusts: number[] = data.hourly?.wind_gusts_10m ?? []
        const speeds: number[] = data.hourly?.wind_speed_10m ?? []
        const precs: number[] = data.hourly?.precipitation ?? []
        const merged: Hourly[] = times.slice(0, 24).map((t, i) => ({
          time: t,
          windGusts: gusts[i] ?? 0,
          windSpeed: speeds[i] ?? 0,
          precipitation: precs[i] ?? 0,
        }))
        setHourly(merged)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ ...m, fontSize: '0.7rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase' }} className="blink">
          Loading Open-Meteo Portland conditions...
        </div>
      </div>
    )
  }

  if (error || !current) {
    return (
      <div style={{ padding: '1.5rem', background: 'rgba(200,32,44,.05)', border: '1px solid rgba(200,32,44,.15)' }}>
        <div style={{ ...c, fontSize: '0.95rem', fontWeight: 700, color: 'var(--red)', marginBottom: '0.3rem' }}>Live conditions unavailable</div>
        <div style={{ ...f, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>Open-Meteo API temporarily unreachable. NWS alerts above remain accurate.</div>
      </div>
    )
  }

  const risk = riskBand(current.windGusts)
  const condition = WMO_CODE[current.weatherCode] ?? 'Conditions'
  const peakGust24h = Math.max(...hourly.map((h) => h.windGusts), 0)
  const totalPrecip24h = hourly.reduce((acc, h) => acc + h.precipitation, 0)

  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--bdr)' }}>
      {/* Top: current readings + risk */}
      <div style={{ padding: '1.5rem 1.7rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '1.2rem', borderBottom: '1px solid var(--bdr)' }}>
        <div>
          <div style={{ ...m, fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Wind Speed</div>
          <div style={{ ...d, fontSize: '2rem', color: 'var(--text)', lineHeight: 1 }}>{Math.round(current.windSpeed)}<span style={{ fontSize: '0.85rem', color: 'var(--muted)', marginLeft: '0.3rem' }}>MPH</span></div>
          <div style={{ ...m, fontSize: '0.65rem', color: 'var(--muted)', marginTop: '0.3rem' }}>From {compass(current.windDirection)}</div>
        </div>
        <div>
          <div style={{ ...m, fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Peak Gusts</div>
          <div style={{ ...d, fontSize: '2rem', color: risk.color, lineHeight: 1 }}>{Math.round(current.windGusts)}<span style={{ fontSize: '0.85rem', color: 'var(--muted)', marginLeft: '0.3rem' }}>MPH</span></div>
          <div style={{ ...m, fontSize: '0.65rem', color: risk.color, marginTop: '0.3rem', letterSpacing: '0.05em' }}>{risk.label} risk</div>
        </div>
        <div>
          <div style={{ ...m, fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Temperature</div>
          <div style={{ ...d, fontSize: '2rem', color: 'var(--text)', lineHeight: 1 }}>{Math.round(current.temperature)}<span style={{ fontSize: '0.85rem', color: 'var(--muted)', marginLeft: '0.3rem' }}>°F</span></div>
          <div style={{ ...m, fontSize: '0.65rem', color: 'var(--muted)', marginTop: '0.3rem' }}>{condition}</div>
        </div>
        <div>
          <div style={{ ...m, fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Precip Now</div>
          <div style={{ ...d, fontSize: '2rem', color: 'var(--text)', lineHeight: 1 }}>{current.precipitation.toFixed(2)}<span style={{ fontSize: '0.85rem', color: 'var(--muted)', marginLeft: '0.3rem' }}>IN/HR</span></div>
          <div style={{ ...m, fontSize: '0.65rem', color: 'var(--muted)', marginTop: '0.3rem' }}>24h: {totalPrecip24h.toFixed(2)}&quot;</div>
        </div>
      </div>

      {/* Risk bar */}
      <div style={{ padding: '1rem 1.7rem', borderBottom: '1px solid var(--bdr)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
          <span style={{ ...c, fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)' }}>Roofing risk band</span>
          <span style={{ ...m, fontSize: '0.7rem', color: risk.color, letterSpacing: '0.06em' }}>{risk.label}</span>
        </div>
        <div className="pi-bar">
          <div className="pi-bar-fill" style={{ width: `${risk.pct}%`, background: risk.color, height: '6px' }} />
        </div>
      </div>

      {/* 24-hour gust forecast sparkline */}
      <div style={{ padding: '1.2rem 1.7rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
          <span style={{ ...c, fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)' }}>Next 24h gust forecast</span>
          <span style={{ ...m, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.06em' }}>Peak: {Math.round(peakGust24h)} mph</span>
        </div>
        <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '60px', marginBottom: '0.4rem' }}>
          {hourly.map((h, i) => {
            const pct = Math.min(100, (h.windGusts / 70) * 100)
            const color = h.windGusts >= 58 ? 'var(--red)' : h.windGusts >= 45 ? 'var(--amber-btn)' : h.windGusts >= 35 ? 'var(--amber)' : 'var(--bdr)'
            return (
              <div key={i} title={`${new Date(h.time).toLocaleTimeString('en-US', { hour: 'numeric' })} · ${Math.round(h.windGusts)} mph`} style={{ flex: 1, height: `${pct}%`, background: color, minHeight: '2px' }} />
            )
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ ...m, fontSize: '0.55rem', color: 'var(--muted)' }}>now</span>
          <span style={{ ...m, fontSize: '0.55rem', color: 'var(--muted)' }}>+12h</span>
          <span style={{ ...m, fontSize: '0.55rem', color: 'var(--muted)' }}>+24h</span>
        </div>
      </div>

      <div style={{ background: 'var(--bg)', padding: '0.7rem 1.7rem', borderTop: '1px solid var(--bdr)' }}>
        <div style={{ ...m, fontSize: '0.58rem', color: 'var(--muted)', letterSpacing: '0.05em' }}>
          Source: Open-Meteo (open-meteo.com) · Portland metro 45.52°N, 122.68°W · Refreshed every 30 min
        </div>
      </div>
    </div>
  )
}
