'use client'

import { useRef, useState } from 'react'
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

const categories = ['All', 'Client Work', 'Motorsports', 'Events', 'Behind the Scenes', 'Print & Production']

const posts = [
  {
    slug: 'trophy-truck-school-season-recap',
    category: 'Motorsports',
    title: 'Trophy Truck School Season Recap: What We Built and What\'s Next',
    excerpt: 'A full breakdown of the creative work we did alongside Trophy Truck School this past season — from signage and event print to social content that actually drove registrations.',
    date: 'Apr 2026',
    readTime: '5 min read',
    featured: true,
    accent: '#1E7A38',
  },
  {
    slug: 'behind-the-merch-no-fear-2024',
    category: 'Client Work',
    title: 'Behind the Merch: Building No Fear\'s 2024 Drop',
    excerpt: 'How we developed the product concept, sourced manufacturing, and launched a merch drop for one of action sports\' most iconic brands.',
    date: 'Mar 2026',
    readTime: '7 min read',
    featured: false,
    accent: '#A8C4DF',
  },
  {
    slug: 'brenthel-race-content-system',
    category: 'Client Work',
    title: 'How We Built Brenthel\'s Race Day Content System',
    excerpt: 'Race day moves fast. Here\'s how we set up a repeatable content system for Brenthel Industries that works at 100mph — literally.',
    date: 'Mar 2026',
    readTime: '4 min read',
    featured: false,
    accent: '#C9A84C',
  },
  {
    slug: 'dye-sublimation-101',
    category: 'Print & Production',
    title: 'Dye Sublimation 101: Why Your Gear Deserves Better Print',
    excerpt: 'Most brands don\'t know the difference between sublimation and screen print until they see it side by side. Here\'s why it matters for performance apparel.',
    date: 'Feb 2026',
    readTime: '6 min read',
    featured: false,
    accent: '#D94530',
  },
  {
    slug: 'fiberwerx-tundra-build-story',
    category: 'Behind the Scenes',
    title: 'FiberwerX Tundra Build: The Full Creative Story',
    excerpt: 'From blank canvas to fully wrapped and documented — inside the content production day we ran for FiberwerX\'s Tundra build reveal.',
    date: 'Feb 2026',
    readTime: '5 min read',
    featured: false,
    accent: '#1E7A38',
  },
  {
    slug: 'parker-500-on-the-ground',
    category: 'Motorsports',
    title: 'Parker 500: On the Ground With Curated',
    excerpt: 'We were at Parker 500 covering three clients simultaneously. Here\'s how we ran content, captured race day, and turned it around same week.',
    date: 'Jan 2026',
    readTime: '4 min read',
    featured: false,
    accent: '#A8C4DF',
  },
]

