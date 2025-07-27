"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  isInitialized: boolean;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem("cater-theme") as Theme;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // For cater section, default to dark if no preference is saved
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "dark");
    setTheme(initialTheme);
    
    // Apply theme immediately to prevent flash, but only for cater section
    requestAnimationFrame(() => {
      const isCaterSection = window.location.pathname.startsWith('/cater');
      const isAuthPage = window.location.pathname.includes('/cater/login') || 
                        window.location.pathname.includes('/cater/signup');
      
      if (isCaterSection && !isAuthPage) {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(initialTheme);
      } else {
        // Remove dark theme classes when not in cater section
        document.documentElement.classList.remove("light", "dark");
      }
      setIsInitialized(true);
    });
  }, []);

  // Cleanup theme classes when component unmounts
  useEffect(() => {
    return () => {
      // Remove dark theme classes when leaving cater section
      const isCaterSection = window.location.pathname.startsWith('/cater');
      if (!isCaterSection) {
        document.documentElement.classList.remove("light", "dark");
      }
    };
  }, []);

  useEffect(() => {
    if (isInitialized) {
      // Apply theme class to document only for cater section
      // Check if we're in the cater section but exclude login/signup
      const isCaterSection = window.location.pathname.startsWith('/cater');
      const isAuthPage = window.location.pathname.includes('/cater/login') || 
                        window.location.pathname.includes('/cater/signup');
      
      if (isCaterSection && !isAuthPage) {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
        localStorage.setItem("cater-theme", theme);
      } else {
        // Remove dark theme classes when not in cater section
        document.documentElement.classList.remove("light", "dark");
      }
    }
  }, [theme, isInitialized]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isInitialized }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}