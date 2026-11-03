'use client'

import { useState } from 'react'

// Shared layout for the apparel decoration pages (screen printing, embroidery).
// Section order mirrors our production partner's service pages; copy and styling are Curated's.

type Img = { src: string; alt: string }
type Card = { title: string; body: string; image?: string }

export type Section =
  | { kind: 'intro'; title: string; paras: string[]; image: Img; stats?: { value: string; label: string }[]; flip?: boolean }
  | { kind: 'cards'; title: string; sub?: string; items: Card[]; cols?: 3 | 4; note?: string }
  | { kind: 'feature'; title: string; paras: string[]; image: Img; flip?: boolean }
  | { kind: 'gallery'; title: string; images: Img[] }
  | { kind: 'list'; title: string; sub?: string; items: Card[] }

export type DecorationPage = {
  eyebrow: string
  title: string
  hero: string
  sections: Section[]
  faqTitle: string
  faqs: { q: string; a: string }[]
}

const wrap = 'max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20'
const h2 = 'font-display font-black uppercase leading-[0.92] tracking-tight text-cream'
const panel = 'rounded-2xl bg-[#141312] border border-white/10'
const btnLight =
  'btn-wipe [--wipe:#0a0908] inline-flex items-center justify-center gap-3 bg-cream text-[#0a0908] hover:text-cream font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-7 py-4 transition-colors duration-300'

/** Outlines the last word of a heading, the site-wide display treatment. */
function Heading({ text, size = 'clamp(32px, 4.2vw, 62px)', className = '' }: { text: string; size?: string; className?: string }) {
  const i = text.lastIndexOf(' ')
  return (
    <h2 className={`${h2} ${className}`} style={{ fontSize: size }}>
      {i > 0 ? <>{text.slice(0, i)} <span className="text-outline">{text.slice(i + 1)}</span></> : text}
    </h2>
  )
}

