import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function prefersReducedMotion() {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Lenis + GSAP ScrollTrigger (official integration pattern).
 * When the user prefers reduced motion, Lenis is disabled and native scroll drives ScrollTrigger.
 */
export function useLenisGsap() {
  useEffect(() => {
    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 140)
    }
    window.addEventListener('resize', onResize)

    if (prefersReducedMotion()) {
      requestAnimationFrame(() => ScrollTrigger.refresh())
      return () => {
        clearTimeout(resizeTimer)
        window.removeEventListener('resize', onResize)
      }
    }

    const lenis = new Lenis({
      duration: 1.12,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      gsap.ticker.remove(tick)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])
}
