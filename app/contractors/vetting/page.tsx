import type { Metadata } from 'next'
import Link   from 'next/link'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { SITE } from '@/lib/config'

export const metadata: Metadata = {
  title:`Our 47-Point Contractor Vetting Process | ${SITE.name}`,
  description:'Every contractor listed on Portland Roofings passes 47 verification checkpoints covering CCB licensing, insurance, review authenticity, project history, and response time.',
  alternates:{canonical:`${SITE.baseUrl}/contractors/vetting`},
}

const checkpoints = [
  {category:'Licensing & Legal',color:'var(--amber)',items:[
    {n:'01',label:'Active Oregon CCB licence confirmed',detail:"Verified directly at oregon.gov/ccb. Expired, suspended, or revoked licences result in automatic disqualification."},
    {n:'02',label:'CCB licence class matches work scope',detail:'Oregon CCB has multiple licence classes. We confirm the contractor holds the correct class for residential roofing.'},
    {n:'03',label:'No active CCB complaints',detail:"We review the contractor's CCB complaint history. Active or unresolved complaints trigger additional review."},
    {n:'04',label:'Business entity registration confirmed',detail:'Oregon Secretary of State business registry checked to confirm active status.'},
    {n:'05',label:'No active judgements or liens',detail:'Public records check for roofing-related contractor liens or court judgements in Oregon.'},
  ]},
  {category:'Insurance',color:'var(--green)',items:[
    {n:'06',label:'General liability minimum $1M',detail:'Certificate of insurance reviewed. We do not accept attestation — we require the actual COI.'},
    {n:'07',label:"Workers' compensation confirmed",detail:'Active policy or certified exempt status. No uncovered crews.'},
    {n:'08',label:'Insurance not expired at time of listing',detail:'COI expiry date checked. Contractors with policies expiring within 90 days flagged for renewal confirmation.'},
    {n:'09',label:'Insurer is AM Best rated',detail:'We check that the insuring carrier holds a minimum AM Best financial strength rating.'},
    {n:'10',label:'Umbrella or excess coverage noted',detail:'Higher-value projects in premium zones require contractors with umbrella policies.'},
  ]},
  {category:'Review Authenticity',color:'var(--amber)',items:[
    {n:'11',label:'Google review velocity analysis',detail:'Review clusters (sudden spikes of 5-star reviews) are a fraud signal. We analyse review velocity over 24 months.'},
    {n:'12',label:'Reviewer profile authenticity check',detail:'We scan for single-review accounts, accounts reviewing multiple businesses in a single day, and other bot signals.'},
    {n:'13',label:'BBB status confirmed',detail:'BBB accreditation status and complaint history reviewed.'},
    {n:'14',label:'Response to negative reviews assessed',detail:'How a contractor handles negative reviews reveals as much as the reviews themselves.'},
    {n:'15',label:'Yelp and Angi cross-referenced',detail:'Review pattern consistency checked across platforms.'},
  ]},
]

export default function VettingPage() {
  const f={fontFamily:'var(--font-barlow)'}as const
  const m={fontFamily:'var(--font-space-mono)'}as const
  const c={fontFamily:'var(--font-barlow-cond)'}as const
  const d={fontFamily:'var(--font-bebas)'}as const
  return (
    <>
      <Nav />
      <PageHero
        imageUrl="/images/hero-vetting.jpeg"
        breadcrumb={[{label:'Home',href:'/'},{label:'For Contractors',href:'/contractors/apply'},{label:'Our Vetting Process'}]}
        eyebrow="Our Standard"
        title={<>THE 47-POINT<br/><span style={{color:'#F5A623'}}>VETTING PROCESS</span></>}
        subtitle="Every contractor listed on Portland Roofings passes 47 verification checkpoints. Here's exactly what we check — and why."
        stats={[{label:'Verification Points',value:'47'},{label:'Check Categories',value:'6'},{label:'Est. Pass Rate',value:'<3%'}]}
      />
      {checkpoints.map((cat,ci)=>(
        <section key={cat.category} className="section-pad" style={{background:ci%2===0?'#fff':'var(--bg2)'}}>
          <div className="content-wrap-wide">
            <div style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'2rem'}}>
              <div style={{height:'3px',width:'40px',background:cat.color,flexShrink:0}}/>
              <h2 style={{...d,fontSize:'clamp(1.4rem,3vw,2rem)',color:'var(--text)',lineHeight:1}}>{cat.category}</h2>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'1px',background:'var(--bdr)'}}>
              {cat.items.map(({n,label,detail})=>(
                <div key={n} style={{background:ci%2===0?'var(--bg2)':'#fff',padding:'1.2rem 1.5rem',display:'flex',gap:'1.5rem'}}>
                  <div style={{...d,fontSize:'1.3rem',color:cat.color,flexShrink:0,lineHeight:1,minWidth:'2rem'}}>{n}</div>
                  <div>
                    <div style={{...c,fontSize:'1rem',fontWeight:700,color:'var(--text)',marginBottom:'0.3rem'}}>{label}</div>
                    <div style={{...f,fontSize:'0.88rem',color:'var(--muted)',lineHeight:1.65,fontWeight:300}}>{detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
      <section className="section-pad" style={{background:'var(--bg2)'}}>
        <div style={{...m,fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ Ready? ]</div>
        <h2 style={{...d,fontSize:'clamp(2rem,4vw,3rem)',color:'var(--text)',lineHeight:0.95,marginBottom:'1rem'}}>THINK YOU CAN PASS?</h2>
        <p style={{...f,fontSize:'1rem',color:'var(--muted)',maxWidth:'480px',lineHeight:1.7,fontWeight:300,marginBottom:'2rem'}}>If your operation is solid, our vetting should be straightforward. The contractors who struggle are the ones who've been cutting corners.</p>
        <Link href="/contractors/apply" style={{display:'inline-block',background:'var(--amber-btn)',color:'#000',...c,fontWeight:700,fontSize:'1rem',letterSpacing:'0.1em',textTransform:'uppercase',padding:'0.9rem 2.5rem',textDecoration:'none'}}>Apply to Join the Network →</Link>
      </section>
      <Footer />
    </>
  )
}
