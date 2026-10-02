import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import EditorialPage from '@/components/EditorialPage'
import { getNeighborhoodBySlug, getStaticNeighborhoodPaths } from '@/lib/neighborhoods'
import { SITE } from '@/lib/config'
export function generateStaticParams() { return getStaticNeighborhoodPaths() }
export const dynamicParams=false
export function generateMetadata({params}:{params:{neighborhood:string}}):Metadata {
  const n=getNeighborhoodBySlug(params.neighborhood)
  return n ? {title:`${n.name} Roofing Costs: Compare Your Quotes`,description:`A worksheet for comparing roof replacement and repair bids in ${n.name}.`,alternates:{canonical:`${SITE.baseUrl}/pdx-cost-index/${n.slug}/`}} : {}
}
export default function NeighborhoodCostPage({params}:{params:{neighborhood:string}}) {
  const n=getNeighborhoodBySlug(params.neighborhood)
  if(!n) notFound()
  return <EditorialPage title={`${n.name} roofing costs`} description="Compare property-specific bids. We do not have a verified local price dataset to report a neighborhood average." imageUrl="/images/hero-cost-index.jpeg" sections={[
    {heading:'Collect comparable quotes',body:`Ask each bidder to price the same roof area and assembly. For your [${n.name} roofing project](/portland/${n.slug}/), discuss ${n.focus.toLowerCase()} during the site visit. Keep separate prices for repairs, full replacement, and optional upgrades.`},
    {heading:'Make exclusions visible',body:'Record material quantities, labor, tear-off, decking allowances, flashing, ventilation, disposal, and cleanup. Ask what could change the total and require approval before additional work. Our [quote comparison guide](/blog/portland-roofing-quote-data-2026/) explains how to read those differences.'},
    {heading:'Budget for approvals only when they apply',body:'Use the [permit planning guide](/tools/permit-lookup/) to prepare your questions for the local office. Request project-specific fee information and a current review estimate. Do not add a neighborhood-based permit fee or assume every reroof needs a building permit.'},
    {heading:'Use calculations as scenarios',body:'The [cost calculator](/tools/cost-calculator/) demonstrates how scope assumptions change a budget. Its defaults are illustrative, not observed contractor quotes. Replace the assumptions with written bids before making a purchase decision.'},
  ]} />
}
