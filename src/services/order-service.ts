import axios, { AxiosResponse } from "axios";
import {
  ApiResponse,
  OrderDto,
  CreateOrderDto,
  UpdateOrderStatusDto,
} from "@/types";
import { API_ENDPOINTS } from "@/config/api";
import { useBackendStore } from "@/store/backend-store";

export class OrderService {
  private getBaseUrl() {
    const apiUrl = useBackendStore.getState().getCurrentApiUrl();
    return apiUrl + API_ENDPOINTS.ORDERS;
  }

  async getUserOrders(
    token: string
  ): Promise<AxiosResponse<ApiResponse<OrderDto[]>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for orders
      const mockOrders: OrderDto[] = [
        {
          id: 1,
          orderNumber: "ORD-2024-001",
          userId: 1,
          userName: "Ahmet Yılmaz",
          userEmail: "ahmet@example.com",
          items: [
            {
              id: 1,
              productId: 1,
              productName: "Wireless Headphones",
              productImageUrl: "/placeholder-product.jpg",
              quantity: 1,
              unitPrice: 299.99,
              totalPrice: 299.99,
            },
          ],
          totalAmount: 299.99,
          status: "Delivered",
          shippingAddress: {
            id: 1,
            title: "Ev",
            fullAddress: "Atatürk Mahallesi, Cumhuriyet Caddesi No:123 Daire:5",
            city: "İstanbul",
            district: "Kadıköy",
            postalCode: "34710",
            phoneNumber: "0555 123 45 67",
            isDefault: true,
          },
          billingAddress: {
            id: 1,
            title: "Ev",
            fullAddress: "Atatürk Mahallesi, Cumhuriyet Caddesi No:123 Daire:5",
            city: "İstanbul",
            district: "Kadıköy",
            postalCode: "34710",
            phoneNumber: "0555 123 45 67",
            isDefault: true,
          },
          paymentMethod: {
            id: 1,
            type: "credit_card",
            cardNumber: "**** **** **** 1234",
            cardHolderName: "Ahmet Yılmaz",
            expiryMonth: 12,
            expiryYear: 2026,
            isDefault: true,
          },
          createdAt: new Date("2024-10-01T10:30:00Z"),
          updatedAt: new Date("2024-10-01T10:30:00Z"),
        },
      ];

