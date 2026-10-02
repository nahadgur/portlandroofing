import type { Metadata } from 'next'
import EditorialPage from '@/components/EditorialPage'
import { SITE } from '@/lib/config'
import CostCalculatorDeep from '@/components/calculators/CostCalculatorDeep'
export const metadata:Metadata={"title": "Roof replacement cost scenarios", "description": "Explore how roof area and project allowances affect an illustrative budget.",alternates:{canonical:SITE.baseUrl+"/tools/cost-calculator/"}}
const sections=[
  {
    "heading": "What to gather first",
    "body": "Start with measured roof area rather than the floor area of the house. Ask each bidder which removal, decking, flashing, ventilation, and access items are included before entering allowances. The [roofing cost guide](/guides/understanding-oregon-roofing-costs/) explains how to compare those scopes."
  }
]
export default function Page(){return <EditorialPage title="Roof replacement cost scenarios" description="Explore how roof area and project allowances affect an illustrative budget." imageUrl="/images/hero-services-hub.jpeg" sections={sections}><CostCalculatorDeep /></EditorialPage>}
