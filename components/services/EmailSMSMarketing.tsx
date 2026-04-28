'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const flows = [
  {
    num: '01',
    name: 'Welcome Sequence',
    accent: '#C5D8F2',
    description:
      'The first impression after someone joins your list. We build a multi-email sequence that introduces your brand, tells your story, sets expectations, and moves a new subscriber toward their first purchase.',
    emails: '3–5 emails',
    trigger: 'New subscriber',
  },
  {
    num: '02',
    name: 'Abandoned Cart',
    accent: '#EDD96A',
    description:
      'The highest-ROI flow in e-commerce. Someone added to cart and didn\'t buy — we bring them back with the right copy, the right timing, and the right incentive. Straight revenue recovery.',
    emails: '2–3 emails',
    trigger: 'Cart abandonment',
  },
  {
    num: '03',
    name: 'Post-Purchase',
    accent: '#1E7A38',
    description:
      'The sale isn\'t the end — it\'s the beginning. We build flows that thank customers, set expectations on delivery, request reviews, and introduce related products to drive the second purchase.',
    emails: '3–4 emails',
    trigger: 'Order confirmed',
  },
  {
    num: '04',
    name: 'Win-Back',
    accent: '#FF5A3D',
    description:
      'Dormant customers are worth fighting for. We build win-back sequences that re-engage subscribers who haven\'t opened or purchased in 60–180 days, with copy designed to earn attention again.',
    emails: '2–3 emails',
    trigger: '60–180 days inactive',
  },
]

const campaigns = [
  {
    title: 'Promotional Campaigns',
    desc: 'Sale events, discount windows, BOGO offers — written and designed to convert, not just announce. We handle copy, design, send timing, and A/B testing.',
  },
  {
    title: 'Product Launches',
    desc: 'Pre-launch hype, day-of sends, and follow-up sequences that milk a launch window for every dollar it\'s worth. Built around your product story.',
  },
  {
    title: 'Seasonal Pushes',
    desc: 'Black Friday, holiday season, back-to-school, Valentine\'s Day — we plan the calendar in advance and execute each push with the right messaging for the moment.',
  },
  {
    title: 'SMS Campaigns',
    desc: 'Short, punchy, high-open-rate messages for flash sales, launch alerts, and restock notifications. SMS works because it\'s personal — we keep it that way.',
  },
]

const listGrowth = [
  {
    title: 'Pop-Up Forms',
    desc: 'Timed, exit-intent, and scroll-triggered pop-ups designed to convert site visitors without tanking the experience. A/B tested for form and offer.',
  },
  {
    title: 'Sign-Up Incentives',
    desc: 'Discount codes, lead magnets, early access — the right hook for your audience. We write the offer and set up the delivery sequence.',
  },
  {
    title: 'Segmentation',
    desc: 'Not everyone on your list is the same. We segment by purchase history, engagement level, product interest, and geography so every message goes to the right people.',
  },
  {
    title: 'List Hygiene',
    desc: 'We regularly clean your list — removing unengaged subscribers who hurt deliverability and inflating your metrics. A smaller, clean list outperforms a bloated one every time.',
  },
]

