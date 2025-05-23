"use client";

import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";

export default function Footer() {
  return (
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
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-gray-400 hover:text-orange-500 transition-colors flex items-center group"
                >
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-gray-400 hover:text-orange-500 transition-colors flex items-center group"
                >
                  <span>Contact</span>
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
  );
}
