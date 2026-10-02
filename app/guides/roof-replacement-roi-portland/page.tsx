import type { Metadata } from 'next'
import EditorialPage from '@/components/EditorialPage'
import { SITE } from '@/lib/config'

export const metadata:Metadata={"title": "Consider roof work before selling", "description": "Compare the roof\u2019s condition, proposed work, and selling plans without assuming a fixed resale return.",alternates:{canonical:SITE.baseUrl+"/guides/roof-replacement-roi-portland/"}}
const sections=[
  {
    "heading": "Establish the condition",
    "body": "Ask for an inspection and written scope before deciding between [repair and replacement](/services/roof-repair/). Keep photographs and invoices for discussions with prospective buyers and your real estate professional."
  },
  {
    "heading": "Compare the choices",
    "body": "Ask your real estate professional how roof condition may affect the particular listing. Compare repair, replacement, and negotiation options using actual bids. A national resale percentage cannot establish the value added to your home."
  },
  {
    "heading": "Test assumptions",
    "body": "The [resale worksheet](/tools/roi/) illustrates scenarios using assumptions. It does not predict an appraisal or sale price. Include selling costs and the timing of the work when comparing your options."
  }
]
export default function Page(){return <EditorialPage title="Consider roof work before selling" description="Compare the roof\u2019s condition, proposed work, and selling plans without assuming a fixed resale return." imageUrl="/images/hero-services-hub.jpeg" sections={sections}></EditorialPage>}
