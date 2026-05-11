import { useCallback, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Spotlight } from '@/components/ui/spotlight'
import { SplineScene } from '@/components/ui/splite'
import { HERO_SPLINE_ANGRY, HERO_SPLINE_SCENE, HERO_VISUAL, SITE } from '../siteConfig'

const fade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export default function Hero() {
  const visualRef = useRef(null)
  const heroShakeRef = useRef(null)
  const splineAppRef = useRef(null)
  const [rageFlash, setRageFlash] = useState(false)
  const reduceMotion = useReducedMotion()

  const triggerHeroAngry = useCallback(
    (e) => {
      const t = e?.target
      if (t && typeof t.closest === 'function' && t.closest('a, button, input, textarea, select')) {
        return
      }

      try {
        const app = splineAppRef.current
        const { target, event } = HERO_SPLINE_ANGRY
        if (app && target) {
          app.emitEvent(event, target)
        }
      } catch {
        /* Object or event missing in Spline scene */
      }

      if (reduceMotion) return

      setRageFlash(true)
      window.setTimeout(() => setRageFlash(false), 450)

      const el = heroShakeRef.current
      if (!el) return
      gsap.killTweensOf(el)
      const tl = gsap.timeline()
      tl.to(el, { x: -9, rotation: -1, duration: 0.07, ease: 'power2.out' })
        .to(el, { x: 9, rotation: 1, duration: 0.07, ease: 'power2.inOut' })
        .to(el, { x: -6, rotation: -0.65, duration: 0.07, ease: 'power2.inOut' })
        .to(el, { x: 6, rotation: 0.65, duration: 0.07, ease: 'power2.inOut' })
        .to(el, { x: -3, rotation: -0.3, duration: 0.06, ease: 'power2.inOut' })
        .to(el, { x: 0, rotation: 0, duration: 0.12, ease: 'power3.out' })
    },
    [reduceMotion],
  )

  useGSAP(
    () => {
      if (typeof window === 'undefined') return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const el = visualRef.current
      if (!el) return
      gsap.fromTo(
        el,
        { y: 32, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, delay: 0.15, ease: 'power3.out' },
      )
    },
    { scope: visualRef },
  )

  return (
    <section
      ref={heroShakeRef}
      id="hero"
      aria-labelledby="hero-heading"
      onClick={triggerHeroAngry}
      className="relative min-h-[100svh] w-full cursor-default overflow-x-clip pt-[5.5rem] sm:pt-[6.25rem]"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[8]"
        initial={false}
        animate={{
          opacity: rageFlash ? [0, 0.38, 0.14, 0] : 0,
        }}
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            'radial-gradient(ellipse 72% 58% at 50% 40%, rgba(220, 38, 38, 0.42), rgba(153, 27, 27, 0.14) 42%, transparent 72%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="mesh-grid absolute inset-0 opacity-[0.22]"
          data-gsap-parallax="0.045"
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            background: [
              'radial-gradient(ellipse 62% 48% at 14% 28%, rgba(212,168,83,0.09) 0%, transparent 58%)',
              'radial-gradient(ellipse 44% 36% at 86% 14%, rgba(94,234,212,0.06) 0%, transparent 54%)',
              'radial-gradient(ellipse 38% 30% at 70% 90%, rgba(250,250,249,0.04) 0%, transparent 50%)',
            ].join(', '),
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5.5rem)] max-w-[1180px] flex-col gap-14 px-5 pb-24 pt-10 sm:px-8 sm:pt-14 lg:min-h-[calc(100svh-6.25rem)] lg:flex-row lg:items-center lg:gap-16 lg:pb-28 lg:pt-8">
        <div className="flex flex-1 flex-col justify-center lg:max-w-[32.5rem]">
          <motion.p
            {...fade}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono-ui text-[11px] font-medium tracking-[0.22em] text-[var(--text-muted)]"
          >
            <span className="text-[var(--text-secondary)]">{SITE.brand.toUpperCase()}</span>
            <span className="text-[var(--text-muted)]"> · </span>
            <span className="text-[var(--accent)]">SYSTEMS</span>
          </motion.p>

          <motion.h1
            id="hero-heading"
            {...fade}
            transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mt-7 text-[clamp(2.1rem,5.8vw,3.35rem)] leading-[1.08] tracking-tight text-[var(--text-primary)]"
          >
            Low-level software &amp; runtime intelligence.
          </motion.h1>

          <motion.p
            {...fade}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-[30rem] text-[16px] leading-[1.65] text-[var(--text-secondary)]"
          >
            Memory layout, engine internals, Il2Cpp / Unity tooling, and evidence-backed analysis — built for teams
            that need clarity under constraints, not slide decks.
          </motion.p>

          <motion.div
            {...fade}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <motion.a
              href="#projects"
              className="btn-primary cursor-pointer px-7 py-3 text-[14px]"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            >
              Selected work
            </motion.a>
            <motion.a
              href="#contact"
              className="btn-outline cursor-pointer px-7 py-3 text-[14px]"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            >
              Contact
            </motion.a>
          </motion.div>

          <motion.dl
            {...fade}
            transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3"
          >
            <div className="liquid-glass-card px-5 py-5 sm:px-6 sm:py-6">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Mode
              </dt>
              <dd className="mt-2 text-[14px] font-medium text-[var(--text-primary)]">Contract &amp; advisory</dd>
            </div>
            <div className="liquid-glass-card px-5 py-5 sm:px-6 sm:py-6">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Stack
              </dt>
              <dd className="mt-2 text-[14px] font-medium text-[var(--text-primary)]">C++, Unity / Il2Cpp</dd>
            </div>
            <div className="liquid-glass-card px-5 py-5 sm:px-6 sm:py-6">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Timezone
              </dt>
              <dd className="mt-2 text-[14px] font-medium text-[var(--text-primary)]">Remote · EU-friendly</dd>
            </div>
          </motion.dl>
        </div>

        <div
          ref={visualRef}
          className="relative w-full flex-1 lg:max-w-[560px] lg:flex-shrink-0 xl:max-w-[620px]"
        >
          <div
            className="relative mx-auto aspect-[1/1] max-h-[min(68vh,540px)] w-full overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] ring-1 ring-inset ring-[rgba(212,168,83,0.12)] sm:aspect-[5/6] sm:max-h-[min(72vh,580px)]"
            style={{
              boxShadow:
                '0 32px 80px -36px rgba(0,0,0,0.88), 0 0 80px -24px rgba(212,168,83,0.12), 0 0 48px -20px rgba(94,234,212,0.08)',
            }}
          >
            <Spotlight className="-top-32 left-0 md:-top-16 md:left-12" fill="rgba(250,250,249,0.85)" />
            <div className="relative z-[2] flex h-full w-full items-center justify-center p-1">
              <div
                className="h-full w-full origin-[50%_52%] scale-[1.06] will-change-transform sm:scale-[1.1] lg:scale-[1.14]"
                data-gsap-parallax="0.1"
              >
                <SplineScene
                  scene={HERO_SPLINE_SCENE}
                  className="h-full w-full min-h-[260px] !rounded-[calc(var(--radius-xl)-4px)] !border-0 !bg-transparent !shadow-none"
                  renderOnDemand
                  followMouse="viewport"
                  followIntensity={{ x: 28, y: 34 }}
                  onSplineReady={(app) => {
                    splineAppRef.current = app
                  }}
                />
              </div>
            </div>
          </div>
          <p className="sr-only">{HERO_VISUAL.ariaScene}</p>
          <div className="mt-5 space-y-3 text-center lg:text-left">
            <p className="inline-flex items-center justify-center gap-2 lg:justify-start">
              <span
                className="rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.03)] px-3 py-1 font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]"
                aria-hidden
              >
                {HERO_VISUAL.badge}
              </span>
            </p>
            <p className="font-display text-[15px] font-semibold tracking-tight text-[var(--text-primary)] sm:text-base">
              {HERO_VISUAL.headline}
            </p>
            <p className="max-w-md text-[13px] leading-relaxed text-[var(--text-secondary)] lg:max-w-none">
              {HERO_VISUAL.caption}
            </p>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[var(--text-muted)]">Scroll</span>
        <span className="h-9 w-px rounded-full bg-gradient-to-b from-[var(--accent)] via-[var(--accent-2)] to-transparent opacity-75" />
      </motion.div>
    </section>
  )
}
