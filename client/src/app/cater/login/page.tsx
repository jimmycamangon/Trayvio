"use client";
import Image from "next/image";
import LoginForm from "@/components/cater/LoginForm";

export default function CaterLoginPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Left Side - Full Background Image */}
      <div className="w-full md:w-1/2 h-64 md:h-screen relative">
        <Image
          src="/images/vendors/bg-cater-login.jpg"
          alt="Professional catering service"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          <LoginForm onSubmit={(data) => {}} />
        </div>
      </div>
    </main>
  );
}
