import type { Metadata } from 'next'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import Link   from 'next/link'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { getBlogImage } from '@/lib/neighborhoodImages'
import { posts, getPostBySlug, getStaticPostPaths, postCategoryLabels, postCategoryColors } from '@/lib/posts'
import { SITE } from '@/lib/config'
import { breadcrumbSchema } from '@/lib/schema'

export function generateStaticParams() { return getStaticPostPaths() }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPostBySlug(params.slug)
  if (!p) return {}
  const url = `${SITE.baseUrl}/blog/${p.slug}`
  return { title:`${p.title} | ${SITE.name}`, description:p.excerpt, alternates:{canonical:url}, openGraph:{title:p.title,description:p.excerpt,url,type:'article',publishedTime:p.published} }
}
function formatDate(iso:string){return new Date(iso).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const p = getPostBySlug(params.slug)
  if (!p) notFound()
  const related = posts.filter(x=>x.slug!==p.slug).sort((a,b)=>new Date(b.published).getTime()-new Date(a.published).getTime()).slice(0,2)
  const f={fontFamily:'var(--font-barlow)'}as const
  const m={fontFamily:'var(--font-space-mono)'}as const
  const c={fontFamily:'var(--font-barlow-cond)'}as const
  const d={fontFamily:'var(--font-bebas)'}as const
  const catColor = postCategoryColors[p.category]
  return (
    <>
      <Script id="s1" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify({
        '@context':'https://schema.org','@type':'BlogPosting',
        headline:p.title,description:p.excerpt,datePublished:p.published,
        author:{'@type':'Organization',name:SITE.name,url:SITE.baseUrl},
        url:`${SITE.baseUrl}/blog/${p.slug}`,
      })}</Script>
      <Script id="s2" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema([{name:'Home',url:SITE.baseUrl},{name:'Blog',url:`${SITE.baseUrl}/blog`},{name:p.title,url:`${SITE.baseUrl}/blog/${p.slug}`}]))}</Script>
      <Nav />
      <PageHero
        imageUrl={getBlogImage(p.slug)}
        breadcrumb={[{label:'Home',href:'/'},{label:'Blog',href:'/blog'},{label:p.title}]}
        eyebrow={`${postCategoryLabels[p.category]} · ${formatDate(p.published)} · ${p.readTime} min read`}
        title={p.title.toUpperCase()}
        subtitle={p.excerpt}
      />
      <div style={{background:'#fff',borderBottom:'1px solid var(--bdr)'}}>
        <article style={{maxWidth:'900px',margin:'0 auto',padding:'clamp(2.5rem,5vw,4rem) clamp(1.5rem,4vw,3rem)'}}>
          {p.body.map((section,i)=>(
            <div key={i} style={{marginBottom:'2.8rem'}}>
              {section.heading&&<h2 style={{...d,fontSize:'clamp(1.6rem,3vw,2.2rem)',color:'var(--text)',lineHeight:1,marginBottom:'1.4rem',paddingTop:i>0?'2rem':0,borderTop:i>0?'1px solid var(--bdr)':'none'}}>{section.heading}</h2>}
              {section.body.split('\n\n').map((para,j)=>(
                <p key={j} style={{...f,fontSize:'clamp(0.95rem,1.8vw,1.05rem)',color:'var(--text)',lineHeight:1.8,marginBottom:'1.3rem',fontWeight:300}}>{para}</p>
              ))}
            </div>
          ))}
          <div style={{marginTop:'3rem',padding:'2rem 2.5rem',background:'var(--bg2)',border:'1px solid var(--bdr)',borderLeft:`4px solid ${catColor}`,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1.5rem'}}>
            <div>
              <div style={{...m,fontSize:'0.65rem',color:catColor,letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:'0.4rem'}}>Get Matched with Vetted Portland Contractors</div>
              <p style={{...f,fontSize:'0.95rem',color:'var(--muted)',lineHeight:1.6,fontWeight:300}}>Free quotes in your zip code. 48-hour response. No spam.</p>
            </div>
            <a href="/#quote" style={{display:'inline-block',background:'var(--amber-btn)',color:'#000',...c,fontWeight:700,fontSize:'0.9rem',letterSpacing:'0.1em',textTransform:'uppercase',padding:'0.8rem 2rem',textDecoration:'none',whiteSpace:'nowrap',flexShrink:0}}>Get Free Quotes →</a>
          </div>
        </article>
      </div>
      {related.length>0&&(
        <section className="section-pad" style={{background:'var(--bg2)'}}>
          <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'1.5rem'}}>[ More From The Blog ]</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1px',background:'var(--bdr)'}}>
            {related.map(r=>(
              <Link key={r.slug} href={`/blog/${r.slug}`} className="nbhd-card-hover" style={{background:'#fff',padding:'1.8rem',textDecoration:'none',display:'block'}}>
                <div style={{...m,fontSize:'0.62rem',color:postCategoryColors[r.category],letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'0.6rem'}}>{postCategoryLabels[r.category]}</div>
                <div style={{...c,fontSize:'1.05rem',fontWeight:700,color:'var(--text)',lineHeight:1.3,marginBottom:'0.5rem'}}>{r.title}</div>
                <div style={{...c,fontSize:'0.82rem',color:'var(--amber)'}}>Read →</div>
              </Link>
            ))}
          </div>
        </section>
      )}
      <Footer />
    </>
  )
}
