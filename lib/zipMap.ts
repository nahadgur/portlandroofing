/**
 * Maps Portland metro zip codes to the closest kept neighborhood market.
 *
 * The 10 kept neighborhoods (with primary zips) are:
 *   pearl-district (97209), hawthorne (97214), sellwood-moreland (97202),
 *   eastmoreland (97202), alberta-arts-district (97211), irvington (97212),
 *   st-johns (97203), west-hills (97225), lake-oswego (97034), beaverton (97005)
 *
 * Other Portland metro zips are mapped to whichever kept neighborhood best
 * represents their housing stock + cost structure + permit environment.
 */

export const zipToNeighborhood: Record<string, string> = {
  // Inner NW / Central City
  '97201': 'pearl-district',  // SW Portland / South Waterfront
  '97204': 'pearl-district',  // Downtown
  '97205': 'pearl-district',  // Old Town / W Burnside
  '97208': 'pearl-district',
  '97209': 'pearl-district',  // Pearl primary
  '97210': 'pearl-district',  // Nob Hill / NW District
  '97231': 'st-johns',        // Linnton / NW industrial fringe

  // SE Portland (inner & extended)
  '97202': 'sellwood-moreland', // Sellwood / Eastmoreland / Westmoreland
  '97214': 'hawthorne',         // Inner SE Hawthorne / Belmont / Buckman
  '97215': 'hawthorne',         // Mt Tabor / SE Stark
  '97206': 'hawthorne',         // Foster-Powell / Mt Scott
  '97266': 'hawthorne',         // Lents / Powellhurst
  '97236': 'hawthorne',         // Pleasant Valley
  '97233': 'hawthorne',         // Outer SE
  '97216': 'hawthorne',         // Powellhurst-Gilbert

  // NE Portland
  '97211': 'alberta-arts-district', // Alberta / Concordia / Cully
  '97212': 'irvington',             // Irvington / Alameda / Beaumont primary
  '97213': 'irvington',             // Hollywood / Roseway
  '97218': 'alberta-arts-district', // Cully / outer NE
  '97232': 'irvington',             // Lloyd / Sullivan's Gulch
  '97220': 'alberta-arts-district', // Parkrose

  // N Portland
  '97203': 'st-johns',  // St. Johns / Cathedral Park / University Park / Portsmouth primary
  '97217': 'st-johns',  // Overlook / Mississippi / Piedmont / Kenton

  // SW / West Portland
  '97219': 'west-hills', // Multnomah Village / Hillsdale / Capitol Hill
  '97221': 'west-hills', // SW Hills / Council Crest
  '97225': 'west-hills', // Sylvan-Highlands primary
  '97229': 'west-hills', // Forest Park / Bethany overlap

  // Washington Co. (Beaverton catchment)
  '97005': 'beaverton', // Beaverton primary
  '97003': 'beaverton', // Aloha
  '97006': 'beaverton', // Hillsboro / Aloha
  '97007': 'beaverton', // South Beaverton / Aloha
  '97008': 'beaverton', // Beaverton / Garden Home
  '97123': 'beaverton', // Hillsboro
  '97124': 'beaverton', // Hillsboro Orenco
  '97140': 'beaverton', // Sherwood
  '97062': 'beaverton', // Tualatin
  '97070': 'beaverton', // Wilsonville
  '97223': 'beaverton', // Tigard
  '97224': 'beaverton', // Tigard / Bull Mountain
  '97116': 'beaverton', // Forest Grove
  '97113': 'beaverton', // Cornelius
  '97133': 'beaverton', // North Plains
  '97132': 'beaverton', // Newberg

  // Clackamas Co. (Lake Oswego catchment)
  '97034': 'lake-oswego', // Lake Oswego primary
  '97035': 'lake-oswego', // Lake Oswego / Lake Grove
  '97068': 'lake-oswego', // West Linn
  '97045': 'lake-oswego', // Oregon City
  '97222': 'lake-oswego', // Milwaukie
  '97267': 'lake-oswego', // Oak Grove

  // E Multnomah / Gresham orbit (defaults to Hawthorne for east-wind exposure profile)
  '97030': 'hawthorne', // Gresham
  '97080': 'hawthorne', // Gresham / Boring
  '97060': 'hawthorne', // Troutdale / Fairview
  '97024': 'hawthorne', // Fairview
  '97019': 'hawthorne', // Corbett
}

