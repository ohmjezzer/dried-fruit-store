"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ShoppingCart, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { productService } from "@/lib/service"
import { useCart } from "@/hooks/use-cart"
import { config } from "@/lib/config"
import type { Product } from "@/lib/types"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    loadProduct()
  }, [params.id])

  const loadProduct = async () => {
    try {
      const data = await productService.getProductById(Number(params.id))
      setProduct(data)
    } catch (error) {
      console.error("Failed to load product:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      setQuantity(1)
    }
  }

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">Loading product...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Product not found</h1>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Image */}
        <Card className="overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </Card>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="mb-2 text-sm text-muted-foreground">{product.category}</div>
          <h1 className="mb-4 text-3xl font-bold text-balance md:text-4xl">{product.title}</h1>

          <div className="mb-6 text-3xl font-bold text-accent">
            {config.app.currencySymbol}
            {product.price}
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">Description</h2>
            <p className="leading-relaxed text-muted-foreground">{product.description}</p>
          </div>

          <div className="mb-6">
            <div className="text-sm text-muted-foreground">
              Stock: <span className="font-semibold text-foreground">{product.stock} available</span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold">Quantity</label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="flex h-10 w-16 items-center justify-center rounded-md border bg-background text-center font-semibold">
                {quantity}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
                disabled={quantity >= product.stock}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button onClick={handleAddToCart} size="lg" className="w-full" disabled={product.stock === 0}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  )
}
