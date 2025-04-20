"use client";

import { Send } from "lucide-react";
import { useState } from "react";

interface NewsletterFormProps {
  createRipple: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function NewsletterForm({ createRipple }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        throw new Error("Failed to subscribe");
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <input
          type="email"
          id="newsletter-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2.5 bg-gray-800/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
          required
        />
        <button
          type="submit"
          onClick={createRipple}
          disabled={status === "submitting"}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-500 hover:bg-orange-600 rounded-md transition-colors duration-300"
        >
          {status === "submitting" ? (
            <span className="loading-dots-sm">
              <span></span>
              <span></span>
              <span></span>
            </span>
          ) : status === "success" ? (
            "Subscribed!"
          ) : status === "error" ? (
            "Try Again"
          ) : (
            <Send className="h-4 w-4 text-white" />
          )}
        </button>
      </div>
    </form>
  );
}
