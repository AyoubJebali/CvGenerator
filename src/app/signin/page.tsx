"use client";

import React, { useEffect, Suspense } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function SignInContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  useEffect(() => {
    if (session?.user) {
      router.replace(callbackUrl);
    }
  }, [session, callbackUrl, router]);

  if (status === "loading" || session?.user) {
    return (
      <div className="flex justify-center items-center py-12">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="card bg-surface-container-lowest shadow-2xl border border-outline-variant/30">
        <div className="card-body p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-primary tracking-tight">CvGen</h1>
            <p className="mt-2 text-sm text-on-surface-variant">Sign in to save and manage your CVs</p>
          </div>

          <div className="mt-4">
            <button
              className="btn btn-primary btn-block btn-lg flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-shadow"
              onClick={() => signIn("google", { callbackUrl })}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5" fill="currentColor">
                <path d="M44.5 20H24v8.5h11.9C34.6 33.9 30.2 37 24 37c-7.7 0-14-6.3-14-14s6.3-14 14-14c3.6 0 6.8 1.3 9.3 3.5l6.6-6.6C35.6 2.9 29.1 0 24 0 10.7 0 0 10.7 0 24s10.7 24 24 24c12.3 0 22.4-9 23.9-20.6.1-.8.1-1.4.1-1.4z"/>
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-on-surface-variant">
            By continuing you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center py-12">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
