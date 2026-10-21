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
    <div className="bg-cream overflow-hidden py-5 border-y-2 border-[#0a0908]" aria-hidden="true">
      <div className="ticker-track flex items-center">
        {row.map((p, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span
              className={`font-display font-black uppercase text-[#0a0908] tracking-tight px-8 text-2xl md:text-4xl ${i % 2 ? 'text-outline' : ''}`}
            >
              {p}
            </span>
            <span className="text-[#0a0908] text-2xl md:text-3xl leading-none">✳</span>
          </span>
        ))}
      </div>
    </div>
  )
}
