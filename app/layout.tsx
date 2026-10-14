import type { Metadata } from 'next'
import { Barlow, DM_Sans, Fraunces } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import Preloader from '@/components/Preloader'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Curated Department — Creative, Digital, Print, Merchandise',
  description:
    'A creative department for brands that need content, design, digital, print, merchandise, and strategy under one roof.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${barlow.variable} ${dmSans.variable} ${fraunces.variable}`}>
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        <Preloader />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
