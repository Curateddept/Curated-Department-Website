import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MerchandiseProduction from '@/components/services/MerchandiseProduction'

export const metadata = {
  title: 'Merchandise Production & Fulfillment — Curated Department',
  description: 'From concept to customer. Product design, production, Shopify, 3PL fulfillment, and customer experience — all under one roof.',
}

export default function Page() {
  return (
    <>
      <Header />
      <MerchandiseProduction />
      <Footer />
    </>
  )
}
