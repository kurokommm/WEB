import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.jsx'

gsap.registerPlugin(useGSAP)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig
      reducedMotion="user"
      transition={{ type: 'tween', duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <App />
    </MotionConfig>
  </StrictMode>,
)
