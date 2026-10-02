import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import EditorialPage from '@/components/EditorialPage'
import { getNeighborhoodBySlug, getStaticNeighborhoodPaths } from '@/lib/neighborhoods'
import { getNeighborhoodImage } from '@/lib/neighborhoodImages'
import { SITE } from '@/lib/config'
export const dynamicParams = false
export function generateStaticParams() { return getStaticNeighborhoodPaths() }
export function generateMetadata({params}:{params:{neighborhood:string}}):Metadata {
  const n=getNeighborhoodBySlug(params.neighborhood)
  if(!n) return {}
  return {title:`Roofing in ${n.name}: Repairs, Replacement & Planning`,description:n.description,alternates:{canonical:`${SITE.baseUrl}/portland/${n.slug}/`}}
}
export default function NeighborhoodPage({params}:{params:{neighborhood:string}}) {
  const n=getNeighborhoodBySlug(params.neighborhood)
  if(!n) notFound()
  return <EditorialPage title={`Roofing in ${n.name}`} description={n.description} imageUrl={getNeighborhoodImage(n.slug)} sections={[
    {heading:n.focus,body:n.paragraphs.join('\n\n')},
    {heading:'Check permits for the property and work',body:'Use the [permit planning guide](/tools/permit-lookup/) to identify the information your permitting office needs. Confirm the jurisdiction, building type, proposed material, structural changes, and any solar work. Ask about historic or other property-specific reviews separately. A neighborhood name does not establish the fee or approval schedule.'},
    {heading:'Compare bids with the same scope',body:`Use the [${n.name} quote worksheet](/pdx-cost-index/${n.slug}/) to organize contractor estimates. Compare quantities, exclusions, hidden-damage allowances, and access costs before comparing totals. A price from another house may cover a different roof assembly or amount of work.`},
    {heading:'Check who will perform the work',body:'Before [choosing a contractor](/guides/how-to-choose-roofing-contractor-oregon/), match the business name on the bid to its license record. Ask who supervises the installation, how changes need approval, and who handles warranty calls. This site provides information and referrals; the contractor is responsible for the work you agree with them.'},
  ]} />
}
