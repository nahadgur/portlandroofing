export interface Contractor {
  id:              string
  rank:            string
  name:            string
  area:            string
  ccbNumber:       string
  ccbStatus:       'active' | 'pending' | 'vetting'
  ccbLastVerified: string | null   // ISO date — null if not yet verified
  liabilityAmount: string
  specialities:    string[]
  responseTime:    string | null
  status:          'vetting' | 'coming'
  cta:             string
  note?:           string
}

// ─── Oregon CCB search URL helper ─────────────────────────────────────
// Sends homeowner directly to the CCB result for this contractor.
// We never claim to show live CCB data — we link to the source.
export function ccbVerifyUrl(ccbNumber: string): string {
  const encoded = encodeURIComponent(ccbNumber)
  return `https://search.ccb.state.or.us/search/action/action.cfm?sid=&currentPage=results&displaycount=25&licensenumber=${encoded}`
}

// ─── Contractor data ───────────────────────────────────────────────────
// ccbNumber: use real number once vetting is complete.
// Placeholder numbers used here — update before going live.
export const contractors: Contractor[] = [
  {
    id:              'premier-nw',
    rank:            '01',
    name:            'Premier Northwest Roofing',
    area:            'SE Portland · Lake Oswego · West Linn',
    ccbNumber:       '000000',    // ← replace with real CCB # before launch
    ccbStatus:       'vetting',
    ccbLastVerified: null,
    liabilityAmount: '$2,000,000',
    specialities:    ['Asphalt', 'Metal', 'Cedar Shake'],
    responseTime:    '2.4 hours',
    status:          'vetting',
    cta:             'Join Waitlist for This Slot →',
    note:            'Vetting in progress. CCB number confirmed active — full 47-point review underway.',
  },
  {
    id:              'pacific-crest',
    rank:            '02',
    name:            'Pacific Crest Roofing',
    area:            'Pearl District · NW District · Irvington',
    ccbNumber:       '000000',
    ccbStatus:       'pending',
    ccbLastVerified: null,
    liabilityAmount: 'Verification pending',
    specialities:    ['Historic & Flat Roofs', 'TPO'],
    responseTime:    null,
    status:          'coming',
    cta:             'Notify Me →',
  },
  {
    id:              'cascade-ridge',
    rank:            '03',
    name:            'Cascade Ridge Roofing',
    area:            'Beaverton · Hillsboro · Tigard',
    ccbNumber:       '000000',
    ccbStatus:       'pending',
    ccbLastVerified: null,
    liabilityAmount: 'Verification pending',
    specialities:    ['Residential New Build', 'Asphalt'],
    responseTime:    null,
    status:          'coming',
    cta:             'Notify Me →',
  },
]
