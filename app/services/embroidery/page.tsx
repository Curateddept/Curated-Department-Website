import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DecorationService from '@/components/services/DecorationService'
import { embroidery } from '@/lib/decoration'

export const metadata = {
  title: 'Custom Embroidery — Curated Department',
  description: 'In-house digitizing and multi-head embroidery for caps, polos, jackets and workwear. 3D puff, chenille and patches. 7 to 10 business days.',
}

export default function Page() {
  return (
    <>
      <Header />
      <DecorationService page={embroidery} />
      <Footer />
    </>
  )
}
