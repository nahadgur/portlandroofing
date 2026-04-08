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
          position: 'relative',
        }}
      >
        {/* Amber left accent bar */}
        <div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: '8px',
          background: '#F5A623',
          display: 'flex',
        }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 28, fontWeight: 900, color: '#E8E6E0', letterSpacing: 2 }}>
            PORTLAND
          </span>
          <span style={{ fontSize: 28, fontWeight: 900, color: '#F5A623', letterSpacing: 2 }}>
            ROOFINGS
          </span>
        </div>

        {/* Main text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 76, fontWeight: 900, color: '#E8E6E0', lineHeight: 1, letterSpacing: 1 }}>
            THE ONLY ROOFING
          </div>
          <div style={{ fontSize: 76, fontWeight: 900, color: '#F5A623', lineHeight: 1, letterSpacing: 1 }}>
            PLATFORM PDX TRUSTS.
          </div>
          <div style={{ fontSize: 26, color: '#7A7F8E', fontWeight: 400, marginTop: 12, lineHeight: 1.4 }}>
            Vetted contractors · Real local pricing · 50+ Portland neighborhoods
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #242830',
          paddingTop: 28,
        }}>
          <span style={{ fontSize: 20, color: '#7A7F8E' }}>{SITE.domain}</span>
          <div style={{
            background: '#F5A623',
            color: '#000',
            fontSize: 18,
            fontWeight: 700,
            padding: '10px 28px',
            letterSpacing: 1,
          }}>
            GET FREE QUOTES →
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
