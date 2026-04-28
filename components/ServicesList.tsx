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
      className="group border-t border-cream/10 relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full bg-brand-green transition-all duration-500 ease-out" />

      <a href={service.href} className="block">
        <div className="flex items-center justify-between py-6 md:py-8 group-hover:translate-x-1 transition-transform duration-300">
          <div className="flex items-start gap-5 md:gap-8">
            <span className="font-sans text-[10px] tracking-[0.2em] text-cream/25 w-7 flex-shrink-0 mt-1">
              {service.num}
            </span>
            <div>
              <span
                className="block font-display font-bold text-cream group-hover:text-brand-green transition-colors duration-300"
                style={{ fontSize: 'clamp(20px, 2.8vw, 42px)' }}
              >
                {service.name}
              </span>
              <span className="block font-sans text-[10px] tracking-[0.16em] uppercase text-cream/30 mt-1.5">
                {service.sub}
              </span>
            </div>
          </div>
          <span className="text-cream/0 group-hover:text-brand-green transition-all duration-300 text-lg mr-2 flex-shrink-0">
            →
          </span>
        </div>
      </a>
    </motion.div>
  )
}

export default function ServicesList() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section id="services" className="bg-[#090909] py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

        <div className="flex items-end justify-between mb-16 flex-wrap gap-6" ref={headRef}>
          <div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={headInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">
                — What We Do
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black italic text-cream leading-[0.92]"
              style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
            >
              Eight Services.<br />One Team.
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
              className="font-sans text-[11px] tracking-[0.16em] uppercase text-cream/50 hover:text-brand-green border border-cream/15 hover:border-brand-green px-5 py-3 transition-all duration-200"
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
