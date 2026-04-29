'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type NavLink = {
  label: string
  href: string
  external?: boolean
  children?: { label: string; href: string }[]
}

const services: { label: string; href: string }[] = [
  { label: 'Digital Growth & Brand Management', href: '/services/digital-growth' },
  { label: 'Merchandise Production & Fulfillment', href: '/services/merchandise-production' },
  { label: 'Print & Promotional Production', href: '/services/print-production' },
  { label: 'Dye Sublimation & Fabric Printing', href: '/services/dye-sublimation' },
  { label: 'Branding & Experience Design', href: '/services/branding-experience' },
  { label: 'Content Creation', href: '/services/content-creation' },
  { label: 'Social Media Management', href: '/services/social-media-management' },
  { label: 'Email & SMS Marketing', href: '/services/email-sms-marketing' },
]

const navLinks: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', children: services },
  // { label: 'Clients', href: '/clients' },  // hidden — revisit when ready
  { label: 'Our Lanes', href: '/our-lanes' },
  // { label: 'Blog', href: '/blog' },   // hidden — revisit when ready
  // { label: 'Team', href: '/team' },   // hidden — revisit when ready
  { label: 'Contact', href: '/contact' },
  { label: 'Motorsports Curated', href: 'https://www.motorsportscurated.com', external: true },
]

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

function ServicesDropdown() {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <a
        href="/services"
        className="font-sans text-[10px] tracking-[0.16em] uppercase transition-colors duration-200 whitespace-nowrap text-cream/55 hover:text-cream flex items-center gap-1.5"
      >
        Services
        <svg
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          width="8"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: [0.33, 1, 0.68, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
          >
            <div className="bg-[#0a0a0a]/98 backdrop-blur-md border border-white/[0.08] min-w-[320px] py-2 shadow-2xl">
              {services.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  className="block px-5 py-3 font-sans text-[11px] tracking-[0.12em] uppercase text-cream/60 hover:text-cream hover:bg-white/[0.04] hover:pl-6 transition-all duration-200"
                >
                  {s.label}
                </a>
              ))}
              <div className="border-t border-white/[0.08] mt-1 pt-1">
                <a
                  href="/services"
                  className="block px-5 py-3 font-sans text-[10px] tracking-[0.16em] uppercase text-brand-green hover:bg-white/[0.04] transition-colors duration-200"
                >
                  View All Services →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#090909]/95 backdrop-blur-md border-b border-white/[0.08]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center flex-shrink-0">
          <img src="/logo-icon-white.png" alt="Curated Department" className="h-8 w-auto" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) =>
            link.children ? (
              <ServicesDropdown key={link.label} />
            ) : (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className={`font-sans text-[10px] tracking-[0.16em] uppercase transition-colors duration-200 whitespace-nowrap ${
                  link.label === 'Motorsports Curated'
                    ? 'text-brand-green hover:text-cream'
                    : 'text-cream/55 hover:text-cream'
                }`}
              >
                {link.label}
                {link.external && (
                  <svg className="inline ml-1 mb-0.5" width="8" height="8" viewBox="0 0 10 10" fill="none">
                    <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
              </a>
            )
          )}
        </nav>

        {/* Right: social icons + CTA + mark + mobile toggle */}
        <div className="flex items-center gap-3">

          {/* Social icons */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://www.instagram.com/curate.dept/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/40 hover:text-cream transition-colors duration-200 p-1"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-4 bg-white/10" />

          {/* CTA */}
          <a
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 bg-brand-green text-cream font-sans font-semibold text-[10px] tracking-[0.16em] uppercase px-4 py-2.5 rounded-sm hover:bg-[#166030] transition-colors duration-200 flex-shrink-0"
          >
            Get a Quote
          </a>

          {/* Spinning mark — desktop only */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="hidden lg:flex items-center justify-center w-7 h-7 cursor-default select-none"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <line x1="11" y1="0" x2="11" y2="22" stroke="#F5F0E4" strokeWidth="1.5"/>
              <line x1="0" y1="11" x2="22" y2="11" stroke="#F5F0E4" strokeWidth="1.5"/>
              <line x1="2.93" y1="2.93" x2="19.07" y2="19.07" stroke="#1E7A38" strokeWidth="1.5"/>
              <line x1="19.07" y1="2.93" x2="2.93" y2="19.07" stroke="#1E7A38" strokeWidth="1.5"/>
            </svg>
          </motion.div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[1.5px] bg-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-cream transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? 'auto' : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
        className="lg:hidden overflow-hidden bg-[#0a0a0a] border-t border-white/[0.08]"
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="flex flex-col">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center justify-between text-left font-display text-2xl font-black uppercase text-cream hover:text-brand-green transition-colors duration-200"
                >
                  <span>{link.label}</span>
                  <svg
                    className={`transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                    width="14"
                    height="9"
                    viewBox="0 0 14 9"
                    fill="none"
                  >
                    <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pt-3 pb-1 flex flex-col gap-3 border-l border-brand-green/30 ml-1">
                        {link.children.map((child) => (
                          <a
                            key={child.href}
                            href={child.href}
                            onClick={() => setMenuOpen(false)}
                            className="font-sans text-[11px] tracking-[0.14em] uppercase text-cream/60 hover:text-brand-green transition-colors duration-200"
                          >
                            {child.label}
                          </a>
                        ))}
                        <a
                          href="/services"
                          onClick={() => setMenuOpen(false)}
                          className="font-sans text-[10px] tracking-[0.16em] uppercase text-brand-green pt-1"
                        >
                          View All Services →
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                onClick={() => !link.external && setMenuOpen(false)}
                className={`font-display text-2xl font-black uppercase transition-colors duration-200 ${
                  link.label === 'Motorsports Curated'
                    ? 'text-brand-green'
                    : 'text-cream hover:text-brand-green'
                }`}
              >
                {link.label}
              </a>
            )
          )}
          <div className="flex items-center gap-4 mt-2 pt-4 border-t border-white/[0.08]">
            <a href="https://www.instagram.com/curate.dept/" target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-cream transition-colors duration-200">
              <InstagramIcon />
            </a>
          </div>
          <a
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center gap-2 bg-brand-green text-cream font-sans font-semibold text-[11px] tracking-[0.16em] uppercase px-5 py-3 rounded-sm w-fit"
          >
            Get a Quote →
          </a>
        </div>
      </motion.div>
    </header>
  )
}
