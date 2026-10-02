import Image    from 'next/image'
import type { ReactNode } from 'react'

interface Props { children?: ReactNode }

export default function Hero({ children }: Props) {
  return (
    /* hero-wrap class has min-height: 88vh + position: relative in globals.css
      , both required for <Image fill> to render */
    <div className="hero-wrap" style={{ minHeight: '88vh' }}>

      <Image
        src="/images/hero-homepage.jpeg"
        alt="Portland craftsman home at golden hour"
        fill
        priority
        quality={90}
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(105deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.76) 35%, rgba(0,0,0,0.48) 62%, rgba(0,0,0,0.18) 100%)',
      }} />

      {/* Content */}
      <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>

        <div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.8rem',
            fontFamily: 'var(--font-space-mono)',
            fontSize: '0.72rem', color: '#F5A623',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            marginBottom: '1.2rem', whiteSpace: 'nowrap',
          }}>
            <span style={{ display:'block', width:32, height:1, background:'#F5A623', flexShrink:0 }} />
            Portland roofing planning
          </div>


          <h1 style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(3.5rem,6vw,7rem)',
            lineHeight: 0.87, color: '#fff',
            letterSpacing: '0.02em', marginBottom: '1.5rem',
          }}>
            PLAN YOUR<br />
            ROOFING<br />
            <span style={{ color:'#F5A623' }}>PROJECT.</span>
          </h1>

          <p style={{
            fontFamily: 'var(--font-barlow)',
            fontSize: 'clamp(1rem,2vw,1.1rem)',
            color: 'rgba(255,255,255,0.68)',
            maxWidth: '440px', lineHeight: 1.75,
            fontWeight: 300, marginBottom: '2.5rem',
          }}>
            Compare roof repairs, replacement options, and contractor questions for your Portland-area home. Roofing information and referrals, with project decisions in your hands.
          </p>


        </div>

        {children}
      </div>
    </div>
  )
}
