"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchResumeById } from "@/app/dashboard/actions";
import { Resume } from "@/types";
import { FiArrowLeft, FiEdit2, FiDownload, FiPrinter } from "react-icons/fi";
import Link from "next/link";

const ViewResumePage = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
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
            <h1 className="text-3xl font-bold text-on-surface">{resume.name}</h1>
            <p className="mt-1 text-on-surface-variant">
              Last modified: {new Date(resume.lastModified).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 text-on-surface transition-colors hover:bg-surface-container-high">
            <FiPrinter size={18} />
            Print
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 text-on-surface transition-colors hover:bg-surface-container-high">
            <FiDownload size={18} />
            Download PDF
          </button>
          <Link
            href={`/dashboard/resumes/${resumeId}/edit`}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-on-primary transition-colors hover:bg-primary-container"
          >
            <FiEdit2 size={18} />
            Edit Resume
          </Link>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="rounded-lg bg-surface-container-lowest p-8 shadow-lg">
        <div className="max-w-4xl mx-auto">
          {/* Render your CV template here using resume.resumeData */}
          <pre className="whitespace-pre-wrap text-sm text-on-surface-variant">
            {JSON.stringify(resume.resumeData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ViewResumePage;
