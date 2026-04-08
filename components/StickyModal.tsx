'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { Zap, X } from 'lucide-react'
import LeadForm from '@/components/LeadForm'
import { neighborhoods } from '@/lib/neighborhoods'
import { services }      from '@/lib/services'

function getCtaLabel(pathname: string, isMobile: boolean): string {
  // Homepage: hide on desktop (form is in hero), show on mobile (form is below fold)
  if (pathname === '/') return isMobile ? 'Get Free Portland Quotes' : ''

  if (pathname === '/pdx-cost-index') return 'Calculate My Exact Cost'

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

  return 'Get Free Portland Quotes'
}

export default function StickyModal() {
  const pathname              = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [visible,  setVisible]  = useState(false)
  const [open,     setOpen]     = useState(false)

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const ctaLabel = getCtaLabel(pathname, isMobile)

  // Show after 25% scroll
  const onScroll = useCallback(() => {
    const pct = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    setVisible(pct > 0.25)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  // Escape closes modal
  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open])

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!ctaLabel) return null

  return (
    <>
      {/* ── MOBILE STICKY BAR ── */}
      <button
        onClick={() => setOpen(true)}
        className="mobile-sticky-cta"
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          zIndex: 150,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
          padding: '1.1rem 2rem',
          background: '#F5A623', color: '#000', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-barlow-cond)', fontWeight: 700,
          fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'opacity 0.3s, transform 0.3s',
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        <Zap size={16} strokeWidth={2.5} />
        {ctaLabel}
      </button>

      {/* ── DESKTOP FLOATING BUTTON ── */}
      <button
        onClick={() => setOpen(true)}
        className="desktop-sticky-cta"
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem',
          zIndex: 150,
          display: 'flex', alignItems: 'center', gap: '0.6rem',
          padding: '0.85rem 1.6rem',
          background: '#F5A623', color: '#000', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-barlow-cond)', fontWeight: 700,
          fontSize: '0.88rem', letterSpacing: '0.1em', textTransform: 'uppercase',
          boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
          transition: 'opacity 0.3s, transform 0.3s',
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        <Zap size={15} strokeWidth={2.5} />
        {ctaLabel}
      </button>

      {/* ── MODAL ── */}
      {open && (
        <div
          onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
          style={{
            position: 'fixed', inset: 0, zIndex: 500,
            background: 'rgba(0,0,0,0.75)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem', backdropFilter: 'blur(4px)',
          }}
        >
          <div style={{
            background: '#fff',
            width: '100%', maxWidth: '500px',
            maxHeight: '92vh', overflowY: 'auto',
            position: 'relative',
          }}>
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                position: 'absolute', top: '0.8rem', right: '0.8rem',
                background: 'transparent', border: 'none',
                color: 'var(--muted)', cursor: 'pointer', padding: '0.3rem', zIndex: 10,
              }}
            >
              <X size={20} />
            </button>

            {/* Context label */}
            <div style={{
              padding: '1.2rem 2rem 0',
              fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem',
              color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase',
            }}>
              ▸ {ctaLabel}
            </div>

            <LeadForm />
          </div>
        </div>
      )}
    </>
  )
}
