// ── Paste this ADDITION at the bottom of your existing lib/neighborhoods.ts ──
// Do NOT replace the whole file — just append these lines

// Adjacent area map — defines which areas are geographically close
const ADJACENT_AREAS: Record<string, string[]> = {
  'Inner NW':       ['NW Portland', 'Inner NE', 'SW Portland'],
  'NW Portland':    ['Inner NW', 'West Portland', 'N Portland'],
  'SW Portland':    ['Inner NW', 'West Portland', 'Inner SE'],
  'West Portland':  ['SW Portland', 'NW Portland', 'Clackamas Co.'],
  'Inner SE':       ['Inner NE', 'SE Portland', 'SW Portland'],
  'SE Portland':    ['Inner SE', 'Clackamas Co.', 'E Multnomah Co.'],
  'Inner NE':       ['NE Portland', 'Inner SE', 'Inner NW'],
  'NE Portland':    ['Inner NE', 'N Portland', 'E Multnomah Co.'],
  'N Portland':     ['NE Portland', 'Inner NW', 'Washington Co.'],
  'E Multnomah Co.':['SE Portland', 'NE Portland', 'Clackamas Co.'],
  'Clackamas Co.':  ['SE Portland', 'E Multnomah Co.', 'West Portland'],
  'Washington Co.': ['NW Portland', 'N Portland', 'SW Portland'],
}

/**
 * Returns up to `limit` neighborhoods near `slug`.
 * Priority: (1) same area, (2) adjacent areas, (3) array proximity.
 * Always excludes the current slug.
 */
export function getNearbyNeighborhoods(slug: string, limit = 6): Neighborhood[] {
  const current = neighborhoods.find(n => n.slug === slug)
  if (!current) return neighborhoods.filter(n => n.slug !== slug).slice(0, limit)

  const others = neighborhoods.filter(n => n.slug !== slug)

  // 1. Same area — sorted by indexPct desc (premium first)
  const sameArea = others
    .filter(n => n.area === current.area)
    .sort((a, b) => b.indexPct - a.indexPct)

  if (sameArea.length >= limit) return sameArea.slice(0, limit)

  // 2. Adjacent areas
  const adjAreas = ADJACENT_AREAS[current.area] ?? []
  const adjacent = others
    .filter(n => adjAreas.includes(n.area) && !sameArea.find(s => s.slug === n.slug))
    .sort((a, b) => b.indexPct - a.indexPct)

  const combined = [...sameArea, ...adjacent]
  if (combined.length >= limit) return combined.slice(0, limit)

  // 3. Fill with array proximity
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
