"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductService } from "@/services/product-service";
import { CategoryService } from "@/services/category-service";
import { ReviewService } from "@/services/review-service";
import { Product, Category, Review, ProductReviewSummary } from "@/types";
import { useBackendStore } from "@/store/backend-store";

export default function ApiTestPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewSummary, setReviewSummary] =
    useState<ProductReviewSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { config } = useBackendStore();
  const [backendType, setBackendType] = useState<string>("");

  useEffect(() => {
    setBackendType(config.type);
  }, [config.type]);

  const testProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const productService = new ProductService();
      const response = await productService.getProducts();
      if (response.data.success) {
        setProducts(response.data.data || []);
      } else {
        setError("Products API failed: " + response.data.message);
      }
    } catch (err) {
      setError("Products API error: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const testCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const categoryService = new CategoryService();
      const response = await categoryService.getCategories();
      if (response.data.success) {
        setCategories(response.data.data || []);
      } else {
        setError("Categories API failed: " + response.data.message);
      }
    } catch (err) {
      setError("Categories API error: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const testFeaturedProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const productService = new ProductService();
      const response = await productService.getFeaturedProducts();
      if (response.data.success) {
        setProducts(response.data.data || []);
      } else {
        setError("Featured Products API failed: " + response.data.message);
      }
    } catch (err) {
      setError("Featured Products API error: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const testReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      // İlk ürünün ID'sini kullan
      if (products.length > 0) {
        const productId = products[0].id;
        const reviewService = new ReviewService();
        const response = await reviewService.getProductReviews(productId);
        if (response.success) {
          setReviews(response.data || []);
        } else {
          setError("Reviews API failed: " + response.message);
        }
      } else {
        setError("Önce ürünleri yükleyin");
      }
    } catch (err) {
      setError("Reviews API error: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const testReviewSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      // İlk ürünün ID'sini kullan
      if (products.length > 0) {
        const productId = products[0].id;
        const reviewService = new ReviewService();
        const response = await reviewService.getProductReviewSummary(productId);
        if (response.success) {
          setReviewSummary(response.data || null);
        } else {
          setError("Review Summary API failed: " + response.message);
        }
      } else {
        setError("Önce ürünleri yükleyin");
      }
    } catch (err) {
      setError("Review Summary API error: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>API Test Sayfası</CardTitle>
            <CardDescription>
              Backend API bağlantısını test etmek için bu sayfayı kullanın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge
                  variant={backendType === "mock" ? "secondary" : "default"}
                >
                  Backend Type: {backendType}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {backendType === "mock"
                    ? "Mock data kullanılıyor"
                    : backendType === "dotnet"
                      ? ".NET Core backend kullanılıyor"
                      : backendType === "spring"
                        ? "Spring Boot backend kullanılıyor"
                        : "Bilinmeyen backend"}
                </span>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button onClick={testProducts} disabled={loading}>
                  {loading ? "Yükleniyor..." : "Ürünleri Test Et"}
                </Button>
                <Button
                  onClick={testCategories}
                  disabled={loading}
                  variant="outline"
                >
                  {loading ? "Yükleniyor..." : "Kategorileri Test Et"}
                </Button>
                <Button
                  onClick={testFeaturedProducts}
                  disabled={loading}
                  variant="outline"
                >
                  {loading ? "Yükleniyor..." : "Öne Çıkan Ürünleri Test Et"}
                </Button>
                <Button
                  onClick={testReviews}
                  disabled={loading}
                  variant="outline"
                >
                  {loading ? "Yükleniyor..." : "Yorumları Test Et"}
                </Button>
                <Button
                  onClick={testReviewSummary}
                  disabled={loading}
                  variant="outline"
                >
                  {loading ? "Yükleniyor..." : "Yorum Özetini Test Et"}
                </Button>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {products.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Ürünler ({products.length})</CardTitle>
              <CardDescription>API'den gelen ürün verileri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.slice(0, 6).map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-sm mb-2">
                      {product.productName}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {product.description?.substring(0, 100)}...
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">
                        {product.unitPrice.toLocaleString("tr-TR")} ₺
                      </span>
                      {product.discount && product.discount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          %{product.discount} İndirim
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {categories.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Kategoriler ({categories.length})</CardTitle>
              <CardDescription>API'den gelen kategori verileri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="border rounded-lg p-4 text-center"
                  >
                    <h3 className="font-semibold text-sm">
                      {category.categoryName}
                    </h3>
                    {category.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {category.description.substring(0, 50)}...
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {reviewSummary && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Yorum Özeti</CardTitle>
              <CardDescription>
                API'den gelen yorum özet verileri
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {reviewSummary.averageRating.toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Ortalama Puan
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {reviewSummary.totalReviews}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Toplam Yorum
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {reviewSummary.rating5Count}
                  </div>
                  <div className="text-sm text-muted-foreground">5 Yıldız</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {reviewSummary.rating1Count}
                  </div>
                  <div className="text-sm text-muted-foreground">1 Yıldız</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {reviews.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Yorumlar ({reviews.length})</CardTitle>
              <CardDescription>API'den gelen yorum verileri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews.slice(0, 5).map((review) => (
                  <div key={review.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">
                          {review.userName || "Anonim"}
                        </span>
                        <div className="flex">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span
                              key={i}
                              className={
                                i < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString("tr-TR")}
                      </span>
                    </div>
                    {review.title && (
                      <h4 className="font-medium text-sm mb-1">
                        {review.title}
                      </h4>
                    )}
                    {review.comment && (
                      <p className="text-sm text-muted-foreground">
                        {review.comment.substring(0, 150)}...
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
