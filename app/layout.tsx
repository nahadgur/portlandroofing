import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Bebas_Neue, Space_Mono, Barlow, Barlow_Condensed } from 'next/font/google'
import { SITE }       from '@/lib/config'
import StickyModal    from '@/components/StickyModal'
import StormBanner    from '@/components/StormBanner'
import './globals.css'

const bebasNeue       = Bebas_Neue({ weight:'400', subsets:['latin'], variable:'--font-bebas', display:'swap' })
const spaceMono       = Space_Mono({ weight:['400','700'], subsets:['latin'], variable:'--font-space-mono', display:'swap' })
const barlow          = Barlow({ weight:['300','400','500','600'], subsets:['latin'], variable:'--font-barlow', display:'swap' })
const barlowCondensed = Barlow_Condensed({ weight:['400','600','700'], subsets:['latin'], variable:'--font-barlow-cond', display:'swap' })

// ── Disable pinch-zoom / double-tap zoom on mobile ──────────────────────────
export const viewport: Viewport = {
  width:           'device-width',
  initialScale:    1,
  maximumScale:    1,
  userScalable:    false,
}

export const metadata: Metadata = {
  title:        { default: SITE.defaultTitle, template: `%s | ${SITE.name}` },
  description:  SITE.defaultDescription,
  metadataBase: new URL(SITE.baseUrl),
  openGraph:    { type:'website', siteName:SITE.name, title:SITE.defaultTitle, description:SITE.defaultDescription, url:SITE.baseUrl },
  twitter:      { card:'summary_large_image', site:SITE.twitter, title:SITE.defaultTitle, description:SITE.defaultDescription },
  robots:       { index:true, follow:true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={[bebasNeue.variable, spaceMono.variable, barlow.variable, barlowCondensed.variable].join(' ')}>
      <body>
        <StormBanner />
        {children}
        <StickyModal />

        {SITE.ga4 && SITE.ga4 !== 'G-XXXXXXXXXX' && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${SITE.ga4}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${SITE.ga4}');
            `}</Script>
          </>
        )}
      </body>
    </html>
  )
}
