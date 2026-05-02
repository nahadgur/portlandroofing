import type { Metadata } from 'next'
import Script from 'next/script'
import Link   from 'next/link'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import PageHero from '@/components/PageHero'
import StormAlerts from '@/components/StormAlerts'
import LiveWindConditions from '@/components/LiveWindConditions'
import { SITE } from '@/lib/config'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import ModalTriggerBtn from '@/components/ModalTriggerBtn'

export const revalidate = 1800

const PAGE_URL = `${SITE.baseUrl}/storm-tracker/pdx-active-warnings`

export const metadata: Metadata = {
  title: `Portland Storm & Wind Advisories — Active Roofing Warnings | ${SITE.name}`,
  description: 'Live Portland metro storm alerts and wind conditions filtered for roofing impact. NWS alerts (zones ORZ006, ORZ007, ORZ604) plus Open-Meteo live wind, gusts, and 24h gust forecast.',
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Portland Storm & Wind Advisories for Roofing', description: 'Active NWS alerts plus live Open-Meteo wind conditions filtered for Portland metro roofing impact.', url: PAGE_URL, type: 'website' },
}

const faqs = [
  { q: 'What wind speed damages roofs in Portland?', a: 'Sustained winds above 45 mph can lift shingles and damage flashing. Gusts above 60 mph can cause significant damage to any material. Portland\'s East Gorge wind events regularly produce gusts of 50–70 mph in east metro areas (Gresham, Troutdale, Fairview).' },
  { q: 'Should I postpone roofing work during a wind advisory?', a: 'Yes. Wind advisories (sustained 31–39 mph, gusts to 57 mph) make roofing work unsafe and can compromise installation quality. High Wind Warnings (sustained 40+ mph, gusts 58+ mph) make rooftop work dangerous. Most reputable contractors will reschedule automatically — those who don\'t are a red flag.' },
  { q: 'How do I check for storm damage on my roof?', a: 'Look for missing or lifted shingles, granules in gutters, damaged flashing around vents and chimneys, dented metal components, and debris impact marks. Do not climb on the roof — use binoculars from ground level or hire a professional inspector.' },
  { q: 'Does homeowners insurance cover storm damage in Oregon?', a: 'Most Oregon policies cover sudden storm damage (wind, hail, fallen trees) but not gradual wear. File a claim promptly, document damage with photos before temporary repairs, and get at least two contractor estimates before accepting an adjuster\'s assessment.' },
  { q: 'What NWS zones cover Portland for roofing alerts?', a: 'Three zones: ORZ006 (Central Columbia River Gorge), ORZ007 (Portland Metro Area), and ORZ604 (Greater Portland Metro). Wind events typically originate from ORZ006 (Gorge winds) or ORZ007 (frontal systems).' },
  { q: 'Why are East Wind events so much worse in east metro Portland?', a: 'The Columbia River Gorge funnels Pacific high-pressure air down through the Bonneville/Cascade Locks corridor. By the time east winds reach Troutdale, Gresham, and Fairview, they\'re accelerated — sustained 40-60 mph with 70+ mph gusts is normal during major events. West-side neighborhoods (Beaverton, Hillsboro) see the same fronts at half the velocity.' },
  { q: 'How accurate is the live wind forecast above?', a: 'The Open-Meteo data above pulls from the same global numerical weather models (GFS, ECMWF, ICON) that NWS uses. Accuracy 6 hours out is high; 24 hours less so but still useful for planning. The peak gust forecast is conservative — actual gusts during Gorge events frequently exceed forecast.' },
  { q: 'My roof is 20+ years old and there\'s a wind warning tomorrow. What should I do?', a: 'If your asphalt shingles are at end of life, even a moderate wind event can strip large sections. Pre-storm tarp deployment ($200-$500) over vulnerable areas is cheap insurance. After the event, document everything before any repair work — that\'s the difference between a covered insurance claim and a denied one.' },
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

const stormHistory = [
  {
    date: 'January 13–17, 2024',
    event: 'Ice & Wind Event',
    impact: 'Multi-day ice accumulation followed by 50+ mph wind gusts. Estimated $50M+ in residential roof damage across Multnomah, Clackamas, and Washington counties. Tree-fall damage was the dominant claim type.',
    lesson: 'Ice loading on already-stressed roofs amplified wind damage. Pre-storm tree trimming around homes is the highest-leverage prevention.',
  },
  {
    date: 'February 12–13, 2021',
    event: 'Ice Storm of 2021',
    impact: 'One of the most damaging storms in Portland metro history. Half-inch+ ice accumulation across Inner SE/NE, then sustained 30-50 mph winds. Tree damage to roofs in Sellwood-Moreland, Eastmoreland, and Alameda was widespread.',
    lesson: 'Heritage neighborhoods with mature canopy face the highest tree-fall roof damage risk. Cedar shake roofs were particularly vulnerable to combined ice+wind loading.',
  },
  {
    date: 'November 13, 2021',
    event: 'East Wind Event',
    impact: 'Sustained 50-65 mph east winds through Gorge corridor. Shingle damage concentrated in Gresham, Troutdale, Fairview, and eastern Portland. Asphalt shingle tabs stripped on roofs 18+ years old.',
    lesson: 'East Wind corridor exposure is real and ongoing — 110 mph rated shingles plus six-nail attachment is the practical minimum spec for this corridor.',
  },
  {
    date: 'September 7, 2020',
    event: 'Labor Day Wind Event (statewide)',
    impact: 'Catastrophic east-wind event triggered the Almeda fires (Talent/Phoenix) and caused widespread Portland metro tree-fall roof damage. Combined wind speeds, dry conditions, and aging tree canopy produced exceptional damage.',
    lesson: 'East-wind events are increasingly common as climate patterns shift. Pre-fall tree assessment around the home is essential preventive maintenance.',
  },
]

const neighborhoodWindExposure = [
  { name: 'Gresham / Troutdale', exposure: 'Maximum', detail: 'East Wind corridor terminus. Sustained 50-65 mph during major events; 70+ mph gusts not unusual.', spec: '110 mph rated shingles, six-nail attachment, valley ice-and-water shield' },
  { name: 'Eastern Hawthorne / Mt Tabor', exposure: 'High', detail: 'Direct east-wind path before terrain dispersion. 40-55 mph sustained during major events.', spec: '110 mph rated shingles strongly recommended; six-nail attachment standard' },
  { name: 'Alameda Ridge / Beaumont', exposure: 'High', detail: 'Ridge-line exposure plus east-wind corridor. View-corridor properties take direct hits.', spec: '110 mph rating + concealed-fastener metal preferred for ridge homes' },
  { name: 'West Hills / Council Crest', exposure: 'High', detail: 'Hilltop and ridge exposure to all wind directions. Sustained 30-50 mph; 70+ mph gusts during major events.', spec: 'Standing seam metal with 110 mph rating; snow guards above pedestrian zones' },
  { name: 'Forest Park orbit', exposure: 'Moderate-High', detail: 'Tree canopy buffer reduces wind speed but tree-fall damage risk is highest here.', spec: 'Wind-rated material plus pre-fall tree assessment around house' },
  { name: 'Pearl District / Inner NW', exposure: 'Moderate', detail: 'Building-canyon effects can amplify or buffer depending on direction. Flat-roof parapet detailing is the wind-vulnerable point.', spec: '60-mil TPO with heat-welded parapet flashing rebuild' },
  { name: 'Inner SE (Hawthorne, Sellwood)', exposure: 'Moderate', detail: 'Tree canopy reduces wind speed but tree-fall risk is real. Older cedar shake especially vulnerable.', spec: 'AR-granule architectural with six-nail attachment; tree assessment essential' },
  { name: 'St. Johns / N Portland', exposure: 'Low-Moderate', detail: 'Lower elevation, partial Forest Park buffer. 30-40 mph sustained typical for major events.', spec: '90 mph rating adequate for most properties; 110 mph upgrade affordable insurance' },
  { name: 'Beaverton / Hillsboro', exposure: 'Low', detail: 'West-of-corridor location buffers most east-wind events. Frontal systems still produce 30-45 mph events.', spec: '90 mph rating standard; high-canopy lots benefit from 110 mph upgrade' },
  { name: 'Lake Oswego', exposure: 'Low-Moderate', detail: 'Hillside properties around lake see modest exposure; flat properties below sheltered.', spec: 'Hillside homes: 110 mph + concealed-fastener metal; flat lots: 90 mph adequate' },
]

const insuranceSteps = [
  {
    title: 'Document before any repair work',
    detail: 'Photo every visible damage point from multiple angles. Date-stamp by phone metadata or by including a newspaper. Insurance adjusters require pre-repair documentation; missing photos can reduce or deny claims.',
  },
  {
    title: 'Get emergency tarp deployment if active leak',
    detail: 'Most Oregon homeowner policies cover tarping as mitigation expense ($200-$500). Refusing to tarp because you fear it affects the claim is wrong — failing to mitigate further damage is what affects claims. Document tarp deployment with photos and contractor invoice.',
  },
  {
    title: 'Get a contractor scope before adjuster visit',
    detail: 'Adjusters typically estimate from photo inspection without lifting adjacent materials. They can miss underlying damage that a contractor identifies during actual work. A written contractor scope before the adjuster visit gives you documented basis for supplement requests.',
  },
  {
    title: 'File the claim within reasonable time',
    detail: 'Oregon law requires timely notice. "Reasonable time" typically means within 30 days of damage discovery for most policies. Waiting months invites denial. File promptly even if you\'re not sure of the full scope — the adjuster will work with you to define it.',
  },
  {
    title: 'Reject "deductible waiver" offers',
    detail: 'Storm chasers and some local contractors offer to waive your insurance deductible. This is illegal in Oregon — it\'s insurance fraud. Homeowners who participate face legal exposure plus claim denial. Pay your deductible directly.',
  },
  {
    title: 'Request supplement if adjuster scope is short',
    detail: 'If your contractor identifies damage the adjuster missed (common with hidden underlayment or deck damage), request a written supplement. Provide contractor scope and photos as documentation. Most adjusters accept reasonable supplements without dispute.',
  },
  {
    title: 'Verify CCB licensing before signing repair contract',
    detail: 'Oregon requires CCB licensing for any roofing work over $500. Verify at oregon.gov/ccb. Storm chasers often lack Oregon licensing despite claiming experience. Unlicensed work voids future warranty claims and can complicate future insurance.',
  },
]

const checklist = [
  { step: '01', title: 'Ground-level visual inspection', points: ['Walk the full perimeter','Use binoculars — don\'t climb','Look for missing shingles, damaged flashing, debris impact'] },
  { step: '02', title: 'Check gutters and downspouts', points: ['Heavy granule accumulation = shingle damage','Bent or detached gutters = wind or ice impact','Clear any blockages before rain returns'] },
  { step: '03', title: 'Interior attic check', points: ['Look for daylight penetration or new damp spots','Check insulation for moisture','Top-floor ceilings: new water stains or bubbling paint?'] },
  { step: '04', title: 'Document before touching anything', points: ['Photo every visible damage point from multiple angles','Don\'t make repairs before your adjuster visits','Date-stamp all photos'] },
  { step: '05', title: 'Contact your insurer', points: ['File promptly — Oregon law requires timely notice','Do not sign with storm chasers before adjuster visit','Request a written scope of damage from your adjuster'] },
  { step: '06', title: 'Get a professional inspection', points: ['Licensed Oregon CCB contractor only','Get minimum two written estimates','Ask specifically about permit requirements for the repair scope'] },
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
        eyebrow="Live · NWS + Open-Meteo"
        title={<>PDX ACTIVE<br /><span style={{ color: '#F5A623' }}>STORM WARNINGS</span></>}
        subtitle="Real-time NWS alerts and live Open-Meteo wind conditions filtered for Portland metro roofing impact. Plus Portland storm history, neighborhood wind exposure data, and an insurance claim playbook."
        stats={[{ label: 'NWS Zones Monitored', value: '3' }, { label: 'Live Refresh', value: '30 min' }, { label: 'Neighborhood Profiles', value: '10' }]}
      />

      {/* ── LIVE CONDITIONS (Open-Meteo) ─────────────────────────────── */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>[ Live Wind Conditions · Open-Meteo ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.5rem' }}>CURRENT PORTLAND METRO CONDITIONS</h2>
          <p style={{ ...f, fontSize: '0.9rem', color: 'var(--muted)', maxWidth: '640px', lineHeight: 1.65, fontWeight: 300, marginBottom: '1.5rem' }}>
            Live wind speed, peak gusts, temperature, and 24-hour gust forecast for Portland (45.52°N, 122.68°W). Updates every 30 minutes from Open-Meteo&apos;s free public weather API.
          </p>
          <LiveWindConditions />
        </div>
      </section>

      {/* ── NWS ALERTS ───────────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>[ Active NWS Alerts ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.5rem' }}>NATIONAL WEATHER SERVICE ALERTS</h2>
          <p style={{ ...f, fontSize: '0.9rem', color: 'var(--muted)', maxWidth: '640px', lineHeight: 1.65, fontWeight: 300, marginBottom: '1.5rem' }}>
            Wind advisories, high wind warnings, winter storm warnings, ice storm warnings — all roofing-relevant alerts from the NWS Portland forecast office for zones ORZ006, ORZ007, and ORZ604.
          </p>
          <StormAlerts />
        </div>
      </section>

      {/* ── ALERT LEVELS GRID ─────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ Alert Reference ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.5rem' }}>WHAT EACH ALERT MEANS FOR YOUR ROOF</h2>
          <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', fontWeight: 300, marginBottom: '2.5rem', maxWidth: '640px' }}>
            Different alert types require different responses. Know what each means before your contractor shows up.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: 'var(--bdr)' }}>
            {alertLevels.map(a => (
              <div key={a.level} style={{ background: a.bg, borderTop: `3px solid ${a.border}`, padding: '1.75rem 1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', gap: '0.5rem' }}>
                  <div style={{ ...c, fontSize: '1rem', fontWeight: 700, color: a.color, lineHeight: 1.2 }}>{a.level}</div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ ...d, fontSize: '1.8rem', color: a.color, lineHeight: 1 }}>{a.wind}</div>
                    <div style={{ ...m, fontSize: '0.55rem', color: 'var(--muted)', letterSpacing: '0.05em' }}>MPH · {a.gusts}</div>
                  </div>
                </div>
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

      {/* ── PORTLAND STORM HISTORY ───────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ Storm History ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.5rem' }}>RECENT MAJOR PDX STORM EVENTS</h2>
          <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', fontWeight: 300, marginBottom: '2rem', maxWidth: '640px' }}>
            Real Portland metro storm events from the last five years and what each taught the local roofing market.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
            {stormHistory.map((s, i) => (
              <div key={i} style={{ background: '#fff', padding: '1.5rem 1.7rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '0.6rem' }}>
                  <div style={{ ...c, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>{s.event}</div>
                  <div style={{ ...m, fontSize: '0.7rem', color: 'var(--amber)', letterSpacing: '0.06em' }}>{s.date}</div>
                </div>
                <p style={{ ...f, fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.7, fontWeight: 300, marginBottom: '0.8rem' }}>
                  {s.impact}
                </p>
                <div style={{ padding: '0.7rem 1rem', background: 'var(--bg2)', borderLeft: '3px solid var(--amber-btn)' }}>
                  <div style={{ ...m, fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Lesson</div>
                  <p style={{ ...f, fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.6, fontWeight: 300 }}>{s.lesson}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEIGHBORHOOD WIND EXPOSURE ───────────────────────────────── */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ Neighborhood Exposure ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.5rem' }}>WIND EXPOSURE BY PORTLAND MARKET</h2>
          <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', fontWeight: 300, marginBottom: '2rem', maxWidth: '640px' }}>
            Portland&apos;s east-wind corridor terminates in Gresham and Troutdale. West-side neighborhoods see the same fronts at half the velocity. Specification choices should match the local exposure.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
            {neighborhoodWindExposure.map((n, i) => {
              const exposureColor = n.exposure === 'Maximum' ? 'var(--red)' : n.exposure.startsWith('High') ? 'var(--amber-btn)' : n.exposure.startsWith('Moderate') ? 'var(--amber)' : '#1A8A45'
              return (
                <div key={i} style={{ background: 'var(--bg2)', padding: '1.2rem 1.5rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ ...c, fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.4rem' }}>{n.name}</div>
                    <p style={{ ...f, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300, marginBottom: '0.5rem' }}>{n.detail}</p>
                    <div style={{ ...m, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.06em' }}>Recommended spec: <span style={{ color: 'var(--text)' }}>{n.spec}</span></div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ ...d, fontSize: '1.2rem', color: exposureColor, lineHeight: 1, marginBottom: '0.3rem' }}>{n.exposure.toUpperCase()}</div>
                    <div style={{ ...m, fontSize: '0.55rem', color: 'var(--muted)' }}>EXPOSURE</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── WIND DAMAGE SCALE ─────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ Wind Damage Scale ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.5rem' }}>AT WHAT SPEED DOES WIND DAMAGE ROOFS?</h2>
          <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', fontWeight: 300, marginBottom: '2.5rem' }}>
            Portland&apos;s Gorge wind events regularly push 50–70 mph in east metro areas. Know where the thresholds are.
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

      {/* ── INSURANCE CLAIM PLAYBOOK ─────────────────────────────────── */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ Insurance Claim Playbook ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.5rem' }}>AFTER A STORM — INSURANCE CLAIM STEPS</h2>
          <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', fontWeight: 300, marginBottom: '2rem', maxWidth: '640px' }}>
            Seven steps that determine whether your storm-damage claim gets paid in full or denied. Order matters.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
            {insuranceSteps.map((step, i) => (
              <div key={i} style={{ background: 'var(--bg2)', padding: '1.2rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ ...d, fontSize: '1.6rem', color: 'var(--amber)', lineHeight: 1, flexShrink: 0, minWidth: '2rem' }}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <div style={{ ...c, fontSize: '0.98rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.4rem' }}>{step.title}</div>
                  <p style={{ ...f, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300 }}>{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POST-STORM CHECKLIST ──────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ Post-Storm Checklist ]</div>
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
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '2rem' }}>STORM &amp; ROOF QUESTIONS</h2>
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
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Link href="/portland/west-hills" style={{ ...c, fontSize: '0.78rem', letterSpacing: '0.04em', color: 'var(--amber)', padding: '0.5rem 1rem', border: '1px solid var(--bdr)', textDecoration: 'none', background: 'var(--bg2)' }}>
              West Hills wind-rated specs →
            </Link>
            <Link href="/portland/irvington" style={{ ...c, fontSize: '0.78rem', letterSpacing: '0.04em', color: 'var(--amber)', padding: '0.5rem 1rem', border: '1px solid var(--bdr)', textDecoration: 'none', background: 'var(--bg2)' }}>
              Alameda Ridge wind exposure →
            </Link>
            <Link href="/portland/hawthorne" style={{ ...c, fontSize: '0.78rem', letterSpacing: '0.04em', color: 'var(--amber)', padding: '0.5rem 1rem', border: '1px solid var(--bdr)', textDecoration: 'none', background: 'var(--bg2)' }}>
              Inner SE storm-damage scope →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
