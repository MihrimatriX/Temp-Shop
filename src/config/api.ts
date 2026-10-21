// Both backends use singular controller routes (/api/product, /api/order ...).
// .NET routing is case-insensitive, so one lowercase set serves both.
export const API_ENDPOINTS = {
  PRODUCTS: "/product",
  CATEGORIES: "/category",
  SUBCATEGORIES: "/subcategory",
  REVIEWS: "/review",
  CAMPAIGNS: "/campaign",
  ORDERS: "/order",
  ADDRESSES: "/address",
  PAYMENT_METHODS: "/payment-method",
  FAVORITES: "/favorite",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
} as const;
