"use client";

import LoginForm from "@/components/layout/LoginForm";
import Loading from "@/components/layout/Loading";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {

  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <Loading />
    );
  }
  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
        <div className="mx-auto w-full max-w-md">
            <LoginForm
            onSubmit={(data) => {
                console.log("Login data submitted:", data);
                // Add your login logic here (API call, etc.)
            }}
            />
        </div>
    </section>
  );
}
