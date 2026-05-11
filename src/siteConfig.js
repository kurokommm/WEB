/** Single source of truth for navigation, branding, and footer links. */
export const SITE = {
  brand: 'Yassine Nime',
  tagline: 'Systems & runtime engineering',
  copyrightYear: 2026,
}

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const CTA_PRIMARY = { label: 'Schedule a call', href: '#contact' }

/** Spline scene (.splinecode) — hero robot / interactive block */
export const HERO_SPLINE_SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

/**
 * Click “angry” reaction on the 3D character: set `target` to the object **name or uuid**
 * from Spline (Develop pane), and wire a **mouseDown** (or hover) event on that object in the editor.
 * Leave `target` empty to keep UI-only shake + flash.
 */
export const HERO_SPLINE_ANGRY = {
  target: '',
  event: 'mouseDown',
}

/** Hero 3D panel — executive caption (not marketing fluff) */
export const HERO_VISUAL = {
  badge: 'Live scene',
  headline: 'Spatial craft, distilled.',
  caption:
    'A real-time, cursor-aware preview — abstracting depth, control surfaces, and systems thinking into a single focal object. Built to signal rigor before the first line of code is discussed.',
  ariaScene:
    'Interactive three-dimensional scene. Pointer movement subtly orients the view — illustrative of precision tooling and runtime-aware engineering.',
}

export const SOCIAL_LINKS = [
  { label: 'GitHub', href: '#', hint: 'github.com/yassine-nime' },
  { label: 'Discord', href: '#', hint: 'yassine.nime' },
  { label: 'Telegram', href: '#', hint: '@yassine_nime' },
]
