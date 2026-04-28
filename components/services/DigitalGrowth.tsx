'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const subServices = [
  {
    id: '1A',
    title: 'Social Media Management',
    accent: '#C5D8F2',
    description:
      'Instagram, TikTok, YouTube, and Facebook — fully managed. We handle posting, scheduling, community engagement, content strategy, and monthly content calendars so your brand stays consistent and active across every platform.',
    includes: [
      'Feed posts, Reels, and Stories on Instagram',
      'TikTok content creation and posting',
      'YouTube upload management and SEO',
      'Facebook Page management and community',
      'Monthly content calendar and strategy',
      'Engagement monitoring and response',
    ],
  },
  {
    id: '1B',
    title: 'Paid Advertising',
    accent: '#EDD96A',
    description:
      'Meta Ads across Facebook and Instagram, Google Ads for Search and Display, plus retargeting campaigns and scaling strategies — all built to maximize ROI, not just ad spend.',
    includes: [
      'Meta Ads (Facebook + Instagram) setup and management',
      'Google Search and Display campaigns',
      'Retargeting and lookalike audience building',
      'Ad creative direction and copywriting',
      'A/B testing and performance optimization',
      'Monthly reporting and scaling strategy',
    ],
  },
  {
    id: '1C',
    title: 'Email & SMS Marketing',
    accent: '#A8C4DF',
    description:
      'Full campaign builds and automations that run in the background and drive repeat revenue. We build the flows, write the copy, and manage the sends so your list works for you.',
    includes: [
      'Welcome sequences for new subscribers',
      'Abandoned cart recovery flows',
      'Post-purchase follow-up sequences',
      'Win-back campaigns for dormant customers',
      'Promotional and launch campaign sends',
      'List growth strategy and segmentation',
    ],
  },
  {
    id: '1D',
    title: 'Content Creation',
    accent: '#FF5A3D',
    description:
      "Short-form video production, photo content, and brand storytelling designed to connect with your audience and drive engagement. Built for every platform, in your brand's visual language.",
    includes: [
      'Short-form video for Reels, TikTok, and Shorts',
      'Product and lifestyle photography direction',
      'Behind-the-scenes and brand culture content',
      'Ad-ready content cuts and formats',
      'Platform-optimized editing and captions',
      'Visual style guide alignment',
    ],
  },
  {
    id: '1E',
    title: 'Brand Strategy & Positioning',
    accent: '#C5D8F2',
    description:
      'Brand voice development, messaging systems, and offer positioning — the strategic foundation that makes every piece of content and every campaign make sense.',
    includes: [
      'Brand voice and tone documentation',
      'Messaging framework and copy pillars',
      'Audience persona development',
      'Competitor landscape analysis',
      'Offer positioning and value proposition',
      'Content pillar strategy',
    ],
  },
  {
    id: '1F',
    title: 'Brand Management',
    accent: '#1E7A38',
    description:
      'Full oversight of your brand presence. Creative direction across all platforms, visual consistency across every touchpoint, and a dedicated team that knows your brand inside out.',
    includes: [
      'Cross-platform creative direction',
      'Brand consistency audits and enforcement',
      'Campaign planning and execution calendar',
      'Vendor and partner coordination',
      'Brand asset management and organization',
      'Monthly strategic review and roadmap',
    ],
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

function SubServiceSection({ sub, index }: { sub: (typeof subServices)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.05, ease: [0.33, 1, 0.68, 1] }}
      className="border-t border-white/[0.08] py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 group"
    >
      {/* Left */}
      <div className="md:col-span-4">
        <span
          className="inline-block font-sans text-[9px] tracking-[0.22em] uppercase px-2.5 py-1.5 mb-4"
          style={{ color: sub.accent, background: `${sub.accent}15` }}
        >
          {sub.id}
        </span>
        <h3
          className="font-display font-black italic text-cream leading-[0.92] mb-4"
          style={{ fontSize: 'clamp(22px, 2.5vw, 36px)' }}
        >
          {sub.title}
        </h3>
        <p className="font-sans font-light text-cream/50 text-sm leading-relaxed">
          {sub.description}
        </p>
      </div>

      {/* Right: includes */}
      <div className="md:col-span-8 md:pl-8">
        <p className="font-sans text-[9px] tracking-[0.22em] uppercase text-cream/25 mb-5">
          What's Included
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {sub.includes.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span
                className="w-1 h-1 rounded-full flex-shrink-0 mt-[7px]"
                style={{ background: sub.accent }}
              />
              <span className="font-sans text-sm text-cream/60">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function DigitalGrowth() {
  return (
    <main className="min-h-screen bg-[#090909]">

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-12"
        >
          <a href="/#services" className="font-sans text-[10px] tracking-[0.22em] uppercase text-cream/30 hover:text-cream/60 transition-colors duration-200">Services</a>
          <span className="font-sans text-[10px] text-cream/20">—</span>
          <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-brand-green">Digital Growth</span>
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
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">01 / Primary Offer</span>
            </motion.div>

            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
                className="font-display font-black italic text-cream leading-[0.88]"
                style={{ fontSize: 'clamp(44px, 7vw, 108px)' }}
              >
                Digital Growth<br />&amp; Brand<br />Management.
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-2 mt-8"
            >
              {['Social Media', 'Paid Ads', 'Email & SMS', 'Content', 'Brand Strategy'].map((t) => (
                <span key={t} className="font-sans text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 border border-white/15 text-cream/50">{t}</span>
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
              Our core service — full-scale brand presence management. Six interconnected sub-services that work together as one system to grow your brand across every digital channel.
            </p>
            <div className="border border-brand-green/30 bg-brand-green/[0.04] px-5 py-4 rounded-sm">
              <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-brand-green mb-1">Starting At</p>
              <p className="font-display font-black text-cream text-2xl">$2,000 / month</p>
              <p className="font-sans text-xs text-cream/40 mt-1">Custom growth plans available</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="mt-16 h-[1px] bg-white/[0.08] origin-left"
        />
      </section>

      {/* Sub-services */}
      <section className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto pb-20">
        <FadeIn className="mb-4">
          <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">— Six Sub-Services</p>
        </FadeIn>
        {subServices.map((sub, i) => (
          <SubServiceSection key={sub.id} sub={sub} index={i} />
        ))}
        <div className="border-t border-white/[0.08]" />
      </section>

      {/* Pricing + CTA */}
      <section className="bg-[#0d0d0d] py-20 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <FadeIn className="lg:col-span-6">
            <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green mb-4">— Pricing</p>
            <h2
              className="font-display font-black italic text-cream leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}
            >
              Built around<br />your growth goals.
            </h2>
            <p className="font-sans font-light text-cream/55 text-base leading-relaxed mb-4">
              Every Digital Growth plan starts at $2,000/month. What's included depends on your channels, your goals, and how much of the work you need us to own. We build a custom plan after the first call.
            </p>
            <p className="font-sans font-light text-cream/35 text-sm leading-relaxed">
              Monthly retainers. No long-term contracts required after the initial 90-day onboarding period.
            </p>
          </FadeIn>

          <FadeIn className="lg:col-span-6" delay={0.15}>
            <div className="border border-white/[0.08] bg-[#111111] p-8">
              <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-cream/30 mb-6">What a plan covers</p>
              {[
                'Platform selection (1–4 channels)',
                'Monthly content calendar + posting',
                'Ad campaign management (if included)',
                'Email/SMS flows and campaigns',
                'Monthly strategy call + performance report',
                'Dedicated account lead',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 py-3 border-t border-white/[0.06]">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0 mt-[6px]" />
                  <span className="font-sans text-sm text-cream/60">{item}</span>
                </div>
              ))}
              <div className="border-t border-white/[0.06] mt-4 pt-6">
                <a
                  href="/#contact"
                  className="inline-flex w-full items-center justify-center gap-3 bg-brand-green text-cream font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-8 py-4 rounded-sm hover:bg-[#1a6830] transition-colors duration-200"
                >
                  Apply for Digital Growth →
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Related */}
      <section className="py-16 px-6 md:px-12 lg:px-20 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-cream/25">Other Services</p>
          <div className="flex flex-wrap gap-3">
            {[
              { name: 'Merchandise Production', href: '/services/merchandise-production' },
              { name: 'Branding & Experience', href: '/services/branding-experience' },
              { name: 'Print & Promo', href: '/services/print-production' },
            ].map((s) => (
              <a key={s.name} href={s.href} className="font-sans text-[11px] tracking-[0.14em] uppercase border border-white/[0.08] px-4 py-2.5 text-cream/40 hover:text-cream hover:border-white/25 transition-all duration-200">
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
