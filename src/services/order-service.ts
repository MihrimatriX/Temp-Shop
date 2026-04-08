import axios, { AxiosResponse } from "axios";
import {
  ApiResponse,
  OrderDto,
  CreateOrderDto,
  UpdateOrderStatusDto,
} from "@/types";
import { API_ENDPOINTS } from "@/config/api";
import { useBackendStore } from "@/store/backend-store";
import { addUserOrder, findUserById, verifyMockToken } from "@/data/mock-users";

export class OrderService {
  private getBaseUrl() {
    const apiUrl = useBackendStore.getState().getCurrentApiUrl();
    return apiUrl + API_ENDPOINTS.ORDERS;
  }

  private mapMockStatus(status: string) {
    switch (status) {
      case "pending":
        return "Pending";
      case "confirmed":
        return "Confirmed";
      case "processing":
        return "Processing";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  }

  async getUserOrders(
    token: string,
  ): Promise<AxiosResponse<ApiResponse<OrderDto[]>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      const payload = verifyMockToken(token);
      const user = payload ? findUserById(payload.userId) : undefined;

      if (!user) {
        return Promise.resolve({
          data: {
            success: false,
            data: [],
            message: "Mock token geçersiz veya kullanıcı bulunamadı",
          },
          status: 401,
          statusText: "Unauthorized",
          headers: {},
          config: {} as any,
        });
      }

      const mockOrders: OrderDto[] = user.orders.map((o) => ({
        id: o.id,
        orderNumber: o.orderNumber,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userEmail: user.email,
        items: o.items.map((it, idx) => ({
          id: idx + 1,
          productId: it.productId,
          productName: it.productName,
          productImageUrl: "/placeholder-product.jpg",
          quantity: it.quantity,
          unitPrice: it.unitPrice,
          totalPrice: it.totalPrice,
        })),
        totalAmount: o.totalAmount,
        status: this.mapMockStatus(o.status),
        shippingAddress: o.shippingAddress,
        billingAddress: o.shippingAddress,
        paymentMethod: {
          id: 1,
          type: "credit_card",
          cardNumber: "**** **** **** 1234",
          cardHolderName: `${user.firstName} ${user.lastName}`,
          expiryMonth: 12,
          expiryYear: new Date().getFullYear() + 2,
          isDefault: true,
        },
        createdAt: o.createdAt,
        updatedAt: o.updatedAt,
      }));

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
    token: string,
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
    token: string,
  ): Promise<AxiosResponse<ApiResponse<OrderDto>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      const payload = verifyMockToken(token);
      const user = payload ? findUserById(payload.userId) : undefined;

      if (!user) {
        return Promise.resolve({
          data: {
            success: false,
            data: null as any,
            message: "Mock token geçersiz veya kullanıcı bulunamadı",
          },
          status: 401,
          statusText: "Unauthorized",
          headers: {},
          config: {} as any,
        });
      }

      const defaultAddress =
        user.addresses.find((a) => a.isDefault) ?? user.addresses[0];
      if (!defaultAddress) {
        return Promise.resolve({
          data: {
            success: false,
            data: null as any,
            message: "Sipariş oluşturmak için önce bir adres ekleyin",
          },
          status: 400,
          statusText: "Bad Request",
          headers: {},
          config: {} as any,
        });
      }

      const now = new Date();
      const created = addUserOrder(user.id, {
        items: createOrderDto.items.map((item) => ({
          productId: item.productId,
          productName: `Product ${item.productId}`,
          quantity: item.quantity,
          unitPrice: 100,
          totalPrice: 100 * item.quantity,
        })),
        totalAmount: createOrderDto.items.reduce(
          (total, item) => total + 100 * item.quantity,
          0,
        ),
        status: "pending",
        shippingAddress: defaultAddress,
        paymentMethod: "Kredi Kartı",
        createdAt: now,
        updatedAt: now,
      });

      if (!created) {
        return Promise.resolve({
          data: {
            success: false,
            data: null as any,
            message: "Sipariş oluşturulamadı",
          },
          status: 500,
          statusText: "Internal Server Error",
          headers: {},
          config: {} as any,
        });
      }

      const mockOrder: OrderDto = {
        id: created.id,
        orderNumber: created.orderNumber,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userEmail: user.email,
        items: created.items.map((it, idx) => ({
          id: idx + 1,
          productId: it.productId,
          productName: it.productName,
          productImageUrl: "/placeholder-product.jpg",
          quantity: it.quantity,
          unitPrice: it.unitPrice,
          totalPrice: it.totalPrice,
        })),
        totalAmount: created.totalAmount,
        status: "Pending",
        shippingAddress: created.shippingAddress,
        billingAddress: created.shippingAddress,
        paymentMethod: {
          id: 1,
          type: "credit_card",
          cardNumber: "**** **** **** 1234",
          cardHolderName: `${user.firstName} ${user.lastName}`,
          expiryMonth: 12,
          expiryYear: new Date().getFullYear() + 2,
          isDefault: true,
        },
        createdAt: created.createdAt,
        updatedAt: created.updatedAt,
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
    token: string,
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
      },
    );
  }

  async cancelOrder(
    id: number,
    token: string,
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
      },
    );
  }
}
