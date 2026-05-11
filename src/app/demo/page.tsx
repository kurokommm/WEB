import { Link } from 'react-router-dom'

export default function ScrollDemoPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] px-6 py-10 text-[var(--text-primary)]">
      <Link to="/" className="text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline">
        ← Back to portfolio
      </Link>
      <h1 className="mt-6 font-display text-2xl tracking-tight">Scroll demo</h1>
      <p className="mt-2 max-w-md text-sm text-[var(--text-muted)]">
        Placeholder route. Replace this page with your scroll experiment when ready.
      </p>
    </div>
  )
}
