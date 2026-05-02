import type { Metadata } from 'next'
import Link from 'next/link'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { services } from '@/lib/services'
import { neighborhoods } from '@/lib/neighborhoods'
import { SITE } from '@/lib/config'

export const metadata: Metadata = {
  title:`Portland Roofing Services — Replacement, Repair, Metal, Cedar & Flat | ${SITE.name}`,
  description:'All Portland roofing services. Vetted contractors across 10 deep cost markets — Pearl District, Hawthorne, Sellwood-Moreland, Eastmoreland, Alberta Arts, Irvington, St. Johns, West Hills, Lake Oswego, and Beaverton.',
  alternates:{canonical:`${SITE.baseUrl}/services`},
}

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
        subtitle="Five roofing service types across Portland's 10 deepest cost markets. Each market has its own bespoke pricing intelligence — local cost drivers, three worked examples, real permit detail."
        stats={[{label:'Service Types',value:'5'},{label:'Cost Markets',value:'10'},{label:'Avg. Response',value:'48h'}]}
      />

      {/* Services list */}
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
            </div>
          ))}
        </div>
      </section>

      {/* Cost-market navigation — link to neighborhood market pages */}
      <section className="section-pad" style={{background:'var(--bg)'}}>
        <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ Local Pricing By Market ]</div>
        <h2 style={{...d,fontSize:'clamp(1.8rem,3vw,2.8rem)',color:'var(--text)',lineHeight:1,marginBottom:'1rem'}}>
          PICK YOUR PORTLAND MARKET
        </h2>
        <p style={{...f,fontSize:'0.95rem',color:'var(--muted)',maxWidth:'640px',lineHeight:1.7,fontWeight:300,marginBottom:'2rem'}}>
          Each market page covers all five services with bespoke local cost intelligence — what drives quotes locally, three worked examples, real permit detail, and 5–6 location-specific FAQs.
        </p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'0.6rem'}}>
          {neighborhoods.map(n=>(
            <Link
              key={n.slug}
              href={`/portland/${n.slug}`}
              style={{
                display:'block',
                background:'var(--bg2)',
                border:'1px solid var(--bdr)',
                padding:'1.1rem 1.3rem',
                textDecoration:'none',
              }}
            >
              <div style={{...m,fontSize:'0.6rem',color:'var(--muted)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'0.35rem'}}>{n.zip} · {n.area}</div>
              <div style={{...d,fontSize:'1.3rem',color:'var(--text)',lineHeight:1,marginBottom:'0.4rem'}}>{n.name.toUpperCase()}</div>
              <div style={{...d,fontSize:'1.4rem',color:'var(--amber)',lineHeight:1}}>${n.avgCost.toLocaleString()}</div>
              <div style={{...m,fontSize:'0.7rem',color:'var(--muted)',marginTop:'0.4rem'}}>avg replacement · range {n.range}</div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
