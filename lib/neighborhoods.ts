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
  },
  {
    slug:'sunnyside', name:'Sunnyside', zip:'97214', area:'Inner SE',
    avgCost:8800, range:'$6.5k–$12k', commonMaterial:'Asphalt', indexPct:66,
    description:'Vibrant inner SE neighbourhood with a mix of Victorian, Craftsman and mid-century housing.',
    highlights:['Dense urban lots — access can be tight','Active neighbourhood association','Standard asphalt shingle well-suited to microclimate'],
    permitScore:2,
    permitNotes:'Standard permit. No special overlay. Online BDS submission, 1–2 weeks typical.',
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
  },

  // ── Outer SE ──
  {
    slug:'woodstock', name:'Woodstock', zip:'97202', area:'SE Portland',
    avgCost:8400, range:'$6k–$11.5k', commonMaterial:'Asphalt', indexPct:64,
    description:'Family-friendly SE neighbourhood with large lots and classic Portland housing stock.',
    highlights:['Larger lots with tree cover — debris management important','Mid-tier market: quality asphalt best ROI','Good contractor access via Powell Blvd'],
    permitScore:2,
    permitNotes:'Standard permit. No overlay complications. BDS online portal, 1–2 weeks.',
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
  },
  {
    slug:'sabin', name:'Sabin', zip:'97217', area:'NE Portland',
    avgCost:9000, range:'$7k–$12.5k', commonMaterial:'Asphalt', indexPct:68,
    description:'Close-knit NE neighbourhood with excellent access and strong community standards for home maintenance.',
    highlights:['Active neighbourhood association with high standards','Classic bungalow stock ideal for 30-year architectural shingles','Good contractor competition keeps quotes fair'],
    permitScore:2,
    permitNotes:'Standard permit. No overlay. Routine BDS process.',
  },
  {
    slug:'concordia', name:'Concordia', zip:'97211', area:'NE Portland',
    avgCost:8200, range:'$6k–$11.5k', commonMaterial:'Asphalt', indexPct:62,
    description:'Diverse NE neighbourhood with a mix of housing types and a steady re-roofing market.',
    highlights:['Variety of roof types across housing stock','Value-conscious market with growing investment','NE access makes contractor scheduling straightforward'],
    permitScore:2,
    permitNotes:'Standard permit. No historic overlay. BDS online, 1–2 weeks.',
  },

  // ── N Portland ──
  {
    slug:'cully', name:'Cully', zip:'97218', area:'NE Portland',
    avgCost:7600, range:'$5.5k–$10.5k', badge:'new', commonMaterial:'Asphalt', indexPct:57,
    description:'Portland\'s largest neighbourhood by area, rapidly improving with new homeowner investment and growing roofing demand.',
    highlights:['Fastest-growing re-roofing demand in NE Portland','Large lots with trees — gutter guard upsell opportunity','Value market: standard architectural shingle optimal'],
    permitScore:1,
    permitNotes:'One of Portland\'s easiest permit zones. Standard BDS application, no overlay. Often approved in 5–7 business days.',
  },
  {
    slug:'alberta-arts-district', name:'Alberta Arts District', zip:'97217', area:'NE Portland',
    avgCost:8800, range:'$6.5k–$12k', commonMaterial:'Asphalt', indexPct:66,
    description:'Vibrant arts-focused corridor with strong residential demand and community-conscious homeowners.',
    highlights:['Community pride drives above-average maintenance standards','Older bungalows on active re-roof cycle','Strong word-of-mouth referral culture'],
    permitScore:2,
    permitNotes:'Standard permit. No historic overlay. BDS online, 1–2 weeks.',
  },
  {
    slug:'mississippi-ave', name:'Mississippi Avenue', zip:'97217', area:'N Portland',
    avgCost:9100, range:'$7k–$12.5k', commonMaterial:'Asphalt', indexPct:69,
    description:'Revitalised N Portland corridor with rapidly appreciating home values driving roofing investment.',
    highlights:['Rising property values increase willingness to invest in roofs','Dense urban housing with tight access'],
    permitScore:2,
    permitNotes:'Standard permit. No historic overlay in most of the corridor. BDS online, 1–2 weeks.',
  },
  {
    slug:'overlook', name:'Overlook', zip:'97217', area:'N Portland',
    avgCost:8400, range:'$6k–$11.5k', commonMaterial:'Asphalt', indexPct:64,
    description:'N Portland neighbourhood on the bluff above the Willamette with a mix of bungalows and ranch-style homes.',
    highlights:['Elevated position increases wind exposure slightly','Bluff homes may require extra safety equipment','Solid mid-market with consistent demand'],
    permitScore:2,
    permitNotes:'Standard permit. Some bluff-adjacent properties may need engineer sign-off for steep-slope work. BDS online, 1–2 weeks.',
  },
  {
    slug:'piedmont', name:'Piedmont', zip:'97217', area:'N Portland',
    avgCost:7900, range:'$5.8k–$10.8k', commonMaterial:'Asphalt', indexPct:60,
    description:'Affordable N Portland neighbourhood with many long-time owners now in re-roofing decision windows.',
    highlights:['High proportion of homes 25–35 years old — prime re-roof market','Value-oriented: position asphalt as the smart long-term choice'],
    permitScore:1,
    permitNotes:'Straightforward permit zone. Standard BDS application, no overlay. Typically approved in under a week.',
  },
  {
    slug:'arbor-lodge', name:'Arbor Lodge', zip:'97217', area:'N Portland',
    avgCost:8000, range:'$5.8k–$11k', commonMaterial:'Asphalt', indexPct:60,
    description:'Tree-canopy-rich N Portland neighbourhood with mature housing stock and growing homeowner investment.',
    highlights:['Dense tree canopy: debris management and gutter guards important','Ranch and bungalow mix — generally simpler rooflines'],
    permitScore:1,
    permitNotes:'Standard permit, no overlay. BDS online portal. Fast approvals typical.',
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
  },
  {
    slug:'portsmouth', name:'Portsmouth', zip:'97203', area:'N Portland',
    avgCost:7500, range:'$5.2k–$10k', commonMaterial:'Asphalt', indexPct:57,
    description:'Established N Portland neighbourhood with affordable housing and increasing homeowner improvement activity.',
    highlights:['Budget-conscious market: keep proposals clear and value-focused','Ranch homes with low-slope sections common'],
    permitScore:1,
    permitNotes:'One of the easiest permit zones in the city. Standard BDS application, no overlay, fast approvals.',
  },
  {
    slug:'cathedral-park', name:'Cathedral Park', zip:'97203', area:'N Portland',
    avgCost:7800, range:'$5.5k–$10.5k', commonMaterial:'Asphalt', indexPct:59,
    description:'Scenic N Portland neighbourhood below the St. Johns Bridge with a mix of housing types and steady demand.',
    highlights:['River proximity: moisture load higher than inner east side','Tourism destination — neighbourhood pride matters'],
    permitScore:2,
    permitNotes:'Standard permit. No historic overlay in residential areas. BDS online, 1–2 weeks.',
  },
  {
    slug:'university-park', name:'University Park', zip:'97203', area:'N Portland',
    avgCost:8100, range:'$6k–$11.5k', commonMaterial:'Asphalt', indexPct:61,
    description:'Stable residential neighbourhood surrounding University of Portland with consistent homeowner investment.',
    highlights:['Academic community drives careful, research-based decisions','Well-maintained housing stock — mostly preventative/replacement'],
    permitScore:1,
    permitNotes:'Standard permit. No overlay. Fast BDS approvals typical in this zone.',
  },
  {
    slug:'linnton', name:'Linnton', zip:'97231', area:'N Portland',
    avgCost:7400, range:'$5k–$10k', commonMaterial:'Asphalt', indexPct:56,
    description:'Small industrial-residential neighbourhood along the Willamette with unique access considerations.',
    highlights:['River road access can limit equipment staging','Industrial adjacency: heavier moss and debris accumulation'],
    permitScore:2,
    permitNotes:'Standard permit. No historic overlay. Access constraints are practical not regulatory. BDS online, 1–2 weeks.',
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

