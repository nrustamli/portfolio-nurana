import Star3D from '@/components/Star3D'
import NavigationCard from '@/components/NavigationCard'
import { navigationItems } from '@/lib/constants'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <main className="min-h-screen relative p-8 md:p-12 lg:p-24 bg-[#F5F7FA] dark:bg-[#1c1336]">
      {/* Name + Star - Top Center */}
      <div className="w-full flex justify-center items-center gap-4 mb-8 lg:mb-12">
        <div className="w-40 h-40 flex-shrink-0 overflow-hidden">
          <Star3D className="w-full h-full" minHeight="0" />
        </div>
        <a href="/" className="text-4xl md:text-5xl lg:text-6xl text-black dark:text-white font-aldrich font-thin-aldrich hover:opacity-70 transition-opacity cursor-pointer">
          Nurana Rustamli
        </a>
      </div>

      {/* About Me */}
      <div className="w-full flex justify-center mb-10 lg:mb-16">
        <p className="text-base md:text-lg text-gray-400 text-center max-w-3xl leading-relaxed">
          I&apos;m an engineer passionate about integrating artificial intelligence into impactful solutions.
          On this site you&apos;ll find projects I&apos;ve built in my free time and research work from my UCL postgraduate degree in the <b>Projects</b> section.
          You can also get in touch via <b>Contact Me</b>, download my <b>Resume</b>, or read my thoughts on tech, design and AI in the <b>Blog</b>.
        </p>
      </div>

      {/* Navigation Cards - Horizontal Grid */}
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
          {navigationItems.map((item) => (
            <NavigationCard
              key={item.href}
              iconName={item.iconName}
              iconPath={item.iconPath}
              title={item.title}
              href={item.href}
              color={item.color}
            />
          ))}
        </div>
      </div>

      <ThemeToggle />
    </main>
  )
}
