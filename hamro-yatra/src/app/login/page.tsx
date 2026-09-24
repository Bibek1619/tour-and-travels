import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Website
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/hamro yatra.jpeg"
            alt="Hamro Yatra Adventure"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900">
            Admin Panel Login
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to manage Hamro Yatra Adventure
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}