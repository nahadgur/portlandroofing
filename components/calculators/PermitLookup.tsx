'use client'
import { useState } from 'react'
import Link from 'next/link'
import { PERMIT_SOURCES } from '@/lib/permitGuidance'
export default function PermitLookup() {
  const [jurisdiction,setJurisdiction]=useState('unknown')
  const [building,setBuilding]=useState('unknown')
  return <div style={{border:'1px solid var(--bdr)',padding:'clamp(1.2rem,4vw,2rem)',fontFamily:'var(--font-barlow)',lineHeight:1.8}}>
    <h2 style={{fontFamily:'var(--font-barlow-cond)',fontSize:'1.5rem'}}>Prepare your permit enquiry</h2>
    <p>This guide does not look up an address or issue a permit decision.</p>
    <label htmlFor="permit-jurisdiction" style={{display:'block',marginTop:'1rem'}}>Permitting jurisdiction</label>
    <select id="permit-jurisdiction" value={jurisdiction} onChange={event=>setJurisdiction(event.target.value)} style={{padding:'.6rem',width:'100%'}}>
      <option value="unknown">I need to confirm the jurisdiction</option><option value="portland">City of Portland</option><option value="other">Another city or county</option>
    </select>
    <label htmlFor="permit-building" style={{display:'block',marginTop:'1rem'}}>Building type</label>
    <select id="permit-building" value={building} onChange={event=>setBuilding(event.target.value)} style={{padding:'.6rem',width:'100%'}}>
      <option value="unknown">I need to confirm the building type</option><option value="house">One- or two-family home</option><option value="townhouse">Townhouse</option><option value="other">Three or more units, or a commercial building</option>
    </select>
    <div aria-live="polite" style={{marginTop:'1.5rem'}}>
      {jurisdiction==='portland' ? <>
        <p>{building==='house' ? 'Portland lists a building-permit exemption for similar-weight reroofing, including existing sheathing replacement. Exceptions and other property requirements still need checking.' : building==='townhouse' ? 'Portland lists townhouse reroofing as work that needs a building permit. Ask the city which application and review requirements apply to your scope.' : 'Ask Portland Permitting and Development to confirm the building classification and requirements for the proposed work.'}</p>
        <p>Check the <a href={PERMIT_SOURCES.residential}>city’s reroofing rules</a> for wildfire-zone dwellings and photovoltaic roof coverings. For a home project, our <Link href="/blog/do-you-need-a-permit-to-replace-a-roof-in-portland/">permit guide</Link> explains the scope questions.</p>
        <p>Check the property in <a href={PERMIT_SOURCES.maps}>PortlandMaps</a>, then ask the city whether <a href={PERMIT_SOURCES.historic}>historic review</a> or another review applies. An exemption from a building permit does not settle zoning requirements.</p>
      </> : <p>Use Oregon’s <a href="https://www.oregon.gov/bcd/lbdd/pages/index.aspx">building department directory</a> to confirm who handles the address. A mailing city or ZIP code alone does not establish jurisdiction.</p>}
      <p>Bring the address, existing and proposed roofing materials, building use, structural changes, and any solar work to the permitting office. Request applicable fees and review timing for that project. Put responsibility for applications and inspections in the contractor agreement.</p>
    </div>
  </div>
}
