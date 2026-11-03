'use client'

import { motion } from 'framer-motion'
import GarmentIcon from './GarmentIcon'
import { wrap } from './ui'
import {
  BRANDS, brandHref, byCategory, categories, cover, getProduct, money, priceRange,
  type Garment, type Product,
} from '@/lib/shop/catalog'
import { APPAREL_WORK } from '@/lib/shop/gallery'

const kitsFrom = Math.min(...byCategory('kits').map((p) => priceRange(p).min))

// Pill buttons, monochrome take on the partner site's rounded CTAs
const pillDark = 'inline-flex items-center gap-3 rounded-full bg-[#0a0908] text-cream pl-6 pr-2 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-[#2a2928] transition-colors'
const pillLight = 'inline-flex items-center gap-3 rounded-full bg-cream text-[#0a0908] pl-6 pr-2 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-white transition-colors'
const pillGhost = 'inline-flex items-center gap-3 rounded-full border border-current px-6 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-cream hover:text-[#0a0908] transition-colors'
const Arrow = ({ dark }: { dark?: boolean }) => (
  <span className={`grid place-items-center h-8 w-8 rounded-full ${dark ? 'bg-cream text-[#0a0908]' : 'bg-[#0a0908] text-cream'}`}>→</span>
)

const CLIENTS = [
  { name: 'Porsche of Naples', src: '/logos/clients/porsche-of-naples.png', h: 46 },
  { name: 'Amazon', src: '/logos/clients/amazon.png', h: 34 },
  { name: 'ACC', src: '/logos/clients/acc.png', h: 34 },
  { name: 'Coca-Cola', src: '/logos/clients/coca-cola.png', h: 40 },
  { name: 'Donut Media', src: '/logos/clients/donut-media.png', h: 40 },
  { name: 'No Fear', src: '/logos/mono/no-fear.png', h: 40 },
]

const SERVICES = [
  { title: 'Screen Printing', line: 'Bold, durable ink built for standout apparel.', href: '/services/print-production', img: '/work/no-fear/back-print.jpg' },
  { title: 'Embroidery', line: 'Stitched texture and depth that lasts for years.', href: '/services/merchandise-production', img: '/work/no-fear/hoodie-bike.jpg' },
  { title: 'DTF Printing', line: 'Full-color detail on almost any fabric.', href: '/services/print-production', img: '/work/no-fear/white-tee.jpg' },
  { title: 'Dye Sublimation', line: 'Edge-to-edge color dyed into performance fabric.', href: '/services/dye-sublimation', img: '/work/no-fear/night-rider.jpg' },
  { title: 'Design', line: 'Where rough ideas become production-ready art.', href: '/services/branding-experience', img: '/work/no-fear/rack-bw.jpg' },
  { title: 'Promo & Fulfillment', line: 'Branded goods, kitted, packed and shipped.', href: '/services/merchandise-production', img: '/work/no-fear/merch-rack.jpg' },
]

const ONLINE_KITS: { handle: string; garment: Garment; label: string; blurb: string }[] = [
  { handle: 'classic-tee-kit', garment: 'tee', label: '50 Classic Tees', blurb: '50 Lane Seven tees, left chest and a big back print.' },
  { handle: 'premium-tee-kit', garment: 'tee', label: 'Premium Tees', blurb: '50 to 200 Comfort Colors heavyweights, up to 4 colors.' },
  { handle: 'hoodie-kit', garment: 'hoodie', label: 'Premium Hoodies', blurb: '12, 24 or 50 Lane Seven hoodies. Add a back print.' },
  { handle: 'beanie-kit', garment: 'beanie', label: 'Embroidered Beanies', blurb: '12, 24 or 50 knit beanies, logo stitched on the cuff.' },
]

const GROW = [
  'Private-label finishing that keeps every piece on-brand',
  'Program and uniform support whenever your team grows',
  'Concept, design and production handled under one roof',
]

