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

const services = [
  {
    num: '01',
    name: 'Digital Growth & Brand Management',
    slug: 'digital-growth',
    tagline: 'Full-funnel digital presence — from first impression to conversion.',
    description: 'We manage the full digital side of your brand: content strategy, social media management, paid advertising, email campaigns, and analytics. We don\'t just post and ghost — we build systems that compound over time and keep your audience growing.',
    tags: ['Social Media', 'Paid Ads', 'Email Marketing', 'Content Strategy', 'Analytics'],
    accent: '#A8C4DF',
  },
  {
    num: '02',
    name: 'Merchandise Production & Fulfillment',
    slug: 'merchandise-production',
    tagline: 'From concept sketch to customer doorstep.',
    description: 'We handle the full merchandise pipeline — product ideation, design, sourcing, manufacturing, Shopify build-out, and 3PL fulfillment. Whether it\'s a branded apparel line or a full merch drop, we manage every step so you don\'t have to.',
    tags: ['Product Design', 'Manufacturing', 'Shopify', '3PL Fulfillment', 'Merch Drops'],
    accent: '#1E7A38',
  },
  {
    num: '03',
    name: 'Print & Promotional Production',
    slug: 'print-production',
    tagline: 'Physical brand materials that actually get kept.',
    description: 'Business cards, banners, labels, promo items, event signage, large-format prints — we produce it all. High-quality print work that shows up to events, trade shows, and storefronts looking sharp. We source, produce, and deliver.',
    tags: ['Business Print', 'Large Format', 'Event Signage', 'Promo Items', 'Labels'],
    accent: '#C9A84C',
  },
  {
    num: '04',
    name: 'Dye Sublimation & Fabric Printing',
    slug: 'dye-sublimation',
    tagline: 'Full-fabric print built for performance and race day.',
    description: 'Sublimation printing for motocross jerseys, pit shirts, racing apparel, and performance gear. Full-bleed, all-over prints with colors that don\'t crack or fade. Ideal for motorsports teams, events, and brands that need gear that performs on and off the track.',
    tags: ['Motocross Jerseys', 'Pit Shirts', 'Race Apparel', 'All-Over Print', 'Team Kits'],
    accent: '#D94530',
  },
  {
    num: '05',
    name: 'Branding & Experience Design',
    slug: 'branding-experience',
    tagline: 'The visual identity your brand deserves.',
    description: 'Logo systems, brand guidelines, packaging, Shopify storefronts, event experience design, and collateral. We build brand identities that hold up across every touchpoint — from a business card to a 40-foot trailer wrap.',
    tags: ['Logo Design', 'Brand Guidelines', 'Packaging', 'Shopify Builds', 'Events'],
    accent: '#A8C4DF',
  },
  {
    num: '06',
    name: 'Content Creation',
    slug: 'content-creation',
    tagline: 'Photo, video, and creative assets that earn attention.',
    description: 'We produce photo and video content built for the platforms your audience lives on — race-day coverage, product shots, behind-the-scenes, reels, and campaign assets. Everything is shot, edited, and delivered ready to publish.',
    tags: ['Photography', 'Video', 'Reels & Shorts', 'Race Day Coverage', 'Campaign Assets'],
    accent: '#1E7A38',
  },
  {
    num: '07',
    name: 'Social Media Management',
    slug: 'social-media-management',
    tagline: 'Consistent presence. Real growth. No fluff.',
    description: 'We take over your social media and run it the way it should be run — with strategy, consistency, and content that actually fits your brand. Scheduling, community management, trend monitoring, and monthly reporting included.',
    tags: ['Instagram', 'Facebook', 'TikTok', 'Content Calendar', 'Community Management'],
    accent: '#C9A84C',
  },
  {
    num: '08',
    name: 'Email & SMS Marketing',
    slug: 'email-sms-marketing',
    tagline: 'Owned channels that drive revenue, not just opens.',
    description: 'Campaigns, automations, list growth, and segmentation. Email and SMS are the most direct lines to your customers — we build the infrastructure and write the copy so every send counts. Klaviyo, Mailchimp, and custom platforms.',
    tags: ['Campaigns', 'Automations', 'Klaviyo', 'List Growth', 'SMS'],
    accent: '#A8C4DF',
  },
]

function ServiceRow({ service, index }: { service: (typeof services)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.33, 1, 0.68, 1] }}
      className="border-t border-white/[0.07] group"
    >
      <div className="py-12 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left: number + name */}
        <div className="lg:col-span-5">
          <span className="font-sans text-[10px] tracking-[0.28em] uppercase block mb-3" style={{ color: service.accent }}>
            {service.num}
          </span>
          <h2 className="font-display font-black text-cream uppercase leading-[0.92] mb-3" style={{ fontSize: 'clamp(22px, 2.8vw, 38px)' }}>
            {service.name}
          </h2>
          <p className="font-sans text-sm text-cream/40 italic">{service.tagline}</p>
        </div>

        {/* Right: description + tags + CTA */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          <p className="font-sans text-sm text-cream/55 leading-relaxed">
            {service.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="font-sans text-[10px] tracking-[0.12em] uppercase px-3 py-1.5 border border-white/[0.08] text-cream/40"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={`/services/${service.slug}`}
            className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.18em] uppercase transition-colors duration-200 w-fit"
            style={{ color: service.accent }}
          >
            Learn More →
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function ServicesPage() {
  return (
    <div className="bg-[#090909] min-h-screen pt-16">

      {/* Hero */}
      <section className="py-20 md:py-28 border-b border-white/[0.06] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/[0.02]" />
          <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/[0.02]" />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-8 h-px bg-brand-green" />
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-green">
                What We Do
              </span>
            </motion.div>

            <div className="overflow-hidden mb-3">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="font-display font-black text-cream uppercase leading-[0.88]"
                style={{ fontSize: 'clamp(52px, 9vw, 130px)' }}
              >
                Eight
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-10">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, delay: 0.16, ease: [0.76, 0, 0.24, 1] }}
                className="font-display font-black uppercase leading-[0.88] text-brand-green"
                style={{ fontSize: 'clamp(52px, 9vw, 130px)' }}
              >
                Services.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-sans font-light text-cream/50 text-base md:text-lg max-w-xl"
            >
              Every service is built to work independently or together — digital, physical, and everything in between. One team handles all of it.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Service rows */}
      <section className="py-6 md:py-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          {services.map((service, i) => (
            <ServiceRow key={service.slug} service={service} index={i} />
          ))}
          <div className="border-t border-white/[0.07]" />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.06] py-16 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h2 className="font-display font-black text-cream uppercase leading-[0.9] mb-2" style={{ fontSize: 'clamp(28px, 4vw, 56px)' }}>
                  Not Sure<br /><span className="text-brand-green">Where to Start?</span>
                </h2>
                <p className="font-sans text-cream/40 text-sm">Tell us what you need. We'll figure out the right fit.</p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 bg-brand-green text-cream font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-7 py-4 rounded-sm hover:bg-[#166030] transition-colors duration-200 flex-shrink-0"
              >
                Get a Quote →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  )
}
