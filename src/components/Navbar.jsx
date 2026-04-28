import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const links = ['About', 'Skills', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 60))
    return unsub
  }, [scrollY])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(5,5,5,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : 'none',
      }}
    >
      <a
        href="#hero"
        className="text-sm font-medium tracking-[0.2em] uppercase"
        style={{ color: 'var(--text-primary)', letterSpacing: '0.15em' }}
      >
        Yassine <span style={{ color: 'var(--accent)' }}>Nime</span>
      </a>

      <ul className="hidden md:flex items-center gap-10">
        {links.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className="text-xs tracking-widest uppercase transition-colors duration-300"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="hidden md:block text-xs tracking-widest uppercase px-5 py-2 rounded-full transition-all duration-300"
        style={{
          border: '1px solid var(--border-accent)',
          color: 'var(--accent)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--accent-glow)'
          e.currentTarget.style.borderColor = 'var(--accent)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.borderColor = 'var(--border-accent)'
        }}
      >
        Hire me
      </a>
    </motion.nav>
  )
}
