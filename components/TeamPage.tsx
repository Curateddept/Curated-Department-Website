'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.33, 1, 0.68, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

const team = [
  {
    name: 'Albert Garcia',
    title: 'CEO & Creative Director',
    bio: 'Albert founded Curated Department in 2018 with a vision to bring agency-level creative to the motorsports and action sports world. He leads strategy, client relationships, and creative direction across all accounts.',
    photo: '/team/albert.jpg',
    initials: 'AG',
    accent: '#1E7A38',
  },
  {
    name: 'Team Member',
    title: 'Creative & Content',
    bio: 'Focused on visual storytelling, content production, and campaign execution. Brings ideas to life from concept through delivery across social, print, and digital channels.',
    photo: '/team/member2.jpg',
    initials: 'TM',
    accent: '#A8C4DF',
  },
  {
    name: 'Team Member',
    title: 'Brand & Design',
    bio: 'Handles brand identity, graphic design, and print production. Detail-oriented and deadline-driven, with a sharp eye for the kind of work clients want on their trucks and jerseys.',
    photo: '/team/member3.jpg',
    initials: 'TM',
    accent: '#C9A84C',
  },
  {
    name: 'Team Member',
    title: 'Digital & Strategy',
    bio: 'Manages digital presence, social strategy, and analytics. Turns campaign data into decisions and keeps brands moving in the right direction across every platform.',
    photo: '/team/member4.jpg',
    initials: 'TM',
    accent: '#1E7A38',
  },
]

function TeamCard({ member, index }: { member: (typeof team)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
      className="group"
    >
      {/* Photo */}
      <div className="relative aspect-[3/4] bg-[#111] overflow-hidden mb-5">
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement
            el.style.display = 'none'
          }}
        />
        {/* Fallback placeholder */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ background: `linear-gradient(160deg, ${member.accent}18 0%, #111 100%)` }}
        >
          <span
            className="font-display font-black text-[80px] leading-none select-none"
            style={{ color: `${member.accent}22` }}
          >
            {member.initials}
          </span>
          <span className="font-sans text-[9px] tracking-[0.22em] uppercase text-cream/20 mt-4">
            Photo Coming Soon
          </span>
        </div>
        {/* Accent bar bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: member.accent }}
        />
      </div>

      {/* Info */}
      <div>
        <span
          className="font-sans text-[9px] tracking-[0.26em] uppercase block mb-1.5"
          style={{ color: member.accent }}
        >
          {member.title}
        </span>
        <h3 className="font-display font-black text-cream uppercase leading-none text-2xl md:text-3xl mb-3">
          {member.name}
        </h3>
        <p className="font-sans text-sm text-cream/40 leading-relaxed">
          {member.bio}
        </p>
      </div>
    </motion.div>
  )
}

export default function TeamPage() {
  return (
    <div className="bg-[#090909] min-h-screen pt-16">

      {/* Hero */}
      <section className="relative py-24 md:py-32 border-b border-white/[0.06] overflow-hidden">
        {/* Background grid lines */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/[0.025]" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.025]" />
          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white/[0.025]" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-8 h-px bg-brand-green" />
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">
                The People Behind the Work
              </span>
            </motion.div>

            {/* Heading */}
            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="font-display font-black text-cream uppercase leading-[0.88]"
                style={{ fontSize: 'clamp(52px, 10vw, 140px)' }}
              >
                Meet
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, delay: 0.18, ease: [0.76, 0, 0.24, 1] }}
                className="font-display font-black uppercase leading-[0.88]"
                style={{ fontSize: 'clamp(52px, 10vw, 140px)', color: '#1E7A38' }}
              >
                The Team.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="font-sans font-light text-cream/50 text-base md:text-lg max-w-xl"
            >
              Small team. Big output. Every job gets real people who care about the work — not a rotating door of interns and account managers.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Team grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
            {team.map((member, i) => (
              <TeamCard key={member.name + i} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Divider line */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="border-t border-white/[0.06]" />
      </div>

      {/* Values strip */}
      <section className="py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn className="mb-14">
            <h2 className="font-display font-black text-cream uppercase leading-[0.9]" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
              How We<br /><span className="text-brand-green">Operate.</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.05]">
            {[
              {
                num: '01',
                heading: 'Direct Access',
                body: 'You talk to the people doing the work. No account managers buffering every conversation. We keep it straightforward.',
              },
              {
                num: '02',
                heading: 'All Under One Roof',
                body: "Strategy, design, content, print, apparel — handled in-house. No handoffs to third-party vendors you've never met.",
              },
              {
                num: '03',
                heading: 'Built for Your Industry',
                body: "We don't have to be educated on motorsports or action sports. We already live in it. That saves time and makes the work better.",
              },
            ].map((item, i) => (
              <FadeIn key={item.num} delay={i * 0.1}>
                <div className="bg-[#090909] p-8 md:p-10 h-full">
                  <span className="font-sans text-[9px] tracking-[0.28em] uppercase text-brand-green block mb-5">{item.num}</span>
                  <h3 className="font-display font-black text-cream uppercase text-xl leading-none mb-4">{item.heading}</h3>
                  <p className="font-sans text-sm text-cream/40 leading-relaxed">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-t border-white/[0.06] py-16 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h2 className="font-display font-black text-cream uppercase leading-[0.9] mb-2" style={{ fontSize: 'clamp(24px, 3.5vw, 48px)' }}>
                  Ready to Work<br />With the Team?
                </h2>
                <p className="font-sans text-cream/40 text-sm">We're selective about the brands we take on. If it's the right fit, let's talk.</p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 bg-brand-green text-cream font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-7 py-4 rounded-sm hover:bg-[#166030] transition-colors duration-200 flex-shrink-0"
              >
                Get in Touch →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  )
}
