"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 flex items-center justify-center">
        <main className="w-full">{children}</main>
      </div>
    </SessionProvider>
  );
}
