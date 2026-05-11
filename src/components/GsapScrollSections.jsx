import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scroll choreography (Lenis-compatible):
 * - `[data-gsap-reveal]` — batched entrance (opacity + y), once, power3
 * - `[data-gsap-parallax]` — subtle scrubbed y (value ≈ 0.04–0.15 strength)
 */
export default function GsapScrollSections({ rootRef }) {
  useGSAP(
    () => {
      if (typeof window === 'undefined') return

      const root = rootRef?.current
      if (!root) return

      const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const revealNodes = gsap.utils.toArray(root.querySelectorAll('[data-gsap-reveal]'))
      const parallaxNodes = gsap.utils.toArray(root.querySelectorAll('[data-gsap-parallax]'))

      if (prefersReduce) {
        gsap.set([...revealNodes, ...parallaxNodes], { clearProps: 'transform,opacity,visibility' })
        revealNodes.forEach((el) => {
          gsap.set(el, { autoAlpha: 1, y: 0, scale: 1 })
        })
        return
      }

      if (revealNodes.length) {
        gsap.set(revealNodes, { autoAlpha: 0, y: 44, scale: 0.985, transformOrigin: '50% 80%' })

        ScrollTrigger.batch(revealNodes, {
          interval: 0.12,
          batchMax: 5,
          start: 'top 90%',
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.92,
              ease: 'expo.out',
              stagger: 0.1,
              overwrite: 'auto',
            })
          },
        })
      }

      // Work (03) — scroll choreography (scrubbed, no pin)
      // Adds a premium “cinematic” feel on top of reveal/parallax.
      const workSection = root.querySelector('[data-work-section]')
      if (workSection) {
        const glow = workSection.querySelector('[data-work-glow]')
        const title = workSection.querySelector('[data-work-title]')
        const lede = workSection.querySelector('[data-work-lede]')
        const cardsWrap = workSection.querySelector('[data-work-cards]')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: workSection,
            start: 'top 75%',
            end: 'bottom 30%',
            scrub: 1.1,
            invalidateOnRefresh: true,
          },
          defaults: { ease: 'none' },
        })

        if (glow) {
          tl.fromTo(glow, { autoAlpha: 0, scale: 0.98 }, { autoAlpha: 1, scale: 1 }, 0)
        }
        if (title) {
          tl.fromTo(title, { y: 10 }, { y: -10 }, 0)
        }
        if (lede) {
          tl.fromTo(lede, { y: 14 }, { y: -14 }, 0)
        }
        if (cardsWrap) {
          tl.fromTo(cardsWrap, { y: 18 }, { y: -18 }, 0)
        }
      }

      parallaxNodes.forEach((el) => {
        const raw = Number.parseFloat(el.getAttribute('data-gsap-parallax') || '0.1')
        const strength = Math.min(0.22, Math.max(0.03, Number.isFinite(raw) ? raw : 0.1))
        const travel = strength * 110
        const trigger = el.closest('section') || el

        gsap.fromTo(
          el,
          { y: travel * 0.4 },
          {
            y: -travel * 0.4,
            ease: 'none',
            scrollTrigger: {
              trigger,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.15,
              invalidateOnRefresh: true,
            },
          },
        )
      })
    },
    { scope: rootRef },
  )

  return null
}
