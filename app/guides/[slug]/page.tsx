import type { Metadata } from 'next'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import Link   from 'next/link'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { getGuideImage } from '@/lib/neighborhoodImages'
import { guides, getGuideBySlug, getStaticGuidePaths, categoryLabels } from '@/lib/guides'
import { SITE } from '@/lib/config'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'

export function generateStaticParams() { return getStaticGuidePaths() }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = getGuideBySlug(params.slug)
  if (!g) return {}
  const url = `${SITE.baseUrl}/guides/${g.slug}`
  return { title:`${g.title} | ${SITE.name}`, description:g.description, alternates:{canonical:url}, openGraph:{title:g.title,description:g.description,url,type:'article'} }
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = getGuideBySlug(params.slug)
  if (!g) notFound()
  const related = guides.filter(x=>x.slug!==g.slug&&(x.category===g.category||x.featured)).slice(0,2)
  const f={fontFamily:'var(--font-barlow)'}as const
  const m={fontFamily:'var(--font-space-mono)'}as const
  const c={fontFamily:'var(--font-barlow-cond)'}as const
  const d={fontFamily:'var(--font-bebas)'}as const
  return (
    <>
      <Script id="s1" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify({
        '@context':'https://schema.org','@type':'Article',
        headline:g.title,description:g.description,datePublished:g.published,
        author:{'@type':'Organization',name:SITE.name,url:SITE.baseUrl},
        url:`${SITE.baseUrl}/guides/${g.slug}`,
      })}</Script>
      <Script id="s2" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema([{name:'Home',url:SITE.baseUrl},{name:'Guides',url:`${SITE.baseUrl}/guides`},{name:g.headline,url:`${SITE.baseUrl}/guides/${g.slug}`}]))}</Script>
      <Script id="s3" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(faqSchema(g.faqs))}</Script>
      <Nav />
      <PageHero
        imageUrl={getGuideImage(g.slug)}
        breadcrumb={[{label:'Home',href:'/'},{label:'Guides',href:'/guides'},{label:g.headline}]}
        eyebrow={`${categoryLabels[g.category]} · ${g.readTime} min read`}
        title={g.title.toUpperCase()}
        subtitle={g.description}
      />
      <div style={{background:'#fff',borderBottom:'1px solid var(--bdr)'}}>
        <article style={{maxWidth:'900px',margin:'0 auto',padding:'clamp(2.5rem,5vw,4rem) clamp(1.5rem,4vw,3rem)'}}>
          {/* TOC */}
          <div style={{background:'var(--bg2)',border:'1px solid var(--bdr)',padding:'1.5rem 2rem',marginBottom:'3.5rem',borderLeft:'3px solid var(--amber-btn)'}}>
            <div style={{...m,fontSize:'0.65rem',color:'var(--amber)',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:'1rem'}}>In This Guide</div>
            <ol style={{listStyle:'none'}}>
              {g.sections.map((s,i)=>(
                <li key={i} style={{...f,fontSize:'0.92rem',color:'var(--muted)',padding:'0.4rem 0',borderBottom:i<g.sections.length-1?'1px solid var(--bdr)':'none',display:'flex',gap:'1rem',alignItems:'baseline'}}>
                  <span style={{...m,fontSize:'0.68rem',color:'var(--amber)',flexShrink:0}}>{String(i+1).padStart(2,'0')}</span>
                  {s.heading ?? s.title}
                </li>
              ))}
            </ol>
          </div>
          {/* Sections */}
          {g.sections.map((s,i)=>(
            <div key={i} style={{marginBottom:'3.5rem'}}>
              <h2 style={{...d,fontSize:'clamp(1.6rem,3vw,2.2rem)',color:'var(--text)',lineHeight:1,marginBottom:'1.4rem',paddingTop:'2rem',borderTop:'1px solid var(--bdr)'}}>{s.heading ?? s.title}</h2>
              {s.body.split('\n\n').map((para,j)=>(
                <p key={j} style={{...f,fontSize:'clamp(0.95rem,1.8vw,1.05rem)',color:'var(--text)',lineHeight:1.8,marginBottom:'1.3rem',fontWeight:300}}>{para}</p>
              ))}
            </div>
          ))}
          {/* FAQ */}
          {g.faqs.length>0&&(
            <div style={{marginTop:'2rem',borderTop:'2px solid var(--bdr)',paddingTop:'2.5rem'}}>
              <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'1.5rem'}}>[ Frequently Asked ]</div>
              {g.faqs.map(({question,answer})=>(
                <div key={question} style={{marginBottom:'2rem',paddingBottom:'2rem',borderBottom:'1px solid var(--bdr)'}}>
                  <h3 style={{...c,fontSize:'1.1rem',fontWeight:700,color:'var(--text)',marginBottom:'0.7rem'}}>{question}</h3>
                  <p style={{...f,fontSize:'0.97rem',color:'var(--muted)',lineHeight:1.75,fontWeight:300}}>{answer}</p>
                </div>
              ))}
            </div>
          )}
          {/* CTA */}
          <div style={{marginTop:'3rem',padding:'2rem 2.5rem',background:'var(--bg2)',border:'1px solid var(--bdr)',borderLeft:'4px solid var(--amber-btn)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1.5rem'}}>
            <div>
              <div style={{...m,fontSize:'0.65rem',color:'var(--amber)',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:'0.4rem'}}>Ready to Move Forward?</div>
              <p style={{...f,fontSize:'0.95rem',color:'var(--muted)',lineHeight:1.6,fontWeight:300}}>Free quotes from vetted Portland contractors. 48-hour response guaranteed.</p>
            </div>
            <a href="/#quote" style={{display:'inline-block',background:'var(--amber-btn)',color:'#000',...c,fontWeight:700,fontSize:'0.9rem',letterSpacing:'0.1em',textTransform:'uppercase',padding:'0.8rem 2rem',textDecoration:'none',whiteSpace:'nowrap',flexShrink:0}}>Get Free Quotes →</a>
          </div>
        </article>
      </div>
      {/* Related */}
      {related.length>0&&(
        <section className="section-pad" style={{background:'var(--bg2)'}}>
          <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'1.5rem'}}>[ Related Guides ]</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1px',background:'var(--bdr)'}}>
            {related.map(r=>(
              <Link key={r.slug} href={`/guides/${r.slug}`} className="nbhd-card-hover" style={{background:'#fff',padding:'1.8rem',textDecoration:'none',display:'block'}}>
                <div style={{...m,fontSize:'0.62rem',color:'var(--amber)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'0.6rem'}}>{categoryLabels[r.category]}</div>
                <div style={{...c,fontSize:'1.05rem',fontWeight:700,color:'var(--text)',lineHeight:1.3,marginBottom:'0.5rem'}}>{r.title}</div>
                <div style={{...m,fontSize:'0.65rem',color:'var(--amber)',marginTop:'0.8rem'}}>Read Guide →</div>
              </Link>
            ))}
          </div>
        </section>
      )}
      <Footer />
    </>
  )
}
