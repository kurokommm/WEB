import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import type { Application } from '@splinetool/runtime'

const Spline = lazy(() => import('@splinetool/react-spline'))

export interface SplineSceneProps {
  scene: string
  className?: string
  renderOnDemand?: boolean
  /** Fires when the runtime is ready — use for `emitEvent` (e.g. “angry” state). */
  onSplineReady?: (app: Application) => void
  /**
   * ميلان المشهد نحو المؤشر:
   * - `viewport` — حسب موقع الماوس على **الشاشة كاملة**
   * - `local` — فقط عندما يكون المؤشر فوق منطقة الـ Spline
   */
  followMouse?: false | 'viewport' | 'local'
  followIntensity?: { x: number; y: number }
}

export function SplineScene({
  scene,
  className,
  renderOnDemand,
  onSplineReady,
  followMouse = false,
  followIntensity = { x: 11, y: 16 },
}: SplineSceneProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [motionOk, setMotionOk] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setMotionOk(!mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!followMouse || !motionOk) return
    if (typeof window === 'undefined') return

    const { x: maxPitch, y: maxYaw } = followIntensity

    const onMove = (e: MouseEvent) => {
      let nx: number
      let ny: number

      if (followMouse === 'local') {
        const el = wrapRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        if (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        ) {
          setTilt({ x: 0, y: 0 })
          return
        }
        nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      } else {
        const w = window.innerWidth || 1
        const h = window.innerHeight || 1
        nx = (e.clientX / w - 0.5) * 2
        ny = (e.clientY / h - 0.5) * 2
      }

      setTilt({
        x: Math.max(-maxPitch, Math.min(maxPitch, -ny * maxPitch)),
        y: Math.max(-maxYaw, Math.min(maxYaw, nx * maxYaw)),
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [followMouse, followIntensity.x, followIntensity.y, motionOk])

  const useParallax = Boolean(followMouse) && motionOk

  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-[rgba(6,5,5,0.5)]">
          <span className="loader" aria-hidden />
          <span className="sr-only">Loading 3D scene</span>
        </div>
      }
    >
      <div
        ref={wrapRef}
        className="h-full w-full will-change-transform"
        style={
          useParallax
            ? {
                transform: `perspective(1400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.1s ease-out',
              }
            : undefined
        }
      >
        <Spline
          scene={scene}
          className={className}
          renderOnDemand={renderOnDemand}
          onLoad={(app) => onSplineReady?.(app)}
        />
      </div>
    </Suspense>
  )
}
