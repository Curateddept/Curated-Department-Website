'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.33, 1, 0.68, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

const clients = [
  {
    id: 'no-fear',
    name: 'No Fear',
    category: 'Motorsports & Lifestyle',
    tagline: 'Bringing an icon back.',
    logo: '/logos/no-fear.png',
    logoWidth: 130,
    writeup: 'No Fear is one of the most recognizable names in action sports — and we helped bring it back to life. From rebuilding their digital content engine to launching merch drops that actually sell, we function as their in-house creative team without the overhead.',
    services: ['Brand Direction', 'Social Media Management', 'Content Creation', 'Merchandise Design', 'Paid Advertising'],
    photos: ['/work/no-fear-1.jpg', '/work/no-fear-2.jpg'],
    accent: '#1E7A38',
  },
  {
    id: 'brenthel',
    name: 'Brenthel Industries',
    category: 'Race / Off-Road',
    tagline: 'Built for the track and the shelf.',
    logo: '/logos/brenthel.avif',
    logoWidth: 150,
    writeup: 'Brenthel builds some of the most capable race trucks on the planet. We built the visual system around the brand — from race season activations to trade show presence — making sure the materials match the machines.',
    services: ['Brand Identity', 'Print Production', 'Social Media', 'Event Materials', 'Race Day Content'],
    photos: ['/work/brenthel-1.jpg', '/work/brenthel-2.jpg'],
    accent: '#C9A84C',
  },
  {
    id: 'fiberwerx',
    name: 'FiberwerX',
    category: 'Performance Parts',
    tagline: 'Industrial brand, built to perform.',
    logo: '/logos/fiberwerx.png',
    logoWidth: 170,
    writeup: 'FiberwerX makes high-performance composite body panels for off-road trucks and race vehicles. We manage their digital presence and content strategy — keeping a technical product brand looking sharp and driving qualified traffic.',
    services: ['Digital Strategy', 'Content Creation', 'Paid Advertising', 'Social Management'],
    photos: ['/work/fiberwerx-1.jpg', '/work/fiberwerx-2.jpg'],
    accent: '#1E7A38',
  },
  {
    id: 'trophy-truck-school',
    name: 'Trophy Truck School',
    category: 'Education / Events',
    tagline: 'Teaching legends in the making.',
    logo: '/logos/trophy-truck-school.png',
    logoWidth: 155,
    writeup: 'Trophy Truck School gives drivers a real shot at learning the sport from the inside. We handled a complete brand refresh and built the event marketing collateral system — signage, print, social, all of it — that runs every time they hit the desert.',
    services: ['Branding & Identity', 'Print Collateral', 'Social Media', 'Event Design', 'Signage'],
    photos: ['/work/tts-1.jpg', '/work/tts-2.jpg'],
    accent: '#A8C4DF',
  },
  {
    id: 'baja-kits',
    name: 'Baja Kits',
    category: 'Off-Road / Product',
    tagline: 'Go further, faster.',
    logo: '/logos/bajakits.png',
    logoWidth: 125,
    writeup: 'Baja Kits makes suspension lift kits built for punishment. We produced their merchandise line and ran a print campaign around race season — meeting their customer base exactly where they already are.',
    services: ['Merchandise Production', 'Print Campaign', 'Social Content'],
    photos: ['/work/baja-1.jpg', '/work/baja-2.jpg'],
    accent: '#D94530',
  },
  {
    id: 'fta',
    name: 'FTA',
    category: 'Motorsports / Events',
    tagline: 'Where off-road gets its start.',
    logo: '/logos/fta.svg',
    logoWidth: 65,
    writeup: 'FTA is a foundational name in desert racing culture. We built their event brand system from the ground up — everything from banners and signage to digital assets — creating a cohesive look that runs across every touchpoint at race events.',
    services: ['Brand Identity', 'Event Print', 'Signage System', 'Digital Assets'],
    photos: ['/work/fta-1.jpg', '/work/fta-2.jpg'],
    accent: '#1E7A38',
  },
]

