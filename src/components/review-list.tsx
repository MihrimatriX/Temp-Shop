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
  reviews?: Review[];
}

export function ReviewList({
  productId,
  productName,
  className,
  reviews: propReviews,
}: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>(propReviews || []);
  const [summary, setSummary] = useState<ProductReviewSummary | null>(null);
  const [loading, setLoading] = useState(!propReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchReviews = async () => {
    try {
      setRefreshing(true);
      const reviewService = new ReviewService();
      const [reviewsResponse, summaryResponse] = await Promise.all([
        reviewService.getProductReviews(productId),
        reviewService.getProductReviewSummary(productId),
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
    if (!propReviews) {
      fetchReviews();
    }
  }, [productId, propReviews]);

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
      <div className="space-y-6">
        {/* Reviews and Form */}
        <div className="space-y-6">
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
      </div>
    </div>
  );
}
