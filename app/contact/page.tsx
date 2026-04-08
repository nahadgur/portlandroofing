import type { Metadata } from 'next'
import Script from 'next/script'
import Link   from 'next/link'
import Nav    from '@/components/Nav'
import Footer from '@/components/Footer'
import { SITE } from '@/lib/config'

export const metadata: Metadata = {
  title:       `Contact Portland Roofings — Homeowners & Contractor Enquiries`,
  description: `Contact Portland Roofings. Get free contractor quotes, ask about our vetting process, or enquire about contractor partnerships. Based in Portland, Oregon.`,
  alternates:  { canonical: `${SITE.baseUrl}/contact` },
}

const contactSchema = {
  '@context': 'https://schema.org',
  '@type':    'LocalBusiness',
  name:       SITE.name,
  url:        SITE.baseUrl,
  telephone:  SITE.phone,
  email:      SITE.email,
  description: SITE.defaultDescription,
  address: {
    '@type':           'PostalAddress',
    addressLocality:   'Portland',
    addressRegion:     'OR',
    addressCountry:    'US',
  },
  areaServed: {
    '@type': 'City',
    name:    'Portland',
    sameAs:  'https://en.wikipedia.org/wiki/Portland,_Oregon',
  },
  priceRange: 'Free referral service',
}

const contactItems = [
  {
    label: 'Homeowner Enquiries',
    value: SITE.email,
    href:  `mailto:${SITE.email}`,
    note:  'Questions about quotes, our platform, or neighborhood coverage.',
  },
  {
    label: 'Contractor Partnerships',
    value: `contractors@${SITE.domain}`,
    href:  `mailto:contractors@${SITE.domain}`,
    note:  'Interested in joining the network? Email us or use the application form.',
  },
  {
    label: 'Phone',
    value: SITE.phone,
    href:  `tel:${SITE.phone.replace(/\D/g,'')}`,
    note:  'Mon–Fri 8am–6pm PT. For emergency roof situations, use the quote form for fastest response.',
  },
]

