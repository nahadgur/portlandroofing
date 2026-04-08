'use client'

import { useState, useEffect } from 'react'

export default function MobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show after user scrolls 80px — avoids flash on load
    const onScroll = () => setVisible(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="mobile-cta-bar"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.25s' }}
    >
      <a href="/#quote">
        <span>GET FREE ROOFING QUOTES</span>
        <span style={{ fontSize: '1.1rem' }}>→</span>
      </a>
    </div>
  )
}
