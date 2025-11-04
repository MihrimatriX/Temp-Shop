import {
  Review,
  ProductReviewSummary,
  CreateReview,
  UpdateReview,
  ApiResponse,
} from "@/types";
import { API_ENDPOINTS } from "@/config/api";
import { useBackendStore } from "@/store/backend-store";
import { mockReviews, mockReviewSummaries } from "./mock-data-service";

export class ReviewService {
  async getProductReviews(productId: number): Promise<ApiResponse<Review[]>> {
    const backendType = useBackendStore.getState().config.type;

    if (backendType === "mock") {
      const reviews = mockReviews.filter(
        (review) => review.productId === productId
      );
      return Promise.resolve({
        success: true,
        data: reviews,
        message: "Reviews fetched successfully",
      });
    }

    try {
      const response = await fetch(
        `${useBackendStore.getState().getCurrentApiUrl()}${API_ENDPOINTS.REVIEWS()}/product/${productId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching product reviews:", error);
      throw error;
    }
  }

  async getProductReviewSummary(
    productId: number
  ): Promise<ApiResponse<ProductReviewSummary>> {
    const backendType = useBackendStore.getState().config.type;

    if (backendType === "mock") {
      const summary = mockReviewSummaries.find(
        (s) => s.productId === productId
      );
      if (summary) {
        return Promise.resolve({
          success: true,
          data: summary,
          message: "Review summary fetched successfully",
        });
      } else {
        return Promise.resolve({
          success: true,
          data: {
            productId,
            averageRating: 0,
            totalReviews: 0,
            rating1Count: 0,
            rating2Count: 0,
            rating3Count: 0,
            rating4Count: 0,
            rating5Count: 0,
          },
          message: "No reviews found",
        });
      }
    }

    try {
      const response = await fetch(
        `${useBackendStore.getState().getCurrentApiUrl()}${API_ENDPOINTS.REVIEWS()}/product/${productId}/summary`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching review summary:", error);
      throw error;
    }
  }

  async getReviewById(reviewId: number): Promise<ApiResponse<Review>> {
    const backendType = useBackendStore.getState().config.type;

    if (backendType === "mock") {
      const review = mockReviews.find((r) => r.id === reviewId);
      if (review) {
        return Promise.resolve({
          success: true,
          data: review,
          message: "Review fetched successfully",
        });
      } else {
        return Promise.resolve({
          success: false,
          data: null as any,
          message: "Review not found",
        });
      }
    }

    try {
      const response = await fetch(
        `${useBackendStore.getState().getCurrentApiUrl()}${API_ENDPOINTS.REVIEWS()}/${reviewId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching review:", error);
      throw error;
    }
  }

  async createReview(reviewData: CreateReview): Promise<ApiResponse<Review>> {
    const backendType = useBackendStore.getState().config.type;

    if (backendType === "mock") {
      const newReview: Review = {
        id: mockReviews.length + 1,
        productId: reviewData.productId,
        userId: 1, // Mock user ID
        userName: "Mock User",
        rating: reviewData.rating,
        comment: reviewData.comment,
        isVerified: false,
        isHelpful: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return Promise.resolve({
        success: true,
        data: newReview,
        message: "Review created successfully",
      });
    }

    try {
      const response = await fetch(
        `${useBackendStore.getState().getCurrentApiUrl()}${API_ENDPOINTS.REVIEWS()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating review:", error);
      throw error;
    }
  }

  async updateReview(
    reviewId: number,
    reviewData: UpdateReview
  ): Promise<ApiResponse<Review>> {
    const backendType = useBackendStore.getState().config.type;

    if (backendType === "mock") {
      const existingReview = mockReviews.find((r) => r.id === reviewId);
      if (existingReview) {
        const updatedReview: Review = {
          ...existingReview,
          rating: reviewData.rating || existingReview.rating,
          comment: reviewData.comment || existingReview.comment,
          updatedAt: new Date().toISOString(),
        };

        return Promise.resolve({
          success: true,
          data: updatedReview,
          message: "Review updated successfully",
        });
      } else {
        return Promise.resolve({
          success: false,
          data: null as any,
          message: "Review not found",
        });
      }
    }

    try {
      const response = await fetch(
        `${useBackendStore.getState().getCurrentApiUrl()}${API_ENDPOINTS.REVIEWS()}/${reviewId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating review:", error);
      throw error;
    }
  }

  async deleteReview(reviewId: number): Promise<ApiResponse<string>> {
    const backendType = useBackendStore.getState().config.type;

    if (backendType === "mock") {
      const existingReview = mockReviews.find((r) => r.id === reviewId);
      if (existingReview) {
        return Promise.resolve({
          success: true,
          data: "Review deleted successfully",
          message: "Review deleted successfully",
        });
      } else {
        return Promise.resolve({
          success: false,
          data: "",
          message: "Review not found",
        });
      }
    }

    try {
      const response = await fetch(
        `${useBackendStore.getState().getCurrentApiUrl()}${API_ENDPOINTS.REVIEWS()}/${reviewId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting review:", error);
      throw error;
    }
  }
}
