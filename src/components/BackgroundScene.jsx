import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { useMouse } from '../hooks/useMouse'

/* ── Colors ──────────────────────────────────────────────────── */
const C_WHITE  = new THREE.Color('#ffffff')
const C_GREEN  = new THREE.Color('#ff4fa3')
const C_GREEN2 = new THREE.Color('#ffd8eb')

/* ── Scroll lerp ─────────────────────────────────────────────── */
function useScroll() {
  const scroll = useRef(0)
  const target = useRef(0)

  useEffect(() => {
    const onScroll = () => { target.current = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const update = (delta) => {
    scroll.current += (target.current - scroll.current) * Math.min(delta * 3, 1)
  }

  return { scroll, update }
}

/* ── Event horizon ───────────────────────────────────────────── */
function EventHorizon() {
  return (
    <mesh renderOrder={2}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshBasicMaterial color="#000000" depthWrite />
    </mesh>
  )
}

/* ── Gravitational lensing rings ─────────────────────────────── */
function LensRing({ radius, opacity, pulseSpeed }) {
  const ref = useRef()

  useFrame((state) => {
    if (ref.current) {
      ref.current.material.opacity =
        opacity + Math.sin(state.clock.elapsedTime * pulseSpeed) * opacity * 0.35
    }
  })

  return (
    <mesh ref={ref} rotation={[Math.PI * 0.08, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 8, 128]} />
      <meshBasicMaterial
        color={C_GREEN}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  )
}

/* ── Accretion disk particles ────────────────────────────────── */
function AccretionDisk() {
  const ref = useRef()
  const COUNT = 5000

  const geo = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const colors    = new Float32Array(COUNT * 3)

    for (let i = 0; i < COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      const frac  = Math.pow(Math.random(), 0.55)   // concentrate near inner edge
      const r     = 1.38 + frac * 2.6
      const thick = (Math.random() - 0.5) * 0.07 * (1 - frac * 0.85)

      positions[i * 3]     = Math.cos(angle) * r
      positions[i * 3 + 1] = thick
      positions[i * 3 + 2] = Math.sin(angle) * r

      // inner edge: near white, outer: deep green
      const c = new THREE.Color().lerpColors(
        frac < 0.25 ? C_WHITE : C_GREEN2,
        C_GREEN,
        Math.min(frac * 1.3, 1)
      )
      colors[i * 3]     = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('color',    new THREE.BufferAttribute(colors, 3))
    return g
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.16
    ref.current.rotation.x = Math.PI * 0.08   // tilt so disk faces slightly toward camera
  })

  return (
    <points ref={ref} geometry={geo} renderOrder={1}>
      <pointsMaterial
        vertexColors
        size={0.032}
        sizeAttenuation
        transparent
        opacity={0.92}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ── Infalling matter spiral ─────────────────────────────────── */
function InfallSpiral() {
  const ref = useRef()
  const COUNT = 600

  const anglesRef = useRef(new Float32Array(COUNT))
  const radiiRef  = useRef(new Float32Array(COUNT))
  const speedsRef = useRef(new Float32Array(COUNT))

  const geo = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      anglesRef.current[i] = Math.random() * Math.PI * 2
      radiiRef.current[i]  = 1.4 + Math.random() * 4.5
      speedsRef.current[i] = 0.08 + Math.random() * 0.25

      const r = radiiRef.current[i]
      positions[i * 3]     = Math.cos(anglesRef.current[i]) * r
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.4
      positions[i * 3 + 2] = Math.sin(anglesRef.current[i]) * r
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [])

  useFrame((_, delta) => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position

    for (let i = 0; i < COUNT; i++) {
      radiiRef.current[i]  -= delta * speedsRef.current[i] * 0.35
      anglesRef.current[i] += delta * (1.8 / Math.max(radiiRef.current[i], 0.5))

      // Respawn when swallowed
      if (radiiRef.current[i] < 1.22) {
        radiiRef.current[i]  = 3.5 + Math.random() * 3
        anglesRef.current[i] = Math.random() * Math.PI * 2
      }

      const r = radiiRef.current[i]
      pos.setX(i, Math.cos(anglesRef.current[i]) * r)
      pos.setY(i, (Math.random() - 0.5) * 0.04)
      pos.setZ(i, Math.sin(anglesRef.current[i]) * r)
    }
    pos.needsUpdate = true
    ref.current.rotation.x = Math.PI * 0.08
  })

  return (
    <points ref={ref} geometry={geo} renderOrder={1}>
      <pointsMaterial
        color={C_GREEN}
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ── Relativistic jets ───────────────────────────────────────── */
function Jets() {
  const upperRef = useRef()
  const lowerRef = useRef()

  useFrame((state) => {
    const pulse = 0.055 + Math.sin(state.clock.elapsedTime * 0.8) * 0.025
    if (upperRef.current) upperRef.current.material.opacity = pulse
    if (lowerRef.current) lowerRef.current.material.opacity = pulse
  })

  return (
    <group>
      {/* Upper jet */}
      <mesh ref={upperRef} position={[0, 2.8, 0]}>
        <cylinderGeometry args={[0, 0.18, 3.8, 16, 1, true]} />
        <meshBasicMaterial
          color={C_GREEN}
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Lower jet */}
      <mesh ref={lowerRef} position={[0, -2.8, 0]}>
        <cylinderGeometry args={[0.18, 0, 3.8, 16, 1, true]} />
        <meshBasicMaterial
          color={C_GREEN}
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

/* ── Full scene ──────────────────────────────────────────────── */
function Scene() {
  const groupRef = useRef()
  const mouse    = useMouse()
  const { scroll, update } = useScroll()

  useFrame((_, delta) => {
    update(delta)
    if (!groupRef.current) return
    const mx = mouse.current.x * 0.18
    const my = mouse.current.y * 0.12 - scroll.current * 0.00025
    groupRef.current.position.x += (mx - groupRef.current.position.x) * 0.04
    groupRef.current.position.y += (my - groupRef.current.position.y) * 0.04
  })

  return (
    <>
      <ambientLight intensity={0.04} />
      <pointLight position={[0, 0, 4]}  intensity={2.5} color="#ff4fa3" />
      <pointLight position={[3, 2, 1]}  intensity={0.6} color="#ffd8eb" />
      <pointLight position={[-3, -2, 2]} intensity={0.3} color="#e7a8ca" />

      {/* Background star field */}
      <Stars radius={40} depth={20} count={2500} factor={2} saturation={0} fade speed={0.4} />

      {/* Black hole centered slightly right of center */}
      <group ref={groupRef} position={[0.6, 0.1, 0]}>
        <EventHorizon />
        <AccretionDisk />
        <InfallSpiral />

        {/* Lensing rings — each pulsing independently */}
        <LensRing radius={1.30} opacity={0.30} pulseSpeed={0.9} />
        <LensRing radius={1.52} opacity={0.14} pulseSpeed={0.6} />
        <LensRing radius={1.85} opacity={0.08} pulseSpeed={0.4} />
        <LensRing radius={2.30} opacity={0.04} pulseSpeed={0.25} />
        <LensRing radius={3.00} opacity={0.02} pulseSpeed={0.15} />

        <Jets />
      </group>
    </>
  )
}

/* ── Canvas wrapper ──────────────────────────────────────────── */
export default function BackgroundScene() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 1.8, 7.5], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
