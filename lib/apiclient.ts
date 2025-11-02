import { config } from "./config"
import type { Product } from "./types"

// API client for fetching data
class ApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = config.api.baseUrl
    console.log("[v0] ApiClient initialized with baseUrl:", this.baseUrl)
  }

  async fetchProducts(): Promise<Product[]> {
    try {
      const url = this.baseUrl ? `${this.baseUrl}/api/products` : "/api/products"
      console.log("[v0] Fetching products from:", url)

      const response = await fetch(url, {
        cache: "no-store", // Ensure fresh data on each request
      })

      console.log("[v0] Products response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("[v0] Products fetch failed:", errorText)
        throw new Error(`Failed to fetch products: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] Products fetched successfully:", data.length, "items")
      return data
    } catch (error) {
      console.error("[v0] Error fetching products:", error)
      throw error
    }
  }

  async fetchProductById(id: number): Promise<Product | null> {
    try {
      const url = this.baseUrl ? `${this.baseUrl}/api/products/${id}` : `/api/products/${id}`
      console.log("[v0] Fetching product from:", url)

      const response = await fetch(url, {
        cache: "no-store",
      })

      console.log("[v0] Product response status:", response.status)

      if (!response.ok) {
        if (response.status === 404) {
          console.log("[v0] Product not found:", id)
          return null
        }
        const errorText = await response.text()
        console.error("[v0] Product fetch failed:", errorText)
        throw new Error(`Failed to fetch product: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] Product fetched successfully:", data.id)
      return data
    } catch (error) {
      console.error("[v0] Error fetching product:", error)
      throw error
    }
  }
}

export const apiClient = new ApiClient()
