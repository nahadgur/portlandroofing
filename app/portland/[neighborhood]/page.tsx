import type { Metadata } from 'next'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import Link   from 'next/link'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import LeadForm from '@/components/LeadForm'
import PageHero from '@/components/PageHero'
import AreasWeServe from '@/components/AreasWeServe'
import { getNeighborhoodImage } from '@/lib/neighborhoodImages'
import { getNeighborhoodBySlug, getStaticNeighborhoodPaths, permitLabels } from '@/lib/neighborhoods'
import { services } from '@/lib/services'
import { SITE }  from '@/lib/config'
import { breadcrumbSchema, faqSchema, neighborhoodBusinessSchema } from '@/lib/schema'

export function generateStaticParams() { return getStaticNeighborhoodPaths() }

export function generateMetadata({ params }: { params: { neighborhood: string } }): Metadata {
  const n = getNeighborhoodBySlug(params.neighborhood)
  if (!n) return {}
  const title = `${n.name} Roofing Costs, Permits & Local Cost Drivers (${n.zip}) | ${SITE.name}`
  const description = `Bespoke ${n.name} roofing intelligence — what drives quotes locally, three worked examples, real permit detail, location-specific FAQs. Avg cost $${n.avgCost.toLocaleString()}.`
  const url = `${SITE.baseUrl}/portland/${n.slug}`
  return { title, description, alternates:{canonical:url}, openGraph:{title,description,url,type:'website'} }
}

