'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'

const posts = [
  {
    id: 1,
    title: 'Blog Post One',
    description: 'A brief summary of the first blog post and what it covers.',
    cover: null,
  },
  {
    id: 2,
    title: 'Blog Post Two',
    description: 'A brief summary of the second blog post and what it covers.',
    cover: null,
  },
  {
    id: 3,
    title: 'Blog Post Three',
    description: 'A brief summary of the third blog post and what it covers.',
    cover: null,
  },
  {
    id: 4,
    title: 'Blog Post Four',
    description: 'A brief summary of the fourth blog post and what it covers.',
    cover: null,
  },
  {
    id: 5,
    title: 'Blog Post Five',
    description: 'A brief summary of the fifth blog post and what it covers.',
    cover: null,
  },
  {
    id: 6,
    title: 'Blog Post Six',
    description: 'A brief summary of the sixth blog post and what it covers.',
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

export default function BlogPage() {
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
            Blog
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
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
              {post.cover ? (
                <img
                  src={post.cover}
                  alt={post.title}
                  className="w-full aspect-[16/10] object-cover"
                />
              ) : (
                <div className="w-full aspect-[16/10] bg-gray-300/40 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Cover Image</span>
                </div>
              )}
              <div className="p-5">
                <h2 className="text-lg font-semibold text-black mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {post.description}
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
