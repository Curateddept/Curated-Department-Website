'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const pillars = [
  {
    num: '01',
    title: 'Strategy',
    desc: 'Every engagement starts with a clear plan. Brand positioning, audience mapping, offer architecture, and channel strategy — all before a single pixel is touched.',
    accent: 'text-pale-blue',
  },
  {
    num: '02',
    title: 'Creative',
    desc: 'Content, design, and identity work that earns attention. We make things that look and feel right — because how a brand shows up is how it competes.',
    accent: 'text-gold',
  },
  {
    num: '03',
    title: 'Execution',
    desc: 'Strategy and creative are only as good as what gets built. We handle production, fulfillment, deployment, and ongoing management — end to end.',
    accent: 'text-coral',
  },
]

export default function WhyCurated() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="about" className="bg-[#111111] py-24 md:py-36 relative overflow-hidden">

      {/* Decorative SVG squiggle */}
      <svg
        className="absolute top-16 right-16 opacity-[0.06] hidden md:block"
        width="80"
        height="60"
        viewBox="0 0 80 60"
        fill="none"
      >
        <path
          d="M4 30 Q 14 10, 24 30 Q 34 50, 44 30 Q 54 10, 64 30 Q 74 50, 80 30"
          stroke="#F5F0E4"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">
              — Why Curated
            </span>
          </div>
          <h2
            className="font-display font-black text-cream leading-[0.92]"
            style={{ fontSize: 'clamp(44px, 7vw, 96px)' }}
          >
            Not an agency.
            <br />
            <span className="italic">A department.</span>
          </h2>
          <p className="mt-6 font-sans font-light text-cream/55 max-w-xl text-lg leading-relaxed">
            We plug into brands as the creative, digital, and production arm
            they wish they had in-house.
          </p>
        </motion.div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06]">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
              className="bg-[#111111] px-8 py-10 group hover:bg-[#181818] transition-colors duration-300"
            >
              <div className={`font-display font-black text-5xl mb-6 ${pillar.accent}`}>
                {pillar.num}
              </div>
              <h3 className="font-display font-bold italic text-cream text-3xl mb-4">
                {pillar.title}.
              </h3>
              <p className="font-sans font-light text-cream/55 text-sm leading-relaxed">
                {pillar.desc}
              </p>
              <div className="mt-8 w-8 h-[1px] bg-cream/15 group-hover:w-16 group-hover:bg-brand-green transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
