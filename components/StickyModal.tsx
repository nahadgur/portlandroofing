'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Zap } from 'lucide-react'
import { neighborhoods } from '@/lib/neighborhoods'
import { services }      from '@/lib/services'

function getCtaLabel(pathname: string): string {
  if (pathname === '/pdx-cost-index')
    return 'Calculate My Exact Cost'

  const nbhdMatch = pathname.match(/^\/portland\/([^/]+)$/)
  if (nbhdMatch) {
    const n = neighborhoods.find(n => n.slug === nbhdMatch[1])
    return n ? `Find ${n.name} Roofers` : 'Get Free Quotes'
  }

  const parts = pathname.split('/').filter(Boolean)
  if (parts.length === 2) {
    const s = services.find(s => s.slug === parts[0])
    const n = neighborhoods.find(n => n.slug === parts[1])
    if (s && n) return `Get ${s.shortName} Quotes`
  }

  if (pathname.startsWith('/guides/'))  return 'Get Free Quotes'
  if (pathname.startsWith('/blog/'))    return 'Get Free Quotes'
  if (pathname === '/')                 return ''
  if (pathname === '/contact')          return ''

  return 'Get Free Portland Quotes'
}

export default function StickyModal() {
  const pathname              = usePathname()
  const [visible, setVisible] = useState(false)
  const ctaLabel              = getCtaLabel(pathname)

  const onScroll = useCallback(() => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
    setVisible(pct > 0.25)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  if (!ctaLabel) return null

  return (
    <>
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 150,
        pointerEvents: visible ? 'auto' : 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'opacity 0.3s, transform 0.3s',
      }}>
        <Link
          href="/contact"
          className="mobile-sticky-cta"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            width: '100%',
            padding: '1.1rem 2rem',
            background: 'var(--amber)',
            color: '#000',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-barlow-cond)',
            fontWeight: 700,
            fontSize: '1rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          <Zap size={16} strokeWidth={2.5} />
          {ctaLabel}
        </Link>
      </div>

      <Link
        href="/contact"
        className="desktop-sticky-cta"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 150,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.85rem 1.6rem',
          background: 'var(--amber)',
          color: '#000',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-barlow-cond)',
          fontWeight: 700,
          fontSize: '0.88rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
          pointerEvents: visible ? 'auto' : 'none',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
          transition: 'opacity 0.3s, transform 0.3s',
        }}
      >
        <Zap size={15} strokeWidth={2.5} />
        {ctaLabel}
      </Link>
    </>
  )
}
