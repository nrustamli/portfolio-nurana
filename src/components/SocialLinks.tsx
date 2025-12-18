import Link from 'next/link'
import { Github, Linkedin } from 'lucide-react'
import { socialLinks } from '@/lib/constants'

export default function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex gap-6 ${className}`}>
      <Link
        href={socialLinks.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:opacity-70 transition-opacity"
        aria-label="GitHub"
      >
        <Github className="w-6 h-6" />
      </Link>
      <Link
        href={socialLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:opacity-70 transition-opacity"
        aria-label="LinkedIn"
      >
        <Linkedin className="w-6 h-6" />
      </Link>
    </div>
  )
}

