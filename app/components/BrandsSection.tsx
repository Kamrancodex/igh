"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Brand {
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

export default function BrandsSection() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBrands = async () => {
    try {
      const res = await fetch("/api/businesses");
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setBrands(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch brands"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  if (error) return null; // or handle error properly
  if (isLoading) return <div className="py-24 bg-black text-white text-center">Loading brands...</div>;
  if (brands.length === 0) return null;

  // Create a seamless loop by duplicating the array
  const loopBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section id="brands" className="py-0 bg-black overflow-hidden relative">
      <div className="w-full">
        {/* Infinite Scroll Container */}
        <div className="animate-scroll hover:pause">
          {loopBrands.map((brand, index) => (
            <Link
              href={brand.link || "#"}
              key={`${brand._id}-${index}`}
              className="relative w-[400px] h-[500px] flex-shrink-0 group cursor-pointer border-r border-white/10 block"
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={brand.image || "/placeholder.jpg"}
                  alt={brand.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10 select-none">
                <div className="space-y-2 transform transition-transform duration-500 group-hover:scale-110">
                  <h3 className="text-4xl text-white font-serif tracking-widest uppercase border-b border-white/30 pb-2">
                    {brand.name}
                  </h3>
                  {brand.description && (
                    <p className="text-white/80 text-xs tracking-[0.2em] font-sans uppercase line-clamp-1">
                      {brand.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
