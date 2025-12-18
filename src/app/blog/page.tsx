import Link from 'next/link'

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-gray-600 mb-8">Coming soon...</p>
        <Link 
          href="/" 
          className="text-purple-500 hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  )
}

