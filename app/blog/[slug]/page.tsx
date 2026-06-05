import type { Metadata } from 'next'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import Link   from 'next/link'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { getBlogImage } from '@/lib/neighborhoodImages'
import { posts, getPostBySlug, getStaticPostPaths, postCategoryLabels, postCategoryColors, type Post } from '@/lib/posts'
import { getGuideBySlug } from '@/lib/guides'
import { SITE } from '@/lib/config'
import { breadcrumbSchema, articleSchema } from '@/lib/schema'
import ModalTriggerBtn from '@/components/ModalTriggerBtn'
import type { ReactNode } from 'react'

// Lightweight inline markdown used by the body + FAQ renderers: [text](url) links and **bold**.
function renderBold(text: string, baseKey: number): ReactNode[] {
  return text.split(/\*\*([^*]+)\*\*/g).map((part, i) =>
    i % 2 === 1
      ? <strong key={`b${baseKey}-${i}`}>{part}</strong>
      : <span key={`t${baseKey}-${i}`}>{part}</span>
  )
}
function renderInline(text: string): ReactNode[] {
  const out: ReactNode[] = []
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  let key = 0
  let m: RegExpExecArray | null
  while ((m = linkRe.exec(text)) !== null) {
    if (m.index > last) out.push(...renderBold(text.slice(last, m.index), key++))
    const label = m[1]
    const href = m[2]
    if (href.startsWith('/')) out.push(<Link key={`lk${key++}`} href={href} style={{ color: 'var(--amber)', textDecoration: 'underline' }}>{label}</Link>)
    else out.push(<a key={`ex${key++}`} href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>{label}</a>)
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(...renderBold(text.slice(last), key++))
  return out
}

export function generateStaticParams() { return getStaticPostPaths() }
// Only slugs from generateStaticParams are valid routes; drafts and unknown
// slugs 404 at runtime instead of server-rendering on demand.
export const dynamicParams = false
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPostBySlug(params.slug)
  if (!p) return {}
  const url = `${SITE.baseUrl}/blog/${p.slug}`
  return { title:p.title, description:p.excerpt, alternates:{canonical:url}, openGraph:{title:p.title,description:p.excerpt,url,type:'article',publishedTime:p.published} }
}
function formatDate(iso:string){return new Date(iso).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const p = getPostBySlug(params.slug)
  if (!p || p.draft) notFound()
  // Parent hub (if this post is a silo spoke) drives the breadcrumb + backlink.
  const hub = p.hub ? getGuideBySlug(p.hub) : undefined
  // Prefer the post's declared sibling spokes (non-draft, in-site); otherwise
  // fall back to the most recent non-draft posts. Never link a draft.
  const relatedSpokes = (p.relatedSpokes ?? [])
    .map(s => getPostBySlug(s))
    .filter((x): x is Post => !!x && !x.draft)
  const related = relatedSpokes.length
    ? relatedSpokes.slice(0,3)
    : posts.filter(x=>x.slug!==p.slug && !x.draft).sort((a,b)=>new Date(b.published).getTime()-new Date(a.published).getTime()).slice(0,2)
  const crumbs = hub
    ? [{name:'Home',url:SITE.baseUrl},{name:'Guides',url:`${SITE.baseUrl}/guides`},{name:hub.headline,url:`${SITE.baseUrl}/guides/${hub.slug}`},{name:p.title,url:`${SITE.baseUrl}/blog/${p.slug}`}]
    : [{name:'Home',url:SITE.baseUrl},{name:'Blog',url:`${SITE.baseUrl}/blog`},{name:p.title,url:`${SITE.baseUrl}/blog/${p.slug}`}]
  const f={fontFamily:'var(--font-barlow)'}as const
  const m={fontFamily:'var(--font-space-mono)'}as const
  const c={fontFamily:'var(--font-barlow-cond)'}as const
  const d={fontFamily:'var(--font-bebas)'}as const
  const catColor = postCategoryColors[p.category]
  return (
    <>
      <Script id="s1" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(articleSchema({ headline:p.title, description:p.excerpt, url:`${SITE.baseUrl}/blog/${p.slug}`, datePublished:p.published }))}</Script>
      <Script id="s2" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema(crumbs))}</Script>
      {p.faqs&&p.faqs.length>0&&<Script id="s3" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:p.faqs.map(qa=>({'@type':'Question',name:qa.q,acceptedAnswer:{'@type':'Answer',text:qa.a}}))})}</Script>}
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
          {hub&&(
            <div style={{...m,fontSize:'0.7rem',letterSpacing:'0.08em',marginBottom:'2.2rem'}}>
              <Link href={`/guides/${hub.slug}`} style={{color:'var(--amber)',textDecoration:'none'}}>← Part of: {hub.headline}</Link>
            </div>
          )}
          {p.body.map((section,i)=>(
            <div key={i} style={{marginBottom:'2.8rem'}}>
              {section.heading&&<h2 style={{...d,fontSize:'clamp(1.6rem,3vw,2.2rem)',color:'var(--text)',lineHeight:1,marginBottom:'1.4rem',paddingTop:i>0?'2rem':0,borderTop:i>0?'1px solid var(--bdr)':'none'}}>{section.heading}</h2>}
              {section.body.split('\n\n').map((block,j)=>{
                const lines=block.split('\n').map(l=>l.trim()).filter(Boolean)
                const isUL=lines.length>0&&lines.every(l=>l.startsWith('- '))
                const isOL=lines.length>0&&lines.every(l=>/^\d+\.\s/.test(l))
                const listStyle={...f,fontSize:'clamp(0.95rem,1.8vw,1.05rem)',color:'var(--text)',lineHeight:1.8,marginBottom:'1.3rem',paddingLeft:'1.3rem',fontWeight:300}as const
                if(isUL)return <ul key={j} style={listStyle}>{lines.map((l,k)=><li key={k} style={{marginBottom:'0.5rem'}}>{renderInline(l.replace(/^-\s/,''))}</li>)}</ul>
                if(isOL)return <ol key={j} style={listStyle}>{lines.map((l,k)=><li key={k} style={{marginBottom:'0.5rem'}}>{renderInline(l.replace(/^\d+\.\s/,''))}</li>)}</ol>
                return <p key={j} style={{...f,fontSize:'clamp(0.95rem,1.8vw,1.05rem)',color:'var(--text)',lineHeight:1.8,marginBottom:'1.3rem',fontWeight:300}}>{renderInline(block)}</p>
              })}
            </div>
          ))}
          {p.faqs&&p.faqs.length>0&&(
            <div style={{marginBottom:'2.8rem'}}>
              <h2 style={{...d,fontSize:'clamp(1.6rem,3vw,2.2rem)',color:'var(--text)',lineHeight:1,marginBottom:'1.4rem',paddingTop:'2rem',borderTop:'1px solid var(--bdr)'}}>Common Questions</h2>
              <dl style={{margin:0}}>
                {p.faqs.map((qa,k)=>(
                  <div key={k} style={{marginBottom:'1.3rem',paddingBottom:'1.3rem',borderBottom:'1px solid var(--bdr)'}}>
                    <dt style={{...c,fontSize:'1.1rem',fontWeight:700,color:'var(--text)',marginBottom:'0.5rem'}}>{qa.q}</dt>
                    <dd style={{...f,margin:0,fontSize:'clamp(0.95rem,1.8vw,1.05rem)',color:'var(--text)',lineHeight:1.8,fontWeight:300}}>{renderInline(qa.a)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          <div style={{marginTop:'3rem',padding:'2rem 2.5rem',background:'var(--bg2)',border:'1px solid var(--bdr)',borderLeft:`4px solid ${catColor}`,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1.5rem'}}>
            <div>
              <div style={{...m,fontSize:'0.65rem',color:catColor,letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:'0.4rem'}}>Get Matched with Vetted Portland Contractors</div>
              <p style={{...f,fontSize:'0.95rem',color:'var(--muted)',lineHeight:1.6,fontWeight:300}}>Free quotes in your zip code. 48-hour response. No spam.</p>
            </div>
            <ModalTriggerBtn style={{display:'inline-block',background:'var(--amber-btn)',color:'#000',...c,fontWeight:700,fontSize:'0.9rem',letterSpacing:'0.1em',textTransform:'uppercase',padding:'0.8rem 2rem',textDecoration:'none',whiteSpace:'nowrap',flexShrink:0}}>Get Free Quotes →</ModalTriggerBtn>
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
