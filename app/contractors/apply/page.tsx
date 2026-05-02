import type { Metadata } from 'next'
import Link   from 'next/link'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import PageHero from '@/components/PageHero'
import ContractorApplyForm from '@/components/ContractorApplyForm'
import { SITE } from '@/lib/config'

export const metadata: Metadata = {
  title:`Join the Portland Roofings Contractor Network | ${SITE.name}`,
  description:"Apply to join Portland's most rigorous contractor vetting platform. CCB-licensed Oregon roofing contractors only.",
  alternates:{canonical:`${SITE.baseUrl}/contractors/apply`},
  robots:{index:false},
}

export default function ContractorsApplyPage() {
  const f={fontFamily:'var(--font-barlow)'}as const
  const m={fontFamily:'var(--font-space-mono)'}as const
  const c={fontFamily:'var(--font-barlow-cond)'}as const
  const d={fontFamily:'var(--font-bebas)'}as const
  return (
    <>
      <Nav />
      <PageHero
        imageUrl="/images/hero-apply.jpeg"
        breadcrumb={[{label:'Home',href:'/'},{label:'For Contractors'},{label:'Apply'}]}
        eyebrow="For Oregon CCB-Licensed Contractors"
        title={<>JOIN THE<br/><span style={{color:'#F5A623'}}>NETWORK</span></>}
        subtitle="We rank for roofing searches across Portland's 10 deepest cost markets. The leads are coming in. We're vetting contractors to fill the listed slots — and only the top 1% pass."
        stats={[{label:'Vetting Points',value:'47'},{label:'Cost Markets',value:'10'},{label:'Pass Rate',value:'<3%'}]}
      />
      <section className="section-pad" style={{background:'#fff'}}>
        <div className="content-wrap">
          <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'1.5rem'}}>[ Application Form ]</div>
          <ContractorApplyForm />
        </div>
      </section>
      <div style={{background:'var(--bg2)',borderTop:'1px solid var(--bdr)',padding:'2rem 3rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1rem'}}>
        <p style={{...f,fontSize:'0.88rem',color:'var(--muted)'}}>Want to understand our process first?</p>
        <Link href="/contractors/vetting" style={{...c,fontSize:'0.85rem',fontWeight:700,color:'var(--amber)',textDecoration:'none',letterSpacing:'0.08em',textTransform:'uppercase'}}>See All 47 Vetting Checkpoints →</Link>
      </div>
      <Footer />
    </>
  )
}
