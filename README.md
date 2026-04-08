# Portland Roofings — V1

PDX roofing authority / lead gen marketplace. Next.js 14 App Router + TypeScript + Tailwind CSS.

## Quick Start

```bash
npm install
cp .env.local.example .env.local
# Edit .env.local with your real values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Domain Config

One place to update the domain:

```ts
// lib/config.ts
export const DOMAIN = 'portlandroofings.com' // ← swap here
```

Everything (metadata, canonical URLs, footer, OG tags) inherits from this.

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_GAS_WEBHOOK_URL` | Google Apps Script URL for lead capture → Google Sheets |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 Measurement ID (e.g. `G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_BASE_URL` | Production URL (e.g. `https://portlandroofings.com`) |

## Google Apps Script Setup

1. Go to [script.google.com](https://script.google.com)
2. Create a new project — paste this:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
  const data  = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.timestamp, data.name, data.phone, data.email,
    data.zip, data.material, data.urgency, data.source
  ]);
  return ContentService.createTextOutput('ok');
}
```

3. Deploy as Web App → Anyone can access
4. Copy the URL → paste into `NEXT_PUBLIC_GAS_WEBHOOK_URL`

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, ticker, data bar, 50 neighborhoods, price index, contractors |
| `/portland/[neighborhood]` | 50 static neighborhood pages (generated from `lib/neighborhoods.ts`) |
| `/pdx-cost-index` | Full cost index — all 50 zones + material comparison table |

## Adding Neighborhoods

Edit `lib/neighborhoods.ts` — add to the array. `generateStaticParams` picks it up automatically on next build.

## Deploy to Vercel

```bash
# Push to GitHub, connect repo in Vercel
# Add env vars in Vercel dashboard
# Deploy
```

No other config needed — Next.js 14 static generation handles the 50 neighborhood pages at build time.
