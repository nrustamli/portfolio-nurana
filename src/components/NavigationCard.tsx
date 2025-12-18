'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavigationCardProps {
  iconName: string // Receive icon name as string
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
  title,
  href,
  color = 'purple',
}: NavigationCardProps) {
  // Get the icon component from the map
  const Icon = iconMap[iconName] || LucideIcons.FileText // Fallback icon

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer h-full flex flex-col items-center justify-center"
      >
        <Icon className={cn('w-12 h-12 mb-4', colorClasses[color])} />
        <h3 className="text-lg font-medium text-black">{title}</h3>
      </motion.div>
    </Link>
  )
}

