import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useMouse } from '../hooks/useMouse'

const G_BRIGHT = '#16d674'
const G_MID    = '#4ade80'
const G_DIM    = '#083d20'
const G_PALE   = '#0a5c2e'

/* ── Accretion disc ring — each ring rotates at its own speed ── */
function DiscRing({ innerR, outerR, count, speed, colorA, colorB, heightScale = 0.08 }) {
  const ref = useRef()

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const ca  = new THREE.Color(colorA)
    const cb  = new THREE.Color(colorB)
    const tmp = new THREE.Color()

    for (let i = 0; i < count; i++) {
      const t     = Math.random()
      const r     = innerR + t * (outerR - innerR)
      const angle = Math.random() * Math.PI * 2
      const y     = (Math.random() - 0.5) * heightScale * (1 - t * 0.7)

      pos[i * 3 + 0] = Math.cos(angle) * r
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = Math.sin(angle) * r

      tmp.lerpColors(ca, cb, t)
      col[i * 3 + 0] = tmp.r
      col[i * 3 + 1] = tmp.g
      col[i * 3 + 2] = tmp.b
    }
    return { positions: pos, colors: col }
  }, [innerR, outerR, count, colorA, colorB, heightScale])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]}    />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.95}
        depthWrite={false}
      />
    </points>
  )
}

/* ── Photon ring — the bright Einstein ring just outside horizon ─ */
function PhotonRing() {
  const m1 = useRef()
  const m2 = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (m1.current) {
      m1.current.rotation.z = t * 0.4
      m1.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.04
    }
    if (m2.current) {
      m2.current.rotation.z = -t * 0.28
      m2.current.rotation.x = Math.PI / 2 + 0.1 + Math.cos(t * 0.25) * 0.03
    }
  })

  return (
    <>
      <mesh ref={m1}>
        <torusGeometry args={[0.42, 0.008, 16, 200]} />
        <meshStandardMaterial
          color={G_BRIGHT}
          emissive={G_BRIGHT}
          emissiveIntensity={4}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* second ring slightly offset — lensing effect */}
      <mesh ref={m2}>
        <torusGeometry args={[0.46, 0.004, 16, 200]} />
        <meshStandardMaterial
          color={G_MID}
          emissive={G_MID}
          emissiveIntensity={2.5}
          transparent
          opacity={0.5}
        />
      </mesh>
    </>
  )
}

/* ── Event horizon — pure black sphere ───────────────────────── */
function EventHorizon() {
  return (
    <mesh>
      <sphereGeometry args={[0.35, 48, 48]} />
      <meshBasicMaterial color="#000000" />
    </mesh>
  )
}

/* ── Relativistic jet — particle stream from poles ───────────── */
function PolarJet({ direction = 1 }) {
  const ref = useRef()

  const positions = useMemo(() => {
    const COUNT = 500
    const pos   = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const t   = Math.pow(Math.random(), 0.6)
      const h   = t * 3.5 * direction
      const r   = t * 0.18
      const ang = Math.random() * Math.PI * 2
      pos[i * 3 + 0] = Math.cos(ang) * r
      pos[i * 3 + 1] = h
      pos[i * 3 + 2] = Math.sin(ang) * r
    }
    return pos
  }, [direction])

  useFrame((state) => {
    if (!ref.current) return
    // Slowly drift particles upward by rotating around a shifted pivot — fake it via Y phase
    ref.current.rotation.y += 0.003 * direction
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={G_BRIGHT}
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.55}
      />
    </Points>
  )
}

/* ── Far background stars ────────────────────────────────────── */
function StarField() {
  const ref = useRef()

  const positions = useMemo(() => {
    const COUNT = 2500
    const pos   = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const r   = 8 + Math.random() * 10
      const th  = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(th)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(th)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#aaffcc"
        size={0.01}
        sizeAttenuation
        depthWrite={false}
        opacity={0.2}
      />
    </Points>
  )
}

/* ── Root group with mouse tilt ──────────────────────────────── */
function BlackHole() {
  const group = useRef()
  const mouse = useMouse()

  useFrame((_, delta) => {
    if (!group.current) return
    group.current.rotation.x += (mouse.current.y * 0.04 - group.current.rotation.x) * 0.03
    group.current.rotation.z += (mouse.current.x * 0.04 - group.current.rotation.z) * 0.03
  })

  return (
    <group ref={group}>
      <StarField />

      {/* Disc — 3 rings at Keplerian speeds (inner fastest) */}
      <DiscRing innerR={0.48} outerR={1.1}  count={3000} speed={0.95} colorA="#ccffdd" colorB={G_BRIGHT} heightScale={0.04} />
      <DiscRing innerR={1.1}  outerR={2.4}  count={4000} speed={0.42} colorA={G_BRIGHT} colorB={G_MID}    heightScale={0.10} />
      <DiscRing innerR={2.4}  outerR={4.2}  count={3000} speed={0.16} colorA={G_MID}   colorB={G_PALE}   heightScale={0.18} />

      <PhotonRing />
      <EventHorizon />
      <PolarJet  direction={ 1} />
      <PolarJet  direction={-1} />
    </group>
  )
}

/* ── Scene root ──────────────────────────────────────────────── */
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 2.2, 6], fov: 52 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.05} />
      <pointLight position={[0, 0, 0]} intensity={5}   color={G_BRIGHT} />
      <pointLight position={[3, 1, 2]} intensity={0.6} color={G_MID}    />

      <BlackHole />
    </Canvas>
  )
}
