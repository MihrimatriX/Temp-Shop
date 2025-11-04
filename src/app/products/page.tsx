"use client";

import { Suspense, useState, useEffect } from "react";
import { Metadata } from "next";
import { ProductGrid } from "@/components/product-grid";
import { CategorySidebar } from "@/components/category-sidebar";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProductStore } from "@/store/product-store";
import { ProductService } from "@/services/product-service";
import { CategoryService } from "@/services/category-service";
import { Product, Category } from "@/types";
import { Filter, Grid, List, SortAsc, SortDesc, Package } from "lucide-react";

export default function ProductsPage() {
  const { products, categories, loading, setProducts, setCategories, setLoading } = useProductStore();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "price" | "rating" | "createdAt">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showSidebar, setShowSidebar] = useState(true);
  const [filters, setFilters] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 12;

  // Load products and categories
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load products
        const productService = new ProductService();
        const productResponse = await productService.getProducts();
        if (productResponse.data.success) {
          setProducts(productResponse.data.data);
          setFilteredProducts(productResponse.data.data);
          setTotalProducts(productResponse.data.data.length);
          setTotalPages(Math.ceil(productResponse.data.data.length / productsPerPage));
        }

        // Load categories
        const categoryService = new CategoryService();
        const categoryResponse = await categoryService.getCategories();
        if (categoryResponse.data.success) {
          setCategories(categoryResponse.data.data);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [setProducts, setCategories, setLoading]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category?.id)
      );
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

    setFilteredProducts(filtered);
    setTotalProducts(filtered.length);
    setTotalPages(Math.ceil(filtered.length / productsPerPage));
    setCurrentPage(1);
  }, [products, filters, sortBy, sortOrder]);

  // Get paginated products
  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.categories && filters.categories.length > 0) count++;
    if (filters.brands && filters.brands.length > 0) count++;
    if (filters.ratings && filters.ratings.length > 0) count++;
    if (filters.priceRange && (filters.priceRange.min > 0 || filters.priceRange.max < 10000)) count++;
    if (filters.discountOnly) count++;
    if (filters.freeShipping) count++;
    if (filters.stockStatus && filters.stockStatus !== "all") count++;
    return count;
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Tüm Ürünler</h1>
          <p className="text-muted-foreground">
            {totalProducts} ürün bulundu
          </p>
        </div>

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
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {filteredProducts.length} ürün bulundu
                </span>
                {getActiveFiltersCount() > 0 && (
                  <Badge variant="secondary">
                    {getActiveFiltersCount()} filtre aktif
                  </Badge>
                )}
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

            {/* Sort Controls */}
            <Card className="mb-6">
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
                    {getActiveFiltersCount() > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-red-600 hover:text-red-700"
                      >
                        Filtreleri Temizle
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner />
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="space-y-6">
                <ProductGrid 
                  products={getPaginatedProducts()} 
                  viewMode={viewMode} 
                  loading={loading} 
                />
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      Önceki
                    </Button>
                    
                    <div className="flex items-center gap-1">
                      {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        const page = i + 1;
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        );
                      })}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Sonraki
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Ürün Bulunamadı</h3>
                  <p className="text-muted-foreground">
                    Seçilen kriterlere uygun ürün bulunamadı.
                  </p>
                  {getActiveFiltersCount() > 0 && (
                    <Button
                      variant="outline"
                      onClick={clearAllFilters}
                      className="mt-4"
                    >
                      Filtreleri Temizle
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
