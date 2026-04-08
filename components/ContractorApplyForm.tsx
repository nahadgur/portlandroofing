'use client'

import { useState } from 'react'
import { neighborhoods } from '@/lib/neighborhoods'
import { services }      from '@/lib/services'
import { SITE }          from '@/lib/config'

type Step = 1 | 2 | 3 | 4

interface FormData {
  // Step 1 — Company
  companyName:    string
  ccbNumber:      string
  yearsActive:    string
  website:        string
  // Step 2 — Coverage & Speciality
  areas:          string[]
  specialities:   string[]
  avgJobValue:    string
  // Step 3 — Insurance & Compliance
  liabilityAmount: string
  workersComp:    string
  googleProfile:  string
  // Step 4 — Contact
  contactName:    string
  phone:          string
  email:          string
  message:        string
}

const initData: FormData = {
  companyName:'', ccbNumber:'', yearsActive:'', website:'',
  areas:[], specialities:[], avgJobValue:'',
  liabilityAmount:'', workersComp:'', googleProfile:'',
  contactName:'', phone:'', email:'', message:'',
}

const specialityOptions = services.map(s => s.name)

const avgValueOptions = [
  'Under $5,000', '$5,000–$10,000', '$10,000–$20,000', '$20,000+',
]

const liabilityOptions = [
  '$500,000', '$1,000,000', '$2,000,000', '$5,000,000+',
]

