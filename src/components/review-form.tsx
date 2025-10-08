'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ReviewService } from '@/services/review-service'
import { CreateReview } from '@/types'
import { StarRating } from '@/components/ui/star-rating'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

const reviewSchema = z.object({
  rating: z.number().min(1, 'Lütfen en az 1 yıldız verin').max(5, 'En fazla 5 yıldız verebilirsiniz'),
  title: z.string().min(3, 'Başlık en az 3 karakter olmalı').max(100, 'Başlık en fazla 100 karakter olabilir').optional(),
  comment: z.string().min(10, 'Yorum en az 10 karakter olmalı').max(500, 'Yorum en fazla 500 karakter olabilir').optional()
})

type ReviewFormData = z.infer<typeof reviewSchema>

interface ReviewFormProps {
  productId: number
  productName?: string
  onReviewSubmitted?: () => void
  className?: string
}

export function ReviewForm({ productId, productName, onReviewSubmitted, className }: ReviewFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rating, setRating] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      title: '',
      comment: ''
    }
  })

  const watchedRating = watch('rating')

  const onSubmit = async (data: ReviewFormData) => {
    if (rating === 0) {
      toast.error('Lütfen bir puan verin')
      return
    }

    setIsSubmitting(true)
    
    try {
      const reviewData: CreateReview = {
        productId,
        rating,
        title: data.title || undefined,
        comment: data.comment || undefined
      }

      const response = await ReviewService.createReview(reviewData)
      
      if (response.success) {
        toast.success('Yorumunuz başarıyla eklendi!')
        reset()
        setRating(0)
        onReviewSubmitted?.()
      } else {
        toast.error('Yorum eklenirken bir hata oluştu')
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      toast.error('Yorum eklenirken bir hata oluştu')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRatingChange = (newRating: number) => {
    setRating(newRating)
    setValue('rating', newRating)
  }

  return (
    <Card className={`${className} border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <span className="text-purple-600">✍️</span>
          {productName ? `${productName} için yorum yazın` : 'Yorum Yazın'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Rating */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Puanınız *
            </label>
            <div className="flex items-center gap-2">
              <StarRating
                rating={rating}
                interactive
                onRatingChange={handleRatingChange}
                size="lg"
              />
              {rating > 0 && (
                <span className="text-sm text-gray-600">
                  {rating} yıldız
                </span>
              )}
            </div>
            {errors.rating && (
              <p className="text-sm text-red-600">{errors.rating.message}</p>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-gray-700">
              Başlık (İsteğe bağlı)
            </label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Yorumunuz için bir başlık yazın..."
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium text-gray-700">
              Yorumunuz (İsteğe bağlı)
            </label>
            <textarea
              id="comment"
              {...register('comment')}
              rows={4}
              placeholder="Ürün hakkındaki deneyiminizi paylaşın..."
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.comment ? 'border-red-500' : ''
              }`}
            />
            {errors.comment && (
              <p className="text-sm text-red-600">{errors.comment.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Gönderiliyor...
              </>
            ) : (
              <>
                <span className="mr-2">📝</span>
                Yorumu Gönder
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
