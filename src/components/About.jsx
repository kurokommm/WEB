import { useRef, useEffect, useState } from 'react'
import { useInView, animate, useReducedMotion } from 'framer-motion'
import SectionHeading from './SectionHeading'

const stats = [
  { value: 5, suffix: '+', label: 'Years experience' },
  { value: 10, suffix: '+', label: 'Systems shipped' },
  { value: 3, suffix: '', label: 'Core domains' },
]

function Counter({ value, suffix, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [displayed, setDisplayed] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      setDisplayed(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplayed(Math.round(v)),
    })
    return controls.stop
  }, [inView, value, delay, reduceMotion])

  return (
    <span ref={ref} className="tabular-nums">
      {displayed}
      {suffix}
    </span>
  )
}

const traits = [
  { label: 'Specialization', value: 'Low-level systems & runtime analysis' },
  { label: 'Domain', value: 'Reverse engineering & system research' },
  { label: 'Environment', value: 'Unity / Il2Cpp, real-time 3D' },
  { label: 'Approach', value: 'Precision, efficiency, deep system awareness' },
]

export default function About() {
  return (
    <section
      id="about"
      className="section-surface relative border-t border-[var(--border)] py-20 md:py-28"
    >
      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8">
        <div data-gsap-reveal>
          <SectionHeading index="01" title="About" />
        </div>

        <div className="mb-14 grid grid-cols-1 gap-3 sm:grid-cols-3 md:mb-20" data-gsap-reveal>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-card liquid-glass-card rounded-[var(--radius-lg)] border border-[var(--border)] px-6 py-8 text-center"
            >
              <div
                className="font-display text-3xl text-[var(--accent)] md:text-4xl"
                style={{ letterSpacing: '-0.04em' }}
              >
                <Counter value={stat.value} suffix={stat.suffix} delay={0.25 + i * 0.12} />
              </div>
              <div className="mt-2 text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16" data-gsap-reveal>
          <div className="lg:col-span-7">
            <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.5rem)] leading-tight tracking-tight text-[var(--text-primary)]">
              Beyond the surface: memory layouts, engines, and observable runtime behavior.
            </h2>

            <div className="mt-8 space-y-6">
              <p className="prose-muted max-w-xl text-[16px]">
                Yassine Nime — focused on low-level systems, reverse engineering, and performance-driven
                architectures. Work spans runtime memory, engine internals, and spatial math for real-time
                visualization.
              </p>
              <p className="prose-muted max-w-xl text-[16px]">
                Unity / Il2Cpp analysis, ADB-adjacent tooling, and 3D pipelines with vectors, matrices, and
                quaternions — for teams that need accuracy, not demos.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ul className="divide-y divide-[var(--border)] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
              {traits.map((trait) => (
                <li key={trait.label} className="px-6 py-5 sm:px-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    {trait.label}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-primary)]">{trait.value}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
