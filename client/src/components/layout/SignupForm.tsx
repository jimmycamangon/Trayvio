"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

type SignupFormValues = {
  name: string;
  email: string;
  password: string;
  role: "customer" | "vendor";
};

export default function SignupForm({
  onSubmit,
}: {
  onSubmit?: (data: SignupFormValues) => void;
}) {
  const searchParams = useSearchParams();
  const isVendor = searchParams.get("vendor") === "true";

  const form = useForm<SignupFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: isVendor ? "vendor" : "customer",
    },
  });

  // If user lands with ?vendor=true, set role to vendor
  useEffect(() => {
    if (isVendor) {
      form.setValue("role", "vendor");
    }
  }, [isVendor, form]);

  const handleSubmit = (data: SignupFormValues) => {
    if (onSubmit) onSubmit(data);
    // Add your signup logic here (API call, etc.)
  };

  return (
    <Form {...form}>
      <form
        action=""
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
                <Label htmlFor="firstname" className="block text-sm">
                  Firstname
                </Label>
                <Input type="text" required name="firstname" id="firstname" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname" className="block text-sm">
                  Lastname
                </Label>
                <Input type="text" required name="lastname" id="lastname" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Username
              </Label>
              <Input type="email" required name="email" id="email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pwd" className="text-title text-sm">
                Password
              </Label>
              <Input
                type="password"
                required
                name="pwd"
                id="pwd"
                className="input sz-md variant-mixed"
              />
            </div>

            <Button className="w-full">Continue</Button>
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
