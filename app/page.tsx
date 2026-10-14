import Header from '@/components/Header'
import HeroSlider from '@/components/HeroSlider'
import PartnerLogos from '@/components/PartnerLogos'
import TickerBar from '@/components/TickerBar'
import IntroSection from '@/components/IntroSection'
import ServicesList from '@/components/ServicesList'
// import WorkPreview from '@/components/WorkPreview'  // hidden — revisit when ready
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSlider />
        <PartnerLogos />
        <IntroSection />
        <TickerBar />
        <ServicesList />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
