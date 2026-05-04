'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { neighborhoods } from '@/lib/neighborhoods'

interface MaterialLifecycle {
  id: 'asphalt' | 'metal' | 'cedar'
  label: string
  perSf: number
  expectedLifeYears: number
  annualMaintenance: number
  cyclicalMaintenance: { everyYears: number; cost: number }[]
  endOfLifeReplacementMultiplier: number  // inflation factor for replacement at year N
}

const MATERIALS: MaterialLifecycle[] = [
  {
    id: 'asphalt',
    label: 'Architectural Asphalt',
    perSf: 4.50,
    expectedLifeYears: 25,
    annualMaintenance: 0,
    cyclicalMaintenance: [
      { everyYears: 2, cost: 450 },  // moss treatment in canopied PDX
    ],
    endOfLifeReplacementMultiplier: 1.5,  // material costs rise ~50% per cycle
  },
  {
    id: 'metal',
    label: 'Standing Seam Metal',
    perSf: 11.00,
    expectedLifeYears: 55,
    annualMaintenance: 0,
    cyclicalMaintenance: [
      { everyYears: 5, cost: 350 },  // sealant inspection / minor flashing touch-up
    ],
    endOfLifeReplacementMultiplier: 1.5,
  },
  {
    id: 'cedar',
    label: 'Cedar Shake (#1 grade, treated)',
    perSf: 13.00,
    expectedLifeYears: 28,
    annualMaintenance: 0,
    cyclicalMaintenance: [
      { everyYears: 2, cost: 600 },   // moss/cleaning
      { everyYears: 8, cost: 1500 },  // fire retardant renewal
    ],
    endOfLifeReplacementMultiplier: 1.5,
  },
]

function calcLifecycle(mat: MaterialLifecycle, sqft: number, holdYears: number, indexFactor: number) {
  const initialInstall = sqft * mat.perSf * indexFactor + 1500  // baseline permit/cleanup
  let total = initialInstall
  let replacementCount = 0

  // Cyclical maintenance over hold period
  for (const cycle of mat.cyclicalMaintenance) {
    const cycleCount = Math.floor(holdYears / cycle.everyYears)
    total += cycleCount * cycle.cost
  }

  // Replacement cycles within hold
  let yearsRemaining = holdYears - mat.expectedLifeYears
  let nextReplacementCost = initialInstall * mat.endOfLifeReplacementMultiplier
  while (yearsRemaining > 0) {
    total += nextReplacementCost
    replacementCount += 1
    // Add maintenance for the new cycle
    for (const cycle of mat.cyclicalMaintenance) {
      const cycleCount = Math.floor(Math.min(yearsRemaining, mat.expectedLifeYears) / cycle.everyYears)
      total += cycleCount * cycle.cost
    }
    yearsRemaining -= mat.expectedLifeYears
    nextReplacementCost *= mat.endOfLifeReplacementMultiplier
  }

  return {
    total: Math.round(total),
    initialInstall: Math.round(initialInstall),
    maintenanceTotal: Math.round(total - initialInstall - (replacementCount * (initialInstall * mat.endOfLifeReplacementMultiplier))),
    replacementCount,
    annualCost: Math.round(total / holdYears),
  }
}

const HOLD_OPTIONS = [10, 15, 20, 25, 30, 40, 50]

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US')
}