const galleryImages = [
  { src: '/work/gallery-1.jpg', label: 'Race Day' },
  { src: '/work/gallery-2.jpg', label: 'Merch Drop' },
  { src: '/work/gallery-3.jpg', label: 'Print' },
  { src: '/work/gallery-4.jpg', label: 'Event' },
  { src: '/work/gallery-5.jpg', label: 'Content' },
  { src: '/work/gallery-6.jpg', label: 'Brand' },
]

function ClientTile({
  client,
  index,
  isActive,
  onClick,
}: {
  client: (typeof clients)[0]
  index: number
  isActive: boolean
  onClick: () => void
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.button
      ref={ref}
      type="button"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.33, 1, 0.68, 1] }}
      onClick={onClick}
      className={`group relative flex flex-col items-center justify-center gap-5 p-8 md:p-10 h-48 md:h-52 border transition-all duration-300 text-left w-full ${
        isActive
          ? 'border-brand-green bg-[#0f1a12]'
          : 'border-white/[0.06] bg-[#0f0f0f] hover:border-white/20 hover:bg-[#141414]'
      }`}
    >
      {/* Active indicator dot */}
      {isActive && (
        <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-brand-green" />
      )}

      {/* Logo */}
      <img
        src={client.logo}
        alt={client.name}
        className="object-contain partner-logo transition-all duration-300 group-hover:opacity-90"
        style={{ width: client.logoWidth, maxHeight: '48px' }}
      />

      {/* Category below logo */}
      <span className={`font-sans text-[9px] tracking-[0.2em] uppercase transition-colors duration-200 ${isActive ? 'text-brand-green' : 'text-cream/25 group-hover:text-cream/45'}`}>
        {client.category}
      </span>
    </motion.button>
  )
}

