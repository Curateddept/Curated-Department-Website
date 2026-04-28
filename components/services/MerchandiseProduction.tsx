'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const subServices = [
  {
    id: '2A',
    title: 'Product Design & Development',
    accent: '#EDD96A',
    description:
      'Custom apparel design, full product creation from scratch, and private label builds for brands looking to own their line. We take your vision and turn it into a production-ready product.',
    includes: [
      'Custom apparel and product design',
      'Private label brand development',
      'Tech pack creation and spec sheets',
      'Sampling and prototype review',
      'Full product line development',
      'Colorway and material selection',
    ],
  },
  {
    id: '2B',
    title: 'Production & Sourcing',
    accent: '#C5D8F2',
    description:
      'Low to high quantity runs, domestic and overseas production options, and material sourcing to fit your budget and quality standards. We manage the supply chain so you don\'t have to.',
    includes: [
      'Low-MOQ and high-volume production runs',
      'Domestic USA production options',
      'Overseas sourcing and factory vetting',
      'Material and fabric sourcing',
      'Quality control and inspection',
      'Production timeline management',
    ],
  },
  {
    id: '2C',
    title: 'Store Setup & Management',
    accent: '#FF5A3D',
    description:
      'Shopify store builds, product uploads with optimized listings, and ongoing store management for conversions. Your online storefront, built to sell.',
    includes: [
      'Shopify store build and configuration',
      'Product page copy and photography setup',
      'Optimized listings for conversion',
      'Payment, shipping, and tax setup',
      'App integrations and automation',
      'Ongoing store management and updates',
    ],
  },
  {
    id: '2D',
    title: 'Fulfillment (3PL)',
    accent: '#A8C4DF',
    description:
      'Inventory storage, order fulfillment, and shipping logistics. We handle the physical side of your product business — pick, pack, ship — so you never have to touch a package.',
    includes: [
      'Inventory receiving and storage',
      'Pick, pack, and ship per order',
      'Real-time inventory tracking',
      'Returns and exchanges management',
      'Multi-carrier shipping options',
      'Bulk and wholesale fulfillment',
    ],
  },
  {
    id: '2E',
    title: 'Customer Experience',
    accent: '#EDD96A',
    description:
      'Packaging systems, branded boxes and inserts, and customer service support that elevate the unboxing and post-purchase experience. The details that turn customers into repeat buyers.',
    includes: [
      'Custom branded packaging design',
      'Boxes, mailers, and poly bag options',
      'Inserts, thank-you cards, and collateral',
      'Unboxing experience design',
      'Post-purchase follow-up support',
      'Customer service coordination',
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
        <p className="font-sans text-[9px] tracking-[0.22em] uppercase text-cream/25 mb-5">What's Included</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {sub.includes.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="w-1 h-1 rounded-full flex-shrink-0 mt-[7px]" style={{ background: sub.accent }} />
              <span className="font-sans text-sm text-cream/60">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function MerchandiseProduction() {
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
          <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-brand-green">Merchandise Production</span>
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
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">02 / Merchandise</span>
            </motion.div>
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
                className="font-display font-black italic text-cream leading-[0.88]"
                style={{ fontSize: 'clamp(44px, 7vw, 108px)' }}
              >
                Merchandise<br />Production &amp;<br />Fulfillment.
              </motion.h1>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-2 mt-8"
            >
              {['Product Design', 'Production', 'Shopify', '3PL', 'Packaging'].map((t) => (
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
              "Build a real product business — without building the backend."
            </p>
            <p className="font-sans font-light text-cream/45 text-sm leading-relaxed mb-5">
              From concept to customer — we handle your entire merchandise operation. Design, production, fulfillment, and the customer experience in between.
            </p>
            <div className="border border-white/[0.08] bg-[#111111] px-5 py-4 rounded-sm">
              <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-cream/30 mb-1">Pricing</p>
              <p className="font-display font-black text-cream text-xl">Project + Volume Based</p>
              <p className="font-sans text-xs text-cream/35 mt-1">Custom quotes — no off-the-shelf packages</p>
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
            <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-brand-green mb-3">Ready to build your product line?</p>
            <h2 className="font-display font-black italic text-cream leading-[0.92]" style={{ fontSize: 'clamp(32px, 4vw, 60px)' }}>
              Let's build something<br />worth selling.
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
