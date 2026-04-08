'use client'

import { useState } from 'react'
import { SITE } from '@/lib/config'

type Step = 1 | 2 | 3 | 4

interface FormData {
  zip:       string
  material:  string
  urgency:   string
  name:      string
  phone:     string
  email:     string
}

const materials = [
  { id: 'asphalt', icon: '◼', label: 'Asphalt Shingle' },
  { id: 'metal',   icon: '◈', label: 'Metal / Steel' },
  { id: 'cedar',   icon: '◇', label: 'Cedar Shake' },
  { id: 'flat',    icon: '○', label: 'Flat / TPO' },
]

const urgencies = [
  { id: 'leak',    icon: '⚡', label: 'Leaking Now',      sub: 'Need emergency repair' },
  { id: 'soon',    icon: '📋', label: 'Next 1–2 Months',  sub: 'Planned replacement' },
  { id: 'summer',  icon: '☀', label: 'Summer Project',   sub: 'Planning ahead' },
  { id: 'quote',   icon: '💬', label: 'Just Exploring',   sub: 'Want a price guide' },
]

const stepDots: { step: Step; label: string }[] = [
  { step: 1, label: 'Zip' },
  { step: 2, label: 'Material' },
  { step: 3, label: 'Urgency' },
]

export default function LeadForm() {
  const [step,        setStep]        = useState<Step>(1)
  const [data,        setData]        = useState<FormData>({ zip: '', material: '', urgency: '', name: '', phone: '', email: '' })
  const [submitting,  setSubmitting]  = useState(false)
  const [submitted,   setSubmitted]   = useState(false)
  const [error,       setError]       = useState('')

  const update = (field: keyof FormData, value: string) =>
    setData(prev => ({ ...prev, [field]: value }))

  async function submit() {
    setSubmitting(true)
    setError('')
    try {
      if (SITE.gasWebhook) {
        await fetch(SITE.gasWebhook, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            source:    'portlandroofings.com',
            timestamp: new Date().toISOString(),
          }),
        })
      }
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  /* ── SUBMITTED STATE ── */
  if (submitted) {
    return (
      <div style={{ padding: '3rem 2.5rem', background: 'var(--bg2)', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '3rem', color: 'var(--green)', marginBottom: '0.5rem' }}>✓ SENT</div>
          <div style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '1.2rem', color: 'var(--text)', marginBottom: '1rem' }}>We've Got Your Request</div>
          <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.9rem', color: 'var(--text)', opacity: 0.75, lineHeight: 1.6 }}>
            Matched contractors for <strong style={{ color: 'var(--amber)' }}>{data.zip}</strong> will reach out within 48 hours.
          </p>
          <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg3)', border: '1px solid var(--bdr)' }}>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.7rem', color: 'var(--text)', opacity: 0.75 }}>Your job summary</div>
            <div style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '0.9rem', color: 'var(--text)', marginTop: '0.5rem' }}>
              {data.material} · {data.zip} · {data.urgency}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.9rem 1rem',
    background: 'var(--bg3)', border: '1px solid var(--bdr)',
    color: 'var(--text)', fontFamily: 'var(--font-space-mono)', fontSize: '0.95rem',
    outline: 'none',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-barlow-cond)',
    fontSize: "0.88rem", letterSpacing: '0.12em', textTransform: 'uppercase',
    color: 'var(--text)', opacity: 0.75, marginBottom: '0.6rem',
  }

  return (
    <div style={{ padding: '3rem 2.5rem', background: 'var(--bg2)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', letterSpacing: '0.04em', marginBottom: '0.3rem' }}>
          GET YOUR QUOTE
        </div>
        <p style={{ fontFamily: 'var(--font-barlow)', fontSize: "0.95rem", color: 'var(--text)', opacity: 0.75 }}>
          3 quick questions. Matched with verified Portland contractors.
        </p>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {stepDots.map(({ step: s }) => (
          <div key={s} style={{
            height: '3px', flex: 1,
            background: step > s ? 'var(--green)' : step === s ? 'var(--amber)' : 'var(--bdr)',
            transition: 'background 0.3s',
          }} />
        ))}
      </div>

      {/* STEP 1 — ZIP */}
      {step === 1 && (
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Step 1 of 3 — Your Zip Code</label>
            <input
              type="text"
              placeholder="e.g. 97201"
              maxLength={5}
              value={data.zip}
              onChange={e => update('zip', e.target.value)}
              style={inputStyle}
            />
          </div>
          <button
            onClick={() => data.zip.length >= 5 && setStep(2)}
            disabled={data.zip.length < 5}
            style={{
              width: '100%', padding: '1rem', border: 'none', cursor: data.zip.length >= 5 ? 'pointer' : 'not-allowed',
              background: data.zip.length >= 5 ? 'var(--amber)' : 'var(--bg3)',
              color: data.zip.length >= 5 ? '#000' : 'var(--muted)',
              fontFamily: 'var(--font-barlow-cond)', fontWeight: 700, fontSize: '1rem',
              letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'background 0.2s',
            }}
          >
            NEXT: CHOOSE MATERIAL →
          </button>
        </div>
      )}

      {/* STEP 2 — MATERIAL */}
      {step === 2 && (
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Step 2 of 3 — Roof Material</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {materials.map(m => (
                <button
                  key={m.id}
                  onClick={() => update('material', m.label)}
                  className={`form-option${data.material === m.label ? ' selected' : ''}`}
                  style={{
                    padding: '0.9rem', background: 'var(--bg3)', border: '1px solid var(--bdr)',
                    color: 'var(--text)', opacity: 0.75, fontFamily: 'var(--font-barlow-cond)', fontSize: "0.95rem",
                    letterSpacing: '0.06em', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <span style={{ display: 'block', fontSize: '1.2rem', marginBottom: '0.3rem' }}>{m.icon}</span>
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => setStep(1)} style={{ flex: '0 0 auto', padding: '1rem 1.5rem', background: 'transparent', border: '1px solid var(--bdr)', color: 'var(--text)', opacity: 0.75, fontFamily: 'var(--font-barlow-cond)', fontSize: "0.95rem", cursor: 'pointer' }}>← Back</button>
            <button
              onClick={() => data.material && setStep(3)}
              disabled={!data.material}
              style={{
                flex: 1, padding: '1rem', border: 'none', cursor: data.material ? 'pointer' : 'not-allowed',
                background: data.material ? 'var(--amber)' : 'var(--bg3)',
                color: data.material ? '#000' : 'var(--muted)',
                fontFamily: 'var(--font-barlow-cond)', fontWeight: 700, fontSize: '1rem',
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}
            >
              NEXT: SET URGENCY →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 — URGENCY */}
      {step === 3 && (
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Step 3 of 3 — How Soon?</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {urgencies.map(u => (
                <button
                  key={u.id}
                  onClick={() => update('urgency', u.label)}
                  className={`form-option${data.urgency === u.label ? ' selected' : ''}`}
                  style={{
                    padding: '0.9rem', background: 'var(--bg3)', border: '1px solid var(--bdr)',
                    color: 'var(--text)', opacity: 0.75, fontFamily: 'var(--font-barlow-cond)',
                    fontSize: "0.9rem", letterSpacing: '0.04em', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <span style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.2rem' }}>{u.icon}</span>
                  <span style={{ display: 'block', fontWeight: 700 }}>{u.label}</span>
                  <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text)', opacity: 0.75, marginTop: '0.1rem' }}>{u.sub}</span>
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => setStep(2)} style={{ flex: '0 0 auto', padding: '1rem 1.5rem', background: 'transparent', border: '1px solid var(--bdr)', color: 'var(--text)', opacity: 0.75, fontFamily: 'var(--font-barlow-cond)', fontSize: "0.95rem", cursor: 'pointer' }}>← Back</button>
            <button
              onClick={() => data.urgency && setStep(4)}
              disabled={!data.urgency}
              style={{
                flex: 1, padding: '1rem', border: 'none', cursor: data.urgency ? 'pointer' : 'not-allowed',
                background: data.urgency ? 'var(--amber)' : 'var(--bg3)',
                color: data.urgency ? '#000' : 'var(--muted)',
                fontFamily: 'var(--font-barlow-cond)', fontWeight: 700, fontSize: '1rem',
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}
            >
              ALMOST DONE →
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 — CONTACT DETAILS */}
      {step === 4 && (
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Your Contact Details</label>
            {(['name', 'phone', 'email'] as const).map(field => (
              <input
                key={field}
                type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                placeholder={field === 'name' ? 'Full name' : field === 'phone' ? 'Phone number' : 'Email address'}
                value={data[field]}
                onChange={e => update(field, e.target.value)}
                style={{ ...inputStyle, marginBottom: '0.75rem' }}
              />
            ))}
          </div>
          {error && (
            <p style={{ fontFamily: 'var(--font-barlow)', fontSize: "0.9rem", color: 'var(--red)', marginBottom: '0.75rem' }}>{error}</p>
          )}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => setStep(3)} style={{ flex: '0 0 auto', padding: '1rem 1.5rem', background: 'transparent', border: '1px solid var(--bdr)', color: 'var(--text)', opacity: 0.75, fontFamily: 'var(--font-barlow-cond)', fontSize: "0.95rem", cursor: 'pointer' }}>← Back</button>
            <button
              onClick={submit}
              disabled={submitting || !data.name || !data.phone}
              style={{
                flex: 1, padding: '1rem', border: 'none',
                cursor: !submitting && data.name && data.phone ? 'pointer' : 'not-allowed',
                background: !submitting && data.name && data.phone ? 'var(--amber)' : 'var(--bg3)',
                color: !submitting && data.name && data.phone ? '#000' : 'var(--muted)',
                fontFamily: 'var(--font-barlow-cond)', fontWeight: 700, fontSize: '1rem',
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}
            >
              {submitting ? 'SENDING...' : 'GET MY QUOTES →'}
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-barlow)', fontSize: "0.85rem", color: 'var(--text)', opacity: 0.75 }}>
              256-bit encrypted · No spam · Free service
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
