import type { Metadata } from 'next'
import EditorialPage from '@/components/EditorialPage'
import { SITE } from '@/lib/config'
import LeadForm from '@/components/LeadForm'
export const metadata:Metadata={"title": "Request a roofing referral", "description": "Describe the work you are planning. Contractor availability, pricing, and response times vary.",alternates:{canonical:SITE.baseUrl+"/contact/"}}
const sections=[
  {
    "heading": "Before you submit",
    "body": "Portland OR Roofing is an information and referral website. Your project details may be passed to referral partners or contractors for follow-up. Confirm who will perform the work and review their quote before hiring."
  },
  {
    "heading": "Prepare the project details",
    "body": "Describe the roof type, current problem, location, and preferred timing. If you are comparing [repair and replacement](/services/), ask for the condition evidence behind each recommendation. Check the [contractor’s license](/blog/how-to-check-an-oregon-ccb-license/) before agreeing to work."
  }
]
export default function Page(){return <EditorialPage title="Request a roofing referral" description="Describe the work you are planning. Contractor availability, pricing, and response times vary." imageUrl="/images/hero-services-hub.jpeg" sections={sections}><LeadForm /></EditorialPage>}
