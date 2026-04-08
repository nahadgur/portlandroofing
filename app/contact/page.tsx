import type { Metadata } from 'next'
import Script from 'next/script'
import Link   from 'next/link'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { SITE } from '@/lib/config'

export const metadata: Metadata = {
  title:`Contact Portland Roofings`,
  description:`Contact Portland Roofings. Free contractor quotes, contractor partnerships, and platform enquiries.`,
  alternates:{canonical:`${SITE.baseUrl}/contact`},
}

export default function ContactPage() {
  const f={fontFamily:'var(--font-barlow)'}as const
  const m={fontFamily:'var(--font-space-mono)'}as const
  const c={fontFamily:'var(--font-barlow-cond)'}as const
  const d={fontFamily:'var(--font-bebas)'}as const
  return (
    <>
      <Script id="schema" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify({'@context':'https://schema.org','@type':'LocalBusiness',name:SITE.name,url:SITE.baseUrl,telephone:SITE.phone,email:SITE.email,address:{'@type':'PostalAddress',addressLocality:'Portland',addressRegion:'OR',addressCountry:'US'}})}</Script>
      <Nav />
      <PageHero
        breadcrumb={[{label:'Home',href:'/'},{label:'Contact'}]}
        eyebrow="Portland Roofings"
        title={<>GET IN<br/><span style={{color:'#F5A623'}}>TOUCH</span></>}
        subtitle="We're a Portland-based roofing referral platform — not a contractor. For fastest response on a quote, use the form on our homepage."
      />
      <section className="section-pad" style={{background:'#fff'}}>
        <div className="content-wrap-wide" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'4rem',alignItems:'start'}}>
          <div>
            <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'1.5rem'}}>[ Contact Details ]</div>
            {[
              {label:'Homeowner Enquiries',value:SITE.email,href:`mailto:${SITE.email}`,note:'Questions about quotes, our platform, or neighborhood coverage.'},
              {label:'Contractor Partnerships',value:`contractors@${SITE.domain}`,href:`mailto:contractors@${SITE.domain}`,note:'Interested in joining the network? Email or use the application form.'},
              {label:'Phone',value:SITE.phone,href:`tel:${SITE.phone.replace(/\D/g,'')}`,note:'Mon–Fri 8am–6pm PT.'},
            ].map(item=>(
              <div key={item.label} style={{background:'var(--bg2)',padding:'1.4rem 1.5rem',marginBottom:'1px'}}>
                <div style={{...m,fontSize:'0.65rem',color:'var(--muted)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'0.4rem'}}>{item.label}</div>
                <a href={item.href} style={{...d,fontSize:'1.3rem',color:'var(--amber)',textDecoration:'none',display:'block',lineHeight:1,marginBottom:'0.4rem'}}>{item.value}</a>
                <p style={{...f,fontSize:'0.82rem',color:'var(--muted)',lineHeight:1.5}}>{item.note}</p>
              </div>
            ))}
          </div>
          <div>
            <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'1rem'}}>[ Service Area ]</div>
            <div style={{border:'1px solid var(--bdr)',overflow:'hidden',marginBottom:'1.5rem'}}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d178781.93143830424!2d-122.84193!3d45.54843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950b0b7da97427%3A0x1c36b9e6f6d18591!2sPortland%2C%20OR!5e0!3m2!1sen!2sus!4v1712500000000" width="100%" height="280" style={{border:0,display:'block',filter:'grayscale(100%) contrast(90%)'}} allowFullScreen loading="lazy" title="Portland Service Area" />
            </div>
            <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'1rem'}}>[ Quick Links ]</div>
            {[{label:'Get Free Quotes',href:'/#quote'},{label:'PDX Cost Index',href:'/pdx-cost-index'},{label:'All 50 Neighborhoods',href:'/#neighborhoods'},{label:'Contractor Vetting Process',href:'/contractors/vetting'},{label:'Apply to Join Network',href:'/contractors/apply'}].map(({label,href})=>(
              <Link key={href} href={href} style={{...c,fontSize:'0.9rem',fontWeight:600,color:'var(--amber)',textDecoration:'none',padding:'0.65rem 1rem',border:'1px solid var(--bdr)',background:'var(--bg2)',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1px'}}>
                {label}<span style={{opacity:0.5}}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
