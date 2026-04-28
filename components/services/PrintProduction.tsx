'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const promoProducts = [
  'Bottles & Tumblers', 'Pens & Pencils', 'Lanyards', 'Tote Bags', 'Phone Accessories',
  'Keychains', 'USB Drives', 'Notebooks & Journals', 'Stickers & Decals', 'Magnets',
  'Koozies', 'Sunglasses', 'Blankets', 'Umbrellas', 'Power Banks', 'Lip Balm',
  'Hand Sanitizer', 'Candles', 'Gift Sets', 'Tech Accessories', 'Desk Items',
  'Fitness Gear', 'Pet Accessories', 'Patches', 'Buttons & Pins',
]

const subServices = [
  {
    id: '3A',
    title: 'Business Essentials',
    accent: '#FF5A3D',
    description:
      'The foundational print materials every business needs. Business cards, flyers, hard stock and copy stock — professionally printed and ready to represent your brand.',
    includes: [
      'Business cards (standard and premium stock)',
      'Flyers and sell sheets',
      'Brochures and fold-outs',
      'Letterhead and envelopes',
      'Hard stock and copy stock options',
      'Rush production available',
    ],
  },
  {
    id: '3B',
    title: 'Labels & Packaging',
    accent: '#EDD96A',
    description:
      'Product labels, packaging design, poly bags, and inserts for a polished, retail-ready presentation. Whether you\'re selling online or on shelf, the packaging is part of the product.',
    includes: [
      'Custom product label design and print',
      'Poly bags and resealable packaging',
      'Box and mailer design',
      'Hang tags and header cards',
      'Inserts and informational cards',
      'Retail-ready packaging systems',
    ],
  },
  {
    id: '3C',
    title: 'Apparel & Merchandise',
    accent: '#C5D8F2',
    description:
      'A full line of custom branded apparel. T-shirts, hoodies, hats, jackets, tanks, joggers, shorts, polos, beanies, socks — if you can wear it, we can brand it and produce it.',
    includes: [
      'T-shirts and tanks (all styles)',
      'Hoodies, crewnecks, and sweatshirts',
      'Hats, beanies, and headwear',
      'Jackets and outerwear',
      'Joggers, shorts, and bottoms',
      'Polos, socks, and accessories',
    ],
  },
  {
    id: '3D',
    title: 'Promotional Products',
    accent: '#A8C4DF',
    description:
      'The possibilities are nearly endless. If it exists, we can put your brand on it. Perfect for trade shows, events, giveaways, corporate gifting, and retail.',
    includes: promoProducts,
    isPromo: true,
  },
  {
    id: '3E',
    title: 'Large Format Printing',
    accent: '#FF5A3D',
    description:
      'Banners, signage, event graphics, wall wraps, window decals, floor graphics, vehicle wraps, yard signs, and trade show displays for maximum visual impact wherever your brand shows up.',
    includes: [
      'Banners and retractable displays',
      'Event and trade show graphics',
      'Wall wraps and murals',
      'Window and floor decals',
      'Vehicle wraps and graphics',
      'Yard signs and outdoor signage',
    ],
  },
]

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.33, 1, 0.68, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SubServiceSection({ sub }: { sub: (typeof subServices)[0] }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.05, ease: [0.33, 1, 0.68, 1] }}
      className="border-t border-white/[0.08] py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8"
    >
      <div className="md:col-span-4">
        <span
          className="inline-block font-sans text-[9px] tracking-[0.22em] uppercase px-2.5 py-1.5 mb-4"
          style={{ color: sub.accent, background: `${sub.accent}15` }}
        >
          {sub.id}
        </span>
        <h3
          className="font-display font-black italic text-cream leading-[0.92] mb-4"
          style={{ fontSize: 'clamp(22px, 2.5vw, 36px)' }}
        >
          {sub.title}
        </h3>
        <p className="font-sans font-light text-cream/50 text-sm leading-relaxed">{sub.description}</p>
      </div>
      <div className="md:col-span-8 md:pl-8">
        {sub.isPromo ? (
          <>
            <p className="font-sans text-[9px] tracking-[0.22em] uppercase text-cream/25 mb-5">Products We Can Brand</p>
            <div className="flex flex-wrap gap-2">
              {sub.includes.map((item) => (
                <span
                  key={item}
                  className="font-sans text-[10px] tracking-[0.12em] px-2.5 py-1.5 border text-cream/50"
                  style={{ borderColor: `${sub.accent}30` }}
                >
                  {item}
                </span>
              ))}
              <span
                className="font-sans text-[10px] tracking-[0.12em] px-2.5 py-1.5 border italic text-cream/30"
                style={{ borderColor: `${sub.accent}20` }}
              >
                + much more
              </span>
            </div>
          </>
        ) : (
          <>
            <p className="font-sans text-[9px] tracking-[0.22em] uppercase text-cream/25 mb-5">What's Included</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {sub.includes.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full flex-shrink-0 mt-[7px]" style={{ background: sub.accent }} />
                  <span className="font-sans text-sm text-cream/60">{item}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default function PrintProduction() {
  return (
    <main className="min-h-screen bg-[#090909]">

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-12"
        >
          <a href="/#services" className="font-sans text-[10px] tracking-[0.22em] uppercase text-cream/30 hover:text-cream/60 transition-colors">Services</a>
          <span className="font-sans text-[10px] text-cream/20">—</span>
          <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-brand-green">Print & Promotional</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-7 h-[1px] bg-brand-green" />
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">03 / Print & Promo</span>
            </motion.div>
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
                className="font-display font-black italic text-cream leading-[0.88]"
                style={{ fontSize: 'clamp(44px, 7vw, 108px)' }}
              >
                Print &amp;<br />Promotional<br />Production.
              </motion.h1>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-2 mt-8"
            >
              {['Business Print', 'Labels', 'Apparel', 'Promo Products', 'Large Format'].map((t) => (
                <span key={t} className="font-sans text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 border border-white/15 text-cream/50">{t}</span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="lg:col-span-5"
          >
            <p className="font-display font-bold italic text-cream/70 text-2xl leading-snug mb-5">
              "If it can be printed, worn, or branded — we can produce it."
            </p>
            <p className="font-sans font-light text-cream/45 text-sm leading-relaxed mb-5">
              Everything your brand needs — printed, produced, and ready to scale. From a single business card run to a full trade show build-out.
            </p>
            <div className="border border-white/[0.08] bg-[#111111] px-5 py-4 rounded-sm">
              <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-cream/30 mb-1">Pricing</p>
              <p className="font-display font-black text-cream text-xl">Quote-Based</p>
              <p className="font-sans text-xs text-cream/35 mt-1">Depends on volume + specs — contact for pricing</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="mt-16 h-[1px] bg-white/[0.08] origin-left"
        />
      </section>

      {/* Sub-services */}
      <section className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto pb-20">
        <FadeIn className="mb-4">
          <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">— Five Sub-Services</p>
        </FadeIn>
        {subServices.map((sub) => <SubServiceSection key={sub.id} sub={sub} />)}
        <div className="border-t border-white/[0.08]" />
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.06] py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <FadeIn>
            <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-brand-green mb-3">Need a quote?</p>
            <h2 className="font-display font-black italic text-cream leading-[0.92]" style={{ fontSize: 'clamp(32px, 4vw, 60px)' }}>
              Tell us what you<br />need produced.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15} className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
            <a href="/#contact" className="inline-flex items-center gap-3 bg-brand-green text-cream font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-8 py-4 rounded-sm hover:bg-[#1a6830] transition-colors duration-200">
              Get a Quote →
            </a>
            <a href="/#services" className="inline-flex items-center gap-3 border border-white/15 text-cream/50 hover:text-cream hover:border-white/30 font-sans text-[11px] tracking-[0.16em] uppercase px-8 py-4 rounded-sm transition-all duration-200">
              All Services
            </a>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
