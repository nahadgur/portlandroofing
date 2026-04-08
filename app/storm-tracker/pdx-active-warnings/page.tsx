import type { Metadata } from 'next'
import Script from 'next/script'
import Link   from 'next/link'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import PageHero from '@/components/PageHero'
import StormAlerts from '@/components/StormAlerts'
import { SITE } from '@/lib/config'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import ModalTriggerBtn from '@/components/ModalTriggerBtn'

export const revalidate = 3600

const PAGE_URL = `${SITE.baseUrl}/storm-tracker/pdx-active-warnings`

export const metadata: Metadata = {
  title: `Portland Storm & Wind Advisories — Active Roofing Warnings | ${SITE.name}`,
  description: 'Live Portland metro storm alerts filtered for roofing impact: wind advisories, high wind warnings, and winter storm warnings. NWS data for zones ORZ006, ORZ007, ORZ604.',
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Portland Storm & Wind Advisories for Roofing', description: 'Active NWS alerts filtered for Portland metro roofing impact.', url: PAGE_URL, type: 'website' },
}

const faqs = [
  { q: 'What wind speed damages roofs in Portland?', a: 'Sustained winds above 45 mph can lift shingles and damage flashing. Gusts above 60 mph can cause significant damage to any material. Portland\'s East Gorge wind events regularly produce gusts of 50–70 mph in east metro areas.' },
  { q: 'Should I postpone roofing work during a wind advisory?', a: 'Yes. Wind advisories (sustained 31–39 mph, gusts to 57 mph) make roofing work unsafe and can compromise installation quality. High Wind Warnings (sustained 40+ mph, gusts 58+ mph) make rooftop work dangerous. Most reputable contractors will reschedule automatically.' },
  { q: 'How do I check for storm damage on my roof?', a: 'Look for missing or lifted shingles, granules in gutters, damaged flashing around vents and chimneys, dented metal components, and debris impact marks. Do not climb on the roof — use binoculars from ground level or hire a professional inspector.' },
  { q: 'Does homeowners insurance cover storm damage in Oregon?', a: 'Most Oregon policies cover sudden storm damage (wind, hail, fallen trees) but not gradual wear. File a claim promptly, document damage with photos before temporary repairs, and get at least two contractor estimates before accepting an adjuster\'s assessment.' },
  { q: 'What NWS zones cover Portland for roofing alerts?', a: 'Three zones: ORZ006 (Central Columbia River Gorge), ORZ007 (Portland Metro Area), and ORZ604 (Greater Portland Metro). Wind events typically originate from ORZ006 (Gorge winds) or ORZ007 (frontal systems).' },
]

const alertLevels = [
  {
    level: 'Wind Advisory',
    wind: '31–39',
    gusts: 'to 57 mph',
    color: 'var(--amber)',
    bg: 'rgba(245,166,35,0.06)',
    border: 'var(--amber-btn)',
    actions: [
      'Postpone all roofing work',
      'Secure loose materials on any in-progress jobs',
      'Monitor aging roofs for shingle lift',
    ],
  },
  {
    level: 'High Wind Watch',
    wind: '40+',
    gusts: 'conditions developing',
    color: 'var(--amber)',
    bg: 'rgba(245,166,35,0.06)',
    border: 'var(--amber-btn)',
    actions: [
      'Plan to postpone scheduled work',
      'Contractors: secure all job sites now',
      'Arrange protective tarps for vulnerable roofs',
    ],
  },
  {
    level: 'High Wind Warning',
    wind: '40+',
    gusts: '58+ mph',
    color: 'var(--red)',
    bg: 'rgba(200,32,44,0.06)',
    border: 'var(--red)',
    actions: [
      'No rooftop work under any circumstances',
      'Move vehicles away from trees',
      'Document roof condition before storm hits',
    ],
  },
  {
    level: 'Winter Storm Warning',
    wind: 'Ice / snow',
    gusts: 'loading risk',
    color: 'var(--red)',
    bg: 'rgba(200,32,44,0.06)',
    border: 'var(--red)',
    actions: [
      'No roofing work — ice loading stresses structure',
      'Inspect for ice dam formation after event',
      'Check snow load on flat or low-pitch roofs',
    ],
  },
]

