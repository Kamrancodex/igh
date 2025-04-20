"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

interface GalleryImage {
  _id: string;
  title: string;
  image: string;
  description: string;
  category: string;
}

export default function GallerySection() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>(["all"]);

  const fetchImages = async () => {
    try {
      const url = `/api/gallery${
        selectedCategory !== "all" ? `?category=${selectedCategory}` : ""
      }`;
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch images");

      setImages(data.images || []);
      if (data.categories?.length > 0) {
        setCategories(["all", ...data.categories]);
      }
    } catch (err) {
      console.error("Gallery fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchImages();
  }, [selectedCategory]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Gallery</h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              disabled={isLoading}
              className={`px-6 py-2.5 rounded-full font-medium ${
                category === selectedCategory
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-black" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <div
                key={image._id}
                className="relative rounded-xl overflow-hidden shadow-lg"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={image.image}
                    alt={image.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {image.title}
                      </h3>
                      <p className="text-sm text-white/90 line-clamp-2 mb-2">
                        {image.description}
                      </p>
                      <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm rounded-full">
                        {image.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
