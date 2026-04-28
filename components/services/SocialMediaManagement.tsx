'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const platforms = [
  {
    name: 'Instagram',
    handle: 'IG',
    accent: '#C5D8F2',
    description:
      'Feed posts, Reels, Stories, and Highlights — all built around a cohesive grid aesthetic that makes your profile the first thing a new follower trusts. We manage cadence, captions, hashtag strategy, and engagement.',
    deliverables: [
      'Feed + Reel post production',
      'Stories & Highlights management',
      'Caption writing & hashtag strategy',
      'Follower engagement & DM monitoring',
      'Profile audit & optimization',
    ],
  },
  {
    name: 'TikTok',
    handle: 'TT',
    accent: '#EDD96A',
    description:
      'Short-form content built for how TikTok actually works — trending sounds, native formats, and hooks that stop the scroll. We handle concept, production direction, editing, posting, and trend monitoring so you stay current without chasing.',
    deliverables: [
      'Short-form video concepts & scripts',
      'Trend monitoring & adaptation',
      'Editing & caption copywriting',
      'Posting schedule & frequency strategy',
      'Comment engagement & community response',
    ],
  },
  {
    name: 'YouTube',
    handle: 'YT',
    accent: '#FF5A3D',
    description:
      'Long-form content that builds authority and searchability. From brand documentaries to product walkthroughs and behind-the-scenes series — we develop your channel strategy, manage uploads, optimize for SEO, and build a subscriber base that compounds.',
    deliverables: [
      'Channel strategy & content series development',
      'Upload management & SEO optimization',
      'Thumbnail design & title strategy',
      'Description & tagging best practices',
      'YouTube Shorts cross-posting',
    ],
  },
  {
    name: 'Facebook',
    handle: 'FB',
    accent: '#A8C4DF',
    description:
      'Facebook remains a powerful channel for community building, paid retargeting, and reaching audiences that index older. We manage your Page, build community in Groups, and integrate organic activity with your paid ad strategy.',
    deliverables: [
      'Page management & post scheduling',
      'Facebook Group moderation',
      'Event creation & promotion',
      'Organic + paid strategy integration',
      'Audience engagement & reviews',
    ],
  },
]

const included = [
  {
    num: '01',
    title: 'Content Strategy',
    desc: 'Before a single post goes out, we build the strategy. Brand voice, content pillars, audience personas, competitor analysis, and a messaging framework that every piece of content is measured against.',
  },
  {
    num: '02',
    title: 'Content Calendar',
    desc: 'A rolling monthly calendar planned two to four weeks in advance. You always know what\'s coming, can approve or redirect before posting, and never get caught without content at key moments.',
  },
  {
    num: '03',
    title: 'Posting & Scheduling',
    desc: 'We handle every upload — optimized for each platform\'s algorithm, posted at the right times, with the right tags, links, and copy. Nothing goes out without intention behind it.',
  },
  {
    num: '04',
    title: 'Engagement Management',
    desc: 'Replies, comments, DMs, reactions — your community gets responses that sound like you. We manage the conversation so your brand feels alive, approachable, and present.',
  },
  {
    num: '05',
    title: 'Monthly Reporting',
    desc: 'Clear performance data every month — reach, engagement rate, follower growth, top-performing content, and what we\'re adjusting. No vanity metrics, no fluff.',
  },
]

