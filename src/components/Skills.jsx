import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from './SectionHeading'

const skills = [
  { name: 'C++ / Systems programming', level: 95 },
  { name: 'Memory management & offsets', level: 93 },
  { name: 'Reverse engineering', level: 90 },
  { name: 'Game engines (Unity / Il2Cpp)', level: 87 },
  { name: '3D math (vectors, matrices, quat)', level: 85 },
  { name: 'Real-time rendering & visualization', level: 82 },
  { name: 'ADB & low-level interaction', level: 78 },
]

const tools = [
  'C++',
  'IDA Pro',
  'x64dbg',
  'Cheat Engine',
  'Unity',
  'Il2Cpp',
  'ADB',
  'ImGui',
  'WinAPI',
  'Python',
  'CMake',
  'Git',
]

function SkillBar({ skill, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <span className="text-[14px] font-medium text-[var(--text-primary)]">{skill.name}</span>
        <span className="text-xs tabular-nums text-[var(--accent)]">{skill.level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.1, delay: index * 0.05 + 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, var(--accent-dim), var(--accent) 55%, var(--accent-2-dim))',
            boxShadow: '0 0 14px var(--accent-glow), 0 0 20px var(--accent-2-glow)',
          }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="section-surface relative border-t border-[var(--border)] py-20 md:py-28"
    >
      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8">
        <div data-gsap-reveal>
          <SectionHeading index="02" title="Capabilities" />
        </div>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6" data-gsap-reveal>
            <h2 className="font-display text-[clamp(1.65rem,3vw,2.35rem)] leading-tight tracking-tight text-[var(--text-primary)]">
              Depth where it matters: control surfaces, performance budgets, and shippable internal tools.
            </h2>

            <div className="mt-10 flex flex-col gap-7">
              {skills.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-6" data-gsap-reveal>
            <h3 className="mb-6 text-[13px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Tools & technologies
            </h3>

            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="chip-tool inline-block cursor-default rounded-sm px-3.5 py-2 text-[13px] font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>

            <div
              className="liquid-glass-card mt-10 rounded-[var(--radius-lg)] border border-[var(--border)] p-6 sm:p-8"
              style={{
                background:
                  'linear-gradient(145deg, rgba(212,168,83,0.09) 0%, rgba(94,234,212,0.05) 48%, rgba(20,19,17,0.6) 100%)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <p className="prose-muted text-[15px]">
                Specialized in engine research and system analysis — tools that read memory, reconstruct
                runtime structures, and render telemetry in real time for serious engineering workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
