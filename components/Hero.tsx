import Image    from 'next/image'
import type { ReactNode } from 'react'

const stats = [
  { num: '50+',   label: 'Neighborhoods Covered' },
  { num: '$9.4K', label: 'Avg. Project Value' },
  { num: '48h',   label: 'Quote Response Time' },
]

interface Props { children?: ReactNode }

export default function Hero({ children }: Props) {
  return (
    /* hero-wrap class has min-height: 88vh + position: relative in globals.css
       — both required for <Image fill> to render */
    <div className="hero-wrap" style={{ minHeight: '88vh' }}>

      <Image
        src="/images/hero-homepage.webp"
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
            PDX Roofing Authority
          </div>

          <div style={{ width:48, height:3, background:'#F5A623', marginBottom:'1.5rem' }} />

          <h1 style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(3.5rem,6vw,7rem)',
            lineHeight: 0.87, color: '#fff',
            letterSpacing: '0.02em', marginBottom: '1.5rem',
          }}>
            THE ONLY<br />
            ROOFING<br />
            PLATFORM<br />
            <span style={{ color:'#F5A623' }}>PDX TRUSTS.</span>
          </h1>

          <p style={{
            fontFamily: 'var(--font-barlow)',
            fontSize: 'clamp(1rem,2vw,1.1rem)',
            color: 'rgba(255,255,255,0.68)',
            maxWidth: '440px', lineHeight: 1.75,
            fontWeight: 300, marginBottom: '2.5rem',
          }}>
            We vet, rank, and connect Portland homeowners with the top 1% of roofing
            contractors — with real pricing data across 50+ neighborhoods.
          </p>

          <div style={{
            display: 'flex', gap: '2.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.15)',
          }}>
            {stats.map(({ num, label }) => (
              <div key={label}>
                <div style={{ fontFamily:'var(--font-bebas)', fontSize:'clamp(2rem,3.5vw,2.5rem)', color:'#F5A623', lineHeight:1 }}>{num}</div>
                <div style={{ fontFamily:'var(--font-barlow-cond)', fontSize:'0.68rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.42)', marginTop:'0.25rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}
