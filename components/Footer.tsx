import Link from 'next/link'
import { SITE } from '@/lib/config'

const footerLinks = {
  Neighborhoods: [
    {label:'Pearl District',    href:'/portland/pearl-district'},
    {label:'Lake Oswego',       href:'/portland/lake-oswego'},
    {label:'Irvington',         href:'/portland/irvington'},
    {label:'West Hills',        href:'/portland/west-hills'},
    {label:'St. Johns',         href:'/portland/st-johns'},
    {label:'All 50 Areas →',   href:'/#neighborhoods'},
  ],
  Resources: [
    {label:'PDX Cost Index',       href:'/pdx-cost-index'},
    {label:'Metal vs. Asphalt',    href:'/guides/metal-vs-asphalt'},
    {label:'Storm Damage Guide',   href:'/guides/storm-damage'},
    {label:"Ladd's Addition Rules",href:'/portland/ladds-addition'},
    {label:'Permits & Regs',       href:'/guides/permits'},
  ],
  'For Contractors': [
    {label:'Join the Network', href:'/contractors/apply'},
    {label:'Vetting Process',  href:'/contractors/vetting'},
    {label:'Lead Packages',    href:'/contractors/leads'},
    {label:'Advertise',        href:'/contractors/advertise'},
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{background:'var(--bg2)',padding:'3rem',borderTop:'1px solid var(--bdr)'}}>
      <div className="grid-footer-top">
        <div>
          <Link href="/" style={{fontFamily:'var(--font-bebas)',fontSize:'1.8rem',letterSpacing:'0.04em',color:'var(--text)',textDecoration:'none',display:'block',marginBottom:'0.8rem'}}>
            PORTLAND <span style={{color:'var(--amber)'}}>ROOFINGS</span>
          </Link>
          <p style={{fontFamily:'var(--font-barlow)',fontSize:'0.85rem',color:'var(--muted)',lineHeight:1.7,fontWeight:300,maxWidth:'300px'}}>
            The Portland metro's definitive roofing platform. Connecting homeowners with vetted contractors since 2026. Not a contractor — a marketplace.
          </p>
          <a href={`tel:${SITE.phone.replace(/\D/g,'')}`} style={{display:'block',marginTop:'1.2rem',fontFamily:'var(--font-space-mono)',fontSize:'0.8rem',color:'var(--amber)',textDecoration:'none'}}>{SITE.phone}</a>
        </div>
        {Object.entries(footerLinks).map(([heading,links])=>(
          <div key={heading}>
            <h4 style={{fontFamily:'var(--font-space-mono)',fontSize:'0.65rem',color:'var(--amber)',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:'1rem'}}>{heading}</h4>
            <ul style={{listStyle:'none'}}>
              {links.map(({label,href})=>(
                <li key={href} style={{marginBottom:'0.6rem'}}>
                  <Link href={href} style={{fontFamily:'var(--font-barlow)',fontSize:'0.85rem',color:'var(--muted)',textDecoration:'none'}}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{paddingTop:'2rem',borderTop:'1px solid var(--bdr)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'0.5rem'}}>
        <p style={{fontFamily:'var(--font-space-mono)',fontSize:'0.68rem',color:'var(--muted)'}}>© {year} {SITE.name} · {SITE.domain} · All rights reserved.</p>
        <p style={{fontFamily:'var(--font-space-mono)',fontSize:'0.68rem',color:'var(--muted)'}}>Not a licensed contractor. Lead generation &amp; referral platform.</p>
      </div>
    </footer>
  )
}
