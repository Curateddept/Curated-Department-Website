'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useCart } from './CartContext'
import GarmentIcon from './GarmentIcon'
import {
  type Product,
  SHOP,
  cover,
  garmentFor,
  kitDetails,
  perPiece,
  pieceCount,
  money,
  priceRange,
  tiers,
  minQty, sized
} from '@/lib/shop/catalog'

export const wrap = 'max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20'

export const btnLight =
  'btn-wipe [--wipe:#0a0908] inline-flex items-center justify-center gap-3 bg-cream text-[#0a0908] hover:text-cream font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-7 py-4 transition-colors duration-300'
export const btnGhost =
  'btn-wipe [--wipe:#F4F4F2] inline-flex items-center justify-center gap-3 border border-cream/40 hover:border-cream text-cream hover:text-[#0a0908] font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-7 py-4 transition-colors duration-300'
export const btnDark =
  'btn-wipe [--wipe:#F4F4F2] inline-flex items-center justify-center gap-3 bg-[#0a0908] text-cream hover:text-[#0a0908] border border-[#0a0908] font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-7 py-4 transition-colors duration-300'

const NAV = [
  { label: 'Overview', href: '/apparel' },
  { label: 'Team Gear', href: '/apparel/team-gear' },
  { label: 'Kits', href: '/apparel/kits' },
  { label: 'Gifts', href: '/apparel/gifts' },
  { label: 'Single Items', href: '/apparel/single-items' },
  { label: 'How It Works', href: '/apparel/how-it-works' },
]

