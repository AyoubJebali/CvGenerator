"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import { useCv } from "./CvContext";
import ThemeToggle from "./themeToggle";

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const { reset } = useCv();

  const userInitial =
    session?.user?.name?.[0]?.toUpperCase() ??
    session?.user?.email?.[0]?.toUpperCase() ??
    "U";

  return (
    <nav className="w-full h-14 px-4 md:px-6 flex items-center justify-between bg-surface-container-low border-b border-outline-variant/30">
      <div className="flex items-center gap-6">
        <Link
          href={session?.user ? "/dashboard" : "/"}
          className="text-lg font-extrabold text-primary tracking-tight hover:opacity-90 transition-opacity"
        >
          CvGen
        </Link>
        {session?.user && (
          <div className="hidden sm:flex items-center gap-4 text-sm font-medium text-on-surface-variant">
            <Link
              href="/dashboard"
              className="hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/resumes/new"
              className="hover:text-primary transition-colors"
            >
              + New Resume
            </Link>
          </div>
        )}
      </div>

      {session?.user ? (
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name ?? session.user.email ?? "User"}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold">
              {userInitial}
            </div>
          )}
          <span className="hidden md:inline text-sm font-medium text-on-surface">
            {session.user.name ?? session.user.email}
          </span>
          <button
            onClick={() => {
              reset();
              signOut({ callbackUrl: "/" });
            }}
            className="ml-2 px-3 py-1 rounded-lg bg-surface-container-high text-on-surface text-sm hover:bg-surface-container-highest transition-colors"
            aria-label="Sign out"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="px-3 py-1 rounded-lg bg-gradient-to-br from-primary to-primary-container text-on-primary text-sm hover:opacity-90"
          >
            Sign in
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
