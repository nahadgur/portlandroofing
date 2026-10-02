import Link from 'next/link'
export default function TrustStrip({urgency}:{urgency?:'high'|'standard'}) {
 return <p style={{padding:'1rem 2rem',lineHeight:1.7}}>Before hiring, <Link href="/blog/how-to-check-an-oregon-ccb-license/">check the contractor’s license</Link> and review the written scope. {urgency==='high' ? 'Confirm emergency availability with the contractor.' : 'Ask who handles warranty calls.'}</p>
}
