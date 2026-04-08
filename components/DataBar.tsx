const cells = [
  {label:'Avg. Replacement Cost', value:'$9,400', delta:'▲ 2.1% vs last quarter', dir:'up'},
  {label:'Active Projects (PDX)',  value:'1,247',  delta:'▲ 14% YoY',              dir:'up'},
  {label:'Fastest Response Zone',  value:'97201',  delta:'Inner SW Portland',      dir:null},
  {label:'Metal Roof Premium',     value:'+68%',   delta:'vs asphalt baseline',    dir:null},
  {label:'Storm Season Uplift',    value:'+31%',   delta:'▼ demand seasonal',      dir:'dn'},
]

export default function DataBar() {
  return (
    <div style={{background:'var(--bg2)',borderBottom:'1px solid var(--bdr)'}}>
      <div className="grid-data-bar">
        {cells.map(({label,value,delta,dir},i)=>(
          <div key={label} style={{
            padding:'1.4rem 2rem',
            borderRight:i<cells.length-1?'1px solid var(--bdr)':undefined,
          }}>
            <div style={{fontFamily:'var(--font-space-mono)',fontSize:'0.65rem',color:'var(--muted)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'0.4rem'}}>{label}</div>
            <div style={{fontFamily:'var(--font-bebas)',fontSize:'1.6rem',color:'var(--text)',lineHeight:1}}>{value}</div>
            <div style={{fontFamily:'var(--font-space-mono)',fontSize:'0.7rem',marginTop:'0.2rem',color:dir==='up'?'var(--green)':dir==='dn'?'var(--red)':'var(--muted)'}}>{delta}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
