'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import Star3D from '@/components/Star3D'
import { projects } from './data'
import ThemeToggle from '@/components/ThemeToggle'

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' as const },
  }),
}

export default function ProjectsPage() {
  return (
    <main
      className="min-h-screen relative p-8 md:p-12 lg:p-24 bg-[#F5F7FA] dark:bg-[#1c1336]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7">
              <Star3D className="w-full h-full" minHeight="0" />
            </div>
            <Link
              href="/"
              className="text-lg md:text-xl text-black dark:text-white font-aldrich font-thin-aldrich hover:opacity-70 transition-opacity"
            >
              Nurana Rustamli
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl text-black dark:text-white font-aldrich font-thin-aldrich mt-6">
            Projects
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <Link key={project.id} href={`/projects/${project.slug}`} className="h-full">
            <motion.div
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="
                h-full
                bg-white/20
                backdrop-blur-md
                border border-white/30
                rounded-lg
                shadow-lg
                hover:shadow-xl
                hover:bg-white/30
                transition-all
                duration-300
                cursor-pointer
                overflow-hidden
              "
            >
              <div className="p-5">
                <h2 className="text-lg font-semibold text-black dark:text-white mb-2">
                  {project.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/"
            className="text-purple-500 hover:underline text-sm md:text-base"
          >
            ← Back to Home
          </Link>
        </div>

        <ThemeToggle />
      </div>
    </main>
  )
}
