"use client";

import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

const personalizedProducts = [
  {
    id: 101,
    productName: "SanDisk SSD Plus 240GB",
    unitPrice: 450,
    unitInStock: 25,
    quantityPerUnit: "1 adet",
    category: { id: 1, categoryName: "Elektronik", isActive: true },
    description: "Yüksek performanslı SSD depolama",
    imageUrl: "https://picsum.photos/300/200?random=101",
    discount: 15,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 102,
    productName: "HI-LEVEL 512GB Elite Series SSD",
    unitPrice: 850,
    unitInStock: 18,
    quantityPerUnit: "1 adet",
    category: { id: 1, categoryName: "Elektronik", isActive: true },
    description: "Profesyonel SSD depolama çözümü",
    imageUrl: "https://picsum.photos/300/200?random=102",
    discount: 20,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 103,
    productName: "Birlik Sünger Akustik Ses Yalıtım Süngeri",
    unitPrice: 120,
    unitInStock: 50,
    quantityPerUnit: "10 adet",
    category: { id: 3, categoryName: "Ev & Yaşam", isActive: true },
    description: "Ses yalıtımı için akustik sünger",
    imageUrl: "https://picsum.photos/300/200?random=103",
    discount: 10,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 104,
    productName: "Panda 60x85 cm Eko Serisi Yazı Tahtası",
    unitPrice: 180,
    unitInStock: 30,
    quantityPerUnit: "1 adet",
    category: { id: 10, categoryName: "Kırtasiye & Ofis", isActive: true },
    description: "Teleskopik ayaklı yazı tahtası",
    imageUrl: "https://picsum.photos/300/200?random=104",
    discount: 25,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 105,
    productName: "Hikvision 256GB E100 SSD",
    unitPrice: 380,
    unitInStock: 22,
    quantityPerUnit: "1 adet",
    category: { id: 1, categoryName: "Elektronik", isActive: true },
    description: "Güvenilir SSD depolama",
    imageUrl: "https://picsum.photos/300/200?random=105",
    discount: 18,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 106,
    productName: "HI-LEVEL 240GB Ultra Speed SSD",
    unitPrice: 320,
    unitInStock: 35,
    quantityPerUnit: "1 adet",
    category: { id: 1, categoryName: "Elektronik", isActive: true },
    description: "Hızlı SSD depolama çözümü",
    imageUrl: "https://picsum.photos/300/200?random=106",
    discount: 12,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function PersonalizedRecommendations() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Ahmet Faruk, sana özel öneriler
          </h2>
          <p className="text-muted-foreground">
            Geçmiş alışverişlerinize göre seçilmiş ürünler
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          Tümünü Gör
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {personalizedProducts.map((product) => (
          <div key={product.id} className="relative group">
            <ProductCard
              product={product}
              onAddToCart={() => {}}
              onViewDetails={() => {}}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 w-8 h-8 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" size="lg">
          Daha Fazla Öneri Gör
        </Button>
      </div>
    </div>
  );
}
