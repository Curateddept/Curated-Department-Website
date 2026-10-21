'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Script from 'next/script'

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="contact" className="bg-cream py-24 md:py-36 relative overflow-hidden">
      <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span
          className="font-display font-black text-[#090909]/[0.04] whitespace-nowrap uppercase"
          style={{ fontSize: 'clamp(100px, 20vw, 280px)' }}
        >
          CURATED.
        </span>
      </div>

      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#090909]/10" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative" ref={ref}>
        <div>

          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="font-serif italic text-xl text-[#0a0908]/60">
              — Build a Quote
            </span>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ y: '100%', opacity: 0 }}
              animate={inView ? { y: '0%', opacity: 1 } : {}}
              transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
              className="font-display font-black text-[#0a0908] leading-[0.86] uppercase tracking-tighter"
              style={{ fontSize: 'clamp(52px, 11vw, 176px)' }}
            >
              Let&apos;s Curate<br /><span className="text-outline">What&apos;s Next.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-sans font-light text-[#0a0908]/60 text-lg leading-relaxed mb-10 max-w-3xl"
          >
            Tell us what you need. We'll tell you exactly what we'd build.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl"
          >
            <iframe
              src="https://tally.so/embed/441l1d?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="467"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Curated Department contact form"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