const CRAFT = [
  { icon: '⏱', t: 'Fast & Exact', b: 'Mockups in one business day. Most orders ready 7 to 10 business days after approval — quality never traded for speed.' },
  { icon: '✓', t: 'Easy to Order', b: 'Set online prices for kits and single items, or one dedicated contact for custom projects. You see it before it’s made.' },
  { icon: '✦', t: 'Ideas, Sharpened', b: 'A creative department on every order — smarter placements, better garment picks and art that actually prints well.' },
]

function SectionHead({ eyebrow, title, sub, dark = false }: { eyebrow?: string; title: string; sub?: string; dark?: boolean }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
      {eyebrow && <p className={`font-sans text-[11px] font-semibold uppercase tracking-[0.24em] mb-4 ${dark ? 'text-[#0a0908]/50' : 'text-cream/50'}`}>{eyebrow}</p>}
      <h2 className="font-display font-black uppercase leading-[0.9] tracking-tighter" style={{ fontSize: 'clamp(36px, 5.6vw, 88px)' }}>{title}</h2>
      {sub && <p className={`font-sans text-lg mt-5 leading-relaxed ${dark ? 'text-[#0a0908]/65' : 'text-cream/60'}`}>{sub}</p>}
    </div>
  )
}

export default function ApparelIntro() {
  const online = ONLINE_KITS.map((k) => ({ ...k, p: getProduct(k.handle) as Product })).filter((k) => k.p)

  return (
    <div className="bg-[#0a0908] text-cream">

      {/* 1 — Hero */}
      <section className="relative min-h-[92svh] flex items-center overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-40 grayscale contrast-125">
          <source src="https://res.cloudinary.com/dd6li0e1c/video/upload/v1777403353/webteas_lulxtl.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0908]/95 via-[#0a0908]/70 to-[#0a0908]/20" />
        <div className={`${wrap} relative w-full py-28`}>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }} animate={{ y: '0%' }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              className="font-display font-black uppercase leading-[0.86] tracking-tighter max-w-5xl"
              style={{ fontSize: 'clamp(56px, 10.5vw, 176px)' }}
            >
              Wear What<br /><span className="text-outline">You Build.</span>
            </motion.h1>
          </div>
          <p className="font-display font-black uppercase text-xl md:text-2xl mt-6 tracking-tight">Custom Apparel · Printing · Embroidery</p>
          <p className="font-sans text-base md:text-lg text-cream/70 max-w-xl mt-5 leading-relaxed">
            Curated&apos;s apparel arm is a full creative department with production behind it — built to help brands, crews and teams <strong className="text-cream">design</strong>, <strong className="text-cream">produce</strong> and <strong className="text-cream">scale</strong> apparel without the guesswork.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <a href="/contact" className={pillLight}>Start Your Project <Arrow /></a>
            <a href="#what-we-make" className={`${pillGhost} text-cream`}>Explore Services</a>
          </div>
        </div>
      </section>

      {/* 2 — Client logo strip */}
      <section className="bg-cream text-[#0a0908] border-y border-[#0a0908]/10">
        <div className={`${wrap} py-8 md:py-10 flex flex-wrap items-center justify-center md:justify-between gap-x-12 gap-y-8`}>
          {CLIENTS.map((c) => (
            <img key={c.name} src={c.src} alt={c.name} style={{ height: c.h }} className="w-auto object-contain invert opacity-80 hover:opacity-100 transition-opacity" />
          ))}
        </div>
      </section>

      {/* 3 — Services */}
      <section id="what-we-make" className="bg-cream text-[#0a0908] py-20 md:py-28 scroll-mt-28">
        <div className={wrap}>
          <SectionHead dark title="Gear People Actually Want To Wear" sub="Quality you can feel the second you pick it up." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {SERVICES.map((s) => (
              <a key={s.title} href={s.href} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-[#0a0908]">
                <img src={s.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                  <h3 className="font-display font-black uppercase text-3xl leading-none">{s.title}</h3>
                  <p className="font-sans text-sm text-cream/75 mt-2 mb-5">{s.line}</p>
                  <span className="inline-flex rounded-full bg-cream text-[#0a0908] px-5 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.16em]">Explore</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Team gear band */}
      <section className="py-20 md:py-28">
        <div className={`${wrap} grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <img src="/work/no-fear/merch-rack.jpg" alt="Collection laid out and ready to pack" className="h-full w-full object-cover grayscale" loading="lazy" />
          </div>
          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-cream/50 mb-4">Team gear for crews, shops &amp; teams</p>
            <h2 className="font-display font-black uppercase leading-[0.9] tracking-tighter" style={{ fontSize: 'clamp(40px, 5.6vw, 88px)' }}>
              Your Whole Team.<br /><span className="text-outline">One Price.</span><br />Logo On Everything.
            </h2>
            <p className="font-sans text-lg text-cream/65 mt-6 leading-relaxed">
              Matching tees, polos and caps for service crews, race teams and staff. Shirts printed front and back, polos and caps embroidered, everything packed by person. Kits from {money(kitsFrom)}.
            </p>
            <p className="font-sans text-cream/55 mt-4">Send a logo — get a free mockup of your crew within one business day.</p>
            <a href="/apparel/team-gear" className={`${pillLight} mt-8`}>See Team Gear <Arrow /></a>
          </div>
        </div>
      </section>

      {/* 5 — Order online */}
      <section className="bg-cream text-[#0a0908] py-20 md:py-28">
        <div className={wrap}>
          <SectionHead dark eyebrow="Rather order online?" title="Know What You Need? Order It Here." sub="Kits have set prices. Pick one, add your logo and check out — you still get a free mockup before anything is made." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {online.map(({ p, garment, label, blurb }) => {
              const { min, max } = priceRange(p)
              return (
                <a key={p.handle} href={`/apparel/products/${p.handle}`} className="group flex flex-col rounded-2xl bg-white border border-[#0a0908]/10 overflow-hidden hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] transition-shadow">
                  <div className="relative aspect-square bg-[#0a0908] p-8">
                    {cover(p) ? (
                      <img src={`${cover(p)}&width=700`} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <GarmentIcon garment={garment} color="#f4f4f2" logo="/logo-icon.png" className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
                    )}
                    <span className="absolute top-4 right-4 rounded-full bg-cream text-[#0a0908] px-3 py-1 font-display font-black text-lg">{min === max ? money(min) : money(min)}</span>
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <h3 className="font-display font-black uppercase text-xl leading-none">{label}</h3>
                    <p className="font-sans text-sm text-[#0a0908]/60 leading-snug">{blurb}</p>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <span className="font-display font-black text-xl">{min === max ? money(min) : `From ${money(min)}`}</span>
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] group-hover:translate-x-1 transition-transform">See kit →</span>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
          <ul className="flex flex-col items-center gap-2 mt-10 font-sans text-sm text-[#0a0908]/70">
            <li>✓ Free mockup in 1 business day</li>
            <li>✓ Full refund until you approve it</li>
          </ul>
          <div className="flex justify-center mt-8">
            <a href="/apparel/kits" className={pillDark}>Shop All Kits <Arrow dark /></a>
          </div>
          <p className="text-center font-sans text-xs text-[#0a0908]/50 mt-5">Team Gear is the online store of Curated Department&apos;s apparel team.</p>
        </div>
      </section>

      {/* 6 — Ideas become real */}
      <section className="py-20 md:py-28">
        <div className={`${wrap} grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
          <div>
            <h2 className="font-display font-black uppercase leading-[0.9] tracking-tighter" style={{ fontSize: 'clamp(40px, 5.6vw, 88px)' }}>
              This Is Where<br /><span className="text-outline">Ideas Get Made.</span>
            </h2>
            <p className="font-sans text-lg text-cream/65 mt-6 leading-relaxed max-w-xl">
              Curated brings design, decoration and fulfillment together, so your apparel goes from idea to finished piece without bouncing between vendors.
            </p>
            <p className="font-sans text-cream/55 mt-4 leading-relaxed max-w-xl">
              Strategists, designers and production people work side by side on every order — the same team behind full-scope merch programs for brands like No Fear.
            </p>
            <a href="/work" className={`${pillLight} mt-8`}>See Our Work <Arrow /></a>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
              <img src="/work/no-fear/black-tee.jpg" alt="Rider in a Curated-produced tee" className="h-full w-full object-cover grayscale" loading="lazy" />
            </div>
            <div className="lg:absolute lg:-bottom-10 lg:-left-10 mt-4 lg:mt-0 rounded-2xl bg-cream text-[#0a0908] p-6 md:p-7 max-w-sm shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
              <p className="font-display font-black uppercase text-lg mb-4">Built to grow with your brand:</p>
              <ul className="flex flex-col gap-2">
                {GROW.map((g) => (
                  <li key={g} className="flex gap-3 items-start rounded-xl bg-[#0a0908] text-cream px-4 py-3 font-sans text-sm leading-snug">
                    <span className="mt-0.5">✓</span>{g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — Craft meets capability */}
      <section className="bg-cream text-[#0a0908] py-20 md:py-28 lg:pt-36">
        <div className={wrap}>
          <SectionHead dark title="Where Craft Meets Capacity" sub="Simple steps, straight answers and real support — from idea to finished product with total confidence." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {CRAFT.map((c) => (
              <div key={c.t} className="rounded-2xl bg-white border border-[#0a0908]/10 p-8">
                <span className="grid place-items-center h-12 w-12 rounded-full bg-[#0a0908] text-cream text-xl mb-6">{c.icon}</span>
                <h3 className="font-display font-black uppercase text-2xl leading-none mb-3">{c.t}</h3>
                <p className="font-sans text-[#0a0908]/65 leading-relaxed">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — Foundation story */}
      <section className="bg-cream text-[#0a0908] pb-20 md:pb-28">
        <div className={`${wrap} grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
          <div className="aspect-[4/3] overflow-hidden rounded-2xl">
            <img src="/work/no-fear/red-bike.jpg" alt="Curated on set" className="h-full w-full object-cover grayscale" loading="lazy" />
          </div>
          <div>
            <h2 className="font-display font-black uppercase leading-[0.9] tracking-tighter" style={{ fontSize: 'clamp(40px, 5.6vw, 88px)' }}>
              Built On<br /><span className="text-outline">The Work.</span>
            </h2>
            <p className="font-display font-black uppercase text-lg mt-6">Founded in 2018. Rooted in motorsports. 300+ brands since.</p>
            <p className="font-sans text-[#0a0908]/65 mt-4 leading-relaxed">
              Curated Department started inside motorsports and action sports — race teams, riders and the brands that build around them. Apparel was never a side service; it&apos;s how those brands show up at the track, in the shop and in the feed.
            </p>
            <p className="font-sans text-[#0a0908]/65 mt-4 leading-relaxed">
              From icons like No Fear to local crews who just need to look like the pros they are, the standard is the same: get it right before it&apos;s made, then make it last.
            </p>
            <a href="/about" className={`${pillDark} mt-8`}>See Who We Are <Arrow dark /></a>
          </div>
        </div>
      </section>

      {/* 9 — Proof (in place of the review carousel) */}
      <section className="py-20 md:py-28">
        <div className={wrap}>
          <SectionHead title="See What We've Made" sub="Full-scope merch, content and print — designed, produced and launched by the team that builds your order." />
          <a href="/work/no-fear" className="group relative block overflow-hidden rounded-2xl aspect-[16/10] md:aspect-[21/9]">
            <img src="/work/no-fear/hero.jpg" alt="No Fear campaign by Curated" className="absolute inset-0 h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end">
              <img src="/logos/mono/no-fear-solid.png" alt="No Fear" className="w-[min(50vw,320px)] mb-4" />
              <p className="font-display font-black uppercase text-2xl md:text-4xl">Read the case study →</p>
            </div>
          </a>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {(APPAREL_WORK.length
              ? APPAREL_WORK
              : ['back-print', 'duo', 'field', 'rider-moto'].map((f) => ({ src: `/work/no-fear/${f}.jpg`, caption: 'Produced by Curated' }))
            ).map((w) => (
              <figure key={w.src} className="aspect-square overflow-hidden rounded-xl relative group">
                <img src={w.src} alt={w.caption} loading="lazy" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — Categories */}
      <section className="bg-cream text-[#0a0908] py-20 md:py-28">
        <div className={wrap}>
          <SectionHead dark eyebrow="Shop by category" title="Every Category." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              ...categories().map((c) => ({ key: c.type, title: c.type, sub: `${c.count} styles · from ${money(c.from, true)}/pc`, href: `/apparel/single-items?type=${encodeURIComponent(c.type)}`, garment: c.garment })),
              { key: 'kits', title: 'Crew Kits', sub: `Full sets · from ${money(kitsFrom)}`, href: '/apparel/kits', garment: 'kit' as Garment },
              { key: 'winter', title: 'Winter Kits', sub: `${byCategory('winter').length} kits`, href: '/apparel/kits', garment: 'jacket' as Garment, n: byCategory('winter').length },
              { key: 'packs', title: '24-Piece Packs', sub: `${byCategory('packs').length} packs`, href: '/apparel/kits', garment: 'tee' as Garment, n: byCategory('packs').length },
              { key: 'gifts', title: 'Holiday Gifts', sub: `${byCategory('gifts').length} gift set${byCategory('gifts').length === 1 ? '' : 's'}`, href: '/apparel/gifts', garment: 'bag' as Garment, n: byCategory('gifts').length },
              { key: 'all', title: 'All Single Items', sub: `${byCategory('single').length} styles`, href: '/apparel/single-items', garment: 'hoodie' as Garment },
            ].filter((c) => !('n' in c) || c.n).map((c) => (
              <a key={c.key} href={c.href} className="group rounded-2xl bg-white border border-[#0a0908]/10 hover:bg-[#0a0908] hover:text-cream transition-colors duration-300 p-5 flex flex-col">
                <div className="aspect-[4/3] mb-3">
                  <GarmentIcon garment={c.garment} color="#1c1c1c" className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-display font-black uppercase text-lg md:text-xl leading-none">{c.title}</h3>
                <p className="font-sans text-xs opacity-55 mt-2">{c.sub}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 11 — Brands we carry */}
      <section className="py-20 md:py-28">
        <div className={wrap}>
          <SectionHead eyebrow="Brands we carry" title={`${BRANDS.length} Brands. Your Logo.`} sub="Workwear staples to premium gifting — every brand below is available with your logo printed, embroidered or engraved." />
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {BRANDS.map((b) => (
              <a key={b} href={brandHref(b)} className="rounded-full font-display font-black uppercase text-lg md:text-2xl leading-none px-5 md:px-6 py-3 border border-white/20 hover:bg-cream hover:text-[#0a0908] hover:border-cream transition-colors duration-200">
                {b}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — CTA */}
      <section className="bg-cream text-[#0a0908] py-24 md:py-32">
        <div className={`${wrap} text-center`}>
          <h2 className="font-display font-black uppercase leading-[0.88] tracking-tighter mx-auto max-w-5xl" style={{ fontSize: 'clamp(48px, 8.5vw, 140px)' }}>
            Let&apos;s Build Something<br /><span className="text-outline">Worth Wearing.</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <a href="/contact" className={pillDark}>Get a Project Quote <Arrow dark /></a>
            <a href="/apparel/team-gear" className={`${pillGhost} text-[#0a0908] hover:!bg-[#0a0908] hover:!text-cream`}>Shop Team Gear</a>
          </div>
        </div>
      </section>
    </div>
  )
}
