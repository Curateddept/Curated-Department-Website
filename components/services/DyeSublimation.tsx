'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const subServices = [
  {
    id: '4A',
    title: 'Dye Sublimation Printing',
    accent: '#1E7A38',
    description:
      'Full-fabric printing with unlimited color capability — no minimums on colors, no restrictions on complexity. Designs are printed directly into the fabric for a finish that won\'t crack, fade, or peel. Cut & sew ready for production.',
    includes: [
      'Full-coverage, all-over fabric printing',
      'Unlimited colors and gradient capability',
      'Photographic-quality print reproduction',
      'Cut & sew production readiness',
      'Pantone and custom color matching',
      'Swatches and press proofs available',
    ],
  },
  {
    id: '4B',
    title: 'Motocross Gear',
    accent: '#EDD96A',
    description:
      'Jerseys, pants, and full race kits — built for the track with professional-grade quality and custom graphics. Our core niche. We know motocross gear, and we build it to perform and stand out.',
    includes: [
      'Custom motocross jerseys',
      'Race pants and full kit sets',
      'Number plate and graphic design',
      'Team and series kit production',
      'Youth and adult sizing',
      'Bulk run and single-rider options',
    ],
  },
  {
    id: '4C',
    title: 'Performance Apparel',
    accent: '#C5D8F2',
    description:
      'Athletic wear, custom uniforms, and technical fabric applications for teams, brands, and organizations that need gear that performs as well as it looks.',
    includes: [
      'Athletic and activewear production',
      'Custom team uniforms and kits',
      'Technical fabric applications',
      'Moisture-wicking and performance options',
      'Corporate and brand uniform programs',
      'Multi-sport and multi-use applications',
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

export default function DyeSublimation() {
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
          <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-brand-green">Dye Sublimation</span>
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
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">04 / Dye Sublimation</span>
            </motion.div>
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
                className="font-display font-black italic text-cream leading-[0.88]"
                style={{ fontSize: 'clamp(44px, 7vw, 108px)' }}
              >
                Dye Sublimation<br />&amp; Fabric<br />Printing.
              </motion.h1>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-2 mt-8"
            >
              {['Full-Fabric Print', 'Motocross Gear', 'Performance', 'Custom Kits', 'Unlimited Color'].map((t) => (
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
            <div className="border-l-2 border-brand-green pl-5 mb-6">
              <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-brand-green mb-2">Authority</p>
              <p className="font-display font-bold italic text-cream/80 text-xl leading-snug">
                "Trusted by leading motocross and performance brands."
              </p>
            </div>
            <p className="font-sans font-light text-cream/45 text-sm leading-relaxed mb-5">
              High-performance printing built for brands that demand quality and scale. Full-fabric, all-over printing with unlimited color capability — built for the track, the field, and the shelf.
            </p>
            <div className="border border-white/[0.08] bg-[#111111] px-5 py-4 rounded-sm">
              <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-cream/30 mb-1">Pricing</p>
              <p className="font-display font-black text-cream text-xl">MOQ-Based</p>
              <p className="font-sans text-xs text-cream/35 mt-1">Production pricing — contact for minimums and lead times</p>
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

      {/* Why sublimation */}
      <section className="py-16 md:py-20 bg-[#0d0d0d]">
        <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.06]">
            {[
              { title: 'Unlimited Colors', desc: 'No color count restrictions. Gradients, photographic prints, complex patterns — all at the same price.' },
              { title: 'Lasts the Life of the Fabric', desc: 'Sublimation bonds to the fiber. It won\'t crack, peel, or fade — even after hundreds of washes.' },
              { title: 'Full Coverage', desc: 'Edge-to-edge, seam-to-seam printing. No white gaps, no boundaries — just total design freedom.' },
            ].map((item) => (
              <FadeIn key={item.title}>
                <div className="bg-[#0d0d0d] p-8 hover:bg-[#111111] transition-colors duration-300">
                  <span className="block w-1.5 h-1.5 rounded-full bg-brand-green mb-5" />
                  <h3 className="font-display font-bold italic text-cream text-xl mb-3">{item.title}</h3>
                  <p className="font-sans font-light text-cream/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-services */}
      <section className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto py-12 pb-20">
        <FadeIn className="mb-4">
          <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">— Three Sub-Services</p>
        </FadeIn>
        {subServices.map((sub) => <SubServiceSection key={sub.id} sub={sub} />)}
        <div className="border-t border-white/[0.08]" />
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.06] py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <FadeIn>
            <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-brand-green mb-3">Ready to build your kit?</p>
            <h2 className="font-display font-black italic text-cream leading-[0.92]" style={{ fontSize: 'clamp(32px, 4vw, 60px)' }}>
              Let's print<br />something built to perform.
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
