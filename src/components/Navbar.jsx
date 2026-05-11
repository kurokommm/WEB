import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { NAV_LINKS, CTA_PRIMARY, SITE } from '../siteConfig'

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 24))
    return unsub
  }, [scrollY])

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const barShadow = scrolled || menuOpen
    ? '0 12px 48px -16px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,168,83,0.08)'
    : '0 8px 40px -20px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.05)'

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5"
    >
      <div
        className="pointer-events-auto mx-auto max-w-[1180px] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] transition-[box-shadow,background] duration-300"
        style={{
          background: 'var(--nav-bg-scrolled)',
          backdropFilter: 'blur(20px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.2)',
          boxShadow: barShadow,
        }}
      >
        <nav
          className="mx-auto flex h-[52px] items-center justify-between gap-4 px-4 sm:h-[56px] sm:px-6"
          aria-label="Primary"
        >
          <a
            href="#hero"
            onClick={closeMenu}
            className="group flex shrink-0 items-baseline gap-1 font-display text-[15px] font-semibold tracking-tight text-[var(--text-primary)] cursor-pointer"
          >
            <span>{SITE.brand.split(' ')[0]}</span>
            <span className="text-[var(--accent)]">.</span>
            <span className="text-[var(--text-secondary)] transition-colors duration-200 group-hover:text-[var(--text-primary)]">
              {SITE.brand.split(' ').slice(1).join(' ')}
            </span>
          </a>

          <ul className="hidden items-center gap-0.5 md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="cursor-pointer px-3 py-2 text-[13px] font-medium tracking-wide text-[var(--text-muted)] underline decoration-transparent decoration-2 underline-offset-[10px] transition-all duration-200 hover:text-[var(--text-primary)] hover:decoration-[var(--accent)]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={CTA_PRIMARY.href}
              onClick={closeMenu}
              className="btn-primary hidden px-5 py-2.5 text-[13px] md:inline-flex cursor-pointer"
            >
              {CTA_PRIMARY.label}
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)]/80 text-[var(--text-primary)] transition-colors duration-200 hover:border-[var(--border-hover)] md:hidden cursor-pointer"
              aria-expanded={menuOpen}
              aria-controls="site-mobile-nav"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="site-mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-[var(--border)] px-4 py-5 sm:px-6 md:hidden"
            >
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={closeMenu}
                      className="block rounded-[var(--radius-md)] px-3 py-3 text-[16px] font-medium text-[var(--text-primary)] cursor-pointer transition-colors hover:bg-[var(--surface-raised)]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={CTA_PRIMARY.href}
                onClick={closeMenu}
                className="btn-primary mt-5 block w-full py-3.5 text-center text-sm font-semibold cursor-pointer"
              >
                {CTA_PRIMARY.label}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
