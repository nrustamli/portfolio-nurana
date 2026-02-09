import Link from 'next/link'

export default function ResumePage() {
  return (
    <main className="min-h-screen relative p-8 md:p-12 lg:p-24" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <Link
            href="/"
            className="text-lg md:text-xl text-black font-aldrich font-thin-aldrich hover:opacity-70 transition-opacity"
          >
            Nurana Rustamli
          </Link>
          <h1 className="text-4xl md:text-5xl text-black font-aldrich font-thin-aldrich mt-6">
            Resume
          </h1>
          <p className="text-gray-600 mt-4">Coming soon...</p>
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

