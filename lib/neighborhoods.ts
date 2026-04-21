export type ServiceSlug =
  | 'roof-replacement'
  | 'roof-repair'
  | 'metal-roofing'
  | 'cedar-shake-roofing'
  | 'flat-roofing'

export interface Neighborhood {
  slug:           string
  name:           string
  zip:            string
  area:           string
  avgCost:        number
  range:          string
  badge?:         'hot' | 'new'
  commonMaterial: string
  indexPct:       number
  description:    string
  highlights:     string[]
  permitScore:    1 | 2 | 3 | 4 | 5   // 1 = easy, 5 = maximum complexity
  permitNotes:    string               // plain-English explanation
  // Optional per-neighborhood × per-service paragraph. Renders as a
  // "Why {service} in {neighbourhood}" section on the svc×loc page
  // between the generic Why and Process blocks. 60–90 words, bespoke.
  serviceContext?: Partial<Record<ServiceSlug, string>>
}

export const neighborhoods: Neighborhood[] = [
  // ── Inner NW ──
  {
    slug:'pearl-district', name:'Pearl District', zip:'97209', area:'Inner NW',
    avgCost:10200, range:'$8k–$14k', badge:'hot', commonMaterial:'Flat / TPO', indexPct:77,
    description:'Portland\'s premier urban district with high-density condos and commercial buildings. Flat roofing dominates.',
    highlights:['High proportion of flat/TPO roofs on condos','Strict Pearl District design review for visible materials','Multiple specialist contractors compete — use our vetting'],
    permitScore:4,
    permitNotes:'Pearl District falls under Portland\'s Central City design review overlay. Flat roof replacements on condos often require HOA approval in addition to the city permit. Budget 3–4 weeks and confirm your contractor is familiar with BDS Central City submissions.',
  },
  {
    slug:'nob-hill', name:'Nob Hill / NW District', zip:'97210', area:'Inner NW',
    avgCost:9800, range:'$7.5k–$13k', commonMaterial:'Asphalt / Slate', indexPct:74,
    description:'Victorian and Craftsman homes requiring careful material matching and historic preservation awareness.',
    highlights:['Older Victorian stock with steep pitches','Some homes require slate-matched asphalt','Tight access streets impact labour cost'],
    permitScore:3,
    permitNotes:'Standard Portland roofing permit required. Some properties near the NW Historic Conservation District may need a Type II Historic Resource Review if changing materials. Confirm with BDS before signing a contract.',
  },
  {
    slug:'slabtown', name:'Slabtown', zip:'97210', area:'Inner NW',
    avgCost:9400, range:'$7k–$13k', badge:'new', commonMaterial:'Asphalt', indexPct:71,
    description:'Fast-growing residential neighbourhood with mix of new construction and converted industrial buildings.',
    highlights:['New-build friendly — many contractors familiar with the area','Mix of flat and pitched roofs on newer homes','Strong demand: book early in spring'],
    permitScore:2,
    permitNotes:'Straightforward permit process. New construction and recent builds typically have simpler permit histories. Standard BDS online application, allow 1–2 weeks.',
  },
  {
    slug:'goose-hollow', name:'Goose Hollow', zip:'97201', area:'SW Portland',
    avgCost:8900, range:'$6.5k–$12k', commonMaterial:'Asphalt', indexPct:67,
    description:'Transitional neighbourhood between downtown and the West Hills with varied housing stock.',
    highlights:['Mix of 1920s–1970s construction','Moderate wind exposure from West Hills','Competitive contractor availability'],
    permitScore:2,
    permitNotes:'Standard permit. No historic overlay in most of Goose Hollow. Online BDS submission, typically 1–2 weeks approval.',
  },
  {
    slug:'south-portland', name:'South Portland', zip:'97201', area:'SW Portland',
    avgCost:8600, range:'$6k–$12k', commonMaterial:'Asphalt', indexPct:65,
    description:'Established residential area with predominantly mid-century homes and good contractor access.',
    highlights:['Good highway access keeps labour costs lower','Many homes in 40–60 year re-roofing cycle','Standard asphalt shingle dominates'],
    permitScore:2,
    permitNotes:'Routine permit with no special overlay requirements. BDS online portal, 1–2 week turnaround.',
  },

  // ── Inner SE ──
  {
    slug:'ladds-addition', name:"Ladd's Addition", zip:'97214', area:'Inner SE',
    avgCost:10400, range:'$8k–$15k', badge:'hot', commonMaterial:'Cedar / Asphalt', indexPct:79,
    description:'Portland\'s only historic district with diagonal street grid. Strict preservation rules apply to roofing materials.',
    highlights:['National Historic Register — material changes require approval','Cedar shake common on original homes','Limited contractor pool with historic district experience'],
    permitScore:5,
    permitNotes:"Portland's most restrictive roofing permit zone. Any material change requires a Type II Historic Resource Review — a separate process from the standard building permit. The review alone can take 4–6 weeks and costs $200–$500 in additional fees. Cedar shake is strongly preferred by reviewers. Using asphalt is possible but must match the original colour and profile. Do not start work without written BDS approval.",
  },
  {
    slug:'richmond', name:'Richmond', zip:'97214', area:'Inner SE',
    avgCost:9100, range:'$7k–$12k', commonMaterial:'Asphalt', indexPct:69,
    description:'Large diverse neighbourhood with strong Craftsman housing stock and active homeowner community.',
    highlights:['Large Craftsman bungalow stock — 20–30 year re-roof cycle active','High homeowner awareness: expect informed questions','Competitive: multiple PDX roofers active here'],
    permitScore:2,
    permitNotes:'Standard permit, no historic overlay. Richmond is one of the smoother permit zones in inner SE. BDS online, 1–2 weeks.',
    serviceContext:{
      'roof-replacement':'The heavy canopy of mature street trees south of Hawthorne Boulevard drops a constant volume of organic debris onto lower-pitched roof sections. Trapped moisture accelerates granular breakdown and lets moss root directly into the asphalt matting. A standard replacement fails fast here if it does not address this organic load. We specify high-grade algae-resistant shingles and upgrade the underlayment to a fully synthetic vapour-permeable membrane, adding a secondary defence against trapped rot.',
      'roof-repair':'Parking heavy repair trucks and staging ladders on the tight congested streets branching off Division and Clinton requires strategic timing to avoid blocking residential driveways or local traffic flow. Many contractors struggle with these access constraints, producing rushed jobs or delayed service calls. Our repair teams use compact, fully equipped transit vans that fit standard parking spaces, plus scaffolding designed for quick assembly in narrow alleyways and tight side returns without trampling garden beds.',
      'metal-roofing':'Classic bungalows dominate this area, and their low-slope pitches are notoriously bad at shedding water. When retrofitting metal roofing on a shallow pitch, standard overlapping seams invite capillary action, drawing water straight into your attic. We mechanically seam the joints on these roofs to create a fully waterproof barrier. It is a heavier-duty application that prevents standing water from backing up, keeping your classic home completely dry during continuous winter downpours.',
      'cedar-shake-roofing':'The classic bungalows dominating these streets look brilliant, but their shallow pitches are terrible for shedding water. Cedar shake roofing on lower slopes holds moisture too long, inviting heavy moss and premature decay. We counter this by adjusting the coursing exposure and upgrading the interlayment specifically for shallow pitches. This guarantees the timber drains quickly and protects your living room.',
      'flat-roofing':'The dense canopy of old-growth trees dropping wet leaves and sap onto the flat roofs of local residential additions creates a permanent, highly destructive organic blanket. If the roof relies on a standard internal drain, debris quickly forms a dam and turns the roof into a stagnant pond that forces water up through the seams. We install puncture-resistant PVC and re-engineer the drainage points with oversized cast-iron dome strainers that still flow when partially buried in debris.',
    },
  },
  {
    slug:'sunnyside', name:'Sunnyside', zip:'97214', area:'Inner SE',
    avgCost:8800, range:'$6.5k–$12k', commonMaterial:'Asphalt', indexPct:66,
    description:'Vibrant inner SE neighbourhood with a mix of Victorian, Craftsman and mid-century housing.',
    highlights:['Dense urban lots — access can be tight','Active neighbourhood association','Standard asphalt shingle well-suited to microclimate'],
    permitScore:2,
    permitNotes:'Standard permit. No special overlay. Online BDS submission, 1–2 weeks typical.',
    serviceContext:{
      'roof-replacement':'Getting a massive skip bin down these tightly packed Inner Southeast streets is a logistical nightmare. When we handle a full roof replacement here, we cannot just block the road or dump materials over your neighbour\'s fence. We rely on smaller, agile removal trucks to haul away the old decking daily. It prevents damage to the heritage street trees and stops your property looking like a building site for weeks. You get a clean tear-off without the council issuing fines for blocking the narrow carriageway.',
      'roof-repair':'Finding space for a cherry picker or scaffolding on these tightly packed streets is a nightmare. A lot of roof repair outfits decline work here because they cannot simply pull a massive truck up to your front door. We keep our repair units agile, using ladder-hoists and compact vans that easily navigate narrow avenues without blocking your neighbours in. You get rapid emergency leak patching without needing to shut down the entire street for half the day.',
      'metal-roofing':'Getting a massive flatbed truck down these tight, heavily parked streets is basically impossible. Supplying long metal roofing panels usually means shutting down the road or hand-carrying materials for blocks. We bypass the logistical nightmare by roll-forming the standing seam panels directly on-site using a compact trailer. It keeps the local traffic flowing, prevents damage to low-hanging heritage trees, and ensures we get perfectly sized continuous panels without the frustrating delivery delays.',
      'cedar-shake-roofing':'Narrow streets and zero-lot lines make staging materials a nightmare. For cedar shake roofing replacements here, we cannot just drop a massive skip on your driveway. We hand-carry the old rotted wood out to keep your neighbour\'s property and heritage street trees safe. Our crews run smaller transport runs so your property stays clean and the street remains totally clear.',
      'flat-roofing':'Tight alleys make getting heavy rolls of TPO membrane up to a flat roof quite difficult. We cannot block narrow side streets with massive cranes. We usually run a heavy-duty material hoist right from the back of a standard flatbed. It keeps the pavement clear for pedestrians and avoids frustrating the local council with disruptive road closures during your installation.',
    },
  },
  {
    slug:'hawthorne', name:'Hawthorne', zip:'97202', area:'Inner SE',
    avgCost:9200, range:'$7k–$13k', commonMaterial:'Asphalt', indexPct:70,
    description:'One of Portland\'s best-known neighbourhoods with older housing stock on the cusp of re-roofing cycles.',
    highlights:['High volume of homes entering 25-year replacement cycle','Moss and algae common — specify algae-resistant shingles','Street parking restrictions affect project logistics'],
    permitScore:2,
    permitNotes:'Standard permit zone. Some properties adjacent to the Hawthorne Historic District boundary should double-check with BDS, but most of Hawthorne is straightforward.',
  },
  {
    slug:'division-clinton', name:'Division-Clinton', zip:'97202', area:'Inner SE',
    avgCost:8700, range:'$6.5k–$12k', commonMaterial:'Asphalt', indexPct:66,
    description:'Dense residential corridor with high demand for roofing services and several active local contractors.',
    highlights:['High density — neighbouring properties during work need protection','Contractor competition keeps pricing sharp','Rain exposure: superior underlayment recommended'],
    permitScore:2,
    permitNotes:'Routine permit, no historic overlay. Standard BDS online application.',
    serviceContext:{
      'roof-replacement':'Finding staging space for heavy materials on these hyper-developed streets is practically impossible now. Out-of-town crews often underbid roof replacement jobs here, only to panic when they realise they cannot park a flatbed within three blocks. We coordinate smaller, daily deliveries and use specialised hoists rather than throwing old shingles off the eaves. It takes precise project management, but it keeps the pavements clear, protects the adjacent properties, and stops your neighbours from complaining about the mess.',
      'roof-repair':'Most established contractors absolutely hate trying to park their massive service trucks along this hyper-developed commercial corridor. It makes scheduling a rapid roof repair incredibly frustrating if you have a sudden leak. We operate dedicated rapid-response repair vans specifically for Inner Southeast jobs. Because we are not trying to navigate a massive skip lorry through tight parking lanes, we can actually turn up promptly, source the leak, and secure your property before the next band of rain hits.',
      'metal-roofing':'Finding parking for a massive material skip on these hyper-developed streets usually ends with angry neighbours and council fines. Many companies underbid metal roofing jobs here because they ignore the access problems. We run agile, smaller removal trucks to haul away old decking and offcuts daily. Keeping the street completely clear of massive bins keeps your project moving smoothly and stops your property from looking like a neglected industrial wasteland for two weeks.',
      'cedar-shake-roofing':'Trying to park a heavy debris skip on these hyper-developed streets usually results in a towed bin and a delayed project. We handle cedar shake roofing jobs using agile, smaller trucks for daily waste removal. This stops materials from blocking the road and keeps the local council happy. You get a fast, efficient installation without the headache of angry neighbours.',
      'flat-roofing':'Restaurants and cafes dominate this corridor, which means the flat roofs above them carry grease-laden kitchen exhaust ducts, oversized HVAC condensers, and constant foot traffic from maintenance staff. Replacing the membrane means welding fire-rated flashing around every grease duct penetration and elevating all mechanical units on custom curbs to code. Standard TPO breaks down around cooking-oil vapour, so we specify a grease-resistant PVC formulated for restaurant rooftops that survives daily exposure to airborne fats without swelling or delaminating.',
    },
  },

  // ── Outer SE ──
  {
    slug:'woodstock', name:'Woodstock', zip:'97202', area:'SE Portland',
    avgCost:8400, range:'$6k–$11.5k', commonMaterial:'Asphalt', indexPct:64,
    description:'Family-friendly SE neighbourhood with large lots and classic Portland housing stock.',
    highlights:['Larger lots with tree cover — debris management important','Mid-tier market: quality asphalt best ROI','Good contractor access via Powell Blvd'],
    permitScore:2,
    permitNotes:'Standard permit. No overlay complications. BDS online portal, 1–2 weeks.',
    serviceContext:{
      'roof-replacement':'The post-war bungalows spanning the grid east of 39th Avenue routinely conceal severe ventilation deficits in their shallow attic spaces. When stripping the existing roof, we almost always find the original soffit vents choked with old fibreglass insulation, creating a dead-air trap that bakes the shingles from the underside. Proper replacement means pulling back that compacted insulation, installing rigid foam baffles, and calculating intake-to-exhaust ratio for the specific footprint before a single new shingle goes down.',
      'roof-repair':'The intense sun baking the unshaded southern exposures across the neighbourhood causes rapid thermal cycling that degrades asphalt shingles faster than normal wear. Expansion and contraction dries out the petroleum base, leading to thermal cracking and curled edges that shatter easily when walked upon. Repair here requires a delicate touch — flat bars and heat guns to break old sealant bonds without damaging adjacent tiles. We then upgrade to shingles with a higher UV resistance rating.',
      'metal-roofing':'Heavy canopy cover from mature street trees dumps an endless supply of acidic pine needles onto your roof. Unlike asphalt, metal roofing sheds this organic debris brilliantly, preventing moss from taking hold and rotting the surface. However, you must install heavy-duty snow guards to stop wet leaves and ice from sliding off in massive sheets and tearing down your gutters. It keeps the debris manageable and protects anyone walking around the perimeter of your house.',
      'cedar-shake-roofing':'Mature street trees drop massive amounts of acidic pine needles directly onto your house. This debris traps moisture against cedar shake roofing, causing the timber to rot rapidly if ignored. We strongly recommend pre-treated, fungicidal shakes for properties under heavy canopy. Combined with an upgraded synthetic underlayment, this setup resists organic decay and significantly extends the lifespan of your roof.',
      'flat-roofing':'Accessing the flat-roofed ADUs and deep backyard studios common in these long residential lots requires hauling heavy rolls of membrane and bulky insulation boards by hand down extremely narrow side returns. Standard heavy machinery cannot drop materials directly onto the roof without destroying fences and mature landscaping. Crews operate with narrow-track carts to manually transport materials the length of the property, and use silent battery packs instead of gas generators because we are working beside bedroom windows.',
    },
  },
  {
    slug:'sellwood-moreland', name:'Sellwood-Moreland', zip:'97202', area:'SE Portland',
    avgCost:9600, range:'$7.5k–$13k', badge:'hot', commonMaterial:'Asphalt Premium', indexPct:73,
    description:'Upmarket SE neighbourhood with high homeowner investment and strong demand for premium roofing.',
    highlights:['Higher-end market with appetite for premium materials','Active re-roofing cycle on 1930s–50s homes','Proximity to river increases moisture — invest in quality underlayment'],
    permitScore:3,
    permitNotes:'Parts of Sellwood fall within the Sellwood–Moreland Historic Conservation District. If your home is a contributing resource, material changes may trigger a Historic Resource Review. Confirm your property status at portlandmaps.com before contracting.',
  },
  {
    slug:'eastmoreland', name:'Eastmoreland', zip:'97202', area:'SE Portland',
    avgCost:11200, range:'$8.5k–$16k', badge:'hot', commonMaterial:'Cedar / Premium', indexPct:85,
    description:'Affluent SE neighbourhood with large homes, mature trees and a market that demands premium materials and craftsmanship.',
    highlights:['Premium market — cedar shake and metal strong here','Large roofs with complex geometry increase costs','High standard expected: use only top-rated PDX contractors'],
    permitScore:3,
    permitNotes:'Eastmoreland is a Portland Historic Conservation District. Material changes on original homes require review. Cedar shake replacement-in-kind is typically approved; switching to asphalt or metal needs written justification. Allow 3–5 weeks.',
  },
  {
    slug:'brooklyn', name:'Brooklyn', zip:'97202', area:'SE Portland',
    avgCost:7900, range:'$5.5k–$11k', commonMaterial:'Asphalt', indexPct:60,
    description:'Affordable SE neighbourhood undergoing gradual gentrification with cost-conscious homeowners.',
    highlights:['Value market — standard 3-tab or architectural shingle fits budget','Many homes have deferred maintenance — inspect deck condition','Good access for contractors from SE industrial area'],
    permitScore:1,
    permitNotes:'One of Portland\'s most straightforward permit zones. Standard BDS application, often approved in under a week. No historic overlay, no design review.',
    serviceContext:{
      'roof-replacement':'Executing a full tear-off along the rail-adjacent grid between Milwaukie Avenue and the train yard requires strict logistical control. You cannot park a standard 40-foot dump trailer on these streets without blocking commuter traffic and drawing immediate council fines. We deploy short-wheelbase drop boxes timed exactly with the tear-off phase, and rig catch nets precisely so debris does not spill into heritage gardens or strike neighbouring siding. Contractors who ignore this end up rushing the install to recover lost hours.',
      'roof-repair':'Targeted repairs on the historic homes scattered between Powell and Holgate mean navigating strict material matching requirements, especially where preservation guidelines apply. A standard asphalt patch on a prominent gable will flag an issue during future property inspections. We stock legacy profiles and source discontinued colour blends to blend repairs seamlessly into older, weathered planes. Damaged flashing around century-old brick chimneys gets custom lead or copper counter-flashing instead of tar.',
      'metal-roofing':'The complex geometry of the Victorian and Edwardian rooflines near the rail yard makes continuous metal panels an intricate engineering challenge. The multitude of dormers, steep valleys, and flared eaves means very few standard lengths can be used straight out of the factory. We roll-form directly in the driveway to run custom lengths and bend exact angles, ensuring the standing seams lock perfectly around the complicated turret and gable intersections rather than relying on shop-cut approximations.',
      'cedar-shake-roofing':'The heavy moisture rolling off the river creates a damp environment that attacks organic roofing materials relentlessly, turning poorly installed wood roofs into spongy, moss-covered liabilities within a decade. We abandon standard medium shakes entirely and install premium heavy-split old-growth cedar with higher natural preservative oil content. Crucially, we design a \'cold roof\' using a continuous cedar breather mat beneath the shakes, creating an airspace that lets the underside dry out rapidly after heavy rains.',
      'flat-roofing':'The narrow commercial and mixed-use structures along the rail corridor often feature legacy tar-and-gravel roofs laid over original timber decking that has slowly degraded under decades of unnoticed minor leaks. Stripping down to the substrate routinely reveals compromised joists that require immediate sistering before any new system can go on. We also lay down high-density recovery boards to bridge imperfections in the vintage decking before mechanically fastening the new heavy-gauge TPO membrane.',
    },
  },
  {
    slug:'buckman', name:'Buckman', zip:'97214', area:'Inner SE',
    avgCost:8300, range:'$6k–$11.5k', commonMaterial:'Asphalt', indexPct:63,
    description:'Dense inner SE neighbourhood with urban housing and commercial mix, popular with younger homeowners.',
    highlights:['Urban density — debris containment essential','Flat and low-slope sections common on older commercial-residential mix','Active permit office: budget 2–3 weeks for approval'],
    permitScore:2,
    permitNotes:'Standard permit. No historic overlay. Online BDS, allow 2 weeks during peak spring/summer season.',
  },
  {
    slug:'kerns', name:'Kerns', zip:'97214', area:'Inner SE',
    avgCost:8100, range:'$5.8k–$11k', commonMaterial:'Asphalt', indexPct:61,
    description:'Transitional inner SE neighbourhood with a mix of residential and light commercial properties.',
    highlights:['Growing homeowner investment in the area','Mix of flat and pitched roofs requires versatile contractor','Watch for undetected water damage in older stock'],
    permitScore:2,
    permitNotes:'Routine permit. BDS online portal. No overlay complications in most of Kerns.',
  },

  // ── Inner NE ──
  {
    slug:'lloyd-district', name:'Lloyd District', zip:'97232', area:'Inner NE',
    avgCost:7800, range:'$5.5k–$10.5k', commonMaterial:'Flat / TPO', indexPct:59,
    description:'Commercial-heavy district with residential pockets and a high proportion of flat commercial roofs.',
    highlights:['Predominantly flat commercial roofing','Residential pockets use standard asphalt','Strong commercial contractor presence — check residential experience'],
    permitScore:3,
    permitNotes:'Commercial roofing in Lloyd District may require a commercial permit class rather than residential. Confirm with BDS before applying — wrong permit type causes delays. Central City overlay applies to some parcels.',
  },
  {
    slug:'sullivans-gulch', name:"Sullivan's Gulch", zip:'97232', area:'Inner NE',
    avgCost:8500, range:'$6k–$12k', commonMaterial:'Asphalt', indexPct:64,
    description:'Linear residential neighbourhood between Lloyd District and Irvington with steady housing demand.',
    highlights:['Good mix of single-family homes entering re-roof cycle','Freeway proximity: budget extra for debris protection','Transitional area with improving homeowner investment'],
    permitScore:2,
    permitNotes:'Standard residential permit. No historic overlay. BDS online portal, 1–2 weeks.',
  },
  {
    slug:'irvington', name:'Irvington', zip:'97212', area:'NE Portland',
    avgCost:10800, range:'$8k–$15k', commonMaterial:'Asphalt Premium', indexPct:82,
    description:'Historic NE neighbourhood with large Craftsman homes and an active landmark district driving premium roofing decisions.',
    highlights:['Portland Landmark Survey area — material choices matter','Large homes with complex rooflines add to cost','Premium market: many homeowners invest in 50-year materials'],
    permitScore:5,
    permitNotes:'Irvington is a Portland Historic Conservation District with one of the most active historic review processes in the city. All roofing material changes require a Type II Historic Resource Review — even asphalt-to-asphalt if the profile or colour changes significantly. The Irvington Community Association is highly engaged. Budget 4–6 weeks for approvals and use a contractor with documented historic district experience.',
  },
  {
    slug:'alameda', name:'Alameda', zip:'97212', area:'NE Portland',
    avgCost:11500, range:'$9k–$16k', badge:'hot', commonMaterial:'Cedar / Premium', indexPct:87,
    description:'One of Portland\'s most sought-after neighbourhoods with large historic homes on the Alameda Ridge.',
    highlights:['Elevated ridge location — high wind exposure year-round','Cedar shake common and expected by the market','Premium pricing justified: buyers expect top-quality roofs'],
    permitScore:4,
    permitNotes:'Alameda is a Portland Historic Conservation District. Cedar-to-cedar replacement is generally approved without full review. Switching materials requires a Type II Historic Resource Review. High wind zone — permit may require engineer-stamped drawings for certain metal systems.',
  },
  {
    slug:'beaumont-wilshire', name:'Beaumont-Wilshire', zip:'97212', area:'NE Portland',
    avgCost:10200, range:'$8k–$14k', commonMaterial:'Asphalt Premium', indexPct:77,
    description:'Established NE neighbourhood with solid housing values and homeowners investing in long-term upgrades.',
    highlights:['Strong investment market — metal roofing gaining traction','Alberta St commercial anchor drives neighbourhood pride','Good contractor access via major arterials'],
    permitScore:2,
    permitNotes:'Standard permit. Not within a historic conservation district. BDS online application, 1–2 weeks.',
  },

  // ── NE Portland ──
  {
    slug:'grant-park', name:'Grant Park', zip:'97212', area:'NE Portland',
    avgCost:9900, range:'$7.5k–$14k', commonMaterial:'Asphalt Premium', indexPct:75,
    description:'Family-focused NE neighbourhood adjacent to Grant Park with strong school districts and homeowner stability.',
    highlights:['Stable long-term owners re-roofing after 25-30 years','Tree canopy: moss prevention with zinc strips recommended','Above-average spend willingness for durable materials'],
    permitScore:2,
    permitNotes:'Standard residential permit. No historic overlay. Smooth BDS process, 1–2 weeks.',
  },
  {
    slug:'hollywood', name:'Hollywood', zip:'97213', area:'NE Portland',
    avgCost:8700, range:'$6.5k–$12k', commonMaterial:'Asphalt', indexPct:66,
    description:'Commercial hub district with surrounding residential and steady demand across all project sizes.',
    highlights:['Commercial and residential mix — versatile contractor needed','Mid-market pricing suits variety of budgets'],
    permitScore:2,
    permitNotes:'Standard permit. No historic overlay. BDS online, 1–2 weeks typical.',
    serviceContext:{
      'roof-replacement':'Tearing off a roof on these older Tudor and Craftsman builds usually reveals three layers of old asphalt hiding rotten skip-sheathing. Lots of blokes bid low on roof replacement jobs here, then hit you with a massive variation order when they actually strip it down to the deck. We always quote expecting to replace at least some of the plywood. Doing the structural prep properly ensures your new roof system will not sag or leak around those complex dormers after the first heavy winter downpour.',
      'roof-repair':'Tracking down a leak on these older Tudor builds is rarely straightforward. The steep pitches and multiple intersecting valleys mean water often travels several metres from the actual breach before dripping onto your plaster ceiling. Standard roof repair crews usually just slather sealant on the nearest flashing and hope for the best. We actually strip back the courses to find the rotten decking underneath. Fixing the structural flashing properly is the only way to stop the ingress permanently.',
      'metal-roofing':'Those steep Tudor rooflines are brilliant for shedding rain, but they make metal roofing installations tricky. Most standard panels do not bend well around complex dormers and sharp valleys. We use a specialised standing seam system tailored for high-pitch drops. If your installer tries to force standard corrugated sheets around those angles, the flashing will inevitably leak behind the plaster within a few winters. Precision custom metalwork is the only way to keep your living space dry.',
      'cedar-shake-roofing':'Older Tudor builds here mean complex rooflines with multiple dormers. We see constant leaks from poorly installed step flashing on cedar shake roofing. Getting the custom metalwork right in those steep valleys is exactly what keeps your plaster dry. We strip it down to the deck, replace the underlayment, and ensure the timber shakes are coursed perfectly to handle heavy runoff.',
      'flat-roofing':'Older commercial build-outs and modern additions often feature tricky parapet walls. TPO is brilliant for these flat roofs, but tying it into older structures requires custom metal coping. If water gets behind the stucco, it rots the wood framing blindly. We always run the membrane straight up and over the parapet to eliminate that failure point entirely, keeping your property secure.',
    },
  },
  {
    slug:'sabin', name:'Sabin', zip:'97217', area:'NE Portland',
    avgCost:9000, range:'$7k–$12.5k', commonMaterial:'Asphalt', indexPct:68,
    description:'Close-knit NE neighbourhood with excellent access and strong community standards for home maintenance.',
    highlights:['Active neighbourhood association with high standards','Classic bungalow stock ideal for 30-year architectural shingles','Good contractor competition keeps quotes fair'],
    permitScore:2,
    permitNotes:'Standard permit. No overlay. Routine BDS process.',
    serviceContext:{
      'roof-replacement':'These tight residential streets are packed with historic homes featuring complex, overlapping rooflines and dead valleys. Tearing off old materials during a roof replacement usually uncovers decades of water damage where previous installers botched the metalwork. We refuse to reuse old flashings. We custom-fabricate new step and valley metal on-site to ensure those tricky transition points are completely watertight. Taking the time to rebuild the hidden water channels is the only way to genuinely protect your plaster ceilings from slow, hidden leaks.',
      'roof-repair':'Older historic homes packed into these tight blocks usually suffer from badly deteriorated lead-work around the chimneys and dead valleys. Most leaks we handle during a roof repair here are not failing shingles, but completely perished metal flashings. You cannot just use silicone to bridge a gap in seventy-year-old lead. We custom-fabricate new metal saddles and step flashing on-site to ensure the repair seamlessly integrates with your existing roofline and actually survives the heavy winter freeze-thaw cycles.',
      'metal-roofing':'Operating metal fabrication machinery on the quiet tightly packed streets branching off Fremont requires a deliberate approach to the acoustic footprint. Running a roll-former and snapping long panels generates significant noise and draws complaints fast if the crew works outside managed hours. We pre-fabricate flashing details and valley pans at our off-site facility and time on-site roll-forming tightly to the middle of the day, using precision snips rather than loud power saws for final cuts.',
      'flat-roofing':'Dealing with older flat-roofed extensions on historic homes requires careful tie-ins where the membrane meets the main pitched roof. Amateurs usually botch the transition flashing, relying heavily on cheap sealants. We weld the TPO directly to custom metal drip edges that sit firmly beneath the main roof underlayment. Doing the metalwork properly ensures water cannot back up under the transition during heavy snowmelt.',
    },
  },
  {
    slug:'concordia', name:'Concordia', zip:'97211', area:'NE Portland',
    avgCost:8200, range:'$6k–$11.5k', commonMaterial:'Asphalt', indexPct:62,
    description:'Diverse NE neighbourhood with a mix of housing types and a steady re-roofing market.',
    highlights:['Variety of roof types across housing stock','Value-conscious market with growing investment','NE access makes contractor scheduling straightforward'],
    permitScore:2,
    permitNotes:'Standard permit. No historic overlay. BDS online, 1–2 weeks.',
    serviceContext:{
      'roof-replacement':'The massive elm and maple trees lining these streets are stunning, but the heavy shade promotes aggressive moss growth on asphalt. If a contractor performs a roof replacement here without addressing the organic buildup, your new shingles will be eaten alive within five years. We always install zinc or copper strips along the ridges. When it rains, the metallic ions wash down the slope, naturally killing off the spores. It is a simple, practical addition that keeps the new surface completely clear of destructive green buildup.',
      'roof-repair':'Massive street trees completely shade many homes in this area, creating the perfect damp environment for aggressive moss. When roots lift the shingle edges, water blows right underneath. A standard roof repair is useless if you leave the organic growth intact. We meticulously scrape the affected area, replace the warped materials, and treat the surrounding sections with a commercial-grade fungicide. Removing the actual cause of the lift is the only way to stop the leak from returning next winter.',
      'metal-roofing':'Adding a heavy-gauge metal roof to the older extensively remodelled homes near the university often hits a structural load compliance wall. While metal is lighter than tile, older framing that has absorbed decades of minor water damage or poorly executed renovations may not pass the council\'s deflection standards for a new install. We inspect the attic thoroughly before panels are ordered and frequently engage structural engineers to sign off on rafter capacity, sistering joists where necessary.',
      'flat-roofing':'Heavy shade from mature street trees turns flat roofs into damp, mossy environments. While TPO naturally resists organic growth far better than old asphalt, the real issue is blocked drains. We always install oversized commercial-grade scuppers and heavy-duty leaf guards on flat jobs here. If the water cannot drain fast enough past the wet autumn leaves, the welded seams take unnecessary hydrostatic pressure.',
    },
  },

  // ── N Portland ──
  {
    slug:'cully', name:'Cully', zip:'97218', area:'NE Portland',
    avgCost:7600, range:'$5.5k–$10.5k', badge:'new', commonMaterial:'Asphalt', indexPct:57,
    description:'Portland\'s largest neighbourhood by area, rapidly improving with new homeowner investment and growing roofing demand.',
    highlights:['Fastest-growing re-roofing demand in NE Portland','Large lots with trees — gutter guard upsell opportunity','Value market: standard architectural shingle optimal'],
    permitScore:1,
    permitNotes:'One of Portland\'s easiest permit zones. Standard BDS application, no overlay. Often approved in 5–7 business days.',
    serviceContext:{
      'roof-replacement':'Tearing off the low-pitch ranches east of 60th Avenue usually exposes 1950s skip sheathing that will not hold modern architectural shingles. Proper roof replacement here means re-decking with half-inch CDX plywood before anything else. Because these sprawling single-storey layouts sit below a 4/12 pitch, we run ice-and-water shield three feet up the deck rather than the standard one, and sometimes cover the entire slope. Skipping the re-deck step guarantees callback within two winters.',
      'roof-repair':'The large open lots and minimal windbreaks across this northeast sector leave older roofing highly susceptible to straight-line wind damage on western exposures. We frequently repair sections where sudden autumn gusts have sheared the sealant strips on three-tab shingles. Diagnosing these leaks requires looking beyond the obvious missing tabs; wind drives rain horizontally under adjacent, seemingly intact shingles, soaking the felt underlayment and causing hidden rot in the decking. Surface patches alone never hold.',
      'metal-roofing':'Staging the extra-long metal panels required for continuous runs on the sprawling ranch homes east of 60th Avenue demands substantial driveway space and precise delivery coordination. Standard flatbed drops often block the narrow unimproved streets here, so we use specialised craning equipment to hoist custom-cut lengths directly from truck to deck. Hand-carrying thirty-foot standing seam panels around tight corners risks bending the material and ruining the locking mechanism before it even reaches the roof.',
      'cedar-shake-roofing':'Replacing a traditional wood roof in the city demands strict adherence to the fire-resistance protocols mandated by the local building authority. Raw untreated shakes are illegal anywhere within municipal boundaries because of the urban fire risk. We source premium edge-grain western red cedar pressure-treated at the factory with fire-retardant chemicals, elevating the material to a Class B or Class A fire rating depending on the underlayment assembly. Without factory certification paperwork, insurance will refuse the install.',
      'flat-roofing':'The expansive flat-roofed mid-century modern homes prevalent in the eastern sections suffer severe thermal cycling under direct summer sun. Standard dark rubber membranes absorb the heat, dry out, shrink, and pull away from parapet walls and chimney flashings. Replacing a failed built-up system here needs a material engineered to deflect solar radiation rather than absorb it. We install bright white TPO that reflects UV and drastically lowers the surface temperature, extending the life of the seams.',
    },
  },
  {
    slug:'alberta-arts-district', name:'Alberta Arts District', zip:'97217', area:'NE Portland',
    avgCost:8800, range:'$6.5k–$12k', commonMaterial:'Asphalt', indexPct:66,
    description:'Vibrant arts-focused corridor with strong residential demand and community-conscious homeowners.',
    highlights:['Community pride drives above-average maintenance standards','Older bungalows on active re-roof cycle','Strong word-of-mouth referral culture'],
    permitScore:2,
    permitNotes:'Standard permit. No historic overlay. BDS online, 1–2 weeks.',
    serviceContext:{
      'roof-replacement':'Most of the classic bungalows around here have absolutely terrible attic ventilation. When you do a roof replacement without addressing the airflow, the trapped heat bakes the new asphalt shingles from the inside out. We never just slap new materials on top. We always cut in a continuous ridge vent and upgrade the intake baffles. It stops the underlayment from cooking during those brutal August heatwaves and prevents moisture buildup from rotting your structural timbers over the wet winter months.',
      'roof-repair':'Plenty of out-of-town canvassers flood this area after a major storm, offering cheap, quick fixes. For a proper roof repair, you absolutely must avoid contractors who just nail new shingles straight over rotten underlayment. We spend a massive amount of time fixing botched jobs around here. Our crews always remove the damaged layers completely down to the timber deck. Replacing the perished felt and properly coursing the new asphalt is what actually keeps your living room dry.',
      'metal-roofing':'Plenty of out-of-town companies canvass this area pushing cheap metal roofing over existing asphalt layers. Laying steel directly onto old shingles traps moisture, rotting your decking from the inside out. We always do a full tear-off down to the plywood. It takes a bit more effort, but installing a high-temperature synthetic underlayment directly on the deck ensures your new metal roof actually lasts a lifetime instead of masking a festering damp problem.',
      'cedar-shake-roofing':'A lot of out-of-town crews bid low on cedar shake roofing here but skip the crucial skip-sheathing. Real timber needs proper ventilation to breathe, or it rots from the underside within five years. We frequently tear off asphalt and completely rebuild the decking structure before laying a single shake. We do the prep work properly so your new timber lasts decades.',
      'flat-roofing':'Many crews will just lay down new TPO right over the old torch-down asphalt on these flat commercial spaces. The chemical incompatibility eventually eats through the new membrane. We completely strip the old tar layer and install high-density polyiso insulation boards first. You get a clean, chemically isolated surface and a massive boost to your building\'s thermal efficiency before the new roof goes on.',
    },
  },
  {
    slug:'mississippi-ave', name:'Mississippi Avenue', zip:'97217', area:'N Portland',
    avgCost:9100, range:'$7k–$12.5k', commonMaterial:'Asphalt', indexPct:69,
    description:'Revitalised N Portland corridor with rapidly appreciating home values driving roofing investment.',
    highlights:['Rising property values increase willingness to invest in roofs','Dense urban housing with tight access'],
    permitScore:2,
    permitNotes:'Standard permit. No historic overlay in most of the corridor. BDS online, 1–2 weeks.',
    serviceContext:{
      'roof-replacement':'Working alongside this commercial corridor means following right-of-way rules and noise ordinances to avoid halting local trade. Dropping a commercial dumpster on the side streets requires specific encroachment permits and hazard staging — a step rushed crews frequently ignore until the council halts the job. Many mixed-use conversions feature zero-lot-line construction, meaning scaffolding sits over public footpaths and requires heavy protective canopies to shield pedestrians during tear-off.',
      'roof-repair':'The narrow steep-gabled Victorian conversions along the side streets hide deep-seated flashing failures where dormers intersect the main roof deck. Decades of structural settling create tiny gaps in the step flashing, allowing winter rain to seep behind the siding and rot interior wall framing. Fixing these leaks requires removing exterior siding around the dormer base to access the blind-nailed flashing beneath. We then fabricate custom aluminium step and counter-flashing on-site for a perfect mechanical fit.',
      'metal-roofing':'Working on properties with zero-lot lines means your roof practically overhangs the neighbour’s siding. Dropping heavy metal roofing panels onto tight staging areas requires absolute precision to avoid smashing adjacent windows. We use specialised hoists and heavily netted scaffolding instead of manual hauling. This controlled setup stops sharp offcuts from ending up in a shared driveway and ensures complete safety for the properties on both sides of the fence.',
      'cedar-shake-roofing':'Houses are built practically on top of each other along this busy corridor. You cannot just throw old materials off the eaves during a cedar shake roofing tear-off without smashing a neighbour\'s siding. We use controlled debris chutes and extensive scaffolding catch-nets. It takes extra setup time, but it ensures total site security and zero damage to adjacent properties.',
      'flat-roofing':'Working on zero-lot-line flat roofs along this busy strip means handling chemical odours carefully. We strictly use low-VOC bonding adhesives when installing fully adhered TPO near these dense apartments. It costs slightly more, but it stops toxic smells from getting sucked directly into a neighbour\'s ventilation intake, saving you from serious environmental complaints and keeping the local air quality clean.',
    },
  },
  {
    slug:'overlook', name:'Overlook', zip:'97217', area:'N Portland',
    avgCost:8400, range:'$6k–$11.5k', commonMaterial:'Asphalt', indexPct:64,
    description:'N Portland neighbourhood on the bluff above the Willamette with a mix of bungalows and ranch-style homes.',
    highlights:['Elevated position increases wind exposure slightly','Bluff homes may require extra safety equipment','Solid mid-market with consistent demand'],
    permitScore:2,
    permitNotes:'Standard permit. Some bluff-adjacent properties may need engineer sign-off for steep-slope work. BDS online, 1–2 weeks.',
    serviceContext:{
      'roof-replacement':'Sitting right on the bluff above the Willamette River means your property takes a brutal beating from horizontal rain. A standard roof replacement using basic felt underlayment simply will not survive those heavy November squalls. We completely strip the deck and install a high-permeability synthetic barrier beneath architectural shingles. Nailing patterns also matter; we use a six-nail high-wind installation technique rather than the standard four. This guarantees the shingles stay locked down tightly when the winter winds rip up the river corridor.',
      'roof-repair':'Taking the brunt of the Willamette River wind means loose shingles do not stay attached for very long. When conducting a roof repair up on the bluff, standard nailing patterns are completely useless against those horizontal winter gusts. We always apply specialised roofing cement to the sealing strips and utilise a six-nail high-wind technique for every replacement shingle. If you do not lock the materials down aggressively, the next November squall will just rip the patch straight off again.',
      'metal-roofing':'Taking the full brunt of winter wind coming off the Willamette River bluff demands serious structural fastening. Standard exposed-fastener metal roofing panels will eventually lift and rattle under those horizontal gusts. We strictly install concealed-fastener standing seam profiles here. The clips allow the metal to expand and contract with the temperature shifts whilst locking the panels down tight. You get absolute peace of mind during those heavy November squalls instead of listening to your roof tear itself apart.',
      'cedar-shake-roofing':'Sitting above the Willamette River bluff exposes roofs to horizontal driving rain during winter storms. Standard felt underlayment will not stop moisture ingress here. When installing cedar shake roofing, we always run a high-permeability synthetic barrier beneath the timber. We also use heavy-gauge fasteners with tighter exposure overlaps so you never end up picking loose shakes out of your garden.',
      'flat-roofing':'Wind shears coming straight off the Willamette bluff play absolute havoc with flat roofs. Fully adhered TPO systems are non-negotiable here; mechanically fastened membranes will just billow and eventually rip around the fastener plates. Gluing the membrane completely down to the insulation board ensures your roof stays put when the brutal November river winds start howling across the bluff.',
    },
  },
  {
    slug:'piedmont', name:'Piedmont', zip:'97217', area:'N Portland',
    avgCost:7900, range:'$5.8k–$10.8k', commonMaterial:'Asphalt', indexPct:60,
    description:'Affordable N Portland neighbourhood with many long-time owners now in re-roofing decision windows.',
    highlights:['High proportion of homes 25–35 years old — prime re-roof market','Value-oriented: position asphalt as the smart long-term choice'],
    permitScore:1,
    permitNotes:'Straightforward permit zone. Standard BDS application, no overlay. Typically approved in under a week.',
    serviceContext:{
      'roof-replacement':'Upgrading roofing on the historic Craftsman properties north of Rosa Parks Way requires strict adherence to local preservation guidelines. Failed chimney flashing cannot be fixed with modern surface-mounted neoprene boots; we custom-fabricate stepped lead or aluminium counter-flashing, grinding out the original brick mortar joints for a period-accurate seal. Standard ridge vents also alter the roofline too much for council approval, so we calculate exhaust volume and install low-profile box vents painted to match the shingle colour.',
      'roof-repair':'The deep overhanging eaves on the classic Craftsman homes north of Ainsworth Street are notorious for hidden rot where rafter tails meet the fascia board. Years of clogged gutters force water under the drip edge, quietly degrading the timber and starter course. Repairing this requires more than swapping tiles — we cut back the damaged decking, splice in new structural timber for the rafter tails, and integrate ice-and-water shield onto the bare wood before rebuilding the eave.',
      'metal-roofing':'The heavy tree canopy shading the classic homes north of Rosa Parks creates a micro-climate where moss and algae thrive. A slick standing seam surface sheds organic debris effortlessly, preventing damp shaded valleys from turning into rot pockets during the long wet winters. However, the lack of solar heat means condensation underneath the panels takes longer to evaporate, so we install a high-temperature synthetic underlayment and engineer cross-ventilation within the batten space to let moisture escape.',
      'cedar-shake-roofing':'Sourcing top-tier vertical-grain cedar shakes has become a logistical challenge, with many local suppliers pushing lower-grade flat-grain timber that curls and splits after a few harsh seasons. Our direct relationships with specialised mills in British Columbia secure shipments of certified blue-label shakes — consistent thickness, straight grain — that volume-driven companies simply cannot access. Hand-sorting shakes by width to ensure proper keyway offset requires experienced carpenters, not standard roofing labour.',
      'flat-roofing':'Operating hot-air welding equipment and manoeuvring heavy rolls of commercial-grade TPO on the mixed-use buildings along the busy commercial arterials requires meticulous logistical planning. There is virtually no ground space for staging materials, so we coordinate street closures with local traffic authorities and crane the entire roofing system directly onto the deck before work commences. Crews are trained to weld intricate corner details in extremely tight quarters without damaging neighbouring parapet walls.',
    },
  },
  {
    slug:'arbor-lodge', name:'Arbor Lodge', zip:'97217', area:'N Portland',
    avgCost:8000, range:'$5.8k–$11k', commonMaterial:'Asphalt', indexPct:60,
    description:'Tree-canopy-rich N Portland neighbourhood with mature housing stock and growing homeowner investment.',
    highlights:['Dense tree canopy: debris management and gutter guards important','Ranch and bungalow mix — generally simpler rooflines'],
    permitScore:1,
    permitNotes:'Standard permit, no overlay. BDS online portal. Fast approvals typical.',
    serviceContext:{
      'roof-replacement':'Houses on these western slopes take an absolute hammering from the afternoon sun. UV degradation destroys cheap asphalt shingles years before rain ever becomes a problem. For any roof replacement facing west in this area, we strictly specify heavier, algae-resistant architectural shingles. Standard three-tab options will just dry out, curl, and crack under the intense summer heat. Upgrading the material grade ensures the surface granules stay intact, protecting the waterproofing layer beneath for decades instead of just a few years.',
      'roof-repair':'The brutal afternoon sun on these western slopes absolutely cooks older asphalt. By late summer, the thermal shock causes standard shingles to crack and split right down the middle, inviting immediate water ingress when the autumn rains arrive. A proper roof repair here means replacing those damaged sections with heavier, UV-resistant architectural grade materials. If you just smear roof cement into the cracks, the heat will break the seal down completely within a single season.',
      'metal-roofing':'Houses on these western slopes take a brutal beating from the afternoon sun, causing massive thermal expansion. If metal roofing panels are screwed down tight without room to move, the fastener holes elongate and leak. We install specific sliding clips that let the steel expand in the heat and contract when it cools. It stops the notorious popping noises and ensures your weather barrier remains completely watertight for decades.',
      'cedar-shake-roofing':'The harsh afternoon sun on western slopes absolutely destroys lower-grade timber. UV degradation causes standard shakes to split long before rain ever becomes an issue. We strictly install premium, edge-grained heavy cuts for cedar shake roofing facing west. These thicker shakes resist warping and heat damage, ensuring your roof survives the brutal summer sun without cracking apart in five years.',
      'flat-roofing':'The modest bungalows built throughout the area often feature flat-roofed garages or shallow-pitch rear extensions with chronically undersized structural framing. Tearing off multiple layers of old torch-down roofing frequently reveals timber rafters that have deflected deeply under the weight, creating pools that collect standing water. A standard re-roof over this is guaranteed failure. We sister the sagging rafters with engineered lumber to re-establish a rigid level deck before any new membrane touches it.',
    },
  },
  {
    slug:'kenton', name:'Kenton', zip:'97217', area:'N Portland',
    avgCost:7700, range:'$5.5k–$10.5k', commonMaterial:'Asphalt', indexPct:58,
    description:'Historic N Portland neighbourhood with an expanding arts and food scene attracting new homeowners.',
    highlights:['New homeowners discovering deferred maintenance','Bungalow stock with straightforward roof geometries'],
    permitScore:2,
    permitNotes:'Kenton has a historic commercial district but most residential properties are outside the overlay. Standard BDS permit, 1–2 weeks.',
  },

  // ── N Portland continued ──
  {
    slug:'st-johns', name:'St. Johns', zip:'97203', area:'N Portland',
    avgCost:7900, range:'$5.5k–$11k', commonMaterial:'Asphalt', indexPct:60,
    description:'Rapidly evolving N Portland neighbourhood with new homeowner investment driving roofing demand above expectations.',
    highlights:['One of Portland\'s fastest-improving neighbourhoods','Bridge-adjacent: some wind exposure consideration'],
    permitScore:2,
    permitNotes:'St. Johns Town Center has a historic commercial overlay but residential areas are standard permit. BDS online, 1–2 weeks.',
    serviceContext:{
      'roof-replacement':'Running crews in the dense residential blocks extending from Lombard demands strict debris management because of shared alleyways and close-packed homes. Throwing tear-off waste off the eaves indiscriminately risks damaging adjacent windows or parked vehicles. We use specific catch nets and run magnetic sweeps across the property lines daily so no stray fasteners puncture a neighbour\'s tyre. We also consolidate crew vehicles to keep the narrow avenues passable for local traffic and emergency services.',
      'roof-repair':'Securing permits for extensive structural repairs on the mixed-use buildings near the main commercial plaza often triggers mandatory upgrades to fire separation walls if the damage extends to the parapets. A simple fix for a leaking scupper box can escalate into a complex compliance issue if the old framing fails modern commercial safety standards. We provide detailed engineering diagrams and load calculations directly to the local inspectors, proving the repair methods meet or exceed current municipal codes.',
      'metal-roofing':'Many older, boxy mid-century builds near the town centre feature low-slope rooflines right at the edge of minimum pitch for standard metal panels. A snap-lock standing seam on anything below 3/12 is a recipe for catastrophic leaking as wind-driven rain reverses up the panels through capillary action. We specify a mechanically seamed system instead — a robotic seamer crimps the panel edges together twice, creating a watertight structural rib that functions flawlessly on almost-flat profiles.',
      'cedar-shake-roofing':'The aggressive wind shear funnelling off the confluence of the rivers puts immense upward pressure on roofing materials — enough force to rip standard wooden shakes right off the battens. We modify the standard protocol to a severe-weather fastening system: thicker ring-shank stainless steel nails and a reduced weather exposure per shake, overlapping tighter to create a denser protective shield. Discrete pure copper strips near the ridge handle the wind-driven moss growth that follows.',
      'flat-roofing':'The historic brick buildings anchoring the commercial centre hide deeply compromised parapet walls and original scupper boxes that have slowly decayed under decades of patchwork tar repairs. We cannot weld a new membrane directly to crumbling masonry — the sealant will fail as the brick dust shifts. Our process grinds out the degraded mortar joints and custom-fabricates heavy-gauge metal termination bars that anchor deeply into the solid brickwork before the new TPO goes in.',
    },
  },
  {
    slug:'portsmouth', name:'Portsmouth', zip:'97203', area:'N Portland',
    avgCost:7500, range:'$5.2k–$10k', commonMaterial:'Asphalt', indexPct:57,
    description:'Established N Portland neighbourhood with affordable housing and increasing homeowner improvement activity.',
    highlights:['Budget-conscious market: keep proposals clear and value-focused','Ranch homes with low-slope sections common'],
    permitScore:1,
    permitNotes:'One of the easiest permit zones in the city. Standard BDS application, no overlay, fast approvals.',
    serviceContext:{
      'roof-replacement':'The wind shear coming off the Columbia River cut puts continuous uplift strain on slopes facing north of Lombard Street. A standard four-nail application on a replacement will lift and crease within three winters here. We counter this specific wind corridor by upgrading to a six-nail fastening pattern and embedding premium starter strips along all rakes and eaves to lock the perimeter down. Without this change, the first big November blow rips the edge courses straight off.',
      'roof-repair':'Responding to emergency leak calls in the dense residential blocks near Columbia Park requires a service vehicle stocked for everything from shattered skylights to torn valleys in a single visit. The area sees high demand after major storm fronts, so relying on unfamiliar outfits often means waiting weeks while water damages interior plasterboard. We keep local vans loaded with a wide range of shingle colours, heavy-duty tarpaulins, and premium elastomeric sealants so the first visit is also the last.',
      'metal-roofing':'Upgrading to standing seam on homes bordering the local parks often means navigating specific neighbourhood association guidelines on reflectivity and colour. Many local covenants restrict bright, highly reflective finishes that create glare for adjacent properties or distract traffic on Lombard. We source premium panels coated with matte-finish Kynar 500 resins that absorb light while still providing excellent UV protection and durability. We also handle the engineering paperwork and permit acquisitions so the install clears oversight without dispute.',
      'cedar-shake-roofing':'The older craftsman-style bungalows scattered throughout the peninsula were originally designed with skip sheathing to let their wood roofs breathe — a structural quirk modern roofers often miss. If a previous owner laid asphalt directly over the spaced decking, proper conversion back to cedar means stripping to the rafters. We inspect and repair the original timber boards meticulously, keeping the airflow gaps intact while restoring a solid nailing base. Anything less traps moisture and rots the new shakes from underneath.',
      'flat-roofing':'Post-war flat-roofed carports and utility additions are incredibly common up here. The original decking on these structures is usually minimal and heavily water-damaged. We almost always have to tear out the old plywood and re-sheet the deck before laying the TPO insulation. Skipping that step means securing your new, expensive membrane to soft, rotting timber that will not hold a fastener.',
    },
  },
  {
    slug:'cathedral-park', name:'Cathedral Park', zip:'97203', area:'N Portland',
    avgCost:7800, range:'$5.5k–$10.5k', commonMaterial:'Asphalt', indexPct:59,
    description:'Scenic N Portland neighbourhood below the St. Johns Bridge with a mix of housing types and steady demand.',
    highlights:['River proximity: moisture load higher than inner east side','Tourism destination — neighbourhood pride matters'],
    permitScore:2,
    permitNotes:'Standard permit. No historic overlay in residential areas. BDS online, 1–2 weeks.',
    serviceContext:{
      'roof-replacement':'The steep-pitch Victorians clustered toward the bridge present serious framing challenges during replacement. The transition from sharp upper gables to shallower porch roofs often conceals rotted structural members and failed valley flashing. Peeling back the existing layers usually exposes deteriorated ship-lap decking that demands surgical timber repair before a flat nailing surface can be restored. We upgrade these intersections with heavy-gauge \'W\' valley metal woven into synthetic underlayment to handle the concentrated water volume in winter.',
      'roof-repair':'The damp river-adjacent air rising from the Willamette creates a constant battle with thick moss on the northern slopes facing away from the bridge. When moss takes hold, its roots pry up the leading edges of shingles and let wind-driven rain bypass the overlap. Repairing these sections requires careful extraction without shattering adjacent brittle courses. We also install a continuous zinc strip near the ridge so rainwater leaches algaecide down the slope as passive, long-term prevention.',
      'metal-roofing':'Managing long panel deliveries on the steep winding streets leading down to the river requires experienced logistical planning to prevent worksite accidents or property damage. Unfamiliar crews underestimate the staging difficulties and end up with bent materials or blocked narrow thoroughfares. We use agile delivery trucks and coordinate drops meticulously with the fabrication schedule, hoisting panels directly onto the roof rather than leaving them vulnerable on the pavement. Specialised shears replace abrasive saws to keep noise and shavings down.',
      'cedar-shake-roofing':'Navigating the strict historic overlay guidelines near the bridge requires precise documentation when restoring a period-accurate wood roof. The council often dictates exact shake exposure and thickness to match the profile of the Victorian housing stock. We submit detailed material samples and flashing diagrams to preservation officers before any work begins. Modern fire-resistant underlayments get hidden beneath heavy-butt cedar, and all visible metalwork is custom-fabricated from thick-gauge copper so it patinas correctly.',
      'flat-roofing':'Transforming the flat residential additions built on the hillside into functional rooftop decks or green spaces means navigating strict safety codes and structural load requirements. Before a single piece of membrane goes down, we work with structural engineers to prove the framing supports the live load of foot traffic, heavy planters, and saturated soil. We then install ultra-thick PVC membranes engineered specifically to resist root puncture and chemical breakdown from fertilisers.',
    },
  },
  {
    slug:'university-park', name:'University Park', zip:'97203', area:'N Portland',
    avgCost:8100, range:'$6k–$11.5k', commonMaterial:'Asphalt', indexPct:61,
    description:'Stable residential neighbourhood surrounding University of Portland with consistent homeowner investment.',
    highlights:['Academic community drives careful, research-based decisions','Well-maintained housing stock — mostly preventative/replacement'],
    permitScore:1,
    permitNotes:'Standard permit. No overlay. Fast BDS approvals typical in this zone.',
    serviceContext:{
      'roof-replacement':'Those massive two-storey Foursquare homes are brilliant, but their huge central attics act like massive heat traps. The biggest mistake you can make during a roof replacement on these properties is ignoring the exhaust system. We always run a full ventilation calculation before laying down the new weather barrier. By installing upgraded ridge vents and ensuring the soffits are actually clear of old insulation, we stop winter condensation from forming under the decking and rusting out the fasteners prematurely.',
      'roof-repair':'Those massive Foursquare builds often hide slow leaks in the upper attic space for months before the water actually stains your ceiling. By the time you notice, a simple roof repair often turns into replacing massive sections of rotten timber. We always conduct a full interior inspection before touching the exterior shingles. Identifying exactly where the moisture is tracking along the rafters guarantees we fix the actual breach rather than just slapping mastic on a random cracked tile.',
      'metal-roofing':'Those large Foursquare properties have massive central attics that trap immense heat during the summer. If you install metal roofing without proper ventilation, that trapped heat bakes the upper floors. We cut in continuous vented ridge caps and upgrade the soffit intake on every large two-storey job. This cross-ventilation stops condensation forming under the steel panels during winter and significantly drops your upstairs temperature during those brutal August heatwaves.',
      'cedar-shake-roofing':'Those massive Foursquare builds usually suffer from terrible attic ventilation. Trapped humid air bakes cedar shake roofing from the inside out, causing the timber to curl prematurely. During a replacement, we always cut in a continuous ridge vent system. Proper exhaust airflow is non-negotiable for real wood roofs on these large two-storey homes, preventing premature fibre breakdown and rot.',
      'flat-roofing':'Older low-slope structures up here often have terrible drainage plans, resulting in massive mid-roof puddles. Standing water inevitably breaks down flat roof seams over time. Before we roll out any TPO, we custom-cut tapered insulation boards to create an artificial pitch. Directing that runoff straight to the scuppers guarantees you will not have a miniature pond sitting above your ceiling.',
    },
  },
  {
    slug:'linnton', name:'Linnton', zip:'97231', area:'N Portland',
    avgCost:7400, range:'$5k–$10k', commonMaterial:'Asphalt', indexPct:56,
    description:'Small industrial-residential neighbourhood along the Willamette with unique access considerations.',
    highlights:['River road access can limit equipment staging','Industrial adjacency: heavier moss and debris accumulation'],
    permitScore:2,
    permitNotes:'Standard permit. No historic overlay. Access constraints are practical not regulatory. BDS online, 1–2 weeks.',
    serviceContext:{
      'roof-replacement':'Working on these steep, forested hillsides off Highway 30 requires serious safety protocols. You cannot just drop a standard crew onto a precarious pitch with limited access. A proper roof replacement here involves heavy-duty scaffolding and secure fall-arrest systems anchored straight into the main trusses. Furthermore, the massive fir trees drop constant acidic debris. We always recommend installing high-flow gutter guards alongside the new shingles to stop wet needles from backing up under the eaves and rotting the fresh fascia boards.',
      'roof-repair':'Heavy canopy cover dropping acidic debris and extremely steep forested access make working on these hillsides quite precarious. Most simple roof repair jobs here stem from massive fir branches punching holes straight through the decking. We run heavy-duty safety rigging to access these steep pitches safely. When patching impact damage, we always replace the shattered plywood beneath rather than just bridging the gap, ensuring the structural integrity of your roof can withstand the next round of falling timber.',
      'metal-roofing':'Clinging to the steep slopes above Highway 30, homes here are battered by driving rain and heavy commercial emissions rising from the industrial riverfront. Standard painted steel roofs degrade rapidly as airborne particulates combine with relentless moisture to accelerate corrosion along any scratched surface or cut edge. We install heavy-gauge marine-grade aluminium panels instead, eliminating red-rust risk entirely. Fastening density along perimeters is increased and seams double-locked to handle the exposed-bluff wind uplift.',
      'flat-roofing':'Massive fir trees dominating this hillside drop heavy branches and sap constantly onto flat structures. TPO handles the sap well, but sharp impact damage is a serious risk. We heavily recommend upgrading to an 80-mil membrane thickness for flat roofs in this forested area. The extra puncture resistance prevents falling debris from piercing the waterproofing layer and causing hidden internal leaks.',
    },
  },

  // ── West Portland ──
  {
    slug:'forest-park', name:'Forest Park', zip:'97229', area:'NW Portland',
    avgCost:12800, range:'$10k–$20k', badge:'hot', commonMaterial:'Cedar / Metal', indexPct:97,
    description:'Exclusive hillside neighbourhood adjacent to the country\'s largest urban forest. High-end homes demand specialist contractors.',
    highlights:['Highest wind exposure in Portland metro','Cedar shake and metal roof — mandatory for many homes','Limited contractor access: specialist firms only recommended'],
    permitScore:4,
    permitNotes:'Forest Park properties may fall under the Environmental Zone (EZ) or Slope overlay, which can require additional geotechnical review before permitting. Some HOAs add a separate approval layer. Metal roofing may need engineer-stamped drawings. Budget 4–6 weeks for the full permit stack.',
  },
  {
    slug:'west-hills', name:'West Hills', zip:'97225', area:'West Portland',
    avgCost:13200, range:'$10.5k–$22k', commonMaterial:'Cedar / Metal', indexPct:100,
    description:'Portland\'s most prestigious residential area with large estates requiring specialist roofing and maximum material quality.',
    highlights:['Premium market — second only to Lake Oswego','Extreme slope roofs common: safety costs higher','HOA rules may restrict material choices'],
    permitScore:4,
    permitNotes:'West Hills covers multiple zoning overlays including Slope, Environmental, and in some areas historic or scenic resource zones. HOA approval is required before city permit in many developments. Engineer-stamped drawings common for steep-slope metal systems. Allow 4–6 weeks minimum.',
  },
  {
    slug:'council-crest', name:'Council Crest', zip:'97201', area:'SW Portland',
    avgCost:12400, range:'$9.5k–$19k', commonMaterial:'Cedar / Metal', indexPct:94,
    description:'Hilltop neighbourhood at Portland\'s highest point with outstanding views and significant wind exposure.',
    highlights:['Highest elevation in Portland: significant wind uplift risk','Premium material investment strongly recommended','Complex roof geometry on many estate homes'],
    permitScore:4,
    permitNotes:'Scenic Resource Zone designation on some parcels means roofing colour and material may be subject to additional review. Wind uplift requirements may trigger engineer sign-off. Budget 3–5 weeks.',
  },
  {
    slug:'sylvan-highlands', name:'Sylvan-Highlands', zip:'97225', area:'SW Portland',
    avgCost:11800, range:'$9k–$17k', commonMaterial:'Asphalt Premium', indexPct:89,
    description:'Quiet hillside neighbourhood between the West Hills and Beaverton with executive homes and premium roofing demand.',
    highlights:['Hillside access: some properties require specialised rigging','Above-average spend: homeowners invest in 40–50 year materials','Low contractor density: book 6–8 weeks in advance'],
    permitScore:3,
    permitNotes:'Some Sylvan-Highlands properties sit in the Slope overlay requiring a pre-application conference with BDS for steep-slope roofing systems. Standard permits for most replacements-in-kind. Allow 3 weeks.',
  },
  {
    slug:'multnomah-village', name:'Multnomah Village', zip:'97219', area:'SW Portland',
    avgCost:10400, range:'$8k–$14k', badge:'hot', commonMaterial:'Asphalt Premium', indexPct:79,
    description:'Popular SW Portland village with strong community identity and above-average homeowner investment.',
    highlights:['Community focus drives referral culture','Mix of mid-century and Craftsman homes on re-roof cycle','Competitive SW market: get 3+ quotes'],
    permitScore:2,
    permitNotes:'Standard residential permit. No historic overlay on most residential properties. BDS online, 1–2 weeks.',
  },

  // ── Metro / Suburbs ──
  {
    slug:'beaverton', name:'Beaverton', zip:'97005', area:'Washington Co.',
    avgCost:8600, range:'$6.5k–$12k', commonMaterial:'Asphalt', indexPct:65,
    description:"Oregon's second-largest city with a booming tech corridor and high volume of residential re-roofing demand.",
    highlights:['High volume market: contractor availability generally good','Mix of 1980s–90s suburban stock entering re-roof cycle','Washington County permits — different process to PDX city'],
    permitScore:2,
    permitNotes:'Washington County permit rather than City of Portland. The process is comparable in complexity but uses a different portal. Allow 1–2 weeks. No historic overlays in standard residential zones.',
  },
  {
    slug:'hillsboro', name:'Hillsboro', zip:'97006', area:'Washington Co.',
    avgCost:8300, range:'$6k–$11.5k', commonMaterial:'Asphalt', indexPct:63,
    description:'Fast-growing tech hub city with large suburban housing stock and increasing roofing demand from new homeowners.',
    highlights:['Intel campus proximity: strong income base','New construction alongside aging 90s suburban stock','Competitive market: multiple regional contractors active'],
    permitScore:1,
    permitNotes:'City of Hillsboro permit — generally the fastest in the metro area. Standard online application, often approved in 5–7 days. No historic overlays for most residential zones.',
  },
  {
    slug:'gresham', name:'Gresham', zip:'97030', area:'E Multnomah Co.',
    avgCost:7900, range:'$5.5k–$11k', commonMaterial:'Asphalt', indexPct:60,
    description:"Oregon's fourth-largest city with a large and diverse housing stock representing a broad roofing market.",
    highlights:['Value-oriented market: cost-per-sq-ft messaging effective','Large suburban lots with older 1970s–80s housing','MAX Light Rail access makes scheduling easier for contractors'],
    permitScore:1,
    permitNotes:'City of Gresham permit. Streamlined process, typically 5–7 business days for standard replacements. No significant overlay complications.',
    serviceContext:{
      'roof-replacement':'Homes toward Orient Drive take the full force of east wind funnelling out of the Gorge, with freezing rain that accelerates granular loss. Standard sealant strips frequently fail to cure if a replacement happens late in autumn, leaving the install vulnerable to blow-offs during the first freeze. We hand-seal the perimeter tabs and specify shingles with a modified bitumen core, which stays pliable and grips tighter in low temperatures than standard oxidised asphalt.',
      'roof-repair':'Sourcing correct materials for isolated repairs in the older subdivisions toward Kane Drive often involves tracking down shingle profiles manufacturers discontinued over a decade ago. Unskilled crews frequently force incompatible metrics or mismatched colours into an existing grid, leaving an ugly scar that stands out from the street. We maintain a local boneyard of older shingle stocks and keep direct lines with regional suppliers to match the exact exposure and granule blend of the existing system.',
      'metal-roofing':'Retrofitting agricultural or large residential properties toward the county line with heavy-duty metal triggers stricter council scrutiny on stormwater runoff and drainage. The fast-shedding surface of a standing seam roof accelerates rainwater velocity, overwhelming standard gutters and causing ground erosion on adjacent lots. To comply with local water management rules we upgrade the fascia board and install oversized commercial-grade six-inch gutters and larger downspouts sized for the new flow rate.',
      'cedar-shake-roofing':'Many expansive custom-built homes on large estate lots feature multi-pitched rooflines that push traditional wood roofing techniques to their limit. The volume of intricate valleys, flared eaves, and custom dormers means a standard linear installation will not work. Our carpenters hand-cut and shape individual shakes to follow the sweeping curves of the architecture, ensuring water sheds perfectly without compromising the visual flow of the timber. Hidden ridge vents cut directly into the peak replace ugly plastic dome vents.',
      'flat-roofing':'The sprawling commercial buildings and low-slope industrial facilities toward the eastern business parks bear the full brunt of freezing Gorge winds during winter. Standard fully adhered rubber roofs often fail here as relentless freeze-thaw cycles turn the adhesives brittle and let high winds lift the membrane at the corners. We engineer mechanically fastened systems instead, driving heavy-duty plates and reinforced screws deep into the structural steel or concrete decking, and specify TPO that stays flexible in sub-zero temperatures.',
    },
  },
  {
    slug:'lake-oswego', name:'Lake Oswego', zip:'97034', area:'Clackamas Co.',
    avgCost:12400, range:'$9.5k–$19k', badge:'hot', commonMaterial:'Metal / Cedar', indexPct:94,
    description:"Portland's premier lakeside suburb with luxury homes, high incomes, and a market that demands the best roofing money can buy.",
    highlights:['Highest average project value in the metro after West Hills','Lake proximity drives moisture load and premium material choice','HOA rules in many neighbourhoods restrict materials and colours'],
    permitScore:4,
    permitNotes:'City of Lake Oswego permit plus mandatory HOA approval in most neighbourhoods. Lake Oswego enforces strict aesthetic standards — roofing colour, material, and profile may all be subject to HOA Design Review Committee sign-off before the city permit. Budget 4–6 weeks. Metal roofing in some neighbourhoods requires DRC pre-approval.',
  },
  {
    slug:'tigard', name:'Tigard', zip:'97223', area:'Washington Co.',
    avgCost:8700, range:'$6.5k–$12k', commonMaterial:'Asphalt', indexPct:66,
    description:'Established SW suburb with a mix of housing types and strong contractor competition keeping prices fair.',
    highlights:['Good contractor coverage from both Portland and Beaverton firms','1970s–80s suburban ranches well into re-roof window','Value market: architectural shingle offers best ROI'],
    permitScore:1,
    permitNotes:'City of Tigard permit. One of the smoothest processes in the metro — online application, standard 5–7 day approval for like-for-like replacements.',
  },
  {
    slug:'west-linn', name:'West Linn', zip:'97068', area:'Clackamas Co.',
    avgCost:11900, range:'$9k–$18k', commonMaterial:'Asphalt Premium', indexPct:90,
    description:'Affluent Clackamas County suburb with large homes, high homeowner investment, and premium roofing expectations.',
    highlights:['Willamette River bluffs increase wind exposure','Executive homes with complex roof geometry','Premium market: quality asphalt or metal both well-received'],
    permitScore:3,
    permitNotes:'City of West Linn permit. Some bluff-area properties require geotechnical review for steep-slope systems. Standard replacement-in-kind is 1–2 weeks. Wind uplift requirements may apply to metal systems.',
  },
  {
    slug:'oregon-city', name:'Oregon City', zip:'97045', area:'Clackamas Co.',
    avgCost:8200, range:'$6k–$11.5k', commonMaterial:'Asphalt', indexPct:62,
    description:"Historic Oregon capital with a mix of Victorian-era homes and suburban stock representing diverse roofing needs.",
    highlights:['Historic downtown area has older, steeper-pitched roofs','Clackamas County permits: budget extra lead time','Growing market as families move south from Portland'],
    permitScore:3,
    permitNotes:'Oregon City has a Historic District overlay in the original townsite area. Properties within the district may need a Certificate of Appropriateness before standard permit. Suburban areas outside the historic core are straightforward. Allow 2–4 weeks depending on location.',
  },
  {
    slug:'milwaukie', name:'Milwaukie', zip:'97222', area:'Clackamas Co.',
    avgCost:8100, range:'$6k–$11k', commonMaterial:'Asphalt', indexPct:61,
    description:'Riverside suburb south of Portland with strong homeowner community and consistent roofing demand.',
    highlights:['MAX Orange Line access: easy contractor staging','1960s–70s ranch stock heavily in re-roof cycle','Competitive mid-market pricing'],
    permitScore:1,
    permitNotes:'City of Milwaukie permit. Fast, straightforward process. Online application, typically approved in 5–7 business days for standard replacements.',
  },
]

