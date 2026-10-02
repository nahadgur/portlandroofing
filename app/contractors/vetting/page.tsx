import type { Metadata } from 'next'
import EditorialPage from '@/components/EditorialPage'
import { SITE } from '@/lib/config'

export const metadata:Metadata={"title": "Check a roofing contractor before hiring", "description": "Use public records and written project details to assess the company you plan to hire.",alternates:{canonical:SITE.baseUrl+"/contractors/vetting/"}}
const sections=[
  {
    "heading": "Check the business identity",
    "body": "Use the [Oregon CCB consumer tools](https://www.oregon.gov/ccb/pages/consumer-tools.aspx) to check the business name, license status, and available history. Match the record to the company on your bid and contract. Our [license-check guide](/blog/how-to-check-an-oregon-ccb-license/) explains the steps."
  },
  {
    "heading": "Ask for documentation",
    "body": "Request current insurance information, references for comparable work, and the names of the parties responsible for the installation and warranty. Ask the contractor to explain anything in the record that concerns you. A referral from this site does not replace your own checks."
  },
  {
    "heading": "Review the written scope",
    "body": "When [choosing a roofing contractor](/guides/how-to-choose-roofing-contractor-oregon/), compare the work, materials, payment stages, exclusions, and proposed schedule. Ask how changes will need approval and who handles any permits or inspections."
  },
  {
    "heading": "Understand this website’s role",
    "body": "Portland OR Roofing publishes roofing information and provides a referral route. It is not the roofing contractor. We do not publish a verified review score, screening pass rate, or audited contractor roster. Confirm any contractor-specific credentials before signing."
  }
]
export default function Page(){return <EditorialPage title="Check a roofing contractor before hiring" description="Use public records and written project details to assess the company you plan to hire." imageUrl="/images/hero-services-hub.jpeg" sections={sections}></EditorialPage>}
