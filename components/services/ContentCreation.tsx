'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const contentTypes = [
  {
    num: '01',
    type: 'Short-Form Video',
    accent: '#EDD96A',
    description:
      'Reels, TikToks, YouTube Shorts — built natively for each platform. We handle concept, direction, filming, and editing. Fast-cut, hook-first, optimized for the feed.',
    formats: ['Instagram Reels', 'TikTok Videos', 'YouTube Shorts', 'Story Content'],
  },
  {
    num: '02',
    type: 'Product Clips',
    accent: '#C5D8F2',
    description:
      'Clean, focused product video built for e-commerce, ads, and landing pages. We shoot and edit content that shows the product in its best light — functional and desirable.',
    formats: ['Product demos', 'Unboxing content', 'Feature highlights', 'Ad-ready cuts'],
  },
  {
    num: '03',
    type: 'Lifestyle Photography',
    accent: '#FF5A3D',
    description:
      'Brand and lifestyle imagery that puts your product in context. Shot to work across social, your website, email campaigns, and paid ads without re-shooting for every use.',
    formats: ['Brand campaigns', 'Product-in-use shots', 'Team & culture', 'Event coverage'],
  },
  {
    num: '04',
    type: 'Behind-the-Scenes',
    accent: '#A8C4DF',
    description:
      'The most human content you can post. Process, people, day-in-the-life — the kind of content that builds trust and keeps an audience coming back between launches.',
    formats: ['Process documentation', 'Day-in-the-life', 'Studio/workspace content', 'Team moments'],
  },
]

const included = [
  {
    title: 'Creative Direction',
    desc: 'We develop the visual concept before anything goes in front of a camera. Mood, references, shot list, styling direction — all mapped to your brand aesthetic.',
  },
  {
    title: 'Concept Development',
    desc: 'Every piece of content starts with a brief. We write it. What are we making, why does it matter, and what action should it drive?',
  },
  {
    title: 'Production',
    desc: 'Filming, photography, or motion — we handle the shoot. No need to coordinate a separate production team. We come prepared and execute.',
  },
  {
    title: 'Editing & Post',
    desc: 'Color, cuts, captions, sound — everything finalized to a platform-ready format. You get the final file, ready to post.',
  },
  {
    title: 'Platform Formatting',
    desc: 'One shoot, multiple formats. We cut and resize for every placement: feed, story, reel, ad, web banner — no re-shooting.',
  },
  {
    title: 'Visual Style Shaping',
    desc: 'We help you define and lock in your visual identity — palette, tone, filters, typography — so your content feels consistent and intentional, not random.',
  },
]

const process = [
  {
    step: '01',
    title: 'Creative Brief',
    desc: 'Before we touch a camera, we sit down with you and build the brief. What are we making, who is it for, where does it live, and what should the viewer feel or do?',
  },
  {
    step: '02',
    title: 'Concept & Moodboard',
    desc: 'We build a visual direction — references, shot list, locations, talent if needed, and styling notes. You approve before anything is scheduled.',
  },
  {
    step: '03',
    title: 'Production',
    desc: 'We execute the shoot. Our team handles everything on the day — setup, direction, and capture — so you can show up or stay hands-off.',
  },
  {
    step: '04',
    title: 'Edit & Deliver',
    desc: 'Final edits, color grading, captions, and platform formatting. You receive organized files ready to use immediately across every channel.',
  },
]

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

