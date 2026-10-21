'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { CaseStudy } from '@/lib/caseStudies'
import PhoneFrame from './PhoneFrame'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.33, 1, 0.68, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const wrap = 'max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20'

export default function CaseStudyPage({ study, index }: { study: CaseStudy; index: number }) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <div className="bg-[#0a0908]">

      {/* Hero */}
      <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
        <img src={study.heroImage} alt={`${study.client} campaign`} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-[#0a0908]/55 to-[#0a0908]/30" />

        <div className={`${wrap} relative w-full pb-16 md:pb-24 pt-32`}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="font-display font-black uppercase text-cream text-sm tracking-[0.2em]">Case Study {num}</span>
            <span className="h-px w-12 bg-cream/50" />
            <span className="font-serif italic text-cream/80 text-lg">{study.engagement}</span>
          </motion.div>

          <motion.img
            src={study.logo}
            alt={study.client}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="w-[min(78vw,720px)] h-auto mb-10"
          />

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
              className="font-display font-black uppercase text-cream leading-[0.88] tracking-tighter max-w-5xl"
              style={{ fontSize: 'clamp(36px, 6.4vw, 104px)' }}
            >
              {study.tagline}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Meta strip */}
      <section className="border-y border-white/10">
        <div className={`${wrap} grid grid-cols-2 lg:grid-cols-4`}>
          {[
            ['Client', study.client],
            ['Engagement', study.engagement],
            ['Role', study.role],
            ['Timeline', study.timeline],
          ].map(([k, v], i) => (
            <div key={k} className={`py-8 md:py-10 ${i % 2 ? 'pl-6 md:pl-10 border-l border-white/10' : i ? 'lg:pl-10 lg:border-l lg:border-white/10' : ''} ${i > 1 ? 'border-t lg:border-t-0 border-white/10' : ''}`}>
              <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-cream/40 mb-2">{k}</p>
              <p className="font-display font-black uppercase text-cream text-xl md:text-2xl leading-none">{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brief + approach */}
      <section className="py-24 md:py-36">
        <div className={`${wrap} grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20`}>
          <FadeIn className="lg:col-span-5">
            <span className="font-serif italic text-xl text-cream/60 block mb-5">— The Brief</span>
            <h2 className="font-display font-black uppercase text-cream leading-[0.88] tracking-tighter" style={{ fontSize: 'clamp(44px, 6.5vw, 104px)' }}>
              One Team.<br /><span className="text-outline">Whole Brand.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="lg:col-span-7 flex flex-col gap-10 lg:pt-4">
            <div className="space-y-5">
              {study.brief.map((p) => (
                <p key={p} className="font-sans text-lg text-cream/70 leading-relaxed">{p}</p>
              ))}
            </div>
            <div className="border-l-2 border-cream pl-6 space-y-5">
              <p className="font-display font-black uppercase text-cream text-sm tracking-[0.2em]">Our Approach</p>
              {study.approach.map((p) => (
                <p key={p} className="font-sans text-base text-cream/60 leading-relaxed">{p}</p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Feature image */}
      <FadeIn>
        <img src={study.featureImage} alt={`${study.client} campaign`} className="w-full h-[60vh] md:h-[85vh] object-cover" loading="lazy" />
      </FadeIn>

      {/* Scope */}
      <section className="py-24 md:py-36">
        <div className={wrap}>
          <FadeIn className="flex flex-wrap items-end justify-between gap-6 mb-14 md:mb-20">
            <h2 className="font-display font-black uppercase text-cream leading-[0.86] tracking-tighter" style={{ fontSize: 'clamp(48px, 9vw, 144px)' }}>
              Full<br /><span className="text-outline">Scope.</span>
            </h2>
            <p className="font-sans text-cream/55 max-w-sm leading-relaxed">
              {study.scope.length} services, one creative direction. Everything the customer sees runs through us.
            </p>
          </FadeIn>

          <div className="border-b border-cream/15">
            {study.scope.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.05}>
                <a href={s.href} className="group btn-wipe [--wipe:#F4F4F2] block border-t border-cream/15 px-2 md:px-4 py-8 md:py-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-start">
                    <span className="lg:col-span-1 font-sans text-[11px] tracking-[0.2em] text-cream/40 group-hover:text-[#0a0908]/50 pt-2 transition-colors duration-300">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="lg:col-span-5 font-display font-black uppercase leading-[0.92] tracking-tight text-cream group-hover:text-[#0a0908] transition-colors duration-300" style={{ fontSize: 'clamp(28px, 3.8vw, 56px)' }}>
                      {s.title}
                    </h3>
                    <div className="lg:col-span-6 flex flex-col gap-4">
                      <p className="font-sans text-cream/60 group-hover:text-[#0a0908]/70 leading-relaxed transition-colors duration-300">{s.summary}</p>
                      <div className="flex flex-wrap gap-2">
                        {s.deliverables.map((d) => (
                          <span key={d} className="font-sans text-[10px] uppercase tracking-[0.14em] px-3 py-1.5 border border-cream/20 text-cream/60 group-hover:border-[#0a0908]/25 group-hover:text-[#0a0908]/70 transition-colors duration-300">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Launch video in phone */}
      <section className="bg-cream text-[#0a0908] py-24 md:py-36 overflow-hidden">
        <div className={`${wrap} grid grid-cols-1 lg:grid-cols-2 gap-16 items-center`}>
          <FadeIn>
            <span className="font-serif italic text-xl text-[#0a0908]/60 block mb-5">— The Launch</span>
            <h2 className="font-display font-black uppercase leading-[0.86] tracking-tighter mb-8" style={{ fontSize: 'clamp(52px, 10vw, 168px)' }}>
              {study.launch.title.split(' ')[0]}<br /><span className="text-outline">{study.launch.title.split(' ').slice(1).join(' ') || 'Drop.'}</span>
            </h2>
            <p className="font-sans text-lg text-[#0a0908]/70 leading-relaxed max-w-md">{study.launch.copy}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <PhoneFrame video={study.launch.video} poster={study.launch.poster} label={`${study.client} launch video`} />
          </FadeIn>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 md:py-36">
        <div className={wrap}>
          <FadeIn className="mb-12 md:mb-16 flex items-end justify-between flex-wrap gap-4">
            <h2 className="font-display font-black uppercase text-cream leading-[0.86] tracking-tighter" style={{ fontSize: 'clamp(44px, 7vw, 112px)' }}>
              From the <span className="text-outline">Shoot.</span>
            </h2>
            <span className="font-sans text-[11px] uppercase tracking-[0.24em] text-cream/40">{study.gallery.length} Frames</span>
          </FadeIn>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {study.gallery.map((g, i) => (
              <FadeIn key={g.src} delay={(i % 3) * 0.06} className="mb-4 break-inside-avoid">
                <div className="group overflow-hidden">
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    className="w-full h-auto grayscale-[35%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className={`${wrap} flex flex-col lg:flex-row lg:items-end justify-between gap-10`}>
          <FadeIn>
            <h2 className="font-display font-black uppercase text-cream leading-[0.86] tracking-tighter" style={{ fontSize: 'clamp(44px, 8vw, 128px)' }}>
              Your Brand<br /><span className="text-outline">Next.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="flex flex-wrap gap-4">
            <a href="/contact" className="btn-wipe [--wipe:#0a0908] inline-flex items-center gap-3 bg-cream text-[#0a0908] hover:text-cream font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-8 py-4 transition-colors duration-300">
              Start a Project →
            </a>
            <a href="/work" className="btn-wipe [--wipe:#F4F4F2] inline-flex items-center gap-3 border border-cream/40 hover:border-cream text-cream hover:text-[#0a0908] font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-8 py-4 transition-colors duration-300">
              All Work
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
