import { apiClient } from "./apiclient"
import type { Product, CartItem } from "./types"

// Business logic layer
export class ProductService {
  async getAllProducts(): Promise<Product[]> {
    return apiClient.fetchProducts()
  }

  async getProductById(id: number): Promise<Product | null> {
    return apiClient.fetchProductById(id)
  }

  async searchProducts(query: string, products: Product[]): Promise<Product[]> {
    const lowerQuery = query.toLowerCase()
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery),
    )
  }

  async filterByCategory(category: string, products: Product[]): Promise<Product[]> {
    if (category === "All") return products
    return products.filter((product) => product.category === category)
  }

  getCategories(products: Product[]): string[] {
    const categories = products.map((p) => p.category)
    return ["All", ...Array.from(new Set(categories))]
  }
}

export class CartService {
  private storageKey = "dried-fruit-cart"

  getCart(): CartItem[] {
    if (typeof window === "undefined") return []
    const cart = localStorage.getItem(this.storageKey)
    return cart ? JSON.parse(cart) : []
  }

  saveCart(cart: CartItem[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.storageKey, JSON.stringify(cart))
  }

  addToCart(product: Product, quantity = 1): CartItem[] {
    const cart = this.getCart()
    const existingItem = cart.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({ ...product, quantity })
    }

    this.saveCart(cart)
    return cart
  }

  removeFromCart(productId: number): CartItem[] {
    const cart = this.getCart().filter((item) => item.id !== productId)
    this.saveCart(cart)
    return cart
  }

  updateQuantity(productId: number, quantity: number): CartItem[] {
    const cart = this.getCart()
    const item = cart.find((item) => item.id === productId)

    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(productId)
      }
      item.quantity = quantity
      this.saveCart(cart)
    }

    return cart
  }

  clearCart(): void {
    this.saveCart([])
  }

  getTotal(cart: CartItem[]): number {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  getItemCount(cart: CartItem[]): number {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }
}

export const productService = new ProductService()
export const cartService = new CartService()
