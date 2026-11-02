import type { Garment } from '@/lib/shop/catalog'

type Box = [number, number, number, number]

const LONG_SLEEVE =
  'M62 30 L82 20 Q100 34 118 20 L138 30 L164 58 L182 150 L162 156 L144 86 L142 180 L58 180 L56 86 L38 156 L18 150 L36 58 Z'

const SHAPES: Record<Garment, { d: string[]; detail?: string[]; logo: Box }> = {
  tee: {
    d: ['M62 30 L82 20 Q100 34 118 20 L138 30 L174 54 L158 82 L140 72 L140 180 L60 180 L60 72 L42 82 L26 54 Z'],
    detail: ['M82 20 Q100 40 118 20'],
    logo: [76, 56, 48, 48],
  },
  longsleeve: { d: [LONG_SLEEVE], detail: ['M82 20 Q100 40 118 20', 'M38 148 L18 144', 'M162 148 L182 144'], logo: [76, 56, 48, 48] },
  crewneck: {
    d: [LONG_SLEEVE],
    detail: ['M82 20 Q100 42 118 20', 'M60 170 L140 170', 'M38 148 L18 144', 'M162 148 L182 144'],
    logo: [76, 58, 48, 48],
  },
  hoodie: {
    d: [LONG_SLEEVE, 'M76 30 Q74 2 100 2 Q126 2 124 30 Q112 44 100 44 Q88 44 76 30 Z'],
    detail: ['M86 44 L84 66', 'M114 44 L116 66', 'M70 132 L130 132 L124 160 L76 160 Z'],
    logo: [78, 70, 44, 44],
  },
  quarterzip: {
    d: [LONG_SLEEVE],
    detail: ['M84 16 L100 30 L116 16', 'M100 30 L100 78'],
    logo: [112, 52, 26, 26],
  },
  jacket: {
    d: [LONG_SLEEVE],
    detail: ['M80 14 L100 30 L120 14', 'M100 30 L100 180', 'M64 120 L86 120', 'M114 120 L136 120'],
    logo: [110, 52, 26, 26],
  },
  polo: {
    d: ['M62 30 L82 20 Q100 34 118 20 L138 30 L174 54 L158 82 L140 72 L140 180 L60 180 L60 72 L42 82 L26 54 Z'],
    detail: ['M80 20 L96 40 L100 30 L104 40 L120 20', 'M100 30 L100 62'],
    logo: [112, 52, 24, 24],
  },
  vest: {
    d: ['M70 22 L86 18 Q100 34 114 18 L130 22 Q132 52 152 64 L152 180 L48 180 L48 64 Q68 52 70 22 Z'],
    detail: ['M100 30 L100 180'],
    logo: [112, 70, 24, 24],
  },
  cap: {
    d: ['M46 122 Q44 52 100 50 Q156 52 154 122 Z', 'M36 122 Q100 138 180 116 L176 132 Q100 156 36 136 Z'],
    detail: ['M100 50 L100 122', 'M70 58 L76 122', 'M130 58 L124 122'],
    logo: [76, 72, 48, 36],
  },
  beanie: {
    d: ['M54 140 Q52 56 100 54 Q148 56 146 140 Z', 'M48 122 L152 122 L152 156 L48 156 Z'],
    detail: ['M64 122 L64 156', 'M82 122 L82 156', 'M100 122 L100 156', 'M118 122 L118 156', 'M136 122 L136 156'],
    logo: [84, 126, 32, 26],
  },
  bag: {
    d: ['M56 52 Q56 34 74 34 L126 34 Q144 34 144 52 L148 176 L52 176 Z'],
    detail: ['M80 34 Q80 14 100 14 Q120 14 120 34', 'M64 112 L136 112 L136 160 L64 160 Z'],
    logo: [80, 56, 40, 40],
  },
  tumbler: {
    d: ['M64 40 L136 40 L126 182 L74 182 Z', 'M58 24 L142 24 L142 42 L58 42 Z'],
    detail: ['M88 24 L88 16 L112 16 L112 24'],
    logo: [80, 82, 40, 40],
  },
  blanket: {
    d: ['M30 60 L170 60 L170 150 L30 150 Z'],
    detail: ['M30 84 L170 84', 'M30 128 L170 128', 'M150 60 L150 150'],
    logo: [76, 90, 48, 34],
  },
  kit: {
    d: ['M30 78 L100 50 L170 78 L170 158 L100 186 L30 158 Z'],
    detail: ['M30 78 L100 106 L170 78', 'M100 106 L100 186', 'M64 64 L134 92'],
    logo: [70, 108, 26, 26],
  },
}

function isLight(hex: string) {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  return 0.299 * r + 0.587 * g + 0.114 * b > 150
}

export default function GarmentIcon({
  garment,
  color = '#1c1c1c',
  logo,
  className = '',
}: {
  garment: Garment
  color?: string
  logo?: string | null
  className?: string
}) {
  const s = SHAPES[garment]
  const line = isLight(color) ? 'rgba(10,9,8,0.55)' : 'rgba(244,244,242,0.35)'
  const [x, y, w, h] = s.logo
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={garment}>
      {s.d.map((d, i) => (
        <path key={i} d={d} fill={color} stroke={line} strokeWidth="2" strokeLinejoin="round" />
      ))}
      {s.detail?.map((d, i) => (
        <path key={`d${i}`} d={d} fill="none" stroke={line} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {logo ? (
        <image href={logo} x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid meet" />
      ) : (
        <rect x={x} y={y} width={w} height={h} fill="none" stroke={line} strokeWidth="1.2" strokeDasharray="4 3" rx="2" />
      )}
    </svg>
  )
}
