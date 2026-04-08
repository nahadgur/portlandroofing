import type { Metadata } from 'next'
import Nav      from '@/components/Nav'
import Footer   from '@/components/Footer'
import PageHero from '@/components/PageHero'
import PriceIndex from '@/components/PriceIndex'
import CostCalculator from '@/components/CostCalculator'
import { neighborhoods } from '@/lib/neighborhoods'
import { SITE } from '@/lib/config'

export const metadata: Metadata = {
  title:`Portland Roofing Cost Index 2026 | ${SITE.name}`,
  description:'Real Portland roofing costs by neighborhood. Updated quarterly from verified contractor quotes. Includes an interactive cost calculator.',
  alternates:{canonical:`${SITE.baseUrl}/pdx-cost-index`},
}

export default function CostIndexPage() {
  return (
    <>
      <Nav />
      <PageHero
        imageUrl="/images/hero-cost-index.jpeg"
        breadcrumb={[{label:'Home',href:'/'},{label:'PDX Cost Index'}]}
        eyebrow="2026 Data · Updated Quarterly"
        title={<>PDX ROOFING<br/><span style={{color:'#F5A623'}}>COST INDEX</span></>}
        subtitle="Real Portland pricing from verified contractor quotes — not national averages. Every zip code, every material."
        stats={[{label:'Data Points',value:'200+'},{label:'Neighborhoods',value:'50'},{label:'Updated',value:'Q2 2026'}]}
      />
      <PriceIndex />
      <section className="section-pad" style={{background:'var(--bg2)'}}>
        <div style={{fontFamily:'var(--font-space-mono)',fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ Interactive Calculator ]</div>
        <h2 style={{fontFamily:'var(--font-bebas)',fontSize:'clamp(2rem,4vw,3rem)',color:'var(--text)',lineHeight:1,marginBottom:'0.5rem'}}>CALCULATE YOUR COST</h2>
        <p style={{fontFamily:'var(--font-barlow)',fontSize:'0.95rem',color:'var(--muted)',maxWidth:'520px',fontWeight:300,marginBottom:'2.5rem'}}>Adjust for your roof size, pitch, material, and tear-off requirements.</p>
        <CostCalculator />
      </section>

      {/* Neighbourhood cost snapshots */}
      <section className="section-pad" style={{background:'#fff'}}>
        <div style={{fontFamily:'var(--font-space-mono)',fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ Cost Snapshots by Neighborhood ]</div>
        <h2 style={{fontFamily:'var(--font-bebas)',fontSize:'clamp(1.8rem,3vw,2.5rem)',color:'var(--text)',lineHeight:1,marginBottom:'0.5rem'}}>SELECT YOUR NEIGHBORHOOD</h2>
        <p style={{fontFamily:'var(--font-barlow)',fontSize:'0.9rem',color:'var(--muted)',maxWidth:'520px',lineHeight:1.65,fontWeight:300,marginBottom:'2rem'}}>
          Each neighborhood page shows localised costs, material breakdown, permit difficulty, and area comparison — all from verified 2026 contractor quotes.
        </p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'1px',background:'var(--bdr)'}}>
          {neighborhoods.map(n => {
            const diff = Math.round((n.avgCost / 9400 - 1) * 100)
            return (
              <a key={n.slug} href={`/pdx-cost-index/${n.slug}`} style={{display:'block',padding:'1rem 1.2rem',background:'var(--bg2)',textDecoration:'none',transition:'background 0.15s'}}
                onMouseEnter={e=>(e.currentTarget.style.background='var(--bg3)')}
                onMouseLeave={e=>(e.currentTarget.style.background='var(--bg2)')}
              >
                <div style={{fontFamily:'var(--font-space-mono)',fontSize:'0.6rem',color:'var(--amber)',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'0.3rem'}}>{n.zip}</div>
                <div style={{fontFamily:'var(--font-barlow-cond)',fontSize:'0.95rem',fontWeight:700,color:'var(--text)',marginBottom:'0.25rem'}}>{n.name}</div>
                <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
                  <span style={{fontFamily:'var(--font-bebas)',fontSize:'1rem',color:'var(--text)'}}>${n.avgCost.toLocaleString()}</span>
                  {diff !== 0 && (
                    <span style={{fontFamily:'var(--font-space-mono)',fontSize:'0.58rem',color:diff>0?'var(--red)':'var(--green)'}}>
                      {diff>0?'+':''}{diff}%
                    </span>
                  )}
                </div>
              </a>
            )
          })}
        </div>
      </section>

      <Footer />
    </>
  )
}
