const contractors = [
  {rank:'01',status:'vetting' as const,name:'Premier Northwest Roofing',area:'Serving: SE Portland · Lake Oswego · West Linn',specs:['Licensed Oregon CCB #000000','Speciality: Asphalt, Metal, Cedar','Avg. response: 2.4 hours','Insurance: $2M general liability'],cta:'Join Waitlist for This Slot →'},
  {rank:'02',status:'coming' as const,name:'Pacific Crest Roofing',area:'Serving: Pearl · NW District · Irvington',specs:['Licensed Oregon CCB','Speciality: Historic & Flat Roofs','Est. availability: Q3 2026','Insurance: Verified pending'],cta:'Notify Me →'},
  {rank:'03',status:'coming' as const,name:'Cascade Ridge Roofing',area:'Serving: Beaverton · Hillsboro · Tigard',specs:['Licensed Oregon CCB','Speciality: Residential New Build','Est. availability: Q3 2026','Insurance: Verified pending'],cta:'Notify Me →'},
]

export default function ContractorGrid() {
  return (
    <section id="contractors" className="section-pad" style={{background:'var(--bg)'}}>
      <div style={{marginBottom:'3rem'}}>
        <div style={{fontFamily:'var(--font-space-mono)',fontSize:'0.68rem',color:'var(--amber)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.8rem'}}>[ Verified Provider Network ]</div>
        <h2 style={{fontFamily:'var(--font-bebas)',fontSize:'clamp(2rem,3.5vw,3.5rem)',color:'var(--text)',lineHeight:1,marginBottom:'0.5rem'}}>TOP RATED IN PDX</h2>
        <p style={{fontFamily:'var(--font-barlow)',fontSize:'0.95rem',color:'var(--muted)',maxWidth:'520px',fontWeight:300}}>All contractors vetted against our 47-point checklist: licensing, insurance, reviews, and project history.</p>
      </div>
      <div className="grid-contractors">
        {contractors.map(c=>(
          <div key={c.rank} style={{background:'var(--bg2)',padding:'1.8rem',position:'relative'}}>
            <div style={{fontFamily:'var(--font-bebas)',fontSize:'4rem',color:'var(--bdr)',position:'absolute',top:'1rem',right:'1.5rem',lineHeight:1,userSelect:'none'}}>{c.rank}</div>
            <div className={`mono-badge ${c.status==='vetting'?'badge-vetting':'badge-coming'}`} style={{display:'inline-flex',alignItems:'center',gap:'0.4rem',marginBottom:'1rem'}}>
              <span className="blink" style={{width:5,height:5,borderRadius:'50%',background:'currentColor',display:'inline-block'}}/>
              {c.status==='vetting'?'Vetting in Progress':'Coming Soon'}
            </div>
            <div style={{fontFamily:'var(--font-barlow-cond)',fontSize:'1.1rem',fontWeight:600,color:'var(--text)',marginBottom:'0.3rem'}}>{c.name}</div>
            <div style={{fontFamily:'var(--font-space-mono)',fontSize:'0.7rem',color:'var(--muted)',marginBottom:'1rem'}}>{c.area}</div>
            <ul style={{listStyle:'none'}}>
              {c.specs.map(s=>(
                <li key={s} style={{fontFamily:'var(--font-barlow)',fontSize:'0.82rem',color:'var(--muted)',padding:'0.3rem 0',borderBottom:'1px solid var(--bdr)',display:'flex',alignItems:'center',gap:'0.5rem'}}>
                  <span style={{color:'var(--bdr)',fontSize:'0.7rem'}}>—</span>{s}
                </li>
              ))}
            </ul>
            <button style={{marginTop:'1.2rem',width:'100%',padding:'0.7rem',background:'transparent',border:'1px solid var(--amber)',color:'var(--amber)',fontFamily:'var(--font-barlow-cond)',fontSize:'0.82rem',letterSpacing:'0.1em',textTransform:'uppercase',cursor:'pointer'}}>{c.cta}</button>
          </div>
        ))}
      </div>
    </section>
  )
}
