import { ShoppingCart, CreditCard, Package, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { config } from "@/lib/config"

export default function HowToOrderPage() {
  const steps = [
    {
      icon: ShoppingCart,
      title: "Browse & Add to Cart",
      description:
        "Browse our selection of premium dried fruits and add your favorites to the cart. You can adjust quantities as needed.",
    },
    {
      icon: CreditCard,
      title: "Checkout & Payment",
      description: `Fill in your delivery details and make payment via PromptPay to ${config.payment.promptPayId}. Upload your payment slip to confirm.`,
    },
    {
      icon: Package,
      title: "Order Confirmation",
      description:
        "We'll review your order and payment slip, then contact you via phone to confirm your order details and delivery schedule.",
    },
    {
      icon: CheckCircle,
      title: "Delivery",
      description:
        "Your order will be carefully packed and delivered to your address. Enjoy your premium dried fruits!",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-balance md:text-5xl">How to Order</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-balance">
          Follow these simple steps to get your premium dried fruits delivered to your doorstep
        </p>
      </div>

      {/* Steps */}
      <div className="mx-auto mb-16 max-w-4xl">
        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute right-4 top-4 text-6xl font-bold text-muted/10">{index + 1}</div>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Payment Information */}
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">PromptPay Details</h3>
              <div className="rounded-lg bg-muted p-4">
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account Name:</span>
                    <span className="font-semibold">{config.payment.promptPayName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">PromptPay ID:</span>
                    <span className="font-mono font-semibold">{config.payment.promptPayId}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">Important Notes</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-accent">•</span>
                  <span>Please upload a clear photo of your payment slip during checkout</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">•</span>
                  <span>Orders will be processed after payment verification</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">•</span>
                  <span>We will contact you within 24 hours to confirm your order</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">•</span>
                  <span>Delivery typically takes 2-3 business days within Bangkok</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">Need Help?</h3>
              <p className="text-sm text-muted-foreground">
                If you have any questions about ordering or payment, please contact us at{" "}
                <a href="tel:+66123456789" className="font-semibold text-accent hover:underline">
                  +66 123 456 789
                </a>{" "}
                or{" "}
                <a href="mailto:info@driedfruit.com" className="font-semibold text-accent hover:underline">
                  info@driedfruit.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
