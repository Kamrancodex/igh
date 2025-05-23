"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/businesses");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-gray-600">Redirecting to businesses...</div>
    </div>
  );
}
