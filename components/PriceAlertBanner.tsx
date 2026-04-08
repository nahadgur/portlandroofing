import Link from 'next/link';
import ScheduledContent from '@/components/ScheduledContent';

export default function PriceAlertBanner() {
  return (
    <ScheduledContent showUntil="2026-04-15">
      <div
        className="w-full px-4 py-3 text-sm"
        style={{ background: '#FEF3C7', borderBottom: '1px solid #F59E0B' }}
        role="alert"
      >
        <div className="content-wrap flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <span
            className="font-bold shrink-0"
            style={{ color: '#92400E' }}
          >
            ⚠ Market Alert — April 15, 2026:
          </span>
          <span style={{ color: '#78350F' }}>
            GAF, CertainTeed &amp; Atlas have confirmed 5–8% price increases on
            all residential shingles effective April 15. Oregon homeowners who
            contract before the deadline can lock in current pricing.
          </span>
          <Link
            href="/or-cost-index"
            className="shrink-0 font-semibold underline underline-offset-2 hover:opacity-80"
            style={{ color: '#92400E' }}
          >
            See 2026 Cost Index →
          </Link>
        </div>
      </div>
    </ScheduledContent>
  );
}
