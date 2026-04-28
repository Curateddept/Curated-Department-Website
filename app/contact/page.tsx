import Header from '@/components/Header'
import ContactPage from '@/components/ContactPage'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Contact — Curated Department',
  description: 'Get in touch with Curated Department. Build a quote, start a project, or just say hello.',
}

export default function Contact() {
  return (
    <>
      <Header />
      <main>
        <ContactPage />
      </main>
      <Footer />
    </>
  )
}
