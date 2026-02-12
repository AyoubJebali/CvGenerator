"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchResumeById, updateUserResume } from "@/app/dashboard/actions                                                                                                                                                                                                                                                                                  ";
import { Resume, ResumeSchema } from "@/types";
import { FiArrowLeft, FiSave, FiEye } from "react-icons/fi";
import Link from "next/link";

const EditResumePage = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [resume, setResume] = useState<Resume | null>(null);
  const [resumeData, setResumeData] = useState<ResumeSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resumeId = params.id as string;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const loadResume = async () => {
      if (!resumeId) return;
      setLoading(true);
      try {
        const result = await fetchResumeById(resumeId);
        if (result.success) {
          setResume(result.resume);
          setResumeData(result.resume.resumeData as ResumeSchema);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError("Failed to load resume");
      } finally {
        setLoading(false);
      }
    };

    loadResume();
  }, [resumeId]);

  const handleSave = async () => {
    if (!resumeId || !resumeData) return;
    setSaving(true);
    try {
      const result = await updateUserResume(resumeId, resumeData);
      if (result.success) {
        // Optionally show a success message
        console.log("Resume saved successfully");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to save resume");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="container mx-auto text-center py-16">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Resume Not Found</h1>
        <p className="text-gray-500 mb-6">{error || "The resume you're looking for doesn't exist."}</p>
        <Link
          href="/dashboard/resumes"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiArrowLeft size={18} />
          Back to Resumes
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/resumes"
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Edit: {resume.name}</h1>
            <p className="text-gray-500 mt-1">
              Make changes to your resume
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/resumes/${resumeId}`}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FiEye size={18} />
            Preview
          </Link>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Saving...
              </>
            ) : (
              <>
                <FiSave size={18} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Resume Details</h2>
          {/* Add your form fields here */}
          <p className="text-gray-500">Form fields go here...</p>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Live Preview</h2>
          {/* Render your CV template here */}
          <pre className="text-sm text-gray-600 whitespace-pre-wrap">
            {JSON.stringify(resumeData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default EditResumePage;