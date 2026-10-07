import type { Metadata } from 'next'
import Link   from 'next/link'
import Nav              from '@/components/Nav'
import Hero             from '@/components/Hero'
import LeadForm         from '@/components/LeadForm'
import NeighborhoodGrid from '@/components/NeighborhoodGrid'
import PriceIndex       from '@/components/PriceIndex'
import ComparisonEngine from '@/components/ComparisonEngine'
import Footer           from '@/components/Footer'
import { SITE }         from '@/lib/config'
import { faqSchema, organizationSchema, webSiteSchema } from '@/lib/schema'
import { guides, categoryLabels } from '@/lib/guides'
import { posts, postCategoryLabels, postCategoryColors } from '@/lib/posts'
import { services } from '@/lib/services'

export const metadata: Metadata = {
  title:      SITE.defaultTitle,
  description: SITE.defaultDescription,
  alternates: { canonical: SITE.baseUrl },
}

const faqs = [
  {
    "q": "How much does a new roof cost in Portland, Oregon?",
    "a": "A useful estimate starts with the measured roof area, assembly, access, removal scope, and any repairs beneath the covering. Compare written bids with the same scope. Our calculators illustrate assumptions; they are not a survey of local prices."
  },
  {
    "q": "Which roofing material should I choose?",
    "a": "Ask an installer to compare materials that suit the roof slope and assembly. Consider the complete installed scope, maintenance, appearance, warranty conditions, and budget. There is no single best material for every Portland property."
  },
  {
    "q": "Do I need a permit to replace my roof in Portland?",
    "a": "Portland exempts similar-weight reroofing on one- and two-family homes, including sheathing replacement. Exceptions include townhouses, wildfire-zone dwellings, and photovoltaic roof coverings. Confirm your project with Portland Permitting and Development; zoning requirements can also apply."
  },
  {
    "q": "How do I check an Oregon roofing contractor?",
    "a": "Look up the exact business and license number in the Oregon CCB records. Check current status, review the available history, and ask for insurance and written contract details. A referral from this site is not a substitute for those checks."
  },
  {
    "q": "How long will a roof replacement take?",
    "a": "Ask for a schedule based on the roof, access, materials, and repair scope. Separate installation time from the wait for materials, crew availability, weather, and required approvals. Agree how the home will be protected if rain interrupts work."
  },
  {
    "q": "When should I schedule roofing work?",
    "a": "Plan with the installer around current weather, product installation requirements, and material availability. An active leak may need temporary protection before permanent repairs can be scheduled."
  }
]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const m = (s: string) => ({ fontFamily: `var(--font-${s})` }) as React.CSSProperties
const f = m('barlow')
const mono = m('space-mono')
const cond = m('barlow-cond')
const disp = m('bebas')

