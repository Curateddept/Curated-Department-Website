import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyPage from '@/components/work/CaseStudyPage'
import { caseStudies, getCaseStudy } from '@/lib/caseStudies'

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug)
  if (!study) return {}
  return {
    title: `${study.client} Case Study — Curated Department`,
    description: `${study.tagline} ${study.engagement} creative direction for ${study.client}.`,
  }
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug)
  if (!study) notFound()
  return (
    <>
      <Header />
      <main>
        <CaseStudyPage study={study} index={caseStudies.indexOf(study)} />
      </main>
      <Footer />
    </>
  )
}
