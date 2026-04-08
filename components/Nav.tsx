import Link from 'next/link'

const links = [
  { label: 'Cost Index',    href: '/pdx-cost-index' },
  { label: 'Neighborhoods', href: '/#neighborhoods' },
  { label: 'Contractors',   href: '/#contractors' },
  { label: 'Guides',        href: '/#guides' },
]

export default function Nav() {
  return (
    <nav style={{
      display:'flex',alignItems:'center',justifyContent:'space-between',
      padding:'0 2rem',height:'56px',
      borderBottom:'1px solid var(--bdr)',
      background:'rgba(10,11,13,0.97)',
      backdropFilter:'blur(8px)',
      position:'sticky',top:0,zIndex:100,
    }}>
      <Link href="/" style={{
        fontFamily:'var(--font-bebas)',fontSize:'1.6rem',
        letterSpacing:'0.04em',color:'var(--text)',textDecoration:'none',
      }}>
        PORTLAND <span style={{color:'var(--amber)'}}>ROOFINGS</span>
      </Link>
      <ul className="nav-links-desktop">
        {links.map(({label,href})=>(
          <li key={href}>
            <Link href={href} style={{
              fontFamily:'var(--font-barlow-cond)',fontSize:'0.85rem',
              letterSpacing:'0.12em',textTransform:'uppercase',
              color:'var(--muted)',textDecoration:'none',
            }}>{label}</Link>
          </li>
        ))}
      </ul>
      <Link href="/#quote" style={{
        background:'var(--amber)',color:'#000',
        fontFamily:'var(--font-barlow-cond)',fontWeight:700,
        fontSize:'0.8rem',letterSpacing:'0.1em',textTransform:'uppercase',
        padding:'0.45rem 1.2rem',textDecoration:'none',
      }}>
        Get Quotes →
      </Link>
    </nav>
  )
}
