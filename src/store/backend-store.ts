import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BackendType = "dotnet" | "spring" | "mock";

export interface BackendConfig {
  type: BackendType;
  dotnetUrl: string;
  springUrl: string;
}

export interface BackendState {
  config: BackendConfig;
}

export interface BackendActions {
  setBackendType: (type: BackendType) => void;
  setDotnetUrl: (url: string) => void;
  setSpringUrl: (url: string) => void;
  getCurrentApiUrl: () => string;
  clearAllCache: () => void;
}

const defaultConfig: BackendConfig = {
  type: "mock",
  dotnetUrl:
    process.env.NEXT_PUBLIC_DOTNET_API_URL || "http://localhost:5000/api",
  springUrl:
    process.env.NEXT_PUBLIC_SPRING_API_URL || "http://localhost:8082/api",
};

export const useBackendStore = create<BackendState & BackendActions>()(
  persist(
    (set, get) => ({
      // State
      config: defaultConfig,

      // Actions
      setBackendType: (type: BackendType) => {
        set((state) => ({
          config: { ...state.config, type },
        }));
        // Backend değişince tüm cache'i temizle
        get().clearAllCache();
      },

      setDotnetUrl: (url: string) => {
        set((state) => ({
          config: { ...state.config, dotnetUrl: url },
        }));
      },

      setSpringUrl: (url: string) => {
        set((state) => ({
          config: { ...state.config, springUrl: url },
        }));
      },

      getCurrentApiUrl: () => {
        const { config } = get();
        switch (config.type) {
          case "dotnet":
            return config.dotnetUrl;
          case "spring":
            return config.springUrl;
          case "mock":
          default:
            return "";
        }
      },

      clearAllCache: () => {
        // Persist edilen store'ları temizle (local + session)
        if (typeof window !== "undefined") {
          const keys = [
            "auth-storage",
            "cart-storage",
            "favorites-storage",
            "user-settings-storage",
          ] as const;

          for (const key of keys) {
            try {
              localStorage.removeItem(key);
            } catch {
              // ignore
            }
            try {
              sessionStorage.removeItem(key);
            } catch {
              // ignore
            }
          }

          // Sayfayı yenile (tüm state'i sıfırla)
          window.location.reload();
        }
      },
    }),
    {
      name: "backend-config",
      partialize: (state) => ({
        config: state.config,
      }),
    },
  ),
);
