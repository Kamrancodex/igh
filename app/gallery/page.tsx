"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  ChevronRight,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";
import Footer from "../components/Footer";

interface GalleryImage {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [categories, setCategories] = useState<string[]>(["all"]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await fetch("/api/gallery/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data.categories || ["all"]);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories(["all"]); // Fallback to default
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const category = selectedCategory === "all" ? "" : selectedCategory;
      const response = await fetch(
        `/api/gallery?page=${page}&category=${category}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data = await response.json();
      console.log("Received data:", data);

      // Ensure data.images exists and is an array
      const receivedImages = Array.isArray(data?.images) ? data.images : [];

      if (page === 1) {
        setImages(
          receivedImages.map((img: any) => ({
            _id: img._id || "",
            title: img.title || "",
            description: img.description || "",
            category: img.category || "",
            imageUrl: img.imageUrl || img.image || "/placeholder-image.jpg",
          }))
        );
      } else {
        setImages((prev) => [
          ...prev,
          ...receivedImages.map((img: any) => ({
            _id: img._id || "",
            title: img.title || "",
            description: img.description || "",
            category: img.category || "",
            imageUrl: img.imageUrl || img.image || "/placeholder-image.jpg",
          })),
        ]);
      }
      setHasMore(Boolean(data?.hasMore));
      setError("");
    } catch (err) {
      setError("Failed to load images");
      console.error("Error fetching images:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchImages();
  }, [selectedCategory]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
    fetchImages();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-50 bg-white shadow-sm py-4 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-blaxk.png"
              alt="Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">OUR GALLERY</h1>
            <p className="text-gray-600">
              Explore our collection of stunning hospitality projects and
              experiences.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {loadingCategories ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Loading categories...</span>
              </div>
            ) : (
              categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full capitalize ${
                    selectedCategory === category
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } transition-colors`}
                >
                  {category}
                </button>
              ))
            )}
          </div>

          {error && (
            <div className="text-red-500 text-center mb-8 p-4 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image) => (
              <div
                key={image._id}
                className="group relative aspect-square overflow-hidden rounded-lg shadow-md bg-white"
              >
                <Image
                  src={image.imageUrl || "/placeholder-image.jpg"}
                  alt={image.title || "Gallery image"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder-image.jpg";
                    console.error("Image load error for:", image.imageUrl);
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-semibold text-lg">
                    {image.title}
                  </h3>
                  <p className="text-gray-200 text-sm">{image.description}</p>
                </div>
              </div>
            ))}
          </div>

          {loading && (
            <div className="flex justify-center items-center mt-8">
              <Loader2 className="w-8 h-8 animate-spin text-gray-800" />
            </div>
          )}

          {!loading && hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
