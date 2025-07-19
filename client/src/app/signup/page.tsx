"use client";

import SignupForm from "@/components/layout/SignupForm";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/layout/Loading";


export default function SignupPage() {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <Loading />
    );
  }
  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
        <div className="mx-auto w-full max-w-md">
            <SignupForm
            onSubmit={(data) => {
            }}
            />
        </div>
    </section>
  );
}
