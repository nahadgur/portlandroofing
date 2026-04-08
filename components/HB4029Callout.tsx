import ScheduledContent from '@/components/ScheduledContent';

export default function HB4029Callout() {
  return (
    <ScheduledContent showUntil="2026-06-05">
      <div
        className="rounded-lg border p-5"
        style={{
          background: '#F0F9FF',
          borderColor: '#BAE6FD',
        }}
      >
        <div className="flex gap-3">
          <span className="text-xl shrink-0">🏛</span>
          <div>
            <p
              className="text-sm font-bold mb-1"
              style={{ color: '#0C4A6E' }}
            >
              New Oregon Law: HB 4029 — Effective June 5, 2026
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#075985' }}>
              Oregon&apos;s first solar consumer protection law requires solar
              contractors to provide full written disclosures — including
              itemised costs and financing terms — before any sale or lease.
              If you&apos;re planning to re-roof ahead of a solar install,
              ask your contractor whether they work with HB 4029-compliant
              solar installers before signing anything.
            </p>
          </div>
        </div>
      </div>
    </ScheduledContent>
  );
}
