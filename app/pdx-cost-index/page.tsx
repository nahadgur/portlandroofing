import type { Metadata } from 'next'
import Nav      from '@/components/Nav'
import Footer   from '@/components/Footer'
import PageHero from '@/components/PageHero'
import PriceIndex from '@/components/PriceIndex'
import CostCalculator from '@/components/CostCalculator'
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
      <Footer />
    </>
  )
}
