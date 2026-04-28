import Header from '@/components/Header'
import TeamPage from '@/components/TeamPage'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Team — Curated Department',
  description: 'Meet the people behind Curated Department.',
}

export default function Team() {
  return (
    <>
      <Header />
      <main>
        <TeamPage />
      </main>
      <Footer />
    </>
  )
}
