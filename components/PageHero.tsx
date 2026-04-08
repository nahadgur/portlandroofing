import Link from 'next/link'
import type { ReactNode } from 'react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface PageHeroStat {
  label: string
  value: string
}

interface PageHeroProps {
  /* Content */
  eyebrow?:    string
  title:       ReactNode          // supports JSX with amber spans
  subtitle?:   string
  stats?:      PageHeroStat[]
  breadcrumb?: BreadcrumbItem[]
  /* Layout */
  right?:      ReactNode          // if provided → split layout (form card, etc.)
  tall?:       boolean            // taller hero for pages with a right panel
  /* Style */
  imageUrl?:   string             // override default photo
}

const DEFAULT_IMG = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80'

export default function PageHero({
  eyebrow, title, subtitle, stats, breadcrumb,
  right, tall = false, imageUrl,
}: PageHeroProps) {

  const minH = tall ? 'clamp(520px, 72vh, 720px)' : 'clamp(340px, 46vh, 500px)'

  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--bdr)' }}>

      {/* Photo background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('${imageUrl ?? DEFAULT_IMG}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
      }} />

      {/* Gradient overlay — heavier on left, eases right */}
      <div style={{
        position: 'absolute', inset: 0,
        background: right
          ? 'linear-gradient(105deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.45) 65%, rgba(0,0,0,0.18) 100%)'
          : 'linear-gradient(135deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.62) 60%, rgba(0,0,0,0.45) 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'grid',
        gridTemplateColumns: right ? '1fr 460px' : '1fr',
        minHeight: minH,
        padding: 'clamp(2.5rem,5vw,4.5rem) clamp(1.5rem,4vw,3rem)',
        gap: '3rem',
        alignItems: 'center',
      }}>

        {/* Left — text */}
        <div>
          {/* Breadcrumb */}
          {breadcrumb && breadcrumb.length > 0 && (
            <div style={{
              display: 'flex', gap: '0.5rem', alignItems: 'center',
              fontFamily: 'var(--font-space-mono)',
              fontSize: '0.62rem', letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.45)',
              marginBottom: '1.5rem', flexWrap: 'wrap',
            }}>
              {breadcrumb.map((crumb, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {i > 0 && <span>›</span>}
                  {crumb.href
                    ? <Link href={crumb.href} style={{ color: i === breadcrumb.length - 1 ? 'rgba(255,255,255,0.85)' : '#F5A623', textDecoration: 'none' }}>{crumb.label}</Link>
                    : <span style={{ color: 'rgba(255,255,255,0.85)' }}>{crumb.label}</span>
                  }
                </span>
              ))}
            </div>
          )}

          {/* Eyebrow */}
          {eyebrow && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.8rem',
              fontFamily: 'var(--font-space-mono)',
              fontSize: '0.68rem', color: '#F5A623',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              <span style={{ display: 'block', width: 28, height: 1, background: '#F5A623', flexShrink: 0 }} />
              {eyebrow}
            </div>
          )}

          {/* Amber accent bar */}
          <div style={{ width: 40, height: 3, background: '#F5A623', marginBottom: '1.2rem' }} />

          {/* Title */}
          <h1 style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: right ? 'clamp(2.5rem,5vw,5rem)' : 'clamp(2.8rem,6vw,5.5rem)',
            lineHeight: 0.9,
            color: '#fff',
            letterSpacing: '0.02em',
            marginBottom: subtitle ? '1.2rem' : stats ? '2rem' : 0,
          }}>
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p style={{
              fontFamily: 'var(--font-barlow)',
              fontSize: 'clamp(0.95rem,2vw,1.05rem)',
              color: 'rgba(255,255,255,0.65)',
              maxWidth: '520px',
              lineHeight: 1.75,
              fontWeight: 300,
              marginBottom: stats ? '2rem' : 0,
            }}>
              {subtitle}
            </p>
          )}

          {/* Stats row */}
          {stats && stats.length > 0 && (
            <div style={{
              display: 'flex', gap: '2.5rem', flexWrap: 'wrap',
              paddingTop: '1.8rem',
              borderTop: '1px solid rgba(255,255,255,0.15)',
            }}>
              {stats.map(({ label, value }) => (
                <div key={label}>
                  <div style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: 'clamp(1.6rem,3vw,2.2rem)',
                    color: '#F5A623', lineHeight: 1,
                  }}>
                    {value}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-barlow-cond)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',
                    marginTop: '0.2rem',
                  }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right — optional floating card (form, etc.) */}
        {right && (
          <div className="form-float">
            {right}
          </div>
        )}
      </div>
    </div>
  )
}
