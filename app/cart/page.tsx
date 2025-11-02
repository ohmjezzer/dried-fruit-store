"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { config } from "@/lib/config"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total, itemCount } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
  }

  if (cart.length === 0 && !isCheckingOut) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="mx-auto max-w-md text-center">
          <CardContent className="pt-12 pb-12">
            <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-2xl font-bold">Your cart is empty</h2>
            <p className="mb-6 text-muted-foreground">Add some delicious dried fruits to get started!</p>
            <Link href="/">
              <Button>Browse Products</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isCheckingOut) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <Button variant="ghost" onClick={() => setIsCheckingOut(false)} className="mb-6">
            ← Back to Cart
          </Button>
          <CheckoutForm cart={cart} total={total} />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link href={`/product/${item.id}`} className="font-semibold hover:text-accent">
                          {item.title}
                        </Link>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-bold">
                            {config.app.currencySymbol}
                            {(item.price * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Items ({itemCount})</span>
                <span className="font-semibold">
                  {config.app.currencySymbol}
                  {total.toFixed(2)}
                </span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>
                    {config.app.currencySymbol}
                    {total.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCheckout} className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

function CheckoutForm({ cart, total }: { cart: any[]; total: number }) {
  const { clearCart } = useCart()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  })
  const [paymentSlip, setPaymentSlip] = useState<File | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the order to a backend
    console.log("Order submitted:", { formData, cart, total, paymentSlip })
    setIsSubmitted(true)
    clearCart()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentSlip(e.target.files[0])
    }
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="pt-12 pb-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <ShoppingBag className="h-8 w-8 text-accent" />
          </div>
          <h2 className="mb-2 text-2xl font-bold">Order Submitted!</h2>
          <p className="mb-6 text-muted-foreground">
            Thank you for your order. We will contact you shortly to confirm your order.
          </p>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Customer Information</h3>
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div>
              <label htmlFor="address" className="mb-1 block text-sm font-medium">
                Delivery Address *
              </label>
              <textarea
                id="address"
                required
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="font-semibold">Payment Information</h3>
            <div className="rounded-lg bg-muted p-4">
              <p className="mb-2 text-sm font-medium">PromptPay Details:</p>
              <p className="text-sm text-muted-foreground">
                Name: <span className="font-semibold text-foreground">{config.payment.promptPayName}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                ID: <span className="font-semibold text-foreground">{config.payment.promptPayId}</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Amount:{" "}
                <span className="font-semibold text-foreground">
                  {config.app.currencySymbol}
                  {total.toFixed(2)}
                </span>
              </p>
            </div>
            <div>
              <label htmlFor="payment-slip" className="mb-1 block text-sm font-medium">
                Upload Payment Slip *
              </label>
              <input
                id="payment-slip"
                type="file"
                accept="image/*"
                required
                onChange={handleFileChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-1 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              {paymentSlip && <p className="mt-1 text-xs text-muted-foreground">Selected: {paymentSlip.name}</p>}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-2 border-t pt-6">
            <h3 className="font-semibold">Order Summary</h3>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.title} x {item.quantity}
                </span>
                <span className="font-medium">
                  {config.app.currencySymbol}
                  {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="flex justify-between border-t pt-2 font-bold">
              <span>Total</span>
              <span>
                {config.app.currencySymbol}
                {total.toFixed(2)}
              </span>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Submit Order
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
