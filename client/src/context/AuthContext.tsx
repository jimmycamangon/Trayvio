"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { GetCurrentUser, Login, Logout } from "@/lib/api/axios";
import { useRouter } from "next/navigation";
import { User } from "@/types/users";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  login: async () => false,
  logout: async () => {},
  checkAuth: async () => false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const response = await GetCurrentUser();
      if (response.success && response.user) {
        setUser({
          id: response.user.id,
          fullName: response.user.fullName,
          email: response.user.email,
          phoneNumber: response.user.phoneNumber || '',
          role: response.user.role,
          createdAt: new Date(response.user.createdAt),
          isActive: response.user.isActive,
          passwordHash: '' 
        });
        setIsAuthenticated(true);
        return true;
      } else {
        setUser(null);
        setIsAuthenticated(false);
        return false;
      }
    } catch {
      setUser(null);
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await Login(email, password);
      return await checkAuth();
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await Logout();
      setUser(null);
      setIsAuthenticated(false);
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};