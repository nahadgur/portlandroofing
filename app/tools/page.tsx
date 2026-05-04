import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { SITE } from '@/lib/config'
import { breadcrumbSchema } from '@/lib/schema'

const PAGE_URL = `${SITE.baseUrl}/tools`

export const metadata: Metadata = {
  title: `Portland Roofing Tools — Cost Calculator, Permit Lookup, Wind Risk, ROI | ${SITE.name}`,
  description: 'Five free Portland roofing calculators: cost estimator with neighborhood-specific cost drivers, BDS permit difficulty lookup, material lifecycle cost comparison, wind damage risk score, and ROI / resale calculator.',
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Portland Roofing Tools', description: 'Five free Portland-specific roofing calculators powered by 10-market PDX cost intelligence.', url: PAGE_URL, type: 'website' },
}

const tools = [
  {
    slug: 'cost-calculator',
    title: 'Roof Cost Calculator',
    description: 'Estimate your replacement cost with line-item breakdown. Uses ZIP routing to apply neighborhood-specific cost drivers, deck repair allowances, and permit fees. Built on the same 10-market PDX cost intelligence as our market pages.',
    inputs: ['ZIP code', 'Square footage', 'Material', 'Pitch', 'Current roof age'],
    output: 'Estimated cost range + line-item breakdown',
  },
  {
    slug: 'permit-lookup',
    title: 'Permit Difficulty Lookup',
    description: 'Identify permit class, design review status, fee range, and special requirements for your Portland address before you sign a contract. Knowing this saves 4–8 weeks of timeline surprises in historic districts.',
    inputs: ['Address or ZIP'],
    output: 'Permit complexity score + design review status + fees + special requirements',
  },
  {
    slug: 'lifecycle-cost',
    title: 'Material Lifecycle Cost',
    description: 'Compare 25/50-year ownership cost for asphalt vs. metal vs. cedar including maintenance cycles, moss treatment, and end-of-life replacement. Resolves the metal vs. asphalt question with math.',
    inputs: ['Roof size', 'Hold period', 'Neighborhood'],
    output: 'Total ownership cost per material + breakeven analysis',
  },
  {
    slug: 'wind-risk',
    title: 'Wind Damage Risk Score',
    description: '1–5 wind exposure rating for your Portland address based on Gorge corridor proximity, ridge-line exposure, and historical major-event data. Recommends material wind rating spec.',
    inputs: ['ZIP code'],
    output: 'Risk score 1-5 + recommended material spec',
  },
  {
    slug: 'roi',
    title: 'ROI / Resale Calculator',
    description: 'Should you replace before selling? Estimates resale recovery using PDX-specific recovery percentages and accounts for buyer-inspection contingency dynamics that hit Portland harder than most markets.',
    inputs: ['Home value', 'Roof age', 'Years to sale', 'Material'],
    output: 'Replace-now-vs-keep recommendation + dollar impact',
  },
]

export default function ToolsHubPage() {
  const f = { fontFamily: 'var(--font-barlow)' } as const
  const m = { fontFamily: 'var(--font-space-mono)' } as const
  const c = { fontFamily: 'var(--font-barlow-cond)' } as const
  const d = { fontFamily: 'var(--font-bebas)' } as const

  return (
    <>
      <Script id="s1" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema([
        { name: 'Home', url: SITE.baseUrl },
        { name: 'Tools', url: PAGE_URL },
      ]))}</Script>

      <Nav />
      <PageHero
        imageUrl="/images/hero-services-hub.jpeg"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Tools' }]}
        eyebrow="Free PDX-Specific Tools"
        title={<>PORTLAND ROOFING<br /><span style={{ color: '#F5A623' }}>CALCULATORS</span></>}
        subtitle="Five free Portland-specific roofing tools built on the same 10-market cost intelligence as the rest of our site. No sign-up. No data harvesting. Real numbers, real local accuracy."
        stats={[{ label: 'Calculators', value: '5' }, { label: 'PDX Markets', value: '10' }, { label: 'Free', value: 'Always' }]}
      />

      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
            {tools.map((tool, i) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                style={{
                  display: 'block',
                  background: i % 2 === 0 ? 'var(--bg2)' : '#fff',
                  padding: '2rem 2.5rem',
                  textDecoration: 'none',
                  transition: 'background 0.15s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.6rem' }}>
                  <div>
                    <div style={{ ...m, fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Tool {String(i + 1).padStart(2, '0')}</div>
                    <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'var(--text)', lineHeight: 1 }}>{tool.title.toUpperCase()}</h2>
                  </div>
                  <span style={{ ...c, fontSize: '0.85rem', fontWeight: 700, color: 'var(--amber)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Open tool →</span>
                </div>
                <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300, marginBottom: '0.9rem', maxWidth: '700px' }}>{tool.description}</p>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ ...m, fontSize: '0.55rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Inputs</div>
                    <div style={{ ...c, fontSize: '0.78rem', color: 'var(--text)', fontWeight: 600 }}>{tool.inputs.join(' · ')}</div>
                  </div>
                  <div>
                    <div style={{ ...m, fontSize: '0.55rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Output</div>
                    <div style={{ ...c, fontSize: '0.78rem', color: 'var(--amber)', fontWeight: 600 }}>{tool.output}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap">
          <div style={{ ...m, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ How These Tools Work ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '1.5rem' }}>WHY THESE NUMBERS ARE BETTER THAN GENERIC CALCULATORS</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ ...f, fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.75, fontWeight: 300 }}>
              Generic roofing calculators apply national averages to a Portland property. That misses the variables that move PDX quotes most: skip-sheathed deck overlay on pre-1925 stock ($2,500–$5,000), Portland BDS ventilation enforcement ($400–$1,200), historic district design review timeline (4–6 weeks), East Wind corridor specification ($200–$500), and the 18–22 year asphalt life that PDX moss compresses from the manufacturer-advertised 25–30.
            </p>
            <p style={{ ...f, fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.75, fontWeight: 300 }}>
              Our calculators pull from the same 10-market PDX cost intelligence as the rest of our site. The cost calculator routes your ZIP to the closest kept market and applies that market&apos;s specific cost drivers and permit fee structure. The permit lookup pulls the actual BDS / Washington County / Clackamas County permit requirements for your area, including design review triggers. The wind risk score uses neighborhood-specific exposure data with material spec recommendations matched to local conditions.
            </p>
            <p style={{ ...f, fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.75, fontWeight: 300 }}>
              All five tools are free, no sign-up, no data harvesting. They&apos;re free because the same intelligence powers our paid contractor matching service — better tools mean better matches.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
