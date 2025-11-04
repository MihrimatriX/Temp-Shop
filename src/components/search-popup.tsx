"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  TrendingUp, 
  Clock, 
  Star, 
  Heart, 
  Eye,
  ArrowRight,
  X,
  MapPin
} from "lucide-react";
import { Product } from "@/types";
import { ProductService } from "@/services/product-service";
import { useRouter } from "next/navigation";

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

interface SearchSuggestion {
  id: string;
  text: string;
  type: "product" | "category" | "brand";
  count?: number;
}

interface TrendingProduct {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  category: string;
  rating: number;
  salesCount: number;
}

// Mock data
const searchSuggestions: SearchSuggestion[] = [
  { id: "1", text: "iPhone 15", type: "product", count: 1250 },
  { id: "2", text: "Samsung Galaxy", type: "product", count: 980 },
  { id: "3", text: "Laptop", type: "category", count: 2100 },
  { id: "4", text: "Kulaklık", type: "category", count: 1500 },
  { id: "5", text: "Apple", type: "brand", count: 3200 },
  { id: "6", text: "Nike", type: "brand", count: 1800 },
  { id: "7", text: "Spor Ayakkabı", type: "category", count: 1200 },
  { id: "8", text: "Gaming Mouse", type: "product", count: 750 },
];

const trendingProducts: TrendingProduct[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 89999,
    imageUrl: "https://picsum.photos/100/100?random=1",
    category: "Telefon",
    rating: 4.8,
    salesCount: 1250,
  },
  {
    id: 2,
    name: "MacBook Air M2",
    price: 45999,
    imageUrl: "https://picsum.photos/100/100?random=2",
    category: "Laptop",
    rating: 4.9,
    salesCount: 980,
  },
  {
    id: 3,
    name: "AirPods Pro",
    price: 8999,
    imageUrl: "https://picsum.photos/100/100?random=3",
    category: "Kulaklık",
    rating: 4.7,
    salesCount: 2100,
  },
  {
    id: 4,
    name: "Samsung Galaxy S24",
    price: 79999,
    imageUrl: "https://picsum.photos/100/100?random=4",
    category: "Telefon",
    rating: 4.6,
    salesCount: 1500,
  },
];

const mostSearchedTerms = [
  "iPhone 15",
  "Laptop",
  "Kulaklık",
  "Spor Ayakkabı",
  "Gaming Mouse",
  "Tablet",
  "Smart Watch",
  "Kamera",
];

const recentSearches = [
  "iPhone 15 Pro",
  "MacBook Air",
  "Samsung Galaxy",
  "AirPods",
  "Gaming Laptop",
];

export function SearchPopup({ isOpen, onClose, searchTerm, onSearchTermChange }: SearchPopupProps) {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"suggestions" | "trending" | "recent">("suggestions");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm.trim()) {
      performSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const performSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    try {
      const productService = new ProductService();
      const response = await productService.searchProducts(searchTerm);
      
      if (response.data.success) {
        setSearchResults(response.data.data?.slice(0, 5) || []);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onSearchTermChange(suggestion.text);
    router.push(`/search?q=${encodeURIComponent(suggestion.text)}`);
    // Popup'ı kapatmayalım, kullanıcı manuel olarak kapatabilir
  };

  const handleProductClick = (product: Product) => {
    router.push(`/products/${product.id}`);
    // Popup'ı kapatmayalım, kullanıcı manuel olarak kapatabilir
  };

  const handleTrendingProductClick = (product: TrendingProduct) => {
    router.push(`/products/${product.id}`);
    // Popup'ı kapatmayalım, kullanıcı manuel olarak kapatabilir
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      onClose();
    }
  };

  const clearSearch = () => {
    onSearchTermChange("");
    setSearchResults([]);
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "product":
        return <Search className="w-4 h-4" />;
      case "category":
        return <TrendingUp className="w-4 h-4" />;
      case "brand":
        return <Star className="w-4 h-4" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case "product":
        return "text-blue-600";
      case "category":
        return "text-green-600";
      case "brand":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" onClick={onClose}>
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-4">
        <Card className="shadow-2xl border-0">
          <CardContent className="p-0">
            {/* Search Input */}
            <div className="p-4 border-b">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  ref={inputRef}
                  value={searchTerm}
                  onChange={(e) => onSearchTermChange(e.target.value)}
                  placeholder="Ürün, kategori veya marka ara..."
                  className="pl-10 pr-20 h-12 text-lg"
                />
                {searchTerm && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </form>
            </div>

            {/* Tabs */}
            <div className="flex border-b">
              <Button
                variant={activeTab === "suggestions" ? "default" : "ghost"}
                onClick={() => setActiveTab("suggestions")}
                className="flex-1 rounded-none"
              >
                <Search className="w-4 h-4 mr-2" />
                Öneriler
              </Button>
              <Button
                variant={activeTab === "trending" ? "default" : "ghost"}
                onClick={() => setActiveTab("trending")}
                className="flex-1 rounded-none"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Trend
              </Button>
              <Button
                variant={activeTab === "recent" ? "default" : "ghost"}
                onClick={() => setActiveTab("recent")}
                className="flex-1 rounded-none"
              >
                <Clock className="w-4 h-4 mr-2" />
                Geçmiş
              </Button>
            </div>

            {/* Content */}
            <div className="max-h-96 overflow-y-auto">
              {searchTerm.trim() && searchResults.length > 0 ? (
                // Search Results
                <div className="p-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Arama Sonuçları
                  </h3>
                  <div className="space-y-2">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-md cursor-pointer"
                        onClick={() => handleProductClick(product)}
                      >
                        <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.productName}
                              className="w-full h-full object-cover rounded-md"
                            />
                          ) : (
                            <Search className="w-6 h-6 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{product.productName}</p>
                          <p className="text-xs text-muted-foreground">
                            {product.category?.categoryName}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">
                            {product.unitPrice.toLocaleString("tr-TR")} ₺
                          </p>
                          {product.discount && product.discount > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              %{product.discount} İndirim
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {activeTab === "suggestions" && (
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">
                        Popüler Aramalar
                      </h3>
                      <div className="space-y-2">
                        {searchSuggestions.map((suggestion) => (
                          <div
                            key={suggestion.id}
                            className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md cursor-pointer"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={getSuggestionColor(suggestion.type)}>
                                {getSuggestionIcon(suggestion.type)}
                              </div>
                              <span className="text-sm">{suggestion.text}</span>
                            </div>
                            {suggestion.count && (
                              <Badge variant="secondary" className="text-xs">
                                {suggestion.count}
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "trending" && (
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Günün Favorileri
                      </h3>
                      <div className="space-y-3">
                        {trendingProducts.map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-md cursor-pointer"
                            onClick={() => handleTrendingProductClick(product)}
                          >
                            <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover rounded-md"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{product.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {product.category}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs">{product.rating}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {product.salesCount} satış
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-sm">
                                {product.price.toLocaleString("tr-TR")} ₺
                              </p>
                              <Badge variant="destructive" className="text-xs">
                                Trend
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "recent" && (
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Son Aramalar
                      </h3>
                      <div className="space-y-2">
                        {recentSearches.map((search, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md cursor-pointer"
                            onClick={() => {
                              onSearchTermChange(search);
                              router.push(`/search?q=${encodeURIComponent(search)}`);
                              onClose();
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{search}</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-muted/20">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span>En çok aranan: {mostSearchedTerms[0]}</span>
                  <span>•</span>
                  <span>Trend: {mostSearchedTerms[1]}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>İstanbul</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
