import type { Metadata } from 'next'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import Link   from 'next/link'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import LeadForm from '@/components/LeadForm'
import PageHero from '@/components/PageHero'
import { getServiceImage } from '@/lib/neighborhoodImages'
import NeighborhoodSwitcher from '@/components/NeighborhoodSwitcher'
import ComparisonEngine      from '@/components/ComparisonEngine'
import TrustStrip            from '@/components/TrustStrip'
import { services, getServiceBySlug } from '@/lib/services'
import { neighborhoods, getNeighborhoodBySlug, permitLabels, getNearbyNeighborhoods } from '@/lib/neighborhoods'
import { SITE } from '@/lib/config'
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
  if (!s||!n) return {}
  const title = `${s.name} in ${n.name}, Portland ${n.zip} | ${SITE.name}`
  const description = inject(s.description,n,s)
  const url = `${SITE.baseUrl}/${s.slug}/${n.slug}`
  return { title, description, alternates:{canonical:url}, openGraph:{title,description,url,type:'website'} }
}

export default function ServiceNeighborhoodPage({ params }: { params: { service: string; neighborhood: string } }) {
  const s = getServiceBySlug(params.service)
  const n = getNeighborhoodBySlug(params.neighborhood)
  if (!s||!n) notFound()

  const permit   = permitLabels[n.permitScore]

  const nearby = getNearbyNeighborhoods(n.slug, 6)

  const tabMap: Record<string, 'asphalt' | 'metal' | 'cedar' | 'flat'> = {
    'roof-replacement':    'asphalt',
    'roof-repair':         'asphalt',
    'metal-roofing':       'metal',
    'cedar-shake-roofing': 'cedar',
    'flat-roofing':        'flat',
  }
  const defaultTab = tabMap[s.slug] ?? 'asphalt'
  const url      = `${SITE.baseUrl}/${s.slug}/${n.slug}`
  const localLow  = Math.round(s.avgLow  * (n.indexPct / 71))
  const localHigh = Math.round(s.avgHigh * (n.indexPct / 71))
  const localMid  = Math.round((localLow+localHigh)/2/100)*100

  const localFaqs = [
    { q:`How much does ${s.name.toLowerCase()} cost in ${n.name}?`, a:`${s.name} in ${n.name} (${n.zip}) typically costs $${localLow.toLocaleString()}–$${localHigh.toLocaleString()}, with most projects around $${localMid.toLocaleString()}.` },
    { q:`Do I need a permit for ${s.name.toLowerCase()} in ${n.name}?`, a:`${n.name} has a permit difficulty score of ${n.permitScore}/5 (${permit.label}). ${n.permitNotes}` },
    { q:`Which contractors do ${s.name.toLowerCase()} in ${n.name}?`, a:`Our platform vets contractors across ${n.area} including ${n.name}. All hold a valid Oregon CCB licence and have passed our 47-point review. Submit your details to get matched within 48 hours.` },
  ]

  const f = { fontFamily:'var(--font-barlow)' } as const
  const m = { fontFamily:'var(--font-space-mono)' } as const
  const c = { fontFamily:'var(--font-barlow-cond)' } as const
  const d = { fontFamily:'var(--font-bebas)' } as const

  return (
    <>
      <Script id="s1" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify({
        '@context':'https://schema.org',
        '@type':['Service','LocalBusiness'],
        name:`${s.name} in ${n.name}, Portland OR`,
        description:inject(s.description,n,s),
        url,
        provider:{'@type':'Organization',name:SITE.name,url:SITE.baseUrl},
        areaServed:{'@type':'Place',name:n.name,address:{'@type':'PostalAddress',postalCode:n.zip,addressLocality:'Portland',addressRegion:'OR',addressCountry:'US'}},
        offers:{'@type':'Offer',priceCurrency:'USD',lowPrice:localLow,highPrice:localHigh,priceValidUntil:'2026-12-31'},
        hasOfferCatalog:{'@type':'OfferCatalog',name:'Other Roofing Services',itemListElement:services.filter(x=>x.slug!==s.slug).map(x=>({'@type':'Offer',itemOffered:{'@type':'Service',name:x.name,url:`${SITE.baseUrl}/${x.slug}/${n.slug}`}}))},
        aggregateRating:{'@type':'AggregateRating',ratingValue:4.8,reviewCount:31,bestRating:5},
      })}</Script>
      <Script id="s2" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema([{name:'Home',url:SITE.baseUrl},{name:s.name,url:`${SITE.baseUrl}/services`},{name:n.name,url:`${SITE.baseUrl}/portland/${n.slug}`},{name:`${s.name} in ${n.name}`,url}]))}</Script>
      <Script id="s3" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(faqSchema(localFaqs))}</Script>

      <Nav />

      <PageHero
        tall
        imageUrl={getServiceImage(s.slug)}
        breadcrumb={[{label:'Home',href:'/'},{label:'Services',href:'/services'},{label:n.name,href:`/portland/${n.slug}`},{label:s.name}]}
        eyebrow={`${n.zip} · ${n.area}`}
        title={<>{s.headline.toUpperCase()}<br/><span style={{color:'#F5A623'}}>IN {n.name.toUpperCase()}</span></>}
        subtitle={inject(s.intro,n,s).slice(0,160)+'…'}
        stats={[
          { label:'Local Est. Range',  value:`$${localLow.toLocaleString()}–$${localHigh.toLocaleString()}` },
          { label:'Typical Mid-Point', value:`$${localMid.toLocaleString()}` },
          { label:'Permit Difficulty', value:`${permit.label} (${n.permitScore}/5)` },
        ]}
        right={<LeadForm />}
      />

      <NeighborhoodSwitcher currentSlug={n.slug} serviceSlug={s.slug} serviceName={s.name} />
      <TrustStrip urgency={s.urgency === 'high' ? 'high' : 'standard'} />

      {/* Why section */}
      <section className="section-pad" style={{background:'#fff'}}>
        <div className="content-wrap">
          <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ {n.name} Context ]</div>
          <h2 style={{...d,fontSize:'clamp(1.6rem,3vw,2.5rem)',color:'var(--text)',lineHeight:1,marginBottom:'1.5rem'}}>
            {s.name.toUpperCase()} IN {n.name.toUpperCase()}: WHAT YOU NEED TO KNOW
          </h2>
          <p style={{...f,fontSize:'1rem',color:'var(--text)',lineHeight:1.75,fontWeight:300,marginBottom:'1.5rem'}}>{inject(s.whySection,n,s)}</p>
          <div style={{marginTop:'1.5rem'}}>
            <div style={{...m,fontSize:'0.65rem',color:'var(--amber)',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:'0.8rem'}}>Local Factors for {n.name}</div>
            <ul style={{listStyle:'none'}}>
              {n.highlights.map(h=>(
                <li key={h} style={{...f,fontSize:'0.95rem',color:'var(--muted)',padding:'0.6rem 0',borderBottom:'1px solid var(--bdr)',display:'flex',gap:'0.75rem'}}>
                  <span style={{color:'var(--amber)',flexShrink:0}}>▸</span>{h}
                </li>
              ))}
            </ul>
          </div>
          {s.warningNote&&(
            <div style={{marginTop:'1.5rem',padding:'1rem 1.2rem',background:'rgba(200,32,44,0.05)',border:'1px solid rgba(200,32,44,0.18)',borderLeft:'4px solid var(--red)'}}>
              <p style={{...f,fontSize:'0.88rem',color:'var(--text)',lineHeight:1.65,fontWeight:300}}>{s.warningNote}</p>
            </div>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="section-pad" style={{background:'var(--bg2)'}}>
        <div className="content-wrap">
          <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ How It Works ]</div>
          <h2 style={{...d,fontSize:'clamp(1.6rem,3vw,2.5rem)',color:'var(--text)',lineHeight:1,marginBottom:'2rem'}}>THE {s.name.toUpperCase()} PROCESS</h2>
          <div style={{display:'flex',flexDirection:'column',gap:'1px',background:'var(--bdr)'}}>
            {s.processSteps.map((step,i)=>(
              <div key={i} style={{background:'#fff',padding:'1.2rem 1.5rem',display:'flex',gap:'1.5rem',alignItems:'flex-start'}}>
                <div style={{...d,fontSize:'1.6rem',color:'var(--amber)',lineHeight:1,flexShrink:0,minWidth:'2rem'}}>{String(i+1).padStart(2,'0')}</div>
                <p style={{...f,fontSize:'0.95rem',color:'var(--muted)',lineHeight:1.65,paddingTop:'0.2rem'}}>{inject(step,n,s)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Material Comparison */}
      <section className="section-pad" style={{background:'#fff'}}>
        <div className="content-wrap-wide">
          <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ Material Comparison ]</div>
          <h2 style={{...d,fontSize:'clamp(1.6rem,3vw,2.5rem)',color:'var(--text)',lineHeight:1,marginBottom:'0.5rem'}}>
            HOW {s.name.toUpperCase()} COMPARES
          </h2>
          <p style={{...f,fontSize:'0.95rem',color:'var(--muted)',maxWidth:'600px',lineHeight:1.7,fontWeight:300,marginBottom:'2rem'}}>
            Portland-specific cost, lifespan, and maintenance data across all four roofing materials.{s.slug === 'metal-roofing' ? ' Select the Metal tab to see break-even vs asphalt for ' + n.name + '.' : ' Switch tabs to compare.'}
          </p>
          <ComparisonEngine
            defaultTab={defaultTab}
            neighborhood={n.name}
            avgCost={n.avgCost}
          />
        </div>
      </section>

      {/* Permit */}
      <section className="section-pad" style={{background:'#fff'}}>
        <div className="content-wrap">
          <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ Permit Difficulty ]</div>
          <h2 style={{...d,fontSize:'clamp(1.6rem,3vw,2.2rem)',color:'var(--text)',lineHeight:1,marginBottom:'1.5rem'}}>PERMITTING IN {n.name.toUpperCase()}</h2>
          <div style={{display:'flex',alignItems:'center',gap:'1.5rem',marginBottom:'1.5rem',flexWrap:'wrap'}}>
            <div style={{display:'flex',gap:'0.4rem'}}>
              {[1,2,3,4,5].map(i=>(
                <div key={i} style={{width:32,height:32,background:i<=n.permitScore?permit.color:'var(--bdr)',display:'flex',alignItems:'center',justifyContent:'center',...d,fontSize:'0.95rem',color:i<=n.permitScore?'#000':'var(--bg3)'}}>{i}</div>
              ))}
            </div>
            <div style={{...d,fontSize:'1.6rem',color:permit.color,lineHeight:1}}>{permit.label} ({n.permitScore}/5)</div>
          </div>
          <div style={{padding:'1.2rem 1.5rem',background:'var(--bg2)',border:'1px solid var(--bdr)',borderLeft:`4px solid ${permit.color}`}}>
            <p style={{...f,fontSize:'0.95rem',color:'var(--text)',lineHeight:1.7,fontWeight:300}}>{n.permitNotes}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad" style={{background:'var(--bg2)'}}>
        <div className="content-wrap">
          <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ FAQ ]</div>
          <h2 style={{...d,fontSize:'clamp(1.6rem,3vw,2.2rem)',color:'var(--text)',lineHeight:1,marginBottom:'2rem'}}>{s.name.toUpperCase()} IN {n.name.toUpperCase()}</h2>
          {localFaqs.map(({q,a})=>(
            <div key={q} style={{borderTop:'1px solid var(--bdr)',padding:'1.5rem 0'}}>
              <h3 style={{...c,fontSize:'1.05rem',fontWeight:700,color:'var(--text)',marginBottom:'0.7rem'}}>{q}</h3>
              <p style={{...f,fontSize:'0.95rem',color:'var(--muted)',lineHeight:1.7,fontWeight:300}}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Other services */}
      <section className="section-pad" style={{background:'#fff'}}>
        <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'1rem'}}>[ Other Services in {n.name} ]</div>
        <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap'}}>
          {services.filter(x=>x.slug!==s.slug).map(x=>(
            <Link key={x.slug} href={`/${x.slug}/${n.slug}`} style={{...c,fontSize:'0.85rem',letterSpacing:'0.06em',color:'var(--amber)',padding:'0.5rem 1rem',border:'1px solid var(--bdr)',textDecoration:'none',background:'var(--bg2)',whiteSpace:'nowrap'}}>{x.name} →</Link>
          ))}
          <Link href={`/portland/${n.slug}`} style={{...c,fontSize:'0.85rem',letterSpacing:'0.06em',color:'var(--muted)',padding:'0.5rem 1rem',border:'1px solid var(--bdr)',textDecoration:'none',background:'var(--bg2)',whiteSpace:'nowrap'}}>{n.name} Overview →</Link>
        </div>
      </section>


      {/* Same service — nearby areas mesh */}
      <section className="section-pad" style={{background:'#0A0B0D'}}>
        <div style={{...m,fontSize:'0.68rem',color:'rgba(255,255,255,0.35)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ Same Service · Nearby Areas ]</div>
        <h2 style={{...d,fontSize:'clamp(1.6rem,3vw,2.5rem)',color:'#fff',lineHeight:1,marginBottom:'0.4rem'}}>
          {s.name.toUpperCase()} NEAR {n.name.toUpperCase()}
        </h2>
        <p style={{...f,fontSize:'0.88rem',color:'rgba(255,255,255,0.38)',maxWidth:'480px',lineHeight:1.65,fontWeight:300,marginBottom:'2rem'}}>
          Vetted contractors serving these Portland-area neighborhoods for the same service.
        </p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'1px',background:'rgba(255,255,255,0.06)'}}>
          {nearby.map(nb=>{
            const localLow  = Math.round(s.avgLow  * (nb.indexPct / 71))
            const localHigh = Math.round(s.avgHigh * (nb.indexPct / 71))
            return (
              <a key={nb.slug} href={`/${s.slug}/${nb.slug}`} className="svc-area-link" style={{
                display:'block', padding:'1.2rem 1.4rem',
                textDecoration:'none',
              }}>
                <div style={{...m,fontSize:'0.6rem',color:'rgba(255,255,255,0.3)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'0.35rem'}}>{nb.zip} · {nb.area}</div>
                <div style={{...c,fontSize:'0.95rem',fontWeight:700,color:'#fff',marginBottom:'0.3rem'}}>{nb.name}</div>
                <div style={{...m,fontSize:'0.68rem',color:'#F5A623'}}>
                  ${localLow.toLocaleString()}–${localHigh.toLocaleString()}
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
