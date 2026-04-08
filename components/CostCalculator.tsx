'use client'

import { useState, useEffect, useCallback } from 'react'

/* ─── DATA ───────────────────────────────────────────────────────────── */
const materials = [
  { id: 'asphalt-arch',  label: 'Asphalt Architectural', lowPsf: 4.5,  highPsf: 7.0,  life: '25–30 yrs', tag: 'MOST POPULAR' },
  { id: 'asphalt-3tab',  label: 'Asphalt 3-Tab',         lowPsf: 3.5,  highPsf: 5.0,  life: '20–25 yrs', tag: 'BUDGET'       },
  { id: 'asphalt-c4',    label: 'Asphalt Class 4',        lowPsf: 5.5,  highPsf: 8.5,  life: '30–40 yrs', tag: 'STORM-RATED'  },
  { id: 'cedar',         label: 'Cedar Shake',            lowPsf: 7.0,  highPsf: 11.0, life: '25–30 yrs', tag: 'HISTORIC'     },
  { id: 'metal-panel',   label: 'Metal Corrugated',       lowPsf: 6.0,  highPsf: 10.0, life: '40–50 yrs', tag: null           },
  { id: 'metal-seam',    label: 'Metal Standing Seam',    lowPsf: 9.0,  highPsf: 15.0, life: '50+ yrs',   tag: 'BEST ROI'     },
  { id: 'flat-tpo',      label: 'Flat / TPO',             lowPsf: 3.5,  highPsf: 6.5,  life: '15–25 yrs', tag: null           },
]

const pitches = [
  { id: 'flat',     label: 'Flat',          sub: '0–2/12',  multiplier: 1.00 },
  { id: 'low',      label: 'Low',           sub: '3–4/12',  multiplier: 1.05 },
  { id: 'moderate', label: 'Moderate',      sub: '5–7/12',  multiplier: 1.15 },
  { id: 'steep',    label: 'Steep',         sub: '8–12/12', multiplier: 1.30 },
  { id: 'vsteep',   label: 'Very Steep',    sub: '12+/12',  multiplier: 1.50 },
]

/* ─── CALC ───────────────────────────────────────────────────────────── */
function calcCost(
  sqft:     number,
  matId:    string,
  pitchId:  string,
  tearOff:  boolean,
): { low: number; high: number } {
  const mat   = materials.find(m => m.id === matId)   ?? materials[0]
  const pitch = pitches.find(p => p.id === pitchId)   ?? pitches[2]
  const tearOffCost = tearOff ? 1.25 : 0
  const low  = Math.round(sqft * (mat.lowPsf  + tearOffCost) * pitch.multiplier / 100) * 100
  const high = Math.round(sqft * (mat.highPsf + tearOffCost) * pitch.multiplier / 100) * 100
  return { low, high }
}

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US')
}

