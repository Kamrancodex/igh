"use client";

import type React from "react";

import Image from "next/image";
import Link from "next/link";
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
  Briefcase,
  GraduationCap,
  ChevronDown,
  Heart,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import NewsletterSection from "../components/newsletter-section";

// Replace the existing Home component with this enhanced version that includes micro-interactions
export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutTitleRef = useRef<HTMLHeadingElement>(null);
  const aboutImageRef = useRef<HTMLDivElement>(null);
  const [animatedElements, setAnimatedElements] = useState<Set<Element>>(
    new Set()
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeTeamValue, setActiveTeamValue] = useState<number>(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  // Find the cursor position state and update logic
  // Replace the cursor implementation with this fixed version:

  // Change this:
  // And replace the useEffect for cursor movement with this:
  const [scrollProgress, setScrollProgress] = useState(0);
  const textElements = useRef<NodeListOf<Element> | null>(null);
  const parallaxElements = useRef<NodeListOf<Element> | null>(null);
  const revealElements = useRef<NodeListOf<Element> | null>(null);
  const staggerElements = useRef<NodeListOf<Element> | null>(null);
  const imageRevealElements = useRef<NodeListOf<Element> | null>(null);

  // 1. Add "WORK WITH US" to the navLinks array
  const navLinks = [
    { id: "home", name: "HOME" },
    { id: "about", name: "ABOUT" },
    { id: "businesses", name: "BUSINESSES" },
    { id: "gallery", name: "GALLERY" },
    { id: "testimonials", name: "TESTIMONIALS" },
    { id: "team", name: "TEAM" },
    { id: "employment", name: "WORK WITH US" },
    { id: "impact", name: "IMPACT" },
    { id: "contact", name: "CONTACT" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Height of the sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Custom cursor effect
  useEffect(() => {
    const cursorRef = document.createElement("div");
    const cursorDotRef = document.createElement("div");

    // Add classes to cursor elements
    cursorRef.classList.add("custom-cursor-effect");
    cursorDotRef.classList.add("custom-cursor-dot");

    // Initially position offscreen
    cursorRef.style.transform = "translate(-100px, -100px)";
    cursorDotRef.style.transform = "translate(-100px, -100px)";

    // Add to DOM
    document.body.appendChild(cursorRef);
    document.body.appendChild(cursorDotRef);

    // Use this function to move cursor without state updates
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      cursorRef.style.transform = `translate(${clientX}px, ${clientY}px)`;
      cursorDotRef.style.transform = `translate(${clientX}px, ${clientY}px)`;
    };

    const handleMouseDown = () => {
      cursorRef.classList.add("cursor-grow");
      cursorDotRef.classList.add("cursor-dot-grow");
    };

    const handleMouseUp = () => {
      cursorRef.classList.remove("cursor-grow");
      cursorDotRef.classList.remove("cursor-dot-grow");
    };

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, [role="button"], .interactive'
    );

    const handleMouseEnter = () => {
      cursorRef.classList.add("cursor-grow");
      cursorDotRef.classList.add("cursor-dot-grow");
    };

    const handleMouseLeave = () => {
      cursorRef.classList.remove("cursor-grow");
      cursorDotRef.classList.remove("cursor-dot-grow");
    };

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Add event listeners
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Clean up
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });

      document.body.removeChild(cursorRef);
      document.body.removeChild(cursorDotRef);
    };
  }, []);

  // Remove the second useEffect that was updating cursor position
  // Also remove these refs as they're no longer needed

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      setScrollProgress(scrollPercent * 100);

      // Show back to top button when scrolled down
      setShowBackToTop(scrollTop > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Text reveal animation
  useEffect(() => {
    textElements.current = document.querySelectorAll(".reveal-text");

    const splitText = () => {
      textElements.current?.forEach((el) => {
        const text = el.textContent;
        let newHTML = "";

        if (text) {
          for (let i = 0; i < text.length; i++) {
            newHTML += `<span style="transition-delay: ${i * 0.03}s">${
              text[i]
            }</span>`;
          }
          el.innerHTML = newHTML;
        }
      });
    };

    splitText();

    const revealText = () => {
      textElements.current?.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const viewHeight = Math.max(
          document.documentElement.clientHeight,
          window.innerHeight
        );

        if (rect.top <= viewHeight * 0.75 && rect.bottom >= 0) {
          el.classList.add("revealed");
        }
      });
    };

    window.addEventListener("scroll", revealText);
    revealText(); // Initial check

    return () => window.removeEventListener("scroll", revealText);
  }, []);

  // Parallax effect
  useEffect(() => {
    parallaxElements.current = document.querySelectorAll(".parallax-element");

    const handleParallax = () => {
      parallaxElements.current?.forEach((el) => {
        const speed = el.getAttribute("data-speed") || "0.1";
        const rect = el.getBoundingClientRect();
        const viewHeight = Math.max(
          document.documentElement.clientHeight,
          window.innerHeight
        );

        if (rect.top <= viewHeight && rect.bottom >= 0) {
          const distance = window.scrollY - (el.offsetTop - viewHeight);
          const parallaxValue = distance * Number.parseFloat(speed);
          el.style.transform = `translateY(${parallaxValue}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleParallax);
    handleParallax(); // Initial check

    return () => window.removeEventListener("scroll", handleParallax);
  }, []);

  // Section reveal animation
  useEffect(() => {
    revealElements.current = document.querySelectorAll(".section-reveal");

    const revealSection = () => {
      revealElements.current?.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const viewHeight = Math.max(
          document.documentElement.clientHeight,
          window.innerHeight
        );

        if (rect.top <= viewHeight * 0.75 && rect.bottom >= 0) {
          el.classList.add("revealed");
        }
      });
    };

    window.addEventListener("scroll", revealSection);
    revealSection(); // Initial check

    return () => window.removeEventListener("scroll", revealSection);
  }, []);

  // Staggered children animation
  useEffect(() => {
    staggerElements.current = document.querySelectorAll(".stagger-children");

    const revealStaggered = () => {
      staggerElements.current?.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const viewHeight = Math.max(
          document.documentElement.clientHeight,
          window.innerHeight
        );

        if (rect.top <= viewHeight * 0.75 && rect.bottom >= 0) {
          el.classList.add("revealed");
        }
      });
    };

    window.addEventListener("scroll", revealStaggered);
    revealStaggered(); // Initial check

    return () => window.removeEventListener("scroll", revealStaggered);
  }, []);

  // Image reveal animation
  useEffect(() => {
    imageRevealElements.current = document.querySelectorAll(".image-reveal");

    const revealImages = () => {
      imageRevealElements.current?.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const viewHeight = Math.max(
          document.documentElement.clientHeight,
          window.innerHeight
        );

        if (rect.top <= viewHeight * 0.75 && rect.bottom >= 0) {
          el.classList.add("revealed");
        }
      });
    };

    window.addEventListener("scroll", revealImages);
    revealImages(); // Initial check

    return () => window.removeEventListener("scroll", revealImages);
  }, []);

  // Magnetic button effect
  const magneticButtonRef = useCallback((node: HTMLButtonElement | null) => {
    if (node) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = node.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const strength = 15; // Adjust the magnetic strength

        node.style.transform = `translate(${x / strength}px, ${
          y / strength
        }px)`;
      };

      const handleMouseLeave = () => {
        node.style.transform = "translate(0, 0)";
      };

      node.addEventListener("mousemove", handleMouseMove);
      node.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        node.removeEventListener("mousemove", handleMouseMove);
        node.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  // Ripple effect for buttons
  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  // Tilt effect
  const tiltElementRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = node.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const tiltX = (centerY - y) / 20;
        const tiltY = (x - centerX) / 20;

        node.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      };

      const handleMouseLeave = () => {
        node.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
      };

      node.addEventListener("mousemove", handleMouseMove);
      node.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        node.removeEventListener("mousemove", handleMouseMove);
        node.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Add offset for header

      // Find the section that is currently in view
      const sections = navLinks.map((link) => {
        const element = document.getElementById(link.id);
        if (!element) return { id: link.id, position: 0, height: 0 };

        const rect = element.getBoundingClientRect();
        return {
          id: link.id,
          position: rect.top + window.pageYOffset,
          height: rect.height,
        };
      });

      // Find the section that is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].position) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navLinks]);

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset form status after 3 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }, 1500);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (aboutRef.current && aboutTitleRef.current) {
      const aboutSection = aboutRef.current;
      const aboutTitle = aboutTitleRef.current;
      const aboutSectionTop = aboutSection.offsetTop;
      const triggerPoint = aboutSectionTop - 300;

      if (scrollY > triggerPoint) {
        const progress = Math.min(1, (scrollY - triggerPoint) / 250);
        aboutTitle.style.transform = `translateY(${progress * 80}px)`;
        aboutTitle.style.opacity = `${1 - progress * 0.7}`;
        aboutTitle.style.zIndex = scrollY > triggerPoint + 120 ? "0" : "10";
      } else {
        aboutTitle.style.transform = "translateY(0)";
        aboutTitle.style.opacity = "1";
        aboutTitle.style.zIndex = "10";
      }
    }

    // Handle the image zoom effect
    if (aboutImageRef.current) {
      const aboutImage = aboutImageRef.current;
      const aboutImageTop = aboutImage.offsetTop;
      const windowHeight = window.innerHeight;
      const triggerPoint = aboutImageTop - windowHeight;

      // Calculate how far we are into the section
      const distanceFromTrigger = Math.max(0, scrollY - triggerPoint);
      const maxDistance = windowHeight + aboutImage.offsetHeight;
      const scrollProgress = Math.min(1, distanceFromTrigger / maxDistance);

      // Start with a zoomed in view (scale 1.2) and zoom out to normal (scale 1.0)
      const scale = 1.2 - scrollProgress * 0.2;
      aboutImage.style.transform = `scale(${scale})`;
    }
  }, [scrollY]);

  // Set up intersection observer for animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Target all elements with the animate-on-scroll class
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Add this useEffect to ensure all content is visible after page load
  useEffect(() => {
    // Fallback to make all content visible after a delay in case animations don't trigger
    const timeout = setTimeout(() => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        if (!el.classList.contains("animate-in")) {
          el.classList.add("animate-in");
        }
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // Auto-rotate through team values every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTeamValue((prev) => (prev + 1) % 4);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Add this useEffect to handle the header transparency on scroll

  // Add this after the existing useEffect hooks
  useEffect(() => {
    const handleHeaderScroll = () => {
      const header = document.querySelector("header");
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleHeaderScroll);
    return () => {
      window.removeEventListener("scroll", handleHeaderScroll);
    };
  }, []);

  // Business data
  const businesses = [
    {
      id: 1,
      name: "Majestic Hall",
      image: "/business-1.webp",
      description: "Where Dreams Come True",
      link: "https://majestic-rdj.media",
      socials: {
        instagram: "https://www.instagram.com/Majestichallcle",
        facebook: "https://www.facebook.com/154478397755479",
        twitter: "#",
        website: "#",
      },
    },
    {
      id: 2,
      name: "Marigold",
      image:
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Luxury beachfront experience",
      link: "https://test1-rdj.media/",
      socials: {
        instagram: "https://www.instagram.com/marigoldcateringevents/",
        facebook: "https://www.facebook.com/MarigoldCatering",
        twitter: "#",
        website: "#",
      },
    },
    {
      id: 3,
      name: "Danny Boy's",
      image:
        "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Sophisticated cocktail bar & lounge",
      link: "https://www.dannyboyspizza.com/",
      socials: {
        instagram: "https://www.instagram.com/dannyboyspizza1991",
        facebook: "https://www.facebook.com/dannyboyspizza1991",
        twitter: "#",
        website: "#",
      },
    },
    {
      id: 4,
      name: "Harvest Table",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Farm-to-table dining experience",
      link: "/businesses/harvest",
      socials: {
        instagram: "#",
        facebook: "#",
        twitter: "#",
        website: "#",
      },
    },
  ];

  // Gallery data
  const galleryItems = [
    {
      id: 1,
      title: "LUXURY DINING",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      size: "large", // large, medium, small
      position: "top-left",
    },
    {
      id: 2,
      title: "ELEGANT SPACES",
      image:
        "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      size: "medium",
      position: "top-right",
    },
    {
      id: 3,
      title: "CRAFT COCKTAILS",
      image:
        "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      size: "small",
      position: "middle-right",
    },
    {
      id: 4,
      title: "BEACHFRONT VIEWS",
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      size: "medium",
      position: "bottom-left",
    },
    {
      id: 5,
      title: "CULINARY EXCELLENCE",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      size: "medium",
      position: "bottom-right",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "James Wilson",
      title: "Executive Chef, The Ritz-Carlton",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      quote:
        "Icon Group transformed our dining experience with their innovative approach. Their attention to detail and understanding of hospitality trends helped us create a world-class restaurant.",
      logo: "/ritz-carlton-inspired-crest.png",
    },
    {
      id: 2,
      name: "Sophia Chen",
      title: "Operations Director, Four Seasons",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      quote:
        "Working with Icon Group was seamless from start to finish. They listened to our needs and delivered a hospitality experience that exceeded all expectations. Highly recommended!",
      logo: "/abstract-seasonal-representation.png",
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      title: "F&B Manager, Hilton Hotels",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      quote:
        "Icon Group's expertise in hospitality management is unmatched. They revitalized our food and beverage program, resulting in a 40% increase in revenue and outstanding guest satisfaction.",
      logo: "/stylized-hotel-exterior.png",
    },
    {
      id: 4,
      name: "Emily Johnson",
      title: "CEO, Boutique Hotel Collection",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      quote:
        "The team at Icon Group understands the unique challenges of boutique hospitality. Their strategic guidance helped us create distinctive experiences that our guests absolutely love.",
      logo: "/elegant-boutique-hotel-emblem.png",
    },
    {
      id: 5,
      name: "David Thompson",
      title: "General Manager, Waldorf Astoria",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      quote:
        "Icon Group's consulting services transformed our approach to luxury hospitality. Their innovative ideas and flawless execution have set a new standard for excellence in our properties.",
      logo: "/Waldorf Astoria Inspired Emblem.png",
    },
    {
      id: 6,
      name: "Sarah Martinez",
      title: "Marketing Director, Marriott International",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      quote:
        "The strategic vision that Icon Group brought to our hospitality marketing was game-changing. They understand the pulse of the industry and deliver results that speak for themselves.",
      logo: "/marriott-logo-generic.png",
    },
    {
      id: 7,
      name: "Robert Kim",
      title: "Owner, Luxury Restaurant Group",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      quote:
        "Icon Group's restaurant management expertise helped us launch three successful venues in just two years. Their operational excellence and creative vision are truly exceptional.",
      logo: "/elegant-dining-emblem.png",
    },
    {
      id: 8,
      name: "Jennifer Lee",
      title: "Events Director, Peninsula Hotels",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      quote:
        "Our collaboration with Icon Group elevated our events program to new heights. Their attention to detail and innovative concepts have made us the premier destination for luxury events.",
      logo: "/elegant-hotel-crest.png",
    },
  ];

  // Team values data
  const teamValues = [
    {
      id: 1,
      title: "Career Growth",
      description:
        "Opportunities for advancement in a dynamic industry with clear paths for professional development.",
      icon: <Briefcase className="h-8 w-8 text-white" />,
      color: "bg-gradient-to-br from-black to-gray-700",
    },
    {
      id: 2,
      title: "Continuous Learning",
      description:
        "Professional development programs, workshops, and mentorship opportunities to enhance your skills.",
      icon: <GraduationCap className="h-8 w-8 text-white" />,
      color: "bg-gradient-to-br from-gray-800 to-gray-600",
    },
    {
      id: 3,
      title: "Global Exposure",
      description:
        "Work with international brands and diverse teams across multiple countries and cultures.",
      icon: <Globe className="h-8 w-8 text-white" />,
      color: "bg-gradient-to-br from-black to-gray-800",
    },
    {
      id: 4,
      title: "Work-Life Balance",
      description:
        "Flexible schedules, wellness programs, and a culture that values personal well-being and fulfillment.",
      icon: <Heart className="h-8 w-8 text-white" />,
      color: "bg-gradient-to-br from-gray-900 to-gray-700",
    },
  ];

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "George Aoun",
      title: "Co-Founder and CEO",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90byhttps://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      socials: {
        behance: "#",
        twitter: "https://www.linkedin.com/in/georgesaaoun",
        facebook: "#",
      },
    },
    {
      id: 2,
      name: "Anthony Hamilton",
      title: "Executive Chef",
      image: "/team-2.png",
      socials: {
        behance: "#",
        twitter: "https://www.linkedin.com/in/anthony-hamilton-5805013a/",
        facebook: "https://www.facebook.com/Restauranttopia/",
      },
    },
    {
      id: 3,
      name: "SARAH JOHNSON",
      title: "Operations Manager",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
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
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
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
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
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
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      socials: {
        behance: "#",
        twitter: "#",
        facebook: "#",
      },
    },
  ];

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
  ];

  // Add this useEffect for the counter animation
  useEffect(() => {
    const animateCounters = () => {
      const counters = document.querySelectorAll(".animate-count");

      counters.forEach((counter) => {
        const target = counter.getAttribute("data-target") || "0";
        let targetNum = 0;

        // Handle numbers with + sign or K+ format
        if (target.includes("+")) {
          targetNum = Number.parseInt(
            target.replace(/\+/g, "").replace(/K/g, "000")
          );
        } else if (target.includes("K")) {
          targetNum = Number.parseInt(target.replace(/K/g, "000"));
        } else if (target.includes("%")) {
          targetNum = Number.parseInt(target.replace(/%/g, ""));
        } else {
          targetNum = Number.parseInt(target);
        }

        if (isNaN(targetNum)) return;

        const duration = 3500; // 3.5 seconds
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;

        // Get suffix (like +, K+, %, etc.)
        const suffix = target.replace(/[0-9]/g, "");

        const animate = () => {
          frame++;
          const progress = frame / totalFrames;
          const currentCount = Math.round(targetNum * progress);

          if (counter.textContent !== target) {
            counter.textContent = currentCount + suffix;
          }

          if (frame < totalFrames) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      });
    };

    // Use Intersection Observer to trigger animation when section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(animateCounters, 500);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const impactSection = document.getElementById("impact");
    if (impactSection) {
      observer.observe(impactSection);
    }

    return () => {
      if (impactSection) {
        observer.unobserve(impactSection);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Now remove the cursor elements from the JSX since we're creating them dynamically // Find and remove these
      lines from the JSX: */}
      {/* Custom cursor */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      ></div>
      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`back-to-top ${showBackToTop ? "visible" : ""}`}
        aria-label="Back to top"
      >
        <ChevronDown className="h-6 w-6 transform rotate-180" />
      </button>
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md transition-all duration-300 overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-20">
            {/* Find the header section with the text logo and replace it with the image logo */}

            {/* Replace this part in the header: */}
            {/* <div className="flex items-center">
              <div className="flex items-center">
                <span className="text-white text-4xl font-bold text-gradient-animate">h</span>
                <span className="text-orange-500 ml-1 text-lg">group</span>
              </div>
            </div> */}

            {/* With this: */}
            <div className="flex items-center">
              <div className="logo-container relative">
                <Image
                  src="/logo.png"
                  alt="Icon Group Hospitality Logo"
                  width={120}
                  height={40}
                  className="logo-image"
                />
                <div className="absolute inset-0 logo-glow"></div>
              </div>
            </div>

            <nav className="hidden md:flex space-x-4 lg:space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`nav-link text-sm font-medium transition-colors underline-animation ${
                    activeSection === link.id
                      ? "text-white font-bold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </nav>

            <div className="flex items-center">
              <button
                className="md:hidden hamburger-menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <span
                  className={mobileMenuOpen ? "rotate-45 translate-y-2" : ""}
                ></span>
                <span
                  className={mobileMenuOpen ? "opacity-0" : "opacity-100"}
                ></span>
                <span
                  className={mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}
                ></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden bg-black/90 backdrop-blur-md ${
            mobileMenuOpen ? "max-h-96 border-b border-gray-800/20" : "max-h-0"
          }`}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    scrollToSection(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`nav-link text-sm font-medium transition-colors text-left py-2 ${
                    activeSection === link.id
                      ? "text-white font-bold"
                      : "text-gray-400"
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
      <main>
        {/* Hero Section with Black Background */}
        <section
          id="home"
          className="pt-20 min-h-screen flex flex-col bg-black text-white relative overflow-hidden"
        >
          {/* Animated background particles */}
          <div className="particles-bg">
            {[...Array(20)].map((_, i) => (
              <span
                key={i}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 5 + 2}px`,
                  height: `${Math.random() * 5 + 2}px`,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></span>
            ))}
          </div>

          <div className="container mx-auto px-6 py-8 md:py-16 flex-1 flex flex-col relative z-10">
            <div className="flex-1 flex flex-col justify-center items-center">
              <div className="text-center max-w-5xl mx-auto">
                <div className="mb-8">
                  <div className="inline-flex items-center text-sm mb-6">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-gray-400 tracking-wider reveal-text">
                      LUXURY HOSPITALITY MANAGEMENT
                    </span>
                  </div>
                </div>

                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter animate-on-scroll fade-in-up delay-200 mb-16">
                  <span className="text-white text-clip-animation">ICON</span>{" "}
                  <span className="text-orange-500">GROUP</span>
                  <br />
                  <span className="text-white">HOSPITALITY</span>
                </h1>

                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll fade-in-up delay-400">
                  <button
                    ref={magneticButtonRef}
                    onClick={(e) => {
                      createRipple(e);
                      scrollToSection("about");
                    }}
                    className="px-8 py-4 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-all duration-300 magnetic-button ripple-effect"
                  >
                    Discover Our Story
                  </button>
                  <button
                    onClick={(e) => {
                      createRipple(e);
                      scrollToSection("contact");
                    }}
                    className="px-8 py-4 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-black transition-colors ripple-effect btn-hover-effect"
                  >
                    Get In Touch
                  </button>
                </div>
              </div>
            </div>

            {/* Modern scroll indicator */}
            <div className="flex justify-center mt-8">
              <button
                onClick={() => scrollToSection("about")}
                className="scroll-indicator-modern group"
                aria-label="Scroll down"
              >
                <span className="text-xs uppercase tracking-wider text-gray-400 group-hover:text-white transition-colors duration-300">
                  Explore
                </span>
                <div className="mt-2 relative flex justify-center">
                  <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-1 group-hover:border-white transition-colors duration-300">
                    <div className="w-1 h-2 bg-gray-400 rounded-full animate-scroll-dot group-hover:bg-white transition-colors duration-300"></div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* About Section - Full Width with White Background */}
        <section
          id="about"
          ref={aboutRef}
          className="relative py-16 bg-white border-t border-gray-100 section-reveal overflow-hidden"
        >
          {/* Background design elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-orange-500/5 blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-black/5 blur-3xl"></div>
            <div className="absolute top-1/4 right-1/4 w-20 h-20 rounded-full border-2 border-orange-500/20"></div>
            <div className="absolute bottom-1/3 left-1/3 w-32 h-32 rounded-full border border-black/10"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-black/5 rotate-45 transform"></div>
            <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-orange-500/5 rounded-full"></div>
          </div>

          <h2
            ref={aboutTitleRef}
            className="text-6xl md:text-8xl font-bold tracking-tighter text-center mb-12 transition-all duration-300 ease-out"
          >
            ABOUT US
          </h2>

          {/* Full width image container with zoom effect */}
          <div
            ref={aboutImageRef}
            className="w-full h-[60vh] overflow-hidden relative transition-transform duration-700 ease-out image-reveal"
            style={{ transformOrigin: "center center" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
              alt="Luxury hotel lobby representing Icon Group Hospitality"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-70"></div>
          </div>

          {/* Content section */}
          <div className="container mx-auto px-6 mt-10 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="prose prose-lg max-w-none">
                <h3 className="text-4xl md:text-5xl font-bold mb-8 animate-on-scroll fade-in-up tracking-tight text-reveal-scroll">
                  <span>ELEVATING THE STANDARD OF LUXURY HOSPITALITY</span>
                </h3>

                <div className="relative">
                  <span className="absolute -left-8 top-0 text-6xl text-orange-500/10 font-serif">
                    "
                  </span>
                  <p className="text-xl md:text-2xl leading-relaxed mb-8 animate-on-scroll fade-in-up max-w-3xl mx-auto">
                    Icon Group Hospitality is a premier management and
                    consulting firm dedicated to transforming venues into
                    exceptional destinations that leave lasting impressions.
                  </p>
                  <span className="absolute -right-8 bottom-0 text-6xl text-orange-500/10 font-serif">
                    "
                  </span>
                </div>

                <p className="text-lg md:text-xl leading-relaxed mb-8 animate-on-scroll fade-in-up delay-100 max-w-3xl mx-auto">
                  With decades of combined experience, our team brings
                  unparalleled expertise to every project. We thrive on finding{" "}
                  <span className="italic">"unexpected solutions"</span> and
                  believe that with the right perspective, hospitality can
                  elevate the human experience.
                </p>

                <div className="mt-10 animate-on-scroll fade-in-up delay-200 relative">
                  <div className="h-px w-24 bg-orange-500 mx-auto mb-8"></div>
                  <div className="flex items-center justify-center space-x-2 mb-6">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                  <p className="text-lg font-medium relative inline-block">
                    <span className="bg-gradient-to-r from-black via-orange-500 to-black bg-[length:200%_2px] bg-no-repeat bg-bottom pb-1">
                      Our comprehensive approach encompasses everything from
                      concept development and operational strategy to staff
                      training and marketing.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Businesses We Own Section */}
        <section
          id="businesses"
          className="py-24 bg-white border-t border-gray-100 section-reveal"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-6xl md:text-7xl font-bold tracking-tighter text-center mb-24 animate-on-scroll fade-in-up">
              BUSINESSES WE OWN
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 stagger-children">
              {businesses.map((business, index) => (
                <div
                  key={business.id}
                  className={`group relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500 hover:shadow-3xl animate-on-scroll fade-in-up delay-${
                    index * 100
                  } hover-card tilt-element`}
                  ref={tiltElementRef}
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden zoom-on-hover">
                    <Image
                      src={business.image || "/placeholder.svg"}
                      alt={business.name}
                      width={800}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
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
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section
          id="gallery"
          className="py-24 bg-white border-t border-gray-100 section-reveal"
        >
          <div className="container mx-auto px-6 mb-16">
            <h2 className="text-6xl md:text-7xl font-bold tracking-tighter text-center mb-24 animate-on-scroll fade-in-up">
              OUR GALLERY
            </h2>
          </div>

          <div className="gallery-grid">
            {/* Large image - top left */}
            {/* Update the gallery section to work with the new animations
            // Find the gallery section and update the image containers

            // For the large image - top left */}
            <div className="gallery-item gallery-item-large-left relative overflow-hidden group animate-on-scroll fade-in image-reveal">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Luxury restaurant interior"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <span className="inline-block px-3 py-1 bg-orange-500 text-white text-xs uppercase tracking-wider mb-3 rounded-sm">
                  Featured
                </span>
                <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">
                  Luxury Dining Experience
                </h3>
                <p className="text-white/90 max-w-md mb-4 drop-shadow-sm">
                  Our flagship restaurant offers an unparalleled dining
                  experience with world-class cuisine and impeccable service.
                </p>
                <Link
                  href="/gallery"
                  className="inline-flex items-center text-white text-sm border-b border-white/50 hover:border-white transition-all duration-300 pb-1 group"
                >
                  View Details
                  <ArrowUpRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>

            {/* Update the other gallery items similarly by removing the old overlay divs and keeping just the content */}
            {/* Medium image - top right */}
            <div className="gallery-item gallery-item-medium-right relative overflow-hidden group animate-on-scroll fade-in delay-100 image-reveal">
              <Image
                src="https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Elegant hotel lobby"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-75">
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
                    Elegant Spaces
                  </h3>
                  <p className="text-white/90 text-sm drop-shadow-sm">
                    Thoughtfully designed interiors that blend luxury with
                    comfort.
                  </p>
                </div>
              </div>
            </div>

            {/* Small image - middle right */}
            <div className="gallery-item gallery-item-small-right relative overflow-hidden group animate-on-scroll fade-in delay-200 image-reveal">
              <Image
                src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Craft cocktail"
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-100">
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
                    Craft Cocktails
                  </h3>
                  <p className="text-white/90 text-sm drop-shadow-sm">
                    Artisanal beverages crafted by expert mixologists.
                  </p>
                </div>
              </div>
            </div>

            {/* Medium image - bottom left */}
            <div className="gallery-item gallery-item-medium-left relative overflow-hidden group animate-on-scroll fade-in delay-300 image-reveal">
              <Image
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Beachfront resort"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-125">
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
                    Beachfront Views
                  </h3>
                  <p className="text-white/90 text-sm drop-shadow-sm">
                    Breathtaking oceanfront locations for unforgettable
                    experiences.
                  </p>
                </div>
              </div>
            </div>

            {/* Medium image - bottom right */}
            <div className="gallery-item gallery-item-medium-right-bottom relative overflow-hidden group animate-on-scroll fade-in delay-400 image-reveal">
              <Image
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by-wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Gourmet dish"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-150">
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
                    Culinary Excellence
                  </h3>
                  <p className="text-white/90 text-sm drop-shadow-sm">
                    Exquisite dishes prepared by award-winning chefs using the
                    finest ingredients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-24 bg-white border-t border-gray-100 section-reveal overflow-x-hidden"
        >
          <div className="container mx-auto px-4 sm:px-6 mb-16 overflow-hidden">
            <h2 className="text-6xl md:text-7xl font-bold tracking-tighter text-center animate-on-scroll fade-in-up">
              TRUSTED BY
              <br />
              INTERNATIONAL BRANDS
            </h2>
          </div>

          {/* First row - moving right */}
          <div className="testimonial-row-right mb-8">
            <div className="testimonial-track-right">
              {testimonials.slice(0, 4).map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="testimonial-card hover-card"
                >
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
                      <h3 className="font-bold text-lg text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {testimonial.title}
                      </p>
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
                  <p className="text-gray-700 text-base">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
              {testimonials.slice(0, 4).map((testimonial) => (
                <div
                  key={`duplicate-${testimonial.id}`}
                  className="testimonial-card hover-card"
                >
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
                      <h3 className="font-bold text-lg text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {testimonial.title}
                      </p>
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
                  <p className="text-gray-700 text-base">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Second row - moving left */}
          <div className="testimonial-row-left">
            <div className="testimonial-track-left">
              {testimonials.slice(4, 8).map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="testimonial-card hover-card"
                >
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
                      <h3 className="font-bold text-lg text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {testimonial.title}
                      </p>
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
                  <p className="text-gray-700 text-base">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
              {testimonials.slice(4, 8).map((testimonial) => (
                <div
                  key={`duplicate-${testimonial.id}`}
                  className="testimonial-card hover-card"
                >
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
                      <h3 className="font-bold text-lg text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {testimonial.title}
                      </p>
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
                  <p className="text-gray-700 text-base">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Employment Section */}
        <section
          id="employment"
          className="py-24 bg-white overflow-hidden border-t border-gray-100 section-reveal subtle-bg-animation relative"
        >
          {/* Background design elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-orange-500/5 blur-3xl"></div>
            <div className="absolute bottom-40 right-[5%] w-80 h-80 rounded-full bg-black/5 blur-3xl"></div>

            {/* Animated floating elements */}
            <div className="absolute top-[15%] right-[15%] w-16 h-16 rounded-full border border-orange-500/20 animate-float-slow"></div>
            <div className="absolute bottom-[25%] left-[20%] w-24 h-24 rounded-full border border-black/10 animate-float-medium"></div>
            <div className="absolute top-[40%] left-[10%] w-12 h-12 bg-black/5 rotate-45 transform animate-float-fast"></div>
            <div className="absolute bottom-[30%] right-[25%] w-20 h-20 bg-orange-500/5 rounded-full animate-float-medium"></div>

            {/* Decorative lines */}
            <div className="absolute top-0 left-[30%] w-px h-40 bg-gradient-to-b from-transparent via-orange-500/20 to-transparent"></div>
            <div className="absolute top-0 right-[40%] w-px h-60 bg-gradient-to-b from-transparent via-black/10 to-transparent"></div>
            <div className="absolute bottom-0 left-[60%] w-px h-40 bg-gradient-to-t from-transparent via-orange-500/20 to-transparent"></div>
            <div className="absolute bottom-0 right-[20%] w-px h-60 bg-gradient-to-t from-transparent via-black/10 to-transparent"></div>

            {/* Decorative dots */}
            <div className="absolute top-[20%] left-[80%] flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-orange-500/40"></div>
              <div className="w-2 h-2 rounded-full bg-black/20"></div>
              <div className="w-2 h-2 rounded-full bg-orange-500/40"></div>
            </div>
            <div className="absolute bottom-[15%] left-[10%] flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-black/20"></div>
              <div className="w-2 h-2 rounded-full bg-orange-500/40"></div>
              <div className="w-2 h-2 rounded-full bg-black/20"></div>
            </div>
          </div>
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-6xl md:text-7xl font-bold tracking-tighter mb-16 animate-on-scroll fade-in-up">
                WORK WITH US
              </h2>

              {/* Why Join Our Team - Interactive Section */}
              <div className="mb-24 animate-on-scroll fade-in-up delay-100">
                <h3 className="text-2xl font-semibold mb-8">
                  WHY JOIN OUR TEAM?
                </h3>

                {/* Interactive value cards */}
                <div className="grid grid-cols-4 gap-2 mb-8 stagger-children">
                  {teamValues.map((value, index) => (
                    <button
                      key={value.id}
                      onClick={() => setActiveTeamValue(index)}
                      className={`py-3 px-2 rounded-t-lg transition-all duration-300 ${
                        activeTeamValue === index
                          ? `${value.color} text-white font-medium`
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {value.title}
                    </button>
                  ))}
                </div>

                {/* Active value content */}
                <div
                  className={`p-8 rounded-lg mb-12 transition-all duration-500 ${teamValues[activeTeamValue].color}`}
                >
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 float-element">
                      {teamValues[activeTeamValue].icon}
                    </div>
                    <div className="text-left">
                      <h4 className="text-2xl font-bold text-white mb-3">
                        {teamValues[activeTeamValue].title}
                      </h4>
                      <p className="text-white/90 text-lg">
                        {teamValues[activeTeamValue].description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Update the JOIN OUR TEAM button to redirect to contact section */}
                <button
                  onClick={() => scrollToSection("contact")}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-black rounded-full overflow-hidden transition-all duration-300 hover:bg-gray-900 btn-hover-effect"
                >
                  <span className="relative z-10 flex items-center">
                    JOIN OUR TEAM
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                </button>
              </div>

              {/* 3. Replace the "Connect with us" section with just larger social icons */}
              <div className="social-icons-container mt-16 animate-on-scroll fade-in-up delay-600">
                <div className="flex justify-center space-x-6">
                  <Link
                    href="#"
                    className="employment-social-icon"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-8 w-8" />
                  </Link>
                  <Link
                    href="#"
                    className="employment-social-icon"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-8 w-8" />
                  </Link>
                  <Link
                    href="#"
                    className="employment-social-icon"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-8 w-8" />
                  </Link>
                  <Link
                    href="#"
                    className="employment-social-icon"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-8 w-8" />
                  </Link>
                  <Link
                    href="#"
                    className="employment-social-icon"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-8 w-8" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members Section */}
        <section
          id="team"
          className="py-24 bg-white border-t border-gray-100 section-reveal"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-6xl md:text-7xl font-bold tracking-tighter text-center mb-24 animate-on-scroll fade-in-up">
              OUR TEAM
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
              {teamMembers.slice(0, 3).map((member, index) => (
                <div
                  key={member.id}
                  className={`team-member-card group relative overflow-hidden animate-on-scroll fade-in-up delay-${
                    index * 100
                  } transform transition-all duration-700 hover:-translate-y-6 hover:shadow-2xl rounded-lg`}
                >
                  <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={600}
                      height={800}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient overlay that appears on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Content that slides up on hover */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <p className="text-white/80 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {member.title}
                      </p>
                      <h3 className="text-3xl font-bold text-white mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                        {member.name}
                      </h3>
                      <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                        <Link
                          href={member.socials.behance}
                          aria-label="Behance"
                          className="team-social-icon bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
                        >
                          <span className="font-bold text-white text-sm">
                            Be
                          </span>
                        </Link>
                        <Link
                          href={member.socials.twitter}
                          aria-label="Twitter"
                          className="team-social-icon bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
                        >
                          <Twitter className="h-4 w-4 text-white" />
                        </Link>
                        <Link
                          href={member.socials.facebook}
                          aria-label="Facebook"
                          className="team-social-icon bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
                        >
                          <Facebook className="h-4 w-4 text-white" />
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
          className="py-24 bg-gray-900 text-white border-t border-gray-800 section-reveal relative overflow-hidden"
        >
          {/* Background design elements */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-orange-500/10 blur-3xl"></div>
            <div className="absolute bottom-40 right-[5%] w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute top-[40%] left-[10%] w-12 h-12 bg-white/10 rotate-45 transform"></div>
            <div className="absolute bottom-[30%] right-[25%] w-20 h-20 bg-orange-500/10 rounded-full"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-6xl md:text-7xl font-bold tracking-tighter text-center mb-24 animate-on-scroll fade-in-up">
              OUR IMPACT
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 stagger-children">
              {impactStats.map((stat, index) => (
                <div
                  key={stat.id}
                  className={`impact-card bg-gray-800/50 backdrop-blur-sm animate-on-scroll fade-in-up delay-${
                    index * 200
                  }`}
                >
                  <div className="impact-number-container">
                    <span
                      className="text-6xl md:text-7xl impact-number animate-count"
                      data-target={stat.number}
                    >
                      0
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 impact-label text-white/90">
                    {stat.label}
                  </h3>
                  <p className="text-gray-300 impact-description">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-24 max-w-3xl mx-auto text-center animate-on-scroll fade-in-up">
              <p className="text-xl text-gray-300">
                Our commitment to excellence has transformed the hospitality
                landscape across the globe, setting new standards for luxury,
                service, and innovation.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-24 bg-white border-t border-gray-100 section-reveal"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-6xl md:text-7xl font-bold tracking-tighter text-center mb-24 animate-on-scroll fade-in-up">
              GET IN TOUCH
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              {/* Contact Form */}
              <div className="animate-on-scroll fade-in-up">
                <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="form-input-animation">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="form-input-animation">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                      placeholder="Your email address"
                    />
                  </div>

                  <div className="form-input-animation">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Business Proposal">
                        Business Proposal
                      </option>
                      <option value="Career Opportunity">
                        Career Opportunity
                      </option>
                      <option value="Media Request">Media Request</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-input-animation">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                      placeholder="Your message"
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-black rounded-md overflow-hidden transition-all duration-300 hover:bg-gray-900 w-full ripple-effect"
                      onClick={createRipple}
                    >
                      <span className="relative z-10 flex items-center">
                        {formStatus === "submitting" ? (
                          <span className="loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                          </span>
                        ) : formStatus === "success" ? (
                          "Message Sent!"
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                          </>
                        )}
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Contact Information and Map */}
              <div className="animate-on-scroll fade-in-up delay-200">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                <div className="space-y-8 mb-12 stagger-children">
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Address</h4>
                      <p className="text-gray-600">
                        123 Fifth Avenue
                        <br />
                        New York, NY 10010
                        <br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Email</h4>
                      <p className="text-gray-600">
                        info@icongrouphospitality.com
                      </p>
                      <p className="text-gray-600">
                        careers@icongrouphospitality.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Phone</h4>
                      <p className="text-gray-600">+1 (212) 555-0123</p>
                      <p className="text-gray-600">+1 (212) 555-0124</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Business Hours</h4>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM
                      </p>
                      <p className="text-gray-600">
                        Saturday: 10:00 AM - 4:00 PM
                      </p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="rounded-lg overflow-hidden h-80 relative image-reveal">
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <Image
                      src="/nyc-street-map.png"
                      alt="Map location of Icon Group Hospitality"
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black text-white px-4 py-2 rounded-md">
                        Interactive Map Loading...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <NewsletterSection createRipple={createRipple} />

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
                  Elevating the standard of luxury hospitality through
                  innovative management and consulting services.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-gray-800 hover:bg-orange-500 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-800 hover:bg-orange-500 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-800 hover:bg-orange-500 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-800 hover:bg-orange-500 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300"
                    aria-label="LinkedIn"
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
                    <button
                      onClick={() => scrollToSection("home")}
                      className="text-gray-400 hover:text-orange-500 transition-colors flex items-center group"
                    >
                      <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Home
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("about")}
                      className="text-gray-400 hover:text-orange-500 transition-colors flex items-center group"
                    >
                      <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      About Us
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("businesses")}
                      className="text-gray-400 hover:text-orange-500 transition-colors flex items-center group"
                    >
                      <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Businesses
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("gallery")}
                      className="text-gray-400 hover:text-orange-500 transition-colors flex items-center group"
                    >
                      <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Gallery
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("team")}
                      className="text-gray-400 hover:text-orange-500 transition-colors flex items-center group"
                    >
                      <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Team
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="text-gray-400 hover:text-orange-500 transition-colors flex items-center group"
                    >
                      <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Contact
                    </button>
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

            {/* Divider */}
            <div className="border-t border-gray-800 pt-8 pb-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-gray-500 text-sm mb-4 md:mb-0">
                  <p>
                    &copy; {new Date().getFullYear()} Icon Group Hospitality.
                    All rights reserved.
                  </p>
                  <p className="mt-1">
                    Powered by{" "}
                    <span className="text-orange-500 font-medium">
                      RDJ MEDIA
                    </span>
                  </p>
                </div>
                <div className="flex space-x-6 text-gray-500 text-sm">
                  <button className="hover:text-orange-500 transition-colors underline-animation">
                    Privacy Policy
                  </button>
                  <button className="hover:text-orange-500 transition-colors underline-animation">
                    Terms of Service
                  </button>
                  <button className="hover:text-orange-500 transition-colors">
                    Sitemap
                  </button>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
