"use client";

import { useState, useEffect } from "react";
import { Metadata } from "next";
import { CategoryGrid } from "@/components/category-grid";
import { CategorySidebar } from "@/components/category-sidebar";
import { ProductGrid } from "@/components/product-grid";
import { HeroSection } from "@/components/hero-section";
import { Breadcrumb } from "@/components/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProductStore } from "@/store/product-store";
import { CategoryService } from "@/services/category-service";
import { ProductService } from "@/services/product-service";
import { Category, Product } from "@/types";
import { Filter, Grid, List, SortAsc, SortDesc, Package } from "lucide-react";

export default function CategoriesPage() {
  const { products, categories, loading, setProducts, setCategories, setLoading } = useProductStore();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "price" | "rating" | "createdAt">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showSidebar, setShowSidebar] = useState(true);
  const [filters, setFilters] = useState<any>({});

  // Load categories and products
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load categories
        const categoryService = new CategoryService();
        const categoryResponse = await categoryService.getCategories();
        if (categoryResponse.data.success) {
          setCategories(categoryResponse.data.data);
        }

        // Load products
        const productService = new ProductService();
        const productResponse = await productService.getProducts();
        if (productResponse.data.success) {
          setProducts(productResponse.data.data);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [setProducts, setCategories, setLoading]);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const getFilteredProducts = () => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category?.id === selectedCategory.id);
    }

    // Price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(product => 
        product.unitPrice >= filters.priceRange.min && 
        product.unitPrice <= filters.priceRange.max
      );
    }

    // Brand filter
    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(product => 
        filters.brands.some((brand: string) => 
          product.productName.toLowerCase().includes(brand.toLowerCase())
        )
      );
    }

    // Rating filter
    if (filters.ratings && filters.ratings.length > 0) {
      filtered = filtered.filter(product => 
        product.rating && filters.ratings.some((rating: number) => 
          product.rating! >= rating
        )
      );
    }

    // Stock status filter
    if (filters.stockStatus === "inStock") {
      filtered = filtered.filter(product => product.unitInStock > 0);
    } else if (filters.stockStatus === "outOfStock") {
      filtered = filtered.filter(product => product.unitInStock === 0);
    }

    // Discount filter
    if (filters.discountOnly) {
      filtered = filtered.filter(product => product.discount && product.discount > 0);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case "name":
          aValue = a.productName.toLowerCase();
          bValue = b.productName.toLowerCase();
          break;
        case "price":
          aValue = a.unitPrice;
          bValue = b.unitPrice;
          break;
        case "rating":
          aValue = a.rating || 0;
          bValue = b.rating || 0;
          break;
        case "createdAt":
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        default:
          return 0;
      }
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="min-h-screen">
      <HeroSection
        title="Kategoriler"
        subtitle="İhtiyacınız olan ürünleri kategorilere göre keşfedin"
        showSearch={true}
      />
      
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Kategoriler", href: "/categories" },
          ]}
        />

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <CategorySidebar
                onFiltersChange={handleFiltersChange}
                className="space-y-4"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">
                  {selectedCategory ? selectedCategory.categoryName : "Tüm Kategoriler"}
                </h1>
                <p className="text-muted-foreground">
                  {filteredProducts.length} ürün bulundu
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtreler
                </Button>
                
                <div className="flex items-center gap-1 border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Categories Grid */}
            {!selectedCategory && (
              <div className="mb-8">
                <CategoryGrid onCategorySelect={handleCategorySelect} />
              </div>
            )}

            {/* Products */}
            {selectedCategory && (
              <div className="space-y-4">
                {/* Sort Controls */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <label className="text-sm font-medium">Sırala:</label>
                          <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="p-2 border rounded-md text-sm"
                            aria-label="Sıralama kriteri seçin"
                          >
                            <option value="name">İsim</option>
                            <option value="price">Fiyat</option>
                            <option value="rating">Puan</option>
                            <option value="createdAt">Tarih</option>
                          </select>
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                        >
                          {sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                          {sortOrder === "asc" ? "Artan" : "Azalan"}
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {filteredProducts.length} ürün
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Products Grid */}
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <ProductGrid products={filteredProducts} viewMode={viewMode} />
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">Ürün Bulunamadı</h3>
                      <p className="text-muted-foreground">
                        Seçilen kriterlere uygun ürün bulunamadı.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
