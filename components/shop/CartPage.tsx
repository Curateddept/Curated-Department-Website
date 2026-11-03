'use client'

import { useEffect, useRef, useState } from 'react'
import { useCart, type CartItem } from './CartContext'
import GarmentIcon from './GarmentIcon'
import LogoUpload, { doneLogos, type LogoFile } from './LogoUpload'
import { btnGhost, btnLight, wrap } from './ui'
import { SHOP, garmentFor, getProduct, money } from '@/lib/shop/catalog'
import { fileSize } from '@/lib/shop/logos'
import { track } from '@/lib/track'

/** Logos already on a cart line, plus an uploader that moves finished files onto it. */
function ItemLogos({ item }: { item: CartItem }) {
  const { update } = useCart()
  const [pending, setPending] = useState<LogoFile[]>([])

  useEffect(() => {
    const done = doneLogos(pending)
    if (!done.length) return
    const logos = [...item.logos, ...done]
    update(item.id, { logos, logoName: logos.map((l) => l.name).join(', ') })
    setPending((prev) => prev.filter((f) => f.status !== 'done'))
  }, [pending, item, update])

  const removeSaved = (url: string) => {
    const logos = item.logos.filter((l) => l.url !== url)
    update(item.id, { logos, logoName: logos.map((l) => l.name).join(', ') })
  }

  return (
    <div className="mt-3">
      {item.logos.length > 0 ? (
        <ul className="flex flex-wrap gap-2 mb-2">
          {item.logos.map((l) => (
            <li key={l.url} className="flex items-center gap-2 border border-white/15 pl-2 pr-1 py-1 font-sans text-[11px] text-cream/70">
              <span className="max-w-[160px] truncate">✓ {l.name}</span>
              <span className="text-cream/40">{fileSize(l.size)}</span>
              <button type="button" onClick={() => removeSaved(l.url)} className="px-1 text-cream/40 hover:text-cream" aria-label={`Remove ${l.name}`}>×</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="font-sans text-xs text-cream mb-2">Add your logo so we can start your mockup.</p>
      )}
      {item.logos.length + pending.length < 5 && <LogoUpload files={pending} onChange={setPending} compact />}
    </div>
  )
}

const field = 'w-full bg-transparent border border-white/20 focus:border-cream outline-none px-4 py-3 font-sans text-sm placeholder:text-cream/35'

export default function CartPage() {
  const { items, remove, clear, subtotal } = useCart()
  const [sent, setSent] = useState(false)
  const [placed, setPlaced] = useState<{ id: string; email: string } | null>(null)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', address: '', notes: '' })
  const honeypot = useRef<HTMLInputElement>(null)
  const checkoutTracked = useRef(false)
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
        ...(i.logos.length ? i.logos.map((l) => `   Logo: ${l.name} ${l.url}`) : ['   Logo file: will send by reply']),
        ...(i.notes ? [`   Notes: ${i.notes}`] : []),
      ]),
      '',
      `Subtotal: ${money(subtotal, true)} (shipping & tax calculated on invoice)`,
      ...(form.notes ? ['', `Order notes: ${form.notes}`] : []),
    ].join('\n')

  const startCheckout = () => {
    if (checkoutTracked.current) return
    checkoutTracked.current = true
    track('InitiateCheckout', { value: subtotal, num_items: items.length, content_ids: items.map((i) => i.handle) })
  }

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Crew Kit Order — ${form.company || form.name}`)
    const body = encodeURIComponent(`${orderText()}\n\n(Logo files attached.)`)
    window.location.href = `mailto:${SHOP.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sending) return
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer: form, items, website: honeypot.current?.value ?? '' }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        track('Lead', { value: subtotal, num_items: items.length, content_ids: items.map((i) => i.handle), order_id: data.orderId })
        setPlaced({ id: data.orderId, email: form.email })
        clear()
      } else if (data.fallback === 'mailto') {
        mailtoFallback()
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Could not reach the server. Check your connection and try again.')
    } finally {
      setSending(false)
    }
  }

  const missingLogos = items.filter((i) => !i.logos.length).length

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

      {placed ? (
        <section className={`${wrap} py-16 md:py-20`}>
          <div className="border border-cream p-8 md:p-12 max-w-2xl flex flex-col gap-5">
            <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-cream/50">Order {placed.id}</p>
            <p className="font-display font-black uppercase text-4xl md:text-5xl leading-[0.9]">Order In. Mockup Next.</p>
            <p className="font-sans text-cream/70 leading-relaxed">
              Our design team has your order and logo. Your mockup lands at {placed.email} within one business day. Nothing is charged until you approve it.
            </p>
            <p className="font-sans text-sm text-cream/50">Questions or a better logo file? Reply to that email or call {SHOP.phone}.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="/apparel/kits" className={btnGhost}>Keep Browsing</a>
            </div>
          </div>
        </section>
      ) : items.length === 0 ? (
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
                    </ul>
                    <ItemLogos item={i} />
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
              <form onSubmit={submit} onFocus={startCheckout} className="relative border border-white/15 p-6 md:p-8 flex flex-col gap-3">
                <p className="font-display font-black uppercase text-2xl mb-2">Checkout</p>
                <input required className={field} placeholder="Your name *" value={form.name} onChange={set('name')} autoComplete="name" />
                <input className={field} placeholder="Company" value={form.company} onChange={set('company')} autoComplete="organization" />
                <input required type="email" className={field} placeholder="Email *" value={form.email} onChange={set('email')} autoComplete="email" />
                <input type="tel" className={field} placeholder="Phone" value={form.phone} onChange={set('phone')} autoComplete="tel" />
                <textarea required rows={2} className={field} placeholder="Shipping address *" value={form.address} onChange={set('address')} autoComplete="street-address" />
                <textarea rows={2} className={field} placeholder="Anything else? (deadline, rush, questions)" value={form.notes} onChange={set('notes')} />
                <input ref={honeypot} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
                {missingLogos > 0 && (
                  <p className="font-sans text-xs text-cream/60">
                    {missingLogos === items.length ? 'No logo uploaded yet' : `${missingLogos} item${missingLogos > 1 ? 's have' : ' has'} no logo`} — add it on the left, or place the order and reply to our email with it.
                  </p>
                )}
                {error && <p className="font-sans text-sm text-[#ff8a80]">{error}</p>}
                <button type="submit" disabled={sending} className={`${btnLight} mt-2 disabled:opacity-50`}>{sending ? 'Sending Order…' : `Place Order — ${money(subtotal, true)}`}</button>
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
