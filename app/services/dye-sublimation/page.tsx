import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DyeSublimation from '@/components/services/DyeSublimation'

export const metadata = {
  title: 'Dye Sublimation & Fabric Printing — Curated Department',
  description: 'Full-fabric printing, motocross gear, and performance apparel. Unlimited color capability, cut & sew ready. Trusted by leading motocross and performance brands.',
}

export default function Page() {
  return (
    <>
      <Header />
      <DyeSublimation />
      <Footer />
    </>
  )
}
