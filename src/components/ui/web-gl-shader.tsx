import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type ShaderUniforms = {
  resolution: { value: [number, number] }
  time: { value: number }
  xScale: { value: number }
  yScale: { value: number }
  distortion: { value: number }
}

type SceneRefs = {
  scene: THREE.Scene | null
  camera: THREE.OrthographicCamera | null
  renderer: THREE.WebGLRenderer | null
  mesh: THREE.Mesh | null
  uniforms: ShaderUniforms | null
  animationId: number | null
}

/**
 * Full-viewport RawShaderMaterial background (Vite/React; not Next.js — no "use client").
 * Respects prefers-reduced-motion (static frame, no rAF loop).
 */
export function WebGLShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<SceneRefs>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: null,
    animationId: null,
  })

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const refs = sceneRef.current

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        float d = length(p) * distortion;
        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);
        float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);
        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `

    const initScene = () => {
      refs.scene = new THREE.Scene()
      refs.renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      refs.renderer.setClearColor(0x000000, 0)

      refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
      refs.camera.position.set(0, 0, 1)
      refs.camera.lookAt(0, 0, 0)

      refs.uniforms = {
        resolution: { value: [window.innerWidth, window.innerHeight] },
        time: { value: 0.0 },
        xScale: { value: 1.0 },
        yScale: { value: 0.5 },
        distortion: { value: 0.05 },
      }

      const position = [
        -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, 1.0, 0.0, 1.0, 1.0, 0.0,
      ]

      const positions = new THREE.BufferAttribute(new Float32Array(position), 3)
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', positions)

      const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: refs.uniforms,
        side: THREE.DoubleSide,
      })

      refs.mesh = new THREE.Mesh(geometry, material)
      refs.mesh.position.set(0, 0, 0)
      refs.scene.add(refs.mesh)

      handleResize()
    }

    const animate = () => {
      if (refs.uniforms) refs.uniforms.time.value += 0.01
      if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera)
      }
      refs.animationId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms) return
      const width = window.innerWidth
      const height = window.innerHeight
      refs.renderer.setSize(width, height, false)
      refs.uniforms.resolution.value = [width, height]
    }

    initScene()
    if (!reduced) {
      animate()
    } else if (refs.renderer && refs.scene && refs.camera) {
      if (refs.uniforms) refs.uniforms.time.value = 0.2
      refs.renderer.render(refs.scene, refs.camera)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (refs.animationId != null) cancelAnimationFrame(refs.animationId)
      refs.animationId = null
      window.removeEventListener('resize', handleResize)
      if (refs.mesh) {
        refs.scene?.remove(refs.mesh)
        refs.mesh.geometry.dispose()
        const mat = refs.mesh.material
        if (mat instanceof THREE.Material) mat.dispose()
        refs.mesh = null
      }
      refs.renderer?.dispose()
      refs.renderer = null
      refs.scene = null
      refs.camera = null
      refs.uniforms = null
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed top-0 left-0 z-[1] block h-full w-full"
      aria-hidden
    />
  )
}
