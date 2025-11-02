import { config } from "./config"
import type { Product } from "./types"

// API client for fetching data
class ApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = config.api.baseUrl
  }

  async fetchProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/products`, {
        cache: "no-store", // Ensure fresh data on each request
      })

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
      const response = await fetch(`${this.baseUrl}/api/products/${id}`, {
        cache: "no-store",
      })

      if (!response.ok) {
        if (response.status === 404) {
          return null
        }
        throw new Error("Failed to fetch product")
      }

      return response.json()
    } catch (error) {
      console.error("Error fetching product:", error)
      throw error
    }
  }
}

export const apiClient = new ApiClient()
