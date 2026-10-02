import type { Metadata } from 'next'
import EditorialPage from '@/components/EditorialPage'
import { SITE } from '@/lib/config'

export const metadata:Metadata={"title": "Roofing work on historic Portland properties", "description": "Check the property designation and proposed changes before choosing roof materials.",alternates:{canonical:SITE.baseUrl+"/guides/portland-historic-district-roofing-codes/"}}
const sections=[
  {
    "heading": "Start with the address",
    "body": "Search [PortlandMaps](https://www.portlandmaps.com/) for the property and confirm its designation with the city. Portland’s [historic resource review guidance](https://www.portland.gov/ppd/zoning-land-use/land-use-review-fees-and-types/historic-resource-reviews) explains how to check whether a site is a landmark or within a historic or conservation district. A neighborhood name alone does not establish the applicable review."
  },
  {
    "heading": "Describe the change",
    "body": "Prepare photos of the existing roof, product specifications, and a description of proposed material or profile changes. Ask the city whether the proposal needs review or qualifies for an exemption. Request the applicable process, fees, and current scheduling information for the specific project."
  },
  {
    "heading": "Separate the approvals",
    "body": "Check the [building-permit question](/blog/do-you-need-a-permit-to-replace-a-roof-in-portland/) separately from historic or zoning review. If a private association also applies, obtain its current requirements. Do not assume city approval settles a private agreement, or vice versa."
  },
  {
    "heading": "Compare bids after clarifying the scope",
    "body": "For an [Irvington](/portland/irvington/) or [Eastmoreland](/portland/eastmoreland/) property, ask each bidder to use the same proposed roof details. If [cedar roofing](/services/cedar-shake-roofing/) is under consideration, compare the exact product, installation requirements, and maintenance schedule. Avoid ordering materials until you understand any applicable approvals."
  }
]
export default function Page(){return <EditorialPage title="Roofing work on historic Portland properties" description="Check the property designation and proposed changes before choosing roof materials." imageUrl="/images/hero-services-hub.jpeg" sections={sections}></EditorialPage>}
