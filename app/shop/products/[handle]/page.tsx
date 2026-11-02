import { notFound } from 'next/navigation'
import ProductBuilder from '@/components/shop/ProductBuilder'
import { getProduct, products } from '@/lib/shop/catalog'

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }))
}

export function generateMetadata({ params }: { params: { handle: string } }) {
  const p = getProduct(params.handle)
  if (!p) return {}
  return { title: `${p.title} — Curated Crew Kits`, description: p.spec || `${p.title} with your logo.` }
}

export default function Page({ params }: { params: { handle: string } }) {
  const p = getProduct(params.handle)
  if (!p) notFound()
  return <ProductBuilder p={p} />
}
