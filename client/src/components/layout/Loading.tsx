"use client";

import { LoaderPinwheel } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Loading() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <LoaderPinwheel className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }
  return null; // or a fallback UI
}
