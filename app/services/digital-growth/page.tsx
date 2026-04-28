import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DigitalGrowth from '@/components/services/DigitalGrowth'

export const metadata = {
  title: 'Digital Growth & Brand Management — Curated Department',
  description: 'Full-scale brand presence management. Social media, paid ads, email & SMS, content creation, brand strategy, and brand management — starting at $2,000/month.',
}

export default function Page() {
  return (
    <>
      <Header />
      <DigitalGrowth />
      <Footer />
    </>
  )
}
