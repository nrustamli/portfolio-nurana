'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Project } from '../data'

export default function ProjectContent({ project }: { project: Project }) {
  return (
    <main
      className="min-h-screen relative p-8 md:p-12 lg:p-24"
      style={{ backgroundColor: '#F5F7FA' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <Link
            href="/"
            className="text-lg md:text-xl text-black font-aldrich font-thin-aldrich hover:opacity-70 transition-opacity"
          >
            Nurana Rustamli
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-5xl text-black font-aldrich font-thin-aldrich mb-6">
            {project.title}
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            {project.description}
          </p>
        </motion.div>

        <div className="mt-16">
          <Link
            href="/projects"
            className="text-purple-500 hover:underline text-sm md:text-base"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    </main>
  )
}
