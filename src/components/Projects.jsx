import SectionHeading from './SectionHeading'
import { projects } from '../data/projects'

function ProjectCard({ project }) {
  return (
    <article
      data-gsap-reveal
      className="group flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] transition-[border-color,box-shadow] duration-300 hover:border-[rgba(212,168,83,0.28)] hover:shadow-[0_28px_56px_-28px_rgba(0,0,0,0.72),0_0_48px_-20px_rgba(212,168,83,0.08)] md:min-h-[260px] md:flex-row"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      <div
        className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[var(--bg-subtle)] will-change-transform md:aspect-auto md:w-[44%] md:min-h-[260px]"
        data-gsap-parallax="0.07"
      >
        <div
          className="absolute inset-0 opacity-95 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={{
            background: [
              'radial-gradient(ellipse 85% 75% at 25% 25%, rgba(212,168,83,0.12) 0%, transparent 55%)',
              'radial-gradient(ellipse 70% 60% at 90% 70%, rgba(94,234,212,0.07) 0%, transparent 50%)',
              'linear-gradient(160deg, var(--surface-raised) 0%, var(--bg) 100%)',
            ].join(', '),
          }}
          aria-hidden
        />
        <div className="absolute inset-0 flex items-end justify-between gap-3 p-5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)]/90 text-[var(--accent)] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-sm bg-current opacity-90" aria-hidden />
          </span>
          <span className="max-w-[55%] text-right text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {project.tag}
          </span>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col justify-center p-6 sm:p-8">
        <h3 className="font-display text-xl leading-snug tracking-tight text-[var(--text-primary)] sm:text-2xl">
          {project.title}
        </h3>
        <p className="prose-muted mt-4 text-[15px] leading-relaxed">{project.description}</p>
        <div className="mt-6 flex flex-wrap gap-2 border-t border-[var(--border)] pt-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-[var(--border)] bg-[rgba(255,255,255,0.02)] px-3 py-1 text-[11px] font-medium text-[var(--text-secondary)] transition-colors duration-200 group-hover:border-[rgba(212,168,83,0.35)] group-hover:text-[var(--accent-bright)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="section-surface relative border-t border-[var(--border)] py-20 md:py-28"
      data-work-section
    >
      <div
        aria-hidden
        data-work-glow
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background: [
            'radial-gradient(ellipse 70% 45% at 18% 25%, rgba(212,168,83,0.12) 0%, transparent 58%)',
            'radial-gradient(ellipse 52% 38% at 90% 70%, rgba(94,234,212,0.08) 0%, transparent 55%)',
          ].join(', '),
        }}
      />
      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8">
        <div data-gsap-reveal data-work-title>
          <SectionHeading index="03" title="Work" />
        </div>

        <div data-gsap-reveal data-work-lede>
          <p className="mb-14 max-w-2xl text-[clamp(1.25rem,2.5vw,1.85rem)] leading-snug text-[var(--text-secondary)] md:mb-16">
            Engagements where{' '}
            <span className="font-medium text-[var(--text-primary)]">instrumentation and runtime evidence</span>{' '}
            shaped the outcome — not assumptions.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:gap-8" data-work-cards>
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
