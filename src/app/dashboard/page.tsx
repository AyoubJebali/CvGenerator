"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ResumeCard from "../components/ResumeCard";
import { useSession } from "next-auth/react";
import Modal from "../components/Modal";
import { ResumeSchema } from "@/types";
import { Resume } from "@/types";

// Empty initial data
const emptyCvData: ResumeSchema = {
  name: "",
  title: "",
  contact: {
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
  },
  about: "",
  skills: [],
  languages: [],
  hobbies: [],
  objectives: "",
  projects: [],
  studies_training: [],
  experiences: [],
};
//TODO: replace fetch and api calls with action.ts 
const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newResumeName, setNewResumeName] = useState("");
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check for session and redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin"); // Redirect to the login page
    }
  }, [status, router]);

  const fetchResumes = async () => {
    if (!session?.user?.id) return; // Wait for session to load
    try {
      const response = await fetch(`/api/resume?userId=${session.user.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch resumes");
      }
      const data = await response.json();
      setResumes(data.resumes); // Set the fetched resumes in state
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Fetch resumes for the logged-in user
  useEffect(() => {
    fetchResumes();
  }, [session?.user?.id]);

  const handleCreateResume = async () => {
    // Handle the creation logic, e.g., API call
    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user?.id,
          name: newResumeName,
          resumeData: emptyCvData, // Start with empty data
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
    } catch (err) {
      console.error("Error creating resume:", err);
    }
    setIsModalOpen(false);
    setNewResumeName("");
    fetchResumes(); // Refresh the list of resumes
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewResumeName("");
  };

  if (status === "loading" || loading) {
    // Show loading spinner while fetching session or resumes
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
        My Resumes
      </h1>
      <div className="resume-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Placeholder for new resume card */}
        <div
          className="new-resume-card bg-transparent shadow-md rounded-lg p-4 w-full sm:w-64 flex flex-col items-center gap-4 border-2 border-dashed border-gray-400 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={openModal}
        >
          <div className="resume-preview w-full h-full rounded-md flex items-center justify-center">
            <span className="text-lg font-medium text-gray-500">
              + New Resume
            </span>
          </div>
        </div>

        {/* Render fetched resumes */}
        {resumes.map((resume: Resume) => (
          <ResumeCard
            key={resume.id}
            title={resume.name}
            editedDaysAgo={Math.floor(
              (new Date().getTime() - new Date(resume.lastModified).getTime()) /
                (1000 * 60 * 60 * 24)
            )}
            imageSrc={`/templates/OneColumn.png`}
          />
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">Create New Resume</h2>
        <input
          type="text"
          className="w-full border border-gray-300 text-black rounded-md p-2 mb-4"
          placeholder="Enter resume name"
          value={newResumeName}
          onChange={(e) => setNewResumeName(e.target.value)}
        />
        <div className="flex justify-end gap-4">
          <button className="btn btn-secondary" onClick={closeModal}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleCreateResume}>
            Create
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Dashboard;