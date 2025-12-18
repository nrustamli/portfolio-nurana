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
  const splineUrl = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL

  if (!splineUrl) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="text-gray-400 text-sm">
          Add NEXT_PUBLIC_SPLINE_SCENE_URL to .env.local
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading 3D star...</div>
          </div>
        }
      >
        <Spline scene={splineUrl} />
      </Suspense>
    </div>
  )
}

