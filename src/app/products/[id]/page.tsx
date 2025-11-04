"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { ReviewSystem, ReviewFormData } from "@/components/review-system";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ProductService } from "@/services/product-service";
import { ReviewService } from "@/services/review-service";
import { Product, Review, ProductReviewSummary } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import toast from "react-hot-toast";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { user } = useAuthStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewSummary, setReviewSummary] = useState<ProductReviewSummary | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    const loadProductData = async () => {
      try {
        setLoading(true);
        setError(null);

        const resolvedParams = await params;
        const productId = parseInt(resolvedParams.id);

        if (isNaN(productId)) {
          setError("Geçersiz ürün ID");
          return;
        }

        // Load product details
        const productService = new ProductService();
        const productResponse = await productService.getProductById(productId);
        
        if (productResponse.data.success) {
          setProduct(productResponse.data.data);
          
          // Load related products from same category
          const relatedResponse = await productService.getProducts();
          if (relatedResponse.data.success) {
            const related = relatedResponse.data.data
              .filter(p => p.category?.id === productResponse.data.data.category?.id && p.id !== productId)
              .slice(0, 4);
            setRelatedProducts(related);
          }
        } else {
          setError("Ürün bulunamadı");
        }

        // Load reviews
        const reviewService = new ReviewService();
        const reviewsResponse = await reviewService.getProductReviews(productId);
        if (reviewsResponse.success) {
          setReviews(reviewsResponse.data);
        }

        // Load review summary
        const summaryResponse = await reviewService.getProductReviewSummary(productId);
        if (summaryResponse.success) {
          setReviewSummary(summaryResponse.data);
        }

      } catch (error) {
        console.error("Error loading product data:", error);
        setError("Ürün yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    loadProductData();
  }, [params]);

  // Review functions
  const handleSubmitReview = async (reviewData: ReviewFormData) => {
    if (!user) {
      toast.error("Değerlendirme yazmak için giriş yapmanız gerekiyor");
      return;
    }

    if (!product) return;

    setIsSubmittingReview(true);
    try {
      // Mock review submission - in real app, this would call API
      const newReview: Review = {
        id: Date.now(),
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userAvatar: user.avatar,
        productId: product.id,
        rating: reviewData.rating,
        title: reviewData.title,
        comment: reviewData.comment,
        photos: reviewData.photos.map((file, index) => ({
          id: `photo-${index}`,
          url: URL.createObjectURL(file),
          alt: `Review photo ${index + 1}`
        })),
        isVerified: true, // Mock: assume all reviews are verified
        isHelpful: false,
        helpfulCount: 0,
        notHelpfulCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setReviews(prev => [newReview, ...prev]);
      toast.success("Değerlendirmeniz başarıyla eklendi!");
    } catch (error) {
      toast.error("Değerlendirme eklenirken hata oluştu");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleHelpful = async (reviewId: number, isHelpful: boolean) => {
    if (!user) {
      toast.error("Bu işlem için giriş yapmanız gerekiyor");
      return;
    }

    setReviews(prev => prev.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          helpfulCount: isHelpful ? (review.helpfulCount || 0) + 1 : (review.helpfulCount || 0),
          notHelpfulCount: !isHelpful ? (review.notHelpfulCount || 0) + 1 : (review.notHelpfulCount || 0)
        };
      }
      return review;
    }));

    toast.success(isHelpful ? "Yardımcı olarak işaretlendi" : "Yardımcı olmadı olarak işaretlendi");
  };

  const handleReport = async (reviewId: number, reason: string) => {
    if (!user) {
      toast.error("Bu işlem için giriş yapmanız gerekiyor");
      return;
    }

    // Mock report - in real app, this would call API
    toast.success("Şikayetiniz alındı, inceleme yapılacak");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-semibold mb-2">
              {error || "Ürün bulunamadı"}
            </h2>
            <p className="text-muted-foreground">
              Aradığınız ürün bulunamadı veya kaldırılmış olabilir.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ProductDetail 
        product={product} 
        reviews={reviews}
        reviewSummary={reviewSummary}
        relatedProducts={relatedProducts}
      />
      
      {/* Review System */}
      <div className="container mx-auto px-4 py-8">
        <ReviewSystem
          productId={product.id}
          reviews={reviews}
          onSubmitReview={handleSubmitReview}
          onHelpful={handleHelpful}
          onReport={handleReport}
          isSubmitting={isSubmittingReview}
        />
      </div>
    </div>
  );
}
