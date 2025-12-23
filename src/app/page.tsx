import Star3D from '@/components/Star3D'
import NavigationCard from '@/components/NavigationCard'
import { navigationItems } from '@/lib/constants'

export default function Home() {
  return (
    <main className="min-h-screen relative p-8 md:p-12 lg:p-24" style={{ backgroundColor: '#F5F7FA' }}>
      {/* Name - Top Center */}
      <div className="w-full flex justify-center mb-8 lg:mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-black font-aldrich font-thin-aldrich">
          Nurana Rustamli
        </h1>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
        {/* Left Side - 3D Star */}
        <div className="w-full lg:w-[60%] flex flex-col items-start justify-start relative">
          <div className="w-full h-[60vh] lg:h-[80vh] flex items-center justify-center">
            <Star3D className="w-full h-full" />
          </div>
        </div>

        {/* Right Side - Navigation Cards */}
        <div className="w-full lg:w-[40%] flex flex-col items-center justify-center pt-8 lg:pt-16 lg:mt-16">
          {/* Navigation Cards Grid */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
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
      </div>
    </main>
  )
}
