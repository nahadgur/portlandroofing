'use client'
import { useState } from 'react'
import Link from 'next/link'
const money = (n: number) => n.toLocaleString('en-US', {style:'currency',currency:'USD',maximumFractionDigits:0})
export default function RoiCalculator() {
  const [cost,setCost] = useState(15000)
  const [recovery,setRecovery] = useState(50)
  const recovered = cost * recovery / 100
  return <section style={{padding:'1.5rem',background:'var(--bg2)',border:'1px solid var(--bdr)'}}>
    <h2>Explore a resale scenario</h2>
    <p>The starting values are examples. Enter a written replacement bid and a recovery assumption to see the arithmetic. This does not predict a sale price or assess roof condition.</p>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'1rem',margin:'1.5rem 0'}}>
      <label htmlFor="roi-cost">Replacement bid ($)<input id="roi-cost" type="number" min="0" max="1000000" step="100" value={cost} onChange={e=>setCost(Math.max(0,Math.min(1000000,Number(e.target.value))))} style={{display:'block',width:'100%',padding:'.6rem'}} /></label>
      <label htmlFor="roi-recovery">Assumed cost recovered (%)<input id="roi-recovery" type="number" min="0" max="100" value={recovery} onChange={e=>setRecovery(Math.max(0,Math.min(100,Number(e.target.value))))} style={{display:'block',width:'100%',padding:'.6rem'}} /></label>
    </div>
    <div aria-live="polite"><p>Assumed value recovered: <strong>{money(recovered)}</strong></p><p>Cost not recovered in this scenario: <strong>{money(cost-recovered)}</strong></p></div>
    <p>Actual negotiations depend on the property, market, inspection, and buyer. Before deciding to replace, compare a repair assessment with the considerations in <Link href="/guides/roof-replacement-roi-portland/">planning roof work before a sale</Link>.</p>
  </section>
}
