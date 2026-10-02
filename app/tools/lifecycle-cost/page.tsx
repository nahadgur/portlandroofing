import type { Metadata } from 'next'
import EditorialPage from '@/components/EditorialPage'
import { SITE } from '@/lib/config'
import LifecycleCost from '@/components/calculators/LifecycleCost'
export const metadata:Metadata={"title": "Compare roofing lifecycle scenarios", "description": "Compare installation, maintenance, and replacement assumptions over time.",alternates:{canonical:SITE.baseUrl+"/tools/lifecycle-cost/"}}
const sections=[
  {
    "heading": "Check every assumption",
    "body": "The default costs, service lives, and maintenance amounts are illustrative. They are not measured local averages or product guarantees. Replace them with the actual bid and manufacturer guidance for the roof you are considering. Compare the installation scopes for [metal](/services/metal-roofing/) and [cedar](/services/cedar-shake-roofing/) before using either scenario."
  }
]
export default function Page(){return <EditorialPage title="Compare roofing lifecycle scenarios" description="Compare installation, maintenance, and replacement assumptions over time." imageUrl="/images/hero-services-hub.jpeg" sections={sections}><LifecycleCost /></EditorialPage>}
