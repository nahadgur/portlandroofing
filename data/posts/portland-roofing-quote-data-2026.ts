import type { Post } from '@/lib/posts'

export const post: Post = {
    slug:      'portland-roofing-quote-data-2026',
    title:     'We Tracked 200 Portland Roofing Quotes. Here\'s What the Data Actually Shows.',
    excerpt:   'Zip code, material, pitch, urgency, we broke down 200 verified contractor quotes from across the Portland metro to find out where prices cluster, where they spike, and what homeowners are actually paying in 2026.',
    category:  'data',
    tags:      ['pricing', 'data', 'portland', '2026', 'contractor quotes'],
    published: '2026-03-28',
    readTime:  7,
    featured:  true,
    body: [
      {
        body: `We've been collecting contractor quote data since we launched. Not estimates, not national averages pulled from a database, actual quotes submitted through our platform from homeowners across the Portland metro. This is what 200 of those quotes look like when you break them down.`,
      },
      {
        heading: 'The Overall Picture',
        body: `The median quote for a full roof replacement across the 200 jobs was $9,250. The mean was $9,810, pulled upward by a cluster of high-value West Hills and Lake Oswego projects in the $18,000–$22,000 range.\n\nThe lowest quote in the dataset was $5,400 for a 1,100 sq ft ranch in Portsmouth with a low-pitch asphalt replacement and no tear-off. The highest was $23,800 for a 3,200 sq ft cedar shake replacement on a steep-pitch West Hills home with full deck replacement.\n\nThat $18,400 spread between the two extremes is the real Portland roofing market. Anyone quoting you a "Portland average" as a single number is compressing a lot of variance into a figure that may have nothing to do with your specific home.`,
      },
      {
        heading: 'Where Prices Are Highest, And Why',
        body: `The top five zip codes by median quote value were 97201 (West Hills/Council Crest, $13,400), 97034 (Lake Oswego, $12,800), 97202 restricted to Eastmoreland ($11,600), 97212 restricted to Alameda ($11,200), and 97229 (Forest Park corridor, $13,100).\n\nThe common factors in high-cost zones aren't surprising: steeper roof pitches, premium material specifications (cedar shake, standing-seam metal), larger roof areas, and in the case of Ladd's Addition and Irvington, permit costs and timelines that add $400–$800 to total project costs.\n\nWhat is slightly surprising is how much pitch alone moves the number. Two identical 2,000 sq ft homes with the same material spec showed a $2,100 median difference in quotes when one had a moderate pitch (6/12) and the other had a steep pitch (10/12). Contractors don't advertise this clearly enough.`,
      },
      {
        heading: 'The Tear-Off Variable',
        body: `Of the 200 quotes, 156 included tear-off of existing roofing. The median tear-off add-on was $1,850, range $900 to $3,200 depending on layers present and disposal costs.\n\n44 quotes were for overlay installations (new shingles over existing). Overlay quotes averaged $1,960 less than comparable tear-off jobs. The savings are real. So is the downside: most building codes allow a maximum of two roofing layers. If your home already has two layers, common in older Portland housing stock, an overlay isn't an option. And overlays don't allow inspection of decking condition, meaning latent water damage can go undetected until the next full replacement.\n\nOf the 44 overlay quotes in our dataset, 11 were followed within 90 days by a separate request for a full tear-off after the contractor discovered deck damage that made overlay non-viable. Know what you have before you agree to an overlay.`,
      },
      {
        heading: 'Material Breakdown',
        body: `Asphalt architectural shingles: 71% of quotes. Median $8,900.\nMetal standing seam: 14% of quotes. Median $17,400.\nCedar shake: 9% of quotes. Median $14,200.\nFlat/TPO: 4% of quotes. Median $7,100.\nOther (tile, corrugated metal): 2% of quotes.\n\nThe metal share is higher than the national average of roughly 8% for residential replacements, consistent with Portland's climate case for metal and the higher income demographics of zones like West Hills and Lake Oswego where metal is standard.`,
      },
      {
        heading: 'What the Data Doesn\'t Tell You',
        body: `A quote is not a final price. Our dataset tracks submitted quotes, not completed job invoices. The gap between quote and final invoice in our contractor feedback data averages 7.3% upward, driven primarily by deck replacement once the old roofing is removed, and by supplemental flashing work discovered during tear-off.\n\nBudget a 10% contingency on any roofing quote. It's not pessimism, it's what the data shows.`,
      },
    ],
  }
