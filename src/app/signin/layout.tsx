import React from "react";

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <main className="w-full">{children}</main>
    </div>
  );
}
