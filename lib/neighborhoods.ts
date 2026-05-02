export type ServiceSlug =
  | 'roof-replacement'
  | 'roof-repair'
  | 'metal-roofing'
  | 'cedar-shake-roofing'
  | 'flat-roofing'

export interface CostDriver {
  factor: string
  impact: string
  detail: string
}

export interface WorkedExample {
  scenario: string
  lineItems: { label: string; amount: string }[]
  total: string
  note: string
}

export interface LocationFaq {
  question: string
  answer: string
}

export interface PermitDetail {
  fee: string
  processing: string
  specialRequirements: string[]
}

export interface Neighborhood {
  slug:           string
  name:           string
  zip:            string
  area:           string
  avgCost:        number
  range:          string
  badge?:         'hot' | 'new' | 'premium'
  commonMaterial: string
  indexPct:       number
  description:    string
  highlights:     string[]
  permitScore:    1 | 2 | 3 | 4 | 5   // 1 = easy, 5 = maximum complexity
  permitNotes:    string

  /** Bespoke 3-4 paragraph local cost truth — written for this location, not templated. */
  localCostTruth: string[]
  /** Location-specific cost drivers with quantified impact and explanation. */
  costDrivers:    CostDriver[]
  /** Concrete worked examples drawn from typical local housing stock. */
  workedExamples: WorkedExample[]
  /** Deeper permit detail beyond the one-line summary. */
  permitDetail:   PermitDetail
  /** Location-specific FAQs that go beyond the three template ones. */
  locationFaqs:   LocationFaq[]
  /** Nearby neighborhoods, smaller adjacent areas, and absorbed towns we serve. */
  serviceAreas:   string[]
  /** Optional per-location × per-service paragraph for the combo route page. */
  serviceContext?: Partial<Record<ServiceSlug, string>>
}