export function ShopNav() {
  const path = usePathname()
  const { count } = useCart()
  return (
    <div className="sticky top-16 z-40 bg-[#0a0908]/95 backdrop-blur-md border-b border-white/10">
      <div className={`${wrap} flex items-center justify-between gap-6 h-12`}>
        <nav className="flex items-center gap-5 md:gap-7 overflow-x-auto scrollbar-hide">
          <span className="hidden md:inline font-display font-black uppercase text-cream text-sm tracking-[0.12em] pr-2 border-r border-white/15">
            Apparel
          </span>
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`whitespace-nowrap font-sans text-[11px] font-medium uppercase tracking-[0.16em] transition-colors ${
                path === n.href ? 'text-cream' : 'text-cream/50 hover:text-cream'
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a href="/apparel/cart" className="flex-shrink-0 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-cream">
          Cart
          <span className={`min-w-[22px] h-[22px] px-1.5 rounded-full grid place-items-center text-[10px] ${count ? 'bg-cream text-[#0a0908]' : 'border border-cream/30 text-cream/60'}`}>
            {count}
          </span>
        </a>
      </div>
    </div>
  )
}

export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <span className={`font-serif italic text-xl block mb-5 ${dark ? 'text-[#0a0908]/60' : 'text-cream/60'}`}>— {children}</span>
}

export function Display({ children, size = 'lg', className = '' }: { children: React.ReactNode; size?: 'xl' | 'lg' | 'md'; className?: string }) {
  const fs = { xl: 'clamp(52px, 10vw, 168px)', lg: 'clamp(40px, 7vw, 112px)', md: 'clamp(32px, 4.6vw, 72px)' }[size]
  return (
    <h2 className={`font-display font-black uppercase leading-[0.88] tracking-tighter ${className}`} style={{ fontSize: fs }}>
      {children}
    </h2>
  )
}

export function ProductCard({ p }: { p: Product }) {
  const { min, max } = priceRange(p)
  const t = tiers(p)
  const garment = garmentFor(p)
  return (
    <a href={`/apparel/products/${p.handle}`} className="group flex flex-col border border-white/10 hover:border-cream/60 transition-colors duration-300">
      <div className="relative aspect-square bg-[#141312] overflow-hidden">
        {cover(p) ? (
          <img src={sized(cover(p), 600)} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <GarmentIcon garment={garment} color="#2a2928" className="absolute inset-[14%] w-[72%] h-[72%] group-hover:scale-105 transition-transform duration-500" />
        )}
        {p.brand && (
          <span className="absolute top-3 left-3 bg-[#0a0908]/80 px-2 py-1 font-sans text-[9px] uppercase tracking-[0.2em] text-cream/80">{p.brand}</span>
        )}
      </div>
      <div className="p-4 md:p-5 flex flex-col gap-2 flex-1">
        <h3 className="font-display font-black uppercase text-cream text-lg leading-[1] tracking-tight">{p.title}</h3>
        {p.spec && <p className="font-sans text-[11px] text-cream/45 leading-snug">{p.spec}</p>}
        <p className="mt-auto pt-2 font-sans text-sm text-cream">
          {perPiece(p) ? (
            <>
              From <span className="font-semibold">{money(t.length ? t[t.length - 1].price : min, true)}</span>
              <span className="text-cream/45"> / piece · {minQty(p)} min</span>
            </>
          ) : min === max ? (
            <span className="font-semibold">{money(min)}</span>
          ) : (
            <>From <span className="font-semibold">{money(min)}</span></>
          )}
        </p>
      </div>
    </a>
  )
}

export function KitCard({ p, featured = false }: { p: Product; featured?: boolean }) {
  const d = kitDetails[p.handle]
  const { min } = priceRange(p)
  const cheapest = p.variants.reduce((a, b) => (b.price < a.price ? b : a), p.variants[0])
  const pieces = pieceCount(p, cheapest.options)
  // "How many hoodies: 12 / 24 / 50" reads as the kit sizes on offer.
  const counts = p.options.find((o) => /^how many/i.test(o.name))
  // The spec tag names one default count ("24 Lane Seven hoodies"); drop it when the kit offers several.
  const lines = (p.spec ? p.spec.split(' · ') : []).map((l, i) => (i === 0 && counts && counts.values.length > 1 ? l.replace(/^\d+\s+/, '') : l))
  const img = cover(p)
  const muted = featured ? 'text-[#0a0908]/55' : 'text-cream/50'
  return (
    <a
      href={`/apparel/products/${p.handle}`}
      className={`group relative flex flex-col border transition-colors duration-300 ${featured ? 'bg-cream text-[#0a0908] border-cream' : 'border-white/15 text-cream hover:border-cream/60'}`}
    >
      {d?.badge && (
        <span className={`absolute -top-3 left-6 z-10 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] ${featured ? 'bg-[#0a0908] text-cream' : 'bg-cream text-[#0a0908]'}`}>
          {d.badge}
        </span>
      )}
      {img && (
        <div className="relative aspect-square overflow-hidden bg-[#141312]">
          <img src={sized(img, 800)} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="flex flex-col flex-1 p-6 md:p-7">
        <h3 className="font-display font-black uppercase text-3xl leading-none tracking-tight">{p.title}</h3>
        {d && <p className={`font-sans text-sm mt-2 ${muted}`}>{d.forWho}</p>}

        <div className="mt-5 flex items-end gap-3">
          <span className={`font-sans text-[10px] uppercase tracking-[0.2em] pb-2 ${muted}`}>From</span>
          <span className="font-display font-black text-5xl leading-none tracking-tighter">{money(min)}</span>
        </div>
        {pieces > 0 && <p className={`font-sans text-xs mt-2 ${muted}`}>{pieces} pieces · {money(min / pieces, true)} a piece</p>}

        {(lines.length > 0 || counts) && (
          <ul className={`mt-5 pt-5 border-t flex flex-col gap-1.5 font-sans text-sm ${featured ? 'border-[#0a0908]/15' : 'border-white/10'}`}>
            {lines.map((l) => <li key={l}>— {l.charAt(0).toUpperCase() + l.slice(1)}</li>)}
            {counts && counts.values.length > 1 && <li>— Pick {counts.values.join(', ').replace(/, ([^,]*)$/, ' or $1')}</li>}
            {(d?.perks ?? []).map((x) => <li key={x}>— {x}</li>)}
          </ul>
        )}

        <ul className={`mt-4 flex flex-col gap-1 font-sans text-xs ${muted}`}>
          {['Mockup in 1 business day', 'Full refund until you approve'].map((x) => <li key={x}>✓ {x}</li>)}
        </ul>

        <span className={`mt-auto pt-6`}>
          <span className={featured ? btnDark : btnLight}>Build This Kit →</span>
        </span>
        <p className={`mt-4 font-sans text-[11px] ${muted}`}>
          No setup fees — logo digitizing ({money(SHOP.digitizingValue)} value) and your mockup are included.
        </p>
      </div>
    </a>
  )
}

export const STEPS = [
  {
    n: '01',
    title: 'Choose & Upload',
    body: 'Pick the kit that fits your headcount — every kit is named for its piece count. Drop in one logo. A clean vector is great; a phone photo of your truck door works too.',
  },
  {
    n: '02',
    title: 'See It First',
    body: 'Within one business day you get a mockup of every piece with your logo, in your colors. Send sizes now or after you see it.',
  },
  {
    n: '03',
    title: 'Say Go',
    body: 'Nothing gets made until you approve. Then we print, stitch, pack it by person and ship it — ready in 7 to 10 business days.',
  },
]

export function Steps({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-px ${dark ? 'bg-[#0a0908]/15' : 'bg-white/10'}`}>
      {STEPS.map((s) => (
        <div key={s.n} className={`p-8 md:p-10 ${dark ? 'bg-cream text-[#0a0908]' : 'bg-[#0a0908] text-cream'}`}>
          <span className="font-display font-black text-outline text-7xl leading-none block mb-6">{s.n}</span>
          <h3 className="font-display font-black uppercase text-3xl leading-none tracking-tight mb-4">{s.title}</h3>
          <p className={`font-sans leading-relaxed ${dark ? 'text-[#0a0908]/65' : 'text-cream/60'}`}>{s.body}</p>
        </div>
      ))}
    </div>
  )
}

