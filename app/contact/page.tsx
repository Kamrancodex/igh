import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-6 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </header>

      <main className="flex-1 container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

        <div className="max-w-md">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Email</h2>
              <p className="text-gray-600">info@icongrouphospitality.com</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Phone</h2>
              <p className="text-gray-600">+1 (212) 555-0123</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Address</h2>
              <p className="text-gray-600">
                123 Fifth Avenue
                <br />
                New York, NY 10010
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
