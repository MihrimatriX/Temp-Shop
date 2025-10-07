import axios, { AxiosResponse } from 'axios'
import { Category, ApiResponse } from '@/types'
import { getApiUrl, API_ENDPOINTS, API_CONFIG } from '@/config/api'
import { mockCategories } from './mock-data-service'

export class CategoryService {
  private baseUrl = getApiUrl() + API_ENDPOINTS.CATEGORIES

  async getCategories(): Promise<AxiosResponse<ApiResponse<Category[]>>> {
    if (API_CONFIG.BACKEND_TYPE === 'mock') {
      return Promise.resolve({
        data: {
          success: true,
          data: mockCategories,
          message: 'Categories fetched successfully'
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any
      })
    }
    return axios.get(this.baseUrl)
  }

  async getCategoryById(id: number): Promise<AxiosResponse<ApiResponse<Category>>> {
    if (API_CONFIG.BACKEND_TYPE === 'mock') {
      const category = mockCategories.find(c => c.id === id)
      return Promise.resolve({
        data: {
          success: !!category,
          data: category!,
          message: category ? 'Category found' : 'Category not found'
        },
        status: category ? 200 : 404,
        statusText: category ? 'OK' : 'Not Found',
        headers: {},
        config: {} as any
      })
    }
    return axios.get(`${this.baseUrl}/${id}`)
  }
}
