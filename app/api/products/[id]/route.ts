import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const productId = Number.parseInt(id)

    const filePath = path.join(process.cwd(), "public", "mockdata.json")
    const fileContents = await fs.readFile(filePath, "utf8")
    const data = JSON.parse(fileContents)

    const product = data.products.find((p: any) => p.id === productId)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error reading product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}
