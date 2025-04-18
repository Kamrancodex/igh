"use client";

import { ArrowRight } from "lucide-react";
import type React from "react";

interface NewsletterSectionProps {
  createRipple: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function NewsletterSection({
  createRipple,
}: NewsletterSectionProps) {
  return (
    <div className="newsletter-overlap-section">
      <div className="container mx-auto px-4">
        <div className="newsletter-card max-w-3xl mx-auto bg-gradient-to-r from-gray-900 to-black rounded-xl shadow-2xl p-6 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Left side - Text content */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-gray-400 text-sm">
                Stay updated with the latest trends, insights, and news from the
                world of luxury hospitality.
              </p>
            </div>

            {/* Right side - Form */}
            <div className="flex-1">
              <form className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2.5 bg-gray-800/80 border border-gray-700 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent 
                             transition-all duration-300"
                  />
                  <button
                    type="submit"
                    onClick={createRipple}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 
                             bg-orange-500 hover:bg-orange-600 rounded-md 
                             transition-all duration-300"
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
                <label className="flex items-center space-x-2 text-xs">
                  <input
                    type="checkbox"
                    className="form-checkbox text-orange-500 rounded border-gray-600"
                  />
                  <span className="text-gray-400">
                    I agree to receive marketing communications from Icon Group
                    Hospitality
                  </span>
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