function Photo({ img, className = '' }: { img: Img; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#141312] ${className}`}>
      <img src={img.src} alt={img.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
    </div>
  )
}

function Intro({ s }: { s: Extract<Section, { kind: 'intro' }> }) {
  return (
    <section className="py-16 md:py-24">
      <div className={`${wrap} grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
        <div className={s.flip ? 'lg:order-2' : ''}>
          <h1 className="font-display font-black uppercase leading-[0.9] tracking-tighter text-cream" style={{ fontSize: 'clamp(38px, 4.8vw, 72px)' }}>{s.title}</h1>
          <div className="mt-6 space-y-4 font-sans text-lg text-cream/65 leading-relaxed">{s.paras.map((p) => <p key={p}>{p}</p>)}</div>
        </div>
        <div className="relative">
          <Photo img={s.image} className="aspect-[3/2]" />
          {s.stats && (
            <div className="grid grid-cols-2 gap-px -mt-10 mx-4 md:mx-8 relative rounded-xl overflow-hidden border border-white/10 bg-white/10">
              {s.stats.map((st, i) => (
                <div key={st.label} className={`px-5 py-5 md:px-7 ${i === 0 ? 'bg-cream text-[#0a0908]' : 'bg-[#0a0908] text-cream'}`}>
                  <p className="font-display font-black text-3xl md:text-5xl leading-none">{st.value}</p>
                  <p className="font-sans text-xs mt-2 opacity-60">{st.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Cards({ s }: { s: Extract<Section, { kind: 'cards' }> }) {
  return (
    <section className="py-16 md:py-24 bg-[#0f0e0d] border-y border-white/10">
      <div className={wrap}>
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <Heading text={s.title} />
          {s.sub && <p className="font-sans text-cream/60 mt-4 leading-relaxed">{s.sub}</p>}
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${s.cols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4 md:gap-5`}>
          {s.items.map((c) => (
            <div key={c.title} className={`${panel} p-4 md:p-5 flex flex-col`}>
              {c.image && <Photo img={{ src: c.image, alt: c.title }} className="aspect-[3/2]" />}
              <h3 className="font-display font-black uppercase text-xl leading-tight text-cream mt-5">{c.title}</h3>
              <p className="font-sans text-sm text-cream/60 mt-3 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
        {s.note && <p className="font-sans text-sm text-cream/50 text-center mt-10 max-w-2xl mx-auto">{s.note}</p>}
      </div>
    </section>
  )
}

function Feature({ s }: { s: Extract<Section, { kind: 'feature' }> }) {
  return (
    <section className="py-16 md:py-24">
      <div className={`${wrap} grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
        <Photo img={s.image} className={`aspect-[3/2] ${s.flip ? 'lg:order-2' : ''}`} />
        <div>
          <Heading text={s.title} />
          <div className="mt-6 space-y-4 font-sans text-lg text-cream/65 leading-relaxed">{s.paras.map((p) => <p key={p}>{p}</p>)}</div>
        </div>
      </div>
    </section>
  )
}

function Gallery({ s }: { s: Extract<Section, { kind: 'gallery' }> }) {
  return (
    <section className="py-16 md:py-24 border-t border-white/10">
      <div className={wrap}>
        <Heading text={s.title} className="text-center mb-10 md:mb-14" />
        <div className={`grid grid-cols-2 ${s.images.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-3 md:gap-4`}>
          {s.images.map((img) => <Photo key={img.src} img={img} className="aspect-square" />)}
        </div>
      </div>
    </section>
  )
}

function List({ s }: { s: Extract<Section, { kind: 'list' }> }) {
  return (
    <section className="py-16 md:py-24 border-t border-white/10">
      <div className={wrap}>
        <Heading text={s.title} />
        {s.sub && <p className="font-sans text-cream/60 mt-4 max-w-3xl leading-relaxed">{s.sub}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 mt-10">
          {s.items.map((c) => (
            <div key={c.title} className="border-t border-white/10 py-6">
              <h3 className="font-display font-black uppercase text-xl leading-tight text-cream">{c.title}</h3>
              <p className="font-sans text-cream/60 mt-3 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Faqs({ title, items }: { title: string; items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0)
  return (
    <section className="py-16 md:py-24 border-t border-white/10">
      <div className={`${wrap} max-w-4xl`}>
        <Heading text={title} className="text-center mb-10" />
        <div className={`${panel} px-5 md:px-8`}>
          {items.map((f, i) => (
            <div key={f.q} className={i ? 'border-t border-white/10' : ''}>
              <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="w-full flex items-center justify-between gap-6 py-5 text-left">
                <span className="font-display font-black uppercase text-base md:text-lg text-cream">{f.q}</span>
                <span className={`flex-shrink-0 text-cream/60 text-xl transition-transform ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {open === i && <p className="font-sans text-cream/65 leading-relaxed pb-6 -mt-1">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function DecorationService({ page }: { page: DecorationPage }) {
  return (
    <main className="bg-[#0a0908] pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src={page.hero} alt="" className="absolute inset-0 h-full w-full object-cover grayscale contrast-110" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0908]/95 via-[#0a0908]/75 to-[#0a0908]/30" />
        <div className={`${wrap} relative py-24 md:py-36`}>
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-cream/70">{page.eyebrow}</p>
          <p className="font-display font-black uppercase leading-[0.86] tracking-tighter text-cream mt-4" style={{ fontSize: 'clamp(56px, 10vw, 168px)' }}>{page.title}</p>
        </div>
      </section>

      {page.sections.map((s, i) => {
        if (s.kind === 'intro') return <Intro key={i} s={s} />
        if (s.kind === 'cards') return <Cards key={i} s={s} />
        if (s.kind === 'feature') return <Feature key={i} s={s} />
        if (s.kind === 'gallery') return <Gallery key={i} s={s} />
        return <List key={i} s={s} />
      })}

      <Faqs title={page.faqTitle} items={page.faqs} />

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-white/10">
        <img src={page.hero} alt="" className="absolute inset-0 h-full w-full object-cover grayscale opacity-25" />
        <div className={`${wrap} relative py-20 md:py-28 text-center`}>
          <h2 className={h2} style={{ fontSize: 'clamp(40px, 6vw, 96px)' }}>Let&apos;s Build Something <span className="text-outline">Worth Wearing.</span></h2>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <a href="/contact" className={btnLight}>Start Your Project →</a>
            <a href="/apparel/kits" className="inline-flex items-center gap-3 border border-cream/40 hover:border-cream text-cream font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-7 py-4">Shop Crew Kits</a>
          </div>
          <p className="font-sans text-sm text-cream/50 mt-6">Want a number first? <a href="/contact" className="underline underline-offset-4 hover:text-cream">Request a free quote →</a></p>
        </div>
      </section>
    </main>
  )
}
