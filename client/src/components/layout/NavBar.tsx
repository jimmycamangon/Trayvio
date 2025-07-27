"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
        {user ? (
          <>
            <span className="text-sm font-medium text-gray-700">
              Hi, {user.fullName}
            </span>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-base font-medium px-4 rounded-full gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/cater/login">
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
          </>
        )}
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
            {user && (
              <>
                <DropdownMenuItem className="pointer-events-none">
                  <span className="text-sm font-medium">Hi, {user.fullName}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem asChild>
              <Link href="/cater/login" className="w-full">
                Become a vendor
              </Link>
            </DropdownMenuItem>
            {user ? (
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem asChild>
                <Link href="/login" className="w-full">
                  Login or Signup
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}