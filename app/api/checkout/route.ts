import { NextResponse } from 'next/server'
import { emailConfigured, orderId, parseOrder, sendOrderEmail, str } from '@/lib/server/orderEmail'
import { isDev } from '@/lib/server/logoStore'
import { createCheckout } from '@/lib/server/shopify'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

/**
 * Sends the order and logos to Curated, then hands the customer to Shopify checkout.
 * If Shopify can't take the cart, the order still lands in the inbox as a request to invoice.
 */
export async function POST(request: Request) {
  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
  // Honeypot: real visitors never see or fill this field.
  if (str(body?.website)) return NextResponse.json({ error: 'Bad request' }, { status: 400 })

  const parsed = parseOrder(body)
  if (typeof parsed === 'string') return NextResponse.json({ error: parsed }, { status: 400 })
  const { customer, items } = parsed
  const id = orderId()
  const canEmail = emailConfigured() || isDev

  let checkoutUrl: string | null = null
  try {
    checkoutUrl = await createCheckout(id, customer.email, items, new URL(request.url).origin)
  } catch (err) {
    console.error(err)
    if (!canEmail) return NextResponse.json({ error: 'Checkout is unavailable right now. Please call or email us.' }, { status: 502 })
  }

  try {
    await sendOrderEmail({
      id,
      customer,
      items,
      subjectPrefix: checkoutUrl ? 'Checkout started' : 'Order request',
      status: checkoutUrl
        ? 'Sent to Shopify checkout. Look for the matching Shopify order (cart note "Curated order") — if none arrives, they didn’t finish paying, so follow up.'
        : 'Shopify checkout failed, so nothing was charged. Invoice this customer directly.',
      confirmCustomer: !checkoutUrl,
    })
  } catch (err) {
    console.error(err)
    // A paid Shopify order still carries the logo links, so don't block checkout on email.
    if (!checkoutUrl) return NextResponse.json({ error: 'We could not place your order. Please try again.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true, orderId: id, checkoutUrl })
}
