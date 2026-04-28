import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContentCreation from '@/components/services/ContentCreation'

export const metadata = {
  title: 'Content Creation — Curated Department',
  description:
    'Short-form video, product clips, lifestyle photography, and behind-the-scenes content built to fit your brand and work across social, ads, and digital.',
}

export default function Page() {
  return (
    <>
      <Header />
      <ContentCreation />
      <Footer />
    </>
  )
}
