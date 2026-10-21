'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const steps = [
  {
    num: '01',
    label: 'Concept',
    title: 'Concept',
    desc: 'We start by understanding your brand, your audience, and what you actually need — whether that\'s a full rebrand, a merch drop, or a content system.',
  },
  {
    num: '02',
    label: 'Strategy',
    title: 'Strategy',
    desc: 'We map the channels, messaging, production plan, and timeline. Every service — social, merch, print, digital — gets a clear roadmap before anything is built.',
  },
  {
    num: '03',
    label: 'Build',
    title: 'Build',
    desc: 'Design, produce, and develop every deliverable. Identity systems, apparel, content assets, campaigns, print collateral — built to spec and on deadline.',
  },
  {
    num: '04',
    label: 'Execute',
    title: 'Execute',
    desc: 'Launch, publish, fulfill, and manage. We handle rollout across every channel and make sure the work lands the way it was designed to.',
  },
  {
    num: '05',
    label: 'Recognize',
    title: 'Recognize',
    desc: 'Track results, iterate, and scale what\'s working. We stay in it past delivery — adjusting and optimizing until the work is doing what it\'s supposed to do.',
  },
]

function StepCard({ step, index, active }: { step: (typeof steps)[0]; index: number; active: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
      className="flex-1 min-w-[220px] relative group"
    >
      {/* Connector line (hidden on last item) */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-[22px] left-14 right-0 h-px bg-dark-green/20 z-0" />
      )}

      <div className="relative z-10">
        {/* Step number circle */}
        <div
          className={`w-11 h-11 rounded-full border-2 border-dark-green flex items-center justify-center mb-6 transition-colors duration-500 ${
            active ? 'bg-dark-green text-cream' : 'bg-transparent text-dark-green'
          }`}
        >
          <span className="font-sans text-[11px] font-semibold tracking-[0.12em]">
            {step.num}
          </span>
        </div>

        {/* Label */}
        <h3
          className={`font-display font-black uppercase text-2xl md:text-3xl leading-none mb-3 text-dark-green transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-40'}`}
        >
          {step.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-sm text-dark-green/55 leading-relaxed">
          {step.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function IntroSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [wordIdx, setWordIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIdx((i) => (i + 1) % steps.length)
    }, 2400)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="about" className="bg-cream py-24 md:py-36 relative overflow-hidden">

      {/* Decorative mark */}
      <div className="absolute top-12 right-12 font-display text-[200px] text-dark-green/[0.05] font-black select-none pointer-events-none leading-none">
        CD.
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20" ref={ref}>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="font-serif italic text-lg text-dark-green/70">
            — How We Work
          </span>
        </motion.div>

        {/* Main statement */}
        <div className="overflow-hidden mb-4">
          <motion.h2
            initial={{ y: '100%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="font-display font-black uppercase text-dark-green leading-[0.88] tracking-tighter"
            style={{ fontSize: 'clamp(40px, 7.2vw, 116px)' }}
          >
            From concept to
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-16" style={{ minHeight: 'clamp(40px, 7.2vw, 116px)' }}>
          <AnimatePresence mode="wait">
            <motion.h2
              key={steps[wordIdx].label}
              initial={{ y: '100%', opacity: 0, skewY: 2 }}
              animate={{ y: '0%', opacity: 1, skewY: 0 }}
              exit={{ y: '-100%', opacity: 0, skewY: -2 }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className={`font-display font-black italic uppercase text-dark-green leading-[0.88] tracking-tighter ${wordIdx % 2 ? 'text-outline' : ''}`}
              style={{ fontSize: 'clamp(40px, 7.2vw, 116px)' }}
            >
              {steps[wordIdx].label}.
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Journey steps */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-6 relative">
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} active={i === wordIdx} />
          ))}
        </div>
      </div>
    </section>
  )
}
