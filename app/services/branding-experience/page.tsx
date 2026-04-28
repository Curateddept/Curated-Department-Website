import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BrandingExperience from '@/components/services/BrandingExperience'

export const metadata = {
  title: 'Branding & Experience Design — Curated Department',
  description: 'Brand identity systems, event & booth design, event collateral packages, and packaging. From digital presence to real-world impact.',
}

export default function Page() {
  return (
    <>
      <Header />
      <BrandingExperience />
      <Footer />
    </>
  )
}
