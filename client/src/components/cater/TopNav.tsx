"use client";
import { Menu, LogOut, Sun, Moon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

export default function TopNav({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

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
    <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 p-4">
      <div className="flex items-center justify-between">
        {/* Hamburger menu (mobile only) */}
        <button 
          onClick={toggleSidebar} 
          className="md:hidden p-2 -ml-2 text-gray-700 dark:text-gray-300"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="flex items-center gap-4">
          {/* Theme Toggler */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
          </button>

          {/* Profile (placeholder) */}
          <div className="hidden md:block text-gray-700 dark:text-gray-300 font-sans">
            {user?.fullName || "Profile"}
          </div>
        </div>

        <Button
          onClick={handleLogout}
          variant="ghost"
          className="text-base font-sans font-medium px-4 rounded-full gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}