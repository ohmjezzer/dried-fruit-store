"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { cartService } from "@/lib/service"
import type { Product, CartItem } from "@/lib/types"

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    setCart(cartService.getCart())
  }, [])

  const addToCart = (product: Product, quantity = 1) => {
    const updatedCart = cartService.addToCart(product, quantity)
    setCart(updatedCart)
  }

  const removeFromCart = (productId: number) => {
    const updatedCart = cartService.removeFromCart(productId)
    setCart(updatedCart)
  }

  const updateQuantity = (productId: number, quantity: number) => {
    const updatedCart = cartService.updateQuantity(productId, quantity)
    setCart(updatedCart)
  }

  const clearCart = () => {
    cartService.clearCart()
    setCart([])
  }

  const total = cartService.getTotal(cart)
  const itemCount = cartService.getItemCount(cart)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
