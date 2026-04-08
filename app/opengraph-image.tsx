import { ImageResponse } from 'next/og'
import { SITE }          from '@/lib/config'

export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0B0D',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg,transparent,transparent 49px,#242830 49px,#242830 50px),repeating-linear-gradient(90deg,transparent,transparent 49px,#242830 49px,#242830 50px)',
          backgroundSize: '50px 50px',
          opacity: 0.6,
          display: 'flex',
        }} />

        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(10,11,13,0.7) 0%,rgba(10,11,13,0.9) 100%)', display: 'flex' }} />

        {/* Logo */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 28, fontWeight: 900, color: '#E8E6E0', letterSpacing: 2 }}>
            PORTLAND
          </span>
          <span style={{ fontSize: 28, fontWeight: 900, color: '#F5A623', letterSpacing: 2 }}>
            ROOFINGS
          </span>
        </div>

        {/* Main text */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 80, fontWeight: 900, color: '#E8E6E0', lineHeight: 0.9, letterSpacing: 1 }}>
            THE ONLY ROOFING
          </div>
          <div style={{ fontSize: 80, fontWeight: 900, color: '#F5A623', lineHeight: 0.9, letterSpacing: 1 }}>
            PLATFORM PDX TRUSTS.
          </div>
          <div style={{ fontSize: 26, color: '#7A7F8E', fontWeight: 400, marginTop: 16, maxWidth: 700, lineHeight: 1.4 }}>
            Vetted contractors · Real local pricing · 50+ Portland neighborhoods
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #242830', paddingTop: 32 }}>
          <span style={{ fontSize: 20, color: '#7A7F8E' }}>{SITE.domain}</span>
          <div style={{ background: '#F5A623', color: '#000', fontSize: 18, fontWeight: 700, padding: '10px 28px', letterSpacing: 1 }}>
            GET FREE QUOTES →
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
