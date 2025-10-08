// API Configuration
export const API_CONFIG = {
  // Backend type: 'spring' | 'dotnet' | 'mock'
  BACKEND_TYPE: process.env.NEXT_PUBLIC_BACKEND_TYPE || 'dotnet',
  
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
  PRODUCTS: '/Product',
  PRODUCT_BY_ID: (id: number) => `/Product/${id}`,
  PRODUCTS_BY_CATEGORY: (categoryId: number) => `/Product/category/${categoryId}`,
  SEARCH_PRODUCTS: '/Product/search',
  FEATURED_PRODUCTS: '/Product/featured',
  DISCOUNTED_PRODUCTS: '/Product/discounted',
  
  // Categories
  CATEGORIES: '/Category',
  CATEGORY_BY_ID: (id: number) => `/Category/${id}`,
  
  // Cart
  CART: '/cart',
  CART_ITEMS: '/cart/items',
  ADD_TO_CART: '/cart/add',

  // Reviews
  REVIEWS: '/Review',
  REVIEW_BY_ID: (id: number) => `/Review/${id}`,
  PRODUCT_REVIEWS: (productId: number) => `/Review/product/${productId}`,
  PRODUCT_REVIEW_SUMMARY: (productId: number) => `/Review/product/${productId}/summary`,
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
  LOGIN: '/Auth/login',
  REGISTER: '/Auth/register',
  LOGOUT: '/Auth/logout',
  REFRESH_TOKEN: '/Auth/refresh',
  
  // Campaigns
  CAMPAIGNS: '/campaigns',
  CAMPAIGN_BY_ID: (id: number) => `/campaigns/${id}`,
  ACTIVE_CAMPAIGNS: '/campaigns/active',
}
