'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { Zap, X } from 'lucide-react'
import LeadForm     from '@/components/LeadForm'
import { neighborhoods } from '@/lib/neighborhoods'
import { services }      from '@/lib/services'

/* ─── Contextual label based on current page ─────────────────────────── */
function getCtaLabel(pathname: string): string {
  if (pathname === '/pdx-cost-index')
    return 'Calculate My Exact Cost'

  const nbhdMatch = pathname.match(/^\/portland\/([^/]+)$/)
  if (nbhdMatch) {
    const n = neighborhoods.find(n => n.slug === nbhdMatch[1])
    return n ? `Find ${n.name} Roofers` : 'Get Free Quotes'
  }

  // service×location: /roof-replacement/pearl-district
  const parts = pathname.split('/').filter(Boolean)
  if (parts.length === 2) {
    const s = services.find(s => s.slug === parts[0])
    const n = neighborhoods.find(n => n.slug === parts[1])
    if (s && n) return `Get ${s.shortName} Quotes`
  }

  if (pathname.startsWith('/guides/'))  return 'Get Free Quotes'
  if (pathname.startsWith('/blog/'))    return 'Get Free Quotes'
  if (pathname === '/')                 return '' // hidden on homepage — form is in hero

  return 'Get Free Portland Quotes'
}

export default function StickyModal() {
  const pathname            = usePathname()
  const [visible, setVisible] = useState(false)
  const [open,    setOpen]    = useState(false)
  const ctaLabel              = getCtaLabel(pathname)

  /* Show after 25% scroll */
  const onScroll = useCallback(() => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
    setVisible(pct > 0.25)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  /* Close on Escape */
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  /* Lock body scroll when modal open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  /* Don't render on homepage or if no label */
  if (!ctaLabel) return null

  return (
    <>
      {/* ── STICKY TRIGGER ─────────────────────────────────────────── */}
      <div style={{
        position: 'fixed',
        // Mobile: full-width bar at bottom
        // Desktop: floating button bottom-right
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 150,
        pointerEvents: visible ? 'auto' : 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'opacity 0.3s, transform 0.3s',
      }}>
        {/* Mobile bar */}
        <button
          onClick={() => setOpen(true)}
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
          }}
        >
          <Zap size={16} strokeWidth={2.5} />
          {ctaLabel}
        </button>
      </div>

      {/* Desktop floating button — positioned bottom-right */}
      <button
        onClick={() => setOpen(true)}
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
          boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
          pointerEvents: visible ? 'auto' : 'none',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
          transition: 'opacity 0.3s, transform 0.3s',
        }}
      >
        <Zap size={15} strokeWidth={2.5} />
        {ctaLabel}
      </button>

      {/* ── MODAL ──────────────────────────────────────────────────── */}
      {open && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 500,
            background: 'rgba(0,0,0,0.82)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div style={{
            background: 'var(--bg2)',
            border: '1px solid var(--bdr)',
            width: '100%',
            maxWidth: '520px',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
          }}>
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--muted)',
                cursor: 'pointer',
                padding: '0.3rem',
                zIndex: 10,
              }}
            >
              <X size={20} />
            </button>

            {/* Context label */}
            <div style={{
              padding: '1.2rem 2rem 0',
              fontFamily: 'var(--font-space-mono)',
              fontSize: '0.65rem',
              color: 'var(--amber)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              ▸ {ctaLabel}
            </div>

            {/* Lead form */}
            <LeadForm />
          </div>
        </div>
      )}
    </>
  )
}
