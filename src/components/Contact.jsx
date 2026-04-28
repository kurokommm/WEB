import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from './FadeIn'
import SplitText from './SplitText'

const socials = [
  { label: 'GitHub', href: '#', hint: 'github.com/yassine-nime' },
  { label: 'Discord', href: '#', hint: 'yassine.nime' },
  { label: 'Telegram', href: '#', hint: '@yassine_nime' },
]

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1800)
  }

  const inputBase = {
    width: '100%',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '16px 18px',
    color: 'var(--text-primary)',
    fontSize: '14px',
    fontFamily: 'inherit',
    fontWeight: 300,
    outline: 'none',
    transition: 'all 0.3s ease',
  }

  const focusStyle = {
    borderColor: 'var(--border-accent)',
    background: 'var(--accent-glow)',
  }

  return (
    <section
      id="contact"
      className="relative w-full py-40 px-6"
      style={{
        background: 'rgba(4,4,8,0.78)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="max-w-5xl mx-auto">
        <SplitText
          text="Contact"
          by="char"
          delay={0}
          stagger={0.05}
          scrollTrigger
          as="p"
          className="text-xs tracking-[0.4em] uppercase mb-6"
          style={{ color: 'var(--accent)', letterSpacing: '0.35em' }}
        />

        <div className="grid md:grid-cols-2 gap-20 items-start">
          <div>
            <FadeIn delay={0.1} blur>
              <h2
                className="font-light mb-8"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                }}
              >
                Let's build<br />
                <span className="text-gradient">something serious.</span>
              </h2>
            </FadeIn>

            <div className="text-sm font-light mb-12" style={{ color: 'var(--text-secondary)', lineHeight: 2 }}>
              <SplitText
                text="If your project demands system-level precision — memory interaction, engine research, or real-time tooling — reach out. I work with people who take quality seriously."
                by="word"
                delay={0.2}
                stagger={0.03}
                scrollTrigger
              />
            </div>

            <div className="flex flex-col gap-0">
              {socials.map((s, i) => (
                <FadeIn key={s.label} delay={0.3 + i * 0.08}>
                  <a
                    href={s.href}
                    className="flex items-center justify-between py-5 transition-all duration-300 group"
                    style={{ borderBottom: '1px solid var(--border)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.paddingLeft = '8px'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.paddingLeft = '0px'
                    }}
                  >
                    <span className="text-sm font-light" style={{ color: 'var(--text-primary)' }}>
                      {s.label}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {s.hint}
                    </span>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn delay={0.2} direction="left">
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center text-center gap-6 rounded-2xl p-14"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-glow), var(--accent-2-glow))',
                    border: '1px solid var(--border-accent)',
                    minHeight: '380px',
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--accent-glow)', border: '1px solid var(--border-accent)' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10l4.5 4.5L16 6" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-base font-light mb-2" style={{ color: 'var(--text-primary)' }}>
                      Message received.
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      I'll respond shortly.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Name"
                      required
                      style={inputBase}
                      onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                      onBlur={(e) => Object.assign(e.target.style, { borderColor: 'var(--border)', background: 'rgba(255,255,255,0.02)' })}
                    />
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                      style={inputBase}
                      onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                      onBlur={(e) => Object.assign(e.target.style, { borderColor: 'var(--border)', background: 'rgba(255,255,255,0.02)' })}
                    />
                  </div>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about the project..."
                    required
                    rows={6}
                    style={{ ...inputBase, resize: 'none' }}
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, { borderColor: 'var(--border)', background: 'rgba(255,255,255,0.02)' })}
                  />

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl text-sm tracking-widest uppercase transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent-dim), var(--accent))',
                      color: '#fff',
                      fontFamily: 'inherit',
                      fontWeight: 400,
                      letterSpacing: '0.15em',
                      cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                      opacity: status === 'sending' ? 0.6 : 1,
                      boxShadow: '0 0 28px var(--accent-glow)',
                    }}
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </FadeIn>
        </div>
      </div>

      {/* Footer */}
      <div
        className="max-w-5xl mx-auto mt-32 pt-8"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        {/* Legal disclaimer */}
        <p
          className="text-xs font-light mb-8 leading-relaxed"
          style={{ color: 'var(--text-secondary)', opacity: 0.5, maxWidth: '680px', lineHeight: 1.9 }}
        >
          All projects and research presented on this site are intended for educational purposes,
          system analysis, and software engineering exploration only. I do not promote or engage
          in activities that violate software terms of service or applicable laws.
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Yassine <span style={{ color: 'var(--accent)' }}>Nime</span>
          </span>
          <span className="text-xs" style={{ color: 'var(--text-secondary)', opacity: 0.4 }}>
            © 2026
          </span>
        </div>
      </div>
    </section>
  )
}
