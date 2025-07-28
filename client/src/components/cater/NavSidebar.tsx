"use client";
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Utensils, 
  Wallet, 
  BarChart, 
  Settings, 
  HelpCircle,
  ChevronDown,
  X 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavSidebar({ 
  mobileOpen, 
  setMobileOpen 
}: { 
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    reservations: false,
    menu: false,
    financial: false,
  });

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const hideNav = pathname === "/cater/login" || pathname === "/cater/signup";

  if (hideNav) return null;

  // Navigation links with sub-items
  const navItems = [
    {
      href: "/cater",
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      subItems: []
    },
    {
      icon: <CalendarCheck className="h-5 w-5" />,
      label: "Reservations",
      subItems: [
        { href: "/cater/reservations/upcoming", label: "Upcoming" },
        { href: "/cater/reservations/pending", label: "Pending Requests" },
        { href: "/cater/reservations/past", label: "Past Events" },
      ]
    },
    {
      icon: <Utensils className="h-5 w-5" />,
      label: "Menu",
      subItems: [
        { href: "/cater/menu/builder", label: "Menu Builder" },
        { href: "/cater/menu/categories", label: "Categories" },
        { href: "/cater/menu/insights", label: "Popular Items" },
      ]
    },
    {
      icon: <Wallet className="h-5 w-5" />,
      label: "Financial",
      subItems: [
        { href: "/cater/financial/earnings", label: "Earnings" },
        { href: "/cater/financial/payouts", label: "Payouts" },
      ]
    },
    {
      href: "/cater/analytics",
      icon: <BarChart className="h-5 w-5" />,
      label: "Analytics",
      subItems: []
    },
    {
      href: "/cater/settings",
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      subItems: []
    }
  ];

  // Render function for navigation items
  const renderNavItem = (item: typeof navItems[0]) => (
    <div key={item.label} className="space-y-1">
      {item.subItems.length > 0 ? (
        // Parent items with dropdown
        <button
          onClick={() => toggleSection(item.label.toLowerCase())}
          className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
            pathname.startsWith(`/cater/${item.label.toLowerCase()}`) 
              ? 'bg-primary/10 dark:bg-primary/10 text-primary dark:text-primary-foreground' 
              : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          <div className="flex items-center gap-3">
            {item.icon}
            <span>{item.label}</span>
          </div>
          <ChevronDown 
            className={`h-4 w-4 transition-transform duration-200 ${
              expandedSections[item.label.toLowerCase()] ? 'rotate-180' : ''
            }`}
          />
        </button>
      ) : (
        // Single items without dropdown
        <Link
          href={item.href!}
          onClick={() => setMobileOpen(false)}
          className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
            pathname === item.href 
              ? 'bg-primary/10 dark:bg-primary/10 text-primary dark:text-primary-foreground' 
              : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      )}
      
      {/* Animated dropdown */}
      {item.subItems.length > 0 && (
        <AnimatePresence>
          {expandedSections[item.label.toLowerCase()] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pl-10 space-y-1 mt-1">
                {item.subItems.map(subItem => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-2 text-sm rounded-lg transition-colors ${
                      pathname === subItem.href 
                        ? 'text-primary dark:text-primary-foreground font-medium' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />
      
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 p-4 z-30 md:hidden transition-transform ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button 
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-8 p-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Trayvio Vendor</h2>
        </div>

        <nav className="space-y-2">
          {navItems.map(renderNavItem)}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-4 flex flex-col h-screen sticky top-0">
          <div className="mb-8 p-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Trayvio Vendor</h2>
          </div>
          <nav className="space-y-2 flex-1">
            {navItems.map(renderNavItem)}
          </nav>
          <div className="mt-auto pt-4">
            <Link
              href="/cater/support"
              className="flex items-center gap-3 p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
            >
              <HelpCircle className="h-5 w-5" />
              <span>Support</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}