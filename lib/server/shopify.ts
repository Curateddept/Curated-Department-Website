import config from '@/lib/shop/shopify.json'
import type { Item } from './orderEmail'

const ENDPOINT = `https://${config.domain}/api/${config.apiVersion}/graphql.json`

const CART_CREATE = `mutation($input: CartInput!) {
  cartCreate(input: $input) {
    cart { id checkoutUrl }
    userErrors { field message }
  }
}`

// Shopify shows line attributes on the order; keep values short enough to display cleanly.
const attr = (key: string, value: string) => ({ key, value: value.slice(0, 250) })

/** Creates a Shopify cart carrying the logo links, colors and sizes, and returns its checkout URL. */
export async function createCheckout(id: string, email: string, items: Item[], origin: string) {
  const lines = items.map((i) => ({
    merchandiseId: i.variant.id,
    quantity: i.qty,
    attributes: [
      ...i.logos.map((l, n) => attr(`Logo ${n + 1}`, l.url.startsWith('/') ? `${origin}${l.url}` : l.url)),
      ...(i.logos.length ? [] : [attr('Logo', 'Sending after checkout')]),
      ...(i.colors ? [attr('Colors', i.colors)] : []),
      ...(i.sizes ? [attr('Sizes', i.sizes)] : []),
      ...(i.notes ? [attr('Notes', i.notes)] : []),
    ],
  }))

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': config.storefrontToken },
    body: JSON.stringify({
      query: CART_CREATE,
      variables: { input: { lines, buyerIdentity: { email }, attributes: [attr('Curated order', id)] } },
    }),
    cache: 'no-store',
  })
  const json = await res.json()
  const errors = json.errors ?? json.data?.cartCreate?.userErrors
  if (!res.ok || errors?.length) throw new Error(`Shopify cart failed: ${JSON.stringify(errors ?? res.status)}`)
  return json.data.cartCreate.cart.checkoutUrl as string
}
