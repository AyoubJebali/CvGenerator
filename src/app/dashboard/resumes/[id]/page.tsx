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
            <h1 className="text-3xl font-bold text-gray-800">{resume.name}</h1>
            <p className="text-gray-500 mt-1">
              Last modified: {new Date(resume.lastModified).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <FiPrinter size={18} />
            Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <FiDownload size={18} />
            Download PDF
          </button>
          <Link
            href={`/dashboard/resumes/${resumeId}/edit`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiEdit2 size={18} />
            Edit Resume
          </Link>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="max-w-4xl mx-auto">
          {/* Render your CV template here using resume.resumeData */}
          <pre className="text-sm text-gray-600 whitespace-pre-wrap">
            {JSON.stringify(resume.resumeData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ViewResumePage;