function PostCard({ post, index, featured = false }: { post: (typeof posts)[0]; index: number; featured?: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  if (featured) {
    return (
      <motion.a
        ref={ref}
        href={`/blog/${post.slug}`}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.33, 1, 0.68, 1] }}
        className="col-span-1 md:col-span-2 bg-[#0f0f0f] border border-white/[0.06] group hover:border-brand-green/30 transition-all duration-300 block"
      >
        {/* Image placeholder */}
        <div className="h-[260px] md:h-[340px] bg-[#141414] relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 to-transparent" />
          <span className="font-display font-black text-white/[0.04] uppercase select-none" style={{ fontSize: 'clamp(60px, 10vw, 120px)' }}>
            CD.
          </span>
          <div className="absolute top-4 left-4">
            <span className="font-sans text-[9px] tracking-[0.22em] uppercase px-2.5 py-1.5 bg-brand-green/20 text-brand-green">
              Featured
            </span>
          </div>
        </div>
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-sans text-[9px] tracking-[0.22em] uppercase text-brand-green">{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="font-sans text-[9px] tracking-[0.12em] text-cream/30">{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="font-sans text-[9px] tracking-[0.12em] text-cream/30">{post.readTime}</span>
          </div>
          <h2 className="font-display font-black text-cream uppercase leading-[0.92] mb-3 group-hover:text-brand-green transition-colors duration-300" style={{ fontSize: 'clamp(22px, 3vw, 36px)' }}>
            {post.title}
          </h2>
          <p className="font-sans text-sm text-cream/45 leading-relaxed mb-5">{post.excerpt}</p>
          <span className="font-sans text-[10px] tracking-[0.16em] uppercase text-brand-green group-hover:gap-3 transition-all duration-200 flex items-center gap-2">
            Read More
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 4h10M7 1l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </div>
      </motion.a>
    )
  }

  return (
    <motion.a
      ref={ref}
      href={`/blog/${post.slug}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.33, 1, 0.68, 1] }}
      className="bg-[#0f0f0f] border border-white/[0.06] group hover:border-brand-green/30 transition-all duration-300 block"
    >
      {/* Image placeholder */}
      <div className="h-[180px] bg-[#141414] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${post.accent}08 0%, transparent 60%)` }} />
        <span className="font-display font-black text-white/[0.04] uppercase select-none text-[80px]">CD.</span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="font-sans text-[9px] tracking-[0.2em] uppercase" style={{ color: post.accent }}>{post.category}</span>
          <span className="w-1 h-1 rounded-full bg-white/15" />
          <span className="font-sans text-[9px] tracking-[0.1em] text-cream/25">{post.date}</span>
        </div>
        <h3 className="font-display font-black text-cream uppercase leading-[0.92] text-lg mb-2.5 group-hover:text-brand-green transition-colors duration-300">
          {post.title}
        </h3>
        <p className="font-sans text-xs text-cream/40 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="font-sans text-[9px] tracking-[0.12em] text-cream/25">{post.readTime}</span>
          <svg className="text-brand-green opacity-0 group-hover:opacity-100 transition-opacity duration-200" width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 4h10M7 1l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </motion.a>
  )
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter((p) => p.category === activeCategory)

  const featured = filtered.find((p) => p.featured)
  const rest = filtered.filter((p) => !p.featured)

  return (
    <div className="bg-[#090909] min-h-screen pt-16">

      {/* Hero */}
      <section className="py-20 md:py-28 border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <div className="overflow-hidden mb-4">
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                  className="font-display font-black text-cream uppercase leading-[0.88]"
                  style={{ fontSize: 'clamp(48px, 9vw, 130px)' }}
                >
                  The<br />
                  <span className="text-brand-green">Brief.</span>
                </motion.h1>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="font-sans font-light text-cream/50 text-base max-w-xl"
              >
                Write-ups on recent jobs, events, and everything happening inside Curated Department.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-sans text-[10px] tracking-[0.2em] uppercase text-cream/25"
            >
              {posts.length} Posts
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="border-b border-white/[0.06] sticky top-16 z-30 bg-[#090909]/95 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 font-sans text-[10px] tracking-[0.16em] uppercase px-4 py-2 rounded-sm transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-brand-green text-cream'
                    : 'text-cream/40 hover:text-cream hover:bg-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured && <PostCard post={featured} index={0} featured />}
            {rest.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i + 1} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-display font-black text-cream/20 uppercase text-4xl">No Posts Yet</p>
              <p className="font-sans text-cream/25 text-sm mt-2">Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter / CTA strip */}
      <section className="border-t border-white/[0.06] py-16 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h2 className="font-display font-black text-cream uppercase leading-[0.9] mb-2" style={{ fontSize: 'clamp(24px, 3.5vw, 48px)' }}>
                  Want Us to Write<br />About Your Brand?
                </h2>
                <p className="font-sans text-cream/40 text-sm">We document jobs we're proud of. If you're a client, ask us to feature your story.</p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 bg-brand-green text-cream font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-7 py-4 rounded-sm hover:bg-[#166030] transition-colors duration-200 flex-shrink-0"
              >
                Start a Project →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  )
}