export default function HomePage() {
  const featuredGuides = guides.filter(g => g.featured).slice(0, 3)
  const featuredPosts  = posts.filter(p => !p.draft).slice(0, 3)

  return (
    <>
      <script id="schema-website" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema()) }} />
      <script id="schema-org" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
      <script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <Nav />

      {/* ── W1-B HERO, floating form card inside full-bleed photo ── */}
      <section id="quote">
        <Hero>
          <div className="form-float" id="lead-form">
            <LeadForm />
          </div>
        </Hero>
      </section>


      {/* ── SERVICES STRIP ── */}
      <div style={{ background:'#fff', borderBottom:'1px solid var(--bdr)', padding:'1.2rem 3rem', display:'flex', gap:'0.5rem', flexWrap:'wrap', alignItems:'center' }}>
        <span style={{ ...mono, fontSize:'0.62rem', color:'var(--muted)', letterSpacing:'0.1em', textTransform:'uppercase', marginRight:'0.5rem', flexShrink:0 }}>Services:</span>
        {services.map(s=>(
          <Link key={s.slug} href={`/services/${s.slug}/`} style={{ ...cond, fontSize:'0.82rem', letterSpacing:'0.04em', color:'var(--amber)', padding:'0.3rem 0.8rem', border:'1px solid var(--bdr)', textDecoration:'none', background:'#fff', whiteSpace:'nowrap' }}>
            {s.shortName}
          </Link>
        ))}
        <Link href="/services" style={{ ...cond, fontSize:'0.82rem', color:'var(--muted)', padding:'0.3rem 0.8rem', border:'1px solid var(--bdr)', textDecoration:'none', background:'#fff', whiteSpace:'nowrap' }}>
          All Services →
        </Link>
      </div>

      {/* ── NEIGHBORHOODS ── */}
      <div id="neighborhoods">
        <NeighborhoodGrid />
      </div>

      {/* ── PRICE INDEX ── */}
      <PriceIndex />

      {/* ── COMPARISON ENGINE ── */}
      <section className="section-pad" style={{ background:'var(--bg2)' }}>
        <div style={{ ...mono, fontSize:'0.68rem', color:'var(--amber)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'0.8rem' }}>[ Materials ]</div>
        <h2 style={{ ...disp, fontSize:'clamp(2rem,4vw,3.2rem)', color:'var(--text)', lineHeight:1, marginBottom:'0.5rem' }}>METAL VS ASPHALT</h2>
        <p style={{ ...f, fontSize:'1rem', color:'var(--muted)', maxWidth:'520px', fontWeight:300, marginBottom:'2.5rem' }}>Compare the installation scope, maintenance needs, and warranty terms before choosing a material.</p>
        <ComparisonEngine />
      </section>

      {/* ── GUIDES TEASER ── */}
      <section className="section-pad" style={{ background:'#fff' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'2rem', flexWrap:'wrap', gap:'1rem' }}>
          <div>
            <div style={{ ...mono, fontSize:'0.68rem', color:'var(--amber)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'0.5rem' }}>[ Guides ]</div>
            <h2 style={{ ...disp, fontSize:'clamp(1.8rem,3.5vw,3rem)', color:'var(--text)', lineHeight:1 }}>PORTLAND ROOFING GUIDES</h2>
          </div>
          <Link href="/guides" style={{ ...cond, fontSize:'0.85rem', color:'var(--amber)', textDecoration:'none', letterSpacing:'0.06em', whiteSpace:'nowrap' }}>All Guides →</Link>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1px', background:'var(--bdr)' }}>
          {featuredGuides.map(g=>(
            <Link key={g.slug} href={`/guides/${g.slug}`} className="nbhd-card-hover" style={{ background:'var(--bg2)', padding:'1.8rem', textDecoration:'none', display:'flex', flexDirection:'column', gap:'0.7rem' }}>
              <div style={{ ...mono, fontSize:'0.62rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--amber)' }}>{categoryLabels[g.category]}</div>
              <div style={{ ...cond, fontSize:'1.05rem', fontWeight:700, color:'var(--text)', lineHeight:1.25 }}>{g.title}</div>
              <div style={{ ...f, fontSize:'0.85rem', color:'var(--muted)', lineHeight:1.6, flex:1, fontWeight:300 }}>{g.description.slice(0,100)}…</div>
              <div style={{ ...cond, fontSize:'0.82rem', color:'var(--amber)', letterSpacing:'0.04em' }}>{g.readTime} min read →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── BLOG TEASER ── */}
      <section className="section-pad" style={{ background:'var(--bg2)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'2rem', flexWrap:'wrap', gap:'1rem' }}>
          <div>
            <div style={{ ...mono, fontSize:'0.68rem', color:'var(--amber)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'0.5rem' }}>[ Latest ]</div>
            <h2 style={{ ...disp, fontSize:'clamp(1.8rem,3.5vw,3rem)', color:'var(--text)', lineHeight:1 }}>FROM THE BLOG</h2>
          </div>
          <Link href="/blog" style={{ ...cond, fontSize:'0.85rem', color:'var(--amber)', textDecoration:'none', letterSpacing:'0.06em', whiteSpace:'nowrap' }}>All Posts →</Link>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1px', background:'var(--bdr)' }}>
          {featuredPosts.map(p=>(
            <Link key={p.slug} href={`/blog/${p.slug}`} className="nbhd-card-hover" style={{ background:'#fff', padding:'1.8rem', textDecoration:'none', display:'flex', flexDirection:'column', gap:'0.7rem' }}>
              <div style={{ display:'inline-block', ...mono, fontSize:'0.6rem', letterSpacing:'0.1em', textTransform:'uppercase', padding:'0.15rem 0.45rem', background:`${postCategoryColors[p.category]}15`, color:postCategoryColors[p.category], border:`1px solid ${postCategoryColors[p.category]}33`, width:'fit-content' }}>
                {postCategoryLabels[p.category]}
              </div>
              <div style={{ ...cond, fontSize:'1.05rem', fontWeight:700, color:'var(--text)', lineHeight:1.25 }}>{p.title}</div>
              <div style={{ ...f, fontSize:'0.85rem', color:'var(--muted)', lineHeight:1.6, flex:1, fontWeight:300 }}>{p.excerpt.slice(0,100)}…</div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ ...mono, fontSize:'0.6rem', color:'var(--muted)' }}>{formatDate(p.published)}</span>
                <span style={{ ...cond, fontSize:'0.82rem', color:'var(--amber)', letterSpacing:'0.04em' }}>Read →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-pad" style={{ background:'#fff' }}>
        <div style={{ ...mono, fontSize:'0.68rem', color:'var(--amber)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'0.8rem' }}>[ Common Questions ]</div>
        <h2 style={{ ...disp, fontSize:'clamp(2rem,3.5vw,3rem)', color:'var(--text)', lineHeight:1, marginBottom:'3rem' }}>PORTLAND ROOFING FAQ</h2>
        <div className="grid-faq">
          {faqs.map(({q,a})=>(
            <div key={q} style={{ borderTop:'1px solid var(--bdr)', paddingTop:'1.5rem', paddingBottom:'1.5rem' }}>
              <h3 style={{ ...cond, fontSize:'1.05rem', fontWeight:700, color:'var(--text)', marginBottom:'0.8rem' }}>{q}</h3>
              <p style={{ ...f, fontSize:'0.92rem', color:'var(--muted)', lineHeight:1.7, fontWeight:300 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTRACTOR CTA ── */}
      <div style={{ background:'#0A0B0D', padding:'2rem 3rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <div style={{ ...disp, fontSize:'1.4rem', color:'#fff', lineHeight:1 }}>ARE YOU A PORTLAND ROOFING CONTRACTOR?</div>
          <div style={{ ...f, fontSize:'0.88rem', color:'rgba(255,255,255,0.45)', marginTop:'0.3rem' }}>Share your business details and service area to enquire about referrals.</div>
        </div>
        <Link href="/contractors/apply" style={{ background:'transparent', border:'1px solid #F5A623', color:'#F5A623', ...cond, fontWeight:700, fontSize:'0.85rem', letterSpacing:'0.1em', textTransform:'uppercase', padding:'0.75rem 1.8rem', textDecoration:'none', whiteSpace:'nowrap' }}>
          Apply to Join →
        </Link>
      </div>

      <Footer />
    </>
  )
}
