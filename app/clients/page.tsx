import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ClientsPage from '@/components/ClientsPage'

export const metadata = {
  title: 'Clients — Curated Department',
  description: 'Case studies from the brands we\'ve built alongside.',
}

export default function Page() {
  return (
    <>
      <Header />
      <ClientsPage />
      <Footer />
    </>
  )
}