const windScale = [
  { mph: '25', label: 'Loose debris becomes airborne', risk: 'Low', pct: 25, color: '#1A8A45' },
  { mph: '35', label: 'Shingle edges begin to lift', risk: 'Moderate', pct: 45, color: 'var(--amber-btn)' },
  { mph: '45', label: 'Shingle damage likely on aging roofs', risk: 'High', pct: 62, color: 'var(--amber-btn)' },
  { mph: '58', label: 'Flashing failures, widespread shingle loss', risk: 'Severe', pct: 78, color: 'var(--red)' },
  { mph: '70+', label: 'Structural damage possible', risk: 'Extreme', pct: 100, color: 'var(--red)' },
]

const checklist = [
  { step: '01', title: 'Ground-level visual inspection', points: ['Walk the full perimeter', 'Use binoculars — don\'t climb', 'Look for missing shingles, damaged flashing, debris impact'] },
  { step: '02', title: 'Check gutters and downspouts', points: ['Heavy granule accumulation = shingle damage', 'Bent or detached gutters = wind or ice impact', 'Clear any blockages before rain returns'] },
  { step: '03', title: 'Interior attic check', points: ['Look for daylight penetration or new damp spots', 'Check insulation for moisture', 'Top-floor ceilings: new water stains or bubbling paint?'] },
  { step: '04', title: 'Document before touching anything', points: ['Photo every visible damage point from multiple angles', 'Don\'t make repairs before your adjuster visits', 'Date-stamp all photos'] },
  { step: '05', title: 'Contact your insurer', points: ['File promptly — Oregon law requires timely notice', 'Do not sign with storm chasers before adjuster visit', 'Request a written scope of damage from your adjuster'] },
  { step: '06', title: 'Get a professional inspection', points: ['Licensed Oregon CCB contractor only', 'Get minimum two written estimates', 'Ask specifically about permit requirements for the repair scope'] },
]

