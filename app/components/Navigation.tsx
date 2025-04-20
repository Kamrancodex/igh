import Link from "next/link";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "#about", label: "ABOUT" },
  { href: "#businesses", label: "BUSINESSES" },
  { href: "#gallery", label: "GALLERY" },
  { href: "#testimonials", label: "TESTIMONIALS" },
  { href: "#team", label: "TEAM" },
  { href: "#work-with-us", label: "WORK WITH US" },
  { href: "#impact", label: "IMPACT" },
  { href: "#contact", label: "CONTACT" },
];

export default function Navigation() {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="nav-link text-sm font-medium transition-colors underline-animation text-gray-500 hover:text-black"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
