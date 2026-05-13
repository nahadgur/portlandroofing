'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem', textAlign: 'center', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 540 }}>
        <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '1rem' }}>
          [ Something went wrong ]
        </p>
        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--text)', marginBottom: '1rem', lineHeight: 0.95 }}>
          WE HIT AN UNEXPECTED ERROR
        </h1>
        <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.95rem', color: 'var(--muted)', marginBottom: '2rem', lineHeight: 1.65 }}>
          The page didn&apos;t load properly. Try again, or head back to find what you need.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => reset()}
            style={{ background: 'var(--amber-btn)', color: '#000', border: 'none', padding: '0.85rem 1.6rem', fontFamily: 'var(--font-barlow-cond)', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Try again
          </button>
          <Link
            href="/"
            style={{ background: 'transparent', color: 'var(--amber)', border: '2px solid var(--amber)', padding: '0.85rem 1.6rem', fontFamily: 'var(--font-barlow-cond)', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
