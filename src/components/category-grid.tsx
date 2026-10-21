"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/store/product-store";
import { CategoryService } from "@/services/category-service";
import { Category } from "@/types";
import {
  Smartphone,
  Shirt,
  Home,
  Dumbbell,
  Baby,
  Sparkles,
  ShoppingCart,
  Book,
  ShoppingBag,
  Package,
} from "lucide-react";

interface CategoryGridProps {
  onCategorySelect?: (category: Category) => void;
}

// Keyed by Category.categoryName (see extendedCategories).
const categoryStyle: Record<string, [typeof Package, string]> = {
  Kadın: [Shirt, "bg-pink-500"],
  Erkek: [Shirt, "bg-sky-500"],
  "Anne & Çocuk": [Baby, "bg-purple-500"],
  Elektronik: [Smartphone, "bg-blue-500"],
  "Ev & Mobilya": [Home, "bg-green-500"],
  Süpermarket: [ShoppingCart, "bg-yellow-500"],
  Kozmetik: [Sparkles, "bg-rose-500"],
  "Ayakkabı & Çanta": [ShoppingBag, "bg-amber-600"],
  "Spor & Outdoor": [Dumbbell, "bg-orange-500"],
  "Kitap & Kırtasiye": [Book, "bg-indigo-500"],
};

export function CategoryGrid({ onCategorySelect }: CategoryGridProps) {
  const { categories, loading } = useProductStore();
  const [localCategories, setLocalCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryService = new CategoryService();
        const response = await categoryService.getCategories();
        if (response.data.success) {
          setLocalCategories(response.data.data);
        }
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };

    loadCategories();
  }, []);

  const handleCategoryClick = (category: Category) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {[...Array(10)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full" />
              <div className="h-4 bg-muted rounded mb-2" />
              <div className="h-3 bg-muted rounded mb-3" />
              <div className="h-6 bg-muted rounded w-16 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {localCategories.map((category) => {
        const [IconComponent, color] = categoryStyle[category.categoryName] ?? [
          Package,
          "bg-muted-foreground",
        ];

        return (
          <Card
            key={category.id}
            className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => handleCategoryClick(category)}
          >
            <CardContent className="p-6 text-center">
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {category.categoryName}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {category.description || "Kategori açıklaması"}
              </p>
              <Badge variant="secondary" className="text-xs">
                {category.productCount || 0} ürün
              </Badge>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
