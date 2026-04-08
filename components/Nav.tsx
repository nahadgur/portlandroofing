import Link from 'next/link'

const links = [
  { label: 'Cost Index',    href: '/pdx-cost-index' },
  { label: 'Neighborhoods', href: '/#neighborhoods' },
  { label: 'Services',      href: '/services' },
  { label: 'Guides',        href: '/guides' },
  { label: 'Blog',          href: '/blog' },
  { label: 'Contact',       href: '/contact' },
]

export default function Nav() {
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 2.5rem', height: '60px',
      background: '#0A0B0D',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      {/* Logo */}
      <Link href="/" style={{
        fontFamily: 'var(--font-bebas)',
        fontSize: 'clamp(1.1rem, 3vw, 1.55rem)',
        letterSpacing: '0.06em',
        color: '#fff',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}>
        PORTLAND <span style={{ color: '#F5A623' }}>ROOFINGS</span>
      </Link>

      {/* Links */}
      <ul className="nav-links-desktop" style={{ flexShrink: 0 }}>
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link href={href} style={{
              fontFamily: 'var(--font-barlow-cond)',
              fontSize: '0.78rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'color 0.15s',
            }}>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link href="/#quote" style={{
        background: '#F5A623', color: '#000',
        fontFamily: 'var(--font-barlow-cond)', fontWeight: 700,
        fontSize: 'clamp(0.68rem, 2vw, 0.8rem)',
        letterSpacing: '0.08em', textTransform: 'uppercase',
        padding: '0.5rem 1.1rem',
        textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0,
      }}>
        Get Quotes →
      </Link>
    </nav>
  )
}