export const neighborhoods: Neighborhood[] = [
  // ── Inner NW / Central City ────────────────────────────────────────────────
  {
    slug:'pearl-district', name:'Pearl District', zip:'97209', area:'Inner NW',
    avgCost:11400, range:'$8.5k–$18k', badge:'premium', commonMaterial:'TPO / Flat',
    indexPct:81,
    description:"Portland's premier urban district — converted brick warehouses, mid-2000s residential towers, and condo conversions where flat and low-slope TPO membrane systems dominate over pitched residential roofs. Central City design review applies to virtually every visible roofing change.",
    highlights:[
      "75%+ of Pearl District residential roofs are flat/low-slope TPO, EPDM, or modified bitumen",
      "Central City design review enforced citywide — material and color approval before BDS issues permit",
      "Most projects coordinate with HOAs of mid-2000s and 2010s residential towers",
    ],
    permitScore:5,
    permitNotes:"Pearl District falls under Portland's Central City design review overlay, which applies to all visible roofing changes regardless of material. The review process typically adds 4–8 weeks before BDS will issue the building permit. Most condo and townhouse projects also require HOA architectural review in parallel.",
    localCostTruth:[
      "Pearl District roofing economics are unlike any other Portland market because the housing stock is predominantly multi-unit residential (condo towers, townhouses, converted warehouses) rather than single-family homes. The flat-roof TPO membrane that performs the work in this district is technically commercial-grade roofing, and the contractor pool that does it well is meaningfully smaller than Portland's residential roofing market. A poorly installed TPO seam in a 12th-floor condo project is a leak that runs through five units below.",
      "The dominant project type in the Pearl is full TPO membrane replacement on a 1990s–2010s residential build that's reaching the 18–22 year window where original membranes start to fail at seams. Replacement runs $35,000–$120,000 depending on building size, parapet detail complexity, drainage rebuild scope, and crane access. For an individual condo unit owner the cost is split across the HOA dues structure; for a townhouse owner with sole responsibility for the roof above their unit, the bill comes whole.",
      "Central City design review is the binding constraint on Pearl District timelines. The review applies to any visible roofing change — material, color, profile, parapet detail — and runs in parallel with the standard BDS building permit process. Plan 4–8 weeks for review before BDS will issue the building permit, and longer for any non-standard membrane color or parapet design change. Most established Pearl District contractors handle the review submission as part of their service; verify this is included in writing before signing.",
      "The Pearl is also Portland's most active flat-roof repair market. Membrane patching, drain rebuild, and parapet flashing repair cycle through the district year-round because the condo and townhouse density means small problems get caught and addressed quickly. Repair budgets run $800–$4,500 for typical scope. Annual September inspection — before the wet season starts — is the standard preventive practice and runs $250–$450 for a typical Pearl property.",
    ],
    costDrivers:[
      {
        factor:"TPO membrane on 1990s–2010s residential build",
        impact:"+$35,000 to $120,000 full replacement",
        detail:"Spans single townhouse to 6-story residential tower scope. Per-square TPO labour is meaningfully higher than residential pitched roofing — specialist crews command premium rates.",
      },
      {
        factor:"Central City design review",
        impact:"+4 to 8 weeks before permit",
        detail:"Material, color, profile, and parapet detail all reviewable. Standard membranes in standard colors clear fastest; non-traditional color or profile changes can extend to 12+ weeks.",
      },
      {
        factor:"HOA architectural review (parallel to city)",
        impact:"+2 to 6 weeks, $300–$800 review fee",
        detail:"Most Pearl mid-2000s and 2010s residential projects involve an HOA. Review runs in parallel with city design review but adds its own approval requirement.",
      },
      {
        factor:"Crane access and material staging",
        impact:"+$2,500 to $8,000",
        detail:"Pearl District has limited street parking and tight loading zone windows. Most projects require coordinated crane day permits with the city plus crane company day rate.",
      },
      {
        factor:"Parapet flashing rebuild on warehouse conversions",
        impact:"+$3,500 to $9,000",
        detail:"Converted brick warehouse projects (NW 11th, NW Glisan corridor) often need parapet flashing rebuilt as part of membrane replacement — original detail is decades old.",
      },
    ],
    workedExamples:[
      {
        scenario:"3,800 sq ft Pearl District townhouse on NW 11th — full TPO membrane replacement, parapet rebuild, crane staging",
        lineItems:[
          { label:"Tear-off existing modified bitumen", amount:"$4,800" },
          { label:"Insulation board replacement (R-30 polyiso)", amount:"$5,400" },
          { label:"60-mil TPO membrane, heat-welded seams", amount:"$11,200" },
          { label:"Parapet flashing rebuild (custom metal counter)", amount:"$4,200" },
          { label:"Drain rebuild (3 internal drains)", amount:"$2,400" },
          { label:"Crane staging + day permit", amount:"$3,800" },
          { label:"Central City design review submission and approval", amount:"$680" },
          { label:"Permit + BDS Central City inspection", amount:"$680" },
          { label:"Cleanup and disposal", amount:"$540" },
        ],
        total:"$33,720",
        note:"Mid-tier Pearl District townhouse replacement. The crane day, design review submission, and parapet rebuild together added roughly $9,000 over a comparable suburban flat-roof project. The 60-mil TPO with heat-welded seams is the practical Pearl District spec — 45-mil is cheaper but not durable enough for the parapet flashing transitions that fail first in this district.",
      },
      {
        scenario:"2,200 sq ft Pearl loft conversion (1920 brick warehouse, 4th floor unit) — partial TPO repair, isolated seam failures",
        lineItems:[
          { label:"Inspection and seam-failure mapping", amount:"$420" },
          { label:"3 seam reweld locations (over loft kitchen)", amount:"$1,800" },
          { label:"Patch repair around skylight curb", amount:"$680" },
          { label:"Drain strainer replacement (2)", amount:"$340" },
          { label:"Localized parapet sealant rebuild", amount:"$580" },
          { label:"BDS notification (under-25%-area threshold, no permit)", amount:"—" },
          { label:"Cleanup", amount:"$220" },
        ],
        total:"$4,040",
        note:"Repair scope just under the 25% area threshold that would trigger a full permit. The seam reweld over the kitchen was the urgent item — moisture had been migrating through the original 1990s seam for at least 18 months. Annual September inspection would have caught this two years earlier at probably $1,200 in scope.",
      },
      {
        scenario:"5,400 sq ft Pearl District 6-unit townhouse complex — coordinated full TPO replacement, HOA-managed",
        lineItems:[
          { label:"Tear-off existing TPO (single layer, 22 years old)", amount:"$6,800" },
          { label:"Insulation upgrade (R-25 to R-35)", amount:"$8,400" },
          { label:"60-mil TPO membrane across full complex", amount:"$15,600" },
          { label:"Coordinated parapet rebuild (4 unit boundaries)", amount:"$6,800" },
          { label:"Drainage system overhaul (8 internal drains)", amount:"$5,200" },
          { label:"Crane staging across 3 separate days", amount:"$8,400" },
          { label:"Central City design review (full submission)", amount:"$1,200" },
          { label:"HOA architectural review", amount:"$680" },
          { label:"Permit + BDS Central City inspection", amount:"$1,400" },
          { label:"Cleanup and disposal", amount:"$880" },
        ],
        total:"$55,360",
        note:"HOA-managed project across 6 townhouse units. Per-unit cost works out to roughly $9,200 — significantly less than each owner doing this independently because crane staging, design review, and BDS submission are coordinated and shared. This is the reason Pearl District HOAs increasingly bundle major roofing work as community projects rather than waiting for individual owners to act.",
      },
    ],
    permitDetail:{
      fee:"$680–$1,400 typical Pearl District residential, plus design review fees",
      processing:"Central City design review 4–8 weeks; BDS permit issues after review approval",
      specialRequirements:[
        "Central City design review required for all visible roofing changes — material, color, profile, parapet detail",
        "HOA architectural review required for most condo and townhouse projects (runs parallel to city review)",
        "Crane day permits required for upper-floor and tower work with limited street access",
        "Commercial-class permit required for buildings above 4 stories or with ground-floor commercial use",
        "Historic preservation review for properties on Portland's Historic Resource Inventory or in adjacent historic districts",
      ],
    },
    locationFaqs:[
      {
        question:"Why is the Pearl District the most expensive Portland neighborhood for roofing?",
        answer:"Three factors compound. First, dominant flat-roof TPO membrane work is technically commercial-grade roofing — the specialist contractor pool is smaller than residential and commands premium rates. Second, Central City design review adds 4–8 weeks before any work starts and rules out budget materials and non-standard colors. Third, crane access, HOA coordination, and parapet rebuild scope on warehouse conversions push the per-square cost meaningfully above suburban flat-roof equivalents.",
      },
      {
        question:"How does the Central City design review actually work?",
        answer:"Pearl District falls under Portland's Central City design review overlay, which means any visible roofing change requires approval from the Bureau of Development Services design review staff before BDS will issue the building permit. The review applies to material, color, profile, and parapet detail. Standard 60-mil TPO in light gray clears fastest (4–6 weeks). Non-standard colors, designer profiles, or parapet design changes can extend to 12+ weeks with multiple revision cycles. Established Pearl District contractors handle the submission as part of their service — verify this is included in writing before signing.",
      },
      {
        question:"Should I coordinate with my HOA before getting roofing quotes in the Pearl?",
        answer:"Yes — virtually always. Pearl District condo and townhouse complexes built since the mid-2000s have HOA architectural review provisions that apply independently of city design review. HOAs frequently mandate specific membrane manufacturers, parapet detail, and color matching to other units in the complex. Submit your proposed scope to the HOA before signing a contractor agreement; failure to do so can invalidate the contract and require redo at owner expense.",
      },
      {
        question:"How long does a typical Pearl District flat-roof replacement actually take?",
        answer:"Project scope and design review combined: 8–14 weeks from initial assessment to final inspection. Breakdown: 2–3 weeks contractor selection and scope development, 4–8 weeks Central City design review (parallel to HOA review), 1–2 weeks BDS permit processing after design approval, 4–7 days actual installation for a typical townhouse, 1–2 weeks final inspection scheduling and any callback work. Coordinated complex projects (6+ units) take longer — plan 16–20 weeks total.",
      },
      {
        question:"Do I need a commercial-class roofing contractor for my Pearl loft?",
        answer:"Depends on building height and use. Single-occupancy townhouses and 4-and-under-story condo buildings can be permitted as residential. Anything 5+ stories, mixed-use ground floors, or larger commercial conversions requires a commercial-class CCB endorsement on the contractor's license. Verify the endorsement at oregon.gov/ccb before signing — a contractor without commercial endorsement working on a permit-required commercial structure invalidates the permit.",
      },
    ],
    serviceAreas:[
      "NW 11th corridor",
      "NW Glisan",
      "NW Lovejoy",
      "Park Blocks",
      "Slabtown",
      "Nob Hill / NW District",
      "Goose Hollow",
      "South Portland",
      "Old Town/Chinatown",
    ],
    serviceContext:{
      'flat-roofing':"Pearl District is Portland's most active flat-roof market, period. The 1990s–2010s residential build wave in this district used 45-mil TPO membrane as the dominant spec, and those original installations are now 18–22 years old and starting to fail at parapet transitions and seam laps. Modern 60-mil TPO with heat-welded seams is the practical replacement spec. Central City design review applies to membrane color and parapet detail — plan for 4–8 weeks of review before any work starts.",
      'roof-repair':"Flat-roof repair in the Pearl runs the spectrum from $800 patch jobs to $4,500 partial seam reweld projects. The most common urgent repair is parapet flashing failure — Pearl's brick warehouse conversions and 1990s residential towers have parapets where the original counter flashing has aged out. Annual September inspection is standard preventive practice and catches problems before they become moisture events. Repairs covering more than 25% of total roof area cross into permit territory.",
    },
  },

  // ── Inner SE Portland ─────────────────────────────────────────────────────
  {
    slug:'hawthorne', name:'Hawthorne', zip:'97214', area:'Inner SE',
    avgCost:9800, range:'$7.5k–$15k', badge:'hot', commonMaterial:'Architectural Asphalt',
    indexPct:74,
    description:"Quintessential Inner SE Portland — 1900–1925 Craftsman bungalows and foursquares lining the Hawthorne corridor and adjacent residential streets. The most active re-roof market in Portland, with a deep contractor base and meaningful neighborhood-level cost variation driven by deck age and historic district overlays.",
    highlights:[
      "Inner SE Craftsman/foursquare core — 1900–1925 housing stock dominant",
      "Highest residential roofing search volume of any Portland neighborhood",
      "Tree canopy on residential streets creates significant moss pressure on shaded slopes",
    ],
    permitScore:3,
    permitNotes:"Standard Portland BDS permit applies. Properties on the Historic Resource Inventory or in adjacent listed districts (Ladd's Addition borders to the west) face additional design review. Most central Hawthorne re-roofs clear permit in 5–7 business days online.",
    localCostTruth:[
      "Hawthorne is the highest-volume residential re-roofing market in Portland, and the per-job cost spread reflects the variable that dominates Inner SE: deck condition. The 1900–1925 housing stock that defines this neighborhood was built with skip-sheathed decking — 1×4 boards with gaps that were code-compliant for cedar shake but require full plywood overlay before modern asphalt shingles can be installed. That overlay adds $2,500–$5,000 to a project, and a contractor who hasn't accounted for it pre-bid is setting up a change order.",
      "The dominant Hawthorne housing stock is the 1,400–2,000 sq ft Craftsman bungalow with a single-story footprint, modest hip or gable roofline, and original cedar deck planks that have aged well or poorly depending on the slope and tree canopy exposure. Sound decks re-roof at $8,500–$12,000 with architectural asphalt; decks needing significant overlay or repair run $13,000–$18,000. The variable that determines which bucket a specific property falls into isn't visible until tear-off begins.",
      "Tree canopy is the second-largest cost driver and the one most Hawthorne homeowners underestimate. The residential streets between SE 30th and SE 50th — particularly south of Hawthorne Boulevard — sit under significant Douglas fir, big-leaf maple, and oak cover. That canopy creates heavy moss pressure on shaded shed lines and accelerates granule loss on north-facing slopes. Homes in heavy-canopy locations should expect to budget for biennial moss treatment ($300–$600 per cycle) and zinc ridge strip installation ($150–$400 one-time) as part of any new roof.",
      "Historic district considerations apply to a meaningful share of Hawthorne properties. Ladd's Addition borders the western edge and triggers Type II Historic Resource Review for any visible material change. Several individual properties are on Portland's Historic Resource Inventory and require similar review. Confirm at portlandmaps.com before signing a contract — a Type II review adds 4–6 weeks to project timeline and binds material and color choices.",
    ],
    costDrivers:[
      {
        factor:"Skip-sheathed deck overlay on pre-1925 stock",
        impact:"+$2,500 to $5,000",
        detail:"Almost universal on Hawthorne Craftsmans and foursquares. Per-sheet plywood overlay rate should be specified in contract before signing.",
      },
      {
        factor:"Tree canopy moss management",
        impact:"+$300 to $600 every 2 years + $150–$400 one-time",
        detail:"Streets between SE 30th and SE 50th sit under heavy canopy. Zinc ridge strip plus biennial chemical treatment is the difference between 18 and 28 years of asphalt life.",
      },
      {
        factor:"Ladd's Addition adjacency / Historic Resource Inventory",
        impact:"+4 to 6 weeks + material binding",
        detail:"Properties bordering Ladd's or individually listed face Type II Historic Resource Review. Material and color become binding rather than discretionary.",
      },
      {
        factor:"Original cedar deck remediation",
        impact:"+$80 to $130 per sheet",
        detail:"On homes that already had cedar replaced once before, deck condition is variable. Per-sheet replacement rate is essential pre-bid spec.",
      },
      {
        factor:"Two-story foursquare labour premium",
        impact:"+15% to 25% on labour",
        detail:"Foursquare housing stock (more common on numbered streets between SE 20th and SE 40th) requires more scaffolding and slower install pace than single-story bungalows.",
      },
    ],
    workedExamples:[
      {
        scenario:"1,650 sq ft 1912 Craftsman bungalow on SE Salmon — architectural replacement, skip-sheathed deck overlay, mature canopy",
        lineItems:[
          { label:"Tear-off and disposal (existing 3-tab over original cedar)", amount:"$2,200" },
          { label:"Plywood overlay over skip-sheathed deck (24 sheets)", amount:"$2,640" },
          { label:"Ice-and-water shield (eaves, valleys, around chimney)", amount:"$680" },
          { label:"Synthetic underlayment over field", amount:"$440" },
          { label:"Architectural shingles, GAF Timberline HDZ, AR granules", amount:"$5,400" },
          { label:"Ridge vent installation + soffit baffle upgrade", amount:"$720" },
          { label:"Step + counter flashing rebuild at chimney", amount:"$580" },
          { label:"Zinc ridge strip moss prevention", amount:"$280" },
          { label:"Permit + BDS inspection", amount:"$320" },
          { label:"Cleanup, dump fees, magnetic sweep", amount:"$380" },
        ],
        total:"$13,640",
        note:"Solid Hawthorne replacement. Two-layer tear-off (original cedar plus 1990s asphalt re-roof), full deck overlay, and ventilation upgrade are standard for 1912 stock. Adding zinc ridge strip at install is the cleanest cost-effective add for any Hawthorne home with mature tree canopy — $280 buys 3–5 years of additional roof life through deferred moss colonization.",
      },
      {
        scenario:"1,950 sq ft 1924 foursquare on SE Belmont — architectural replacement, sound deck after spot repair, two-story labour",
        lineItems:[
          { label:"Tear-off existing single layer", amount:"$1,800" },
          { label:"Deck spot repair (5 sheets)", amount:"$650" },
          { label:"Synthetic underlayment + ice-and-water at eaves", amount:"$540" },
          { label:"Architectural shingles, CertainTeed Landmark Pro", amount:"$5,800" },
          { label:"Ridge vent + soffit baffle upgrade", amount:"$680" },
          { label:"Two-story labour premium", amount:"—" },
          { label:"Pipe boots and step flashing", amount:"$420" },
          { label:"Permit + BDS inspection", amount:"$320" },
          { label:"Cleanup and disposal", amount:"$380" },
        ],
        total:"$10,590",
        note:"Foursquare came in lower than the bungalow despite being slightly larger because the deck was sound (homeowner had previous re-roof in 2002 with deck overlay already done). Two-story labour is built into the per-sq pricing of established Hawthorne contractors.",
      },
      {
        scenario:"2,100 sq ft 1908 Craftsman with Ladd's Addition adjacency — cedar shake retrofit-in-kind, Type II Historic Resource Review",
        lineItems:[
          { label:"Tear-off existing cedar shake (significant disposal weight)", amount:"$2,800" },
          { label:"Synthetic underlayment + ice-and-water at eaves", amount:"$680" },
          { label:"Hand-split cedar shake, #1 grade Western red", amount:"$11,200" },
          { label:"Copper flashing throughout (HRC requirement)", amount:"$2,400" },
          { label:"Pressure-applied fire retardant treatment", amount:"$1,400" },
          { label:"Ridge ventilation rebuild", amount:"$680" },
          { label:"Type II Historic Resource Review submission", amount:"$580" },
          { label:"Permit + BDS Inspection", amount:"$420" },
          { label:"Cleanup, disposal (heavy cedar weight)", amount:"$520" },
        ],
        total:"$20,680",
        note:"Premium retrofit on a property where Type II Historic Resource Review bound the material to cedar in kind. Hand-split #1 grade Western red is the upper tier; Resawn at $7,800 would have come in roughly $3,400 cheaper. Copper flashing was non-negotiable per HRC review — galvanized would have voided approval.",
      },
    ],
    permitDetail:{
      fee:"$280–$420 typical residential, calculated as percentage of project valuation",
      processing:"5–7 business days online for standard replacement; 4–6 weeks for Type II Historic Resource Review",
      specialRequirements:[
        "Properties bordering Ladd's Addition (west of SE 16th) face Type II Historic Resource Review on visible material changes",
        "Individual properties on Portland's Historic Resource Inventory require similar review regardless of neighborhood location",
        "Re-roofing over an existing layer typically not permitted — full tear-off required",
        "Attic ventilation ratio (1:300 balanced) actively reviewed at final inspection",
      ],
    },
    locationFaqs:[
      {
        question:"Is my Hawthorne home in a historic district?",
        answer:"Most central Hawthorne residential addresses are not in a listed historic district, but properties bordering Ladd's Addition (west of SE 16th between Hawthorne and SE Division) and individual properties on Portland's Historic Resource Inventory face Type II Historic Resource Review. Confirm at portlandmaps.com using your property address — the review status binds material and color choices and adds 4–6 weeks to project timeline.",
      },
      {
        question:"How much should I budget for skip-sheathed deck overlay?",
        answer:"On a typical 1,650–2,000 sq ft Hawthorne Craftsman or foursquare, plan for $2,500–$4,500 in plywood overlay material and labour. Per-sheet rate runs $90–$140 installed. The overlay is required because pre-1925 skip-sheathed decking (1×4 boards with gaps) cannot support modern asphalt shingle attachment patterns. Get the per-sheet rate in writing before signing — quotes that don't include deck overlay are either incomplete or assume a deck condition the contractor hasn't actually verified.",
      },
      {
        question:"Should I install zinc ridge strip if I'm re-roofing in Hawthorne?",
        answer:"Almost always yes if you have any tree canopy on or adjacent to the property. Zinc ridge strip releases trace zinc with each rain event and suppresses moss across the entire downslope for 15–20 years. Cost at install is $150–$400. Without it, plan on biennial chemical moss treatment at $300–$600 per cycle starting around year 4 of the new roof. The zinc strip is the single most cost-effective preventive measure available on Hawthorne residential roofs.",
      },
      {
        question:"Why is Hawthorne's contractor pool so much larger than other Portland neighborhoods?",
        answer:"Hawthorne is the highest-volume residential re-roofing market in Portland because of its housing density, the predominance of pre-1925 stock that's now in active replacement cycles, and tree canopy that compresses real-world asphalt life. Established Portland roofing companies routinely have 6–10 active Hawthorne projects in any peak season. Practical impact: bid spreads on standard scope are tighter than anywhere outside the Pearl, and three-bid comparisons are reliable. The trade-off is fly-by-night operators are more numerous in a dense market — CCB licensing verification matters more here.",
      },
      {
        question:"How does Inner SE wind exposure affect my Hawthorne roof spec?",
        answer:"Less than the West Hills or East Wind corridor neighborhoods, but meaningful. Standard 90 mph wind rating is the Oregon code minimum and is technically adequate for most Hawthorne addresses. The 110 mph upgrade plus six-nail attachment costs $200–$500 at install and is a reasonable Hawthorne standard for any home that catches direct east-wind exposure. Properties on the eastern edge (SE 50th and beyond) benefit most from the upgrade.",
      },
    ],
    serviceAreas:[
      "Belmont",
      "Buckman",
      "Kerns",
      "Sunnyside",
      "Richmond",
      "Division-Clinton",
      "Ladd's Addition (border)",
      "Mt Tabor (lower)",
    ],
    serviceContext:{
      'roof-replacement':"Hawthorne replacement quotes vary by $4,000+ on identical-footprint homes because of one variable: deck condition. Skip-sheathed decking on pre-1925 stock is almost universal in this neighborhood, and the overlay it requires is invisible until tear-off. Established Hawthorne contractors include the per-sheet overlay rate in writing in the contract; bargain quotes that skip this line are signing you up for a change order.",
      'cedar-shake-roofing':"Cedar shake retrofit in Hawthorne occupies a specific niche — properties bordering Ladd's Addition or on the Historic Resource Inventory where Type II review binds material choice to cedar in kind. Outside those properties, cedar is rarely the rational choice in Hawthorne's wet, canopied environment. Where it is required, plan on $18,000–$24,000 with hand-split #1 grade cedar plus copper flashing and pressure-applied fire retardant treatment.",
    },
  },

  // ── SE Portland ───────────────────────────────────────────────────────────
  {
    slug:'sellwood-moreland', name:'Sellwood-Moreland', zip:'97202', area:'SE Portland',
    avgCost:10400, range:'$7.8k–$15.5k', commonMaterial:'Architectural Asphalt',
    indexPct:75,
    description:"Established SE neighborhood with 1900s–1940s Craftsman, bungalow, and mid-century stock around Sellwood Park, Westmoreland Park, and the Antiques Row commercial spine. Mix of well-maintained owner-occupied homes and the kind of dense canopy that drives moss pressure into the upper tier of Portland markets.",
    highlights:[
      "Sellwood Park to Westmoreland — established residential character with mature canopy",
      "Mix of 1900–1940 stock with predictable skip-sheathed deck issues",
      "Closer to Reed College and Eastmoreland — overlapping high-end design reviews on premium properties",
    ],
    permitScore:3,
    permitNotes:"Standard Portland BDS permit. Some properties near Eastmoreland border or on the Historic Resource Inventory face Type II review. Most replacements clear permit in 5–7 business days online.",
    localCostTruth:[
      "Sellwood-Moreland combines the dense pre-1925 housing stock characteristic of Inner SE with significant residential canopy density that puts this neighborhood among Portland's higher-pressure moss zones outside Forest Park orbit. The dominant housing type is the 1,500–1,900 sq ft Craftsman or bungalow with original cedar deck planks that have aged variably depending on slope orientation and canopy exposure.",
      "The cost spread on Sellwood-Moreland replacements is tight relative to Hawthorne because the housing stock is more uniform — the variable-pitch foursquares and corner Tudor-style homes that drive Hawthorne's spread are rarer here. A typical Sellwood Craftsman re-roofs at $9,500–$11,500 with architectural asphalt; the upper tier of $13,000–$15,500 mostly applies to two-story homes near Sellwood Park or properties with deck damage from sustained moss colonization.",
      "Tree canopy is the dominant cost driver in Sellwood-Moreland and the variable most homeowners underestimate. The residential streets surrounding Sellwood Park, Westmoreland Park, and the SE 17th corridor sit under heavy Douglas fir, big-leaf maple, and oak cover comparable to the upper end of Hawthorne. Real-world architectural asphalt life in canopied Sellwood is 20–24 years vs. the 25–30 the manufacturer warranty suggests. Zinc ridge strip plus biennial chemical treatment is the difference between the two.",
      "Several Sellwood-Moreland properties are on Portland's Historic Resource Inventory individually, particularly along the SE 13th–17th corridors where original Craftsman and bungalow architecture survives in dense clusters. Type II Historic Resource Review applies to visible material changes on listed properties. The Eastmoreland boundary on the south edge also brings adjacent design review considerations for properties on the southern fringe of the neighborhood.",
    ],
    costDrivers:[
      {
        factor:"Skip-sheathed deck overlay on pre-1925 stock",
        impact:"+$2,200 to $4,400",
        detail:"Same dynamic as Hawthorne. Almost universal on Sellwood Craftsmans and bungalows. Per-sheet rate must be specified pre-bid.",
      },
      {
        factor:"Heavy canopy moss management",
        impact:"+$300 to $600 every 2 years",
        detail:"Streets surrounding Sellwood Park and the SE 13th–17th residential corridor sit under canopy density comparable to upper Hawthorne.",
      },
      {
        factor:"Eastmoreland border / Historic Resource Inventory",
        impact:"+4 to 6 weeks + material binding",
        detail:"Properties on the southern Sellwood edge near Eastmoreland or individually listed face Type II Historic Resource Review.",
      },
      {
        factor:"Original cedar disposal weight on retrofit",
        impact:"+$300 to $600",
        detail:"Sellwood homes that still have original cedar shake roofs (more common than in Hawthorne) face significant tear-off disposal cost.",
      },
      {
        factor:"Two-story labour on northern Sellwood",
        impact:"+15% to 20% on labour",
        detail:"The northern edge of Sellwood (between SE Holgate and SE Bybee) has a higher concentration of two-story foursquares than the southern Westmoreland section.",
      },
    ],
    workedExamples:[
      {
        scenario:"1,750 sq ft 1916 Craftsman on SE Tenino — architectural replacement, skip-sheathed overlay, mature canopy",
        lineItems:[
          { label:"Tear-off and disposal (1990s asphalt over original cedar)", amount:"$2,400" },
          { label:"Plywood overlay over skip-sheathed deck (26 sheets)", amount:"$2,860" },
          { label:"Ice-and-water shield (eaves, valleys)", amount:"$680" },
          { label:"Synthetic underlayment over field", amount:"$480" },
          { label:"Architectural shingles, Malarkey Vista AR", amount:"$5,800" },
          { label:"Ridge vent + soffit baffle upgrade", amount:"$720" },
          { label:"Pipe boots and step flashing", amount:"$420" },
          { label:"Zinc ridge strip moss prevention", amount:"$320" },
          { label:"Permit + BDS inspection", amount:"$320" },
          { label:"Cleanup, disposal, magnetic sweep", amount:"$420" },
        ],
        total:"$14,420",
        note:"Premium Sellwood replacement. Malarkey Vista AR is the strongest algae-resistant asphalt available — meaningful upgrade in this canopy environment over standard architectural. Two-layer tear-off (cedar plus 1990s asphalt) added roughly $1,200 over a single-layer equivalent.",
      },
      {
        scenario:"1,500 sq ft 1925 bungalow near Westmoreland Park — architectural replacement, single layer, sound deck",
        lineItems:[
          { label:"Tear-off and disposal (single layer)", amount:"$1,500" },
          { label:"Deck spot repair (3 sheets)", amount:"$330" },
          { label:"Synthetic underlayment + ice-and-water at eaves", amount:"$440" },
          { label:"Architectural shingles, GAF Timberline HDZ AR", amount:"$4,800" },
          { label:"Ridge vent + soffit baffle upgrade", amount:"$540" },
          { label:"Pipe boots and step flashing", amount:"$320" },
          { label:"Permit + BDS inspection", amount:"$280" },
          { label:"Cleanup and disposal", amount:"$340" },
        ],
        total:"$8,550",
        note:"Lower-end Sellwood replacement. Smaller bungalow with sound deck (homeowner had earlier re-roof done with overlay) and minimal complications. The AR-granule shingle upgrade is the cheap meaningful add for this canopy environment — about $200 over standard.",
      },
      {
        scenario:"2,200 sq ft 1908 two-story near Eastmoreland border — standing seam metal upgrade, deck overlay, complex roofline",
        lineItems:[
          { label:"Tear-off existing architectural over original cedar", amount:"$2,800" },
          { label:"Plywood overlay (28 sheets)", amount:"$3,080" },
          { label:"Synthetic high-temp underlayment", amount:"$880" },
          { label:"24-gauge standing seam panels (charcoal)", amount:"$13,800" },
          { label:"Specialty ridge, hip, valley trim", amount:"$2,200" },
          { label:"Type II Historic Resource Review (Eastmoreland adjacency)", amount:"$580" },
          { label:"Permit + BDS inspection", amount:"$420" },
          { label:"Cleanup and disposal", amount:"$520" },
        ],
        total:"$24,280",
        note:"Premium metal upgrade on a Sellwood property near the Eastmoreland border. Type II Historic Resource Review was triggered by adjacency rather than individual listing — review board approved standard charcoal color but pushed back on initial matte black request. Build review timeline (6 weeks in this case) into project planning when working near Eastmoreland.",
      },
    ],
    permitDetail:{
      fee:"$280–$420 typical residential, calculated as percentage of project valuation",
      processing:"5–7 business days online for standard replacement; 4–6 weeks for Type II review when triggered",
      specialRequirements:[
        "Properties on Portland's Historic Resource Inventory require Type II Historic Resource Review",
        "Properties bordering Eastmoreland (south of SE Bybee) may face design review on visible material changes",
        "Re-roofing over an existing layer typically not permitted — full tear-off required",
        "Attic ventilation ratio (1:300 balanced) actively reviewed at final inspection",
      ],
    },
    locationFaqs:[
      {
        question:"Is Sellwood-Moreland really the best Portland neighborhood for moss problems?",
        answer:"Among the worst, actually. Tree canopy density on residential streets surrounding Sellwood Park, Westmoreland Park, and the SE 13th–17th corridor puts this neighborhood in Portland's upper tier for moss pressure. Real-world architectural asphalt life runs 20–24 years here vs. 25–30 in less canopied neighborhoods. Algae-resistant shingles, zinc ridge strip at install, and biennial chemical treatment are the practical Sellwood-Moreland standards.",
      },
      {
        question:"What's the difference between Sellwood and Moreland for roofing?",
        answer:"Officially they're a single neighborhood — Sellwood-Moreland Improvement League covers both. Practically, the Sellwood section (south of SE Bybee) skews older and has more pre-1925 stock with skip-sheathed deck issues; the Moreland section (north of SE Bybee through Westmoreland Park) has more 1920s–1940s housing with sound deck construction. Replacement costs run modestly higher in central Sellwood because of the deck variable.",
      },
      {
        question:"Should I worry about Eastmoreland design review on my Sellwood-Moreland home?",
        answer:"Only if your property is on the southern edge near Eastmoreland border (south of SE Bybee, particularly between SE 28th and SE 36th). Properties bordering Eastmoreland can face design review considerations on visible material changes even when not formally in the Eastmoreland district. Confirm at portlandmaps.com — review status binds material and color choices and adds 4–6 weeks to project timeline.",
      },
      {
        question:"How does Sellwood-Moreland compare to Hawthorne for re-roofing cost?",
        answer:"Sellwood-Moreland runs $400–$800 above Hawthorne on equivalent housing stock because of two factors: more uniform pre-1925 deck issues (less variability in the spread, but the average is higher), and more consistent canopy density driving moss-related shingle premiums. The contractor pool is similar in size and quality — most established Portland roofers work both neighborhoods.",
      },
      {
        question:"Is metal a reasonable choice in Sellwood-Moreland?",
        answer:"For homeowners staying 15+ years and particularly those with heavy tree canopy, yes. Metal eliminates the moss-treatment cycle entirely and outlasts asphalt by roughly 2x in this canopy environment. The $5,000–$9,000 premium over architectural asphalt pays back through avoided maintenance and one-and-a-half avoided replacement cycles over a 50-year hold. For shorter holds, premium AR-granule architectural is the more rational call.",
      },
    ],
    serviceAreas:[
      "Westmoreland Park",
      "Sellwood Park",
      "Antiques Row (SE 13th)",
      "Brooklyn",
      "Reed (north edge)",
      "Eastmoreland border",
      "Inner Foster",
    ],
  },

  // ── SE Premium / Eastmoreland ─────────────────────────────────────────────
  {
    slug:'eastmoreland', name:'Eastmoreland', zip:'97202', area:'SE Portland',
    avgCost:13800, range:'$10k–$22k', badge:'premium', commonMaterial:'Cedar Shake',
    indexPct:91,
    description:"Reed College orbit and one of Portland's most rigorously protected historic districts. Large 1920s–1940s Tudor, Craftsman, and Colonial Revival homes on tree-lined streets, with Eastmoreland Historic District design review binding virtually all visible material decisions.",
    highlights:[
      "Eastmoreland Historic District — one of Portland's strictest design review overlays",
      "Large 1920s–1940s Tudor and Craftsman estates with cedar shake heritage",
      "Reed College orbit creates stable owner-occupied market with long holds",
    ],
    permitScore:5,
    permitNotes:"Eastmoreland Historic District design review applies to all visible roofing changes. Cedar shake retrofit in kind clears fastest; any material change requires Type II Historic Resource Review with material/color binding.",
    localCostTruth:[
      "Eastmoreland is Portland's premier historic district outside the Central City overlay, and the roofing economics reflect that. The dominant housing stock is the 2,000–3,500 sq ft 1920s–1940s Tudor, Craftsman, or Colonial Revival home on a generous lot with mature canopy. Many of these homes are on their second or third roof since original construction, and historic district design review binds the material and profile decisions in a way no other Portland neighborhood enforces.",
      "Cedar shake is the heritage material in Eastmoreland and remains the dominant spec. The Eastmoreland Historic District design review board approves cedar retrofit in kind with relative speed (3–4 weeks) and limited material substitution. Cedar conversion to architectural asphalt is possible but requires Type II Historic Resource Review with formal documentation; conversion to standing seam metal triggers additional scrutiny. The practical effect is that cedar replacement is the path of least resistance for most Eastmoreland homeowners — and accordingly the most common project type.",
      "The premium tier of Eastmoreland projects ($18,000–$25,000) involves cedar shake retrofit with hand-split #1 grade Western red cedar, copper flashing throughout, pressure-applied fire retardant treatment, and complex roofline detail work on multi-gable Tudor or Colonial Revival properties. Smaller mid-tier homes ($12,000–$16,000) typically use Resawn cedar with galvanized flashing acceptable to design review. Conversion projects to architectural asphalt land at $14,000–$18,000 inclusive of review fees and timeline.",
      "Reed College orbit creates an unusually stable Eastmoreland homeowner profile — long holds (15+ years average), professional homeowners who run lifecycle cost analysis, and an active neighborhood association that pays attention to roofing projects across the district. The combination drives demand toward cedar retrofit and standing seam metal upgrades over the cheaper architectural asphalt path that dominates other Portland neighborhoods. Premium projects are normal here, not exceptional.",
    ],
    costDrivers:[
      {
        factor:"Cedar shake retrofit in kind",
        impact:"+$8,000 to $14,000 over architectural",
        detail:"Eastmoreland Historic District design review favors cedar in kind. Hand-split Western red cedar plus copper flashing plus fire retardant treatment is the premium tier.",
      },
      {
        factor:"Eastmoreland Historic District design review",
        impact:"+3 to 6 weeks before permit",
        detail:"Cedar in kind clears fastest. Material substitution (asphalt or metal) triggers Type II Historic Resource Review with longer timeline and material binding.",
      },
      {
        factor:"Hand-split #1 grade cedar premium over Resawn",
        impact:"+$3,500 to $6,000",
        detail:"Hand-split offers the heritage profile design review favors on landmark properties. Resawn is acceptable on most Eastmoreland projects and costs meaningfully less.",
      },
      {
        factor:"Copper flashing as design review standard",
        impact:"+$1,800 to $3,800",
        detail:"Copper is the architectural match for cedar's heritage character and design review favored on most landmark properties. Galvanized acceptable on standard properties.",
      },
      {
        factor:"Multi-gable Tudor / Colonial Revival roofline labour",
        impact:"+25% to 35% on labour",
        detail:"Larger Eastmoreland Tudors and Colonial Revivals have multi-gable rooflines with significant valley intersection complexity vs. simpler bungalow geometry.",
      },
      {
        factor:"Pressure-applied fire retardant treatment",
        impact:"+$1,200 to $1,800",
        detail:"Required on cedar shake projects to achieve Class B fire rating. Treatment lasts 7–10 years before renewal needed.",
      },
    ],
    workedExamples:[
      {
        scenario:"2,800 sq ft 1928 Tudor on SE Reed Way — cedar shake retrofit in kind, copper flashing, hand-split #1 grade",
        lineItems:[
          { label:"Tear-off existing cedar shake (significant disposal weight)", amount:"$3,400" },
          { label:"Synthetic underlayment + ice-and-water at eaves", amount:"$880" },
          { label:"Hand-split cedar shake, #1 grade Western red", amount:"$13,800" },
          { label:"Copper flashing throughout (design review requirement)", amount:"$3,200" },
          { label:"Pressure-applied fire retardant treatment", amount:"$1,600" },
          { label:"Multi-gable trim and valley detail", amount:"$2,400" },
          { label:"Ridge ventilation rebuild", amount:"$880" },
          { label:"Eastmoreland Historic District design review submission", amount:"$420" },
          { label:"Permit + BDS inspection", amount:"$520" },
          { label:"Cleanup and disposal", amount:"$580" },
        ],
        total:"$27,700",
        note:"Premium Eastmoreland Tudor retrofit. Hand-split #1 grade and copper flashing both reflect design review preference for landmark properties. Resawn cedar with galvanized flashing would have come in roughly $5,500 cheaper but design review pushed back on the initial Resawn proposal — the home is contributing to the historic district character and reviewers wanted heritage material profile.",
      },
      {
        scenario:"2,200 sq ft 1934 Craftsman on SE Crystal Springs — standing seam metal upgrade, Type II Historic Resource Review, design review timeline",
        lineItems:[
          { label:"Tear-off existing cedar shake", amount:"$2,400" },
          { label:"Synthetic high-temp underlayment", amount:"$760" },
          { label:"24-gauge standing seam panels (heritage charcoal)", amount:"$13,400" },
          { label:"Specialty ridge, hip, valley, gable trim", amount:"$2,200" },
          { label:"Snow guard system above entries (design review requirement)", amount:"$1,200" },
          { label:"Type II Historic Resource Review (cedar conversion)", amount:"$680" },
          { label:"Eastmoreland design review submission and approval", amount:"$580" },
          { label:"Permit + BDS inspection", amount:"$520" },
          { label:"Cleanup and disposal", amount:"$420" },
        ],
        total:"$22,160",
        note:"Cedar-to-metal conversion required Type II Historic Resource Review and Eastmoreland design review running in parallel. Total review timeline was 9 weeks (longer than the 4–6 typical for cedar in kind). Snow guards above entries were specifically requested by design review as a heritage character detail. Final approval came with stipulation that future maintenance would be reviewed if material profile or color changes.",
      },
      {
        scenario:"3,400 sq ft 1925 Colonial Revival near Reed College — cedar shake retrofit in kind, premium spec, complex roofline",
        lineItems:[
          { label:"Tear-off existing cedar shake (heavy disposal)", amount:"$4,200" },
          { label:"Synthetic underlayment + ice-and-water at eaves and valleys", amount:"$1,200" },
          { label:"Hand-split cedar shake, #1 grade Western red", amount:"$17,800" },
          { label:"Copper flashing throughout", amount:"$4,400" },
          { label:"Pressure-applied fire retardant treatment", amount:"$2,200" },
          { label:"Complex multi-gable Colonial Revival trim and detail work", amount:"$3,800" },
          { label:"Ridge ventilation rebuild + soffit upgrade", amount:"$1,400" },
          { label:"Eastmoreland Historic District design review", amount:"$520" },
          { label:"Permit + BDS inspection", amount:"$680" },
          { label:"Cleanup, disposal, premium-property cleanup standards", amount:"$880" },
        ],
        total:"$37,080",
        note:"Premium upper-tier Eastmoreland project. The Colonial Revival multi-gable roofline added roughly $4,000 in trim and detail labour over a simpler Tudor equivalent. Hand-split #1 grade and copper throughout are standard for landmark properties — design review pushes back on cost-saving substitutions on contributing properties.",
      },
    ],
    permitDetail:{
      fee:"$420–$680 typical Eastmoreland residential, plus design review fees",
      processing:"3–4 weeks for cedar in kind; 4–6 weeks for material change with Type II review; 6–9 weeks for non-standard color/profile",
      specialRequirements:[
        "Eastmoreland Historic District design review applies to all visible roofing changes",
        "Cedar shake retrofit in kind is the path of least resistance — fastest review timeline",
        "Material substitution (cedar to asphalt or metal) requires Type II Historic Resource Review with formal documentation",
        "Hand-split cedar and copper flashing favored on landmark properties (contributing structures)",
        "Pressure-applied fire retardant treatment required on cedar shake projects for Class B rating",
      ],
    },
    locationFaqs:[
      {
        question:"Can I really not replace my Eastmoreland cedar with architectural asphalt?",
        answer:"You can, but it requires Type II Historic Resource Review with formal documentation explaining the substitution. Eastmoreland Historic District design review favors cedar in kind and pushes back on material substitutions on contributing properties. Conversion approval is more likely on non-contributing properties (post-1965 builds) and on properties with previous non-cedar roofing already approved. Submit a formal proposal early — the review can take 4–6 weeks and the outcome binds the material decision.",
      },
      {
        question:"Hand-split versus Resawn cedar — which does Eastmoreland design review require?",
        answer:"Hand-split Western red cedar is favored on contributing landmark properties and is sometimes specifically required by design review on properties that anchor the district character. Resawn cedar is acceptable on most properties and costs roughly $4,000–$6,000 less than hand-split #1 grade. Submit your proposed material profile during design review and accept that the board may push back to hand-split on landmark properties. The final material decision is bound by review approval, not contractor preference.",
      },
      {
        question:"How long does the full Eastmoreland design review process actually take?",
        answer:"Cedar in kind clears fastest at 3–4 weeks. Material substitution (cedar to architectural asphalt or metal) requires Type II Historic Resource Review running in parallel and typically takes 4–6 weeks. Non-standard color or profile choices on metal can extend to 6–9 weeks with multiple revision cycles. Build the review timeline into project planning explicitly — starting installation work without final approval triggers a stop-work order from BDS.",
      },
      {
        question:"Why is copper flashing pushed by Eastmoreland design review?",
        answer:"Copper is the architectural match for cedar's heritage character and is favored by design review on contributing properties. Copper flashing also outlasts galvanized by 30+ years, which matters on a heritage cedar project where the flashing may be expected to outlive multiple cedar replacement cycles. Copper premium over galvanized runs $2,000–$4,500 on a typical Eastmoreland project. On non-contributing properties, galvanized is usually acceptable.",
      },
      {
        question:"Should I budget for the pressure-applied fire retardant treatment?",
        answer:"Yes if you're going with cedar shake. The treatment is required to achieve Class B fire rating that most Eastmoreland properties need for insurance compliance, and it's expected by design review as part of a complete cedar shake project. Cost runs $1,200–$2,400 depending on roof size. The treatment lasts 7–10 years before renewal is needed (renewal is roughly 60% of original treatment cost).",
      },
    ],
    serviceAreas:[
      "Reed College area",
      "Eastmoreland Golf Course",
      "Crystal Springs",
      "Berkeley",
      "Woodstock (north edge)",
      "Sellwood (south border)",
      "SE Bybee corridor",
    ],
    serviceContext:{
      'cedar-shake-roofing':"Cedar shake retrofit is the dominant Eastmoreland project type and runs $22,000–$32,000 with hand-split Western red cedar, copper flashing, and pressure-applied fire retardant treatment. Eastmoreland Historic District design review approves cedar in kind in 3–4 weeks; material substitution to architectural asphalt or metal requires parallel Type II Historic Resource Review with formal documentation. The design review timeline is binding — installation cannot begin without approval.",
      'roof-replacement':"Eastmoreland replacement projects are heavily weighted toward cedar in kind because of historic district design review. Architectural asphalt conversions land at $14,000–$18,000 inclusive of Type II review fees and timeline. Standing seam metal is possible but requires extended review and frequently faces pushback on non-traditional colors. Plan 4–6 weeks of design review before any installation can begin.",
    },
  },

  // ── NE Portland ───────────────────────────────────────────────────────────
  {
    slug:'alberta-arts-district', name:'Alberta Arts District', zip:'97211', area:'NE Portland',
    avgCost:9600, range:'$7.2k–$14.5k', badge:'hot', commonMaterial:'Architectural Asphalt',
    indexPct:72,
    description:"NE Portland's NE Alberta Street commercial spine and surrounding residential streets — predominantly 1900s–1930s Craftsman bungalows with the kind of post-2010 gentrification dynamic that's brought premium re-roof spec uptake into a historically affordable neighborhood.",
    highlights:[
      "NE Alberta Street commercial spine with surrounding 1900–1935 Craftsman bungalow stock",
      "Post-2010 gentrification has brought premium spec uptake to a historically affordable area",
      "Sabin and Concordia residential adjacency — overlapping moss pressure and similar housing patterns",
    ],
    permitScore:3,
    permitNotes:"Standard Portland BDS permit. Some properties on NE 30th–34th near the King Neighborhood face Type II review. Most replacements clear in 5–7 business days.",
    localCostTruth:[
      "Alberta Arts has been one of the most active Portland re-roofing markets over the last decade because of two converging dynamics. The 1900–1935 Craftsman bungalow housing stock that defines this neighborhood is in active replacement cycles for the original or first-replacement asphalt roofs that went on in the 1970s–1990s. And the post-2010 gentrification that's reshaped NE Alberta Street has brought a homeowner profile that runs lifecycle economics rather than minimum upfront cost — premium architectural, AR-granule shingles, and standing seam metal uptake are all higher in this neighborhood than the Portland average.",
      "The dominant Alberta housing stock is the 1,300–1,800 sq ft 1900–1925 Craftsman or bungalow with original cedar deck planks. The skip-sheathed deck overlay story applies here exactly as it does in Hawthorne and Sellwood-Moreland — overlay adds $2,200–$4,200 to a typical project and is almost universal on pre-1925 stock. The variable is whether tear-off reveals significant deck damage from sustained moss colonization (more common on north-facing slopes under heavy canopy) or sound original decking that just needs the modern plywood overlay.",
      "Tree canopy in Alberta is meaningful but slightly below the upper Inner SE neighborhoods. The streets adjacent to NE Alberta and Killingsworth are less canopied than Hawthorne or Sellwood; the streets between NE Alberta and NE Prescott have heavier canopy where moss management becomes a significant ongoing cost. Plan on biennial chemical treatment and zinc ridge strip installation as part of any new roof in heavy-canopy locations.",
      "The post-2010 neighborhood transition has also brought tighter contractor scrutiny. Alberta homeowners more frequently verify CCB licensing, request three competing bids, and ask for written workmanship warranties as a baseline. Established Portland roofing contractors compete on Alberta projects more aggressively than they do in most NE Portland neighborhoods because the buyer profile pays attention. The practical effect is tighter bid spreads on equivalent scope.",
    ],
    costDrivers:[
      {
        factor:"Skip-sheathed deck overlay on pre-1925 stock",
        impact:"+$2,200 to $4,200",
        detail:"Universal on Alberta Craftsmans and bungalows. Per-sheet rate must be specified pre-bid.",
      },
      {
        factor:"Premium architectural shingle uptake",
        impact:"+$1,200 to $2,500",
        detail:"Higher than NE Portland average reflects post-2010 buyer profile. Premium AR-granule and 50-year designer products are common spec.",
      },
      {
        factor:"Tree canopy moss management",
        impact:"+$300 to $600 every 2 years",
        detail:"Streets between NE Alberta and NE Prescott see meaningful canopy density. Zinc ridge strip plus biennial treatment standard for these locations.",
      },
      {
        factor:"Two-layer tear-off on 1990s re-roofs",
        impact:"+$1,000 to $1,800",
        detail:"Significant share of Alberta homes had original cedar replaced with 1990s asphalt. Both layers must come off for modern install.",
      },
      {
        factor:"Solar-ready conduit at install",
        impact:"+$100 to $300 vs. $500–$2,000 retrofit",
        detail:"Frequent ask in Alberta — neighborhood profile runs solar economics during re-roofing decisions.",
      },
    ],
    workedExamples:[
      {
        scenario:"1,500 sq ft 1918 Craftsman on NE 17th — premium architectural replacement, skip-sheathed overlay, light canopy",
        lineItems:[
          { label:"Tear-off and disposal (single-layer 1990s asphalt)", amount:"$1,800" },
          { label:"Plywood overlay over skip-sheathed deck (22 sheets)", amount:"$2,420" },
          { label:"Synthetic underlayment + ice-and-water at eaves", amount:"$540" },
          { label:"Premium architectural shingles, GAF Timberline UHDZ", amount:"$5,400" },
          { label:"Ridge vent + soffit baffle upgrade", amount:"$580" },
          { label:"Pipe boots, step flashing, drip edge", amount:"$420" },
          { label:"Solar-ready conduit installation", amount:"$240" },
          { label:"Permit + BDS inspection", amount:"$280" },
          { label:"Cleanup and disposal", amount:"$340" },
        ],
        total:"$12,020",
        note:"Solid mid-tier Alberta replacement. The premium UHDZ shingle is a $1,200 upgrade over base architectural — common ask in Alberta for the 50-year warranty and 130 mph wind rating. Solar-ready conduit at $240 is a no-brainer add for any homeowner with future solar plans.",
      },
      {
        scenario:"1,750 sq ft 1924 bungalow on NE 24th near Concordia border — architectural replacement, two-layer tear-off, mature canopy",
        lineItems:[
          { label:"Two-layer tear-off (cedar + 1990s asphalt)", amount:"$2,400" },
          { label:"Plywood overlay (24 sheets)", amount:"$2,640" },
          { label:"Deck repair (3 sheets at NW slope)", amount:"$390" },
          { label:"Synthetic underlayment + ice-and-water at eaves and valleys", amount:"$680" },
          { label:"Architectural shingles, Malarkey Vista AR", amount:"$5,200" },
          { label:"Ridge vent + soffit baffle install", amount:"$680" },
          { label:"Zinc ridge strip moss prevention", amount:"$280" },
          { label:"Permit + BDS inspection", amount:"$320" },
          { label:"Cleanup and disposal", amount:"$420" },
        ],
        total:"$13,010",
        note:"Two-layer tear-off and full plywood overlay are standard for 1920s Alberta stock that received the original cedar replacement in the 1990s. Malarkey Vista AR is the strongest moss-resistant asphalt — meaningful upgrade in this canopy environment.",
      },
      {
        scenario:"1,650 sq ft 1912 Craftsman near NE Killingsworth — standing seam metal upgrade, plywood overlay, sound deck",
        lineItems:[
          { label:"Tear-off existing architectural over original cedar", amount:"$2,000" },
          { label:"Plywood overlay (22 sheets)", amount:"$2,420" },
          { label:"Synthetic high-temp underlayment", amount:"$680" },
          { label:"24-gauge standing seam panels (charcoal)", amount:"$10,800" },
          { label:"Trim, ridge, hip, valley, gable", amount:"$1,800" },
          { label:"Solar-ready conduit installation", amount:"$240" },
          { label:"Permit + BDS inspection", amount:"$320" },
          { label:"Cleanup and disposal", amount:"$420" },
        ],
        total:"$18,680",
        note:"Metal premium of roughly $6,500 over architectural asphalt replacement. The 1912 deck required overlay regardless of material, so the metal vs. asphalt comparison was straightforward. Solar-ready conduit was already specified during pre-bid given the home's south-facing roof orientation.",
      },
    ],
    permitDetail:{
      fee:"$280–$420 typical residential",
      processing:"5–7 business days online for standard replacement",
      specialRequirements:[
        "Properties on Portland's Historic Resource Inventory require Type II Historic Resource Review",
        "Properties on NE 30th–34th near the King Neighborhood may face additional review on visible material changes",
        "Re-roofing over an existing layer typically not permitted — full tear-off required",
        "Attic ventilation ratio (1:300 balanced) actively reviewed at final inspection",
      ],
    },
    locationFaqs:[
      {
        question:"Why is Alberta Arts more expensive than other NE Portland neighborhoods?",
        answer:"Two reasons. First, the post-2010 gentrification has brought a homeowner profile that runs lifecycle economics — premium architectural, AR-granule shingles, and standing seam metal uptake are all higher than the NE Portland average, which pulls average project cost up. Second, established Portland roofing contractors compete more aggressively for Alberta projects because the buyer profile pays attention to CCB licensing, three-bid comparisons, and written workmanship warranties as baselines.",
      },
      {
        question:"Should I expect skip-sheathed deck overlay on my Alberta Craftsman?",
        answer:"Almost certainly yes if your home is pre-1925. Skip-sheathed decking (1×4 boards with gaps) was code-compliant for cedar shake but cannot support modern asphalt shingle attachment patterns. Plan for $2,200–$4,200 in plywood overlay material and labour. Per-sheet rate runs $90–$130 installed. Get the rate in writing before signing — quotes that don't include the overlay are either incomplete or assume a deck condition the contractor hasn't actually verified.",
      },
      {
        question:"Is metal worth specifying in Alberta?",
        answer:"For homeowners staying 12+ years and particularly those with future solar plans, yes. Metal eliminates the moss-treatment cycle entirely, outlasts asphalt by roughly 2x in this canopy environment, and clamp mounting on standing seam means future solar installation requires no roof penetrations. The $5,000–$7,500 premium pays back through avoided maintenance and avoided replacement cycles. Solar-ready specification at install is the cleanest cost-effective add for any Alberta homeowner with future solar plans.",
      },
      {
        question:"How does Alberta canopy compare to Hawthorne or Sellwood?",
        answer:"Slightly lighter overall but heavily location-dependent. The streets adjacent to NE Alberta and NE Killingsworth are less canopied than Hawthorne or Sellwood-Moreland. The residential streets between NE Alberta and NE Prescott — particularly NE 17th through NE 30th — have meaningful canopy density that drives moss-related shingle premiums. Plan for biennial chemical treatment and zinc ridge strip installation on canopied locations.",
      },
      {
        question:"What's the right shingle spec for Alberta's mix of canopy and exposure?",
        answer:"AR-granule architectural shingles at minimum — Malarkey Vista AR or GAF Timberline HDZ AR are the strongest performers in Portland's moss-pressure environment. Premium 50-year products (GAF Timberline UHDZ, CertainTeed Landmark Pro) add $1,000–$1,500 over base architectural and offer 130 mph wind ratings plus better long-term performance — recommended for any homeowner staying 10+ years.",
      },
    ],
    serviceAreas:[
      "Sabin",
      "Concordia",
      "King Neighborhood",
      "Vernon",
      "Cully (border)",
      "Beaumont (south edge)",
      "Hollywood (border)",
    ],
  },

  // ── NE Portland Historic ──────────────────────────────────────────────────
  {
    slug:'irvington', name:'Irvington', zip:'97212', area:'NE Portland',
    avgCost:11200, range:'$8.5k–$17k', badge:'premium', commonMaterial:'Architectural Asphalt',
    indexPct:80,
    description:"NE Portland's flagship listed historic district — Tudor, Colonial Revival, and foursquare homes from 1900–1930 on tree-lined streets between Broadway and Knott. Alameda Ridge premium tier on the eastern edge. Active design review on visible material changes citywide.",
    highlights:[
      "Listed Irvington Historic District — citywide design review on visible material changes",
      "Alameda Ridge premium hillside tier on eastern edge — wind exposure and view-corridor considerations",
      "Mix of Tudor, Colonial Revival, and foursquare — wider material range than Eastmoreland's cedar dominance",
    ],
    permitScore:4,
    permitNotes:"Irvington Historic District design review applies citywide to visible roofing changes. Alameda Ridge properties may also face wind-rating documentation requirements. Type II review for material changes typically takes 4–6 weeks.",
    localCostTruth:[
      "Irvington is NE Portland's premier listed historic district and one of Portland's most architecturally diverse — Tudor, Colonial Revival, foursquare, and the occasional Craftsman or bungalow all coexist within the district boundaries. Unlike Eastmoreland's strong cedar shake bias, Irvington's design review accommodates a wider material range, with architectural asphalt, premium designer shingles, standing seam metal, and slate-substitute products all approvable depending on the specific property and proposal.",
      "The dominant Irvington housing stock is the 2,200–3,200 sq ft 1900–1930 home on a generous lot between Broadway and Knott. Many of these homes have multi-gable, hip, or complex Tudor rooflines that consume material and add labour beyond simpler bungalow geometry. Replacement costs at the mid-tier ($10,000–$13,000) reflect quality architectural asphalt with proper detail work; premium projects on multi-gable Tudor or Colonial Revival ($15,000–$20,000) involve premium designer shingles, copper flashing, and complex valley intersection work.",
      "Alameda Ridge — the eastern edge of Irvington along NE Alameda — introduces two distinct cost variables. First, hillside positioning means meaningful wind exposure (sustained 30–50 mph during seasonal events) that demands 110+ mph wind ratings rather than the 90 mph Oregon code minimum. Second, view-corridor design review considerations on visible-from-street roofing decisions can extend timeline by 2–4 weeks. Properties on the ridge proper command premium pricing because the homeowner profile expects premium specs.",
      "Irvington Historic District design review is meaningfully less restrictive than Eastmoreland's but more rigorous than Ladd's Addition. The review applies to visible material changes on contributing properties and typically clears in 3–4 weeks for standard architectural asphalt in approved colors. Standing seam metal in heritage colors (charcoal, slate, weathered copper) clears in 4–5 weeks. Non-traditional colors or unusual material substitutions trigger Type II Historic Resource Review with longer timeline.",
    ],
    costDrivers:[
      {
        factor:"Multi-gable Tudor / Colonial Revival roofline labour",
        impact:"+25% to 35% on labour",
        detail:"Larger Irvington homes with multi-gable rooflines consume material and add labour vs. simpler bungalow geometry. Material consumption can run 15–20% above flat-lot equivalent.",
      },
      {
        factor:"Irvington Historic District design review",
        impact:"+3 to 6 weeks before permit",
        detail:"Citywide on visible material changes. Architectural asphalt clears fastest; standing seam metal in heritage colors clears in 4–5 weeks; non-traditional colors or unusual substitutions trigger Type II review.",
      },
      {
        factor:"Alameda Ridge wind rating",
        impact:"+$300 to $700",
        detail:"Hillside positioning along NE Alameda demands 110+ mph wind rating with six-nail attachment. Standard 90 mph products inadequate for ridge exposure.",
      },
      {
        factor:"Premium designer shingle uptake",
        impact:"+$1,500 to $3,500",
        detail:"Irvington homeowner profile favors premium 50-year designer products (CertainTeed Presidential, GAF Glenwood, Malarkey Windsor) over base architectural.",
      },
      {
        factor:"Copper flashing on contributing properties",
        impact:"+$1,800 to $3,800",
        detail:"Design review favors copper on contributing landmark properties — galvanized acceptable on most non-contributing properties.",
      },
      {
        factor:"Slate-substitute synthetic shingle option",
        impact:"+$2,000 to $4,500 over architectural",
        detail:"Some Irvington Tudor projects spec slate-look synthetic shingles (DaVinci, EcoStar) for heritage character. Premium over architectural but cheaper than real slate.",
      },
    ],
    workedExamples:[
      {
        scenario:"2,400 sq ft 1922 Tudor on NE 22nd — premium architectural replacement, multi-gable roofline, sound deck",
        lineItems:[
          { label:"Tear-off and disposal (single-layer architectural)", amount:"$2,200" },
          { label:"Synthetic underlayment + ice-and-water at eaves and valleys", amount:"$680" },
          { label:"Premium architectural, CertainTeed Landmark Pro Class A", amount:"$7,200" },
          { label:"Multi-gable trim and valley intersection labour", amount:"$1,800" },
          { label:"Ridge cap + ridge vent + soffit upgrade", amount:"$880" },
          { label:"Copper step + counter flashing at chimney", amount:"$1,400" },
          { label:"Pipe boots, drip edge, and detail work", amount:"$540" },
          { label:"Irvington Historic District design review submission", amount:"$420" },
          { label:"Permit + BDS inspection", amount:"$420" },
          { label:"Cleanup and disposal", amount:"$420" },
        ],
        total:"$15,960",
        note:"Mid-premium Irvington Tudor replacement. The premium architectural shingle plus copper chimney flashing reflect design review preference on a contributing property. The multi-gable trim work added roughly $1,500 over a simpler bungalow geometry equivalent.",
      },
      {
        scenario:"3,000 sq ft 1916 Colonial Revival on NE Tillamook — standing seam metal upgrade, complex roofline, design review",
        lineItems:[
          { label:"Tear-off existing architectural over original cedar", amount:"$2,800" },
          { label:"Synthetic high-temp underlayment", amount:"$960" },
          { label:"24-gauge standing seam panels (heritage charcoal)", amount:"$15,800" },
          { label:"Specialty trim at multiple gables, hips, valleys", amount:"$2,800" },
          { label:"Snow guard system above entry and walkway", amount:"$1,600" },
          { label:"Irvington Historic District design review (heritage charcoal approved)", amount:"$520" },
          { label:"Permit + BDS inspection", amount:"$520" },
          { label:"Cleanup and disposal", amount:"$520" },
        ],
        total:"$25,540",
        note:"Premium Colonial Revival with metal upgrade. Heritage charcoal cleared design review in 4 weeks (faster than non-traditional colors would have). Snow guard placement was specifically requested by review board for heritage character — pad-style guards above the entry and walkway.",
      },
      {
        scenario:"2,800 sq ft 1925 Tudor on Alameda Ridge — slate-substitute synthetic shingles, wind-rated install",
        lineItems:[
          { label:"Tear-off existing architectural", amount:"$2,400" },
          { label:"High-wind synthetic underlayment + ice-and-water shield", amount:"$880" },
          { label:"DaVinci Slate slate-substitute synthetic shingles", amount:"$14,200" },
          { label:"Multi-gable Tudor trim and valley detail work", amount:"$2,400" },
          { label:"Six-nail high-wind attachment pattern (110 mph rating)", amount:"$420" },
          { label:"Copper flashing throughout (Alameda Ridge contributing property)", amount:"$3,200" },
          { label:"Ridge ventilation rebuild", amount:"$880" },
          { label:"Irvington Historic District design review", amount:"$520" },
          { label:"Permit + BDS inspection", amount:"$520" },
          { label:"Cleanup and disposal", amount:"$520" },
        ],
        total:"$25,960",
        note:"Premium Alameda Ridge Tudor with slate-substitute synthetic shingles. DaVinci Slate is the most credible slate alternative — cheaper than real slate by 60% and approved by design review for heritage Tudor character. The wind-rated install (six-nail, 110 mph) reflects ridge exposure.",
      },
    ],
    permitDetail:{
      fee:"$420–$680 typical Irvington residential, plus design review fees",
      processing:"3–4 weeks for architectural in approved colors; 4–5 weeks for metal in heritage colors; 6–9 weeks for non-traditional substitutions",
      specialRequirements:[
        "Irvington Historic District design review applies citywide to visible material changes",
        "Architectural asphalt in approved colors clears fastest review timeline",
        "Standing seam metal in heritage colors (charcoal, slate, weathered copper) approvable; non-traditional colors trigger Type II review",
        "Alameda Ridge properties require 110+ mph wind rating documentation",
        "Copper flashing favored on contributing landmark properties",
      ],
    },
    locationFaqs:[
      {
        question:"What's the difference between Irvington and Eastmoreland design review?",
        answer:"Irvington is meaningfully less restrictive than Eastmoreland on material substitution. Eastmoreland strongly favors cedar shake in kind and pushes back on conversions; Irvington accommodates architectural asphalt, premium designer shingles, standing seam metal, and slate-substitute products on most contributing properties. Both are listed historic districts with active design review, but Irvington's review accepts a wider material palette as long as the proposal documents heritage character preservation.",
      },
      {
        question:"Is Alameda Ridge actually different from the rest of Irvington for roofing?",
        answer:"Yes, in two ways. First, hillside positioning along NE Alameda creates meaningful wind exposure during seasonal events — 110+ mph wind rating with six-nail attachment is the practical Alameda Ridge standard, vs. 90 mph elsewhere in Irvington. Second, view-corridor design review considerations apply to visible-from-street roofing decisions on ridge properties, which can extend timeline by 2–4 weeks. Properties on the ridge proper command premium pricing.",
      },
      {
        question:"Should I consider slate-substitute synthetic shingles for my Irvington Tudor?",
        answer:"Worth considering for Tudor or Colonial Revival properties where slate would be the heritage material. DaVinci Slate and EcoStar synthetic slate cost roughly $4,000–$6,000 less than real slate, install with standard roofing labour rather than slate specialists, and clear Irvington design review on contributing properties. Premium over architectural asphalt is $2,000–$4,500 — worthwhile for the heritage character on appropriate housing stock.",
      },
      {
        question:"How long does Irvington design review take in practice?",
        answer:"Architectural asphalt in approved colors: 3–4 weeks. Standing seam metal in heritage colors (charcoal, slate, weathered copper): 4–5 weeks. Slate-substitute synthetics: 4–5 weeks if matching the original heritage material. Non-traditional colors or unusual material substitutions: 6–9 weeks with multiple revision cycles. Build the timeline into project planning explicitly — starting installation without final approval triggers a stop-work order from BDS.",
      },
      {
        question:"Does Irvington design review really care about flashing material?",
        answer:"On contributing landmark properties, yes — copper is favored over galvanized for heritage character. On non-contributing properties (post-1965 builds within district boundaries, properties without notable architectural significance), galvanized is generally acceptable. Submit your proposed flashing detail with the design review application; the board will indicate whether copper is required or galvanized acceptable. Copper premium runs $2,000–$4,500 on a typical Irvington project.",
      },
    ],
    serviceAreas:[
      "Lloyd District (border)",
      "Sullivan's Gulch",
      "Sabin (north border)",
      "Alameda (overlap)",
      "Beaumont-Wilshire (north)",
      "Grant Park (north)",
      "Hollywood (north border)",
    ],
  },

  // ── N Portland ────────────────────────────────────────────────────────────
  {
    slug:'st-johns', name:'St. Johns', zip:'97203', area:'N Portland',
    avgCost:8400, range:'$6.5k–$12.5k', commonMaterial:'Architectural Asphalt',
    indexPct:63,
    description:"N Portland's distinct affordable bracket — Cathedral Park, the St. Johns Bridge, and a working-class housing stock of smaller bungalows and 1940s–1960s ranches that re-roof at meaningfully lower cost than Inner SE or NE Portland. Bigger catchment area than the dense Inner SE neighborhoods.",
    highlights:[
      "N Portland affordable bracket — meaningfully cheaper than Inner SE or Eastmoreland",
      "Working-class housing stock: smaller 1900–1925 bungalows + 1940s–1960s ranches",
      "Distinct community identity — Cathedral Park, St. Johns Bridge, Lombard commercial spine",
    ],
    permitScore:2,
    permitNotes:"Standard Portland BDS permit. No active historic district overlay in St. Johns proper. Most replacements clear in 3–5 business days online.",
    localCostTruth:[
      "St. Johns is N Portland's affordable bracket and a meaningful re-roofing market because of two converging dynamics. The 1900–1925 bungalow housing stock that lines the streets between N Lombard and N Willamette is in active replacement cycles for original or first-replacement asphalt roofs. And the 1940s–1960s ranch housing wave that infilled large parts of St. Johns east of N Lombard is also reaching end-of-life on the original or 1980s-era second-roof asphalt.",
      "Average replacement cost in St. Johns runs $8,400 — roughly 14% below the Hawthorne average and 25% below the Eastmoreland average — and the spread is tight because the housing stock is more uniform and simpler than the architectural diversity of Inner SE or NE Portland. A typical St. Johns bungalow re-roofs at $7,200–$9,500 with architectural asphalt and a sound deck; the upper end of the range ($11,000–$12,500) reflects two-layer tear-off, deck damage, or larger 1960s ranch homes with more complex hip rooflines.",
      "The dominant cost driver in St. Johns is the bungalow skip-sheathed deck variable, identical to Hawthorne and Sellwood-Moreland — $1,800–$3,400 in plywood overlay material and labour on pre-1925 stock. The ranch stock east of N Lombard typically has modern plywood decking that doesn't require overlay, which is why mid-century St. Johns ranches re-roof at the cheapest end of any Portland neighborhood. Per-sheet rate must still be specified pre-bid for unexpected sheet replacement.",
      "St. Johns sees less tree canopy than the upper Inner SE neighborhoods, which translates to longer real-world asphalt life — 24–28 years on most St. Johns properties vs. 20–24 in canopied Sellwood or upper Hawthorne. Moss management is still recommended (zinc ridge strip plus chemical treatment every 3–4 years) but the maintenance frequency is lower than the Inner SE standard. AR-granule shingles are reasonable spec but not as essential as in heavily canopied neighborhoods.",
    ],
    costDrivers:[
      {
        factor:"Skip-sheathed deck overlay on pre-1925 bungalows",
        impact:"+$1,800 to $3,400",
        detail:"Universal on St. Johns bungalows. Per-sheet rate must be specified pre-bid. Mid-century ranches typically have modern plywood and no overlay needed.",
      },
      {
        factor:"Two-layer tear-off on 1980s re-roofs",
        impact:"+$900 to $1,600",
        detail:"Significant share of St. Johns homes had original cedar replaced with 1980s asphalt that is now also at end of life.",
      },
      {
        factor:"Smaller home footprint reduces material consumption",
        impact:"-$1,500 to $3,000 vs. larger Inner SE",
        detail:"St. Johns bungalow average is 1,200–1,500 sq ft vs. 1,500–1,900 in Hawthorne. Material savings translate directly to lower total cost.",
      },
      {
        factor:"Lighter canopy reduces moss premium",
        impact:"-$200 to $400 over 25 years",
        detail:"Less canopy density than Inner SE means longer real-world asphalt life and less aggressive moss management spec.",
      },
      {
        factor:"Solar-ready conduit at install",
        impact:"+$100 to $300 vs. $500–$2,000 retrofit",
        detail:"St. Johns has growing solar uptake — flat south-facing roofs on ranch stock are favorable for panel installation.",
      },
    ],
    workedExamples:[
      {
        scenario:"1,300 sq ft 1922 bungalow on N Smith — architectural replacement, skip-sheathed overlay, light canopy",
        lineItems:[
          { label:"Tear-off and disposal (single-layer 1980s asphalt)", amount:"$1,400" },
          { label:"Plywood overlay over skip-sheathed deck (18 sheets)", amount:"$1,980" },
          { label:"Synthetic underlayment + ice-and-water at eaves", amount:"$420" },
          { label:"Architectural shingles, GAF Timberline HDZ", amount:"$3,800" },
          { label:"Ridge vent + soffit baffle upgrade", amount:"$520" },
          { label:"Pipe boots and step flashing", amount:"$280" },
          { label:"Permit + BDS inspection", amount:"$240" },
          { label:"Cleanup and disposal", amount:"$280" },
        ],
        total:"$8,920",
        note:"Solid mid-tier St. Johns bungalow replacement. Smaller footprint and simpler hip roofline kept material and labour costs meaningfully below equivalent Hawthorne or Sellwood project. Plywood overlay was unavoidable but per-sheet rate stayed at $110 — competitive for the St. Johns market.",
      },
      {
        scenario:"1,750 sq ft 1962 ranch east of N Lombard — architectural replacement, sound modern deck, simple gable",
        lineItems:[
          { label:"Tear-off and disposal", amount:"$1,400" },
          { label:"Deck spot repair (2 sheets at south slope)", amount:"$220" },
          { label:"Synthetic underlayment + ice-and-water at eaves", amount:"$440" },
          { label:"Architectural shingles, Owens Corning Duration", amount:"$4,200" },
          { label:"Ridge vent + 4 new soffit vents", amount:"$580" },
          { label:"Pipe boots and step flashing", amount:"$280" },
          { label:"Permit + BDS inspection", amount:"$240" },
          { label:"Cleanup and disposal", amount:"$280" },
        ],
        total:"$7,640",
        note:"Lower-end St. Johns replacement on a mid-century ranch. No skip-sheathed overlay needed (1962 deck was modern plywood). Simple gable geometry installed efficiently. Represents the cheapest tier of any Portland neighborhood for a quality architectural asphalt replacement.",
      },
      {
        scenario:"1,500 sq ft 1968 ranch with solar plans — premium architectural, solar-ready conduit, ventilation upgrade",
        lineItems:[
          { label:"Tear-off and disposal", amount:"$1,300" },
          { label:"Synthetic underlayment + ice-and-water at eaves", amount:"$440" },
          { label:"Premium architectural, GAF Timberline UHDZ", amount:"$4,800" },
          { label:"Ridge vent + 6 new soffit vents (1:300 compliance)", amount:"$780" },
          { label:"Solar-ready conduit installation", amount:"$220" },
          { label:"Pipe boots and step flashing", amount:"$320" },
          { label:"Permit + BDS inspection", amount:"$240" },
          { label:"Cleanup and disposal", amount:"$280" },
        ],
        total:"$8,380",
        note:"St. Johns ranch with future solar plans. The premium UHDZ shingle plus solar-ready conduit are both cost-effective adds for a homeowner planning to install solar within 5–7 years. Ventilation upgrade brought the home into 1:300 balanced compliance — modest cost at install vs. likely $1,500+ retrofit later.",
      },
    ],
    permitDetail:{
      fee:"$240–$340 typical residential",
      processing:"3–5 business days online for standard replacement",
      specialRequirements:[
        "No active historic district overlay in St. Johns proper",
        "Cathedral Park area properties may face waterfront/view-corridor considerations on visible material changes",
        "Re-roofing over an existing layer typically not permitted — full tear-off required",
        "Attic ventilation ratio (1:300 balanced) reviewed at final inspection",
      ],
    },
    locationFaqs:[
      {
        question:"Why is St. Johns so much cheaper than Inner SE Portland?",
        answer:"Three factors. Smaller home footprint — St. Johns bungalow average is 1,200–1,500 sq ft vs. 1,500–1,900 in Hawthorne, which directly reduces material consumption. Lighter tree canopy means longer real-world asphalt life and less aggressive moss management spec. And mid-century ranch housing stock east of N Lombard typically has modern plywood decking that doesn't require the skip-sheathed overlay that drives pre-1925 Inner SE costs. The combination puts St. Johns in Portland's most affordable bracket.",
      },
      {
        question:"Should I expect skip-sheathed deck overlay on my St. Johns bungalow?",
        answer:"On pre-1925 stock, almost certainly yes. Plan for $1,800–$3,400 in plywood overlay material and labour on a typical 1,200–1,500 sq ft St. Johns bungalow. On 1940s+ ranch stock east of N Lombard, modern plywood decking is standard and overlay is not needed. The variable depends entirely on year built. Get the per-sheet rate in writing in the contract regardless — unexpected sheet replacement at $90–$130 each can add up.",
      },
      {
        question:"Does light canopy in St. Johns mean I can skip moss management?",
        answer:"Skip is too strong, but the maintenance cycle is meaningfully lighter than Inner SE Portland. Plan for chemical moss treatment every 3–4 years rather than every 2 years (Inner SE standard), and budget around $1,500–$2,500 over a 25-year roof life rather than the $3,500–$5,000 typical for canopied neighborhoods. Zinc ridge strip at install is still worthwhile — it's $150–$300 once and reduces treatment frequency further.",
      },
      {
        question:"Is St. Johns a good market for solar-ready re-roofing?",
        answer:"Yes — the mid-century ranch housing stock east of N Lombard has favorable south-facing roof orientations for solar panel installation, and the homeowner profile is increasingly running solar economics during re-roofing decisions. Solar-ready conduit at install costs $100–$300 vs. $500–$2,000 retrofit. HB 4029, effective June 5 2026, requires Oregon solar contractors to provide written disclosure before any contract — making solar planning a roofing-stage decision rather than a separate trade-coordination challenge later.",
      },
      {
        question:"Are there any historic district concerns in St. Johns?",
        answer:"Less than most Portland neighborhoods. St. Johns proper has no formal historic district overlay. Properties bordering Cathedral Park may face waterfront/view-corridor design review considerations on visible material changes, and individual properties on Portland's Historic Resource Inventory require Type II review regardless of neighborhood. Confirm at portlandmaps.com using your specific address — most St. Johns properties clear permit without additional review requirements.",
      },
    ],
    serviceAreas:[
      "Cathedral Park",
      "Portsmouth",
      "University Park",
      "Linnton",
      "Kenton (border)",
      "Arbor Lodge (border)",
      "Mock's Crest",
      "Pier Park area",
    ],
  },

  // ── SW Portland Premium / West Hills ──────────────────────────────────────
  {
    slug:'west-hills', name:'West Hills', zip:'97225', area:'West Portland',
    avgCost:14800, range:'$11k–$26k', badge:'premium', commonMaterial:'Standing Seam Metal',
    indexPct:92,
    description:"Portland's luxury hillside corridor — Council Crest, Forest Park, Sylvan-Highlands, and the steep contemporary builds along the SW Patton corridor. Pitches above 10:12, mature canopy, wind exposure, and frequently crane staging push average replacement cost into the upper Portland tier.",
    highlights:[
      "Luxury hillside corridor — Council Crest, Forest Park, Sylvan-Highlands, Patton corridor",
      "Steep pitches (10:12+) and complex contemporary rooflines drive labour premium",
      "Wind exposure on ridge properties — 110+ mph rating with concealed-fastener systems standard",
    ],
    permitScore:4,
    permitNotes:"Portland BDS permit standard. Hillside positioning frequently triggers fall-protection inspection requirements and wind-rating documentation. Crane day permits required on most projects.",
    localCostTruth:[
      "West Hills roofing economics are unlike any other Portland market because of housing complexity and access. The dominant housing stock is the 2,800–4,500 sq ft 1980s–2000s contemporary or modern build on a steep hillside lot, with pitches frequently above 10:12 and rooflines that include multiple gables, hips, valleys, and complex skylight or window-wall intersections. Labour premium runs 25–40% above flat-lot equivalent before any material upgrade is factored in.",
      "Standing seam metal is the dominant West Hills replacement spec — roughly 55% of replacements in this corridor specify metal vs. roughly 15% Portland-wide. Three factors drive the preference: West Hills homeowners run lifecycle economics (50+ year metal life eliminates one or two future asphalt cycles), wind exposure on ridge properties favors concealed-fastener systems that move with thermal expansion rather than asphalt that lifts at high gusts, and metal sheds the heavy moss pressure created by mature canopy on north-facing slopes that would compress asphalt life to 18–22 years here.",
      "Crane access is the access constraint that defines most West Hills projects. Steep hillside lots frequently have driveway access on one side of the home only, with the upper roof area inaccessible from ground-level material staging. Crane day adds $1,400–$3,500 to a project but is meaningfully cheaper than the alternative — manually carrying 24-gauge metal panels or cedar shake bundles up steep slopes adds days of labour and creates fall risk that drives both insurance and OSHA compliance scrutiny.",
      "Wind rating is non-negotiable on ridge properties. Council Crest, Forest Park ridge addresses, and Sylvan-Highlands properties along the SW Patton corridor face sustained 30–50 mph wind events multiple times per year, with occasional 70+ mph peaks during major weather events. The Oregon Residential Specialty Code minimum of 90 mph wind rating is inadequate; 110+ mph is the practical West Hills standard, with concealed-fastener metal systems strongly preferred over exposed-fastener products that strip during high-wind events.",
    ],
    costDrivers:[
      {
        factor:"Hillside / steep-pitch labour premium",
        impact:"+25% to 40% on labour",
        detail:"10:12+ pitches throughout Council Crest, Forest Park, Sylvan-Highlands. Harness systems, slower pace, frequently crane staging required.",
      },
      {
        factor:"Crane staging on steep-access lots",
        impact:"+$1,400 to $3,500",
        detail:"Most West Hills projects above 10:12 require crane day for material staging. Cheaper than manual carry up steep slopes.",
      },
      {
        factor:"Standing seam metal premium",
        impact:"+$8,000 to $15,000 over architectural",
        detail:"Dominant West Hills spec. Lifecycle math, wind exposure, and moss elimination favor metal in this corridor.",
      },
      {
        factor:"Wind rating upgrade to 110+ mph",
        impact:"+$400 to $900",
        detail:"Ridge-property exposure demands beyond 90 mph code minimum. Concealed-fastener systems strongly preferred.",
      },
      {
        factor:"Complex contemporary roofline labour",
        impact:"+15% to 25%",
        detail:"Multiple gables, hips, valleys, and skylight or window-wall intersections common in 1980s–2000s West Hills builds.",
      },
      {
        factor:"Snow guard system on metal",
        impact:"+$1,800 to $4,200",
        detail:"Required above entries, walkways, adjacent driveways. West Hills accumulates more snow load than flat Portland — guards prevent slide events.",
      },
    ],
    workedExamples:[
      {
        scenario:"3,400 sq ft 1992 contemporary in Council Crest — standing seam metal, 12:12 pitch, crane staging, wind-rated install",
        lineItems:[
          { label:"Tear-off existing architectural asphalt", amount:"$3,200" },
          { label:"Synthetic high-temp underlayment", amount:"$1,200" },
          { label:"24-gauge standing seam panels (matte black)", amount:"$19,800" },
          { label:"Specialty trim at multiple gables, hips, valleys", amount:"$3,200" },
          { label:"Snow guard system across south + west slopes", amount:"$3,400" },
          { label:"Six-nail high-wind attachment (110 mph)", amount:"$420" },
          { label:"Crane day for upper-roof material staging", amount:"$2,400" },
          { label:"Steep-pitch fall-protection equipment and labour premium", amount:"—" },
          { label:"Permit + BDS structural review for panel weight", amount:"$680" },
          { label:"Cleanup and disposal", amount:"$680" },
        ],
        total:"$34,980",
        note:"Premium West Hills replacement representative of Council Crest contemporary builds. Crane day, snow guards, and wind-rated install together added roughly $7,500 over a flat-lot metal equivalent. Matte black color cleared design review without issue (no historic overlay on this address).",
      },
      {
        scenario:"4,200 sq ft 2001 modern build in Sylvan-Highlands — premium architectural shingles, complex roofline, crane staging",
        lineItems:[
          { label:"Tear-off original architectural", amount:"$3,400" },
          { label:"High-wind synthetic underlayment + ice-and-water at valleys", amount:"$1,200" },
          { label:"Premium architectural, CertainTeed Presidential", amount:"$10,200" },
          { label:"Specialty trim at multiple gables, hips, valleys, skylight curbs", amount:"$2,800" },
          { label:"Six-nail high-wind attachment (110 mph)", amount:"$520" },
          { label:"Crane day for upper-roof material staging", amount:"$1,800" },
          { label:"Five skylight curb rebuild + flashing kits", amount:"$2,400" },
          { label:"Permit + BDS inspection", amount:"$520" },
          { label:"Cleanup and disposal", amount:"$580" },
        ],
        total:"$23,420",
        note:"Architectural asphalt replacement on a complex 2001 contemporary. The five skylight curb rebuilds added meaningful cost — original 2001 curbs had aged out before the field shingles. Crane day was unavoidable given driveway access and roof complexity.",
      },
      {
        scenario:"2,800 sq ft 1985 home on Forest Park ridge — cedar shake retrofit-in-kind, wind exposure, hand-split #1 grade",
        lineItems:[
          { label:"Tear-off existing cedar shake", amount:"$3,400" },
          { label:"Synthetic underlayment + ice-and-water at eaves", amount:"$960" },
          { label:"Hand-split cedar shake, #1 grade Western red", amount:"$15,400" },
          { label:"Copper flashing throughout", amount:"$3,800" },
          { label:"Pressure-applied fire retardant treatment (Class A target)", amount:"$2,400" },
          { label:"Six-nail high-wind attachment (Forest Park ridge exposure)", amount:"$420" },
          { label:"Crane day for steep upper-roof access", amount:"$2,200" },
          { label:"Permit + BDS inspection", amount:"$580" },
          { label:"Cleanup and disposal (heavy cedar weight)", amount:"$680" },
        ],
        total:"$29,840",
        note:"Forest Park ridge cedar retrofit. Class A fire-rated treatment was specifically requested — Forest Park orbit is increasingly seen as wildland-urban interface adjacent, and insurance carriers are starting to require Class A roofing for coverage in this corridor. Hand-split #1 grade is the heritage profile that matches the home's 1985 design intent.",
      },
    ],
    permitDetail:{
      fee:"$520–$880 typical West Hills residential, plus structural review for metal panel weight",
      processing:"5–10 business days; longer if structural review or design review triggered",
      specialRequirements:[
        "Hillside positioning (10:12+ pitch) triggers fall-protection inspection on installation",
        "Crane day permits required for limited-access steep-side material staging",
        "Wind-rating documentation (110+ mph) required for ridge-exposed properties",
        "Structural review for metal panel weight on retrofit projects (panel weight differs meaningfully from asphalt)",
        "Forest Park orbit increasingly facing Class A fire rating requirements from insurance carriers",
      ],
    },
    locationFaqs:[
      {
        question:"Why is metal so dominant in West Hills compared to other Portland neighborhoods?",
        answer:"Three reasons that compound. First, lifecycle economics — West Hills homeowner profile runs the math, and metal's 50+ year life eliminates one or two future replacement cycles in a corridor where steep-pitch labour and crane staging make every replacement expensive. Second, wind exposure on ridge properties — concealed-fastener metal systems flex with thermal expansion and don't strip tabs the way asphalt does at 50+ mph gusts. Third, mature canopy and resulting moss pressure compress asphalt life to 18–22 years here vs. 25+ for metal.",
      },
      {
        question:"Do I really need crane day for my West Hills project?",
        answer:"Almost always yes for hillside lots above 10:12 pitch with limited driveway access to the upper roof. Crane day adds $1,400–$3,500 to a project but is meaningfully cheaper than the alternative — manually carrying 24-gauge metal panels or cedar shake bundles up steep slopes adds 2–4 days of labour and creates fall risk that triggers OSHA compliance issues. A reputable West Hills contractor will assess access during pre-bid and quote crane requirement explicitly.",
      },
      {
        question:"What's the right wind rating for my Council Crest home?",
        answer:"110+ mph at minimum, with concealed-fastener metal systems strongly preferred. Council Crest sees sustained 30–50 mph wind events multiple times per year, and the Oregon code minimum of 90 mph is inadequate for ridge exposure. The 110 mph upgrade plus six-nail attachment costs $400–$900 at install. Standing seam metal with concealed fasteners flexes with thermal expansion and shrugs off events that strip tabs from asphalt; exposed-fastener metal products are generally not recommended for ridge exposure.",
      },
      {
        question:"Are snow guards really required on my West Hills metal roof?",
        answer:"Effectively yes. Standing seam metal sheds snow aggressively, and West Hills accumulates more snow load than the flat Portland metro during winter events. Snow guards above entries, walkways, and adjacent driveways prevent slide events that can cause serious property damage or injury. BDS inspectors flag the absence on metal roofs above pedestrian zones. Cost runs $1,800–$4,200 depending on roof geometry and how much linear coverage is needed. Pad-style guards are most common; rail systems for shallower pitches.",
      },
      {
        question:"Should I budget for Class A fire rating on my Forest Park ridge property?",
        answer:"Increasingly yes. Forest Park orbit is being re-evaluated as wildland-urban interface adjacent, and insurance carriers in this corridor are starting to require Class A roofing assemblies for coverage independently of city code. Standing seam metal is Class A as standard. Class A architectural asphalt (CertainTeed Landmark Pro Class A, GAF Timberline UHDZ) costs roughly $500–$1,500 over standard architectural. Cedar shake requires pressure-applied fire retardant treatment ($1,500–$2,800) to achieve Class B; Class A on cedar is harder to achieve.",
      },
    ],
    serviceAreas:[
      "Council Crest",
      "Forest Park",
      "Sylvan-Highlands",
      "Multnomah Village",
      "Hayhurst",
      "Hillsdale",
      "Bridlemile",
      "Healy Heights",
      "Patton corridor",
    ],
    serviceContext:{
      'metal-roofing':"Standing seam metal is the dominant West Hills replacement spec — roughly 55% of replacements specify metal vs. 15% Portland-wide. The premium pays back faster here than anywhere else in Portland because lifecycle economics, wind exposure, and moss elimination all favor metal in this corridor. Plan on $25,000–$38,000 for a typical West Hills metal replacement inclusive of crane day, snow guards, and wind-rated install.",
      'cedar-shake-roofing':"Cedar retrofit on West Hills ridge properties (Forest Park orbit, Council Crest) is increasingly tied to Class A fire rating requirements that insurance carriers are imposing in this corridor. Plan for hand-split Western red cedar plus copper flashing plus pressure-applied fire retardant treatment — roughly $24,000–$32,000 on a typical 2,500–3,200 sq ft home with crane staging.",
    },
  },

  // ── Premium Suburb: Lake Oswego ────────────────────────────────────────────
  {
    slug:'lake-oswego', name:'Lake Oswego', zip:'97034', area:'Clackamas Co.',
    avgCost:14500, range:'$10k–$22k', badge:'premium', commonMaterial:'Cedar Shake',
    indexPct:90,
    description:"Portland's premier suburban luxury market — luxury homes around the lake, strict HOAs across most subdivisions, mature canopy and complex hillside builds, and a heritage of cedar shake on the older Country Club / Lake Forest stock. Average replacement cost runs $14,500, with premium projects on cedar restoration and high-pitch hillside homes routinely crossing $25,000.",
    highlights:[
      "Luxury market — average build $850K+, premium roofing materials standard",
      "Active HOA design review across most subdivisions — material/color approval required",
      "Cedar shake heritage in Country Club, Lake Forest, and First Addition neighborhoods",
    ],
    permitScore:5,
    permitNotes:"Lake Oswego permits + design review can extend to 4–8 weeks for cedar restoration or non-standard materials. Strict HOA overlays apply citywide.",
    localCostTruth:[
      "Lake Oswego roofing economics are unlike any other Portland-area suburb. Average cost runs $14,500 — roughly 35% above the Portland metro average — driven by three structural factors: housing complexity (steep-pitch hillside homes around the lake demand specialized labour and crane staging), material premium (cedar shake retrofit-in-kind, premium designer asphalt, and standing seam metal dominate the spec mix vs. base architectural elsewhere), and design review overhead (HOA approval is required citywide and adds 2–6 weeks to project timeline before permit issues).",
      "Cedar shake retrofit-in-kind is the signature Lake Oswego replacement project and runs $20,000–$35,000 on a typical Country Club or Lake Forest home. Cedar is mandated by HOA in many of the older subdivisions, performs well in Lake Oswego's relatively benign moisture climate (shaded but not coastal-wet), and is integral to the architectural character of the city. The retrofit involves pressure-applied fire retardant treatment, premium cedar (Western red cedar #1 grade Resawn or hand-split), copper flashing throughout, and ridge ventilation upgrades.",
      "Hillside homes around the lake and on the Mountain Park and Forest Highlands ridges introduce significant labour and access premiums. Pitches of 10:12 to 14:12 are common, requiring harness systems, slower crew pace, and frequently crane staging for material delivery to the steep-side eaves. The labour premium runs 25–40% over flat-lot equivalent. Material consumption is also higher — steeper pitches use more underlayment, more flashing, and more ridge cap per square foot of footprint.",
      "Lake Oswego's permit and design-review process is the most rigorous in the Portland suburbs. Standard re-roof permits run $400–$580 in fees but the binding constraint is design review — material, color, and profile must be approved by either the HOA architectural committee or the city's design review board before the city will issue the building permit. Cedar shake retrofit-in-kind typically clears in 2–3 weeks; standing seam metal in non-traditional colors can take 6–8 weeks; designer asphalt in standard colors clears fastest at 1–2 weeks.",
    ],
    costDrivers:[
      {
        factor:"Cedar shake retrofit-in-kind",
        impact:"+$8,000 to $20,000 over architectural",
        detail:"Country Club, Lake Forest, First Addition HOAs frequently mandate cedar in kind. Premium Western red cedar #1 grade plus copper flashing plus fire retardant treatment.",
      },
      {
        factor:"Hillside / steep-pitch labour",
        impact:"+25% to 40% on labour",
        detail:"10:12+ pitches around the lake, Mountain Park, Forest Highlands. Harness systems, slower pace, frequently crane staging required.",
      },
      {
        factor:"HOA design review timeline",
        impact:"+2 to 8 weeks before permit",
        detail:"Material, color, and profile approval required citywide. Cedar retrofit clears fastest; non-standard metal colors slowest.",
      },
      {
        factor:"Premium designer shingle / standing seam premium",
        impact:"+$3,000 to $10,000",
        detail:"Base architectural is rare in Lake Oswego — designer asphalt (CertainTeed Presidential Shake, GAF Glenwood) and standing seam are the spec norms.",
      },
      {
        factor:"Copper flashing and accessories",
        impact:"+$1,500 to $4,000",
        detail:"Cedar and premium shake projects spec copper flashing throughout (valleys, step, counter, drip edge) for longevity and aesthetic match. Adds meaningfully over standard galvanized.",
      },
      {
        factor:"Crane staging on lake-edge hillsides",
        impact:"+$1,000 to $2,500",
        detail:"Lake-edge homes with limited driveway access frequently require crane day for material delivery to upper roof areas.",
      },
    ],
    workedExamples:[
      {
        scenario:"2,400 sq ft 1965 home in First Addition — designer asphalt replacement (HOA-approved upgrade from cedar), sound deck",
        lineItems:[
          { label:"Tear-off existing cedar shake (significant disposal weight)", amount:"$3,200" },
          { label:"Synthetic high-temp underlayment", amount:"$880" },
          { label:"Designer architectural, GAF Timberline UHDZ", amount:"$8,400" },
          { label:"Specialty hip, ridge, valley trim", amount:"$1,200" },
          { label:"Copper valley flashing", amount:"$1,400" },
          { label:"Pipe boots and chimney flashing rebuild", amount:"$680" },
          { label:"HOA design review submittal and approval", amount:"$420" },
          { label:"Permit + Lake Oswego inspection", amount:"$520" },
          { label:"Cleanup and disposal", amount:"$580" },
        ],
        total:"$17,280",
        note:"Cedar-to-architectural conversion roughly $4,000 cheaper than cedar retrofit-in-kind and about $7,000 cheaper than standing seam metal. HOA approval to leave cedar required in this case — many First Addition HOAs are flexible if the replacement looks intentional.",
      },
      {
        scenario:"3,200 sq ft 1975 hillside home above the lake — cedar shake retrofit in kind, hand-split, copper flashing",
        lineItems:[
          { label:"Tear-off existing cedar shake", amount:"$4,200" },
          { label:"Synthetic underlayment + ice-and-water at eaves", amount:"$1,100" },
          { label:"Hand-split cedar shake, #1 grade Western red", amount:"$18,400" },
          { label:"Copper flashing throughout (valleys, step, counter, drip edge)", amount:"$3,200" },
          { label:"Pressure-applied fire retardant treatment", amount:"$1,800" },
          { label:"Ridge ventilation rebuild", amount:"$880" },
          { label:"Crane day for upper-roof material staging", amount:"$1,400" },
          { label:"HOA design review + Lake Oswego permit", amount:"$680" },
          { label:"Cleanup and disposal", amount:"$680" },
        ],
        total:"$32,340",
        note:"Premium cedar retrofit project. Hand-split #1 grade is the upper tier — Resawn at $14,000–$15,000 would have come in roughly $4,000 cheaper. Copper flashing is non-negotiable for cedar at this tier; galvanized would void HOA approval.",
      },
      {
        scenario:"2,800 sq ft 2000 home in Mountain Park — standing seam metal upgrade, complex roofline, snow guard",
        lineItems:[
          { label:"Tear-off original architectural", amount:"$2,400" },
          { label:"Synthetic high-temp underlayment", amount:"$960" },
          { label:"24-gauge standing seam panels (matte black)", amount:"$15,400" },
          { label:"Specialty trim at multiple gables, hips, valleys", amount:"$2,400" },
          { label:"Snow guard system above entry and walkway", amount:"$1,400" },
          { label:"HOA design review (matte black non-standard color)", amount:"$420" },
          { label:"Permit + Lake Oswego inspection", amount:"$520" },
          { label:"Cleanup and disposal", amount:"$520" },
        ],
        total:"$24,020",
        note:"Mountain Park HOA design review for matte black metal added 6 weeks to project timeline (review board pushed back twice). Final approval came with stipulation that the home's south-facing slope have snow guards visible from the street. Build review timeline into project planning explicitly.",
      },
    ],
    permitDetail:{
      fee:"$400–$580 typical Lake Oswego residential, plus design review fees",
      processing:"Standard 5–10 business days; HOA + design review can extend to 4–8 weeks total",
      specialRequirements:[
        "HOA design review required citywide — material, color, and profile approval before permit",
        "Cedar retrofit-in-kind frequently mandated in older subdivisions (Country Club, Lake Forest, First Addition)",
        "Copper flashing required on cedar projects in most HOAs; galvanized voids approval",
        "Snow guard placement on metal roofs frequently dictated by design review board",
        "Hillside homes (10:12+ pitch) trigger fall-protection inspection and may require crane permit",
      ],
    },
    locationFaqs:[
      {
        question:"Why is Lake Oswego so much more expensive than the Portland metro average?",
        answer:"Three structural factors. First, housing complexity — steep-pitch hillside homes around the lake demand specialized labour and frequently crane staging, adding 25–40% to labour cost. Second, material premium — base architectural asphalt is rare here; the spec norms are designer asphalt, cedar shake retrofit-in-kind, or standing seam metal. Third, design review overhead — HOA approval citywide adds 2–6 weeks before permit issues, and cedar/copper requirements in many subdivisions are non-negotiable.",
      },
      {
        question:"Can I replace my Country Club cedar shake with architectural asphalt?",
        answer:"Sometimes, but you'll need explicit HOA approval first, and many Country Club / Lake Forest sub-associations don't grant it. Cedar shake is integral to the architectural character of these neighborhoods, and HOAs frequently require retrofit-in-kind or designer asphalt that mimics the cedar profile. Submit your proposed alternative with formal documentation; expect 4–6 weeks of review. If denied, your real options are cedar retrofit-in-kind ($20,000–$35,000) or designer shake-profile asphalt like CertainTeed Presidential Shake ($14,000–$18,000).",
      },
      {
        question:"What's the lifecycle cost difference between cedar retrofit and standing seam metal?",
        answer:"Cedar: $25,000–$35,000 install plus $300–$600 annual cleaning and biannual moss treatment plus fire retardant renewal every 7 years ($2,000+). Real-world life of 25–35 years with maintenance, less without. Standing seam metal: $20,000–$28,000 install with effectively zero maintenance for 50+ years. Over 50 years, metal wins decisively on lifecycle cost. The case for cedar is architectural character, HOA mandate, and aesthetic match to the home — not lifecycle economics.",
      },
      {
        question:"How long does Lake Oswego's design review actually take?",
        answer:"Highly variable by material and color. Cedar retrofit-in-kind typically clears in 2–3 weeks. Designer asphalt in standard colors approved in subdivision palette: 1–2 weeks. Standing seam metal in standard charcoal/slate: 3–4 weeks. Standing seam metal in non-standard colors (matte black, weathered copper): 6–8 weeks with frequent revisions. Build the review timeline into project planning explicitly — starting work without final approval is the fastest way to draw a stop-work order from the city.",
      },
      {
        question:"Are copper flashings really required on cedar projects?",
        answer:"Required by HOA in most Country Club / Lake Forest / First Addition sub-associations, even where not explicitly required by code. Copper is the architectural match to cedar's heritage character and outlasts galvanized by 30+ years. Cost premium is $1,500–$4,000 for full copper flashing (valleys, step, counter, drip edge) over galvanized equivalent. Most contractors who specialize in Lake Oswego cedar work include copper as standard rather than treating it as an upgrade.",
      },
      {
        question:"Do I need crane day for my Mountain Park or Forest Highlands hillside home?",
        answer:"Often yes for hillside lots above 10:12 pitch where the upper roof areas can't be accessed from the driveway. Crane staging adds $1,000–$2,500 to a project but is meaningfully cheaper than the alternative — manually carrying cedar shake bundles or 24-gauge metal panels up steep slopes adds days of labour and creates fall risk. A reputable Lake Oswego contractor will assess access during pre-bid and quote crane requirement explicitly.",
      },
    ],
    serviceAreas:[
      "Lake Grove",
      "First Addition",
      "Westlake",
      "Mountain Park",
      "Marylhurst",
      "Palisades",
      "Forest Highlands",
      "Skylands",
      "Country Club",
      "Lake Forest",
      "West Linn",
      "Oregon City",
      "Stafford",
      "Bolton",
    ],
    serviceContext:{
      'cedar-shake-roofing':"Cedar retrofit is the dominant Lake Oswego project type and runs $22,000–$32,000 with hand-split Western red cedar, copper flashing, and pressure-applied fire retardant treatment. HOAs in Country Club, Lake Forest, and First Addition mandate cedar in kind on most properties. Plan for HOA design review (2–3 weeks) plus city permit before any installation can begin.",
    },
  },

  // ── West Metro Suburb: Beaverton ───────────────────────────────────────────
  {
    slug:'beaverton', name:'Beaverton', zip:'97005', area:'Washington Co.',
    avgCost:11400, range:'$8.5k–$17k', commonMaterial:'Architectural Asphalt',
    indexPct:78,
    description:"Inner west metro corridor — 1950s Cedar Hills ranches, 1970s split-levels around Garden Home, the Nike-area premium homes, and 1990s–2000s growth in West Slope and Bethany. Highest contractor density in the Portland orbit, plus absorbed Hillsboro / Tigard / Tualatin / Sherwood / Wilsonville catchment.",
    highlights:[
      "Inner west metro corridor — 50,000+ owner-occupied homes within 7 miles of Nike HQ",
      "Highest contractor density in the Portland orbit — competitive bidding",
      "Mix of 1950s ranches, 1970s splits, and 1990s+ premium builds creates broad pricing range",
    ],
    permitScore:4,
    permitNotes:"Washington County permits run 5–8 business days. Inspections thorough; Cedar Hills and inner ranch stock often require ventilation upgrades.",
    localCostTruth:[
      "Beaverton's $11,400 average reflects a market with three distinct tiers of housing stock that re-roof at meaningfully different price points. The 1955–1970 Cedar Hills, Garden Home, and inner ranch stock re-roofs at $8,500–$11,000 with architectural asphalt — single-story, modest pitch, but frequently with deck and ventilation issues from age. The 1985–2005 mid-tier builds in Murrayhill, West Slope, and the Sunset corridor re-roof at $11,000–$14,000 — sound construction, complex rooflines, modern ventilation. The premium Bethany overlap, upper West Slope, and Nike-area homes re-roof at $14,000–$22,000 with premium asphalt or metal.",
      "Cedar Mill and inner Cedar Hills are the cost-driver story for the older Beaverton stock. The 1950s–1960s ranches in this corridor were built with 1×6 plank decking that has aged inconsistently — some sound, some decayed beyond surface inspection. Per-sheet decking replacement averages $90–$130 installed, and homeowners commonly see 4–10 sheets needed after tear-off. Pre-bid contracts should specify the per-sheet rate so the worst case is known before signing.",
      "The Highway 26 corridor concentrates contractor density. Beaverton has roughly 30 active CCB-licensed residential roofing contractors competing for the same market vs. roughly 12 in any single Portland Inner SE neighborhood — a 2.5x density. Practical impact: bid spreads on identical scope are tighter, three-bid comparisons are reliable, and emergency leak service is typically same-day during peak rain season. The trade-off is that fly-by-night operators are more numerous in a dense market — CCB verification matters more here than in markets with fewer total contractors.",
      "Washington County permit process is rigorous. Pre-1990 Beaverton homes face active ventilation review at final inspection, and the older Cedar Hills/Garden Home ranch stock frequently requires upgrades. The build-wave Murrayhill and West Slope homes uniformly meet the 1:300 standard and rarely see issues. Permit fees run $280–$420 — modestly higher than Multnomah County. Beaverton serves as the regional anchor for the absorbed catchment of Hillsboro, Tigard, Tualatin, Sherwood, and Wilsonville — same crews work all five.",
    ],
    costDrivers:[
      {
        factor:"Plank decking deterioration on 1950s–1960s ranches",
        impact:"+$400 to $1,300",
        detail:"Cedar Hills, inner Cedar Mill, and Garden Home ranches frequently need 4–10 sheets of replacement decking after tear-off. Per-sheet rate must be specified in writing.",
      },
      {
        factor:"Ventilation upgrade on pre-1990 homes",
        impact:"+$400 to $1,000",
        detail:"Washington County actively enforces 1:300 balanced ratio. Older Beaverton ranches frequently have only gable-end vents inadequate to current standard.",
      },
      {
        factor:"Complex roofline labour premium on 1990s+ builds",
        impact:"+10% to 20% on labour",
        detail:"Murrayhill and West Slope subdivisions feature multiple gables and hip intersections. Material consumption and labour both higher than ranch geometry.",
      },
      {
        factor:"Premium shingle uptake in Bethany / upper West Slope",
        impact:"+$1,500 to $4,000",
        detail:"Higher-tier Beaverton subdivisions see 50-year designer shingle and standing seam metal uptake well above the Oregon average.",
      },
      {
        factor:"HOA design review on Bethany / Murrayhill",
        impact:"+1 to 3 weeks scheduling",
        detail:"Material and color provisions in CC&Rs require submission and approval before permit issuance. Standard products usually clear quickly; metal and unusual colors take longer.",
      },
      {
        factor:"Hillsboro / Tigard / Sherwood / Wilsonville catchment",
        impact:"Same pricing as Beaverton proper",
        detail:"Beaverton crews work the entire west metro. Absorbed suburbs see identical labour rates and material pricing — service area not a quality or cost differentiator.",
      },
    ],
    workedExamples:[
      {
        scenario:"1,650 sq ft 1962 ranch in Cedar Hills — architectural replacement, plank deck repair, ventilation upgrade",
        lineItems:[
          { label:"Tear-off and disposal", amount:"$1,300" },
          { label:"Plank deck spot repair (6 sheets)", amount:"$780" },
          { label:"Synthetic underlayment + ice-and-water at eaves", amount:"$540" },
          { label:"Architectural shingles, Owens Corning Duration", amount:"$4,800" },
          { label:"Ridge vent + 4 new soffit vents", amount:"$780" },
          { label:"Pipe boots, step flashing, drip edge", amount:"$420" },
          { label:"Permit + Washington County inspection", amount:"$320" },
          { label:"Cleanup and disposal", amount:"$340" },
        ],
        total:"$9,280",
        note:"Lower-end Beaverton replacement on the older ranch stock. Plank deck repair and ventilation upgrade are typical for this vintage — together they add roughly $1,500 over a build-wave equivalent.",
      },
      {
        scenario:"2,500 sq ft 1998 home in Murrayhill — premium architectural, complex roofline, sound deck",
        lineItems:[
          { label:"Tear-off and disposal", amount:"$2,200" },
          { label:"Synthetic underlayment + ice-and-water at valleys", amount:"$680" },
          { label:"Premium architectural, GAF Timberline UHDZ", amount:"$7,200" },
          { label:"Specialty trim at multiple gables and hips", amount:"$1,200" },
          { label:"Ridge cap + ridge vent", amount:"$580" },
          { label:"Pipe boots and skylight curb reseal", amount:"$540" },
          { label:"HOA submittal preparation", amount:"$180" },
          { label:"Permit + Washington County inspection", amount:"$340" },
          { label:"Cleanup and disposal", amount:"$420" },
        ],
        total:"$13,340",
        note:"Mid-tier build-wave home with premium shingle upgrade. The 50-year UHDZ is a $1,500 premium over base architectural and is well-justified for a long-term hold.",
      },
      {
        scenario:"3,200 sq ft 2005 home in upper West Slope — standing seam metal, complex roofline, full snow guard, premium HOA",
        lineItems:[
          { label:"Tear-off original architectural", amount:"$3,000" },
          { label:"Synthetic high-temp underlayment", amount:"$1,100" },
          { label:"24-gauge standing seam panels (charcoal)", amount:"$17,200" },
          { label:"Specialty ridge, hip, valley, gable trim", amount:"$2,800" },
          { label:"Snow guard system above entry and walkway", amount:"$1,400" },
          { label:"HOA design review submittal and approval", amount:"$280" },
          { label:"Permit + Washington County inspection", amount:"$420" },
          { label:"Cleanup and disposal", amount:"$520" },
        ],
        total:"$26,720",
        note:"Premium upper-end Beaverton replacement. The metal premium of roughly $14,000 over premium architectural reflects 50+ year roof life vs. 30 — buyers in this tier are running lifecycle economics, not upfront cost comparisons.",
      },
    ],
    permitDetail:{
      fee:"$280–$420 typical Washington County residential",
      processing:"5–8 business days; HOA design review can add 1–3 weeks before permit",
      specialRequirements:[
        "1:300 balanced ventilation actively enforced on pre-1990 homes",
        "Cedar Hills and Garden Home plank deck stock often requires per-sheet repair budget",
        "HOA design review required in Bethany overlap, Murrayhill premium sections, upper West Slope",
        "Hillsboro, Tigard, Sherwood, Wilsonville absorbed catchment — same Washington County permit process applies",
      ],
    },
    locationFaqs:[
      {
        question:"Why does Beaverton have more contractors than other Portland suburbs?",
        answer:"The Highway 26 corridor concentrates the inner west metro and Silicon Forest demand into a relatively compact area. Beaverton's roughly 30 active CCB-licensed residential roofers compete for jobs across Beaverton, Hillsboro, Tigard, Tualatin, Sherwood, and Wilsonville — but most are based in or near Beaverton itself. The density means three-bid comparisons are reliable on standard scope. The trade-off is that fly-by-night operators are more numerous in a dense market — CCB licensing verification matters more here.",
      },
      {
        question:"Should I expect deck repair on my Cedar Hills ranch?",
        answer:"Probably yes. The 1950s–1960s ranches in Cedar Hills and inner Cedar Mill were built with 1×6 plank decking that has aged inconsistently. Per-sheet decking replacement averages $90–$130 installed, and 4–10 sheets after tear-off is common. Get the per-sheet rate in writing in your contract before signing — quotes that don't include it are setting you up for change orders.",
      },
      {
        question:"Is HOA approval required for my Murrayhill or Bethany re-roof?",
        answer:"Usually yes for Murrayhill and Bethany overlap, plus most premium West Slope subdivisions. CC&Rs include material and color provisions that require formal submittal and approval before Washington County will issue the permit. Standard architectural asphalt in current popular colors typically clears review in 1–2 weeks; metal roofing and unusual color choices commonly take 3–4 weeks. Build the timeline into your project planning.",
      },
      {
        question:"Do you serve Hillsboro / Tigard / Tualatin / Sherwood / Wilsonville from Beaverton?",
        answer:"Yes — all five suburbs are part of the absorbed Beaverton catchment. Same crews, same Washington County permit process (or Clackamas for Wilsonville), same labour rates and material pricing. Hillsboro Silicon Forest builds, Tigard Bull Mountain homes, Tualatin family subdivisions, Sherwood new construction, and Wilsonville Charbonneau projects are all routine work for the established Beaverton-based contractor pool.",
      },
      {
        question:"Is metal worth the premium on a 2,500 sq ft Beaverton subdivision home?",
        answer:"For homeowners staying 15+ years, yes. The $5,000–$9,000 metal premium over premium architectural pays back through avoided maintenance and one-and-a-half avoided replacement cycles over a 50-year hold. For homeowners selling within 7 years, metal recovers maybe 40–60% of its premium in resale value — premium architectural is the more rational call. Solar plans tip the math toward metal regardless of hold time, since clamp mounting on standing seam eliminates the rail-and-bracket penetrations required for asphalt.",
      },
    ],
    serviceAreas:[
      "Cedar Mill",
      "Cedar Hills",
      "Garden Home-Whitford",
      "Raleigh Hills",
      "West Slope",
      "Bethany",
      "Murrayhill",
      "Sunset corridor",
      "Hillsboro",
      "Tigard",
      "Tualatin",
      "Sherwood",
      "Wilsonville",
      "King City",
      "Durham",
      "Metzger",
      "Aloha",
      "Cornelius",
      "Forest Grove",
    ],
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

const ADJACENT_AREAS: Record<string, string[]> = {
  'Inner NW':       ['NW Portland', 'Inner NE', 'SW Portland'],
  'NW Portland':    ['Inner NW', 'West Portland', 'N Portland'],
  'SW Portland':    ['Inner NW', 'West Portland', 'Inner SE'],
  'West Portland':  ['SW Portland', 'NW Portland', 'Clackamas Co.'],
  'Inner SE':       ['Inner NE', 'SE Portland', 'SW Portland'],
  'SE Portland':    ['Inner SE', 'Clackamas Co.'],
  'Inner NE':       ['NE Portland', 'Inner SE', 'Inner NW'],
  'NE Portland':    ['Inner NE', 'N Portland'],
  'N Portland':     ['NE Portland', 'Inner NW', 'Washington Co.'],
  'Clackamas Co.':  ['SE Portland', 'West Portland'],
  'Washington Co.': ['NW Portland', 'N Portland', 'SW Portland'],
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
