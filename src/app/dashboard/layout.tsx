import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-container flex flex-row min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <aside className="sidebar bg-white shadow-md w-64 p-6 flex-col gap-4 hidden md:flex">
        <div className="logo text-2xl font-bold text-gray-800 mb-6">CvGen</div>
        <nav className="navigation flex flex-col gap-2">
          <a href="/" className="text-gray-700 hover:text-blue-600">
            Resume
          </a>
          <a href="/cover-letter" className="text-gray-700 hover:text-blue-600">
            Cover Letter
          </a>
          <a href="/job-tracker" className="text-gray-700 hover:text-blue-600">
            Job Tracker
          </a>
          <hr className="border-gray-300 my-4" />
          <a href="/plans" className="text-gray-700 hover:text-blue-600">
            Plans & Pricing
          </a>
          <a href="/student-benefits" className="text-gray-700 hover:text-blue-600">
            Student Benefits
          </a>
          <a href="/account" className="text-gray-700 hover:text-blue-600">
            My Account
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}