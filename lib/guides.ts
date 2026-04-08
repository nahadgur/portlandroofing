export type GuideCategory = 'materials' | 'emergency' | 'permits' | 'costs' | 'maintenance'

export interface GuideSection {
  heading: string
  body:    string
}

export interface Guide {
  slug:        string
  title:       string
  headline:    string
  description: string
  published:   string
  readTime:    number
  category:    GuideCategory
  featured:    boolean
  sections:    GuideSection[]
  faqs:        Array<{ q: string; a: string }>
}

export const categoryLabels: Record<GuideCategory, string> = {
  materials:   'Materials',
  emergency:   'Emergency',
  permits:     'Permits & Compliance',
  costs:       'Costs & Budgeting',
  maintenance: 'Maintenance',
}

export const guides: Guide[] = [

  // ── GUIDE 1 ─────────────────────────────────────────────────────────────────

  {
    slug:        'metal-vs-asphalt-portland',
    title:       'Metal Roofing vs Asphalt Shingles in Portland: A Data-Based Comparison',
    headline:    'Metal vs Asphalt in Portland',
    description: 'A cost, lifespan, and performance comparison of metal roofing and asphalt shingles specific to Portland\'s climate. Includes 2026 installation cost data, break-even analysis, and permit considerations for historic districts.',
    published:   '2026-01-15',
    readTime:    12,
    category:    'materials',
    featured:    true,
    sections: [
      {
        heading: 'Why Portland\'s Climate Changes the Calculus',
        body: 'National roofing comparisons between metal and asphalt are primarily calibrated to southern and midwestern climates where UV degradation, hail, and thermal cycling dominate. Portland\'s degradation profile is different. The primary stressors here are sustained moisture (144+ rain days annually), biological growth (moss, algae, lichen), and moderate thermal cycling — not UV or hail. This changes the relative performance of both materials. Asphalt shingles in Portland degrade faster than their rated lifespan suggests because the manufacturer\'s ratings assume average US climate conditions. A 30-year architectural shingle achieves 18–24 years in Portland when maintained, and 14–18 years without moss treatment in high-canopy neighborhoods. Metal roofing performs comparatively better in Portland than the national average would suggest. The primary failure mode for metal — thermal expansion stress on seam fasteners — is lower in Portland\'s mild-temperature climate than in markets with severe winter-summer temperature swings. A properly installed standing-seam metal roof can achieve 50+ years in Portland conditions with no maintenance beyond annual gutter clearing.',
      },
      {
        heading: 'Asphalt Shingles in Portland: The Honest Assessment',
        body: 'Architectural asphalt shingles (30-year rated, dimensional) remain the dominant material in Portland at 61% of installations. The case for asphalt is straightforward: lower upfront cost ($7,500–$12,000 for a standard Portland replacement vs. $16,000–$22,000 for metal), abundant contractor availability (reducing both cost and scheduling lead time), and performance that is adequate for the majority of Portland homeowners who will sell or significantly renovate within 20 years. The case against asphalt in Portland specifically is the maintenance burden. Asphalt is porous and provides an ideal surface for moss colonization. Without annual to biennial moss treatment ($300–$550 per treatment), moss significantly accelerates granule loss and can reduce effective lifespan by 3–5 years. Class 4 impact-resistant asphalt shingles (e.g., CertainTeed Landmark IR, GAF Timberline HDZ) address granule adhesion through modified polymer matrices. They carry a 5–12% cost premium over standard architectural and are worth considering in Irvington, Alameda, and West Hills properties with established moss history. 3-tab shingles are not appropriate for new Portland installations — their lifespan of 12–16 years in this climate does not justify the marginal cost savings over architectural.',
      },
      {
        heading: 'Metal Roofing in Portland: When It Makes Sense',
        body: 'Standing-seam metal roofing represents 21% of Portland new installations in 2026, up from 15% in 2024. The growth is concentrated in specific demographics: homeowners with 15+ year remaining tenure, properties in the West Hills and Lake Oswego premium tier, and new construction where 50-year product warranties align with developer marketing. Metal\'s performance advantages in Portland are meaningful. Zero moss susceptibility — the non-porous metal surface does not support biological growth, eliminating the primary maintenance cost of asphalt. Longevity — 50–60 years for Galvalume standing-seam in Portland conditions. This compares to two full asphalt replacement cycles over the same period. Fire resistance — Class A rated, relevant in the wildland-urban interface zones of Forest Park adjacent properties. The counterarguments are cost ($16,000–$22,000 vs. $9,400 for asphalt on the same home) and contractor availability. The Portland metro has 31 CCB-certified contractors with active metal roofing specialization, compared to 200+ for asphalt. This supply constraint affects both pricing and scheduling. For homeowners not planning to remain in the property 15+ years, the break-even math rarely supports metal over asphalt.',
      },
      {
        heading: 'Break-Even Analysis for Portland Homeowners',
        body: 'The break-even point between metal and asphalt can be calculated for any Portland property. Assume: Metal installation cost: $19,000 (mid-range Portland quote). Asphalt installation cost: $9,400. Premium: $9,600. Over the 50-year lifespan of the metal roof, the homeowner would otherwise install asphalt twice at today\'s cost: 2 × $9,400 = $18,800. Asphalt maintenance (moss treatment every 3 years at $400): 15 treatments over 45 years = $6,000. Total asphalt cost of ownership over 50 years: $24,800. Metal cost of ownership over 50 years: $19,000 (zero maintenance). Metal saves $5,800 over 50 years in this scenario — a modest advantage that narrows significantly if the homeowner sells within 25 years. At 25-year horizon: metal cost $19,000, asphalt cost $9,400 + 8 maintenance treatments ($3,200) = $12,600. Metal is $6,400 more expensive at the 25-year mark. The financial case for metal only clearly emerges at 30–35+ year horizons. The non-financial case — reduced maintenance burden, fire resistance, and the aesthetic preferences of a segment of buyers — is the more common driver of metal adoption in Portland.',
      },
      {
        heading: 'Portland Permit and Historic District Considerations',
        body: 'Metal roofing requires a standard BDS residential permit in most Portland neighborhoods. Two situations create additional complexity. Properties in Portland Historic Conservation Districts (Irvington, Sellwood, Woodstock, others) or Historic Landmark Districts (Ladd\'s Addition, Alphabet District) require historic resource review for material changes. Metal roofing on primary street-facing slopes in these areas has lower approval rates than asphalt or synthetic wood alternatives. Type II review adds 3–6 weeks and $1,147–$2,294 in permit fees. West Hills properties on slopes exceeding 7:12 in the Landslide Hazard Zone require structural review with engineer-stamped drawings for metal installation, adding $350–$700 and 2–3 weeks to the permit process. Outside historic districts and on standard slopes, the permit process for metal is identical to asphalt: standard BDS roofing permit ($180–$310 depending on project value), single inspection, 5–9 business day processing.',
      },
    ],
    faqs: [
      {
        q: 'Does metal roofing increase home resale value in Portland?',
        a: 'The data is mixed. Metal roofing adds measurable value in the Lake Oswego, West Hills, and premium NE Portland markets where buyers have longer expected tenure and value the maintenance-free proposition. In standard Portland neighborhoods, appraisers and buyers typically value the roof at replacement cost regardless of material — meaning metal does not consistently recover its premium over asphalt in resale.',
      },
      {
        q: 'Is metal roofing louder in rain than asphalt?',
        a: 'On residential applications with standard roof decking and attic insulation, metal roofing is not meaningfully louder than asphalt during rain. The "loud metal roof" perception primarily applies to agricultural buildings with no decking or insulation directly under the panel. On a standard Portland residential installation with OSB deck, synthetic underlayment, and attic insulation, sound transmission difference vs. asphalt is negligible.',
      },
      {
        q: 'Can I install metal over my existing asphalt shingles?',
        a: 'In most cases, yes — metal can be installed over one existing layer of asphalt using furring strips or a direct-over system. Portland BDS permits this if the existing deck is structurally sound. Installing over two existing shingle layers is not permitted under Oregon Residential Specialty Code and requires tear-off. The "over existing" approach saves $800–$1,400 in tear-off cost but limits future inspection access to the deck and may affect manufacturer warranty terms.',
      },
      {
        q: 'What is the best metal roofing material for Portland specifically?',
        a: 'For Portland residential applications, Galvalume steel standing-seam (26-gauge minimum) is the standard recommendation. Galvalume\'s aluminum-zinc alloy coating outperforms straight galvanized steel in wet environments. Aluminum panels are appropriate for coastal properties within 5 miles of salt air (Astoria, Seaside) but unnecessary in Portland proper. Copper and zinc panels are used in historic district premium applications where appearance warrants the significant cost premium ($28–$45/sq ft vs. $8–$14/sq ft for Galvalume).',
      },
    ],
  },

  // ── GUIDE 2 ─────────────────────────────────────────────────────────────────

  {
    slug:        'storm-damage-roofing-portland',
    title:       'Portland Storm Damage Roofing Guide: What to Do in the First 72 Hours',
    headline:    'Storm Damage Response Guide',
    description: 'A step-by-step guide for Portland homeowners dealing with roof damage from wind, falling trees, or hail. Covers damage documentation, emergency tarping, insurance claims, and how to avoid post-storm contractor fraud.',
    published:   '2026-02-01',
    readTime:    10,
    category:    'emergency',
    featured:    true,
    sections: [
      {
        heading: 'Portland\'s Storm Season: What to Expect',
        body: 'Portland experiences two primary storm types that cause roof damage. Wind events, primarily November through April, driven by Pacific low-pressure systems. The most damaging typically occur when warm, moist Pineapple Express systems collide with cold continental air. Portland International Airport has recorded gusts exceeding 60 mph in 8 of the last 10 years. The West Hills, exposed ridge properties, and properties with mature trees are highest risk — falling limbs cause 40–50% of storm roofing claims in the metro. The second type is the freeze-thaw ice event, which occurs 3–8 times per winter in Portland. Rapid freezing of standing water in gutters and on low-slope roof sections creates ice dams, which can force water under shingles as the ice melts. This mechanism is responsible for the majority of attic moisture intrusion claims in the February–March period. Portland does not have a significant hail problem relative to midwest markets — true hail damage requiring replacement-level claims occurs in fewer than 5% of storm seasons. Most Portland "hail" events produce marble-size or smaller ice that causes minimal damage to architectural shingles.',
      },
      {
        heading: 'First 48 Hours: Immediate Actions',
        body: 'The first 48 hours after storm damage determine whether the damage remains limited to roofing surfaces or expands to structural framing, insulation, and interior finishes. Priority one is preventing water intrusion. If you can safely observe the roof from ground level and see displaced shingles, removed sections, or punctures from falling debris, assume water can enter during the next rain event. Do not access the roof yourself — wet roofing surfaces with disrupted drainage patterns are a slip hazard regardless of slope. Call a licensed contractor for emergency tarping. Emergency tarping by a licensed contractor costs $350–$750 and should be performed within 24 hours if weather permits. Document everything before any work begins. Walk the property perimeter and photograph every roof surface visible from the ground, all debris on the roof or around the foundation, and any visible interior symptoms (water staining on ceilings, damp attic insulation). Date-stamp your photos — phone cameras embed GPS and timestamp in image metadata. Contact your insurance carrier within 24 hours. Most policies require prompt notification. "Prompt" is defined in Oregon as within a reasonable time, but same-week notification is best practice. Your claim number and assigned adjuster are needed before contractor repairs begin.',
      },
      {
        heading: 'Damage Documentation: What Insurance Requires',
        body: 'Insurance adjusters are trained to identify pre-existing conditions, deferred maintenance, and scope creep in storm claims. Thorough homeowner documentation reduces disputes. Required documentation for a complete claim: exterior photos at ground level showing each roof plane, date and time stamped; close-up photos of each discrete damage point; interior attic inspection photos showing any moisture penetration, wet insulation, or staining on decking; weather data for your specific zip code on the event date (Weather.gov historical data or Weather Underground Personal Weather Station network); and the original installation date of the current roof if available (this establishes age and depreciation basis). Your insurance policy likely has an Actual Cash Value (ACV) clause that depreciates the payout based on roof age, or a Replacement Cost Value (RCV) clause that pays full replacement. Know which you have. ACV policies pay significantly less for roofs over 15 years old — a $14,000 replacement on a 20-year-old asphalt roof may yield a $6,000–$8,000 payout under ACV. Oregon does not mandate RCV coverage for residential policies, though it is available as a rider.',
      },
      {
        heading: 'Emergency Tarping: Standards and Cost',
        body: 'Emergency tarping is temporary weather protection applied to a damaged roof surface until permanent repairs can be performed. Standards matter. An adequate emergency tarp is a minimum 6-mil polyethylene tarp extending at least 3 feet beyond each side of the damage and secured to the ridge with wooden battens or sandbags at the ridge and weighted at the eaves. A tarp stapled directly to shingles without battens will not survive the next wind event and provides false security. Cost for contractor-installed tarping in Portland: $350–$450 for a single damage area (up to 200 sq ft coverage). $550–$750 for whole-section tarping (covering one full roof slope). $900–$1,400 for whole-roof emergency protection. Emergency tarping is typically covered by insurance as a protective measure — retain your receipt. Some contractors perform emergency tarping at no charge when engaged for the permanent repair. If a contractor charges $1,500+ for tarping alone before any permanent repair agreement, this is a red flag.',
      },
      {
        heading: 'Post-Storm Contractor Fraud: What to Watch For',
        body: 'Storm events reliably produce a surge in unlicensed "storm chasers" canvassing Portland neighborhoods. These operations follow storm damage patterns, pressure homeowners into signing contracts immediately, and frequently take deposits without completing work. Three verification steps before signing anything: verify the CCB license number at search.ccb.state.or.us (not the number on the business card — type it directly into the state database), confirm the contractor has a Portland-area physical address and established Google Business Profile (not a newly created profile), and do not sign a Direction to Pay assignment that allows the contractor to receive insurance proceeds directly without your involvement in the process. Do not accept verbal assurances that a contractor "works with your insurance" — this is not a protection mechanism. Oregon law (ORS 746.290) prohibits public adjusters and contractors from splitting fees with adjusters or providing financial incentives to steer claims. A contractor who offers to waive your deductible in exchange for signing a contract is offering something illegal under Oregon insurance regulations — this is a disqualifying condition.',
      },
      {
        heading: 'Navigating the Insurance Claim Process',
        body: 'After documentation and initial mitigation, the insurance claim process follows a standard sequence. Claims notification to carrier (Day 1–2). Adjuster assignment and scheduling (Day 3–7). Adjuster inspection with contractor present if possible (Day 7–14). Claim decision and initial payment offer (Day 14–30). Scope dispute and supplemental negotiation if needed (Day 30–60). Contractor selection and scheduling (following claim agreement). For most Portland storm claims, the process from initial notification to repair completion runs 30–60 days for standard wind damage, 60–90 days when tree removal is involved (separate claim component), and 90–120 days for complex multi-system damage. You are not required to accept the first claim offer. Oregon Insurance Division data shows that homeowners who submit a complete competing estimate from a licensed contractor receive upward adjustments on approximately 35% of initially-disputed claims. The dispute process is a negotiation, not an adversarial proceeding — most claims are resolved without formal appraisal or litigation.',
      },
    ],
    faqs: [
      {
        q: 'Does my Portland homeowner insurance cover moss damage?',
        a: 'No. Standard homeowner policies cover sudden and accidental damage. Moss damage is a maintenance issue that develops gradually — it is explicitly excluded as a "wear and tear" or "deterioration" exclusion in standard policy language. Moss treatment and the accelerated shingle degradation it causes are homeowner responsibility, not insurance-covered events.',
      },
      {
        q: 'A tree fell on my Portland home — is the damage covered?',
        a: 'Yes, in most cases. Fallen tree damage to a structure is covered under the dwelling coverage of a standard homeowner policy, subject to your deductible. The tree removal itself is typically covered up to a separate sublimit ($500–$1,500 in most Oregon policies) only if the tree damaged a covered structure. A tree that fell in the yard without hitting the house is typically not a covered removal event.',
      },
      {
        q: 'Can I repair my own roof after storm damage in Portland?',
        a: 'Homeowners may perform minor repairs on their own properties without a CCB license. However, Portland BDS requires a permit for repairs involving more than 25% of a roof surface, and insurance claims for self-performed work face significant documentation burdens. For insurance claim purposes, documented contractor invoices are the standard evidence of repair cost — self-performed work does not establish a reimbursable cost basis in most claim contexts.',
      },
    ],
  },

  // ── GUIDE 3 ─────────────────────────────────────────────────────────────────

  {
    slug:        'portland-roofing-permits-guide',
    title:       'Portland Roofing Permits: A Complete Guide to BDS Requirements in 2026',
    headline:    'Portland Roofing Permits Guide',
    description: 'Everything Portland homeowners need to know about roofing permits: when they\'re required, what the Bureau of Development Services process involves, historic district rules, permit costs, and what happens if you skip the permit.',
    published:   '2026-01-20',
    readTime:    11,
    category:    'permits',
    featured:    false,
    sections: [
      {
        heading: 'When a Portland Roofing Permit Is Required',
        body: 'Portland Bureau of Development Services (BDS) requires a building permit for any roofing work that involves replacement or alteration of more than 25% of a roof surface area. This threshold is measured by the total roof area of the structure, not the area of any individual slope. A standard full replacement always requires a permit. Minor repairs involving isolated shingle replacement or spot flashing repair below the 25% threshold do not require a permit. Emergency tarping does not require a permit. Permit requirements apply to the work, not the contractor — even if you perform work yourself as a homeowner, you are subject to the permit requirement if the scope exceeds the 25% threshold. Contractors who offer to perform roofing work without pulling a permit as a cost-saving measure are offering a service that creates legal and financial risk for the homeowner. Unpermitted roofing work discovered during a property sale can require remediation at seller expense and may constitute a disclosure failure under Oregon property law.',
      },
      {
        heading: 'Portland Bureau of Development Services: How It Works',
        body: 'BDS is the City of Portland agency responsible for issuing building, plumbing, mechanical, and electrical permits. The roofing permit process falls under Building Permits. As of 2026, BDS processes residential roofing permits through its online ePlans system. Applications are submitted with: property address, project description (replacement vs repair, material type, square footage), contractor CCB number and contact information, and a simple site plan for properties where roof drainage patterns affect neighboring properties. Current BDS processing time for standard residential roofing permits is 5–9 business days. Expedited review ($196 additional fee) reduces this to 2–4 business days. Historic review applications (see Historic Districts section) are processed separately and take 14–45+ business days depending on review type. The permit fee for a standard residential roofing replacement in Portland is calculated on project value: $180–$310 for projects valued $8,000–$15,000. Permits must be posted visibly at the property during the work. A BDS inspection is required at completion — the inspector checks for correct underlayment installation, flashing, and drainage. Contractors typically schedule this directly with BDS.',
      },
      {
        heading: 'Permit Difficulty by Neighborhood Type',
        body: 'Portland roofing permit difficulty varies significantly by neighborhood designation. Standard residential neighborhoods (most of Portland): Permit difficulty 1–2/5. Standard online application, 5–9 day processing, $180–$310 fee. Minimal documentation beyond basic project description. Environmental overlay zones (hillside, landslide hazard areas, floodplain): Difficulty 3/5. Additional documentation required for drainage and erosion control. West Hills properties in the Landslide Hazard Zone trigger additional review. Metal roofing on slopes above 7:12 may require engineer drawings. Portland Historic Conservation Districts (Irvington, Sellwood, Woodstock, Cully, Arbor Lodge, and 30 others): Difficulty 3–4/5. Material changes require Type II Historic Resource Review (21+ days, $1,147–$2,294). In-kind replacements use standard permit process. Portland Historic Landmark Districts (Ladd\'s Addition, Alphabet District, Lair Hill): Difficulty 5/5. All exterior modifications visible from public right-of-way require review. Type II standard for any material change. Appeals possible, extending timelines by 4–6 weeks.',
      },
      {
        heading: 'Historic Districts: The Full Process',
        body: 'Portland has 31 designated Historic Conservation Districts and 5 Historic Landmark Districts. Combined, they cover approximately 18% of Portland\'s residential parcels. Homeowners in these areas face a two-permit process for roofing: Historic Resource Review approval, then a standard BDS Building Permit after approval is granted. The Historic Resource Review determines whether the proposed material, color, and profile meet the Secretary of the Interior\'s Standards for Rehabilitation as interpreted by Portland\'s Historic Landmark District Standards. In practice, this means: Cedar shake replaced in-kind: Type I, administrative approval, 7–14 days. Earth-tone architectural asphalt replacing wood shingles: Type II, 21–45 days, public comment, $1,147–$2,294 fee. Metal roofing replacing asphalt on a street-facing plane: Type II, uncertain outcome — approval depends on specific design review. Synthetic cedar (DaVinci, CeDUR) replacing natural cedar: Type I or II depending on the specific district — consult BDS Historic Resources staff before application. The most common mistake is submitting a standard BDS permit for a historic property without completing the Historic Resource Review first. BDS will not issue a building permit for a historic property alteration without the HR approval. This discovery mid-project causes significant delays.',
      },
      {
        heading: 'What Happens If You Skip the Permit',
        body: 'Unpermitted roofing work in Portland carries several specific risks that homeowners frequently underestimate. Property sale complications: Oregon real estate disclosure law (ORS 105.465) requires sellers to disclose known material defects, including unpermitted improvements. A roofing replacement discovered as unpermitted during buyer inspection or title review can require either BDS retroactive permit (if obtainable) or remediation to the point of inspection — in roofing, that typically means tear-off of the installed materials. Retroactive permits for roofing are generally available for in-kind replacements but not for material changes in historic districts. Insurance claim impact: a homeowner insurance claim for a roof installed without a permit may be denied or partially denied on the grounds that the installation did not meet code requirements. Insurers are not uniformly aggressive on this point, but policy language in most Oregon HO-3 policies excludes damage arising from code violations. Contractor liability shift: Oregon\'s CCB dispute resolution mechanism requires that the work in question was performed under permit. Unpermitted work falls outside CCB adjudication. If work quality is disputed, the homeowner\'s only recourse is civil litigation. Finally, the permit fee is a small fraction of project cost ($180–$310 on a $9,400 project). The risk-adjusted cost of skipping permits is not rational.',
      },
      {
        heading: 'The Permit Application Process Step by Step',
        body: 'For a standard Portland residential roofing replacement, the process is as follows. Step 1: Contractor submits online application through ePlans (portlandoregon.gov/bds) with property address, project scope, material specifications, and CCB number. The homeowner does not need to be involved in this step — it is contractor responsibility. Step 2: BDS processes the application. Standard timeline 5–9 business days, expedited 2–4 days. Step 3: Permit issued. Contractor prints or downloads the permit and posts it visibly at the property. Step 4: Installation. Step 5: Contractor calls for BDS inspection at completion. Inspector verifies underlayment, flashing, and drainage. Step 6: Inspection approved, permit finalized. For historic properties, steps 1 and 2 are preceded by the Historic Resource Review process. For new construction or extensive structural alterations, a structural review may be added between steps 1 and 2. If you engage a contractor who asks you to pull your own permit rather than pulling it themselves, decline. Homeowner-pulled permits for contractor work create a legal liability structure where the homeowner assumes responsibility for code compliance that would otherwise rest with the licensed contractor.',
      },
    ],
    faqs: [
      {
        q: 'How much does a Portland roofing permit cost in 2026?',
        a: 'Standard residential roofing permits are calculated on project value. For a typical $9,000–$12,000 replacement, BDS fees run $180–$310. Projects in historic districts add $1,147–$2,294 for Historic Resource Review. Expedited processing adds $196. Total permit costs for standard replacements are $180–$310; for historic properties $1,400–$2,600.',
      },
      {
        q: 'Do I need a permit if I\'m just replacing a few shingles?',
        a: 'No. Repair work involving less than 25% of the total roof surface does not require a BDS permit. Emergency repairs, spot flashing replacement, and minor shingle patching are all permit-exempt. The threshold is 25% of total roof area — not 25% of any individual slope.',
      },
      {
        q: 'Can I appeal a historic resource review denial?',
        a: 'Yes. Type II decisions can be appealed to the Design Commission within 14 days of the decision. The appeal fee is $1,147–$2,294 depending on project value. Design Commission hearings are public proceedings with community testimony. Appeals are resolved within 45–90 days of submission. The approval rate for well-documented appeals with supporting precedent from similar approved applications is approximately 30–40%.',
      },
      {
        q: 'What is the difference between a CCB permit and a BDS permit?',
        a: 'These are separate and unrelated. A CCB (Construction Contractors Board) license is the state contractor license issued to the contractor\'s business — it allows them to legally perform construction work in Oregon. A BDS permit is a project-specific permit issued by the City of Portland for a specific job at a specific address. Both are required: the contractor must hold a CCB license, and the project must have a BDS permit. They are issued by different agencies and serve different regulatory functions.',
      },
    ],
  },

]

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find(g => g.slug === slug)
}

export function getStaticGuidePaths() {
  return guides.map(g => ({ slug: g.slug }))
}
