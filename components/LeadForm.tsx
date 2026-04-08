'use client';

import { useState, FormEvent } from 'react';
import { SITE } from '@/lib/config';

interface LeadFormProps {
  source?: string;
}

interface FormData {
  zip: string;
  material: string;
  urgency: string;
  name: string;
  phone: string;
  email: string;
}

const STEPS = [
  { number: 1, label: 'Location' },
  { number: 2, label: 'Project' },
  { number: 3, label: 'Timeline' },
  { number: 4, label: 'Contact' },
] as const;

const MATERIALS = [
  { value: 'Asphalt Shingles', icon: '🏠' },
  { value: 'Metal Roofing',    icon: '⚡' },
  { value: 'Cedar Shake',      icon: '🌲' },
  { value: 'Not Sure',         icon: '🤔' },
] as const;

const URGENCIES = [
  { value: 'Emergency / ASAP',    icon: '🚨', sub: 'Urgent leak or damage' },
  { value: 'Within 2 Weeks',      icon: '📅', sub: 'Soon but not critical' },
  { value: 'Within a Month',      icon: '🗓',  sub: 'Planning ahead' },
  { value: 'Just Researching',    icon: '🔍', sub: 'Getting estimates' },
] as const;

export default function LeadForm({ source = 'website' }: LeadFormProps) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    zip: '', material: '', urgency: '', name: '', phone: '', email: '',
  });

  const update = (field: keyof FormData, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const canAdvance = (): boolean => {
    if (step === 0) return /^\d{5}$/.test(formData.zip);
    if (step === 1) return formData.material !== '';
    if (step === 2) return formData.urgency !== '';
    if (step === 3) return formData.name.trim() !== '' && formData.phone.trim() !== '';
    return false;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canAdvance()) return;
    setSubmitting(true);
    try {
      if (SITE.gasWebhook) {
        await fetch(SITE.gasWebhook, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, source, timestamp: new Date().toISOString() }),
        });
      }
    } catch {}
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="form-float p-6 text-center"
        style={{ animation: 'scaleIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both' }}
      >
        <div
          style={{
            width: 56, height: 56, borderRadius: '50%',
            background: '#EFF6FF', border: '2px solid #0066CC',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', fontSize: 24,
          }}
        >
          ✓
        </div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>
          Request received
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.6 }}>
          We&apos;ll match you with vetted Oregon contractors shortly.
          Check your inbox for next steps.
        </p>
      </div>
    );
  }

  const progress = ((step) / 4) * 100;

  return (
    <div className="form-float overflow-hidden">

      {/* Progress bar */}
      <div style={{ height: 3, background: '#E2E8F0', position: 'relative' }}>
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: '#0066CC',
            transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)',
            borderRadius: '0 2px 2px 0',
          }}
        />
      </div>

      {/* Step indicators */}
      <div
        style={{
          display: 'flex',
          padding: '14px 20px 0',
          gap: 4,
        }}
      >
        {STEPS.map((s, i) => (
          <div
            key={s.number}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <div
              style={{
                width: 24, height: 24, borderRadius: '50%',
                background: i < step ? '#0066CC' : i === step ? '#0066CC' : '#E2E8F0',
                border: i === step ? '2px solid #0066CC' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700,
                color: i <= step ? '#fff' : '#94A3B8',
                transition: 'all 0.3s',
                boxShadow: i === step ? '0 0 0 4px rgba(0,102,204,0.15)' : 'none',
              }}
            >
              {i < step ? '✓' : s.number}
            </div>
            <span
              style={{
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: i <= step ? '#0066CC' : '#CBD5E1',
                transition: 'color 0.3s',
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Step content */}
      <form onSubmit={handleSubmit}>
        <div style={{ padding: '20px 20px 16px' }}>

          {/* Step 0 — Zip */}
          {step === 0 && (
            <div style={{ animation: 'fadeUp 0.3s both' }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>
                What&apos;s your zip code?
              </p>
              <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: 12 }}>
                We&apos;ll match you with local Oregon contractors
              </p>
              <input
                type="text"
                inputMode="numeric"
                maxLength={5}
                placeholder="e.g. 97201"
                value={formData.zip}
                onChange={e => update('zip', e.target.value.replace(/\D/g, ''))}
                style={{
                  width: '100%',
                  border: '1.5px solid',
                  borderColor: formData.zip.length === 5 ? '#0066CC' : '#E2E8F0',
                  borderRadius: 8,
                  padding: '10px 14px',
                  fontSize: '1.25rem',
                  letterSpacing: '0.15em',
                  color: '#0F172A',
                  textAlign: 'center',
                  transition: 'border-color 0.2s',
                  outline: 'none',
                }}
              />
            </div>
          )}

          {/* Step 1 — Material */}
          {step === 1 && (
            <div style={{ animation: 'fadeUp 0.3s both' }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>
                What type of roofing?
              </p>
              <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: 12 }}>
                Select the material you&apos;re interested in
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {MATERIALS.map(m => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => update('material', m.value)}
                    style={{
                      border: '1.5px solid',
                      borderColor: formData.material === m.value ? '#0066CC' : '#E2E8F0',
                      borderRadius: 8,
                      padding: '10px 8px',
                      background: formData.material === m.value ? '#EFF6FF' : '#fff',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      transform: formData.material === m.value ? 'scale(1.02)' : 'scale(1)',
                    }}
                  >
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{m.icon}</div>
                    <div style={{
                      fontSize: '0.75rem', fontWeight: 600,
                      color: formData.material === m.value ? '#0066CC' : '#475569',
                    }}>
                      {m.value}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Urgency */}
          {step === 2 && (
            <div style={{ animation: 'fadeUp 0.3s both' }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>
                What&apos;s your timeline?
              </p>
              <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: 12 }}>
                This helps contractors prioritise your request
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {URGENCIES.map(u => (
                  <button
                    key={u.value}
                    type="button"
                    onClick={() => update('urgency', u.value)}
                    style={{
                      border: '1.5px solid',
                      borderColor: formData.urgency === u.value ? '#0066CC' : '#E2E8F0',
                      borderRadius: 8,
                      padding: '10px 14px',
                      background: formData.urgency === u.value ? '#EFF6FF' : '#fff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      transition: 'all 0.2s',
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{u.icon}</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{
                        fontSize: '0.8rem', fontWeight: 600,
                        color: formData.urgency === u.value ? '#0066CC' : '#0F172A',
                      }}>
                        {u.value}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{u.sub}</div>
                    </div>
                    {formData.urgency === u.value && (
                      <span style={{ marginLeft: 'auto', color: '#0066CC', fontSize: 14 }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 — Contact */}
          {step === 3 && (
            <div style={{ animation: 'fadeUp 0.3s both' }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>
                Where should we send your quotes?
              </p>
              <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: 12 }}>
                CCB-licensed contractors will contact you directly
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {([
                  { field: 'name',  placeholder: 'Your name',         type: 'text' },
                  { field: 'phone', placeholder: 'Phone number',      type: 'tel' },
                  { field: 'email', placeholder: 'Email (optional)',   type: 'email' },
                ] as const).map(f => (
                  <input
                    key={f.field}
                    type={f.type}
                    placeholder={f.placeholder}
                    value={formData[f.field]}
                    onChange={e => update(f.field, e.target.value)}
                    style={{
                      width: '100%',
                      border: '1.5px solid #E2E8F0',
                      borderRadius: 8,
                      padding: '10px 14px',
                      fontSize: '0.85rem',
                      color: '#0F172A',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#0066CC')}
                    onBlur={e => (e.target.style.borderColor = '#E2E8F0')}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div
          style={{
            padding: '0 20px 20px',
            display: 'flex',
            gap: 8,
            alignItems: 'center',
          }}
        >
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(s => s - 1)}
              style={{
                border: '1.5px solid #E2E8F0',
                borderRadius: 8,
                padding: '10px 16px',
                background: '#fff',
                fontSize: '0.8rem',
                color: '#64748B',
                cursor: 'pointer',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
            >
              ← Back
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => canAdvance() && setStep(s => s + 1)}
              disabled={!canAdvance()}
              style={{
                flex: 1,
                background: canAdvance() ? '#0066CC' : '#E2E8F0',
                border: 'none',
                borderRadius: 8,
                padding: '11px 16px',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: canAdvance() ? '#fff' : '#94A3B8',
                cursor: canAdvance() ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                transform: canAdvance() ? undefined : undefined,
              }}
            >
              Continue →
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canAdvance() || submitting}
              style={{
                flex: 1,
                background: canAdvance() ? '#0066CC' : '#E2E8F0',
                border: 'none',
                borderRadius: 8,
                padding: '11px 16px',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: canAdvance() ? '#fff' : '#94A3B8',
                cursor: canAdvance() ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
              }}
            >
              {submitting ? 'Sending…' : 'Get Free Quotes →'}
            </button>
          )}
        </div>

        <p
          style={{
            fontSize: '0.7rem',
            color: '#CBD5E1',
            textAlign: 'center',
            padding: '0 20px 16px',
          }}
        >
          No spam. No commitment. CCB-licensed contractors only.
        </p>
      </form>
    </div>
  );
}
