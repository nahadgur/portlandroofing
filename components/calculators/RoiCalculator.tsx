'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

const CURRENT_YEAR = 2026
const MATERIAL_LIFE = { asphalt: 25, metal: 55, cedar: 28 }
const PORTLAND_RECOVERY_PCT = { excellent: 0.72, good: 0.65, fair: 0.55, poor: 0.45 }  // ROI on roof investment by condition at sale

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US')
}

interface ScenarioResult {
  scenario: string
  scenarioDesc: string
  roofCondAtSale: string
  buyerConcern: string
  estimatedRoofCost: number
  estimatedRecovery: number
  netImpact: number
  recommendation: string
}

export default function RoiCalculator() {
  const [homeValue, setHomeValue] = useState(650000)
  const [roofAge, setRoofAge] = useState(20)
  const [yearsToSale, setYearsToSale] = useState(2)
  const [material, setMaterial] = useState<'asphalt' | 'metal' | 'cedar'>('asphalt')

  const result = useMemo<ScenarioResult>(() => {
    const ageAtSale = roofAge + yearsToSale
    const expectedLife = MATERIAL_LIFE[material]
    const lifeRemaining = expectedLife - ageAtSale
    const lifeRemainingPct = (lifeRemaining / expectedLife) * 100

    let roofCondAtSale: string
    let buyerConcern: string
    let recoveryPct: number

    if (lifeRemainingPct > 50) {
      roofCondAtSale = 'Excellent'
      buyerConcern = 'None — roof is a positive selling point'
      recoveryPct = PORTLAND_RECOVERY_PCT.excellent
    } else if (lifeRemainingPct > 30) {
      roofCondAtSale = 'Good'
      buyerConcern = 'Low — buyers may negotiate modest credit'
      recoveryPct = PORTLAND_RECOVERY_PCT.good
    } else if (lifeRemainingPct > 10) {
      roofCondAtSale = 'Fair (approaching end of life)'
      buyerConcern = 'Moderate — 23% of PDX deals include roof contingency'
      recoveryPct = PORTLAND_RECOVERY_PCT.fair
    } else {
      roofCondAtSale = 'Poor (at or past end of life)'
      buyerConcern = 'High — buyers will demand replacement credit or back out'
      recoveryPct = PORTLAND_RECOVERY_PCT.poor
    }

    const sqftEstimate = Math.round(Math.sqrt(homeValue / 350) * 30)
    const baseInstall = sqftEstimate * (material === 'asphalt' ? 5 : material === 'metal' ? 12 : 14)
    const replacementCost = Math.round(baseInstall + 2000)
    const recovery = Math.round(replacementCost * recoveryPct)
    const netImpact = recovery - replacementCost

    let scenario: string
    let scenarioDesc: string
    let recommendation: string

    if (lifeRemainingPct > 40) {
      scenario = 'KEEP THE EXISTING ROOF'
      scenarioDesc = `Your roof has ${Math.round(lifeRemaining)} years of useful life remaining at the time of sale — well above the 8-10 year buyer comfort threshold. Replacement before sale would not be recovered.`
      recommendation = 'Disclose roof age in MLS listing. Buyers will not request replacement.'
    } else if (lifeRemainingPct > 15) {
      scenario = 'OPTIONAL: REPLACE BEFORE LISTING'
      scenarioDesc = `Your roof will be at ${Math.round(lifeRemainingPct)}% remaining life at sale. Most PDX buyers tolerate 8+ years remaining; under 8 years invites contingencies. Replacement recovery is partial.`
      recommendation = `Replacing now recovers ~${Math.round(recoveryPct * 100)}% of cost in resale value. Net impact: ${fmt(netImpact)}. Consider only if you also benefit from the new roof during your remaining ${yearsToSale} years.`
    } else if (lifeRemainingPct > 0) {
      scenario = 'STRONGLY CONSIDER REPLACING'
      scenarioDesc = `Your roof will be at end of life at sale. PDX buyer's inspectors will flag this; 23% of Portland deals include roofing contingencies that result in $4,000-$12,000 in negotiation credits.`
      recommendation = `Replacement now recovers ~${Math.round(recoveryPct * 100)}% in resale plus avoids inspection-driven price reduction. Net impact ${fmt(netImpact)} understates the case — actual value preservation is higher when accounting for avoided contingency.`
    } else {
      scenario = 'REPLACE BEFORE LISTING'
      scenarioDesc = `Your roof will be past end of life at sale. PDX buyers will either back out or demand full replacement credit ($${baseInstall.toLocaleString()}+) before closing. Some lenders will deny mortgages on past-end-of-life roofs.`
      recommendation = `Replace before listing. Replacement cost recovers ~${Math.round(recoveryPct * 100)}% in higher sale price plus avoids deal-killing inspection issues. Past-end-of-life roofs reduce sale prices by 1.5-2.5x the replacement cost.`
    }

    return {
      scenario,
      scenarioDesc,
      roofCondAtSale,
      buyerConcern,
      estimatedRoofCost: replacementCost,
      estimatedRecovery: recovery,
      netImpact,
      recommendation,
    }
  }, [homeValue, roofAge, yearsToSale, material])

  const f = { fontFamily: 'var(--font-barlow)' } as const
  const m = { fontFamily: 'var(--font-space-mono)' } as const
  const c = { fontFamily: 'var(--font-barlow-cond)' } as const
  const d = { fontFamily: 'var(--font-bebas)' } as const

  const scenarioColor = result.scenario.startsWith('KEEP') ? '#1A8A45' : result.scenario.startsWith('OPTIONAL') ? 'var(--amber-btn)' : 'var(--red)'

  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--bdr)' }}>
      <div style={{ padding: '1.6rem 2rem', borderBottom: '1px solid var(--bdr)' }}>
        <div style={{ ...m, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>▸ Roof Replacement ROI Calculator</div>
        <h3 style={{ ...d, fontSize: '1.7rem', color: 'var(--text)', lineHeight: 1 }}>SHOULD I REPLACE BEFORE I SELL?</h3>
        <div style={{ ...f, fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.5rem', fontWeight: 300 }}>
          Estimates resale recovery using PDX-specific recovery percentages (58–72% for Portland transactions, vs 60% national average). Accounts for buyer-inspection contingency dynamics that hit Portland harder than most markets.
        </div>
      </div>

      <div style={{ padding: '1.7rem 2rem', display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(280px, 1fr)', gap: '1.5rem' }} className="calc-grid">
        {/* Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
              <label style={{ ...c, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>Estimated home value</label>
              <span style={{ ...d, fontSize: '1.4rem', color: 'var(--amber)' }}>{fmt(homeValue)}</span>
            </div>
            <input type="range" min={300000} max={2000000} step={25000} value={homeValue} onChange={(e) => setHomeValue(Number(e.target.value))} className="calc-slider" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.3rem', ...m, fontSize: '0.6rem', color: 'var(--muted)' }}>
              <span>{fmt(300000)}</span>
              <span>PDX median ~{fmt(550000)}</span>
              <span>{fmt(2000000)}</span>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
              <label style={{ ...c, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>Current roof age (years)</label>
              <span style={{ ...d, fontSize: '1.4rem', color: 'var(--amber)' }}>{roofAge}</span>
            </div>
            <input type="range" min={0} max={50} step={1} value={roofAge} onChange={(e) => setRoofAge(Number(e.target.value))} className="calc-slider" />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
              <label style={{ ...c, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>Years until planned sale</label>
              <span style={{ ...d, fontSize: '1.4rem', color: 'var(--amber)' }}>{yearsToSale}</span>
            </div>
            <input type="range" min={0} max={15} step={1} value={yearsToSale} onChange={(e) => setYearsToSale(Number(e.target.value))} className="calc-slider" />
          </div>

          <div>
            <label style={{ display: 'block', ...c, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.45rem' }}>Roofing material</label>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {(['asphalt', 'metal', 'cedar'] as const).map((mt) => (
                <button key={mt} onClick={() => setMaterial(mt)} style={{ flex: 1, padding: '0.55rem 0.4rem', background: material === mt ? 'rgba(245,166,35,0.1)' : 'var(--bg3)', border: material === mt ? '1px solid var(--amber)' : '1px solid var(--bdr)', color: material === mt ? 'var(--amber)' : 'var(--muted)', ...c, fontSize: '0.78rem', textTransform: 'capitalize', cursor: 'pointer' }}>
                  {mt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Recommendation */}
          <div style={{ background: 'var(--bg)', border: '1px solid var(--bdr)', borderTop: `4px solid ${scenarioColor}`, padding: '1.4rem 1.5rem' }}>
            <div style={{ ...m, fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Recommendation</div>
            <div style={{ ...d, fontSize: '1.4rem', color: scenarioColor, lineHeight: 1.05, marginBottom: '0.7rem' }}>{result.scenario}</div>
            <p style={{ ...f, fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.65, fontWeight: 300, marginBottom: '0.6rem' }}>{result.scenarioDesc}</p>
            <p style={{ ...f, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300, fontStyle: 'italic' }}>{result.recommendation}</p>
          </div>

          {/* Numbers */}
          <div style={{ background: 'var(--bg)', border: '1px solid var(--bdr)' }}>
            <div style={{ padding: '0.75rem 1.3rem', background: 'var(--bg3)', borderBottom: '1px solid var(--bdr)' }}>
              <div style={{ ...m, fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Sale-Time Numbers</div>
            </div>
            <div style={{ padding: '0.7rem 1.3rem' }}>
              {[
                { label: 'Roof age at sale', value: `${roofAge + yearsToSale} years` },
                { label: 'Condition at sale', value: result.roofCondAtSale },
                { label: 'Buyer concern level', value: result.buyerConcern },
                { label: 'Estimated replacement cost', value: fmt(result.estimatedRoofCost) },
                { label: 'PDX resale recovery', value: fmt(result.estimatedRecovery) },
                { label: 'Net impact (replace now)', value: result.netImpact >= 0 ? `+${fmt(result.netImpact)}` : fmt(result.netImpact) },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0.5rem 0', borderBottom: i < 5 ? '1px dashed var(--bdr)' : 'none' }}>
                  <span style={{ ...f, fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 300, flex: 1, paddingRight: '0.5rem' }}>{row.label}</span>
                  <span style={{ ...m, fontSize: '0.78rem', color: 'var(--text)', fontWeight: 500, whiteSpace: 'nowrap', textAlign: 'right' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Source note */}
          <div style={{ ...m, fontSize: '0.6rem', color: 'var(--muted)', lineHeight: 1.6 }}>
            Recovery percentages drawn from National Association of Realtors regional cost-vs-value reports (58-72% for Portland metro) plus PDX-specific buyer inspection contingency data (23% of transactions include roofing contingencies, vs 14% national average). Replacement cost estimate is rough — use the cost calculator tool for accurate quote.
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Link href="/tools/cost-calculator" style={{ flex: '1 1 180px', padding: '0.85rem 1rem', background: 'var(--amber)', color: '#000', ...c, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', textAlign: 'center' }}>
              Cost Calculator →
            </Link>
            <a href="#quote" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('openModal')) }} style={{ flex: '1 1 180px', padding: '0.85rem 1rem', background: 'transparent', color: 'var(--amber)', border: '1px solid var(--amber)', ...c, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', textAlign: 'center' }}>
              Get Real Quotes →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