export function getNeighborhoodForZip(zip: string): string | null {
  const cleaned = zip.trim().slice(0, 5)
  return zipToNeighborhood[cleaned] ?? null
}

/** Wind exposure rating per kept neighborhood — used by storm-tracker and wind-risk calculator. */
export const windExposureByNeighborhood: Record<string, {
  score: 1 | 2 | 3 | 4 | 5
  label: string
  detail: string
  recommendedSpec: string
}> = {
  'pearl-district':         { score: 3, label: 'MODERATE',     detail: 'Building-canyon effects can amplify or buffer depending on direction. Flat-roof parapet detailing is the wind-vulnerable point.',                                  recommendedSpec: '60-mil TPO with heat-welded parapet flashing rebuild' },
  'hawthorne':              { score: 3, label: 'MODERATE',     detail: 'Canopy reduces wind speed but tree-fall risk is real. Eastern Hawthorne (SE 50th+) sees significant east-wind exposure.',                                  recommendedSpec: 'AR-granule architectural with six-nail attachment, 110 mph upgrade for east-side properties' },
  'sellwood-moreland':      { score: 2, label: 'LOW-MODERATE', detail: 'Tree canopy buffer; wind exposure modest. Tree-fall damage risk during major events is the primary concern.',                                                recommendedSpec: '90 mph rating adequate for most properties; six-nail attachment standard' },
  'eastmoreland':           { score: 2, label: 'LOW-MODERATE', detail: 'Heavy canopy reduces wind speed; tree-fall risk concentrates damage. Cedar shake roofs especially vulnerable to combined ice+wind loading.',                  recommendedSpec: 'Standard wind rating; pre-fall tree assessment essential; cedar requires fire retardant treatment' },
  'alberta-arts-district':  { score: 3, label: 'MODERATE',     detail: 'NE Portland exposure to frontal systems. Streets between NE Alberta and NE Prescott see meaningful east-wind exposure during major events.',                  recommendedSpec: 'AR-granule architectural with six-nail attachment; 110 mph upgrade for east-edge properties' },
  'irvington':              { score: 4, label: 'HIGH',         detail: 'Alameda Ridge ridge-line exposure plus east-wind corridor. View-corridor properties take direct hits during major events.',                                   recommendedSpec: '110 mph rating + concealed-fastener metal preferred for ridge homes' },
  'st-johns':               { score: 2, label: 'LOW-MODERATE', detail: 'Lower elevation, partial Forest Park buffer. 30-40 mph sustained typical for major events.',                                                                  recommendedSpec: '90 mph rating adequate for most properties; 110 mph upgrade affordable insurance' },
  'west-hills':             { score: 5, label: 'MAXIMUM',      detail: 'Hilltop and ridge exposure to all wind directions. Sustained 30-50 mph; 70+ mph gusts during major events. Steep-pitch hillside complicates emergency tarp.', recommendedSpec: 'Standing seam metal with 110 mph rating; concealed-fastener system; snow guards above pedestrian zones' },
  'lake-oswego':            { score: 3, label: 'MODERATE',     detail: 'Hillside properties around lake see modest exposure; flat properties below sheltered. Ridge homes catch direct wind.',                                       recommendedSpec: 'Hillside homes: 110 mph + concealed-fastener metal; flat lots: 90 mph adequate' },
  'beaverton':              { score: 2, label: 'LOW-MODERATE', detail: 'West-of-corridor location buffers most east-wind events. Frontal systems still produce 30-45 mph events.',                                                    recommendedSpec: '90 mph rating standard; high-canopy lots benefit from 110 mph upgrade' },
}
