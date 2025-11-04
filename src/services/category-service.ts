import axios, { AxiosResponse } from "axios";
import { Category, ApiResponse } from "@/types";
import { API_ENDPOINTS } from "@/config/api";
import { useBackendStore } from "@/store/backend-store";
import { mockCategories } from "./mock-data-service";

export class CategoryService {
  private getBaseUrl() {
    const apiUrl = useBackendStore.getState().getCurrentApiUrl();
    return apiUrl + API_ENDPOINTS.CATEGORIES();
  }

  async getCategories(): Promise<AxiosResponse<ApiResponse<Category[]>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      return Promise.resolve({
        data: {
          success: true,
          data: mockCategories,
          message: "Categories fetched successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }
    return axios.get(this.getBaseUrl());
  }

  async getCategoryById(
    id: number
  ): Promise<AxiosResponse<ApiResponse<Category>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      const category = mockCategories.find((c) => c.id === id);
      return Promise.resolve({
        data: {
          success: !!category,
          data: category!,
          message: category ? "Category found" : "Category not found",
        },
        status: category ? 200 : 404,
        statusText: category ? "OK" : "Not Found",
        headers: {},
        config: {} as any,
      });
    }
    return axios.get(`${this.getBaseUrl()}/${id}`);
  }
}
