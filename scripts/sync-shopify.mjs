// Pulls the shop collection from Shopify into lib/shop/catalog.json.
// Runs before every build (npm run build) and on demand: npm run sync:shopify
// If Shopify can't be reached, the last committed catalog is kept so builds never break.

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const config = JSON.parse(readFileSync(path.join(root, 'lib/shop/shopify.json'), 'utf8'))
const out = path.join(root, 'lib/shop/catalog.json')

const CATEGORY = { 'Crew Kits': 'kits', 'Holiday Gifts': 'gifts', 'Single Items': 'single', 'Winter Kits': 'winter', Packs: 'packs' }

const QUERY = `query($id: ID!, $after: String) {
  collection(id: $id) {
    products(first: 100, after: $after) {
      pageInfo { hasNextPage endCursor }
      nodes {
        id handle title productType tags availableForSale
        options { name values }
        images(first: 10) { nodes { url width height } }
        variants(first: 100) { nodes { id availableForSale price { amount } selectedOptions { name value } image { url } } }
      }
    }
  }
}`

async function fetchAll() {
  const nodes = []
  let after = null
  do {
    const res = await fetch(`https://${config.domain}/api/${config.apiVersion}/graphql.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': config.storefrontToken },
      body: JSON.stringify({ query: QUERY, variables: { id: `gid://shopify/Collection/${config.collectionId}`, after } }),
    })
    const json = await res.json()
    if (!res.ok || json.errors) throw new Error(JSON.stringify(json.errors ?? res.status))
    const page = json.data.collection?.products
    if (!page) throw new Error('Collection not found')
    nodes.push(...page.nodes)
    after = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null
  } while (after)
  return nodes
}

// Promo graphics with prices or partner branding printed on them stay off the site (see skipImages in shopify.json).
const skip = (config.skipImages ?? []).map((r) => new RegExp(r, 'i'))
const keepImage = (url) => !skip.some((r) => r.test(url.split('/files/').pop().split('?')[0]))

const tag = (tags, key) => tags.filter((t) => t.startsWith(`${key}:`)).map((t) => t.slice(key.length + 1).trim())

function toProduct(n, typeCounts) {
  const types = tag(n.tags, 'type')
  // Products tagged with two types (e.g. Camo + Hats) file under the more common one.
  const type = types.sort((a, b) => (typeCounts[b] ?? 0) - (typeCounts[a] ?? 0))[0] ?? ''
  // Shopify gives single-variant products a placeholder "Title / Default Title" option.
  const options = n.options.filter((o) => !(o.name === 'Title' && o.values.length === 1 && o.values[0] === 'Default Title'))
  return {
    handle: n.handle,
    title: n.title,
    category: CATEGORY[n.productType] ?? (n.tags.includes('kit') ? 'kits' : 'single'),
    type,
    brand: tag(n.tags, 'brand')[0] ?? '',
    deco: tag(n.tags, 'deco')[0] ?? '',
    spec: tag(n.tags, 'line')[0] ?? '',
    family: tag(n.tags, 'family')[0] ?? '',
    featured: n.tags.includes('featured-kit'),
    women: n.tags.includes('women'),
    shopifyId: n.id,
    images: n.images.nodes.filter((i) => keepImage(i.url)).map((i) => ({ url: i.url, w: i.width, h: i.height })),
    options,
    variants: n.variants.nodes
      .filter((v) => v.availableForSale)
      .map((v) => ({
        id: v.id,
        options: options.map((o) => v.selectedOptions.find((s) => s.name === o.name)?.value ?? ''),
        price: Number(v.price.amount),
        ...(v.image && keepImage(v.image.url) ? { image: v.image.url } : {}),
      })),
  }
}

try {
  const nodes = (await fetchAll()).filter((n) => n.availableForSale)
  const typeCounts = {}
  nodes.forEach((n) => tag(n.tags, 'type').forEach((t) => (typeCounts[t] = (typeCounts[t] ?? 0) + 1)))
  const products = nodes.map((n) => toProduct(n, typeCounts)).filter((p) => p.variants.length)
  writeFileSync(out, JSON.stringify(products, null, 1) + '\n')
  const by = products.reduce((m, p) => ((m[p.category] = (m[p.category] ?? 0) + 1), m), {})
  console.log(`Shopify sync: ${products.length} products`, by)
} catch (err) {
  console.warn(`Shopify sync skipped, keeping the existing catalog: ${err.message}`)
}
