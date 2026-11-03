'use client'

import { useEffect, useMemo, useState } from 'react'
import { CustomQuote, Display, Eyebrow, KitCard, ProductCard, wrap } from './ui'
import { BRANDS, allKits, brandMatches, byCategory, priceRange, tiers, type Product } from '@/lib/shop/catalog'

function Hero({ eyebrow, title, outline, intro }: { eyebrow: string; title: string; outline: string; intro: string }) {
  return (
    <section className="py-16 md:py-24 border-b border-white/10">
      <div className={wrap}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="font-display font-black uppercase text-cream leading-[0.86] tracking-tighter" style={{ fontSize: 'clamp(52px, 11vw, 184px)' }}>
          {title} <span className="text-outline">{outline}</span>
        </h1>
        <p className="font-sans text-lg text-cream/60 max-w-2xl mt-6 leading-relaxed">{intro}</p>
      </div>
    </section>
  )
}

function Grid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
      {items.map((p) => <ProductCard key={p.handle} p={p} />)}
    </div>
  )
}

function Group({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="py-14 md:py-20 border-b border-white/10">
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <Display size="md" className="text-cream">{title}</Display>
          {note && <p className="font-sans text-sm text-cream/50 max-w-sm">{note}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

export function KitsCollection() {
  const kits = allKits()
  const winter = byCategory('winter')
  const packs = byCategory('packs')
  const giftKits = byCategory('gifts').filter((p) => p.giftKit).sort((a, b) => priceRange(a).min - priceRange(b).min)
  return (
    <div className="bg-[#0a0908] text-cream">
      <Hero eyebrow="All Kits" title="Crew" outline="Kits." intro="Every kit is a full run at one price — your logo on every piece, a mockup in one business day, and a full refund until you approve." />
      <Group title="Crew Kits" note="Pick how many. The bigger the run, the less each piece costs.">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-3">
          {kits.map((p) => <KitCard key={p.handle} p={p} featured={p.featured} />)}
        </div>
      </Group>
      {giftKits.length > 0 && (
        <Group title="Gift Kits" note="Ready-made sets for clients, partners and your crew — logo stitched or engraved on every piece.">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-3">
            {giftKits.map((p) => <KitCard key={p.handle} p={p} />)}
          </div>
        </Group>
      )}
      {winter.length > 0 && <Group title="Winter Kits" note="Flannels, vests, jackets and hi-vis outerwear for the cold months."><Grid items={winter} /></Group>}
      {packs.length > 0 && <Group title="24-Piece Packs" note="One garment, 24 pieces, logo included."><Grid items={packs} /></Group>}
      <Group title="Want One Garment Instead?" note="Single items start at 8 pieces embroidered or 12 printed.">
        <a href="/apparel/single-items" className="inline-flex items-center gap-3 bg-cream text-[#0a0908] font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-7 py-4">Shop Single Items →</a>
      </Group>
      <CustomQuote />
    </div>
  )
}

export function GiftsCollection() {
  const gifts = byCategory('gifts').sort((a, b) => priceRange(a).min - priceRange(b).min)
  return (
    <div className="bg-[#0a0908] text-cream">
      <Hero eyebrow="Holiday Gifts" title="Logo" outline="Gifts." intro="Ready-made gift sets for your crew, clients and partners — premium polos, quarter-zips, vests, bags, blankets and YETI tumblers with your logo stitched or engraved. Mockup in one business day." />
      <section className="py-14 md:py-20"><div className={wrap}><Grid items={gifts} /></div></section>
      <CustomQuote />
    </div>
  )
}

export function SingleItemsCollection() {
  const all = byCategory('single')
  const types = useMemo(() => ['All', ...Array.from(new Set(all.map((p) => p.type).filter(Boolean))).sort()], [all])
  const brands = useMemo(() => ['All brands', ...BRANDS.filter((b) => all.some((p) => brandMatches(p, b))).sort()], [all])
  const [type, setType] = useState('All')
  const [brand, setBrand] = useState('All brands')
  const [sort, setSort] = useState<'featured' | 'low' | 'high'>('featured')

  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    const t = q.get('type'), b = q.get('brand')
    if (t && types.includes(t)) setType(t)
    if (b && brands.includes(b)) setBrand(b)
  }, [types, brands])

  const unit = (p: Product) => tiers(p).at(-1)?.price ?? priceRange(p).min
  const items = all
    .filter((p) => type === 'All' || p.type === type)
    .filter((p) => brand === 'All brands' || brandMatches(p, brand))
    .sort((a, b) => (sort === 'low' ? unit(a) - unit(b) : sort === 'high' ? unit(b) - unit(a) : 0))

  return (
    <div className="bg-[#0a0908] text-cream">
      <Hero eyebrow="Single Items" title="Pick" outline="One Thing." intro="Any garment on its own. 8 minimum embroidered or 12 printed, and the price per piece drops as you add more. Logo setup and your mockup are included." />
      <div className="sticky top-28 z-30 bg-[#0a0908]/95 backdrop-blur-md border-b border-white/10">
        <div className={`${wrap} py-4 flex flex-wrap items-center gap-3`}>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1 min-w-0">
            {types.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`whitespace-nowrap px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] border transition-colors ${
                  type === t ? 'bg-cream text-[#0a0908] border-cream' : 'border-white/20 text-cream/60 hover:text-cream hover:border-cream/60'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <select value={brand} onChange={(e) => setBrand(e.target.value)} aria-label="Filter by brand" className="bg-transparent border border-white/20 text-cream font-sans text-xs uppercase tracking-[0.12em] px-3 py-2">
            {brands.map((b) => <option key={b} className="bg-[#0a0908]">{b}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} aria-label="Sort" className="bg-transparent border border-white/20 text-cream font-sans text-xs uppercase tracking-[0.12em] px-3 py-2">
            <option value="featured" className="bg-[#0a0908]">Featured</option>
            <option value="low" className="bg-[#0a0908]">Price: low to high</option>
            <option value="high" className="bg-[#0a0908]">Price: high to low</option>
          </select>
        </div>
      </div>
      <section className="py-10 md:py-14">
        <div className={wrap}>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-cream/40 mb-6">{items.length} items</p>
          <Grid items={items} />
        </div>
      </section>
      <CustomQuote />
    </div>
  )
}
