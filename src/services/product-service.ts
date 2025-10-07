import axios, { AxiosResponse } from 'axios'
import { Product, ApiResponse, ProductFilters } from '@/types'
import { getApiUrl, API_ENDPOINTS, API_CONFIG } from '@/config/api'
import { mockProducts, mockCategories } from './mock-data-service'

export class ProductService {
  private baseUrl = getApiUrl() + API_ENDPOINTS.PRODUCTS

  async getProducts(filters?: ProductFilters): Promise<AxiosResponse<ApiResponse<Product[]>>> {
    // Mock data kullanılıyorsa
    if (API_CONFIG.BACKEND_TYPE === 'mock') {
      let filteredProducts = [...mockProducts]
      
      if (filters) {
        if (filters.categoryId) {
          filteredProducts = filteredProducts.filter(p => p.category?.id === filters.categoryId)
        }
        if (filters.minPrice) {
          filteredProducts = filteredProducts.filter(p => p.unitPrice >= filters.minPrice!)
        }
        if (filters.maxPrice) {
          filteredProducts = filteredProducts.filter(p => p.unitPrice <= filters.maxPrice!)
        }
        if (filters.searchTerm) {
          const term = filters.searchTerm.toLowerCase()
          filteredProducts = filteredProducts.filter(p => 
            p.productName.toLowerCase().includes(term) ||
            (p.description && p.description.toLowerCase().includes(term))
          )
        }
      }
      
      return Promise.resolve({
        data: {
          success: true,
          data: filteredProducts,
          message: 'Products fetched successfully'
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any
      })
    }

    // Gerçek API çağrısı
    const params = new URLSearchParams()
    
    if (filters) {
      if (filters.categoryId) params.append('categoryId', filters.categoryId.toString())
      if (filters.minPrice) params.append('minPrice', filters.minPrice.toString())
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString())
      if (filters.searchTerm) params.append('searchTerm', filters.searchTerm)
      if (filters.sortBy) params.append('sortBy', filters.sortBy)
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder)
      if (filters.pageNumber) params.append('pageNumber', filters.pageNumber.toString())
      if (filters.pageSize) params.append('pageSize', filters.pageSize.toString())
    }

    return axios.get(`${this.baseUrl}?${params.toString()}`)
  }

  async getProductById(id: number): Promise<AxiosResponse<ApiResponse<Product>>> {
    if (API_CONFIG.BACKEND_TYPE === 'mock') {
      const product = mockProducts.find(p => p.id === id)
      return Promise.resolve({
        data: {
          success: !!product,
          data: product!,
          message: product ? 'Product found' : 'Product not found'
        },
        status: product ? 200 : 404,
        statusText: product ? 'OK' : 'Not Found',
        headers: {},
        config: {} as any
      })
    }
    return axios.get(`${this.baseUrl}/${id}`)
  }

  async getByProductName(productName: string): Promise<AxiosResponse<ApiResponse<Product>>> {
    if (API_CONFIG.BACKEND_TYPE === 'mock') {
      const product = mockProducts.find(p => p.productName === productName)
      return Promise.resolve({
        data: {
          success: !!product,
          data: product!,
          message: product ? 'Product found' : 'Product not found'
        },
        status: product ? 200 : 404,
        statusText: product ? 'OK' : 'Not Found',
        headers: {},
        config: {} as any
      })
    }
    return axios.get(`${this.baseUrl}/getByProductName?productName=${encodeURIComponent(productName)}`)
  }

  async getProductsByCategory(categoryId: number): Promise<AxiosResponse<ApiResponse<Product[]>>> {
    if (API_CONFIG.BACKEND_TYPE === 'mock') {
      const products = mockProducts.filter(p => p.category?.id === categoryId)
      return Promise.resolve({
        data: {
          success: true,
          data: products,
          message: 'Products fetched successfully'
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any
      })
    }
    return axios.get(`${this.baseUrl}/category/${categoryId}`)
  }

  async searchProducts(searchTerm: string): Promise<AxiosResponse<ApiResponse<Product[]>>> {
    if (API_CONFIG.BACKEND_TYPE === 'mock') {
      const term = searchTerm.toLowerCase()
      const products = mockProducts.filter(p => 
        p.productName.toLowerCase().includes(term) ||
        (p.description && p.description.toLowerCase().includes(term))
      )
      return Promise.resolve({
        data: {
          success: true,
          data: products,
          message: 'Products fetched successfully'
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any
      })
    }
    return axios.get(`${this.baseUrl}/search?q=${encodeURIComponent(searchTerm)}`)
  }

  async getFeaturedProducts(): Promise<AxiosResponse<ApiResponse<Product[]>>> {
    if (API_CONFIG.BACKEND_TYPE === 'mock') {
      const products = mockProducts.filter(p => p.discount && p.discount > 20)
      return Promise.resolve({
        data: {
          success: true,
          data: products,
          message: 'Featured products fetched successfully'
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any
      })
    }
    return axios.get(`${this.baseUrl}/featured`)
  }

  async getDiscountedProducts(): Promise<AxiosResponse<ApiResponse<Product[]>>> {
    if (API_CONFIG.BACKEND_TYPE === 'mock') {
      const products = mockProducts.filter(p => p.discount && p.discount > 0)
      return Promise.resolve({
        data: {
          success: true,
          data: products,
          message: 'Discounted products fetched successfully'
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any
      })
    }
    return axios.get(`${this.baseUrl}/discounted`)
  }
}
