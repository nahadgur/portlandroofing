'use client'

import { useEffect, useState, FormEvent } from 'react'
import { SITE } from '@/lib/config'
import {
  buildPartnerRedirect,
  captureAttribution,
  fireGenerateLeadEvent,
} from '@/lib/attribution'

/**
 * 1-step ZIP-only lead form. Submits to the Digipeak partner URL
 * (steps 2-7 of the funnel — material, timeline, ownership, address,
 * contact — run on the partner's white-labelled flow). We keep our own
 * lead copy via fire-and-forget GAS webhook for analytics.
 */
export default function LeadForm({ source }: { source?: string }) {
  const [zip, setZip] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [redirectingTo, setRedirectingTo] = useState<string | null>(null)

  useEffect(() => { captureAttribution() }, [])

  const isValid = /^\d{5}$/.test(zip)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!isValid || submitting) return
    setSubmitting(true)

    const payload = { zip, source: source || 'homepage' }

    let redirectUrl: string
    try {
      redirectUrl = buildPartnerRedirect(payload)
    } catch {
      redirectUrl = `${SITE.partnerOffer.base}?uid=${SITE.partnerOffer.uid}&source_id=${SITE.partnerOffer.sourceId}&sub1=search&sub2=${encodeURIComponent(SITE.partnerOffer.siteId)}&sub3=${encodeURIComponent(source || 'homepage')}&sub5=${encodeURIComponent(zip)}`
    }

    // Fire-and-forget GAS keepalive POST (independent ZIP count)
    if (SITE.gasWebhook) {
      try {
        fetch(SITE.gasWebhook, {
          method: 'POST',
          mode: 'no-cors',
          keepalive: true,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            zip,
            source: source || SITE.domain,
            timestamp: new Date().toISOString(),
            attribution: captureAttribution(),
          }),
        }).catch(() => {})
      } catch {}
    }

    try { fireGenerateLeadEvent(payload) } catch {}

    setRedirectingTo(redirectUrl)

    window.setTimeout(() => { window.location.href = redirectUrl }, 1500)
    try { window.location.assign(redirectUrl) } catch { window.location.href = redirectUrl }
  }

  /* Connecting / redirecting state */
  if (redirectingTo) {
    return (
      <div style={{ background: 'var(--bg2)', borderTop: '3px solid var(--amber-btn)', padding: '3rem 2rem', textAlign: 'center', animation: 'scaleIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both' }}>
        <div
          aria-hidden="true"
          style={{
            width: 44, height: 44,
            borderRadius: '50%',
            border: '3px solid rgba(196,125,10,0.18)',
            borderTopColor: 'var(--amber-btn)',
            margin: '4px auto 20px',
            animation: 'spin 0.9s linear infinite',
          }}
        />
        <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', color: 'var(--text)', marginBottom: '0.5rem', letterSpacing: '0.02em' }}>
          CHECKING YOUR AREA
        </h3>
        <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.55, marginBottom: '1.4rem', maxWidth: 320, margin: '0 auto 1.4rem' }}>
          One moment while we look up available Portland-area roofing offers in <strong style={{ color: 'var(--amber)' }}>{zip}</strong>.
        </p>
        <a
          href={redirectingTo}
          rel="noopener"
          style={{
            display: 'inline-block',
            background: 'var(--amber-btn)',
            color: '#000',
            fontFamily: 'var(--font-barlow-cond)',
            fontWeight: 700,
            fontSize: '0.95rem',
            textDecoration: 'none',
            padding: '12px 24px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Continue here →
        </a>
        <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', color: 'var(--muted)', marginTop: '1rem', letterSpacing: '0.05em' }}>
          Click the button if you are not redirected automatically.
        </p>
        <style jsx>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    )
  }

  /* Form (default state) */
  return (
    <div style={{ background: 'var(--bg2)', display: 'flex', flexDirection: 'column' }}>
      {/* Top accent */}
      <div style={{ borderTop: '3px solid var(--amber-btn)' }}>
        <div style={{ padding: '1.8rem 2rem 0' }}>
          {/* Live signal */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', animation: 'blink 1.4s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', color: 'var(--green)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Free · No Obligation · 48h Response
            </span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.8rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 0.95, marginBottom: '0.5rem' }}>
            GET YOUR<br /><span style={{ color: 'var(--amber-btn)' }}>FREE QUOTES</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1.5rem', fontWeight: 300 }}>
            Enter your ZIP and we&apos;ll match you with vetted Portland-area roofing contractors.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ padding: '0 2rem 2rem' }}>
        <label style={{ display: 'block', fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.7rem' }}>
          What&apos;s your ZIP code?
        </label>
        <input
          type="text"
          inputMode="numeric"
          placeholder="e.g. 97201"
          maxLength={5}
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
          autoComplete="postal-code"
          aria-label="ZIP code"
          style={{
            width: '100%',
            padding: '1rem 1.1rem',
            background: 'var(--bg)',
            border: `2px solid ${isValid ? 'var(--amber-btn)' : 'var(--bdr)'}`,
            color: 'var(--text)',
            fontFamily: 'var(--font-barlow)',
            fontSize: '1.35rem',
            letterSpacing: '0.18em',
            textAlign: 'center',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
        />
        <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.6rem' }}>
          We match by ZIP so the contractor knows your local permit jurisdiction and conditions.
        </p>

        <button
          type="submit"
          disabled={!isValid || submitting}
          style={{
            width: '100%',
            padding: '1.1rem',
            border: 'none',
            background: isValid ? 'var(--amber-btn)' : 'var(--bg3)',
            color: isValid ? '#000' : 'var(--muted)',
            fontFamily: 'var(--font-barlow-cond)',
            fontWeight: 700,
            fontSize: '1.05rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: isValid && !submitting ? 'pointer' : 'not-allowed',
            transition: 'background 0.2s, color 0.2s',
            marginTop: '1.2rem',
          }}
        >
          {submitting ? 'Connecting…' : 'Get My Free Quotes →'}
        </button>
      </form>

      {/* Trust footer */}
      <div style={{ borderTop: '1px solid var(--bdr)', padding: '1rem 2rem', display: 'flex', gap: '1.2rem', flexWrap: 'wrap', background: 'var(--bg3)' }}>
        {[
          { icon: '🔒', text: '256-bit secure' },
          { icon: '🚫', text: 'No spam, ever' },
          { icon: '✓', text: 'CCB-verified contractors' },
        ].map(({ icon, text }) => (
          <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.8rem' }}>{icon}</span>
            <span style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.72rem', color: 'var(--muted)' }}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
