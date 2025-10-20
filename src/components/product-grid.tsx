"use client";

import { useEffect } from "react";
import { ProductCard } from "@/components/product-card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useProductStore } from "@/store/product-store";
import { ProductService } from "@/services/product-service";
import { CategoryService } from "@/services/category-service";

interface ProductGridProps {
  categoryId?: number;
}

export function ProductGrid({}: ProductGridProps) {
  const {
    loading,
    setProducts,
    setCategories,
    setLoading,
    setError,
    getFilteredProducts,
  } = useProductStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const productService = new ProductService();
        const categoryService = new CategoryService();

        const [productsResponse, categoriesResponse] = await Promise.all([
          productService.getProducts(),
          categoryService.getCategories(),
        ]);

        if (productsResponse.data.success) {
          // DotNet backend returns PagedResultDto with items array
          const products = productsResponse.data.data;
          setProducts(Array.isArray(products) ? products : []);
        } else {
          setError("Ürünler yüklenirken bir hata oluştu");
        }

        if (categoriesResponse.data.success) {
          setCategories(categoriesResponse.data.data);
        } else {
          setError("Kategoriler yüklenirken bir hata oluştu");
        }
      } catch (error) {
        setError("Ürünler yüklenirken bir hata oluştu");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setProducts, setCategories, setLoading, setError]);

  const filteredProducts = getFilteredProducts();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Ürün bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
