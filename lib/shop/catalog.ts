import raw from './catalog.json'

export type Category = 'kits' | 'winter' | 'gifts' | 'single' | 'packs'

export type Option = { name: string; values: string[] }
export type Variant = { options: string[]; price: number }

export type Product = {
  handle: string
  title: string
  category: Category
  type: string
  brand: string
  deco: string
  spec: string
  options: Option[]
  variants: Variant[]
}

export type KitDetail = {
  badge?: string
  forWho: string
  contents: { qty: number; item: string; deco?: 'Embroidered' | 'Screen-printed' | 'Printed' }[]
  perks?: string[]
}

export const products = raw as Product[]

export const SHOP = {
  email: 'albert@curateddepartment.com',
  phone: '(951) 816-5260',
  phoneHref: 'tel:+19518165260',
  mockupDays: 1,
  turnaround: '7 to 10 business days',
  bigSizeUpcharge: 3,
  digitizingValue: 45,
}

// Contents for the core kits. Piece counts mirror the published kit lineup.
export const kitDetails: Record<string, KitDetail> = {
  'starter-kit-24': {
    forWho: 'New shops and owner-operators, 3 to 6 people',
    contents: [
      { qty: 6, item: 'T-shirts — performance or cotton' },
      { qty: 3, item: 'Long sleeves — performance or cotton' },
      { qty: 3, item: 'Hoodies — performance or cotton fleece' },
      { qty: 6, item: 'Port Authority polos', deco: 'Embroidered' },
      { qty: 6, item: 'Richardson 112 caps', deco: 'Embroidered' },
    ],
  },
  'crew-kit-48': {
    badge: 'Most Picked',
    forWho: 'Crews up to 8, two caps per person',
    contents: [
      { qty: 8, item: 'T-shirts — performance or cotton' },
      { qty: 8, item: 'Long sleeves — performance or cotton' },
      { qty: 8, item: 'Hoodies — performance or cotton fleece' },
      { qty: 8, item: 'Port Authority polos', deco: 'Embroidered' },
      { qty: 16, item: 'Richardson 112 caps', deco: 'Embroidered' },
    ],
  },
  'crew-kit-100': {
    forWho: 'Crews of 20 or more',
    contents: [
      { qty: 52, item: 'T-shirts — performance or cotton', deco: 'Screen-printed' },
      { qty: 24, item: 'Port Authority polos', deco: 'Embroidered' },
      { qty: 24, item: 'Richardson 112 caps', deco: 'Embroidered' },
    ],
    perks: ['Logo on the chest and back of every tee'],
  },
  'crew-kit-200': {
    badge: 'Best Value',
    forWho: 'Crews of 40 or more',
    contents: [
      { qty: 104, item: 'T-shirts — performance or cotton', deco: 'Screen-printed' },
      { qty: 48, item: 'Port Authority polos', deco: 'Embroidered' },
      { qty: 48, item: 'Richardson 112 caps', deco: 'Embroidered' },
    ],
    perks: ['$236 less than the same pieces bought one by one'],
  },
  'hi-vis-crew-pack-24': {
    forWho: 'Road, site and utility crews, 6 people',
    contents: [
      { qty: 18, item: 'CornerStone Class 2 safety tees', deco: 'Printed' },
      { qty: 6, item: 'CornerStone mesh zip safety vests', deco: 'Printed' },
    ],
    perks: ['Safety Yellow or Safety Orange', 'Logo on the left chest — never on the reflective tape'],
  },
  'comfy-kit-16': {
    forWho: '4 people — cold-month layers',
    contents: [
      { qty: 4, item: 'Comfort Colors heavyweight tees' },
      { qty: 4, item: 'Comfort Colors long sleeves' },
      { qty: 4, item: 'Independent midweight hoodies' },
      { qty: 4, item: 'Knit beanies', deco: 'Embroidered' },
    ],
  },
  'comfy-kit-32': {
    forWho: '8 people — cold-month layers',
    contents: [
      { qty: 8, item: 'Comfort Colors heavyweight tees' },
      { qty: 8, item: 'Comfort Colors long sleeves' },
      { qty: 8, item: 'Independent midweight hoodies' },
      { qty: 8, item: 'Knit beanies', deco: 'Embroidered' },
    ],
  },
  'comfy-kit-48': {
    forWho: '12 people — cold-month layers',
    contents: [
      { qty: 12, item: 'Comfort Colors heavyweight tees' },
      { qty: 12, item: 'Comfort Colors long sleeves' },
      { qty: 12, item: 'Independent midweight hoodies' },
      { qty: 12, item: 'Knit beanies', deco: 'Embroidered' },
    ],
  },
  'executive-package': {
    forWho: 'Owners, office and sales team',
    contents: [
      { qty: 12, item: 'OGIO Regain polos', deco: 'Embroidered' },
      { qty: 12, item: 'Caps, your style', deco: 'Embroidered' },
    ],
  },
}

