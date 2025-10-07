// API Configuration
export const API_CONFIG = {
  // Backend type: 'spring' | 'dotnet' | 'mock'
  BACKEND_TYPE: process.env.NEXT_PUBLIC_BACKEND_TYPE || 'mock',
  
  // API URLs
  SPRING_API_URL: process.env.NEXT_PUBLIC_SPRING_API_URL || 'http://localhost:8080/api',
  DOTNET_API_URL: process.env.NEXT_PUBLIC_DOTNET_API_URL || 'http://localhost:5000/api',
  
  // Environment
  ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT || 'development',
}

// Get current API URL based on backend type
export const getApiUrl = (): string => {
  switch (API_CONFIG.BACKEND_TYPE) {
    case 'spring':
      return API_CONFIG.SPRING_API_URL
    case 'dotnet':
      return API_CONFIG.DOTNET_API_URL
    case 'mock':
    default:
      return ''
  }
}

// API Endpoints
export const API_ENDPOINTS = {
  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id: number) => `/products/${id}`,
  PRODUCTS_BY_CATEGORY: (categoryId: number) => `/products/category/${categoryId}`,
  SEARCH_PRODUCTS: '/products/search',
  FEATURED_PRODUCTS: '/products/featured',
  DISCOUNTED_PRODUCTS: '/products/discounted',
  
  // Categories
  CATEGORIES: '/categories',
  CATEGORY_BY_ID: (id: number) => `/categories/${id}`,
  
  // Cart
  CART: '/cart',
  CART_ITEMS: '/cart/items',
  ADD_TO_CART: '/cart/add',
  REMOVE_FROM_CART: '/cart/remove',
  UPDATE_CART_ITEM: '/cart/update',
  CLEAR_CART: '/cart/clear',
  
  // Orders
  ORDERS: '/orders',
  ORDER_BY_ID: (id: number) => `/orders/${id}`,
  CREATE_ORDER: '/orders',
  
  // Users
  USERS: '/users',
  USER_BY_ID: (id: number) => `/users/${id}`,
  USER_PROFILE: '/users/profile',
  USER_ORDERS: '/users/orders',
  
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  
  // Campaigns
  CAMPAIGNS: '/campaigns',
  CAMPAIGN_BY_ID: (id: number) => `/campaigns/${id}`,
  ACTIVE_CAMPAIGNS: '/campaigns/active',
}
