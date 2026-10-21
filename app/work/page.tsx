import Header from '@/components/Header'
import WorkIndex from '@/components/work/WorkIndex'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Work — Curated Department',
  description: 'Case studies from full-scope brand engagements — content, social, email, merch and print.',
}

export default function Work() {
  return (
    <>
      <Header />
      <main>
        <WorkIndex />
      </main>
      <Footer />
    </>
  )
}
