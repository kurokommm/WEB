import { useRef, useState, useCallback, useEffect } from 'react'

const FADE_IN_MS  = 2500
const FADE_OUT_MS = 2500
const TARGET_VOL  = 0.75

export function useAudioEngine() {
  const [playing, setPlaying] = useState(false)
  const [fading,  setFading]  = useState(false)

  const audioRef     = useRef(null)
  const rafRef       = useRef(null)
  const startedRef   = useRef(false)

  const cancelRaf = () => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
  }

  const fadeIn = useCallback((audio) => {
    cancelRaf()
    audio.volume = 0
    const t0 = performance.now()
    const tick = (now) => {
      const p      = Math.min((now - t0) / FADE_IN_MS, 1)
      const eased  = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p
      audio.volume = eased * TARGET_VOL
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
      else { audio.volume = TARGET_VOL; rafRef.current = null }
    }
    rafRef.current = requestAnimationFrame(tick)
    setPlaying(true)
    setFading(false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const tryPlay = useCallback((audio) => {
    if (startedRef.current) return
    startedRef.current = true
    audio.play()
      .then(() => fadeIn(audio))
      .catch(() => {
        // Browser blocked autoplay — start on first interaction
        startedRef.current = false
        const resume = () => {
          if (startedRef.current) return
          startedRef.current = true
          audio.play().then(() => fadeIn(audio)).catch(() => {})
          document.removeEventListener('click',      resume)
          document.removeEventListener('keydown',    resume)
          document.removeEventListener('touchstart', resume)
        }
        document.addEventListener('click',      resume, { once: true })
        document.addEventListener('keydown',    resume, { once: true })
        document.addEventListener('touchstart', resume, { once: true })
      })
  }, [fadeIn])

  // Create audio once on mount and autoplay
  useEffect(() => {
    const audio      = new Audio('/music.mp3')
    audio.loop       = true
    audio.volume     = 0
    audio.preload    = 'auto'
    audioRef.current = audio
    tryPlay(audio)
    return () => {
      cancelRaf()
      audio.pause()
      audio.src = ''
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const stop = useCallback(() => {
    const audio = audioRef.current
    if (!audio || fading) return
    setFading(true)
    cancelRaf()
    const startVol = audio.volume
    const t0       = performance.now()
    const tick = (now) => {
      const p = Math.min((now - t0) / FADE_OUT_MS, 1)
      audio.volume = startVol * (1 - p)
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        audio.volume = 0; audio.pause(); audio.currentTime = 0
        rafRef.current = null
        setPlaying(false); setFading(false)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [fading]) // eslint-disable-line react-hooks/exhaustive-deps

  const start = useCallback(() => {
    const audio = audioRef.current
    if (!audio || fading) return
    audio.play().then(() => fadeIn(audio)).catch(() => {})
  }, [fading, fadeIn])

  const toggle = useCallback(() => {
    if (playing) stop()
    else         start()
  }, [playing, start, stop])

  return { playing, fading, toggle }
}
