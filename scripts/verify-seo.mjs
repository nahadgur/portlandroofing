// Run against a production build: node scripts/verify-seo.mjs http://127.0.0.1:3107
// Read-only HTTP checks; no analytics events or lead submissions.
import assert from 'node:assert/strict'

const base = process.argv[2] ?? 'http://127.0.0.1:3107'
const origin = 'https://www.portlandorroofing.com'
const permit = '/blog/do-you-need-a-permit-to-replace-a-roof-in-portland/'
let checks = 0
async function get(path, status = 200) {
  const response = await fetch(new URL(path, base), { redirect: 'manual' })
  assert.equal(response.status, status, `${path}: HTTP ${response.status}, expected ${status}`)
  checks++
  return response
}
function canonical(html) {
  return html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
}
function links(html) {
  return [...html.matchAll(/<a\b[^>]*href="([^"#]+)"/g)].map(match => match[1])
}

const sitemap = await (await get('/sitemap.xml')).text()
const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(match => match[1])
assert.ok(entries.length > 0, 'Sitemap is empty')
const urls = entries.map(entry => entry.match(/<loc>(.*?)<\/loc>/)[1])
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs')
for (const url of urls) {
  assert.ok(url.startsWith(`${origin}/`) && url.endsWith('/'), `Noncanonical sitemap URL: ${url}`)
  const html = await (await get(new URL(url).pathname)).text()
  assert.equal(canonical(html), url, `Canonical differs from sitemap: ${url}`)
}
const permitEntry = entries.find(entry => entry.includes(`${origin}${permit}`))
assert.match(permitEntry, /<lastmod>2026-10-02T00:00:00.000Z<\/lastmod>/)
assert.ok(!entries.find(entry => entry.includes(`<loc>${origin}/</loc>`)).includes('<lastmod>'), 'Homepage has an invented modification date')

const home = await (await get('/')).text()
const blogLinks = [...new Set(links(home).filter(path => path.startsWith('/blog/') && path !== '/blog/'))]
assert.equal(blogLinks.length, 3, 'Homepage should feature three published posts')
for (const path of blogLinks) await get(path.endsWith('/') ? path : `${path}/`)
const footer = home.match(/<footer\b[\s\S]*?<\/footer>/)?.[0]
assert.ok(footer, 'Footer missing')
const footerLinks = [...new Set(links(footer).filter(path => path.startsWith('/')))]
for (const path of footerLinks) await get(path)
assert.ok(footerLinks.includes(permit), 'Footer permit link missing')
assert.ok(footerLinks.includes('/tools/lifecycle-cost/'), 'Footer material tool link missing')
assert.ok(footerLinks.includes('/guides/storm-damage-roof-insurance-oregon/'), 'Footer storm link missing')
for (const service of ['roof-replacement', 'roof-repair', 'metal-roofing', 'cedar-shake-roofing', 'flat-roofing']) {
  assert.ok(links(home).includes(`/services/${service}/`), `Service shortcut missing: ${service}`)
}

const drafts = [
  'cleaning-gutters-before-portlands-rain-season',
  'how-often-to-inspect-a-roof-in-the-willamette-valley',
  'portland-roof-maintenance-checklist-by-season',
  'what-to-ask-before-you-sign-a-roofing-contract',
  'how-to-spot-a-storm-chaser-roofer-in-portland',
]
for (const slug of drafts) {
  assert.ok(!home.includes(`/blog/${slug}`), `Homepage exposes draft: ${slug}`)
  assert.ok(!sitemap.includes(`/blog/${slug}`), `Sitemap exposes draft: ${slug}`)
  await get(`/blog/${slug}/`, 404)
}

for (const [from, to] of [
  ['/guides/portland-roofing-permits-guide/', permit],
  ['/guides/storm-damage-roofing-portland/', '/guides/storm-damage-roof-insurance-oregon/'],
  ['/roof-repair/hawthorne/', '/portland/hawthorne/'],
  [permit.slice(0, -1), permit],
]) {
  const response = await get(from, 308)
  assert.equal(new URL(response.headers.get('location'), base).pathname, to, `Wrong redirect for ${from}`)
  await get(to) // The redirect must reach a 200 directly.
}

// Preserve URLs with GSC impressions, including the cost-index URL whose merge is deferred.
for (const path of ['/portland/pearl-district/', '/portland/alberta-arts-district/', '/portland/st-johns/', '/services/', '/guides/oregon-roof-maintenance-guide/', '/pdx-cost-index/sellwood-moreland/']) {
  const html = await (await get(path)).text()
  assert.equal(canonical(html), `${origin}${path}`)
}
const article = await (await get(permit)).text()
assert.match(article, /Published June 23, 2026/)
assert.match(article, /Updated October 2, 2026/)
assert.match(article, /property="article:published_time" content="2026-06-23"/)
assert.match(article, /property="article:modified_time" content="2026-10-02"/)
assert.ok(article.includes('https://www.portland.gov/ppd/residential-permitting/do-you-need-permit/residential-permits'))
assert.ok(!article.includes('Most full roof replacements in Portland need a building permit'))
console.log(JSON.stringify({ result: 'passed', httpChecks: checks, sitemapUrls: urls.length, homepagePosts: blogLinks.length, footerUrls: footerLinks.length, draftRoutes: drafts.length }, null, 2))