const process = [
  {
    step: '01',
    title: 'Audit & Setup',
    desc: 'We audit your current email setup — platform, existing flows, list health, and historical performance. If you\'re starting from scratch, we handle the full ESP setup and integration.',
  },
  {
    step: '02',
    title: 'Flow Architecture',
    desc: 'We map every automation: trigger conditions, email count, timing, branching logic. You see the full system before a single email is written.',
  },
  {
    step: '03',
    title: 'Copy & Design',
    desc: 'Every email is written and designed to your brand — voice, visual style, and CTA strategy. We build templates that are reusable across campaigns.',
  },
  {
    step: '04',
    title: 'Build & Launch',
    desc: 'Flows go live, campaigns get scheduled. We test every sequence end-to-end before sending a single real email.',
  },
  {
    step: '05',
    title: 'Optimize',
    desc: 'Monthly reporting on open rates, click rates, revenue attributed, and list growth. We adjust subject lines, timing, and offers based on what the data shows.',
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

export default function EmailSMSMarketing() {
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
            Email & SMS Marketing
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
                03 / Email & SMS
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
                Not just<br />messages.<br />Revenue.
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-2 mt-8"
            >
              {['Email', 'SMS', 'Automation', 'Campaigns', 'Flows'].map((t) => (
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
              We turn email and SMS into real revenue drivers — not just messages. Campaign planning, automated flows, list growth, and segmentation — all managed so the right message hits the right audience at the right time.
            </p>
            <p className="font-sans font-light text-cream/40 text-sm leading-relaxed">
              The goal: more engagement, more repeat customers, and consistent revenue from a channel you actually own.
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

      {/* Two pillars: Campaigns vs Flows */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <FadeIn className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">— Two Sides of Email</span>
          </div>
          <h2
            className="font-display font-black italic text-cream leading-[0.92]"
            style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}
          >
            Campaigns that push.<br />Flows that run.
          </h2>
          <p className="mt-4 font-sans font-light text-cream/45 max-w-xl text-sm leading-relaxed">
            Campaigns are what you send on purpose. Flows run automatically in the background. Together, they cover every moment of the customer journey.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/[0.06]">
          {/* Campaigns */}
          <FadeIn>
            <div className="bg-[#090909] p-8 md:p-10 h-full">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-sans text-[9px] tracking-[0.22em] uppercase px-2.5 py-1.5 text-[#EDD96A] bg-[#EDD96A18]">
                  Campaigns
                </span>
              </div>
              <p className="font-sans font-light text-cream/50 text-sm leading-relaxed mb-8">
                One-time sends planned around your calendar — promotions, launches, seasonal moments. We handle copy, design, targeting, and send timing.
              </p>
              <div className="flex flex-col gap-4">
                {campaigns.map((c, i) => (
                  <div key={c.title} className="border-t border-white/[0.08] pt-4">
                    <div className="flex items-start gap-3">
                      <span className="font-sans text-[10px] tracking-[0.18em] text-cream/20 mt-0.5 flex-shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="font-sans font-medium text-cream text-sm mb-1">{c.title}</p>
                        <p className="font-sans font-light text-cream/45 text-xs leading-relaxed">{c.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Flows highlight */}
          <FadeIn delay={0.08}>
            <div className="bg-[#090909] p-8 md:p-10 h-full">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-sans text-[9px] tracking-[0.22em] uppercase px-2.5 py-1.5 text-[#C5D8F2] bg-[#C5D8F218]">
                  Automated Flows
                </span>
              </div>
              <p className="font-sans font-light text-cream/50 text-sm leading-relaxed mb-8">
                Set once, run forever. These sequences fire based on customer behavior and bring in revenue without you touching a thing after launch.
              </p>
              <div className="flex flex-col gap-3">
                {['Welcome Sequence', 'Abandoned Cart Recovery', 'Post-Purchase Follow-Up', 'Win-Back Campaign'].map((f, i) => (
                  <div key={f} className="flex items-center gap-4 border-t border-white/[0.08] py-3">
                    <span className="font-display font-black text-brand-green/40 text-sm">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-sans text-sm text-cream/70">{f}</span>
                    <span className="ml-auto text-brand-green text-xs opacity-60">Auto</span>
                  </div>
                ))}
                <div className="border-t border-white/[0.08]" />
              </div>
              <p className="mt-6 font-sans font-light text-cream/35 text-xs leading-relaxed">
                Each flow is built with branching logic — so a customer who buys doesn't get a cart abandonment email, and a VIP gets a different win-back than a one-time buyer.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Flows in depth */}
      <section className="py-20 md:py-28 bg-[#0d0d0d]">
        <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
          <FadeIn className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">— Automated Flows</span>
            </div>
            <h2
              className="font-display font-black italic text-cream leading-[0.92]"
              style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}
            >
              Revenue that runs<br />while you sleep.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/[0.06]">
            {flows.map((flow, i) => (
              <FadeIn key={flow.num} delay={i * 0.07}>
                <div className="bg-[#0d0d0d] p-8 md:p-10 h-full group hover:bg-[#111111] transition-colors duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span
                        className="inline-block font-sans text-[9px] tracking-[0.22em] uppercase px-2.5 py-1.5 mb-3"
                        style={{ color: flow.accent, background: `${flow.accent}15` }}
                      >
                        Flow {flow.num}
                      </span>
                      <h3
                        className="font-display font-black italic text-cream"
                        style={{ fontSize: 'clamp(24px, 2.5vw, 36px)' }}
                      >
                        {flow.name}
                      </h3>
                    </div>
                  </div>

                  <p className="font-sans font-light text-cream/55 text-sm leading-relaxed mb-7">
                    {flow.description}
                  </p>

                  <div className="border-t border-white/[0.08] pt-5 flex items-center justify-between">
                    <div>
                      <p className="font-sans text-[9px] tracking-[0.18em] uppercase text-cream/25 mb-1">Length</p>
                      <p className="font-sans text-sm text-cream/60">{flow.emails}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-sans text-[9px] tracking-[0.18em] uppercase text-cream/25 mb-1">Trigger</p>
                      <p className="font-sans text-sm" style={{ color: flow.accent }}>{flow.trigger}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* List growth */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <FadeIn className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">— List Growth</span>
            </div>
            <h2
              className="font-display font-black text-cream leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}
            >
              Right message.<br />
              <span className="italic">Right audience.</span>
            </h2>
            <p className="font-sans font-light text-cream/60 text-base leading-relaxed mb-4">
              A large list means nothing if you're emailing the wrong people. We focus on growing your list with qualified subscribers and segmenting them properly so every send feels personal.
            </p>
            <p className="font-sans font-light text-cream/40 text-sm leading-relaxed">
              Better segmentation means better open rates, better click rates, and customers who actually buy — not just subscribe.
            </p>
          </FadeIn>

          <FadeIn className="lg:col-span-7" delay={0.12}>
            <div className="grid grid-cols-1 gap-px bg-white/[0.06]">
              {listGrowth.map((item) => (
                <div key={item.title} className="bg-[#090909] p-6 group hover:bg-[#111111] transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0 mt-[7px]" />
                    <div>
                      <p className="font-sans font-medium text-cream text-sm mb-1.5">{item.title}</p>
                      <p className="font-sans font-light text-cream/45 text-sm leading-relaxed">{item.desc}</p>
                    </div>
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
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">— How It Works</span>
            </div>
            <h2
              className="font-display font-black italic text-cream leading-[0.92]"
              style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}
            >
              Audit to<br />live revenue.
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
        </div>
      </section>

      {/* Related */}
      <section className="py-16 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <FadeIn className="mb-8">
          <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-cream/25">Often Paired With</p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { name: 'Social Media Management', href: '/services/social-media-management' },
            { name: 'Paid Ads', href: '/services/paid-ads' },
            { name: 'Content Creation', href: '/services/content-creation' },
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
            <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-brand-green mb-3">Ready to build the channel?</p>
            <h2
              className="font-display font-black italic text-cream leading-[0.92]"
              style={{ fontSize: 'clamp(32px, 4vw, 60px)' }}
            >
              Let's turn your list<br />into a revenue engine.
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
