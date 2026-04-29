'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Preloader() {
  // Default false on server — only flip to true after we confirm first-visit on client
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only show once per browser session
    const seen = sessionStorage.getItem('cd_intro_shown')
    if (seen) return

    setVisible(true)
    sessionStorage.setItem('cd_intro_shown', '1')

    // Total cover time before fade starts
    const hideTimer = setTimeout(() => setVisible(false), 1600)
    return () => clearTimeout(hideTimer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] bg-[#050505] flex items-center justify-center"
          aria-hidden="true"
        >
          <motion.img
            src="/logo-lockup-white.png"
            alt=""
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
            className="w-[180px] md:w-[240px] h-auto select-none"
            draggable={false}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
