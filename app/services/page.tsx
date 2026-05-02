import type { Metadata } from 'next'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import PageHero from '@/components/PageHero'
import ServiceLocationSelect from '@/components/ServiceLocationSelect'
import { services } from '@/lib/services'
import { neighborhoods } from '@/lib/neighborhoods'
import { SITE } from '@/lib/config'

export const metadata: Metadata = {
  title:`Portland Roofing Services — Replacement, Repair, Metal, Cedar & Flat | ${SITE.name}`,
  description:'All Portland roofing services. Vetted contractors across 10 deep cost markets — Pearl District, Hawthorne, Sellwood-Moreland, Eastmoreland, Alberta Arts, Irvington, St. Johns, West Hills, Lake Oswego, and Beaverton.',
  alternates:{canonical:`${SITE.baseUrl}/services`},
}

const featured = neighborhoods.filter(n=>n.avgCost>10000).slice(0,5)

export default function ServicesPage() {
  const f = { fontFamily:'var(--font-barlow)' } as const
  const m = { fontFamily:'var(--font-space-mono)' } as const
  const c = { fontFamily:'var(--font-barlow-cond)' } as const
  const d = { fontFamily:'var(--font-bebas)' } as const
  return (
    <>
      <Nav />
      <PageHero
        imageUrl="/images/hero-services-hub.jpeg"
        breadcrumb={[{label:'Home',href:'/'},{label:'Services'}]}
        eyebrow="Portland Metro"
        title={<>PORTLAND ROOFING<br/><span style={{color:'#F5A623'}}>SERVICES</span></>}
        subtitle="Five roofing service types across Portland's 10 deepest cost markets. Select a service, choose your location, see local pricing and available contractors."
        stats={[{label:'Service Types',value:'5'},{label:'Cost Markets',value:'10'},{label:'Avg. Response',value:'48h'}]}
      />
      <section className="section-pad" style={{background:'#fff'}}>
        <div style={{display:'flex',flexDirection:'column',gap:'1px',background:'var(--bdr)'}}>
          {services.map((s,i)=>(
            <div key={s.slug} id={s.slug} style={{background:i%2===0?'#fff':'var(--bg2)',padding:'2.5rem 3rem'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'1rem',marginBottom:'1rem'}}>
                <div>
                  <div style={{...m,fontSize:'0.65rem',color:'var(--amber)',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:'0.5rem'}}>${s.avgLow.toLocaleString()} – ${s.avgHigh.toLocaleString()} · {s.unit}</div>
                  <h2 style={{...d,fontSize:'clamp(1.6rem,3vw,2.4rem)',color:'var(--text)',lineHeight:1}}>{s.name}</h2>
                </div>
                {s.urgency==='high'&&<span style={{...m,fontSize:'0.65rem',letterSpacing:'0.1em',textTransform:'uppercase',padding:'0.3rem 0.7rem',background:'rgba(200,32,44,0.08)',color:'var(--red)',border:'1px solid rgba(200,32,44,0.2)'}}>Emergency Available</span>}
              </div>
              <p style={{...f,fontSize:'0.95rem',color:'var(--muted)',lineHeight:1.7,fontWeight:300,maxWidth:'680px',marginBottom:'1.8rem'}}>
                {s.intro.replace(/\{neighborhood\}/g,'Portland').replace(/\{zip\}/g,'').replace(/\{avgMid\}/g,s.avgMid.toLocaleString())}
              </p>
              <ServiceLocationSelect serviceSlug={s.slug} serviceName={s.name} />
              <div style={{marginTop:'1.2rem'}}>
                <div style={{...m,fontSize:'0.62rem',color:'var(--muted)',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'0.6rem'}}>Popular areas</div>
                <div style={{display:'flex',gap:'0.4rem',flexWrap:'wrap'}}>
                  {featured.map(n=>(
                    <a key={n.slug} href={`/${s.slug}/${n.slug}`} style={{...c,fontSize:'0.8rem',letterSpacing:'0.04em',color:'var(--amber)',padding:'0.35rem 0.8rem',border:'1px solid var(--bdr)',textDecoration:'none',background:i%2===0?'var(--bg2)':'#fff',whiteSpace:'nowrap'}}>{n.name}</a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  )
}
