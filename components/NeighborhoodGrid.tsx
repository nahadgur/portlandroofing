import Link from 'next/link'
import { neighborhoods } from '@/lib/neighborhoods'
export default function NeighborhoodGrid() {
 return <section className="section-pad"><h2 style={{fontFamily:'var(--font-bebas)',fontSize:'2.5rem'}}>Roofing by area</h2><p style={{margin:'1rem 0 2rem'}}>Find questions to ask about your roof, access, materials, and property requirements.</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'1rem'}}>{neighborhoods.map(n=><Link key={n.slug} href={`/portland/${n.slug}/`} style={{display:'block',padding:'1.5rem',border:'1px solid var(--bdr)',color:'var(--text)',textDecoration:'none'}}><h3 style={{fontFamily:'var(--font-barlow-cond)',fontSize:'1.3rem'}}>{n.name}</h3><p style={{marginTop:'.5rem',lineHeight:1.6}}>{n.focus}</p></Link>)}</div></section>
}
