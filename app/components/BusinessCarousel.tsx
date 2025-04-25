import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Instagram,
  Facebook,
  Twitter,
  Globe,
} from "lucide-react";

// Business interface
interface Business {
  _id: string;
  name: string;
  image: string;
  description: string;
  link: string;
  socials: {
    instagram: string;
    facebook: string;
    twitter: string;
    website: string;
  };
}

// Business Skeleton Component
const BusinessSkeleton = () => (
  <div className="relative overflow-hidden rounded-xl shadow-2xl animate-pulse">
    <div className="aspect-[16/9] w-full bg-gray-200"></div>
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <div className="flex flex-col justify-between gap-4">
        <div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-8 bg-gray-200 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

interface BusinessCarouselProps {
  businesses: Business[];
  loading: boolean;
  tiltElementRef: (node: HTMLDivElement | null) => void;
}

export default function BusinessCarousel({
  businesses,
  loading,
  tiltElementRef,
}: BusinessCarouselProps) {
  const [activeBusinessIndex, setActiveBusinessIndex] = useState(0);

  // Autoplay functionality
  useEffect(() => {
    if (businesses.length === 0) return;

    const interval = setInterval(() => {
      setActiveBusinessIndex((prev) =>
        prev === businesses.length - 1 ? 0 : prev + 1
      );
    }, 6000); // Change slide every 6 seconds

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveBusinessIndex((prev) =>
          prev === 0 ? businesses.length - 1 : prev - 1
        );
      } else if (e.key === "ArrowRight") {
        setActiveBusinessIndex((prev) =>
          prev === businesses.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up function
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [businesses.length]);

  if (businesses.length === 0 && !loading) {
    return <div className="text-center py-12">No businesses found</div>;
  }

  return (
    <div>
      <h2 className="text-6xl md:text-7xl font-bold tracking-tighter text-center mb-24 animate-on-scroll fade-in-up">
        OUR BRANDS
      </h2>

      {/* Carousel container with touch support */}
      <div
        className="relative business-carousel"
        onTouchStart={(e) => {
          const touch = e.touches[0];
          (e.currentTarget as any).touchStartX = touch.clientX;
        }}
        onTouchEnd={(e) => {
          const touch = e.changedTouches[0];
          const touchEndX = touch.clientX;
          const touchStartX = (e.currentTarget as any).touchStartX || 0;

          // Minimum swipe distance (50px)
          if (touchEndX < touchStartX - 50) {
            // Swipe left - next slide
            setActiveBusinessIndex((prev) =>
              prev === businesses.length - 1 ? 0 : prev + 1
            );
          } else if (touchEndX > touchStartX + 50) {
            // Swipe right - previous slide
            setActiveBusinessIndex((prev) =>
              prev === 0 ? businesses.length - 1 : prev - 1
            );
          }
        }}
      >
        {/* Previous arrow */}
        <button
          onClick={() => {
            const newIndex =
              activeBusinessIndex === 0
                ? businesses.length - 1
                : activeBusinessIndex - 1;
            setActiveBusinessIndex(newIndex);
          }}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 z-10 bg-white/80 hover:bg-white w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 focus:outline-none group"
          aria-label="Previous business"
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6 transform rotate-180 text-gray-800 group-hover:text-black transition-transform duration-300 group-hover:scale-110" />
        </button>

        {/* Carousel content */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeBusinessIndex * 100}%)` }}
          >
            {loading
              ? // Show skeletons while loading
                Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={`skeleton-${index}`}
                      className="w-full flex-shrink-0 px-4"
                    >
                      <BusinessSkeleton />
                    </div>
                  ))
              : // Show actual businesses
                businesses.map((business, index) => (
                  <div
                    key={business._id}
                    className="w-full flex-shrink-0 px-4 md:px-8"
                  >
                    <div
                      className={`group relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500 hover:shadow-3xl hover-card tilt-element h-full ${
                        index === activeBusinessIndex
                          ? "animate-subtle-pop"
                          : ""
                      }`}
                      ref={tiltElementRef}
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden zoom-on-hover">
                        <Image
                          src={business.image || "/placeholder.svg"}
                          alt={business.name}
                          width={800}
                          height={600}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          priority={
                            index === activeBusinessIndex ||
                            index ===
                              (activeBusinessIndex + 1) % businesses.length
                          }
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80"></div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex flex-col justify-between gap-4">
                          <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                              {business.name}
                            </h3>
                            <p className="text-sm md:text-base text-white/80 mb-4">
                              {business.description}
                            </p>

                            <Link
                              href={business.link}
                              className="inline-flex items-center text-white border-b-2 border-white pb-1 transition-all hover:pb-2"
                            >
                              Explore{" "}
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                          </div>

                          <div className="flex gap-3">
                            <Link
                              href={business.socials.instagram}
                              className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors"
                              aria-label={`${business.name} Instagram`}
                            >
                              <Instagram className="h-4 w-4 text-white" />
                            </Link>
                            <Link
                              href={business.socials.facebook}
                              className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors"
                              aria-label={`${business.name} Facebook`}
                            >
                              <Facebook className="h-4 w-4 text-white" />
                            </Link>
                            <Link
                              href={business.socials.twitter}
                              className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors"
                              aria-label={`${business.name} Twitter`}
                            >
                              <Twitter className="h-4 w-4 text-white" />
                            </Link>
                            <Link
                              href={business.socials.website}
                              className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors"
                              aria-label={`${business.name} Website`}
                            >
                              <Globe className="h-4 w-4 text-white" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* Next arrow */}
        <button
          onClick={() => {
            const newIndex =
              activeBusinessIndex === businesses.length - 1
                ? 0
                : activeBusinessIndex + 1;
            setActiveBusinessIndex(newIndex);
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 z-10 bg-white/80 hover:bg-white w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 focus:outline-none group"
          aria-label="Next business"
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-gray-800 group-hover:text-black transition-transform duration-300 group-hover:scale-110" />
        </button>
      </div>

      {/* Pagination dots with progress animation */}
      <div className="flex justify-center mt-8 space-x-2">
        {businesses.map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => setActiveBusinessIndex(index)}
            className={`h-3 rounded-full transition-all duration-300 focus:outline-none overflow-hidden ${
              activeBusinessIndex === index
                ? "bg-orange-500 w-10"
                : "bg-gray-300 hover:bg-gray-400 w-3"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {activeBusinessIndex === index && (
              <div className="h-full bg-orange-400 carousel-progress-indicator"></div>
            )}
          </button>
        ))}
      </div>

      {/* Slide counter indicator */}
      <div className="mt-4 text-center text-gray-500 text-sm">
        <span className="font-medium text-orange-500">
          {activeBusinessIndex + 1}
        </span>
        <span> / {businesses.length}</span>
      </div>
    </div>
  );
}
