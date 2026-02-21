import Link from 'next/link'
import Star3D from '@/components/Star3D'
import ThemeToggle from '@/components/ThemeToggle'

export default function ResumePage() {
  return (
    <main className="min-h-screen relative p-8 md:p-12 lg:p-24 bg-[#F5F7FA] dark:bg-[#1c1336]">
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
            Resume
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-4">Coming soon...</p>
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

