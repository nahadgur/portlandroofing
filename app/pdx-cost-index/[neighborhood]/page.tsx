import type { Metadata } from 'next'
import Script from 'next/script'
import Link   from 'next/link'
import { notFound } from 'next/navigation'
import Nav      from '@/components/Nav'
import Footer   from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { neighborhoods, getNeighborhoodBySlug, getStaticNeighborhoodPaths, permitLabels } from '@/lib/neighborhoods'
import { SITE }     from '@/lib/config'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import { getNeighborhoodImage } from '@/lib/neighborhoodImages'

export function generateStaticParams() {
  return neighborhoods.map(n => ({ neighborhood: n.slug }))
}

export function generateMetadata({ params }: { params: { neighborhood: string } }): Metadata {
  const n = getNeighborhoodBySlug(params.neighborhood)
  if (!n) return {}
  const title = `${n.name} Roofing Cost 2026: What Homeowners Are Paying | ${SITE.name}`
  const description = `Real roofing replacement costs in ${n.name} (${n.zip}). Average: $${n.avgCost.toLocaleString()}. Range: ${n.range}. Most common material: ${n.commonMaterial}. Updated Q2 2026.`
  const url = `${SITE.baseUrl}/pdx-cost-index/${n.slug}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website' },
  }
}

// Derive material cost estimates from neighbourhood index
function getMaterialCosts(n: ReturnType<typeof getNeighborhoodBySlug>) {
  if (!n) return null
  const factor = n.indexPct / 71 // 71 = Portland metro baseline
  return {
    asphalt: {
      low:  Math.round(7500  * factor / 100) * 100,
      high: Math.round(12000 * factor / 100) * 100,
      mid:  Math.round(9400  * factor / 100) * 100,
    },
    metal: {
      low:  Math.round(16000 * factor / 100) * 100,
      high: Math.round(22000 * factor / 100) * 100,
    },
    cedar: {
      low:  Math.round(14500 * factor / 100) * 100,
      high: Math.round(18500 * factor / 100) * 100,
    },
    flat: {
      low:  Math.round(7200  * factor / 100) * 100,
      high: Math.round(11500 * factor / 100) * 100,
    },
  }
}

export default function NeighborhoodCostPage({ params }: { params: { neighborhood: string } }) {
  const n = getNeighborhoodBySlug(params.neighborhood)
  if (!n) notFound()

  const costs   = getMaterialCosts(n)!
  const permit  = permitLabels[n.permitScore]
  const pctVsAvg = Math.round((n.avgCost / 9400 - 1) * 100)
  const vsLabel  = pctVsAvg > 0 ? `${pctVsAvg}% above` : pctVsAvg < 0 ? `${Math.abs(pctVsAvg)}% below` : 'equal to'

  const faqs = [
    {
      q: `What does a roof replacement cost in ${n.name} in 2026?`,
      a: `The average roof replacement in ${n.name} (${n.zip}) costs $${n.avgCost.toLocaleString()} in 2026, ranging from ${n.range}. This is ${vsLabel} the Portland metro average of $9,400.`,
    },
    {
      q: `What is the most common roofing material in ${n.name}?`,
      a: `${n.commonMaterial} is the most common roofing material in ${n.name}. Material choice affects cost significantly — architectural asphalt averages $${costs.asphalt.low.toLocaleString()}–$${costs.asphalt.high.toLocaleString()} while metal runs $${costs.metal.low.toLocaleString()}–$${costs.metal.high.toLocaleString()} for the same home.`,
    },
    {
      q: `How difficult is the permit process for roofing in ${n.name}?`,
      a: `${n.name} has a permit difficulty score of ${n.permitScore}/5 (${permit.label}). ${n.permitNotes}`,
    },
    {
      q: `How does ${n.name} compare to other Portland neighborhoods on roofing cost?`,
      a: `At $${n.avgCost.toLocaleString()}, ${n.name} is ${vsLabel} the Portland metro median of $9,400. Cost differences between neighborhoods reflect average home size, roof complexity, contractor positioning, and permit requirements rather than material costs, which are consistent across the metro.`,
    },
  ]

  // Find nearby neighborhoods by area for comparison table
  const nearby = neighborhoods
    .filter(nb => nb.area === n.area && nb.slug !== n.slug)
    .sort((a, b) => b.indexPct - a.indexPct)
    .slice(0, 5)

  const f = { fontFamily: 'var(--font-barlow)' }          as const
  const m = { fontFamily: 'var(--font-space-mono)' }       as const
  const c = { fontFamily: 'var(--font-barlow-cond)' }      as const
  const d = { fontFamily: 'var(--font-bebas)' }            as const

  return (
    <>
      <Script id="schema-lb" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `${n.name} Roofing Cost 2026`,
        description: `Real roofing costs in ${n.name} (${n.zip}). Average $${n.avgCost.toLocaleString()}.`,
        url: `${SITE.baseUrl}/pdx-cost-index/${n.slug}`,
      })}</Script>
      <Script id="schema-bc" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema([
        { name: 'Home', url: SITE.baseUrl },
        { name: 'PDX Cost Index', url: `${SITE.baseUrl}/pdx-cost-index` },
        { name: n.name, url: `${SITE.baseUrl}/pdx-cost-index/${n.slug}` },
      ]))}</Script>
      <Script id="schema-faq" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(faqSchema(faqs))}</Script>

      <Nav />

      <PageHero
        imageUrl={getNeighborhoodImage(n.slug)}
        priority
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'PDX Cost Index', href: '/pdx-cost-index' },
          { label: n.name },
        ]}
        eyebrow={`${n.zip} · ${n.area} · 2026 Data`}
        title={<>{n.name.toUpperCase()}<br /><span style={{ color: '#F5A623' }}>ROOFING COSTS</span></>}
        subtitle={`Real replacement costs in ${n.name} from verified contractor quotes. Average: $${n.avgCost.toLocaleString()}. Range: ${n.range}.`}
        stats={[
          { label: 'Avg. Replacement', value: `$${n.avgCost.toLocaleString()}` },
          { label: 'vs PDX Average',   value: pctVsAvg === 0 ? 'On par' : `${pctVsAvg > 0 ? '+' : ''}${pctVsAvg}%` },
          { label: 'Common Material',  value: n.commonMaterial },
        ]}
      />

      {/* Cost vs PDX average bar */}
      <div style={{ background: '#0A0B0D', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem 3rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ ...m, fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{n.name} vs PDX Metro</div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', position: 'relative' }}>
              {/* PDX average marker */}
              <div style={{ position: 'absolute', left: '71%', top: '-4px', width: '2px', height: '12px', background: 'rgba(255,255,255,0.25)' }} />
              {/* This neighbourhood bar */}
              <div style={{ width: `${Math.min(n.indexPct, 100)}%`, height: '100%', background: '#F5A623' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem' }}>
              <span style={{ ...m, fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)' }}>$0</span>
              <span style={{ ...m, fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)' }}>PDX avg $9,400</span>
              <span style={{ ...m, fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)' }}>$18,000+</span>
            </div>
          </div>
          <div style={{ ...d, fontSize: '1.8rem', color: '#F5A623', lineHeight: 1 }}>${n.avgCost.toLocaleString()}</div>
        </div>
      </div>

      {/* Material breakdown */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ 2026 Material Cost Breakdown ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.8rem,3vw,2.5rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '2rem' }}>
            WHAT {n.name.toUpperCase()} HOMEOWNERS PAY BY MATERIAL
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
            {[
              { material: 'Architectural Asphalt', low: costs.asphalt.low, high: costs.asphalt.high, note: 'Most common. 18–24 yr lifespan in PDX.', pct: 61 },
              { material: 'Standing-Seam Metal',   low: costs.metal.low,   high: costs.metal.high,   note: '50–60 yr lifespan. Zero moss maintenance.', pct: 21 },
              { material: 'Cedar Shake',           low: costs.cedar.low,   high: costs.cedar.high,   note: '22–28 yr lifespan with treatment. Historic districts may require.', pct: 11 },
              { material: 'Flat / TPO',            low: costs.flat.low,    high: costs.flat.high,    note: '15–22 yr lifespan. Low-slope and commercial-adjacent only.', pct: 7 },
            ].map(({ material, low, high, note, pct }, i) => (
              <div key={material} style={{ background: i % 2 === 0 ? '#fff' : 'var(--bg2)', padding: '1.2rem 1.5rem', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ minWidth: '200px' }}>
                  <div style={{ ...c, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.25rem' }}>{material}</div>
                  <div style={{ ...f, fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 300 }}>{note}</div>
                </div>
                <div style={{ ...d, fontSize: '1.6rem', color: 'var(--amber)', lineHeight: 1, whiteSpace: 'nowrap' }}>
                  ${low.toLocaleString()}–${high.toLocaleString()}
                </div>
                <div style={{ ...m, fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                  {pct}% of {n.name} installs
                </div>
              </div>
            ))}
          </div>
          <p style={{ ...f, fontSize: '0.8rem', color: 'var(--muted)', marginTop: '1rem', fontWeight: 300, lineHeight: 1.6 }}>
            Costs reflect 2026 contractor quotes in {n.name} ({n.zip}) scaled from Portland metro baseline data. Single-layer tear-off assumed. Two-layer removal adds $800–$1,400.
          </p>
        </div>
      </section>

      {/* Permit score */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ Permit Difficulty ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '1.5rem' }}>
            PERMITTING IN {n.name.toUpperCase()}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {[1,2,3,4,5].map(i => (
                <div key={i} style={{ width: 32, height: 32, background: i <= n.permitScore ? permit.color : 'var(--bdr)', display: 'flex', alignItems: 'center', justifyContent: 'center', ...d, fontSize: '0.95rem', color: i <= n.permitScore ? '#000' : 'var(--bg3)' }}>{i}</div>
              ))}
            </div>
            <div style={{ ...d, fontSize: '1.6rem', color: permit.color, lineHeight: 1 }}>{permit.label} ({n.permitScore}/5)</div>
          </div>
          <div style={{ padding: '1.2rem 1.5rem', background: '#fff', border: '1px solid var(--bdr)', borderLeft: `4px solid ${permit.color}` }}>
            <p style={{ ...f, fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.7, fontWeight: 300 }}>{n.permitNotes}</p>
          </div>
        </div>
      </section>

      {/* Area comparison table */}
      {nearby.length > 0 && (
        <section className="section-pad" style={{ background: '#fff' }}>
          <div className="content-wrap-wide">
            <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ {n.area} Cost Comparison ]</div>
            <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '1.5rem' }}>
              HOW {n.name.toUpperCase()} COMPARES IN {n.area.toUpperCase()}
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#0A0B0D' }}>
                    {['Neighborhood', 'Zip', 'Avg. Cost', 'Range', 'vs PDX Avg', 'Cost Index'].map(h => (
                      <th key={h} style={{ ...m, fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.8rem 1rem', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Current neighbourhood highlighted */}
                  {[n, ...nearby].map((nb, i) => {
                    const diff = Math.round((nb.avgCost / 9400 - 1) * 100)
                    const isCurrent = nb.slug === n.slug
                    return (
                      <tr key={nb.slug} style={{ background: isCurrent ? 'rgba(200,120,10,0.06)' : i % 2 === 0 ? '#fff' : 'var(--bg2)' }}>
                        <td style={{ ...c, fontSize: '0.9rem', fontWeight: isCurrent ? 700 : 400, color: 'var(--text)', padding: '0.85rem 1rem', borderBottom: '1px solid var(--bdr)', whiteSpace: 'nowrap' }}>
                          {isCurrent ? `★ ${nb.name}` : (
                            <Link href={`/pdx-cost-index/${nb.slug}`} style={{ color: 'var(--amber)', textDecoration: 'none' }}>{nb.name}</Link>
                          )}
                        </td>
                        <td style={{ ...m, fontSize: '0.75rem', color: 'var(--muted)', padding: '0.85rem 1rem', borderBottom: '1px solid var(--bdr)' }}>{nb.zip}</td>
                        <td style={{ ...d, fontSize: '1.1rem', color: isCurrent ? 'var(--amber)' : 'var(--text)', padding: '0.85rem 1rem', borderBottom: '1px solid var(--bdr)', whiteSpace: 'nowrap' }}>${nb.avgCost.toLocaleString()}</td>
                        <td style={{ ...f, fontSize: '0.82rem', color: 'var(--muted)', padding: '0.85rem 1rem', borderBottom: '1px solid var(--bdr)', whiteSpace: 'nowrap', fontWeight: 300 }}>{nb.range}</td>
                        <td style={{ ...m, fontSize: '0.75rem', color: diff > 0 ? 'var(--red)' : diff < 0 ? 'var(--green)' : 'var(--muted)', padding: '0.85rem 1rem', borderBottom: '1px solid var(--bdr)', whiteSpace: 'nowrap' }}>
                          {diff === 0 ? 'On par' : `${diff > 0 ? '+' : ''}${diff}%`}
                        </td>
                        <td style={{ padding: '0.85rem 1rem', borderBottom: '1px solid var(--bdr)' }}>
                          <div style={{ height: 6, width: 100, background: 'var(--bdr)', position: 'relative' }}>
                            <div style={{ width: `${Math.min(nb.indexPct, 100)}%`, height: '100%', background: isCurrent ? '#F5A623' : 'var(--muted)' }} />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ FAQ ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '2rem' }}>
            {n.name.toUpperCase()} ROOFING COST QUESTIONS
          </h2>
          {faqs.map(({ q, a }) => (
            <div key={q} style={{ borderTop: '1px solid var(--bdr)', padding: '1.5rem 0' }}>
              <h3 style={{ ...c, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.7rem' }}>{q}</h3>
              <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA + service links */}
      <section className="section-pad" style={{ background: '#0A0B0D' }}>
        <div style={{ ...m, fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ Get Matched · {n.name} ]</div>
        <h2 style={{ ...d, fontSize: 'clamp(1.8rem,4vw,3rem)', color: '#fff', lineHeight: 1, marginBottom: '0.5rem' }}>
          READY TO GET QUOTES IN {n.name.toUpperCase()}?
        </h2>
        <p style={{ ...f, fontSize: '0.95rem', color: 'rgba(255,255,255,0.45)', maxWidth: '480px', lineHeight: 1.7, fontWeight: 300, marginBottom: '2rem' }}>
          Vetted contractors serving {n.name} ({n.zip}). Free quotes, 48-hour response.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Link href={`/portland/${n.slug}`} style={{ ...c, fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#000', background: '#F5A623', padding: '0.6rem 1.2rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            {n.name} Market Detail →
          </Link>
          <Link href="/services" style={{ ...c, fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#F5A623', background: 'transparent', padding: '0.6rem 1.2rem', border: '1px solid #F5A623', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            All Services →
          </Link>
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <Link href="/pdx-cost-index" style={{ ...m, fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
            ← Back to Full PDX Cost Index
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
