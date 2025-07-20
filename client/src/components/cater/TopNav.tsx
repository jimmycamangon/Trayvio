"use client";
import { Menu, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function TopNav({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const hideNav = pathname === "/cater/login" || pathname === "/cater/signup";
  if (hideNav) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white border-b p-4">
      <div className="flex items-center justify-between">
        {/* Hamburger menu (mobile only) */}
        <button onClick={toggleSidebar} className="md:hidden p-2 -ml-2">
          <Menu className="h-6 w-6" />
        </button>

        {/* Other nav items */}
        <div className="hidden md:block">Search/Notifications</div>
        <div>Profile</div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="text-base font-medium px-4 rounded-full gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
