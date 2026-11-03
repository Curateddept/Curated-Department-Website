'use client'

import GarmentIcon from './GarmentIcon'
import { Faq, KitCard, ProductCard, btnGhost, btnLight, wrap } from './ui'
import {
  SHOP, allKits, byCategory, categories, cover, findVariant, getProduct, money, priceRange, sized, tiers,
  type Garment, type Product,
} from '@/lib/shop/catalog'

// Section order follows the partner storefront's homepage; copy, colors and type are Curated's.

const kitsFrom = Math.min(...byCategory('kits').map((p) => priceRange(p).min))
const singlesFrom = Math.min(...byCategory('single').map((p) => tiers(p).at(-1)?.price ?? Infinity))

const panel = 'rounded-2xl bg-[#141312] border border-white/10'
const pill = 'inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/70'
const h2 = 'font-display font-black uppercase leading-[0.92] tracking-tight'

const Check = ({ children }: { children: React.ReactNode }) => (
  <li className="flex gap-2.5 items-start font-sans text-sm text-cream/75">
    <span className="mt-0.5 grid place-items-center h-4 w-4 flex-shrink-0 rounded-full bg-cream text-[#0a0908] text-[9px] font-bold">✓</span>
    {children}
  </li>
)

function SectionHead({ eyebrow, title, sub }: { eyebrow?: string; title: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
      {eyebrow && <span className={`${pill} mb-5`}>{eyebrow}</span>}
      <h2 className={h2} style={{ fontSize: 'clamp(34px, 4.6vw, 68px)' }}>{title}</h2>
      {sub && <p className="font-sans text-base md:text-lg text-cream/60 mt-5 leading-relaxed">{sub}</p>}
    </div>
  )
}

// ---- Kit spotlights -------------------------------------------------------

type Spot = { handle: string; eyebrow: string; noun: string; blurb: string; checks: (s: SpotPrices) => string[] }
type SpotPrices = { n: number; base: number; per: number; backAdd: number | null; lastN: number; lastPer: number; counts: string[] }

const SPOTS: Spot[] = [
  {
    handle: 'hoodie-kit',
    eyebrow: 'The Hoodie Kit · Lane Seven Premium',
    noun: 'premium hoodies',
    blurb: 'Lane Seven Premium pullovers with your logo printed on the chest.',
    checks: (s) => ['21 hoodie colors', ...(s.backAdd ? [`Add a back print for ${money(s.backAdd, true)} a hoodie`] : []), 'Mockup in one business day'],
  },
  {
    handle: 'crewneck-kit',
    eyebrow: 'The Crewneck Kit · Lane Seven Premium',
    noun: 'premium crewnecks',
    blurb: 'Lane Seven Premium crewneck sweatshirts with your logo printed on the chest.',
    checks: (s) => ['13 crewneck colors', ...(s.backAdd ? [`Add a back print for ${money(s.backAdd, true)} a crewneck`] : []), 'Mockup in one business day'],
  },
  {
    handle: 'premium-tee-kit',
    eyebrow: 'Featured · The Premium Tee Kit',
    noun: 'Comfort Colors tees. Front and back',
    blurb: 'Heavyweight, garment-dyed Comfort Colors 1717 tees with your logo on the left chest and a big print on the back.',
    checks: () => ['Up to 4 colors, front and back', 'Comfort Colors 1717 heavyweight cotton', 'Mockup in one business day'],
  },
  {
    handle: 'beanie-kit',
    eyebrow: 'The Beanie Kit · Port Authority',
    noun: 'knit beanies',
    blurb: 'Port Authority knit beanies with your logo embroidered on the cuff.',
    checks: () => ['Logo embroidered on the cuff', '22 beanie colors', 'Mockup in one business day'],
  },
]

function prices(p: Product): SpotPrices {
  const counts = p.options[0].values
  const qty = counts.find((v) => v.startsWith('24')) ?? counts[0]
  const pick = (count: string, print = 0) => findVariant(p, p.options.length > 1 ? [count, p.options[1].values[print]] : [count]).price
  const n = Number(qty.match(/\d+/)![0])
  const base = pick(qty)
  const last = counts[counts.length - 1]
  const lastN = Number(last.match(/\d+/)![0])
  return {
    n,
    base,
    per: base / n,
    backAdd: p.options.length > 1 ? (pick(qty, 1) - base) / n : null,
    lastN,
    lastPer: pick(last) / lastN,
    counts,
  }
}

