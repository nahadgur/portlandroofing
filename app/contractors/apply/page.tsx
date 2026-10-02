import type { Metadata } from 'next'
import EditorialPage from '@/components/EditorialPage'
import { SITE } from '@/lib/config'
import ContractorApplyForm from '@/components/ContractorApplyForm'
export const metadata:Metadata={"title": "Contractor enquiries", "description": "Provide your business details and service area for a potential referral relationship.",alternates:{canonical:SITE.baseUrl+"/contractors/apply/"}}
const sections=[
  {
    "heading": "What to provide",
    "body": "Include the legal business name, Oregon CCB number, contact details, and the types of roofing work you perform. Submitting an enquiry does not establish approval, exclusivity, a guaranteed number of leads, or a response deadline."
  },
  {
    "heading": "What homeowners should check",
    "body": "Homeowners can use the [contractor checklist](/contractors/vetting/) to review credentials and the scope before hiring. Keep your license and insurance information current and make the written terms of your work available."
  }
]
export default function Page(){return <EditorialPage title="Contractor enquiries" description="Provide your business details and service area for a potential referral relationship." imageUrl="/images/hero-services-hub.jpeg" sections={sections}><ContractorApplyForm /></EditorialPage>}
