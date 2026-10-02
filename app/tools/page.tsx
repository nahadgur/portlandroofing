import type { Metadata } from 'next'
import EditorialPage from '@/components/EditorialPage'
import { SITE } from '@/lib/config'

export const metadata:Metadata={"title": "Roofing planning tools", "description": "Use scenarios and official resources to prepare for contractor conversations.",alternates:{canonical:SITE.baseUrl+"/tools/"}}
const sections=[
  {
    "heading": "Estimate the scope",
    "body": "The [cost calculator](/tools/cost-calculator/) uses illustrative prices and allowances. Use it to understand the calculation, then replace its assumptions with property-specific bids."
  },
  {
    "heading": "Prepare a permit enquiry",
    "body": "The [permit planning guide](/tools/permit-lookup/) helps you identify the jurisdiction, building type, and scope to discuss with the permitting office."
  },
  {
    "heading": "Compare longer-term scenarios",
    "body": "Use the [lifecycle worksheet](/tools/lifecycle-cost/) and [resale worksheet](/tools/roi/) to test assumptions. Their defaults are not observed Portland market data or guaranteed financial outcomes."
  },
  {
    "heading": "Prepare for weather",
    "body": "Use the [wind planning page](/tools/wind-risk/) to organize an inspection conversation and check official alerts before planning work."
  }
]
export default function Page(){return <EditorialPage title="Roofing planning tools" description="Use scenarios and official resources to prepare for contractor conversations." imageUrl="/images/hero-services-hub.jpeg" sections={sections}></EditorialPage>}
