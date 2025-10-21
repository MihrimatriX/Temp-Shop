"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Camera, 
  Send, 
  User, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon
} from "lucide-react";
import { Review, ReviewPhoto } from "@/types";

export interface ReviewFormData {
  rating: number;
  title: string;
  comment: string;
  photos: File[];
}

export interface ReviewSystemProps {
  productId: number;
  reviews: Review[];
  onSubmitReview: (reviewData: ReviewFormData) => Promise<void>;
  onHelpful: (reviewId: number, isHelpful: boolean) => Promise<void>;
  onReport: (reviewId: number, reason: string) => Promise<void>;
  isSubmitting?: boolean;
}

export const ReviewSystem = ({
  productId,
  reviews,
  onSubmitReview,
  onHelpful,
  onReport,
  isSubmitting = false
}: ReviewSystemProps) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState<ReviewFormData>({
    rating: 0,
    title: "",
    comment: "",
    photos: []
  });
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newPhotos = [...reviewForm.photos, ...files];
    
    if (newPhotos.length > 5) {
      alert("En fazla 5 fotoğraf yükleyebilirsiniz");
      return;
    }

    setReviewForm(prev => ({ ...prev, photos: newPhotos }));
    
    // Create previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPhotoPreviews(prev => [...prev, ...newPreviews]);
  };

  const removePhoto = (index: number) => {
    const newPhotos = reviewForm.photos.filter((_, i) => i !== index);
    const newPreviews = photoPreviews.filter((_, i) => i !== index);
    
    setReviewForm(prev => ({ ...prev, photos: newPhotos }));
    setPhotoPreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (reviewForm.rating === 0) {
      alert("Lütfen bir puan verin");
      return;
    }
    
    if (!reviewForm.title.trim()) {
      alert("Lütfen bir başlık girin");
      return;
    }
    
    if (!reviewForm.comment.trim()) {
      alert("Lütfen bir yorum yazın");
      return;
    }

    try {
      await onSubmitReview(reviewForm);
      setReviewForm({
        rating: 0,
        title: "",
        comment: "",
        photos: []
      });
      setPhotoPreviews([]);
      setShowReviewForm(false);
    } catch (error) {
      console.error("Review submission error:", error);
    }
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  const averageRating = getAverageRating();
  const ratingDistribution = getRatingDistribution();

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Değerlendirmeler ({reviews.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rating Overview */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="flex items-center gap-1">
                    <StarRating rating={Math.round(averageRating)} size="sm" />
                    <span className="text-sm text-muted-foreground ml-2">
                      ({reviews.length} değerlendirme)
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(rating => {
                  const count = ratingDistribution[rating as keyof typeof ratingDistribution];
                  const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  
                  return (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="text-sm w-4">{rating}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`bg-yellow-400 h-2 rounded-full transition-all duration-300 ${
                            percentage > 0 ? 'block' : 'hidden'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-8">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Review Actions */}
            <div className="space-y-4">
              <Button 
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="w-full"
              >
                <Star className="w-4 h-4 mr-2" />
                Değerlendirme Yaz
              </Button>
              
              <div className="text-sm text-muted-foreground">
                <p>• Sadece satın aldığınız ürünleri değerlendirebilirsiniz</p>
                <p>• Fotoğraf ekleyerek deneyiminizi paylaşın</p>
                <p>• Yapıcı ve dürüst değerlendirmeler yazın</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Form */}
      {showReviewForm && (
        <Card>
          <CardHeader>
            <CardTitle>Değerlendirme Yaz</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Rating */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Puanınız *
                </label>
                <StarRating
                  rating={reviewForm.rating}
                  onRatingChange={(rating) => 
                    setReviewForm(prev => ({ ...prev, rating }))
                  }
                  size="lg"
                />
              </div>

              {/* Title */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Başlık *
                </label>
                <Input
                  value={reviewForm.title}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Değerlendirmeniz için bir başlık yazın"
                  maxLength={100}
                />
              </div>

              {/* Comment */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Yorumunuz *
                </label>
                <Textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Ürün hakkındaki deneyiminizi paylaşın..."
                  rows={4}
                  maxLength={1000}
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {reviewForm.comment.length}/1000 karakter
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Fotoğraflar (İsteğe bağlı)
                </label>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                    >
                      <Camera className="w-4 h-4" />
                      Fotoğraf Ekle
                    </label>
                    <span className="text-sm text-muted-foreground">
                      En fazla 5 fotoğraf (JPG, PNG, max 5MB)
                    </span>
                  </div>

                  {/* Photo Previews */}
                  {photoPreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {photoPreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Gönderiliyor..." : "Değerlendirmeyi Gönder"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowReviewForm(false)}
                >
                  İptal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Review Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      {review.userAvatar ? (
                        <img
                          src={review.userAvatar}
                          alt={review.userName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{review.userName || 'Anonim Kullanıcı'}</h4>
                        {review.isVerified && (
                          <Badge variant="secondary" className="text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Doğrulanmış Alışveriş
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <StarRating rating={review.rating} size="sm" />
                        <span>•</span>
                        <span>{formatDate(review.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div>
                  <h5 className="font-medium mb-2">{review.title}</h5>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {review.comment}
                  </p>
                </div>

                {/* Review Photos */}
                {review.photos && review.photos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {review.photos.map((photo) => (
                      <div key={photo.id} className="relative">
                        <img
                          src={photo.url}
                          alt={photo.alt}
                          className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Review Actions */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => onHelpful(review.id, true)}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-green-600 transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      Yardımcı ({review.helpfulCount})
                    </button>
                    <button
                      onClick={() => onHelpful(review.id, false)}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-red-600 transition-colors"
                    >
                      <ThumbsDown className="w-4 h-4" />
                      Yardımcı Değil ({review.notHelpfulCount})
                    </button>
                  </div>
                  <button
                    onClick={() => onReport(review.id, "inappropriate")}
                    className="text-sm text-muted-foreground hover:text-red-600 transition-colors"
                  >
                    Şikayet Et
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Reviews */}
      {reviews.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Star className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Henüz değerlendirme yok</h3>
            <p className="text-muted-foreground mb-4">
              Bu ürün için ilk değerlendirmeyi siz yazın!
            </p>
            <Button onClick={() => setShowReviewForm(true)}>
              <Star className="w-4 h-4 mr-2" />
              İlk Değerlendirmeyi Yaz
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
