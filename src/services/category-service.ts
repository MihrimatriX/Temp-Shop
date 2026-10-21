import axios, { AxiosResponse } from "axios";
import { Category, ApiResponse } from "@/types";
import { API_ENDPOINTS } from "@/config/api";
import { useBackendStore } from "@/store/backend-store";
import { mockCategories, mockResponse } from "./mock-data-service";

export class CategoryService {
  private getBaseUrl() {
    const apiUrl = useBackendStore.getState().getCurrentApiUrl();
    return apiUrl + API_ENDPOINTS.CATEGORIES;
  }

  async getCategories(): Promise<AxiosResponse<ApiResponse<Category[]>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      return mockResponse(mockCategories, "Categories fetched successfully");
    }
    return axios.get(this.getBaseUrl());
  }

  async getCategoryById(
    id: number,
  ): Promise<AxiosResponse<ApiResponse<Category>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      const category = mockCategories.find((c) => c.id === id);
      return mockResponse(
        category!,
        category ? "Category found" : "Category not found",
        !!category,
      );
    }
    return axios.get(`${this.getBaseUrl()}/${id}`);
  }
}
