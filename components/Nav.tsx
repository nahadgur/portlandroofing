'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Cost Index',    href: '/pdx-cost-index' },
  { label: 'Storm Tracker', href: '/storm-tracker/pdx-active-warnings' },
  { label: 'Neighborhoods', href: '/#neighborhoods' },
  { label: 'Services',      href: '/services' },
  { label: 'Guides',        href: '/guides' },
  { label: 'Blog',          href: '/blog' },
  { label: 'Contact',       href: '/contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const linkStyle = {
    fontFamily: 'var(--font-barlow-cond)',
    fontSize: '0.78rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.55)',
    textDecoration: 'none',
    whiteSpace: 'nowrap' as const,
  }

  return (
    <>
      {/* ── NAV BAR ── */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.5rem', height: '60px',
        background: '#0A0B0D',
        position: 'sticky', top: 0, zIndex: 200,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* Logo */}
        <Link href="/" onClick={() => setOpen(false)} style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(1.1rem, 4vw, 1.55rem)',
          letterSpacing: '0.06em',
          color: '#fff', textDecoration: 'none',
          whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          PORTLAND <span style={{ color: '#F5A623' }}>ROOFINGS</span>
        </Link>

        {/* Desktop links */}
        <ul className="nav-links-desktop" style={{ listStyle: 'none', display: 'flex', gap: '2rem', flexShrink: 0 }}>
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} style={linkStyle}>{label}</Link>
            </li>
          ))}
        </ul>

        {/* Right side: CTA + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          <Link href="/#lead-form" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('openModal')) }} style={{
            background: '#F5A623', color: '#000',
            fontFamily: 'var(--font-barlow-cond)', fontWeight: 700,
            fontSize: 'clamp(0.68rem, 2vw, 0.8rem)',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '0.5rem 1rem', textDecoration: 'none', whiteSpace: 'nowrap',
          }}>
            Get Quotes →
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
            className="hamburger-btn"
            style={{
              background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', cursor: 'pointer',
              width: 40, height: 40,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '5px',
              padding: 0, flexShrink: 0,
            }}
          >
            <span style={{ display: 'block', width: 18, height: 2, background: open ? '#F5A623' : '#fff', transition: 'all 0.2s', transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ display: 'block', width: 18, height: 2, background: '#fff', opacity: open ? 0 : 1, transition: 'opacity 0.2s' }} />
            <span style={{ display: 'block', width: 18, height: 2, background: open ? '#F5A623' : '#fff', transition: 'all 0.2s', transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 190,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* Drawer panel */}
      <div style={{
        position: 'fixed', top: '60px', right: 0, bottom: 0,
        width: 'min(300px, 80vw)',
        background: '#0A0B0D',
        borderLeft: '1px solid rgba(255,255,255,0.08)',
        zIndex: 195,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column',
        overflowY: 'auto',
      }}>
        {/* Nav links */}
        <div style={{ padding: '1rem 0' }}>
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                padding: '1rem 1.5rem',
                fontFamily: 'var(--font-barlow-cond)',
                fontSize: '1rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA inside drawer */}
        <div style={{ padding: '1.5rem' }}>
          <Link
            href="/#lead-form"
            onClick={(e) => { e.preventDefault(); setOpen(false); window.dispatchEvent(new CustomEvent('openModal')) }}
            style={{
              display: 'block', textAlign: 'center',
              background: '#F5A623', color: '#000',
              fontFamily: 'var(--font-barlow-cond)', fontWeight: 700,
              fontSize: '1rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', padding: '1rem',
              textDecoration: 'none',
            }}
          >
            Get Free Quotes →
          </Link>
        </div>

        {/* Footer note */}
        <div style={{ padding: '1rem 1.5rem', marginTop: 'auto' }}>
          <p style={{
            fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem',
            color: 'rgba(255,255,255,0.25)', lineHeight: 1.6,
          }}>
            Not a contractor. Lead referral platform serving 50+ Portland neighborhoods.
          </p>
        </div>
      </div>
    </>
  )
}
