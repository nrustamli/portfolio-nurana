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

function generateFlowerPoints() {
  const positions: number[] = []
  const colors: number[] = []

  const BLACK: [number, number, number] = [0.05, 0.05, 0.05]
  const PURPLE: [number, number, number] = [0.545, 0.231, 0.741]

  function push(x: number, y: number, z: number, color: [number, number, number]) {
    positions.push(x, y, z)
    colors.push(color[0], color[1], color[2])
  }

  function lerpColor(
    a: [number, number, number],
    b: [number, number, number],
    t: number,
  ): [number, number, number] {
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
  }

  // --- Stem (curved, bends at top like a snowdrop) ---
  const STEM_PTS = 600
  function stemPos(t: number): [number, number, number] {
    if (t < 0.8) {
      const s = t / 0.8
      return [0, -3 + s * 5.5, 0]
    }
    const s = (t - 0.8) / 0.2
    const angle = s * (Math.PI / 3)
    return [
      Math.sin(angle) * 1.5,
      2.5 - (1 - Math.cos(angle)) * 1.0,
      0,
    ]
  }

  for (let i = 0; i < STEM_PTS; i++) {
    const t = i / (STEM_PTS - 1)
    const [sx, sy, sz] = stemPos(t)
    const thick = 0.04
    push(
      sx + (Math.random() - 0.5) * thick,
      sy,
      sz + (Math.random() - 0.5) * thick,
      BLACK,
    )
  }

  // Flower attachment point (tip of bent stem)
  const [flowerX, flowerY] = stemPos(1)

  // --- 3 Outer petals (drooping down, spreading outward) ---
  const PETAL_PTS = 2500
  for (let p = 0; p < 3; p++) {
    const petalAngle = (p / 3) * Math.PI * 2 + Math.PI / 6
    const perpAngle = petalAngle + Math.PI / 2

    for (let i = 0; i < PETAL_PTS; i++) {
      const t = Math.random()
      const w = (Math.random() - 0.5) * 2

      // Width profile: 0 at base, max at ~40%, tapers to tip
      const maxWidth = 0.55
      const widthProfile = Math.sin(t * Math.PI) * maxWidth
      const actualWidth = w * widthProfile

      // Spine: droop down, spread outward, slight curl at tip
      const spineR = t * 0.6
      const spineY = -t * 1.7
      const curlOut = t * t * 0.4

      const x = flowerX + Math.cos(petalAngle) * (spineR + curlOut) + Math.cos(perpAngle) * actualWidth
      const y = flowerY + spineY
      const z = Math.sin(petalAngle) * (spineR + curlOut) + Math.sin(perpAngle) * actualWidth

      push(x, y, z, lerpColor(PURPLE, BLACK, t * 0.25))
    }
  }

  // --- Inner bell / cup (small cone hanging inside petals) ---
  const BELL_RINGS = 15
  const BELL_RING_PTS = 30
  const bellLength = 0.8
  const bellRadiusTop = 0.15
  const bellRadiusBottom = 0.3

  for (let ring = 0; ring <= BELL_RINGS; ring++) {
    const t = ring / BELL_RINGS
    const y = flowerY - t * bellLength
    const r = bellRadiusTop + (bellRadiusBottom - bellRadiusTop) * t
    for (let j = 0; j < BELL_RING_PTS; j++) {
      const angle = (j / BELL_RING_PTS) * Math.PI * 2
      push(
        flowerX + Math.cos(angle) * r,
        y,
        Math.sin(angle) * r,
        lerpColor(PURPLE, BLACK, t * 0.5),
      )
    }
  }

  // Bell bottom cap fill
  for (let i = 0; i < 80; i++) {
    const r = Math.random() * bellRadiusBottom
    const angle = Math.random() * Math.PI * 2
    push(
      flowerX + Math.cos(angle) * r,
      flowerY - bellLength,
      Math.sin(angle) * r,
      lerpColor(PURPLE, BLACK, 0.5),
    )
  }

  // --- 2 Leaves (long, narrow, curving from the base) ---
  const LEAF_PTS = 650
  for (let l = 0; l < 2; l++) {
    const leafAngle = l === 0 ? -0.4 : 0.4
    const leafBend = l === 0 ? -1 : 1

    for (let i = 0; i < LEAF_PTS; i++) {
      const t = Math.random()
      const w = (Math.random() - 0.5) * 2

      // Leaf length along y
      const leafLen = 3.5
      const y = -3 + t * leafLen

      // Width profile: narrow at base, widest at 30%, tapers to tip
      const maxW = 0.18
      const profile = Math.sin(t * Math.PI) * maxW * (1 - t * 0.4)
      const width = w * profile

      // Slight outward curve
      const curve = t * t * leafBend * 0.5

      const x = curve + Math.cos(leafAngle) * width
      const z = Math.sin(leafAngle) * width

      push(x, y, z, lerpColor(BLACK, PURPLE, t * 0.15))
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
  }
}

export default function FlowerPointCloud3D({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#F5F7FA')

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    )
    camera.position.set(0, 0, 8)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
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
    const { positions, colors: pointColors } = generateFlowerPoints()
    const circleTexture = createCircleTexture()

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(pointColors, 3))

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
