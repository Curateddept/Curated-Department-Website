const partners = [
  { name: 'No Fear',             src: '/logos/no-fear.png',             width: 120 },
  { name: 'FiberwerX',           src: '/logos/fiberwerx.png',           width: 150 },
  { name: 'Thor MX',             src: '/logos/thor.avif',               width: 88  },
  { name: 'Kia',                 src: '/logos/kia.png',                 width: 78  },
  { name: 'Baja Kits',           src: '/logos/bajakits.png',            width: 125 },
  { name: 'Trophy Truck School', src: '/logos/trophy-truck-school.png', width: 148 },
  { name: 'FTA',                 src: '/logos/fta.svg',                 width: 68  },
]

// Triple for seamless infinite loop
const track = [...partners, ...partners, ...partners]

export default function PartnerLogos() {
  return (
    <section className="bg-[#090909] border-t border-b border-white/[0.06] py-10 overflow-hidden">

      {/* Label */}
      <p className="text-center font-sans text-[9px] tracking-[0.3em] uppercase text-cream/20 mb-8">
        Brands We've Worked With
      </p>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-[#090909] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-[#090909] to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex items-center gap-16 partner-track">
          {track.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex-shrink-0 flex items-center justify-center h-8"
              style={{ width: partner.width }}
            >
              <img
                src={partner.src}
                alt={partner.name}
                className="h-full w-auto object-contain partner-logo"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
