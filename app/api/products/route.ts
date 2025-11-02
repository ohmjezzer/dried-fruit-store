import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "mockdata.json")
    const fileContents = await fs.readFile(filePath, "utf8")
    const data = JSON.parse(fileContents)

    return NextResponse.json(data.products)
  } catch (error) {
    console.error("Error reading products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
