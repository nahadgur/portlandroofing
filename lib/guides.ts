export interface Guide {
  slug:        string
  title:       string
  headline:    string   // shorter display title
  description: string
  category:    'material' | 'permits' | 'emergency' | 'cost' | 'historic'
  readTime:    number   // minutes
  published:   string   // ISO date
  featured:    boolean
  sections:    GuideSection[]
  faqs:        { q: string; a: string }[]
}

export interface GuideSection {
  heading: string
  body:    string   // plain text paragraphs separated by \n\n
}

export const guides: Guide[] = [
  // ── GUIDE 1 ──────────────────────────────────────────────────────────
  {
    slug:        'metal-vs-asphalt-portland',
    title:       'Metal vs Asphalt Roofing in Portland: The Complete 2026 Guide',
    headline:    'Metal vs Asphalt in PDX',
    description: "Portland gets 144 rain days a year. Here's which roofing material actually wins — backed by local contractor data, permit outcomes, and real cost breakdowns.",
    category:    'material',
    readTime:    9,
    published:   '2026-03-15',
    featured:    true,
    sections: [
      {
        heading: "Why Portland's Climate Changes Everything",
        body: `Portland averages 36 inches of rain per year across 144 wet days. That's not a statistic — it's a design constraint. The material choice that makes sense in Phoenix or Atlanta is a different calculation entirely when your roof sits under near-constant moisture for seven months a year.\n\nThe two materials that dominate the Portland metro replacement market are architectural asphalt shingles and standing-seam metal. Both work. But they work differently, age differently, and cost differently in the specific conditions of the Pacific Northwest.`,
      },
      {
        heading: 'Asphalt Shingles in Portland: The Honest Assessment',
        body: `Asphalt is the default for a reason. It's the material most Portland contractors know best, it's what most BDS permits expect, and at $7,500–$12,000 for a typical 2,000 sq ft home, it's accessible to the widest range of budgets.\n\nThe problem in Portland is moss. Asphalt shingles are porous. After five to seven years in the Willamette Valley's wet winters, most asphalt roofs develop visible moss and algae growth. Left untreated, moss lifts shingle edges, accelerates granule loss, and can cut a 30-year shingle's lifespan down to 18–22 years.\n\nThe fix is algae-resistant (AR) shingles — a class of product that uses copper or zinc granules to inhibit growth. In Portland, AR shingles are not a luxury option. They should be the minimum specification for any asphalt replacement. The cost premium over standard shingles is $200–$400 on a typical job. The lifespan extension is 5–8 years. It's not a close call.\n\nClass 4 impact-resistant shingles are worth considering in high-wind zones — West Hills, Alameda Ridge, Council Crest. Insurance carriers in Oregon sometimes offer premium discounts for Class 4 roofs. Ask your insurer before signing a contract.`,
      },
      {
        heading: 'Metal Roofing in Portland: When It Makes Sense',
        body: `Standing-seam metal is the premium option at $14,000–$24,000 installed. It's also, on a per-year basis, the cheaper one.\n\nMetal sheds water instantly. There's no absorption, no granule loss, no moss risk. A well-installed standing-seam roof in Portland can last 50–60 years with minimal maintenance beyond keeping gutters clear. Amortised over that lifespan, the annual cost of a metal roof beats asphalt by year 18–22 for most homeowners.\n\nThe wind performance difference is significant in elevated Portland zones. Standing-seam panels interlock continuously along their length, with no exposed fasteners. In the 58 mph gusts that hit the West Hills during winter storms, that matters.\n\nThe contractor pool for metal is smaller. There are excellent metal roofers in Portland, but there are also operators who've expanded into metal without adequate training. A poorly installed standing-seam roof — with incorrect panel alignment, improper flashing at ridges and valleys, or inadequate thermal expansion allowance — fails faster than asphalt. Vet metal contractors more rigorously than asphalt ones.`,
      },
      {
        heading: 'Permits and Historic Districts',
        body: `Asphalt wins on permitting simplicity. In every Portland neighbourhood, asphalt replacement-in-kind is a standard BDS permit. In historic districts — Ladd's Addition (permit score 5/5), Irvington (5/5), Alameda (4/5), Sellwood-Moreland (3/5) — metal roofing is permitted but requires additional documentation to demonstrate that colour, profile, and visual character are compatible with the historic resource.\n\nIn practice, this means: if you're in a historic district and want metal, budget an extra 3–6 weeks for review, have your contractor prepare colour and profile samples, and engage with the BDS historic reviewer early. It is doable. It's not automatic.`,
      },
      {
        heading: 'The Bottom Line for Portland Homeowners',
        body: `Choose asphalt if you're planning to sell within 10–15 years, working to a tighter budget, or in a historic district where you want the simplest permit path. Specify AR shingles minimum. Get three quotes.\n\nChoose metal if you're planning to stay 15+ years, live in a high-wind zone, or want to eliminate maintenance decisions for the next four decades. Budget for specialist contractors and potentially longer permit timelines in historic areas.\n\nBoth materials have a place in the Portland market. The decision depends on your timeline, not on which material is abstractly "better."`,
      },
    ],
    faqs: [
      { q: 'Does metal roofing make noise in Portland rain?', a: "Modern standing-seam metal roofs installed over solid sheathing with proper insulation are not significantly louder than asphalt in rain. The 'loud metal roof' experience comes from metal installed directly over open purlins with no insulation — common in agricultural buildings, not residential. If noise is a concern, specify a minimum R-30 attic insulation in your contract." },
      { q: 'Can I get a metal roof approved in Ladd\'s Addition?', a: "Yes, but it requires a Type II Historic Resource Review — separate from and preceding your standard BDS building permit. Portland's historic review office has approved metal roofs in Ladd's Addition, but they've also denied some. Key factors: colour must be compatible with the historic palette (dark charcoal, dark green, weathered copper tones tend to pass), profile must not create visual noise, and your contractor must provide samples for the review. Budget 4–6 weeks and engage the reviewer before committing to a material." },
      { q: 'What is the actual lifespan difference in Portland conditions?', a: "Asphalt architectural shingles in Portland typically perform for 22–27 years with proper maintenance (annual moss treatment, prompt repair of any lifted edges). AR shingles push that to 27–32 years. Standing-seam metal in Portland conditions routinely reaches 50–60 years. The shorter asphalt lifespan in PDX vs manufacturer specs is driven by the extended wet season accelerating granule loss and moss-related edge lift." },
    ],
  },

  // ── GUIDE 2 ──────────────────────────────────────────────────────────
  {
    slug:        'portland-roofing-permits-guide',
    title:       'Portland Roofing Permits: The Complete Neighborhood Guide 2026',
    headline:    'Portland Roofing Permits by Neighborhood',
    description: "Portland's permit process varies dramatically by neighborhood. Historic districts can add 6 weeks and $500 in fees. Here's exactly what you're facing before you sign a contract.",
    category:    'permits',
    readTime:    7,
    published:   '2026-03-22',
    featured:    true,
    sections: [
      {
        heading: "Why Portland's Permit Process Is More Complex Than Most Cities",
        body: `Portland's Bureau of Development Services (BDS) processes roofing permits across a city with five distinct permit zones: standard residential, Central City overlay, Environmental Zone, Slope overlay, and Historic Conservation District. Depending on where your home sits, you may need to satisfy one, two, or three layers of review before a hammer touches your roof.\n\nMost homeowners learn this after they've already signed a contract with a contractor who quoted a two-week timeline. The purpose of our Permit Difficulty Score (1–5) is to make sure you know what you're in for before that point.`,
      },
      {
        heading: 'The Five Permit Zones Explained',
        body: `Standard residential (Score 1–2): Covers most of outer Portland and the suburbs. BDS online portal, one application, $150–$400 permit fee, 5–14 business day approval. This is the default experience homeowners expect.\n\nHistoric Conservation Districts (Score 4–5): Portland has seven designated Historic Conservation Districts. Ladd's Addition and Irvington carry a score of 5 — the maximum. Any roofing material change requires a separate Type II Historic Resource Review that runs concurrently with or before the standard permit. Review timelines are 4–8 weeks. Fees are $200–$500 additional. Contractors unfamiliar with the process routinely underquote timelines in these zones.\n\nCentral City overlay (Score 3–4): Applies to Pearl District and parts of the Lloyd District. Some flat-roof replacements on condo buildings require HOA approval and may trigger a design review if the replacement changes the building's appearance.\n\nSlope and Environmental overlays (Score 3–4): West Hills, Council Crest, Forest Park, and some Sylvan-Highlands properties fall under Slope or Environmental Zone designations. Steep-slope roofing systems may require engineer-stamped drawings. Pre-application conferences with BDS are sometimes required.\n\nSuburban jurisdictions (Score 1–2): Beaverton, Hillsboro, Tigard, Gresham, and Milwaukie each operate their own permit offices. The process is broadly similar to Portland's standard residential zone — online application, 5–10 day turnaround — but uses different portals and fee schedules.`,
      },
      {
        heading: 'What the Permit Actually Covers',
        body: `A Portland roofing permit authorises the replacement of roofing materials on an existing structure. It does not automatically authorise structural changes to rafters or sheathing — these require separate permits or amendments if discovered during the work.\n\nYour contractor must display the permit on-site before work begins. BDS conducts a final inspection after completion. In practice, inspections for standard asphalt replacements are often done by photo or documentation rather than in-person site visit, but in historic districts and higher-score zones, in-person inspection is more common.\n\nPermit fees in Portland range from $150 for simple replacements to $600+ for complex multi-layer systems or properties requiring engineering review. These are separate from contractor labour costs.`,
      },
      {
        heading: 'How to Check Your Property Before Contracting',
        body: `Before signing a contract, take ten minutes to verify your property's permit zone at portlandmaps.com. Enter your address, navigate to the Zoning tab, and look for any overlay designations: Historic Conservation District, Environmental Zone, Slope, or Central City.\n\nIf you see a Historic Conservation District flag, check whether your specific property is a "contributing resource" (original historic-era construction) or a "non-contributing resource" (later construction within the district boundary). Contributing resources have stricter review requirements. Non-contributing properties within historic districts may still need standard BDS permits without the full historic review.\n\nIf you're in a neighbourhood with a score of 3 or above, ask any contractor you're interviewing specifically: "Have you pulled permits in [neighbourhood] before, and what was your last timeline experience?" The right answer is detailed and specific. Vague answers are a signal.`,
      },
    ],
    faqs: [
      { q: "Do I need a permit to repair rather than replace my roof?", a: "Minor repairs — replacing a few shingles, re-flashing a chimney, patching a small section — typically do not require a permit in Portland. A full tear-off and replacement always requires one. The grey area is partial replacements covering more than 25% of the roof area, which BDS generally treats as requiring a permit. When in doubt, call BDS at (503) 823-7300 or use their online chat before starting work." },
      { q: "What happens if my contractor works without a permit?", a: "Unpermitted roofing work creates several serious problems: it may void your homeowner's insurance coverage for related claims, it creates disclosure obligations when you sell, and it can result in stop-work orders and fines (typically $500–$2,000 in Portland). If BDS discovers unpermitted work during a sale inspection, the buyer can require remediation before closing. Never accept a contractor's offer to 'skip the permit to save time.'" },
      { q: "How long does the historic review actually take in practice?", a: "Based on current BDS workloads (Q2 2026), Type II Historic Resource Reviews in Ladd's Addition and Irvington are running 5–7 weeks from complete application submission to decision. The key word is 'complete' — incomplete applications with missing colour samples or contractor documentation restart the clock. Engage the historic review coordinator early, submit a complete package, and build 6 weeks minimum into your project timeline." },
    ],
  },

  // ── GUIDE 3 ──────────────────────────────────────────────────────────
  {
    slug:        'storm-damage-roofing-portland',
    title:       'Storm Damage Roofing in Portland: What to Do in the First 48 Hours',
    headline:    'Storm Damage: Your First 48 Hours',
    description: 'Portland storm season runs October through March. If your roof took damage, the next 48 hours are the most important window. Here is exactly what to do — and what not to do.',
    category:    'emergency',
    readTime:    6,
    published:   '2026-04-01',
    featured:    true,
    sections: [
      {
        heading: 'What Portland Storms Actually Do to Roofs',
        body: `Portland's storm profile is specific: sustained rain plus high wind, usually between October and March. Unlike hail-heavy markets in the Midwest, the primary Portland damage mechanism is wind uplift — shingles or shake sections lifting at their edges, allowing water ingress — combined with debris impact from the metro's extensive tree canopy.\n\nThe worst damage often isn't visible from the ground. A 50 mph gust can break the adhesive seal strip on asphalt shingles without visibly lifting them. Those shingles look intact. They're not. The next rain event drives water under the loosened edges and into your decking.\n\nThis is why post-storm inspection matters even when your roof appears undamaged.`,
      },
      {
        heading: 'Hour 0–6: Immediate Safety First',
        body: `Do not get on your roof immediately after a storm. Wet roofing materials — especially asphalt and cedar shake — are extremely slippery. Falls from roofs are the leading cause of serious injury in post-storm DIY inspections.\n\nFrom the ground, with binoculars if available, look for: missing or visibly lifted shingles, exposed decking, displaced ridge caps, damaged flashing around chimneys or skylights, gutters pulled away from the fascia, and large debris that may have impacted the surface.\n\nInside the house, check your attic immediately. Bring a flashlight and look for daylight coming through the deck, water stains on rafters, or wet insulation. Fresh water stains are typically darker and irregular. Pre-existing stains are usually uniform and faded at the edges.`,
      },
      {
        heading: 'Hour 6–24: Document Before You Touch Anything',
        body: `Before any tarping, debris removal, or contractor access, document the damage thoroughly. Your insurance claim depends on before-and-after evidence, and once work begins, the baseline is gone.\n\nPhotograph from the ground, from the attic, and — if a professional is available — from the roof surface itself. Photograph the surrounding trees, any fallen branches, and the condition of neighbouring properties. Insurance adjusters use all of this to establish the storm event.\n\nCall your insurance company within 24 hours of discovering damage. Most homeowner policies have notification requirements. Missing the notification window can affect your claim outcome. Get a claim number before any repair work starts.`,
      },
      {
        heading: 'Hour 24–48: Emergency Tarping and Contractor Selection',
        body: `Emergency tarping is legitimate, necessary, and covered by most homeowner policies as "mitigation." If your roof has active water ingress, tarping within 48 hours prevents secondary damage — wet insulation, mould, structural damage — that insurers may otherwise argue was preventable.\n\nThe problem is that post-storm Portland attracts out-of-state storm chasers — contractors who follow weather events, operate without Oregon CCB licences, and pressure homeowners into signing over their insurance assignments at the door. Signs of a storm chaser: they appeared unsolicited, they cannot produce an Oregon CCB number on request, they ask you to sign documents before your insurer has assessed, or they promise to "handle everything with the insurance company."\n\nUse only Oregon CCB-licensed contractors. Verify the licence at oregon.gov/ccb before anyone touches your roof. Our platform lists only vetted, licensed Portland contractors.`,
      },
      {
        heading: 'Working With Your Insurance Adjuster',
        body: `Request an in-person inspection from your insurer's adjuster — do not accept a desktop or photo-only review for significant storm damage. Adjusters working remotely from satellite imagery frequently miss wind-seal failures, flashing damage, and soffit/fascia damage that an in-person inspection would catch.\n\nYou are entitled to request a re-inspection or escalate to your insurer's claims management team if you believe the initial assessment is incomplete. You are also entitled to get an independent contractor assessment and share it with your adjuster. Most licensed Portland roofing contractors will provide storm damage assessments at no charge as part of their service — use one.`,
      },
    ],
    faqs: [
      { q: 'How do I know if my roof has storm damage if it looks fine from the ground?', a: "The most common hidden damage after Portland wind events is broken adhesive seal strips on asphalt shingles — the shingle looks intact but is no longer bonded to the one below it. The only reliable way to detect this is a physical hand-check of individual shingles by someone on the roof. If you had wind above 45 mph in your area, get a professional inspection even if no damage is visible from the ground." },
      { q: 'Will my insurance premium go up if I file a storm damage claim?', a: "In Oregon, insurers cannot non-renew your policy solely because of a weather-related claim. However, filing a claim does go on your claims history and may affect premiums at renewal. The practical threshold for most Portland homeowners: if the repair estimate exceeds your deductible by $2,000 or more, filing is generally worth it. For smaller amounts, paying out of pocket protects your claims history." },
      { q: "How quickly can I get a Portland roofing contractor after a major storm?", a: "After a significant PDX storm event, licensed local contractors typically book out 2–4 weeks for non-emergency full replacements. Emergency tarping and leak mitigation is usually available within 24–72 hours. This is one of the strongest arguments for having a vetted contractor relationship before storm season — homeowners with an existing relationship get scheduled faster than cold enquiries." },
    ],
  },
]

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find(g => g.slug === slug)
}

export function getStaticGuidePaths() {
  return guides.map(g => ({ slug: g.slug }))
}

export const categoryLabels: Record<Guide['category'], string> = {
  material:  'Material Guide',
  permits:   'Permits & Regulations',
  emergency: 'Emergency & Storm',
  cost:      'Cost & Pricing',
  historic:  'Historic Districts',
}
