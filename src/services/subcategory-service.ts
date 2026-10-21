import axios, { AxiosResponse } from "axios";
import { SubCategory, ApiResponse } from "@/types";
import { API_ENDPOINTS } from "@/config/api";
import { useBackendStore } from "@/store/backend-store";
import { mockSubCategories, mockResponse } from "./mock-data-service";

export class SubCategoryService {
  private getBaseUrl() {
    const apiUrl = useBackendStore.getState().getCurrentApiUrl();
    return apiUrl + API_ENDPOINTS.SUBCATEGORIES;
  }

  async getSubCategories(): Promise<AxiosResponse<ApiResponse<SubCategory[]>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      return mockResponse(
        mockSubCategories,
        "SubCategories fetched successfully",
      );
    }
    return axios.get(this.getBaseUrl());
  }

  async getSubCategoriesByCategoryId(
    categoryId: number,
  ): Promise<AxiosResponse<ApiResponse<SubCategory[]>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      const filteredSubCategories = mockSubCategories.filter(
        (sc) => sc.categoryId === categoryId,
      );
      return mockResponse(
        filteredSubCategories,
        "SubCategories fetched successfully",
      );
    }
    return axios.get(`${this.getBaseUrl()}/category/${categoryId}`);
  }

  async getSubCategoryById(
    id: number,
  ): Promise<AxiosResponse<ApiResponse<SubCategory>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      const subCategory = mockSubCategories.find((sc) => sc.id === id);
      if (!subCategory) {
        return Promise.reject(new Error("SubCategory not found"));
      }
      return mockResponse(subCategory, "SubCategory fetched successfully");
    }
    return axios.get(`${this.getBaseUrl()}/${id}`);
  }
}
