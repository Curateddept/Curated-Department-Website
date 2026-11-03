'use client'

import { motion } from 'framer-motion'
import GarmentIcon from './GarmentIcon'
import {
  CustomQuote, Display, Eyebrow, Faq, Guarantee, KitCard, ProductCard, Steps, btnGhost, btnLight, wrap,
} from './ui'
import {
  SHOP, SPOTLIGHT_KITS, allKits, byCategory, cover, findVariant, getProduct, money, priceRange, tiers,
  type Garment,
} from '@/lib/shop/catalog'

const kitsFrom = Math.min(...byCategory('kits').map((p) => priceRange(p).min))
const singlesFrom = Math.min(...byCategory('single').map((p) => tiers(p)[0]?.price ?? Infinity))

function spotlight(handle: string) {
  const p = getProduct(handle)!
  const qtyOpt = p.options[0]
  const qty = qtyOpt.values.find((v) => v.startsWith('24')) ?? qtyOpt.values[0]
  const n = Number(qty.match(/\d+/)![0])
  const base = findVariant(p, p.options.length > 1 ? [qty, p.options[1].values[0]] : [qty]).price
  const withBack = p.options.length > 1 ? findVariant(p, [qty, p.options[1].values[1]]).price : null
  const last = qtyOpt.values[qtyOpt.values.length - 1]
  const lastN = Number(last.match(/\d+/)![0])
  const lastPrice = findVariant(p, p.options.length > 1 ? [last, p.options[1].values[0]] : [last]).price
  return { p, n, base, perPiece: base / n, backAdd: withBack ? (withBack - base) / n : null, lastN, lastPer: lastPrice / lastN, sizes: qtyOpt.values }
}

const SPOT_COPY: Record<string, { label: string; garment: Garment; noun: string; blurb: string }> = {
  'hoodie-kit': { label: 'The Hoodie Kit · Lane Seven Premium', garment: 'hoodie', noun: 'premium hoodies', blurb: 'Lane Seven Premium pullovers with your logo printed on the chest in up to 4 colors.' },
  'crewneck-kit': { label: 'The Crewneck Kit · Lane Seven Premium', garment: 'crewneck', noun: 'premium crewnecks', blurb: 'Lane Seven Premium crewneck sweatshirts with your logo printed on the chest in up to 4 colors.' },
  'premium-tee-kit': { label: 'New · The Premium Tee Kit', garment: 'tee', noun: 'Comfort Colors tees', blurb: 'Heavyweight garment-dyed Comfort Colors 1717 tees, real screen print — up to 4 colors on the left chest and a big print on the back. Screens, setup and art proof included.' },
}

