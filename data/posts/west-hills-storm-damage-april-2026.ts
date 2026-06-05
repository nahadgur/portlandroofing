import type { Post } from '@/lib/posts'

export const post: Post = {
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
        body: `The wind event that moved through the Portland metro on April 5th registered 58 mph gusts at the West Hills monitoring station, the strongest recorded in the area since February 2023. If you live in the West Hills, Council Crest, Alameda Ridge, or Forest Park corridor, here is what you should be looking at right now.`,
      },
      {
        heading: 'What 58 mph Wind Does to Different Roof Types',
        body: `Standing-seam metal: Minimal risk. Continuously interlocked panels with no exposed fasteners handle this wind level without meaningful damage in properly installed systems. If your metal roof is 10 years old or newer and was installed correctly, you're likely fine.\n\nCedar shake: Moderate to high risk. Individual shakes are held by two nails each. At 50+ mph, older shakes, particularly those with any existing cracking or cupping, can lift, twist, or separate entirely. The failure mode is often not visible from the ground: the shake stays roughly in place but breaks its seal, allowing water under the course above.\n\nAsphalt architectural shingles: Moderate risk. The primary failure is seal strip breakage, the adhesive strip that bonds each shingle to the one below it loses adhesion. Again, the shingle looks intact from the ground. It isn't.`,
      },
      {
        heading: 'Where We\'re Seeing the Most Reported Damage',
        body: `Based on inspection requests submitted through our platform in the 48 hours following the event, the highest concentration of reported damage is in:\n\nWest Hills (97225, 97221): Cedar shake failures and exposed decking at ridge lines. Several reports of gutters detached from fascia by debris impact.\n\nCouncil Crest (97201 elevated): Ridge cap displacement on asphalt roofs. One confirmed structural brace failure on a detached garage.\n\nAlameda Ridge (97212): Wind-seal failures on asphalt roofs installed 2008–2015. This cohort is at the age where seal strip adhesion is marginal under high-wind stress.\n\nForest Park corridor (97229): Mixed reports. Newer homes with metal roofing largely unaffected. Older cedar shake and asphalt properties showing damage consistent with the West Hills pattern.`,
      },
      {
        heading: 'What to Do Now',
        body: `Do not get on your roof. If you have a cedar shake or older asphalt roof in any of the zones above, call a licensed Oregon CCB contractor for an inspection before the next rain event, current forecasts show rain returning Wednesday.\n\nDocument first. Before any contractor accesses your roof, photograph from the ground, from the attic (check for daylight and fresh water stains on rafters), and around the exterior. Your insurance claim depends on baseline documentation.\n\nCall your insurer. You have a notification obligation under most Oregon homeowner policies. Call today and get a claim number even if you're not sure whether the damage is significant enough to claim. Notification protects your options, you can always decide not to proceed with a claim once you have an inspection report.\n\nUse licensed contractors only. After every Portland wind event, out-of-state operators without Oregon CCB licences canvass affected neighbourhoods. Do not sign anything before verifying CCB status at oregon.gov/ccb.`,
      },
      {
        body: `Emergency inspection slots through our vetted contractor network are available now. Lead times for full replacements following this event will extend significantly over the coming weeks as the backlog builds, homeowners who secure contractor relationships early will have considerably more flexibility on scheduling and material choice.`,
      },
    ],
  }
