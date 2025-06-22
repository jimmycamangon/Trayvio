"use client";

import ForgotPasswordForm from "@/components/layout/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
        <div className="mx-auto w-full max-w-md">
            <ForgotPasswordForm
            onSubmit={(data) => {
                console.log("Login data submitted:", data);
                // Add your login logic here (API call, etc.)
            }}
            />
        </div>
    </section>
  );
}