export default function TeamGearPage() {
  const gifts = byCategory('gifts').sort((a, b) => priceRange(a).min - priceRange(b).min)
  const kits = allKits()

  return (
    <div className="bg-[#0a0908] text-cream">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-30 grayscale contrast-125">
          <source src="https://res.cloudinary.com/dd6li0e1c/video/upload/v1777403353/webteas_lulxtl.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0908] via-[#0a0908]/80 to-[#0a0908]/30" />
        <div className={`${wrap} relative py-20 md:py-32`}>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-cream/60 mb-8">
            For service crews, race teams, shops &amp; staff
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }} animate={{ y: '0%' }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              className="font-display font-black uppercase leading-[0.86] tracking-tighter max-w-5xl"
              style={{ fontSize: 'clamp(52px, 10vw, 168px)' }}
            >
              Team Gear.<br /><span className="text-outline">One Box.</span>
            </motion.h1>
          </div>
          <p className="font-sans text-lg md:text-xl text-cream/70 max-w-xl mt-8 leading-relaxed">
            Pick a kit and upload your logo. Your mockup arrives in one business day, and your gear is ready {SHOP.turnaround} after you approve.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <a href="/apparel/kits" className={btnLight}>Pick Your Kit →</a>
            <a href="/apparel/single-items" className={btnGhost}>Single Items</a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-sans text-sm text-cream/70">
            <li>— Kits from {money(kitsFrom)} · single items from {money(singlesFrom, true)}</li>
            <li>— Tees, polos &amp; caps picked for you</li>
            <li>— Full refund until you approve</li>
          </ul>
        </div>
        <div className="relative border-t border-white/10 bg-[#0a0908]/80">
          <div className={`${wrap} grid grid-cols-2 lg:grid-cols-4`}>
            {[
              ['Ships anywhere', 'Every kit ships across the US.'],
              ['Price up front', 'No quote to wait on — the price is on the page.'],
              ['Sizes can wait', 'Send sizes now or after your mockup.'],
              ['One team on it', 'Design, production and packing handled by Curated.'],
            ].map(([t, b], i) => (
              <div key={t} className={`py-6 md:py-8 ${i ? 'pl-5 md:pl-8 border-l border-white/10' : ''} ${i === 2 ? 'border-l-0 lg:border-l pl-0 lg:pl-8' : ''} ${i > 1 ? 'border-t lg:border-t-0 border-white/10' : ''}`}>
                <p className="font-display font-black uppercase text-lg leading-none">{t}</p>
                <p className="font-sans text-xs text-cream/50 mt-2">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gifts */}
      <section className="py-20 md:py-28 border-b border-white/10">
        <div className={`${wrap} flex flex-wrap items-end justify-between gap-6 mb-10`}>
          <div>
            <Eyebrow>Holiday Gifts</Eyebrow>
            <Display size="lg">Gifts That<br /><span className="text-outline">Wear Your Logo.</span></Display>
          </div>
          <p className="font-sans text-cream/60 max-w-md leading-relaxed">
            Ready-made gift sets for your crew, your clients and your partners — polos, quarter-zips, vests, bags and YETI tumblers, logo stitched or engraved on every piece. Mockup in one business day.
          </p>
        </div>
        <div className="pl-6 md:pl-12 lg:pl-20 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
          {gifts.map((p) => (
            <div key={p.handle} className="snap-start flex-shrink-0 w-[260px] md:w-[300px]"><ProductCard p={p} /></div>
          ))}
          <div className="flex-shrink-0 w-6" />
        </div>
        <div className={`${wrap} mt-8`}><a href="/apparel/gifts" className={btnGhost}>Shop All Gifts →</a></div>
      </section>

      {/* Spotlight kits */}
      {SPOTLIGHT_KITS.map((h, i) => {
        const s = spotlight(h)
        const c = SPOT_COPY[h]
        const dark = i % 2 === 1
        return (
          <section key={h} className={`border-b ${dark ? 'bg-cream text-[#0a0908] border-[#0a0908]/10' : 'border-white/10'}`}>
            <div className={`${wrap} grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 md:py-28`}>
              <div className={i % 2 ? 'lg:order-2' : ''}>
                <p className={`font-sans text-[11px] font-semibold uppercase tracking-[0.22em] mb-6 ${dark ? 'text-[#0a0908]/50' : 'text-cream/50'}`}>{c.label}</p>
                <h2 className="font-display font-black uppercase leading-[0.9] tracking-tighter" style={{ fontSize: 'clamp(36px, 5.4vw, 84px)' }}>
                  {s.n} {c.noun}.<br /><span className="text-outline">{money(s.base)}.</span>
                </h2>
                <p className={`font-sans text-lg mt-6 leading-relaxed max-w-lg ${dark ? 'text-[#0a0908]/70' : 'text-cream/65'}`}>
                  {c.blurb} Choose {s.sizes.join(', ').replace(/, ([^,]*)$/, ' or $1')}. That&apos;s {money(s.perPiece, true)} a piece at {s.n}
                  {s.backAdd ? `. Add a back print for ${money(s.backAdd)} a piece.` : `, down to ${money(s.lastPer, true)} a piece at ${s.lastN}.`}
                </p>
                <ul className={`mt-6 flex flex-col gap-1.5 font-sans text-sm ${dark ? 'text-[#0a0908]/70' : 'text-cream/60'}`}>
                  <li>— Up to 4 colors {s.backAdd ? 'on the chest' : 'front and back'}</li>
                  {s.backAdd && <li>— Back print +{money(s.backAdd)} a piece</li>}
                  <li>— Mockup in one business day</li>
                </ul>
                <a href={`/apparel/products/${h}`} className={`mt-8 ${dark ? 'btn-wipe [--wipe:#F4F4F2] inline-flex items-center gap-3 bg-[#0a0908] text-cream hover:text-[#0a0908] border border-[#0a0908] font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-7 py-4 transition-colors duration-300' : btnLight}`}>
                  Build This Kit →
                </a>
              </div>
              <div className={`relative aspect-square max-w-[520px] w-full mx-auto ${dark ? 'bg-[#0a0908]' : 'bg-[#141312]'}`}>
                {cover(s.p) ? (
                  <img src={`${cover(s.p)}&width=1000`} alt={s.p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <GarmentIcon garment={c.garment} color={dark ? '#f4f4f2' : '#2a2928'} className="absolute inset-[12%] w-[76%] h-[76%]" />
                )}
                <span className="absolute bottom-4 right-4 bg-[#0a0908]/85 px-3 py-1 font-display font-black text-4xl text-cream">{money(s.perPiece, true)}<span className="font-sans text-xs font-normal opacity-60"> /pc</span></span>
              </div>
            </div>
          </section>
        )
      })}

      {/* Core kits */}
      <section className="py-20 md:py-32 border-b border-white/10">
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div>
              <Eyebrow>Crew Kits</Eyebrow>
              <Display size="lg">Pick Your Kit.<br /><span className="text-outline">Add Your Logo.</span></Display>
            </div>
            <p className="font-sans text-cream/60 max-w-md leading-relaxed">
              One garment, one price, your logo on every piece. The bigger the run, the less each piece costs. Want something else? That&apos;s what single items are for.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-3">
            {kits.map((p) => <KitCard key={p.handle} p={p} featured={p.featured} />)}
          </div>
        </div>
      </section>

      {/* Kits vs single items */}
      <section className="py-20 md:py-28 border-b border-white/10">
        <div className={`${wrap} grid grid-cols-1 lg:grid-cols-12 gap-12`}>
          <div className="lg:col-span-5">
            <Display size="lg">Kits or<br /><span className="text-outline">Single Items.</span></Display>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-t-2 border-cream pt-6">
              <h3 className="font-display font-black uppercase text-2xl mb-3">Kits</h3>
              <p className="font-sans text-cream/65 leading-relaxed">A full set for every person, already picked and packed at one price. Piece for piece it costs less than buying the same garments separately — and the bigger the kit, the less each piece costs.</p>
            </div>
            <div className="border-t-2 border-cream/30 pt-6">
              <h3 className="font-display font-black uppercase text-2xl mb-3">Single Items</h3>
              <p className="font-sans text-cream/65 leading-relaxed">When you want one thing. Any garment on its own — 8 minimum embroidered or 12 printed — with the price per piece dropping as you add more.</p>
            </div>
            <p className="md:col-span-2 font-sans text-cream/50 leading-relaxed">Either way, logo setup and your art proof are included, you see a mockup before anything is made, and you get every cent back until you approve it.</p>
            <div className="md:col-span-2 flex flex-wrap gap-4">
              <a href="/apparel/kits" className={btnLight}>Pick Your Kit →</a>
              <a href="/apparel/single-items" className={btnGhost}>Browse Single Items</a>
            </div>
          </div>
        </div>
      </section>

      {/* Mockup preview */}
      <section className="py-20 md:py-28 border-b border-white/10">
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <Display size="lg">Know What&apos;s<br /><span className="text-outline">In The Box.</span></Display>
            <p className="font-sans text-cream/60 max-w-md leading-relaxed">Before anything is made you get a mockup like this — your logo and colors on every piece. Nothing runs until you approve it.</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-px bg-white/10 border border-white/10">
            {(['tee', 'longsleeve', 'hoodie', 'polo', 'cap', 'beanie'] as Garment[]).map((g, i) => (
              <div key={g} className="bg-[#141312] aspect-square p-4 grid place-items-center">
                <GarmentIcon garment={g} color={['#111111', '#3d3d3f', '#111111', '#f4f4f2', '#111111', '#3d3d3f'][i]} logo="/logo-icon-white.png" className="w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-cream text-[#0a0908] py-20 md:py-28">
        <div className={wrap}>
          <Eyebrow dark>How It Works</Eyebrow>
          <Display size="lg" className="mb-12">Three Steps.<br /><span className="text-outline">Done.</span></Display>
          <Steps dark />
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-20 md:py-32 border-b border-white/10">
        <div className={`${wrap} grid grid-cols-1 lg:grid-cols-12 gap-12`}>
          <div className="lg:col-span-6">
            <Display size="lg">First Impressions<br /><span className="text-outline">Wear Your Logo.</span></Display>
          </div>
          <div className="lg:col-span-6 space-y-6 font-sans text-lg text-cream/65 leading-relaxed">
            <p>The truck gets you to the job. The person who walks up to the door is who the customer actually judges.</p>
            <p>A crew in matching gear reads as an established company before anyone says a word. A crew in whatever they own reads as a side gig — same people, same work, different price you can charge.</p>
            <p className="text-cream">A kit is a one-time buy starting at {money(kitsFrom)}. You own it, and it shows up at every job.</p>
            <a href="/apparel/kits" className={btnLight}>Pick Your Kit →</a>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-20 md:py-28 border-b border-white/10">
        <div className={wrap}>
          <Eyebrow>Our Promise</Eyebrow>
          <Display size="lg" className="mb-12">See It<br /><span className="text-outline">First.</span></Display>
          <Guarantee />
          <a href="/apparel/kits" className={`mt-10 ${btnLight}`}>Pick Your Kit →</a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className={`${wrap} grid grid-cols-1 lg:grid-cols-12 gap-12`}>
          <div className="lg:col-span-4">
            <Display size="lg">Quest&shy;ions.</Display>
          </div>
          <div className="lg:col-span-8"><Faq /></div>
        </div>
      </section>

      <CustomQuote />
    </div>
  )
}
