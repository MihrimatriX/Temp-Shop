import axios, { AxiosResponse } from "axios";
import {
  ApiResponse,
  AddressDto,
  CreateAddressDto,
  UpdateAddressDto,
} from "@/types";
import { API_ENDPOINTS } from "@/config/api";
import { useBackendStore } from "@/store/backend-store";
import { mockResponse } from "./mock-data-service";

export class AddressService {
  private getBaseUrl() {
    const apiUrl = useBackendStore.getState().getCurrentApiUrl();
    return apiUrl + API_ENDPOINTS.ADDRESSES;
  }

  async getUserAddresses(
    token: string,
    userId: number,
  ): Promise<AxiosResponse<ApiResponse<AddressDto[]>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for addresses
      const mockAddresses: AddressDto[] = [
        {
          id: 1,
          title: "Ev",
          fullAddress: "Atatürk Mahallesi, Cumhuriyet Caddesi No:123 Daire:5",
          city: "İstanbul",
          district: "Kadıköy",
          postalCode: "34710",
          phoneNumber: "0555 123 45 67",
          isDefault: true,
        },
        {
          id: 2,
          title: "İş",
          fullAddress: "Levent Mahallesi, Büyükdere Caddesi No:456 Kat:12",
          city: "İstanbul",
          district: "Şişli",
          postalCode: "34330",
          phoneNumber: "0212 555 12 34",
          isDefault: false,
        },
      ];

      return mockResponse(
        mockAddresses,
        "Mock addresses retrieved successfully",
      );
    }

    return axios.get(`${this.getBaseUrl()}/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getAddressById(
    id: number,
    token: string,
  ): Promise<AxiosResponse<ApiResponse<AddressDto>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for single address
      const mockAddress: AddressDto = {
        id: id,
        title: "Ev",
        fullAddress: "Atatürk Mahallesi, Cumhuriyet Caddesi No:123 Daire:5",
        city: "İstanbul",
        district: "Kadıköy",
        postalCode: "34710",
        phoneNumber: "0555 123 45 67",
        isDefault: true,
      };

      return mockResponse(mockAddress, "Mock address retrieved successfully");
    }

    return axios.get(`${this.getBaseUrl()}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async createAddress(
    createAddressDto: CreateAddressDto,
    token: string,
  ): Promise<AxiosResponse<ApiResponse<AddressDto>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for creating address
      const mockAddress: AddressDto = {
        id: Date.now(),
        title: createAddressDto.title,
        fullAddress: createAddressDto.fullAddress,
        city: createAddressDto.city,
        district: createAddressDto.district,
        postalCode: createAddressDto.postalCode,
        phoneNumber: createAddressDto.phoneNumber,
        isDefault: createAddressDto.isDefault,
      };

      return mockResponse(mockAddress, "Mock address created successfully");
    }

    return axios.post(this.getBaseUrl(), createAddressDto, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async updateAddress(
    id: number,
    updateAddressDto: UpdateAddressDto,
    token: string,
  ): Promise<AxiosResponse<ApiResponse<AddressDto>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for updating address
      const mockAddress: AddressDto = {
        id: id,
        title: updateAddressDto.title || "Ev",
        fullAddress:
          updateAddressDto.fullAddress ||
          "Atatürk Mahallesi, Cumhuriyet Caddesi No:123 Daire:5",
        city: updateAddressDto.city || "İstanbul",
        district: updateAddressDto.district || "Kadıköy",
        postalCode: updateAddressDto.postalCode || "34710",
        phoneNumber: updateAddressDto.phoneNumber || "0555 123 45 67",
        isDefault: updateAddressDto.isDefault ?? true,
      };

      return mockResponse(mockAddress, "Mock address updated successfully");
    }

    return axios.put(`${this.getBaseUrl()}/${id}`, updateAddressDto, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async deleteAddress(
    id: number,
    token: string,
  ): Promise<AxiosResponse<ApiResponse<string>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for deleting address
      return mockResponse(
        "Address deleted successfully",
        "Mock address deleted successfully",
      );
    }

    return axios.delete(`${this.getBaseUrl()}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async setDefaultAddress(
    id: number,
    token: string,
  ): Promise<AxiosResponse<ApiResponse<AddressDto>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for setting default address
      const mockAddress: AddressDto = {
        id: id,
        title: "Ev",
        fullAddress: "Atatürk Mahallesi, Cumhuriyet Caddesi No:123 Daire:5",
        city: "İstanbul",
        district: "Kadıköy",
        postalCode: "34710",
        phoneNumber: "0555 123 45 67",
        isDefault: true,
      };

      return mockResponse(mockAddress, "Mock default address set successfully");
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
