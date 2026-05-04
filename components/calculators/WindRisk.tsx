'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { neighborhoods } from '@/lib/neighborhoods'
import { getNeighborhoodForZip, windExposureByNeighborhood } from '@/lib/zipMap'

const SCORE_COLOR: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: '#1A8A45',
  2: '#1A8A45',
  3: 'var(--amber-btn)',
  4: 'var(--amber-btn)',
  5: 'var(--red)',
}

const NEIGHBORHOODS_FOR_PICKER = [{ slug: 'auto', name: 'Auto-detect from ZIP' }, ...neighborhoods.map((n) => ({ slug: n.slug, name: n.name }))]

export default function WindRisk() {
  const [zip, setZip] = useState('')
  const [override, setOverride] = useState('auto')
  const [touched, setTouched] = useState(false)

  const detectedSlug = useMemo(() => {
    if (override !== 'auto') return override
    if (zip.length >= 5) return getNeighborhoodForZip(zip)
    return null
  }, [zip, override])

  const neighborhood = detectedSlug ? neighborhoods.find((n) => n.slug === detectedSlug) ?? null : null
  const exposure = neighborhood ? windExposureByNeighborhood[neighborhood.slug] : null

  const f = { fontFamily: 'var(--font-barlow)' } as const
  const m = { fontFamily: 'var(--font-space-mono)' } as const
  const c = { fontFamily: 'var(--font-barlow-cond)' } as const
  const d = { fontFamily: 'var(--font-bebas)' } as const

  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--bdr)' }}>
      <div style={{ padding: '1.6rem 2rem', borderBottom: '1px solid var(--bdr)' }}>
        <div style={{ ...m, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>▸ Portland Wind Damage Risk Score</div>
        <h3 style={{ ...d, fontSize: '1.7rem', color: 'var(--text)', lineHeight: 1 }}>YOUR WIND EXPOSURE RATING</h3>
        <div style={{ ...f, fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.5rem', fontWeight: 300 }}>
          1–5 wind exposure score for your Portland address based on Gorge corridor proximity, ridge-line exposure, and historical major-event data. Includes recommended material wind rating spec.
        </div>
      </div>

      <div style={{ padding: '1.7rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', ...c, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.55rem' }}>Your ZIP code</label>
          <input
            type="text" inputMode="numeric" maxLength={5}
            placeholder="e.g. 97214" value={zip}
            onChange={(e) => { setZip(e.target.value.replace(/\D/g, '')); setTouched(true) }}
            style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--bg3)', border: '1px solid var(--bdr)', color: 'var(--text)', ...m, fontSize: '0.95rem' }}
          />
          <div style={{ marginTop: '0.6rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ ...m, fontSize: '0.62rem', color: 'var(--muted)' }}>OR pick neighborhood:</span>
            <select value={override} onChange={(e) => { setOverride(e.target.value); setTouched(true) }} style={{ padding: '0.4rem 0.7rem', background: 'var(--bg3)', border: '1px solid var(--bdr)', color: 'var(--text)', ...c, fontSize: '0.8rem' }}>
              {NEIGHBORHOODS_FOR_PICKER.map((n) => (<option key={n.slug} value={n.slug}>{n.name}</option>))}
            </select>
          </div>
        </div>

        {!touched && (
          <div style={{ padding: '1.5rem', background: 'var(--bg3)', textAlign: 'center', ...m, fontSize: '0.85rem', color: 'var(--muted)' }}>Enter ZIP or pick neighborhood to see your wind risk score.</div>
        )}

        {touched && exposure && neighborhood && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Headline score */}
            <div style={{ background: 'var(--bg)', border: '1px solid var(--bdr)', borderTop: `4px solid ${SCORE_COLOR[exposure.score]}`, padding: '1.7rem 1.7rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ ...m, fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Wind Risk Score</div>
                  <div style={{ ...d, fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: SCORE_COLOR[exposure.score], lineHeight: 1, marginBottom: '0.2rem' }}>{exposure.score}/5</div>
                  <div style={{ ...d, fontSize: '1.4rem', color: SCORE_COLOR[exposure.score], lineHeight: 1 }}>{exposure.label}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ ...m, fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Closest Market</div>
                  <div style={{ ...c, fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)' }}>{neighborhood.name}</div>
                  <div style={{ ...m, fontSize: '0.65rem', color: 'var(--muted)', marginTop: '0.2rem' }}>{neighborhood.zip} · {neighborhood.area}</div>
                </div>
              </div>
              <div className="pi-bar" style={{ marginBottom: '1.2rem' }}>
                <div className="pi-bar-fill" style={{ width: `${exposure.score * 20}%`, background: SCORE_COLOR[exposure.score], height: '6px' }} />
              </div>
              <p style={{ ...f, fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.7, fontWeight: 300 }}>{exposure.detail}</p>
            </div>

            {/* Recommended spec */}
            <div style={{ background: 'var(--bg)', border: '1px solid var(--bdr)', borderLeft: '4px solid var(--amber-btn)' }}>
              <div style={{ padding: '0.9rem 1.5rem', background: 'var(--bg2)', borderBottom: '1px solid var(--bdr)' }}>
                <div style={{ ...m, fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Recommended Material Spec</div>
              </div>
              <div style={{ padding: '1.1rem 1.5rem' }}>
                <p style={{ ...f, fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.65, fontWeight: 300 }}>{exposure.recommendedSpec}</p>
              </div>
            </div>

            {/* Wind threshold reference */}
            <div style={{ background: 'var(--bg)', border: '1px solid var(--bdr)' }}>
              <div style={{ padding: '0.9rem 1.5rem', background: 'var(--bg2)', borderBottom: '1px solid var(--bdr)' }}>
                <div style={{ ...m, fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Wind Speed Damage Reference</div>
              </div>
              <div style={{ padding: '0.9rem 1.5rem' }}>
                {[
                  { mph: '25-35', label: 'Loose debris airborne; shingle edges may lift on aging roofs', risk: 'LOW' },
                  { mph: '35-45', label: 'Moderate damage on aging asphalt; flashing stress', risk: 'MODERATE' },
                  { mph: '45-58', label: 'Shingle damage likely; tabs strip on under-attached roofs', risk: 'HIGH' },
                  { mph: '58-70', label: 'Flashing failures; widespread shingle loss; tree-fall risk', risk: 'SEVERE' },
                  { mph: '70+',   label: 'Structural damage possible; full roof failure on aging stock', risk: 'EXTREME' },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0.45rem 0', borderBottom: i < 4 ? '1px dashed var(--bdr)' : 'none' }}>
                    <span style={{ ...m, fontSize: '0.7rem', color: 'var(--text)', whiteSpace: 'nowrap' }}>{row.mph} mph</span>
                    <span style={{ ...f, fontSize: '0.78rem', color: 'var(--muted)', flex: 1, padding: '0 0.7rem', fontWeight: 300, lineHeight: 1.4 }}>{row.label}</span>
                    <span style={{ ...m, fontSize: '0.6rem', color: row.risk === 'LOW' || row.risk === 'MODERATE' ? '#1A8A45' : row.risk === 'HIGH' ? 'var(--amber-btn)' : 'var(--red)', letterSpacing: '0.06em' }}>{row.risk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Link href="/storm-tracker/pdx-active-warnings" style={{ flex: '1 1 200px', padding: '0.85rem 1rem', background: 'var(--amber)', color: '#000', ...c, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', textAlign: 'center' }}>
                Live Storm Tracker →
              </Link>
              <Link href={`/portland/${neighborhood.slug}`} style={{ flex: '1 1 200px', padding: '0.85rem 1rem', background: 'transparent', color: 'var(--amber)', border: '1px solid var(--amber)', ...c, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', textAlign: 'center' }}>
                {neighborhood.name} Detail →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
