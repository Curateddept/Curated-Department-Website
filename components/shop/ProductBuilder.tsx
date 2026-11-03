'use client'

import { useEffect, useMemo, useState } from 'react'
import { useCart } from './CartContext'
import GarmentIcon from './GarmentIcon'
import LogoUpload, { doneLogos, type LogoFile } from './LogoUpload'
import { track } from '@/lib/track'
import { CustomQuote, Faq, STEPS, btnLight, wrap } from './ui'
import {
  COLORS, SHOP, findVariant, garmentFor, isTiered, kitDetails, minQty, money, pieceCount, tierFor, tiers,
  type Garment, type Product, sized, perPiece, colorOption, unitPrice
} from '@/lib/shop/catalog'

const SIZES = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
const BIG = new Set(['2XL', '3XL', '4XL'])

function addBusinessDays(d: Date, n: number) {
  const r = new Date(d)
  while (n > 0) {
    r.setDate(r.getDate() + 1)
    if (r.getDay() !== 0 && r.getDay() !== 6) n--
  }
  return r
}
const fmt = (d: Date) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
const fmtShort = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

function Swatch({ hex, active, onClick, label }: { hex: string; active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={`h-9 w-9 rounded-full border transition-transform ${active ? 'ring-2 ring-cream ring-offset-2 ring-offset-[#0a0908] scale-110' : 'border-white/25 hover:scale-105'}`}
      style={{ backgroundColor: hex }}
    />
  )
}

function Block({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-white/10 pt-6">
      <p className="font-display font-black uppercase text-cream text-lg mb-4 flex items-baseline gap-3">
        <span className="text-outline text-2xl">{String(n).padStart(2, '0')}</span>
        {title}
      </p>
      {children}
    </div>
  )
}

