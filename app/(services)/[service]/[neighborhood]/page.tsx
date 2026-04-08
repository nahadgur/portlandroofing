import type { Metadata } from 'next'
import Script    from 'next/script'
import { notFound } from 'next/navigation'
import Link      from 'next/link'
import Nav       from '@/components/Nav'
import Footer    from '@/components/Footer'
import LeadForm  from '@/components/LeadForm'
import { services, getServiceBySlug } from '@/lib/services'
import { neighborhoods, getNeighborhoodBySlug, permitLabels } from '@/lib/neighborhoods'
import { SITE }  from '@/lib/config'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'

export function generateStaticParams() {
  return services.flatMap(s => neighborhoods.map(n => ({ service: s.slug, neighborhood: n.slug })))
}

function inject(t: string, n: { name: string; zip: string }, s: { avgMid: number }) {
  return t.replace(/\{neighborhood\}/g,n.name).replace(/\{zip\}/g,n.zip).replace(/\{avgMid\}/g,s.avgMid.toLocaleString())
}

export function generateMetadata({ params }: { params: { service: string; neighborhood: string } }): Metadata {
  const s = getServiceBySlug(params.service)
  const n = getNeighborhoodBySlug(params.neighborhood)
  if (!s || !n) return {}
  const title = `${s.name} in ${n.name}, Portland ${n.zip} | ${SITE.name}`
  const description = inject(s.description, n, s)
  const url = `${SITE.baseUrl}/${s.slug}/${n.slug}`
  return { title, description, alternates:{canonical:url}, openGraph:{title,description,url,type:'website'}, twitter:{title,description} }
}