export function getNeighborhoodBySlug(slug: string): Neighborhood | undefined {
  return neighborhoods.find(n => n.slug === slug)
}

export function getStaticNeighborhoodPaths() {
  return neighborhoods.map(n => ({ neighborhood: n.slug }))
}

export const permitLabels: Record<number, { label: string; color: string }> = {
  1: { label: 'Easy',     color: '#2ECC71' },
  2: { label: 'Standard', color: '#F5A623' },
  3: { label: 'Moderate', color: '#E67E22' },
  4: { label: 'Complex',  color: '#E63946' },
  5: { label: 'Maximum',  color: '#C0392B' },
}

// ── Geographic adjacency map ──────────────────────────────────────────────────
const ADJACENT_AREAS: Record<string, string[]> = {
  'Inner NW':        ['NW Portland', 'Inner NE', 'SW Portland'],
  'NW Portland':     ['Inner NW', 'West Portland', 'N Portland'],
  'SW Portland':     ['Inner NW', 'West Portland', 'Inner SE'],
  'West Portland':   ['SW Portland', 'NW Portland', 'Clackamas Co.'],
  'Inner SE':        ['Inner NE', 'SE Portland', 'SW Portland'],
  'SE Portland':     ['Inner SE', 'Clackamas Co.', 'E Multnomah Co.'],
  'Inner NE':        ['NE Portland', 'Inner SE', 'Inner NW'],
  'NE Portland':     ['Inner NE', 'N Portland', 'E Multnomah Co.'],
  'N Portland':      ['NE Portland', 'Inner NW', 'Washington Co.'],
  'E Multnomah Co.': ['SE Portland', 'NE Portland', 'Clackamas Co.'],
  'Clackamas Co.':   ['SE Portland', 'E Multnomah Co.', 'West Portland'],
  'Washington Co.':  ['NW Portland', 'N Portland', 'SW Portland'],
}

