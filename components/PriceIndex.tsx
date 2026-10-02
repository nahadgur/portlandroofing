import Link from 'next/link'
export default function PriceIndex() {
 return <section className="section-pad"><h2 style={{fontFamily:'var(--font-bebas)',fontSize:'2.5rem'}}>Compare the scope behind the price</h2><p style={{maxWidth:720,lineHeight:1.8,marginTop:'1rem'}}>Before comparing totals, check the roof measurements, materials, decking, flashing, and exclusions in each bid. Use the <Link href="/pdx-cost-index/" style={{color:'var(--amber)',textDecoration:'underline'}}>roofing cost worksheets</Link> to organize those details. Published calculator defaults are illustrative assumptions, not measured local prices.</p></section>
}
