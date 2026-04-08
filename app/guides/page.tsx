import type { Metadata } from 'next'
import Link    from 'next/link'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { guides, categoryLabels } from '@/lib/guides'
import { SITE } from '@/lib/config'

export const metadata: Metadata = {
  title:`Portland Roofing Guides 2026 | ${SITE.name}`,
  description:'Expert roofing guides for Portland homeowners. Materials, permits, costs, and storm damage advice — all Portland-specific.',
  alternates:{canonical:`${SITE.baseUrl}/guides`},
}

export default function GuidesPage() {
  const f={fontFamily:'var(--font-barlow)'}as const
  const m={fontFamily:'var(--font-space-mono)'}as const
  const c={fontFamily:'var(--font-barlow-cond)'}as const
  return(
    <>
      <Nav />
      <PageHero
        imageUrl="/images/hero-guides-hub.jpeg"
        breadcrumb={[{label:'Home',href:'/'},{label:'Guides'}]}
        eyebrow="Portland Roofing Authority"
        title={<>ROOFING<br/><span style={{color:'#F5A623'}}>GUIDES</span></>}
        subtitle="Portland-specific guides on materials, permits, costs, and storm damage. No national averages — local data only."
      />
      <section className="section-pad" style={{background:'#fff'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'1px',background:'var(--bdr)'}}>
          {guides.map(g=>(
            <Link key={g.slug} href={`/guides/${g.slug}`} className="nbhd-card-hover" style={{background:'var(--bg2)',padding:'2rem',textDecoration:'none',display:'flex',flexDirection:'column',gap:'0.7rem'}}>
              <div style={{...m,fontSize:'0.62rem',letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--amber)'}}>{categoryLabels[g.category]}</div>
              <div style={{...c,fontSize:'1.1rem',fontWeight:700,color:'var(--text)',lineHeight:1.25}}>{g.title}</div>
              <div style={{...f,fontSize:'0.88rem',color:'var(--muted)',lineHeight:1.6,flex:1,fontWeight:300}}>{g.description}</div>
              <div style={{...c,fontSize:'0.82rem',color:'var(--amber)',letterSpacing:'0.04em'}}>{g.readTime} min read →</div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </>
  )
}
