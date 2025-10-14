export const API_CONFIG = {
  BACKEND_TYPE: process.env.NEXT_PUBLIC_BACKEND_TYPE || "spring",
  SPRING_API_URL:
    process.env.NEXT_PUBLIC_SPRING_API_URL || "http://localhost:8080/api",
  DOTNET_API_URL:
    process.env.NEXT_PUBLIC_DOTNET_API_URL || "http://localhost:5000/api",
  ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT || "development",
};

export const getApiUrl = (): string => {
  switch (API_CONFIG.BACKEND_TYPE) {
    case "spring":
      return API_CONFIG.SPRING_API_URL;
    case "dotnet":
      return API_CONFIG.DOTNET_API_URL;
    case "mock":
    default:
      return "";
  }
};

export const API_ENDPOINTS = {
  PRODUCTS: "/Product",
  PRODUCT_BY_ID: (id: number) => `/Product/${id}`,
  PRODUCTS_BY_CATEGORY: (categoryId: number) =>
    `/Product/category/${categoryId}`,
  SEARCH_PRODUCTS: "/Product/search",
  FEATURED_PRODUCTS: "/Product/featured",
  DISCOUNTED_PRODUCTS: "/Product/discounted",
  CATEGORIES: "/Category",
  CATEGORY_BY_ID: (id: number) => `/Category/${id}`,
  CART: "/cart",
  CART_ITEMS: "/cart/items",
  ADD_TO_CART: "/cart/add",
  REVIEWS: "/Review",
  REVIEW_BY_ID: (id: number) => `/Review/${id}`,
  PRODUCT_REVIEWS: (productId: number) => `/Review/product/${productId}`,
  PRODUCT_REVIEW_SUMMARY: (productId: number) =>
    `/Review/product/${productId}/summary`,
  REMOVE_FROM_CART: "/cart/remove",
  UPDATE_CART_ITEM: "/cart/update",
  CLEAR_CART: "/cart/clear",
  ORDERS: "/orders",
  ORDER_BY_ID: (id: number) => `/orders/${id}`,
  CREATE_ORDER: "/orders",
  USERS: "/users",
  USER_BY_ID: (id: number) => `/users/${id}`,
  USER_PROFILE: "/users/profile",
  USER_ORDERS: "/users/orders",
  LOGIN: "/Auth/login",
  REGISTER: "/Auth/register",
  LOGOUT: "/Auth/logout",
  REFRESH_TOKEN: "/Auth/refresh",
  CAMPAIGNS: "/campaigns",
  CAMPAIGN_BY_ID: (id: number) => `/campaigns/${id}`,
  ACTIVE_CAMPAIGNS: "/campaigns/active",
};
