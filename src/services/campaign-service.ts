import axios, { AxiosResponse } from "axios";
import { Campaign, ApiResponse } from "@/types";
import { API_ENDPOINTS } from "@/config/api";
import { useBackendStore } from "@/store/backend-store";
import { mockCampaigns, mockResponse } from "./mock-data-service";

export class CampaignService {
  private getBaseUrl() {
    const apiUrl = useBackendStore.getState().getCurrentApiUrl();
    return apiUrl + API_ENDPOINTS.CAMPAIGNS;
  }

  async getCampaigns(): Promise<AxiosResponse<ApiResponse<Campaign[]>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      return mockResponse(mockCampaigns, "Campaigns fetched successfully");
    }
    return axios.get(this.getBaseUrl());
  }

  async getActiveCampaigns(): Promise<AxiosResponse<ApiResponse<Campaign[]>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      const activeCampaigns = mockCampaigns.filter((c) => c.isActive);
      return mockResponse(
        activeCampaigns,
        "Active campaigns fetched successfully",
      );
    }
    return axios.get(`${this.getBaseUrl()}/active`);
  }

  async getCampaignById(
    id: number,
  ): Promise<AxiosResponse<ApiResponse<Campaign>>> {
    const backendType = useBackendStore.getState().config.type;
    if (backendType === "mock") {
      const campaign = mockCampaigns.find((c) => c.id === id);
      return mockResponse(
        campaign!,
        campaign ? "Campaign found" : "Campaign not found",
        !!campaign,
      );
    }
    return axios.get(`${this.getBaseUrl()}/${id}`);
  }
}
