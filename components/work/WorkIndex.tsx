'use client'

import { motion } from 'framer-motion'
import { caseStudies } from '@/lib/caseStudies'

export default function WorkIndex() {
  return (
    <div className="bg-[#0a0908] min-h-screen pt-16">
      <section className="py-20 md:py-28 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <span className="font-serif italic text-xl text-cream/60 block mb-6">— Case Studies</span>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="font-display font-black uppercase text-cream leading-[0.86] tracking-tighter"
              style={{ fontSize: 'clamp(56px, 12vw, 200px)' }}
            >
              Our <span className="text-outline">Work.</span>
            </motion.h1>
          </div>
          <p className="font-sans text-lg text-cream/55 max-w-xl mt-8 leading-relaxed">
            Full-scope engagements where we run the creative for the whole brand — content, social, email, merch and print under one direction.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col gap-6">
          {caseStudies.map((c, i) => (
            <motion.a
              key={c.slug}
              href={`/work/${c.slug}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.33, 1, 0.68, 1] }}
              className="group relative block overflow-hidden aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]"
            >
              <img src={c.heroImage} alt={`${c.client} campaign`} className="absolute inset-0 h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
              <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-display font-black uppercase text-cream text-sm tracking-[0.2em]">Case Study {String(i + 1).padStart(2, '0')}</span>
                  <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-cream/70 border border-cream/40 px-3 py-1.5">{c.engagement}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <img src={c.logo} alt={c.client} className="w-[min(60vw,420px)] h-auto mb-5" />
                    <p className="font-display font-black uppercase text-cream text-2xl md:text-4xl leading-none max-w-xl">{c.tagline}</p>
                  </div>
                  <span className="inline-flex items-center gap-3 bg-cream text-[#0a0908] font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-6 py-3.5 w-fit group-hover:gap-5 transition-all duration-300">
                    View Case Study →
                  </span>
                </div>
              </div>
            </motion.a>
          ))}

          <div className="border border-dashed border-cream/20 py-16 text-center">
            <p className="font-display font-black uppercase text-cream/30 text-2xl md:text-4xl">More Case Studies Coming</p>
          </div>
        </div>
      </section>
    </div>
  )
}
