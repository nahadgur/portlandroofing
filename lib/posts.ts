export interface PostSection {
  title: string;
  body: string;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  sections: PostSection[];
}

export const posts: Post[] = [
  {
    slug: "best-roofing-materials-oregon-climate",
    title: "Best Roofing Materials for the Oregon Climate",
    description:
      "Compare asphalt shingles, metal, cedar shake, and flat roofing membranes to find the best material for your Oregon home based on rain, snow, wind, and UV exposure in your region.",
    date: "2025-11-15",
    author: "Oregon Roofing",
    readTime: "8 min read",
    sections: [
      {
        title: "Oregon's Climate Challenges for Roofing",
        body: "Oregon's roofing conditions are among the most demanding in the country. The Willamette Valley receives 40 to 50 inches of rain annually, sustaining moisture levels that promote moss, algae, and wood rot. Coastal communities from Astoria to Coos Bay endure salt air, sustained winds exceeding 60 mph during winter storms, and annual rainfall totals that can surpass 80 inches. Central Oregon around Bend and Sisters faces a completely different challenge: heavy snow loads, intense UV radiation at elevation, and dramatic freeze-thaw cycles. Southern Oregon adds wildfire risk to the equation, with communities like Medford and Ashland increasingly requiring fire-resistant roofing materials. No single material is perfect for every part of the state, so understanding your local conditions is the first step toward a sound roofing decision.",
      },
      {
        title: "Architectural Asphalt Shingles",
        body: "Architectural shingles remain the most popular roofing material in Oregon, covering approximately 70 percent of residential roofs statewide. Modern architectural shingles are a significant improvement over the three-tab shingles of previous decades, offering dimensional profiles, Class A fire ratings, and wind resistance up to 130 mph when properly installed. For Oregon's wet climate, look for shingles with algae-resistant granules, which slow the growth of dark streaks common on Pacific Northwest roofs. Premium lines from manufacturers like CertainTeed, GAF, and Owens Corning offer 30 to 50 year warranties and enhanced impact resistance. The main limitation in Oregon is moss growth, which requires ongoing prevention treatment regardless of the shingle brand. Asphalt shingles perform well in every Oregon region, though they require more maintenance in high-moisture and heavily shaded areas.",
      },
      {
        title: "Standing Seam Metal Roofing",
        body: "Metal roofing is the fastest-growing segment in Oregon's residential roofing market, and the reasons are compelling. A standing seam metal roof sheds rain instantly without absorbing moisture, resists moss growth naturally due to its smooth surface, and handles heavy snow loads by allowing controlled shedding. In coastal cities like Astoria and Newport, marine-grade aluminum or Galvalume steel panels resist salt air corrosion far better than standard roofing materials. In Central Oregon, metal roofs prevent the ice damming that plagues shingle roofs during freeze-thaw cycles. The 40 to 70 year lifespan means most homeowners will never need another roof. Energy-efficient reflective coatings reduce summer cooling costs by 10 to 25 percent. The primary barriers are higher upfront cost and the need for specialized installation, as improper metal roofing installation leads to oil-canning, leaks, and noise issues that give the material an undeserved bad reputation.",
      },
      {
        title: "Cedar Shake and Shingles",
        body: "Western red cedar has been a roofing staple in the Pacific Northwest for over a century, and Oregon homes showcase some of the finest cedar shake work in the country. Cedar offers natural resistance to moisture, insects, and decay thanks to its inherent oils, and it provides superior insulation with an R-value roughly twice that of asphalt shingles. Hand-split shakes deliver a dramatic, textured look that complements Craftsman, lodge, and Northwest contemporary architecture. The tradeoffs are real, however. Cedar shake requires dedicated maintenance every five to seven years including cleaning, treatment, and replacement of damaged pieces. Fire resistance is a concern in wildfire-prone areas of Southern and Central Oregon, though modern pressure-applied fire retardant treatments achieve Class B and even Class A ratings. Cedar performs best in the Portland metro, Willamette Valley, and coastal areas where humidity keeps the wood supple and prevents the drying and cracking that shortens its life in arid climates.",
      },
      {
        title: "Flat Roofing Membranes: TPO, EPDM, and Modified Bitumen",
        body: "Many Oregon homes include flat or low-slope roof sections, from mid-century modern designs to garage roofs, dormers, and room additions. In Oregon's rainy climate, flat roof performance depends entirely on the quality of the membrane and the drainage design. TPO (thermoplastic polyolefin) has become the most specified flat roofing material in the state due to its heat-welded seams, which create a monolithic waterproof surface. EPDM rubber roofing offers a proven 50-year track record and excellent flexibility in cold temperatures, making it a strong choice for mountain communities. Modified bitumen provides multi-layer redundancy and handles foot traffic well, making it popular for commercial applications. Regardless of the membrane chosen, proper slope and drainage are non-negotiable in Oregon. A flat roof must have a minimum slope of one-quarter inch per foot to prevent ponding, the leading cause of premature flat roof failure.",
      },
      {
        title: "Choosing the Right Material for Your Region",
        body: "For the Portland metro and Willamette Valley, architectural shingles with algae-resistant granules offer the best balance of cost, performance, and appearance, with cedar shake as a premium alternative for homeowners willing to invest in maintenance. Coastal homeowners should prioritize standing seam metal in aluminum or Galvalume steel for its wind resistance and corrosion tolerance. Central Oregon around Bend and Sisters benefits most from metal roofing due to snow load performance, UV resistance, and low maintenance in a dry climate. Southern Oregon homeowners in fire-risk zones should select Class A fire-rated materials, with metal roofing or fire-treated cedar shake as the top options. Eastern Oregon's continental climate with temperature extremes favors metal roofing for its durability across all seasons. Consult with a local contractor who understands your specific microclimate, as conditions can vary significantly even within a single city.",
      },
    ],
  },
  {
    slug: "when-to-replace-your-roof-warning-signs",
    title: "When to Replace Your Roof: Warning Signs Every Oregon Homeowner Should Know",
    description:
      "Learn the key warning signs that indicate your Oregon roof needs replacement, from age and granule loss to sagging, leaks, and rising energy bills.",
    date: "2025-12-03",
    author: "Oregon Roofing",
    readTime: "6 min read",
    sections: [
      {
        title: "Age of Your Roof",
        body: "The single most reliable indicator of replacement timing is your roof's age relative to the expected lifespan of its materials. Standard three-tab asphalt shingles last 15 to 20 years in Oregon's climate, while architectural shingles typically perform for 25 to 30 years. Metal roofing can last 40 to 70 years, and cedar shake falls in the 30 to 40 year range with proper maintenance. If you do not know your roof's age, check the permit records with your local building department, ask previous owners, or have a contractor estimate the age based on the material condition. A roof approaching the end of its expected lifespan deserves a professional inspection even if it appears functional from the ground, because internal deterioration often precedes visible exterior symptoms by several years.",
      },
      {
        title: "Granule Loss on Asphalt Shingles",
        body: "Asphalt shingles are coated with ceramic granules that protect the underlying asphalt from UV degradation and provide fire resistance. As shingles age, these granules loosen and wash off. Check your gutters and downspout discharge areas for accumulations of coarse, sand-like material. Some granule loss is normal on new roofs as excess manufacturing granules shed, but significant granule loss on a roof older than 10 years signals that the shingles are nearing the end of their useful life. Bare patches where the black asphalt substrate is visible indicate urgent replacement need. In Oregon, granule loss accelerates on south-facing and west-facing slopes that receive the most direct sunlight and UV exposure.",
      },
      {
        title: "Curling, Cracking, and Missing Shingles",
        body: "Shingle distortion takes two primary forms: cupping, where the edges turn upward, and clawing, where the center buckles while the edges stay flat. Both indicate moisture damage, inadequate ventilation, or material failure. Cracking along the surface of shingles is caused by thermal cycling and age. Missing shingles from wind damage leave the underlayment exposed and create pathways for water entry. If you can count more than a few affected shingles from the ground, the problem is likely widespread. One or two missing shingles after a storm is a repair situation, but widespread curling, cracking, or loss across multiple roof planes points to systemic failure that replacement will solve more reliably than repeated spot repairs.",
      },
      {
        title: "Sagging Roof Deck",
        body: "A sagging or uneven roof line is one of the most serious warning signs and requires immediate professional evaluation. Sagging indicates that the structural deck beneath the roofing materials has been compromised by prolonged moisture exposure, rot, or inadequate support. In Oregon, persistent rain combined with poor attic ventilation is the most common cause. Look along the ridge line for dips and along the eaves for waviness when viewing the roof from a distance. From inside the attic, check the underside of the decking for dark stains, soft spots, and visible rot. A sagging roof is a structural concern that goes beyond roofing and may require engineering assessment, deck replacement, and potentially rafter reinforcement before new roofing can be installed.",
      },
      {
        title: "Interior Water Stains and Leaks",
        body: "Water stains on ceilings and walls, peeling paint near rooflines, and musty odors in the attic are clear signals that your roof is failing to keep water out. In Oregon, leaks often first appear around chimneys, skylights, plumbing vents, and valley intersections where flashing deteriorates over time. A single leak caught early can be a simple repair, but multiple leaks or recurring leaks in the same area despite previous repairs suggest that the roofing system has degraded beyond the point of reliable repair. Pay attention during heavy rain events and inspect your attic during daylight hours for pinpoints of light penetrating the deck, which indicate holes or gaps in the roofing above.",
      },
      {
        title: "Rising Energy Bills",
        body: "A failing roof often compromises the thermal envelope of your home before any visible leaks appear. If your heating costs have increased steadily over several years without changes in your heating system or insulation, your roof may be losing its insulating properties. Deteriorated shingles, compressed or water-damaged attic insulation, and inadequate ventilation all contribute to heat loss through the roof. In Oregon, where heating dominates energy costs from October through April, this can represent hundreds of dollars annually. A professional energy audit can confirm whether your roof is the weak point in your home's thermal performance and help justify the investment in replacement.",
      },
      {
        title: "Moss Damage Beyond Treatment",
        body: "Moss is ubiquitous on Oregon roofs, particularly on north-facing slopes and in shaded areas. While surface moss can be managed with zinc sulfate treatments and preventive strips, long-established moss causes permanent damage. Moss roots grow beneath shingle edges, lifting them and creating channels for water penetration. When you can see thick moss mats that have been present for years, the shingles underneath have likely sustained irreversible damage. If a contractor removes heavy moss and finds that the shingles beneath are crumbling, brittle, or missing significant granules, the roof has reached the point where replacement is the only effective solution. Ongoing moss prevention on a new roof is far less costly than the damage cycle of neglect and removal on an aging one.",
      },
    ],
  },
  {
    slug: "oregon-roofing-permits-what-homeowners-need-to-know",
    title: "Oregon Roofing Permits: What Homeowners Need to Know",
    description:
      "Understand Oregon's roofing permit requirements, including when permits are needed, what they cost, the inspection process, and why skipping permits is a costly mistake.",
    date: "2026-01-10",
    author: "Oregon Roofing",
    readTime: "7 min read",
    sections: [
      {
        title: "When Is a Roofing Permit Required in Oregon?",
        body: "Oregon requires building permits for all full roof replacements, regardless of the municipality. The Oregon Residential Specialty Code governs residential roofing work statewide, though individual cities and counties may impose additional requirements. A permit is typically required whenever you are removing existing roofing materials down to the deck and installing new materials. Most jurisdictions also require permits for structural repairs to the roof deck, adding new penetrations such as skylights or vents, and changing roofing materials in ways that affect the structural load. Minor repairs such as replacing a few shingles or resealing flashing generally do not require a permit, though the line between repair and replacement varies by jurisdiction. When in doubt, contact your local building department before work begins.",
      },
      {
        title: "Permit Costs Across Oregon",
        body: "Roofing permit fees in Oregon range from approximately $150 to $500 for a standard residential project, though fees vary by jurisdiction and are often calculated as a percentage of the project's total value. Portland charges permit fees based on the project valuation using a graduated fee schedule, with a typical residential roof replacement permit costing $250 to $400. Smaller cities like Albany, Roseburg, and Baker City tend to have lower flat-rate fees in the $150 to $250 range. Some jurisdictions charge additional plan review fees, technology surcharges, or state surcharges that add $50 to $100 to the base permit cost. Your roofing contractor should include the permit cost in their estimate and handle the application process on your behalf.",
      },
      {
        title: "The Permit Application Process",
        body: "In most Oregon jurisdictions, the permit application requires the property address, a description of the work to be performed, the type and manufacturer of roofing materials, the contractor's CCB license number, and the estimated project value. Some jurisdictions require a simple site plan showing the roof area and any new penetrations. Portland and larger cities offer online permit applications that can be processed in one to three business days for straightforward roof replacements. Smaller jurisdictions may require in-person applications with processing times of three to seven business days. Your contractor typically handles the entire application process, as they have established relationships with local building departments and understand the specific documentation requirements for each jurisdiction.",
      },
      {
        title: "What Inspectors Look For",
        body: "Oregon roofing inspections verify that the installation meets the Oregon Residential Specialty Code and the manufacturer's installation specifications. Inspectors check that the correct underlayment is installed, with ice and water shield required in valleys and at eaves in many jurisdictions. They verify proper nailing patterns, flashing installation at all penetrations and transitions, adequate ventilation, and correct starter strip and ridge cap installation. For metal roofing, inspectors check panel overlap, fastener placement, and thermal expansion allowances. Flat roofing inspections focus on membrane seam integrity, drainage slope, and edge detail termination. Most residential roof replacements require a single inspection upon completion, though some jurisdictions may require a mid-project inspection of the underlayment before the finish roofing is applied.",
      },
      {
        title: "Consequences of Skipping Permits",
        body: "Homeowners who allow unpermitted roofing work face several serious consequences. If the work is discovered during a future home sale, the buyer's inspector or lender may require the roof to be brought into compliance, potentially at the current homeowner's expense. Unpermitted work can void your homeowner's insurance coverage for roof-related claims, leaving you personally liable for water damage, structural issues, or injuries. In Oregon, the building department can issue stop-work orders and require the unpermitted work to be exposed for inspection, adding significant cost to the project. Additionally, unpermitted work performed by a contractor is a violation of Oregon CCB regulations and can result in penalties for both the contractor and the homeowner. The cost of a permit is a small fraction of the total project and provides important legal and financial protection.",
      },
      {
        title: "Special Requirements by Region",
        body: "Certain Oregon regions impose additional roofing requirements beyond the base state code. Coastal communities from Astoria to Coos Bay often enforce enhanced wind resistance standards, requiring higher wind-rated materials and more frequent fastening patterns. Bend and Central Oregon jurisdictions require engineering documentation for snow load compliance, which may mandate specific deck thickness, rafter spacing, and material weight limits. Communities in wildfire-prone areas of Southern Oregon, including parts of Jackson and Josephine counties, may require Class A fire-rated roofing assemblies. Historic districts in cities like Jacksonville, Astoria, and portions of Portland require design review approval before a roofing permit is issued, which can add weeks to the timeline and restrict material and color choices. Your contractor should be familiar with all local requirements specific to your property's location.",
      },
      {
        title: "How Permits Protect Homeowners",
        body: "Building permits exist primarily to protect homeowners, not to create bureaucratic obstacles. A permitted project has been reviewed for code compliance before work begins, inspected during or after installation, and documented in the public record. This documentation proves to future buyers, insurance companies, and lenders that the work was performed to professional standards. If a permitted project fails to pass inspection, the contractor is responsible for correcting the deficiencies at no additional cost to the homeowner. The permit record also establishes a clear timeline for warranty purposes, confirming when the roof was installed and by whom. For a project as significant and expensive as a roof replacement, the modest cost and effort of obtaining a permit delivers meaningful protection that lasts for the life of the roof.",
      },
    ],
  },
  {
    slug: "oregon-hb4029-solar-roofing-guide",
    title: "Oregon HB 4029: What Homeowners Need to Know Before Re-Roofing for Solar",
    description:
      "Oregon's first solar consumer protection law takes effect June 5, 2026. If you're planning to re-roof ahead of a solar installation, here's exactly what changes and what to ask your contractors before signing anything.",
    date: "2026-04-08",
    author: "Oregon Roofing",
    readTime: "6 min read",
    sections: [
      {
        title: "What Is HB 4029 and Why Does It Matter for Roofers?",
        body: "Oregon House Bill 4029, signed by Governor Tina Kotek on March 5, 2026, is the state's first dedicated solar consumer protection law. It takes effect June 5, 2026, and it directly affects any Oregon homeowner planning to add solar panels, whether to a new roof or an existing one. While HB 4029 is technically a solar law, it has practical implications for roofing decisions because the two projects are increasingly bundled. Homeowners planning a roof replacement in the next 12 months who also intend to add solar should understand the new rules before signing any contract with any contractor.",
      },
      {
        title: "What HB 4029 Requires",
        body: "HB 4029 establishes three core requirements for solar contractors in Oregon. First, written disclosure before sale: before any solar contract is signed, the installer must provide a plain-language document itemising all costs, financing terms, estimated energy production, and the full terms of any lease or power purchase agreement. Second, contract and warranty standards: agreements must meet minimum defined requirements including clear timelines, cancellation rights, and warranty terms. Third, licensing compliance: solar contractors must meet strengthened licensing requirements as defined by the law. If a solar contractor cannot produce a fully itemised written disclosure before you sign, they will be in violation of Oregon law as of June 5, 2026.",
      },
      {
        title: "The Roofing Connection: Why This Affects Your Re-Roofing Decision",
        body: "Roof replacement and solar installation are closely linked decisions. Most solar installers require a roof with at least 10 to 15 years of remaining life, and many homeowners replace their roof immediately before installing solar to avoid the cost of removing and reinstalling panels later. If you are planning this sequence, HB 4029 affects the second half of that plan. It means the solar contractor you hire after your roof is complete will be legally required to give you a full written disclosure before any agreement is signed. The law closes a gap that previously allowed aggressive solar sales tactics to pressure homeowners into signing without fully understanding costs or terms.",
      },
      {
        title: "What to Ask Your Roofing Contractor About Solar Compatibility",
        body: "If you know solar is in your future, raise it with your roofing contractor before work begins. A solar-aware roofer will orient roof sections to maximise south-facing exposure, specify structural reinforcement for panel load bearing if needed, use conduit-friendly underlayments that make future electrical routing easier, and avoid materials that complicate panel attachment, such as certain types of slate or tile. Ask directly whether they have worked on roofs subsequently fitted with solar panels, and whether the proposed specification will support your intended system size.",
      },
      {
        title: "How to Check Solar Contractor Compliance After June 5",
        body: "From June 5, 2026, any reputable Oregon solar contractor should be able to provide a written pre-sale disclosure document without being asked. Make the disclosure your first test when getting solar quotes. Ask each contractor for their HB 4029 compliance documentation before the site visit. A contractor who cannot produce it, or who is unfamiliar with the requirement, is a contractor to avoid. Oregon's Construction Contractors Board maintains a public licence verification tool at oregon.gov which you should use to confirm that any contractor holds a valid, current CCB licence. For solar, verify both the CCB licence and any required electrical licensing for the inverter and grid connection work.",
      },
      {
        title: "The Timing Opportunity: Roofing Costs Are Rising Now",
        body: "Beyond the regulatory change, April 2026 is a significant moment for roofing costs. Major shingle manufacturers including GAF, CertainTeed, Atlas, and TAMKO have implemented price increases of 5 to 8 percent effective between March 23 and April 15, 2026. These are confirmed, industry-wide increases, not projections. Homeowners who complete their roof replacement before their contractor's material orders reflect these increases will see lower project costs than those who wait. If your roofing and solar plans are for 2026, moving the roofing phase forward by even a few weeks could save several hundred dollars on materials alone, and positions you to engage solar contractors under the stronger consumer protections HB 4029 provides from June 5.",
      },
    ],
  },
  {
    slug: "roofing-cost-portland-2026",
    title: "How Much Does a Roof Cost in Portland in 2026?",
    description: "Portland roof replacement costs range from $8,500 to $18,000 for most homes. Here is what drives the price, what materials make sense in the Portland climate, and how the April 2026 manufacturer price increases affect your project.",
    date: "2026-04-01",
    author: "Oregon Roofing",
    readTime: "7 min read",
    sections: [
      {
        title: "What Portland Homeowners Are Actually Paying",
        body: "The average roof replacement in Portland costs around $12,500 for a standard 1,800 to 2,200 square foot home using architectural asphalt shingles. That figure sits at approximately 71% of the Oregon statewide average on our cost index, which makes Portland a mid-to-high market relative to cities like Roseburg or Baker City, but more affordable than premium suburbs like Lake Oswego, where the average climbs to $14,500. The $8,500 to $18,000 range reflects real variation: a simple single-story gable roof on a 1,500 square foot Portland bungalow will come in near the bottom; a steep, complex roofline on a 2,800 square foot Craftsman in the West Hills will approach the top. Material choice, pitch complexity, and whether your deck needs replacement all shift the number significantly. As of April 2026, major manufacturers including GAF, CertainTeed, and Atlas have implemented 5 to 8 percent price increases on all residential shingle products, which adds $400 to $900 to a typical Portland project depending on roof size.",
      },
      {
        title: "Portland Climate and What It Means for Your Roof",
        body: "Portland receives an average of 37 inches of rain annually, with the bulk falling as persistent drizzle between October and April rather than heavy storms. This sustained moisture is harder on roofs than high-rainfall events because it keeps the surface continuously damp, creating ideal conditions for moss, algae, and the biological growth that erodes shingle granules over time. The city also sits in a moderate seismic zone and experiences occasional windstorms, particularly in the Columbia River corridor on the east side. For Portland homes, the priority specification is algae-resistant shingles with a Class 4 impact rating — the impact rating matters not just for hail but for the debris and branch strikes that come with Portland's tree canopy. Attic ventilation is the most underspecified element in Portland roofing: inadequate ridge and soffit ventilation causes condensation during temperature swings between wet cold days and warm spells, leading to deck rot that can add $2,000 to $5,000 to a replacement cost.",
      },
      {
        title: "Material Comparison for Portland Homes",
        body: "Architectural asphalt shingles remain the dominant choice in Portland, covering roughly 75 percent of residential roofs in the metro area. They offer the best cost-to-performance ratio for the climate and are available with 30 to 50 year warranties. Metal roofing is the fastest-growing segment: standing seam metal sheds rain instantly, resists moss growth naturally due to its smooth surface, and lasts 40 to 70 years without the maintenance cycle that asphalt requires. The premium is real — metal costs $18,000 to $30,000 for a typical Portland home — but the lifecycle cost is lower when you account for avoiding one or two replacement cycles. Cedar shake remains popular in historic neighbourhoods like Laurelhurst and Irvington, where it complements the architecture, but requires biannual moss treatment to maintain its fire rating and prevent premature failure. Flat roofing on Portland additions and garages performs best with TPO, which handles the sustained rain load without seam failures common in older EPDM installations.",
      },
      {
        title: "What the April 2026 Price Increases Mean for Your Portland Project",
        body: "The April 15, 2026 price increases from GAF, CertainTeed, Atlas, and TAMKO are the most significant coordinated manufacturer hike since 2023. For Portland homeowners, the practical impact is $400 to $900 added to a standard asphalt shingle replacement, depending on roof size and the specific product specified. Contractors who placed material orders before the effective date can often hold their quoted price through their order window, so the first question to ask any contractor is when they plan to purchase materials relative to your project start date. Metal roofing is less affected by the April increases, which apply primarily to asphalt products, though steel prices remain elevated from the 2025 tariff increases. If you are planning a Portland roof replacement in the next 60 to 90 days, the calculus is clear: getting contracts in place sooner reduces exposure to further cost escalation that industry analysts expect through the summer of 2026.",
      },
      {
        title: "Permits and What to Expect in Portland",
        body: "Portland requires a permit for all full roof replacements, with applications processed through the Bureau of Development Services. For a standard residential project, permit fees typically run $250 to $400, calculated as a percentage of the total project valuation. Processing times for straightforward replacement permits average 5 to 7 business days online; projects that involve structural changes, new skylights, or historic district properties require design review and can take 3 to 6 weeks. Your CCB-licensed contractor should handle the permit application as part of the contract scope — if a contractor quotes a job without mentioning the permit, ask directly. Unpermitted roofing work in Portland creates liability issues at resale, can void your homeowner's insurance for related claims, and may trigger a stop-work order if discovered during adjacent inspections. The permit inspection verifies underlayment, flashing, ventilation, and fastening before and after installation.",
      },
    ],
  },
  {
    slug: "oregon-wildfire-roof-fire-rating",
    title: "Oregon Wildfire Season: Is Your Roof Fire-Rated?",
    description: "Wildfires have burned over 500,000 Oregon acres in recent years. Your roof is the most vulnerable point of ember intrusion. Here is what Class A, B, and C ratings mean, which materials qualify, and what Southern Oregon jurisdictions now require.",
    date: "2026-03-15",
    author: "Oregon Roofing",
    readTime: "6 min read",
    sections: [
      {
        title: "Why Your Roof Is the Wildfire Vulnerability",
        body: "When wildfires threaten Oregon communities, the primary mechanism of home ignition is not direct flame contact — it is ember transport. Burning embers can travel up to a mile ahead of the fire front, landing on and igniting roofing materials, accumulating in valleys and gutters, and entering vents and attic spaces. In post-fire surveys conducted by the Insurance Institute for Business and Home Safety, roofing material was identified as the ignition point in the majority of homes lost to ember exposure. Southern Oregon has seen the consequences directly: communities in Jackson, Josephine, and Klamath counties have experienced repeated seasons of evacuation orders and structure losses. The 2020 Labor Day fires, which burned through parts of Talent, Phoenix, and the Almeda corridor, destroyed thousands of structures and demonstrated that proximity to vegetation alone does not determine outcomes — roofing specification does.",
      },
      {
        title: "Understanding Class A, B, and C Fire Ratings",
        body: "Fire ratings for roofing materials are established under ASTM E108 and UL 790 testing protocols, which measure resistance to external flame exposure, burning brand tests, and intermittent flame exposure. Class A is the highest rating, providing effective protection against severe fire exposure; Class B offers protection against moderate exposure; and Class C covers light fire exposure only. Unrated or combustible roofing materials — older wood shakes without treatment, certain synthetic products, and deteriorated materials — provide no meaningful resistance. Class A materials include concrete and clay tile, metal roofing, and asphalt shingles with fiberglass reinforcement. Cedar shake is naturally Class C and can achieve Class B or A ratings only with pressure-applied fire retardant treatments, which must be renewed over the material's life as the treatment degrades. Most new architectural asphalt shingles carry a Class A rating as standard.",
      },
      {
        title: "What Southern Oregon Jurisdictions Now Require",
        body: "Oregon's statewide residential building code establishes a baseline of Class B for roofing in most areas. However, communities in designated Wildland-Urban Interface zones have adopted stricter requirements. Jackson County requires Class A roofing assemblies for new construction and re-roofing in WUI zones, which covers substantial portions of the Medford, Ashland, Jacksonville, and Eagle Point areas. Josephine County has similar requirements covering Grants Pass and surrounding communities. Klamath Falls has expanded its WUI designations following successive fire seasons. Before starting any roofing project in Southern Oregon, confirm your property's WUI classification with the local building department — the classification can vary by parcel even within the same neighbourhood. Some homeowners have also discovered that their insurance carrier independently requires Class A roofing as a condition of coverage in high-risk zones, separate from local code requirements.",
      },
      {
        title: "Best Roofing Materials for Fire-Prone Oregon Areas",
        body: "Metal roofing is the strongest performer in fire-prone areas and carries a Class A fire rating as standard without any additional treatment. Standing seam metal eliminates the fastener penetrations where ember intrusion can occur, and its smooth surface prevents ember accumulation in the way that textured shingles or shake can. Concrete tile carries a Class A rating and performs excellently in the dry climates of Central and Southern Oregon, though its weight requires structural verification before installation on older homes. For homeowners committed to an asphalt product, look specifically for Class A-rated architectural shingles from manufacturers like GAF, CertainTeed, or Owens Corning — confirm the fire rating in the product specification sheet rather than relying on general claims. Sealed soffit vents and metal valley flashing are the most cost-effective additions to any roofing project in a fire-prone area, blocking the two most common ember intrusion points regardless of the primary material chosen.",
      },
      {
        title: "Maintenance That Reduces Wildfire Risk",
        body: "Even a Class A-rated roof can fail if it is not maintained. Debris accumulation in gutters and valleys creates fuel for ember ignition and is one of the leading causes of structure loss in communities that otherwise have compliant roofing. In fire-prone Oregon areas, clear gutters at least twice per year — once in late spring before fire season begins, and once in late fall after leaf drop. Remove any accumulated debris from roof valleys, around skylights, and at the junction of the roof and any penetrations. Keep trees trimmed so that no branches overhang the roof by more than a few feet. For homes with wood shake roofs, have the fire retardant treatment inspected and renewed on the manufacturer's schedule — treatment that was effective at installation may have degraded after 5 to 7 years. A CCB-licensed roofing contractor familiar with your area can assess the current state of your roof's fire resistance during an inspection.",
      },
    ],
  },
  {
    slug: "metal-roof-vs-asphalt-oregon-rain",
    title: "Metal Roof vs Asphalt Shingles in Oregon's Rain Belt",
    description: "Oregon's wet climate puts roofing materials to a sustained test. This comparison covers cost, lifespan, moss resistance, installation, and long-term value for the specific conditions found in the Willamette Valley, Portland Metro, and coastal communities.",
    date: "2026-02-20",
    author: "Oregon Roofing",
    readTime: "8 min read",
    sections: [
      {
        title: "The Oregon Context: Why This Comparison Is Different",
        body: "Comparing metal roofing to asphalt shingles in Oregon is not the same exercise as making that comparison in Arizona or Texas. Oregon's rain belt — which stretches from the Columbia River south through the Willamette Valley and along the entire coast — creates sustained moisture conditions that compress the effective lifespan of asphalt shingles and make biological growth management a recurring cost that owners of metal roofs largely avoid. The Willamette Valley averages 40 to 50 inches of rainfall per year. Coastal communities from Astoria to Coos Bay routinely see 60 to 80 inches. Portland receives 37 inches but over more than 150 days of measurable precipitation annually, which means roofing surfaces are wet far more days than the total rainfall suggests. Both materials can perform well in these conditions, but the maintenance requirements, effective lifespan, and long-term cost profile are meaningfully different in Oregon compared to drier climates.",
      },
      {
        title: "Cost: Upfront and Over 30 Years",
        body: "For a typical Oregon home of 2,000 square feet, architectural asphalt shingles cost $9,000 to $16,000 installed. Standing seam metal roofing for the same home runs $18,000 to $32,000. The upfront gap is real and significant. Over 30 years, however, the calculus shifts. Asphalt shingles in Oregon's climate typically require replacement at 20 to 25 years — the sustained moisture accelerates granule loss and biological growth compared to drier climates. A homeowner replacing asphalt at year 22 spends the original installation cost again, adjusted for inflation and the continued cost trajectory of materials. A metal roof installed today in Oregon should still be performing at year 40 to 50 without replacement. Adding the two asphalt cycles together and comparing against one metal installation brings the 50-year cost of each option closer to parity. The breakeven point, accounting for compounding material costs, is typically 18 to 22 years for most Oregon homeowners.",
      },
      {
        title: "Moss and Biological Growth: The Most Underestimated Oregon Factor",
        body: "Moss is the most significant practical difference in maintenance between the two materials in Oregon. Asphalt shingles provide a textured, granule-covered surface that retains moisture between rain events, creating ideal conditions for moss and algae spores to germinate. Left untreated, moss establishes roots beneath shingle edges, lifting them and creating pathways for water infiltration. Active moss on an asphalt roof in Oregon requires chemical treatment every 2 to 3 years and physical removal as needed, with costs ranging from $300 to $800 per treatment cycle. Over 20 years that adds $2,000 to $4,000 to the total cost of ownership. Metal roofing, by contrast, provides a smooth surface that sheds water immediately and does not retain the moisture that moss requires to establish. Metal roofs in Oregon virtually never develop moss problems and require no biological growth treatment. For homes in heavily shaded areas — common in Portland neighbourhoods and coastal communities — this difference is the single largest practical factor in the material comparison.",
      },
      {
        title: "Installation and Oregon-Specific Considerations",
        body: "Both materials require skilled installation to perform in Oregon's conditions, but the consequences of poor installation differ. With asphalt shingles, inadequate attic ventilation is the most common installation failure in Oregon — it causes moisture buildup that rots the deck and compresses insulation, often without visible exterior symptoms until the damage is extensive. Verify that any asphalt installation includes a proper ventilation assessment. With metal roofing, the most common failure mode is improper panel attachment and insufficient allowance for thermal expansion. Standing seam systems with concealed fasteners handle thermal movement better than exposed-fastener panels and are strongly preferred for Oregon applications. Coastal installations require marine-grade specifications: aluminum or Galvalume steel panels with marine-grade sealants and stainless or hot-dipped galvanised fasteners to resist salt-air corrosion. A contractor unfamiliar with coastal Oregon conditions may use inland-standard fasteners that show corrosion within 5 years.",
      },
      {
        title: "Which Is Right for Your Oregon Home?",
        body: "For most Oregon homeowners on a standard replacement budget, quality architectural asphalt shingles remain the most practical choice — they perform well in the climate with appropriate maintenance, carry strong warranties, and can be installed by the widest pool of local contractors. Choose algae-resistant shingles with a Class 4 impact rating as a baseline, and budget for moss treatment every 2 to 3 years in shaded areas. Metal roofing makes the most financial sense for homeowners planning to stay in their home for 20 or more years, those in heavily shaded or high-rainfall locations, those on the Oregon coast where salt air demands specialised maintenance on asphalt anyway, and those who want to eliminate the maintenance cycle entirely. It is also the better choice for flat or very low-slope sections where asphalt shingles are not appropriate. The decision is not which material is better in absolute terms — it is which profile matches your home, location, budget, and time horizon.",
      },
    ],
  },
  {
    slug: "roof-moss-oregon-prevention-treatment-costs",
    title: "Roof Moss in Oregon: Prevention, Treatment, and Costs",
    description: "Moss is the most common roofing problem in Oregon. This guide covers why it grows, how to treat it safely, what prevention actually works, when moss means your roof needs replacing, and what it costs to address.",
    date: "2026-01-28",
    author: "Oregon Roofing",
    readTime: "6 min read",
    sections: [
      {
        title: "Why Oregon Is Moss Country",
        body: "Moss thrives where moisture meets shade, and Oregon provides both in abundance. The Pacific Northwest's combination of mild temperatures, persistent rainfall, and extensive tree canopy creates near-ideal growing conditions for bryophytes across most of the state west of the Cascades. Portland, Eugene, Salem, and the entire Oregon coast are all high-risk zones. East of the Cascades in Central and Eastern Oregon, the drier climate significantly reduces moss pressure, and homes in Bend, Pendleton, and La Grande rarely see the growth that is chronic in the western part of the state. Moss is not a cosmetic nuisance — left untreated, it causes real structural damage. The root systems of established moss colonies work beneath shingle edges, mechanically lifting them and creating water infiltration pathways. In severe cases, sustained moss growth accelerates shingle failure by 5 to 10 years compared to the same material in a moss-free environment.",
      },
      {
        title: "Safe Treatment: What Works and What to Avoid",
        body: "The most effective moss treatments are zinc or copper sulphate solutions applied to the entire roof surface and left to work over several rainfall cycles. These products kill existing moss and suppress regrowth. Application timing matters: treat in late spring or early fall when moss is actively growing but the roof is dry enough for the product to adhere. Avoid pressure washing as a moss removal method — the water pressure removes granules along with the moss, causing more damage than the moss itself. Physical scrubbing with a soft brush from the ridge down is acceptable for removing heavy accumulations before chemical treatment, but requires care to avoid damaging shingle tabs. Zinc sulphate products are effective and widely available; copper-based products are more expensive but leave a longer-lasting residual. Both break down and flush into garden beds and drains, so follow label directions for dilution and application rates if you have sensitive plantings near downspouts.",
      },
      {
        title: "Prevention That Actually Works",
        body: "Zinc or copper ridge strips are the most cost-effective long-term prevention measure available. Installed along the ridge cap, these metal strips release trace amounts of zinc or copper each time it rains, creating a runoff that suppresses moss across the entire downslope. They are not instant — it takes one to two full rain seasons to see the effect — but they are low-maintenance and effective for 15 to 20 years before replacement. Install at least two courses of 6-inch copper or zinc flashing at the ridge, or purpose-made ridge treatment products from roofing suppliers. Tree trimming is the second most effective prevention measure: reducing shade over the roof surface changes the microclimate enough to significantly slow moss establishment. Even selectively removing one or two branches that cast heavy shadow on north-facing slopes can extend the period between treatments from 2 to 3 years to 4 to 5 years. Algae-resistant shingles from major manufacturers include granules treated with copper compounds that slow growth, though their effectiveness diminishes as the granules weather over 7 to 10 years.",
      },
      {
        title: "When Moss Means Replacement",
        body: "Surface moss that has been present for one to two years can typically be treated without lasting damage. The question is what is found underneath. A contractor who removes heavy, long-established moss from an older roof will often find that the shingles beneath are crumbling, missing granules, or physically damaged by the root system. If the exposed shingle is brittle and breaks when flexed, if the granule surface is bare or pitting, or if tabs are curling from beneath rather than from UV weathering, the shingles have been compromised. Treatment will kill the current moss colony but will not reverse the underlying shingle damage. In these cases, replacement is the cost-effective outcome — treating a damaged roof delays the inevitable replacement while allowing water infiltration to continue damaging the deck and structure below. Ask your contractor to assess the shingle condition after clearing a test area before committing to treatment versus replacement.",
      },
      {
        title: "What Moss Treatment and Prevention Costs in Oregon",
        body: "Professional moss treatment for a standard Oregon home ranges from $300 to $600 for chemical application only, or $500 to $900 if physical removal is required first. Expect to repeat treatment every 2 to 3 years in high-moisture, shaded locations, and every 4 to 5 years on well-exposed roofs. Zinc ridge strips cost $150 to $400 installed, depending on ridge length — this is a one-time cost that reduces treatment frequency significantly. Annual DIY treatment using zinc sulphate concentrate costs $30 to $80 per application in materials if you are comfortable working on a roof safely. The total 20-year cost of a treated asphalt roof in western Oregon typically adds $1,500 to $4,000 to the ownership cost depending on location and treatment frequency — a factor worth including when comparing asphalt to metal roofing, which carries no moss maintenance cost in Oregon's climate.",
      },
    ],
  },
  {
    slug: "oregon-ccb-license-homeowners-guide",
    title: "What Oregon's CCB License Actually Means for Homeowners",
    description: "Oregon's Construction Contractors Board licence is one of the strongest homeowner protections in the country. Here is what it requires, what it means when something goes wrong, and how to verify a contractor's current status before signing anything.",
    date: "2026-01-12",
    author: "Oregon Roofing",
    readTime: "5 min read",
    sections: [
      {
        title: "What the CCB Licence Actually Requires",
        body: "Oregon's Construction Contractors Board regulates all contractors who work on residential and small commercial construction projects in the state. To hold a CCB licence, a contractor must carry a minimum of $500,000 in general liability insurance, maintain an active workers compensation policy covering all employees, pass a CCB-administered business practices examination, and file a bond with the state. The bond amount varies by licence category but provides a source of funds for homeowners in cases of incomplete or defective work. These are not discretionary requirements — they are prerequisites for holding any licence. In practice, this means that a CCB-licensed contractor is significantly more accountable than an unlicensed one: they have skin in the game in the form of their licence, their bond, and their ongoing insurance obligations. The licence does not guarantee quality, but it provides a legal framework for recourse that does not exist with an unlicensed contractor.",
      },
      {
        title: "The Difference Between Licensed, Bonded, and Insured",
        body: "These three terms are often bundled together in contractor marketing but refer to distinct protections. Licensed means the contractor has met the CCB's requirements and is legally authorised to perform contracting work in Oregon. Bonded means the contractor has filed a surety bond with the state — if the contractor fails to complete work or causes damage and cannot pay, the bonding company provides compensation up to the bond limit. Insured means the contractor carries liability insurance that pays for damage caused during a project — a roofer who drops materials through your skylight or causes water damage during installation has coverage to compensate you. All three are required for a current CCB licence, which is why verifying the CCB licence status is the single most important verification a homeowner can do. A contractor who claims to be licensed but whose CCB status shows as inactive, suspended, or expired is effectively uninsured and unbonded, regardless of what they tell you.",
      },
      {
        title: "How to Verify a Contractor's CCB Status",
        body: "The Oregon CCB maintains a public licence verification database at oregon.gov/ccb. You can search by business name, owner name, or licence number. The search results show the current licence status, the licence expiry date, the licence category, the bond amount, and any complaints or violations on the contractor's record. Check this before signing any contract. A few things to look for: the licence should show as 'active' — not expired, suspended, or pending renewal. The licence category should match the work being done — a contractor holding only a small-project endorsement cannot legally undertake a full roof replacement. Review the complaint history section: one or two resolved complaints over many years of operation is normal; multiple unresolved complaints or disciplinary actions are a significant warning sign. Save a screenshot of the verification page with the date before signing, in case questions arise later.",
      },
      {
        title: "What Happens When Something Goes Wrong",
        body: "If a CCB-licensed contractor does defective work, fails to complete a job, or causes damage to your property, you have several avenues for recourse that do not exist with unlicensed contractors. First, you can file a complaint with the CCB directly. The CCB investigates complaints, can require contractors to remedy defective work, and can impose fines, suspend, or revoke licences. Second, you can make a claim against the contractor's bond, which the state holds for exactly this purpose. Third, you can pursue a civil claim knowing the contractor has insurance that can pay a judgement. With an unlicensed contractor, all three of these options are unavailable: there is no licence to file a complaint against, no bond to claim against, and typically no insurance to recover from. Oregon also has a statutory requirement that contractors disclose their CCB number in all advertising, contracts, and bids — a contractor who does not include their CCB number on a written estimate is in violation of state law.",
      },
      {
        title: "Red Flags That Suggest Unlicensed or Underinsured Work",
        body: "Several patterns in contractor solicitation are associated with unlicensed or underinsured work. Unsolicited door-to-door approaches immediately after a storm, when unlicensed 'storm chasers' move through affected areas, are a high-risk scenario. Requests for large upfront cash payments before materials are ordered or work begins are another warning sign — legitimate contractors typically require a deposit of 10 to 25 percent, not full payment. Reluctance to provide a written contract with a specific scope of work, timeline, and payment schedule is a significant red flag. Inability or unwillingness to provide a CCB number before you request a formal estimate means either the contractor is unlicensed or is deliberately obscuring their status. Any estimate that is substantially — 40 to 60 percent — lower than others for the same scope warrants scrutiny: it often reflects either unlicensed operation, underinsurance, or plans to use substandard materials. Protecting your home starts with verifying the CCB before work begins.",
      },
    ],
  },
  {
    slug: "how-long-does-a-roof-last-oregon",
    title: "How Long Does a Roof Last in Oregon's Climate?",
    description: "Oregon's sustained moisture, biological growth, and regional climate variation all affect how long a roof lasts. Here are realistic lifespan expectations by material and region, with the maintenance factors that extend or shorten them.",
    date: "2025-12-18",
    author: "Oregon Roofing",
    readTime: "6 min read",
    sections: [
      {
        title: "Why Oregon Shortens Manufacturer Warranty Expectations",
        body: "Manufacturer warranty timelines are set for average national conditions. Oregon's west-of-the-Cascades climate — with its sustained moisture, minimal freeze-thaw cycling, and significant biological growth pressure — creates conditions that diverge from that average in ways that affect actual lifespan. The good news is that Oregon's mild temperatures reduce thermal cycling stress on materials: roofing in Phoenix or Chicago undergoes more extreme expansion and contraction cycles than in Portland or Eugene. The challenging factor is moisture: sustained dampness promotes moss and algae growth that mechanically degrades shingles, and it keeps underlayment and deck materials at higher moisture content than drier climates, which can compress their useful life. East of the Cascades, the dynamic reverses: thermal cycling is more extreme, UV intensity at elevation is higher, and wildfire exposure is greater, but biological growth is minimal and moisture is low. Understanding your regional context is the starting point for realistic lifespan expectations.",
      },
      {
        title: "Asphalt Shingles: Realistic Lifespan by Oregon Region",
        body: "Three-tab asphalt shingles, which are increasingly rare in new installations, last 12 to 18 years in western Oregon and 15 to 20 years east of the Cascades with proper maintenance. Architectural shingles — the current standard — perform for 20 to 25 years in the Willamette Valley and Portland Metro with regular moss treatment, and 25 to 30 years in drier eastern markets. Premium architectural and designer shingles with enhanced impact ratings and thicker profiles can reach 28 to 35 years in western Oregon when maintained. The key variables are shade exposure, maintenance frequency, and attic ventilation. A well-ventilated Portland home with algae-resistant shingles and biannual moss treatment can approach the upper end of these ranges. A poorly ventilated home with heavy tree canopy and no moss maintenance will fall at the lower end. Coastal Oregon compresses lifespans further: salt air and extreme moisture load mean asphalt shingles on the Oregon coast commonly need replacement at 18 to 22 years even with maintenance.",
      },
      {
        title: "Metal Roofing: Why It Performs Differently in Oregon",
        body: "Metal roofing in Oregon genuinely delivers on its lifespan claims in a way that it does not always do in more extreme climates. The 40 to 70 year lifespan cited by manufacturers assumes conditions that Oregon's mild temperature range supports well: without severe freeze-thaw cycling or extreme thermal expansion, panel joints and fastener systems are not stressed the way they are in continental climates. Standing seam metal installed on Portland Metro homes in the 1980s and 1990s is still performing without replacement, which matches real-world data with manufacturer claims. Coastal installations require additional specification: marine-grade aluminum or Galvalume steel panels with stainless fasteners and appropriate sealants will achieve the full lifespan; standard inland specifications in salt-air environments can show corrosion within 10 to 15 years. For Central Oregon installations, metal's resistance to UV degradation — which shortens asphalt lifespans at elevation — is an additional advantage, and its fire resistance is increasingly valued as wildfire seasons extend.",
      },
      {
        title: "Cedar Shake, Flat Roofs, and Other Materials",
        body: "Cedar shake has a theoretical lifespan of 30 to 40 years but routinely falls short of that in western Oregon without consistent maintenance. With biannual cleaning, moss treatment, and fire retardant renewal, cedar in Portland Metro or the Willamette Valley realistically lasts 25 to 35 years. Neglected shake reaches end of life in 15 to 20 years. The material performs best in moderate humidity — not too wet, not too dry — which makes wine country areas like the Yamhill Valley and parts of the Gorge reasonable environments for cedar; the extreme moisture of the coast shortens its life significantly. Flat roofing systems — TPO, EPDM, and modified bitumen — have lifespans of 15 to 25 years in Oregon depending on the system, installation quality, and drainage design. TPO performs best in western Oregon's conditions; EPDM holds up well in the freeze-thaw cycles of mountain and eastern Oregon markets. Flat roofs fail primarily at seams and drainage points, so the quality of installation and drainage design matter more than the membrane selection itself.",
      },
      {
        title: "What You Can Do to Extend Your Roof's Life",
        body: "The three most impactful maintenance actions in Oregon are moss prevention, ventilation verification, and gutter management. Zinc or copper ridge strips installed at the peak reduce moss establishment across the entire downslope and are the most cost-effective single addition. Having an HVAC or roofing contractor verify attic ventilation adequacy — specifically the ratio of ridge to soffit vent area — costs little and can prevent the deck rot that cuts replacement cycles short. Clear gutters at least twice per year: blocked gutters back water under the eaves, promoting ice dam formation in cold snaps and saturating the fascia and deck edge with retained moisture. Beyond these three, professional roof inspections every 3 to 5 years allow early identification of failing flashings, damaged shingles, and penetration seals before they cause interior water damage. Small repairs addressed promptly cost $200 to $600; the same issues left unaddressed can lead to deck replacement that adds $2,000 to $8,000 to a future replacement cost.",
      },
    ],
  },
  {
    slug: "flat-roof-problems-portland",
    title: "Flat Roof Problems in Portland: What to Watch For",
    description: "Flat and low-slope roofs on Portland additions, garages, and mid-century homes fail differently than pitched roofs. Here are the most common problems, how to identify them early, and what repair and replacement actually costs in the Portland market.",
    date: "2025-11-22",
    author: "Oregon Roofing",
    readTime: "6 min read",
    sections: [
      {
        title: "Why Portland Is a Flat Roof Challenge",
        body: "Flat roofing performs its worst when it accumulates standing water, and Portland's climate provides the perfect conditions for that to happen. With over 37 inches of annual rainfall concentrated in the wet season, flat and low-slope roof systems in Portland are under continuous water load from October through April. The design challenge is not the volume of rain — Portland's annual total is moderate — but its persistence: week-long drizzle events keep the roof surface continuously wet and can expose even small deficiencies in drainage or membrane integrity. Portland also has a significant stock of mid-century modern homes and 1970s to 1990s additions that feature flat or very low-slope roofs, many of which are now approaching or past the end of their original membrane's design life. The most common systems on these homes are modified bitumen and older EPDM rubber roofing, both of which develop characteristic failure modes that homeowners can learn to identify before they become interior water damage events.",
      },
      {
        title: "Ponding Water: The Primary Warning Sign",
        body: "Ponding water — water that remains on a flat roof surface for more than 48 hours after a rain event — is the leading indicator of a drainage problem and the leading cause of premature flat roof failure in Portland. The roof industry standard is a minimum slope of one-quarter inch per foot for any flat or low-slope system, which is enough to move water to drains or scuppers within a day of a rain event stopping. When ponding occurs, it indicates either that the original slope was insufficient, that the roof deck has deflected under load or moisture damage, or that drains are blocked. The weight of ponded water adds structural load and keeps the membrane in continuous contact with water, accelerating degradation at seams and penetrations. In Portland, a flat roof that regularly holds water after rain events will typically fail 5 to 10 years earlier than the same system on a properly draining roof.",
      },
      {
        title: "Seam Failures and Membrane Blistering",
        body: "The seams and overlaps in flat roofing membranes are the most vulnerable points in any system. In modified bitumen systems — common on Portland additions and commercial conversions — seams that were heat-welded or torch-applied at installation can delaminate as the adhesive ages and thermal cycling works the joint. Signs of seam failure include visible gaps or raised edges at membrane overlaps, dark water staining on interior ceilings directly below seam locations, and soft or spongy areas on the roof surface near joints. Membrane blistering — raised bubbles beneath the surface — indicates moisture trapped between the membrane and the substrate, usually from inadequate surface preparation at installation or condensation migration from a poorly insulated roof assembly. Blisters should not be punctured; they should be assessed by a qualified contractor to determine whether the blister is moisture-related and whether the surrounding membrane is sound. Small isolated blisters can sometimes be repaired; widespread blistering typically indicates the membrane system has reached end of life.",
      },
      {
        title: "Drain and Scupper Maintenance",
        body: "Flat roofs in Portland fail most commonly at their drainage points. Roof drains that are blocked with leaf debris, moss, or accumulated dirt prevent the system from doing its designed job and create the ponding conditions that degrade the membrane. Portland's autumn, when the city's famous tree canopy deposits leaves across rooftops, is the highest-risk period: a drain blocked with a mat of wet leaves can turn a routine rain event into a ponding situation that stresses an aging membrane to its limits. Clear flat roof drains at least twice per year — spring and fall — and after any significant wind event that deposits debris. Scuppers, which are drainage openings at the parapet edge rather than internal drains, should be checked for blockage and for signs of rust or separation from the membrane at their attachment points. Scupper failures are a common source of hidden water entry that saturates parapet walls before appearing as interior damage.",
      },
      {
        title: "Repair vs Replacement: Costs and Decisions",
        body: "Minor flat roof repairs in Portland — sealing a penetration, patching a small membrane tear, addressing a localised seam failure — cost $300 to $800 for most projects. A single ponding area addressed by adding a drain or adjusting slope with tapered insulation runs $600 to $1,500 depending on the extent. Full flat roof replacement costs $4,000 to $12,000 for a typical Portland addition or garage, depending on system type, removal of the existing membrane, and any deck repairs required. TPO is the most commonly specified replacement system in Portland currently, offering heat-welded seams that perform reliably in the sustained moisture environment, good UV stability, and a 15 to 20 year warranty from major manufacturers. EPDM remains a viable option and is particularly cost-effective for smaller areas. The decision between repair and replacement depends on the age of the existing system, the extent of membrane damage, and the condition of the underlying deck. A roof approaching 20 years with multiple repair locations is typically a better candidate for replacement than continued patching.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
