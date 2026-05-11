/** Section marker — liquid-glass editorial rhythm */
export default function SectionHeading({ index, title }) {
  return (
    <header className="mb-14 md:mb-[4.5rem]">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="font-mono-ui text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
          <span className="tabular-nums text-[var(--accent)]">{index}</span>
          <span className="mx-2.5 text-[var(--border-hover)]">—</span>
          <span className="text-[var(--text-secondary)]">{title}</span>
        </p>
        <span
          className="hidden h-px min-w-[3rem] flex-1 bg-gradient-to-r from-[var(--border-hover)] to-transparent sm:block"
          aria-hidden
        />
      </div>
      <div
        className="mt-7 h-[2px] w-20 rounded-full bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-transparent opacity-90 shadow-[0_0_24px_rgba(212,168,83,0.25)]"
        aria-hidden
      />
    </header>
  )
}