export default function ContactPage() {
  const f = { fontFamily:'var(--font-barlow)' } as const
  const m = { fontFamily:'var(--font-space-mono)' } as const
  const c = { fontFamily:'var(--font-barlow-cond)' } as const
  const d = { fontFamily:'var(--font-bebas)' } as const

  return (
    <>
      <Script id="schema-contact" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(contactSchema)}
      </Script>

      <Nav />

      {/* Breadcrumb */}
      <div style={{ padding:'0.8rem 3rem', borderBottom:'1px solid var(--bdr)', background:'var(--bg2)' }}>
        <div style={{ ...m, fontSize:'0.68rem', color:'var(--muted)', display:'flex', gap:'0.5rem' }}>
          <Link href="/" style={{ color:'var(--amber)', textDecoration:'none' }}>Home</Link>
          <span>›</span>
          <span style={{ color:'var(--text)' }}>Contact</span>
        </div>
      </div>

      {/* Header */}
      <div className="section-pad" style={{ background:'var(--bg2)' }}>
        <div className="content-wrap">
          <div style={{ ...m, fontSize:'0.68rem', color:'var(--amber)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'0.8rem' }}>
            [ Get In Touch ]
          </div>
          <h1 style={{ ...d, fontSize:'clamp(2.5rem,6vw,4rem)', lineHeight:0.9, color:'var(--text)', marginBottom:'1rem' }}>
            CONTACT<br /><span style={{ color:'var(--amber)' }}>PORTLAND ROOFINGS</span>
          </h1>
          <p style={{ ...f, fontSize:'1.05rem', color:'var(--muted)', lineHeight:1.7, fontWeight:300, maxWidth:'560px' }}>
            We're a Portland-based roofing referral platform — not a contractor. For the fastest response on a quote, use the form below. For everything else, reach us directly.
          </p>
        </div>
      </div>

      {/* Contact grid + map */}
      <section className="section-pad" style={{ background:'var(--bg)' }}>
        <div className="content-wrap-wide" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'start' }}>

          {/* Left — contact details */}
          <div>
            <div style={{ ...m, fontSize:'0.68rem', color:'var(--amber)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'1.5rem' }}>
              [ Contact Details ]
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:'1px', background:'var(--bdr)', marginBottom:'2.5rem' }}>
              {contactItems.map(item => (
                <div key={item.label} style={{ background:'var(--bg2)', padding:'1.4rem 1.5rem' }}>
                  <div style={{ ...m, fontSize:'0.65rem', color:'var(--muted)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'0.4rem' }}>
                    {item.label}
                  </div>
                  <a href={item.href} style={{ ...d, fontSize:'1.3rem', color:'var(--amber)', textDecoration:'none', display:'block', lineHeight:1, marginBottom:'0.4rem' }}>
                    {item.value}
                  </a>
                  <p style={{ ...f, fontSize:'0.82rem', color:'var(--muted)', lineHeight:1.5 }}>{item.note}</p>
                </div>
              ))}
            </div>

            {/* What we are */}
            <div style={{ ...m, fontSize:'0.68rem', color:'var(--amber)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'1rem' }}>
              [ About This Platform ]
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'0', borderTop:'1px solid var(--bdr)' }}>
              {[
                { label:'Platform type',   value:'Independent referral marketplace' },
                { label:'Licensed contractor?', value:'No — we match homeowners with licensed contractors' },
                { label:'Coverage',        value:'50+ Portland metro neighborhoods' },
                { label:'Contractor vetting', value:'47-point CCB verification process' },
                { label:'Lead service fee', value:'Free for homeowners' },
                { label:'Serving since',   value:'2026' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display:'flex', justifyContent:'space-between', padding:'0.7rem 0', borderBottom:'1px solid var(--bdr)', flexWrap:'wrap', gap:'0.5rem' }}>
                  <span style={{ ...m, fontSize:'0.68rem', color:'var(--muted)', letterSpacing:'0.06em' }}>{label}</span>
                  <span style={{ ...c, fontSize:'0.88rem', color:'var(--text)', fontWeight:600 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — map + quick links */}
          <div>
            <div style={{ ...m, fontSize:'0.68rem', color:'var(--amber)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'1rem' }}>
              [ Service Area ]
            </div>

            {/* Google Map embed — Portland, OR */}
            <div style={{ border:'1px solid var(--bdr)', overflow:'hidden', marginBottom:'1.5rem' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d178781.93143830424!2d-122.84193!3d45.54843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950b0b7da97427%3A0x1c36b9e6f6d18591!2sPortland%2C%20OR!5e0!3m2!1sen!2sus!4v1712500000000"
                width="100%"
                height="280"
                style={{ border:0, display:'block', filter:'grayscale(100%) invert(90%) contrast(85%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Portland Metro Service Area"
              />
            </div>

            {/* Quick links */}
            <div style={{ ...m, fontSize:'0.68rem', color:'var(--amber)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'1rem' }}>
              [ Quick Links ]
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
              {[
                { label:'Get Free Quotes',          href:'/#quote' },
                { label:'PDX Cost Index',            href:'/pdx-cost-index' },
                { label:'All 50 Neighborhoods',     href:'/#neighborhoods' },
                { label:'Contractor Vetting Process', href:'/contractors/vetting' },
                { label:'Apply to Join Network',     href:'/contractors/apply' },
                { label:'Roofing Guides',            href:'/guides' },
              ].map(({ label, href }) => (
                <Link key={href} href={href} style={{ ...c, fontSize:'0.9rem', fontWeight:600, color:'var(--amber)', textDecoration:'none', padding:'0.65rem 1rem', border:'1px solid var(--bdr)', background:'var(--bg2)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  {label}
                  <span style={{ opacity:0.6 }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer — E-E-A-T clarity */}
      <div style={{ background:'var(--bg2)', borderTop:'1px solid var(--bdr)', padding:'2rem 3rem' }}>
        <div className="content-wrap">
          <p style={{ ...f, fontSize:'0.82rem', color:'var(--muted)', lineHeight:1.7 }}>
            <strong style={{ color:'var(--text)' }}>Portland Roofings</strong> is an independent lead generation and contractor referral platform operating in the Portland, Oregon metropolitan area. We are not a licensed roofing contractor and do not perform roofing work. All contractors listed on our platform are independently licensed with the Oregon Construction Contractors Board (CCB). Homeowners are encouraged to verify contractor CCB status directly at{' '}
            <a href="https://search.ccb.state.or.us" target="_blank" rel="noopener noreferrer" style={{ color:'var(--amber)' }}>search.ccb.state.or.us</a>
            {' '}before signing any contract.
          </p>
        </div>
      </div>

      <Footer />
    </>
  )
}
