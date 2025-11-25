"use client";

import React from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import { useCv } from "./CvContext";

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const { reset } = useCv();

  return (
    <nav className="w-full px-4 py-2 flex items-center justify-end gap-3 bg-white border-b border-gray-200 shadow-sm">
      {session?.user ? (
        <div className="flex items-center gap-3">
          <img
            src={session.user.image ?? "/default-avatar.png"}
            alt={session.user.name ?? session.user.email ?? "User"}
            className="w-9 h-9 rounded-full object-cover border-2 border-gray-200"
          />
          <span className="text-sm font-medium text-gray-900">
            {session.user.name ?? session.user.email}
          </span>
          <button
            onClick={() => {
              reset(); // clear context + localStorage
              signOut({ callbackUrl: "/" });
            }}
            className="ml-2 px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
            aria-label="Sign out"
          >
            Sign out
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Sign in
        </button>
      )}
    </nav>
  );
};

export default NavBar;