'use client'

import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="w-full flex justify-center mt-16 pb-4">
      <button
        onClick={toggleTheme}
        className="text-sm text-gray-400 underline hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
      >
        {theme === 'light' ? 'Switch to dark mode ◐' : 'Switch to light mode ◉'}
      </button>
    </div>
  )
}
