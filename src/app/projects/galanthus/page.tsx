'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import FlowerPointCloud3D from '@/components/FlowerPointCloud3D'
import Star3D from '@/components/Star3D'
import ThemeToggle from '@/components/ThemeToggle'

export default function GalanthusPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] dark:bg-[#1c1336]">

      {/* Nav */}
      <div className="px-8 md:px-12 lg:px-16 pt-8 md:pt-10">
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
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="text-center px-8 pt-16 pb-8"
      >
        <h1
          className="text-5xl md:text-6xl text-black dark:text-white font-aldrich font-thin-aldrich mb-4 cursor-pointer hover:opacity-70 transition-opacity"
          onClick={() => window.location.reload()}
        >
          Galanthus
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto mb-8">
          A small group research project that suggests plan for a blockchain-powered disaster relief platform.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://github.com/nrustamli/Galanthus"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </motion.div>

      {/* 3D element */}
      <div className="relative w-full h-[55vh]">
        <FlowerPointCloud3D xLookAt={0} />
      </div>

      {/* Blog post */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
        className="max-w-2xl mx-auto px-8 md:px-12 py-16"
      >
        <h2 className="text-2xl font-aldrich text-black dark:text-white mb-4">Introduction</h2>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <h2 className="text-2xl font-aldrich text-black dark:text-white mb-4">Problem Statement</h2>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <h3 className="text-lg font-aldrich text-black dark:text-white mb-3">Disaster Relief Challenges</h3>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-10">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>

        <h2 className="text-2xl font-aldrich text-black dark:text-white mb-4">Proposed Solution</h2>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
        </p>

        <h3 className="text-lg font-aldrich text-black dark:text-white mb-3">Blockchain Architecture</h3>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
          Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis eligendi optio.
        </p>

        <h3 className="text-lg font-aldrich text-black dark:text-white mb-3">Trust &amp; Transparency</h3>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-10">
          Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur a sapiente delectus.
        </p>

        <h2 className="text-2xl font-aldrich text-black dark:text-white mb-4">Research Findings</h2>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-10">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.
        </p>

        <h2 className="text-2xl font-aldrich text-black dark:text-white mb-4">Conclusion</h2>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
          Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
        </p>
      </motion.div>

      {/* Back link */}
      <div className="max-w-2xl mx-auto px-8 md:px-12 pb-16">
        <Link href="/projects" className="text-purple-500 hover:underline text-sm md:text-base">
          ← Back to Projects
        </Link>
      </div>

      <ThemeToggle />
    </main>
  )
}
