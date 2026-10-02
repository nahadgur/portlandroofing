import type { Metadata } from 'next'
import EditorialPage from '@/components/EditorialPage'
import PermitLookup from '@/components/calculators/PermitLookup'
import { SITE } from '@/lib/config'
export const metadata:Metadata={title:'Portland Roofing Permit Planning',description:'Prepare a project-specific permit enquiry. Check jurisdiction, building type, roofing scope, and historic review with the relevant office.',alternates:{canonical:`${SITE.baseUrl}/tools/permit-lookup/`}}
export default function PermitPage(){return <EditorialPage title="Roofing permit planning" description="Find the right questions and official resources before work starts." sections={[]} imageUrl="/images/hero-services-hub.jpeg"><PermitLookup /></EditorialPage>}
