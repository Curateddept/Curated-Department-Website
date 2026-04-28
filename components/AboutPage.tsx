'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.33, 1, 0.68, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const stats = [
  { num: '300+', label: 'Brands Worked With' },
  { num: '6', label: 'Core Services' },
  { num: '2018', label: 'Founded' },
  { num: '1', label: 'Team. Full Picture.' },
]

const pillars = [
  {
    num: '01',
    title: 'Creative That Converts',
    body: "We don't make things that look good and do nothing. Every piece of content, every design, every campaign is built with a purpose — to move people and move product.",
  },
  {
    num: '02',
    title: 'One Roof. All of It.',
    body: "Social, print, merchandise, branding, digital ads — most agencies make you hire five vendors. We handle the full picture, which means less overhead, more consistency, and nothing falling through the cracks.",
  },
  {
    num: '03',
    title: 'Built for the Brands We Like',
    body: "We work with motorsports brands, product companies, lifestyle labels, and the kind of operators who are more focused on building something real than chasing trends. If that's you, we're your team.",
  },
]

const capabilities = [
  { label: 'Social Media Management' },
  { label: 'Paid Advertising' },
  { label: 'Email & SMS Marketing' },
  { label: 'Content Creation' },
  { label: 'Brand Strategy' },
  { label: 'Merchandise Production' },
  { label: 'Shopify / E-Commerce' },
  { label: 'Fulfillment & 3PL' },
  { label: 'Print Production' },
  { label: 'Labels & Packaging' },
  { label: 'Dye Sublimation' },
  { label: 'Motocross Gear' },
  { label: 'Brand Identity' },
  { label: 'Event Design' },
  { label: 'Promotional Products' },
  { label: 'Large Format Print' },
]

export default function AboutPage() {
  return (
    <div className="bg-[#090909] min-h-screen pt-16">

      {/* Hero */}
      <section className="relative py-24 md:py-36 border-b border-white/[0.06] overflow-hidden">
        {/* Video background */}
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-20" style={{ zIndex: 0 }}>
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#090909]/65" style={{ zIndex: 1 }} />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative" style={{ zIndex: 2 }}>
          <div className="max-w-4xl">
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-3 mb-10">
                <span className="w-6 h-[1px] bg-brand-green" />
                <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">
                  About Us
                </span>
              </div>
            </FadeIn>

            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                className="font-display font-black text-cream uppercase leading-[0.88]"
                style={{ fontSize: 'clamp(56px, 9vw, 140px)' }}
              >
                One Team.<br />
                <span className="text-brand-green">All Of It.</span>
              </motion.h1>
            </div>

            <FadeIn delay={0.45}>
              <p className="font-sans font-light text-cream/55 text-lg md:text-xl leading-relaxed max-w-2xl">
                Curated Department is a full-service creative operation built for brands that need more than one thing done — and need all of it done right.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-white/[0.06] py-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.08}>
                <div>
                  <p
                    className="font-display font-black text-cream uppercase leading-none mb-2"
                    style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}
                  >
                    {s.num}
                  </p>
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-cream/35">
                    {s.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32 border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start">

            <div className="md:col-span-5">
              <FadeIn>
                <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-cream/35 block mb-4">
                  — Our Story
                </span>
                <h2
                  className="font-display font-black text-cream uppercase leading-[0.9]"
                  style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
                >
                  Why We<br />Exist.
                </h2>
              </FadeIn>
            </div>

            <div className="md:col-span-7 space-y-6">
              <FadeIn delay={0.1}>
                <p className="font-sans font-light text-cream/60 text-base leading-relaxed">
                  Curated Department started with a simple observation: brands kept hiring three different vendors for work that should come from one source. A social agency here, a print shop there, a merch company somewhere else — and none of them were talking to each other.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="font-sans font-light text-cream/60 text-base leading-relaxed">
                  We built CD to be the team that does all of it — the creative, the digital, the physical product, the print, the brand work — under one roof with one vision. Less coordination, more output.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="font-sans font-light text-cream/60 text-base leading-relaxed">
                  We've worked with motorsports brands, product companies, lifestyle labels, and the kind of operators who are too busy building to manage five different vendors. That's our kind of client.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 md:py-32 border-b border-white/[0.06] bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn className="mb-16">
            <h2
              className="font-display font-black text-cream uppercase leading-[0.9]"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
            >
              How We<br />Work.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06]">
            {pillars.map((p, i) => (
              <FadeIn key={p.num} delay={i * 0.1}>
                <div className="bg-[#0a0a0a] p-8 md:p-10 h-full group hover:bg-[#111] transition-colors duration-300">
                  <span className="font-sans text-[10px] tracking-[0.22em] text-brand-green block mb-6">
                    {p.num}
                  </span>
                  <h3
                    className="font-display font-black text-cream uppercase leading-[0.92] mb-5"
                    style={{ fontSize: 'clamp(24px, 2.5vw, 36px)' }}
                  >
                    {p.title}
                  </h3>
                  <p className="font-sans text-sm text-cream/50 leading-relaxed">
                    {p.body}
                  </p>
                  <div className="w-8 h-[2px] bg-brand-green mt-8 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities grid */}
      <section className="py-24 md:py-32 border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
            <FadeIn>
              <h2
                className="font-display font-black text-cream uppercase leading-[0.9]"
                style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
              >
                What We<br />Do.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <a
                href="/services/digital-growth"
                className="font-sans text-[11px] tracking-[0.16em] uppercase text-cream/50 hover:text-brand-green border border-cream/15 hover:border-brand-green px-5 py-3 transition-all duration-200"
              >
                See All Services →
              </a>
            </FadeIn>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-white/[0.05]">
            {capabilities.map((c, i) => (
              <FadeIn key={c.label} delay={i * 0.03}>
                <div className="bg-[#090909] px-5 py-4 hover:bg-[#111] transition-colors duration-200 group">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-brand-green flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="font-sans text-sm text-cream/55 group-hover:text-cream transition-colors duration-200">
                      {c.label}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h2
                  className="font-display font-black text-cream uppercase leading-[0.9] mb-3"
                  style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
                >
                  Ready to Build<br />Something Real?
                </h2>
                <p className="font-sans text-cream/45 text-sm">
                  Tell us what you need. We'll take it from there.
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-3 bg-cream text-[#090909] font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-7 py-4 rounded-sm hover:bg-brand-green hover:text-cream transition-colors duration-200"
                >
                  Get a Quote →
                </a>
                <a
                  href="/clients"
                  className="inline-flex items-center gap-3 border border-cream/25 text-cream font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-7 py-4 rounded-sm hover:border-brand-green hover:text-brand-green transition-all duration-200"
                >
                  See Our Work
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  )
}
