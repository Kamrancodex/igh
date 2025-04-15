import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function GalleryPage() {
  // Gallery images data
  const galleryImages = [
    {
      id: 1,
      title: "Luxury Dining Experience",
      category: "Restaurants",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 2,
      title: "Elegant Hotel Lobby",
      category: "Hotels",
      image:
        "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 3,
      title: "Craft Cocktail Creation",
      category: "Bars",
      image:
        "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 4,
      title: "Beachfront Resort",
      category: "Resorts",
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 5,
      title: "Gourmet Culinary Art",
      category: "Cuisine",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 6,
      title: "Rooftop Bar Experience",
      category: "Bars",
      image:
        "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 7,
      title: "Luxury Suite Interior",
      category: "Hotels",
      image:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 8,
      title: "Fine Dining Table Setting",
      category: "Restaurants",
      image:
        "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
  ]

  return (
    <div className="min-h-screen">
      <header className="flex justify-between items-center p-6 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </header>

      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-12">Our Gallery</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div key={image.id} className="group relative overflow-hidden rounded-lg">
              <div className="aspect-square relative">
                <Image
                  src={image.image || "/placeholder.svg"}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-xs text-amber-400 mb-2">{image.category}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{image.title}</h3>
                    <p className="text-white/80 text-sm">Experience the finest in hospitality excellence.</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
