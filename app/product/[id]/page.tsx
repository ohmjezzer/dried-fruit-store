import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { productService } from "@/lib/service"
import { ProductView } from "@/components/product-view"

export default async function ProductDetailPage({ params }: { params: { id: string } }) {

  let product = null
  const { id } = await params
  try {
    product = await productService.getProductById(Number(id))
  } catch (error) {
    console.error("Failed to load product:", error)
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
      <ProductView product={product} />
    </div>
  )
}
