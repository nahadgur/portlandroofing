import type { Metadata } from 'next'
import Script from 'next/script'
import Nav              from '@/components/Nav'
import Ticker           from '@/components/Ticker'
import Hero             from '@/components/Hero'
import LeadForm         from '@/components/LeadForm'
import DataBar          from '@/components/DataBar'
import NeighborhoodGrid from '@/components/NeighborhoodGrid'
import PriceIndex       from '@/components/PriceIndex'
import ContractorGrid   from '@/components/ContractorGrid'
import Footer           from '@/components/Footer'
import { SITE }         from '@/lib/config'
import { localBusinessSchema, faqSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title:       SITE.defaultTitle,
  description: SITE.defaultDescription,
  alternates:  { canonical: SITE.baseUrl },
}

const faqs = [
  { q:'How much does a new roof cost in Portland, Oregon?', a:'The average roof replacement in Portland costs $9,400, ranging from $6,500 for basic asphalt shingle to $24,000+ for standing-seam metal on larger homes. Costs vary significantly by neighborhood — West Hills and Lake Oswego average $12,000–$13,000+ while North Portland averages $7,500–$8,000.' },
  { q:"What roofing materials are best for Portland's rainy climate?", a:"For Portland's 144+ annual rain days, architectural asphalt shingles (30-year rated), standing-seam metal, and Class 4 impact-resistant shingles all perform well. Cedar shake requires more maintenance in the PNW's wet climate. Metal roofing offers the best long-term ROI for most Portland homeowners." },
  { q:'Do I need a permit to replace my roof in Portland?', a:'In most cases, yes. The City of Portland requires a roofing permit for full replacements. Historic districts (Ladd\'s Addition, Irvington) have additional design review requirements. Permits typically cost $150–$400 and add 1–2 weeks to project timelines.' },
  { q:'How do I vet a roofing contractor in Oregon?', a:'All Oregon roofing contractors must hold a valid CCB (Construction Contractors Board) license. Verify at oregon.gov/ccb, confirm they carry at least $1M general liability insurance, and check reviews on Google and the BBB. Our platform does all 47 of these checks before listing any contractor.' },
]

export default function HomePage() {
  return (
    <>
      <Script id="schema-lb"  type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(localBusinessSchema())}</Script>
      <Script id="schema-faq" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(faqSchema(faqs))}</Script>

      <Nav />
      <Ticker />

      {/* Hero + Lead Form — responsive via grid-hero class */}
      <section id="quote" className="grid-hero">
        <Hero />
        <LeadForm />
      </section>

      <DataBar />
      <NeighborhoodGrid />
      <PriceIndex />
      <ContractorGrid />

      {/* FAQ */}
      <section id="guides" className="section-pad" style={{background:'var(--bg2)'}}>
        <div style={{fontFamily:'var(--font-space-mono)',fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ Common Questions ]</div>
        <h2 style={{fontFamily:'var(--font-bebas)',fontSize:'clamp(2rem,3.5vw,3rem)',color:'var(--text)',lineHeight:1,marginBottom:'3rem'}}>PORTLAND ROOFING FAQ</h2>
        <div className="grid-faq">
          {faqs.map(({q,a})=>(
            <div key={q} style={{borderTop:'1px solid var(--bdr)',paddingTop:'1.5rem'}}>
              <h3 style={{fontFamily:'var(--font-barlow-cond)',fontSize:'1rem',fontWeight:700,color:'var(--text)',marginBottom:'0.8rem'}}>{q}</h3>
              <p style={{fontFamily:'var(--font-barlow)',fontSize:'0.88rem',color:'var(--muted)',lineHeight:1.7,fontWeight:300}}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
