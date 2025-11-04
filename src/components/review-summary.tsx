"use client";

import { ProductReviewSummary } from "@/types";
import { StarRating } from "@/components/ui/star-rating";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ReviewSummaryProps {
  summary: ProductReviewSummary;
  className?: string;
}

export function ReviewSummary({ summary, className }: ReviewSummaryProps) {
  const getRatingPercentage = (count: number) => {
    if (summary.totalReviews === 0) return 0;
    return (count / summary.totalReviews) * 100;
  };

  const getRatingLabel = (rating: number) => {
    const labels = {
      5: "Mükemmel",
      4: "Çok İyi",
      3: "İyi",
      2: "Orta",
      1: "Kötü",
    };
    return labels[rating as keyof typeof labels] || `${rating} Yıldız`;
  };

  return (
    <Card
      className={`${className} bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200`}
    >
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <span className="text-purple-600">⭐</span>
          Değerlendirmeler
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Rating */}
        <div className="text-center bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {summary.averageRating.toFixed(1)}
            </span>
            <StarRating rating={summary.averageRating} size="lg" />
          </div>
          <p className="text-sm text-gray-600 font-medium">
            {summary.totalReviews} değerlendirme
          </p>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = summary[
              `rating${rating}Count` as keyof ProductReviewSummary
            ] as number;
            const percentage = getRatingPercentage(count);

            // Only show ratings that have at least 1 review
            if (count === 0) return null;

            return (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm text-gray-600">{rating}</span>
                  <StarRating rating={1} size="sm" />
                </div>

                <div className="flex-1">
                  <Progress value={percentage} className="h-2" />
                </div>

                <div className="flex items-center gap-2 w-20">
                  <span className="text-sm text-gray-600 w-8 text-right">
                    {count}
                  </span>
                  <span className="text-xs text-gray-500 w-12">
                    {percentage > 0 ? `${percentage.toFixed(0)}%` : ''}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rating Labels */}
        <div className="pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-1">
                <StarRating rating={1} size="sm" />
                <span>{getRatingLabel(rating)}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
