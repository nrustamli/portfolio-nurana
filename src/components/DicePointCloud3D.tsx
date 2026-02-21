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

// Pip layouts for face values 1–6 (u, v) in [-1, 1] face space
const PIP_LAYOUTS: Record<number, Array<[number, number]>> = {
  1: [[0, 0]],
  2: [[0, -0.45], [0, 0.45]],
  3: [[-0.45, -0.45], [0, 0], [0.45, 0.45]],
  4: [[-0.45, -0.45], [0.45, -0.45], [-0.45, 0.45], [0.45, 0.45]],
  5: [[-0.45, -0.45], [0.45, -0.45], [0, 0], [-0.45, 0.45], [0.45, 0.45]],
  6: [[-0.45, -0.45], [0.45, -0.45], [-0.45, 0], [0.45, 0], [-0.45, 0.45], [0.45, 0.45]],
}

type FaceDir = 'pZ' | 'nZ' | 'pY' | 'nY' | 'pX' | 'nX'

function generateDiePoints() {
  const positions: number[] = []
  const colors: number[] = []

  const PURPLE: [number, number, number] = [0.545, 0.231, 0.741]
  const PIP:    [number, number, number] = [0.05, 0.05, 0.05]

  function push(x: number, y: number, z: number, c: [number, number, number]) {
    positions.push(x, y, z)
    colors.push(c[0], c[1], c[2])
  }

  const s = 1.2

  // --- 6 faces (all purple) ---
  const FACE_PTS = 1800
  for (let i = 0; i < FACE_PTS; i++) {
    push((Math.random() - 0.5) * 2 * s, (Math.random() - 0.5) * 2 * s,  s, PURPLE) // +Z
    push((Math.random() - 0.5) * 2 * s, (Math.random() - 0.5) * 2 * s, -s, PURPLE) // -Z
    push((Math.random() - 0.5) * 2 * s,  s, (Math.random() - 0.5) * 2 * s, PURPLE) // +Y
    push((Math.random() - 0.5) * 2 * s, -s, (Math.random() - 0.5) * 2 * s, PURPLE) // -Y
    push( s, (Math.random() - 0.5) * 2 * s, (Math.random() - 0.5) * 2 * s, PURPLE) // +X
    push(-s, (Math.random() - 0.5) * 2 * s, (Math.random() - 0.5) * 2 * s, PURPLE) // -X
  }

  // --- Edge highlights (12 edges, all purple) ---
  const EDGE_PTS = 250
  for (const [ey, ez] of [[-s, -s], [s, -s], [-s, s], [s, s]] as [number, number][]) {
    for (let i = 0; i < EDGE_PTS; i++) push((Math.random() - 0.5) * 2 * s, ey, ez, PURPLE)
  }
  for (const [ex, ez] of [[-s, -s], [s, -s], [-s, s], [s, s]] as [number, number][]) {
    for (let i = 0; i < EDGE_PTS; i++) push(ex, (Math.random() - 0.5) * 2 * s, ez, PURPLE)
  }
  for (const [ex, ey] of [[-s, -s], [s, -s], [-s, s], [s, s]] as [number, number][]) {
    for (let i = 0; i < EDGE_PTS; i++) push(ex, ey, (Math.random() - 0.5) * 2 * s, PURPLE)
  }

  // --- Pips on all 6 faces, values 1–6 in a random order ---
  const PIP_RADIUS = s * 0.14
  const PIP_PTS = 220
  const eps = 0.015

  // Shuffle [1,2,3,4,5,6] to assign a random value to each face direction
  const faceValues = [1, 2, 3, 4, 5, 6]
  for (let i = faceValues.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[faceValues[i], faceValues[j]] = [faceValues[j], faceValues[i]]
  }

  const faceDirs: FaceDir[] = ['pZ', 'nZ', 'pY', 'nY', 'pX', 'nX']

  for (let f = 0; f < 6; f++) {
    const dir = faceDirs[f]
    const layout = PIP_LAYOUTS[faceValues[f]]
    for (const [pu, pv] of layout) {
      for (let i = 0; i < PIP_PTS; i++) {
        const angle = Math.random() * Math.PI * 2
        const r = Math.sqrt(Math.random()) * PIP_RADIUS
        const lu = pu * s + Math.cos(angle) * r
        const lv = pv * s + Math.sin(angle) * r
        switch (dir) {
          case 'pZ': push(lu, lv, s + eps, PIP); break
          case 'nZ': push(lu, lv, -s - eps, PIP); break
          case 'pY': push(lu, s + eps, lv, PIP); break
          case 'nY': push(lu, -s - eps, lv, PIP); break
          case 'pX': push(s + eps, lu, lv, PIP); break
          case 'nX': push(-s - eps, lu, lv, PIP); break
        }
      }
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
  }
}

export default function DicePointCloud3D({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    const scene = new THREE.Scene()


    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    )
    camera.position.set(0, 1.5, 9)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enablePan = false
    controls.minDistance = 4
    controls.maxDistance = 20
    controls.rotateSpeed = 0.5

    const circleTexture = createCircleTexture()

    // --- Die 1 ---
    const geo1 = new THREE.BufferGeometry()
    const mat1 = new THREE.PointsMaterial({
      size: 0.055,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: true,
      map: circleTexture,
      alphaMap: circleTexture,
    })
    const { positions: pos1, colors: col1 } = generateDiePoints()
    geo1.setAttribute('position', new THREE.Float32BufferAttribute(pos1, 3))
    geo1.setAttribute('color', new THREE.Float32BufferAttribute(col1, 3))
    const die1Group = new THREE.Group()
    die1Group.add(new THREE.Points(geo1, mat1))
    die1Group.position.set(-2.2, 0.4, 0.2)
    die1Group.rotation.set(0.5, 0.3, 0.2)
    scene.add(die1Group)

    // --- Die 2 ---
    const geo2 = new THREE.BufferGeometry()
    const mat2 = new THREE.PointsMaterial({
      size: 0.055,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: true,
      map: circleTexture,
      alphaMap: circleTexture,
    })
    const { positions: pos2, colors: col2 } = generateDiePoints()
    geo2.setAttribute('position', new THREE.Float32BufferAttribute(pos2, 3))
    geo2.setAttribute('color', new THREE.Float32BufferAttribute(col2, 3))
    const die2Group = new THREE.Group()
    die2Group.add(new THREE.Points(geo2, mat2))
    die2Group.position.set(2.2, -0.3, -0.3)
    die2Group.rotation.set(-0.4, -0.8, -0.3)
    scene.add(die2Group)

    let time = 0
    let disposed = false

    const animate = () => {
      if (disposed) return
      animationIdRef.current = requestAnimationFrame(animate)
      time += 0.005

      // Die 1 — faster spin, gentle wobble
      die1Group.rotation.y = 0.3 + time * 0.32
      die1Group.rotation.x = 0.5 + Math.sin(time * 0.35) * 0.12
      die1Group.rotation.z = 0.2 + Math.sin(time * 0.22) * 0.06
      die1Group.position.y = 0.4 + Math.sin(time * 0.6) * 0.12

      // Die 2 — slower spin, different phase
      die2Group.rotation.y = -0.8 + time * 0.22
      die2Group.rotation.x = -0.4 + Math.sin(time * 0.28 + 1.5) * 0.12
      die2Group.rotation.z = -0.3 + Math.sin(time * 0.18 + 0.9) * 0.07
      die2Group.position.y = -0.3 + Math.sin(time * 0.5 + 2.0) * 0.12

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!containerRef.current || disposed) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      disposed = true
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
        animationIdRef.current = null
      }
      const canvas = renderer.domElement
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
      geo1.dispose()
      mat1.dispose()
      geo2.dispose()
      mat2.dispose()
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
