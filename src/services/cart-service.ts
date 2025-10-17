import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "@/types";
import { API_ENDPOINTS } from "@/config/api";
import { useBackendStore } from "@/store/backend-store";

export interface CartItem {
  productId: number;
  productName: string;
  productImageUrl?: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface Cart {
  userId: number;
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  productId: number;
  quantity: number;
}

export class CartService {
  private getBaseUrl() {
    const apiUrl = useBackendStore.getState().getCurrentApiUrl();
    return apiUrl + API_ENDPOINTS.CART;
  }

  async getCart(): Promise<AxiosResponse<ApiResponse<Cart>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      const mockCart: Cart = {
        userId: 1,
        items: [],
        totalItems: 0,
        totalAmount: 0,
      };
      return Promise.resolve({
        data: {
          success: true,
          data: mockCart,
          message: "Cart retrieved successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }
    return axios.get(this.getBaseUrl());
  }

  async addToCart(
    request: AddToCartRequest
  ): Promise<AxiosResponse<ApiResponse<Cart>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      const mockCart: Cart = {
        userId: 1,
        items: [
          {
            productId: request.productId,
            productName: "Mock Product",
            unitPrice: 100,
            quantity: request.quantity,
            totalPrice: 100 * request.quantity,
          },
        ],
        totalItems: request.quantity,
        totalAmount: 100 * request.quantity,
      };
      return Promise.resolve({
        data: {
          success: true,
          data: mockCart,
          message: "Item added to cart successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }
    return axios.post(`${this.getBaseUrl()}/add`, request);
  }

  async updateCartItem(
    request: UpdateCartItemRequest
  ): Promise<AxiosResponse<ApiResponse<Cart>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      const mockCart: Cart = {
        userId: 1,
        items: [
          {
            productId: request.productId,
            productName: "Mock Product",
            unitPrice: 100,
            quantity: request.quantity,
            totalPrice: 100 * request.quantity,
          },
        ],
        totalItems: request.quantity,
        totalAmount: 100 * request.quantity,
      };
      return Promise.resolve({
        data: {
          success: true,
          data: mockCart,
          message: "Cart item updated successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }
    return axios.put(`${this.getBaseUrl()}/update`, request);
  }

  async removeFromCart(
    productId: number
  ): Promise<AxiosResponse<ApiResponse<Cart>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      const mockCart: Cart = {
        userId: 1,
        items: [],
        totalItems: 0,
        totalAmount: 0,
      };
      return Promise.resolve({
        data: {
          success: true,
          data: mockCart,
          message: "Item removed from cart successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }
    return axios.delete(`${this.getBaseUrl()}/remove/${productId}`);
  }

  async clearCart(): Promise<AxiosResponse<ApiResponse<string>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      return Promise.resolve({
        data: {
          success: true,
          data: "Cart cleared successfully",
          message: "Cart cleared successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }
    return axios.delete(`${this.getBaseUrl()}/clear`);
  }
}
