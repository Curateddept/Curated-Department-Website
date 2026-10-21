type Partner = {
  name: string
  src: string
  /** Rendered height in px — tuned per logo so wordmarks and badges look the same visual weight. */
  height: number
}

// Every logo is a white mark on transparent (public/logos/mono) or an SVG whitened by .partner-logo.
const partners: Partner[] = [
  { name: 'No Fear',             src: '/logos/mono/no-fear.png',             height: 46 },
  { name: 'FiberwerX',           src: '/logos/mono/fiberwerx.png',           height: 34 },
  { name: 'Thor MX',             src: '/logos/mono/thor.png',                height: 44 },
  { name: 'Canvas',              src: '/logos/mono/canvas.png',              height: 30 },
  { name: 'Amazon',              src: '/logos/amazon.svg',                   height: 44 },
  { name: 'Baja Kits',           src: '/logos/mono/bajakits.png',            height: 42 },
  { name: 'Trophy Truck School', src: '/logos/mono/trophy-truck-school.png', height: 46 },
  { name: 'JRR',                 src: '/logos/mono/jrr.png',                 height: 34 },
  { name: 'BDS',                 src: '/logos/mono/bds.png',                 height: 62 },
  { name: 'FTA',                 src: '/logos/fta.svg',                      height: 44 },
]

// Triple for seamless infinite loop
const track = [...partners, ...partners, ...partners]

export default function PartnerLogos() {
  return (
    <section className="bg-[#0a0908] border-y border-white/[0.08] py-14 overflow-hidden">

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mb-10 flex items-center gap-4">
        <span className="font-display font-black uppercase text-cream text-sm tracking-[0.18em]">
          Brands We&apos;ve Worked With
        </span>
        <span className="flex-1 h-px bg-white/15" />
        <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-cream/40">300+</span>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#0a0908] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#0a0908] to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-20 partner-track">
          {track.map((partner, i) => (
            <img
              key={`${partner.name}-${i}`}
              src={partner.src}
              alt={partner.name}
              className="flex-shrink-0 w-auto object-contain partner-logo"
              style={{ height: partner.height }}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