export default function LifecycleCost() {
  const [sqft, setSqft] = useState(2000)
  const [holdYears, setHoldYears] = useState(25)
  const [neighborhoodSlug, setNeighborhoodSlug] = useState('hawthorne')

  const neighborhood = neighborhoods.find((n) => n.slug === neighborhoodSlug) ?? neighborhoods[1]
  const indexFactor = neighborhood.indexPct / 71

  const results = useMemo(() => {
    return MATERIALS.map((mat) => ({
      mat,
      ...calcLifecycle(mat, sqft, holdYears, indexFactor),
    }))
  }, [sqft, holdYears, indexFactor])

  const minTotal = Math.min(...results.map((r) => r.total))
  const maxTotal = Math.max(...results.map((r) => r.total))

  // Breakeven analysis: when does metal become cheaper than asphalt?
  const breakevenYear = useMemo(() => {
    for (let y = 5; y <= 60; y++) {
      const asphalt = calcLifecycle(MATERIALS[0], sqft, y, indexFactor).total
      const metal = calcLifecycle(MATERIALS[1], sqft, y, indexFactor).total
      if (metal <= asphalt) return y
    }
    return null
  }, [sqft, indexFactor])

  const f = { fontFamily: 'var(--font-barlow)' } as const
  const m = { fontFamily: 'var(--font-space-mono)' } as const
  const c = { fontFamily: 'var(--font-barlow-cond)' } as const
  const d = { fontFamily: 'var(--font-bebas)' } as const

  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--bdr)' }}>
      <div style={{ padding: '1.6rem 2rem', borderBottom: '1px solid var(--bdr)' }}>
        <div style={{ ...m, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>▸ Material Lifecycle Cost</div>
        <h3 style={{ ...d, fontSize: '1.7rem', color: 'var(--text)', lineHeight: 1 }}>IS METAL ACTUALLY WORTH IT?</h3>
        <div style={{ ...f, fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.5rem', fontWeight: 300 }}>
          Total ownership cost over your hold period including maintenance cycles, moss treatment, and end-of-life replacement. Resolves the metal vs asphalt question with math.
        </div>
      </div>

      {/* Inputs */}
      <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--bdr)', background: 'var(--bg2)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', ...c, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.45rem' }}>Roof size (sq ft)</label>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span style={{ ...d, fontSize: '1.4rem', color: 'var(--amber)', lineHeight: 1 }}>{sqft.toLocaleString()}</span>
          </div>
          <input type="range" min={800} max={4500} step={100} value={sqft} onChange={(e) => setSqft(Number(e.target.value))} className="calc-slider" />
        </div>

        <div>
          <label style={{ display: 'block', ...c, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.45rem' }}>Hold period (years)</label>
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            {HOLD_OPTIONS.map((y) => (
              <button key={y} onClick={() => setHoldYears(y)} style={{ flex: '1 1 50px', padding: '0.5rem 0.4rem', background: holdYears === y ? 'rgba(245,166,35,0.1)' : 'var(--bg3)', border: holdYears === y ? '1px solid var(--amber)' : '1px solid var(--bdr)', color: holdYears === y ? 'var(--amber)' : 'var(--muted)', ...c, fontSize: '0.78rem', cursor: 'pointer' }}>
                {y}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', ...c, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.45rem' }}>Neighborhood</label>
          <select value={neighborhoodSlug} onChange={(e) => setNeighborhoodSlug(e.target.value)} style={{ width: '100%', padding: '0.6rem 0.7rem', background: 'var(--bg3)', border: '1px solid var(--bdr)', color: 'var(--text)', ...c, fontSize: '0.85rem' }}>
            {neighborhoods.map((n) => (<option key={n.slug} value={n.slug}>{n.name}</option>))}
          </select>
        </div>
      </div>

      {/* Comparison cards */}
      <div style={{ padding: '1.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '1px', background: 'var(--bdr)' }}>
          {results.map((r) => {
            const isLowest = r.total === minTotal
            const isHighest = r.total === maxTotal
            const barPct = ((r.total - minTotal) / (maxTotal - minTotal || 1)) * 100
            return (
              <div key={r.mat.id} style={{ background: isLowest ? 'rgba(26,138,69,0.05)' : 'var(--bg)', padding: '1.4rem 1.5rem', borderTop: isLowest ? '3px solid #1A8A45' : '3px solid var(--bdr)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                  <div style={{ ...c, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)' }}>{r.mat.label}</div>
                  {isLowest && <span style={{ ...m, fontSize: '0.55rem', color: '#1A8A45', letterSpacing: '0.08em', padding: '0.15rem 0.4rem', background: 'rgba(26,138,69,0.15)' }}>LOWEST</span>}
                  {isHighest && !isLowest && <span style={{ ...m, fontSize: '0.55rem', color: 'var(--red)', letterSpacing: '0.08em', padding: '0.15rem 0.4rem', background: 'rgba(200,32,44,0.1)' }}>HIGHEST</span>}
                </div>
                <div style={{ ...d, fontSize: '2rem', color: 'var(--amber)', lineHeight: 1, marginBottom: '0.3rem' }}>{fmt(r.total)}</div>
                <div style={{ ...m, fontSize: '0.65rem', color: 'var(--muted)', marginBottom: '0.9rem' }}>{holdYears}-year total ownership · {fmt(r.annualCost)}/yr avg</div>
                <div className="pi-bar" style={{ marginBottom: '1rem' }}>
                  <div className="pi-bar-fill" style={{ width: `${barPct}%`, background: isLowest ? '#1A8A45' : isHighest ? 'var(--red)' : 'var(--amber-btn)', height: '4px' }} />
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <li style={{ display: 'flex', justifyContent: 'space-between', ...f, fontSize: '0.78rem' }}>
                    <span style={{ color: 'var(--muted)', fontWeight: 300 }}>Initial install</span>
                    <span style={{ color: 'var(--text)', fontWeight: 500 }}>{fmt(r.initialInstall)}</span>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', ...f, fontSize: '0.78rem' }}>
                    <span style={{ color: 'var(--muted)', fontWeight: 300 }}>Maintenance cycles</span>
                    <span style={{ color: 'var(--text)', fontWeight: 500 }}>{fmt(r.maintenanceTotal)}</span>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', ...f, fontSize: '0.78rem' }}>
                    <span style={{ color: 'var(--muted)', fontWeight: 300 }}>Replacements</span>
                    <span style={{ color: 'var(--text)', fontWeight: 500 }}>{r.replacementCount} cycle{r.replacementCount === 1 ? '' : 's'}</span>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', ...f, fontSize: '0.78rem' }}>
                    <span style={{ color: 'var(--muted)', fontWeight: 300 }}>Expected life</span>
                    <span style={{ color: 'var(--text)', fontWeight: 500 }}>{r.mat.expectedLifeYears} yrs</span>
                  </li>
                </ul>
              </div>
            )
          })}
        </div>

        {/* Breakeven note */}
        {breakevenYear && (
          <div style={{ marginTop: '1.5rem', padding: '1rem 1.3rem', background: 'rgba(245,166,35,0.05)', borderLeft: '3px solid var(--amber-btn)' }}>
            <div style={{ ...m, fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Metal vs Asphalt Breakeven</div>
            <div style={{ ...c, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.3rem' }}>
              Metal becomes cheaper than asphalt at year <span style={{ color: 'var(--amber)' }}>{breakevenYear}</span> for your inputs.
            </div>
            <p style={{ ...f, fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>
              {holdYears >= breakevenYear
                ? `You're holding ${holdYears} years — past the breakeven. Metal is the rational call on lifecycle cost alone, before considering moss elimination or wind performance.`
                : `You're holding ${holdYears} years — short of the ${breakevenYear}-year breakeven. Asphalt is rational on cost; metal would need a non-cost reason (moss elimination, wind exposure, solar plans, resale).`}
            </p>
          </div>
        )}

        {/* Disclaimer */}
        <div style={{ marginTop: '1rem', ...m, fontSize: '0.6rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          Calculations use Portland metro pricing adjusted by {neighborhood.name} cost index ({neighborhood.indexPct}% of PDX baseline). Maintenance costs reflect typical canopied PDX neighborhoods; lighter-canopy areas (St. Johns, Beaverton) see ~30% lower asphalt maintenance. Replacement costs assume 50% inflation per cycle. Excludes design review fees, structural retrofit, or coating upgrades.
        </div>

        {/* CTAs */}
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Link href={`/portland/${neighborhood.slug}`} style={{ flex: '1 1 200px', padding: '0.85rem 1rem', background: 'var(--amber)', color: '#000', ...c, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', textAlign: 'center' }}>
            {neighborhood.name} cost detail →
          </Link>
          <Link href="/services/metal-roofing" style={{ flex: '1 1 200px', padding: '0.85rem 1rem', background: 'transparent', color: 'var(--amber)', border: '1px solid var(--amber)', ...c, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', textAlign: 'center' }}>
            Metal roofing detail →
          </Link>
        </div>
      </div>
    </div>
  )
}
