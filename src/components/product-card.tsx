"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, PLACEHOLDER_IMAGE } from "@/lib/utils";
import { Product } from "@/types";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.productName} sepete eklendi!`);
    onAddToCart?.(product);
  };

  // Güvenli fiyat hesaplama
  const safeUnitPrice = product.unitPrice > 0 ? product.unitPrice : 100;
  const safeDiscount =
    product.discount && product.discount > 0 ? product.discount : 0;

  const discountedPrice =
    safeDiscount > 0 ? safeUnitPrice * (1 - safeDiscount / 100) : safeUnitPrice;

  return (
    <Card className="group overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.imageUrl || PLACEHOLDER_IMAGE}
            alt={product.productName}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Discount Badge */}
          {safeDiscount > 0 && (
            <Badge variant="destructive" className="absolute top-2 left-2">
              %{Math.round(safeDiscount)} İndirim
            </Badge>
          )}

          {/* Stock Badge */}
          {product.unitInStock === 0 && (
            <Badge variant="secondary" className="absolute top-2 right-2">
              Stokta Yok
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            <Link href={`/products/${product.id}`}>{product.productName}</Link>
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description || product.quantityPerUnit}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {product.category?.categoryName}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">
                {formatPrice(discountedPrice)}
              </span>
              {safeDiscount > 0 && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(safeUnitPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span
                className={`w-2 h-2 rounded-full ${product.unitInStock > 0 ? "bg-green-500" : "bg-red-500"}`}
              />
              <span>
                {product.unitInStock > 0
                  ? `Stokta (${product.unitInStock} adet)`
                  : "Tükendi"}
              </span>
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={product.unitInStock === 0}
            className="w-full transition-transform active:scale-95"
            size="sm"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.unitInStock > 0 ? "Sepete Ekle" : "Stokta Yok"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
