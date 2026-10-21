'use client'

import { useRef, useState } from 'react'

export default function PhoneFrame({ video, poster, label }: { video: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  const toggleSound = () => {
    const v = ref.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
    if (!v.muted) v.play()
  }

  return (
    <div className="relative mx-auto w-[260px] sm:w-[300px] lg:w-[330px]">
      {/* Side buttons */}
      <span className="absolute -left-[3px] top-[110px] h-8 w-[3px] rounded-l bg-[#2a2a2a]" />
      <span className="absolute -left-[3px] top-[160px] h-14 w-[3px] rounded-l bg-[#2a2a2a]" />
      <span className="absolute -left-[3px] top-[225px] h-14 w-[3px] rounded-l bg-[#2a2a2a]" />
      <span className="absolute -right-[3px] top-[175px] h-20 w-[3px] rounded-r bg-[#2a2a2a]" />

      <div className="relative aspect-[9/19.5] rounded-[54px] bg-[#0d0d0d] p-[11px] ring-1 ring-white/20 shadow-[0_50px_120px_-20px_rgba(0,0,0,0.9)]">
        <div className="relative h-full w-full overflow-hidden rounded-[44px] bg-black">
          <video
            ref={ref}
            src={video}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={label}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Dynamic Island */}
          <span className="absolute left-1/2 top-3 z-10 h-[28px] w-[96px] -translate-x-1/2 rounded-full bg-black" />
          {/* Screen glare */}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />

          <button
            type="button"
            onClick={toggleSound}
            className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md ring-1 ring-white/20 hover:bg-white hover:text-black transition-colors duration-200"
          >
            {muted ? 'Sound On' : 'Mute'}
          </button>
        </div>
      </div>
    </div>
  )
}