export const CORE_KITS = ['starter-kit-24', 'crew-kit-48', 'crew-kit-100', 'crew-kit-200']
export const MORE_KITS = ['hi-vis-crew-pack-24', 'comfy-kit-16', 'executive-package']
export const SPOTLIGHT_KITS = ['hoodie-kit', 'crewneck-kit', 'premium-tee-kit']

export function getProduct(handle: string) {
  return products.find((p) => p.handle === handle)
}

export function byCategory(...cats: Category[]) {
  return products.filter((p) => cats.includes(p.category))
}

export function priceRange(p: Product) {
  const prices = p.variants.map((v) => v.price)
  return { min: Math.min(...prices), max: Math.max(...prices) }
}

export function findVariant(p: Product, selected: string[]) {
  return p.variants.find((v) => v.options.every((o, i) => o === selected[i])) ?? p.variants[0]
}

export const money = (n: number, cents = false) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: cents || n % 1 ? 2 : 0, maximumFractionDigits: 2 })

// ---- Single items: price per piece by order size ----

export type Tier = { min: number; max: number | null; price: number; label: string }

const QTY_OPTION = /^(Order size|Quantity)$/

export function isTiered(p: Product) {
  return p.options.length === 1 && QTY_OPTION.test(p.options[0].name)
}

export function tiers(p: Product): Tier[] {
  if (!isTiered(p)) return []
  return p.variants
    .map((v) => {
      const label = v.options[0]
      const nums = label.match(/\d+/g)?.map(Number) ?? [0]
      const open = /or more|\+/.test(label)
      return { min: nums[0], max: open ? null : nums[1] ?? nums[0], price: v.price, label }
    })
    .sort((a, b) => a.min - b.min)
}

export function minQty(p: Product) {
  const t = tiers(p)
  if (t.length) return t[0].min
  const m = p.spec.match(/(\d+)\s+minimum/)
  return m ? Number(m[1]) : 1
}

export function tierFor(p: Product, qty: number) {
  const t = tiers(p)
  return [...t].reverse().find((x) => qty >= x.min) ?? t[0]
}

// Pieces in a kit-style product, used for the "about $X a piece" line.
export function pieceCount(p: Product, selected: string[]) {
  const fromOption = selected.map((s) => s.match(/^(\d+)/)?.[1]).find(Boolean)
  if (fromOption) return Number(fromOption)
  const fromTitle = p.title.match(/(\d+)\s*$/)?.[1]
  if (fromTitle) return Number(fromTitle)
  const fromSpec = p.spec.match(/^(\d+)/)?.[1]
  return fromSpec ? Number(fromSpec) : 0
}

// ---- Garment icon mapping ----

export type Garment =
  | 'tee' | 'longsleeve' | 'hoodie' | 'crewneck' | 'polo' | 'cap' | 'beanie'
  | 'jacket' | 'vest' | 'quarterzip' | 'bag' | 'tumbler' | 'blanket' | 'kit'

export function garmentFor(p: Pick<Product, 'title' | 'type' | 'category'> & { spec?: string }): Garment {
  const g = matchGarment(`${p.title} ${p.type}`)
  // Gift sets and packs name the garment only in their spec line (e.g. "8 sling bags").
  const useSpec = g === 'kit' && p.spec && (p.category === 'gifts' || p.category === 'packs')
  return useSpec ? matchGarment(p.spec!) : g
}

