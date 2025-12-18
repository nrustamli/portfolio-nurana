export interface NavigationItem {
  title: string
  href: string
  iconName: string // Store as string instead of component
  color: 'purple' | 'gray' | 'black'
}

export const navigationItems: NavigationItem[] = [
  {
    title: "projects",
    href: "/projects",
    iconName: "FolderKanban",
    color: "purple",
  },
  {
    title: "contact me",
    href: "/contact",
    iconName: "Send",
    color: "gray",
  },
  {
    title: "blog",
    href: "/blog",
    iconName: "FileText",
    color: "black",
  },
  {
    title: "resume",
    href: "/resume",
    iconName: "FileCheck",
    color: "purple",
  },
];

export const socialLinks = {
  github: "https://github.com/nrustamli",
  linkedin: "https://linkedin.com/in/your-profile", // Update with your LinkedIn
} as const;

