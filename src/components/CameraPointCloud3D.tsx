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

function generateCameraPoints() {
  const positions: number[] = []
  const colors: number[] = []

  const BLACK: [number, number, number] = [0.05, 0.05, 0.05]
  const PURPLE: [number, number, number] = [0.545, 0.231, 0.741]

  function push(x: number, y: number, z: number, color: [number, number, number]) {
    positions.push(x, y, z)
    colors.push(color[0], color[1], color[2])
  }

  function lerpColor(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
  }

  // --- Camera body (rectangular box) ---
  const bw = 3.0, bh = 2.0, bd = 1.8 // width, height, depth
  const hw = bw / 2, hh = bh / 2, hd = bd / 2

  // Surface points on each face
  const FACE_DENSITY = 750 // points per face

  // Front face (z = hd)
  for (let i = 0; i < FACE_DENSITY; i++) {
    const x = (Math.random() - 0.5) * bw
    const y = (Math.random() - 0.5) * bh
    push(x, y, hd, BLACK)
  }
  // Back face (z = -hd)
  for (let i = 0; i < FACE_DENSITY; i++) {
    const x = (Math.random() - 0.5) * bw
    const y = (Math.random() - 0.5) * bh
    push(x, y, -hd, BLACK)
  }
  // Top face (y = hh)
  for (let i = 0; i < FACE_DENSITY; i++) {
    const x = (Math.random() - 0.5) * bw
    const z = (Math.random() - 0.5) * bd
    push(x, hh, z, BLACK)
  }
  // Bottom face (y = -hh)
  for (let i = 0; i < FACE_DENSITY; i++) {
    const x = (Math.random() - 0.5) * bw
    const z = (Math.random() - 0.5) * bd
    push(x, -hh, z, BLACK)
  }
  // Left face (x = -hw)
  for (let i = 0; i < FACE_DENSITY; i++) {
    const y = (Math.random() - 0.5) * bh
    const z = (Math.random() - 0.5) * bd
    push(-hw, y, z, BLACK)
  }
  // Right face (x = hw)
  for (let i = 0; i < FACE_DENSITY; i++) {
    const y = (Math.random() - 0.5) * bh
    const z = (Math.random() - 0.5) * bd
    push(hw, y, z, BLACK)
  }

  // Edge points for sharper definition
  const EDGE_PTS = 80
  const edges: [number, number, number, number, number, number][] = [
    // Front face edges
    [-hw, -hh, hd, hw, -hh, hd],
    [-hw, hh, hd, hw, hh, hd],
    [-hw, -hh, hd, -hw, hh, hd],
    [hw, -hh, hd, hw, hh, hd],
    // Back face edges
    [-hw, -hh, -hd, hw, -hh, -hd],
    [-hw, hh, -hd, hw, hh, -hd],
    [-hw, -hh, -hd, -hw, hh, -hd],
    [hw, -hh, -hd, hw, hh, -hd],
    // Connecting edges
    [-hw, -hh, -hd, -hw, -hh, hd],
    [hw, -hh, -hd, hw, -hh, hd],
    [-hw, hh, -hd, -hw, hh, hd],
    [hw, hh, -hd, hw, hh, hd],
  ]
  for (const [x1, y1, z1, x2, y2, z2] of edges) {
    for (let i = 0; i <= EDGE_PTS; i++) {
      const t = i / EDGE_PTS
      push(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t, z1 + (z2 - z1) * t, BLACK)
    }
  }

  // --- Lens cylinder (protruding from front face) ---
  const lensRadius = 0.7
  const lensLength = 1.0
  const lensZ0 = hd
  const lensZ1 = hd + lensLength

  // Cylinder surface
  const LENS_RINGS = 30
  const RING_PTS = 85
  for (let ring = 0; ring <= LENS_RINGS; ring++) {
    const z = lensZ0 + (lensLength * ring) / LENS_RINGS
    for (let j = 0; j < RING_PTS; j++) {
      const angle = (j / RING_PTS) * Math.PI * 2
      const x = lensRadius * Math.cos(angle)
      const y = lensRadius * Math.sin(angle)
      push(x, y, z, PURPLE)
    }
  }

  // Front lens cap — filled circle
  const CAP_POINTS = 600
  for (let i = 0; i < CAP_POINTS; i++) {
    const r = Math.random() * lensRadius
    const angle = Math.random() * Math.PI * 2
    push(r * Math.cos(angle), r * Math.sin(angle), lensZ1, PURPLE)
  }

  // Inner ring detail on front cap
  const innerRadius = 0.4
  const INNER_RING_PTS = 80
  for (let j = 0; j < INNER_RING_PTS; j++) {
    const angle = (j / INNER_RING_PTS) * Math.PI * 2
    push(innerRadius * Math.cos(angle), innerRadius * Math.sin(angle), lensZ1 + 0.02, PURPLE)
  }

  // --- Viewfinder (small raised box on top) ---
  const vw = 0.8, vh = 0.5, vd = 0.6
  const vx = 0, vyBase = hh, vz = -0.1
  const vhw = vw / 2, vhh = vh / 2, vhd = vd / 2

  // Viewfinder face points
  const VF_FACE = 150
  // Front
  for (let i = 0; i < VF_FACE; i++) {
    const x = vx + (Math.random() - 0.5) * vw
    const y = vyBase + Math.random() * vh
    const t = (y - vyBase) / vh
    push(x, y, vz + vhd, lerpColor(BLACK, PURPLE, t))
  }
  // Back
  for (let i = 0; i < VF_FACE; i++) {
    const x = vx + (Math.random() - 0.5) * vw
    const y = vyBase + Math.random() * vh
    const t = (y - vyBase) / vh
    push(x, y, vz - vhd, lerpColor(BLACK, PURPLE, t))
  }
  // Top
  for (let i = 0; i < VF_FACE; i++) {
    const x = vx + (Math.random() - 0.5) * vw
    const z = vz + (Math.random() - 0.5) * vd
    push(x, vyBase + vh, z, PURPLE)
  }
  // Left
  for (let i = 0; i < VF_FACE; i++) {
    const y = vyBase + Math.random() * vh
    const z = vz + (Math.random() - 0.5) * vd
    const t = (y - vyBase) / vh
    push(vx - vhw, y, z, lerpColor(BLACK, PURPLE, t))
  }
  // Right
  for (let i = 0; i < VF_FACE; i++) {
    const y = vyBase + Math.random() * vh
    const z = vz + (Math.random() - 0.5) * vd
    const t = (y - vyBase) / vh
    push(vx + vhw, y, z, lerpColor(BLACK, PURPLE, t))
  }

  // Viewfinder edges
  const vfEdges: [number, number, number, number, number, number][] = [
    // Bottom edges (at body top)
    [vx - vhw, vyBase, vz - vhd, vx + vhw, vyBase, vz - vhd],
    [vx - vhw, vyBase, vz + vhd, vx + vhw, vyBase, vz + vhd],
    [vx - vhw, vyBase, vz - vhd, vx - vhw, vyBase, vz + vhd],
    [vx + vhw, vyBase, vz - vhd, vx + vhw, vyBase, vz + vhd],
    // Top edges
    [vx - vhw, vyBase + vh, vz - vhd, vx + vhw, vyBase + vh, vz - vhd],
    [vx - vhw, vyBase + vh, vz + vhd, vx + vhw, vyBase + vh, vz + vhd],
    [vx - vhw, vyBase + vh, vz - vhd, vx - vhw, vyBase + vh, vz + vhd],
    [vx + vhw, vyBase + vh, vz - vhd, vx + vhw, vyBase + vh, vz + vhd],
    // Vertical edges
    [vx - vhw, vyBase, vz - vhd, vx - vhw, vyBase + vh, vz - vhd],
    [vx + vhw, vyBase, vz - vhd, vx + vhw, vyBase + vh, vz - vhd],
    [vx - vhw, vyBase, vz + vhd, vx - vhw, vyBase + vh, vz + vhd],
    [vx + vhw, vyBase, vz + vhd, vx + vhw, vyBase + vh, vz + vhd],
  ]
  const VF_EDGE_PTS = 30
  for (const [x1, y1, z1, x2, y2, z2] of vfEdges) {
    for (let i = 0; i <= VF_EDGE_PTS; i++) {
      const t = i / VF_EDGE_PTS
      const y = y1 + (y2 - y1) * t
      const frac = (y - vyBase) / vh
      push(
        x1 + (x2 - x1) * t,
        y,
        z1 + (z2 - z1) * t,
        lerpColor(BLACK, PURPLE, Math.max(0, Math.min(1, frac))),
      )
    }
  }

  // --- Shutter button (small circle on top-right) ---
  const btnX = 0.8, btnY = hh + 0.05, btnZ = 0.2
  const btnRadius = 0.15
  const BTN_PTS = 60
  for (let i = 0; i < BTN_PTS; i++) {
    const angle = (i / BTN_PTS) * Math.PI * 2
    push(btnX + btnRadius * Math.cos(angle), btnY, btnZ + btnRadius * Math.sin(angle), PURPLE)
  }
  // Fill button top
  for (let i = 0; i < 30; i++) {
    const r = Math.random() * btnRadius
    const angle = Math.random() * Math.PI * 2
    push(btnX + r * Math.cos(angle), btnY + 0.02, btnZ + r * Math.sin(angle), PURPLE)
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
  }
}

export default function CameraPointCloud3D({ className = '' }: { className?: string }) {
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
    camera.position.set(0, 1, 7)

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
    const { positions, colors: pointColors } = generateCameraPoints()
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
