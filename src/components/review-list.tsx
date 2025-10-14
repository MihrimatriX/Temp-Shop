"use client";

import { useState, useEffect } from "react";
import { Review, ProductReviewSummary } from "@/types";
import { ReviewService } from "@/services/review-service";
import { ReviewCard } from "@/components/review-card";
import { ReviewSummary } from "@/components/review-summary";
import { ReviewForm } from "@/components/review-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { MessageSquare, Star } from "lucide-react";
import { toast } from "react-hot-toast";

interface ReviewListProps {
  productId: number;
  productName?: string;
  className?: string;
}

export function ReviewList({
  productId,
  productName,
  className,
}: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [summary, setSummary] = useState<ProductReviewSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchReviews = async () => {
    try {
      setRefreshing(true);
      const [reviewsResponse, summaryResponse] = await Promise.all([
        ReviewService.getProductReviews(productId),
        ReviewService.getProductReviewSummary(productId),
      ]);

      if (reviewsResponse.success) {
        setReviews(reviewsResponse.data || []);
      }

      if (summaryResponse.success) {
        setSummary(summaryResponse.data || null);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Yorumlar yüklenirken bir hata oluştu");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    fetchReviews();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Review Summary */}
        <div className="lg:col-span-1">
          {summary && <ReviewSummary summary={summary} />}
        </div>

        {/* Reviews and Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Müşteri Yorumları
              </h3>
              {summary && (
                <span className="text-sm text-gray-500">
                  ({summary.totalReviews} yorum)
                </span>
              )}
            </div>

            <Button
              onClick={() => setShowReviewForm(!showReviewForm)}
              variant="outline"
              size="sm"
            >
              <Star className="w-4 h-4 mr-2" />
              Yorum Yaz
            </Button>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <ReviewForm
              productId={productId}
              productName={productName}
              onReviewSubmitted={handleReviewSubmitted}
            />
          )}

          {/* Reviews List */}
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  showProductName={false}
                />
              ))}

              {refreshing && (
                <div className="flex justify-center py-4">
                  <LoadingSpinner size="sm" />
                </div>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Henüz yorum yok
                </h4>
                <p className="text-gray-600 mb-4">
                  Bu ürün için henüz hiç yorum yapılmamış. İlk yorumu siz yapın!
                </p>
                <Button
                  onClick={() => setShowReviewForm(true)}
                  variant="outline"
                >
                  <Star className="w-4 h-4 mr-2" />
                  İlk Yorumu Yaz
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recommended Products */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-purple-600">✨</span>
                Önerilen Ürünler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Mock recommended products */}
              {[
                {
                  id: 1,
                  name: "Samsung Galaxy S24",
                  price: 15999,
                  image: "https://picsum.photos/200/200?random=201",
                  rating: 4.5,
                },
                {
                  id: 2,
                  name: "iPhone 15 Pro",
                  price: 18999,
                  image: "https://picsum.photos/200/200?random=202",
                  rating: 4.8,
                },
                {
                  id: 3,
                  name: "MacBook Air M3",
                  price: 24999,
                  image: "https://picsum.photos/200/200?random=203",
                  rating: 4.7,
                },
                {
                  id: 4,
                  name: "iPad Pro 12.9",
                  price: 17999,
                  image: "https://picsum.photos/200/200?random=204",
                  rating: 4.6,
                },
              ].map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-gray-900 truncate">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span
                            key={i}
                            className={
                              i < Math.floor(product.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        {product.rating}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-purple-600 mt-1">
                      {product.price.toLocaleString("tr-TR")} ₺
                    </p>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full mt-4">
                Tümünü Gör
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
