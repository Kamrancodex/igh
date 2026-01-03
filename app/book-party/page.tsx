"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BookPartyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
            <div className="flex items-center">
              <Image
                src="/logo-blaxk.png"
                alt="Icon Group Hospitality Logo"
                width={60}
                height={60}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">
              PLAN YOUR EVENT WITH US!
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Click on a location below to browse our event venues. For general
              inquiries, please email{" "}
              <a
                href="mailto:inquiries@marigoldcatering.com"
                className="text-orange-500 hover:text-orange-600 transition-colors"
              >
                inquiries@marigoldcatering.com
              </a>{" "}
              or call{" "}
              <a
                href="tel:216-566-5400"
                className="text-orange-500 hover:text-orange-600 transition-colors"
              >
                (216) 566-5400
              </a>
            </p>
          </div>

          {/* Venues Grid - All Dummy Data */}
          <div className="space-y-24">
            {/* Dummy Venue 1 - Downtown Restaurant - Image Left */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative overflow-hidden rounded-2xl group">
                <Image
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Downtown Restaurant"
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    Downtown Restaurant
                  </h3>
                  <div className="text-gray-600 space-y-1">
                    <p>123 Main Street</p>
                    <p>Chicago, IL 60601</p>
                    <p className="text-orange-500 font-medium">Downtown</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    <a
                      href="tel:312-555-0001"
                      className="text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      312-555-0001
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Website:</span>{" "}
                    <a
                      href="#"
                      className="text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      downtownrestaurant.com
                    </a>
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Perfect venue for your special events with elegant dining
                  spaces, modern amenities, and professional service.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Capacity: 20-200 guests
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Private dining rooms
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Full bar service
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button className="px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors">
                    Book Now
                  </button>
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:border-orange-500 hover:text-orange-500 transition-colors">
                    View Menu
                  </button>
                </div>
              </div>
            </div>

            {/* Dummy Venue 2 - Lakeside Bar - Image Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 lg:order-1">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    Lakeside Bar
                  </h3>
                  <div className="text-gray-600 space-y-1">
                    <p>456 Lake Street</p>
                    <p>Chicago, IL 60602</p>
                    <p className="text-orange-500 font-medium">Lakefront</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    <a
                      href="tel:312-555-0002"
                      className="text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      312-555-0002
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Website:</span>{" "}
                    <a
                      href="#"
                      className="text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      lakesidebar.com
                    </a>
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Casual bar and grill with outdoor patio seating and lake
                  views. Great for birthday parties and celebrations.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Capacity: 50-150 guests
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Outdoor patio
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Sports viewing
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button className="px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors">
                    Book Now
                  </button>
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:border-orange-500 hover:text-orange-500 transition-colors">
                    View Menu
                  </button>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl group lg:order-2">
                <Image
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Lakeside Bar"
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Dummy Venue 3 - Uptown Grill - Image Left */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative overflow-hidden rounded-2xl group">
                <Image
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Uptown Grill"
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    Uptown Grill
                  </h3>
                  <div className="text-gray-600 space-y-1">
                    <p>789 North Avenue</p>
                    <p>Chicago, IL 60603</p>
                    <p className="text-orange-500 font-medium">Uptown</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    <a
                      href="tel:312-555-0003"
                      className="text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      312-555-0003
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Website:</span>{" "}
                    <a
                      href="#"
                      className="text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      uptowngrill.com
                    </a>
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Modern grill restaurant with upscale ambiance and excellent
                  steaks. Perfect for corporate dinners.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Capacity: 30-100 guests
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Premium steaks & seafood
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Wine cellar
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button className="px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors">
                    Book Now
                  </button>
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:border-orange-500 hover:text-orange-500 transition-colors">
                    View Menu
                  </button>
                </div>
              </div>
            </div>

            {/* Dummy Venue 4 - Westside Lounge - Image Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 lg:order-1">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    Westside Lounge
                  </h3>
                  <div className="text-gray-600 space-y-1">
                    <p>321 West Side Drive</p>
                    <p>Chicago, IL 60604</p>
                    <p className="text-orange-500 font-medium">West Side</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    <a
                      href="tel:312-555-0004"
                      className="text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      312-555-0004
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Website:</span>{" "}
                    <a
                      href="#"
                      className="text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      westsidelounge.com
                    </a>
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Trendy lounge with craft cocktails and small plates. Ideal for
                  cocktail parties and networking events.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Capacity: 40-120 guests
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Craft cocktails
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Modern atmosphere
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button className="px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors">
                    Book Now
                  </button>
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:border-orange-500 hover:text-orange-500 transition-colors">
                    View Menu
                  </button>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl group lg:order-2">
                <Image
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Westside Lounge"
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Dummy Venue 5 - City Bistro - Image Left */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative overflow-hidden rounded-2xl group">
                <Image
                  src="https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="City Bistro"
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    City Bistro
                  </h3>
                  <div className="text-gray-600 space-y-1">
                    <p>555 City Center Blvd</p>
                    <p>Chicago, IL 60605</p>
                    <p className="text-orange-500 font-medium">City Center</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    <a
                      href="tel:312-555-0005"
                      className="text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      312-555-0005
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Website:</span>{" "}
                    <a
                      href="#"
                      className="text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      citybistro.com
                    </a>
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Cozy bistro with European-inspired cuisine and intimate
                  setting. Great for small gatherings and romantic dinners.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Capacity: 15-60 guests
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    European cuisine
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Intimate atmosphere
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button className="px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors">
                    Book Now
                  </button>
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:border-orange-500 hover:text-orange-500 transition-colors">
                    View Menu
                  </button>
                </div>
              </div>
            </div>

            {/* Dummy Venue 6 - Rooftop Terrace - Image Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 lg:order-1">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    Rooftop Terrace
                  </h3>
                  <div className="text-gray-600 space-y-1">
                    <p>888 High Street</p>
                    <p>Chicago, IL 60606</p>
                    <p className="text-orange-500 font-medium">Sky District</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    <a
                      href="tel:312-555-0006"
                      className="text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      312-555-0006
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Website:</span>{" "}
                    <a
                      href="#"
                      className="text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      rooftopterrace.com
                    </a>
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Stunning rooftop venue with panoramic city views. Perfect for
                  cocktail receptions and summer parties.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Capacity: 60-250 guests
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    City skyline views
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Open-air setting
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button className="px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors">
                    Book Now
                  </button>
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:border-orange-500 hover:text-orange-500 transition-colors">
                    View Menu
                  </button>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl group lg:order-2">
                <Image
                  src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Rooftop Terrace"
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center mt-24 bg-gray-50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Plan Your Event?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your event needs and find the perfect
              venue for your celebration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:PARTY@ICGARS.COM"
                className="px-8 py-4 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors"
              >
                Email Us: PARTY@ICGARS.COM
              </a>
              <a
                href="tel:312-462-3671"
                className="px-8 py-4 border-2 border-orange-500 text-orange-500 rounded-full font-medium hover:bg-orange-500 hover:text-white transition-colors"
              >
                Call: 312.462.3671
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
