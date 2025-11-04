"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/store/product-store";
import { extendedCategories, extendedSubCategories } from "@/data/mock-data-extended";

interface CategoryFilterProps {
  categoryId?: number;
}

export function CategoryFilter({ categoryId }: CategoryFilterProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const { filters, setFilters } = useProductStore();
  
  // Mock data'dan kategorileri çek
  const categories = extendedCategories;
  const subCategories = extendedSubCategories;

  const handleCategorySelect = async (categoryId: number | undefined) => {
    setFilters({
      ...filters,
      categoryId,
      pageNumber: 1,
    });

    // Anlık filtreleme için products'ı yeniden yükle
    const { ProductService } = await import("@/services/product-service");
    const productService = new ProductService();

    try {
      const response = await productService.getProducts({
        ...filters,
        categoryId,
        pageNumber: 1,
      });

      if (response.data.success) {
        const { setProducts } = useProductStore.getState();
        const products = response.data.data;
        setProducts(Array.isArray(products) ? products : []);
      }
    } catch (error) {
      console.error("Error filtering products:", error);
    }
  };

  // Mevcut kategoriye ait alt kategorileri filtrele
  const currentSubCategories = subCategories.filter(sub => sub.categoryId === categoryId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Kategoriler</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-6 w-6"
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      {isExpanded && (
        <div className="space-y-2">
          <Button
            variant={!filters.categoryId ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleCategorySelect(undefined)}
          >
            Tüm Kategoriler
          </Button>

          {categories.map((category) => (
            <Button
              key={category.id}
              variant={filters.categoryId === category.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleCategorySelect(category.id)}
            >
              {category.categoryName}
            </Button>
          ))}
        </div>
      )}

      {/* Alt Kategoriler */}
      {currentSubCategories.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Alt Kategoriler</h3>
          </div>
          <div className="space-y-2">
            {currentSubCategories.map((subCategory) => (
              <Button
                key={subCategory.id}
                variant="ghost"
                className="w-full justify-start text-sm"
                onClick={() => {
                  // Alt kategori seçimi için filtreleme
                  setFilters({
                    ...filters,
                    subCategoryId: subCategory.id,
                    pageNumber: 1,
                  });
                }}
              >
                {subCategory.subCategoryName}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
