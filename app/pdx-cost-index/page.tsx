import type { Metadata } from 'next'
import EditorialPage from '@/components/EditorialPage'
import { neighborhoods } from '@/lib/neighborhoods'
import { SITE } from '@/lib/config'
export const metadata:Metadata={title:'Portland Roofing Costs: Quote Planning',description:'Compare roofing bids and use illustrative budget calculators. Local quote worksheets for Portland-area homeowners.',alternates:{canonical:`${SITE.baseUrl}/pdx-cost-index/`}}
export default function CostIndexPage(){return <EditorialPage title="Portland roofing costs" description="Organize contractor bids and compare the scope behind the total. We do not publish a verified Portland price index." imageUrl="/images/hero-cost-index.jpeg" sections={[
{heading:'Start with the same scope',body:'Use a [quote comparison checklist](/blog/portland-roofing-quote-data-2026/) to align roof measurements, product specifications, disposal, and allowances. The [cost calculator](/tools/cost-calculator/) shows illustrative scenarios; it does not substitute for a site inspection or written bid.'},
...neighborhoods.map(n=>({heading:n.name,body:`For a project in [${n.name}](/portland/${n.slug}/), discuss ${n.focus.toLowerCase()} with each bidder. Use the [${n.name} quote worksheet](/pdx-cost-index/${n.slug}/) to record the scope and exclusions.`}))
]} />}