export default function StormTrackerPage() {
  const f = { fontFamily: 'var(--font-barlow)' } as const
  const m = { fontFamily: 'var(--font-space-mono)' } as const
  const c = { fontFamily: 'var(--font-barlow-cond)' } as const
  const d = { fontFamily: 'var(--font-bebas)' } as const

  return (
    <>
      <Script id="s1" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify({
        '@context': 'https://schema.org', '@type': 'WebPage',
        name: 'Portland Storm & Wind Advisories for Roofing',
        description: metadata.description,
        url: PAGE_URL,
        publisher: { '@type': 'Organization', name: SITE.name, url: SITE.baseUrl },
      })}</Script>
      <Script id="s2" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema([
        { name: 'Home', url: SITE.baseUrl },
        { name: 'Storm Tracker', url: `${SITE.baseUrl}/storm-tracker` },
        { name: 'PDX Active Warnings', url: PAGE_URL },
      ]))}</Script>
      <Script id="s3" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(faqSchema(faqs))}</Script>

      <Nav />
      <PageHero
        imageUrl="/images/hero-guide-storm.jpeg"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Storm Tracker' }, { label: 'PDX Active Warnings' }]}
        eyebrow="Live Data · National Weather Service"
        title={<>PDX ACTIVE<br /><span style={{ color: '#F5A623' }}>STORM WARNINGS</span></>}
        subtitle="Real-time NWS alerts filtered for Portland metro roofing impact. Wind advisories, high wind warnings, and winter storm warnings."
        stats={[{ label: 'NWS Zones Monitored', value: '3' }, { label: 'Refresh Interval', value: '1 hr' }, { label: 'Alert Types', value: '7' }]}
      />

      {/* ── LIVE ALERTS ───────────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ Live Alerts ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '2rem' }}>CURRENT PORTLAND METRO ALERTS</h2>
          <StormAlerts />
        </div>
      </section>

      {/* ── ALERT LEVELS GRID ─────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ Alert Reference ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.5rem' }}>WHAT EACH ALERT MEANS FOR YOUR ROOF</h2>
          <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', fontWeight: 300, marginBottom: '2.5rem', maxWidth: '640px' }}>
            Different alert types require different responses. Know what each means before your contractor shows up.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: 'var(--bdr)' }}>
            {alertLevels.map(a => (
              <div key={a.level} style={{ background: a.bg, borderTop: `3px solid ${a.border}`, padding: '1.75rem 1.5rem' }}>
                {/* Level + wind speed */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', gap: '0.5rem' }}>
                  <div style={{ ...c, fontSize: '1rem', fontWeight: 700, color: a.color, lineHeight: 1.2 }}>{a.level}</div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ ...d, fontSize: '1.8rem', color: a.color, lineHeight: 1 }}>{a.wind}</div>
                    <div style={{ ...m, fontSize: '0.55rem', color: 'var(--muted)', letterSpacing: '0.05em' }}>MPH · {a.gusts}</div>
                  </div>
                </div>
                {/* Actions */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {a.actions.map(act => (
                    <li key={act} style={{ ...f, fontSize: '0.85rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.5, display: 'flex', gap: '0.6rem' }}>
                      <span style={{ color: a.color, flexShrink: 0 }}>▸</span>{act}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WIND DAMAGE SCALE ─────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ Wind Damage Scale ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.5rem' }}>AT WHAT SPEED DOES WIND DAMAGE ROOFS?</h2>
          <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', fontWeight: 300, marginBottom: '2.5rem' }}>
            Portland&#39;s Gorge wind events regularly push 50–70 mph in east metro areas. Know where the thresholds are.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {windScale.map(w => (
              <div key={w.mph}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.45rem' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                    <span style={{ ...d, fontSize: '2rem', color: w.color, lineHeight: 1 }}>{w.mph}</span>
                    <span style={{ ...m, fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.06em' }}>MPH</span>
                    <span style={{ ...f, fontSize: '0.9rem', color: 'var(--text)', fontWeight: 400 }}>{w.label}</span>
                  </div>
                  <span style={{ ...m, fontSize: '0.62rem', color: w.color, letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}>{w.risk}</span>
                </div>
                <div className="pi-bar">
                  <div className="pi-bar-fill" style={{ width: `${w.pct}%`, background: w.color, height: '5px' }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ ...m, fontSize: '0.6rem', color: 'var(--muted)', marginTop: '1.5rem' }}>
            Thresholds based on NWS damage reports and Oregon CCB contractor field data.
          </div>
        </div>
      </section>

      {/* ── POST-STORM CHECKLIST ──────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ After the Storm ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.5rem' }}>POST-STORM ROOF CHECKLIST</h2>
          <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', fontWeight: 300, marginBottom: '2.5rem' }}>
            Six steps. Complete them in order. Do not get on the roof.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'var(--bdr)' }}>
            {checklist.map(item => (
              <div key={item.step} style={{ background: '#fff', padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.8rem' }}>
                  <span style={{ ...d, fontSize: '1.6rem', color: 'var(--amber)', lineHeight: 1 }}>{item.step}</span>
                  <span style={{ ...c, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)' }}>{item.title}</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {item.points.map(pt => (
                    <li key={pt} style={{ ...f, fontSize: '0.84rem', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.5, display: 'flex', gap: '0.6rem' }}>
                      <span style={{ color: 'var(--amber)', flexShrink: 0 }}>▸</span>{pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NWS ZONES CALLOUT ─────────────────────────────────────────── */}
      <section style={{ background: '#fff', borderBottom: '1px solid var(--bdr)', padding: '2rem 3rem' }}>
        <div className="content-wrap-wide">
          <div style={{ display: 'flex', gap: '1px', background: 'var(--bdr)', flexWrap: 'wrap' }}>
            {[
              { zone: 'ORZ006', name: 'Central Columbia River Gorge', note: 'Source of east wind events — fastest onset' },
              { zone: 'ORZ007', name: 'Portland Metro Area', note: 'Primary residential coverage zone' },
              { zone: 'ORZ604', name: 'Greater Portland Metro', note: 'Extended metro and suburban coverage' },
            ].map(z => (
              <div key={z.zone} style={{ flex: '1 1 240px', background: 'var(--bg2)', padding: '1.2rem 1.5rem' }}>
                <div style={{ ...m, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>{z.zone}</div>
                <div style={{ ...c, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.3rem' }}>{z.name}</div>
                <div style={{ ...f, fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 300 }}>{z.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>[ FAQ ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '2rem' }}>STORM & ROOF QUESTIONS</h2>
          {faqs.map(({ q, a }) => (
            <div key={q} style={{ borderTop: '1px solid var(--bdr)', padding: '1.4rem 0' }}>
              <h3 style={{ ...c, fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>{q}</h3>
              <p style={{ ...f, fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap">
          <div style={{ padding: '2rem 2.5rem', background: 'var(--bg2)', border: '1px solid var(--bdr)', borderLeft: '4px solid var(--amber-btn)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ ...m, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Storm Damage?</div>
              <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>
                Get a free inspection from a vetted Portland roofing contractor.<br />
                <strong style={{ color: 'var(--text)', fontWeight: 500 }}>48-hour response. Licensed Oregon CCB only.</strong>
              </p>
            </div>
            <ModalTriggerBtn style={{ display: 'inline-block', background: 'var(--amber-btn)', color: '#000', ...c, fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.8rem 2rem', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
              Get Free Quotes →
            </ModalTriggerBtn>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
