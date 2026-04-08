import Link from 'next/link'
import { SITE } from '@/lib/config'

const cols = {
  Neighborhoods: [
    { label: 'Pearl District',    href: '/portland/pearl-district' },
    { label: 'Lake Oswego',       href: '/portland/lake-oswego' },
    { label: 'Irvington',         href: '/portland/irvington' },
    { label: 'West Hills',        href: '/portland/west-hills' },
    { label: 'All 50 Areas →',    href: '/#neighborhoods' },
  ],
  Resources: [
    { label: 'PDX Cost Index',          href: '/pdx-cost-index' },
    { label: 'Metal vs. Asphalt',       href: '/guides/metal-vs-asphalt-portland' },
    { label: 'Storm Damage Guide',      href: '/guides/storm-damage-roofing-portland' },
    { label: 'Permits Guide',           href: '/guides/portland-roofing-permits-guide' },
    { label: 'All Guides →',            href: '/guides' },
  ],
  'For Contractors': [
    { label: 'Join the Network', href: '/contractors/apply' },
    { label: 'Vetting Process',  href: '/contractors/vetting' },
    { label: 'Contact Us',       href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ background: '#0A0B0D', padding: '3.5rem 3rem 2.5rem' }}>
      <div className="grid-footer-top">

        {/* Brand */}
        <div>
          <Link href="/" style={{
            fontFamily: 'var(--font-bebas)', fontSize: '1.7rem',
            letterSpacing: '0.04em', color: '#fff',
            textDecoration: 'none', display: 'block', marginBottom: '0.8rem',
          }}>
            PORTLAND <span style={{ color: '#F5A623' }}>ROOFINGS</span>
          </Link>
          <p style={{
            fontFamily: 'var(--font-barlow)', fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.4)', lineHeight: 1.7,
            fontWeight: 300, maxWidth: '300px',
          }}>
            The Portland metro's definitive roofing platform. Connecting homeowners with vetted contractors. Not a contractor — a marketplace.
          </p>
          <a href={`tel:${SITE.phone.replace(/\D/g, '')}`} style={{
            display: 'block', marginTop: '1.2rem',
            fontFamily: 'var(--font-space-mono)', fontSize: '0.8rem',
            color: '#F5A623', textDecoration: 'none',
          }}>
            {SITE.phone}
          </a>
        </div>

        {/* Link columns */}
        {Object.entries(cols).map(([heading, links]) => (
          <div key={heading}>
            <h4 style={{
              fontFamily: 'var(--font-space-mono)', fontSize: '0.6rem',
              color: '#F5A623', letterSpacing: '0.14em',
              textTransform: 'uppercase', marginBottom: '1rem',
            }}>
              {heading}
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {links.map(({ label, href }) => (
                <li key={href} style={{ marginBottom: '0.55rem' }}>
                  <Link href={href} style={{
                    fontFamily: 'var(--font-barlow)', fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
                  }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '0.5rem',
      }}>
        <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', color: 'rgba(255,255,255,0.25)' }}>
          © {new Date().getFullYear()} {SITE.name} · {SITE.domain} · All rights reserved.
        </p>
        <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', color: 'rgba(255,255,255,0.25)' }}>
          Not a licensed contractor. Lead generation &amp; referral platform.
        </p>
      </div>
    </footer>
  )
}
