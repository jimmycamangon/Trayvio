"use client";
import { ReactNode, useState } from "react";
import NavSidebar from "@/components/cater/NavSidebar";
import TopNav from "@/components/cater/TopNav";

export default function CaterLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Combined Responsive Sidebar */}
      <NavSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation now controls the sidebar */}
        <TopNav toggleSidebar={() => setMobileOpen(true)} />

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 bg-gray-50 mt-16 md:mt-0">
          {children}
        </main>
      </div>
    </div>
  );
}