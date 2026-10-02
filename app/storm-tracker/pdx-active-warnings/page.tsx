import type { Metadata } from 'next'
import EditorialPage from '@/components/EditorialPage'
import { SITE } from '@/lib/config'
import StormAlerts from '@/components/StormAlerts'
import LiveWindConditions from '@/components/LiveWindConditions'
export const metadata:Metadata={"title": "Portland weather alerts and storm repair planning", "description": "Check official weather information, document visible damage safely, and plan a roof assessment.",alternates:{canonical:SITE.baseUrl+"/storm-tracker/pdx-active-warnings/"}}
const sections=[
  {
    "heading": "Check the forecast for the actual address",
    "body": "The [National Weather Service Portland office](https://www.weather.gov/pqr/) provides forecasts and warnings. Use its location search for your property. Conditions can differ across the metro; a central Portland forecast does not describe every roof or job site."
  },
  {
    "heading": "After a storm",
    "body": "Stay off a damaged roof and keep clear of fallen lines, unstable branches, and structural damage. Photograph visible damage from a safe place and record when leaks appeared. A [roof repair inspection](/services/roof-repair/) can establish what needs temporary protection and what needs a permanent repair."
  },
  {
    "heading": "Insurance and repair scope",
    "body": "Contact your insurer about the policy, deductible, documentation, and reasonable steps to prevent further damage. Oregon’s [storm insurance guidance](https://dfr.oregon.gov/insure/home/storm/pages/index.aspx) explains how to start that conversation. Keep receipts and a written repair scope; coverage depends on the policy and circumstances.\n\nOur [storm damage documentation guide](/guides/storm-damage-roof-insurance-oregon/) brings those records together. If repairs expand into structural work or replacement, check [the permit requirements for that scope](/blog/do-you-need-a-permit-to-replace-a-roof-in-portland/) before proceeding."
  }
]
export default function Page(){return <EditorialPage title="Portland weather alerts and storm repair planning" description="Check official weather information, document visible damage safely, and plan a roof assessment." sections={sections}><h2>Alerts for central Portland</h2><StormAlerts /><h2 style={{marginTop:'2rem'}}>Central Portland weather model</h2><LiveWindConditions /></EditorialPage>}
