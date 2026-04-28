import { motion, AnimatePresence } from 'framer-motion'
import { useAudioEngine } from '../hooks/useAudioEngine'

function EqBars() {
  const bars = [
    { heights: [3, 12, 5, 14, 3], dur: 0.9 },
    { heights: [8,  3, 14, 4, 10], dur: 1.1 },
    { heights: [12, 6,  3, 10, 6], dur: 0.8 },
  ]
  return (
    <span className="flex items-end gap-[3px]" style={{ height: 14 }}>
      {bars.map((bar, i) => (
        <motion.span
          key={i}
          animate={{ height: bar.heights.map((h) => `${h}px`) }}
          transition={{ duration: bar.dur, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          style={{ display: 'block', width: 2.5, borderRadius: 2, background: 'var(--accent)' }}
        />
      ))}
    </span>
  )
}

export default function MusicPlayer() {
  const { playing, fading, toggle } = useAudioEngine()

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-8 right-8 z-50"
    >
      <motion.button
        onClick={toggle}
        disabled={fading}
        whileTap={{ scale: 0.94 }}
        className="flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-500"
        style={{
          background: playing ? 'rgba(22,214,116,0.08)' : 'rgba(255,255,255,0.03)',
          border: playing ? '1px solid rgba(22,214,116,0.25)' : '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(16px)',
          cursor: fading ? 'not-allowed' : 'pointer',
          boxShadow: playing ? '0 0 24px rgba(22,214,116,0.12)' : 'none',
        }}
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        <AnimatePresence mode="wait">
          {playing ? (
            <motion.span key="eq"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }}
            >
              <EqBars />
            </motion.span>
          ) : (
            <motion.span key="icon"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: fading ? 0.4 : 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ display: 'block' }}>
                <path d="M2 5h2.5L8 2v10L4.5 9H2V5z"
                  stroke="var(--text-secondary)" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
                <path d="M10 4.5c.8.7 1.3 1.6 1.3 2.5S10.8 8.8 10 9.5"
                  stroke="var(--text-secondary)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>

        <span
          className="text-xs tracking-widest uppercase"
          style={{
            color: playing ? 'var(--accent)' : 'var(--text-secondary)',
            letterSpacing: '0.18em',
            fontSize: '10px',
            transition: 'color 0.4s ease',
            minWidth: '3.6rem',
          }}
        >
          {fading ? 'Fading…' : playing ? 'a lot' : 'Music'}
        </span>
      </motion.button>
    </motion.div>
  )
}
