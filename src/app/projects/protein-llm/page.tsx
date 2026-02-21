'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import HelixPointCloud3D from '@/components/HelixPointCloud3D'
import Star3D from '@/components/Star3D'
import ThemeToggle from '@/components/ThemeToggle'

export default function ProteinLLMPage() {
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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-5xl text-black dark:text-white font-aldrich font-thin-aldrich mb-10">
            Domain BERT
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left — Three.js visualization */}
            <div className="w-full aspect-square overflow-hidden">
              <HelixPointCloud3D />
            </div>

            {/* Right — Links + Description */}
            <div>
              <div className="flex flex-wrap gap-3 mb-8">
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-2
                    px-4 py-2
                    bg-black text-white
                    rounded-md
                    text-sm font-medium
                    hover:bg-gray-800
                    transition-colors
                  "
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a
                  href="/papers/domain-bert.pdf"
                  download
                  className="
                    inline-flex items-center gap-2
                    px-4 py-2
                    bg-white/30 dark:bg-white/10 text-black dark:text-white
                    border border-white/40 dark:border-white/20
                    rounded-md
                    text-sm font-medium
                    hover:bg-white/50
                    transition-colors
                  "
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download PDF
                </a>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mt-4">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum. Sed ut
                perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae vitae
                dicta sunt explicabo.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mt-4">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
                ipsum quia dolor sit amet, consectetur, adipisci velit.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-16">
          <Link
            href="/projects"
            className="text-purple-500 hover:underline text-sm md:text-base"
          >
            ← Back to Projects
          </Link>
        </div>

        <ThemeToggle />
      </div>
    </main>
  )
}
