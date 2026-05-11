import { NAV_LINKS, SITE, CTA_PRIMARY } from '../siteConfig'

export default function SiteFooter() {
  return (
    <footer
      className="relative z-10 border-t border-[var(--border)] bg-[var(--bg)]"
      aria-labelledby="site-footer-heading"
    >
      <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8">
        <h2 id="site-footer-heading" className="sr-only">
          Site footer
        </h2>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md" data-gsap-reveal>
            <p className="font-display text-lg tracking-tight text-[var(--text-primary)]">
              {SITE.brand}
              <span className="text-[var(--accent)]">.</span>
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-muted)]">{SITE.tagline}</p>
            <p className="mt-8 text-[12px] leading-relaxed text-[var(--text-muted)] opacity-90">
              Materials on this site illustrate engineering capability for educational context, authorized research,
              and lawful system analysis only.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-12 gap-y-8" data-gsap-reveal>
            <div>
              <p className="mb-4 font-mono-ui text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Index
              </p>
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-[14px] font-medium text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent-bright)] cursor-pointer"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 font-mono-ui text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Next step
              </p>
              <a
                href={CTA_PRIMARY.href}
                className="text-[14px] font-semibold text-[var(--accent)] transition-colors duration-200 hover:text-[var(--accent-bright)] cursor-pointer"
              >
                {CTA_PRIMARY.label}
              </a>
            </div>
          </nav>
        </div>
        <div
          data-gsap-reveal
          className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-8 text-[12px] text-[var(--text-muted)]"
        >
          <span className="tabular-nums">© {SITE.copyrightYear} {SITE.brand}</span>
          <a
            href="#hero"
            className="font-medium text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text-primary)] cursor-pointer"
          >
            Top
          </a>
        </div>
      </div>
    </footer>
  )
}
