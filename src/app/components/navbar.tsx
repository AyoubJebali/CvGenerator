"use client";

import React from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import { useCv } from "./CvContext";
import ThemeToggle from "./themeToggle";

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const { reset } = useCv();

  return (
    <nav className="w-full h-14 px-4 md:px-6 flex items-center justify-between bg-surface-container-low">
      <div className="flex items-center">
        <span className="text-lg font-extrabold text-primary tracking-tight">CuratorAI</span>
      </div>
      {session?.user ? (
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <img
            src={session.user.image ?? "/default-avatar.png"}
            alt={session.user.name ?? session.user.email ?? "User"}
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-primary">
            {session.user.name ?? session.user.email}
          </span>
          <button
            onClick={() => {
              reset(); // clear context + localStorage
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
            onClick={() => signIn("google")}
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
