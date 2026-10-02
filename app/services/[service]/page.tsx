import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import EditorialPage from '@/components/EditorialPage'
import { getServiceBySlug, getStaticServicePaths } from '@/lib/services'
import { SITE } from '@/lib/config'
export const dynamicParams = false
export function generateStaticParams() { return getStaticServicePaths() }
export function generateMetadata({params}:{params:{service:string}}):Metadata {
  const service=getServiceBySlug(params.service)
  if(!service) return {}
  return {title:`${service.name} in Portland`,description:service.description,alternates:{canonical:`${SITE.baseUrl}/services/${service.slug}/`}}
}
export default function ServicePage({params}:{params:{service:string}}) {
  const service=getServiceBySlug(params.service)
  if(!service) notFound()
  return <EditorialPage title={`${service.name} in Portland`} description={service.description} imageUrl="/images/hero-services-hub.jpeg" sections={[...service.sections,{heading:'Choose a contractor for the scope',body:'Before signing, [check the Oregon CCB license](/blog/how-to-check-an-oregon-ccb-license/) and compare the written scope, payment schedule, and warranty. You can [request a roofing referral](/contact/) through this site; confirm the contractor’s credentials and availability before hiring.'}]} />
}
