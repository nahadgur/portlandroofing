import Link from 'next/link'
import { neighborhoods } from '@/lib/neighborhoods'

export default function NeighborhoodGrid() {
  return (
    <section id="neighborhoods" className="section-pad" style={{background:'var(--bg)'}}>
      <div style={{marginBottom:'3rem'}}>
        <div style={{fontFamily:'var(--font-space-mono)',fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ Coverage Map ]</div>
        <h2 style={{fontFamily:'var(--font-bebas)',fontSize:'clamp(2rem,3.5vw,3.5rem)',color:'var(--text)',lineHeight:1,marginBottom:'0.5rem'}}>50 PORTLAND NEIGHBORHOODS</h2>
        <p style={{fontFamily:'var(--font-barlow)',fontSize:'0.95rem',color:'var(--muted)',maxWidth:'520px',fontWeight:300}}>Hyper-local pricing data, contractor availability, and roofing guides for every corner of the metro.</p>
      </div>
      <div className="grid-nbhd">
        {neighborhoods.map(n=>(
          <Link key={n.slug} href={`/portland/${n.slug}`} className="nbhd-card-hover" style={{
            background:'var(--bg2)',padding:'1.2rem 1rem',
            textDecoration:'none',display:'block',position:'relative',
          }}>
            <div style={{fontFamily:'var(--font-space-mono)',fontSize:'0.65rem',color:'var(--amber)',marginBottom:'0.3rem'}}>{n.zip}</div>
            <div style={{fontFamily:'var(--font-barlow-cond)',fontSize:'0.9rem',color:'var(--text)',fontWeight:600,lineHeight:1.2}}>{n.name}</div>
            <div style={{fontFamily:'var(--font-space-mono)',fontSize:'0.7rem',color:'var(--muted)',marginTop:'0.4rem'}}>Avg ${n.avgCost.toLocaleString()}</div>
            {n.badge&&(
              <span className={`mono-badge ${n.badge==='hot'?'badge-hot':'badge-new'}`} style={{position:'absolute',top:'0.7rem',right:'0.7rem'}}>
                {n.badge==='hot'?'HOT':'NEW'}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
