"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  FiFileText,
  FiMail,
  FiBriefcase,
  FiCreditCard,
  FiAward,
  FiUser,
  FiLogOut,
  FiMenu,
  FiHome,
  FiSettings,
} from "react-icons/fi";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: FiHome },
  { href: "/dashboard/resumes", label: "Resumes", icon: FiFileText },
  { href: "/dashboard/cover-letters", label: "Cover Letters", icon: FiMail },
  { href: "/dashboard/job-tracker", label: "Job Tracker", icon: FiBriefcase },
];

const secondaryMenuItems = [
  { href: "/plans", label: "Plans & Pricing", icon: FiCreditCard },
  { href: "/student-benefits", label: "Student Benefits", icon: FiAward },
  { href: "/account", label: "My Account", icon: FiUser },
  { href: "/settings", label: "Settings", icon: FiSettings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const isActive = (href: string) => pathname === href;

  return (
    <div className="drawer min-h-screen bg-surface lg:drawer-open">
      {/* Mobile drawer toggle */}
      <input
        id="dashboard-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isSidebarOpen}
        onChange={toggleSidebar}
      />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar for mobile */}
        <div className="navbar sticky top-0 z-30 border-b border-outline-variant bg-surface-container-lowest shadow-sm lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost text-on-surface"
            >
              <FiMenu size={24} />
            </label>
          </div>
          <div className="flex-1">
            <Link href="/dashboard" className="btn btn-ghost text-xl font-bold text-on-surface">
              CvGen
            </Link>
          </div>
          <div className="flex-none">
            {session?.user?.image ? (
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src={session.user.image} alt="User avatar" />
                </div>
              </div>
            ) : (
              <div className="avatar placeholder">
                <div className="w-10 rounded-full bg-primary text-on-primary">
                  <span>{session?.user?.name?.charAt(0) || "U"}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-40">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={closeSidebar}
        ></label>

        <aside className="flex min-h-full w-72 flex-col bg-surface-container-lowest shadow-xl">
          {/* Logo */}
          <div className="border-b border-outline-variant p-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-3"
              onClick={closeSidebar}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <FiFileText size={20} className="text-on-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-on-surface">CvGen</h1>
                <p className="text-xs text-on-surface-variant">Resume Builder</p>
              </div>
            </Link>
          </div>

          {/* User Info */}
          {session?.user && (
            <div className="border-b border-outline-variant p-4">
              <div className="flex items-center gap-3">
                {session.user.image ? (
                  <div className="avatar">
                    <div className="w-12 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-surface-container-lowest">
                      <img src={session.user.image} alt="User avatar" />
                    </div>
                  </div>
                ) : (
                  <div className="avatar placeholder">
                    <div className="w-12 rounded-full bg-primary text-on-primary">
                      <span className="text-lg">
                        {session.user.name?.charAt(0) || "U"}
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-on-surface">
                    {session.user.name || "User"}
                  </p>
                  <p className="truncate text-sm text-on-surface-variant">
                    {session.user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="mb-4">
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                Main Menu
              </p>
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive(item.href)
                          ? "bg-primary text-on-primary"
                          : "text-on-surface hover:bg-surface-container-high"
                      }`}
                      onClick={closeSidebar}
                    >
                      <item.icon size={18} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-outline-variant pt-4">
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                Account
              </p>
              <ul className="space-y-1">
                {secondaryMenuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive(item.href)
                          ? "bg-primary text-on-primary"
                          : "text-on-surface hover:bg-surface-container-high"
                      }`}
                      onClick={closeSidebar}
                    >
                      <item.icon size={18} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Footer / Logout */}
          <div className="border-t border-outline-variant p-4">
            <button
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-outline-variant bg-surface-container-low px-4 py-2.5 font-medium text-on-surface transition-colors hover:bg-surface-container-high"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <FiLogOut size={18} />
              Sign Out
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
