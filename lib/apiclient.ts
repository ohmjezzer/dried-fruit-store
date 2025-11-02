import { config } from "./config"
import type { Product } from "./types"

// API client for fetching data (currently using mock data)
class ApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = config.api.baseUrl
  }

  async fetchProducts(): Promise<Product[]> {
    try {
      if (config.useMockData) {
        const response = await fetch(`http://localhost:3000/${config.mockDataPath}`)
        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }
        const data = await response.json()
        return data.products
      }

      // Future: Replace with actual API call
      const response = await fetch(`${this.baseUrl}/api/products`)
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }
      return response.json()
    } catch (error) {
      console.error("Error fetching products:", error)
      throw error
    }
  }

  async fetchProductById(id: number): Promise<Product | null> {
    try {
      const products = await this.fetchProducts()
      console.log(products);
      
      return products.find((p) => p.id === id) || null
    } catch (error) {
      console.error("Error fetching product:", error)
      throw error
    }
  }
}

export const apiClient = new ApiClient()
