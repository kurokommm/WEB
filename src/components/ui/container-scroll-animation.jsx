/**
 * Container scroll animation — adapted from 21st.dev component library
 * (Aceternity-style 3D card reveal via Framer Motion useScroll / useTransform).
 */
import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

function ScrollCardHeader({ translate, titleComponent }) {
  return (
    <motion.div style={{ y: translate }} className="mx-auto max-w-5xl text-center">
      {titleComponent}
    </motion.div>
  )
}

function ScrollCardFrame({ rotate, scale, children }) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 rgba(0,0,0,0.18), 0 12px 28px rgba(0,0,0,0.35), 0 48px 48px rgba(0,0,0,0.22)',
      }}
      className={cn(
        'mx-auto -mt-10 h-[28rem] w-full max-w-5xl rounded-[28px] border-2 border-[var(--border)] bg-[var(--surface-raised)] p-2 md:-mt-12 md:h-[38rem] md:p-5',
      )}
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-[var(--bg-subtle)] ring-1 ring-[var(--border)] md:rounded-2xl md:p-3">
        <div className="pointer-events-auto relative h-full w-full">{children}</div>
      </div>
    </motion.div>
  )
}

export function ContainerScroll({ titleComponent, children, className }) {
  const containerRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const rotate = useTransform(scrollYProgress, [0, 1], [18, 0])
  const translate = useTransform(scrollYProgress, [0, 1], [0, -72])
  const scale = useTransform(scrollYProgress, (p) => {
    const start = isMobile ? 0.72 : 1.04
    const end = isMobile ? 0.92 : 1
    return start + (end - start) * p
  })

  if (reduceMotion) {
    return (
      <div
        ref={containerRef}
        className={cn(
          'relative flex min-h-[36rem] items-center justify-center p-2 md:min-h-[44rem] md:p-10',
          className,
        )}
      >
        <div className="w-full py-8 md:py-16">
          <div className="mx-auto max-w-5xl text-center">{titleComponent}</div>
          <div
            className={cn(
              'mx-auto mt-10 h-[28rem] w-full max-w-5xl rounded-[28px] border-2 border-[var(--border)] bg-[var(--surface-raised)] p-2 md:h-[38rem] md:p-5',
            )}
          >
            <div className="h-full w-full overflow-hidden rounded-2xl bg-[var(--bg-subtle)] ring-1 ring-[var(--border)] md:rounded-2xl md:p-3">
              <div className="pointer-events-auto relative h-full w-full">{children}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex h-[52rem] items-center justify-center p-2 md:h-[68rem] md:p-12',
        className,
      )}
    >
      <div
        className="relative w-full py-8 md:py-24"
        style={{ perspective: '1000px' }}
      >
        <ScrollCardHeader translate={translate} titleComponent={titleComponent} />
        <ScrollCardFrame rotate={rotate} scale={scale}>
          {children}
        </ScrollCardFrame>
      </div>
    </div>
  )
}
