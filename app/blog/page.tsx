import type { Metadata } from 'next'
import Link    from 'next/link'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { posts, postCategoryLabels, postCategoryColors } from '@/lib/posts'
import { SITE } from '@/lib/config'

export const metadata: Metadata = {
  title:`Portland Roofings Blog — Local Roofing News & Data | ${SITE.name}`,
  description:'Portland roofing news, pricing data, storm damage updates, and contractor market reports.',
  alternates:{canonical:`${SITE.baseUrl}/blog`},
}

function formatDate(iso:string){return new Date(iso).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}

export default function BlogPage() {
  const f={fontFamily:'var(--font-barlow)'}as const
  const m={fontFamily:'var(--font-space-mono)'}as const
  const c={fontFamily:'var(--font-barlow-cond)'}as const
  const sorted=[...posts].sort((a,b)=>new Date(b.published).getTime()-new Date(a.published).getTime())
  return(
    <>
      <Nav />
      <PageHero
        breadcrumb={[{label:'Home',href:'/'},{label:'Blog'}]}
        eyebrow="Portland Roofings"
        title={<>FROM THE<br/><span style={{color:'#F5A623'}}>BLOG</span></>}
        subtitle="Portland roofing news, pricing data, storm updates, and contractor market reports."
      />
      <section className="section-pad" style={{background:'#fff'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'1px',background:'var(--bdr)'}}>
          {sorted.map(p=>(
            <Link key={p.slug} href={`/blog/${p.slug}`} className="nbhd-card-hover" style={{background:'var(--bg2)',padding:'2rem',textDecoration:'none',display:'flex',flexDirection:'column',gap:'0.7rem'}}>
              <div style={{display:'inline-block',...m,fontSize:'0.6rem',letterSpacing:'0.1em',textTransform:'uppercase',padding:'0.15rem 0.45rem',background:`${postCategoryColors[p.category]}15`,color:postCategoryColors[p.category],border:`1px solid ${postCategoryColors[p.category]}33`,width:'fit-content'}}>{postCategoryLabels[p.category]}</div>
              <div style={{...c,fontSize:'1.05rem',fontWeight:700,color:'var(--text)',lineHeight:1.25}}>{p.title}</div>
              <div style={{...f,fontSize:'0.85rem',color:'var(--muted)',lineHeight:1.6,flex:1,fontWeight:300}}>{p.excerpt.slice(0,120)}…</div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span style={{...m,fontSize:'0.62rem',color:'var(--muted)'}}>{formatDate(p.published)}</span>
                <span style={{...c,fontSize:'0.82rem',color:'var(--amber)'}}>Read →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </>
  )
}
