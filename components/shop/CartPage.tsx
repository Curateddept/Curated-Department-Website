'use client'

import { useState } from 'react'
import { useCart } from './CartContext'
import GarmentIcon from './GarmentIcon'
import { btnGhost, btnLight, wrap } from './ui'
import { SHOP, garmentFor, getProduct, money } from '@/lib/shop/catalog'

const field = 'w-full bg-transparent border border-white/20 focus:border-cream outline-none px-4 py-3 font-sans text-sm placeholder:text-cream/35'

export default function CartPage() {
  const { items, remove, clear, subtotal } = useCart()
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', address: '', notes: '' })
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value })

  const orderText = () =>
    [
      `NEW CREW KIT ORDER — ${form.company || form.name}`,
      '',
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Ship to: ${form.address}`,
      '',
      ...items.flatMap((i, n) => [
        `${n + 1}. ${i.title}${i.qty > 1 ? ` × ${i.qty}` : ''} — ${money(i.total, true)}`,
        ...i.options.map((o) => `   ${o.name}: ${o.value}`),
        `   Colors: ${i.colors}`,
        `   Sizes: ${i.sizes}`,
        `   Logo file: ${i.logoName || 'will send by reply'}`,
        ...(i.notes ? [`   Notes: ${i.notes}`] : []),
      ]),
      '',
      `Subtotal: ${money(subtotal, true)} (shipping & tax calculated on invoice)`,
      ...(form.notes ? ['', `Order notes: ${form.notes}`] : []),
    ].join('\n')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Crew Kit Order — ${form.company || form.name}`)
    const body = encodeURIComponent(`${orderText()}\n\n(Logo files attached.)`)
    window.location.href = `mailto:${SHOP.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(orderText())
      setCopied(true)
    } catch {}
  }

  return (
    <div className="bg-[#0a0908] text-cream min-h-[70vh]">
      <section className="py-14 md:py-20 border-b border-white/10">
        <div className={wrap}>
          <h1 className="font-display font-black uppercase leading-[0.86] tracking-tighter" style={{ fontSize: 'clamp(52px, 10vw, 160px)' }}>
            Your <span className="text-outline">Cart.</span>
          </h1>
        </div>
      </section>

      {items.length === 0 ? (
        <section className={`${wrap} py-20 flex flex-col items-start gap-6`}>
          <p className="font-sans text-lg text-cream/60">Your cart is empty.</p>
          <div className="flex flex-wrap gap-4">
            <a href="/apparel/kits" className={btnLight}>Pick Your Kit →</a>
            <a href="/apparel/single-items" className={btnGhost}>Single Items</a>
          </div>
        </section>
      ) : (
        <section className={`${wrap} grid grid-cols-1 lg:grid-cols-12 gap-12 py-12 md:py-16`}>
          <div className="lg:col-span-7 flex flex-col">
            {items.map((i) => {
              const p = getProduct(i.handle)
              return (
                <div key={i.id} className="flex gap-5 border-b border-white/10 py-6">
                  <div className="w-24 h-24 flex-shrink-0 bg-[#141312] p-2">
                    {p && <GarmentIcon garment={garmentFor(p)} color="#2a2928" className="w-full h-full" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4">
                      <a href={`/apparel/products/${i.handle}`} className="font-display font-black uppercase text-xl leading-none hover:underline underline-offset-4">
                        {i.title}{i.qty > 1 ? ` × ${i.qty}` : ''}
                      </a>
                      <span className="font-display font-black text-xl">{money(i.total, true)}</span>
                    </div>
                    <ul className="mt-2 font-sans text-xs text-cream/55 space-y-0.5">
                      {i.options.map((o) => <li key={o.name}>{o.name}: {o.value}</li>)}
                      <li>Colors: {i.colors}</li>
                      <li>Sizes: {i.sizes}</li>
                      <li>Logo: {i.logoName || 'Send with your order email'}</li>
                    </ul>
                    <button type="button" onClick={() => remove(i.id)} className="mt-3 font-sans text-[11px] uppercase tracking-[0.16em] text-cream/50 hover:text-cream underline underline-offset-4">
                      Remove
                    </button>
                  </div>
                </div>
              )
            })}
            <div className="flex justify-between items-baseline pt-6">
              <span className="font-sans text-sm uppercase tracking-[0.16em] text-cream/60">Subtotal</span>
              <span className="font-display font-black text-4xl">{money(subtotal, true)}</span>
            </div>
            <p className="font-sans text-xs text-cream/45 mt-2 text-right">Shipping and tax added on your invoice. Full refund until you approve your mockup.</p>
          </div>

          <div className="lg:col-span-5">
            {sent ? (
              <div className="border border-cream p-8 flex flex-col gap-4">
                <p className="font-display font-black uppercase text-3xl leading-none">Order Started.</p>
                <p className="font-sans text-cream/70 leading-relaxed">
                  Your email app opened with the full order. Attach your logo file{items.length > 1 ? 's' : ''} and hit send — your mockup arrives within one business day, and we invoice once you approve.
                </p>
                <p className="font-sans text-sm text-cream/50">Email didn&apos;t open? Copy the order and send it to {SHOP.email}.</p>
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={copy} className={btnGhost}>{copied ? 'Copied ✓' : 'Copy Order'}</button>
                  <button type="button" onClick={() => { clear(); setSent(false) }} className={btnLight}>Done — Clear Cart</button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="border border-white/15 p-6 md:p-8 flex flex-col gap-3">
                <p className="font-display font-black uppercase text-2xl mb-2">Checkout</p>
                <input required className={field} placeholder="Your name *" value={form.name} onChange={set('name')} autoComplete="name" />
                <input className={field} placeholder="Company" value={form.company} onChange={set('company')} autoComplete="organization" />
                <input required type="email" className={field} placeholder="Email *" value={form.email} onChange={set('email')} autoComplete="email" />
                <input type="tel" className={field} placeholder="Phone" value={form.phone} onChange={set('phone')} autoComplete="tel" />
                <textarea required rows={2} className={field} placeholder="Shipping address *" value={form.address} onChange={set('address')} autoComplete="street-address" />
                <textarea rows={2} className={field} placeholder="Anything else? (deadline, rush, questions)" value={form.notes} onChange={set('notes')} />
                <button type="submit" className={`${btnLight} mt-2`}>Place Order — {money(subtotal, true)}</button>
                <p className="font-sans text-xs text-cream/45 leading-relaxed">
                  Nothing is charged now. You approve a mockup first, then we invoice. Questions? {SHOP.phone}. See our{' '}
                  <a href="/apparel/policies" className="underline underline-offset-2 hover:text-cream">shop policies</a>.
                </p>
              </form>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
