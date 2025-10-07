import { Suspense } from 'react'
import { ProductGrid } from '@/components/product-grid'
import { SearchBar } from '@/components/search-bar'
import { CategoryFilter } from '@/components/category-filter'
import { HeroSection } from '@/components/hero-section'
import { CampaignGrid } from '@/components/campaign-grid'
import { CategoryGrid } from '@/components/category-grid'
import { PersonalizedRecommendations } from '@/components/personalized-recommendations'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Campaign Section */}
      <div className="container mx-auto px-4 py-8">
        <CampaignGrid />
      </div>

      {/* Category Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Kategoriler</h2>
          <CategoryGrid />
        </div>
      </div>

      {/* Personalized Recommendations */}
      <div className="container mx-auto px-4 py-8">
        <PersonalizedRecommendations />
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-4 space-y-6">
              <SearchBar />
              <CategoryFilter />
            </div>
          </aside>
          
          {/* Product Grid */}
          <main className="lg:w-3/4">
            <Suspense fallback={<LoadingSpinner />}>
              <ProductGrid />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}
