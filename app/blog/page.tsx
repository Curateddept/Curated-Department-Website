import Header from '@/components/Header'
import BlogPage from '@/components/BlogPage'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Blog — Curated Department',
  description: 'Write-ups on recent jobs, events, and everything happening inside Curated Department.',
}

export default function Blog() {
  return (
    <>
      <Header />
      <main>
        <BlogPage />
      </main>
      <Footer />
    </>
  )
}
