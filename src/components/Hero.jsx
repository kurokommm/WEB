import { motion } from 'framer-motion'
import HeroScene from './HeroScene'
import SplitText from './SplitText'

const sentence = 'Precision at the system level. Engineering beyond the visible layer.'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Dual radial glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 55% 55% at 38% 52%, var(--accent-glow) 0%, transparent 65%)',
            'radial-gradient(ellipse 45% 45% at 62% 50%, var(--accent-2-glow) 0%, transparent 65%)',
          ].join(', '),
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 select-none">

        {/* "Portfolio" — character stagger */}
        <SplitText
          text="Portfolio"
          by="char"
          delay={0.2}
          stagger={0.045}
          as="p"
          className="text-xs tracking-[0.4em] uppercase mb-8"
          style={{ color: 'var(--accent)', letterSpacing: '0.35em' }}
        />

        {/* Main title — blur + scale reveal (preserves gradient) */}
        <motion.h1
          initial={{ opacity: 0, y: 44, filter: 'blur(24px)', scale: 1.06 }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 1.15, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="text-gradient-dual font-light"
          style={{
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
          }}
        >
          Yassine Nime
        </motion.h1>

        {/* Tagline — word stagger */}
        <div className="mt-4">
          <SplitText
            text="Developer  ·  Systems Engineer  ·  Reverse Specialist"
            by="word"
            delay={0.85}
            stagger={0.055}
            as="p"
            className="text-sm tracking-widest uppercase"
            style={{ color: 'var(--text-primary)', letterSpacing: '0.25em' }}
          />
        </div>

        {/* Description — word stagger */}
        <div className="mt-10 max-w-sm text-base font-light" style={{ color: 'var(--text-primary)', lineHeight: 1.8 }}>
          <SplitText
            text={sentence}
            by="word"
            delay={1.15}
            stagger={0.04}
          />
        </div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex gap-4 mt-12"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-full text-xs tracking-widest uppercase transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, var(--accent-dim), var(--accent))',
              color: '#fff',
              boxShadow: '0 0 28px var(--accent-glow)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 48px var(--accent-glow), 0 0 80px var(--accent-2-glow)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 28px var(--accent-glow)')}
          >
            View Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full text-xs tracking-widest uppercase transition-all duration-300"
            style={{
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--text-secondary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
              e.currentTarget.style.color = 'var(--text-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            Contact
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'var(--text-secondary)' }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ letterSpacing: '0.3em', fontSize: '10px' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(to bottom, var(--accent), var(--accent-2), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
