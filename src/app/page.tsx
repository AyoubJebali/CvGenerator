"use client";
import Form from "./components/create-cv-form";
import CvOneColumn from "./components/templates/CvOneColumn";
import ZoomWrapper from "./components/zoomWrapper";
import CvHeaderBanner from "./components/templates/CvHeaderBanner";
import CvSidebarDark from "./components/templates/CvSideBarDark";
import CvTwoColumn from "./components/templates/CvTwoColumn";
import CVTemplateSelector from "./components/cvTemplateSelector";
import { useState, useCallback } from "react";
import { printComponent } from "./components/printCv";
import { useCv } from "./components/CvContext";
import { ResumeSchema } from "@/types";
import previewSeedData from "./lib/preview-seed.json";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("OneColumn");
  const { data, setData } = useCv();
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // redirect to your sign-in page if not authenticated
      router.push("/SignIn");
    },
  });
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
      { title: "My CV", theme: "curatorlight" }
    );
  }, [selectedTemplate, data]);

  const handleLoadTestData = useCallback(() => {
    setData(previewSeedData as ResumeSchema);
  }, [setData]);
  // show a simple loading state while session is being resolved
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="indicator">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }
  

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
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-base font-medium text-on-surface hover:bg-surface-container-high">
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
              {selectedTemplate === "HeaderBanner" && (
                <CvHeaderBanner data={data} />
              )}
              {selectedTemplate === "SidebarDark" && (
                <CvSidebarDark data={data} />
              )}
              {selectedTemplate === "TwoColumn" && <CvTwoColumn data={data} />}
            </ZoomWrapper>
          </div>
        </section>
      </div>
    </div>
  );
}
