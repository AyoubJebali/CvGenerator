"use client";
import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function SignInPage() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [session, router]);
  if (session?.user) {
    return null;
  }

  else return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="card bg-white/95 shadow-2xl">
          <div className="card-body">
            <h1 className="text-2xl font-semibold text-center text-primary">Welcome back</h1>
            <p className="text-sm text-center text-neutral">Sign in to save and manage your CVs</p>

            <div className="mt-6">
              <button className="btn btn-primary btn-block btn-lg flex items-center justify-center gap-3" onClick={() => signIn("google")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5" fill="currentColor">
                  <path d="M44.5 20H24v8.5h11.9C34.6 33.9 30.2 37 24 37c-7.7 0-14-6.3-14-14s6.3-14 14-14c3.6 0 6.8 1.3 9.3 3.5l6.6-6.6C35.6 2.9 29.1 0 24 0 10.7 0 0 10.7 0 24s10.7 24 24 24c12.3 0 22.4-9 23.9-20.6.1-.8.1-1.4.1-1.4z"/>
                </svg>
                Continue with Google
              </button>
            </div>

            <p className="text-xs text-center text-neutral mt-6">
              By continuing you agree to our <a href="#" className="link link-primary">Terms</a> and <a href="#" className="link link-primary">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}