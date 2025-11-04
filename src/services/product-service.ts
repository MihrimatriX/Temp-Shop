import axios, { AxiosResponse } from "axios";
import { Product, ApiResponse, ProductFilters } from "@/types";
import { API_ENDPOINTS } from "@/config/api";
import { useBackendStore } from "@/store/backend-store";
import { mockProducts } from "./mock-data-service";

export class ProductService {
  private getBaseUrl() {
    const apiUrl = useBackendStore.getState().getCurrentApiUrl();
    return apiUrl + API_ENDPOINTS.PRODUCTS();
  }

  async getProducts(
    filters?: ProductFilters
  ): Promise<AxiosResponse<ApiResponse<Product[]>>> {
    try {
      const backendType = useBackendStore.getState().config.type;
      if (backendType === "mock") {
        let filteredProducts = [...mockProducts];

        if (filters) {
          if (filters.categoryId) {
            filteredProducts = filteredProducts.filter(
              (p) => p.category?.id === filters.categoryId
            );
          }
          if (filters.minPrice) {
            filteredProducts = filteredProducts.filter(
              (p) => p.unitPrice >= filters.minPrice!
            );
          }
          if (filters.maxPrice) {
            filteredProducts = filteredProducts.filter(
              (p) => p.unitPrice <= filters.maxPrice!
            );
          }
          if (filters.searchTerm) {
            const term = filters.searchTerm.toLowerCase();
            filteredProducts = filteredProducts.filter(
              (p) =>
                p.productName.toLowerCase().includes(term) ||
                (p.description && p.description.toLowerCase().includes(term))
            );
          }
        }

        return Promise.resolve({
          data: {
            success: true,
            data: filteredProducts,
            message: "Products fetched successfully",
          },
          status: 200,
          statusText: "OK",
          headers: {},
          config: {} as any,
        });
      }

      const params = new URLSearchParams();

      if (filters) {
        if (filters.categoryId)
          params.append("categoryId", filters.categoryId.toString());
        if (filters.minPrice)
          params.append("minPrice", filters.minPrice.toString());
        if (filters.maxPrice)
          params.append("maxPrice", filters.maxPrice.toString());
        if (filters.searchTerm) params.append("searchTerm", filters.searchTerm);
        if (filters.sortBy) params.append("sortBy", filters.sortBy);
        if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);
        if (filters.pageNumber)
          params.append("pageNumber", filters.pageNumber.toString());
        if (filters.pageSize)
          params.append("pageSize", filters.pageSize.toString());
      }

      const response = await axios.get(
        `${this.getBaseUrl()}?${params.toString()}`
      );

      // DotNet backend returns PagedResultDto, extract items
      if (
        response.data.success &&
        response.data.data &&
        response.data.data.items
      ) {
        response.data.data = response.data.data.items;
      }

      return response;
    } catch (error) {
      console.error("Error fetching products:", error);

      // Fallback to mock data on error
      const backendType = useBackendStore.getState().config.type;
      if (backendType !== "mock") {
        console.warn("API error, falling back to mock data");
        let filteredProducts = [...mockProducts];

        if (filters) {
          if (filters.categoryId) {
            filteredProducts = filteredProducts.filter(
              (p) => p.category?.id === filters.categoryId
            );
          }
          if (filters.minPrice) {
            filteredProducts = filteredProducts.filter(
              (p) => p.unitPrice >= filters.minPrice!
            );
          }
          if (filters.maxPrice) {
            filteredProducts = filteredProducts.filter(
              (p) => p.unitPrice <= filters.maxPrice!
            );
          }
          if (filters.searchTerm) {
            const term = filters.searchTerm.toLowerCase();
            filteredProducts = filteredProducts.filter(
              (p) =>
                p.productName.toLowerCase().includes(term) ||
                (p.description && p.description.toLowerCase().includes(term))
            );
          }
        }

        return Promise.resolve({
          data: {
            success: true,
            data: filteredProducts,
            message: "Products fetched from fallback data",
          },
          status: 200,
          statusText: "OK",
          headers: {},
          config: {} as any,
        });
      }

      throw error;
    }
  }

  async getProductById(
    id: number
  ): Promise<AxiosResponse<ApiResponse<Product>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      const product = mockProducts.find((p) => p.id === id);
      return Promise.resolve({
        data: {
          success: !!product,
          data: product!,
          message: product ? "Product found" : "Product not found",
        },
        status: product ? 200 : 404,
        statusText: product ? "OK" : "Not Found",
        headers: {},
        config: {} as any,
      });
    }
    return axios.get(`${this.getBaseUrl()}/${id}`);
  }

  async getByProductName(
    productName: string
  ): Promise<AxiosResponse<ApiResponse<Product>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      const product = mockProducts.find((p) => p.productName === productName);
      return Promise.resolve({
        data: {
          success: !!product,
          data: product!,
          message: product ? "Product found" : "Product not found",
        },
        status: product ? 200 : 404,
        statusText: product ? "OK" : "Not Found",
        headers: {},
        config: {} as any,
      });
    }
    return axios.get(
      `${this.getBaseUrl()}/getByProductName?productName=${encodeURIComponent(productName)}`
    );
  }

  async getProductsByCategory(
    categoryId: number
  ): Promise<AxiosResponse<ApiResponse<Product[]>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      const products = mockProducts.filter(
        (p) => p.category?.id === categoryId
      );
      return Promise.resolve({
        data: {
          success: true,
          data: products,
          message: "Products fetched successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }
    const response = await axios.get(
      `${this.getBaseUrl()}/category/${categoryId}`
    );

    // DotNet backend returns PagedResultDto, extract items
    if (
      response.data.success &&
      response.data.data &&
      response.data.data.items
    ) {
      response.data.data = response.data.data.items;
    }

    return response;
  }

  async searchProducts(
    searchTerm: string
  ): Promise<AxiosResponse<ApiResponse<Product[]>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      const term = searchTerm.toLowerCase();
      const products = mockProducts.filter(
        (p) =>
          p.productName.toLowerCase().includes(term) ||
          (p.description && p.description.toLowerCase().includes(term))
      );
      return Promise.resolve({
        data: {
          success: true,
          data: products,
          message: "Products fetched successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }
    const response = await axios.get(
      `${this.getBaseUrl()}/search?q=${encodeURIComponent(searchTerm)}`
    );

    // DotNet backend returns PagedResultDto, extract items
    if (
      response.data.success &&
      response.data.data &&
      response.data.data.items
    ) {
      response.data.data = response.data.data.items;
    }

    return response;
  }

  async getFeaturedProducts(): Promise<AxiosResponse<ApiResponse<Product[]>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      const products = mockProducts.filter(
        (p) => p.discount && p.discount > 20
      );
      return Promise.resolve({
        data: {
          success: true,
          data: products,
          message: "Featured products fetched successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }
    return axios.get(`${this.getBaseUrl()}/featured`);
  }

  async getDiscountedProducts(): Promise<
    AxiosResponse<ApiResponse<Product[]>>
  > {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      const products = mockProducts.filter((p) => p.discount && p.discount > 0);
      return Promise.resolve({
        data: {
          success: true,
          data: products,
          message: "Discounted products fetched successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }
    return axios.get(`${this.getBaseUrl()}/discounted`);
  }

  async getProductDescription(productId: number): Promise<
    ApiResponse<{
      detailedDescription: string;
      features: Array<{
        icon: string;
        title: string;
        description: string;
      }>;
      usageSteps: string[];
      faqs: Array<{
        question: string;
        answer: string;
      }>;
      installmentOptions: Array<{
        months: number;
        monthlyPayment: number;
        totalPrice: number;
        interest: number;
      }>;
    }>
  > {
    try {
      const baseUrl = this.getBaseUrl();
      const response = await axios.get(
        `${baseUrl}/products/${productId}/description`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching product description:", error);
      // Fallback to mock data
      return {
        success: true,
        data: {
          detailedDescription: `Bu ürün hakkında detaylı bilgi için lütfen ürün sayfasını ziyaret edin.`,
          features: [
            {
              icon: "CheckCircle",
              title: "Kalite Garantisi",
              description: "2 yıl resmi garanti ile güvenli alışveriş",
            },
            {
              icon: "Star",
              title: "Premium Kalite",
              description: "En yüksek kalite standartlarında üretim",
            },
          ],
          usageSteps: [
            "Ürünü ambalajından çıkarın ve kontrol edin",
            "Kullanım kılavuzunu dikkatli bir şekilde okuyun",
          ],
          faqs: [
            {
              question: "Ürün ne kadar sürede teslim edilir?",
              answer: "Siparişiniz 1-3 iş günü içinde kargoya verilir.",
            },
          ],
          installmentOptions: [
            { months: 2, monthlyPayment: 0, totalPrice: 0, interest: 0 },
            { months: 3, monthlyPayment: 0, totalPrice: 0, interest: 0 },
          ],
        },
        message: "Product description loaded from fallback",
      };
    }
  }
}
