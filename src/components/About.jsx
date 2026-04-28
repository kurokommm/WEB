import FadeIn from './FadeIn'
import SplitText from './SplitText'

const traits = [
  { label: 'Specialization', value: 'Low-level systems & runtime analysis' },
  { label: 'Domain',         value: 'Reverse engineering & system research' },
  { label: 'Environment',    value: 'Unity / Il2Cpp, real-time 3D architectures' },
  { label: 'Approach',       value: 'Precision, efficiency, deep system awareness' },
]

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full py-40 px-6"
      style={{ background: 'rgba(4,4,8,0.78)' }}
    >
      {/* Divider line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(124,106,255,0.3))' }}
      />

      <div className="max-w-5xl mx-auto">
        <SplitText
          text="About"
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
                Engineering beyond<br />
                <span className="text-gradient">the visible layer.</span>
              </h2>
            </FadeIn>

            <div className="text-base font-light leading-relaxed mb-6" style={{ color: 'var(--text-secondary)', lineHeight: 2 }}>
              <SplitText
                text="I am Yassine Nime — a developer specialized in low-level systems, reverse engineering, and performance-driven architectures. My work focuses on understanding how software functions at its core: from memory structures and runtime engines to real-time rendering and spatial transformations."
                by="word"
                delay={0.2}
                stagger={0.03}
                scrollTrigger
              />
            </div>

            <div className="text-base font-light leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: 2 }}>
              <SplitText
                text="I design solutions involving runtime memory analysis, engine research in Unity / Il2Cpp environments, real-time data visualization, and 3D mathematical modeling — vectors, matrices, quaternion rotations. Every tool I build is engineered for precision and performance."
                by="word"
                delay={0.3}
                stagger={0.03}
                scrollTrigger
              />
            </div>
          </div>

          <div className="flex flex-col gap-0">
            {traits.map((trait, i) => (
              <FadeIn key={trait.label} delay={0.15 + i * 0.1} direction="left">
                <div
                  className="flex flex-col gap-1 py-6 transition-all duration-300"
                  style={{ borderBottom: '1px solid var(--border)' }}
                >
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{ color: 'var(--accent)', letterSpacing: '0.2em', fontSize: '11px' }}
                  >
                    {trait.label}
                  </span>
                  <span
                    className="text-base font-light"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {trait.value}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
