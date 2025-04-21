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

interface GalleryImage {
  _id: string;
  title: string;
  image: string;
  description: string;
  category: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>(["all"]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchImages = async (pageNum: number, isLoadMore = false) => {
    try {
      const url = `/api/gallery?page=${pageNum}${
        selectedCategory !== "all" ? `&category=${selectedCategory}` : ""
      }`;
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch images");

      if (isLoadMore) {
        setImages((prev) => [...prev, ...data.images]);
      } else {
        setImages(data.images || []);
      }

      setHasMore(data.hasMore);
      if (data.categories?.length > 0) {
        setCategories(["all", ...data.categories]);
      }
    } catch (err) {
      console.error("Gallery fetch error:", err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setPage((prev) => prev + 1);
    fetchImages(page + 1, true);
  };

  useEffect(() => {
    setIsLoading(true);
    setPage(1);
    fetchImages(1);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="Icon Group Hospitality Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-white hover:text-gray-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">
              Our Gallery
            </h1>
            <p className="text-gray-600">
              Explore our collection of stunning hospitality projects and
              experiences.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                disabled={isLoading}
                className={`px-6 py-2.5 rounded-full font-medium transition-colors ${
                  category === selectedCategory
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] bg-gray-100 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {images.map((image, index) => (
                  <div
                    key={image._id}
                    className="group relative overflow-hidden rounded-xl shadow-lg bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={image.image}
                        alt={image.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading={index < 6 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm rounded-full mb-3">
                            {image.category}
                          </span>
                          <h3 className="text-xl font-semibold text-white mb-2">
                            {image.title}
                          </h3>
                          <p className="text-white/80 text-sm line-clamp-2">
                            {image.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="mt-12 text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoadingMore ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Load More"
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#111827] text-white pt-32 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Logo and About */}
            <div>
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <span className="text-white text-4xl font-bold text-gradient-animate">
                    h
                  </span>
                  <span className="text-orange-500 ml-1 text-lg">group</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  ICON GROUP HOSPITALITY
                </h3>
              </div>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Elevating the standard of luxury hospitality through innovative
                management and consulting services.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-orange-500 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-orange-500 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-orange-500 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-orange-500 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white border-b border-gray-700 pb-2">
                QUICK LINKS
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-orange-500 transition-colors flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#about"
                    className="text-gray-400 hover:text-orange-500 transition-colors flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#contact"
                    className="text-gray-400 hover:text-orange-500 transition-colors flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white border-b border-gray-700 pb-2">
                CONTACT INFO
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-orange-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-400">
                    123 Fifth Avenue
                    <br />
                    New York, NY 10010
                    <br />
                    United States
                  </span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-400">
                    info@icongrouphospitality.com
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-400">+1 (212) 555-0123</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-400">
                    Mon-Fri: 9:00 AM - 6:00 PM
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Icon Group Hospitality. All
                rights reserved.
              </p>
              <div className="flex space-x-6 text-gray-500 text-sm">
                <Link
                  href="/privacy-policy"
                  className="hover:text-orange-500 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-of-service"
                  className="hover:text-orange-500 transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
