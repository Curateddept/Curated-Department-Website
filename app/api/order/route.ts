import { promises as fs } from 'fs'
import path from 'path'
import { randomBytes } from 'crypto'
import { NextResponse } from 'next/server'
import { SHOP, money } from '@/lib/shop/catalog'
import { MAX_LOGOS_PER_ITEM, fileSize, safeFileName, type LogoRef } from '@/lib/shop/logos'
import { LOCAL_DIR, isDev, isStoredLogoUrl, loadLogo } from '@/lib/server/logoStore'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

type Customer = { name: string; company: string; email: string; phone: string; address: string; notes: string }
type Item = {
  title: string
  handle: string
  qty: number
  total: number
  pieces: number
  options: { name: string; value: string }[]
  colors: string
  sizes: string
  notes: string
  logos: LogoRef[]
}

// Resend caps a message at 40 MB; leave headroom for base64 overhead.
const ATTACH_BUDGET = 24 * 1024 * 1024

const str = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : 0)
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

function parse(body: any): { customer: Customer; items: Item[] } | string {
  const c = body?.customer ?? {}
  const customer: Customer = {
    name: str(c.name, 120),
    company: str(c.company, 120),
    email: str(c.email, 200),
    phone: str(c.phone, 40),
    address: str(c.address, 400),
    notes: str(c.notes, 2000),
  }
  if (!customer.name || !customer.address) return 'Name and shipping address are required.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) return 'A valid email is required.'
  const rawItems: any[] = Array.isArray(body?.items) ? body.items.slice(0, 30) : []
  if (!rawItems.length) return 'Your cart is empty.'
  const items: Item[] = rawItems.map((i) => ({
    title: str(i.title, 160),
    handle: str(i.handle, 160),
    qty: num(i.qty),
    total: num(i.total),
    pieces: num(i.pieces),
    options: (Array.isArray(i.options) ? i.options : []).slice(0, 10).map((o: any) => ({ name: str(o?.name, 60), value: str(o?.value, 120) })),
    colors: str(i.colors, 600),
    sizes: str(i.sizes, 300),
    notes: str(i.notes, 2000),
    logos: (Array.isArray(i.logos) ? i.logos : [])
      .slice(0, MAX_LOGOS_PER_ITEM)
      .map((l: any) => ({ name: str(l?.name, 160), url: str(l?.url, 600), size: num(l?.size), type: str(l?.type, 80) }))
      .filter((l: LogoRef) => isStoredLogoUrl(l.url)),
  }))
  return { customer, items }
}

function orderId() {
  const d = new Date()
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  return `CD-${ymd}-${randomBytes(2).toString('hex').toUpperCase()}`
}

function renderEmail(id: string, customer: Customer, items: Item[], subtotal: number) {
  const row = (k: string, v: string) => (v ? `<tr><td style="padding:3px 16px 3px 0;color:#777">${esc(k)}</td><td style="padding:3px 0">${esc(v)}</td></tr>` : '')
  const itemHtml = items
    .map((i, n) => {
      const logos = i.logos.length
        ? i.logos
            .map((l) =>
              l.type.startsWith('image/') && !l.type.includes('heic') && !l.type.includes('photoshop')
                ? `<a href="${esc(l.url)}"><img src="${esc(l.url)}" alt="${esc(l.name)}" style="max-width:160px;max-height:120px;border:1px solid #ddd;margin:4px 8px 4px 0;background:#f4f4f2"></a>`
                : `<a href="${esc(l.url)}" style="display:inline-block;margin:4px 8px 4px 0">${esc(l.name)}</a>`,
            )
            .join('') +
          `<div style="font-size:12px;color:#777">${i.logos.map((l) => `<a href="${esc(l.url)}" style="color:#777">${esc(l.name)}</a> (${fileSize(l.size)})`).join(' · ')}</div>`
        : '<span style="color:#b00">No logo uploaded — ask for it when you reply.</span>'
      return `
        <div style="border-top:1px solid #ddd;padding:16px 0">
          <div style="font-size:16px;font-weight:700">${n + 1}. ${esc(i.title)}${i.qty > 1 ? ` × ${i.qty}` : ''} — ${money(i.total, true)}</div>
          <table style="font-size:14px;margin-top:6px">
            ${i.options.map((o) => row(o.name, o.value)).join('')}
            ${row('Pieces', i.pieces ? String(i.pieces) : '')}
            ${row('Colors', i.colors)}
            ${row('Sizes', i.sizes)}
            ${row('Notes', i.notes)}
          </table>
          <div style="margin-top:8px">${logos}</div>
        </div>`
    })
    .join('')

  const html = `<div style="font-family:-apple-system,Helvetica,Arial,sans-serif;color:#111;max-width:640px">
    <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#777;margin:0">New apparel order · ${id}</p>
    <h1 style="font-size:24px;margin:6px 0 16px">${esc(customer.company || customer.name)} — ${money(subtotal, true)}</h1>
    <table style="font-size:14px">
      ${row('Name', customer.name)}${row('Company', customer.company)}${row('Email', customer.email)}${row('Phone', customer.phone)}${row('Ship to', customer.address)}${row('Order notes', customer.notes)}
    </table>
    ${itemHtml}
    <p style="border-top:1px solid #ddd;padding-top:12px;font-size:16px"><b>Subtotal: ${money(subtotal, true)}</b> <span style="color:#777">(prices as shown on the site; shipping and tax not included)</span></p>
    <p style="font-size:12px;color:#777">Logo files are attached and linked above. Reply to this email to reach the customer.</p>
  </div>`

  const text = [
    `NEW APPAREL ORDER ${id} — ${customer.company || customer.name}`,
    '',
    `Name: ${customer.name}`,
    `Company: ${customer.company}`,
    `Email: ${customer.email}`,
    `Phone: ${customer.phone}`,
    `Ship to: ${customer.address}`,
    ...(customer.notes ? [`Order notes: ${customer.notes}`] : []),
    '',
    ...items.flatMap((i, n) => [
      `${n + 1}. ${i.title}${i.qty > 1 ? ` × ${i.qty}` : ''} — ${money(i.total, true)}`,
      ...i.options.map((o) => `   ${o.name}: ${o.value}`),
      `   Colors: ${i.colors}`,
      `   Sizes: ${i.sizes}`,
      ...(i.notes ? [`   Notes: ${i.notes}`] : []),
      ...(i.logos.length ? i.logos.map((l) => `   Logo: ${l.name} ${l.url}`) : ['   Logo: none uploaded']),
    ]),
    '',
    `Subtotal: ${money(subtotal, true)}`,
  ].join('\n')

  return { html, text }
}

