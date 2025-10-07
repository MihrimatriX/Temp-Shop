import { Metadata } from 'next'
import { CategoryGrid } from '@/components/category-grid'
import { HeroSection } from '@/components/hero-section'

export const metadata: Metadata = {
  title: 'Kategoriler - E-Ticaret Sitesi',
  description: 'Tüm ürün kategorilerini keşfedin. Elektronik, moda, ev & yaşam ve daha fazlası.',
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen">
      <HeroSection 
        title="Kategoriler"
        subtitle="İhtiyacınız olan ürünleri kategorilere göre keşfedin"
        showSearch={true}
      />
      <div className="container mx-auto px-4 py-8">
        <CategoryGrid />
      </div>
    </div>
  )
}
