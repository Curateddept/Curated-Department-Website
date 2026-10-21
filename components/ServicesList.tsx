'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  { num: '01', name: 'Digital Growth & Brand Management',   sub: 'Social · Ads · Email · Content · Strategy',              href: '/services/digital-growth' },
  { num: '02', name: 'Merchandise Production & Fulfillment', sub: 'Design · Production · Shopify · 3PL',                    href: '/services/merchandise-production' },
  { num: '03', name: 'Print & Promotional Production',       sub: 'Business Print · Labels · Apparel · Promo · Large Format', href: '/services/print-production' },
  { num: '04', name: 'Dye Sublimation & Fabric Printing',    sub: 'Full-Fabric Print · Motocross · Performance Apparel',     href: '/services/dye-sublimation' },
  { num: '05', name: 'Branding & Experience Design',         sub: 'Identity · Events · Packaging · Collateral',              href: '/services/branding-experience' },
  { num: '06', name: 'Content Creation',                     sub: 'Photo · Video · Reels · Campaign Assets',                 href: '/services/content-creation' },
  { num: '07', name: 'Social Media Management',              sub: 'Strategy · Scheduling · Engagement · Growth',             href: '/services/social-media-management' },
  { num: '08', name: 'Email & SMS Marketing',                sub: 'Campaigns · Automations · List Growth · Analytics',       href: '/services/email-sms-marketing' },
]

function ServiceItem({ service, index }: { service: (typeof services)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.33, 1, 0.68, 1] }}
      className="group btn-wipe [--wipe:#F4F4F2] border-t border-cream/15 relative"
    >
      <a href={service.href} className="block px-2 md:px-4">
        <div className="flex items-center justify-between gap-6 py-7 md:py-9">
          <div className="flex items-start gap-5 md:gap-10">
            <span className="font-sans text-[11px] tracking-[0.2em] text-cream/35 group-hover:text-[#0a0908]/50 w-7 flex-shrink-0 mt-2 transition-colors duration-300">
              {service.num}
            </span>
            <div>
              <span
                className="block font-display font-black uppercase leading-[0.95] tracking-tight text-cream group-hover:text-[#0a0908] transition-colors duration-300"
                style={{ fontSize: 'clamp(26px, 4.4vw, 68px)' }}
              >
                {service.name}
              </span>
              <span className="block font-sans text-[10px] tracking-[0.18em] uppercase text-cream/40 group-hover:text-[#0a0908]/60 mt-3 transition-colors duration-300">
                {service.sub}
              </span>
            </div>
          </div>
          <svg className="flex-shrink-0 text-cream/30 group-hover:text-[#0a0908] -rotate-45 group-hover:rotate-0 transition-all duration-500" width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </a>
    </motion.div>
  )
}

export default function ServicesList() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section id="services" className="bg-[#0a0908] py-24 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

        <div className="flex items-end justify-between mb-16 flex-wrap gap-6" ref={headRef}>
          <div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={headInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="font-serif italic text-xl text-cream/70">
                — What We Do
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black uppercase text-cream leading-[0.86] tracking-tighter"
              style={{ fontSize: 'clamp(48px, 9vw, 144px)' }}
            >
              Eight Services.<br /><span className="text-outline">One Team.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-4 items-start"
          >
            <p className="font-sans font-light text-cream/45 max-w-xs text-sm leading-relaxed">
              Every service is built to work independently or together. Digital, physical, and everything in between.
            </p>
            <a
              href="/services"
              className="btn-wipe [--wipe:#F4F4F2] font-sans font-semibold text-[11px] tracking-[0.16em] uppercase text-cream hover:text-[#0a0908] border border-cream/40 hover:border-cream px-6 py-3.5 transition-colors duration-300"
            >
              View All Services →
            </a>
          </motion.div>
        </div>

        <div>
          {services.map((service, i) => (
            <ServiceItem key={service.num} service={service} index={i} />
          ))}
          <div className="border-t border-cream/10" />
        </div>
      </div>
    </section>
  )
}