/* ─── COMPONENT ──────────────────────────────────────────────────────── */
export default function CostCalculator() {
  const [sqft,    setSqft]    = useState(2000)
  const [matId,   setMatId]   = useState('asphalt-arch')
  const [pitchId, setPitchId] = useState('moderate')
  const [tearOff, setTearOff] = useState(true)
  const [result,  setResult]  = useState({ low: 0, high: 0 })
  const [animKey, setAnimKey] = useState(0)

  const recalc = useCallback(() => {
    setResult(calcCost(sqft, matId, pitchId, tearOff))
    setAnimKey(k => k + 1)
  }, [sqft, matId, pitchId, tearOff])

  useEffect(() => { recalc() }, [recalc])

  const selMat   = materials.find(m => m.id === matId)   ?? materials[0]
  const selPitch = pitches.find(p => p.id === pitchId)   ?? pitches[2]

  const btnBase: React.CSSProperties = {
    padding: '0.6rem 0.5rem',
    background: 'var(--bg3)',
    border: '1px solid var(--bdr)',
    color: 'var(--muted)',
    fontFamily: 'var(--font-barlow-cond)',
    fontSize: '0.78rem',
    letterSpacing: '0.04em',
    cursor: 'pointer',
    textAlign: 'left' as const,
    transition: 'all 0.15s',
  }
  const btnSel: React.CSSProperties = {
    ...btnBase,
    borderColor: 'var(--amber)',
    background: 'rgba(245,166,35,0.07)',
    color: 'var(--amber)',
  }

  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--bdr)' }}>

      {/* Header */}
      <div style={{ padding: '1.8rem 2rem', borderBottom: '1px solid var(--bdr)' }}>
        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
          ▸ PDX Roof Cost Calculator
        </div>
        <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.6rem', color: 'var(--text)', lineHeight: 1 }}>
          ESTIMATE YOUR COST
        </h3>
      </div>

      <div className="grid-calculator" style={{ padding: '2rem' }}>

        {/* ── LEFT: Controls ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>

          {/* Square footage slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.8rem' }}>
              <label style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                Roof Area (sq ft)
              </label>
              <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.6rem', color: 'var(--amber)', lineHeight: 1 }}>
                {sqft.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={800}
              max={4500}
              step={50}
              value={sqft}
              onChange={e => setSqft(Number(e.target.value))}
              className="calc-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem' }}>
              <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', color: 'var(--muted)' }}>800 sq ft</span>
              <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', color: 'var(--muted)' }}>Typical PDX: 1,800–2,200</span>
              <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', color: 'var(--muted)' }}>4,500 sq ft</span>
            </div>
          </div>

          {/* Material */}
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-barlow-cond)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.7rem' }}>
              Material
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {materials.map(m => (
                <button
                  key={m.id}
                  onClick={() => setMatId(m.id)}
                  style={matId === m.id ? btnSel : btnBase}
                >
                  <span style={{ display: 'block', fontWeight: 600, marginBottom: '0.1rem' }}>{m.label}</span>
                  <span style={{ display: 'block', fontSize: '0.65rem', color: matId === m.id ? 'rgba(245,166,35,0.7)' : 'var(--muted)' }}>
                    {m.life}{m.tag ? ` · ${m.tag}` : ''}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Pitch */}
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-barlow-cond)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.7rem' }}>
              Roof Pitch
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {pitches.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPitchId(p.id)}
                  style={{
                    ...(pitchId === p.id ? btnSel : btnBase),
                    flex: '1 1 auto',
                    textAlign: 'center' as const,
                    padding: '0.5rem 0.3rem',
                  }}
                >
                  <span style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem' }}>{p.label}</span>
                  <span style={{ display: 'block', fontSize: '0.65rem', color: pitchId === p.id ? 'rgba(245,166,35,0.7)' : 'var(--muted)' }}>{p.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tear-off toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 1rem', background: 'var(--bg3)', border: '1px solid var(--bdr)' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>Include tear-off of existing roof</div>
              <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--muted)', marginTop: '0.2rem' }}>+$1.00–$1.50 per sq ft</div>
            </div>
            <button
              onClick={() => setTearOff(t => !t)}
              style={{
                width: 44, height: 24,
                background: tearOff ? 'var(--amber)' : 'var(--bdr)',
                border: 'none', cursor: 'pointer',
                position: 'relative', transition: 'background 0.2s',
                flexShrink: 0,
              }}
              aria-label="Toggle tear-off"
            >
              <span style={{
                position: 'absolute',
                top: 4, left: tearOff ? 24 : 4,
                width: 16, height: 16,
                background: '#000',
                transition: 'left 0.2s',
                display: 'block',
              }} />
            </button>
          </div>
        </div>

        {/* ── RIGHT: Result ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Main result */}
          <div key={animKey} className="calc-result-animate" style={{ background: 'var(--bg)', border: '1px solid var(--bdr)', padding: '2rem' }}>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
              Estimated project cost (Portland metro)
            </div>
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem,4vw,3.2rem)', color: 'var(--amber)', lineHeight: 1, marginBottom: '0.3rem' }}>
              {fmt(result.low)} – {fmt(result.high)}
            </div>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.7rem', color: 'var(--muted)' }}>
              {sqft.toLocaleString()} sq ft · {selMat.label} · {selPitch.label} pitch{tearOff ? ' · incl. tear-off' : ''}
            </div>
          </div>

          {/* Breakdown */}
          <div style={{ background: 'var(--bg)', border: '1px solid var(--bdr)', padding: '1.2rem 1.5rem' }}>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Breakdown</div>
            {[
              { label: 'Material cost',  low: Math.round(sqft * selMat.lowPsf * 0.5), high: Math.round(sqft * selMat.highPsf * 0.5) },
              { label: 'Labour & install', low: Math.round(sqft * selMat.lowPsf * 0.5 * selPitch.multiplier), high: Math.round(sqft * selMat.highPsf * 0.5 * selPitch.multiplier) },
              ...(tearOff ? [{ label: 'Tear-off & disposal', low: Math.round(sqft * 1.0), high: Math.round(sqft * 1.5) }] : []),
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.45rem 0', borderBottom: '1px solid var(--bdr)' }}>
                <span style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.82rem', color: 'var(--muted)' }}>{row.label}</span>
                <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.75rem', color: 'var(--text)' }}>{fmt(row.low)}–{fmt(row.high)}</span>
              </div>
            ))}
          </div>

          {/* Pitch impact note */}
          {selPitch.multiplier > 1 && (
            <div style={{ padding: '0.8rem 1rem', background: 'rgba(245,166,35,0.05)', border: '1px solid rgba(245,166,35,0.15)' }}>
              <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--amber)', marginBottom: '0.2rem' }}>▸ PITCH PREMIUM</div>
              <div style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.78rem', color: 'var(--muted)' }}>
                {selPitch.label} pitch adds a {Math.round((selPitch.multiplier - 1) * 100)}% labour premium due to safety rigging and slower installation speed.
              </div>
            </div>
          )}

          {/* Material lifespan note */}
          <div style={{ padding: '0.8rem 1rem', background: 'var(--bg3)', border: '1px solid var(--bdr)' }}>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--muted)', marginBottom: '0.2rem' }}>MATERIAL LIFESPAN</div>
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.2rem', color: 'var(--text)' }}>{selMat.life}</div>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
              Annual cost: {fmt(Math.round(result.low / parseInt(selMat.life.split('–')[0])))}–{fmt(Math.round(result.high / parseInt(selMat.life.split('–')[0])))} / yr
            </div>
          </div>

          {/* Disclaimer */}
          <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', color: 'var(--muted)', lineHeight: 1.6, padding: '0 0.2rem' }}>
            Estimates based on Portland metro contractor data, Q2 2026. Actual costs vary by site conditions, decking state, and contractor. Get 3 quotes before committing.
          </div>

          {/* CTA */}
          <a href="/#quote" style={{
            display: 'block',
            width: '100%', padding: '1rem',
            background: 'var(--amber)', color: '#000',
            fontFamily: 'var(--font-barlow-cond)', fontWeight: 700,
            fontSize: '0.95rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            textDecoration: 'none', textAlign: 'center',
          }}>
            GET REAL QUOTES FOR YOUR ROOF →
          </a>
        </div>
      </div>
    </div>
  )
}
