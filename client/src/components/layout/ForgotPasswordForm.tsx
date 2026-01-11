"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import Image from "next/image";

type ForgotPasswordFormValues = {
  email: string;
};

export default function ForgotPasswordForm({
  onSubmit,
}: {
  onSubmit?: (data: ForgotPasswordFormValues) => void;
}) {
  const form = useForm<ForgotPasswordFormValues>({
    defaultValues: { email: "" },
  });

  const handleSubmit = (data: ForgotPasswordFormValues) => {
    if (onSubmit) onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
          <div>
            <Link href="/" aria-label="go home">
              <Image
                src="/logo.png"
                alt="Trayvio Logo"
                width={40}
                height={40}
                className="mb-2"
                priority
              />
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              Recover Password
            </h1>
            <p className="text-sm">Enter your email to receive a reset link</p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input
                type="email"
                required
                name="email"
                id="email"
                placeholder="name@example.com"
              />
            </div>

            <Button className="w-full">Send Reset Link</Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              We&apos;ll send you a link to reset your password.
            </p>
          </div>
        </div>

        <div className="p-3">
          <p className="text-accent-foreground text-center text-sm">
            Remembered your password?
            <Button asChild variant="link" className="px-2">
              <Link href="/login">Log in</Link>
            </Button>
          </p>
        </div>
      </form>
    </Form>
  );
}
