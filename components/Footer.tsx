export default function Footer() {
  return (
    <footer className="bg-[#070707] border-t border-white/[0.06] py-12 md:py-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">

          {/* Brand */}
          <div>
            <a href="/" className="block mb-3">
              <img
                src="/logo-lockup-white.png"
                alt="Curated Department"
                className="h-12 w-auto"
              />
            </a>
            <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-cream/35">
              Digital / Creative / Print / Merchandise
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
            <div className="flex flex-col gap-3">
              <p className="font-sans text-[9px] tracking-[0.22em] uppercase text-cream/30 mb-1">
                Navigate
              </p>
              {['About', 'Work', 'Services', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="font-sans text-sm text-cream/50 hover:text-cream transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-sans text-[9px] tracking-[0.22em] uppercase text-cream/30 mb-1">
                Connect
              </p>
              {[
                { label: 'Instagram', href: '#' },
                { label: 'Email', href: 'mailto:hello@curateddepartment.com' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-sans text-sm text-cream/50 hover:text-brand-green transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-sans text-[10px] tracking-[0.1em] text-cream/25">
            © 2024 Curated Department. All rights reserved.
          </p>
          <p className="font-sans text-[10px] tracking-[0.1em] text-cream/25">
            Creative / Digital / Print / Merchandise / Strategy
          </p>
        </div>
      </div>
    </footer>
  )
}
