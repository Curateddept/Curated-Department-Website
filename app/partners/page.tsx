import Header from '@/components/Header'
import PartnersPage from '@/components/PartnersPage'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Partners — Curated Department',
  description: 'The brands and vendors that power Curated Department\'s services.',
}

export default function Partners() {
  return (
    <>
      <Header />
      <main>
        <PartnersPage />
      </main>
      <Footer />
    </>
  )
}
