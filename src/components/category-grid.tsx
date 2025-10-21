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
  Car,
  PenTool,
  Package,
} from "lucide-react";

interface CategoryGridProps {
  onCategorySelect?: (category: Category) => void;
}

const categoryIcons: { [key: string]: any } = {
  "Elektronik": Smartphone,
  "Moda": Shirt,
  "Ev & Yaşam": Home,
  "Spor & Outdoor": Dumbbell,
  "Anne & Bebek": Baby,
  "Kozmetik & Bakım": Sparkles,
  "Süpermarket": ShoppingCart,
  "Kitap & Müzik": Book,
  "Oto & Bahçe": Car,
  "Kırtasiye & Ofis": PenTool,
};

const categoryColors: { [key: string]: string } = {
  "Elektronik": "bg-blue-500",
  "Moda": "bg-pink-500",
  "Ev & Yaşam": "bg-green-500",
  "Spor & Outdoor": "bg-orange-500",
  "Anne & Bebek": "bg-purple-500",
  "Kozmetik & Bakım": "bg-rose-500",
  "Süpermarket": "bg-yellow-500",
  "Kitap & Müzik": "bg-indigo-500",
  "Oto & Bahçe": "bg-gray-500",
  "Kırtasiye & Ofis": "bg-teal-500",
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
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-3 bg-gray-200 rounded mb-3" />
              <div className="h-6 bg-gray-200 rounded w-16 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {localCategories.map((category) => {
        const IconComponent = categoryIcons[category.categoryName] || Package;
        const color = categoryColors[category.categoryName] || "bg-gray-500";
        
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
