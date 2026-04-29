import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        scaleX,
        transformOrigin: '0%',
        background: 'linear-gradient(90deg, var(--accent-dim), var(--accent), var(--accent-2))',
        zIndex: 10001,
        boxShadow: '0 0 10px var(--accent), 0 0 3px var(--accent-2)',
      }}
    />
  )
}
