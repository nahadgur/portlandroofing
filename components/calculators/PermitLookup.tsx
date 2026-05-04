'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { neighborhoods, permitLabels } from '@/lib/neighborhoods'
import { getNeighborhoodForZip } from '@/lib/zipMap'

const NEIGHBORHOODS_FOR_PICKER = [{ slug: 'auto', name: 'Auto-detect from address/ZIP' }, ...neighborhoods.map((n) => ({ slug: n.slug, name: n.name }))]

export default function PermitLookup() {
  const [address, setAddress] = useState('')
  const [override, setOverride] = useState('auto')
  const [touched, setTouched] = useState(false)

  // Try to extract zip from address string
  const detectedSlug = useMemo(() => {
    if (override !== 'auto') return override
    const zipMatch = address.match(/\b\d{5}\b/)
    if (zipMatch) return getNeighborhoodForZip(zipMatch[0]) ?? null
    return null
  }, [address, override])

  const neighborhood = detectedSlug ? neighborhoods.find((n) => n.slug === detectedSlug) ?? null : null
  const permit = neighborhood ? permitLabels[neighborhood.permitScore] : null

  const f = { fontFamily: 'var(--font-barlow)' } as const
  const m = { fontFamily: 'var(--font-space-mono)' } as const
  const c = { fontFamily: 'var(--font-barlow-cond)' } as const
  const d = { fontFamily: 'var(--font-bebas)' } as const

  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--bdr)' }}>
      <div style={{ padding: '1.6rem 2rem', borderBottom: '1px solid var(--bdr)' }}>
        <div style={{ ...m, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>▸ Portland Permit Difficulty Lookup</div>
        <h3 style={{ ...d, fontSize: '1.7rem', color: 'var(--text)', lineHeight: 1 }}>BEFORE YOU SIGN A CONTRACT</h3>
        <div style={{ ...f, fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.5rem', fontWeight: 300 }}>
          Permit complexity, design review status, fees, and special requirements for your Portland address. Knowing this before you commit to a contractor saves 4–8 weeks of timeline surprises in historic districts.
        </div>
      </div>

      <div style={{ padding: '1.7rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Address input */}
        <div>
          <label style={{ display: 'block', ...c, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.55rem' }}>
            Your Portland address (or just ZIP)
          </label>
          <input
            type="text" value={address}
            placeholder="e.g. 4523 SE Belmont St, Portland OR 97215"
            onChange={(e) => { setAddress(e.target.value); setTouched(true) }}
            style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--bg3)', border: '1px solid var(--bdr)', color: 'var(--text)', ...f, fontSize: '0.95rem' }}
          />
          <div style={{ marginTop: '0.6rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ ...m, fontSize: '0.62rem', color: 'var(--muted)' }}>OR pick neighborhood:</span>
            <select
              value={override}
              onChange={(e) => { setOverride(e.target.value); setTouched(true) }}
              style={{ padding: '0.4rem 0.7rem', background: 'var(--bg3)', border: '1px solid var(--bdr)', color: 'var(--text)', ...c, fontSize: '0.8rem' }}
            >
              {NEIGHBORHOODS_FOR_PICKER.map((n) => (
                <option key={n.slug} value={n.slug}>{n.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Result */}
        {!touched && (
          <div style={{ padding: '1.5rem', background: 'var(--bg3)', textAlign: 'center', ...m, fontSize: '0.85rem', color: 'var(--muted)' }}>
            Enter address or ZIP above to see your permit details.
          </div>
        )}

        {touched && !neighborhood && (
          <div style={{ padding: '1.2rem 1.5rem', background: 'rgba(200,32,44,0.05)', border: '1px solid rgba(200,32,44,0.15)', borderLeft: '4px solid var(--red)' }}>
            <div style={{ ...c, fontSize: '0.95rem', fontWeight: 700, color: 'var(--red)', marginBottom: '0.3rem' }}>Address not recognized in Portland metro</div>
            <p style={{ ...f, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>
              Try entering just the 5-digit ZIP, or pick the closest neighborhood from the dropdown above. We support all Portland metro zip codes plus Lake Oswego, Beaverton, Hillsboro, Tigard, and surrounding suburbs.
            </p>
          </div>
        )}

        {neighborhood && permit && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Headline result */}
            <div style={{ background: 'var(--bg)', border: '1px solid var(--bdr)', padding: '1.5rem 1.7rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.8rem' }}>
                <div>
                  <div style={{ ...m, fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Closest Portland Market</div>
                  <div style={{ ...d, fontSize: '1.8rem', color: 'var(--text)', lineHeight: 1 }}>{neighborhood.name.toUpperCase()}</div>
                  <div style={{ ...m, fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.3rem' }}>{neighborhood.zip} · {neighborhood.area}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.3rem', justifyContent: 'flex-end', marginBottom: '0.3rem' }}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} style={{ width: 28, height: 28, background: i <= neighborhood.permitScore ? permit.color : 'var(--bdr)', display: 'flex', alignItems: 'center', justifyContent: 'center', ...d, fontSize: '0.85rem', color: i <= neighborhood.permitScore ? '#000' : 'var(--bg3)' }}>{i}</div>
                    ))}
                  </div>
                  <div style={{ ...d, fontSize: '1.1rem', color: permit.color, lineHeight: 1 }}>{permit.label} ({neighborhood.permitScore}/5)</div>
                </div>
              </div>
              <p style={{ ...f, fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.7, fontWeight: 300 }}>{neighborhood.permitNotes}</p>
            </div>

            {/* Permit detail grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1px', background: 'var(--bdr)' }}>
              <div style={{ background: 'var(--bg)', padding: '1.1rem 1.3rem' }}>
                <div style={{ ...m, fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Typical Fee</div>
                <div style={{ ...c, fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>{neighborhood.permitDetail.fee}</div>
              </div>
              <div style={{ background: 'var(--bg)', padding: '1.1rem 1.3rem' }}>
                <div style={{ ...m, fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Processing</div>
                <div style={{ ...c, fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>{neighborhood.permitDetail.processing}</div>
              </div>
              <div style={{ background: 'var(--bg)', padding: '1.1rem 1.3rem' }}>
                <div style={{ ...m, fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Design Review</div>
                <div style={{ ...c, fontSize: '0.95rem', fontWeight: 600, color: neighborhood.permitScore >= 4 ? 'var(--red)' : 'var(--text)' }}>
                  {neighborhood.permitScore >= 4 ? 'Required' : 'Not required'}
                </div>
              </div>
            </div>

            {/* Special requirements */}
            <div style={{ background: 'var(--bg)', border: '1px solid var(--bdr)', borderLeft: '4px solid var(--amber-btn)' }}>
              <div style={{ padding: '0.9rem 1.5rem', background: 'var(--bg2)', borderBottom: '1px solid var(--bdr)' }}>
                <div style={{ ...m, fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Special Requirements For This Market</div>
              </div>
              <ul style={{ listStyle: 'none', padding: '1rem 1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {neighborhood.permitDetail.specialRequirements.map((r, i) => (
                  <li key={i} style={{ ...f, fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.6, fontWeight: 300, display: 'flex', gap: '0.7rem' }}>
                    <span style={{ color: 'var(--amber)', flexShrink: 0 }}>▸</span>{r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Source/disclaimer */}
            <div style={{ ...m, fontSize: '0.6rem', color: 'var(--muted)', lineHeight: 1.6 }}>
              Permit data drawn from Portland Bureau of Development Services published guidelines, Multnomah/Washington/Clackamas County permit fee schedules, and active design review board procedures. Always verify your specific property at portlandmaps.com or your jurisdiction&apos;s permit portal before signing a contract.
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Link href={`/portland/${neighborhood.slug}`} style={{ flex: '1 1 200px', padding: '0.85rem 1rem', background: 'var(--amber)', color: '#000', ...c, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', textAlign: 'center' }}>
                Full {neighborhood.name} Detail →
              </Link>
              <a href="https://www.portlandmaps.com" target="_blank" rel="noopener" style={{ flex: '1 1 200px', padding: '0.85rem 1rem', background: 'transparent', color: 'var(--amber)', border: '1px solid var(--amber)', ...c, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', textAlign: 'center' }}>
                Verify at PortlandMaps →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
