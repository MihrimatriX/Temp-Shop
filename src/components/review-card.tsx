'use client'

import { Review } from '@/types'
import { StarRating } from '@/components/ui/star-rating'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ThumbsUp, CheckCircle } from 'lucide-react'
// import { formatDistanceToNow } from 'date-fns'
// import { tr } from 'date-fns/locale'

interface ReviewCardProps {
  review: Review
  showProductName?: boolean
  className?: string
}

export function ReviewCard({ review, showProductName = false, className }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffInMs = now.getTime() - date.getTime()
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
      
      if (diffInDays === 0) return 'Bugün'
      if (diffInDays === 1) return 'Dün'
      if (diffInDays < 7) return `${diffInDays} gün önce`
      if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} hafta önce`
      if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} ay önce`
      return `${Math.floor(diffInDays / 365)} yıl önce`
    } catch {
      return 'Bilinmeyen tarih'
    }
  }

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-gray-900">
                  {review.userName || 'Anonim Kullanıcı'}
                </h4>
                {review.isVerified && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
              
              {showProductName && review.productName && (
                <p className="text-sm text-gray-500 mb-2">
                  {review.productName}
                </p>
              )}
              
              <div className="flex items-center gap-2">
                <StarRating rating={review.rating} size="sm" />
                <span className="text-sm text-gray-500">
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
            <h5 className="font-medium text-gray-900">
              {review.title}
            </h5>
          )}

          {/* Comment */}
          {review.comment && (
            <p className="text-gray-700 text-sm leading-relaxed">
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
  )
}
