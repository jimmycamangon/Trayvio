"use client";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import NavSidebar from "@/components/cater/NavSidebar";
import TopNav from "@/components/cater/TopNav";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function CaterLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  
  // Check if this is an auth page (login/signup)
  const isAuthPage = pathname.includes('/cater/login') || pathname.includes('/cater/signup');

  // For auth pages, render without the dark theme layout
  if (isAuthPage) {
    return (
      <ThemeProvider>
        {children}
      </ThemeProvider>
    );
  }

  // For other cater pages, render with the full dark theme layout
  return (
    <ThemeProvider>
      <div className="flex min-h-screen font-sans">
        {/* Combined Responsive Sidebar */}
        <NavSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Navigation now controls the sidebar */}
          <TopNav toggleSidebar={() => setMobileOpen(true)} />

          {/* Content */}
          <main className="flex-1 p-4 md:p-6 bg-gray-50 dark:bg-gray-900 mt-16 md:mt-0">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
