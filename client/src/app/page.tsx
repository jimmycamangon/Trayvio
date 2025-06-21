"use client";

import { Vendor } from "@/types/vendor";
import { GetVendors } from "@/lib/api/axios";
import { useState, useEffect } from "react";
import CaterCard from "@/components/layout/CaterCard";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  const [vendors, setVendor] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const vendors = await GetVendors();
        setVendor(vendors);
      } catch (error) {
        console.error("Failed to fetch vendors:", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  return (
    // Home Section
    <main className="min-h-screen">
      <section className="min-h-screen flex-col items-center justify-between p-2 m-12 md:p-8 lg:p-12">
        <div className="pt-6">
          {/* <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left mt-6 mb-6">
            Your Event. Their Food. Our Platform.
          </h1> */}
          <p className="text-sm sm:text-base md:text-lg font-bold text-left mt-6">
            {/* Discover and book the best catering for your next event. */}
            Popular in Manila
          </p>

          {loading ? (
            <div className="w-full">
              {/* Mobile: Single skeleton (centered) */}
              <div className="block md:hidden mx-auto max-w-[400px]">
                <div className="bg-white p-4 space-y-3 rounded-lg animate-pulse">
                  <Skeleton className="h-60 w-full rounded-lg" />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </div>

              {/* Desktop: Multiple skeletons */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 space-y-3 rounded-lg animate-pulse"
                  >
                    <Skeleton className="h-60 w-full rounded-lg" />
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="container mx-auto px-4 py-8 text-base-content">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Error loading vendors
                    </h3>
                    <p className="mt-1 text-sm text-red-700">{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-2 text-sm text-red-600 hover:text-red-500"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : vendors.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <svg
                className="w-16 h-16 text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 48 48"
              >
                <circle cx="24" cy="24" r="20" strokeWidth="4" />
                <path
                  d="M16 32h16M16 24h16M16 16h16"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                No Vendors Yet
              </h2>
              <p className="text-gray-500 mb-4 text-center">
                We’re working hard to bring you the best caterers.
                <br />
                Please check back soon!
              </p>
            </div>
          ) : (
            <Carousel
              opts={{
                align: "start",
                dragFree: false, // Allows partial scrolling
              }}
              className="w-full relative"
            >
              <CarouselContent className="flex gap-2 md:gap-4">
                {vendors.map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="basis-[85%] md:basis-1/2 lg:basis-1/3" // 85% width on mobile
                  >
                    <div className="p-1 h-full">
                      <CaterCard vendor={item} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Hide arrows on mobile */}
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          )}
        </div>
      </section>
    </main>
  );
}
