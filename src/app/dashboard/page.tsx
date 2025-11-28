import React from 'react';
import ResumeCard from '../components/ResumeCard';

const Dashboard = () => {
    return (
        <div className="dashboard-container flex flex-row min-h-screen bg-gray-100">
            {/* Sidebar Navigation */}
            <aside className="sidebar bg-white shadow-md w-64 p-6 flex-col gap-4 hidden md:flex">
                <div className="logo text-2xl font-bold text-gray-800 mb-6">CvGen</div>
                <nav className="navigation flex flex-col gap-2">
                    <a href="/" className="text-gray-700 hover:text-blue-600">Resume</a>
                    <a href="/cover-letter" className="text-gray-700 hover:text-blue-600">Cover Letter</a>
                    <a href="/job-tracker" className="text-gray-700 hover:text-blue-600">Job Tracker</a>
                    <hr className="border-gray-300 my-4" />
                    <a href="/plans" className="text-gray-700 hover:text-blue-600">Plans & Pricing</a>
                    <a href="/student-benefits" className="text-gray-700 hover:text-blue-600">Student Benefits</a>
                    <a href="/account" className="text-gray-700 hover:text-blue-600">My Account</a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content flex-1 p-4 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">My Resumes</h1>
                <div className="resume-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {/* Placeholder for new resume card */}
                    <div className="new-resume-card bg-transparent shadow-md rounded-lg p-4 w-full sm:w-64 flex flex-col items-center gap-4 border-2 border-dashed border-gray-400">
                        <div className="resume-preview w-full h-full rounded-md flex items-center justify-center">
                            <span className="text-lg font-medium text-gray-500">+ New Resume</span>
                        </div>
                    </div>

                    {/* Example resume cards */}
                    {[...Array(6)].map((_, index) => (
                        <ResumeCard
                            key={index}
                            title={`Resume ${index + 1}`}
                            editedDaysAgo={9 - index}
                            imageSrc={`/templates/OneColumn.png`}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;

// Add a declaration for react-icons module
declare module 'react-icons/fa';