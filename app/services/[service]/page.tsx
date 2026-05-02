import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import LeadForm from '@/components/LeadForm'
import PageHero from '@/components/PageHero'
import { getServiceImage } from '@/lib/neighborhoodImages'
import { services, getServiceBySlug } from '@/lib/services'
import { neighborhoods } from '@/lib/neighborhoods'
import { SITE } from '@/lib/config'
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema'

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }))
}

export function generateMetadata({ params }: { params: { service: string } }): Metadata {
  const s = getServiceBySlug(params.service)
  if (!s) return {}
  const title = `${s.name} in Portland — Cost, Materials, Process | ${SITE.name}`
  const description = s.description.replace(/\{neighborhood\}/g, 'Portland').replace(/\{zip\}/g, '').replace(/\{avgMid\}/g, s.avgMid.toLocaleString())
  const url = `${SITE.baseUrl}/services/${s.slug}`
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: 'website' } }
}

export default function ServiceHubPage({ params }: { params: { service: string } }) {
  const s = getServiceBySlug(params.service)
  if (!s) notFound()

  const intro = s.intro.replace(/\{neighborhood\}/g, 'Portland').replace(/\{zip\}/g, '').replace(/\{avgMid\}/g, s.avgMid.toLocaleString())
  const whySection = s.whySection.replace(/\{neighborhood\}/g, 'Portland').replace(/\{zip\}/g, '').replace(/\{avgMid\}/g, s.avgMid.toLocaleString())

  const serviceFaqs = [
    { question: `How much does ${s.name.toLowerCase()} cost in Portland?`, answer: `${s.name} in Portland typically costs $${s.avgLow.toLocaleString()}–$${s.avgHigh.toLocaleString()} ${s.unit}, with most projects landing around $${s.avgMid.toLocaleString()}. Cost varies meaningfully by neighborhood — Pearl District and Lake Oswego command premiums; St. Johns runs the most affordable bracket. Pick your specific market below for bespoke local pricing intelligence.` },
    { question: `Do I need a permit for ${s.name.toLowerCase()} in Portland?`, answer: `Yes for full replacements — Portland's Bureau of Development Services requires a permit. Repair work covering less than 25% of the roof area generally does not. Your specific neighborhood may have additional design review requirements (Pearl District Central City review, Eastmoreland Historic District, Irvington Historic District); see the relevant neighborhood market page for the full permit detail.` },
    { question: `How long does ${s.name.toLowerCase()} take in Portland?`, answer: `Standard residential ${s.name.toLowerCase()} installation takes ${s.urgency === 'high' ? '1–3 days for repair scope, 2–5 days for full replacement' : '2–5 days of actual installation work'}. The bigger variable is lead time and permit timing — peak season (April–September) lead times run 4–8 weeks, plus 1–2 weeks for permit (4–6 weeks if your property is in a historic district).` },
    { question: `Which Portland contractors do ${s.name.toLowerCase()}?`, answer: `Multiple licensed Oregon CCB contractors specialize in ${s.name.toLowerCase()} across Portland. Our platform vets all contractors against a 47-point checklist including CCB license verification, insurance, references, and material expertise. Submit your details to get matched within 48 hours.` },
  ]

  const f = { fontFamily: 'var(--font-barlow)' } as const
  const m = { fontFamily: 'var(--font-space-mono)' } as const
  const c = { fontFamily: 'var(--font-barlow-cond)' } as const
  const d = { fontFamily: 'var(--font-bebas)' } as const

  return (
    <>
      <Script id="s1" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(serviceSchema({
        name: `${s.name} in Portland`,
        description: intro,
        url: `${SITE.baseUrl}/services/${s.slug}`,
        neighborhood: 'Portland',
        zip: '97201',
        lowPrice: s.avgLow,
        highPrice: s.avgHigh,
      }))}</Script>
      <Script id="s2" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema([
        { name: 'Home', url: SITE.baseUrl },
        { name: 'Services', url: `${SITE.baseUrl}/services` },
        { name: s.name, url: `${SITE.baseUrl}/services/${s.slug}` },
      ]))}</Script>
      <Script id="s3" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(faqSchema(serviceFaqs))}</Script>

      <Nav />

      <PageHero
        tall
        imageUrl={getServiceImage(s.slug)}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: s.name }]}
        eyebrow={`Portland · ${s.unit}`}
        title={<>{s.headline.toUpperCase()}<br /><span style={{ color: '#F5A623' }}>IN PORTLAND</span></>}
        subtitle={intro}
        stats={[
          { label: 'Cost Range', value: `$${s.avgLow.toLocaleString()}–$${s.avgHigh.toLocaleString()}` },
          { label: 'Typical Mid-Point', value: `$${s.avgMid.toLocaleString()}` },
          { label: 'Urgency', value: s.urgency === 'high' ? 'High' : 'Standard' },
        ]}
        right={<LeadForm />}
      />

      {/* Why */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ Why This Service ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.5rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '1.5rem' }}>
            {s.name.toUpperCase()} IN PORTLAND: WHAT YOU NEED TO KNOW
          </h2>
          <p style={{ ...f, fontSize: '1rem', color: 'var(--text)', lineHeight: 1.75, fontWeight: 300, marginBottom: '1.5rem' }}>{whySection}</p>
          {s.warningNote && (
            <div style={{ marginTop: '1.5rem', padding: '1rem 1.2rem', background: 'rgba(200,32,44,0.05)', border: '1px solid rgba(200,32,44,0.18)', borderLeft: '4px solid var(--red)' }}>
              <div style={{ ...m, fontSize: '0.65rem', color: 'var(--red)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Important</div>
              <p style={{ ...f, fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.65, fontWeight: 300 }}>{s.warningNote}</p>
            </div>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ How It Works ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.5rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '2rem' }}>THE {s.name.toUpperCase()} PROCESS</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
            {s.processSteps.map((step, i) => (
              <div key={i} style={{ background: '#fff', padding: '1.2rem 1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ ...d, fontSize: '1.6rem', color: 'var(--amber)', lineHeight: 1, flexShrink: 0, minWidth: '2rem' }}>{String(i + 1).padStart(2, '0')}</div>
                <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.65, paddingTop: '0.2rem' }}>{step.replace(/\{neighborhood\}/g, 'Portland').replace(/\{zip\}/g, '').replace(/\{avgMid\}/g, s.avgMid.toLocaleString())}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ Materials ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.5rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '1.5rem' }}>MATERIAL OPTIONS</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {s.materials.map((mat) => (
              <li key={mat} style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', padding: '0.7rem 0', borderBottom: '1px solid var(--bdr)', display: 'flex', gap: '0.75rem', fontWeight: 300, lineHeight: 1.65 }}>
                <span style={{ color: 'var(--amber)', flexShrink: 0 }}>▸</span>{mat}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pick your market */}
      <section className="section-pad" style={{ background: 'var(--bg)' }}>
        <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ Local Pricing ]</div>
        <h2 style={{ ...d, fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '1rem' }}>
          {s.shortName.toUpperCase()} PRICING BY PORTLAND MARKET
        </h2>
        <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', maxWidth: '640px', lineHeight: 1.7, fontWeight: 300, marginBottom: '2rem' }}>
          {s.name} cost varies meaningfully across Portland's 10 cost markets. Pick your neighborhood for bespoke local intelligence — what drives quotes locally, three worked examples, real permit detail.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '0.6rem' }}>
          {neighborhoods.map((n) => (
            <Link
              key={n.slug}
              href={`/portland/${n.slug}`}
              style={{
                display: 'block',
                background: 'var(--bg2)',
                border: '1px solid var(--bdr)',
                padding: '1.1rem 1.3rem',
                textDecoration: 'none',
              }}
            >
              <div style={{ ...m, fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{n.zip} · {n.area}</div>
              <div style={{ ...d, fontSize: '1.3rem', color: 'var(--text)', lineHeight: 1, marginBottom: '0.4rem' }}>{n.name.toUpperCase()}</div>
              <div style={{ ...d, fontSize: '1.4rem', color: 'var(--amber)', lineHeight: 1 }}>${n.avgCost.toLocaleString()}</div>
              <div style={{ ...m, fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.4rem' }}>avg replacement · range {n.range}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ FAQ ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '2.5rem' }}>{s.name.toUpperCase()} QUESTIONS</h2>
          {serviceFaqs.map((faq) => (
            <div key={faq.question} style={{ borderTop: '1px solid var(--bdr)', padding: '1.5rem 0' }}>
              <h3 style={{ ...c, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.7rem' }}>{faq.question}</h3>
              <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
