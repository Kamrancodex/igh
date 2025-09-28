"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("token", data.token);
        toast.success("Logged in successfully");
        router.replace("/dashboard");
      } else {
        toast.error(data.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden font-sans">
      {/* Background Text Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="flex items-center justify-center w-full gap-[30vw]">
          {/* RDJ Text */}
          <div className="text-right">
            <h1 className="text-[20vw] font-black text-[#4475F2]/[0.07] tracking-tighter">
              RDJ
            </h1>
          </div>
          {/* MEDIA Text */}
          <div className="text-left">
            <h1 className="text-[20vw] font-black text-[#4475F2]/[0.07] tracking-tighter">
              MEDIA
            </h1>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-[400px] relative bg-white p-8 rounded-3xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.07)] z-10">
        <div>
          <h2 className="mt-2 text-center text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            Sign in to access your dashboard
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4475F2] focus:border-[#4475F2] transition-all duration-200"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4475F2] focus:border-[#4475F2] transition-all duration-200"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-medium rounded-xl text-white ${
                isLoading
                  ? "bg-[#4475F2]/70 cursor-not-allowed"
                  : "bg-[#4475F2] hover:bg-[#2952c8]"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4475F2] transition-all duration-200 shadow-lg shadow-[#4475F2]/[0.15] hover:shadow-xl hover:shadow-[#4475F2]/[0.20]`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Powered by{" "}
            <span className="font-semibold text-[#4475F2]">RDJ MEDIA</span>
          </p>
        </div>
      </div>
    </div>
  );
}