function confirmationEmail(id: string, customer: Customer, items: Item[], subtotal: number) {
  const first = customer.name.split(' ')[0]
  const html = `<div style="font-family:-apple-system,Helvetica,Arial,sans-serif;color:#111;max-width:560px">
    <h1 style="font-size:22px">Got it, ${esc(first)}.</h1>
    <p>Your order <b>${id}</b> is in. Our design team is building your mockup now — you'll have it within one business day.</p>
    <p>Nothing is charged until you approve the mockup. Full refund any time before that.</p>
    <ul>${items.map((i) => `<li>${esc(i.title)}${i.qty > 1 ? ` × ${i.qty}` : ''} — ${money(i.total, true)}</li>`).join('')}</ul>
    <p><b>Subtotal: ${money(subtotal, true)}</b> (shipping and tax added on your invoice)</p>
    <p>Questions or a better logo file? Just reply to this email or call ${SHOP.phone}.</p>
    <p>— Curated Department</p>
  </div>`
  return { html }
}

async function sendResend(payload: Record<string, unknown>) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Email failed (${res.status}): ${await res.text()}`)
}

export async function POST(request: Request) {
  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
  // Honeypot: real visitors never see or fill this field.
  if (str(body?.website)) return NextResponse.json({ ok: true, orderId: orderId() })

  const parsed = parse(body)
  if (typeof parsed === 'string') return NextResponse.json({ error: parsed }, { status: 400 })
  const { customer, items } = parsed

  const hasEmail = Boolean(process.env.RESEND_API_KEY)
  if (!hasEmail && !isDev) return NextResponse.json({ error: 'Order email is not configured', fallback: 'mailto' }, { status: 503 })

  const id = orderId()
  const subtotal = items.reduce((s, i) => s + i.total, 0)
  const { html, text } = renderEmail(id, customer, items, subtotal)
  const label = safeFileName(customer.company || customer.name)

  // Attach every logo we can fit; anything over budget is still linked in the email.
  const attachments: { filename: string; content: string }[] = []
  let used = 0
  for (let n = 0; n < items.length; n++) {
    for (const logo of items[n].logos) {
      if (used + logo.size > ATTACH_BUDGET) continue
      const data = await loadLogo(logo.url)
      if (!data) continue
      used += data.length
      attachments.push({ filename: `${id}_${label}_item${n + 1}_${safeFileName(logo.name)}`, content: data.toString('base64') })
    }
  }

  const to = process.env.ORDER_TO_EMAIL || SHOP.email
  const subject = `New Order ${id} — ${customer.company || customer.name} — ${money(subtotal, true)}`

  if (!hasEmail) {
    // Development without an email key: write the message to .uploads/outbox for review.
    const dir = path.join(LOCAL_DIR, 'outbox')
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(path.join(dir, `${id}.html`), `<h3>To: ${esc(to)}<br>Subject: ${esc(subject)}<br>Attachments: ${attachments.map((a) => esc(a.filename)).join(', ') || 'none'}</h3>${html}`)
    return NextResponse.json({ ok: true, orderId: id, dev: `.uploads/outbox/${id}.html`, attachments: attachments.length })
  }

  const from = process.env.ORDER_FROM_EMAIL || 'Curated Apparel <onboarding@resend.dev>'
  try {
    await sendResend({ from, to: [to], reply_to: customer.email, subject, html, text, attachments })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'We could not send your order. Please try again.', fallback: 'mailto' }, { status: 502 })
  }

  // The customer copy needs a verified sending domain, so it only goes out once ORDER_FROM_EMAIL is set.
  if (process.env.ORDER_FROM_EMAIL) {
    try {
      await sendResend({ from, to: [customer.email], reply_to: to, subject: `Your Curated order ${id} — mockup coming within 1 business day`, ...confirmationEmail(id, customer, items, subtotal) })
    } catch (err) {
      console.error(err)
    }
  }

  return NextResponse.json({ ok: true, orderId: id })
}
