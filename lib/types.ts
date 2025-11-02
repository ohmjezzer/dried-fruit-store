export interface Product {
  id: number
  title: string
  category: string
  price: number
  description: string
  image: string
  stock: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  customerName: string
  customerPhone: string
  customerAddress: string
  paymentSlip?: string
  status: "pending" | "confirmed" | "shipped" | "delivered"
  createdAt: Date
}
