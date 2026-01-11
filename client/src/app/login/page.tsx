"use client";

import LoginForm from "@/components/layout/LoginForm";

export default function LoginPage() {

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32">
        <div className="mx-auto w-full max-w-md">
          <LoginForm />
        </div>
    </section>
  );
}
