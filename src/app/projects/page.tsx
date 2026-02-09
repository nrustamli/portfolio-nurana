'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: 'Project One',
    description: 'A brief description of the first project and what it does.',
    cover: null,
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'A brief description of the second project and what it does.',
    cover: null,
  },
  {
    id: 3,
    title: 'Project Three',
    description: 'A brief description of the third project and what it does.',
    cover: null,
  },
  {
    id: 4,
    title: 'Project Four',
    description: 'A brief description of the fourth project and what it does.',
    cover: null,
  },
  {
    id: 5,
    title: 'Project Five',
    description: 'A brief description of the fifth project and what it does.',
    cover: null,
  },
  {
    id: 6,
    title: 'Project Six',
    description: 'A brief description of the sixth project and what it does.',
    cover: null,
  },
  {
    id: 7,
    title: 'Project Seven',
    description: 'A brief description of the seventh project and what it does.',
    cover: null,
  },
  {
    id: 8,
    title: 'Project Eight',
    description: 'A brief description of the eighth project and what it does.',
    cover: null,
  },
  {
    id: 9,
    title: 'Project Nine',
    description: 'A brief description of the ninth project and what it does.',
    cover: null,
  },
  {
    id: 10,
    title: 'Project Ten',
    description: 'A brief description of the tenth project and what it does.',
    cover: null,
  },
  {
    id: 11,
    title: 'Project Eleven',
    description: 'A brief description of the eleventh project and what it does.',
    cover: null,
  },
  {
    id: 12,
    title: 'Project Twelve',
    description: 'A brief description of the twelfth project and what it does.',
    cover: null,
  },
]

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
      className="min-h-screen relative p-8 md:p-12 lg:p-24"
      style={{ backgroundColor: '#F5F7FA' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <Link
            href="/"
            className="text-lg md:text-xl text-black font-aldrich font-thin-aldrich hover:opacity-70 transition-opacity"
          >
            Nurana Rustamli
          </Link>
          <h1 className="text-4xl md:text-5xl text-black font-aldrich font-thin-aldrich mt-6">
            Projects
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="
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
              {project.cover ? (
                <img
                  src={project.cover}
                  alt={project.title}
                  className="w-full aspect-[16/10] object-cover"
                />
              ) : (
                <div className="w-full aspect-[16/10] bg-gray-300/40 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Cover Image</span>
                </div>
              )}
              <div className="p-5">
                <h2 className="text-lg font-semibold text-black mb-2">
                  {project.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
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
      </div>
    </main>
  )
}
