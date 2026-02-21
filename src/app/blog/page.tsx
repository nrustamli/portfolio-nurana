'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import Star3D from '@/components/Star3D'
import ThemeToggle from '@/components/ThemeToggle'

const posts = [
  { id: 1, title: 'Blog Post One' },
  { id: 2, title: 'Blog Post Two' },
  { id: 3, title: 'Blog Post Three' },
  { id: 4, title: 'Blog Post Four' },
  { id: 5, title: 'Blog Post Five' },
  { id: 6, title: 'Blog Post Six' },
]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' as const },
  }),
}

export default function BlogPage() {
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
            Blog
          </h1>
        </div>

        <div className="flex flex-col gap-0 max-w-2xl">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ x: 8 }}
              whileTap={{ scale: 0.98 }}
              className="
                bg-white/20 dark:bg-white/5
                backdrop-blur-md
                border-b border-white/30 dark:border-white/10
                py-4 px-5
                hover:bg-white/30 dark:hover:bg-white/10
                transition-all
                duration-300
                cursor-pointer
              "
            >
              <h2 className="text-lg font-semibold text-black dark:text-white font-aldrich">
                {post.title}
              </h2>
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

        <ThemeToggle />
      </div>
    </main>
  )
}
