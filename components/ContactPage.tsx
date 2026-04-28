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
  "bg-white/[0.05] border border-white/10 text-cream placeholder:text-cream/30 font-sans text-sm px-4 py-3.5 outline-none focus:border-brand-green/60 transition-colors duration-200 rounded-sm w-full"

const selectClass =
  "bg-white/[0.05] border border-white/10 text-cream font-sans text-sm px-4 py-3.5 outline-none focus:border-brand-green/60 transition-colors duration-200 rounded-sm w-full appearance-none cursor-pointer"

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.33, 1, 0.68, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="bg-[#090909] min-h-screen pt-16">

      {/* Hero */}
      <section className="py-20 md:py-28 border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="font-display font-black text-cream uppercase leading-[0.88]"
              style={{ fontSize: 'clamp(56px, 10vw, 148px)' }}
            >
              Let's<br />
              <span className="text-brand-green">Talk.</span>
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-sans font-light text-cream/50 text-lg max-w-xl"
          >
            Build a quote, start a project, or just reach out. We respond within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Two-column: form + direct contact */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-20">

            {/* Form */}
            <div className="md:col-span-7">
              <FadeIn className="mb-10">
                <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green block mb-3">
                  — Build a Quote
                </span>
                <h2
                  className="font-display font-black text-cream uppercase leading-[0.9]"
                  style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
                >
                  Tell Us What<br />You Need.
                </h2>
              </FadeIn>

              <FadeIn delay={0.1}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Your name" required className={inputClass} />
                    <input type="tel" placeholder="Phone number" className={inputClass} />
                  </div>
                  <input type="email" placeholder="Email address" required className={inputClass} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <select required className={selectClass} defaultValue="">
                        <option value="" disabled>Service requested</option>
                        {services.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-cream/30">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    </div>
                    <div className="relative">
                      <select className={selectClass} defaultValue="">
                        <option value="" disabled>Monthly budget</option>
                        {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-cream/30">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    </div>
                  </div>
                  <textarea
                    placeholder="Tell us about your brand, goals, or any context that helps..."
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                  <div className="flex items-center gap-4 pt-1 flex-wrap">
                    <button
                      type="submit"
                      className={`inline-flex items-center gap-3 font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-8 py-4 rounded-sm transition-all duration-200 ${
                        submitted
                          ? 'bg-brand-green text-cream'
                          : 'bg-cream text-[#090909] hover:bg-brand-green hover:text-cream hover:-translate-y-0.5'
                      }`}
                    >
                      {submitted ? 'Sent — We\'ll Be In Touch ✓' : 'Build My Quote →'}
                    </button>
                    <span className="font-sans text-[10px] tracking-[0.15em] text-cream/30">
                      We respond within 24 hours
                    </span>
                  </div>
                </form>
              </FadeIn>
            </div>

            {/* Direct contact */}
            <div className="md:col-span-5">
              <FadeIn delay={0.15} className="mb-10">
                <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green block mb-3">
                  — Direct Line
                </span>
                <h2
                  className="font-display font-black text-cream uppercase leading-[0.9]"
                  style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
                >
                  Reach Us<br />Directly.
                </h2>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="space-y-8">

                  {/* CEO contact card */}
                  <div className="border border-white/[0.08] p-6 hover:border-brand-green/40 transition-colors duration-300 group">
                    <p className="font-sans text-[9px] tracking-[0.22em] uppercase text-brand-green mb-3">
                      Chief Executive Officer
                    </p>
                    <p className="font-display font-black text-cream uppercase text-2xl mb-4">
                      Albert Garcia
                    </p>
                    <div className="space-y-3">
                      <a
                        href="mailto:albert@curateddepartment.com"
                        className="flex items-center gap-3 text-cream/55 hover:text-cream transition-colors duration-200 group/link"
                      >
                        <div className="w-8 h-8 border border-white/10 group-hover/link:border-brand-green/50 flex items-center justify-center transition-colors duration-200 flex-shrink-0">
                          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                            <rect x="0.5" y="0.5" width="13" height="9" rx="1" stroke="currentColor" strokeWidth="1"/>
                            <path d="M1 1l6 4.5L13 1" stroke="currentColor" strokeWidth="1"/>
                          </svg>
                        </div>
                        <span className="font-sans text-sm">albert@curateddepartment.com</span>
                      </a>
                      <a
                        href="tel:+19518165260"
                        className="flex items-center gap-3 text-cream/55 hover:text-cream transition-colors duration-200 group/link"
                      >
                        <div className="w-8 h-8 border border-white/10 group-hover/link:border-brand-green/50 flex items-center justify-center transition-colors duration-200 flex-shrink-0">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 1h2.5l1 2.5-1.5 1a7 7 0 003.5 3.5l1-1.5L11 7.5V10a1 1 0 01-1 1A9 9 0 011 2a1 1 0 011-1z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="font-sans text-sm">(951) 816-5260</span>
                      </a>
                    </div>
                  </div>

                  {/* Response time */}
                  <div className="border-l-2 border-brand-green pl-5">
                    <p className="font-sans text-sm text-cream/50 leading-relaxed">
                      We typically respond same day for project inquiries. For urgent requests, call directly.
                    </p>
                  </div>

                  {/* Social */}
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.22em] uppercase text-cream/30 mb-4">
                      Follow Along
                    </p>
                    <div className="flex gap-3">
                      <a
                        href="#"
                        className="flex items-center gap-2 border border-white/10 px-4 py-2.5 text-cream/50 hover:text-cream hover:border-white/30 transition-all duration-200"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        <span className="font-sans text-[10px] tracking-[0.12em] uppercase">Instagram</span>
                      </a>
                    </div>
                  </div>

                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom strip */}
      <section className="border-t border-white/[0.06] py-12 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-cream/25">
              Curated Department — Creative / Digital / Print / Merchandise
            </p>
            <div className="flex items-center gap-6">
              <a href="mailto:albert@curateddepartment.com" className="font-sans text-[11px] text-cream/40 hover:text-brand-green transition-colors duration-200">
                albert@curateddepartment.com
              </a>
              <a href="tel:+19518165260" className="font-sans text-[11px] text-cream/40 hover:text-brand-green transition-colors duration-200">
                (951) 816-5260
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
