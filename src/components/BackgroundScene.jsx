import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { useMouse } from '../hooks/useMouse'

function useScroll() {
  const scroll = useRef(0)
  const target = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      target.current = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const update = (delta) => {
    scroll.current += (target.current - scroll.current) * Math.min(delta * 3, 1)
  }

  return { scroll, update }
}

function Scene() {
  const groupRef = useRef()
  const mouse = useMouse()
  const { scroll, update } = useScroll()

  useFrame((_, delta) => {
    update(delta)
    if (!groupRef.current) return
    const mx = mouse.current.x * 0.12
    const my = mouse.current.y * 0.08 - scroll.current * 0.00015
    groupRef.current.position.x += (mx - groupRef.current.position.x) * 0.04
    groupRef.current.position.y += (my - groupRef.current.position.y) * 0.04
  })

  return (
    <>
      <ambientLight intensity={0.04} />
      <pointLight position={[0, 0, 4]} intensity={0.55} color="#f5d78a" />
      <pointLight position={[3, 2, 1]} intensity={0.42} color="#5eead4" />
      <pointLight position={[-3, -2, 2]} intensity={0.2} color="#2dd4bf" />

      <group ref={groupRef}>
        <Stars radius={42} depth={22} count={2800} factor={2} saturation={0} fade speed={0.35} />
      </group>
    </>
  )
}

export default function BackgroundScene() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 1.2, 8], fov: 52 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
