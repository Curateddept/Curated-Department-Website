import Header from '@/components/Header'
import OurLanesPage from '@/components/OurLanesPage'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Our Lanes — Curated Department',
  description: 'The brands and vendors that power Curated Department\'s services.',
}

export default function OurLanes() {
  return (
    <>
      <Header />
      <main>
        <OurLanesPage />
      </main>
      <Footer />
    </>
  )
}