export const GUARANTEE = [
  { t: 'See it before it exists', b: 'You approve a mockup of every piece before anything is made. Not right? We revise it free until it is.' },
  { t: 'Change your mind, keep your money', b: 'Cancel any time before you approve the mockup and you get a full refund.' },
  { t: 'Arrives wrong, we make it right', b: 'If a piece doesn’t match what you approved, send a photo within 14 days and we fix or replace it free.' },
  { t: 'Reorders without restarting', b: 'Your logo and sizes stay on file, and reorder pricing is locked for 12 months — even for one shirt.' },
]

export function Guarantee() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
      {GUARANTEE.map((g) => (
        <div key={g.t} className="bg-[#0a0908] p-8 md:p-10">
          <h3 className="font-display font-black uppercase text-cream text-2xl leading-none tracking-tight mb-3">{g.t}</h3>
          <p className="font-sans text-cream/60 leading-relaxed">{g.b}</p>
        </div>
      ))}
    </div>
  )
}

export const FAQS = [
  {
    q: 'How fast is it?',
    a: `Your mockup lands within one business day. After you approve it, your order is ready in ${SHOP.turnaround}. Shipping is calculated at checkout. On a deadline? Email ${SHOP.email} before ordering and ask about rush.`,
  },
  {
    q: 'Kit or single items?',
    a: 'A kit gives everyone a full set, packed together at one price — and piece for piece it costs less than buying the same garments separately. Single items are for one garment at a time: 8 minimum embroidered, 12 minimum printed, and the per-piece price drops as you add more.',
  },
  {
    q: 'What if I don’t love the mockup?',
    a: 'Tell us what to change and we revise it free until it’s right. Change your mind before approving and you get a full refund.',
  },
  {
    q: 'Do I need sizes before I order?',
    a: 'No. Enter them on the kit page if you have them, or choose “send sizes after my mockup” and reply with them any time before you approve.',
  },
  {
    q: 'My logo file isn’t great. Is that okay?',
    a: 'Send whatever you have — PNG, JPG, a PDF, even a photo of a shirt or your truck. If it needs cleanup, our design team redraws it as part of the mockup. Vector files (AI, EPS, PDF, SVG) are ideal if you have them.',
  },
  {
    q: 'Can I pick my own colors?',
    a: 'Yes. Choose a color for each piece on the kit page from real stock colors, or one color for the whole kit. Need something specific? Put it in the notes and we’ll match it.',
  },
  {
    q: 'What about 2XL and up?',
    a: `S through XL are included. 2XL and up add ${money(SHOP.bigSizeUpcharge)} a piece, billed once your sizes are in. Need 4XL or bigger? Tell us and we’ll price it.`,
  },
  {
    q: 'Can I change what’s in a kit?',
    a: 'Kits are built around the runs that keep the price down. Want a different mix, outerwear, promo items or something we don’t list? Request a custom quote and we’ll price it.',
  },
]

export function Faq({ items = FAQS }: { items?: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="border-t border-white/15">
      {items.map((f, i) => (
        <div key={f.q} className="border-b border-white/15">
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="w-full flex items-center justify-between gap-6 py-6 text-left"
          >
            <span className="font-display font-black uppercase text-cream text-xl md:text-2xl leading-tight tracking-tight">{f.q}</span>
            <span className={`text-cream text-3xl leading-none transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>+</span>
          </button>
          <div className={`grid transition-all duration-300 ${open === i ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'}`}>
            <p className="overflow-hidden font-sans text-cream/65 leading-relaxed max-w-3xl">{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function CustomQuote() {
  return (
    <section className="border-t border-white/10 py-20 md:py-28">
      <div className={`${wrap} flex flex-col lg:flex-row lg:items-end justify-between gap-10`}>
        <div>
          <Eyebrow>Not sure which kit?</Eyebrow>
          <Display size="lg" className="text-cream">
            Send a Logo.<br /><span className="text-outline">We&apos;ll Pick.</span>
          </Display>
          <p className="font-sans text-lg text-cream/60 max-w-xl mt-6 leading-relaxed">
            Email your logo and headcount to {SHOP.email} or call {SHOP.phone}. We&apos;ll recommend the right kit and send the mockup first. Need jackets, promo or a custom mix? We quote anything.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <a href="/apparel/kits" className={btnLight}>Pick Your Kit →</a>
          <a href="/contact" className={btnGhost}>Custom Quote</a>
        </div>
      </div>
    </section>
  )
}
