import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { SOCIAL_LINKS } from '../siteConfig'

const fieldClass =
  'w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors duration-200 hover:border-[var(--border-hover)] focus:border-[var(--border-accent)] focus:bg-[var(--surface-raised)]'

const labelClass = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]'

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1600)
  }

  return (
    <section
      id="contact"
      className="section-surface relative border-t border-[var(--border)] py-20 md:py-28"
    >
      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8">
        <div data-gsap-reveal>
          <SectionHeading index="04" title="Contact" />
        </div>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div data-gsap-reveal>
              <h2 className="font-display text-[clamp(1.65rem,3vw,2.5rem)] leading-tight tracking-tight text-[var(--text-primary)]">
                Discuss scope, constraints, and delivery expectations — before code is written.
              </h2>
              <p className="prose-muted mt-6 max-w-md text-[15px]">
                For memory-aware tooling, engine research, or real-time visualization: include context, timeline,
                and compliance boundaries. Initial response typically within two business days.
              </p>
            </div>

            <ul
              data-gsap-reveal
              className="mt-10 divide-y divide-[var(--border)] border-t border-[var(--border)]"
            >
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="flex items-center justify-between gap-4 py-4 text-sm transition-colors hover:text-[var(--accent-bright)] cursor-pointer"
                  >
                    <span className="font-medium text-[var(--text-primary)]">{s.label}</span>
                    <span className="text-right text-[13px] text-[var(--text-muted)]">{s.hint}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7" data-gsap-reveal>
            <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex min-h-[360px] flex-col items-center justify-center gap-5 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] px-8 py-14 text-center"
                    style={{ boxShadow: 'var(--shadow-card)' }}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border-accent)] bg-[var(--accent-subtle)]">
                      <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden>
                        <path
                          d="M4 10l4.5 4.5L16 6"
                          stroke="var(--accent)"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-base font-medium text-[var(--text-primary)]">Message received.</p>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">I&apos;ll get back to you shortly.</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
                    style={{ boxShadow: 'var(--shadow-card)' }}
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className={labelClass}>
                          Full name
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          autoComplete="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Jane Doe"
                          required
                          className={fieldClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className={labelClass}>
                          Work email
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="name@company.com"
                          required
                          className={fieldClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className={labelClass}>
                        Project brief
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Objectives, technical environment, timeline, and any compliance requirements."
                        required
                        rows={6}
                        className={`${fieldClass} resize-none`}
                        aria-describedby="contact-message-hint"
                      />
                      <p id="contact-message-hint" className="mt-2 text-[12px] leading-relaxed text-[var(--text-muted)]">
                        Please do not include credentials or proprietary binaries in this form.
                      </p>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileTap={{ scale: 0.99 }}
                      className="btn-primary mt-2 w-full cursor-pointer py-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-55"
                    >
                      {status === 'sending' ? 'Sending…' : 'Send message'}
                    </motion.button>
                  </motion.form>
                )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
