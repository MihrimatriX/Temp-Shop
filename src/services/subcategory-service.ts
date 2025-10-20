import axios, { AxiosResponse } from "axios";
import { SubCategory, ApiResponse } from "@/types";
import { API_ENDPOINTS } from "@/config/api";
import { useBackendStore } from "@/store/backend-store";
import { mockSubCategories } from "./mock-data-service";

export class SubCategoryService {
  private getBaseUrl() {
    const apiUrl = useBackendStore.getState().getCurrentApiUrl();
    return apiUrl + API_ENDPOINTS.SUBCATEGORIES();
  }

  async getSubCategories(): Promise<AxiosResponse<ApiResponse<SubCategory[]>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      return Promise.resolve({
        data: {
          success: true,
          data: mockSubCategories,
          message: "SubCategories fetched successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }
    return axios.get(this.getBaseUrl());
  }

  async getSubCategoriesByCategoryId(
    categoryId: number
  ): Promise<AxiosResponse<ApiResponse<SubCategory[]>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      const filteredSubCategories = mockSubCategories.filter(
        (sc) => sc.categoryId === categoryId
      );
      return Promise.resolve({
        data: {
          success: true,
          data: filteredSubCategories,
          message: "SubCategories fetched successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }
    return axios.get(`${this.getBaseUrl()}/category/${categoryId}`);
  }

  async getSubCategoryById(
    id: number
  ): Promise<AxiosResponse<ApiResponse<SubCategory>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      const subCategory = mockSubCategories.find((sc) => sc.id === id);
      if (!subCategory) {
        return Promise.reject(new Error("SubCategory not found"));
      }
      return Promise.resolve({
        data: {
          success: true,
          data: subCategory,
          message: "SubCategory fetched successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }
    return axios.get(`${this.getBaseUrl()}/${id}`);
  }
}
