import axios, { AxiosResponse } from "axios";
import {
  ApiResponse,
  PaymentMethodDto,
  CreatePaymentMethodDto,
  UpdatePaymentMethodDto,
} from "@/types";
import { API_ENDPOINTS } from "@/config/api";
import { useBackendStore } from "@/store/backend-store";
import { mockResponse } from "./mock-data-service";

export class PaymentMethodService {
  private getBaseUrl() {
    const { config, getCurrentApiUrl } = useBackendStore.getState();
    // .NET controller is "PaymentMethod" (no hyphen); Spring uses "payment-method".
    const path =
      config.type === "dotnet"
        ? "/paymentmethod"
        : API_ENDPOINTS.PAYMENT_METHODS;
    return getCurrentApiUrl() + path;
  }

  async getUserPaymentMethods(
    token: string,
    userId: number,
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

      return mockResponse(
        mockPaymentMethods,
        "Mock payment methods retrieved successfully",
      );
    }

    return axios.get(`${this.getBaseUrl()}/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getPaymentMethodById(
    id: number,
    token: string,
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

      return mockResponse(
        mockPaymentMethod,
        "Mock payment method retrieved successfully",
      );
    }

    return axios.get(`${this.getBaseUrl()}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async createPaymentMethod(
    createPaymentMethodDto: CreatePaymentMethodDto,
    token: string,
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

      return mockResponse(
        mockPaymentMethod,
        "Mock payment method created successfully",
      );
    }

    return axios.post(this.getBaseUrl(), createPaymentMethodDto, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async updatePaymentMethod(
    id: number,
    updatePaymentMethodDto: UpdatePaymentMethodDto,
    token: string,
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

      return mockResponse(
        mockPaymentMethod,
        "Mock payment method updated successfully",
      );
    }

    return axios.put(`${this.getBaseUrl()}/${id}`, updatePaymentMethodDto, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async deletePaymentMethod(
    id: number,
    token: string,
  ): Promise<AxiosResponse<ApiResponse<string>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for deleting payment method
      return mockResponse(
        "Payment method deleted successfully",
        "Mock payment method deleted successfully",
      );
    }

    return axios.delete(`${this.getBaseUrl()}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async setDefaultPaymentMethod(
    id: number,
    token: string,
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

      return mockResponse(
        mockPaymentMethod,
        "Mock default payment method set successfully",
      );
    }

    return axios.put(
      `${this.getBaseUrl()}/${id}/default`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  }
}
