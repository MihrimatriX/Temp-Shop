import { useBackendStore } from "@/store/backend-store";

export const API_CONFIG = {
  ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT || "development",
};

export const getApiUrl = (): string => {
  // Bu fonksiyon artık backend store'dan URL alacak
  // Ancak server-side rendering için fallback değerler
  return process.env.NEXT_PUBLIC_DOTNET_API_URL || "http://localhost:5000/api";
};

export const getEnvironmentApiUrl = (): string => {
  if (typeof window === 'undefined') return '';
  
  const backendType = process.env.NEXT_PUBLIC_BACKEND_TYPE || 'mock';
  
  switch (backendType) {
    case 'dotnet':
      return process.env.NEXT_PUBLIC_API_DOTNET_URL || 'http://localhost:5000/api';
    case 'spring':
      return process.env.NEXT_PUBLIC_API_SPRING_URL || 'http://localhost:8080/api';
    default:
      return '';
  }
};

// Backend türüne göre endpoint'leri döndüren fonksiyonlar
export const getProductEndpoint = () => {
  if (typeof window === "undefined") return "/Product"; // SSR için default

  const backendType = useBackendStore.getState().config.type;
  return backendType === "dotnet" ? "/Product" : "/product";
};

export const getCategoryEndpoint = () => {
  if (typeof window === "undefined") return "/Category"; // SSR için default

  const backendType = useBackendStore.getState().config.type;
  return backendType === "dotnet" ? "/Category" : "/category";
};

export const getReviewEndpoint = () => {
  if (typeof window === "undefined") return "/Review"; // SSR için default

  const backendType = useBackendStore.getState().config.type;
  return backendType === "dotnet" ? "/Review" : "/review";
};

export const getSubCategoryEndpoint = () => {
  if (typeof window === "undefined") return "/SubCategory"; // SSR için default

  const backendType = useBackendStore.getState().config.type;
  return backendType === "dotnet" ? "/SubCategory" : "/subcategory";
};

export const API_ENDPOINTS = {
  // Products - Dinamik endpoint'ler
  PRODUCTS: () => getProductEndpoint(),
  PRODUCT_BY_ID: (id: number) => `${getProductEndpoint()}/${id}`,
  PRODUCTS_BY_CATEGORY: (categoryId: number) =>
    `${getProductEndpoint()}/category/${categoryId}`,
  SEARCH_PRODUCTS: () => `${getProductEndpoint()}/search`,
  FEATURED_PRODUCTS: () => `${getProductEndpoint()}/featured`,
  DISCOUNTED_PRODUCTS: () => `${getProductEndpoint()}/discounted`,

  // Categories - Dinamik endpoint'ler
  CATEGORIES: () => getCategoryEndpoint(),
  CATEGORY_BY_ID: (id: number) => `${getCategoryEndpoint()}/${id}`,

  // SubCategories - Dinamik endpoint'ler
  SUBCATEGORIES: () => getSubCategoryEndpoint(),
  SUBCATEGORY_BY_ID: (id: number) => `${getSubCategoryEndpoint()}/${id}`,
  SUBCATEGORIES_BY_CATEGORY: (categoryId: number) =>
    `${getSubCategoryEndpoint()}/category/${categoryId}`,

  // Cart
  CART: "/cart",
  CART_ITEMS: "/cart/items",
  ADD_TO_CART: "/cart/add",
  REMOVE_FROM_CART: (productId: number) => `/cart/remove/${productId}`,
  UPDATE_CART_ITEM: "/cart/update",
  CLEAR_CART: "/cart/clear",

  // Reviews - Dinamik endpoint'ler
  REVIEWS: () => getReviewEndpoint(),
  REVIEW_BY_ID: (id: number) => `${getReviewEndpoint()}/${id}`,
  PRODUCT_REVIEWS: (productId: number) =>
    `${getReviewEndpoint()}/product/${productId}`,
  PRODUCT_REVIEW_SUMMARY: (productId: number) =>
    `${getReviewEndpoint()}/product/${productId}/summary`,

  // Orders
  ORDERS: "/orders",
  ORDER_BY_ID: (id: number) => `/orders/${id}`,
  CREATE_ORDER: "/orders",

  // Users
  USERS: "/users",
  USER_BY_ID: (id: number) => `/users/${id}`,
  USER_PROFILE: "/users/profile",
  USER_ORDERS: "/users/orders",

  // Auth
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  REFRESH_TOKEN: "/auth/refresh",

  // Campaigns
  CAMPAIGNS: "/campaigns",
  CAMPAIGN_BY_ID: (id: number) => `/campaigns/${id}`,
  ACTIVE_CAMPAIGNS: "/campaigns/active",

  // Addresses
  ADDRESSES: "/addresses",
  ADDRESS_BY_ID: (id: number) => `/addresses/${id}`,
  SET_DEFAULT_ADDRESS: (id: number) => `/addresses/${id}/default`,

  // Payment Methods
  PAYMENT_METHODS: "/payment-methods",
  PAYMENT_METHOD_BY_ID: (id: number) => `/payment-methods/${id}`,
  SET_DEFAULT_PAYMENT_METHOD: (id: number) => `/payment-methods/${id}/default`,

  // Favorites
  FAVORITES: "/favorites",
  FAVORITE_BY_PRODUCT: (productId: number) => `/favorites/check/${productId}`,

  // Notifications
  NOTIFICATIONS: "/notifications",
  NOTIFICATION_BY_ID: (id: number) => `/notifications/${id}`,
  NOTIFICATION_SUMMARY: "/notifications/summary",
  MARK_ALL_READ: "/notifications/mark-all-read",

  // Security
  SECURITY_INFO: "/security/info",
  CHANGE_PASSWORD: "/security/change-password",
  UPDATE_EMAIL: "/security/update-email",
  LOGIN_HISTORY: "/security/login-history",
  SECURITY_SETTINGS: "/security/settings",
  LOGOUT_ALL_DEVICES: "/security/logout-all-devices",

  // Settings
  USER_SETTINGS: "/settings/user",
  PRIVACY_SETTINGS: "/settings/privacy",
  RESET_SETTINGS: "/settings/reset",
  EXPORT_SETTINGS: "/settings/export",
  IMPORT_SETTINGS: "/settings/import",

  // Help & Support
  HELP_ARTICLES: "/helpsupport/articles",
  HELP_ARTICLE_BY_ID: (id: number) => `/helpsupport/articles/${id}`,
  FAQS: "/helpsupport/faqs",
  SUPPORT_TICKETS: "/helpsupport/tickets",
  CONTACT_FORM: "/helpsupport/contact",
};
