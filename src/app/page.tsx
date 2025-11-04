"use client";

import { Suspense, useState, useEffect } from "react";
import { ProductGrid } from "@/components/product-grid";
import { SearchBar } from "@/components/search-bar";
import { CategoryFilter } from "@/components/category-filter";
import { HeroSection } from "@/components/hero-section";
import { CampaignGrid } from "@/components/campaign-grid";
import { CategoryGrid } from "@/components/category-grid";
import { PersonalizedRecommendations } from "@/components/personalized-recommendations";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { StructuredData } from "@/components/structured-data";
import { useProductStore } from "@/store/product-store";
import { ProductService } from "@/services/product-service";
import { CategoryService } from "@/services/category-service";
import { CampaignService } from "@/services/campaign-service";
import { Product, Category, Campaign } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Star, Zap, Truck, Shield, Award } from "lucide-react";


export default function HomePage() {
  const { products, categories, loading, setProducts, setCategories, setLoading } = useProductStore();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Load homepage data
  useEffect(() => {
    const loadHomepageData = async () => {
      try {
        setLoadingData(true);
        
        // Load products
        const productService = new ProductService();
        const productResponse = await productService.getProducts();
        if (productResponse.data.success) {
          setProducts(productResponse.data.data);
          
          // Get featured products (first 8 products)
          setFeaturedProducts(productResponse.data.data.slice(0, 8));
          
          // Get trending products (products with high rating)
          const trending = productResponse.data.data
            .filter(p => p.rating && p.rating >= 4.5)
            .slice(0, 6);
          setTrendingProducts(trending);
          
          // Get new products (recently created)
          const newProducts = productResponse.data.data
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 6);
          setNewProducts(newProducts);
          
          // Get best sellers (products with high stock and rating)
          const bestSellers = productResponse.data.data
            .filter(p => p.unitInStock > 10 && p.rating && p.rating >= 4.0)
            .slice(0, 6);
          setBestSellers(bestSellers);
        }

        // Load categories
        const categoryService = new CategoryService();
        const categoryResponse = await categoryService.getCategories();
        if (categoryResponse.data.success) {
          setCategories(categoryResponse.data.data);
        }

        // Load campaigns
        const campaignService = new CampaignService();
        const campaignResponse = await campaignService.getCampaigns();
        if (campaignResponse.data.success) {
          setCampaigns(campaignResponse.data.data);
        }
      } catch (error) {
        console.error("Error loading homepage data:", error);
      } finally {
        setLoadingData(false);
      }
    };

    loadHomepageData();
  }, [setProducts, setCategories, setLoading]);

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <StructuredData type="website" data={{}} />
      <StructuredData type="organization" data={{}} />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <HeroSection />

        {/* Campaign Section */}
        <div className="container mx-auto px-4 py-8">
          <CampaignGrid campaigns={campaigns} />
        </div>

        {/* Category Section */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Kategoriler</h2>
            <CategoryGrid />
          </div>
        </div>

        {/* Featured Products */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Öne Çıkan Ürünler</h2>
            <Button variant="outline" size="sm">
              Tümünü Gör
            </Button>
          </div>
          <ProductGrid products={featuredProducts} loading={loading} />
        </div>

        {/* Trending Products */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold">Trend Ürünler</h2>
              <Badge variant="secondary" className="ml-2">
                <Star className="w-3 h-3 mr-1" />
                Yüksek Puanlı
              </Badge>
            </div>
            <ProductGrid products={trendingProducts} loading={loading} />
          </div>
        </div>

        {/* New Products */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">Yeni Ürünler</h2>
            <Badge variant="secondary" className="ml-2">
              <Zap className="w-3 h-3 mr-1" />
              Yeni
            </Badge>
          </div>
          <ProductGrid products={newProducts} loading={loading} />
        </div>

        {/* Best Sellers */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-bold">En Çok Satanlar</h2>
              <Badge variant="secondary" className="ml-2">
                <Award className="w-3 h-3 mr-1" />
                Popüler
              </Badge>
            </div>
            <ProductGrid products={bestSellers} loading={loading} />
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="container mx-auto px-4 py-8">
          <PersonalizedRecommendations />
        </div>

        {/* Features Section */}
        <div className="bg-purple-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Neden TempShop?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center p-6">
                <Truck className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-lg font-semibold mb-2">Hızlı Teslimat</h3>
                <p className="text-muted-foreground">
                  Siparişlerinizi 24 saat içinde teslim ediyoruz
                </p>
              </Card>
              <Card className="text-center p-6">
                <Shield className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-lg font-semibold mb-2">Güvenli Ödeme</h3>
                <p className="text-muted-foreground">
                  256-bit SSL şifreleme ile güvenli alışveriş
                </p>
              </Card>
              <Card className="text-center p-6">
                <Star className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-lg font-semibold mb-2">Kaliteli Hizmet</h3>
                <p className="text-muted-foreground">
                  7/24 müşteri desteği ve kalite garantisi
                </p>
              </Card>
            </div>
          </div>
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
                <ProductGrid products={products} loading={loadingData} />
              </Suspense>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
