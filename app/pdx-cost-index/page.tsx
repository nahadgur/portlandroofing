import type { Metadata } from 'next'
import Script         from 'next/script'
import Link           from 'next/link'
import Nav            from '@/components/Nav'
import Footer         from '@/components/Footer'
import LeadForm       from '@/components/LeadForm'
import CostCalculator from '@/components/CostCalculator'
import { neighborhoods } from '@/lib/neighborhoods'
import { SITE }       from '@/lib/config'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title:       `Portland Roofing Cost Index 2026 — Real Local Pricing Data | ${SITE.name}`,
  description: 'The definitive Portland roofing cost guide. Calculate your cost, compare materials, and see average replacement costs by neighborhood — based on verified contractor quotes.',
  alternates:  { canonical: `${SITE.baseUrl}/pdx-cost-index` },
}

const calculatorSchema = {
  '@context':       'https://schema.org',
  '@type':          'SoftwareApplication',
  name:             'Portland Roof Cost Calculator',
  applicationCategory: 'UtilityApplication',
  description:      'Calculate roof replacement costs for Portland, Oregon homes by square footage, material, and roof pitch. Based on real local contractor quotes.',
  url:              `${SITE.baseUrl}/pdx-cost-index`,
  offers:           { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  operatingSystem:  'Web Browser',
}

const materialRows = [
  {name:'Asphalt 3-Tab',             low:5800,  high:9000,  life:'20–25 yrs', best:'Budget replacement, rental properties',  barPct:50},
  {name:'Asphalt Architectural',      low:7500,  high:12000, life:'25–30 yrs', best:'Most PDX homes — best overall value',    barPct:65},
  {name:'Asphalt Class 4 Impact',     low:9000,  high:14000, life:'30–40 yrs', best:'Storm-prone zones, insurance discounts', barPct:75},
  {name:'Cedar Shake',                low:11000, high:18500, life:'25–30 yrs', best:'Historic districts, premium aesthetic',  barPct:85},
  {name:'Metal Corrugated / R-Panel', low:9000,  high:16000, life:'40–50 yrs', best:'Commercial, modern builds',             barPct:80},
  {name:'Metal Standing Seam',        low:14000, high:24000, life:'50+ yrs',   best:'Best long-term ROI, West Hills / LO',   barPct:100},
  {name:'Flat / TPO / EPDM',          low:5500,  high:10000, life:'15–25 yrs', best:'Pearl, Lloyd, commercial flat roofs',   barPct:45},
]

const sortedNbhds = [...neighborhoods].sort((a,b)=>b.avgCost-a.avgCost)
const maxCost     = sortedNbhds[0]?.avgCost ?? 13200

export default function CostIndexPage() {
  return (
    <>
      <Script id="schema-bc"   type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema([{name:'Home',url:SITE.baseUrl},{name:'PDX Cost Index',url:`${SITE.baseUrl}/pdx-cost-index`}]))}</Script>
      <Script id="schema-calc" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(calculatorSchema)}</Script>

      <Nav />

      {/* Breadcrumb */}
      <div style={{padding:'0.8rem 3rem',borderBottom:'1px solid var(--bdr)',background:'var(--bg2)'}}>
        <div style={{fontFamily:'var(--font-space-mono)',fontSize:'0.68rem',color:'var(--muted)',display:'flex',gap:'0.5rem'}}>
          <Link href="/" style={{color:'var(--amber)',textDecoration:'none'}}>Home</Link>
          <span>›</span>
          <span style={{color:'var(--text)'}}>PDX Cost Index</span>
        </div>
      </div>

      {/* Page hero */}
      <div className="section-pad" style={{background:'var(--bg2)'}}>
        <div style={{fontFamily:'var(--font-space-mono)',fontSize:'0.72rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'1rem'}}>▸ Updated Q2 2026 · Based on 200+ verified quotes</div>
        <h1 style={{fontFamily:'var(--font-bebas)',fontSize:'clamp(2.5rem,5vw,4.5rem)',lineHeight:0.9,color:'var(--text)',marginBottom:'1rem'}}>
          PDX ROOFING<br/><span style={{color:'var(--amber)'}}>COST INDEX</span>
        </h1>
        <p style={{fontFamily:'var(--font-barlow)',fontSize:'1.05rem',color:'var(--muted)',maxWidth:'600px',lineHeight:1.7,fontWeight:300}}>
          The only Portland roofing cost guide built from local data. Every figure comes from verified contractor quotes — not national averages, not guesswork. Use the calculator below to estimate your specific project.
        </p>
        <div className="grid-index-stats">
          {[
            {label:'PDX Metro Average',     value:'$9,400'},
            {label:'Lowest Zone Avg.',       value:'$7,400'},
            {label:'Highest Zone Avg.',      value:'$13,200'},
            {label:'Neighborhoods Tracked',  value:'50'},
          ].map(({label,value})=>(
            <div key={label} style={{background:'var(--bg)',padding:'1.5rem'}}>
              <div style={{fontFamily:'var(--font-space-mono)',fontSize:'0.65rem',color:'var(--muted)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'0.4rem'}}>{label}</div>
              <div style={{fontFamily:'var(--font-bebas)',fontSize:'2rem',color:'var(--amber)',lineHeight:1}}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CALCULATOR ── */}
      <section className="section-pad" style={{background:'var(--bg)'}}>
        <div style={{fontFamily:'var(--font-space-mono)',fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ Interactive Tool ]</div>
        <h2 style={{fontFamily:'var(--font-bebas)',fontSize:'clamp(2rem,3.5vw,3rem)',color:'var(--text)',lineHeight:1,marginBottom:'0.5rem'}}>CALCULATE YOUR COST</h2>
        <p style={{fontFamily:'var(--font-barlow)',fontSize:'0.95rem',color:'var(--muted)',maxWidth:'520px',fontWeight:300,marginBottom:'2.5rem'}}>
          Adjust square footage, material, and pitch. Estimates auto-update based on Portland contractor pricing data.
        </p>
        <CostCalculator />
      </section>

      {/* Material comparison table */}
      <section className="section-pad" style={{background:'var(--bg2)'}}>
        <div style={{fontFamily:'var(--font-space-mono)',fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ By Material ]</div>
        <h2 style={{fontFamily:'var(--font-bebas)',fontSize:'clamp(2rem,3.5vw,2.8rem)',color:'var(--text)',lineHeight:1,marginBottom:'2.5rem'}}>COST BY ROOFING MATERIAL</h2>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr>{['Material','Low Est.','High Est.','Index','Lifespan','Best For'].map(h=>(
                <th key={h} style={{fontFamily:'var(--font-space-mono)',fontSize:'0.65rem',letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--muted)',padding:'0.7rem 1rem',borderBottom:'1px solid var(--bdr)',textAlign:'left'}}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {materialRows.map(row=>(
                <tr key={row.name}>
                  <td style={{padding:'0.9rem 1rem',borderBottom:'1px solid var(--bdr)',fontFamily:'var(--font-barlow-cond)',fontSize:'0.95rem',fontWeight:600,color:'var(--text)'}}>{row.name}</td>
                  <td style={{padding:'0.9rem 1rem',borderBottom:'1px solid var(--bdr)',fontFamily:'var(--font-bebas)',fontSize:'1.1rem',color:'var(--amber)'}}>${row.low.toLocaleString()}</td>
                  <td style={{padding:'0.9rem 1rem',borderBottom:'1px solid var(--bdr)',fontFamily:'var(--font-bebas)',fontSize:'1.1rem',color:'var(--amber)'}}>${row.high.toLocaleString()}</td>
                  <td style={{padding:'0.9rem 1rem',borderBottom:'1px solid var(--bdr)',width:'120px'}}><div className="pi-bar"><div className="pi-bar-fill" style={{width:`${row.barPct}%`}}/></div></td>
                  <td style={{padding:'0.9rem 1rem',borderBottom:'1px solid var(--bdr)',fontFamily:'var(--font-space-mono)',fontSize:'0.72rem',color:'var(--muted)'}}>{row.life}</td>
                  <td style={{padding:'0.9rem 1rem',borderBottom:'1px solid var(--bdr)',fontFamily:'var(--font-barlow)',fontSize:'0.82rem',color:'var(--muted)'}}>{row.best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* All 50 neighborhoods ranked */}
      <section className="section-pad" style={{background:'var(--bg)'}}>
        <div style={{fontFamily:'var(--font-space-mono)',fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ All 50 Zones ]</div>
        <h2 style={{fontFamily:'var(--font-bebas)',fontSize:'clamp(2rem,3.5vw,2.8rem)',color:'var(--text)',lineHeight:1,marginBottom:'2.5rem'}}>EVERY NEIGHBORHOOD, RANKED</h2>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr>{['#','Neighborhood','ZIP','Area','Avg. Cost','Range','Index','Material'].map(h=>(
                <th key={h} style={{fontFamily:'var(--font-space-mono)',fontSize:'0.65rem',letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--muted)',padding:'0.7rem 0.8rem',borderBottom:'1px solid var(--bdr)',textAlign:'left',whiteSpace:'nowrap'}}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {sortedNbhds.map((n,i)=>(
                <tr key={n.slug}>
                  <td style={{padding:'0.75rem 0.8rem',borderBottom:'1px solid var(--bdr)',fontFamily:'var(--font-space-mono)',fontSize:'0.7rem',color:'var(--muted)'}}>{i+1}</td>
                  <td style={{padding:'0.75rem 0.8rem',borderBottom:'1px solid var(--bdr)'}}>
                    <Link href={`/portland/${n.slug}`} style={{fontFamily:'var(--font-barlow-cond)',fontSize:'0.95rem',fontWeight:600,color:'var(--text)',textDecoration:'none'}}>{n.name}</Link>
                  </td>
                  <td style={{padding:'0.75rem 0.8rem',borderBottom:'1px solid var(--bdr)',fontFamily:'var(--font-space-mono)',fontSize:'0.7rem',color:'var(--amber)'}}>{n.zip}</td>
                  <td style={{padding:'0.75rem 0.8rem',borderBottom:'1px solid var(--bdr)',fontFamily:'var(--font-barlow)',fontSize:'0.82rem',color:'var(--muted)'}}>{n.area}</td>
                  <td style={{padding:'0.75rem 0.8rem',borderBottom:'1px solid var(--bdr)',fontFamily:'var(--font-bebas)',fontSize:'1.1rem',color:'var(--amber)'}}>${n.avgCost.toLocaleString()}</td>
                  <td style={{padding:'0.75rem 0.8rem',borderBottom:'1px solid var(--bdr)',fontFamily:'var(--font-space-mono)',fontSize:'0.7rem',color:'var(--muted)'}}>{n.range}</td>
                  <td style={{padding:'0.75rem 0.8rem',borderBottom:'1px solid var(--bdr)',width:'100px'}}><div className="pi-bar"><div className="pi-bar-fill" style={{width:`${Math.round((n.avgCost/maxCost)*100)}%`}}/></div></td>
                  <td style={{padding:'0.75rem 0.8rem',borderBottom:'1px solid var(--bdr)'}}><span style={{fontFamily:'var(--font-space-mono)',fontSize:'0.65rem',padding:'0.15rem 0.4rem',background:'rgba(245,166,35,.08)',color:'var(--amber)',border:'1px solid rgba(245,166,35,.2)',whiteSpace:'nowrap'}}>{n.commonMaterial}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA + form */}
      <section className="section-pad grid-cta-form" style={{background:'var(--bg2)'}}>
        <div>
          <div style={{fontFamily:'var(--font-space-mono)',fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ Free Quotes ]</div>
          <h2 style={{fontFamily:'var(--font-bebas)',fontSize:'clamp(2rem,3vw,3.5rem)',color:'var(--text)',lineHeight:0.95,marginBottom:'1.2rem'}}>KNOW THE COST.<br/>NOW GET THE QUOTE.</h2>
          <p style={{fontFamily:'var(--font-barlow)',fontSize:'1rem',color:'var(--muted)',lineHeight:1.7,fontWeight:300,maxWidth:'440px'}}>Matched with vetted Portland contractors in your zip code. Free. No obligation. 48-hour response guaranteed.</p>
        </div>
        <div style={{border:'1px solid var(--bdr)'}}>
          <LeadForm />
        </div>
      </section>

      <Footer />
    </>
  )
}
