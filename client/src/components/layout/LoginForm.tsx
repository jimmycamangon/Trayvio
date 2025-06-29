"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Login } from "@/lib/api/axios";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm({
  onSubmit,
}: {
  onSubmit?: (data: LoginFormValues) => void;
}) {
  const form = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (data: LoginFormValues) => {
    setError(null);
    setLoading(true);
    try {
      const result = await Login(data.email, data.password);
      toast.success("Login successful!");
      if (onSubmit) onSubmit(result);
      // Redirect or store token, etc.
    } catch (err: any) {
      // Show the error message from the backend
      setError(err.message); // This will be "Invalid email or password."
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="p-8 pb-6">
          <div>
            <Link href="/" aria-label="go home">
              <Image
                src="/logo.png"
                alt="Trayvio Logo"
                width={40}
                height={40}
                className=" mb-2"
                priority
              />
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              Sign In to Trayvio
            </h1>
            <p className="text-sm">Welcome back! Sign in to continue</p>
          </div>

          <hr className="my-4" />

          <div className="space-y-6">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                rules={{ required: "Email" }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <Label htmlFor="email">Email</Label>
                    <FormControl>
                      <Input
                        type="email"
                        id="email"
                        {...field}
                        className={
                          fieldState.error
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : ""
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-0.5">
              <FormField
                control={form.control}
                name="password"
                rules={{ required: "Password" }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <Label htmlFor="password">Password</Label>
                    <FormControl>
                      <Input
                        type="password"
                        id="password"
                        {...field}
                        className={
                          fieldState.error
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : ""
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex items-end justify-end mt-2">
                <Button asChild variant="link" size="sm">
                  <Link
                    href="/forgot-password"
                    className="link intent-info variant-ghost text-sm"
                  >
                    Forgot your Password ?
                  </Link>
                </Button>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            <Button className="w-full" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </div>

        <div className="bg-muted rounded-(--radius) border p-3">
          <p className="text-accent-foreground text-center text-sm">
            Don't have an account ?
            <Button asChild variant="link" className="px-2">
              <Link href="/signup">Create account</Link>
            </Button>
          </p>
        </div>
      </form>
    </Form>
  );
}
