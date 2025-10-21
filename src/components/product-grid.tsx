"use client";

import { ProductCard } from "@/components/product-card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ProductGridSkeleton } from "@/components/ui/skeleton";
import { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  viewMode?: "grid" | "list";
  loading?: boolean;
}

export function ProductGrid({ products, viewMode = "grid", loading = false }: ProductGridProps) {
  if (loading) {
    return <ProductGridSkeleton count={8} />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Ürün bulunamadı</p>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex gap-4">
              <div className="w-24 h-24 flex-shrink-0">
                <img
                  src={product.imageUrl || "/placeholder-product.jpg"}
                  alt={product.productName}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{product.productName}</h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                      {product.unitPrice.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
                    </span>
                    {product.discount && product.discount > 0 && (
                      <span className="text-sm text-muted-foreground line-through">
                        {Math.round(product.unitPrice / (1 - product.discount / 100)).toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {product.rating && (
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-yellow-600">★</span>
                        <span className="text-sm">{product.rating.toFixed(1)}</span>
                      </div>
                    )}
                    <span className={`text-xs px-2 py-1 rounded ${
                      product.unitInStock > 0 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {product.unitInStock > 0 ? "Stokta" : "Stokta Yok"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
