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
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Signup } from "@/lib/api/axios";

type SignupFormValues = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export default function SignupForm({
  onSubmit,
}: {
  onSubmit?: (data: SignupFormValues) => void;
}) {
  const form = useForm<SignupFormValues>({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: SignupFormValues) => {
    setError(null);
    setLoading(true);
    try {
      const payload = {
        fullName: `${data.firstname} ${data.lastname}`.trim(),
        email: data.email,
        password: data.password,
      };
      const result = await Signup(payload);
      toast.success("Signup successful!");
      router.push("/login");
      if (onSubmit) onSubmit(result);
      // Optionally redirect to login or home
    } catch (err: any) {
      setError(err.message);
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
                className="mb-2"
                priority
              />
            </Link>
            <h1 className="text-title mb-1 mt-4 text-xl font-semibold">
              Signup
            </h1>
            <p className="text-sm">Welcome! Create an account to get started</p>
          </div>

          <hr className="my-4" />

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="firstname"
                  rules={{ required: "First Name" }}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <Label htmlFor="firstname">First Name</Label>
                      <FormControl>
                        <Input
                          type="firstname"
                          id="firstname"
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
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="lastname"
                  rules={{ required: "Last Name" }}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <Label htmlFor="lastname">Last Name</Label>
                      <FormControl>
                        <Input
                          type="lastname"
                          id="lastname"
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
            </div>

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

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="password"
                rules={{ required: "Password is required" }}
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
            </div>

            {error && (
              <div className="mt-2 text-center text-sm font-medium text-red-600">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing Up..." : "Continue"}
            </Button>
          </div>
        </div>

        <div className="bg-muted rounded-(--radius) border p-3">
          <p className="text-accent-foreground text-center text-sm">
            Have an account ?
            <Button asChild variant="link" className="px-2">
              <Link href="/login">Sign In</Link>
            </Button>
          </p>
        </div>
      </form>
    </Form>
  );
}
