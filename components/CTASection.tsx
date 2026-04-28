'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  'Digital Growth & Brand Management',
  'Merchandise Production & Fulfillment',
  'Print & Promotional Production',
  'Dye Sublimation & Fabric Printing',
  'Branding & Experience Design',
  "Not sure yet — let's talk",
]

const budgets = [
  "Still figuring it out (Under $500/mo)",
  "Getting serious ($500 – $1,500/mo)",
  "Ready to build ($1,500 – $3,000/mo)",
  "Full send ($3,000 – $5,000/mo)",
  "Just send the invoice ($5,000+/mo)",
  "Blank check energy — let's talk",
]

const inputClass =
  "bg-[#090909]/[0.06] border border-[#090909]/15 text-[#090909] placeholder:text-[#090909]/35 font-sans text-sm px-4 py-3.5 outline-none focus:border-[#090909]/50 transition-colors duration-200 rounded-sm w-full"

const selectClass =
  "bg-[#090909]/[0.06] border border-[#090909]/15 text-[#090909] font-sans text-sm px-4 py-3.5 outline-none focus:border-[#090909]/50 transition-colors duration-200 rounded-sm w-full appearance-none cursor-pointer"

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="contact" className="bg-[#F0EDE4] py-24 md:py-36 relative overflow-hidden">

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
        <span
          className="font-display font-black text-[#090909]/[0.04] whitespace-nowrap uppercase"
          style={{ fontSize: 'clamp(100px, 20vw, 280px)' }}
        >
          CURATED.
        </span>
      </div>

      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#090909]/10" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative" ref={ref}>
        <div className="max-w-3xl">

          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#090909]/50">
              — Build a Quote
            </span>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ y: '100%', opacity: 0 }}
              animate={inView ? { y: '0%', opacity: 1 } : {}}
              transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
              className="font-display font-black text-[#090909] leading-[0.9] uppercase"
              style={{ fontSize: 'clamp(48px, 8vw, 108px)' }}
            >
              Let's Curate<br />What's Next.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-sans font-light text-[#090909]/55 text-base leading-relaxed mb-10"
          >
            Tell us what you need. We'll tell you exactly what we'd build.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            {/* Row 1: Name + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your name"
                required
                className={inputClass}
              />
              <input
                type="tel"
                placeholder="Phone number"
                className={inputClass}
              />
            </div>

            {/* Row 2: Email */}
            <input
              type="email"
              placeholder="Email address"
              required
              className={inputClass}
            />

            {/* Row 3: Service + Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <select required className={selectClass} defaultValue="">
                  <option value="" disabled>Service requested</option>
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#090909]/40">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <div className="relative">
                <select className={selectClass} defaultValue="">
                  <option value="" disabled>Monthly budget</option>
                  {budgets.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#090909]/40">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Row 4: Message */}
            <textarea
              placeholder="Tell us about your brand, goals, or any context that helps..."
              rows={3}
              className={`${inputClass} resize-none`}
            />

            <div className="flex items-center gap-4 flex-wrap pt-1">
              <button
                type="submit"
                className={`inline-flex items-center gap-3 font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-8 py-4 rounded-sm transition-all duration-200 ${
                  submitted
                    ? 'bg-brand-green text-cream'
                    : 'bg-[#090909] text-cream hover:bg-brand-green hover:-translate-y-0.5'
                }`}
              >
                {submitted ? 'Quote Received ✓' : 'Build My Quote →'}
              </button>
              <span className="font-sans text-[10px] tracking-[0.15em] text-[#090909]/40">
                We respond within 24 hours
              </span>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
