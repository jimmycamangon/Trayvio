"use client";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function NavSidebar({ 
  mobileOpen, 
  setMobileOpen 
}: { 
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const hideNav = pathname === "/cater/login" || pathname === "/cater/signup";

  if (hideNav) {
    return null;
  }

  // const links = [
  //   { href: "/cater", icon: <Home className="h-5 w-5" />, label: "Dashboard" },
  //   { href: "/cater/bookings", icon: <Calendar className="h-5 w-5" />, label: "Bookings" },
  //   { href: "/cater/menus", icon: <Utensils className="h-5 w-5" />, label: "Menus" },
  // ];

  return (
    <>
      {/* Mobile Overlay with Fade Animation */}
      <div 
        className={`fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />
      
      {/* Mobile Sidebar with Slide Animation */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white p-4 z-30 md:hidden transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button 
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-8 p-2">
          <h2 className="text-xl font-bold">Trayvio Vendor</h2>
        </div>

        <nav className="space-y-1">
          {/* {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                pathname === link.href 
                  ? 'bg-purple-50 text-purple-600' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))} */}
        </nav>
      </div>

      {/* Static Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-white border-r p-4">
        <div className="mb-8 p-2">
          <h2 className="text-xl font-bold">Trayvio Vendor</h2>
        </div>
        <nav className="space-y-1">
          {/* {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                pathname === link.href 
                  ? 'bg-purple-50 text-purple-600' 
                  : 'hover:bg-gray-50'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))} */}
        </nav>
      </div>
    </>
  );
}