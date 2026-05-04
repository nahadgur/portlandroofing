'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { neighborhoods } from '@/lib/neighborhoods'
import { getNeighborhoodForZip } from '@/lib/zipMap'

interface MaterialSpec {
  id: string
  label: string
  perSf: number
  laborMultiplier: number
  warningOver?: number  // age threshold to warn
}

const MATERIALS: MaterialSpec[] = [
  { id: 'asphalt-arch',  label: 'Architectural Asphalt (30-yr)',  perSf: 4.50, laborMultiplier: 1.0 },
  { id: 'asphalt-prem',  label: 'Premium Asphalt / Designer (50-yr)', perSf: 6.50, laborMultiplier: 1.05 },
  { id: 'metal-seam',    label: 'Standing Seam Metal',             perSf: 11.00, laborMultiplier: 1.20 },
  { id: 'cedar-shake',   label: 'Cedar Shake (#1 grade)',          perSf: 13.00, laborMultiplier: 1.35 },
  { id: 'tpo-flat',      label: 'TPO / Flat Membrane',             perSf: 7.00,  laborMultiplier: 1.10 },
]

interface PitchSpec { id: string; label: string; sub: string; multiplier: number }
const PITCHES: PitchSpec[] = [
  { id: 'flat',     label: 'Flat',     sub: '0–2/12',  multiplier: 1.00 },
  { id: 'low',      label: 'Low',      sub: '3–4/12',  multiplier: 1.05 },
  { id: 'moderate', label: 'Moderate', sub: '5–7/12',  multiplier: 1.15 },
  { id: 'steep',    label: 'Steep',    sub: '8–11/12', multiplier: 1.30 },
  { id: 'vsteep',   label: 'Very Steep', sub: '12+/12', multiplier: 1.50 },
]

const AGE_BUCKETS = [
  { id: '0-10',  label: '0–10 yrs',  deckRepair: 0,    ventilationFlag: false, twoLayer: false },
  { id: '10-20', label: '10–20 yrs', deckRepair: 600,  ventilationFlag: false, twoLayer: false },
  { id: '20-30', label: '20–30 yrs', deckRepair: 1800, ventilationFlag: true,  twoLayer: true  },
  { id: '30+',   label: '30+ yrs',   deckRepair: 3500, ventilationFlag: true,  twoLayer: true  },
]

const NEIGHBORHOODS_FOR_PICKER = [{ slug: 'auto', name: 'Auto-detect from ZIP', avgCost: 0, indexPct: 0 }, ...neighborhoods]

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US')
}

