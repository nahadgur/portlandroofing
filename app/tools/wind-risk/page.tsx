import type { Metadata } from 'next'
import EditorialPage from '@/components/EditorialPage'
import { SITE } from '@/lib/config'
import WindRisk from '@/components/calculators/WindRisk'
export const metadata:Metadata={"title": "Roof wind exposure: questions for an inspection", "description": "Use property-specific questions to discuss wind exposure and roof condition with a contractor.",alternates:{canonical:SITE.baseUrl+"/tools/wind-risk/"}}
const sections: {heading:string;body:string}[]=[]
export default function Page(){return <EditorialPage title="Roof wind exposure: questions for an inspection" description="Use property-specific questions to discuss wind exposure and roof condition with a contractor." sections={sections}><WindRisk /></EditorialPage>}
