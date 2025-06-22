"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const pathname = usePathname();
  const hideNavbarRoutes = ["/login", "/signup", "/forgot-password"];
  if (hideNavbarRoutes.includes(pathname)) return null;

  return (
    <nav className="flex items-center justify-between sm:justify-evenly p-4 bg-white shadow-sm fixed top-0 left-0 w-full z-50 border-b">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/Logo.png"
            alt="Trayvio Logo"
            width={60}
            height={60}
            className="mr-2"
          />
        </Link>
      </div>
      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-2">
        <Link href="/signup?vendor=true">
          <Button
            variant="outline"
            className="border border-primary text-primary font-semibold rounded-full px-5 py-2 hover:bg-primary hover:text-white transition"
          >
            Become a vendor
          </Button>
        </Link>
        <span className="mx-1 h-6 border-l border-gray-200" />
        <Link href="/login">
          <Button
            variant="ghost"
            className="text-base font-medium px-4 rounded-full"
          >
            Login or Signup
          </Button>
        </Link>
      </div>
      {/* Dropdown for mobile */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="w-6 h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44 mt-2">
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/signup?vendor=true" className="w-full">
                Become a vendor
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/login" className="w-full">
                Login or Signup
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
