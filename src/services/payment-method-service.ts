import axios, { AxiosResponse } from "axios";
import {
  ApiResponse,
  PaymentMethodDto,
  CreatePaymentMethodDto,
  UpdatePaymentMethodDto,
} from "@/types";
import { API_ENDPOINTS } from "@/config/api";
import { useBackendStore } from "@/store/backend-store";

export class PaymentMethodService {
  private getBaseUrl() {
    const apiUrl = useBackendStore.getState().getCurrentApiUrl();
    return apiUrl + API_ENDPOINTS.PAYMENT_METHODS;
  }

  async getUserPaymentMethods(
    token: string
  ): Promise<AxiosResponse<ApiResponse<PaymentMethodDto[]>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for payment methods
      const mockPaymentMethods: PaymentMethodDto[] = [
        {
          id: 1,
          type: "credit_card",
          cardNumber: "**** **** **** 1234",
          cardHolderName: "Ahmet Yılmaz",
          expiryMonth: 12,
          expiryYear: 2026,
          isDefault: true,
        },
        {
          id: 2,
          type: "debit_card",
          cardNumber: "**** **** **** 5678",
          cardHolderName: "Ahmet Yılmaz",
          expiryMonth: 8,
          expiryYear: 2025,
          isDefault: false,
        },
        {
          id: 3,
          type: "bank_transfer",
          bankName: "Ziraat Bankası",
          accountNumber: "****1234",
          accountHolderName: "Ahmet Yılmaz",
          isDefault: false,
        },
      ];

      return Promise.resolve({
        data: {
          success: true,
          data: mockPaymentMethods,
          message: "Mock payment methods retrieved successfully",
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

  async getPaymentMethodById(
    id: number,
    token: string
  ): Promise<AxiosResponse<ApiResponse<PaymentMethodDto>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for single payment method
      const mockPaymentMethod: PaymentMethodDto = {
        id: id,
        type: "credit_card",
        cardNumber: "**** **** **** 1234",
        cardHolderName: "Ahmet Yılmaz",
        expiryMonth: 12,
        expiryYear: 2026,
        isDefault: true,
      };

      return Promise.resolve({
        data: {
          success: true,
          data: mockPaymentMethod,
          message: "Mock payment method retrieved successfully",
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

  async createPaymentMethod(
    createPaymentMethodDto: CreatePaymentMethodDto,
    token: string
  ): Promise<AxiosResponse<ApiResponse<PaymentMethodDto>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for creating payment method
      const mockPaymentMethod: PaymentMethodDto = {
        id: Date.now(),
        type: createPaymentMethodDto.type,
        cardNumber: createPaymentMethodDto.cardNumber
          ? "**** **** **** " + createPaymentMethodDto.cardNumber.slice(-4)
          : undefined,
        cardHolderName: createPaymentMethodDto.cardHolderName,
        expiryMonth: createPaymentMethodDto.expiryMonth,
        expiryYear: createPaymentMethodDto.expiryYear,
        isDefault: createPaymentMethodDto.isDefault,
        bankName: createPaymentMethodDto.bankName,
        accountNumber: createPaymentMethodDto.accountNumber
          ? "****" + createPaymentMethodDto.accountNumber.slice(-4)
          : undefined,
        accountHolderName: createPaymentMethodDto.accountHolderName,
      };

      return Promise.resolve({
        data: {
          success: true,
          data: mockPaymentMethod,
          message: "Mock payment method created successfully",
        },
        status: 201,
        statusText: "Created",
        headers: {},
        config: {} as any,
      });
    }

    return axios.post(this.getBaseUrl(), createPaymentMethodDto, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async updatePaymentMethod(
    id: number,
    updatePaymentMethodDto: UpdatePaymentMethodDto,
    token: string
  ): Promise<AxiosResponse<ApiResponse<PaymentMethodDto>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for updating payment method
      const mockPaymentMethod: PaymentMethodDto = {
        id: id,
        type: updatePaymentMethodDto.type || "credit_card",
        cardNumber: updatePaymentMethodDto.cardNumber
          ? "**** **** **** " + updatePaymentMethodDto.cardNumber.slice(-4)
          : "**** **** **** 1234",
        cardHolderName: updatePaymentMethodDto.cardHolderName || "Ahmet Yılmaz",
        expiryMonth: updatePaymentMethodDto.expiryMonth || 12,
        expiryYear: updatePaymentMethodDto.expiryYear || 2026,
        isDefault: updatePaymentMethodDto.isDefault ?? true,
        bankName: updatePaymentMethodDto.bankName,
        accountNumber: updatePaymentMethodDto.accountNumber
          ? "****" + updatePaymentMethodDto.accountNumber.slice(-4)
          : undefined,
        accountHolderName: updatePaymentMethodDto.accountHolderName,
      };

      return Promise.resolve({
        data: {
          success: true,
          data: mockPaymentMethod,
          message: "Mock payment method updated successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }

    return axios.put(`${this.getBaseUrl()}/${id}`, updatePaymentMethodDto, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async deletePaymentMethod(
    id: number,
    token: string
  ): Promise<AxiosResponse<ApiResponse<string>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for deleting payment method
      return Promise.resolve({
        data: {
          success: true,
          data: "Payment method deleted successfully",
          message: "Mock payment method deleted successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }

    return axios.delete(`${this.getBaseUrl()}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async setDefaultPaymentMethod(
    id: number,
    token: string
  ): Promise<AxiosResponse<ApiResponse<PaymentMethodDto>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for setting default payment method
      const mockPaymentMethod: PaymentMethodDto = {
        id: id,
        type: "credit_card",
        cardNumber: "**** **** **** 1234",
        cardHolderName: "Ahmet Yılmaz",
        expiryMonth: 12,
        expiryYear: 2026,
        isDefault: true,
      };

      return Promise.resolve({
        data: {
          success: true,
          data: mockPaymentMethod,
          message: "Mock default payment method set successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }

    return axios.put(
      `${this.getBaseUrl()}/${id}/default`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}