export default function CostCalculatorDeep() {
  const [zip, setZip] = useState('')
  const [neighborhoodOverride, setNeighborhoodOverride] = useState('auto')
  const [sqft, setSqft] = useState(2000)
  const [matId, setMatId] = useState('asphalt-arch')
  const [pitchId, setPitchId] = useState('moderate')
  const [ageId, setAgeId] = useState('20-30')

  // Resolve neighborhood
  const detectedSlug = useMemo(() => {
    if (neighborhoodOverride !== 'auto') return neighborhoodOverride
    if (zip.length >= 5) return getNeighborhoodForZip(zip) ?? 'hawthorne'
    return 'hawthorne'
  }, [zip, neighborhoodOverride])

  const neighborhood = neighborhoods.find((n) => n.slug === detectedSlug) ?? neighborhoods[1]

  const mat = MATERIALS.find((m) => m.id === matId) ?? MATERIALS[0]
  const pitch = PITCHES.find((p) => p.id === pitchId) ?? PITCHES[2]
  const age = AGE_BUCKETS.find((a) => a.id === ageId) ?? AGE_BUCKETS[2]

  // Calculation
  const indexFactor = neighborhood.indexPct / 71  // 71 = portland baseline
  const materialCost = sqft * mat.perSf * indexFactor
  const labourCost = materialCost * 0.45 * pitch.multiplier * mat.laborMultiplier
  const tearOffCost = age.twoLayer ? sqft * 1.5 : sqft * 1.0
  const deckRepair = age.deckRepair
  const ventilationCost = age.ventilationFlag ? 700 : 0
  const permitFee = (() => {
    const feeStr = neighborhood.permitDetail.fee
    const match = feeStr.match(/\$(\d+(?:,\d+)?)/g)
    if (!match) return 350
    const nums = match.map((s) => parseInt(s.replace(/[$,]/g, ''), 10))
    return Math.round((nums[0] + (nums[1] ?? nums[0])) / 2)
  })()
  const designReviewFee = neighborhood.permitScore >= 4 ? 580 : 0
  const cleanup = sqft * 0.20

  const lineItems = [
    { label: `Tear-off & disposal${age.twoLayer ? ' (2-layer)' : ''}`, amount: tearOffCost },
    { label: `${mat.label} material`, amount: materialCost },
    { label: `Labour & install (${pitch.label} pitch ${pitch.multiplier > 1 ? `+${Math.round((pitch.multiplier - 1) * 100)}%` : ''})`, amount: labourCost },
    ...(deckRepair > 0 ? [{ label: 'Deck repair allowance (age-based)', amount: deckRepair }] : []),
    ...(ventilationCost > 0 ? [{ label: 'Attic ventilation upgrade', amount: ventilationCost }] : []),
    { label: `Permit (${neighborhood.name})`, amount: permitFee },
    ...(designReviewFee > 0 ? [{ label: 'Historic / design review fee', amount: designReviewFee }] : []),
    { label: 'Cleanup & magnetic sweep', amount: cleanup },
  ]

  const subtotal = lineItems.reduce((acc, li) => acc + li.amount, 0)
  const low = Math.round(subtotal * 0.92 / 100) * 100
  const high = Math.round(subtotal * 1.18 / 100) * 100

  // Top neighborhood cost driver
  const topDriver = neighborhood.costDrivers[0]

  // Material warnings
  const ageNum = age.id === '0-10' ? 5 : age.id === '10-20' ? 15 : age.id === '20-30' ? 25 : 35
  const showAgeWarning = matId === 'asphalt-arch' && ageNum >= 22

  const f = { fontFamily: 'var(--font-barlow)' } as const
  const m = { fontFamily: 'var(--font-space-mono)' } as const
  const c = { fontFamily: 'var(--font-barlow-cond)' } as const
  const d = { fontFamily: 'var(--font-bebas)' } as const

  const btnBase: React.CSSProperties = {
    padding: '0.6rem 0.5rem',
    background: 'var(--bg3)',
    border: '1px solid var(--bdr)',
    color: 'var(--muted)',
    ...c, fontSize: '0.78rem', letterSpacing: '0.04em',
    cursor: 'pointer', textAlign: 'left' as const,
    transition: 'all 0.15s',
  }
  const btnSel: React.CSSProperties = {
    ...btnBase, borderColor: 'var(--amber)', background: 'rgba(245,166,35,0.07)', color: 'var(--amber)',
  }

  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--bdr)' }}>
      <div style={{ padding: '1.6rem 2rem', borderBottom: '1px solid var(--bdr)' }}>
        <div style={{ ...m, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>▸ Portland Roof Cost Calculator</div>
        <h3 style={{ ...d, fontSize: '1.7rem', color: 'var(--text)', lineHeight: 1 }}>ESTIMATE WITH LOCAL COST DRIVERS</h3>
        <div style={{ ...f, fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.5rem', fontWeight: 300 }}>Pulls from {neighborhoods.length}-market PDX cost intelligence. ZIP routing detects the closest market automatically.</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(280px, 1fr)', gap: '1px', background: 'var(--bdr)' }} className="calc-grid">
        {/* LEFT: inputs */}
        <div style={{ background: 'var(--bg2)', padding: '1.7rem 1.7rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* ZIP */}
          <div>
            <label style={{ display: 'block', ...c, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.55rem' }}>Your ZIP code</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text" inputMode="numeric" maxLength={5}
                placeholder="e.g. 97214" value={zip}
                onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
                style={{ flex: 1, padding: '0.7rem 0.9rem', background: 'var(--bg3)', border: '1px solid var(--bdr)', color: 'var(--text)', ...m, fontSize: '0.95rem' }}
              />
              {zip.length >= 5 && neighborhoodOverride === 'auto' && (
                <div style={{ padding: '0.7rem 0.9rem', background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)', ...m, fontSize: '0.7rem', color: 'var(--amber)' }}>
                  → {neighborhood.name}
                </div>
              )}
            </div>
            <div style={{ marginTop: '0.6rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ ...m, fontSize: '0.62rem', color: 'var(--muted)' }}>OR override:</span>
              <select
                value={neighborhoodOverride}
                onChange={(e) => setNeighborhoodOverride(e.target.value)}
                style={{ padding: '0.4rem 0.7rem', background: 'var(--bg3)', border: '1px solid var(--bdr)', color: 'var(--text)', ...c, fontSize: '0.8rem' }}
              >
                {NEIGHBORHOODS_FOR_PICKER.map((n) => (
                  <option key={n.slug} value={n.slug}>{n.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Square footage */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
              <label style={{ ...c, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>Roof area (sq ft)</label>
              <span style={{ ...d, fontSize: '1.5rem', color: 'var(--amber)', lineHeight: 1 }}>{sqft.toLocaleString()}</span>
            </div>
            <input type="range" min={800} max={4500} step={50} value={sqft} onChange={(e) => setSqft(Number(e.target.value))} className="calc-slider" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem', ...m, fontSize: '0.6rem', color: 'var(--muted)' }}>
              <span>800</span>
              <span>Typical PDX 1,800–2,200</span>
              <span>4,500</span>
            </div>
          </div>

          {/* Material */}
          <div>
            <label style={{ display: 'block', ...c, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.55rem' }}>Material</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {MATERIALS.map((mt) => (
                <button key={mt.id} onClick={() => setMatId(mt.id)} style={matId === mt.id ? btnSel : btnBase}>
                  <span style={{ display: 'block', fontWeight: 600, marginBottom: '0.1rem' }}>{mt.label}</span>
                  <span style={{ display: 'block', fontSize: '0.65rem', color: matId === mt.id ? 'rgba(245,166,35,0.7)' : 'var(--muted)' }}>${mt.perSf.toFixed(2)}/sq ft material</span>
                </button>
              ))}
            </div>
          </div>

          {/* Pitch */}
          <div>
            <label style={{ display: 'block', ...c, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.55rem' }}>Roof pitch</label>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {PITCHES.map((p) => (
                <button key={p.id} onClick={() => setPitchId(p.id)} style={{ ...(pitchId === p.id ? btnSel : btnBase), flex: '1 1 auto', textAlign: 'center', padding: '0.55rem 0.3rem' }}>
                  <span style={{ display: 'block', fontWeight: 600, fontSize: '0.78rem' }}>{p.label}</span>
                  <span style={{ display: 'block', fontSize: '0.6rem', color: pitchId === p.id ? 'rgba(245,166,35,0.7)' : 'var(--muted)' }}>{p.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Age */}
          <div>
            <label style={{ display: 'block', ...c, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.55rem' }}>Current roof age</label>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {AGE_BUCKETS.map((a) => (
                <button key={a.id} onClick={() => setAgeId(a.id)} style={{ ...(ageId === a.id ? btnSel : btnBase), flex: 1, textAlign: 'center', padding: '0.55rem 0.3rem' }}>
                  <span style={{ display: 'block', fontWeight: 600, fontSize: '0.78rem' }}>{a.label}</span>
                </button>
              ))}
            </div>
            {showAgeWarning && (
              <div style={{ marginTop: '0.6rem', padding: '0.55rem 0.8rem', background: 'rgba(200,32,44,0.05)', borderLeft: '3px solid var(--red)' }}>
                <div style={{ ...f, fontSize: '0.78rem', color: 'var(--text)', lineHeight: 1.5, fontWeight: 300 }}>
                  At 22+ years, asphalt is at end of life in PDX climate. Consider metal upgrade for next replacement to avoid another cycle in 25 years.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: result */}
        <div style={{ background: 'var(--bg2)', padding: '1.7rem 1.7rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Total */}
          <div style={{ background: 'var(--bg)', border: '1px solid var(--bdr)', padding: '1.5rem 1.7rem' }}>
            <div style={{ ...m, fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Estimated project cost · {neighborhood.name}</div>
            <div style={{ ...d, fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)', color: 'var(--amber)', lineHeight: 1, marginBottom: '0.4rem' }}>{fmt(low)} – {fmt(high)}</div>
            <div style={{ ...m, fontSize: '0.7rem', color: 'var(--muted)' }}>{sqft.toLocaleString()} sq ft · {mat.label.split(' ')[0]} · {pitch.label} pitch · {age.label}</div>
          </div>

          {/* Line items */}
          <div style={{ background: 'var(--bg)', border: '1px solid var(--bdr)' }}>
            <div style={{ padding: '0.7rem 1.2rem', background: 'var(--bg3)', borderBottom: '1px solid var(--bdr)', ...m, fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Line-item breakdown</div>
            <div style={{ padding: '0.7rem 1.2rem' }}>
              {lineItems.map((li, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0.5rem 0', borderBottom: i < lineItems.length - 1 ? '1px dashed var(--bdr)' : 'none' }}>
                  <span style={{ ...f, fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 300, flex: 1, paddingRight: '0.5rem' }}>{li.label}</span>
                  <span style={{ ...m, fontSize: '0.78rem', color: 'var(--text)', fontWeight: 500, whiteSpace: 'nowrap' }}>{fmt(li.amount)}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0.7rem 0 0', borderTop: '1px solid var(--bdr)', marginTop: '0.4rem' }}>
                <span style={{ ...c, fontSize: '0.85rem', color: 'var(--text)', fontWeight: 700 }}>Subtotal</span>
                <span style={{ ...d, fontSize: '1.2rem', color: 'var(--amber)', whiteSpace: 'nowrap' }}>{fmt(subtotal)}</span>
              </div>
            </div>
          </div>

          {/* Top driver from neighborhood data */}
          <div style={{ padding: '0.9rem 1.1rem', background: 'rgba(245,166,35,0.05)', borderLeft: '3px solid var(--amber-btn)' }}>
            <div style={{ ...m, fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Top {neighborhood.name} cost driver</div>
            <div style={{ ...c, fontSize: '0.92rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.3rem' }}>{topDriver.factor} <span style={{ color: 'var(--amber)' }}>· {topDriver.impact}</span></div>
            <p style={{ ...f, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.55, fontWeight: 300 }}>{topDriver.detail}</p>
          </div>

          {/* Disclaimer */}
          <div style={{ ...m, fontSize: '0.6rem', color: 'var(--muted)', lineHeight: 1.6 }}>
            Estimates based on Q2 2026 Portland metro contractor data including the April 2026 manufacturer price increases. Range reflects typical contractor variance — actual quotes depend on site access, deck condition (only knowable after tear-off), and crew availability.
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Link href={`/portland/${neighborhood.slug}`} style={{ flex: 1, padding: '0.85rem 1rem', background: 'var(--amber)', color: '#000', ...c, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', textAlign: 'center', whiteSpace: 'nowrap' }}>
              {neighborhood.name} Detail →
            </Link>
            <a href="#quote" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('openModal')) }} style={{ flex: 1, padding: '0.85rem 1rem', background: 'transparent', color: 'var(--amber)', border: '1px solid var(--amber)', ...c, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', textAlign: 'center', whiteSpace: 'nowrap' }}>
              Get Real Quotes →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
