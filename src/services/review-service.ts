import { Review, ProductReviewSummary, CreateReview, UpdateReview, ApiResponse } from '@/types'
import { getApiUrl, API_ENDPOINTS } from '@/config/api'

const API_URL = getApiUrl()

export class ReviewService {
  // Get reviews for a specific product
  static async getProductReviews(productId: number): Promise<ApiResponse<Review[]>> {
    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS.REVIEWS}/product/${productId}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching product reviews:', error)
      throw error
    }
  }

  // Get review summary for a product
  static async getProductReviewSummary(productId: number): Promise<ApiResponse<ProductReviewSummary>> {
    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS.REVIEWS}/product/${productId}/summary`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching review summary:', error)
      throw error
    }
  }

  // Get a specific review by ID
  static async getReviewById(reviewId: number): Promise<ApiResponse<Review>> {
    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS.REVIEWS}/${reviewId}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching review:', error)
      throw error
    }
  }

  // Create a new review
  static async createReview(reviewData: CreateReview): Promise<ApiResponse<Review>> {
    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS.REVIEWS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error creating review:', error)
      throw error
    }
  }

  // Update an existing review
  static async updateReview(reviewId: number, reviewData: UpdateReview): Promise<ApiResponse<Review>> {
    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS.REVIEWS}/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error updating review:', error)
      throw error
    }
  }

  // Delete a review
  static async deleteReview(reviewId: number): Promise<ApiResponse<string>> {
    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS.REVIEWS}/${reviewId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error deleting review:', error)
      throw error
    }
  }
}
