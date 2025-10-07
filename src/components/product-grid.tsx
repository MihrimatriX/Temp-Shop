'use client'

import { useEffect } from 'react'
import { ProductCard } from '@/components/product-card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useProductStore } from '@/store/product-store'
import { ProductService } from '@/services/product-service'

interface ProductGridProps {
  categoryId?: number
}

export function ProductGrid({ categoryId }: ProductGridProps) {
  const { 
    products, 
    categories,
    loading, 
    setProducts, 
    setCategories,
    setLoading, 
    setError,
    getFilteredProducts 
  } = useProductStore()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Mock data for now - replace with actual API call
        const mockProducts = [
          {
            id: 1,
            productName: "Premium Laptop",
            unitPrice: 25000,
            unitInStock: 15,
            quantityPerUnit: "1 adet",
            category: { id: 1, categoryName: "Elektronik", isActive: true },
            description: "Yüksek performanslı laptop",
            imageUrl: "https://picsum.photos/400/300?random=1",
            discount: 10,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            productName: "Wireless Headphones",
            unitPrice: 1200,
            unitInStock: 25,
            quantityPerUnit: "1 adet",
            category: { id: 1, categoryName: "Elektronik", isActive: true },
            description: "Bluetooth kulaklık",
            imageUrl: "https://picsum.photos/400/300?random=2",
            discount: 0,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 3,
            productName: "Smartphone",
            unitPrice: 18000,
            unitInStock: 8,
            quantityPerUnit: "1 adet",
            category: { id: 1, categoryName: "Elektronik", isActive: true },
            description: "Son teknoloji akıllı telefon",
            imageUrl: "https://picsum.photos/400/300?random=3",
            discount: 15,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 4,
            productName: "Running Shoes",
            unitPrice: 800,
            unitInStock: 30,
            quantityPerUnit: "1 çift",
            category: { id: 2, categoryName: "Spor", isActive: true },
            description: "Rahat koşu ayakkabısı",
            imageUrl: "https://picsum.photos/400/300?random=4",
            discount: 5,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 5,
            productName: "Coffee Maker",
            unitPrice: 1500,
            unitInStock: 12,
            quantityPerUnit: "1 adet",
            category: { id: 3, categoryName: "Ev & Yaşam", isActive: true },
            description: "Otomatik kahve makinesi",
            imageUrl: "https://picsum.photos/400/300?random=5",
            discount: 0,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 6,
            productName: "Designer T-Shirt",
            unitPrice: 300,
            unitInStock: 50,
            quantityPerUnit: "1 adet",
            category: { id: 4, categoryName: "Giyim", isActive: true },
            description: "Pamuklu t-shirt",
            imageUrl: "https://picsum.photos/400/300?random=6",
            discount: 20,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]
        
        setProducts(mockProducts)
        
        // Set categories
        const mockCategories = [
          { id: 1, categoryName: "Elektronik", isActive: true },
          { id: 2, categoryName: "Spor", isActive: true },
          { id: 3, categoryName: "Ev & Yaşam", isActive: true },
          { id: 4, categoryName: "Giyim", isActive: true },
          { id: 5, categoryName: "Kitap", isActive: true }
        ];
        setCategories(mockCategories);
      } catch (error) {
        setError('Ürünler yüklenirken hata oluştu')
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [setProducts, setCategories, setLoading, setError])

  const filteredProducts = getFilteredProducts()

  if (loading) {
    return <LoadingSpinner size="lg" />
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-muted-foreground">
          Ürün bulunamadı
        </h3>
        <p className="text-muted-foreground mt-2">
          Arama kriterlerinizi değiştirerek tekrar deneyin.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Ürünler ({filteredProducts.length})
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
