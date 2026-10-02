import type { Metadata } from 'next'
import EditorialPage from '@/components/EditorialPage'
import { SITE } from '@/lib/config'

export const metadata:Metadata={"title": "Plan roofing and rooftop solar together", "description": "Coordinate roof condition, attachments, approvals, and warranties before committing to either project.",alternates:{canonical:SITE.baseUrl+"/guides/solar-ready-roofing-oregon-incentives/"}}
const sections=[
  {
    "heading": "Check the roof first",
    "body": "Ask the roofing contractor to assess the existing covering and structure. If [roof replacement](/services/roof-replacement/) is under consideration, coordinate its timing with the solar installer so both parties understand the roof assembly and attachment plan."
  },
  {
    "heading": "Assign responsibilities",
    "body": "Put responsibility for penetrations, flashing, removal and reinstallation, leaks, and warranty claims in writing. For [standing-seam metal](/services/metal-roofing/), confirm that the proposed attachment system suits the specific panel and manufacturer requirements."
  },
  {
    "heading": "Confirm approvals and current incentives",
    "body": "Include solar work in your [permit enquiry](/tools/permit-lookup/). Ask the solar provider to identify any proposed incentive, its official eligibility rules, and how it appears in the contract. We do not quote incentive amounts or tax eligibility here; confirm the current terms for your circumstances before budgeting."
  }
]
export default function Page(){return <EditorialPage title="Plan roofing and rooftop solar together" description="Coordinate roof condition, attachments, approvals, and warranties before committing to either project." imageUrl="/images/hero-services-hub.jpeg" sections={sections}></EditorialPage>}