export default function ProductBuilder({ p }: { p: Product }) {
  const cart = useCart()
  const tiered = isTiered(p)
  const byPiece = perPiece(p)
  // Products with their own Shopify color option use it instead of the generic swatches.
  const ownColor = colorOption(p)
  const kit = kitDetails[p.handle]

  const pieces: { label: string; garment: Garment }[] = [{ label: p.title, garment: garmentFor(p) }]

  const [selected, setSelected] = useState<string[]>(p.options.map((o) => o.values[0]))
  const [qty, setQty] = useState(minQty(p))
  const [logos, setLogos] = useState<LogoFile[]>([])
  const [notes, setNotes] = useState('')
  const [mix, setMix] = useState(false)
  const [kitColor, setKitColor] = useState(COLORS[0].name)
  const [pieceColors, setPieceColors] = useState<string[]>(pieces.map(() => COLORS[0].name))
  const [active, setActive] = useState(0)
  // Gallery slot: a Shopify photo index, or 'logo' for the live logo preview.
  const [view, setView] = useState<number | 'logo'>(p.images.length ? 0 : 'logo')
  const [sizeMode, setSizeMode] = useState<'later' | 'now'>('later')
  const [sizes, setSizes] = useState<Record<string, number>>({})
  const [added, setAdded] = useState(false)

  const logoUrl = logos.find((f) => f.preview && f.status !== 'error')?.preview ?? null
  useEffect(() => { if (logoUrl) setView('logo') }, [logoUrl])
  // Show the photo Shopify ties to the chosen variant (e.g. the backpack in the picked color).
  const variantImage = findVariant(p, selected).image
  useEffect(() => {
    if (!variantImage) return
    const file = (u: string) => u.split('/').pop()!.split('?')[0].replace(/_[0-9a-f-]{36}(?=\.)/, '')
    const i = p.images.findIndex((img) => file(img.url) === file(variantImage))
    if (i >= 0) setView(i)
  }, [variantImage, p.images])
  const uploading = logos.some((f) => f.status === 'uploading')

  const variant = findVariant(p, selected)
  const priceFrom = variant.price
  const tier = tiered ? tierFor(p, qty) : null
  const unit = unitPrice(p, selected, qty)
  const base = byPiece ? unit * qty : variant.price
  const bigCount = sizeMode === 'now' ? SIZES.filter((s) => BIG.has(s)).reduce((n, s) => n + (sizes[s] || 0), 0) : 0
  // Checkout charges the Shopify price; the 2XL+ upcharge is billed with the mockup approval.
  const bigUpcharge = bigCount * SHOP.bigSizeUpcharge
  const total = base
  const count = byPiece ? qty : pieceCount(p, selected)
  const sizedCount = Object.values(sizes).reduce((a, b) => a + b, 0)
  const qtyValid = !byPiece || qty >= minQty(p)

  const colorHex = (name: string) => COLORS.find((c) => c.name === name)?.hex ?? '#111111'
  const shownColor = ownColor >= 0 ? selected[ownColor] : mix ? pieceColors[active] : kitColor
  // Bags, drinkware and blankets have no sizes to collect.
  const hasSizes = !['bag', 'tumbler', 'blanket'].includes(pieces[0].garment)

  const dates = useMemo(() => {
    const now = new Date()
    const mockup = addBusinessDays(now, 1)
    // 7–10 business days of production after approval, plus ~3–5 business days in transit
    return { mockup, from: addBusinessDays(mockup, 12), to: addBusinessDays(mockup, 15) }
  }, [])

  useEffect(() => {
    track('ViewContent', { content_ids: [p.handle], content_name: p.title, content_type: 'product', value: priceFrom })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p.handle])

  const addToCart = () => {
    if (!qtyValid || uploading) return
    const uploaded = doneLogos(logos)
    cart.add({
      handle: p.handle,
      title: p.title,
      options: p.options.map((o, i) => ({ name: o.name, value: selected[i] })),
      qty: byPiece ? qty : 1,
      unitPrice: byPiece ? unit : variant.price,
      total,
      pieces: count,
      colors: ownColor >= 0 ? selected[ownColor] : mix ? pieces.map((pc, i) => `${pc.label}: ${pieceColors[i]}`).join(' · ') : `All pieces: ${kitColor}`,
      logoName: uploaded.map((l) => l.name).join(', '),
      logos: uploaded,
      sizes: !hasSizes ? 'One size' : sizeMode === 'now' && sizedCount ? SIZES.filter((s) => sizes[s]).map((s) => `${s}×${sizes[s]}`).join(', ') : 'Sending after mockup',
      notes,
    })
    track('AddToCart', { content_ids: [p.handle], content_name: p.title, content_type: 'product', value: total, num_items: count || 1 })
    setAdded(true)
  }

  const details = [
    {
      q: kit ? 'What’s in the kit' : 'What you get',
      a: `${p.spec ? p.spec.charAt(0).toUpperCase() + p.spec.slice(1) : p.title}${p.brand && !p.spec.includes(p.brand) ? ` — ${p.brand}` : ''}.${kit ? ` ${kit.forWho}.` : ''}${p.deco ? ` Decoration: ${p.deco.toLowerCase()}.` : ''}`,
    },
    { q: 'Your logo on everything', a: 'Logo setup, digitizing and a design pass are included. Send any file — we redraw rough logos clean as part of your mockup.' },
    { q: 'How it works', a: STEPS.map((s) => `${s.n} ${s.title}: ${s.body}`).join(' ') },
    { q: 'Colors and sizes', a: `Pick a color, or tell us the exact stock color in the notes. S–XL included; 2XL and up add ${money(SHOP.bigSizeUpcharge)} a piece, billed when you approve your mockup. Caps are one size.` },
    { q: 'Shipping and turnaround', a: `Mockup within one business day, ready ${SHOP.turnaround} after approval, ships anywhere in the US. Shipping and tax are calculated at checkout.` },
    { q: 'Refunds', a: 'You pay at checkout. If you don’t love the mockup, ask for your money back any time before you approve it and you get all of it.' },
  ]

  return (
    <div className="bg-[#0a0908] text-cream">
      <div className={`${wrap} pt-6 pb-2 font-sans text-[11px] uppercase tracking-[0.16em] text-cream/40`}>
        <a href="/apparel" className="hover:text-cream">Apparel</a> / <a href={p.category === 'single' ? '/apparel/single-items' : p.category === 'gifts' ? '/apparel/gifts' : '/apparel/kits'} className="hover:text-cream">{p.category === 'single' ? 'Single Items' : p.category === 'gifts' ? 'Gifts' : 'Kits'}</a> / <span className="text-cream/70">{p.title}</span>
      </div>

      <section className={`${wrap} grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 py-8 md:py-12`}>
        {/* Mockup */}
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-36">
            <div className="relative aspect-square bg-[#141312] border border-white/10 overflow-hidden">
              {view === 'logo' ? (
                <>
                  <GarmentIcon garment={pieces[active].garment} color={colorHex(shownColor)} logo={logoUrl} className="absolute inset-[10%] w-[80%] h-[80%]" />
                  <span className="absolute top-4 left-4 font-sans text-[10px] uppercase tracking-[0.2em] text-cream/50">Your logo preview</span>
                  <span className="absolute bottom-4 left-4 font-display font-black uppercase text-cream text-sm">{pieces[active].label} · {shownColor}</span>
                </>
              ) : (
                <img src={sized(p.images[view].url, 1200)} alt={p.title} className="absolute inset-0 h-full w-full object-cover" />
              )}
            </div>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {p.images.map((img, i) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => setView(i)}
                  className={`relative aspect-square bg-[#141312] border overflow-hidden ${view === i ? 'border-cream' : 'border-white/10 hover:border-white/40'}`}
                  aria-label={`Photo ${i + 1}`}
                >
                  <img src={sized(img.url, 200)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                </button>
              ))}
              <button
                type="button"
                onClick={() => setView('logo')}
                className={`aspect-square bg-[#141312] border p-2 flex flex-col items-center justify-center ${view === 'logo' ? 'border-cream' : 'border-white/10 hover:border-white/40'}`}
                aria-label="Your logo preview"
              >
                <GarmentIcon garment={pieces[0].garment} color={colorHex(shownColor)} logo={logoUrl} className="w-full h-[70%]" />
                <span className="font-sans text-[8px] uppercase tracking-[0.14em] text-cream/60 mt-1">Your logo</span>
              </button>
            </div>
            {!logoUrl && <p className="font-sans text-xs text-cream/40 mt-3">Upload a PNG or JPG logo to see it on the preview. Your real mockup comes from our design team in one business day.</p>}
          </div>
        </div>

        {/* Builder */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          <div>
            {p.brand && <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-cream/50 mb-3">{p.brand}</p>}
            <h1 className="font-display font-black uppercase leading-[0.9] tracking-tighter" style={{ fontSize: 'clamp(40px, 5vw, 76px)' }}>{p.title}</h1>
            <div className="flex items-baseline gap-4 mt-4">
              <span className="font-display font-black text-4xl md:text-5xl">{money(total, true)}</span>
              {count > 0 && <span className="font-sans text-sm text-cream/50">{count} pieces · {money(total / count, true)} a piece</span>}
            </div>
            <p className="font-sans text-sm text-cream/60 mt-3">Shipping calculated at checkout · Mockup in 1 business day</p>
            {kit && <p className="font-sans text-sm text-cream/50 mt-1">{kit.forWho}</p>}
            {p.spec && (
              <p className="font-sans text-cream/70 mt-5 leading-relaxed">
                {p.spec.charAt(0).toUpperCase() + p.spec.slice(1)}. Ready {SHOP.turnaround} after you approve.
              </p>
            )}
          </div>

          <Block n={1} title="Upload your logo">
            <LogoUpload files={logos} onChange={setLogos} />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes for our design team (optional)"
              rows={2}
              className="mt-3 w-full bg-transparent border border-white/20 focus:border-cream outline-none px-4 py-3 font-sans text-sm placeholder:text-cream/35"
            />
          </Block>

          {p.options.length > 0 && !tiered && (
            <Block n={2} title="Choose your options">
              <div className="flex flex-col gap-5">
                {p.options.map((o, oi) => (
                  <div key={o.name}>
                    <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-cream/50 mb-2">{o.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {o.values.map((v) => {
                        const next = selected.map((s, i) => (i === oi ? v : s))
                        const delta = findVariant(p, next).price - variant.price
                        const on = selected[oi] === v
                        return (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setSelected(next)}
                            aria-pressed={on}
                            className={`px-4 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.1em] border transition-colors ${on ? 'bg-cream text-[#0a0908] border-cream' : 'border-white/20 hover:border-cream/60'}`}
                          >
                            {v}
                            {!on && delta !== 0 && <span className="ml-2 opacity-60">{delta > 0 ? '+' : '−'}{money(Math.abs(delta))}</span>}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {byPiece && (
            <Block n={p.options.length > 0 && !tiered ? 3 : 2} title="How many?">
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setQty((q) => Math.max(minQty(p), q - 1))} className="h-12 w-12 border border-white/25 text-xl hover:border-cream" aria-label="Fewer">−</button>
                <input
                  type="number"
                  min={minQty(p)}
                  value={qty}
                  onChange={(e) => setQty(Math.max(0, Number(e.target.value) || 0))}
                  className="h-12 w-24 bg-transparent border border-white/25 text-center font-display font-black text-2xl outline-none focus:border-cream"
                  aria-label="Quantity"
                />
                <button type="button" onClick={() => setQty((q) => q + 1)} className="h-12 w-12 border border-white/25 text-xl hover:border-cream" aria-label="More">+</button>
                <span className="font-sans text-sm text-cream/50">{minQty(p)} minimum</span>
              </div>
              {!qtyValid && <p className="font-sans text-xs text-cream mt-2">Minimum order is {minQty(p)} pieces.</p>}
              {tiered && <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 border border-white/10 mt-4">
                {tiers(p).map((t) => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => setQty(t.min)}
                    className={`p-3 text-left transition-colors ${tier?.label === t.label ? 'bg-cream text-[#0a0908]' : 'bg-[#0a0908] hover:bg-white/5'}`}
                  >
                    <span className="block font-sans text-[10px] uppercase tracking-[0.14em] opacity-60">{t.label}</span>
                    <span className="block font-display font-black text-xl">{money(t.price, true)}</span>
                  </button>
                ))}
              </div>}
              {!tiered && <p className="font-sans text-sm text-cream/60 mt-4">{money(unit, true)} a piece · logo setup and your mockup included</p>}
            </Block>
          )}

          {ownColor < 0 && <Block n={3} title="Pick your colors">
            <div className="flex gap-2 mb-4">
              {(['One color', 'Mix by piece'] as const).map((m, i) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMix(i === 1)}
                  className={`px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] border ${mix === (i === 1) ? 'bg-cream text-[#0a0908] border-cream' : 'border-white/20 hover:border-cream/60'}`}
                  disabled={i === 1 && pieces.length < 2}
                >
                  {m}
                </button>
              ))}
            </div>
            {!mix ? (
              <div className="flex flex-wrap gap-2.5">
                {COLORS.map((c) => <Swatch key={c.name} hex={c.hex} label={c.name} active={kitColor === c.name} onClick={() => setKitColor(c.name)} />)}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {pieces.map((pc, i) => (
                  <div key={pc.label + i}>
                    <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-cream/50 mb-2">{pc.label} · {pieceColors[i]}</p>
                    <div className="flex flex-wrap gap-2">
                      {COLORS.map((c) => (
                        <Swatch key={c.name} hex={c.hex} label={`${pc.label} ${c.name}`} active={pieceColors[i] === c.name}
                          onClick={() => { setActive(i); setPieceColors((prev) => prev.map((x, j) => (j === i ? c.name : x))) }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-sans text-xs text-cream/45 mt-3">{shownColor} selected. Need a specific stock color? Add it to the notes — we match it.</p>
          </Block>}

          {hasSizes && <Block n={4} title="Sizes">
            <div className="flex gap-2 mb-4">
              {(['later', 'now'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSizeMode(m)}
                  className={`px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] border ${sizeMode === m ? 'bg-cream text-[#0a0908] border-cream' : 'border-white/20 hover:border-cream/60'}`}
                >
                  {m === 'later' ? 'Send sizes after my mockup' : 'Enter sizes now'}
                </button>
              ))}
            </div>
            {sizeMode === 'now' && (
              <>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {SIZES.map((s) => (
                    <label key={s} className="flex flex-col items-center gap-1">
                      <span className="font-sans text-[11px] font-semibold">{s}{BIG.has(s) && <span className="text-cream/45"> +$3</span>}</span>
                      <input
                        type="number"
                        min={0}
                        value={sizes[s] ?? ''}
                        onChange={(e) => setSizes((prev) => ({ ...prev, [s]: Math.max(0, Number(e.target.value) || 0) }))}
                        className="w-full h-11 bg-transparent border border-white/25 text-center font-sans outline-none focus:border-cream"
                        aria-label={`Quantity size ${s}`}
                      />
                    </label>
                  ))}
                </div>
                <p className="font-sans text-xs text-cream/50 mt-3">{sizedCount} sized{count ? ` of ${count} pieces (caps are one size)` : ''}.</p>
              </>
            )}
            <p className="font-sans text-xs text-cream/45 mt-3">Send sizes any time before you approve. S–XL included; 2XL and up add {money(SHOP.bigSizeUpcharge)} a piece.</p>
          </Block>}

          {/* Summary */}
          <div className="border border-white/15 p-6">
            <p className="font-display font-black uppercase text-lg mb-4">Order Summary</p>
            <dl className="flex flex-col gap-2 font-sans text-sm">
              <div className="flex justify-between"><dt className="text-cream/60">{p.title}{byPiece ? ` × ${qty}` : ''}</dt><dd>{money(base, true)}</dd></div>
              {bigCount > 0 && <div className="flex justify-between"><dt className="text-cream/60">2XL and up × {bigCount}</dt><dd className="text-cream/60">+{money(bigUpcharge)} at approval</dd></div>}
              <div className="flex justify-between"><dt className="text-cream/60">Design help with your logo</dt><dd>Free</dd></div>
              <div className="flex justify-between"><dt className="text-cream/60">Logo digitizing</dt><dd>Free</dd></div>
              <div className="flex justify-between"><dt className="text-cream/60">Mockup before we make it</dt><dd>Free</dd></div>
              <div className="flex justify-between"><dt className="text-cream/60">Shipping</dt><dd className="text-cream/60">At checkout</dd></div>
              <div className="flex justify-between border-t border-white/15 pt-3 mt-1 text-base font-semibold"><dt>Total</dt><dd>{money(total, true)}</dd></div>
            </dl>
            <button type="button" onClick={addToCart} disabled={!qtyValid || uploading} className={`${btnLight} w-full mt-6 disabled:opacity-40 disabled:pointer-events-none`}>
              {uploading ? 'Uploading your logo…' : `Add To Cart — ${money(total, true)}`}
            </button>
            {!added && !doneLogos(logos).length && (
              <p className="font-sans text-xs text-cream/50 mt-3">No logo handy? Add it to your cart anyway — you can upload it at checkout.</p>
            )}
            {added && (
              <div className="mt-4 flex items-center justify-between gap-4 border border-cream/40 px-4 py-3">
                <span className="font-sans text-sm">Added to your cart.</span>
                <a href="/apparel/cart" className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] underline underline-offset-4">View cart →</a>
              </div>
            )}
            <p className="font-sans text-sm text-cream mt-5">At your door about {fmtShort(dates.from)} – {fmtShort(dates.to)}</p>
            <p className="font-sans text-xs text-cream/50 mt-1">Free mockup by {fmt(dates.mockup)}. Approve it that day to hold this window.</p>
            <ul className="mt-4 flex flex-col gap-1 font-sans text-xs text-cream/60">
              <li>— Secure checkout · full refund until you approve your mockup</li>
              <li>— Designed, produced and packed by Curated</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-16 md:py-24">
        <div className={`${wrap} grid grid-cols-1 lg:grid-cols-12 gap-10`}>
          <div className="lg:col-span-4">
            <h2 className="font-display font-black uppercase leading-[0.88] tracking-tighter" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>The <span className="text-outline">Details.</span></h2>
          </div>
          <div className="lg:col-span-8"><Faq items={details} /></div>
        </div>
      </section>

      <CustomQuote />
    </div>
  )
}
