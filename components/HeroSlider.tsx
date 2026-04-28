'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  { prefix: 'CURATED', word: 'DEPT.',     color: '#A8C4DF' },
  { prefix: 'CURATED', word: 'CONTENT.',  color: '#1E7A38' },
  { prefix: 'CURATED', word: 'THOUGHTS.', color: '#A8C4DF' },
  { prefix: 'CURATED', word: 'DESIGN.',   color: '#1E7A38' },
  { prefix: 'CURATED', word: 'BRAND.',    color: '#A8C4DF' },
  { prefix: 'WE',      word: 'CURATE.',   color: '#1E7A38' },
]

const INTERVAL = 2800

const slideVariants = {
  enter: { y: '102%', skewY: 2 },
  center: { y: '0%', skewY: 0 },
  exit: { y: '-102%', skewY: -2 },
}

const transition = {
  duration: 0.72,
  ease: [0.76, 0, 0.24, 1],
}

export default function HeroSlider() {
  const [idx, setIdx] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % slides.length)
      setProgress(0)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setProgress(0)
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      setProgress(Math.min(elapsed / INTERVAL, 1))
      if (elapsed < INTERVAL) requestAnimationFrame(tick)
    }
    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [idx])

  const current = slides[idx]

  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#090909] flex flex-col justify-between overflow-hidden pt-16"
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        style={{ zIndex: 0 }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay to ensure text legibility */}
      <div className="absolute inset-0 bg-[#090909]/55" style={{ zIndex: 1 }} />

      {/* Decorative background marks */}
      <div className="absolute top-32 right-16 font-sans text-[10px] tracking-[0.3em] uppercase text-cream/20 select-none rotate-90" style={{ zIndex: 2 }}>
        Est. 2024
      </div>
      <div className="absolute bottom-24 right-12 w-[1px] h-24 bg-brand-green/40" style={{ zIndex: 2 }} />
      <div className="absolute top-1/2 left-8 -translate-y-1/2 w-[1px] h-32 bg-cream/10" style={{ zIndex: 2 }} />

      {/* Main hero content */}
      <div className="relative flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto w-full" style={{ zIndex: 2 }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-8 md:mb-12"
        >
          <span className="w-7 h-[1px] bg-brand-green" />
          <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">
            Creative Department
          </span>
        </motion.div>

        {/* Animated headline */}
        <div className="mb-8 md:mb-12" style={{ lineHeight: 0.9 }}>

          {/* Prefix line */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.prefix}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
                className="font-display font-black italic text-cream"
                style={{ fontSize: 'clamp(64px, 11vw, 168px)' }}
              >
                {current.prefix}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Changing word line */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.word}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ ...transition, delay: 0.06 }}
                className="font-display font-black"
                style={{ fontSize: 'clamp(64px, 11vw, 168px)', color: current.color }}
              >
                {current.word}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="font-sans font-light text-cream/60 max-w-xl text-base md:text-lg leading-relaxed mb-10"
        >
          A creative department for brands that need content, design, digital,
          print, merchandise, and strategy under one roof.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex items-center gap-4 flex-wrap"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-3 bg-cream text-[#090909] font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-7 py-4 rounded-sm hover:bg-brand-green hover:text-cream transition-colors duration-200"
          >
            View Work
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 border border-cream/30 text-cream font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-7 py-4 rounded-sm hover:border-brand-green hover:text-brand-green transition-all duration-200"
          >
            Start a Project
          </a>
        </motion.div>
      </div>

      {/* Progress bar + slide counter */}
      <div className="relative px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto w-full pb-10 flex items-center justify-between" style={{ zIndex: 2 }}>
        <div className="flex items-center gap-4">
          <div className="w-32 h-[1px] bg-cream/15 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute top-0 left-0 h-full bg-brand-green rounded-full"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className="font-sans text-[10px] tracking-[0.2em] text-cream/35">
            {String(idx + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === idx ? 'bg-brand-green scale-125' : 'bg-cream/25 hover:bg-cream/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
