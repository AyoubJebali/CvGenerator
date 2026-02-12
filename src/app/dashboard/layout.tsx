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
    <div className="drawer lg:drawer-open min-h-screen bg-gray-100" data-theme="light">
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
        <div className="navbar bg-white lg:hidden sticky top-0 z-30 shadow-sm">
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost text-gray-700"
            >
              <FiMenu size={24} />
            </label>
          </div>
          <div className="flex-1">
            <Link href="/dashboard" className="btn btn-ghost text-xl font-bold text-gray-800">
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
                <div className="bg-blue-600 text-white rounded-full w-10">
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

        <aside className="bg-white w-72 min-h-full flex flex-col shadow-xl">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200">
            <Link
              href="/dashboard"
              className="flex items-center gap-3"
              onClick={closeSidebar}
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <FiFileText size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">CvGen</h1>
                <p className="text-xs text-gray-500">Resume Builder</p>
              </div>
            </Link>
          </div>

          {/* User Info */}
          {session?.user && (
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {session.user.image ? (
                  <div className="avatar">
                    <div className="w-12 rounded-full ring-2 ring-blue-600 ring-offset-2 ring-offset-white">
                      <img src={session.user.image} alt="User avatar" />
                    </div>
                  </div>
                ) : (
                  <div className="avatar placeholder">
                    <div className="bg-blue-600 text-white rounded-full w-12">
                      <span className="text-lg">
                        {session.user.name?.charAt(0) || "U"}
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">
                    {session.user.name || "User"}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {session.user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
                Main Menu
              </p>
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive(item.href)
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
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

            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
                Account
              </p>
              <ul className="space-y-1">
                {secondaryMenuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive(item.href)
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
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
          <div className="p-4 border-t border-gray-200">
            <button
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg border-2 border-red-500 text-red-500 font-medium hover:bg-red-50 transition-colors"
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