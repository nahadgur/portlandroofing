'use client'
import { useState } from 'react'
import Link from 'next/link'
const money=(n:number)=>n.toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0})
type Scenario={bid:number;maintenance:number;replacementYear:number;replacementCost:number}
export default function LifecycleCost(){
  const [years,setYears]=useState(25)
  const [options,setOptions]=useState<Scenario[]>([{bid:15000,maintenance:200,replacementYear:20,replacementCost:18000},{bid:25000,maintenance:200,replacementYear:35,replacementCost:30000}])
  function update(index:number,key:keyof Scenario,value:number){setOptions(old=>old.map((o,i)=>i===index?{...o,[key]:Math.max(0,Math.min(1000000,value))}:o))}
  return <section style={{padding:'1.5rem',background:'var(--bg2)',border:'1px solid var(--bdr)'}}>
    <h2>Compare two ownership scenarios</h2>
    <p>Replace these example inputs with bids and your own maintenance and replacement assumptions. The options are not tied to a material or neighborhood. Actual service life depends on the installed roof and its condition.</p>
    <label htmlFor="hold-years">Ownership period (years): {years}<input id="hold-years" type="range" min="1" max="60" value={years} onChange={e=>setYears(Number(e.target.value))} style={{display:'block',width:'100%',margin:'1rem 0'}} /></label>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'1.5rem'}}>
      {options.map((o,i)=>{const replace=o.replacementYear>0&&o.replacementYear<=years;const total=o.bid+o.maintenance*years+(replace?o.replacementCost:0);return <div key={i} style={{padding:'1rem',background:'var(--bg)'}}>
        <h3>Option {i+1}</h3>
        {([{key:'bid',label:'Complete installation bid ($)'},{key:'maintenance',label:'Assumed yearly maintenance ($)'},{key:'replacementYear',label:'Assumed replacement year (0 = none)'},{key:'replacementCost',label:'Assumed replacement cost ($)'}] as {key:keyof Scenario;label:string}[]).map(({key,label})=><label key={key} htmlFor={`option-${i}-${key}`} style={{display:'block',margin:'.8rem 0'}}>{label}<input id={`option-${i}-${key}`} type="number" min="0" max="1000000" value={o[key]} onChange={e=>update(i,key,Number(e.target.value))} style={{display:'block',width:'100%',padding:'.5rem'}} /></label>)}
        <p aria-live="polite">Scenario total: <strong>{money(total)}</strong><br />{money(total/years)} per year over {years} years. {replace?'Includes one assumed replacement.':'No replacement included.'}</p>
      </div>})}
    </div>
    <p>Formula: bid + annual maintenance × ownership years + one replacement if its assumed year falls within the period. This simple comparison excludes financing, discounting, inflation, energy savings, and resale value. Include known permit and project fees in your bid input.</p>
    <p>Keep the scope consistent using a <Link href="/guides/understanding-oregon-roofing-costs/">roofing bid comparison</Link>, and discuss maintenance needs for <Link href="/services/metal-roofing/">metal</Link> or <Link href="/services/roof-replacement/">replacement shingles</Link> with the installer.</p>
  </section>
}
