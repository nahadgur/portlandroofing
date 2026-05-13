import { SITE } from './config';

const STORAGE_KEY = 'pdx_roof_attr_v1';
const TRACKED_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
  'msclkid',
] as const;

export type Attribution = Partial<Record<(typeof TRACKED_KEYS)[number], string>>;

export function captureAttribution(): Attribution {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const incoming: Attribution = {};
  for (const key of TRACKED_KEYS) {
    const v = params.get(key);
    if (v) incoming[key] = v;
  }

  let stored: Attribution = {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) stored = JSON.parse(raw) as Attribution;
  } catch {}

  const merged = { ...stored, ...incoming };
  if (Object.keys(incoming).length > 0) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch {}
  }
  return merged;
}

export interface PartnerLeadPayload {
  /** ZIP code, required. Passed to partner as sub5. */
  zip: string;
  /** Page source (e.g., "homepage", "neighborhood-pearl-district", "service-roof-replacement").
   *  Passed to partner as sub3 for conversion-source tracking. */
  source?: string;
  /** Material selection from multi-step form (asphalt / metal / cedar / flat). */
  material?: string;
  /** Urgency selection from multi-step form (leak / soon / summer / quote). */
  urgency?: string;
}

/**
 * Build the Digipeak partner redirect URL.
 *
 * Partner-defined slot contract (set 2026-05-13):
 *   uid       = SITE.partnerOffer.uid (account id, "760")
 *   source_id = utm_source || 'google'
 *   sub1      = utm_medium || 'search'
 *   sub2      = SITE.partnerOffer.siteId ("portlandorroofing")
 *   sub3      = page source (homepage / neighborhood-* / service-*)
 *   sub4      = material+urgency context if multi-step form present
 *   sub5      = ZIP code (dynamic, from form)
 *   click_id  = gclid || fbclid || msclkid (whichever is present)
 */
export function buildPartnerRedirect(payload: PartnerLeadPayload): string {
  const attr = captureAttribution();
  const url = new URL(SITE.partnerOffer.base);
  url.searchParams.set('uid', SITE.partnerOffer.uid);
  url.searchParams.set('source_id', attr.utm_source || SITE.partnerOffer.sourceId);
  url.searchParams.set('sub1', attr.utm_medium || 'search');
  url.searchParams.set('sub2', SITE.partnerOffer.siteId);
  url.searchParams.set('sub3', payload.source || 'homepage');
  // sub4: combine material + urgency into one slot if both present, fall back to either alone, or utm_campaign
  const mu = [payload.material, payload.urgency].filter(Boolean).join(':');
  url.searchParams.set('sub4', mu || attr.utm_campaign || '');
  url.searchParams.set('sub5', payload.zip);
  const click = attr.gclid || attr.fbclid || attr.msclkid;
  if (click) url.searchParams.set('click_id', click);
  return url.toString();
}

export function fireGenerateLeadEvent(payload: PartnerLeadPayload): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[]; gtag?: (...args: unknown[]) => void };
  try {
    if (typeof w.gtag === 'function') {
      w.gtag('event', 'generate_lead', {
        zip: payload.zip,
        source: payload.source,
        material: payload.material,
        urgency: payload.urgency,
        site_id: SITE.partnerOffer.siteId,
      });
    } else if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event: 'generate_lead', ...payload, site_id: SITE.partnerOffer.siteId });
    }
  } catch {}
}