const listOr = (xs: string[]) => xs.join(', ').replace(/, ([^,]*)$/, ' or $1')

function Spotlight({ spot, flip }: { spot: Spot; flip: boolean }) {
  const p = getProduct(spot.handle)
  if (!p) return null
  const s = prices(p)
  return (
    <section className="py-14 md:py-20">
      <div className={`${wrap} grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
        <a href={`/apparel/products/${p.handle}`} className={`group relative block aspect-square overflow-hidden rounded-2xl bg-[#141312] ${flip ? 'lg:order-2' : ''}`}>
          {cover(p) && <img src={sized(cover(p), 1100)} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />}
        </a>
        <div>
          <span className={pill}>{spot.eyebrow}</span>
          <h2 className={`${h2} mt-5`} style={{ fontSize: 'clamp(34px, 4.2vw, 64px)' }}>
            {s.n} {spot.noun}{spot.handle === 'premium-tee-kit' ? '.' : ' with your logo.'} <span className="text-outline">{money(s.base, true)}.</span>
          </h2>
          <p className="font-sans text-lg text-cream/65 mt-6 leading-relaxed max-w-xl">
            {spot.blurb}{' '}
            {s.counts.length > 1 ? `Pick ${listOr(s.counts)}. ` : ''}
            That&apos;s {money(s.per, true)} a piece at {s.n}
            {s.backAdd ? `. Add a back print for ${money(s.backAdd, true)} a piece.` : s.lastN > s.n ? `, down to ${money(s.lastPer, true)} at ${s.lastN}.` : '.'}
          </p>
          <a href={`/apparel/products/${p.handle}`} className={`${btnLight} mt-8`}>Build This Kit →</a>
          <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
            {spot.checks(s).map((c) => <Check key={c}>{c}</Check>)}
          </ul>
        </div>
      </div>
    </section>
  )
}

// ---- Content ---------------------------------------------------------------

const TRUST = [
  ['Ships anywhere in the US', 'Every order ships to your door, wherever your crew is.'],
  ['No quote to wait on', 'Every kit price is right on the page.'],
  ['Sizes can wait', 'Send them after you see your mockup.'],
  ['One team on it', 'Designed, produced and packed by Curated.'],
]

const POPULAR: { handle: string; blurb: string }[] = [
  { handle: 'richardson-112-trucker-cap', blurb: 'The trucker every crew asks for, logo embroidered on the front. 8 minimum, and the price drops as you add more.' },
  { handle: 'lane-seven-ls14001-premium-pullover-hoodie', blurb: 'A soft, heavy Lane Seven pullover, printed or embroidered. 8 minimum.' },
  { handle: 'port-authority-dry-zone-polo', blurb: 'A clean performance polo for the office, sales calls and site visits, logo on the left chest.' },
]

const STEP_CARDS = [
  { img: '/shop/overview/screen-press.png', title: '1. Pick your kit, upload your logo', body: 'Choose a kit or single item and drop your logo in on the product page. Any file works — a vector is best, a phone photo is fine. We clean it up as part of your mockup.' },
  { img: '/shop/overview/design-desk.png', title: '2. Get your mockup', body: 'Within one business day you get a picture of every piece with your logo, in your colors. Send sizes now or after you see it.' },
  { img: '/shop/overview/warehouse.png', title: '3. Approve it. We do the rest.', body: `Nothing prints until you say yes. Then we print, stitch and pack it. Ready ${SHOP.turnaround} after you approve.` },
]

const PAST_WORK = [
  { src: '/work/no-fear/back-print.jpg', caption: 'No Fear launch tees, big back print' },
  { src: '/work/no-fear/hoodie-bike.jpg', caption: 'No Fear hoodies, front print' },
  { src: '/work/no-fear/merch-rack.jpg', caption: 'No Fear event merch, ready to sell' },
  { src: '/work/no-fear/white-tee.jpg', caption: 'No Fear tees, one-color print' },
]

const CLIENTS = [
  { name: 'Porsche of Naples', src: '/logos/clients/porsche-of-naples.png', h: 42 },
  { name: 'Amazon', src: '/logos/clients/amazon.png', h: 30 },
  { name: 'ACC', src: '/logos/clients/acc.png', h: 30 },
  { name: 'Coca-Cola', src: '/logos/clients/coca-cola.png', h: 36 },
  { name: 'Donut Media', src: '/logos/clients/donut-media.png', h: 36 },
  { name: 'No Fear', src: '/logos/mono/no-fear.png', h: 36 },
]

const FAQ_ITEMS = [
  { q: 'How long does it take?', a: `Your mockup arrives within one business day. Once you approve it, your order is ready in ${SHOP.turnaround}. Shipping is calculated at checkout. Need it sooner? Call ${SHOP.phone} or email ${SHOP.email} before you order and ask about rush.` },
  { q: 'Should I buy a kit or single items?', a: 'A kit is a full run of one garment at one price, and the bigger the run the less each piece costs. Single items are for when you want a specific garment: 8 minimum embroidered or 12 printed, with the price per piece dropping as you add more.' },
  { q: 'What if I don’t like the mockup?', a: 'Tell us what to change and we revise it free until it looks right. Change your mind before you approve? You get a full refund.' },
  { q: 'Do I have to know sizes before I order?', a: 'No. Send sizes now or after you see your mockup — any time before you approve.' },
  { q: 'What if I don’t have a good logo file?', a: 'Send whatever you have: a photo of your truck door, your business card, an old shirt. Cleaning it up is part of your mockup, and logo setup is included.' },
  { q: 'Can I pick my own colors?', a: 'Yes. Pick a color on the product page, or name the exact stock color in your notes and we match it.' },
  { q: 'What about 2XL and up?', a: `S through XL are included. 2XL and up add ${money(SHOP.bigSizeUpcharge)} a piece, billed when you approve your mockup.` },
  { q: 'Can I change the mix of pieces?', a: 'Kits are priced around a set run. Want a different mix, outerwear, promo items or something we don’t list? Ask for a custom quote and we’ll price it.' },
  { q: 'Where is this made?', a: 'Every order is designed by Curated and produced on commercial screen printing and embroidery equipment by our production partner, then packed and shipped to you.' },
]

// ---- Page ------------------------------------------------------------------

export default function OverviewPage() {
  const gifts = byCategory('gifts').sort((a, b) => priceRange(a).min - priceRange(b).min)
  const kits = allKits()
  const popular = POPULAR.map((x) => ({ ...x, p: getProduct(x.handle) })).filter((x): x is typeof x & { p: Product } => Boolean(x.p))

  return (
    <div className="bg-[#0a0908] text-cream">

      {/* 1 — Hero */}
      <section className="py-12 md:py-20">
        <div className={`${wrap} grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center`}>
          <div>
            <span className={pill}>For service crews, race teams, shops and staff</span>
            <h1 className="font-display font-black uppercase leading-[0.88] tracking-tighter mt-6" style={{ fontSize: 'clamp(46px, 6.4vw, 104px)' }}>
              Crew Gear Without The <span className="text-outline">Back-And-Forth.</span>
            </h1>
            <p className="font-sans text-lg text-cream/65 mt-6 leading-relaxed max-w-lg">
              Pick a kit, upload your logo. Mockup in one business day. Ready {SHOP.turnaround} after you approve.
            </p>
            <a href="/apparel/kits" className={`${btnLight} mt-8`}>Pick Your Kit →</a>
            <ul className="mt-8 flex flex-col gap-2.5">
              <Check>Kits from {money(kitsFrom)} or single items from {money(singlesFrom, true)} a piece</Check>
              <Check>Tees, hoodies, caps and beanies with your logo</Check>
              <Check>Full refund until you approve</Check>
            </ul>
          </div>
          <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden rounded-2xl bg-[#141312]">
            <video autoPlay muted loop playsInline poster="/shop/overview/screen-press.png" className="absolute inset-0 h-full w-full object-cover grayscale contrast-125">
              <source src="https://res.cloudinary.com/dd6li0e1c/video/upload/v1777403353/webteas_lulxtl.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* 2 — Trust strip */}
      <section className="pb-14 md:pb-20">
        <div className={`${wrap} grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4`}>
          {TRUST.map(([t, b]) => (
            <div key={t} className={`${panel} p-5 md:p-6`}>
              <p className="font-display font-black uppercase text-lg md:text-xl leading-tight">{t}</p>
              <p className="font-sans text-sm text-cream/55 mt-2 leading-snug">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 — Holiday gifts */}
      {gifts.length > 0 && (
        <section className="py-16 md:py-24 border-t border-white/10">
          <div className={wrap}>
            <SectionHead
              eyebrow="Holiday Gifts"
              title={<>Gifts With Your <span className="text-outline">Logo On Them.</span></>}
              sub="Ready-made gift sets for your crew, your clients and your partners, your logo stitched or engraved on every one. Mockup in one business day."
            />
            <div className="flex flex-wrap justify-center gap-4">
              {gifts.slice(0, 8).map((p) => <div key={p.handle} className="w-[calc(50%-8px)] md:w-[calc(25%-12px)]"><ProductCard p={p} /></div>)}
            </div>
            <div className="flex justify-center mt-10"><a href="/apparel/gifts" className={btnGhost}>Shop All Holiday Gifts →</a></div>
          </div>
        </section>
      )}

      {/* 4–7 — Kit spotlights */}
      <div className="border-t border-white/10">
        {SPOTS.map((s, i) => (
          <div key={s.handle} className={i % 2 ? 'bg-[#0f0e0d]' : ''}>
            <Spotlight spot={s} flip={i % 2 === 1} />
          </div>
        ))}
      </div>

      {/* 8 — All kits */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className={wrap}>
          <SectionHead
            title={<>Pick Your Kit. <span className="text-outline">We Picked The Rest.</span></>}
            sub={<>Every piece gets your logo, in the colors you pick. The bigger the run, the less each piece costs. Want one garment instead of a set? Those are on the <a href="/apparel/single-items" className="underline underline-offset-4 hover:text-cream">single items page</a>.</>}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-3">
            {kits.map((p) => <KitCard key={p.handle} p={p} featured={p.featured} />)}
          </div>
        </div>
      </section>

      {/* 9 — Popular single items */}
      {popular.length > 0 && (
        <section className="py-16 md:py-24 border-t border-white/10">
          <div className={wrap}>
            <h2 className={`${h2} mb-10`} style={{ fontSize: 'clamp(30px, 3.6vw, 52px)' }}>Three Crew <span className="text-outline">Favorites.</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {popular.map(({ p, blurb }) => {
                const per = tiers(p).at(-1)?.price ?? priceRange(p).min
                return (
                  <a key={p.handle} href={`/apparel/products/${p.handle}`} className={`group ${panel} overflow-hidden flex flex-col hover:border-cream/50 transition-colors`}>
                    <div className="relative aspect-[4/3] bg-white overflow-hidden">
                      {cover(p) && <img src={sized(cover(p), 800)} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-contain group-hover:scale-105 transition-transform duration-500" />}
                    </div>
                    <div className="p-6 flex flex-col gap-3 flex-1">
                      <h3 className="font-display font-black uppercase text-xl leading-tight">{p.title} · from {money(per, true)}</h3>
                      <p className="font-sans text-sm text-cream/60 leading-relaxed">{blurb}</p>
                      <span className="mt-auto pt-2 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] underline underline-offset-4">Build it →</span>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* 10 — Kits or single items */}
      <section className="pb-16 md:pb-24">
        <div className={wrap}>
          <div className={`${panel} px-6 py-12 md:px-16 md:py-16 text-center`}>
            <h2 className={h2} style={{ fontSize: 'clamp(30px, 3.6vw, 52px)' }}>Kits Or <span className="text-outline">Single Items.</span></h2>
            <div className="max-w-2xl mx-auto mt-6 space-y-4 font-sans text-cream/65 leading-relaxed">
              <p>A kit is a full run at one price, picked and packed in one box. Piece for piece it costs less than buying the same garments on their own, and the bigger the kit the less each piece costs.</p>
              <p>Single items are for when you want one thing. Pick any garment on its own, 8 minimum embroidered or 12 printed, and the price per piece drops as you add more.</p>
              <p className="text-cream">Either way, logo setup and your mockup are included, and you get every cent back until you approve it.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a href="/apparel/kits" className={btnLight}>Pick Your Kit →</a>
              <a href="/apparel/single-items" className={btnGhost}>Browse Single Items</a>
            </div>
          </div>
        </div>
      </section>

      {/* 10b — Shop by category */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className={wrap}>
          <SectionHead eyebrow="Shop by category" title="Every Category." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {categories().map((c) => (
              <a key={c.type} href={`/apparel/single-items?type=${encodeURIComponent(c.type)}`} className={`group ${panel} p-4 flex flex-col hover:border-cream/50 transition-colors`}>
                <div className="relative aspect-[4/3] mb-3 rounded-xl overflow-hidden bg-white">
                  {c.image ? (
                    <img src={sized(c.image, 600)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <GarmentIcon garment={c.garment} color="#1c1c1c" className="w-full h-full" />
                  )}
                </div>
                <h3 className="font-display font-black uppercase text-lg leading-none">{c.type}</h3>
                <p className="font-sans text-xs text-cream/50 mt-2">{c.count} style{c.count === 1 ? '' : 's'} · from {money(c.from, true)}/pc</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 11 — Mockup preview */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className={`${wrap} grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
          <div className="grid grid-cols-3 gap-2">
            {(['tee', 'hoodie', 'longsleeve', 'polo', 'cap', 'beanie'] as Garment[]).map((g, i) => (
              <div key={g} className={`${panel} aspect-square p-3`}>
                <GarmentIcon garment={g} color={['#111111', '#3d3d3f', '#f4f4f2', '#111111', '#3d3d3f', '#111111'][i]} logo={i === 2 ? '/logo-icon.png' : '/logo-icon-white.png'} className="w-full h-full" />
              </div>
            ))}
          </div>
          <div>
            <h2 className={h2} style={{ fontSize: 'clamp(30px, 3.6vw, 52px)' }}>No Surprises When <span className="text-outline">The Box Shows Up.</span></h2>
            <p className="font-sans text-lg text-cream/65 mt-6 leading-relaxed max-w-lg">You get a mockup like this first, with your logo and colors on every piece. Nothing is made until you approve it.</p>
          </div>
        </div>
      </section>

      {/* 12 — Three steps */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className={wrap}>
          <h2 className={`${h2} mb-10`} style={{ fontSize: 'clamp(30px, 3.6vw, 52px)' }}>Three Steps. <span className="text-outline">Zero Thinking.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {STEP_CARDS.map((s) => (
              <div key={s.title} className={`${panel} p-4 md:p-5`}>
                <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-black">
                  <img src={s.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale-[35%]" />
                </div>
                <h3 className="font-display font-black uppercase text-xl leading-tight mt-5">{s.title}</h3>
                <p className="font-sans text-sm text-cream/60 mt-3 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13 — Why it matters */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className={`${wrap} grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
          <div>
            <h2 className={h2} style={{ fontSize: 'clamp(34px, 4.2vw, 64px)' }}>Your Shirt Is The <span className="text-outline">Last 40 Feet.</span></h2>
            <div className="mt-6 space-y-4 font-sans text-lg text-cream/65 leading-relaxed max-w-lg">
              <p>The truck gets you to the driveway. The shirt walks up to the front door, and that&apos;s where the customer decides if they trust you.</p>
              <p>A crew in matching gear looks like a real company. A crew in whatever they own looks like a side job. Same guys, same work, different price you can charge.</p>
              <p className="text-cream">A kit is a one-time buy from {money(kitsFrom)}. You own it, and it shows up at every job.</p>
            </div>
            <a href="/apparel/kits" className={`${btnLight} mt-8`}>Pick Your Kit →</a>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#141312]">
            <img src="/work/no-fear/duo.jpg" alt="Two people wearing No Fear gear produced by Curated" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* 14 — Featured client */}
      <section className="py-16 md:py-24 bg-[#0f0e0d] border-y border-white/10">
        <div className={`${wrap} grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#141312]">
            <img src="/shop/overview/one-way-air.webp" alt="One Way Air crew tees coming off the dryer" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div>
            <h2 className={h2} style={{ fontSize: 'clamp(34px, 4.2vw, 64px)' }}>We Print For <span className="text-outline">One Way Air.</span></h2>
            <div className="mt-6 space-y-4 font-sans text-lg text-cream/65 leading-relaxed max-w-lg">
              <p>The Southwest Florida HVAC crew people know from social media wears shirts off our presses. Maroon tees with the full One Way Air logo, run on the same automatic equipment as your kit.</p>
              <p>Tees, hoodies, crewnecks and outerwear, new colors every season. When a crew needs more, we mock it up and price it. Same team, same process. Your logo is next.</p>
            </div>
            <a href="/apparel/kits" className={`${btnLight} mt-8`}>Pick Your Kit →</a>
          </div>
        </div>
      </section>

      {/* 15 — Past work */}
      <section className="py-16 md:py-24">
        <div className={wrap}>
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-cream/50">Past work</p>
          <h2 className={`${h2} mt-3`} style={{ fontSize: 'clamp(30px, 3.6vw, 52px)' }}>Real Orders. <span className="text-outline">Not Mockups.</span></h2>
          <p className="font-sans text-cream/60 mt-4">Launch merch, crew gear and event runs for the brands we work with.</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-10">
            {PAST_WORK.map((w) => (
              <figure key={w.src} className={`${panel} overflow-hidden`}>
                <div className="relative aspect-square">
                  <img src={w.src} alt={w.caption} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <figcaption className="px-4 py-3 font-sans text-xs font-semibold text-cream/80">{w.caption}</figcaption>
              </figure>
            ))}
          </div>
          <p className="font-sans text-xs text-cream/40 mt-5">Examples of our past work. <a href="/work/no-fear" className="underline underline-offset-2 hover:text-cream">See the No Fear case study →</a></p>
        </div>
      </section>

      {/* 16 — Guarantee */}
      <section className="bg-cream text-[#0a0908] py-16 md:py-24">
        <div className={`${wrap} text-center max-w-3xl`}>
          <h2 className={h2} style={{ fontSize: 'clamp(32px, 4vw, 60px)' }}>The Looks-Right Guarantee.</h2>
          <div className="mt-6 space-y-4 font-sans text-lg text-[#0a0908]/70 leading-relaxed">
            <p>You approve a mockup of every piece before we make one. Not right? We fix it free. Change your mind before you approve? Full refund.</p>
            <p>If a piece shows up wrong against what you approved, send us a photo within 14 days and we fix or replace it free.</p>
            <p>When you hire someone new, your logo and sizes stay on file, so reordering takes minutes.</p>
          </div>
          <a href="/apparel/kits" className="mt-8 btn-wipe [--wipe:#F4F4F2] inline-flex items-center gap-3 bg-[#0a0908] text-cream hover:text-[#0a0908] border border-[#0a0908] font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-7 py-4 transition-colors duration-300">Pick Your Kit →</a>
        </div>
      </section>

      {/* 17 — Who wears our work */}
      <section className="py-14 md:py-20 border-b border-white/10">
        <div className={wrap}>
          <h2 className={`${h2} text-center mb-10`} style={{ fontSize: 'clamp(26px, 3vw, 44px)' }}>Brands That Wear Our Work.</h2>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16">
            {CLIENTS.map((c) => <img key={c.name} src={c.src} alt={c.name} style={{ height: c.h }} className="w-auto object-contain opacity-80" loading="lazy" />)}
          </div>
        </div>
      </section>

      {/* 18 — FAQ */}
      <section className="py-16 md:py-24">
        <div className={wrap}>
          <div className={`${panel} px-6 py-10 md:px-14 md:py-14`}>
            <h2 className={`${h2} text-center mb-8`} style={{ fontSize: 'clamp(32px, 4vw, 60px)' }}>Questions.</h2>
            <div className="max-w-3xl mx-auto"><Faq items={FAQ_ITEMS} /></div>
          </div>
        </div>
      </section>

      {/* 19 — CTA */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className={`${wrap} text-center max-w-3xl`}>
          <h2 className={h2} style={{ fontSize: 'clamp(34px, 4.6vw, 68px)' }}>Not Sure Which Kit? <span className="text-outline">Just Ask.</span></h2>
          <p className="font-sans text-lg text-cream/65 mt-6 leading-relaxed">
            Email your logo and head count to <a href={`mailto:${SHOP.email}`} className="underline underline-offset-4 hover:text-cream">{SHOP.email}</a> or call{' '}
            <a href={SHOP.phoneHref} className="underline underline-offset-4 hover:text-cream">{SHOP.phone}</a>. We&apos;ll pick the right kit and send your mockup first.
          </p>
          <p className="font-sans text-cream/50 mt-4">Need jackets, promo items or a different mix of pieces? We quote anything.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a href="/apparel/kits" className={btnLight}>Pick Your Kit →</a>
            <a href="/contact" className={btnGhost}>Get A Custom Quote</a>
          </div>
        </div>
      </section>
    </div>
  )
}