/**
 * Returns up to `limit` neighborhoods near `slug`.
 * Priority: (1) same area, (2) adjacent areas, (3) array proximity.
 */
export function getNearbyNeighborhoods(slug: string, limit = 6): Neighborhood[] {
  const current = neighborhoods.find(n => n.slug === slug)
  if (!current) return neighborhoods.filter(n => n.slug !== slug).slice(0, limit)

  const others = neighborhoods.filter(n => n.slug !== slug)

  const sameArea = others
    .filter(n => n.area === current.area)
    .sort((a, b) => b.indexPct - a.indexPct)

  if (sameArea.length >= limit) return sameArea.slice(0, limit)

  const adjAreas = ADJACENT_AREAS[current.area] ?? []
  const adjacent = others
    .filter(n => adjAreas.includes(n.area) && !sameArea.find(s => s.slug === n.slug))
    .sort((a, b) => b.indexPct - a.indexPct)

  const combined = [...sameArea, ...adjacent]
  if (combined.length >= limit) return combined.slice(0, limit)

  const idx = neighborhoods.findIndex(n => n.slug === slug)
  const proximity = others
    .filter(n => !combined.find(c => c.slug === n.slug))
    .sort((a, b) => {
      const ai = neighborhoods.findIndex(x => x.slug === a.slug)
      const bi = neighborhoods.findIndex(x => x.slug === b.slug)
      return Math.abs(ai - idx) - Math.abs(bi - idx)
    })

  return [...combined, ...proximity].slice(0, limit)
}

