import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EmailSMSMarketing from '@/components/services/EmailSMSMarketing'

export const metadata = {
  title: 'Email & SMS Marketing — Curated Department',
  description:
    'Campaign planning, automated flows, list growth, and segmentation. We turn email and SMS into real revenue drivers.',
}

export default function Page() {
  return (
    <>
      <Header />
      <EmailSMSMarketing />
      <Footer />
    </>
  )
}
