import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PrintProduction from '@/components/services/PrintProduction'

export const metadata = {
  title: 'Print & Promotional Production — Curated Department',
  description: 'Business essentials, labels, apparel, promotional products, and large format printing. If it can be printed, worn, or branded — we can produce it.',
}

export default function Page() {
  return (
    <>
      <Header />
      <PrintProduction />
      <Footer />
    </>
  )
}
