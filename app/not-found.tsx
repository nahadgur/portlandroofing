import Link from 'next/link'
import Nav  from '@/components/Nav'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Nav />
      <div style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        background: 'var(--bg)',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: '0.72rem',
          color: 'var(--amber)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          [ Error 404 ]
        </div>
        <h1 style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(4rem, 10vw, 8rem)',
          color: 'var(--text)',
          lineHeight: 0.9,
          marginBottom: '1.5rem',
        }}>
          PAGE<br /><span style={{ color: 'var(--amber)' }}>NOT FOUND</span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-barlow)',
          fontSize: '1rem',
          color: 'var(--muted)',
          maxWidth: '400px',
          lineHeight: 1.7,
          fontWeight: 300,
          marginBottom: '2.5rem',
        }}>
          This neighborhood might not be in our coverage area yet — or the URL is wrong.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/" style={{
            background: 'var(--amber)',
            color: '#000',
            fontFamily: 'var(--font-barlow-cond)',
            fontWeight: 700,
            fontSize: '0.9rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '0.8rem 1.8rem',
            textDecoration: 'none',
          }}>
            Back to Home
          </Link>
          <Link href="/#neighborhoods" style={{
            background: 'transparent',
            color: 'var(--amber)',
            border: '1px solid var(--amber)',
            fontFamily: 'var(--font-barlow-cond)',
            fontWeight: 700,
            fontSize: '0.9rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '0.8rem 1.8rem',
            textDecoration: 'none',
          }}>
            All 50 Neighborhoods
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}
