"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchResumeById, updateUserResume } from "@/app/dashboard/actions";
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
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold text-on-surface">Resume Not Found</h1>
        <p className="mb-6 text-on-surface-variant">{error || "The resume you're looking for doesn't exist."}</p>
        <Link
          href="/dashboard/resumes"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-on-primary transition-colors hover:bg-primary-container"
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
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/resumes"
            className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
          >
            <FiArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-on-surface">Edit: {resume.name}</h1>
            <p className="mt-1 text-on-surface-variant">
              Make changes to your resume
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/resumes/${resumeId}`}
            className="flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 text-on-surface transition-colors hover:bg-surface-container-high"
          >
            <FiEye size={18} />
            Preview
          </Link>
          <button
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-on-primary transition-colors hover:bg-primary-container disabled:opacity-50"
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
        <div className="rounded-lg bg-surface-container-lowest p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-on-surface">Resume Details</h2>
          {/* Add your form fields here */}
          <p className="text-on-surface-variant">Form fields go here...</p>
        </div>

        {/* Preview Section */}
        <div className="rounded-lg bg-surface-container-lowest p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-on-surface">Live Preview</h2>
          {/* Render your CV template here */}
          <pre className="whitespace-pre-wrap text-sm text-on-surface-variant">
            {JSON.stringify(resumeData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default EditResumePage;
