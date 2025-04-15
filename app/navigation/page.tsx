import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NavigationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-6 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </header>

      <main className="flex-1 container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-12">Navigation</h1>

        <nav className="space-y-8">
          <Link href="/" className="block text-2xl font-medium hover:underline">
            Home
          </Link>
          <Link href="/about" className="block text-2xl font-medium hover:underline">
            About Us
          </Link>
          <Link href="/services" className="block text-2xl font-medium hover:underline">
            Services
          </Link>
          <Link href="/portfolio" className="block text-2xl font-medium hover:underline">
            Portfolio
          </Link>
          <Link href="/contact" className="block text-2xl font-medium hover:underline">
            Contact
          </Link>
        </nav>
      </main>
    </div>
  )
}
