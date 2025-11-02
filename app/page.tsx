"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { productService } from "@/lib/service"
import { useCart } from "@/hooks/use-cart"
import type { Product } from "@/lib/types"

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, selectedCategory, searchQuery])

  const loadProducts = async () => {
    try {
      const data = await productService.getAllProducts()
      setProducts(data)
      setCategories(productService.getCategories(data))
    } catch (error) {
      console.error("Failed to load products:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = async () => {
    let filtered = products

    // Filter by category
    filtered = await productService.filterByCategory(selectedCategory, filtered)

    // Filter by search query
    if (searchQuery) {
      filtered = await productService.searchProducts(searchQuery, filtered)
    }

    setFilteredProducts(filtered)
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">Loading products...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-balance md:text-5xl">Premium Dried Fruits</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-balance">
          Discover our selection of naturally dried fruits, packed with nutrients and bursting with flavor
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">No products found matching your criteria.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      )}
    </div>
  )
}
