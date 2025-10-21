"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Metadata } from "next";
import { ProductGrid } from "@/components/product-grid";
import { CategoryFilter } from "@/components/category-filter";
import { Breadcrumb } from "@/components/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";
import { useProductStore } from "@/store/product-store";
import { ProductService } from "@/services/product-service";
import { Product } from "@/types";
import { useRouter } from "next/navigation";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { products, loading, setProducts, setLoading } = useProductStore();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState<"name" | "price" | "createdAt">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      performSearch();
    }
  }, [searchTerm, sortBy, sortOrder, priceRange]);

  const performSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const productService = new ProductService();
      const response = await productService.searchProducts(searchTerm);
      
      if (response.data.success) {
        let filteredProducts = response.data.data || [];
        
        // Fiyat filtresi uygula
        if (priceRange.min || priceRange.max) {
          const minPrice = priceRange.min ? parseFloat(priceRange.min) : 0;
          const maxPrice = priceRange.max ? parseFloat(priceRange.max) : Infinity;
          
          filteredProducts = filteredProducts.filter(
            product => product.unitPrice >= minPrice && product.unitPrice <= maxPrice
          );
        }
        
        // Sıralama uygula
        filteredProducts.sort((a, b) => {
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
        
        setProducts(filteredProducts);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      performSearch();
    }
  };

  const clearFilters = () => {
    setPriceRange({ min: "", max: "" });
    setSortBy("name");
    setSortOrder("asc");
  };

  const getSortIcon = () => {
    return sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Arama", href: "/search" },
          ]}
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {searchTerm ? `"${searchTerm}" için arama sonuçları` : "Ürün Arama"}
          </h1>
          <p className="text-muted-foreground">
            {searchTerm && products.length > 0 
              ? `${products.length} ürün bulundu`
              : searchTerm && products.length === 0
              ? "Arama kriterlerinize uygun ürün bulunamadı"
              : "Aradığınız ürünü bulun"
            }
          </p>
        </div>

        {/* Arama Formu */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Ürün, kategori veya marka ara..."
                  className="pl-10"
                />
              </div>
              <Button type="submit" disabled={!searchTerm.trim()}>
                Ara
              </Button>
            </form>
          </CardContent>
        </Card>

        {searchTerm && (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filtreler */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filtreler
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className="ml-auto"
                    >
                      {showFilters ? "Gizle" : "Göster"}
                    </Button>
                  </CardTitle>
                </CardHeader>
                {showFilters && (
                  <CardContent className="space-y-4">
                    {/* Fiyat Aralığı */}
                    <div>
                      <h3 className="font-medium mb-2">Fiyat Aralığı</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                        />
                        <Input
                          type="number"
                          placeholder="Max"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                        />
                      </div>
                    </div>

                    {/* Sıralama */}
                    <div>
                      <h3 className="font-medium mb-2">Sıralama</h3>
                      <div className="space-y-2">
                        <Button
                          variant={sortBy === "name" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSortBy("name")}
                          className="w-full justify-start"
                        >
                          İsim
                        </Button>
                        <Button
                          variant={sortBy === "price" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSortBy("price")}
                          className="w-full justify-start"
                        >
                          Fiyat
                        </Button>
                        <Button
                          variant={sortBy === "createdAt" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSortBy("createdAt")}
                          className="w-full justify-start"
                        >
                          Tarih
                        </Button>
                      </div>
                    </div>

                    {/* Sıralama Yönü */}
                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                        className="w-full"
                      >
                        {getSortIcon()}
                        {sortOrder === "asc" ? "Artan" : "Azalan"}
                      </Button>
                    </div>

                    {/* Filtreleri Temizle */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="w-full"
                    >
                      Filtreleri Temizle
                    </Button>
                  </CardContent>
                )}
              </Card>
            </div>

            {/* Arama Sonuçları */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
              ) : products.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {products.length} ürün bulundu
                      </span>
                      {(priceRange.min || priceRange.max) && (
                        <Badge variant="secondary">
                          Fiyat: {priceRange.min || "Min"} - {priceRange.max || "Max"} ₺
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <ProductGrid products={products} />
                </div>
              ) : searchTerm ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">Ürün Bulunamadı</h3>
                    <p className="text-muted-foreground mb-4">
                      "{searchTerm}" için arama kriterlerinize uygun ürün bulunamadı.
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Öneriler:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Farklı anahtar kelimeler deneyin</li>
                        <li>• Daha genel terimler kullanın</li>
                        <li>• Yazım hatalarını kontrol edin</li>
                        <li>• Filtreleri temizleyin</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">Ürün Arayın</h3>
                    <p className="text-muted-foreground">
                      Aradığınız ürünü bulmak için yukarıdaki arama kutusunu kullanın.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
