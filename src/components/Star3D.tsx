'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamically import Spline to avoid SSR issues
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
})

interface Star3DProps {
  className?: string
}

export default function Star3D({ className = '' }: Star3DProps) {
  return (
    <div className={`w-full h-full ${className} overflow-hidden flex items-center justify-center`}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading 3D star...</div>
          </div>
        }
      >
        <div 
          style={{ 
            transform: 'scale(0.9)',
            width: '100%',
            height: '100%',
            transformOrigin: 'center center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Spline
            scene="https://prod.spline.design/83z6cK2yJy33d9sW/scene.splinecode"
            style={{ 
              pointerEvents: 'none',
              width: '100%',
              height: '100%',
              minWidth: '100%',
              minHeight: '100%'
            }}
          />
        </div>
      </Suspense>
    </div>
  )
}

