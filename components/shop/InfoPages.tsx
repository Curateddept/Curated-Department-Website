'use client'

import { CustomQuote, Display, Eyebrow, Faq, Guarantee, STEPS, btnLight, wrap } from './ui'
import { SHOP, money } from '@/lib/shop/catalog'

const DETAIL: Record<string, string> = {
  '01': 'Starter Kit 24, Crew Kit 48, Crew Kit 100, Crew Kit 200 — the number is the piece count. Pick one, add your company name and one logo file, and check out. Vector files (AI, EPS, PDF, SVG) are best; a PNG, JPG or a photo of your truck works too.',
  '02': `Within one business day we email a picture of every piece in your kit with your logo, in your colors. Reply with color changes plus first names and sizes for your crew. S–XL is included; 2XL and up add ${money(SHOP.bigSizeUpcharge)} a piece.`,
  '03': `Nothing runs until you approve the proof. Then we print the shirts, embroider the polos and caps, and pack the kit by person. It's ready in ${SHOP.turnaround} and ships anywhere in the US.`,
}

export function HowItWorksPage() {
  return (
    <div className="bg-[#0a0908] text-cream">
      <section className="py-16 md:py-24 border-b border-white/10">
        <div className={wrap}>
          <Eyebrow>How It Works</Eyebrow>
          <h1 className="font-display font-black uppercase leading-[0.86] tracking-tighter" style={{ fontSize: 'clamp(52px, 11vw, 184px)' }}>
            Three Steps.<br /><span className="text-outline">Done.</span>
          </h1>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className={wrap}>
          {STEPS.map((s) => (
            <div key={s.n} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 py-14 md:py-20 border-b border-white/10 last:border-0">
              <span className="lg:col-span-2 font-display font-black text-outline leading-none" style={{ fontSize: 'clamp(72px, 9vw, 140px)' }}>{s.n}</span>
              <h2 className="lg:col-span-4 font-display font-black uppercase leading-[0.9] tracking-tighter" style={{ fontSize: 'clamp(36px, 4.6vw, 72px)' }}>{s.title}</h2>
              <p className="lg:col-span-6 font-sans text-lg text-cream/65 leading-relaxed lg:pt-3">{DETAIL[s.n]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 border-b border-white/10">
        <div className={wrap}>
          <Eyebrow>Our Promise</Eyebrow>
          <Display size="lg" className="mb-12">See It<br /><span className="text-outline">First.</span></Display>
          <Guarantee />
          <a href="/apparel/kits" className={`mt-10 ${btnLight}`}>Pick Your Kit →</a>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className={`${wrap} grid grid-cols-1 lg:grid-cols-12 gap-12`}>
          <div className="lg:col-span-4"><Display size="lg">Quest&shy;ions.</Display></div>
          <div className="lg:col-span-8"><Faq /></div>
        </div>
      </section>

      <CustomQuote />
    </div>
  )
}

const POLICIES = [
  {
    title: 'Ordering & Payment',
    body: [
      'Placing an order sends us your kit, colors, sizes and logo. Nothing is charged until you approve your mockup; we invoice at approval.',
      'Prices include logo setup, digitizing, a design pass and your mockup. Shipping and sales tax are added to your invoice.',
    ],
  },
  {
    title: 'Mockups & Approval',
    body: [
      'You receive a mockup of every piece within one business day of ordering. We revise it free until it’s right.',
      'Production starts only after you approve. Cancel any time before approval for a full refund.',
    ],
  },
  {
    title: 'Production & Shipping',
    body: [
      `Approved orders are ready in ${SHOP.turnaround}. Orders ship anywhere in the continental US; delivery estimates are shown on each product page.`,
      `Need it sooner? Email ${SHOP.email} before ordering to ask about rush availability.`,
    ],
  },
  {
    title: 'Returns & Fixes',
    body: [
      'Because every piece is made with your logo, approved orders can’t be returned for change of mind.',
      'If a piece arrives wrong against the mockup you approved — wrong color, misprint, damage — send a photo within 14 days and we fix or replace it free.',
    ],
  },
  {
    title: 'Reorders',
    body: ['Your logo and sizes stay on file. Reorder pricing is locked for 12 months from your first order, even for a single piece.'],
  },
]

export function PoliciesPage() {
  return (
    <div className="bg-[#0a0908] text-cream">
      <section className="py-16 md:py-24 border-b border-white/10">
        <div className={wrap}>
          <Eyebrow>Shop Policies</Eyebrow>
          <h1 className="font-display font-black uppercase leading-[0.86] tracking-tighter" style={{ fontSize: 'clamp(48px, 9vw, 150px)' }}>
            The <span className="text-outline">Fine Print.</span>
          </h1>
          <p className="font-sans text-lg text-cream/60 max-w-2xl mt-6">Plain-language terms for Crew Kits orders. Questions? {SHOP.email} · {SHOP.phone}</p>
        </div>
      </section>
      <section className="py-12 md:py-20">
        <div className={`${wrap} max-w-4xl`}>
          {POLICIES.map((p) => (
            <div key={p.title} className="border-b border-white/10 py-10">
              <h2 className="font-display font-black uppercase text-3xl leading-none mb-5">{p.title}</h2>
              {p.body.map((b) => <p key={b} className="font-sans text-cream/65 leading-relaxed mb-3">{b}</p>)}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
