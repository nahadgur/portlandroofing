import Link from 'next/link'

const links = [
  { label: 'Cost Index',    href: '/pdx-cost-index' },
  { label: 'Neighborhoods', href: '/#neighborhoods' },
  { label: 'Services',      href: '/services' },
  { label: 'Guides',        href: '/guides' },
  { label: 'Blog',          href: '/blog' },
]

export default function Nav() {
  return (
    <nav style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 1.5rem', height:'56px', borderBottom:'1px solid var(--bdr)', background:'rgba(10,11,13,0.97)', backdropFilter:'blur(8px)', position:'sticky', top:0, zIndex:100, gap:'1rem' }}>
      <Link href="/" style={{ fontFamily:'var(--font-bebas)', fontSize:'clamp(1.1rem,4vw,1.6rem)', letterSpacing:'0.04em', color:'var(--text)', textDecoration:'none', whiteSpace:'nowrap', flexShrink:0 }}>
        PORTLAND <span style={{ color:'var(--amber)' }}>ROOFINGS</span>
      </Link>
      <ul className="nav-links-desktop" style={{ flexShrink:0 }}>
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link href={href} style={{ fontFamily:'var(--font-barlow-cond)', fontSize:'0.82rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--muted)', textDecoration:'none', whiteSpace:'nowrap' }}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/#quote" style={{ background:'var(--amber)', color:'#000', fontFamily:'var(--font-barlow-cond)', fontWeight:700, fontSize:'clamp(0.72rem,2.5vw,0.82rem)', letterSpacing:'0.08em', textTransform:'uppercase', padding:'0.5rem 1rem', textDecoration:'none', whiteSpace:'nowrap', flexShrink:0 }}>
        Get Quotes →
      </Link>
    </nav>
  )
}