const process = [
  {
    step: '01',
    title: 'Brand Discovery',
    desc: 'We sit down with you — or get on a call — and pull everything out. Who you are, who your customer is, what you\'ve done, what you hate, what makes you different. This is how we learn to speak for your brand.',
  },
  {
    step: '02',
    title: 'Strategy Build',
    desc: 'We take what we learned and build a full social strategy: platforms, content pillars, posting frequency, tone of voice, and benchmark goals. You approve it before we touch anything.',
  },
  {
    step: '03',
    title: 'Content Creation',
    desc: 'Our creative team develops the content — copy, graphics, short-form video direction, or full production depending on your package. Built to your brand, not templated.',
  },
  {
    step: '04',
    title: 'Schedule & Publish',
    desc: 'Everything is scheduled and posted. You can review in advance or let us run — your call. We post at peak times for each platform and monitor performance from day one.',
  },
  {
    step: '05',
    title: 'Optimize & Report',
    desc: 'Every month we review what\'s working, what\'s not, and what\'s next. The strategy evolves with your brand — nothing is set-and-forget.',
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

export default function SocialMediaManagement() {
  return (
    <main className="min-h-screen bg-[#090909]">

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto relative">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-12"
        >
          <a href="/services" className="font-sans text-[10px] tracking-[0.22em] uppercase text-cream/30 hover:text-cream/60 transition-colors duration-200">
            Services
          </a>
          <span className="font-sans text-[10px] text-cream/20">—</span>
          <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-brand-green">
            Social Media Management
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">

            {/* Service label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-7 h-[1px] bg-brand-green" />
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">
                01 / Social Media
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
                Your brand's<br />voice,<br />everywhere<br />it matters.
              </motion.h1>
            </div>

            {/* Platform badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-2 mt-8"
            >
              {['Instagram', 'TikTok', 'YouTube', 'Facebook'].map((p) => (
                <span
                  key={p}
                  className="font-sans text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 border border-white/15 text-cream/50"
                >
                  {p}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="lg:col-span-4"
          >
            <p className="font-sans font-light text-cream/60 text-base leading-relaxed mb-6">
              We take the weight off your plate — extracting your brand's vision directly from your mind and building a social presence that tells your story with consistency, intention, and craft.
            </p>
            <p className="font-sans font-light text-cream/40 text-sm leading-relaxed">
              Full-service social media management across Instagram, TikTok, YouTube, and Facebook. Posting, scheduling, engagement, strategy, and a content calendar — all handled.
            </p>
          </motion.div>
        </div>

        {/* Decorative rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="mt-16 h-[1px] bg-white/[0.08] origin-left"
        />
      </section>

      {/* What's included */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <FadeIn className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">
              — What's Included
            </span>
          </div>
          <h2
            className="font-display font-black italic text-cream leading-[0.92]"
            style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}
          >
            Everything covered.<br />Nothing missed.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
          {included.map((item, i) => (
            <FadeIn key={item.num} delay={i * 0.07}>
              <div className="bg-[#090909] p-8 h-full group hover:bg-[#111111] transition-colors duration-300">
                <div className="font-display font-black text-4xl text-brand-green/40 mb-5 group-hover:text-brand-green transition-colors duration-300">
                  {item.num}
                </div>
                <h3 className="font-display font-bold italic text-cream text-xl mb-3">
                  {item.title}
                </h3>
                <p className="font-sans font-light text-cream/50 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Platform breakdown */}
      <section className="py-20 md:py-28 bg-[#0d0d0d]">
        <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
          <FadeIn className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">
                — The Platforms
              </span>
            </div>
            <h2
              className="font-display font-black italic text-cream leading-[0.92]"
              style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}
            >
              Built for each<br />platform's language.
            </h2>
            <p className="mt-4 font-sans font-light text-cream/45 max-w-lg text-sm leading-relaxed">
              Each platform has its own culture, algorithm, and audience behavior. We don't repurpose — we create native content for each one.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/[0.06]">
            {platforms.map((platform, i) => (
              <FadeIn key={platform.name} delay={i * 0.08}>
                <div className="bg-[#0d0d0d] p-8 md:p-10 h-full group hover:bg-[#111111] transition-colors duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span
                        className="inline-block font-sans text-[9px] tracking-[0.22em] uppercase px-2.5 py-1.5 mb-3"
                        style={{ color: platform.accent, background: `${platform.accent}15` }}
                      >
                        {platform.handle}
                      </span>
                      <h3
                        className="font-display font-black italic text-cream"
                        style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}
                      >
                        {platform.name}
                      </h3>
                    </div>
                    <div
                      className="w-10 h-10 flex items-center justify-center border border-white/10 font-display font-black text-sm flex-shrink-0 mt-1"
                      style={{ color: platform.accent, borderColor: `${platform.accent}30` }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>

                  <p className="font-sans font-light text-cream/55 text-sm leading-relaxed mb-7">
                    {platform.description}
                  </p>

                  <div className="border-t border-white/[0.08] pt-6">
                    <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-cream/25 mb-4">
                      Deliverables
                    </p>
                    <ul className="flex flex-col gap-2.5">
                      {platform.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-3">
                          <span
                            className="w-1 h-1 rounded-full flex-shrink-0 mt-[7px]"
                            style={{ background: platform.accent }}
                          />
                          <span className="font-sans text-sm text-cream/60">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* The philosophy / value prop */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <FadeIn className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">
                — Our Approach
              </span>
            </div>
            <h2
              className="font-display font-black text-cream leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(38px, 5.5vw, 76px)' }}
            >
              We extract your<br />vision.<br />
              <span className="italic">Then we curate it.</span>
            </h2>
            <p className="font-sans font-light text-cream/60 text-base leading-relaxed mb-5">
              Every brand knows what they want to say — they just don't always have the language for it yet. We sit with you, ask the right questions, and pull the story out. Your history, your people, your product, what makes you different from the next brand in your space.
            </p>
            <p className="font-sans font-light text-cream/45 text-sm leading-relaxed">
              From that, we build a feed that doesn't look like it was managed by an agency. It looks like it was built by someone who actually cares about your brand — because it was.
            </p>
          </FadeIn>

          <FadeIn className="lg:col-span-6" delay={0.15}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Platforms Managed', value: '4' },
                { label: 'Posts Per Month', value: '30+' },
                { label: 'Strategy-First', value: '100%' },
                { label: 'Brand Specific', value: 'Always' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="border border-white/[0.08] p-6 bg-[#111111]"
                >
                  <div
                    className="font-display font-black text-cream mb-2"
                    style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="font-sans text-[10px] tracking-[0.18em] uppercase text-cream/35">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28 bg-[#0d0d0d]">
        <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
          <FadeIn className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">
                — How It Works
              </span>
            </div>
            <h2
              className="font-display font-black italic text-cream leading-[0.92]"
              style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}
            >
              From first call<br />to live feed.
            </h2>
          </FadeIn>

          <div className="flex flex-col">
            {process.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.06}>
                <div className="group grid grid-cols-1 md:grid-cols-12 gap-6 border-t border-white/[0.08] py-8 hover:bg-white/[0.015] px-2 -mx-2 transition-colors duration-300 rounded-sm">
                  <div className="md:col-span-1">
                    <span className="font-sans text-[10px] tracking-[0.2em] text-cream/25">
                      {step.step}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="font-display font-bold italic text-cream text-2xl group-hover:text-brand-green transition-colors duration-300">
                      {step.title}
                    </h3>
                  </div>
                  <div className="md:col-span-7">
                    <p className="font-sans font-light text-cream/50 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
            <div className="border-t border-white/[0.08]" />
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <FadeIn className="mb-10">
          <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-cream/25">
            Often Paired With
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { name: 'Content Creation', href: '/services/content-creation', accent: '#EDD96A' },
            { name: 'Paid Ads', href: '/services/paid-ads', accent: '#FF5A3D' },
            { name: 'Brand Direction', href: '/services/brand-direction', accent: '#C5D8F2' },
          ].map((s) => (
            <FadeIn key={s.name}>
              <a
                href={s.href}
                className="flex items-center justify-between p-6 border border-white/[0.08] hover:border-white/20 group transition-all duration-200"
              >
                <span className="font-display font-bold italic text-cream text-xl group-hover:text-brand-green transition-colors duration-200">
                  {s.name}
                </span>
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
            <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-brand-green mb-3">
              Ready to hand it off?
            </p>
            <h2
              className="font-display font-black italic text-cream leading-[0.92]"
              style={{ fontSize: 'clamp(32px, 4vw, 60px)' }}
            >
              Let's build your<br />social presence.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15} className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
            <a
              href="/#contact"
              className="inline-flex items-center gap-3 bg-brand-green text-cream font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-8 py-4 rounded-sm hover:bg-[#1a6830] transition-colors duration-200"
            >
              Start a Project →
            </a>
            <a
              href="/#services"
              className="inline-flex items-center gap-3 border border-white/15 text-cream/50 hover:text-cream hover:border-white/30 font-sans text-[11px] tracking-[0.16em] uppercase px-8 py-4 rounded-sm transition-all duration-200"
            >
              All Services
            </a>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
