// Read-only crawl of the rendered production site. Never submits forms.
// node scripts/verify-content.mjs http://127.0.0.1:3107 [report.json]
import assert from 'node:assert/strict'
import { writeFile } from 'node:fs/promises'
const base = process.argv[2] ?? 'http://127.0.0.1:3107'
const production = 'https://www.portlandorroofing.com'
const normalize = path => `${path.replace(/\/+$/, '')}/`
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text()
const sitemapPaths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname)
const queue = ['/']
const seen = new Map()
const edges = []
const banned = /47.point|48.hour response|48h response|CCB.verified contractors|vetted Portland contractors|top 1%|144\+? (?:annual )?rain days|200 (?:real )?(?:roofing )?quotes|23% of (?:PDX|Portland) deals|permit difficulty\s*[:·]\s*\d|cost intelligence|Q2 2026 Portland metro contractor data|ALL CLEAR/i
while(queue.length){
  const path=queue.shift()
  if(seen.has(path))continue
  const response=await fetch(new URL(path,base),{redirect:'manual'})
  assert.equal(response.status,200,`Broken or redirected destination ${path}: ${response.status}`)
  const html=await response.text()
  const clean=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'')
  const text=clean.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ')
  assert.ok(!banned.test(text),`Unsupported claim on ${path}: ${text.match(banned)?.[0]}`)
  assert.ok(!/\[[^\]]+\]\((?:\/|https?:)/.test(text),`Unrendered Markdown link on ${path}`)
  assert.ok(!/"@type"\s*:\s*"(?:RoofingContractor|AggregateRating)"/.test(html),`Unsupported business schema on ${path}`)
  assert.equal((clean.match(/<h1\b/g)??[]).length,1,`Expected one H1 on ${path}`)
  const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
  assert.equal(canonical,`${production}${path}`,`Noncanonical page ${path}`)
  const article=clean.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1]??''
  const links=[...clean.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)]
  for(const [,href,label] of links){
    if(!href.startsWith('/')&&!href.startsWith(production))continue
    const url=new URL(href,production)
    if(url.origin!==production||/\.[a-z\d]{2,5}$/i.test(url.pathname))continue
    const target=normalize(url.pathname)
    if(target!==path)edges.push({from:path,to:target,anchor:label.replace(/<[^>]+>/g,'').trim(),inArticle:false})
    if(!seen.has(target))queue.push(target)
  }
  for(const [,href,label] of article.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    if(!href.startsWith('/')&&!href.startsWith(production))continue
    const url=new URL(href,production)
    if(url.origin===production&&normalize(url.pathname)!==path)edges.push({from:path,to:normalize(url.pathname),anchor:label.replace(/<[^>]+>/g,'').trim(),inArticle:true})
  }
  seen.set(path,{path,articleLinks:edges.filter(e=>e.from===path&&e.inArticle).length})
}
for(const path of sitemapPaths)assert.ok(seen.has(path),`Sitemap URL unreachable from homepage: ${path}`)
for(const {path,articleLinks} of seen.values()){
  if(/^\/(?:portland|services)\/[^/]+\/$/.test(path))assert.ok(articleLinks>=3,`Missing contextual navigation on ${path}`)
}
const pairs=[
 ['/services/metal-roofing/','/guides/solar-ready-roofing-oregon-incentives/'],
 ['/portland/pearl-district/','/services/flat-roofing/'],
 ['/portland/irvington/','/guides/portland-historic-district-roofing-codes/'],
 ['/blog/do-you-need-a-permit-to-replace-a-roof-in-portland/','/guides/how-to-choose-roofing-contractor-oregon/'],
 ['/guides/how-to-choose-roofing-contractor-oregon/','/blog/do-you-need-a-permit-to-replace-a-roof-in-portland/'],
]
for(const [from,to] of pairs)assert.ok(edges.some(e=>e.from===from&&e.to===to&&e.inArticle),`Missing contextual link ${from} -> ${to}`)
const articleEdges=edges.filter(e=>e.inArticle)
const report={result:'passed',pages:seen.size,sitemapUrls:sitemapPaths.length,uniqueInternalDestinations:seen.size,articleLinks:articleEdges.length,uniqueArticleConnections:new Set(articleEdges.map(e=>`${e.from}>${e.to}`)).size,pagesChecked:[...seen.keys()],contextualLinks:articleEdges}
if(process.argv[3])await writeFile(process.argv[3],JSON.stringify(report,null,2))
console.log(JSON.stringify({...report,pagesChecked:undefined,contextualLinks:undefined},null,2))
