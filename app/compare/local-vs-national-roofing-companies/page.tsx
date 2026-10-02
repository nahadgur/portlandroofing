import type { Metadata } from 'next'
import EditorialPage from '@/components/EditorialPage'
import { SITE } from '@/lib/config'

export const metadata:Metadata={"title": "Compare local and national roofing companies", "description": "Compare the company, crew, scope, and warranty rather than relying on business size.",alternates:{canonical:SITE.baseUrl+"/compare/local-vs-national-roofing-companies/"}}
const sections=[
  {
    "heading": "Identify the company on the contract",
    "body": "A local office, national brand, or franchise name does not establish who is responsible for your work. Match the legal business on the contract to its [Oregon CCB license](/blog/how-to-check-an-oregon-ccb-license/). Ask whether the crew is employed by that company or subcontracted."
  },
  {
    "heading": "Compare project experience",
    "body": "Request references for the same roof assembly and similar access conditions. Ask how the contractor will handle decking, flashing, disposal, and any required approvals. Compare a [replacement scope](/services/roof-replacement/) or [repair scope](/services/roof-repair/) on equal terms across companies."
  },
  {
    "heading": "Read the warranty and scheduling terms",
    "body": "Ask who handles callbacks, how to contact them, and what happens if the installer no longer operates. Confirm [manufacturer warranty requirements](/blog/why-gaf-owens-corning-certification-matters/) for the actual products and contractor. Get availability in writing rather than assuming one company type will respond faster."
  },
  {
    "heading": "Assess the sales process",
    "body": "Give yourself time to review the bid. Pressure to sign, unclear payment terms, and missing documentation deserve follow-up regardless of where the company is based. Use the [hiring guide](/guides/how-to-choose-roofing-contractor-oregon/) to compare the evidence."
  }
]
export default function Page(){return <EditorialPage title="Compare local and national roofing companies" description="Compare the company, crew, scope, and warranty rather than relying on business size." imageUrl="/images/hero-services-hub.jpeg" sections={sections}></EditorialPage>}
