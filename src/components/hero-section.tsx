"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Truck, Shield, Star } from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
}

export function HeroSection({
  title = "Modern E-Ticaret Deneyimi",
  subtitle = "En kaliteli ürünleri en uygun fiyatlarla keşfedin. Hızlı teslimat, güvenli ödeme ve mükemmel müşteri hizmetleri.",
}: HeroSectionProps) {
  return (
    <div className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
                {title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/products">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Alışverişe Başla
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Ürünleri Keşfet
              </Button>
            </div>
          </div>

          {/* Right Content - Features */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6">
              <CardContent className="p-0">
                <Truck className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Hızlı Teslimat</h3>
                <p className="text-sm text-muted-foreground">
                  24 saat içinde teslimat
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <Shield className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Güvenli Ödeme</h3>
                <p className="text-sm text-muted-foreground">
                  SSL ile korumalı
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <Star className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Kaliteli Ürünler</h3>
                <p className="text-sm text-muted-foreground">Seçkin markalar</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <ShoppingBag className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Kolay İade</h3>
                <p className="text-sm text-muted-foreground">
                  30 gün iade garantisi
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
