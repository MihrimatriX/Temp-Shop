import axios, { AxiosResponse } from "axios";
import {
  ApiResponse,
  AddressDto,
  CreateAddressDto,
  UpdateAddressDto,
} from "@/types";
import { API_ENDPOINTS } from "@/config/api";
import { useBackendStore } from "@/store/backend-store";

export class AddressService {
  private getBaseUrl() {
    const apiUrl = useBackendStore.getState().getCurrentApiUrl();
    return apiUrl + API_ENDPOINTS.ADDRESSES;
  }

  async getUserAddresses(
    token: string
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

      return Promise.resolve({
        data: {
          success: true,
          data: mockAddresses,
          message: "Mock addresses retrieved successfully",
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

  async getAddressById(
    id: number,
    token: string
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

      return Promise.resolve({
        data: {
          success: true,
          data: mockAddress,
          message: "Mock address retrieved successfully",
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

  async createAddress(
    createAddressDto: CreateAddressDto,
    token: string
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

      return Promise.resolve({
        data: {
          success: true,
          data: mockAddress,
          message: "Mock address created successfully",
        },
        status: 201,
        statusText: "Created",
        headers: {},
        config: {} as any,
      });
    }

    return axios.post(this.getBaseUrl(), createAddressDto, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async updateAddress(
    id: number,
    updateAddressDto: UpdateAddressDto,
    token: string
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

      return Promise.resolve({
        data: {
          success: true,
          data: mockAddress,
          message: "Mock address updated successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }

    return axios.put(`${this.getBaseUrl()}/${id}`, updateAddressDto, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async deleteAddress(
    id: number,
    token: string
  ): Promise<AxiosResponse<ApiResponse<string>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      // Mock implementation for deleting address
      return Promise.resolve({
        data: {
          success: true,
          data: "Address deleted successfully",
          message: "Mock address deleted successfully",
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

  async setDefaultAddress(
    id: number,
    token: string
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

      return Promise.resolve({
        data: {
          success: true,
          data: mockAddress,
          message: "Mock default address set successfully",
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
