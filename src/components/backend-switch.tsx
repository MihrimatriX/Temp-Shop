"use client";

import { useBackendStore } from "@/store/backend-store";
import { useState } from "react";
import { Settings, Server, Database, Zap } from "lucide-react";

export const BackendSwitch = () => {
  const { config, setBackendType, setDotnetUrl, setSpringUrl } =
    useBackendStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleBackendChange = (type: "dotnet" | "spring" | "mock") => {
    setBackendType(type);
    setIsOpen(false);
  };

  const getBackendIcon = (type: string) => {
    switch (type) {
      case "dotnet":
        return <Database className="w-4 h-4" />;
      case "spring":
        return <Server className="w-4 h-4" />;
      case "mock":
        return <Zap className="w-4 h-4" />;
      default:
        return <Server className="w-4 h-4" />;
    }
  };

  const getBackendLabel = (type: string) => {
    switch (type) {
      case "dotnet":
        return ".NET Core";
      case "spring":
        return "Spring Boot";
      case "mock":
        return "Mock Data";
      default:
        return "Unknown";
    }
  };

  const getBackendDescription = (type: string) => {
    switch (type) {
      case "dotnet":
        return "ASP.NET Core API";
      case "spring":
        return "Java Spring Boot API";
      case "mock":
        return "Local mock data";
      default:
        return "";
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        aria-label="Backend seçimi"
      >
        <Settings className="w-4 h-4" />
        <span className="hidden sm:inline">{getBackendLabel(config.type)}</span>
        <span className="sm:hidden">{getBackendIcon(config.type)}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900">
              Backend Seçimi
            </h3>
            <p className="text-xs text-gray-500 mt-1">API backend'ini seçin</p>
          </div>

          <div className="p-2">
            {(["dotnet", "spring", "mock"] as const).map((type) => (
              <button
                key={type}
                onClick={() => handleBackendChange(type)}
                className={`w-full flex items-center gap-3 p-3 text-left rounded-lg transition-colors ${
                  config.type === type
                    ? "bg-blue-50 border border-blue-200"
                    : "hover:bg-gray-50"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    config.type === type
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {getBackendIcon(type)}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {getBackendLabel(type)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {getBackendDescription(type)}
                  </div>
                </div>
                {config.type === type && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <div className="text-xs text-gray-500">
              <div className="font-medium mb-1">Mevcut URL:</div>
              <div className="font-mono text-xs break-all">
                {config.type === "dotnet"
                  ? config.dotnetUrl
                  : config.type === "spring"
                    ? config.springUrl
                    : "Mock Data"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};
