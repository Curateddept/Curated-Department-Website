import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DecorationService from '@/components/services/DecorationService'
import { screenPrinting } from '@/lib/decoration'

export const metadata = {
  title: 'Custom Screen Printing — Curated Department',
  description: 'Automatic presses, PMS-matched inks and specialty finishes for corporate programs, teams, events and retail brands. 7 to 10 business days.',
}

export default function Page() {
  return (
    <>
      <Header />
      <DecorationService page={screenPrinting} />
      <Footer />
    </>
  )
}
