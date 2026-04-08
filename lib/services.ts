export interface Service {
  slug:         string
  name:         string
  shortName:    string
  headline:     string
  description:  string
  avgLow:       number
  avgHigh:      number
  avgMid:       number
  unit:         string
  urgency:      'standard' | 'high'
  intro:        string   // {neighborhood} injected
  whySection:   string   // {neighborhood} injected
  processSteps: string[]
  materials:    string[]
  warningNote?: string
}

export const services: Service[] = [
  {
    slug:'roof-replacement', name:'Roof Replacement', shortName:'Replacement',
    headline:'Roof Replacement',
    description:'Find vetted roof replacement contractors in {neighborhood}, Portland {zip}. Average cost ${avgMid}. Free quotes within 48 hours — licensed Oregon CCB contractors only.',
    avgLow:6500, avgHigh:16000, avgMid:9400, unit:'per project', urgency:'standard',
    intro:`A full roof replacement in {neighborhood} is one of the largest single investments a homeowner makes — and one of the most consequential. Done right with the correct material for Portland's climate and the specific permit requirements of {neighborhood}, a replacement should give you 25–50 years without a second thought. Done wrong, you're dealing with callbacks, moisture damage, and a contractor dispute before the warranty period is even halfway through.`,
    whySection:`{neighborhood} sits within Portland's Bureau of Development Services jurisdiction. Every full roof replacement requires a permit, and the complexity of that process varies by zone. Understanding your specific permit situation in {neighborhood} before you sign a contract is the most important thing you can do to protect your timeline and budget. Our Permit Difficulty Score for {neighborhood} is shown above — read it before you approach a contractor.`,
    processSteps:[
      'Submit your zip code and roof details through our form',
      'Receive matched quotes from vetted CCB-licensed contractors within 48 hours',
      'Review quotes, verify contractor CCB status at oregon.gov/ccb',
      'Confirm permit requirements for your specific property at portlandmaps.com',
      'Sign contract with permit timeline built in — not just labour timeline',
      'Post-completion BDS inspection sign-off',
    ],
    materials:['Architectural asphalt shingles (most common in PDX)','Class 4 impact-resistant asphalt','Standing-seam metal (best long-term ROI)','Cedar shake (historic districts)','Flat / TPO (commercial and modern builds)'],
    warningNote:'Never accept a contractor offer to skip the permit to save time. Unpermitted roofing work voids homeowner insurance coverage for related claims and creates disclosure obligations when you sell.',
  },
  {
    slug:'roof-repair', name:'Roof Repair', shortName:'Repair',
    headline:'Roof Repair',
    description:'Emergency and non-emergency roof repair in {neighborhood}, Portland {zip}. Licensed Oregon CCB contractors. Same-week slots available for active leaks. Free assessment.',
    avgLow:350, avgHigh:4500, avgMid:1200, unit:'per repair', urgency:'high',
    intro:`Roof repairs in {neighborhood} range from a straightforward shingle replacement after a wind event to complex flashing failures around chimneys and skylights that have been allowing slow water ingress for months. The cost difference between catching a repair early and finding it after it's damaged decking, insulation, and interior finishes is usually $3,000–$8,000. Portland's wet winters make this a time-sensitive calculation.`,
    whySection:`Minor repairs in {neighborhood} — patching shingles, re-sealing flashing, replacing a few damaged tiles — generally do not require a permit. Any repair covering more than 25% of the roof area crosses into permit territory. {neighborhood}'s permit environment is described above. If you're not sure whether your repair scope requires a permit, confirm with BDS before work starts — getting this wrong means stop-work orders and fines.`,
    processSteps:[
      'Describe the issue — active leak, wind damage, missing shingles, flashing failure',
      'Get matched with contractors available for your timeline (emergency or standard)',
      'Receive assessment — most Portland contractors inspect at no charge',
      'Confirm scope: repair vs partial replacement vs full replacement recommendation',
      'Permit check: confirm whether your repair scope requires BDS notification',
      'Repair completed with written warranty on workmanship',
    ],
    materials:['Matching asphalt shingles (colour-match critical on partial repairs)','Lead and aluminium flashing','Roofing cement and sealants','Ice-and-water shield for valley repairs','Synthetic underlayment'],
    warningNote:'If you have an active leak, get a tarp on the roof within 24–48 hours before a contractor can assess. Emergency tarping is covered by most homeowner policies as mitigation and prevents secondary damage to insulation and ceilings.',
  },
  {
    slug:'metal-roofing', name:'Metal Roofing', shortName:'Metal Roofing',
    headline:'Metal Roofing',
    description:'Metal roofing installation in {neighborhood}, Portland {zip}. Standing seam and corrugated metal specialists. Average cost ${avgMid}. 50+ year lifespan. Free quotes.',
    avgLow:9000, avgHigh:24000, avgMid:16500, unit:'per project', urgency:'standard',
    intro:`Metal roofing in {neighborhood} is the premium option — and on a per-year basis, typically the most cost-effective one. Portland's 144 annual rain days create a climate where metal's core advantage is decisive: instant water shedding, zero absorption, and no moss risk. A standing-seam metal roof installed in {neighborhood} this year should still be performing at 50 years.`,
    whySection:`The metal contractor pool serving {neighborhood} is smaller than the asphalt pool. There are excellent metal roofing specialists in the Portland metro — but there are also general roofers who've added metal to their service list without adequate training. A poorly installed standing-seam roof in {neighborhood} fails faster than asphalt. Thermal expansion allowance, panel alignment, and ridge and valley flashing details are where inexperienced installers create problems. Vet metal contractors with more scrutiny than you'd apply to an asphalt quote. Our platform only lists contractors who've demonstrated standing-seam experience specifically.`,
    processSteps:[
      'Confirm metal is appropriate for your property — pitch, structure, permit zone in {neighborhood}',
      'In historic districts, submit colour and profile samples to BDS historic review before ordering materials',
      'Get quotes from metal-specialist contractors only — verify standing-seam experience specifically',
      'Confirm warranty: panel manufacturer warranty separate from installer workmanship warranty',
      'Review permit timeline — engineer-stamped drawings may be required in high-wind or slope zones',
      'Installation typically takes 3–5 days for a standard residential roof',
    ],
    materials:['Standing-seam panels (Galvalume, Corten, pre-painted steel)','Corrugated metal (agricultural profile — less common in residential)','Aluminium (lighter, non-corrosive, premium cost)','Copper (historic and luxury applications)','Stone-coated steel tiles (mid-range metal alternative)'],
    warningNote:'In high-wind zones — West Hills, Alameda Ridge, Council Crest, Forest Park — ask your metal contractor specifically about wind-uplift testing ratings for the panel system they propose. Not all standing-seam profiles perform equally in 50+ mph conditions.',
  },
  {
    slug:'cedar-shake-roofing', name:'Cedar Shake Roofing', shortName:'Cedar Shake',
    headline:'Cedar Shake Roofing',
    description:'Cedar shake roofing installation and replacement in {neighborhood}, Portland {zip}. Historic district specialists. Average cost ${avgMid}. Oregon CCB-licensed contractors.',
    avgLow:11000, avgHigh:19000, avgMid:14500, unit:'per project', urgency:'standard',
    intro:`Cedar shake roofing in {neighborhood} occupies a specific market position: it's the material of choice for Portland's historic housing stock, required by preservation guidelines in several key neighbourhoods, and genuinely beautiful when properly installed and maintained. It's also the material with the steepest learning curve for contractors and the most demanding maintenance requirements in Portland's wet climate.`,
    whySection:`Portland's Historic Conservation Districts — which may include or border {neighborhood} — have varying requirements for cedar shake. In some districts, cedar replacement-in-kind is approved as routine. In others, any material change triggers a Type II Historic Resource Review regardless of whether you're replacing cedar with cedar. The Permit Difficulty Score shown above for {neighborhood} reflects this. Confirm your property's specific requirements at portlandmaps.com before signing anything, and before a contractor orders materials.`,
    processSteps:[
      'Confirm cedar shake requirements or restrictions for your specific property at portlandmaps.com',
      'In historic districts: initiate Type II Historic Resource Review before contracting (4–6 week process)',
      'Source Western red cedar — Oregon and Washington suppliers preferred for climate-matched wood',
      'Confirm contractor has documented cedar shake installation experience and references in {neighborhood} or comparable zones',
      'Budget for pressure-treating or factory pre-treatment — extends lifespan in PDX wet climate',
      'Annual maintenance schedule: inspect spring and fall, treat for moss every 3–5 years',
    ],
    materials:['Western red cedar shakes (hand-split or sawn)','Cedar shingles (thinner, smoother profile than shakes)','Pressure-treated cedar (extended lifespan in wet climates)','Synthetic cedar alternatives (Class A fire-rated — may be required in WUI zones)','Underlayment: breathable synthetic required under cedar in PDX'],
    warningNote:"Cedar shake in Portland's climate requires active maintenance. Without biennial moss treatment and prompt repair of cracked or cupped shakes, a 25-year rated product can fail in 14–18 years. Factor maintenance costs into your total cost of ownership comparison against metal or premium asphalt.",
  },
  {
    slug:'flat-roofing', name:'Flat Roof & TPO', shortName:'Flat Roofing',
    headline:'Flat Roofing & TPO',
    description:'Flat roof replacement and TPO installation in {neighborhood}, Portland {zip}. Commercial and residential flat roofing specialists. Average cost ${avgMid}. Free assessment.',
    avgLow:5500, avgHigh:12000, avgMid:7800, unit:'per project', urgency:'high',
    intro:`Flat roofing in {neighborhood} is most commonly found on commercial buildings, modern residential builds, and older bungalows with low-slope porch or addition roofs. The membrane systems that work in drier climates need to work harder in Portland's extended wet season — proper drainage design and membrane quality are non-negotiable here in a way they aren't in Phoenix or Denver.`,
    whySection:`Portland flat roofs in {neighborhood} need annual inspection — not because they're inherently unreliable, but because Portland's rain volume means a small drainage problem that would go unnoticed in a drier climate becomes a major moisture event here. The inspection cost is $150–$300. The cost of discovering a five-year-old slow leak through your ceiling in {neighborhood} is $8,000–$20,000. One annual check eliminates that risk entirely.`,
    processSteps:[
      'Assessment: determine membrane type, age, and condition (TPO, EPDM, modified bitumen, built-up)',
      'Drainage audit: confirm all drains and scuppers are clear and correctly positioned',
      'For commercial properties in {neighborhood}: confirm commercial permit class vs residential permit',
      'Get quotes from flat-roof specialists — not all pitched-roof roofers have flat-roof experience',
      'Confirm warranty: TPO membrane manufacturers typically offer 15–20 year warranties on certified installations',
      'Schedule annual inspections in September before rain season begins',
    ],
    materials:['TPO (thermoplastic polyolefin) — most common in PDX commercial','EPDM (synthetic rubber) — residential and light commercial','Modified bitumen — older system, still common on mid-century builds','Built-up roofing (BUR / tar and gravel) — being replaced but still encountered','PVC membrane — premium option, excellent chemical resistance'],
    warningNote:"In Portland, flat roofs require correct drainage slope — minimum 1/4 inch per foot to drains. A roof that pools standing water 48 hours after rain is failing. Address drainage as part of any membrane replacement, not after.",
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug)
}

export function getStaticServicePaths() {
  return services.map(s => ({ service: s.slug }))
}