function ClientDetail({ client }: { client: (typeof clients)[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      className="border border-white/[0.08] bg-[#0a0a0a]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">

        {/* Photos column */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-px bg-white/[0.04]">
          {[0, 1].map((i) => (
            <div key={i} className="bg-[#111] relative overflow-hidden" style={{ minHeight: '210px' }}>
              <img
                src={client.photos[i]}
                alt=""
                className="w-full h-full object-cover absolute inset-0"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
              {/* Placeholder */}
              <div
                className="absolute inset-0 flex items-end p-3"
                style={{ background: `linear-gradient(160deg, ${client.accent}12 0%, #0e0e0e 100%)` }}
              >
                <span className="font-display font-black text-white/[0.04] uppercase text-5xl select-none">CD.</span>
              </div>
            </div>
          ))}
        </div>

        {/* Content column */}
        <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <span className="font-sans text-[9px] tracking-[0.28em] uppercase block mb-2" style={{ color: client.accent }}>
                  {client.category}
                </span>
                <h2 className="font-display font-black text-cream uppercase leading-none text-3xl md:text-4xl">
                  {client.name}
                </h2>
                <p className="font-sans text-sm text-cream/40 mt-1.5">{client.tagline}</p>
              </div>
              <img
                src={client.logo}
                alt={client.name}
                className="object-contain partner-logo flex-shrink-0 hidden md:block"
                style={{ width: client.logoWidth * 0.7, maxHeight: '36px' }}
              />
            </div>

            {/* Write-up */}
            <p className="font-sans text-sm text-cream/55 leading-relaxed mb-8 max-w-lg">
              {client.writeup}
            </p>

            {/* Services */}
            <div>
              <p className="font-sans text-[9px] tracking-[0.24em] uppercase text-cream/30 mb-3">What We Do</p>
              <div className="flex flex-wrap gap-2">
                {client.services.map((s) => (
                  <span
                    key={s}
                    className="font-sans text-[10px] tracking-[0.12em] uppercase px-3 py-1.5 border border-white/[0.08] text-cream/50"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-4">
            <span className="font-sans text-xs text-cream/25">Want similar results for your brand?</span>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.16em] uppercase text-brand-green hover:text-cream transition-colors duration-200"
            >
              Start a Project →
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function GalleryStrip() {
  return (
    <section className="py-20 md:py-24 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <FadeIn className="mb-10">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="font-display font-black text-cream uppercase leading-[0.9]" style={{ fontSize: 'clamp(24px, 3.5vw, 44px)' }}>
              From the<br /><span className="text-brand-green">Field.</span>
            </h2>
            <p className="font-sans text-sm text-cream/35 max-w-xs">
              A sample of what we've produced — drop work images into <code className="text-cream/50">public/work/</code> to populate.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/[0.04]">
          {galleryImages.map((img, i) => (
            <FadeIn key={img.src} delay={i * 0.05}>
              <div className="bg-[#111] relative overflow-hidden aspect-square group">
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
                {/* Placeholder */}
                <div className="absolute inset-0 bg-[#141414] flex items-center justify-center">
                  <span className="font-display font-black text-white/[0.04] uppercase text-4xl select-none">CD.</span>
                </div>
                {/* Label overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="font-sans text-[9px] tracking-[0.18em] uppercase text-cream/70">{img.label}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ClientsPage() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeClient = clients.find((c) => c.id === activeId) ?? null
  const detailRef = useRef<HTMLDivElement>(null)

  function handleSelect(id: string) {
    if (activeId === id) {
      setActiveId(null)
      return
    }
    setActiveId(id)
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 80)
  }

  return (
    <div className="bg-[#090909] min-h-screen pt-16">

      {/* Hero */}
      <section className="py-20 md:py-28 border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <div className="overflow-hidden mb-4">
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                  className="font-display font-black text-cream uppercase leading-[0.88]"
                  style={{ fontSize: 'clamp(48px, 9vw, 130px)' }}
                >
                  Our<br />
                  <span className="text-brand-green">Clients.</span>
                </motion.h1>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="font-sans font-light text-cream/50 text-base max-w-xl"
              >
                Brands we've built for, grown with, and showed up for every season. Select a client to see what we delivered.
              </motion.p>
            </div>
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              href="/contact"
              className="inline-flex items-center gap-3 bg-brand-green text-cream font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-7 py-4 rounded-sm hover:bg-[#166030] transition-colors duration-200 flex-shrink-0"
            >
              Start a Project →
            </motion.a>
          </div>
        </div>
      </section>

      {/* Client grid + detail */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

          {/* Logo grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/[0.04] mb-px">
            {clients.map((client, i) => (
              <ClientTile
                key={client.id}
                client={client}
                index={i}
                isActive={activeId === client.id}
                onClick={() => handleSelect(client.id)}
              />
            ))}
          </div>

          {/* Detail panel */}
          <div ref={detailRef}>
            <AnimatePresence mode="wait">
              {activeClient && (
                <ClientDetail key={activeClient.id} client={activeClient} />
              )}
            </AnimatePresence>
          </div>

          {!activeId && (
            <p className="font-sans text-[10px] tracking-[0.14em] text-cream/20 text-center mt-6">
              Select a client above to see the full story
            </p>
          )}
        </div>
      </section>

      {/* Work gallery */}
      <GalleryStrip />

      {/* CTA */}
      <section className="border-t border-white/[0.06] py-16 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h2 className="font-display font-black text-cream uppercase leading-[0.9] mb-2" style={{ fontSize: 'clamp(28px, 4vw, 56px)' }}>
                  Ready to Join<br />This List?
                </h2>
                <p className="font-sans text-cream/40 text-sm">Tell us what you're building. We'll tell you how we can help.</p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 bg-cream text-[#090909] font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-7 py-4 rounded-sm hover:bg-brand-green hover:text-cream transition-colors duration-200 flex-shrink-0"
              >
                Get a Quote →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  )
}
