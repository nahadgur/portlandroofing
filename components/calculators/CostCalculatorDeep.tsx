'use client'
import { useState } from 'react'
import Link from 'next/link'
const money=(n:number)=>n.toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0})
const fields=[{key:'area',label:'Measured roof area (sq ft)'},{key:'rate',label:'Installation allowance per sq ft ($)'},{key:'removal',label:'Removal and disposal allowance ($)'},{key:'repairs',label:'Decking and repair allowance ($)'},{key:'other',label:'Other project allowances ($)'}] as const
export default function CostCalculatorDeep(){
  const [inputs,setInputs]=useState({area:2000,rate:5,removal:2000,repairs:1000,other:0})
  const total=inputs.area*inputs.rate+inputs.removal+inputs.repairs+inputs.other
  return <section style={{padding:'1.5rem',border:'1px solid var(--bdr)',background:'var(--bg2)'}}>
    <h2>Build a roofing budget scenario</h2>
    <p>The starting values are illustrative assumptions, not Portland price data or a contractor quote. Replace them with measured roof area and project-specific allowances. Installation scope varies: avoid counting removal or repairs twice if a bid already includes them.</p>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'1rem',margin:'1.5rem 0'}}>
      {fields.map(({key,label})=><label key={key} htmlFor={`cost-${key}`}>{label}<input id={`cost-${key}`} type="number" min="0" max="1000000" step={key==='rate'?'.25':'1'} value={inputs[key]} onChange={e=>setInputs(old=>({...old,[key]:Math.max(0,Math.min(1000000,Number(e.target.value)))}))} style={{display:'block',width:'100%',padding:'.6rem'}} /></label>)}
    </div>
    <p aria-live="polite" style={{fontSize:'1.3rem'}}>Illustrative subtotal: <strong>{money(total)}</strong></p>
    <p>Formula: roof area × installation allowance + removal + repairs + other allowances. Permit and review fees are excluded unless you enter them under other allowances. Check <Link href="/tools/permit-lookup/">which office and project rules apply</Link> before budgeting those fees.</p>
    <p>A <Link href="/guides/understanding-oregon-roofing-costs/">written roofing bid</Link> should explain measured area, included work, exclusions, and changes for concealed damage. Roof age or ZIP code alone cannot establish those costs.</p>
  </section>
}
