"use client";

import React, { useState, useCallback, useEffect } from "react";
import Form from "./create-cv-form";
import CvOneColumn from "./templates/CvOneColumn";
import ZoomWrapper from "./zoomWrapper";
import CvHeaderBanner from "./templates/CvHeaderBanner";
import CvSidebarDark from "./templates/CvSideBarDark";
import CvTwoColumn from "./templates/CvTwoColumn";
import CVTemplateSelector from "./cvTemplateSelector";
import { printComponent } from "./printCv";
import { CvProvider, useCv } from "./CvContext";
import { ResumeSchema } from "@/types";
import previewSeedData from "@/app/lib/preview-seed.json";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { FiSave } from "react-icons/fi";
import { createUserResume, updateUserResume } from "@/app/dashboard/actions";

interface ResumeEditorProps {
  resumeId: string | null;
  initialName?: string | null;
  initialData: ResumeSchema;
  initialTemplate?: string;
}

function EditorInner({
  resumeId: propResumeId,
  initialName,
}: {
  resumeId: string | null;
  initialName?: string | null;
}) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("OneColumn");
  const { data, setData } = useCv();
  const router = useRouter();
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(propResumeId);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Auto-dismiss save banner after 3 seconds
  useEffect(() => {
    if (!saveMessage) return;
    const timer = setTimeout(() => setSaveMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [saveMessage]);

  const handlePrint = useCallback(() => {
    let ComponentToPrint;

    switch (selectedTemplate) {
      case "OneColumn":
        ComponentToPrint = CvOneColumn;
        break;
      case "HeaderBanner":
        ComponentToPrint = CvHeaderBanner;
        break;
      case "SidebarDark":
        ComponentToPrint = CvSidebarDark;
        break;
      case "TwoColumn":
        ComponentToPrint = CvTwoColumn;
        break;
      default:
        ComponentToPrint = CvOneColumn;
    }

    printComponent(
      ComponentToPrint,
      { data },
      { title: data.name ? `${data.name} - CV` : "CV", theme: "curatorlight" }
    );
  }, [selectedTemplate, data]);

  const handleSaveResume = useCallback(async () => {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      if (currentResumeId) {
        const result = await updateUserResume(currentResumeId, data);
        if (!result.success) {
          setSaveMessage({
            type: "error",
            text: result.error ?? "Failed to update resume",
          });
          return;
        }

        setSaveMessage({ type: "success", text: "Resume saved." });
        return;
      }

      const resumeName = data.name.trim() || initialName?.trim() || "Untitled Resume";
      const createResult = await createUserResume(resumeName, data);
      if (!createResult.success) {
        setSaveMessage({
          type: "error",
          text: createResult.error ?? "Failed to create resume",
        });
        return;
      }

      if (!createResult.resume?.id) {
        setSaveMessage({
          type: "error",
          text: "Failed to retrieve created resume ID.",
        });
        return;
      }

      const createdResumeId = createResult.resume.id;
      setCurrentResumeId(createdResumeId);
      router.replace(`/resumes/${createdResumeId}/edit`);
      setSaveMessage({ type: "success", text: "Resume saved." });
    } catch (error) {
      console.error("Error saving resume:", error);
      setSaveMessage({ type: "error", text: "Failed to save resume" });
    } finally {
      setIsSaving(false);
    }
  }, [currentResumeId, data, initialName, router]);

  const handleLoadTestData = useCallback(() => {
    setData(previewSeedData as ResumeSchema);
  }, [setData]);

  return (
    <div className="h-[calc(100vh-56px)] bg-surface">
      <div className="grid h-full grid-cols-1 xl:grid-cols-[240px_minmax(640px,860px)_minmax(520px,1fr)]">
        <aside className="hidden xl:flex h-full flex-col bg-surface-container px-6 py-8">
          <div>
            <h2 className="text-[38px] leading-none font-semibold text-on-surface">Resume Editor</h2>
            <p className="mt-2 text-xs tracking-[0.16em] text-on-surface-variant">V2.1 PROFESSIONAL</p>
          </div>

          <div className="mt-8 space-y-2">
            <button className="flex w-full items-center gap-3 rounded-xl bg-surface-container-lowest px-4 py-3 text-left text-base font-semibold text-primary shadow-sm">
              <span aria-hidden className="text-lg">📝</span>
              <span>Content</span>
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-base font-medium text-on-surface hover:bg-surface-container-high">
              <span aria-hidden className="text-lg">📐</span>
              <span>Layout</span>
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-base font-medium text-on-surface hover:bg-surface-container-high">
              <span aria-hidden className="text-lg">🎨</span>
              <span>Style</span>
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-base font-medium text-on-surface hover:bg-surface-container-high">
              <span aria-hidden className="text-lg">✨</span>
              <span>Optimize</span>
            </button>
          </div>

          <div className="mt-auto space-y-2">
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-base font-medium text-on-surface hover:bg-surface-container-high">
              <span aria-hidden className="text-lg">❓</span>
              <span>Help</span>
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-base font-medium text-on-surface hover:bg-surface-container-high"
            >
              <span aria-hidden className="text-lg">↪️</span>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <section className="h-full overflow-y-auto curator-scrollbar bg-surface-container-low p-6 lg:p-10">
          <header className="mb-10">
            <h1 className="text-5xl font-extrabold tracking-tight text-on-surface">Build Your Story</h1>
            <p className="mt-3 max-w-xl text-2xl leading-snug text-on-surface-variant">
              Start filling the form to build your resume. AI will help you polish it later.
            </p>
            <div className="mt-5">
              <button
                type="button"
                onClick={handleLoadTestData}
                className="rounded-xl bg-surface-container-high px-4 py-2 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-highest"
              >
                Load Test Data
              </button>
            </div>
          </header>
          <Form />
        </section>

        <section className="relative flex h-full min-h-0 flex-col overflow-hidden bg-surface p-4 lg:p-8">
          <div className="mb-4 flex flex-wrap items-center justify-end gap-3">
            <CVTemplateSelector onSelect={setSelectedTemplate} selected={selectedTemplate} />
            <button className="rounded-lg bg-surface-container-high px-5 py-2 text-sm font-semibold text-on-surface-variant/70" disabled>
              Optimize (AI)
            </button>
            <button
              onClick={handlePrint}
              className="rounded-lg bg-gradient-to-br from-primary to-primary-container px-5 py-2 text-sm font-semibold text-on-primary"
            >
              Download PDF
            </button>
          </div>
          <div className="min-h-0 flex-1">
            <ZoomWrapper>
              {selectedTemplate === "OneColumn" && <CvOneColumn data={data} />}
              {selectedTemplate === "HeaderBanner" && <CvHeaderBanner data={data} />}
              {selectedTemplate === "SidebarDark" && <CvSidebarDark data={data} />}
              {selectedTemplate === "TwoColumn" && <CvTwoColumn data={data} />}
            </ZoomWrapper>
          </div>
        </section>
      </div>

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {saveMessage && (
          <div
            className={`rounded-lg px-3 py-2 text-sm shadow-lg ${
              saveMessage.type === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {saveMessage.text}
          </div>
        )}
        <button
          onClick={handleSaveResume}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-on-primary shadow-xl transition-colors hover:bg-primary-container disabled:opacity-60"
        >
          {isSaving ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Saving...
            </>
          ) : (
            <>
              <FiSave size={16} />
              Save
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function ResumeEditor({
  resumeId,
  initialName,
  initialData,
}: ResumeEditorProps) {
  return (
    <CvProvider initialData={initialData} key={resumeId ?? "new-resume"}>
      <EditorInner resumeId={resumeId} initialName={initialName} />
    </CvProvider>
  );
}
