import Star3D from '@/components/Star3D'
import NavigationCard from '@/components/NavigationCard'
import SocialLinks from '@/components/SocialLinks'
import { navigationItems } from '@/lib/constants'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 relative p-8 md:p-12 lg:p-24">
      {/* Name - Top Center */}
      <div className="w-full flex justify-center mb-8 lg:mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black">
          Nurana Rustamli
        </h1>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left Side - 3D Star */}
        <div className="w-full h-[400px] lg:h-[600px] flex items-center justify-center">
          <Star3D className="w-full h-full" />
        </div>

        {/* Right Side - Navigation Cards */}
        <div className="flex flex-col items-center lg:items-start justify-center min-h-[400px] lg:min-h-[600px]">
          {/* Navigation Cards Grid */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            {navigationItems.map((item) => (
              <NavigationCard
                key={item.href}
                iconName={item.iconName}
                title={item.title}
                href={item.href}
                color={item.color}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Social Links - Bottom Left */}
      <div className="absolute bottom-8 left-8 md:left-12 lg:left-24">
        <SocialLinks />
      </div>
    </main>
  )
}