export default function ServiceNeighborhoodPage({ params }: { params: { service: string; neighborhood: string } }) {
  const s = getServiceBySlug(params.service)
  const n = getNeighborhoodBySlug(params.neighborhood)
  if (!s || !n) notFound()

  const permit   = permitLabels[n.permitScore]
  const url      = `${SITE.baseUrl}/${s.slug}/${n.slug}`
  const localLow  = Math.round(s.avgLow  * (n.indexPct / 71))
  const localHigh = Math.round(s.avgHigh * (n.indexPct / 71))
  const localMid  = Math.round((localLow + localHigh) / 2 / 100) * 100

  const localFaqs = [
    { q:`How much does ${s.name.toLowerCase()} cost in ${n.name}?`, a:`${s.name} in ${n.name} (${n.zip}) typically costs between $${localLow.toLocaleString()} and $${localHigh.toLocaleString()}, with most projects around $${localMid.toLocaleString()}.` },
    { q:`Do I need a permit for ${s.name.toLowerCase()} in ${n.name}?`, a:`${n.name} has a permit difficulty score of ${n.permitScore}/5 (${permit.label}). ${n.permitNotes}` },
    { q:`Which contractors do ${s.name.toLowerCase()} in ${n.name}?`, a:`Our platform vets contractors across the ${n.area} area including ${n.name}. All listed contractors hold a valid Oregon CCB licence and have passed our 47-point review. Submit your details to get matched within 48 hours.` },
  ]

  const f = { fontFamily:'var(--font-barlow)' } as const
  const m = { fontFamily:'var(--font-space-mono)' } as const
  const c = { fontFamily:'var(--font-barlow-cond)' } as const
  const d = { fontFamily:'var(--font-bebas)' } as const

  return (
    <>
      <Script id="s1" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify({
        '@context':'https://schema.org','@type':'Service',
        name:`${s.name} in ${n.name}`,description:inject(s.description,n,s),url,
        provider:{'@type':'Organization',name:SITE.name,url:SITE.baseUrl},
        areaServed:{'@type':'Place',name:n.name,address:{'@type':'PostalAddress',postalCode:n.zip,addressLocality:'Portland',addressRegion:'OR',addressCountry:'US'}},
        offers:{'@type':'Offer',priceCurrency:'USD',lowPrice:localLow,highPrice:localHigh,priceValidUntil:'2026-12-31'},
      })}</Script>
      <Script id="s2" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema([{name:'Home',url:SITE.baseUrl},{name:s.name,url:`${SITE.baseUrl}/services`},{name:n.name,url:`${SITE.baseUrl}/portland/${n.slug}`},{name:`${s.name} in ${n.name}`,url}]))}</Script>
      <Script id="s3" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(faqSchema(localFaqs))}</Script>
      <Nav />

      <div style={{padding:'0.8rem 3rem',borderBottom:'1px solid var(--bdr)',background:'var(--bg2)'}}>
        <div style={{...m,fontSize:'0.68rem',color:'var(--muted)',display:'flex',gap:'0.5rem',flexWrap:'wrap'}}>
          <Link href="/" style={{color:'var(--amber)',textDecoration:'none'}}>Home</Link><span>›</span>
          <Link href="/services" style={{color:'var(--muted)',textDecoration:'none'}}>Services</Link><span>›</span>
          <Link href={`/portland/${n.slug}`} style={{color:'var(--muted)',textDecoration:'none'}}>{n.name}</Link><span>›</span>
          <span style={{color:'var(--text)'}}>{s.name}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="grid-nbhd-hero section-pad" style={{background:'var(--bg2)'}}>
        <div>
          <div style={{...m,fontSize:'0.72rem',color:'var(--amber)',letterSpacing:'0.1em',marginBottom:'1rem'}}>▸ {n.zip} · {n.area}</div>
          <h1 style={{...d,fontSize:'clamp(2.5rem,5vw,4.5rem)',lineHeight:0.9,color:'var(--text)',marginBottom:'1.5rem'}}>
            {s.headline.toUpperCase()}<br/><span style={{color:'var(--amber)'}}>IN {n.name.toUpperCase()}</span>
          </h1>
          <p style={{...f,fontSize:'clamp(1rem,2.5vw,1.05rem)',color:'var(--muted)',maxWidth:'560px',lineHeight:1.75,fontWeight:300,marginBottom:'2.5rem'}}>{inject(s.intro,n,s)}</p>
          <div className="grid-nbhd-data">
            {[{label:'Local Est. Range',value:`$${localLow.toLocaleString()}–$${localHigh.toLocaleString()}`},{label:'Typical Mid-Point',value:`$${localMid.toLocaleString()}`},{label:'Permit Difficulty',value:`${permit.label} (${n.permitScore}/5)`}].map(({label,value})=>(
              <div key={label} style={{background:'var(--bg)',padding:'1.2rem 1.5rem'}}>
                <div style={{...m,fontSize:'0.68rem',color:'var(--muted)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'0.4rem'}}>{label}</div>
                <div style={{...d,fontSize:'1.3rem',color:'var(--amber)',lineHeight:1}}>{value}</div>
              </div>
            ))}
          </div>
          {s.warningNote&&(
            <div style={{marginTop:'1.5rem',padding:'1rem 1.2rem',background:'rgba(230,57,70,0.06)',border:'1px solid rgba(230,57,70,0.2)',borderLeft:'4px solid var(--red)'}}>
              <p style={{...f,fontSize:'0.88rem',color:'var(--text)',lineHeight:1.65,fontWeight:300}}>{s.warningNote}</p>
            </div>
          )}
        </div>
        <div style={{border:'1px solid var(--bdr)'}}><LeadForm /></div>
      </div>

      {/* Why — centered */}
      <section className="section-pad" style={{background:'var(--bg)'}}>
        <div className="content-wrap">
          <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ {n.name} Context ]</div>
          <h2 style={{...d,fontSize:'clamp(1.6rem,3vw,2.5rem)',color:'var(--text)',lineHeight:1,marginBottom:'1.5rem'}}>{s.name.toUpperCase()} IN {n.name.toUpperCase()}: WHAT YOU NEED TO KNOW</h2>
          <p style={{...f,fontSize:'1rem',color:'var(--text)',lineHeight:1.75,fontWeight:300,marginBottom:'1.5rem'}}>{inject(s.whySection,n,s)}</p>
          <div style={{marginTop:'2rem'}}>
            <div style={{...m,fontSize:'0.65rem',color:'var(--amber)',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:'0.8rem'}}>Local Factors for {n.name}</div>
            <ul style={{listStyle:'none'}}>
              {n.highlights.map(h=>(
                <li key={h} style={{...f,fontSize:'0.95rem',color:'var(--muted)',padding:'0.6rem 0',borderBottom:'1px solid var(--bdr)',display:'flex',gap:'0.75rem'}}>
                  <span style={{color:'var(--amber)',flexShrink:0}}>▸</span>{h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process — centered */}
      <section className="section-pad" style={{background:'var(--bg2)'}}>
        <div className="content-wrap">
          <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ How It Works ]</div>
          <h2 style={{...d,fontSize:'clamp(1.6rem,3vw,2.5rem)',color:'var(--text)',lineHeight:1,marginBottom:'2rem'}}>THE {s.name.toUpperCase()} PROCESS</h2>
          <div style={{display:'flex',flexDirection:'column',gap:'1px',background:'var(--bdr)'}}>
            {s.processSteps.map((step,i)=>(
              <div key={i} style={{background:'var(--bg)',padding:'1.2rem 1.5rem',display:'flex',gap:'1.5rem',alignItems:'flex-start'}}>
                <div style={{...d,fontSize:'1.6rem',color:'var(--amber)',lineHeight:1,flexShrink:0,minWidth:'2rem'}}>{String(i+1).padStart(2,'0')}</div>
                <p style={{...f,fontSize:'0.95rem',color:'var(--muted)',lineHeight:1.65,paddingTop:'0.2rem'}}>{inject(step,n,s)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials — centered */}
      <section className="section-pad" style={{background:'var(--bg)'}}>
        <div className="content-wrap">
          <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ Materials ]</div>
          <h2 style={{...d,fontSize:'clamp(1.6rem,3vw,2.5rem)',color:'var(--text)',lineHeight:1,marginBottom:'1.5rem'}}>WHAT WE SPECIFY FOR {n.name.toUpperCase()}</h2>
          <ul style={{listStyle:'none'}}>
            {s.materials.map(mat=>(
              <li key={mat} style={{...f,fontSize:'0.95rem',color:'var(--muted)',padding:'0.7rem 0',borderBottom:'1px solid var(--bdr)',display:'flex',gap:'0.75rem'}}>
                <span style={{color:'var(--amber)',flexShrink:0}}>—</span>{mat}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Permit — centered */}
      <section style={{background:'var(--bg2)',borderBottom:'1px solid var(--bdr)',padding:'4rem 3rem'}}>
        <div className="content-wrap">
          <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ Permit Difficulty ]</div>
          <h2 style={{...d,fontSize:'clamp(1.6rem,3vw,2.2rem)',color:'var(--text)',lineHeight:1,marginBottom:'1.5rem'}}>PERMITTING {s.name.toUpperCase()} IN {n.name.toUpperCase()}</h2>
          <div style={{display:'flex',alignItems:'center',gap:'1.5rem',marginBottom:'1.5rem',flexWrap:'wrap'}}>
            <div style={{display:'flex',gap:'0.4rem'}}>
              {[1,2,3,4,5].map(i=>(
                <div key={i} style={{width:32,height:32,background:i<=n.permitScore?permit.color:'var(--bdr)',display:'flex',alignItems:'center',justifyContent:'center',...d,fontSize:'0.95rem',color:i<=n.permitScore?'#000':'var(--bg3)'}}>{i}</div>
              ))}
            </div>
            <div style={{...d,fontSize:'1.6rem',color:permit.color,lineHeight:1}}>{permit.label} ({n.permitScore}/5)</div>
          </div>
          <div style={{padding:'1.2rem 1.5rem',background:'var(--bg)',border:'1px solid var(--bdr)',borderLeft:`4px solid ${permit.color}`}}>
            <p style={{...f,fontSize:'0.95rem',color:'var(--text)',lineHeight:1.7,fontWeight:300}}>{n.permitNotes}</p>
          </div>
        </div>
      </section>

      {/* FAQ — centered */}
      <section className="section-pad" style={{background:'var(--bg)'}}>
        <div className="content-wrap">
          <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ FAQ ]</div>
          <h2 style={{...d,fontSize:'clamp(1.6rem,3vw,2.2rem)',color:'var(--text)',lineHeight:1,marginBottom:'2rem'}}>{s.name.toUpperCase()} IN {n.name.toUpperCase()}: COMMON QUESTIONS</h2>
          {localFaqs.map(({q,a})=>(
            <div key={q} style={{borderTop:'1px solid var(--bdr)',padding:'1.5rem 0'}}>
              <h3 style={{...c,fontSize:'1.05rem',fontWeight:700,color:'var(--text)',marginBottom:'0.7rem'}}>{q}</h3>
              <p style={{...f,fontSize:'0.95rem',color:'var(--muted)',lineHeight:1.7,fontWeight:300}}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-links */}
      <section className="section-pad" style={{background:'var(--bg2)'}}>
        <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'1rem'}}>[ Other Services in {n.name} ]</div>
        <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap'}}>
          {services.filter(x=>x.slug!==s.slug).map(x=>(
            <Link key={x.slug} href={`/${x.slug}/${n.slug}`} style={{...c,fontSize:'0.85rem',letterSpacing:'0.06em',color:'var(--amber)',padding:'0.5rem 1rem',border:'1px solid var(--bdr)',textDecoration:'none',background:'var(--bg)',whiteSpace:'nowrap'}}>{x.name} →</Link>
          ))}
          <Link href={`/portland/${n.slug}`} style={{...c,fontSize:'0.85rem',letterSpacing:'0.06em',color:'var(--muted)',padding:'0.5rem 1rem',border:'1px solid var(--bdr)',textDecoration:'none',background:'var(--bg)',whiteSpace:'nowrap'}}>{n.name} Overview →</Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