export default function ContractorApplyForm() {
  const [step,       setStep]       = useState<Step>(1)
  const [data,       setData]       = useState<FormData>(initData)
  const [submitting, setSubmitting] = useState(false)
  const [submitted,  setSubmitted]  = useState(false)
  const [error,      setError]      = useState('')

  const set = (field: keyof FormData, value: string) =>
    setData(prev => ({ ...prev, [field]: value }))

  const toggleArr = (field: 'areas' | 'specialities', value: string) =>
    setData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(x => x !== value)
        : [...prev[field], value],
    }))

  async function submit() {
    setSubmitting(true)
    setError('')
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_GAS_CONTRACTOR_WEBHOOK_URL
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method:  'POST',
          mode:    'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({
            ...data,
            areas:       data.areas.join(', '),
            specialities: data.specialities.join(', '),
            source:      SITE.domain,
            timestamp:   new Date().toISOString(),
          }),
        })
      }
      setSubmitted(true)
    } catch {
      setError('Submission failed. Email us directly at ' + SITE.email)
    } finally {
      setSubmitting(false)
    }
  }

  // ── Shared styles ──
  const label: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-barlow-cond)',
    fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase',
    color: 'var(--muted)', marginBottom: '0.5rem',
  }
  const input: React.CSSProperties = {
    width: '100%', padding: '0.85rem 1rem',
    background: 'var(--bg3)', border: '1px solid var(--bdr)',
    color: 'var(--text)', fontFamily: 'var(--font-barlow)', fontSize: '0.95rem',
    outline: 'none',
  }
  const selectStyle: React.CSSProperties = { ...input, cursor: 'pointer' }
  const chipBase: React.CSSProperties = {
    padding: '0.4rem 0.8rem', border: '1px solid var(--bdr)',
    background: 'var(--bg3)', color: 'var(--muted)',
    fontFamily: 'var(--font-barlow-cond)', fontSize: '0.78rem',
    cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
  }
  const chipSel: React.CSSProperties = {
    ...chipBase,
    borderColor: 'var(--amber)', background: 'rgba(245,166,35,0.08)', color: 'var(--amber)',
  }
  const nextBtn = (enabled: boolean): React.CSSProperties => ({
    width: '100%', padding: '1rem', border: 'none',
    background: enabled ? 'var(--amber)' : 'var(--bg3)',
    color: enabled ? '#000' : 'var(--muted)',
    fontFamily: 'var(--font-barlow-cond)', fontWeight: 700,
    fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase',
    cursor: enabled ? 'pointer' : 'not-allowed', marginTop: '1.5rem',
  })
  const backBtn: React.CSSProperties = {
    padding: '1rem 1.5rem', background: 'transparent',
    border: '1px solid var(--bdr)', color: 'var(--muted)',
    fontFamily: 'var(--font-barlow-cond)', fontSize: '0.85rem',
    cursor: 'pointer', flexShrink: 0,
  }

  // ── Progress bar ──
  const progress = (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
      {[1,2,3,4].map(s => (
        <div key={s} style={{
          height: '3px', flex: 1,
          background: step > s ? 'var(--green)' : step === s ? 'var(--amber)' : 'var(--bdr)',
          transition: 'background 0.3s',
        }} />
      ))}
    </div>
  )

  // ── Submitted ──
  if (submitted) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '3rem', color: 'var(--green)', marginBottom: '0.5rem' }}>✓ APPLICATION RECEIVED</div>
        <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 2rem' }}>
          We review all applications within 5 business days. If your CCB status, insurance, and coverage area are a match, we'll be in touch to begin the 47-point vetting process.
        </p>
        <div style={{ padding: '1.5rem', background: 'var(--bg2)', border: '1px solid var(--bdr)', maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}>
          <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--amber)', marginBottom: '0.8rem' }}>Your application summary</div>
          {[
            { label: 'Company',     value: data.companyName },
            { label: 'CCB #',       value: data.ccbNumber },
            { label: 'Specialities', value: data.specialities.join(', ') || '—' },
            { label: 'Areas',       value: `${data.areas.length} neighborhood${data.areas.length !== 1 ? 's' : ''} selected` },
          ].map(({ label: l, value }) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid var(--bdr)' }}>
              <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--muted)' }}>{l}</span>
              <span style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '0.85rem', color: 'var(--text)' }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '680px' }}>
      {progress}

      {/* STEP 1 — Company Info */}
      {step === 1 && (
        <div>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', color: 'var(--text)', marginBottom: '0.3rem' }}>Company Details</h2>
          <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.88rem', color: 'var(--muted)', marginBottom: '2rem' }}>Step 1 of 4 — Basic company information.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={label}>Company Name *</label>
              <input style={input} type="text" placeholder="Northwest Roofing Co." value={data.companyName} onChange={e => set('companyName', e.target.value)} />
            </div>
            <div>
              <label style={label}>Oregon CCB Number *</label>
              <input style={input} type="text" placeholder="e.g. 123456" value={data.ccbNumber} onChange={e => set('ccbNumber', e.target.value)} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={label}>Years in Business *</label>
              <select style={selectStyle} value={data.yearsActive} onChange={e => set('yearsActive', e.target.value)}>
                <option value="">Select…</option>
                {['1–2 years','3–5 years','6–10 years','11–20 years','20+ years'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={label}>Website (optional)</label>
              <input style={input} type="url" placeholder="https://yoursite.com" value={data.website} onChange={e => set('website', e.target.value)} />
            </div>
          </div>

          <div style={{ padding: '1rem', background: 'rgba(245,166,35,0.05)', border: '1px solid rgba(245,166,35,0.15)', marginTop: '1.5rem', marginBottom: '1rem' }}>
            <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>
              We verify all CCB numbers at <strong style={{ color: 'var(--text)' }}>oregon.gov/ccb</strong> before proceeding. Expired or invalid licences will result in automatic disqualification.
            </p>
          </div>

          <button
            onClick={() => data.companyName && data.ccbNumber && data.yearsActive && setStep(2)}
            style={nextBtn(!!(data.companyName && data.ccbNumber && data.yearsActive))}
          >
            NEXT: COVERAGE & SPECIALITIES →
          </button>
        </div>
      )}

      {/* STEP 2 — Coverage & Speciality */}
      {step === 2 && (
        <div>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', color: 'var(--text)', marginBottom: '0.3rem' }}>Coverage & Specialities</h2>
          <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.88rem', color: 'var(--muted)', marginBottom: '2rem' }}>Step 2 of 4 — Where you work and what you do.</p>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={label}>Roofing Specialities * (select all that apply)</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {specialityOptions.map(o => (
                <button key={o} onClick={() => toggleArr('specialities', o)}
                  style={data.specialities.includes(o) ? chipSel : chipBase}>{o}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={label}>Average Job Value</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {avgValueOptions.map(o => (
                <button key={o} onClick={() => set('avgJobValue', o)}
                  style={data.avgJobValue === o ? chipSel : chipBase}>{o}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={label}>Portland Metro Coverage Areas * — select all neighborhoods you serve</label>
            <div style={{ maxHeight: '220px', overflowY: 'auto', border: '1px solid var(--bdr)', background: 'var(--bg3)', padding: '0.75rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem' }}>
                {neighborhoods.map(n => (
                  <label key={n.slug} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.25rem 0' }}>
                    <input
                      type="checkbox"
                      checked={data.areas.includes(n.slug)}
                      onChange={() => toggleArr('areas', n.slug)}
                      style={{ accentColor: 'var(--amber)', width: 14, height: 14, flexShrink: 0 }}
                    />
                    <span style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.82rem', color: 'var(--muted)' }}>{n.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', color: 'var(--amber)', marginTop: '0.4rem' }}>
              {data.areas.length} selected
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => setStep(1)} style={backBtn}>← Back</button>
            <button
              onClick={() => data.specialities.length && data.areas.length && setStep(3)}
              style={{ ...nextBtn(!!(data.specialities.length && data.areas.length)), flex: 1, marginTop: 0 }}
            >
              NEXT: INSURANCE & COMPLIANCE →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 — Insurance */}
      {step === 3 && (
        <div>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', color: 'var(--text)', marginBottom: '0.3rem' }}>Insurance & Compliance</h2>
          <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.88rem', color: 'var(--muted)', marginBottom: '2rem' }}>Step 3 of 4 — Minimum: $1M general liability + workers' comp.</p>

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={label}>General Liability Coverage *</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {liabilityOptions.map(o => (
                <button key={o} onClick={() => set('liabilityAmount', o)}
                  style={data.liabilityAmount === o ? chipSel : chipBase}>{o}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={label}>Workers' Compensation *</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['Active policy','Exempt (sole proprietor, no employees)'].map(o => (
                <button key={o} onClick={() => set('workersComp', o)}
                  style={data.workersComp === o ? chipSel : chipBase}>{o}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={label}>Google Business Profile URL (optional — helps vetting)</label>
            <input style={input} type="url" placeholder="https://g.co/maps/..." value={data.googleProfile} onChange={e => set('googleProfile', e.target.value)} />
          </div>

          <div style={{ padding: '1rem', background: 'rgba(245,166,35,0.05)', border: '1px solid rgba(245,166,35,0.15)', marginBottom: '1rem' }}>
            <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>
              We require a certificate of insurance as part of final vetting. You'll be asked to provide this if your application proceeds past the initial review.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => setStep(2)} style={backBtn}>← Back</button>
            <button
              onClick={() => data.liabilityAmount && data.workersComp && setStep(4)}
              style={{ ...nextBtn(!!(data.liabilityAmount && data.workersComp)), flex: 1, marginTop: 0 }}
            >
              NEXT: CONTACT DETAILS →
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 — Contact */}
      {step === 4 && (
        <div>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', color: 'var(--text)', marginBottom: '0.3rem' }}>Contact Details</h2>
          <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.88rem', color: 'var(--muted)', marginBottom: '2rem' }}>Step 4 of 4 — Who we contact with your vetting outcome.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={label}>Contact Name *</label>
              <input style={input} type="text" placeholder="Full name" value={data.contactName} onChange={e => set('contactName', e.target.value)} />
            </div>
            <div>
              <label style={label}>Phone *</label>
              <input style={input} type="tel" placeholder="(503) 555-0100" value={data.phone} onChange={e => set('phone', e.target.value)} />
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={label}>Email *</label>
            <input style={input} type="email" placeholder="you@yourcompany.com" value={data.email} onChange={e => set('email', e.target.value)} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={label}>Anything else we should know? (optional)</label>
            <textarea
              style={{ ...input, minHeight: '80px', resize: 'vertical' }}
              placeholder="Historic district experience, certifications, specialised equipment…"
              value={data.message}
              onChange={e => set('message', e.target.value)}
            />
          </div>

          {error && <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.82rem', color: 'var(--red)', marginBottom: '0.75rem' }}>{error}</p>}

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => setStep(3)} style={backBtn}>← Back</button>
            <button
              onClick={submit}
              disabled={submitting || !data.contactName || !data.phone || !data.email}
              style={{ ...nextBtn(!submitting && !!(data.contactName && data.phone && data.email)), flex: 1, marginTop: 0 }}
            >
              {submitting ? 'SUBMITTING…' : 'SUBMIT APPLICATION →'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
