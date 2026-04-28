import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SocialMediaManagement from '@/components/services/SocialMediaManagement'

export const metadata = {
  title: 'Social Media Management — Curated Department',
  description:
    'Instagram, TikTok, YouTube, and Facebook management. Posting, scheduling, engagement, content strategy, and a content calendar — all handled.',
}

export default function Page() {
  return (
    <>
      <Header />
      <SocialMediaManagement />
      <Footer />
    </>
  )
}
