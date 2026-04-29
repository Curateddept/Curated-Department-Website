'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Classic pixelated arrow — 16-bit OS style pointer.
// Built from rects so it stays sharp at any size.
function PixelArrow({ size = 56 }: { size?: number }) {
  // Each cell is one "pixel" — 12 wide, 18 tall grid
  const cellW = size / 12
  const cellH = size / 18

  // Black filled cells — the arrow shape
  const cells: Array<[number, number, number, number]> = [
    // [x, y, w, h] in grid units
    // Left vertical edge
    [0, 0, 1, 14],
    // Top diagonal — descending right
    [1, 1, 1, 1], [2, 2, 1, 1], [3, 3, 1, 1], [4, 4, 1, 1],
    [5, 5, 1, 1], [6, 6, 1, 1], [7, 7, 1, 1], [8, 8, 1, 1],
    [9, 9, 1, 1],
    // Right horizontal piece (bottom of arrowhead diagonal)
    [9, 9, 1, 1], [8, 9, 2, 1],
    // Inner notch back to tail
    [4, 9, 1, 1], [5, 10, 1, 1],
    [4, 10, 1, 1],
    // Tail right edge
    [6, 10, 1, 1], [7, 11, 1, 1],
    [6, 11, 1, 1], [7, 12, 1, 1],
    [6, 12, 1, 1], [7, 13, 1, 1],
    // Tail bottom
    [4, 13, 4, 1],
    // Tail left edge
    [4, 10, 1, 4],
    // Bottom of arrow body (close shape)
    [1, 13, 1, 1], [2, 13, 1, 1], [3, 13, 1, 1],
    // Stair-step inside
    [1, 12, 2, 1],
    [1, 11, 1, 1], [2, 11, 1, 1],
  ]

  const renderCells = (offsetX = 0, offsetY = 0, color = '#000') =>
    cells.map(([x, y, w, h], i) => (
      <rect
        key={`${color}-${i}`}
        x={x * cellW + offsetX}
        y={y * cellH + offsetY}
        width={w * cellW}
        height={h * cellH}
        fill={color}
        shapeRendering="crispEdges"
      />
    ))

  return (
    <svg
      width={size + 4}
      height={size + 4}
      viewBox={`0 0 ${size + 4} ${size + 4}`}
      style={{ display: 'block' }}
    >
      {/* RGB chromatic aberration — red shifted left, cyan shifted right */}
      <g style={{ mixBlendMode: 'screen', opacity: 0.85 }}>
        {renderCells(0, 0, '#FF003C')}
      </g>
      <g style={{ mixBlendMode: 'screen', opacity: 0.85 }}>
        {renderCells(3, 0, '#00E5FF')}
      </g>
      {/* Solid black arrow on top */}
      <g>{renderCells(1.5, 0, '#000')}</g>
      {/* White fill inside the arrow */}
      <g>
        <polygon
          points={`${1.5 + cellW * 1},${0}
                   ${1.5 + cellW * 1},${cellH * 13}
                   ${1.5 + cellW * 4},${cellH * 10}
                   ${1.5 + cellW * 9},${cellH * 10}`}
          fill="#FFFFFF"
          shapeRendering="crispEdges"
        />
      </g>
    </svg>
  )
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  const x = useSpring(mouseX, { damping: 30, stiffness: 500, mass: 0.3 })
  const y = useSpring(mouseY, { damping: 30, stiffness: 500, mass: 0.3 })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setEnabled(mq.matches)
    const onChange = () => setEnabled(mq.matches)
    mq.addEventListener?.('change', onChange)

    if (!mq.matches) return

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target?.closest('a, button, [role="button"], iframe, input, textarea, select, label')
      setHovering(!!interactive)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    document.body.classList.add('cursor-hidden')

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.body.classList.remove('cursor-hidden')
      mq.removeEventListener?.('change', onChange)
    }
  }, [mouseX, mouseY])

  if (!enabled) return null

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{
        x,
        y,
        scale: hovering ? 1.4 : 1,
        transition: 'scale 0.18s cubic-bezier(0.33, 1, 0.68, 1)',
      }}
    >
      <PixelArrow size={56} />
    </motion.div>
  )
}