export default function NeighborhoodPage({ params }: { params: { neighborhood: string } }) {
  const n = getNeighborhoodBySlug(params.neighborhood)
  if (!n) notFound()
  const permit = permitLabels[n.permitScore]

  const baseFaqs = [
    { question:`How much does a roof replacement cost in ${n.name}?`, answer:`The average replacement in ${n.name} (${n.zip}) costs $${n.avgCost.toLocaleString()}, typically ranging ${n.range}. Most common material: ${n.commonMaterial}.` },
    { question:`How difficult is it to get a roofing permit in ${n.name}?`, answer:`${n.name} has a permit difficulty score of ${n.permitScore}/5 (${permit.label}). ${n.permitNotes}` },
    { question:`What roofing contractors serve ${n.name}?`, answer:`Multiple licensed Oregon CCB contractors operate in ${n.name}. Our platform vets all contractors against a 47-point checklist. Use our free quote form to get matched within 48 hours.` },
  ]
  const allFaqs = [...baseFaqs, ...n.locationFaqs]

  const f = { fontFamily:'var(--font-barlow)' } as const
  const m = { fontFamily:'var(--font-space-mono)' } as const
  const c = { fontFamily:'var(--font-barlow-cond)' } as const
  const d = { fontFamily:'var(--font-bebas)' } as const

  return (
    <>
      <Script id="s1" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(neighborhoodBusinessSchema(n))}</Script>
      <Script id="s2" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema([{name:'Home',url:SITE.baseUrl},{name:'Neighborhoods',url:`${SITE.baseUrl}/#neighborhoods`},{name:n.name,url:`${SITE.baseUrl}/portland/${n.slug}`}]))}</Script>
      <Script id="s3" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(faqSchema(allFaqs))}</Script>

      <Nav />

      <PageHero
        tall
        imageUrl={getNeighborhoodImage(n.slug)}
        breadcrumb={[{label:'Home',href:'/'},{label:'Neighborhoods',href:'/#neighborhoods'},{label:n.name}]}
        eyebrow={`${n.zip} · ${n.area}`}
        title={<>{n.name.toUpperCase()}<br/><span style={{color:'#F5A623'}}>ROOFING COSTS</span></>}
        subtitle={n.description}
        stats={[
          { label:'Avg. Replacement', value:`$${n.avgCost.toLocaleString()}` },
          { label:'Cost Range',       value:n.range },
          { label:'Permit Difficulty', value:`${permit.label} (${n.permitScore}/5)` },
        ]}
        right={<LeadForm />}
      />

      {/* Local Cost Truth — long-form bespoke narrative */}
      <section className="section-pad" style={{background:'#fff'}}>
        <div className="content-wrap">
          <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ Local Cost Truth ]</div>
          <h2 style={{...d,fontSize:'clamp(1.8rem,3vw,2.8rem)',color:'var(--text)',lineHeight:1,marginBottom:'2rem'}}>
            WHAT ROOFING ACTUALLY COSTS IN {n.name.toUpperCase()}
          </h2>
          <div style={{display:'flex',flexDirection:'column',gap:'1.2rem'}}>
            {n.localCostTruth.map((para,i)=>(
              <p key={i} style={{...f,fontSize:'1rem',color:'var(--text)',lineHeight:1.75,fontWeight:300}}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Drivers — itemized with quantified impact */}
      <section className="section-pad" style={{background:'var(--bg2)'}}>
        <div className="content-wrap">
          <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ Cost Drivers ]</div>
          <h2 style={{...d,fontSize:'clamp(1.8rem,3vw,2.5rem)',color:'var(--text)',lineHeight:1,marginBottom:'1rem'}}>
            {n.name.toUpperCase()} COST DRIVERS
          </h2>
          <p style={{...f,fontSize:'0.95rem',color:'var(--muted)',maxWidth:'640px',lineHeight:1.7,fontWeight:300,marginBottom:'2rem'}}>
            The factors that move {n.name} roofing quotes most, with quantified impact and the explanation behind each.
            Use these to evaluate whether a contractor&apos;s bid reflects local conditions or is missing something.
          </p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1px',background:'var(--bdr)'}}>
            {n.costDrivers.map((cd,i)=>(
              <div key={i} style={{background:'#fff',padding:'1.2rem 1.4rem'}}>
                <div style={{...c,fontSize:'1rem',fontWeight:700,color:'var(--text)',marginBottom:'0.4rem'}}>{cd.factor}</div>
                <div style={{...d,fontSize:'1.2rem',color:'var(--amber)',marginBottom:'0.6rem',lineHeight:1}}>{cd.impact}</div>
                <p style={{...f,fontSize:'0.85rem',color:'var(--muted)',lineHeight:1.6,fontWeight:300}}>{cd.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Worked Examples — concrete recent-job style */}
      <section className="section-pad" style={{background:'#fff'}}>
        <div className="content-wrap">
          <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ Worked Examples ]</div>
          <h2 style={{...d,fontSize:'clamp(1.8rem,3vw,2.5rem)',color:'var(--text)',lineHeight:1,marginBottom:'1rem'}}>
            {n.name.toUpperCase()} REPLACEMENT BREAKDOWNS
          </h2>
          <p style={{...f,fontSize:'0.95rem',color:'var(--muted)',maxWidth:'640px',lineHeight:1.7,fontWeight:300,marginBottom:'2rem'}}>
            Three representative {n.name} replacement projects with line-item breakdowns drawn from typical local housing
            stock. Use these to anchor what your own quote should look like.
          </p>
          <div style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>
            {n.workedExamples.map((ex,i)=>(
              <div key={i} style={{border:'1px solid var(--bdr)',background:'#fff'}}>
                <div style={{padding:'1rem 1.4rem',background:'var(--bg2)',borderBottom:'1px solid var(--bdr)'}}>
                  <div style={{...c,fontSize:'0.95rem',fontWeight:700,color:'var(--text)'}}>{ex.scenario}</div>
                </div>
                <div style={{padding:'1rem 1.4rem'}}>
                  <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.9rem'}}>
                    <tbody>
                      {ex.lineItems.map((li,j)=>(
                        <tr key={j} style={{borderBottom:'1px dashed var(--bdr)'}}>
                          <td style={{...f,padding:'0.55rem 0',color:'var(--muted)',fontWeight:300}}>{li.label}</td>
                          <td style={{...m,padding:'0.55rem 0',textAlign:'right',color:'var(--text)',fontWeight:500,whiteSpace:'nowrap'}}>{li.amount}</td>
                        </tr>
                      ))}
                      <tr>
                        <td style={{...c,paddingTop:'0.85rem',color:'var(--text)',fontWeight:700,fontSize:'0.95rem'}}>Total</td>
                        <td style={{...d,paddingTop:'0.85rem',textAlign:'right',color:'var(--amber)',fontSize:'1.4rem',lineHeight:1,whiteSpace:'nowrap'}}>{ex.total}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p style={{...f,fontSize:'0.85rem',color:'var(--muted)',lineHeight:1.65,fontWeight:300,marginTop:'1rem',paddingTop:'1rem',borderTop:'1px solid var(--bdr)'}}>
                    <span style={{color:'var(--text)',fontWeight:600}}>Note:</span> {ex.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Permit Detail */}
      <section className="section-pad" style={{background:'var(--bg2)'}}>
        <div className="content-wrap">
          <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ Permit Detail ]</div>
          <h2 style={{...d,fontSize:'clamp(1.8rem,3vw,2.5rem)',color:'var(--text)',lineHeight:1,marginBottom:'1rem'}}>
            PERMITTING IN {n.name.toUpperCase()}
          </h2>
          <p style={{...f,fontSize:'0.95rem',color:'var(--muted)',lineHeight:1.7,fontWeight:300,marginBottom:'1.5rem',maxWidth:'640px'}}>
            {n.permitNotes}
          </p>
          <div style={{display:'flex',alignItems:'center',gap:'1.5rem',marginBottom:'1.5rem',flexWrap:'wrap'}}>
            <div style={{display:'flex',gap:'0.4rem'}}>
              {[1,2,3,4,5].map(i=>(
                <div key={i} style={{width:36,height:36,background:i<=n.permitScore?permit.color:'var(--bdr)',display:'flex',alignItems:'center',justifyContent:'center',...d,fontSize:'1rem',color:i<=n.permitScore?'#000':'var(--bg3)'}}>{i}</div>
              ))}
            </div>
            <div style={{...d,fontSize:'1.8rem',color:permit.color,lineHeight:1}}>{permit.label} ({n.permitScore}/5)</div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'1px',background:'var(--bdr)',marginBottom:'1.5rem'}}>
            <div style={{background:'#fff',padding:'1rem 1.2rem'}}>
              <div style={{...m,fontSize:'0.6rem',color:'var(--muted)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'0.4rem'}}>Typical Fee</div>
              <div style={{...c,fontSize:'0.95rem',fontWeight:600,color:'var(--text)'}}>{n.permitDetail.fee}</div>
            </div>
            <div style={{background:'#fff',padding:'1rem 1.2rem'}}>
              <div style={{...m,fontSize:'0.6rem',color:'var(--muted)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'0.4rem'}}>Processing</div>
              <div style={{...c,fontSize:'0.95rem',fontWeight:600,color:'var(--text)'}}>{n.permitDetail.processing}</div>
            </div>
          </div>
          <div style={{padding:'1.2rem 1.5rem',background:'#fff',border:'1px solid var(--bdr)',borderLeft:`4px solid ${permit.color}`}}>
            <div style={{...m,fontSize:'0.6rem',color:'var(--amber)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'0.7rem'}}>Special Requirements</div>
            <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:'0.6rem'}}>
              {n.permitDetail.specialRequirements.map((r,i)=>(
                <li key={i} style={{...f,fontSize:'0.9rem',color:'var(--text)',lineHeight:1.6,fontWeight:300,display:'flex',gap:'0.7rem'}}>
                  <span style={{color:'var(--amber)',flexShrink:0}}>▸</span>{r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Local Highlights */}
      <section className="section-pad" style={{background:'#fff'}}>
        <div className="content-wrap">
          <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ Local Highlights ]</div>
          <h2 style={{...d,fontSize:'clamp(1.6rem,3vw,2.3rem)',color:'var(--text)',lineHeight:1,marginBottom:'1.5rem'}}>
            {n.name.toUpperCase()} AT A GLANCE
          </h2>
          <ul style={{listStyle:'none',padding:0,margin:0}}>
            {n.highlights.map(h=>(
              <li key={h} style={{...f,fontSize:'0.95rem',color:'var(--muted)',padding:'0.7rem 0',borderBottom:'1px solid var(--bdr)',display:'flex',gap:'0.75rem',fontWeight:300,lineHeight:1.65}}>
                <span style={{color:'var(--amber)',flexShrink:0}}>▸</span>{h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services in this area — "[Service] in [Neighborhood]" */}
      <section className="section-pad" style={{background:'var(--bg2)'}}>
        <div className="content-wrap">
          <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ Services in {n.name} ]</div>
          <h2 style={{...d,fontSize:'clamp(1.6rem,3vw,2.3rem)',color:'var(--text)',lineHeight:1,marginBottom:'1.5rem'}}>
            ROOFING SERVICES IN {n.name.toUpperCase()}
          </h2>
          <p style={{...f,fontSize:'0.95rem',color:'var(--muted)',lineHeight:1.7,fontWeight:300,marginBottom:'1.5rem',maxWidth:'640px'}}>
            All five services covered by the same {n.name} crews. Local cost intelligence on this page applies to every service type — material choice shifts the absolute number, but the {n.name}-specific drivers (deck, canopy, permit, design review) apply across the board.
          </p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'0.6rem'}}>
            {services.map(s=>(
              <Link key={s.slug} href={`/services#${s.slug}`}
                style={{
                  display:'block',
                  background:'#fff',
                  border:'1px solid var(--bdr)',
                  padding:'1rem 1.2rem',
                  textDecoration:'none',
                }}
              >
                <div style={{...c,fontSize:'1rem',fontWeight:700,color:'var(--text)',marginBottom:'0.3rem'}}>
                  {s.name}
                </div>
                <div style={{...m,fontSize:'0.75rem',color:'var(--muted)'}}>${s.avgLow.toLocaleString()}–${s.avgHigh.toLocaleString()} {s.unit}</div>
                <div style={{...c,fontSize:'0.78rem',color:'var(--amber)',marginTop:'0.4rem',letterSpacing:'0.04em'}}>Service detail →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Areas We Serve (text catchment) */}
      <AreasWeServe neighborhood={n} />

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

      {/* FAQ — base + location-specific */}
      <section className="section-pad" style={{background:'var(--bg2)'}}>
        <div className="content-wrap">
          <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ FAQ ]</div>
          <h2 style={{...d,fontSize:'clamp(1.8rem,3vw,2.8rem)',color:'var(--text)',lineHeight:1,marginBottom:'2.5rem'}}>{n.name.toUpperCase()} ROOFING QUESTIONS</h2>
          {allFaqs.map((faq)=>(
            <div key={faq.question} style={{borderTop:'1px solid var(--bdr)',padding:'1.5rem 0'}}>
              <h3 style={{...c,fontSize:'1.05rem',fontWeight:700,color:'var(--text)',marginBottom:'0.7rem'}}>{faq.question}</h3>
              <p style={{...f,fontSize:'0.95rem',color:'var(--muted)',lineHeight:1.7,fontWeight:300}}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
