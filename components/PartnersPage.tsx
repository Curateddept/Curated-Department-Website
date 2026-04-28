'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.33, 1, 0.68, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

const partnerCategories = [
  {
    category: 'Motorsports & Lifestyle',
    description: 'Action sports and motorsports brands we produce content, merch, and campaigns for.',
    partners: [
      { name: 'No Fear', logo: '/logos/no-fear.png', width: 130, role: 'Social · Content · Merch' },
      { name: 'Thor MX', logo: '/logos/thor.avif', width: 100, role: 'Content · Print' },
      { name: 'SMX Jerseys', logo: '/logos/smx.png', width: 120, role: 'Apparel · Social' },
      { name: 'Baja Kits', logo: '/logos/bajakits.png', width: 130, role: 'Brand · Print' },
    ],
  },
  {
    category: 'Off-Road & Performance',
    description: 'Off-road and performance companies we partner with on brand, print, and digital.',
    partners: [
      { name: 'Brenthel Industries', logo: '/logos/brenthel.avif', width: 150, role: 'Brand · Print · Social' },
      { name: 'Trophy Truck School', logo: '/logos/trophy-truck-school.png', width: 160, role: 'Branding · Events · Print' },
      { name: 'FiberwerX', logo: '/logos/fiberwerx.png', width: 170, role: 'Digital · Content' },
    ],
  },
  {
    category: 'Automotive & Industry',
    description: 'Automotive industry brands and dealerships we support with creative and print.',
    partners: [
      { name: 'Ford', logo: '/logos/ford.svg', width: 80, role: 'Print · Video · Social' },
      { name: 'FTA', logo: '/logos/fta.svg', width: 70, role: 'Brand · Print · Events' },
    ],
  },
]

export default function PartnersPage() {
  return (
    <div className="bg-[#090909] min-h-screen pt-16">

      {/* Hero */}
      <section className="py-20 md:py-28 border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="font-display font-black text-cream uppercase leading-[0.88]"
              style={{ fontSize: 'clamp(48px, 9vw, 130px)' }}
            >
              Our<br />
              <span className="text-brand-green">Partners.</span>
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-sans font-light text-cream/50 text-lg max-w-2xl"
          >
            The brands and companies we work alongside — from content and campaigns to production and print. These are the names we're proud to be in the room with.
          </motion.p>
        </div>
      </section>

      {/* Partner categories */}
      {partnerCategories.map((cat, ci) => (
        <section key={cat.category} className={`py-16 md:py-20 border-b border-white/[0.06] ${ci % 2 === 1 ? 'bg-[#0a0a0a]' : ''}`}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
            <FadeIn className="mb-12">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <span className="font-sans text-[9px] tracking-[0.28em] uppercase text-brand-green block mb-2">
                    {String(ci + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-display font-black text-cream uppercase text-2xl md:text-3xl leading-none">
                    {cat.category}
                  </h2>
                </div>
                <p className="font-sans text-sm text-cream/40 max-w-sm leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.05]">
              {cat.partners.map((p, pi) => (
                <FadeIn key={p.name} delay={pi * 0.07}>
                  <div className="bg-[#090909] p-8 md:p-10 flex flex-col items-center justify-center gap-5 h-44 group hover:bg-[#111] transition-colors duration-300 relative overflow-hidden">
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="partner-logo object-contain group-hover:opacity-90 transition-opacity duration-200"
                      style={{ width: p.width, maxHeight: '44px' }}
                    />
                    <div className="text-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 absolute bottom-4 left-0 right-0 px-4">
                      <p className="font-sans text-[9px] tracking-[0.18em] uppercase text-cream/40">{p.role}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Work with us strip */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h2 className="font-display font-black text-cream uppercase leading-[0.9] mb-2" style={{ fontSize: 'clamp(28px, 4vw, 56px)' }}>
                  Want to Be<br />on This List?
                </h2>
                <p className="font-sans text-cream/40 text-sm">We're selective — but we're always open to the right brand.</p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 bg-brand-green text-cream font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-7 py-4 rounded-sm hover:bg-[#166030] transition-colors duration-200 flex-shrink-0"
              >
                Get in Touch →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  )
}
