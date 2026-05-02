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
  const title = `${s.name} in Portland — Cost Drivers, Worked Examples & Material Detail | ${SITE.name}`
  const description = s.description.replace(/\{neighborhood\}/g, 'Portland').replace(/\{zip\}/g, '').replace(/\{avgMid\}/g, s.avgMid.toLocaleString())
  const url = `${SITE.baseUrl}/services/${s.slug}`
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: 'website' } }
}

export default function ServiceHubPage({ params }: { params: { service: string } }) {
  const s = getServiceBySlug(params.service)
  if (!s) notFound()

  const intro = s.intro.replace(/\{neighborhood\}/g, 'Portland').replace(/\{zip\}/g, '').replace(/\{avgMid\}/g, s.avgMid.toLocaleString())

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
      <Script id="s3" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(faqSchema(s.serviceFaqs))}</Script>

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

      {/* Cost Truth — long-form bespoke narrative */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ Cost Truth ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '2rem' }}>
            WHAT {s.shortName.toUpperCase()} ACTUALLY COSTS IN PORTLAND
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {s.costTruth.map((para, i) => (
              <p key={i} style={{ ...f, fontSize: '1rem', color: 'var(--text)', lineHeight: 1.75, fontWeight: 300 }}>
                {para}
              </p>
            ))}
          </div>
          {s.warningNote && (
            <div style={{ marginTop: '2rem', padding: '1rem 1.2rem', background: 'rgba(200,32,44,0.05)', border: '1px solid rgba(200,32,44,0.18)', borderLeft: '4px solid var(--red)' }}>
              <div style={{ ...m, fontSize: '0.65rem', color: 'var(--red)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Important</div>
              <p style={{ ...f, fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.65, fontWeight: 300 }}>{s.warningNote}</p>
            </div>
          )}
        </div>
      </section>

      {/* Cost Drivers — itemized with quantified impact */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ Cost Drivers ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.8rem,3vw,2.5rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '1rem' }}>
            WHAT MOVES {s.shortName.toUpperCase()} QUOTES
          </h2>
          <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', maxWidth: '640px', lineHeight: 1.7, fontWeight: 300, marginBottom: '2rem' }}>
            The factors that move {s.name.toLowerCase()} quotes most in Portland, with quantified impact and the explanation behind each.
            Use these to evaluate whether a contractor&apos;s bid reflects local conditions or is missing something.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1px', background: 'var(--bdr)' }}>
            {s.costDrivers.map((cd, i) => (
              <div key={i} style={{ background: '#fff', padding: '1.2rem 1.4rem' }}>
                <div style={{ ...c, fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.4rem' }}>{cd.factor}</div>
                <div style={{ ...d, fontSize: '1.2rem', color: 'var(--amber)', marginBottom: '0.6rem', lineHeight: 1 }}>{cd.impact}</div>
                <p style={{ ...f, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>{cd.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Worked Examples */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ Worked Examples ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.8rem,3vw,2.5rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '1rem' }}>
            REAL {s.shortName.toUpperCase()} BREAKDOWNS
          </h2>
          <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', maxWidth: '640px', lineHeight: 1.7, fontWeight: 300, marginBottom: '2rem' }}>
            Three representative Portland {s.name.toLowerCase()} projects with line-item breakdowns drawn from typical local housing
            stock. Use these to anchor what your own quote should look like.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {s.workedExamples.map((ex, i) => (
              <div key={i} style={{ border: '1px solid var(--bdr)', background: '#fff' }}>
                <div style={{ padding: '1rem 1.4rem', background: 'var(--bg2)', borderBottom: '1px solid var(--bdr)' }}>
                  <div style={{ ...c, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)' }}>{ex.scenario}</div>
                </div>
                <div style={{ padding: '1rem 1.4rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <tbody>
                      {ex.lineItems.map((li, j) => (
                        <tr key={j} style={{ borderBottom: '1px dashed var(--bdr)' }}>
                          <td style={{ ...f, padding: '0.55rem 0', color: 'var(--muted)', fontWeight: 300 }}>{li.label}</td>
                          <td style={{ ...m, padding: '0.55rem 0', textAlign: 'right', color: 'var(--text)', fontWeight: 500, whiteSpace: 'nowrap' }}>{li.amount}</td>
                        </tr>
                      ))}
                      <tr>
                        <td style={{ ...c, paddingTop: '0.85rem', color: 'var(--text)', fontWeight: 700, fontSize: '0.95rem' }}>Total</td>
                        <td style={{ ...d, paddingTop: '0.85rem', textAlign: 'right', color: 'var(--amber)', fontSize: '1.4rem', lineHeight: 1, whiteSpace: 'nowrap' }}>{ex.total}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p style={{ ...f, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300, marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--bdr)' }}>
                    <span style={{ color: 'var(--text)', fontWeight: 600 }}>Note:</span> {ex.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Material Deep Dive */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ Material Deep Dive ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.8rem,3vw,2.5rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '1rem' }}>
            {s.shortName.toUpperCase()} MATERIALS — PORTLAND-SPECIFIC GUIDANCE
          </h2>
          <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', maxWidth: '640px', lineHeight: 1.7, fontWeight: 300, marginBottom: '2rem' }}>
            Each material has a different cost-performance profile in Portland&apos;s climate. Pros and cons below reflect real-world PDX experience, not generic manufacturer marketing.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {s.materialDeepDive.map((mat, i) => (
              <div key={i} style={{ border: '1px solid var(--bdr)', background: '#fff', padding: '1.5rem 1.7rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '0.8rem' }}>
                  <div>
                    <h3 style={{ ...d, fontSize: '1.4rem', color: 'var(--text)', lineHeight: 1, marginBottom: '0.3rem' }}>{mat.name.toUpperCase()}</h3>
                    <div style={{ ...m, fontSize: '0.7rem', color: 'var(--amber)', letterSpacing: '0.08em' }}>{mat.priceRange} · {mat.lifespan}</div>
                  </div>
                </div>
                <p style={{ ...f, fontSize: '0.88rem', color: 'var(--muted)', fontWeight: 300, marginBottom: '1rem', fontStyle: 'italic' }}>
                  Best for: {mat.bestFor}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ ...m, fontSize: '0.6rem', color: 'var(--green)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Pros</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      {mat.pros.map((p, j) => (
                        <li key={j} style={{ ...f, fontSize: '0.83rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.5, display: 'flex', gap: '0.5rem' }}>
                          <span style={{ color: 'var(--green)', flexShrink: 0 }}>+</span>{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div style={{ ...m, fontSize: '0.6rem', color: 'var(--red)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Cons</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      {mat.cons.map((co, j) => (
                        <li key={j} style={{ ...f, fontSize: '0.83rem', color: 'var(--text)', fontWeight: 300, lineHeight: 1.5, display: 'flex', gap: '0.5rem' }}>
                          <span style={{ color: 'var(--red)', flexShrink: 0 }}>−</span>{co}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div style={{ padding: '0.8rem 1rem', background: 'var(--bg2)', borderLeft: '3px solid var(--amber-btn)' }}>
                  <div style={{ ...m, fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>PDX Note</div>
                  <p style={{ ...f, fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.6, fontWeight: 300 }}>{mat.pdxNote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Problems */}
      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ Common Problems ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.8rem,3vw,2.5rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '1rem' }}>
            {s.shortName.toUpperCase()} FAILURE MODES &amp; RED FLAGS
          </h2>
          <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', maxWidth: '640px', lineHeight: 1.7, fontWeight: 300, marginBottom: '2rem' }}>
            What goes wrong most often on Portland {s.name.toLowerCase()} projects and what to ask contractors to avoid each.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
            {s.commonProblems.map((cp, i) => (
              <div key={i} style={{ background: 'var(--bg2)', padding: '1.2rem 1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                  <span style={{ ...d, fontSize: '1.6rem', color: 'var(--red)', lineHeight: 1, flexShrink: 0, minWidth: '2rem' }}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 style={{ ...c, fontSize: '0.98rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.4rem' }}>{cp.problem}</h3>
                    <p style={{ ...f, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300 }}>{cp.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap">
          <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ How It Works ]</div>
          <h2 style={{ ...d, fontSize: 'clamp(1.6rem,3vw,2.3rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '2rem' }}>THE {s.name.toUpperCase()} PROCESS</h2>
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

      {/* Pick your market */}
      <section className="section-pad" style={{ background: 'var(--bg)' }}>
        <div style={{ ...m, fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ Local Pricing ]</div>
        <h2 style={{ ...d, fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '1rem' }}>
          {s.shortName.toUpperCase()} BY PORTLAND MARKET
        </h2>
        <p style={{ ...f, fontSize: '0.95rem', color: 'var(--muted)', maxWidth: '640px', lineHeight: 1.7, fontWeight: 300, marginBottom: '2rem' }}>
          {s.name} cost varies meaningfully across Portland&apos;s 10 cost markets. Pick your neighborhood for bespoke local intelligence — what drives quotes locally, three worked examples, real permit detail.
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
          {s.serviceFaqs.map((faq) => (
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
