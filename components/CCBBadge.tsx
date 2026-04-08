'use client'

import { ccbVerifyUrl } from '@/lib/contractors'

interface Props {
  ccbNumber:       string
  ccbStatus:       'active' | 'pending' | 'vetting'
  ccbLastVerified: string | null
  compact?:        boolean   // smaller version for tight spaces
}

const statusConfig = {
  active:  { label: 'CCB Verified',            color: '#2ECC71', bg: 'rgba(46,204,113,0.08)',  border: 'rgba(46,204,113,0.3)'  },
  vetting: { label: 'CCB Active — Review Open', color: '#F5A623', bg: 'rgba(245,166,35,0.08)', border: 'rgba(245,166,35,0.3)' },
  pending: { label: 'CCB Verification Pending', color: '#7A7F8E', bg: 'rgba(122,127,142,0.06)', border: 'rgba(122,127,142,0.3)' },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function CCBBadge({ ccbNumber, ccbStatus, ccbLastVerified, compact = false }: Props) {

  // ⚠️  BEFORE LAUNCH: Replace placeholder CCB numbers in lib/contractors.ts
  // Any ccbNumber of '000000' is a placeholder — do not go live with these.
  if (process.env.NODE_ENV === 'development' && ccbNumber === '000000') {
    console.warn('[CCBBadge] Placeholder CCB number detected. Update lib/contractors.ts before launch.')
  }

  const cfg = statusConfig[ccbStatus]

  if (compact) {
    return (
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.25rem 0.6rem',
        background: cfg.bg, border: `1px solid ${cfg.border}`,
      }}>
        <span style={{
          display: 'inline-block', width: 6, height: 6,
          borderRadius: '50%', background: cfg.color, flexShrink: 0,
        }} />
        <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.6rem', color: cfg.color, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Oregon CCB #{ccbNumber}
        </span>
        {ccbStatus !== 'pending' && (
          <a
            href={ccbVerifyUrl(ccbNumber)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.6rem', color: cfg.color, textDecoration: 'underline', textDecorationColor: `${cfg.color}66`, textUnderlineOffset: '2px' }}
          >
            Verify ↗
          </a>
        )}
      </div>
    )
  }

  return (
    <div style={{
      padding: '1rem 1.2rem',
      background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      borderLeft: `3px solid ${cfg.color}`,
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: cfg.color, flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: cfg.color, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {cfg.label}
          </span>
        </div>
        {ccbStatus !== 'pending' && (
          <a
            href={ccbVerifyUrl(ccbNumber)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-barlow-cond)', fontSize: '0.75rem',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: cfg.color, textDecoration: 'none',
              padding: '0.2rem 0.6rem', border: `1px solid ${cfg.border}`,
              background: 'transparent', whiteSpace: 'nowrap',
            }}
          >
            Verify at oregon.gov/ccb ↗
          </a>
        )}
      </div>

      {/* CCB number */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.4rem' }}>
        <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: 'var(--muted)', letterSpacing: '0.08em' }}>Oregon CCB #</span>
        <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.1rem', color: 'var(--text)', letterSpacing: '0.05em' }}>
          {ccbStatus === 'pending' ? '— PENDING —' : ccbNumber}
        </span>
      </div>

      {/* Last verified / disclaimer */}
      <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.6rem', color: 'var(--muted)', lineHeight: 1.5 }}>
        {ccbStatus === 'active' && ccbLastVerified
          ? `Last verified: ${formatDate(ccbLastVerified)} · Click above to confirm current status directly with the Oregon CCB.`
          : ccbStatus === 'vetting'
          ? 'CCB number confirmed active during intake. Full verification in progress. Click above to check current status.'
          : 'CCB verification not yet initiated. This slot is reserved pending our vetting process.'
        }
      </div>
    </div>
  )
}
