import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  const dotX = useSpring(mouseX, { stiffness: 900, damping: 40 })
  const dotY = useSpring(mouseY, { stiffness: 900, damping: 40 })
  const ringX = useSpring(mouseX, { stiffness: 140, damping: 20 })
  const ringY = useSpring(mouseY, { stiffness: 140, damping: 20 })
  const trailX = useSpring(mouseX, { stiffness: 60, damping: 18 })
  const trailY = useSpring(mouseY, { stiffness: 60, damping: 18 })

  const [isPointer, setIsPointer] = useState(false)
  const [isDown, setIsDown] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)

      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (el) {
        const hoverable = el.closest('a, button, [role="button"], input, textarea, label, select')
        const computed = window.getComputedStyle(el).cursor
        setIsPointer(!!hoverable || computed === 'pointer')
      }
    }

    const down = () => setIsDown(true)
    const up = () => setIsDown(false)
    const leave = () => setIsVisible(false)
    const enter = () => setIsVisible(true)

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
    }
  }, [mouseX, mouseY, isVisible])

  const base = {
    position: 'fixed',
    left: 0,
    top: 0,
    pointerEvents: 'none',
    zIndex: 10000,
    translateX: '-50%',
    translateY: '-50%',
  }

  return (
    <>
      {/* Outer glow trail */}
      <motion.div
        animate={{
          scale: isPointer ? 2.4 : isDown ? 0.6 : 1,
          opacity: isVisible ? (isPointer ? 0.12 : 0.06) : 0,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          ...base,
          x: trailX,
          y: trailY,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent), transparent 70%)',
          zIndex: 9997,
        }}
      />

      {/* Ring */}
      <motion.div
        animate={{
          scale: isDown ? 0.75 : isPointer ? 1.6 : 1,
          opacity: isVisible ? (isPointer ? 0.8 : 0.35) : 0,
          borderColor: isPointer ? 'var(--accent)' : 'rgba(161,161,170,0.45)',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        style={{
          ...base,
          x: ringX,
          y: ringY,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid rgba(161,161,170,0.35)',
          zIndex: 9998,
        }}
      />

      {/* Dot */}
      <motion.div
        animate={{
          scale: isDown ? 0.5 : isPointer ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.12 }}
        style={{
          ...base,
          x: dotX,
          y: dotY,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--accent)',
          boxShadow: '0 0 14px var(--accent), 0 0 4px var(--accent)',
          zIndex: 9999,
        }}
      />
    </>
  )
}
