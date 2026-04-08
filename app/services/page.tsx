import type { Metadata } from 'next'
import Link   from 'next/link'
import Nav    from '@/components/Nav'
import Footer from '@/components/Footer'
import { services } from '@/lib/services'
import { neighborhoods } from '@/lib/neighborhoods'
import { SITE } from '@/lib/config'

export const metadata: Metadata = {
  title:       `Portland Roofing Services — Replacement, Repair, Metal, Cedar & Flat | ${SITE.name}`,
  description: 'All Portland roofing services in one place. Roof replacement, repair, metal roofing, cedar shake, and flat roof specialists. Vetted contractors across 50 Portland neighborhoods.',
  alternates:  { canonical: `${SITE.baseUrl}/services` },
}

// Show 6 featured neighbourhoods per service for the hub
const featuredNbhds = neighborhoods.filter(n => n.badge === 'hot' || n.avgCost > 10000).slice(0, 6)

export default function ServicesPage() {
  return (
    <>
      <Nav />

      {/* Breadcrumb */}
      <div style={{ padding: '0.8rem 2rem', borderBottom: '1px solid var(--bdr)', background: 'var(--bg2)' }}>
        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--muted)', display: 'flex', gap: '0.5rem' }}>
          <Link href="/" style={{ color: 'var(--amber)', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <span style={{ color: 'var(--text)' }}>Services</span>
        </div>
      </div>

      {/* Header */}
      <div className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--amber)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>[ Portland Metro ]</div>
        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem,6vw,4rem)', lineHeight: 0.9, color: 'var(--text)', marginBottom: '1rem' }}>
          PORTLAND<br /><span style={{ color: 'var(--amber)' }}>ROOFING SERVICES</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '1.05rem', color: 'var(--muted)', maxWidth: '560px', lineHeight: 1.7, fontWeight: 300 }}>
          Five roofing service types. Fifty neighbourhoods. One platform that vets the contractors doing the work.
        </p>
      </div>

      {/* Service cards */}
      <section className="section-pad" style={{ background: 'var(--bg)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bdr)' }}>
          {services.map((s, i) => (
            <div key={s.slug} style={{ background: i % 2 === 0 ? 'var(--bg2)' : 'var(--bg)', padding: '2.5rem 3rem' }}>
              {/* Service header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    ${s.avgLow.toLocaleString()} – ${s.avgHigh.toLocaleString()} · {s.unit}
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text)', lineHeight: 1 }}>{s.name}</h2>
                </div>
                {s.urgency === 'high' && (
                  <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.3rem 0.7rem', background: 'rgba(230,57,70,0.1)', color: 'var(--red)', border: '1px solid rgba(230,57,70,0.25)' }}>
                    Emergency Available
                  </span>
                )}
              </div>

              <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300, maxWidth: '680px', marginBottom: '2rem' }}>
                {s.intro.replace(/\{neighborhood\}/g, 'Portland').replace(/\{zip\}/g, '').replace(/\{avgMid\}/g, s.avgMid.toLocaleString())}
              </p>

              {/* Featured neighbourhood links for this service */}
              <div>
                <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                  Popular areas for {s.shortName.toLowerCase()}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {featuredNbhds.map(n => (
                    <Link key={n.slug} href={`/${s.slug}/${n.slug}`} style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '0.82rem', letterSpacing: '0.04em', color: 'var(--amber)', padding: '0.4rem 0.9rem', border: '1px solid var(--bdr)', textDecoration: 'none', background: 'var(--bg3)', whiteSpace: 'nowrap' }}>
                      {n.name}
                    </Link>
                  ))}
                  <Link href={`/${s.slug}/${neighborhoods[0].slug}`} style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '0.82rem', letterSpacing: '0.04em', color: 'var(--muted)', padding: '0.4rem 0.9rem', border: '1px solid var(--bdr)', textDecoration: 'none', background: 'var(--bg3)' }}>
                    All 50 areas →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
