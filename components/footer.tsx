import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* About */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">About Us</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We provide premium quality dried fruits sourced from the finest farms. Our products are naturally
              processed to preserve nutrients and flavor.
            </p>
          </div>

          {/* Products & Services */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Products & Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Tropical Fruits
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Berries
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Stone Fruits
                </Link>
              </li>
              <li>
                <Link href="/how-to-order" className="hover:text-accent transition-colors">
                  How to Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+66 123 456 789</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@driedfruit.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Bangkok, Thailand</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Dried Fruit Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
