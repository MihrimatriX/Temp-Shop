"use client";

import { Review } from "@/types";
import { StarRating } from "@/components/ui/star-rating";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, CheckCircle } from "lucide-react";

interface ReviewCardProps {
  review: Review;
  showProductName?: boolean;
  className?: string;
}

export function ReviewCard({
  review,
  showProductName = false,
  className,
}: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      if (diffInDays === 0) return "Bugün";
      if (diffInDays === 1) return "Dün";
      if (diffInDays < 7) return `${diffInDays} gün önce`;
      if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} hafta önce`;
      if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} ay önce`;
      return `${Math.floor(diffInDays / 365)} yıl önce`;
    } catch {
      return "Bilinmeyen tarih";
    }
  };

  return (
    <Card
      className={`${className} hover:shadow-md transition-shadow duration-200 border-l-4 border-l-purple-100`}
    >
      <CardContent className="p-5">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {(review.userName || "A").charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {review.userName || "Anonim Kullanıcı"}
                  </h4>
                  {review.isVerified && (
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">
                        Doğrulanmış Alışveriş
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {showProductName && review.productName && (
                <p className="text-sm text-gray-500 mb-2">
                  {review.productName}
                </p>
              )}

              <div className="flex items-center gap-3">
                <StarRating rating={review.rating} size="sm" />
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {formatDate(review.createdAt)}
                </span>
              </div>
            </div>

            {review.isHelpful && (
              <Badge variant="secondary" className="text-xs">
                <ThumbsUp className="w-3 h-3 mr-1" />
                Faydalı
              </Badge>
            )}
          </div>

          {/* Title */}
          {review.title && (
            <h5 className="font-semibold text-gray-900 text-base">
              {review.title}
            </h5>
          )}

          {/* Comment */}
          {review.comment && (
            <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg border-l-2 border-purple-200">
              {review.comment}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              {review.isVerified && (
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Doğrulanmış Alışveriş
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