function matchGarment(text: string): Garment {
  const t = text.toLowerCase()
  if (/tumbler|yeti/.test(t)) return 'tumbler'
  if (/blanket/.test(t)) return 'blanket'
  if (/backpack|sling|tote|travel|bag/.test(t)) return 'bag'
  if (/beanie/.test(t)) return 'beanie'
  if (/cap|hat|trucker|snapback|booney|bill/.test(t)) return 'cap'
  if (/vest/.test(t)) return 'vest'
  if (/quarter|1\/2|half-zip|half zip|layers/.test(t)) return 'quarterzip'
  if (/jacket|bomber|shell|rain|fleece jacket/.test(t)) return 'jacket'
  if (/polo/.test(t)) return 'polo'
  if (/hood/.test(t) && !/hooded long sleeve|hooded tee/.test(t)) return 'hoodie'
  if (/crew|sweatshirt|rugby/.test(t) && !/crew kit|crew pack/.test(t)) return 'crewneck'
  if (/long sleeve|long-sleeve|flannel/.test(t)) return 'longsleeve'
  if (/tee|shirt|t-shirt/.test(t)) return 'tee'
  return 'kit'
}

export const COLORS: { name: string; hex: string }[] = [
  { name: 'Black', hex: '#111111' },
  { name: 'Charcoal', hex: '#3d3d3f' },
  { name: 'Grey', hex: '#9a9a9a' },
  { name: 'White', hex: '#f4f4f2' },
  { name: 'Navy', hex: '#1d2840' },
  { name: 'Royal', hex: '#2a4fb0' },
  { name: 'Red', hex: '#b3262c' },
  { name: 'Maroon', hex: '#5c1a24' },
  { name: 'Forest', hex: '#21402c' },
  { name: 'Olive', hex: '#5a5a38' },
  { name: 'Sand', hex: '#cdbb98' },
  { name: 'Safety Orange', hex: '#f26a1b' },
  { name: 'Safety Yellow', hex: '#d9f23d' },
]

// ---- Brands we carry & categories ----

export const BRANDS = [
  'Nike', 'Carhartt', 'The North Face', 'Patagonia', 'YETI', 'New Era', 'Peter Millar', 'Vineyard Vines',
  'Helly Hansen', 'TravisMathew', 'Brooks Brothers', 'Johnnie-O', 'Southern Tide', 'Bonobos', 'OGIO',
  'Comfort Colors', 'Lane Seven', 'AS Colour', 'Independent', 'Richardson', 'Flexfit', 'Legacy', 'YP Classics',
  'Yupoong', 'Cap America', '10/10', 'Port Authority', 'Port & Company', 'Gildan', 'Next Level', 'CornerStone',
  'A4', 'AllPro', 'Shaka Wear', 'Q-Tees', 'KNACK', 'Save the Duck',
]

export function brandMatches(p: Product, brand: string) {
  const b = brand.toLowerCase()
  if (p.brand.toLowerCase() === b) return true
  return [p.title, ...p.options.flatMap((o) => o.values)].some((t) => t.toLowerCase().includes(b))
}

/** Where a brand tile should link: the filtered single-items list when possible, else gifts or kits. */
export function brandHref(brand: string) {
  const hit = (c: Category) => products.some((p) => p.category === c && brandMatches(p, brand))
  if (hit('single')) return `/apparel/single-items?brand=${encodeURIComponent(brand)}`
  if (hit('gifts')) return '/apparel/gifts'
  return '/apparel/kits'
}

export function categories() {
  const singles = products.filter((p) => p.category === 'single' && p.type)
  const byType = new Map<string, Product[]>()
  singles.forEach((p) => byType.set(p.type, [...(byType.get(p.type) ?? []), p]))
  return Array.from(byType.entries())
    .map(([type, items]) => ({
      type,
      count: items.length,
      from: Math.min(...items.map((p) => tiers(p).at(-1)?.price ?? priceRange(p).min)),
      garment: garmentFor(items[0]),
    }))
    .sort((a, b) => b.count - a.count)
}
