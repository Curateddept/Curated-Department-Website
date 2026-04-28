'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const clients = [
  {
    name: 'No Fear',
    category: 'Motorsports / Lifestyle',
    services: 'Social · Content · Merch',
    logo: '/logos/no-fear.png',
    logoWidth: 120,
    image: '/work/no-fear-1.jpg',
    href: '/clients#no-fear',
  },
  {
    name: 'Brenthel Industries',
    category: 'Race / Off-Road',
    services: 'Brand · Print · Social',
    logo: '/logos/brenthel.avif',
    logoWidth: 140,
    image: '/work/brenthel-1.jpg',
    href: '/clients#brenthel',
  },
  {
    name: 'FiberwerX',
    category: 'Performance Parts',
    services: 'Digital · Content · Strategy',
    logo: '/logos/fiberwerx.png',
    logoWidth: 160,
    image: '/work/fiberwerx-1.jpg',
    href: '/clients#fiberwerx',
  },
  {
    name: 'Trophy Truck School',
    category: 'Education / Events',
    services: 'Branding · Print · Social',
    logo: '/logos/trophy-truck-school.png',
    logoWidth: 140,
    image: '/work/tts-1.jpg',
    href: '/clients#trophy-truck-school',
  },
  {
    name: 'Baja Kits',
    category: 'Off-Road / Product',
    services: 'Merch · Print · Social',
    logo: '/logos/bajakits.png',
    logoWidth: 115,
    image: '/work/baja-1.jpg',
    href: '/clients#baja-kits',
  },
  {
    name: 'FTA',
    category: 'Motorsports / Events',
    services: 'Brand · Print · Events',
    logo: '/logos/fta.svg',
    logoWidth: 60,
    image: '/work/fta-1.jpg',
    href: '/clients#fta',
  },
]

function ClientCard({ client, index }: { client: (typeof clients)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <motion.a
      href={client.href}
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.33, 1, 0.68, 1] }}
      className="flex-shrink-0 w-[300px] md:w-[360px] relative overflow-hidden group cursor-pointer block bg-[#0f0f0f] border border-white/[0.05] snap-start"
      style={{ aspectRatio: '4/5' }}
    >
      {/* Client photo */}
      <img
        src={client.image}
        alt={client.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
      />

      {/* Dark background fallback */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#000]/85 via-[#000]/20 to-transparent" />

      {/* Hover tint */}
      <div className="absolute inset-0 bg-brand-green/0 group-hover:bg-brand-green/8 transition-all duration-500" />

      {/* Center logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={client.logo}
          alt={client.name}
          className="object-contain partner-logo transition-all duration-300 group-hover:scale-105"
          style={{ width: client.logoWidth, maxHeight: '56px' }}
        />
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="font-sans text-[9px] tracking-[0.22em] uppercase text-brand-green mb-1.5">
          {client.category}
        </p>
        <h3 className="font-display font-black text-cream uppercase text-xl leading-none mb-1">
          {client.name}
        </h3>
        <p className="font-sans text-[10px] tracking-[0.12em] text-cream/40 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          {client.services}
        </p>
      </div>

      {/* Arrow on hover */}
      <div className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 12L12 2M12 2H5M12 2v7" stroke="#F0EDE4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </motion.a>
  )
}

export default function WorkPreview() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section id="work" className="bg-[#0A0A0A] py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

        <div className="flex items-end justify-between mb-12 flex-wrap gap-6" ref={headRef}>
          <div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={headInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">
                — Selected Work
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black text-cream leading-[0.9] uppercase"
              style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
            >
              Brands We've<br />Built For.
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            href="/clients"
            className="font-sans text-[11px] tracking-[0.16em] uppercase text-cream/50 hover:text-brand-green border border-cream/15 hover:border-brand-green px-5 py-3 transition-all duration-200 flex-shrink-0"
          >
            View All Clients →
          </motion.a>
        </div>
      </div>

      {/* Full-width horizontal scroll — extends past max-width container */}
      <div className="pl-6 md:pl-12 lg:pl-20 max-w-none">
        <div className="flex gap-3 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
          {clients.map((client, i) => (
            <ClientCard key={client.name} client={client} index={i} />
          ))}
          {/* Trailing spacer */}
          <div className="flex-shrink-0 w-6 md:w-12 lg:w-20" />
        </div>
      </div>
    </section>
  )
}
