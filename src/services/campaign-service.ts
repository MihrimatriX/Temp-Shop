import axios, { AxiosResponse } from "axios";
import { Campaign, ApiResponse } from "@/types";
import { API_ENDPOINTS } from "@/config/api";
import { useBackendStore } from "@/store/backend-store";
import { mockCampaigns } from "./mock-data-service";

export class CampaignService {
  private getBaseUrl() {
    const apiUrl = useBackendStore.getState().getCurrentApiUrl();
    return apiUrl + API_ENDPOINTS.CAMPAIGNS;
  }

  async getCampaigns(): Promise<AxiosResponse<ApiResponse<Campaign[]>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      return Promise.resolve({
        data: {
          success: true,
          data: mockCampaigns,
          message: "Campaigns fetched successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }
    return axios.get(this.getBaseUrl());
  }

  async getActiveCampaigns(): Promise<AxiosResponse<ApiResponse<Campaign[]>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      const activeCampaigns = mockCampaigns.filter(c => c.isActive);
      return Promise.resolve({
        data: {
          success: true,
          data: activeCampaigns,
          message: "Active campaigns fetched successfully",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });
    }
    return axios.get(`${this.getBaseUrl()}/active`);
  }

  async getCampaignById(
    id: number
  ): Promise<AxiosResponse<ApiResponse<Campaign>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      const campaign = mockCampaigns.find((c) => c.id === id);
      return Promise.resolve({
        data: {
          success: !!campaign,
          data: campaign!,
          message: campaign ? "Campaign found" : "Campaign not found",
        },
        status: campaign ? 200 : 404,
        statusText: campaign ? "OK" : "Not Found",
        headers: {},
        config: {} as any,
      });
    }
    return axios.get(`${this.getBaseUrl()}/${id}`);
  }
}
