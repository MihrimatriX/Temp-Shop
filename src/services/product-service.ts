import axios, { AxiosResponse } from "axios";
import { Product, ApiResponse, ProductFilters } from "@/types";
import { API_ENDPOINTS } from "@/config/api";
import { useBackendStore } from "@/store/backend-store";
import { mockProducts, mockResponse } from "./mock-data-service";

type ProductList = AxiosResponse<ApiResponse<Product[]>>;

function filterMock(filters: ProductFilters = {}): Product[] {
  const term = filters.searchTerm?.toLowerCase();
  return mockProducts.filter(
    (p) =>
      (!filters.categoryId || p.category?.id === filters.categoryId) &&
      (!filters.minPrice || p.unitPrice >= filters.minPrice) &&
      (!filters.maxPrice || p.unitPrice <= filters.maxPrice) &&
      (!term ||
        p.productName.toLowerCase().includes(term) ||
        !!p.description?.toLowerCase().includes(term)),
  );
}

// Backends send flat categoryId/categoryName/averageRating; the UI expects
// the nested shape the mock data uses.
type BackendProduct = Product & {
  categoryId?: number;
  categoryName?: string;
  averageRating?: number;
};
function normalize(p: BackendProduct): Product {
  return {
    ...p,
    category:
      p.category ??
      (p.categoryId
        ? {
            id: p.categoryId,
            categoryName: p.categoryName ?? "",
            isActive: true,
          }
        : undefined),
    rating: p.rating ?? p.averageRating,
  };
}

// .NET pages in data.items, Spring in data.content; both may also send a bare array.
function unwrapList(response: ProductList): ProductList {
  const raw = response.data.data as unknown as
    | BackendProduct[]
    | { items?: BackendProduct[]; content?: BackendProduct[] };
  const list = Array.isArray(raw) ? raw : (raw?.items ?? raw?.content ?? []);
  response.data.data = list.map(normalize);
  return response;
}

export class ProductService {
  private isMock() {
    return useBackendStore.getState().config.type === "mock";
  }

  private getBaseUrl() {
    return (
      useBackendStore.getState().getCurrentApiUrl() + API_ENDPOINTS.PRODUCTS
    );
  }

  async getProducts(filters: ProductFilters = {}): Promise<ProductList> {
    if (this.isMock()) return mockResponse(filterMock(filters));

    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value) params.append(key, String(value));
    }
    try {
      return unwrapList(await axios.get(`${this.getBaseUrl()}?${params}`));
    } catch (error) {
      console.warn("Product API error, falling back to mock data", error);
      return mockResponse(
        filterMock(filters),
        "Products fetched from fallback data",
      );
    }
  }

  async getProductById(
    id: number,
  ): Promise<AxiosResponse<ApiResponse<Product>>> {
    if (this.isMock()) {
      const product = mockProducts.find((p) => p.id === id);
      return mockResponse(
        product!,
        product ? "Product found" : "Product not found",
        !!product,
      );
    }
    const response = await axios.get(`${this.getBaseUrl()}/${id}`);
    if (response.data.data) response.data.data = normalize(response.data.data);
    return response;
  }

  async searchProducts(searchTerm: string): Promise<ProductList> {
    if (this.isMock()) return mockResponse(filterMock({ searchTerm }));
    return unwrapList(
      await axios.get(
        `${this.getBaseUrl()}/search?q=${encodeURIComponent(searchTerm)}`,
      ),
    );
  }
}
