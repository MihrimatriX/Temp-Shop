"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useProductStore } from "@/store/product-store";
import { CategoryService } from "@/services/category-service";
import { SubCategoryService } from "@/services/subcategory-service";
import { Category, SubCategory } from "@/types";
import {
  ChevronDown,
  ChevronRight,
  Filter,
  X,
  Star,
  Truck,
  Tag,
  Package,
  Zap,
} from "lucide-react";

interface CategorySidebarProps {
  className?: string;
  onFiltersChange?: (filters: any) => void;
}

interface FilterState {
  categories: number[];
  priceRange: { min: number; max: number };
  brands: string[];
  ratings: number[];
  stockStatus: "all" | "inStock" | "outOfStock";
  discountOnly: boolean;
  freeShipping: boolean;
  sortBy: "name" | "price" | "rating" | "createdAt";
  sortOrder: "asc" | "desc";
}

export function CategorySidebar({ className, onFiltersChange }: CategorySidebarProps) {
  const { categories, filters } = useProductStore();
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterState>({
    categories: [],
    priceRange: { min: 0, max: 10000 },
    brands: [],
    ratings: [],
    stockStatus: "all",
    discountOnly: false,
    freeShipping: false,
    sortBy: "name",
    sortOrder: "asc",
  });

  // Mock brand data
  const brands = [
    "Samsung", "Apple", "Sony", "LG", "Xiaomi", "Huawei", "Nike", "Adidas", 
    "Puma", "Zara", "H&M", "Levi's", "Calvin Klein", "Tommy Hilfiger"
  ];

  // Load subcategories
  useEffect(() => {
    const loadSubCategories = async () => {
      try {
        setLoading(true);
        const subCategoryService = new SubCategoryService();
        const response = await subCategoryService.getSubCategories();
        if (response.data.success) {
          setSubCategories(response.data.data);
        }
      } catch (error) {
        console.error("Error loading subcategories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSubCategories();
  }, []);

  const toggleCategory = (categoryId: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleCategoryToggle = (categoryId: number) => {
    const newCategories = localFilters.categories.includes(categoryId)
      ? localFilters.categories.filter(id => id !== categoryId)
      : [...localFilters.categories, categoryId];
    
    const updatedFilters = { ...localFilters, categories: newCategories };
    setLocalFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = localFilters.brands.includes(brand)
      ? localFilters.brands.filter(b => b !== brand)
      : [...localFilters.brands, brand];
    
    const updatedFilters = { ...localFilters, brands: newBrands };
    setLocalFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const handleRatingToggle = (rating: number) => {
    const newRatings = localFilters.ratings.includes(rating)
      ? localFilters.ratings.filter(r => r !== rating)
      : [...localFilters.ratings, rating];
    
    const updatedFilters = { ...localFilters, ratings: newRatings };
    setLocalFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const handlePriceRangeChange = (field: 'min' | 'max', value: number) => {
    const updatedFilters = {
      ...localFilters,
      priceRange: { ...localFilters.priceRange, [field]: value }
    };
    setLocalFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const handleFilterToggle = (filter: keyof FilterState, value: any) => {
    const updatedFilters = { ...localFilters, [filter]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      categories: [],
      priceRange: { min: 0, max: 10000 },
      brands: [],
      ratings: [],
      stockStatus: "all",
      discountOnly: false,
      freeShipping: false,
      sortBy: "name",
      sortOrder: "asc",
    };
    setLocalFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (localFilters.categories.length > 0) count++;
    if (localFilters.brands.length > 0) count++;
    if (localFilters.ratings.length > 0) count++;
    if (localFilters.priceRange.min > 0 || localFilters.priceRange.max < 10000) count++;
    if (localFilters.discountOnly) count++;
    if (localFilters.freeShipping) count++;
    if (localFilters.stockStatus !== "all") count++;
    return count;
  };

  const getSubCategoriesForCategory = (categoryId: number) => {
    return subCategories.filter(sc => sc.categoryId === categoryId);
  };

  return (
    <div className={`w-80 space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-semibold">Filtreler</h2>
        </div>
        {getActiveFiltersCount() > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {getActiveFiltersCount()} aktif
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs text-red-600 hover:text-red-700"
            >
              <X className="w-3 h-3 mr-1" />
              Temizle
            </Button>
          </div>
        )}
      </div>

      {/* Kategoriler */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Package className="w-4 h-4 text-purple-600" />
            Kategoriler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {loading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            categories.map((category) => {
              const categorySubCategories = getSubCategoriesForCategory(category.id);
              const isExpanded = expandedCategories.has(category.id);
              const isSelected = localFilters.categories.includes(category.id);
              
              return (
                <div key={category.id} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={isSelected}
                      onCheckedChange={() => handleCategoryToggle(category.id)}
                    />
                    <Label
                      htmlFor={`category-${category.id}`}
                      className="flex-1 cursor-pointer text-sm"
                    >
                      {category.categoryName}
                    </Label>
                    {categorySubCategories.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-6 w-6"
                        onClick={() => toggleCategory(category.id)}
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-3 h-3" />
                        ) : (
                          <ChevronRight className="w-3 h-3" />
                        )}
                      </Button>
                    )}
                  </div>
                  
                  {isExpanded && categorySubCategories.length > 0 && (
                    <div className="ml-6 space-y-1">
                      {categorySubCategories.map((subCategory) => (
                        <div key={subCategory.id} className="flex items-center gap-2">
                          <Checkbox
                            id={`subcategory-${subCategory.id}`}
                            checked={localFilters.categories.includes(subCategory.id)}
                            onCheckedChange={() => handleCategoryToggle(subCategory.id)}
                          />
                          <Label
                            htmlFor={`subcategory-${subCategory.id}`}
                            className="flex-1 cursor-pointer text-xs text-gray-600"
                          >
                            {subCategory.subCategoryName}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Fiyat Aralığı */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Tag className="w-4 h-4 text-purple-600" />
            Fiyat Aralığı
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="min-price" className="text-xs text-gray-600">
                Min (₺)
              </Label>
              <Input
                id="min-price"
                type="number"
                value={localFilters.priceRange.min}
                onChange={(e) => handlePriceRangeChange('min', Number(e.target.value))}
                className="text-sm"
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="max-price" className="text-xs text-gray-600">
                Max (₺)
              </Label>
              <Input
                id="max-price"
                type="number"
                value={localFilters.priceRange.max}
                onChange={(e) => handlePriceRangeChange('max', Number(e.target.value))}
                className="text-sm"
                placeholder="10000"
              />
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {localFilters.priceRange.min.toLocaleString("tr-TR")} ₺ - {localFilters.priceRange.max.toLocaleString("tr-TR")} ₺
          </div>
        </CardContent>
      </Card>

      {/* Markalar */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Package className="w-4 h-4 text-purple-600" />
            Markalar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center gap-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={localFilters.brands.includes(brand)}
                onCheckedChange={() => handleBrandToggle(brand)}
              />
              <Label
                htmlFor={`brand-${brand}`}
                className="flex-1 cursor-pointer text-sm"
              >
                {brand}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Puan */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Star className="w-4 h-4 text-purple-600" />
            Puan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={localFilters.ratings.includes(rating)}
                onCheckedChange={() => handleRatingToggle(rating)}
              />
              <Label
                htmlFor={`rating-${rating}`}
                className="flex-1 cursor-pointer text-sm flex items-center gap-1"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">ve üzeri</span>
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Stok Durumu */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Package className="w-4 h-4 text-purple-600" />
            Stok Durumu
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="in-stock"
              checked={localFilters.stockStatus === "inStock"}
              onCheckedChange={() => handleFilterToggle('stockStatus', 'inStock')}
            />
            <Label htmlFor="in-stock" className="flex-1 cursor-pointer text-sm">
              Stokta Var
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="out-of-stock"
              checked={localFilters.stockStatus === "outOfStock"}
              onCheckedChange={() => handleFilterToggle('stockStatus', 'outOfStock')}
            />
            <Label htmlFor="out-of-stock" className="flex-1 cursor-pointer text-sm">
              Stokta Yok
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Özel Filtreler */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-600" />
            Özel Filtreler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="discount-only"
              checked={localFilters.discountOnly}
              onCheckedChange={(checked) => handleFilterToggle('discountOnly', checked)}
            />
            <Label htmlFor="discount-only" className="flex-1 cursor-pointer text-sm">
              Sadece İndirimli Ürünler
            </Label>
          </div>
          
          <div className="flex items-center gap-2">
            <Checkbox
              id="free-shipping"
              checked={localFilters.freeShipping}
              onCheckedChange={(checked) => handleFilterToggle('freeShipping', checked)}
            />
            <Label htmlFor="free-shipping" className="flex-1 cursor-pointer text-sm flex items-center gap-1">
              <Truck className="w-3 h-3" />
              Ücretsiz Kargo
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Sıralama */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Sıralama</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-2">
            <Label className="text-xs text-gray-600">Sıralama Kriteri</Label>
            <select
              value={localFilters.sortBy}
              onChange={(e) => handleFilterToggle('sortBy', e.target.value)}
              className="w-full p-2 border rounded-md text-sm"
              aria-label="Sıralama kriteri seçin"
            >
              <option value="name">İsim</option>
              <option value="price">Fiyat</option>
              <option value="rating">Puan</option>
              <option value="createdAt">Tarih</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs text-gray-600">Sıralama Yönü</Label>
            <select
              value={localFilters.sortOrder}
              onChange={(e) => handleFilterToggle('sortOrder', e.target.value)}
              className="w-full p-2 border rounded-md text-sm"
              aria-label="Sıralama yönü seçin"
            >
              <option value="asc">Artan</option>
              <option value="desc">Azalan</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
