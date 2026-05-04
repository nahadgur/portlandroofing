import type { Metadata } from 'next'
import Script from 'next/script'
import Nav     from '@/components/Nav'
import Footer  from '@/components/Footer'
import PageHero from '@/components/PageHero'
import PermitLookup from '@/components/calculators/PermitLookup'
import { SITE } from '@/lib/config'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'

const PAGE_URL = `${SITE.baseUrl}/tools/permit-lookup`

export const metadata: Metadata = {
  title: `Portland Roofing Permit Difficulty Lookup — BDS Permit Class & Design Review | ${SITE.name}`,
  description: 'Free Portland roofing permit lookup tool. Identify permit class, design review status, fee range, and special requirements for your address. Covers BDS, Multnomah/Washington/Clackamas County jurisdictions.',
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Portland Permit Difficulty Lookup', description: 'Roofing permit class, design review status, fees, and special requirements for any Portland metro address.', url: PAGE_URL, type: 'website' },
}

const faqs = [
  { question: 'Why does Portland permit complexity vary so much by neighborhood?', answer: 'Portland\'s historic district overlays apply only to specific listed districts (Eastmoreland, Irvington, Ladd\'s Addition, Pearl District/Central City) plus individually listed Historic Resource Inventory properties. In those areas, Type II Historic Resource Review adds 4-6 weeks before BDS will issue a permit. Outside those areas, standard residential roofing permits issue in 5-7 business days. The complexity score reflects this binary: design-review-required vs. routine.' },
  { question: 'How accurate is this permit lookup for my specific address?', answer: 'The tool routes your address (or ZIP) to the closest of 10 PDX cost markets. The permit data for that market reflects published BDS guidelines and county fee schedules. For exact verification of your specific property — particularly historic district status — confirm at portlandmaps.com using your address. Some properties on the Historic Resource Inventory are individually listed even outside formal historic districts.' },
  { question: 'What is Type II Historic Resource Review?', answer: 'Portland\'s formal review process for visible material changes on properties in listed historic districts or individually listed on the Historic Resource Inventory. The Historic Landmarks Commission evaluates proposed material, color, and profile against district character standards. Cedar shake retrofit-in-kind clears fastest (3-4 weeks); architectural asphalt conversion or non-traditional metal colors take 6-9 weeks with multiple revision cycles.' },
  { question: 'My property is in the Pearl District — what\'s different?', answer: 'Pearl District falls under Portland\'s Central City design review overlay, which applies to all visible roofing changes regardless of material. The review is parallel to standard BDS permit and applies to TPO membrane color, parapet detail, and any changes visible from public right-of-way. Most Pearl projects also involve HOA architectural review running in parallel. Plan 4-8 weeks total for design + permit before installation can begin.' },
  { question: 'Do suburbs (Beaverton, Lake Oswego) have the same permit process?', answer: 'No — different jurisdictions. Beaverton and absorbed Washington County areas use Washington County permitting (5-8 business days, modestly higher fees than Multnomah County). Lake Oswego has its own city permit plus active HOA design review across most subdivisions (Country Club, Lake Forest, First Addition mandate cedar retrofit-in-kind). Pearl, Hawthorne, Sellwood-Moreland, etc. use Multnomah County / Portland BDS.' },
]

export default function PermitLookupPage() {
  return (
    <>
      <Script id="s1" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(breadcrumbSchema([
        { name: 'Home', url: SITE.baseUrl },
        { name: 'Tools', url: `${SITE.baseUrl}/tools` },
        { name: 'Permit Lookup', url: PAGE_URL },
      ]))}</Script>
      <Script id="s2" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(faqSchema(faqs))}</Script>

      <Nav />
      <PageHero
        imageUrl="/images/hero-services-hub.jpeg"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }, { label: 'Permit Lookup' }]}
        eyebrow="Tool 02 · Free"
        title={<>PERMIT DIFFICULTY<br /><span style={{ color: '#F5A623' }}>LOOKUP</span></>}
        subtitle="Identify permit class, design review status, fee range, and special requirements for your Portland address before you sign a contract. Covers BDS, Multnomah/Washington/Clackamas County jurisdictions."
      />

      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="content-wrap">
          <PermitLookup />
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--bg2)' }}>
        <div className="content-wrap">
          <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>[ FAQ ]</div>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'var(--text)', lineHeight: 1, marginBottom: '2rem' }}>PERMIT LOOKUP QUESTIONS</h2>
          {faqs.map((faq) => (
            <div key={faq.question} style={{ borderTop: '1px solid var(--bdr)', padding: '1.4rem 0' }}>
              <h3 style={{ fontFamily: 'var(--font-barlow-cond)', fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>{faq.question}</h3>
              <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
