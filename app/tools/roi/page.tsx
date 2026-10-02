import type { Metadata } from 'next'
import EditorialPage from '@/components/EditorialPage'
import { SITE } from '@/lib/config'
import RoiCalculator from '@/components/calculators/RoiCalculator'
export const metadata:Metadata={"title": "Roof replacement resale scenarios", "description": "Explore assumed resale recovery, then discuss your property with a local real estate professional.",alternates:{canonical:SITE.baseUrl+"/tools/roi/"}}
const sections=[
  {
    "heading": "Separate assumptions from a valuation",
    "body": "This model uses preset recovery assumptions, not a Portland transaction dataset. The result does not predict a sale price or appraisal. Compare actual roofing bids and consider [repair alternatives](/services/roof-repair/) before committing to replacement."
  }
]
export default function Page(){return <EditorialPage title="Roof replacement resale scenarios" description="Explore assumed resale recovery, then discuss your property with a local real estate professional." imageUrl="/images/hero-services-hub.jpeg" sections={sections}><RoiCalculator /></EditorialPage>}
