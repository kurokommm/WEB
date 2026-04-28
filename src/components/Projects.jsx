import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import FadeIn from './FadeIn'
import SplitText from './SplitText'

const projects = [
  {
    title: 'Runtime Visualization System',
    tag: 'Real-time Visualization',
    description:
      'Real-time data extraction and rendering pipeline for process environments. Reads runtime memory to surface internal state structures and applies world-to-screen projection for overlay visualization.',
    tech: ['C++', 'DirectX', 'Linear Algebra'],
    accent: 'var(--accent)',
  },
  {
    title: 'Directional Computation Engine',
    tag: 'Engine Research',
    description:
      'Mathematical modeling system for angular computation and smooth interpolation in 3D space. Implements quaternion rotations, angular velocity estimation, and latency-compensated trajectory prediction.',
    tech: ['C++', '3D Math', 'Quaternions'],
    accent: 'var(--accent-2)',
  },
  {
    title: 'Process Memory Toolkit',
    tag: 'Low-level Tooling',
    description:
      'Low-level interaction framework for reading and writing process memory via ADB. Supports offset resolution, pointer chain traversal, and live structure inspection for research and analysis.',
    tech: ['C++', 'ADB', 'Python'],
    accent: 'var(--accent)',
  },
  {
    title: 'Il2Cpp Runtime Analyzer',
    tag: 'Reverse Engineering',
    description:
      'Automated analysis tool for Unity / Il2Cpp environments. Reconstructs class hierarchies, resolves method offsets, and maps managed-to-native structures for research and debugging purposes.',
    tech: ['C++', 'Il2Cpp', 'IDA Pro'],
    accent: 'var(--accent-2)',
  },
  {
    title: 'ImGui Overlay Framework',
    tag: 'Rendering System',
    description:
      'Standalone ImGui-based overlay framework with DirectX hook integration. Supports real-time data panels, 2D draw primitives, and configurable render pipeline composition.',
    tech: ['C++', 'ImGui', 'DirectX 11'],
    accent: 'var(--accent)',
  },
  {
    title: 'Binary Signature Resolver',
    tag: 'System Analysis',
    description:
      'Pattern scanning and signature-based offset resolver for Windows and Android processes. Handles ASLR and versioned binary targets without recompilation.',
    tech: ['C++', 'WinAPI', 'ADB'],
    accent: 'var(--accent-2)',
  },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl p-8 flex flex-col gap-5 transition-all duration-500 cursor-default"
      style={{
        background: 'rgba(255,255,255,0.015)',
        border: '1px solid var(--border)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--accent-glow)'
        e.currentTarget.style.borderColor = 'var(--border-accent)'
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 20px 60px var(--accent-glow)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.015)'
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'var(--accent-glow)', border: '1px solid var(--border-accent)' }}
        >
          <div className="w-2 h-2 rounded-full" style={{ background: project.accent }} />
        </div>
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: 'var(--text-secondary)', fontSize: '10px', letterSpacing: '0.2em' }}
        >
          {project.tag}
        </span>
      </div>

      <h3
        className="text-xl font-light"
        style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
      >
        {project.title}
      </h3>

      <p
        className="text-sm font-light leading-relaxed flex-1"
        style={{ color: 'var(--text-secondary)', lineHeight: 1.85 }}
      >
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs px-3 py-1 rounded-full"
            style={{
              background: 'var(--accent-glow)',
              color: project.accent,
              border: 'var(--border-accent)',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full py-40 px-6"
      style={{ background: 'rgba(4,4,8,0.78)' }}
    >
      <div className="max-w-6xl mx-auto">
        <SplitText
          text="Projects"
          by="char"
          delay={0}
          stagger={0.045}
          scrollTrigger
          as="p"
          className="text-xs tracking-[0.4em] uppercase mb-6"
          style={{ color: 'var(--accent)', letterSpacing: '0.35em' }}
        />

        <FadeIn delay={0.1} blur>
          <h2
            className="font-light mb-20"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              maxWidth: '600px',
            }}
            >
              Built where most<br />
              <span className="text-gradient">engineers don't look.</span>
            </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
