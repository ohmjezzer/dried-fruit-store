"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Product } from "@/lib/types"
import { config } from "@/lib/config"

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/product/${product.id}`}>
          <div className="mb-1 text-xs text-muted-foreground">{product.category}</div>
          <h3 className="mb-2 font-semibold text-balance group-hover:text-accent transition-colors">{product.title}</h3>
          <p className="text-lg font-bold">
            {config.app.currencySymbol}
            {product.price}
          </p>
        </Link>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button onClick={() => onAddToCart(product)} className="w-full" size="sm">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
