import { useRef } from 'react'
import { useLenisGsap } from './hooks/useLenisGsap'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import SiteFooter from './components/SiteFooter'
import BackgroundScene from './components/BackgroundScene'
import ScrollProgress from './components/ScrollProgress'
import MusicPlayer from './components/MusicPlayer'
import GsapScrollSections from './components/GsapScrollSections'

export default function PortfolioHome() {
  const contentRef = useRef(null)
  useLenisGsap()

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <BackgroundScene />
      <ScrollProgress />
      <MusicPlayer />
      <div ref={contentRef} className="relative min-h-screen">
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <SiteFooter />
      </div>
      <GsapScrollSections rootRef={contentRef} />
    </>
  )
}
