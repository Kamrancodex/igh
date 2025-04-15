"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import {
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Globe,
  ArrowRight,
  ArrowUpRight,
  Linkedin,
  Youtube,
  ChevronRight,
  MapPin,
  Phone,
  Clock,
  Send,
  Users,
  BarChart,
  TrendingUp,
  Star,
  Briefcase,
  GraduationCap,
  Sun,
  Moon,
  ChevronDown,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const aboutRef = useRef<HTMLDivElement>(null)
  const aboutTitleRef = useRef<HTMLHeadingElement>(null)
  const [animatedElements, setAnimatedElements] = useState<Set<Element>>(new Set())
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [activeSection, setActiveSection] = useState<string>("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { id: "home", name: "HOME" },
    { id: "about", name: "ABOUT" },
    { id: "businesses", name: "BUSINESSES" },
    { id: "gallery", name: "GALLERY" },
    { id: "testimonials", name: "TESTIMONIALS" },
    { id: "team", name: "TEAM" },
    { id: "impact", name: "IMPACT" },
    { id: "contact", name: "CONTACT" },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80 // Height of the sticky header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Add offset for header

      // Find the section that is currently in view
      const sections = navLinks.map((link) => {
        const element = document.getElementById(link.id)
        if (!element) return { id: link.id, position: 0, height: 0 }

        const rect = element.getBoundingClientRect()
        return {
          id: link.id,
          position: rect.top + window.pageYOffset,
          height: rect.height,
        }
      })

      // Find the section that is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].position) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once on mount

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [navLinks])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success")
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset form status after 3 seconds
      setTimeout(() => {
        setFormStatus("idle")
      }, 3000)
    }, 1500)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (aboutRef.current && aboutTitleRef.current) {
      const aboutSection = aboutRef.current
      const aboutTitle = aboutTitleRef.current
      const aboutSectionTop = aboutSection.offsetTop
      const triggerPoint = aboutSectionTop - 300

      if (scrollY > triggerPoint) {
        const progress = Math.min(1, (scrollY - triggerPoint) / 300)
        aboutTitle.style.transform = `translateY(${progress * 100}px)`
        aboutTitle.style.opacity = `${1 - progress * 0.7}`
        aboutTitle.style.zIndex = scrollY > triggerPoint + 150 ? "0" : "10"
      } else {
        aboutTitle.style.transform = "translateY(0)"
        aboutTitle.style.opacity = "1"
        aboutTitle.style.zIndex = "10"
      }
    }
  }, [scrollY])

  // Set up intersection observer for animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, observerOptions)

    // Target all elements with the animate-on-scroll class
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  // Add this useEffect to ensure all content is visible after page load
  useEffect(() => {
    // Fallback to make all content visible after a delay in case animations don't trigger
    const timeout = setTimeout(() => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        if (!el.classList.contains("animate-in")) {
          el.classList.add("animate-in")
        }
      })
    }, 1000)

    return () => clearTimeout(timeout)
  }, [])

  // Business data
  const businesses = [
    {
      id: 1,
      name: "Skyline Restaurant",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Fine dining with panoramic city views",
      link: "/businesses/skyline",
      socials: {
        instagram: "#",
        facebook: "#",
        twitter: "#",
        website: "#",
      },
    },
    {
      id: 2,
      name: "Azure Beach Club",
      image:
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Luxury beachfront experience",
      link: "/businesses/azure",
      socials: {
        instagram: "#",
        facebook: "#",
        twitter: "#",
        website: "#",
      },
    },
    {
      id: 3,
      name: "Ember Lounge",
      image:
        "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Sophisticated cocktail bar & lounge",
      link: "/businesses/ember",
      socials: {
        instagram: "#",
        facebook: "#",
        twitter: "#",
        website: "#",
      },
    },
    {
      id: 4,
      name: "Harvest Table",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Farm-to-table dining experience",
      link: "/businesses/harvest",
      socials: {
        instagram: "#",
        facebook: "#",
        twitter: "#",
        website: "#",
      },
    },
  ]

  // Gallery data
  const galleryItems = [
    {
      id: 1,
      title: "LUXURY DINING",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      size: "large", // large, medium, small
      position: "top-left",
    },
    {
      id: 2,
      title: "ELEGANT SPACES",
      image:
        "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      size: "medium",
      position: "top-right",
    },
    {
      id: 3,
      title: "CRAFT COCKTAILS",
      image:
        "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      size: "small",
      position: "middle-right",
    },
    {
      id: 4,
      title: "BEACHFRONT VIEWS",
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      size: "medium",
      position: "bottom-left",
    },
    {
      id: 5,
      title: "CULINARY EXCELLENCE",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      size: "medium",
      position: "bottom-right",
    },
  ]

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "James Wilson",
      title: "Executive Chef, The Ritz-Carlton",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      quote:
        "Icon Group transformed our dining experience with their innovative approach. Their attention to detail and understanding of hospitality trends helped us create a world-class restaurant.",
      logo: "/ritz-carlton-inspired-crest.png",
    },
    {
      id: 2,
      name: "Sophia Chen",
      title: "Operations Director, Four Seasons",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      quote:
        "Working with Icon Group was seamless from start to finish. They listened to our needs and delivered a hospitality experience that exceeded all expectations. Highly recommended!",
      logo: "/abstract-seasonal-representation.png",
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      title: "F&B Manager, Hilton Hotels",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      quote:
        "Icon Group's expertise in hospitality management is unmatched. They revitalized our food and beverage program, resulting in a 40% increase in revenue and outstanding guest satisfaction.",
      logo: "/stylized-hotel-exterior.png",
    },
    {
      id: 4,
      name: "Emily Johnson",
      title: "CEO, Boutique Hotel Collection",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      quote:
        "The team at Icon Group understands the unique challenges of boutique hospitality. Their strategic guidance helped us create distinctive experiences that our guests absolutely love.",
      logo: "/elegant-boutique-hotel-emblem.png",
    },
    {
      id: 5,
      name: "David Thompson",
      title: "General Manager, Waldorf Astoria",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      quote:
        "Icon Group's consulting services transformed our approach to luxury hospitality. Their innovative ideas and flawless execution have set a new standard for excellence in our properties.",
      logo: "/Waldorf Astoria Inspired Emblem.png",
    },
    {
      id: 6,
      name: "Sarah Martinez",
      title: "Marketing Director, Marriott International",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      quote:
        "The strategic vision that Icon Group brought to our hospitality marketing was game-changing. They understand the pulse of the industry and deliver results that speak for themselves.",
      logo: "/marriott-logo-generic.png",
    },
    {
      id: 7,
      name: "Robert Kim",
      title: "Owner, Luxury Restaurant Group",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      quote:
        "Icon Group's restaurant management expertise helped us launch three successful venues in just two years. Their operational excellence and creative vision are truly exceptional.",
      logo: "/elegant-dining-emblem.png",
    },
    {
      id: 8,
      name: "Jennifer Lee",
      title: "Events Director, Peninsula Hotels",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      quote:
        "Our collaboration with Icon Group elevated our events program to new heights. Their attention to detail and innovative concepts have made us the premier destination for luxury events.",
      logo: "/elegant-hotel-crest.png",
    },
  ]

  // What we do items
  const whatWeDo = [
    "Hospitality Management & Consulting",
    "Restaurant Concept Development",
    "Hotel & Resort Operations",
    "Staff Training & Development",
    "Brand Strategy & Marketing",
    "Revenue Optimization",
    "Guest Experience Enhancement",
  ]

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "JANE WILLIS",
      title: "Marketing Director",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      socials: {
        behance: "#",
        twitter: "#",
        facebook: "#",
      },
    },
    {
      id: 2,
      name: "MICHAEL CHEN",
      title: "Executive Chef",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      socials: {
        behance: "#",
        twitter: "#",
        facebook: "#",
      },
    },
    {
      id: 3,
      name: "SARAH JOHNSON",
      title: "Operations Manager",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      socials: {
        behance: "#",
        twitter: "#",
        facebook: "#",
      },
    },
    {
      id: 4,
      name: "DAVID RODRIGUEZ",
      title: "Finance Director",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      socials: {
        behance: "#",
        twitter: "#",
        facebook: "#",
      },
    },
    {
      id: 5,
      name: "LORI HARVEY",
      title: "Project Manager",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      socials: {
        behance: "#",
        twitter: "#",
        facebook: "#",
      },
    },
    {
      id: 6,
      name: "JAMES WILSON",
      title: "Creative Director",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      socials: {
        behance: "#",
        twitter: "#",
        facebook: "#",
      },
    },
  ]

  // Impact data
  const impactStats = [
    {
      id: 1,
      number: "150+",
      label: "HOSPITALITY PROJECTS",
      description: "Successfully completed across 12 countries",
    },
    {
      id: 2,
      number: "45%",
      label: "REVENUE INCREASE",
      description: "Average growth for our managed properties",
    },
    {
      id: 3,
      number: "28",
      label: "INDUSTRY AWARDS",
      description: "Recognizing our excellence in hospitality",
    },
    {
      id: 4,
      number: "12K+",
      label: "STAFF TRAINED",
      description: "Through our specialized hospitality programs",
    },
  ]

  // Don't render anything related to theme until mounted to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <div className="text-sm font-medium dark:text-gray-300">
              LOCAL/{" "}
              {new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}
            </div>

            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`nav-link text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? "text-black dark:text-white font-bold"
                      : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700" />
                )}
              </button>

              <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
                <div className="w-6 flex flex-col gap-1.5">
                  <span
                    className={`block h-0.5 bg-black dark:bg-white transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
                  ></span>
                  <span
                    className={`block h-0.5 bg-black dark:bg-white transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}
                  ></span>
                  <span
                    className={`block h-0.5 bg-black dark:bg-white transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden bg-white dark:bg-gray-900 ${mobileMenuOpen ? "max-h-96 border-b border-gray-200 dark:border-gray-800" : "max-h-0"}`}
        >
          <div className="container mx-auto px-6 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    scrollToSection(link.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`nav-link text-sm font-medium transition-colors text-left py-2 ${
                    activeSection === link.id
                      ? "text-black dark:text-white font-bold"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dark:bg-gray-900">
        {/* Hero Section with Modern Design Elements */}
        <section id="home" className="pt-20 min-h-screen flex flex-col dark:bg-gray-900 relative overflow-hidden">
          {/* Modern geometric shapes and patterns */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Large circle */}
            <div className="absolute -top-[30%] -right-[20%] w-[70%] h-[70%] rounded-full border-[40px] border-orange-500/5 dark:border-orange-500/10"></div>

            {/* Small circles */}
            <div className="absolute top-[15%] left-[10%] w-16 h-16 rounded-full bg-orange-500/10 dark:bg-orange-500/20 animate-float-slow"></div>
            <div className="absolute top-[60%] right-[15%] w-24 h-24 rounded-full bg-orange-500/5 dark:bg-orange-500/10 animate-float-medium"></div>

            {/* Squares */}
            <div className="absolute top-[30%] left-[20%] w-32 h-32 rounded-xl bg-gray-200/50 dark:bg-gray-700/30 rotate-12 animate-float-medium"></div>
            <div className="absolute bottom-[20%] left-[15%] w-20 h-20 rounded-xl bg-gray-200/30 dark:bg-gray-700/20 -rotate-12 animate-float-slow"></div>

            {/* Diagonal lines */}
            <div className="absolute top-[10%] right-[30%] w-[30%] h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent rotate-45"></div>
            <div className="absolute bottom-[30%] right-[10%] w-[20%] h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent -rotate-45"></div>

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
          </div>

          <div className="container mx-auto px-6 py-8 md:py-16 flex-1 flex flex-col relative z-10">
            <div className="flex-1 flex flex-col justify-center items-center">
              <div className="text-center max-w-5xl mx-auto">
                <div className="mb-8 animate-on-scroll fade-in-up relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 rounded-full blur-xl"></div>
                  <Image
                    src="/logo.png"
                    alt="Icon Group Hospitality Logo"
                    width={400}
                    height={200}
                    className="mx-auto relative z-10"
                  />
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter animate-on-scroll fade-in-up delay-200 brand-gradient-text animated-gradient text-3d mb-6">
                  ICON GROUP HOSPITALITY
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto animate-on-scroll fade-in-up delay-300">
                  Elevating the standard of luxury hospitality through innovative management and exceptional guest
                  experiences.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll fade-in-up delay-400">
                  <button
                    onClick={() => scrollToSection("about")}
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Discover Our Story
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="px-8 py-4 border-2 border-black dark:border-white text-black dark:text-white rounded-full font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  >
                    Get In Touch
                  </button>
                </div>
              </div>
            </div>

            {/* Modern stats cards with hover effects */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 mb-8 animate-on-scroll fade-in-up delay-500">
              {impactStats.map((stat, index) => (
                <div
                  key={stat.id}
                  className={`stats-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg text-center border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 delay-${index * 100}`}
                >
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Modern scroll indicator */}
            <div className="flex justify-center mt-8 animate-bounce">
              <button
                onClick={() => scrollToSection("about")}
                aria-label="Scroll down"
                className="text-black dark:text-white opacity-50 hover:opacity-100 transition-opacity"
              >
                <ChevronDown className="h-8 w-8" />
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          ref={aboutRef}
          className="min-h-screen relative py-24 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="container mx-auto px-6">
            <h2
              ref={aboutTitleRef}
              className="text-6xl md:text-8xl font-bold tracking-tighter text-center mb-16 transition-all duration-300 ease-out dark:text-white"
            >
              ABOUT US
            </h2>

            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="aspect-video relative mb-16 overflow-hidden rounded-lg shadow-2xl animate-on-scroll fade-in-up">
                <Image
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
                  alt="Luxury hotel lobby representing Icon Group Hospitality"
                  width={1280}
                  height={720}
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="prose prose-lg max-w-none dark:prose-invert">
                <h3 className="text-3xl font-bold mb-6 text-center md:text-left animate-on-scroll fade-in-up dark:text-white">
                  <span className="brand-orange">Elevating</span> Hospitality Excellence
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold mb-3 animate-on-scroll fade-in-up dark:text-gray-200">
                      Our Vision
                    </h4>
                    <p className="animate-on-scroll fade-in-up dark:text-gray-300">
                      Icon Group Hospitality is a premier hospitality management and consulting firm dedicated to
                      elevating the standar hospitality management and consulting firm dedicated to elevating the
                      standard of service and experience in the hospitality industry. With decades of combined
                      experience, our team brings unparalleled expertise to every project.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-3 animate-on-scroll fade-in-up delay-100 dark:text-gray-200">
                      Our Approach
                    </h4>
                    <p className="animate-on-scroll fade-in-up delay-100 dark:text-gray-300">
                      We specialize in transforming hospitality venues into exceptional destinations that leave lasting
                      impressions. Our comprehensive approach encompasses everything from concept development and
                      operational strategy to staff training and marketing.
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-orange-500 animate-on-scroll fade-in-up delay-200">
                  <h4 className="text-xl font-semibold mb-3 dark:text-white">What Sets Us Apart</h4>
                  <p className="mb-0 dark:text-gray-300">
                    Our unwavering commitment to excellence and innovative approach to hospitality management is what
                    distinguishes us. We believe that true hospitality is about creating meaningful connections and
                    memorable experiences for guests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Businesses We Own Section */}
        <section
          id="businesses"
          className="py-24 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-6xl md:text-7xl font-bold tracking-tighter text-center mb-24 animate-on-scroll fade-in-up dark:text-white">
              BUSINESSES WE OWN
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {businesses.map((business, index) => (
                <div
                  key={business.id}
                  className={`group relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500 hover:shadow-3xl animate-on-scroll fade-in-up delay-${index * 100}`}
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={business.image || "/placeholder.svg"}
                      alt={business.name}
                      width={800}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex flex-col justify-between gap-4">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{business.name}</h3>
                        <p className="text-sm md:text-base text-white/80 mb-4">{business.description}</p>

                        <Link
                          href={business.link}
                          className="inline-flex items-center text-white border-b-2 border-white pb-1 transition-all hover:pb-2"
                        >
                          Explore <ArrowRight className="ml-2 h-4 w-4" />
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
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="relative border-t border-gray-100 dark:border-gray-800">
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-black text-white px-3 py-1 text-sm font-medium">Gallery</div>
          </div>

          <div className="gallery-grid">
            {/* Large image - top left */}
            <div className="gallery-item gallery-item-large-left relative overflow-hidden group animate-on-scroll fade-in">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Luxury restaurant interior"
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <div className="text-xs text-amber-400 mb-2">NEW VENUE</div>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  THE ESSENCE OF
                  <br />
                  LUXURY
                </h3>
                <Link href="/gallery" className="inline-flex items-center text-white text-sm">
                  View Gallery <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-2xl font-bold text-white mb-2">Luxury Dining Experience</h4>
                  <p className="text-white/80 max-w-md">
                    Our flagship restaurant offers an unparalleled dining experience with world-class cuisine and
                    impeccable service.
                  </p>
                </div>
              </div>
            </div>

            {/* Medium image - top right */}
            <div className="gallery-item gallery-item-medium-right relative overflow-hidden group animate-on-scroll fade-in delay-100">
              <Image
                src="https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Elegant hotel lobby"
                width={600}
                height={400}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-xl font-bold text-white mb-2">Elegant Spaces</h4>
                  <p className="text-white/80 text-sm">
                    Thoughtfully designed interiors that blend luxury with comfort.
                  </p>
                </div>
              </div>
            </div>

            {/* Small image - middle right */}
            <div className="gallery-item gallery-item-small-right relative overflow-hidden group animate-on-scroll fade-in delay-200">
              <Image
                src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Craft cocktail"
                width={400}
                height={300}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-xl font-bold text-white mb-2">Craft Cocktails</h4>
                  <p className="text-white/80 text-sm">Artisanal beverages crafted by expert mixologists.</p>
                </div>
              </div>
            </div>

            {/* Medium image - bottom left */}
            <div className="gallery-item gallery-item-medium-left relative overflow-hidden group animate-on-scroll fade-in delay-300">
              <Image
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Beachfront resort"
                width={600}
                height={400}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-4">
                <div className="text-xs text-white mb-1">08:45</div>
                <div className="text-xs text-white/80">15.4.2025</div>
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-xl font-bold text-white mb-2">Beachfront Views</h4>
                  <p className="text-white/80 text-sm">
                    Breathtaking oceanfront locations for unforgettable experiences.
                  </p>
                </div>
              </div>
            </div>

            {/* Medium image - bottom right */}
            <div className="gallery-item gallery-item-medium-right-bottom relative overflow-hidden group animate-on-scroll fade-in delay-400">
              <Image
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Gourmet dish"
                width={600}
                height={400}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-xl font-bold text-white mb-2">Culinary Excellence</h4>
                  <p className="text-white/80 text-sm">
                    Exquisite dishes prepared by award-winning chefs using the finest ingredients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-24 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="container mx-auto px-6 mb-16">
            <h2 className="text-6xl md:text-7xl font-bold tracking-tighter text-center animate-on-scroll fade-in-up dark:text-white">
              TRUSTED BY
              <br />
              INTERNATIONAL BRANDS
            </h2>
          </div>

          {/* First row - moving right */}
          <div className="testimonial-row-right mb-8">
            <div className="testimonial-track-right">
              {testimonials.slice(0, 4).map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">{testimonial.name}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.title}</p>
                    </div>
                    <div className="ml-auto">
                      <Image
                        src={testimonial.logo || "/placeholder.svg"}
                        alt={`${testimonial.title} logo`}
                        width={80}
                        height={40}
                        className="h-10 w-auto object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base">"{testimonial.quote}"</p>
                </div>
              ))}
              {testimonials.slice(0, 4).map((testimonial) => (
                <div key={`duplicate-${testimonial.id}`} className="testimonial-card">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">{testimonial.name}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.title}</p>
                    </div>
                    <div className="ml-auto">
                      <Image
                        src={testimonial.logo || "/placeholder.svg"}
                        alt={`${testimonial.title} logo`}
                        width={80}
                        height={40}
                        className="h-10 w-auto object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Second row - moving left */}
          <div className="testimonial-row-left">
            <div className="testimonial-track-left">
              {testimonials.slice(4, 8).map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">{testimonial.name}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.title}</p>
                    </div>
                    <div className="ml-auto">
                      <Image
                        src={testimonial.logo || "/placeholder.svg"}
                        alt={`${testimonial.title} logo`}
                        width={80}
                        height={40}
                        className="h-10 w-auto object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base">"{testimonial.quote}"</p>
                </div>
              ))}
              {testimonials.slice(4, 8).map((testimonial) => (
                <div key={`duplicate-${testimonial.id}`} className="testimonial-card">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">{testimonial.name}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.title}</p>
                    </div>
                    <div className="ml-auto">
                      <Image
                        src={testimonial.logo || "/placeholder.svg"}
                        alt={`${testimonial.title} logo`}
                        width={80}
                        height={40}
                        className="h-10 w-auto object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Employment Section */}
        <section
          id="employment"
          className="py-24 bg-white dark:bg-gray-900 overflow-hidden border-t border-gray-100 dark:border-gray-800"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-6xl md:text-7xl font-bold tracking-tighter mb-16 animate-on-scroll fade-in-up dark:text-white">
                WORK WITH US
              </h2>

              <div className="mb-16 animate-on-scroll fade-in-up delay-100">
                <Link
                  href="/careers"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-black dark:bg-white dark:text-black rounded-full overflow-hidden transition-all duration-300 hover:bg-gray-900 dark:hover:bg-gray-200"
                >
                  <span className="relative z-10 flex items-center">
                    JOIN OUR TEAM
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black dark:from-gray-200 dark:to-white transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                </Link>
              </div>

              <div className="max-w-5xl mx-auto mb-16">
                <h3 className="text-2xl font-semibold mb-12 animate-on-scroll fade-in-up delay-200 dark:text-white">
                  WHAT WE DO
                </h3>

                <div className="relative">
                  {/* Background decorative elements */}
                  <div className="absolute -left-10 top-1/4 w-20 h-20 rounded-full border-2 border-dashed border-orange-300/30 dark:border-orange-500/20 animate-spin-slow"></div>
                  <div className="absolute -right-10 bottom-1/4 w-16 h-16 rounded-full border-2 border-dashed border-orange-300/30 dark:border-orange-500/20 animate-spin-slow-reverse"></div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-orange-300/20 dark:via-orange-500/20 to-transparent"></div>

                  {/* Services list */}
                  <div className="space-y-8">
                    {[
                      {
                        title: "Hospitality Management & Consulting",
                        description:
                          "Strategic guidance and operational excellence for hotels, restaurants, and venues.",
                        icon: <Globe className="h-6 w-6" />,
                        color: "from-orange-500 to-amber-400",
                      },
                      {
                        title: "Restaurant Concept Development",
                        description: "Creating unique dining experiences from concept to execution.",
                        icon: <ChevronRight className="h-6 w-6" />,
                        color: "from-amber-500 to-yellow-400",
                      },
                      {
                        title: "Hotel & Resort Operations",
                        description: "Optimizing every aspect of your property for exceptional guest experiences.",
                        icon: <MapPin className="h-6 w-6" />,
                        color: "from-orange-600 to-orange-400",
                      },
                      {
                        title: "Staff Training & Development",
                        description: "Elevating service standards through comprehensive training programs.",
                        icon: <Users className="h-6 w-6" />,
                        color: "from-amber-600 to-amber-400",
                      },
                      {
                        title: "Brand Strategy & Marketing",
                        description: "Building compelling brand narratives that resonate with luxury audiences.",
                        icon: <BarChart className="h-6 w-6" />,
                        color: "from-orange-500 to-amber-500",
                      },
                      {
                        title: "Revenue Optimization",
                        description: "Data-driven strategies to maximize profitability and market position.",
                        icon: <TrendingUp className="h-6 w-6" />,
                        color: "from-amber-500 to-yellow-500",
                      },
                      {
                        title: "Guest Experience Enhancement",
                        description: "Creating memorable moments that turn guests into loyal advocates.",
                        icon: <Star className="h-6 w-6" />,
                        color: "from-orange-600 to-orange-400",
                      },
                    ].map((service, index) => (
                      <div
                        key={index}
                        className={`group relative flex items-start gap-6 p-6 rounded-xl transition-all duration-300 hover:bg-white/80 dark:hover:bg-gray-800/80 animate-on-scroll fade-in-up delay-${200 + index * 50}`}
                      >
                        <div
                          className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3`}
                        >
                          {service.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{service.title}</h4>
                          <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                        </div>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight className="h-5 w-5 text-orange-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-16 bg-gray-50 dark:bg-gray-800 p-8 rounded-xl animate-on-scroll fade-in-up delay-500">
                <h3 className="text-xl font-semibold mb-6 dark:text-white">WHY JOIN OUR TEAM?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-black/5 dark:bg-white/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Briefcase className="h-8 w-8 text-gray-700 dark:text-gray-300" />
                    </div>
                    <h4 className="font-medium mb-2 dark:text-white">Career Growth</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Opportunities for advancement in a dynamic industry
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-black/5 dark:bg-white/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <GraduationCap className="h-8 w-8 text-gray-700 dark:text-gray-300" />
                    </div>
                    <h4 className="font-medium mb-2 dark:text-white">Continuous Learning</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Professional development and training programs
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-black/5 dark:bg-white/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Globe className="h-8 w-8 text-gray-700 dark:text-gray-300" />
                    </div>
                    <h4 className="font-medium mb-2 dark:text-white">Global Exposure</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Work with international brands and diverse teams
                    </p>
                  </div>
                </div>
              </div>

              <div className="social-icons-container mt-16 animate-on-scroll fade-in-up delay-600">
                <h3 className="text-xl font-medium mb-6 dark:text-white">CONNECT WITH US</h3>
                <div className="flex justify-center space-x-4">
                  <Link href="#" className="social-icon-link" aria-label="Instagram">
                    <Instagram className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="social-icon-link" aria-label="Facebook">
                    <Facebook className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="social-icon-link" aria-label="Twitter">
                    <Twitter className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="social-icon-link" aria-label="LinkedIn">
                    <Linkedin className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="social-icon-link" aria-label="YouTube">
                    <Youtube className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members Section */}
        <section id="team" className="py-24 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-6xl md:text-7xl font-bold tracking-tighter text-center mb-24 animate-on-scroll fade-in-up dark:text-white">
              OUR TEAM
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`team-member-card group relative overflow-hidden animate-on-scroll fade-in-up delay-${index * 100}`}
                >
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={600}
                      height={800}
                      className="w-full h-full object-cover"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-white dark:bg-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-6">
                      <p className="text-gray-500 dark:text-gray-400 mb-2">{member.title}</p>
                      <h3 className="text-3xl font-bold mb-6 dark:text-white">{member.name}</h3>
                      <div className="flex space-x-4">
                        <Link href={member.socials.behance} aria-label="Behance" className="team-social-icon">
                          <div className="bg-black dark:bg-white text-white dark:text-black w-8 h-8 flex items-center justify-center">
                            <span className="font-bold">Be</span>
                          </div>
                        </Link>
                        <Link href={member.socials.twitter} aria-label="Twitter" className="team-social-icon">
                          <div className="bg-black dark:bg-white text-white dark:text-black w-8 h-8 flex items-center justify-center">
                            <Twitter className="h-4 w-4" />
                          </div>
                        </Link>
                        <Link href={member.socials.facebook} aria-label="Facebook" className="team-social-icon">
                          <div className="bg-black dark:bg-white text-white dark:text-black w-8 h-8 flex items-center justify-center">
                            <Facebook className="h-4 w-4" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section
          id="impact"
          className="py-24 bg-white dark:bg-gray-900 text-black dark:text-white border-t border-gray-100 dark:border-gray-800"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-6xl md:text-7xl font-bold tracking-tighter text-center mb-24 animate-on-scroll fade-in-up dark:text-white">
              OUR IMPACT
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {impactStats.map((stat, index) => (
                <div key={stat.id} className={`text-center animate-on-scroll fade-in-up delay-${index * 100}`}>
                  <div className="mb-4 relative">
                    <span className="text-6xl md:text-7xl font-bold relative z-10 impact-number-light dark:impact-number">
                      {stat.number}
                    </span>
                    <div className="absolute -inset-1 bg-black/5 dark:bg-white/5 rounded-full blur-xl opacity-70 -z-10"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 dark:text-white">{stat.label}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{stat.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-24 max-w-3xl mx-auto text-center animate-on-scroll fade-in-up">
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                Our commitment to excellence has transformed the hospitality landscape across the globe, setting new
                standards for luxury, service, and innovation.
              </p>
              <Link
                href="/impact"
                className="inline-flex items-center text-black dark:text-white border-b-2 border-black dark:border-white pb-1 transition-all hover:pb-2"
              >
                Learn more about our impact <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-6xl md:text-7xl font-bold tracking-tighter text-center mb-24 animate-on-scroll fade-in-up dark:text-white">
              GET IN TOUCH
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              {/* Contact Form */}
              <div className="animate-on-scroll fade-in-up">
                <h3 className="text-2xl font-bold mb-6 dark:text-white">Send us a message</h3>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors"
                      placeholder="Your email address"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Business Proposal">Business Proposal</option>
                      <option value="Career Opportunity">Career Opportunity</option>
                      <option value="Media Request">Media Request</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors"
                      placeholder="Your message"
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-black dark:bg-white dark:text-black rounded-md overflow-hidden transition-all duration-300 hover:bg-gray-900 dark:hover:bg-gray-200 w-full"
                    >
                      <span className="relative z-10 flex items-center">
                        {formStatus === "submitting" ? (
                          "Sending..."
                        ) : formStatus === "success" ? (
                          "Message Sent!"
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                          </>
                        )}
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black dark:from-gray-200 dark:to-white transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Contact Information and Map */}
              <div className="animate-on-scroll fade-in-up delay-200">
                <h3 className="text-2xl font-bold mb-6 dark:text-white">Contact Information</h3>

                <div className="space-y-8 mb-12">
                  <div className="flex items-start">
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 dark:text-gray-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg dark:text-white">Address</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        123 Fifth Avenue
                        <br />
                        New York, NY 10010
                        <br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 dark:text-gray-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg dark:text-white">Email</h4>
                      <p className="text-gray-600 dark:text-gray-400">info@icongrouphospitality.com</p>
                      <p className="text-gray-600 dark:text-gray-400">careers@icongrouphospitality.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 dark:text-gray-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg dark:text-white">Phone</h4>
                      <p className="text-gray-600 dark:text-gray-400">+1 (212) 555-0123</p>
                      <p className="text-gray-600 dark:text-gray-400">+1 (212) 555-0124</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 dark:text-gray-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg dark:text-white">Business Hours</h4>
                      <p className="text-gray-600 dark:text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600 dark:text-gray-400">Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="text-gray-600 dark:text-gray-400">Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="rounded-lg overflow-hidden h-80 relative">
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    <Image
                      src="/nyc-street-map.png"
                      alt="Map location of Icon Group Hospitality"
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-md">
                        Interactive Map Loading...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 text-black dark:text-white pt-16 pb-8 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Logo and About */}
            <div>
              <div className="mb-6">
                <Image src="/logo.png" alt="Icon Group Hospitality Logo" width={160} height={80} className="mb-4" />
                <h3 className="text-xl font-bold brand-text dark:text-white">ICON GROUP HOSPITALITY</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Elevating the standard of luxury hospitality through innovative management and consulting services.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 dark:text-white">QUICK LINKS</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portfolio"
                    className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-bold mb-6 dark:text-white">OUR SERVICES</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/services/management"
                    className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Hospitality Management
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/consulting"
                    className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Consulting Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/training"
                    className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Staff Training
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/branding"
                    className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Brand Development
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/marketing"
                    className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Marketing Strategy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-bold mb-6 dark:text-white">NEWSLETTER</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Subscribe to our newsletter for the latest updates and insights.
              </p>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors text-black dark:text-white"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 pb-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
                <p>&copy; {new Date().getFullYear()} Icon Group Hospitality. All rights reserved.</p>
                <p>Powered by RDJ Media</p>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                <Link href="/privacy" className="hover:text-black dark:hover:text-white transition-colors mr-4">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-black dark:hover:text-white transition-colors mr-4">
                  Terms of Service
                </Link>
                <Link href="/sitemap" className="hover:text-black dark:hover:text-white transition-colors">
                  Sitemap
                </Link>
              </div>
            </div>
            <div className="text-center text-xs text-gray-400 dark:text-gray-500 mt-6">
              <p>
                Disclaimer: All information on this website is for general informational purposes only. Icon Group
                Hospitality makes no representation or warranty regarding the accuracy or completeness of any content.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
