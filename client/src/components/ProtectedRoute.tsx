"use client";

import { useAuth } from '@/context/AuthContext';
import { ReactNode } from 'react';

type ProtectedRouteProps = {
  children: ReactNode;
  redirectUnauthenticated?: boolean;
};

export default function ProtectedRoute({ 
  children,
  redirectUnauthenticated = false // Default to false
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? children : redirectUnauthenticated ? null : children;
}