      return Promise.resolve({
        data: {
          success: true,
          data: mockOrders,
          message: "Mock orders retrieved successfully",
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

  async getOrderById(
    id: number,
    token: string
  ): Promise<AxiosResponse<ApiResponse<OrderDto>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for single order
      const mockOrder: OrderDto = {
        id: id,
        orderNumber: `ORD-2024-${id.toString().padStart(3, "0")}`,
        userId: 1,
        userName: "Ahmet Yılmaz",
        userEmail: "ahmet@example.com",
        items: [
          {
            id: 1,
            productId: 1,
            productName: "Wireless Headphones",
            productImageUrl: "/placeholder-product.jpg",
            quantity: 1,
            unitPrice: 299.99,
            totalPrice: 299.99,
          },
        ],
        totalAmount: 299.99,
        status: "Delivered",
        shippingAddress: {
          id: 1,
          title: "Ev",
          fullAddress: "Atatürk Mahallesi, Cumhuriyet Caddesi No:123 Daire:5",
          city: "İstanbul",
          district: "Kadıköy",
          postalCode: "34710",
          phoneNumber: "0555 123 45 67",
          isDefault: true,
        },
        billingAddress: {
          id: 1,
          title: "Ev",
          fullAddress: "Atatürk Mahallesi, Cumhuriyet Caddesi No:123 Daire:5",
          city: "İstanbul",
          district: "Kadıköy",
          postalCode: "34710",
          phoneNumber: "0555 123 45 67",
          isDefault: true,
        },
        paymentMethod: {
          id: 1,
          type: "credit_card",
          cardNumber: "**** **** **** 1234",
          cardHolderName: "Ahmet Yılmaz",
          expiryMonth: 12,
          expiryYear: 2026,
          isDefault: true,
        },
        createdAt: new Date("2024-10-01T10:30:00Z"),
        updatedAt: new Date("2024-10-01T10:30:00Z"),
      };

      return Promise.resolve({
        data: {
          success: true,
          data: mockOrder,
          message: "Mock order retrieved successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }

    return axios.get(`${this.getBaseUrl()}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    token: string
  ): Promise<AxiosResponse<ApiResponse<OrderDto>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for creating order
      const mockOrder: OrderDto = {
        id: Date.now(),
        orderNumber: `ORD-2024-${Date.now()}`,
        userId: 1,
        userName: "Ahmet Yılmaz",
        userEmail: "ahmet@example.com",
        items: createOrderDto.items.map((item, index) => ({
          id: index + 1,
          productId: item.productId,
          productName: `Product ${item.productId}`,
          productImageUrl: "/placeholder-product.jpg",
          quantity: item.quantity,
          unitPrice: 100,
          totalPrice: 100 * item.quantity,
        })),
        totalAmount: createOrderDto.items.reduce(
          (total, item) => total + 100 * item.quantity,
          0
        ),
        status: "Pending",
        shippingAddress: {
          id: createOrderDto.shippingAddressId,
          title: "Ev",
          fullAddress: "Atatürk Mahallesi, Cumhuriyet Caddesi No:123 Daire:5",
          city: "İstanbul",
          district: "Kadıköy",
          postalCode: "34710",
          phoneNumber: "0555 123 45 67",
          isDefault: true,
        },
        billingAddress: {
          id: createOrderDto.shippingAddressId,
          title: "Ev",
          fullAddress: "Atatürk Mahallesi, Cumhuriyet Caddesi No:123 Daire:5",
          city: "İstanbul",
          district: "Kadıköy",
          postalCode: "34710",
          phoneNumber: "0555 123 45 67",
          isDefault: true,
        },
        paymentMethod: {
          id: createOrderDto.paymentMethodId,
          type: "credit_card",
          cardNumber: "**** **** **** 1234",
          cardHolderName: "Ahmet Yılmaz",
          expiryMonth: 12,
          expiryYear: 2026,
          isDefault: true,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return Promise.resolve({
        data: {
          success: true,
          data: mockOrder,
          message: "Mock order created successfully",
        },
        status: 201,
        statusText: "Created",
        headers: {},
        config: {} as any,
      });
    }

    return axios.post(this.getBaseUrl(), createOrderDto, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async updateOrderStatus(
    id: number,
    updateOrderStatusDto: UpdateOrderStatusDto,
    token: string
  ): Promise<AxiosResponse<ApiResponse<OrderDto>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for updating order status
      const mockOrder: OrderDto = {
        id: id,
        orderNumber: `ORD-2024-${id.toString().padStart(3, "0")}`,
        userId: 1,
        userName: "Ahmet Yılmaz",
        userEmail: "ahmet@example.com",
        items: [
          {
            id: 1,
            productId: 1,
            productName: "Wireless Headphones",
            productImageUrl: "/placeholder-product.jpg",
            quantity: 1,
            unitPrice: 299.99,
            totalPrice: 299.99,
          },
        ],
        totalAmount: 299.99,
        status: updateOrderStatusDto.status,
        shippingAddress: {
          id: 1,
          title: "Ev",
          fullAddress: "Atatürk Mahallesi, Cumhuriyet Caddesi No:123 Daire:5",
          city: "İstanbul",
          district: "Kadıköy",
          postalCode: "34710",
          phoneNumber: "0555 123 45 67",
          isDefault: true,
        },
        billingAddress: {
          id: 1,
          title: "Ev",
          fullAddress: "Atatürk Mahallesi, Cumhuriyet Caddesi No:123 Daire:5",
          city: "İstanbul",
          district: "Kadıköy",
          postalCode: "34710",
          phoneNumber: "0555 123 45 67",
          isDefault: true,
        },
        paymentMethod: {
          id: 1,
          type: "credit_card",
          cardNumber: "**** **** **** 1234",
          cardHolderName: "Ahmet Yılmaz",
          expiryMonth: 12,
          expiryYear: 2026,
          isDefault: true,
        },
        createdAt: new Date("2024-10-01T10:30:00Z"),
        updatedAt: new Date(),
      };

      return Promise.resolve({
        data: {
          success: true,
          data: mockOrder,
          message: "Mock order status updated successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }

    return axios.put(
      `${this.getBaseUrl()}/${id}/status`,
      updateOrderStatusDto,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  async cancelOrder(
    id: number,
    token: string
  ): Promise<AxiosResponse<ApiResponse<string>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for cancelling order
      return Promise.resolve({
        data: {
          success: true,
          data: "Order cancelled successfully",
          message: "Mock order cancelled successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }

    return axios.put(
      `${this.getBaseUrl()}/${id}/cancel`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}
