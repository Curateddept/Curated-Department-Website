import Header from '@/components/Header'
import ServicesPage from '@/components/ServicesPage'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Services — Curated Department',
  description: 'Eight services under one roof: digital, merch, print, sublimation, branding, content, social, and email.',
}

export default function Services() {
  return (
    <>
      <Header />
      <main>
        <ServicesPage />
      </main>
      <Footer />
    </>
  )
}
