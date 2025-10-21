"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductGrid } from "@/components/product-grid";
import { ReviewList } from "@/components/review-list";
import { ReviewSummary } from "@/components/review-summary";
import { ProductDescription } from "@/components/product-description";
import {
  ShoppingCart,
  Heart,
  Share2,
  Minus,
  Plus,
  ArrowLeft,
  Star,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Product, Review, ProductReviewSummary } from "@/types";
import Link from "next/link";
import toast from "react-hot-toast";

interface ProductDetailProps {
  product: Product;
  reviews?: Review[];
  reviewSummary?: ProductReviewSummary | null;
  relatedProducts?: Product[];
}

export function ProductDetail({ product, reviews = [], reviewSummary, relatedProducts = [] }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  const discountedPrice = product.discount
    ? product.unitPrice * (1 - product.discount / 100)
    : product.unitPrice;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`${product.productName} sepete eklendi (${quantity} adet)`);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.unitInStock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Ürünlere Dön
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <Image
              src={product.imageUrl || "/placeholder-product.jpg"}
              alt={product.productName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>

          {/* Additional Images */}
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square relative overflow-hidden rounded-lg"
              >
                <Image
                  src={`https://picsum.photos/200/200?random=${i}`}
                  alt={`${product.productName} ${i}`}
                  fill
                  sizes="(max-width: 768px) 25vw, (max-width: 1200px) 12.5vw, 8.33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">
                {product.category?.categoryName}
              </Badge>
              {product.discount && product.discount > 0 && (
                <Badge variant="destructive">%{product.discount} İndirim</Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.productName}</h1>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(discountedPrice)}
              </span>
              {product.discount && product.discount > 0 && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.unitPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${product.unitInStock > 0 ? "bg-green-500" : "bg-red-500"}`}
              />
              <span className="text-sm">
                {product.unitInStock > 0
                  ? `${product.unitInStock} adet stokta`
                  : "Stokta yok"}
              </span>
            </div>
          </div>

          <Separator />

          {/* Quantity Selector */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-medium">Adet:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.unitInStock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.unitInStock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Sepete Ekle
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Product Details */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Ürün Detayları</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Kategori:</span>
                  <span>{product.category?.categoryName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Birim:</span>
                  <span>{product.quantityPerUnit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stok:</span>
                  <span>{product.unitInStock} adet</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="w-4 h-4 text-green-600" />
              <span>Ücretsiz Kargo</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>Güvenli Ödeme</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RotateCcw className="w-4 h-4 text-orange-600" />
              <span>14 Gün İade</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Star className="w-4 h-4 text-yellow-600" />
              <span>Kalite Garantisi</span>
            </div>
          </div>

          <Separator />

          {/* Installment Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span className="text-blue-600">💳</span>
                Taksit Seçenekleri
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Kredi Kartı ile</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-blue-600">
                      {Math.round(discountedPrice / 2).toLocaleString("tr-TR", { style: "currency", currency: "TRY" })} x 2 taksit
                    </div>
                    <div className="text-xs text-muted-foreground">Faizsiz</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">3 Taksit</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-600">
                      {Math.round(discountedPrice / 3).toLocaleString("tr-TR", { style: "currency", currency: "TRY" })} x 3 taksit
                    </div>
                    <div className="text-xs text-muted-foreground">%2.5 faiz</div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">6 Taksit</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-orange-600">
                      {Math.round(discountedPrice / 6).toLocaleString("tr-TR", { style: "currency", currency: "TRY" })} x 6 taksit
                    </div>
                    <div className="text-xs text-muted-foreground">%4.5 faiz</div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">9 Taksit</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-purple-600">
                      {Math.round(discountedPrice / 9).toLocaleString("tr-TR", { style: "currency", currency: "TRY" })} x 9 taksit
                    </div>
                    <div className="text-xs text-muted-foreground">%6.8 faiz</div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">12 Taksit</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-red-600">
                      {Math.round(discountedPrice / 12).toLocaleString("tr-TR", { style: "currency", currency: "TRY" })} x 12 taksit
                    </div>
                    <div className="text-xs text-muted-foreground">%9.2 faiz</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong>Not:</strong> Taksit seçenekleri kredi kartı türüne göre değişiklik gösterebilir. 
                  Detaylı bilgi için bankanızla iletişime geçiniz.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Product Description */}
      <div className="mt-12">
        <ProductDescription product={product} />
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            {reviewSummary && (
              <ReviewSummary 
                summary={reviewSummary} 
              />
            )}
          </div>
          <div className="lg:col-span-3">
            <ReviewList 
              productId={product.id} 
              productName={product.productName}
              reviews={reviews}
            />
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Benzer Ürünler</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
}
