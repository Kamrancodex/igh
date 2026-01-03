"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Brand {
  _id: string;
  name: string;
  image: string;
  link: string;
}

export default function LogoTicker() {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("/api/businesses");
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          setBrands(data);
        }
      } catch (err) {
        console.error("Failed to fetch brands for ticker", err);
      }
    };
    fetchBrands();
  }, []);

  if (brands.length === 0) return null;

  return (
    <section className="py-12 bg-white border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center hidden">
         <h3 className="text-sm font-semibold text-gray-400 tracking-widest uppercase">Our Partners</h3>
      </div>
      
      <div className="relative w-full flex overflow-hidden mask-gradient">
        {/* Infinite Scroll Container */}
        <div className="animate-scroll flex items-center gap-16 md:gap-24 whitespace-nowrap min-w-full hover:pause">
          {/* Loop multiple times for seamless scrolling */}
          {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
             <Link 
                href={brand.link || "#"} 
                key={`${brand._id}-${index}`} 
                className="flex-shrink-0 flex items-center justify-center h-20 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
             >
                <div className="relative h-16 w-32 md:h-20 md:w-40">
                  <Image
                    src={brand.image || "/placeholder.jpg"}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
             </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
