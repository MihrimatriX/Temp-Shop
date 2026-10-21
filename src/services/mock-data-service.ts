import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import {
  Product,
  Category,
  SubCategory,
  Campaign,
  Review,
  ProductReviewSummary,
  ApiResponse,
} from "@/types";
import {
  extendedCategories,
  extendedSubCategories,
  extendedCampaigns,
  generateExtendedProducts,
  generateExtendedReviews,
  generateExtendedReviewSummaries,
} from "@/data/mock-data-extended";

// Mock Products - Genişletilmiş veri kullanılıyor
export const mockProducts: Product[] = generateExtendedProducts();

// Mock Categories - Genişletilmiş veri kullanılıyor
export const mockCategories: Category[] = extendedCategories;

// Mock SubCategories - Genişletilmiş veri kullanılıyor
export const mockSubCategories: SubCategory[] = extendedSubCategories;

// Mock Campaigns - Genişletilmiş veri kullanılıyor
export const mockCampaigns: Campaign[] = extendedCampaigns;

// Mock Reviews - Dinamik olarak oluşturuluyor
export const mockReviews: Review[] = generateExtendedReviews(mockProducts);

// Mock Review Summaries - Dinamik olarak oluşturuluyor
export const mockReviewSummaries: ProductReviewSummary[] =
  generateExtendedReviewSummaries(mockProducts, mockReviews);

/** Wraps mock data in the AxiosResponse<ApiResponse<T>> shape the real backends return. */
export function mockResponse<T>(
  data: T,
  message = "OK",
  success = true,
): AxiosResponse<ApiResponse<T>> {
  return {
    data: { success, data, message },
    status: success ? 200 : 404,
    statusText: success ? "OK" : "Not Found",
    headers: {},
    config: {} as InternalAxiosRequestConfig,
  };
}
