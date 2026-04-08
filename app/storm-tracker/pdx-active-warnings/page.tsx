import type { Metadata } from 'next'
import Script from 'next/script'
import Link   from 'next/link'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import PageHero from '@/components/PageHero'
import StormAlerts from '@/components/StormAlerts'
import { SITE } from '@/lib/config'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'

export const revalidate = 3600

const PAGE_URL = `${SITE.baseUrl}/storm-tracker/pdx-active-warnings`

export const metadata: Metadata = {
  title: `Portland Storm & Wind Advisories — Active Roofing Warnings | ${SITE.name}`,
  description: 'Live Portland metro storm alerts filtered for roofing impact: wind advisories, high wind warnings, and winter storm warnings. NWS data for zones ORZ006, ORZ007, ORZ604.',
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Portland Storm & Wind Advisories for Roofing', description: 'Active NWS alerts filtered for Portland metro roofing impact.', url: PAGE_URL, type: 'website' },
}

const faqs = [
  { q: 'What wind speed damages roofs in Portland?', a: 'Sustained winds above 45 mph can lift shingles and damage flashing. Gusts above 60 mph can cause significant damage to any roofing material. Portland\u2019s East Gorge wind events regularly produce gusts of 50\u201370 mph in east metro areas.' },
  { q: 'Should I postpone roofing work during a wind advisory?', a: 'Yes. Wind advisories (sustained 31\u201339 mph, gusts to 57 mph) make roofing work unsafe and can compromise installation quality. Most reputable contractors will reschedule. High Wind Warnings (sustained 40+ mph, gusts 58+ mph) make rooftop work dangerous.' },
  { q: 'How do I check for storm damage on my roof?', a: 'After a storm, look for: missing or lifted shingles, granules in gutters, damaged flashing around vents and chimneys, dented metal components, and debris impact marks. Do not climb on the roof \u2014 use binoculars from ground level or hire a professional inspector.' },
  { q: 'Does homeowners insurance cover storm damage to roofs in Oregon?', a: 'Most Oregon homeowners policies cover sudden storm damage (wind, hail, fallen trees) but not gradual wear or maintenance neglect. File a claim promptly, document damage with photos before temporary repairs, and get at least two contractor estimates before accepting an adjuster\u2019s assessment.' },
  { q: 'What NWS zones cover Portland for roofing alerts?', a: 'Portland metro roofing-relevant weather is covered by three NWS zones: ORZ006 (Central Columbia River Gorge), ORZ007 (Portland Metro Area), and ORZ604 (Greater Portland Metro). Wind events affecting roofs typically originate from ORZ006 (Gorge winds) or ORZ007 (frontal systems).' },
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
        eyebrow="Live Data \u00b7 National Weather Service"
        title={<>PDX ACTIVE<br /><span style={{ color: '#F5A623' }}>STORM WARNINGS</span></>}
        subtitle="Real-time NWS alerts filtered for Portland metro roofing impact. Wind advisories, high wind warnings, and winter storm warnings."
        stats={[{ label: 'NWS Zones Monitored', value: '3' }, { label: 'Refresh Interval', value: '1 hr' }, { label: 'Alert Types', value: '7' }]}
      />

      {/* Live Alerts */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ Live Alerts ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '2rem' }}>CURRENT PORTLAND METRO ALERTS</h2>
          <StormAlerts />
        </div>
      </section>

      {/* What To Do During a Warning */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ Action Guide ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.8rem' }}>WHAT TO DO DURING A WARNING</h2>
          <p style={{ ...f, fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300, maxWidth: '720px', marginBottom: '2.5rem' }}>
            Different alert levels require different responses. Here is what each means for your roof and any scheduled roofing work.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
            {[
              { level: 'Wind Advisory', wind: 'Sustained 31\u201339 mph, gusts to 57 mph', action: 'Postpone roofing work. Secure loose materials on roof. Check that tarps on any in-progress work are properly weighted. Monitor for shingle lift on aging roofs.', color: 'var(--amber)' },
              { level: 'High Wind Warning', wind: 'Sustained 40+ mph, gusts 58+ mph', action: 'No rooftop work. Move vehicles away from trees. Document pre-storm roof condition with photos. Prepare for potential damage assessment after the event passes.', color: 'var(--red)' },
              { level: 'High Wind Watch', wind: 'Conditions favorable for high winds', action: 'Plan to postpone scheduled roofing work. Contractors should secure job sites. Homeowners with known roof vulnerabilities should arrange temporary protective measures.', color: 'var(--amber)' },
              { level: 'Winter Storm Warning', wind: 'Heavy snow, ice, or combination expected', action: 'No roofing work. Ice loading can stress compromised roof structures. After the storm, inspect for ice dam formation, gutter damage, and snow load on flat or low-pitch roofs.', color: 'var(--red)' },
            ].map((item, i) => (
              <div key={item.level} style={{ background: i % 2 === 0 ? '#fff' : 'var(--bg2)', padding: '1.5rem', borderLeft: `4px solid ${item.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div style={{ ...c, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>{item.level}</div>
                  <div style={{ ...m, fontSize: '0.65rem', color: 'var(--muted)' }}>{item.wind}</div>
                </div>
                <div style={{ ...f, fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300 }}>{item.action}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* After the Storm */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap-wide">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>[ After the Storm ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '0.8rem' }}>POST-STORM CHECKLIST</h2>
          <p style={{ ...f, fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300, maxWidth: '720px', marginBottom: '2rem' }}>
            Once conditions are safe, assess your roof for damage. Do not climb on the roof yourself.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
            {[
              { step: '01', title: 'Ground-level visual inspection', detail: 'Walk around the perimeter. Look for missing shingles, displaced flashing, fallen debris, and damaged gutters. Use binoculars for a closer look at the roof surface.' },
              { step: '02', title: 'Check gutters and downspouts', detail: 'Heavy granule accumulation in gutters after a wind event suggests shingle damage. Bent or detached gutters indicate wind or ice loading impact.' },
              { step: '03', title: 'Interior inspection', detail: 'Check attic for daylight penetration, water stains, or damp insulation. Check ceilings in top-floor rooms for new water spots or bubbling paint.' },
              { step: '04', title: 'Document before temporary repairs', detail: 'Photograph all visible damage from multiple angles before making any temporary repairs. Insurance adjusters need pre-repair documentation.' },
              { step: '05', title: 'Contact your insurance company', detail: 'File a claim promptly. Oregon law requires timely notice. Do not sign contracts with storm chasers before your adjuster visits.' },
              { step: '06', title: 'Get professional inspection', detail: 'Schedule a professional roof inspection from a licensed Oregon CCB contractor. Get at least two written estimates before committing to repairs.' },
            ].map((item) => (
              <div key={item.step} style={{ background: '#fff', padding: '1.5rem', display: 'flex', gap: '1.5rem' }}>
                <div style={{ ...d, fontSize: '1.5rem', color: 'var(--amber)', flexShrink: 0, lineHeight: 1, minWidth: '2.5rem' }}>{item.step}</div>
                <div>
                  <div style={{ ...c, fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.3rem' }}>{item.title}</div>
                  <div style={{ ...f, fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>[ Frequently Asked ]</div>
          {faqs.map(({ q, a }) => (
            <div key={q} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--bdr)' }}>
              <h3 style={{ ...c, fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.7rem' }}>{q}</h3>
              <p style={{ ...f, fontSize: '0.97rem', color: 'var(--muted)', lineHeight: 1.75, fontWeight: 300 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap">
          <div style={{ padding: '2rem 2.5rem', background: 'var(--bg2)', border: '1px solid var(--bdr)', borderLeft: '4px solid var(--amber-btn)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ ...m, fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Storm Damage?</div>
              <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>Get a free inspection from a vetted Portland roofing contractor. 48-hour response.</p>
            </div>
            <Link href="/#quote" style={{ display: 'inline-block', background: 'var(--amber-btn)', color: '#000', ...c, fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.8rem 2rem', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Get Free Quotes →</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
