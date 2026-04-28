import Header from '@/components/Header'
import AboutPage from '@/components/AboutPage'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'About — Curated Department',
  description: 'One team. All of it. Curated Department is a full-service creative operation for brands that need more than one thing done right.',
}

export default function About() {
  return (
    <>
      <Header />
      <main>
        <AboutPage />
      </main>
      <Footer />
    </>
  )
}
