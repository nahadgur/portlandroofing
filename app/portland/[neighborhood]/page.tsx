import type { Metadata } from 'next'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import Link   from 'next/link'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import LeadForm from '@/components/LeadForm'
import PageHero from '@/components/PageHero'
import { neighborhoods, getNeighborhoodBySlug, getStaticNeighborhoodPaths, permitLabels } from '@/lib/neighborhoods'
import { services } from '@/lib/services'
import { SITE }  from '@/lib/config'
import { neighborhoodSchema, breadcrumbSchema, faqSchema } from '@/lib/schema'

export function generateStaticParams() { return getStaticNeighborhoodPaths() }

export function generateMetadata({ params }: { params: { neighborhood: string } }): Metadata {
  const n = getNeighborhoodBySlug(params.neighborhood)
  if (!n) return {}
  const title = `${n.name} Roofing Contractors & Costs (${n.zip}) | ${SITE.name}`
  const description = `Find vetted roofing contractors in ${n.name}, Portland ${n.zip}. Average replacement cost: $${n.avgCost.toLocaleString()}. Free quotes in 48h.`
  const url = `${SITE.baseUrl}/portland/${n.slug}`
  return { title, description, alternates:{canonical:url}, openGraph:{title,description,url,type:'website'} }
}

export default function NeighborhoodPage({ params }: { params: { neighborhood: string } }) {
  const n = getNeighborhoodBySlug(params.neighborhood)
  if (!n) notFound()
  const idx    = neighborhoods.findIndex(x => x.slug === n.slug)
  const nearby = neighborhoods.filter((_,i) => Math.abs(i-idx) <= 6 && neighborhoods[i].slug !== n.slug).slice(0,4)
  const permit = permitLabels[n.permitScore]

  const localFaqs = [
    { q:`How much does a roof replacement cost in ${n.name}?`, a:`The average replacement in ${n.name} (${n.zip}) costs $${n.avgCost.toLocaleString()}, typically ranging ${n.range}. Most common material: ${n.commonMaterial}.` },
    { q:`How difficult is it to get a roofing permit in ${n.name}?`, a:`${n.name} has a permit difficulty score of ${n.permitScore}/5 (${permit.label}). ${n.permitNotes}` },
    { q:`What roofing contractors serve ${n.name}?`, a:`Multiple licensed Oregon CCB contractors operate in ${n.name}. Our platform vets all contractors against a 47-point checklist. Use our free quote form to get matched within 48 hours.` },
  ]

  const f = { fontFamily:'var(--font-barlow)' } as const
  const m = { fontFamily:'var(--font-space-mono)' } as const
  const c = { fontFamily:'var(--font-barlow-cond)' } as const
  const d = { fontFamily:'var(--font-bebas)' } as const

  return (
    <>
      <Script id="s1" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(neighborhoodSchema(n))}</Script>
      <Script id="s2" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema([{name:'Home',url:SITE.baseUrl},{name:'Neighborhoods',url:`${SITE.baseUrl}/#neighborhoods`},{name:n.name,url:`${SITE.baseUrl}/portland/${n.slug}`}]))}</Script>
      <Script id="s3" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(faqSchema(localFaqs))}</Script>

      <Nav />

      <PageHero
        tall
        breadcrumb={[{label:'Home',href:'/'},{label:'Neighborhoods',href:'/#neighborhoods'},{label:n.name}]}
        eyebrow={`${n.zip} · ${n.area}`}
        title={<>{n.name.toUpperCase()}<br/><span style={{color:'#F5A623'}}>ROOFING</span></>}
        subtitle={n.description}
        stats={[
          { label:'Avg. Replacement', value:`$${n.avgCost.toLocaleString()}` },
          { label:'Cost Range',       value:n.range },
          { label:'Common Material',  value:n.commonMaterial },
        ]}
        right={<LeadForm />}
      />

      {/* Local Factors */}
      <section className="section-pad" style={{background:'#fff'}}>
        <div className="content-wrap">
          <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ Local Roofing Factors ]</div>
          <ul style={{listStyle:'none'}}>
            {n.highlights.map(h=>(
              <li key={h} style={{...f,fontSize:'0.95rem',color:'var(--muted)',padding:'0.7rem 0',borderBottom:'1px solid var(--bdr)',display:'flex',gap:'0.75rem'}}>
                <span style={{color:'var(--amber)',flexShrink:0}}>▸</span>{h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Permit Score */}
      <section className="section-pad" style={{background:'var(--bg2)'}}>
        <div className="content-wrap">
          <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ Permit Difficulty Score ]</div>
          <h2 style={{...d,fontSize:'clamp(1.8rem,3vw,2.5rem)',color:'var(--text)',lineHeight:1,marginBottom:'1.5rem'}}>PERMITTING IN {n.name.toUpperCase()}</h2>
          <div style={{display:'flex',alignItems:'center',gap:'2rem',marginBottom:'1.5rem',flexWrap:'wrap'}}>
            <div style={{display:'flex',gap:'0.4rem'}}>
              {[1,2,3,4,5].map(i=>(
                <div key={i} style={{width:36,height:36,background:i<=n.permitScore?permit.color:'var(--bdr)',display:'flex',alignItems:'center',justifyContent:'center',...d,fontSize:'1rem',color:i<=n.permitScore?'#000':'var(--bg3)'}}>
                  {i}
                </div>
              ))}
            </div>
            <div style={{...d,fontSize:'1.8rem',color:permit.color,lineHeight:1}}>{permit.label} ({n.permitScore}/5)</div>
          </div>
          <div style={{padding:'1.2rem 1.5rem',background:'#fff',border:'1px solid var(--bdr)',borderLeft:`4px solid ${permit.color}`}}>
            <p style={{...f,fontSize:'0.95rem',color:'var(--text)',lineHeight:1.7,fontWeight:300}}>{n.permitNotes}</p>
          </div>
        </div>
      </section>

      {/* Cost bar */}
      <div style={{background:'#fff',borderBottom:'1px solid var(--bdr)',padding:'2rem 3rem'}}>
        <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',alignItems:'center',gap:'2rem',flexWrap:'wrap'}}>
          <div style={{...m,fontSize:'0.68rem',color:'var(--muted)',letterSpacing:'0.1em',textTransform:'uppercase'}}>{n.name} Cost Index</div>
          <div style={{flex:1,maxWidth:'300px'}}><div className="pi-bar"><div className="pi-bar-fill" style={{width:`${n.indexPct}%`}}/></div></div>
          <div style={{...d,fontSize:'1.8rem',color:'var(--amber)'}}>${n.avgCost.toLocaleString()}</div>
          <div style={{...m,fontSize:'0.7rem',color:'var(--muted)'}}>vs PDX avg $9,400</div>
          <Link href="/pdx-cost-index" style={{...c,fontSize:'0.8rem',letterSpacing:'0.08em',color:'var(--amber)',textDecoration:'none',textTransform:'uppercase'}}>Full Cost Index →</Link>
        </div>
      </div>

      {/* Services in this area */}
      <section className="section-pad" style={{background:'var(--bg2)'}}>
        <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'1rem'}}>[ Services in {n.name} ]</div>
        <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap'}}>
          {services.map(s=>(
            <Link key={s.slug} href={`/${s.slug}/${n.slug}`} style={{...c,fontSize:'0.9rem',fontWeight:700,letterSpacing:'0.06em',color:'var(--amber)',padding:'0.6rem 1.2rem',border:'1px solid var(--bdr)',textDecoration:'none',background:'#fff',whiteSpace:'nowrap'}}>
              {s.name} →
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad" style={{background:'#fff'}}>
        <div className="content-wrap">
          <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ FAQ ]</div>
          <h2 style={{...d,fontSize:'clamp(1.8rem,3vw,2.8rem)',color:'var(--text)',lineHeight:1,marginBottom:'2.5rem'}}>{n.name.toUpperCase()} ROOFING QUESTIONS</h2>
          {localFaqs.map(({q,a})=>(
            <div key={q} style={{borderTop:'1px solid var(--bdr)',padding:'1.5rem 0'}}>
              <h3 style={{...c,fontSize:'1.05rem',fontWeight:700,color:'var(--text)',marginBottom:'0.7rem'}}>{q}</h3>
              <p style={{...f,fontSize:'0.95rem',color:'var(--muted)',lineHeight:1.7,fontWeight:300}}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nearby */}
      <section className="section-pad" style={{background:'var(--bg2)'}}>
        <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'1rem'}}>[ Nearby Areas ]</div>
        <div className="grid-nearby">
          {nearby.map(nb=>(
            <Link key={nb.slug} href={`/portland/${nb.slug}`} className="nbhd-card-hover" style={{background:'#fff',padding:'1.2rem',textDecoration:'none',display:'block'}}>
              <div style={{...m,fontSize:'0.65rem',color:'var(--amber)',marginBottom:'0.3rem'}}>{nb.zip}</div>
              <div style={{...c,fontSize:'0.95rem',color:'var(--text)',fontWeight:600}}>{nb.name}</div>
              <div style={{...m,fontSize:'0.7rem',color:'var(--muted)',marginTop:'0.3rem'}}>Avg ${nb.avgCost.toLocaleString()}</div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
