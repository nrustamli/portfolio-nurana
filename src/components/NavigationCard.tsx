'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import ProjectsIcon from '@/components/ProjectsIcon'
import ContactIcon from '@/components/ContactIcon'
import BlogIcon from '@/components/BlogIcon'
import ResumeIcon from '@/components/ResumeIcon'

const inlineIconMap: Record<string, React.FC<{ className?: string }>> = {
  '/images/icons/projects_icon.svg': ProjectsIcon,
  '/images/icons/contact_icon.svg': ContactIcon,
  '/images/icons/blog_icon.svg': BlogIcon,
  '/images/icons/resume_icon.svg': ResumeIcon,
}

interface NavigationCardProps {
  iconName?: string // For Lucide icons
  iconPath?: string // For custom image icons
  title: string
  href: string
  color?: 'purple' | 'gray' | 'black'
}

const colorClasses = {
  purple: 'text-purple-500',
  gray: 'text-gray-600',
  black: 'text-black',
}

// Icon mapping - maps string names to actual icon components
const iconMap: Record<string, LucideIcon> = {
  FolderKanban: LucideIcons.FolderKanban,
  Send: LucideIcons.Send,
  FileText: LucideIcons.FileText,
  FileCheck: LucideIcons.FileCheck,
} as Record<string, LucideIcon>

export default function NavigationCard({
  iconName,
  iconPath,
  title,
  href,
  color = 'purple',
}: NavigationCardProps) {
  const Icon = iconName ? iconMap[iconName] : null
  const InlineIcon = iconPath ? inlineIconMap[iconPath] : undefined

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="
          group
          bg-white/20
          backdrop-blur-md
          border border-white/30
          rounded-lg
          shadow-lg
          hover:shadow-xl
          hover:bg-white/30
          transition-all
          duration-300
          p-6
          cursor-pointer
          h-full
          flex
          flex-col
          items-center
          justify-center
          relative
        "
      >
        {InlineIcon ? (
          // Animated inline SVG icon
          <div className="mb-4 w-12 h-12 flex items-center justify-center">
            <InlineIcon className="w-full h-full" />
          </div>
        ) : iconPath ? (
          // Static image icon fallback
          <div className="mb-4 w-12 h-12 relative flex items-center justify-center">
            <Image
              src={iconPath}
              alt={`${title} icon`}
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
        ) : Icon ? (
          // Lucide icon
          <Icon className={cn('w-12 h-12 mb-4', colorClasses[color])} />
        ) : (
          // Fallback
          <LucideIcons.FileText className={cn('w-12 h-12 mb-4', colorClasses[color])} />
        )}
        <h3 className="text-lg font-medium text-black dark:text-white">{title}</h3>
      </motion.div>
    </Link>
  )
}

