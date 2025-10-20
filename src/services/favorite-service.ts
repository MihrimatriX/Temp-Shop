import axios, { AxiosResponse } from "axios";
import { ApiResponse, FavoriteDto, AddToFavoritesDto } from "@/types";
import { API_ENDPOINTS } from "@/config/api";
import { useBackendStore } from "@/store/backend-store";

export class FavoriteService {
  private getBaseUrl() {
    const apiUrl = useBackendStore.getState().getCurrentApiUrl();
    return apiUrl + API_ENDPOINTS.FAVORITES;
  }

  async getUserFavorites(
    token: string
  ): Promise<AxiosResponse<ApiResponse<FavoriteDto[]>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for favorites
      const mockFavorites: FavoriteDto[] = [
        {
          id: 1,
          userId: 1,
          productId: 1,
          productName: "Wireless Bluetooth Headphones",
          productImageUrl: "/placeholder-product.jpg",
          productPrice: 299.99,
          productDiscount: 25,
          productCategory: "Elektronik",
          productInStock: true,
          createdAt: new Date("2024-10-01T10:30:00Z"),
        },
        {
          id: 2,
          userId: 1,
          productId: 2,
          productName: "Smart Watch Series 8",
          productImageUrl: "/placeholder-product.jpg",
          productPrice: 1299.99,
          productDiscount: 13,
          productCategory: "Elektronik",
          productInStock: true,
          createdAt: new Date("2024-10-02T14:20:00Z"),
        },
        {
          id: 3,
          userId: 1,
          productId: 3,
          productName: "Ergonomic Office Chair",
          productImageUrl: "/placeholder-product.jpg",
          productPrice: 899.99,
          productDiscount: 0,
          productCategory: "Ev & Yaşam",
          productInStock: false,
          createdAt: new Date("2024-10-03T09:15:00Z"),
        },
        {
          id: 4,
          userId: 1,
          productId: 4,
          productName: "Running Shoes - Nike Air Max",
          productImageUrl: "/placeholder-product.jpg",
          productPrice: 599.99,
          productDiscount: 14,
          productCategory: "Spor & Outdoor",
          productInStock: true,
          createdAt: new Date("2024-10-04T16:45:00Z"),
        },
      ];

      return Promise.resolve({
        data: {
          success: true,
          data: mockFavorites,
          message: "Mock favorites retrieved successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }

    return axios.get(this.getBaseUrl(), {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async addToFavorites(
    addToFavoritesDto: AddToFavoritesDto,
    token: string
  ): Promise<AxiosResponse<ApiResponse<FavoriteDto>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for adding to favorites
      const mockFavorite: FavoriteDto = {
        id: Date.now(),
        userId: 1,
        productId: addToFavoritesDto.productId,
        productName: `Product ${addToFavoritesDto.productId}`,
        productImageUrl: "/placeholder-product.jpg",
        productPrice: 299.99,
        productDiscount: 10,
        productCategory: "Elektronik",
        productInStock: true,
        createdAt: new Date(),
      };

      return Promise.resolve({
        data: {
          success: true,
          data: mockFavorite,
          message: "Mock product added to favorites successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }

    return axios.post(`${this.getBaseUrl()}/add`, addToFavoritesDto, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async removeFromFavorites(
    productId: number,
    token: string
  ): Promise<AxiosResponse<ApiResponse<string>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for removing from favorites
      return Promise.resolve({
        data: {
          success: true,
          data: "Product removed from favorites successfully",
          message: "Mock product removed from favorites successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }

    return axios.delete(`${this.getBaseUrl()}/remove/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async isProductInFavorites(
    productId: number,
    token: string
  ): Promise<AxiosResponse<ApiResponse<boolean>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for checking if product is in favorites
      return Promise.resolve({
        data: {
          success: true,
          data: Math.random() > 0.5, // Random true/false for mock
          message: "Mock favorite status retrieved successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }

    return axios.get(`${this.getBaseUrl()}/check/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async clearFavorites(
    token: string
  ): Promise<AxiosResponse<ApiResponse<string>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for clearing favorites
      return Promise.resolve({
        data: {
          success: true,
          data: "Favorites cleared successfully",
          message: "Mock favorites cleared successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }

    return axios.delete(`${this.getBaseUrl()}/clear`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
