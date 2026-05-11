import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

export default function FadeIn({ children, delay = 0, direction = 'up', blur = false, className = '', style = {} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduceMotion = useReducedMotion()

  const variants = reduceMotion
    ? {
        hidden: { opacity: 0.001 },
        visible: {
          opacity: 1,
          transition: { duration: 0.2, delay: Math.min(delay, 0.15) },
        },
      }
    : {
        hidden: {
          opacity: 0,
          y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
          x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
          filter: blur ? 'blur(14px)' : 'blur(0px)',
        },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 0.72,
            delay,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
