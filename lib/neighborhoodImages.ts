// Maps each neighborhood slug to its hero image
// Images live in /public/images/
// Groups: historic, luxury, mid, north, suburban

export function getNeighborhoodImage(slug: string): string {
  // Luxury / West Hills / Lake Oswego
  const luxury = [
    'west-hills','council-crest','forest-park','lake-oswego',
    'dunthorpe','portland-heights','southwest-hills',
  ]
  // Historic / Premium
  const historic = [
    'pearl-district','nw-district','irvington','alameda',
    "ladd's-addition",'laurelhurst','eastmoreland','sellwood-moreland',
    'georgian-heights','eastmoreland','arlington-heights',
  ]
  // Mid-range SE / inner
  const mid = [
    'hawthorne','division','belmont','buckman','richmond','woodstock',
    'sunnyside','mount-tabor','clinton','richmond','brooklyn',
    'foster-powell','lents','brentwood-darlington',
  ]
  // North / affordable
  const north = [
    'st-johns','arbor-lodge','kenton','portsmouth','university-park',
    'overlook','piedmont','woodlawn','humboldt','sabin',
  ]

  if (luxury.some(s => slug.includes(s)))   return '/images/hero-luxury-neighborhoods.jpeg'
  if (historic.some(s => slug.includes(s))) return '/images/hero-historic-neighborhoods.jpeg'
  if (north.some(s => slug.includes(s)))    return '/images/hero-north-neighborhoods.jpeg'
  if (mid.some(s => slug.includes(s)))      return '/images/hero-mid-neighborhoods.jpeg'

  // Suburban default (Beaverton, Gresham, Tigard, Hillsboro etc.)
  return '/images/hero-mid-neighborhoods.jpeg'
}

// Maps service slug to its hero image
export function getServiceImage(slug: string): string {
  const map: Record<string, string> = {
    'roof-replacement': '/images/hero-roof-replacement.jpeg',
    'roof-repair':      '/images/hero-roof-repair.jpeg',
    'metal-roofing':    '/images/hero-metal-roofing.jpeg',
    'cedar-shake-roofing': '/images/hero-cedar-roofing.jpeg',
    'flat-roofing':     '/images/hero-flat-roofing.jpeg',
  }
  return map[slug] ?? '/images/hero-roof-replacement.jpeg'
}

// Maps guide slug to its hero image
export function getGuideImage(slug: string): string {
  const map: Record<string, string> = {
    'metal-vs-asphalt-portland':       '/images/hero-guide-metal-asphalt.jpeg',
    'storm-damage-roofing-portland':   '/images/hero-guide-storm.jpeg',
    'portland-roofing-permits-guide':  '/images/hero-guide-permits.jpeg',
  }
  return map[slug] ?? '/images/hero-guides-hub.jpeg'
}

// Maps blog slug to its hero image
export function getBlogImage(slug: string): string {
  const map: Record<string, string> = {
    'portland-roofing-quote-data-2026':             '/images/hero-blog-quote-data.jpeg',
    'west-hills-storm-damage-april-2026':           '/images/hero-guide-storm.jpeg',
    'portland-neighborhoods-most-roof-replacements-2026': '/images/hero-cost-index.jpeg',
  }
  return map[slug] ?? '/images/hero-blog-hub.jpeg'
}
