// Meta Pixel events. No-ops until NEXT_PUBLIC_META_PIXEL_ID is set and the pixel has loaded.

type Fbq = (cmd: 'track' | 'trackCustom', event: string, params?: Record<string, unknown>) => void

export function track(event: 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Lead' | 'Purchase', params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  const fbq = (window as unknown as { fbq?: Fbq }).fbq
  fbq?.('track', event, { currency: 'USD', ...params })
}
