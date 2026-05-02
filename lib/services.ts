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

export interface ServiceFaq {
  question: string
  answer: string
}

export interface MaterialDeepDive {
  name: string
  priceRange: string
  lifespan: string
  bestFor: string
  pros: string[]
  cons: string[]
  pdxNote: string
}

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
  intro:        string
  whySection:   string
  processSteps: string[]
  materials:    string[]
  warningNote?: string

  /** Bespoke 3-4 paragraph long-form on what actually drives cost/decisions for this service in Portland. */
  costTruth:    string[]
  /** Service-specific cost drivers with quantified impact. */
  costDrivers:  CostDriver[]
  /** Concrete worked examples from typical Portland projects. */
  workedExamples: WorkedExample[]
  /** Extended material analysis with PDX-specific notes. */
  materialDeepDive: MaterialDeepDive[]
  /** Common failure modes and what to ask contractors to avoid them. */
  commonProblems: { problem: string; explanation: string }[]
  /** Service-specific FAQs beyond the basic 3. */
  serviceFaqs:  ServiceFaq[]
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
    costTruth:[
      "Portland roof replacement averages $9,400 for a typical 1,800–2,200 sq ft home using architectural asphalt shingles, but the spread between low and high quotes is wider here than anywhere else in Oregon. A flat ranch in Cully or inner Foster with no complications can come in at $7,000. A steep-pitch Craftsman in Eastmoreland with heritage-tree shading, original cedar deck planks, and a chimney flashing rebuild can cross $20,000. The variable that moves the number most isn't material — it's whether your deck is sound.",
      "The dominant cost driver for Portland's older housing stock is hidden deck damage that only becomes visible after tear-off. Homes built before 1970 frequently have skip-sheathed decks (1×4 boards with gaps) that were code-compliant for cedar shake but require full plywood overlay before architectural shingles can be installed. That overlay adds $2,500–$5,000 to a project and is rarely caught in a pre-bid inspection. The 1980s–1990s housing wave used 1/2-inch CDX plywood that has often delaminated in shaded, moss-covered north-facing slopes — sheet replacement runs $90–$140 per 4×8 panel installed.",
      "Portland's Bureau of Development Services is one of the few Oregon jurisdictions that actively inspects attic ventilation as part of the roofing permit. On pre-1990 homes, the inspector frequently flags ridge-to-soffit ratios that fall short of the 1:300 balanced standard. Bringing ventilation into compliance during a re-roof typically costs $400–$1,200. Homeowners who try to skip this often end up with the inspector failing the permit and requiring rework after final shingle installation — at which point the cost doubles.",
      "The April 2026 GAF/CertainTeed/Atlas/TAMKO 5–8% manufacturer price increases added $400–$900 to a typical Portland project. Contractors who placed material orders before the effective dates can often hold quoted prices through their order window — the first question to ask any Portland contractor is when they plan to purchase materials relative to your project start date. Metal roofing is less affected by the April increases (which apply primarily to asphalt) though steel prices remain elevated from prior tariff cycles.",
    ],
    costDrivers:[
      { factor:"Skip-sheathed deck overlay on pre-1970 stock", impact:"+$2,500 to $5,000", detail:"Almost universal on Hawthorne, Sellwood-Moreland, Alberta Arts, and similar Inner-SE/NE Craftsmans. Per-sheet plywood overlay rate must be specified pre-bid." },
      { factor:"Plywood delamination on shaded north slopes", impact:"+$90 to $140 per sheet", detail:"1980s–1990s CDX decking under heavy moss often shows delamination only after tear-off. Rate must be in writing before signing." },
      { factor:"Attic ventilation upgrade at permit", impact:"+$400 to $1,200", detail:"Portland BDS actively flags pre-1990 homes. 1:300 balanced compliance required before final inspection passes." },
      { factor:"Two-layer tear-off (cedar + asphalt)", impact:"+$1,200 to $2,400", detail:"Significant share of Portland homes had original cedar replaced with 1980s–1990s asphalt. Both layers must come off — disposal weight is meaningful." },
      { factor:"Steep pitch labour premium", impact:"+20% to 35% on labour", detail:"West Hills, Council Crest, Forest Park. 8:12+ pitch requires harness, slower pace, sometimes crane staging." },
      { factor:"Historic district design review", impact:"+3 to 6 weeks before permit", detail:"Ladd's, Irvington, Eastmoreland, listed properties citywide. Material/color binding rather than discretionary." },
      { factor:"Tree canopy moss management add-on", impact:"+$280 to $550 at install", detail:"Zinc ridge strip + AR-granule shingle upgrade. Pays back through deferred treatment cycles in canopied neighborhoods." },
    ],
    workedExamples:[
      {
        scenario:"1,650 sq ft 1912 Craftsman in Hawthorne — architectural replacement, skip-sheathed deck overlay, mature canopy",
        lineItems:[
          { label:"Tear-off (1990s asphalt over original cedar)", amount:"$2,200" },
          { label:"Plywood overlay over skip-sheathed deck (24 sheets)", amount:"$2,640" },
          { label:"Ice-and-water shield + synthetic underlayment", amount:"$1,120" },
          { label:"GAF Timberline HDZ AR (algae-resistant)", amount:"$5,400" },
          { label:"Ridge vent + soffit baffle upgrade", amount:"$720" },
          { label:"Step + counter flashing rebuild at chimney", amount:"$580" },
          { label:"Zinc ridge strip moss prevention", amount:"$280" },
          { label:"BDS permit + final inspection", amount:"$320" },
          { label:"Cleanup, disposal, magnetic sweep", amount:"$380" },
        ],
        total:"$13,640",
        note:"Standard Inner-SE Craftsman replacement. Two-layer tear-off and full deck overlay are the norm for 1900–1925 stock. Adding zinc ridge strip at install ($280) buys 3–5 years of additional roof life through deferred moss colonization — cleanest cost-effective add available.",
      },
      {
        scenario:"2,400 sq ft 1995 home in Murrayhill — premium architectural replacement, sound deck, complex roofline",
        lineItems:[
          { label:"Tear-off original architectural", amount:"$2,200" },
          { label:"Synthetic underlayment + ice-and-water at valleys", amount:"$760" },
          { label:"GAF Timberline UHDZ premium (50-year)", amount:"$7,200" },
          { label:"Specialty trim at multi-gable hip intersections", amount:"$1,200" },
          { label:"Ridge cap + ridge vent (existing soffit acceptable)", amount:"$580" },
          { label:"Pipe boots + skylight curb reseal", amount:"$540" },
          { label:"HOA design review submittal", amount:"$180" },
          { label:"Permit + Washington County inspection", amount:"$340" },
          { label:"Cleanup and disposal", amount:"$420" },
        ],
        total:"$13,420",
        note:"Build-wave subdivision replacement in Beaverton catchment. Sound deck and modern ventilation kept the project lean; complex roofline drives most of the labour premium. UHDZ premium of $1,500 over base architectural is well-justified for 130 mph wind rating and 50-year warranty on a home positioned for long hold.",
      },
      {
        scenario:"3,200 sq ft 1985 hillside home in West Hills — standing seam metal upgrade, crane staging, snow guard",
        lineItems:[
          { label:"Tear-off existing architectural asphalt", amount:"$3,200" },
          { label:"Synthetic high-temp underlayment", amount:"$1,200" },
          { label:"24-gauge standing seam panels (matte black)", amount:"$17,200" },
          { label:"Specialty trim at multi-gable, hip, valley", amount:"$3,200" },
          { label:"Snow guard system across south + west slopes", amount:"$2,400" },
          { label:"Crane day for upper-roof material staging", amount:"$2,400" },
          { label:"Six-nail high-wind attachment (110 mph spec)", amount:"$420" },
          { label:"Permit + BDS structural review (panel weight)", amount:"$680" },
          { label:"Cleanup and disposal", amount:"$680" },
        ],
        total:"$31,380",
        note:"Premium West Hills metal upgrade. Crane day, snow guards, and steep-pitch labour together added roughly $7,500 over a flat-lot equivalent. Metal premium of roughly $14,000 over premium asphalt buys 50+ year roof life vs. 30 — buyers in this tier are running lifecycle economics, not upfront cost comparisons.",
      },
    ],
    materialDeepDive:[
      {
        name:"Architectural Asphalt Shingles (30-year)",
        priceRange:"$350-$500 per sq",
        lifespan:"22-28 years (PDX climate)",
        bestFor:"Standard residential replacement on owner-occupied homes with 10-15 year hold",
        pros:["Most affordable full replacement option","Wide colour and profile selection","25-50 year manufacturer warranties","Easiest to repair if isolated damage occurs","Compatible with most existing roof structures"],
        cons:["Real-world life 4-8 years shorter than warranty in canopied PDX neighborhoods","Moss requires biennial treatment in shaded areas","Granule loss accelerates on south-facing slopes","Replacement cycle hits sooner than metal alternatives"],
        pdxNote:"Manufacturer warranties assume average national conditions. Portland's sustained moisture and tree canopy compress real-world architectural asphalt life to 22-28 years vs. the 25-30 advertised. AR-granule premium ($300-$600 over base) and zinc ridge strip ($150-$400) extend life meaningfully in canopied neighborhoods.",
      },
      {
        name:"Premium Architectural / Designer (50-year)",
        priceRange:"$500-$700 per sq",
        lifespan:"28-35 years (PDX climate)",
        bestFor:"Long hold (15+ years), visible-from-street roofs, premium neighborhoods",
        pros:["130 mph wind rating standard","Enhanced UV stabilization","Designer profiles (slate-look, shake-look)","50-year manufacturer warranty","Premium AR granule technology"],
        cons:["$1,200-$2,500 premium over base architectural","Aesthetic premium not always recovered in resale","Still asphalt — same maintenance cycle as base"],
        pdxNote:"Premium architectural (CertainTeed Landmark Pro, GAF Timberline UHDZ, Malarkey Vista) makes the most sense for homeowners staying 15+ years. The wind rating upgrade is meaningful in East Wind corridor areas (Gresham, eastern Hawthorne, Alameda Ridge). On non-visible roofs and short holds, base architectural is the more rational call.",
      },
      {
        name:"Standing Seam Metal",
        priceRange:"$700-$1,200 per sq",
        lifespan:"45-65 years (PDX climate)",
        bestFor:"Long hold (15+ years), heavy canopy, wind exposure, future solar plans",
        pros:["Eliminates moss-treatment maintenance cycle","Concealed-fastener systems flex with thermal expansion","Solar panel clamp mounting (no roof penetrations)","Class A fire rating standard","50+ year real-world performance in PDX climate"],
        cons:["$5,000-$15,000 premium over premium architectural","Smaller specialist contractor pool","Snow guards required above pedestrian zones","Color and profile choices more constrained","Oil-canning risk if improperly handled at install"],
        pdxNote:"PDX is metal's strongest case anywhere in the US. The combination of 144 rain days, dense tree canopy creating moss pressure, and steep-pitch hillside neighborhoods favors concealed-fastener standing seam over every other option. West Hills metal uptake runs 55%+ of replacements vs. 15% PDX-wide.",
      },
      {
        name:"Cedar Shake (#1 Grade Western Red)",
        priceRange:"$600-$1,400 per sq",
        lifespan:"22-30 years with maintenance, 12-18 years without",
        bestFor:"Historic districts where required (Eastmoreland, Lake Oswego HOAs, listed properties)",
        pros:["Heritage character match for 1900-1940 homes","Required by design review in many districts","Good thermal insulation","Visually distinctive","Pressure-treated options achieve Class B fire rating"],
        cons:["Demanding maintenance: cleaning, treatment, replacement","Without biennial moss treatment, life cuts in half","Pressure-applied fire retardant adds $1,200-$2,200","Copper flashing essentially required ($1,500-$4,000)","Smaller specialist installer pool"],
        pdxNote:"Cedar in Portland's wet climate without maintenance fails at 12-18 years vs. the 30-40 advertised. The case for cedar is entirely architectural — historic district mandate or aesthetic match. For lifecycle economics, it's the worst choice. For heritage character on the right home, it's the only choice.",
      },
      {
        name:"TPO / Flat Roof Membrane",
        priceRange:"$400-$700 per sq",
        lifespan:"20-25 years (60-mil quality install)",
        bestFor:"Pearl District condos, mid-century flat additions, modern builds, garage/porch covers",
        pros:["Heat-welded seams handle PDX rain volume","Bright white reflective option for energy","20-year manufacturer warranties on certified installations","Walkable for HVAC servicing","Effective on slopes from 1/4-inch to 2:12"],
        cons:["Drainage design must be flawless — ponding water kills any membrane","Specialist installer pool smaller than pitched-roof market","Seam quality is everything — 60-mil heat-welded vs. 45-mil adhesive matters","Punctures from foot traffic and falling debris","Mechanical attachment vs. fully-adhered choice complex"],
        pdxNote:"TPO is the dominant Pearl District residential roofing material and increasingly common on modern Portland builds. The 60-mil with heat-welded seams is the practical PDX standard — 45-mil installations from the 1990s–2010s are now reaching end of life and driving the active flat-roof replacement market.",
      },
    ],
    commonProblems:[
      { problem:"Pre-bid quote excludes deck overlay/repair", explanation:"On any pre-1970 Portland home, deck condition is unknown until tear-off. Quotes that don't include a per-sheet replacement rate or deck overlay line item are setting up a change order. Get the rate in writing before signing." },
      { problem:"Contractor suggests skipping permit", explanation:"Unpermitted Portland roofing work creates problems at resale (disclosure required), can void homeowner's insurance for related claims, and may trigger stop-work orders if discovered. Permit fees ($280-$420) are a small fraction of total cost — the suggestion to skip is a red flag." },
      { problem:"Ventilation upgrade not addressed", explanation:"Portland BDS actively reviews attic ventilation on pre-1990 homes. Inadequate ridge-to-soffit ratios fail final inspection, requiring rework. Ventilation upgrade at install costs $400-$1,200; addressing it after install costs $1,500+. Verify pre-bid that ventilation review is part of scope." },
      { problem:"Re-roofing over existing layer", explanation:"Portland generally does not permit re-roofing over an existing layer. Full tear-off is required. Contractors who propose layering are either uninformed or skipping permit — both reasons to walk away." },
      { problem:"Material wind rating mismatch", explanation:"East Wind corridor (Gresham, eastern Hawthorne, Alameda Ridge) regularly sees 50+ mph gust events. Standard 90 mph rated shingles strip tabs in those conditions. The 110 mph upgrade plus six-nail attachment costs $200-$500 at install — meaningful insurance against future wind-damage claims." },
      { problem:"Historic district approval skipped", explanation:"Properties in Ladd's Addition, Irvington, Eastmoreland, or on Portland's Historic Resource Inventory require Type II Historic Resource Review before BDS will issue a roofing permit. Starting work without approval triggers a stop-work order and material redo at owner expense." },
    ],
    serviceFaqs:[
      { question:"How do I know if my Portland home needs full replacement vs. repair?", answer:"Three-tab asphalt shingles last 15–20 years in Portland's climate; architectural shingles 22–28 years (less in canopied neighborhoods). Any roof past 18 years should be assessed; past 22 years, replacement is almost always the rational call. Repair makes sense for isolated damage on roofs with 8+ years of remaining life. Beyond that, repeated repairs add up to more than replacement and don't address underlying granule/deck/ventilation issues." },
      { question:"How long does a Portland roof replacement actually take?", answer:"Standard residential project: 2–4 days of installation work. The bigger variable is lead time and permit timing. Peak season (April–September) lead times run 4–8 weeks. Permits issue in 5–7 business days for standard zones, 4–6 weeks in historic districts (Ladd's, Irvington, Eastmoreland). Total elapsed time from quote acceptance to final inspection: 6–12 weeks typical, 10–18 weeks in historic districts." },
      { question:"What's the right way to compare three Portland replacement quotes?", answer:"Match the four variables that matter: (1) shingle product line and warranty (not just 'architectural'), (2) deck repair rate per sheet ($90–$140 typical), (3) underlayment scope (ice-and-water at eaves and valleys, synthetic field), and (4) ventilation work included. Quotes that match on these and differ by less than $1,500 are competing on labour efficiency alone — pick the most CCB-verified contractor. Quotes differing by $3,000+ are cutting one of those four variables — find out which." },
      { question:"Is the April 2026 manufacturer price increase locked in or can I avoid it?", answer:"GAF, CertainTeed, Atlas, and TAMKO all implemented 5–8% price increases between March 23 and April 15, 2026. Contractors who placed material orders before their effective date can often hold quoted prices through their order window. Ask any Portland contractor when they plan to purchase materials relative to your project start. Metal roofing is largely unaffected by the April increases (they apply primarily to asphalt products)." },
      { question:"Does my Portland HOA need to approve roofing materials?", answer:"Most premium Portland-area HOAs (Bethany, Murrayhill, upper West Slope, Lake Oswego sub-associations) have material and color provisions in their CC&Rs. Standard architectural in current popular colors typically clears review in 1–2 weeks; metal roofing and unusual colors take 3–4 weeks. Cedar mandates apply in many Lake Oswego sub-associations and parts of Eastmoreland. Confirm requirements with your HOA before signing a contract — failure to do so can invalidate it." },
      { question:"Should I add solar-ready conduit during my Portland re-roof?", answer:"If you have any future intent to add solar within 7 years, almost always yes. Conduit installation at install costs $100–$300 vs. $500–$2,000 as a retrofit. A solar-aware roofer can also orient deck attachment points and discuss panel locations during pre-bid for free. HB 4029 (effective June 5 2026) requires Oregon solar contractors to provide written disclosure before any contract — making solar planning a roofing-stage decision rather than a separate trade-coordination challenge later is the cheapest path to solar." },
    ],
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
    costTruth:[
      "Portland roof repair costs span from $350 spot patch jobs to $4,500 comprehensive flashing rebuilds, and the price spread reflects three variables that aren't obvious from the symptom: the actual cause vs. visible damage, the age and condition of surrounding materials, and how long water has been migrating before discovery. The cheapest repair is the one done within 30 days of the original event; the most expensive is the same scope after six months of continued water ingress.",
      "The most common Portland repair scope — chimney step and counter flashing rebuild — runs $400–$900 in straightforward cases and $1,500–$3,500 when years of slow leak have damaged the surrounding shingles, underlayment, and deck. The visible fail is the flashing; the actual cost driver is what's underneath. Contractors who quote without lifting adjacent shingles to assess the underlayment are guessing — the cheap quote becomes a change order quote within a week of work starting.",
      "Emergency repair (active leak, post-storm) carries a 30–60% premium over scheduled repair work. Same-day tarp deployment runs $200–$500; same-week emergency repair scope runs 1.3–1.6x the equivalent scheduled job. The premium reflects compressed scheduling, after-hours dispatch, and emergency materials handling. If you can defer 5–10 days for a scheduled slot, the savings are real — but if you have active interior water damage, the premium is worth it because secondary damage from continued ingress is far more expensive than the emergency rate.",
      "Repair-vs-replace becomes a real question on roofs past 18 years old in Portland's climate. A $1,800 valley repair on a 22-year architectural roof buys maybe 18 months before the next failure on a different section. The same $1,800 toward a full replacement that's coming within 3 years anyway is essentially money lost. Honest Portland contractors will recommend full replacement on any roof past 20 years where multiple repair locations exist. Beware of contractors aggressive on repeated repairs on aging roofs — that's revenue extraction, not problem solving.",
    ],
    costDrivers:[
      { factor:"Emergency vs. scheduled premium", impact:"+30% to 60%", detail:"Same-day or same-week emergency dispatch. Worth paying for active leaks; defer 5-10 days for scheduled slot if interior is dry." },
      { factor:"Hidden underlayment damage", impact:"+$400 to $1,500", detail:"Slow leaks through failed flashing damage underlayment over months. Repair cost compounds as adjacent area expands." },
      { factor:"Deck rot from prolonged ingress", impact:"+$300 to $1,200", detail:"Per-sheet plywood replacement runs $90-$140. Common on 12+ months of unaddressed leaks. Discovered only at repair." },
      { factor:"Chimney flashing rebuild scope", impact:"+$600 to $2,400", detail:"Step + counter flashing rebuild on tall chimneys. Most common Portland repair. Lead/aluminium materials, custom-formed." },
      { factor:"Skylight curb leak repair", impact:"+$400 to $1,400", detail:"Original 1990s-2000s skylight curbs frequently fail before main-field shingles. Counter-flashing rebuild sometimes requires curb replacement." },
      { factor:"Valley flashing replacement", impact:"+$500 to $1,800", detail:"Open valleys with damaged metal or closed valleys with shingle weave failure. Material match critical on partial-roof repairs." },
      { factor:"Color match challenges on aging roofs", impact:"+$100 to $300", detail:"Manufacturers discontinue colors; aged shingles fade. Repair shingles may not match exactly. Acceptable on side/back roofs; visible repairs may justify partial replacement." },
    ],
    workedExamples:[
      {
        scenario:"1,650 sq ft Hawthorne Craftsman — chimney step + counter flashing rebuild after observed slow leak",
        lineItems:[
          { label:"Inspection and damage assessment", amount:"$220" },
          { label:"Lift adjacent shingles, assess underlayment", amount:"$180" },
          { label:"Step flashing replacement (lead, custom-formed)", amount:"$420" },
          { label:"Counter flashing replacement (aluminium)", amount:"$280" },
          { label:"Underlayment patch (4 sq ft, water-damaged)", amount:"$240" },
          { label:"Re-shingle adjacent course (color-matched)", amount:"$340" },
          { label:"Sealant + cleanup", amount:"$160" },
        ],
        total:"$1,840",
        note:"Mid-tier Portland chimney repair. Underlayment patch is the line item that distinguishes this from a $400 surface-only repair — addressing water damage at the source vs. just covering the symptom. Worth the additional $240 every time.",
      },
      {
        scenario:"Eastmoreland 1928 Tudor — emergency post-storm shingle replacement (8 shingles missing after 60 mph wind event)",
        lineItems:[
          { label:"Emergency same-day dispatch + tarp deployment", amount:"$280" },
          { label:"Inspection and color-match sourcing", amount:"$180" },
          { label:"Replacement shingles (matched to existing GAF profile)", amount:"$240" },
          { label:"Re-installation with six-nail high-wind pattern", amount:"$420" },
          { label:"Adjacent shingle re-seal and inspection", amount:"$220" },
          { label:"Cleanup", amount:"$120" },
        ],
        total:"$1,460",
        note:"Emergency post-storm repair. The same-day dispatch premium ($280) is meaningful but justifiable when interior water damage is the alternative. Six-nail re-installation is the right call in any East Wind corridor area where the original four-nail pattern was likely under-attached.",
      },
      {
        scenario:"Pearl District townhouse — partial TPO seam reweld over loft kitchen (3 seam locations)",
        lineItems:[
          { label:"Inspection and seam-failure mapping", amount:"$320" },
          { label:"Seam reweld at 3 locations (heat-weld)", amount:"$1,400" },
          { label:"Patch repair around skylight curb", amount:"$580" },
          { label:"Drain strainer replacement (2)", amount:"$320" },
          { label:"Localized parapet sealant rebuild", amount:"$520" },
          { label:"Cleanup", amount:"$220" },
        ],
        total:"$3,360",
        note:"Pearl District flat-roof repair. Just under the 25% area threshold that would trigger a full permit. The seam reweld over the loft kitchen was urgent — moisture had been migrating through the original 1990s seam for at least 18 months. Annual September inspection would have caught this two years earlier at probably $1,200 in scope.",
      },
    ],
    materialDeepDive:[
      {
        name:"Matching Asphalt Shingles for Partial Repairs",
        priceRange:"$50-$150 per bundle",
        lifespan:"Matches surrounding shingle remaining life",
        bestFor:"Wind damage, isolated shingle failures, post-storm repair",
        pros:["Direct visual match when sourced correctly","Standard Portland contractor stock","Easy to install, six-nail high-wind option available","Affordable per-shingle replacement"],
        cons:["Color match increasingly difficult on roofs 8+ years old","Discontinued profiles require partial replacement of larger area","Manufacturer batch variations","Replacement shingles may show as fresher than aged surrounding"],
        pdxNote:"Color match becomes a real problem on Portland roofs 8+ years old because manufacturers discontinue colors and aged shingles fade differently from canopied vs. exposed slopes. Established Portland contractors maintain salvage stock of common colors specifically for repair work.",
      },
      {
        name:"Lead and Aluminium Step Flashing",
        priceRange:"$8-$25 per piece, $400-$900 per chimney rebuild",
        lifespan:"30-50 years for lead, 20-30 years for aluminium",
        bestFor:"Chimney step flashing, sidewall flashing, transition details",
        pros:["Lead is malleable and forms to brick/stone joints","Aluminium is corrosion-resistant and lighter","Both perform well in Portland's wet climate","Lead is heritage-appropriate on older homes"],
        cons:["Lead requires careful handling (environmental concerns)","Aluminium fasteners must match (galvanic corrosion risk)","Custom-forming requires skilled labour","Some HOAs restrict lead use"],
        pdxNote:"Most Portland chimney repairs use aluminium step flashing for cost and weight reasons. Heritage districts (Eastmoreland, Irvington) sometimes specify lead for visual match on listed properties — design review may push back on aluminium substitution.",
      },
      {
        name:"Ice-and-Water Shield Underlayment",
        priceRange:"$80-$160 per roll, $400-$900 for valley/eave coverage",
        lifespan:"30+ years (when properly installed under shingles)",
        bestFor:"Valley repairs, eave coverage, around penetrations",
        pros:["Self-adhering bitumen creates waterproof seal","Standard PDX requirement at eaves and valleys","Outlasts most surface materials","Critical for ice dam protection in cold-snap events"],
        cons:["Material cost meaningful for full coverage","Can't be reused once exposed","Requires clean substrate for proper adhesion","Must be properly lapped at edges"],
        pdxNote:"Ice-and-water shield at eaves and in valleys is standard Portland BDS requirement, not optional. Repair scope that exposes underlayment should include shield replacement under the repair area — patching with felt only is a short-term fix that fails again within 3-5 years.",
      },
      {
        name:"Roofing Sealants and Mastics",
        priceRange:"$8-$25 per tube, $80-$300 per repair",
        lifespan:"3-7 years depending on UV exposure",
        bestFor:"Pipe boot rebuild, minor flashing seal touch-up, emergency leak stoppers",
        pros:["Quick application","Low material cost","Effective for minor sealing","Available in matching colors"],
        cons:["Short lifespan vs. mechanical flashing","UV degradation accelerates failure","Hides underlying problems if used as primary repair","Often used by inexperienced contractors as cure-all"],
        pdxNote:"Sealant-only repairs are a red flag in Portland — they treat symptom not cause and fail within 3-5 years. Reputable Portland contractors use sealant only as a supplement to mechanical flashing repair, not as the primary fix.",
      },
    ],
    commonProblems:[
      { problem:"Sealant-only repair as primary fix", explanation:"Roofing cement covering a flashing failure is a cosmetic patch that fails again within 3-5 years and often hides the actual underlying damage. Reputable Portland contractors use sealant only as supplement to mechanical repair." },
      { problem:"Single-shingle replacement without underlayment check", explanation:"A wind-lifted shingle frequently has water damage to underlayment beneath it. Replacing the shingle without lifting adjacent courses to assess underlayment leaves the actual problem unaddressed — leak resumes within months." },
      { problem:"Repair recommended on roof past replacement age", explanation:"Multiple repair locations on a 22+ year Portland asphalt roof signal systemic end-of-life. Continued repair spending is money lost vs. replacement that's coming within 2-3 years anyway. Honest contractors will say so." },
      { problem:"Color match accepted on visible-from-street roofs", explanation:"Manufacturers discontinue colors regularly; aged shingles fade. Replacement shingles on visible roofs frequently show as patch jobs rather than seamless repairs. On front-elevation visible roofs, partial replacement may be more cost-effective than ongoing repair scope." },
      { problem:"Insurance-claim repair scope minimized", explanation:"Insurance adjusters sometimes minimize storm-damage repair scope to reduce payouts. Get a contractor scope before the adjuster visit; document everything; do not sign with storm chasers before adjuster signoff. If adjuster scope is below contractor estimate, request supplement with documented support." },
      { problem:"Permit required but skipped on >25% area scope", explanation:"Repair scope covering more than 25% of total roof area requires a Portland BDS permit. Contractors who skip the permit on large repair scope create the same liability problems as unpermitted full replacements — disclosure issues at resale, voided insurance, stop-work order risk." },
    ],
    serviceFaqs:[
      { question:"How quickly can I get emergency roof repair in Portland?", answer:"Same-day tarp deployment is standard — most Portland contractors maintain emergency dispatch capability for active leaks. Same-week repair scope is typical for non-active situations. Premium for emergency dispatch runs 30-60% over scheduled work; worth paying for active interior water damage, deferrable for dry-attic situations where 5-10 day scheduling saves meaningfully." },
      { question:"What's the difference between a $400 repair and a $2,000 repair?", answer:"Visible damage scope vs. underlying damage assessment. The $400 repair addresses the symptom (missing shingles, lifted flashing). The $2,000 repair addresses the cause (underlayment damage, deck rot, surrounding shingle deterioration) by lifting adjacent materials, replacing what's compromised, and rebuilding properly. The cheap repair has a 30-50% chance of leak recurrence within 18 months." },
      { question:"My insurer wants the cheapest repair quote. Should I push back?", answer:"Yes if there's a meaningful scope difference. Insurance adjusters typically estimate from photo inspection without lifting adjacent materials — they can miss underlying damage that a contractor identifies during actual repair work. Get a written contractor scope before the adjuster visit, document everything photographically, and request a supplement if the adjuster scope is materially below contractor recommendation. Oregon law requires insurers to cover the cost of repairs that restore the roof to pre-loss condition — not just minimum scope." },
      { question:"My roof is 18 years old and I have a leak. Repair or replace?", answer:"Depends on number of repair locations and remaining life. Single isolated leak on a 18-year roof with otherwise intact granules and sound flashing: repair makes sense. Multiple leak locations or visible granule loss: full replacement is the rational call because $2,000 in current repair plus $1,500-$3,000 in repairs over the next 3 years adds up to half the replacement cost without buying any roof life. Get a CCB-licensed contractor to assess and recommend honestly." },
      { question:"Do I need a permit for my Portland roof repair?", answer:"Repair scope covering less than 25% of total roof area generally does not require a permit. Anything covering 25%+ crosses into permit territory and requires BDS notification. Specific repair types — adding skylights, structural deck work, changing roofing material — require permits regardless of scope size. When in doubt, confirm with BDS before signing a contract; getting this wrong means stop-work orders." },
      { question:"How do I avoid storm chasers after a Portland wind event?", answer:"Storm chasers (out-of-state contractors who appear after major storms) typically lack Oregon CCB licensing, offer 'insurance deductible waiver' deals (which is insurance fraud), and disappear when problems emerge. Verify CCB at oregon.gov/ccb before signing anything. Reputable Portland contractors are local, have established business addresses, and will provide references from prior Portland projects. The 'sign now or lose the deal' pressure tactic is the clearest red flag." },
    ],
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
    costTruth:[
      "Portland is metal roofing's strongest market case anywhere in the United States, and the lifecycle math reflects it. The combination of 144 rain days, dense tree canopy creating moss pressure, steep-pitch hillside neighborhoods, and East Wind corridor exposure favors concealed-fastener standing seam over every other option for homeowners staying 15+ years. Metal premium of $5,000–$15,000 over premium architectural pays back through one or two avoided replacement cycles plus eliminated moss-treatment maintenance.",
      "The variable that distinguishes excellent metal installation from problematic metal installation is contractor expertise — and Portland has a meaningful divide. There are roughly 8–12 truly specialist metal roofing contractors serving the metro, and another 30–40 general roofers who've added metal to their service list. The specialists' work performs to 50+ year manufacturer expectations; the generalists' work shows oil-canning, premature fastener corrosion, and panel alignment issues within 5–10 years. Vet metal contractors specifically — past metal projects with 5+ year track records, not just CCB licensing.",
      "West Hills, Council Crest, Forest Park ridge, and Alameda Ridge homeowners face wind exposure that demands specific attention to panel-system selection. Concealed-fastener standing seam (Snap-Lock, Mechanical Lock) flexes with thermal expansion and shrugs off wind events that strip exposed-fastener panels and asphalt. Snow guards above pedestrian zones are required by Portland BDS on metal roofs above entries, walkways, and adjacent driveways — skipping them creates legitimate property damage and injury risk during the snow events that periodically hit Portland's higher elevation neighborhoods.",
      "Color and profile choices on metal carry meaningful timeline implications in historic districts. Heritage charcoal, slate, and weathered copper clear Pearl, Eastmoreland, and Irvington design review in 4–6 weeks; non-traditional colors (matte black, custom RAL specs) extend to 8–12 weeks with multiple revision cycles. Lake Oswego HOAs frequently push back on non-standard colors regardless of city design review. Submit color and profile early in the process — material orders should not be placed before final design review approval.",
    ],
    costDrivers:[
      { factor:"Standing seam concealed-fastener premium", impact:"+$3,000 to $7,000 over exposed-fastener", detail:"Concealed-fastener systems flex with thermal expansion. Required for wind-exposed properties and the only system manufacturers warrant for full lifespan." },
      { factor:"Panel gauge selection (24 vs. 26 vs. 29)", impact:"+$2,000 to $5,000 for premium gauge", detail:"24-gauge is the residential PDX standard for durability and oil-can resistance. 26-gauge acceptable on lower-pitch protected slopes; 29-gauge is too light for residential use." },
      { factor:"Snow guard system requirement", impact:"+$1,400 to $4,200", detail:"Required by BDS above pedestrian zones. Pad-style for moderate pitches; rail systems for steeper slopes. Skipping creates property damage and injury risk." },
      { factor:"Wind-rated installation (110+ mph)", impact:"+$400 to $900", detail:"West Hills, Forest Park, Alameda Ridge, Gresham/East Wind corridor. Concealed-fastener systems with documented wind-uplift testing. Standard 90 mph is inadequate." },
      { factor:"Crane staging on hillside lots", impact:"+$1,400 to $3,500", detail:"West Hills, Forest Park, steep Lake Oswego. Required for upper-roof material delivery on 10:12+ pitch with limited driveway access." },
      { factor:"Custom color or non-traditional profile", impact:"+$1,500 to $4,000 + 4-8 weeks timeline", detail:"Matte black, custom RAL specs, non-standard profiles. Historic district review extended; manufacturer lead times longer; not all installers stock specialty colors." },
      { factor:"Structural review for panel weight", impact:"+$400 to $800", detail:"BDS requires structural review for retrofit projects where new panel weight differs meaningfully from existing material (e.g. asphalt-to-metal conversions on older homes)." },
    ],
    workedExamples:[
      {
        scenario:"2,400 sq ft 1996 home in Mountain View — standing seam metal replacement, sound deck, snow guard system",
        lineItems:[
          { label:"Tear-off existing architectural asphalt", amount:"$2,200" },
          { label:"Synthetic high-temp underlayment", amount:"$880" },
          { label:"24-gauge standing seam panels (charcoal)", amount:"$13,400" },
          { label:"Trim, ridge, hip, valley, gable", amount:"$2,200" },
          { label:"Snow guard system (south + west slopes)", amount:"$2,400" },
          { label:"Snow load engineering documentation", amount:"$580" },
          { label:"Permit + Deschutes County inspection", amount:"$420" },
          { label:"Cleanup and disposal", amount:"$520" },
        ],
        total:"$22,620",
        note:"Build-wave subdivision metal upgrade. Snow load engineering documentation is Lake Oswego/West Hills/higher-elevation requirement; flat Portland metro generally doesn't require it. Equivalent architectural asphalt replacement would run $12,800 — metal premium of roughly $10,000 buys 25+ extra years of roof life and Class A compliance baked in.",
      },
      {
        scenario:"3,400 sq ft 1985 home in West Hills — standing seam metal, complex roofline, full snow guard, crane staging",
        lineItems:[
          { label:"Tear-off existing architectural asphalt", amount:"$3,200" },
          { label:"Synthetic high-temp underlayment", amount:"$1,200" },
          { label:"24-gauge standing seam panels (matte black)", amount:"$19,800" },
          { label:"Specialty trim at multiple gables, hips, valleys", amount:"$3,400" },
          { label:"Full perimeter snow guard system", amount:"$3,800" },
          { label:"Snow load engineering (60 psf zone)", amount:"$780" },
          { label:"Six-nail high-wind attachment (110 mph)", amount:"$420" },
          { label:"Crane day for material staging", amount:"$2,400" },
          { label:"Permit + BDS structural review", amount:"$680" },
          { label:"Cleanup and disposal", amount:"$640" },
        ],
        total:"$36,320",
        note:"Premium West Hills metal. Crane day, snow guards, complex roofline, and matte black color premium together added roughly $9,500 over a flat-lot equivalent. Matte black design review timeline added 6 weeks (heritage charcoal would have cleared in 3-4 weeks).",
      },
      {
        scenario:"1,950 sq ft 1985 home in River Road area — standing seam metal upgrade, sound deck, eco-spec buyer",
        lineItems:[
          { label:"Tear-off and disposal", amount:"$1,500" },
          { label:"Synthetic high-temp underlayment", amount:"$680" },
          { label:"24-gauge standing seam panels (forest green)", amount:"$11,200" },
          { label:"Trim, ridge, hip, valley, gable", amount:"$1,840" },
          { label:"Solar-ready conduit sleeve installation", amount:"$220" },
          { label:"Permit + Eugene B&PS", amount:"$240" },
          { label:"Cleanup and disposal", amount:"$320" },
        ],
        total:"$16,000",
        note:"Mid-tier metal upgrade. Metal premium of roughly $7,000 over architectural asphalt. Solar-ready conduit at install is the clearest cost-effective add — same install runs $1,500+ as a retrofit. Forest green color is non-standard but cleared review in approved color palette.",
      },
    ],
    materialDeepDive:[
      {
        name:"24-Gauge Standing Seam Steel (Galvalume / Pre-Painted)",
        priceRange:"$700-$1,000 per sq",
        lifespan:"50-65 years",
        bestFor:"Residential PDX standard — most replacements specify this",
        pros:["Durable enough to resist denting and oil-canning","Pre-painted in 30+ heritage colors with 40-year fade warranty","Galvalume coating prevents corrosion","Concealed-fastener systems flex with thermal expansion","Industry-standard installer expertise"],
        cons:["Heaviest of the metal options (panel weight matters for retrofit)","Premium over 26-gauge","Specialty colors add $1,500-$3,000","Larger crane staging requirement"],
        pdxNote:"24-gauge is the practical Portland residential standard. 26-gauge is acceptable on protected lower-pitch slopes but shows oil-canning under thermal stress more readily. 29-gauge is industrial-only and not appropriate for residential use despite cost savings.",
      },
      {
        name:"Aluminium Standing Seam",
        priceRange:"$900-$1,400 per sq",
        lifespan:"50-70 years",
        bestFor:"Coastal-adjacent PDX (gorge corridor), salt-air exposure properties",
        pros:["Non-corrosive — never rusts","Lighter weight (40% less than steel)","Better thermal performance","Excellent in salt-air environments","Premium color and finish options"],
        cons:["30-50% premium over Galvalume steel","Softer — more dent-prone in hail","Smaller installer pool","Thermal expansion is meaningful (requires correct seam systems)"],
        pdxNote:"Aluminium is overkill for typical Portland residential applications but justified for properties in the Columbia Gorge corridor (Cascade Locks, Hood River fringe) where salt-air carries from the Columbia River. For typical Portland metro homes, Galvalume steel is the better cost-performance match.",
      },
      {
        name:"Copper Standing Seam",
        priceRange:"$1,800-$3,500 per sq",
        lifespan:"100+ years",
        bestFor:"Eastmoreland/Irvington heritage projects, landmark properties, ultimate luxury",
        pros:["Heritage character match for early-20th century architecture","Develops natural patina over 7-15 years","Outlasts the building it covers","Required by some Eastmoreland design review on contributing properties","Distinctive aesthetic"],
        cons:["3-5x premium over standard steel","Specialist installer required","Theft risk during installation (rare but real)","Initial bright finish weathers within 1-2 years"],
        pdxNote:"Copper is reserved for true heritage projects in Portland — Eastmoreland and Irvington landmark properties, Pearl District signature buildings. Most Portland properties don't justify the premium. Where required by design review, it's the only option.",
      },
      {
        name:"Stone-Coated Steel Tiles",
        priceRange:"$500-$800 per sq",
        lifespan:"40-50 years",
        bestFor:"Mid-range alternative for owners wanting metal performance with shake/tile aesthetic",
        pros:["Looks like cedar shake or clay tile from ground level","Class A fire rating standard","Lighter than concrete tile","50-year warranty common","Hail-resistant"],
        cons:["More installation complexity than standing seam","Lower wind rating than standing seam","Smaller installer pool","Color limitations vs. standing seam","Not typically approved by historic district design review"],
        pdxNote:"Stone-coated steel is a niche choice in Portland — bridges metal performance with shake/tile aesthetics for owners who want both. Generally not approved by historic district design review (Eastmoreland, Irvington, Lake Oswego HOAs prefer real materials). Mostly used in newer subdivisions where HOA design provisions don't restrict to traditional materials.",
      },
    ],
    commonProblems:[
      { problem:"General roofer claiming metal expertise without track record", explanation:"Standing seam installation requires specific training in thermal expansion handling, panel alignment, and seam systems. General roofers who add metal without proper training produce installations that show oil-canning, fastener corrosion, and panel separation within 5-10 years. Verify metal-specific track record (5+ years, multiple completed projects) before signing." },
      { problem:"29-gauge specified for cost savings", explanation:"29-gauge metal is industrial-grade and not appropriate for residential use despite cost savings. It shows oil-canning under thermal stress, dents from hail and falling debris, and fails wind-rating requirements. 24-gauge is the residential PDX standard; 26-gauge is acceptable on protected lower-pitch slopes only." },
      { problem:"Snow guards omitted from quote", explanation:"Standing seam metal sheds snow aggressively. Snow guards above entries, walkways, and adjacent driveways are required by Portland BDS — not optional. Quotes that omit them are either incomplete or planning to argue with the inspector. Pad-style guards run $1,400-$3,500 depending on linear coverage." },
      { problem:"Color/profile not approved before material order", explanation:"Historic district design review on metal can take 4-12 weeks. Material orders placed before approval risk having to swap material if review pushes back. Established Portland metal contractors hold material orders until design review approval is in writing." },
      { problem:"Thermal expansion not properly handled at panel ends", explanation:"Metal panels expand and contract meaningfully across temperature ranges. Improper end termination (rigid attachment without slip joints) creates wave patterns and seam stress that fail prematurely. Inspect installer's prior work for visible thermal stress patterns before signing." },
      { problem:"Inland-spec materials in coastal-influenced areas", explanation:"Properties in the Columbia Gorge corridor (Cascade Locks, Hood River fringe) face salt-air exposure that corrodes inland-spec fasteners and seam materials within 10-15 years. Marine-grade aluminium or stainless fasteners required. Standard galvanized hardware fails prematurely." },
    ],
    serviceFaqs:[
      { question:"Is metal roofing actually worth the premium in Portland?", answer:"For homeowners staying 15+ years, almost always yes. The $5,000-$15,000 premium over premium architectural pays back through one or two avoided replacement cycles, eliminated moss-treatment maintenance ($300-$600 every 2 years on asphalt vs. zero on metal), better wind performance, and lower insurance premiums in some carriers. For homeowners selling within 7 years, metal recovers maybe 50-70% of its premium in resale value — premium architectural is the more rational call." },
      { question:"How do I tell a real metal roofing specialist from a general roofer who's added metal?", answer:"Ask three questions: (1) How many standing seam projects has your team completed in the last 5 years? (Specialists: 30+; generalists: under 10.) (2) Can you show me a project from 5+ years ago we can drive past? (Real specialists have multiple references.) (3) What's your approach to thermal expansion at panel terminations? (Specialists answer with specific seam systems and slip joints; generalists give vague answers.) Verify CCB at oregon.gov/ccb regardless." },
      { question:"How long does metal roofing installation actually take in Portland?", answer:"3-5 days for a standard residential project (1,800-2,200 sq ft, simple roofline). Complex West Hills hillside projects with crane staging run 7-10 days. The bigger variables are lead time and design review: peak season scheduling 4-8 weeks, material order 2-4 weeks after color approval, design review (when applicable) 4-12 weeks. Total elapsed time from quote acceptance to final inspection: 8-16 weeks typical, 14-24 weeks for historic district projects." },
      { question:"Will my metal roof be louder than asphalt during Portland rain?", answer:"No, when properly installed. The myth comes from agricultural metal applications where panels are mounted directly on purlins with no insulation or attic space. Residential metal installs over a deck with insulation and attic space — sound transmission is comparable to asphalt. Properly installed metal is actually slightly quieter on hard rain because the smooth surface doesn't amplify drops the way granular asphalt can." },
      { question:"Can I install metal directly over my existing asphalt roof?", answer:"Generally no. Portland BDS requires full tear-off for residential roof replacement regardless of new material. Metal-over-asphalt installations create moisture trapping (asphalt absorbs water), thermal mismatch (different expansion rates), and uneven panel surfaces (asphalt texture telegraphs through metal). The cost savings of skipping tear-off ($2,000-$3,000) are not worth the performance compromise and permit complications." },
      { question:"What about insurance discounts for metal roofs in Portland?", answer:"Some Oregon carriers offer 5-15% premium discounts for Class 4 impact-rated and Class A fire-rated roofing — both standard on standing seam metal. Discount magnitude varies by carrier; ask your specific insurer before signing a metal contract. Even without explicit discount, metal roofs typically support better claim outcomes after wind/hail events because damage is more limited and easier to document than equivalent damage on asphalt." },
    ],
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
    costTruth:[
      "Cedar shake retrofit-in-kind is the dominant project type in Portland's heritage neighborhoods — Eastmoreland, Irvington, Lake Oswego Country Club / Lake Forest, and listed properties scattered throughout Inner SE and NE. The economics differ fundamentally from architectural asphalt because cedar is partly a heritage character mandate and partly a maintenance commitment, not a pure cost-performance choice. A typical Eastmoreland cedar retrofit runs $22,000–$32,000; the equivalent home with architectural asphalt would run $12,000–$15,000.",
      "Hand-split versus Resawn cedar is the choice that drives most of the cost spread. Hand-split #1 grade Western red cedar offers the heritage profile with deep texture variation that design review favors on landmark properties; Resawn cedar is sawn rather than hand-split, has a more uniform appearance, and costs $4,000–$6,000 less on a typical project. Eastmoreland design review specifically pushes back on Resawn substitution on contributing properties; Lake Oswego HOAs vary by sub-association. Confirm material requirements with your specific design authority before signing — the binding decision is the reviewer's, not the contractor's.",
      "Pressure-applied fire retardant treatment is essential on cedar shake projects in Portland. The treatment achieves Class B fire rating (Class A requires synthetic substrates) and is required by most design review boards as part of a complete cedar shake system. Cost runs $1,200–$2,400 depending on roof size. The treatment lasts 7–10 years before renewal needed; renewal runs roughly 60% of original treatment cost. Untreated cedar in Portland's climate combined with moss and biological growth risks fire propagation that insurance carriers increasingly underwrite against.",
      "Maintenance is what kills cedar projects that weren't budgeted properly upfront. Without biennial moss treatment ($300–$700 per cycle) and prompt repair of cracked or cupped shakes ($200–$800 per repair event), Portland cedar shake fails in 14–18 years vs. the 25–30 advertised. With proper maintenance — twice-yearly inspection, biennial chemical treatment, and prompt repair — Portland cedar reaches 25–30 years with care. Factor 25-year ownership cost: cedar retrofit + maintenance runs $32,000–$48,000 vs. premium architectural at $14,000–$18,000. The case for cedar is heritage character, not cost.",
    ],
    costDrivers:[
      { factor:"Hand-split vs. Resawn material choice", impact:"+$4,000 to $6,000 for hand-split", detail:"Hand-split #1 grade is the heritage profile design review favors on landmark Eastmoreland and Irvington properties. Resawn acceptable on most non-contributing properties." },
      { factor:"Copper flashing throughout", impact:"+$1,800 to $4,000 over galvanized", detail:"Required by HOA in most Country Club/Lake Forest/First Addition Lake Oswego sub-associations and favored by Eastmoreland design review on contributing properties. Copper outlasts galvanized by 30+ years." },
      { factor:"Pressure-applied fire retardant treatment", impact:"+$1,200 to $2,400", detail:"Required for Class B fire rating. Standard requirement on most design review boards. Treatment lasts 7-10 years before renewal." },
      { factor:"Type II Historic Resource Review", impact:"+4 to 6 weeks before permit + $400-$700 fees", detail:"Eastmoreland, Irvington listed historic districts; Ladd's Addition; Portland Historic Resource Inventory properties." },
      { factor:"Specialist installer premium", impact:"+15% to 30% on labour", detail:"Cedar shake installation requires specific training. Generalist roofers produce installations that fail at 14-18 years. Specialist labour rates are higher." },
      { factor:"HOA design review (Lake Oswego)", impact:"+2 to 6 weeks before permit", detail:"Country Club, Lake Forest, First Addition sub-associations frequently mandate cedar in kind. Material substitution requires formal HOA approval." },
      { factor:"Annual maintenance budget over 25-year life", impact:"$8,000 to $15,000 total ownership", detail:"Biennial moss treatment, fire retardant renewal at year 7-10, repair of cracked/cupped shakes. Typically not budgeted at install but real over ownership." },
    ],
    workedExamples:[
      {
        scenario:"2,800 sq ft 1928 Tudor in Eastmoreland — cedar shake retrofit in kind, copper flashing, hand-split #1 grade",
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
        note:"Premium Eastmoreland Tudor retrofit. Hand-split #1 grade and copper flashing both reflect design review preference for landmark properties. Resawn cedar with galvanized flashing would have come in roughly $5,500 cheaper but design review pushed back — the home is contributing to the historic district character and reviewers wanted heritage material profile.",
      },
      {
        scenario:"3,200 sq ft 1975 hillside home above Lake Oswego — cedar shake retrofit-in-kind, hand-split, copper",
        lineItems:[
          { label:"Tear-off existing cedar shake", amount:"$4,200" },
          { label:"Synthetic underlayment + ice-and-water at eaves", amount:"$1,100" },
          { label:"Hand-split cedar shake, #1 grade Western red", amount:"$18,400" },
          { label:"Copper flashing throughout", amount:"$3,200" },
          { label:"Pressure-applied fire retardant treatment", amount:"$1,800" },
          { label:"Ridge ventilation rebuild", amount:"$880" },
          { label:"Crane day for upper-roof material staging", amount:"$1,400" },
          { label:"HOA design review + Lake Oswego permit", amount:"$680" },
          { label:"Cleanup and disposal", amount:"$680" },
        ],
        total:"$32,340",
        note:"Premium Lake Oswego cedar retrofit. Hand-split #1 grade is the upper tier — Resawn at $14,000-$15,000 would have come in roughly $4,000 cheaper. Copper flashing is non-negotiable for cedar at this tier; galvanized would void HOA approval. Crane day required for hillside upper-roof access.",
      },
      {
        scenario:"2,100 sq ft 1908 Craftsman with Ladd's Addition adjacency — cedar shake retrofit-in-kind, modest scope",
        lineItems:[
          { label:"Tear-off existing cedar shake", amount:"$2,800" },
          { label:"Synthetic underlayment + ice-and-water at eaves", amount:"$680" },
          { label:"Resawn cedar shake, #2 grade Western red (acceptable for non-contributing)", amount:"$8,400" },
          { label:"Galvanized flashing (acceptable per Ladd's design review)", amount:"$1,200" },
          { label:"Pressure-applied fire retardant treatment", amount:"$1,400" },
          { label:"Ridge ventilation rebuild", amount:"$680" },
          { label:"Type II Historic Resource Review submission", amount:"$580" },
          { label:"Permit + BDS Inspection", amount:"$420" },
          { label:"Cleanup, disposal", amount:"$520" },
        ],
        total:"$16,680",
        note:"Lower-tier cedar retrofit on a non-contributing property where design review accepted Resawn cedar with galvanized flashing. The contributing-property version (hand-split #1 grade + copper) would have run $22,000-$24,000. Confirming property contribution status before signing is essential.",
      },
    ],
    materialDeepDive:[
      {
        name:"Hand-Split #1 Grade Western Red Cedar",
        priceRange:"$1,000-$1,800 per sq",
        lifespan:"25-35 years with maintenance, 14-18 without",
        bestFor:"Landmark Eastmoreland and Irvington properties, premium Lake Oswego HOA mandates",
        pros:["Heritage character match for early-20th century homes","Required by design review on most contributing properties","Distinctive deep texture variation","Best wind performance among cedar options","Premium aesthetic"],
        cons:["3-5x premium over architectural asphalt","Specialist installer required","Demanding maintenance schedule","Without treatment, life cuts in half","Color and grain variation that some find inconsistent"],
        pdxNote:"Hand-split #1 grade is the heritage profile that Eastmoreland and Irvington design review specifically favors on contributing landmark properties. On non-contributing properties or in Lake Oswego HOAs that allow it, Resawn cedar is acceptable and cheaper. Confirm property contribution status before specifying material.",
      },
      {
        name:"Resawn (Sawn) Western Red Cedar",
        priceRange:"$700-$1,100 per sq",
        lifespan:"22-30 years with maintenance",
        bestFor:"Non-contributing properties, mid-tier cedar projects, HOA-approved alternatives",
        pros:["$4,000-$6,000 cheaper than hand-split on typical project","More uniform appearance","Easier to source consistent batches","Acceptable to most design review on non-contributing properties","Same maintenance schedule as hand-split"],
        cons:["Less heritage character — looks more uniform/manufactured","Not approved by some Eastmoreland sub-districts on contributing properties","Same fire/maintenance requirements as hand-split","Grain pattern less distinctive"],
        pdxNote:"Resawn cedar is the cost-effective compromise for owners who want cedar character without the hand-split premium. Design review approval varies — Eastmoreland tends to push back on landmark properties; Irvington is more flexible; Lake Oswego HOAs vary by sub-association. Submit material specifications during design review, not after.",
      },
      {
        name:"Pressure-Treated Cedar Shake",
        priceRange:"$900-$1,400 per sq",
        lifespan:"30-40 years with reduced maintenance",
        bestFor:"Wet shaded canopied areas where untreated cedar fails fastest",
        pros:["Factory pressure treatment with fire retardant + preservative","Reduces moss colonization","Extends real-world life by 5-8 years vs. untreated","Class B fire rating without field treatment","Same heritage appearance as untreated"],
        cons:["20-30% premium over untreated cedar","Treatment must be specified and verified","Smaller supplier pool","Some design review boards prefer untreated for character","Treatment effectiveness varies by manufacturer"],
        pdxNote:"Pressure-treated cedar is the smart spec for owners committing to cedar long-term in heavily canopied Portland neighborhoods (Eastmoreland, Sellwood, Hawthorne). The 20-30% premium is recovered through extended life and reduced maintenance frequency. Confirm treatment source — factory pressure treatment outperforms field-applied alternatives.",
      },
      {
        name:"Synthetic Cedar Alternatives (DaVinci, EcoStar)",
        priceRange:"$800-$1,400 per sq",
        lifespan:"40-50 years",
        bestFor:"Owners wanting cedar appearance without maintenance commitment",
        pros:["Class A fire rating standard","No moss treatment required","No maintenance cycle vs. real cedar","50-year warranty","Consistent appearance and color","Approved by most design review for cedar substitution"],
        cons:["Looks like cedar from ground level but not from up close","Some heritage purists object","Not approved by all historic district reviews","More limited color/profile choices than real cedar","Higher upfront cost than Resawn cedar"],
        pdxNote:"DaVinci Slate and EcoStar synthetic cedar are Portland's most-used cedar alternatives. Approval varies by district — Irvington is generally accepting; Eastmoreland pushes back on contributing properties; Lake Oswego HOAs vary. The case for synthetic is the maintenance elimination — owners who don't want the cedar maintenance commitment but need cedar character in design review get this option.",
      },
    ],
    commonProblems:[
      { problem:"Cedar maintenance schedule not budgeted", explanation:"Owners who buy cedar without budgeting maintenance see 14-18 year failures vs. the 25-30 advertised. Biennial moss treatment ($300-$700) plus fire retardant renewal at year 7-10 plus repair of cracked/cupped shakes adds $8,000-$15,000 over 25-year ownership. Factor this in upfront." },
      { problem:"Generalist installer used on cedar project", explanation:"Cedar shake installation requires specific training in coursing, exposure, fastening, and ventilation. General roofers produce cedar installations that fail at 14-18 years vs. specialist work that reaches 25-30. Specialist track record (5+ cedar projects in last 3 years) is essential." },
      { problem:"Design review approval skipped", explanation:"Eastmoreland, Irvington, Ladd's, listed properties citywide require Type II Historic Resource Review. Lake Oswego sub-associations require HOA design review. Starting cedar work without approval triggers stop-work orders, material redo at owner expense, and potential legal issues with the historic district association." },
      { problem:"Galvanized flashing on landmark property", explanation:"Most design review boards require copper flashing on contributing landmark properties. Galvanized flashing voids approval and may require redo at owner expense. Confirm flashing material requirements during design review submission, not during install." },
      { problem:"Pressure treatment skipped to save cost", explanation:"Untreated cedar in Portland's climate combined with the moss pressure of canopied neighborhoods fails in 14-18 years. The $1,200-$2,400 pressure treatment cost is recovered through extended life. Skipping treatment to reduce upfront cost is false economy." },
      { problem:"Inadequate ventilation under cedar", explanation:"Cedar requires breathable underlayment and adequate ridge-to-soffit ventilation to dry between rain events. Inadequate ventilation traps moisture and accelerates rot. Ventilation system must be assessed and upgraded as part of cedar retrofit, not deferred." },
    ],
    serviceFaqs:[
      { question:"Is cedar shake actually required on my Eastmoreland home, or can I substitute?", answer:"Depends on contribution status. Contributing properties (most pre-1940 homes in the district) face design review pushback on material substitution; non-contributing properties have more flexibility. Conversion to architectural asphalt requires Type II Historic Resource Review with formal documentation. Submit a formal proposal early — review can take 4-6 weeks and binds the material decision. Synthetic cedar alternatives clear review more easily than asphalt conversion." },
      { question:"Hand-split versus Resawn — does anyone actually notice?", answer:"Yes, design review boards on landmark properties do. From street level, Resawn looks similar to hand-split for most observers. From close inspection, Resawn shows uniform sawn grain while hand-split shows split grain variation. Eastmoreland Historic District design review specifically requests hand-split on contributing properties because the heritage character matters. On non-contributing properties or in Lake Oswego HOAs that allow it, Resawn is the cost-effective choice." },
      { question:"How much actual cedar maintenance does my Portland home need?", answer:"Biennial chemical moss treatment ($300-$700 per cycle) — non-negotiable in canopied Portland neighborhoods. Annual visual inspection, especially after winter storms. Fire retardant treatment renewal every 7-10 years ($800-$1,500). Prompt repair of any cracked or cupped shakes ($200-$800 per repair event). Total maintenance budget: $8,000-$15,000 over 25-year ownership. Skip the maintenance and life drops to 14-18 years; commit to it and life reaches 25-30." },
      { question:"What's the case for synthetic cedar in Portland?", answer:"Maintenance elimination is the primary case. Real cedar requires biennial treatment and ongoing repair commitment; synthetic cedar (DaVinci Slate, EcoStar) requires nothing beyond gutter cleaning. The aesthetic is similar from ground level. Design review approval varies — Irvington is generally accepting; Eastmoreland pushes back on contributing properties; Lake Oswego HOAs vary by sub-association. For owners who want cedar character without the maintenance commitment, synthetic is the right answer where allowed." },
      { question:"Does cedar shake actually qualify for insurance Class A discount?", answer:"No. Cedar shake achieves Class B fire rating with pressure-applied retardant treatment; Class A requires synthetic substrates or other Class A materials. Some Oregon insurers actually surcharge cedar roofing in fire-prone areas (Forest Park orbit, certain WUI overlay zones). Verify with your specific carrier before specifying cedar; in some neighborhoods, insurance considerations push owners toward synthetic alternatives or metal." },
      { question:"How do I find a real cedar shake specialist in Portland?", answer:"Verify CCB licensing first. Then ask three specific questions: (1) How many cedar shake projects has your team completed in the last 3 years? (Specialists: 8+; generalists: under 3.) (2) Can you show me a project from 5+ years ago we can drive past? (3) Do you specify hand-split or Resawn, and why? (Specialists explain the trade-off; generalists give vague answers.) Established Portland cedar specialists are typically members of the Cedar Shake & Shingle Bureau and have certification credentials." },
    ],
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
    costTruth:[
      "Portland flat roofing economics differ fundamentally from pitched-roof economics. The dominant Portland flat roof market is the Pearl District residential tower / townhouse complex — converted brick warehouses, mid-2000s residential builds, and 2010s townhouse projects with TPO membrane systems on 18–22 year replacement cycles. A typical Pearl townhouse replacement runs $30,000–$55,000; the same property with pitched architectural would run $14,000–$18,000 if it could accept that geometry (most can't).",
      "The variable that distinguishes durable flat-roof installations from problem installations is drainage discipline. Portland's 144 rain days mean every drainage compromise compounds — a 1/8-inch slope deficit that would never matter in Phoenix produces ponding water within 48 hours of any rain event in Portland. Membrane systems on poorly-draining roofs fail at seams, blisters, and parapet transitions within 8-12 years vs. the 20-25 advertised. Drainage rebuild during membrane replacement is essential, not optional — addressing it after the fact requires reopening completed membrane work.",
      "60-mil TPO with heat-welded seams is the practical Portland residential flat-roof standard. 45-mil TPO with adhesive seams was common in 1990s-2000s installations and is now reaching end of life — that vintage drives the active Pearl replacement market. The premium for 60-mil over 45-mil ($2,000-$4,000 on typical residential project) is recovered within 5-8 years through reduced seam-failure risk. Heat-welded seams are non-negotiable; adhesive seams in Portland's wet climate fail at parapet transitions and high-traffic areas within 10-12 years.",
      "Annual September inspection ($150-$300) before the wet season begins is the single most cost-effective flat-roof maintenance practice in Portland. The inspection catches drain blockages, parapet flashing degradation, seam stress, and minor membrane damage at a stage where repair runs $300-$1,200. The same problems caught after the wet season through interior water damage run $8,000-$20,000 including drywall, insulation, and finishes. Most Portland flat-roof failures aren't sudden — they're slow leaks that accumulate damage for 6-18 months before becoming visible.",
    ],
    costDrivers:[
      { factor:"Pearl District / townhouse complex scope", impact:"$30,000 to $120,000", detail:"Residential towers, mid-2000s townhouse complexes, converted warehouses. Per-unit cost split varies; full complex projects benefit from coordinated crane and review." },
      { factor:"Drainage system rebuild", impact:"+$2,400 to $8,000", detail:"Internal drains, scuppers, slope correction. Essential during membrane replacement; addressing after creates membrane disruption." },
      { factor:"Parapet flashing rebuild", impact:"+$3,500 to $9,000", detail:"Converted brick warehouse projects (NW 11th, NW Glisan corridor) often need parapet flashing rebuilt. Original detail decades old." },
      { factor:"60-mil TPO premium over 45-mil", impact:"+$2,000 to $4,000", detail:"Standard PDX spec. Heat-welded seams required regardless of gauge. 45-mil is acceptable on small protected residential applications only." },
      { factor:"Crane staging on Pearl tower projects", impact:"+$2,500 to $8,000", detail:"Pearl District has limited street parking and tight loading zones. Crane permits coordinated with city; multi-day staging often required." },
      { factor:"Central City design review", impact:"+4 to 8 weeks before permit", detail:"Pearl District applies to membrane color and parapet detail. Standard membranes in standard colors clear fastest." },
      { factor:"Commercial vs. residential permit class", impact:"+$1,200 to $3,500 + extended timeline", detail:"Buildings 5+ stories, mixed-use ground floors, larger commercial conversions require commercial-class permit and contractor endorsement." },
    ],
    workedExamples:[
      {
        scenario:"3,800 sq ft Pearl District townhouse — full TPO membrane replacement, parapet rebuild, crane staging",
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
        note:"Mid-tier Pearl District townhouse replacement. The crane day, design review submission, and parapet rebuild together added roughly $9,000 over a comparable suburban flat-roof project. The 60-mil TPO with heat-welded seams is the practical Pearl District spec — 45-mil is cheaper but not durable enough for the parapet flashing transitions that fail first.",
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
        note:"HOA-managed project across 6 townhouse units. Per-unit cost works out to roughly $9,200 — significantly less than each owner doing this independently because crane staging, design review, and BDS submission are coordinated and shared. Pearl District HOAs increasingly bundle major roofing work as community projects.",
      },
      {
        scenario:"1,200 sq ft mid-century home flat addition (Inner SE) — TPO replacement on garage/family-room addition",
        lineItems:[
          { label:"Tear-off existing modified bitumen", amount:"$1,400" },
          { label:"Insulation board top-up", amount:"$880" },
          { label:"60-mil TPO membrane, heat-welded seams", amount:"$3,400" },
          { label:"Drain repositioning + new scupper", amount:"$880" },
          { label:"Parapet sealant rebuild (perimeter)", amount:"$540" },
          { label:"Permit + BDS inspection", amount:"$320" },
          { label:"Cleanup and disposal", amount:"$340" },
        ],
        total:"$7,760",
        note:"Typical mid-century Inner SE flat addition replacement. Drain repositioning was the meaningful line item — original 1960s drain placement caused chronic ponding that compromised the previous membrane within 12 years. Addressing drainage during membrane replacement is the cheap-now-vs-expensive-later decision that determines next-cycle longevity.",
      },
    ],
    materialDeepDive:[
      {
        name:"60-mil TPO with Heat-Welded Seams",
        priceRange:"$8-$14 per sq ft installed",
        lifespan:"22-28 years",
        bestFor:"Pearl District residential, Portland modern builds, residential additions",
        pros:["Heat-welded seams create monolithic membrane","UV-stable surface","White reflective option for energy","Walkable for HVAC servicing","20-year manufacturer warranty common"],
        cons:["Requires specialist installer for heat welding","Seam quality is variable by contractor","Tear/puncture risk from foot traffic","Premium over 45-mil and adhesive systems"],
        pdxNote:"60-mil TPO with heat-welded seams is the practical Portland residential standard. 45-mil TPO from the 1990s-2010s is now reaching end of life and driving the active Pearl District replacement market. Heat welding is non-negotiable — adhesive seams fail at parapet transitions in Portland's wet climate.",
      },
      {
        name:"45-mil TPO with Adhesive Seams",
        priceRange:"$6-$10 per sq ft installed",
        lifespan:"15-20 years (PDX climate)",
        bestFor:"Small protected residential applications where 60-mil premium is unjustified",
        pros:["20-30% cheaper than 60-mil","Easier installation","Acceptable warranty terms (15-year typical)","Adequate for small protected applications"],
        cons:["Adhesive seams fail in Portland's wet climate","Tears more easily than 60-mil","Shorter lifespan","Not appropriate for parapet transitions","Smaller specialist installer pool willing to install"],
        pdxNote:"45-mil TPO is generally not recommended for Portland residential applications. Established Pearl District contractors typically refuse to install 45-mil because the seam failure rate creates callback liability. Approve only for small (<1,000 sq ft) protected applications where the premium for 60-mil is meaningfully high relative to project value.",
      },
      {
        name:"EPDM Synthetic Rubber",
        priceRange:"$5-$9 per sq ft installed",
        lifespan:"20-30 years",
        bestFor:"Residential additions, mid-century flat-add applications, light commercial",
        pros:["Proven 50-year track record","Cost-effective for residential","Mechanical attachment or fully-adhered options","Relatively easy to repair","Good cold-weather performance"],
        cons:["Black surface absorbs heat (energy negative)","Seams are tape-based (lower performance than heat-welded TPO)","Slightly punctures-prone","Aesthetic limitations"],
        pdxNote:"EPDM is the cost-effective mid-tier choice for Portland residential flat applications. The black surface heat absorption matters less in Portland's mild climate than in Phoenix or Atlanta — energy penalty is real but modest. Standard residential addition flat replacement: EPDM is often the better value than 60-mil TPO.",
      },
      {
        name:"Modified Bitumen (Mod-Bit / SBS)",
        priceRange:"$6-$11 per sq ft installed",
        lifespan:"15-25 years",
        bestFor:"Existing system maintenance, mid-century compatible replacements",
        pros:["Multi-layer redundancy","Heat-welded or torch-applied options","Walkable surface","Repair-friendly","Compatible with older flat roof systems"],
        cons:["Heavier than membrane systems","Torch installation requires specific safety practices","Smaller installer pool","Asphalt-based — moss colonization possible","Cold-weather installation challenges"],
        pdxNote:"Modified bitumen is encountered on Portland flat roofs from the 1980s-2000s. Replacement-in-kind makes sense when the existing system is sound but membrane has aged out. New installations rarely specify modified bitumen vs. TPO — TPO has overtaken the residential market for new flat applications.",
      },
      {
        name:"PVC Membrane",
        priceRange:"$10-$18 per sq ft installed",
        lifespan:"25-35 years",
        bestFor:"Commercial applications with chemical exposure, premium residential",
        pros:["Best chemical resistance","Heat-welded seams","Long warranty terms (30-year)","Excellent cold-weather flexibility","Bright white reflective"],
        cons:["50-100% premium over TPO","Smaller residential installer pool","Less common in residential applications","Specialty material that some Portland suppliers don't stock"],
        pdxNote:"PVC is rare in Portland residential applications — used primarily on commercial properties with chemical exposure (restaurants, industrial). For typical Portland residential flat applications, the PVC premium over 60-mil TPO isn't justified by the marginal lifespan extension.",
      },
    ],
    commonProblems:[
      { problem:"Drainage compromise during membrane replacement", explanation:"Replacement membrane on poorly-draining roof fails within 8-12 years vs. 20-25 on properly-draining. Drainage rebuild during membrane replacement is essential, not optional — addressing it after requires reopening completed membrane work at significant additional cost." },
      { problem:"Adhesive seams instead of heat-welded", explanation:"Adhesive seams in Portland's wet climate fail at parapet transitions and high-traffic areas within 10-12 years. Heat-welded seams create monolithic membrane that meets manufacturer warranty terms. Adhesive seams void some warranties." },
      { problem:"45-mil specified to reduce upfront cost", explanation:"45-mil TPO is generally inadequate for Portland residential parapet transitions. The $2,000-$4,000 savings over 60-mil are recovered through reduced seam-failure risk within 5-8 years. Established Portland contractors typically refuse 45-mil specification because of callback liability." },
      { problem:"Annual inspection skipped", explanation:"Portland flat roofs need annual September inspection. Inspections catch drain blockages, parapet degradation, seam stress at $300-$1,200 repair stage. Same issues caught after wet season through interior water damage cost $8,000-$20,000." },
      { problem:"Generalist installer used on flat-roof project", explanation:"Flat roofing requires specific training in heat welding, parapet detailing, drainage. Pitched-roof generalists who add flat to their service list produce installations that fail at seams and parapet transitions within 5-10 years. Specialist track record (5+ years, multiple flat-roof projects) is essential." },
      { problem:"Commercial-class endorsement skipped on 5+ story buildings", explanation:"Buildings 5+ stories or with commercial ground-floor use require commercial-class CCB endorsement on the contractor's license. Working without this endorsement on a permit-required commercial structure invalidates the permit. Verify endorsement at oregon.gov/ccb before signing." },
    ],
    serviceFaqs:[
      { question:"Is annual inspection really worth $300 on my Portland flat roof?", answer:"Always yes. The September pre-season inspection catches drain blockages, parapet flashing degradation, seam stress, and minor membrane damage at $300-$1,200 repair stage. The same issues caught after the wet season through interior water damage run $8,000-$20,000 including drywall, insulation, and finishes. Most Portland flat-roof failures aren't sudden — they're slow leaks accumulating damage for 6-18 months before becoming visible." },
      { question:"Should I replace my 1990s 45-mil TPO with 45-mil or 60-mil?", answer:"Almost always 60-mil. The premium ($2,000-$4,000 on typical residential project) is recovered through reduced seam-failure risk within 5-8 years. 45-mil is generally not recommended for Portland residential applications because parapet transition seams fail in Portland's wet climate. Established Pearl District contractors typically won't install 45-mil because of callback liability." },
      { question:"How long does Pearl District design review actually take for flat-roof replacement?", answer:"Standard 60-mil TPO in light gray or charcoal: 4-6 weeks. Custom membrane colors or non-standard parapet detail: 8-12 weeks with multiple revision cycles. Most established Pearl District contractors handle the submission as part of their service — verify this is included in writing before signing. Material orders should not be placed before final design review approval." },
      { question:"What's the difference between commercial and residential permit on a Pearl building?", answer:"Buildings 4 stories and under with residential use only: residential permit class applies. Buildings 5+ stories, mixed-use ground floors, or larger commercial conversions: commercial-class permit required, plus commercial CCB endorsement on contractor's license. Difference is $1,200-$3,500 in fees plus 2-4 weeks additional review time. Verify your building classification with BDS before contractor selection." },
      { question:"Can my HOA bundle all our Pearl townhouses for one coordinated project?", answer:"Yes, and it's increasingly common. HOA-managed coordinated projects across 4-8 townhouse units typically achieve 30-40% per-unit savings over individual replacements — crane staging, design review, BDS submission, and material delivery all share costs. Coordination requires HOA buy-in 6-12 months ahead of schedule but the savings are real. Most established Pearl District contractors can bid coordinated projects." },
      { question:"My flat roof has standing water 48 hours after rain. Is this a real problem?", answer:"Yes — ponding water 48+ hours after rain indicates drainage system failure. Membrane systems on chronically-ponding roofs fail at seams within 8-12 years vs. 20-25 on properly-draining roofs. Drainage rebuild ($2,400-$8,000) is essential during next membrane replacement; addressing after replacement requires reopening membrane work. Get an assessment now even if no interior leaks — the underlying drainage problem is shortening membrane life." },
    ],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug)
}

export function getStaticServicePaths() {
  return services.map(s => ({ service: s.slug }))
}
