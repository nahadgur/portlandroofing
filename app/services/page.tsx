import type { Metadata } from 'next'
import EditorialPage from '@/components/EditorialPage'
import NeighborhoodGrid from '@/components/NeighborhoodGrid'
import { services } from '@/lib/services'
import { SITE } from '@/lib/config'
export const metadata:Metadata={title:'Portland Roofing Services',description:'Compare roofing repair, replacement, metal, cedar, and flat-roof project scopes in Portland.',alternates:{canonical:`${SITE.baseUrl}/services/`}}
export default function ServicesPage(){return <><EditorialPage title="Portland roofing services" description="Choose the work you are planning and prepare questions for a contractor." sections={services.map(s=>({heading:s.name,body:`${s.intro}\n\nCompare the scope and questions for [${s.name.toLowerCase()}](/services/${s.slug}/) before requesting bids.`}))}><NeighborhoodGrid /></EditorialPage></>}
