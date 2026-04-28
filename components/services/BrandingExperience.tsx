'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const subServices = [
  {
    id: '5A',
    title: 'Brand Identity Systems',
    accent: '#C5D8F2',
    description:
      'Logo design, visual direction, and comprehensive brand guidelines that give your brand a cohesive, professional foundation — the system everything else is built on top of.',
    includes: [
      'Logo design (primary, secondary, icon)',
      'Color palette and typography system',
      'Visual direction and moodboard',
      'Brand guidelines document',
      'Logo usage rules and clear space',
      'Brand asset file delivery (all formats)',
    ],
  },
  {
    id: '5B',
    title: 'Event & Booth Design',
    accent: '#EDD96A',
    description:
      '10x10 setups, full trade show builds, canopies, structures, and custom booth environments designed to stand out in any venue. We design the space and produce everything in it.',
    includes: [
      '10x10 and larger booth concepts',
      'Trade show display design',
      'Custom canopy and structure design',
      'Branded environment production',
      'Signage and backdrop design',
      'Booth layout and traffic flow planning',
    ],
  },
  {
    id: '5C',
    title: 'Event Collateral Packages',
    accent: '#FF5A3D',
    description:
      'Full event branding, print production, setup coordination, and asset delivery — end-to-end execution so you show up ready. Our highest-touch offering for events that need to make an impact.',
    includes: [
      'Full event visual identity',
      'All print and production assets',
      'On-site setup coordination',
      'Branded collateral (programs, banners, merch)',
      'Digital assets for event promotion',
      'Post-event asset archive and delivery',
    ],
  },
  {
    id: '5D',
    title: 'Packaging & Product Presentation',
    accent: '#A8C4DF',
    description:
      'Retail packaging, product display systems, and launch kits that make your product look as good on the shelf as it does online. The physical brand extension that closes the sale.',
    includes: [
      'Retail-ready packaging design',
      'Product display and POS systems',
      'Launch kit design and production',
      'Unboxing experience design',
      'Shelf and e-commerce packaging systems',
      'Seasonal and limited-edition packaging',
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

export default function BrandingExperience() {
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
          <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-brand-green">Branding & Experience</span>
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
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">05 / Branding & Experience</span>
            </motion.div>
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
                className="font-display font-black italic text-cream leading-[0.88]"
                style={{ fontSize: 'clamp(44px, 7vw, 108px)' }}
              >
                Branding &amp;<br />Experience<br />Design.
              </motion.h1>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-2 mt-8"
            >
              {['Brand Identity', 'Event Booths', 'Collateral', 'Packaging', 'Custom Quotes'].map((t) => (
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
              "From digital presence to real-world impact."
            </p>
            <p className="font-sans font-light text-cream/45 text-sm leading-relaxed mb-5">
              We bring your brand to life — physically, visually, and in real-world environments. Identity systems, event design, packaging, and every branded touchpoint in between.
            </p>
            <div className="border border-white/[0.08] bg-[#111111] px-5 py-4 rounded-sm">
              <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-cream/30 mb-1">Pricing</p>
              <p className="font-display font-black text-cream text-xl">Custom Projects</p>
              <p className="font-sans text-xs text-cream/35 mt-1">Quote only — every project is scoped individually</p>
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
          <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">— Four Sub-Services</p>
        </FadeIn>
        {subServices.map((sub) => <SubServiceSection key={sub.id} sub={sub} />)}
        <div className="border-t border-white/[0.08]" />
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.06] py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <FadeIn>
            <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-brand-green mb-3">Ready to build the brand?</p>
            <h2 className="font-display font-black italic text-cream leading-[0.92]" style={{ fontSize: 'clamp(32px, 4vw, 60px)' }}>
              Let's bring your<br />brand into the world.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15} className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
            <a href="/#contact" className="inline-flex items-center gap-3 bg-brand-green text-cream font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-8 py-4 rounded-sm hover:bg-[#1a6830] transition-colors duration-200">
              Start a Project →
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
