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

const industries = [
  {
    num: '01',
    name: 'Motocross',
    desc: 'From race teams to apparel brands — we speak the language, know the culture, and know what riders actually respond to.',
  },
  {
    num: '02',
    name: 'Off-Road',
    desc: 'Desert racing, rock crawling, overlanding. We\'ve worked alongside the teams that build and run these machines — we know the world.',
  },
  {
    num: '03',
    name: 'Road Racing',
    desc: 'Circuit, time attack, and road racing outfits looking to build a brand presence that matches the speed of the sport.',
  },
  {
    num: '04',
    name: 'Lifestyle Brands',
    desc: 'Brands built on culture, not just product. We help lifestyle companies build visual identity and content that fits naturally into the lives of their audience.',
  },
  {
    num: '05',
    name: 'E-Com Brands',
    desc: 'Direct-to-consumer brands that need the full picture — Shopify, content, email, paid, and fulfillment — all working together.',
  },
  {
    num: '06',
    name: 'Health & Wellness',
    desc: 'Supplement brands, fitness companies, and wellness businesses that need creative and digital strategy built around trust and community.',
  },
  {
    num: '07',
    name: 'Marketing Companies',
    desc: 'Agencies and marketing firms that need a production and creative partner to white-label work or scale output without adding headcount.',
  },
  {
    num: '08',
    name: 'Software & Tech',
    desc: 'SaaS companies and tech brands that need to communicate complex ideas simply — through content, design, and campaigns that actually convert.',
  },
]

function IndustryItem({ item, index }: { item: (typeof industries)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.33, 1, 0.68, 1] }}
      className="group border-t border-white/[0.07] py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start"
    >
      <div className="md:col-span-1">
        <span className="font-sans text-[10px] tracking-[0.28em] text-brand-green">{item.num}</span>
      </div>
      <div className="md:col-span-5">
        <h3
          className="font-display font-black text-cream uppercase leading-none group-hover:text-brand-green transition-colors duration-300"
          style={{ fontSize: 'clamp(32px, 4vw, 58px)' }}
        >
          {item.name}
        </h3>
      </div>
      <div className="md:col-span-6 md:pt-2">
        <p className="font-sans text-sm text-cream/45 leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  )
}

export default function OurLanesPage() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div className="bg-[#090909] min-h-screen pt-16">

      {/* Hero */}
      <section className="py-20 md:py-28 border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="font-display font-black text-cream uppercase leading-[0.88]"
              style={{ fontSize: 'clamp(48px, 9vw, 130px)' }}
            >
              Our
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.76, 0, 0.24, 1] }}
              className="font-display font-black uppercase leading-[0.88] text-brand-green"
              style={{ fontSize: 'clamp(48px, 9vw, 130px)' }}
            >
              Lanes.
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-sans font-light text-cream/50 text-lg max-w-2xl"
          >
            We don't do generic. Every industry we work in, we work in because we understand it — the culture, the audience, and what actually moves people.
          </motion.p>
        </div>
      </section>

      {/* Culture write-up */}
      <section className="py-20 md:py-24 border-b border-white/[0.06] bg-[#0c0c0c]" ref={ref}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5"
            >
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green block mb-5">
                — Our Edge
              </span>
              <h2
                className="font-display font-black text-cream uppercase leading-[0.9]"
                style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
              >
                Culture
                <br />
                <span className="text-brand-green">Is the</span>
                <br />
                Strategy.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-7 flex flex-col gap-6 justify-center"
            >
              <p className="font-sans text-base text-cream/60 leading-relaxed">
                Most agencies treat every industry the same. Brief in, deliverables out. Curated Department operates differently — we immerse ourselves in the industries we serve. We go to the races, wear the brands, follow the communities, and pay attention to what's actually happening inside the culture.
              </p>
              <p className="font-sans text-base text-cream/60 leading-relaxed">
                That's what makes our content feel native instead of forced. It's what makes our merch sell instead of sit. It's what makes campaigns land instead of scroll past. You can't fake cultural fluency — and you can feel the difference immediately when it's real.
              </p>
              <p className="font-sans text-base text-cream/60 leading-relaxed">
                Our top skill isn't design or strategy — it's <span className="text-cream font-medium">knowing how to blend in</span>. To understand an audience so well that the work we produce feels like it came from inside the community, not a marketing department looking in from the outside.
              </p>

              <div className="grid grid-cols-3 gap-px bg-white/[0.06] mt-4">
                {[
                  { stat: '300+', label: 'Brands Worked With' },
                  { stat: '8+', label: 'Industries Served' },
                  { stat: '2018', label: 'Founded' },
                ].map((item) => (
                  <div key={item.stat} className="bg-[#0c0c0c] px-5 py-6">
                    <p className="font-display font-black text-cream text-3xl md:text-4xl leading-none mb-1">{item.stat}</p>
                    <p className="font-sans text-[10px] tracking-[0.16em] uppercase text-cream/35">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industry list */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn className="mb-4">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">
              — Industries We Serve
            </span>
          </FadeIn>

          {industries.map((item, i) => (
            <IndustryItem key={item.num} item={item} index={i} />
          ))}
          <div className="border-t border-white/[0.07]" />
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-20 border-t border-white/[0.06] bg-[#050505]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h2 className="font-display font-black text-cream uppercase leading-[0.9] mb-2" style={{ fontSize: 'clamp(28px, 4vw, 56px)' }}>
                  Your Industry<br /><span className="text-brand-green">Is Our Industry.</span>
                </h2>
                <p className="font-sans text-cream/40 text-sm max-w-sm">We're selective about the brands we take on — but always open to the right fit.</p>
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
