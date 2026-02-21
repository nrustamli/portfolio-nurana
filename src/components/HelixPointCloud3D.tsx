'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

function createCircleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.4, 'rgba(255,255,255,0.8)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(canvas)
}

function generateHelixPoints() {
  const positions: number[] = []
  const colors: number[] = []

  const HELIX_RADIUS = 2.0
  const RISE_PER_RADIAN = 0.12
  const TOTAL_ANGLE = 10 * Math.PI
  const STRAND_POINTS = 800
  const RUNG_INTERVAL = 8
  const POINTS_PER_RUNG = 10

  const yOffset = (RISE_PER_RADIAN * TOTAL_ANGLE) / 2

  for (let i = 0; i < STRAND_POINTS; i++) {
    const t = (i / (STRAND_POINTS - 1)) * TOTAL_ANGLE
    const s = i / (STRAND_POINTS - 1)

    // Strand 1 — black (0.05, 0.05, 0.05)
    const x1 = HELIX_RADIUS * Math.cos(t)
    const y1 = RISE_PER_RADIAN * t - yOffset
    const z1 = HELIX_RADIUS * Math.sin(t)
    positions.push(x1, y1, z1)

    const r1 = 0.05
    const g1 = 0.05
    const b1 = 0.05
    colors.push(r1, g1, b1)

    // Strand 2 — #8B3BBD (0.545, 0.231, 0.741)
    const x2 = HELIX_RADIUS * Math.cos(t + Math.PI)
    const y2 = RISE_PER_RADIAN * t - yOffset
    const z2 = HELIX_RADIUS * Math.sin(t + Math.PI)
    positions.push(x2, y2, z2)

    const r2 = 0.545
    const g2 = 0.231
    const b2 = 0.741
    colors.push(r2, g2, b2)

    // Rungs (base-pair bridges)
    if (i % RUNG_INTERVAL === 0) {
      for (let j = 1; j <= POINTS_PER_RUNG; j++) {
        const frac = j / (POINTS_PER_RUNG + 1)
        positions.push(
          x1 + (x2 - x1) * frac,
          y1,
          z1 + (z2 - z1) * frac,
        )
        colors.push(
          r1 + (r2 - r1) * frac,
          g1 + (g2 - g1) * frac,
          b1 + (b2 - b1) * frac,
        )
      }
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
  }
}

export default function HelixPointCloud3D({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    // Scene
    const scene = new THREE.Scene()


    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    )
    camera.position.set(0, 0, 8)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enablePan = false
    controls.minDistance = 4
    controls.maxDistance = 20
    controls.enableZoom = true
    controls.rotateSpeed = 0.5

    // Point cloud
    const { positions, colors } = generateHelixPoints()
    const circleTexture = createCircleTexture()

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.07,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: true,
      map: circleTexture,
      alphaMap: circleTexture,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Animation
    let time = 0
    let disposed = false

    const animate = () => {
      if (disposed) return
      animationIdRef.current = requestAnimationFrame(animate)
      time += 0.005

      points.rotation.y = time * 0.3
      points.rotation.x = Math.sin(time * 0.5) * 0.1

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Resize
    const handleResize = () => {
      if (!containerRef.current || disposed) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      disposed = true
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
        animationIdRef.current = null
      }
      const canvas = renderer.domElement
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas)
      }
      geometry.dispose()
      material.dispose()
      circleTexture.dispose()
      controls.dispose()
      renderer.forceContextLoss()
      renderer.dispose()
      rendererRef.current = null
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
      style={{ minHeight: '400px' }}
    />
  )
}
