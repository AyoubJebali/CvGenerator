"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import ResumeCard from "../components/ResumeCard";
import { useSession } from "next-auth/react";
import { Resume } from "@/types";
import { fetchUserResumes, createUserResume, deleteUserResume } from "./actions";
import { FiPlus, FiFileText } from "react-icons/fi";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newResumeName, setNewResumeName] = useState("");
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  // Check for session and redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  // Fetch resumes for the logged-in user
  const loadResumes = useCallback(async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    const result = await fetchUserResumes(session.user.id);
    if (result.success) {
      setResumes(result.resumes ?? []);
    } else {
      console.error(result.error);
    }
    setLoading(false);
  }, [session?.user?.id]);

  useEffect(() => {
    loadResumes();
  }, [session?.user?.id]);

  // Handle delete resume
  const handleDeleteResume = async (resumeId: string) => {
    const result = await deleteUserResume(resumeId);
    if (result.success) {
      loadResumes();
    } else {
      console.error(result.error);
    }
  };

  // Handle edit resume
  const handleEditResume = (resumeId: string) => {
    router.push(`/dashboard/resumes/${resumeId}/edit`);
  };

  // Handle view resume
  const handleViewResume = (resumeId: string) => {
    router.push(`/dashboard/resumes/${resumeId}`);
  };

  // Handle create resume
  const handleCreateResume = async () => {
    if (!session?.user?.id || !newResumeName.trim()) return;
    setIsCreating(true);
    try {
      const result = await createUserResume(session.user.id, newResumeName);
      if (result.success) {
        loadResumes();
      }
    } catch (error) {
      console.error("Error creating resume:", error);
    } finally {
      setIsCreating(false);
      setIsModalOpen(false);
      setNewResumeName("");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewResumeName("");
  };

  // Loading state
  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content">My Resumes</h1>
          <p className="text-base-content/60 mt-1">
            Create and manage your professional resumes
          </p>
        </div>
        
      </div>

      {/* Stats */}
      <div className="stats shadow mb-8 w-full sm:w-auto">
        <div className="stat">
          <div className="stat-figure text-primary">
            <FiFileText size={24} />
          </div>
          <div className="stat-title">Total Resumes</div>
          <div className="stat-value text-primary">{resumes.length}</div>
          <div className="stat-desc">Create more to stand out</div>
        </div>
      </div>

      {/* Empty State */}
      {resumes.length === 0 ? (
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body items-center text-center py-16">
            <FiFileText size={64} className="text-base-content/30 mb-4" />
            <h2 className="card-title text-2xl">No resumes yet</h2>
            <p className="text-base-content/60 max-w-md">
              Get started by creating your first resume. It only takes a few minutes!
            </p>
            <div className="card-actions mt-6">
              <button className="btn btn-primary gap-2" onClick={openModal}>
                <FiPlus size={18} />
                Create Your First Resume
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Resume Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* New Resume Card */}
          <div
            className="card bg-base-200 border-2 border-dashed border-base-300 hover:border-primary hover:bg-base-300 transition-all cursor-pointer group"
            onClick={openModal}
          >
            <div className="card-body items-center justify-center min-h-[280px]">
              <div className="w-16 h-16 rounded-full bg-base-300 group-hover:bg-primary/20 flex items-center justify-center transition-all">
                <FiPlus size={32} className="text-base-content/50 group-hover:text-primary transition-all" />
              </div>
              <h3 className="text-lg font-medium text-base-content/70 group-hover:text-primary mt-4 transition-all">
                Create New Resume
              </h3>
            </div>
          </div>

          {/* Render fetched resumes */}
          {resumes.map((resume: Resume) => (
            <ResumeCard
              id={resume.id}
              key={resume.id}
              title={resume.name}
              editedDaysAgo={Math.floor(
                (new Date().getTime() - new Date(resume.lastModified).getTime()) /
                  (1000 * 60 * 60 * 24)
              )}
              imageSrc="/templates/OneColumn.png"
              onDelete={handleDeleteResume}
              onEdit={handleEditResume}
              onView={handleViewResume}
            />
          ))}
        </div>
      )}

      {/* Create Resume Modal */}
      <dialog className={`modal ${isModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box text-black">
          <h3 className="font-bold text-lg mb-4">Create New Resume</h3>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Resume Name</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Software Engineer Resume"
              className="input input-bordered w-full"
              value={newResumeName}
              onChange={(e) => setNewResumeName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateResume()}
            />
            <label className="label">
              <span className="label-text-alt text-base-content/60">
                Give your resume a memorable name
              </span>
            </label>
          </div>
          <div className="modal-action">
            <button className="btn btn-ghost" onClick={closeModal} disabled={isCreating}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleCreateResume}
              disabled={isCreating || !newResumeName.trim()}
            >
              {isCreating ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating...
                </>
              ) : (
                "Create Resume"
              )}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={closeModal}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Dashboard;
