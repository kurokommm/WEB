import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import FadeIn from './FadeIn'
import SplitText from './SplitText'

const skills = [
  { name: 'C++ / Systems Programming',         level: 95, color: 'var(--accent)'   },
  { name: 'Memory Management & Offsets',        level: 93, color: 'var(--accent-2)' },
  { name: 'Reverse Engineering',                level: 90, color: 'var(--accent)'   },
  { name: 'Game Engine Systems (Unity/Il2Cpp)', level: 87, color: 'var(--accent-2)' },
  { name: '3D Math (Vectors, Matrices, Quat)',  level: 85, color: 'var(--accent)'   },
  { name: 'Real-Time Rendering & Visualization', level: 82, color: 'var(--accent-2)' },
  { name: 'ADB & Low-level Interaction',        level: 78, color: 'var(--accent)'   },
]

const tools = [
  'C++', 'IDA Pro', 'x64dbg', 'Cheat Engine',
  'Unity', 'Il2Cpp', 'ADB', 'ImGui',
  'WinAPI', 'Python', 'CMake', 'Git',
]

function SkillBar({ skill, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="flex justify-between items-center mb-3">
        <span
          className="text-sm font-light"
          style={{ color: 'var(--text-primary)' }}
        >
          {skill.name}
        </span>
        <span
          className="text-xs font-light tabular-nums"
          style={{ color: skill.color }}
        >
          {skill.level}%
        </span>
      </div>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: '1px', background: 'var(--border)' }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.4, delay: index * 0.08 + 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, transparent, ${skill.color})`,
            boxShadow: `0 0 10px ${skill.color}`,
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
      className="relative w-full py-40 px-6"
      style={{ background: 'rgba(4,4,8,0.78)' }}
    >
      <div className="max-w-5xl mx-auto">
        <SplitText
          text="Skills"
          by="char"
          delay={0}
          stagger={0.05}
          scrollTrigger
          as="p"
          className="text-xs tracking-[0.4em] uppercase mb-6"
          style={{ color: 'var(--accent)', letterSpacing: '0.35em' }}
        />

        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <FadeIn delay={0.1} blur>
              <h2
                className="font-light mb-14"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                }}
              >
                Control. Performance.<br />
                <span className="text-gradient">Depth.</span>
              </h2>
            </FadeIn>

            <div className="flex flex-col gap-8">
              {skills.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>

          <div>
            <FadeIn delay={0.2}>
              <h3
                className="font-light mb-10 text-sm tracking-widest uppercase"
                style={{ color: 'var(--text-secondary)', letterSpacing: '0.2em' }}
              >
                Tools & Technologies
              </h3>
            </FadeIn>

            <div className="flex flex-wrap gap-3">
              {tools.map((tool, i) => (
                <FadeIn key={tool} delay={0.1 + i * 0.04}>
                  <span
                    className="px-4 py-2 rounded-full text-xs transition-all duration-300 cursor-default"
                    style={{
                      border: '1px solid var(--border)',
                      color: 'var(--text-secondary)',
                      background: 'rgba(255,255,255,0.01)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-accent)'
                      e.currentTarget.style.color = 'var(--accent)'
                      e.currentTarget.style.background = 'var(--accent-glow)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.color = 'var(--text-secondary)'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.01)'
                    }}
                  >
                    {tool}
                  </span>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.5}>
              <div
                className="mt-14 p-8 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-glow), var(--accent-2-glow))',
                  border: '1px solid var(--border-accent)',
                }}
              >
                <p
                  className="text-sm font-light leading-relaxed"
                  style={{ color: 'var(--text-secondary)', lineHeight: 1.9 }}
                >
                  Specialized in engine research and system analysis — building tools
                  that interact with memory, reconstruct runtime structures, and
                  render data in real time. The kind of work that operates where
                  most engineers don't look.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