export default function ContentCreation() {
  return (
    <main className="min-h-screen bg-[#090909]">

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto relative">

        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-12"
        >
          <a href="/#services" className="font-sans text-[10px] tracking-[0.22em] uppercase text-cream/30 hover:text-cream/60 transition-colors duration-200">
            Services
          </a>
          <span className="font-sans text-[10px] text-cream/20">—</span>
          <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-brand-green">
            Content Creation
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-7 h-[1px] bg-brand-green" />
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">
                02 / Content
              </span>
            </motion.div>

            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
                className="font-display font-black italic text-cream leading-[0.88]"
                style={{ fontSize: 'clamp(52px, 8vw, 120px)' }}
              >
                Content that<br />looks good<br />and performs.
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-2 mt-8"
            >
              {['Video', 'Photography', 'Short-Form', 'Lifestyle', 'Product'].map((t) => (
                <span key={t} className="font-sans text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 border border-white/15 text-cream/50">
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="lg:col-span-5"
          >
            <p className="font-sans font-light text-cream/60 text-base leading-relaxed mb-5">
              From short-form video and product clips to lifestyle photography and behind-the-scenes moments — everything we make is built to fit your brand and work across social, ads, and digital.
            </p>
            <p className="font-sans font-light text-cream/40 text-sm leading-relaxed">
              We also help shape your visual style and messaging so your content feels consistent and intentional. The focus: grab attention, tell your story, drive action.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="mt-16 h-[1px] bg-white/[0.08] origin-left"
        />
      </section>

      {/* Content types */}
      <section className="py-20 md:py-28 bg-[#0d0d0d]">
        <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
          <FadeIn className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">— What We Create</span>
            </div>
            <h2
              className="font-display font-black italic text-cream leading-[0.92]"
              style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}
            >
              Four types.<br />One visual system.
            </h2>
            <p className="mt-4 font-sans font-light text-cream/45 max-w-lg text-sm leading-relaxed">
              We don't produce random content. Every format serves a purpose and fits within a unified look and feel for your brand.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/[0.06]">
            {contentTypes.map((ct, i) => (
              <FadeIn key={ct.num} delay={i * 0.08}>
                <div className="bg-[#0d0d0d] p-8 md:p-10 h-full group hover:bg-[#111111] transition-colors duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span
                        className="inline-block font-sans text-[9px] tracking-[0.22em] uppercase px-2.5 py-1.5 mb-3"
                        style={{ color: ct.accent, background: `${ct.accent}15` }}
                      >
                        {ct.num}
                      </span>
                      <h3
                        className="font-display font-black italic text-cream"
                        style={{ fontSize: 'clamp(26px, 3vw, 40px)' }}
                      >
                        {ct.type}
                      </h3>
                    </div>
                  </div>

                  <p className="font-sans font-light text-cream/55 text-sm leading-relaxed mb-7">
                    {ct.description}
                  </p>

                  <div className="border-t border-white/[0.08] pt-6">
                    <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-cream/25 mb-4">Formats</p>
                    <div className="flex flex-wrap gap-2">
                      {ct.formats.map((f) => (
                        <span
                          key={f}
                          className="font-sans text-[10px] tracking-[0.14em] px-2.5 py-1 border text-cream/50"
                          style={{ borderColor: `${ct.accent}30` }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <FadeIn className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">— What's Included</span>
          </div>
          <h2
            className="font-display font-black italic text-cream leading-[0.92]"
            style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}
          >
            From concept<br />to final file.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
          {included.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06}>
              <div className="bg-[#090909] p-8 h-full group hover:bg-[#111111] transition-colors duration-300">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-green/40 group-hover:bg-brand-green mb-6 transition-colors duration-300" />
                <h3 className="font-display font-bold italic text-cream text-xl mb-3">{item.title}</h3>
                <p className="font-sans font-light text-cream/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Visual identity angle */}
      <section className="py-20 md:py-28 bg-[#0d0d0d]">
        <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <FadeIn className="lg:col-span-5">
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Content Types', value: '4+' },
                  { label: 'Platform Formats', value: '10+' },
                  { label: 'Strategy-Led', value: '100%' },
                  { label: 'Brand-Native', value: 'Always' },
                ].map((stat) => (
                  <div key={stat.label} className="border border-white/[0.08] px-6 py-5 bg-[#111111] flex items-center justify-between">
                    <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-cream/35">{stat.label}</span>
                    <span className="font-display font-black text-cream text-3xl">{stat.value}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn className="lg:col-span-7" delay={0.15}>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">— Your Visual Style</span>
              </div>
              <h2
                className="font-display font-black text-cream leading-[0.92] mb-6"
                style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}
              >
                Consistent.<br />
                <span className="italic">Intentional.</span><br />
                Never random.
              </h2>
              <p className="font-sans font-light text-cream/60 text-base leading-relaxed mb-5">
                Good content isn't just well-shot — it's recognizable. We help you define your visual language: the palette, the tone, the framing, the feeling. Once that's locked in, everything we produce reinforces it.
              </p>
              <p className="font-sans font-light text-cream/40 text-sm leading-relaxed">
                Whether someone sees your Reel, your product page, or your ad — it should all feel like the same brand made it. We build the system that makes that possible.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <FadeIn className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">— How It Works</span>
          </div>
          <h2
            className="font-display font-black italic text-cream leading-[0.92]"
            style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}
          >
            Brief to<br />final file.
          </h2>
        </FadeIn>

        <div className="flex flex-col">
          {process.map((step, i) => (
            <FadeIn key={step.step} delay={i * 0.06}>
              <div className="group grid grid-cols-1 md:grid-cols-12 gap-6 border-t border-white/[0.08] py-8 hover:bg-white/[0.015] px-2 -mx-2 transition-colors duration-300 rounded-sm">
                <div className="md:col-span-1">
                  <span className="font-sans text-[10px] tracking-[0.2em] text-cream/25">{step.step}</span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-display font-bold italic text-cream text-2xl group-hover:text-brand-green transition-colors duration-300">
                    {step.title}
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="font-sans font-light text-cream/50 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
          <div className="border-t border-white/[0.08]" />
        </div>
      </section>

      {/* Related */}
      <section className="py-16 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <FadeIn className="mb-8">
          <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-cream/25">Often Paired With</p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { name: 'Social Media Management', href: '/services/social-media-management', accent: '#C5D8F2' },
            { name: 'Paid Ads', href: '/services/paid-ads', accent: '#FF5A3D' },
            { name: 'Brand Direction', href: '/services/brand-direction', accent: '#EDD96A' },
          ].map((s) => (
            <FadeIn key={s.name}>
              <a href={s.href} className="flex items-center justify-between p-6 border border-white/[0.08] hover:border-white/20 group transition-all duration-200">
                <span className="font-display font-bold italic text-cream text-xl group-hover:text-brand-green transition-colors duration-200">{s.name}</span>
                <span className="text-cream/20 group-hover:text-brand-green transition-colors duration-200">→</span>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.06] py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <FadeIn>
            <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-brand-green mb-3">Ready to create?</p>
            <h2
              className="font-display font-black italic text-cream leading-[0.92]"
              style={{ fontSize: 'clamp(32px, 4vw, 60px)' }}
            >
              Let's make<br />something worth watching.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15} className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
            <a href="/#contact" className="inline-flex items-center gap-3 bg-brand-green text-cream font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-8 py-4 rounded-sm hover:bg-[#1a6830] transition-colors duration-200">
              Start a Project →
            </a>
            <a href="/#services" className="inline-flex items-center gap-3 border border-white/15 text-cream/50 hover:text-cream hover:border-white/30 font-sans text-[11px] tracking-[0.16em] uppercase px-8 py-4 rounded-sm transition-all duration-200">
              All Services
            </a>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
