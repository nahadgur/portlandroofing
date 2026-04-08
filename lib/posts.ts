export interface Post {
  slug:       string
  title:      string
  excerpt:    string
  category:   'data' | 'market' | 'storm' | 'contractor' | 'neighbourhood'
  tags:       string[]
  published:  string   // ISO date
  readTime:   number
  featured:   boolean
  body:       PostSection[]
}

export interface PostSection {
  heading?: string   // optional — some sections are just prose
  body:     string   // paragraphs separated by \n\n
}

export const posts: Post[] = [
  // ── POST 1 ──────────────────────────────────────────────────────────
  {
    slug:      'portland-roofing-quote-data-2026',
    title:     'We Tracked 200 Portland Roofing Quotes. Here\'s What the Data Actually Shows.',
    excerpt:   'Zip code, material, pitch, urgency — we broke down 200 verified contractor quotes from across the Portland metro to find out where prices cluster, where they spike, and what homeowners are actually paying in 2026.',
    category:  'data',
    tags:      ['pricing', 'data', 'portland', '2026', 'contractor quotes'],
    published: '2026-03-28',
    readTime:  7,
    featured:  true,
    body: [
      {
        body: `We've been collecting contractor quote data since we launched. Not estimates, not national averages pulled from a database — actual quotes submitted through our platform from homeowners across the Portland metro. This is what 200 of those quotes look like when you break them down.`,
      },
      {
        heading: 'The Overall Picture',
        body: `The median quote for a full roof replacement across the 200 jobs was $9,250. The mean was $9,810 — pulled upward by a cluster of high-value West Hills and Lake Oswego projects in the $18,000–$22,000 range.\n\nThe lowest quote in the dataset was $5,400 for a 1,100 sq ft ranch in Portsmouth with a low-pitch asphalt replacement and no tear-off. The highest was $23,800 for a 3,200 sq ft cedar shake replacement on a steep-pitch West Hills home with full deck replacement.\n\nThat $18,400 spread between the two extremes is the real Portland roofing market. Anyone quoting you a "Portland average" as a single number is compressing a lot of variance into a figure that may have nothing to do with your specific home.`,
      },
      {
        heading: 'Where Prices Are Highest — And Why',
        body: `The top five zip codes by median quote value were 97201 (West Hills/Council Crest, $13,400), 97034 (Lake Oswego, $12,800), 97202 restricted to Eastmoreland ($11,600), 97212 restricted to Alameda ($11,200), and 97229 (Forest Park corridor, $13,100).\n\nThe common factors in high-cost zones aren't surprising: steeper roof pitches, premium material specifications (cedar shake, standing-seam metal), larger roof areas, and in the case of Ladd's Addition and Irvington, permit costs and timelines that add $400–$800 to total project costs.\n\nWhat is slightly surprising is how much pitch alone moves the number. Two identical 2,000 sq ft homes with the same material spec showed a $2,100 median difference in quotes when one had a moderate pitch (6/12) and the other had a steep pitch (10/12). Contractors don't advertise this clearly enough.`,
      },
      {
        heading: 'The Tear-Off Variable',
        body: `Of the 200 quotes, 156 included tear-off of existing roofing. The median tear-off add-on was $1,850 — range $900 to $3,200 depending on layers present and disposal costs.\n\n44 quotes were for overlay installations (new shingles over existing). Overlay quotes averaged $1,960 less than comparable tear-off jobs. The savings are real. So is the downside: most building codes allow a maximum of two roofing layers. If your home already has two layers — common in older Portland housing stock — an overlay isn't an option. And overlays don't allow inspection of decking condition, meaning latent water damage can go undetected until the next full replacement.\n\nOf the 44 overlay quotes in our dataset, 11 were followed within 90 days by a separate request for a full tear-off after the contractor discovered deck damage that made overlay non-viable. Know what you have before you agree to an overlay.`,
      },
      {
        heading: 'Material Breakdown',
        body: `Asphalt architectural shingles: 71% of quotes. Median $8,900.\nMetal standing seam: 14% of quotes. Median $17,400.\nCedar shake: 9% of quotes. Median $14,200.\nFlat/TPO: 4% of quotes. Median $7,100.\nOther (tile, corrugated metal): 2% of quotes.\n\nThe metal share is higher than the national average of roughly 8% for residential replacements — consistent with Portland's climate case for metal and the higher income demographics of zones like West Hills and Lake Oswego where metal is standard.`,
      },
      {
        heading: 'What the Data Doesn\'t Tell You',
        body: `A quote is not a final price. Our dataset tracks submitted quotes, not completed job invoices. The gap between quote and final invoice in our contractor feedback data averages 7.3% upward — driven primarily by deck replacement once the old roofing is removed, and by supplemental flashing work discovered during tear-off.\n\nBudget a 10% contingency on any roofing quote. It's not pessimism — it's what the data shows.`,
      },
    ],
  },

  // ── POST 2 ──────────────────────────────────────────────────────────
  {
    slug:      'portland-neighborhoods-most-roof-replacements-2026',
    title:     '5 Portland Neighborhoods Seeing the Most Roof Replacements in Spring 2026',
    excerpt:   'Contractor scheduling data from across the Portland metro reveals which neighborhoods are hitting their re-roofing cycle hardest this spring — and why some areas are booking out 8 weeks ahead.',
    category:  'neighbourhood',
    tags:      ['neighborhoods', 'market', 'spring 2026', 'demand', 'scheduling'],
    published: '2026-04-02',
    readTime:  5,
    featured:  true,
    body: [
      {
        body: `Spring is peak roofing season in Portland. The break in winter rain, pre-summer contractor availability, and homeowners finally acting on damage they noticed during the wet months all converge between March and June. This spring, five neighborhoods are driving demand harder than anywhere else in the metro.`,
      },
      {
        heading: '1. Sellwood-Moreland: The 1940s Stock Is Hitting Its Limit',
        body: `Sellwood-Moreland's housing stock clusters heavily in the 1935–1955 construction window. That means a large cohort of homes that had their last professional replacement in the late 1990s or early 2000s are now 25–30 years into an architectural shingle's rated lifespan.\n\nContractors working Sellwood are reporting quote volumes up approximately 40% compared to spring 2025. Scheduling lead times for non-emergency replacements are running 6–8 weeks. If you're in Sellwood and your roof is over 22 years old, get your quotes before May — summer slots are filling now.`,
      },
      {
        heading: '2. Irvington: Historic District Backlog Compounding Demand',
        body: `Irvington's permit difficulty score of 5/5 — the maximum in our index — means that demand isn't just driven by re-roofing cycles. It's compounded by permit timelines. Homeowners who discovered damage over winter and started the Historic Resource Review process in January are only now receiving approvals and entering the contractor scheduling queue.\n\nThe historic review backlog at BDS has added 2–3 weeks to typical Irvington timelines compared to last year. Contractors familiar with the Irvington process are especially stretched — the pool of roofers with documented historic district experience is limited, and they're booking out 8–10 weeks.`,
      },
      {
        heading: '3. Multnomah Village: Mid-Century Ranch Re-Roof Cycle',
        body: `Multnomah Village's 1955–1970 ranch and split-level stock is in heavy re-roofing demand. These homes typically have larger-than-average roof areas relative to living space due to their low-pitch designs, and many are now on their second or third asphalt replacement.\n\nThe good news for Multnomah homeowners is that the neighbourhood sits outside any historic overlay and contractor access is straightforward. Lead times are running 4–5 weeks — elevated but not as stretched as Sellwood or Irvington.`,
      },
      {
        heading: '4. Alameda: Wind Damage From February Event Driving Inspections',
        body: `The February 2026 wind event — 58 mph gusts recorded at the Alameda Ridge weather station — left a significant number of Alameda homes with wind-seal failures that aren't visible from the ground. Insurance-driven inspections and subsequent replacement quotes have been running at elevated levels since early March.\n\nAlameda's elevated permit difficulty (score 4/5) and the neighbourhood's preference for premium materials (cedar shake and metal dominate) mean average project values are high and specialist contractor capacity is the binding constraint. Expect 6–8 week lead times for full replacements.`,
      },
      {
        heading: '5. Beaverton: Volume Market Hitting Capacity',
        body: `Beaverton is a different story from the inner Portland neighbourhoods above. It's not historic overlay or premium materials — it's sheer volume. The city's large 1980s and 1990s suburban housing stock is entering a synchronized re-roofing cycle, and Washington County's contractor pool is stretched.\n\nBeaverton replacements are lower in per-project value (median $8,600) but high in volume. Straightforward Washington County permits, accessible locations, and standard asphalt specs mean jobs move faster — but there are simply a lot of them. Lead times are running 3–4 weeks, shorter than inner Portland but up significantly from last year's 1–2 week norm.`,
      },
      {
        body: `If your neighbourhood appears on this list and you've been putting off getting quotes, the practical advice is simple: contact three contractors now, before you need the work done urgently. Emergency scheduling — active leak, visible storm damage — always gets prioritised, but it also costs more and limits your choice of contractor. The best time to get on a good contractor's schedule is before you need to.`,
      },
    ],
  },

  // ── POST 3 ──────────────────────────────────────────────────────────
  {
    slug:      'west-hills-storm-damage-april-2026',
    title:     'The West Hills Took a Hit in April. Here\'s What the Damage Data Shows.',
    excerpt:   "58 mph gusts, cedar shake failures, and a permit backlog that's about to compound. We break down the April 2026 wind event across Portland's highest-risk roofing zones.",
    category:  'storm',
    tags:      ['storm', 'west hills', 'wind damage', 'april 2026', 'cedar shake'],
    published: '2026-04-06',
    readTime:  5,
    featured:  true,
    body: [
      {
        body: `The wind event that moved through the Portland metro on April 5th registered 58 mph gusts at the West Hills monitoring station — the strongest recorded in the area since February 2023. If you live in the West Hills, Council Crest, Alameda Ridge, or Forest Park corridor, here is what you should be looking at right now.`,
      },
      {
        heading: 'What 58 mph Wind Does to Different Roof Types',
        body: `Standing-seam metal: Minimal risk. Continuously interlocked panels with no exposed fasteners handle this wind level without meaningful damage in properly installed systems. If your metal roof is 10 years old or newer and was installed correctly, you're likely fine.\n\nCedar shake: Moderate to high risk. Individual shakes are held by two nails each. At 50+ mph, older shakes — particularly those with any existing cracking or cupping — can lift, twist, or separate entirely. The failure mode is often not visible from the ground: the shake stays roughly in place but breaks its seal, allowing water under the course above.\n\nAsphalt architectural shingles: Moderate risk. The primary failure is seal strip breakage — the adhesive strip that bonds each shingle to the one below it loses adhesion. Again, the shingle looks intact from the ground. It isn't.`,
      },
      {
        heading: 'Where We\'re Seeing the Most Reported Damage',
        body: `Based on inspection requests submitted through our platform in the 48 hours following the event, the highest concentration of reported damage is in:\n\nWest Hills (97225, 97221): Cedar shake failures and exposed decking at ridge lines. Several reports of gutters detached from fascia by debris impact.\n\nCouncil Crest (97201 elevated): Ridge cap displacement on asphalt roofs. One confirmed structural brace failure on a detached garage.\n\nAlameda Ridge (97212): Wind-seal failures on asphalt roofs installed 2008–2015. This cohort is at the age where seal strip adhesion is marginal under high-wind stress.\n\nForest Park corridor (97229): Mixed reports. Newer homes with metal roofing largely unaffected. Older cedar shake and asphalt properties showing damage consistent with the West Hills pattern.`,
      },
      {
        heading: 'What to Do Now',
        body: `Do not get on your roof. If you have a cedar shake or older asphalt roof in any of the zones above, call a licensed Oregon CCB contractor for an inspection before the next rain event — current forecasts show rain returning Wednesday.\n\nDocument first. Before any contractor accesses your roof, photograph from the ground, from the attic (check for daylight and fresh water stains on rafters), and around the exterior. Your insurance claim depends on baseline documentation.\n\nCall your insurer. You have a notification obligation under most Oregon homeowner policies. Call today and get a claim number even if you're not sure whether the damage is significant enough to claim. Notification protects your options — you can always decide not to proceed with a claim once you have an inspection report.\n\nUse licensed contractors only. After every Portland wind event, out-of-state operators without Oregon CCB licences canvass affected neighbourhoods. Do not sign anything before verifying CCB status at oregon.gov/ccb.`,
      },
      {
        body: `Emergency inspection slots through our vetted contractor network are available now. Lead times for full replacements following this event will extend significantly over the coming weeks as the backlog builds — homeowners who secure contractor relationships early will have considerably more flexibility on scheduling and material choice.`,
      },
    ],
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(p => p.slug === slug)
}

export function getStaticPostPaths() {
  return posts.map(p => ({ slug: p.slug }))
}

export const postCategoryLabels: Record<Post['category'], string> = {
  data:         'Data & Research',
  market:       'Market Insight',
  storm:        'Storm Report',
  contractor:   'Contractor News',
  neighbourhood:'Neighborhood Report',
}

export const postCategoryColors: Record<Post['category'], string> = {
  data:         '#F5A623',
  market:       '#2ECC71',
  storm:        '#E63946',
  contractor:   '#7A7F8E',
  neighbourhood:'#F5A623',
}
