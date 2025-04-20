"use client";

import { Send } from "lucide-react";
import { useState } from "react";

interface ContactFormProps {
  createRipple: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ContactForm({ createRipple }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        setTimeout(() => {
          setFormStatus("idle");
        }, 3000);
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setFormStatus("error");

      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }
  };

  return (
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
          <option value="Business Proposal">Business Proposal</option>
          <option value="Career Opportunity">Career Opportunity</option>
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
            ) : formStatus === "error" ? (
              "Failed to send. Try again."
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
  );
}
