const phrases = [
  'Creative Department',
  'Content',
  'Merch',
  'Print',
  'Digital',
  'Brand',
  'Built in Culture',
  'Est. 2018',
]

export default function TickerBar() {
  const row = [...phrases, ...phrases]

  return (
    <div className="bg-brand-green overflow-hidden py-3 border-y border-black/20" aria-hidden="true">
      <div className="ticker-track flex items-center">
        {row.map((p, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span className="font-display font-black uppercase text-cream text-sm md:text-base tracking-[0.06em] px-6">
              {p}
            </span>
            <span className="font-serif italic text-cream/70 text-lg leading-none">✳</span>
          </span>
        ))}
      </div>
    </div>
  )
}
