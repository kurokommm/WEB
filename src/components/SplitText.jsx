import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const makeContainerVariants = (delay, stagger) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
})

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
}

const charVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function SplitText({
  text,
  className = '',
  style = {},
  by = 'word',
  delay = 0,
  stagger,
  scrollTrigger = false,
  as: Tag = 'span',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const shouldAnimate = scrollTrigger ? inView : true

  const defaultStagger = by === 'char' ? 0.035 : 0.065
  const s = stagger ?? defaultStagger

  const words = text.split(' ')

  return (
    <Tag ref={ref} className={className} style={style} aria-label={text}>
      <motion.span
        variants={makeContainerVariants(delay, s)}
        initial="hidden"
        animate={shouldAnimate ? 'visible' : 'hidden'}
        style={{ display: 'inline' }}
      >
        {by === 'word'
          ? words.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                style={{ display: 'inline-block' }}
              >
                {word}{i < words.length - 1 ? '\u00A0' : ''}
              </motion.span>
            ))
          : text.split('').map((char, i) => (
              <motion.span
                key={i}
                variants={charVariants}
                style={{ display: 'inline-block', whiteSpace: 'pre' }}
              >
                {char}
              </motion.span>
            ))}
      </motion.span>
    </Tag>
  )
}
