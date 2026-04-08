import {
  ShieldCheck, CloudRain, Users, Clock,
  FileCheck, Star, Zap, BadgeCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Badge {
  icon:   LucideIcon
  label:  string
  detail: string
}

const BADGES: Badge[] = [
  {
    icon:   ShieldCheck,
    label:  'CCB Verified',
    detail: 'Oregon Construction Contractors Board licence checked',
  },
  {
    icon:   FileCheck,
    label:  '47-Point Vetting',
    detail: 'Every contractor passes licensing, insurance & review audit',
  },
  {
    icon:   CloudRain,
    label:  'PNW Weather Audit',
    detail: 'All crews evaluated on Portland\'s 144-rain-day conditions',
  },
  {
    icon:   Users,
    label:  'Portland-Based',
    detail: '100% local crews — no out-of-state storm chasers',
  },
  {
    icon:   Clock,
    label:  '48h Response',
    detail: 'Matched quotes returned within two business days',
  },
  {
    icon:   Zap,
    label:  'Emergency Ready',
    detail: '24/7 emergency tarping and repair dispatch available',
  },
  {
    icon:   BadgeCheck,
    label:  'Insured & Bonded',
    detail: 'General liability minimum $1M · Workers\' comp verified',
  },
  {
    icon:   Star,
    label:  'Review Audited',
    detail: 'Google review velocity and authenticity independently checked',
  },
]

interface TrustStripProps {
  /** Pass urgency='high' for emergency-service pages to surface the 24/7 badge first */
  urgency?: 'high' | 'standard'
}

export default function TrustStrip({ urgency = 'standard' }: TrustStripProps) {
  // Surface emergency badge first for urgent services
  const badges = urgency === 'high'
    ? [BADGES[5], ...BADGES.filter((_, i) => i !== 5)]
    : BADGES

  const m = { fontFamily: 'var(--font-space-mono)' }    as const
  const b = { fontFamily: 'var(--font-barlow)' }         as const
  const c = { fontFamily: 'var(--font-barlow-cond)' }    as const

  return (
    <div style={{
      background:  '#0A0B0D',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '0',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
    }}>
      {/* Eyebrow */}
      <div style={{
        padding: '0.8rem 2rem 0',
        ...m, fontSize: '0.58rem',
        color: 'rgba(255,255,255,0.25)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}>
        Portland Roofings Contractor Standard
      </div>

      {/* Badges row */}
      <div style={{
        display: 'flex',
        gap: '0',
        minWidth: 'max-content',  // enables horizontal scroll on mobile
      }}>
        {badges.map(({ icon: Icon, label, detail }, i) => (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              padding: '1rem 1.6rem 1.1rem',
              borderRight: i < badges.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              minWidth: '200px',
              maxWidth: '240px',
            }}
          >
            <Icon
              size={18}
              color="#F5A623"
              strokeWidth={1.75}
              style={{ flexShrink: 0, marginTop: '2px' }}
            />
            <div>
              <div style={{
                ...c,
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '0.06em',
                marginBottom: '0.2rem',
                whiteSpace: 'nowrap',
              }}>
                {label}
              </div>
              <div style={{
                ...b,
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.38)',
                lineHeight: 1.5,
                fontWeight: 300,
              }}>
                {detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
