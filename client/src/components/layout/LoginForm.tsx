"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import Image from "next/image";

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

  const handleSubmit = (data: LoginFormValues) => {
    if (onSubmit) onSubmit(data);

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
              <Label htmlFor="email" className="block text-sm">
                Username
              </Label>
              <Input type="email" required name="email" id="email" />
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="pwd" className="text-title text-sm">
                  Password
                </Label>
                <Button asChild variant="link" size="sm">
                  <Link
                    href="/forgot-password"
                    className="link intent-info variant-ghost text-sm"
                  >
                    Forgot your Password ?
                  </Link>
                </Button>
              </div>
              <Input
                type="password"
                required
                name="pwd"
                id="pwd"
                className="input sz-md variant-mixed"
              />
            </div>

            <Button className="w-full">Sign In</Button>
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
