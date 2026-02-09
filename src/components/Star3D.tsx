'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

interface Star3DProps {
  className?: string
}

export default function Star3D({ className = '' }: Star3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#F5F7FA')

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 10

    // Renderer setup with antialiasing
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create star path with 10 points (5 tips + 5 valleys)
    const createStarPath = (): THREE.CatmullRomCurve3 => {
      const points: THREE.Vector3[] = []
      const outerRadius = 2.455
      const innerRadius = 1.12
      const numPoints = 10

      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2 - Math.PI / 2
        const radius = i % 2 === 0 ? outerRadius : innerRadius
        
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0
          )
        )
      }
      
      // Create smooth curve through points
      return new THREE.CatmullRomCurve3(points, true, 'catmullrom', 0.35)
    }

    // Create the star geometry using TubeGeometry
    const starPath = createStarPath()
    const tubeRadius = 0.25
    const tubularSegments = 1200
    const radialSegments = 500
    
    const geometry = new THREE.TubeGeometry(
      starPath,
      tubularSegments,
      tubeRadius,
      radialSegments,
      true
    )

    // Load the metallic texture as a matcap for chrome look
    const textureLoader = new THREE.TextureLoader()
    const matcapTexture = textureLoader.load('/images/star-material.png')

    // Use MeshMatcapMaterial for perfect chrome/liquid metal appearance
    const material = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture,
      color: 0xaaaaaa, 
    })

    const starMesh = new THREE.Mesh(geometry, material)
    scene.add(starMesh)

    // Create procedural environment map for reflections
    const createEnvironmentMap = (): THREE.CubeTexture => {
      const size = 256
      const data = new Uint8Array(size * size * 4)

      // Create gradient data for each face
      const createFaceData = (topColor: number[], bottomColor: number[]): Uint8Array => {
        const faceData = new Uint8Array(size * size * 4)
        for (let y = 0; y < size; y++) {
          for (let x = 0; x < size; x++) {
            const i = (y * size + x) * 4
            const t = y / size
            faceData[i] = topColor[0] + (bottomColor[0] - topColor[0]) * t
            faceData[i + 1] = topColor[1] + (bottomColor[1] - topColor[1]) * t
            faceData[i + 2] = topColor[2] + (bottomColor[2] - topColor[2]) * t
            faceData[i + 3] = 255
          }
        }
        return faceData
      }

      // Create textures for each face of the cube
      const faces = [
        createFaceData([200, 220, 255], [255, 240, 230]), // px
        createFaceData([180, 200, 240], [245, 235, 225]), // nx
        createFaceData([240, 250, 255], [200, 210, 230]), // py (top - bright)
        createFaceData([100, 110, 130], [150, 160, 180]), // ny (bottom - darker)
        createFaceData([220, 235, 255], [250, 245, 240]), // pz
        createFaceData([190, 210, 245], [240, 235, 230]), // nz
      ]

      const textures = faces.map((faceData) => {
        const texture = new THREE.DataTexture(faceData, size, size, THREE.RGBAFormat)
        texture.needsUpdate = true
        return texture
      })

      // Create cube texture
      const cubeTexture = new THREE.CubeTexture(
        textures.map((t) => {
          const canvas = document.createElement('canvas')
          canvas.width = size
          canvas.height = size
          const ctx = canvas.getContext('2d')!
          const imageData = ctx.createImageData(size, size)
          imageData.data.set(textures[0].image.data!)
          return canvas
        })
      ) 

      return cubeTexture
    }

    // Create a simple gradient environment using PMREMGenerator
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()

    // Create a simple environment scene for reflections
    const envScene = new THREE.Scene()
    
    // Add gradient background sphere for environment
    const envGeometry = new THREE.SphereGeometry(50, 64, 64)
    const envMaterial = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        topColor: { value: new THREE.Color(0xffffff) },
        bottomColor: { value: new THREE.Color(0xc8d4e0) },
        horizonColor: { value: new THREE.Color(0xe8f0f8) },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform vec3 horizonColor;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y;
          vec3 color;
          if (h > 0.0) {
            color = mix(horizonColor, topColor, pow(h, 0.5));
          } else {
            color = mix(horizonColor, bottomColor, pow(-h, 0.5));
          }
          // Add some variation for more interesting reflections
          float noise = fract(sin(dot(vWorldPosition.xz, vec2(12.9898, 78.233))) * 43758.5453);
          color += noise * 0.02;
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    })
    
    const envMesh = new THREE.Mesh(envGeometry, envMaterial)
    envScene.add(envMesh)

    // Add some bright spots for highlights
    const addHighlight = (position: THREE.Vector3, intensity: number) => {
      const highlightGeo = new THREE.SphereGeometry(2, 16, 16)
      const highlightMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(intensity, intensity, intensity),
      })
      const highlight = new THREE.Mesh(highlightGeo, highlightMat)
      highlight.position.copy(position)
      envScene.add(highlight)
    }

    // Add bright spots at various positions
    addHighlight(new THREE.Vector3(30, 25, -20), 2.0)
    addHighlight(new THREE.Vector3(-25, 20, 15), 1.5)
    addHighlight(new THREE.Vector3(10, -15, 30), 1.2)

    // Generate environment map (for scene, matcap material handles its own shading)
    const envMap = pmremGenerator.fromScene(envScene, 0.04).texture
    scene.environment = envMap

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const directionalLight2 = new THREE.DirectionalLight(0xe8f0ff, 0.8)
    directionalLight2.position.set(-5, 3, -5)
    scene.add(directionalLight2)

    // Subtle rim light
    const rimLight = new THREE.DirectionalLight(0xffd0a0, 0.4)
    rimLight.position.set(0, -5, 5)
    scene.add(rimLight)

    // Animation loop with 3-axis rotation
    let time = 0
    let disposed = false
    const animate = () => {
      if (disposed) return
      animationIdRef.current = requestAnimationFrame(animate)
      time += 0.02485

      // Smooth multi-axis rotation for natural tumbling
      starMesh.rotation.x = Math.sin(time * 0.2) * 0.3 + time * 0.2
      starMesh.rotation.y = time * 0.4
      starMesh.rotation.z = Math.cos(time * 0.1) * 0.2 + time * 0.3

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
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

      // Safely remove the canvas from the DOM
      const canvas = renderer.domElement
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas)
      }

      // Dispose Three.js resources
      geometry.dispose()
      matcapTexture.dispose()
      material.dispose()
      envGeometry.dispose()
      envMaterial.dispose()
      envMap.dispose()
      pmremGenerator.dispose()
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

