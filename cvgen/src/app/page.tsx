"use client";
import Form from "./components/create-cv-form";
import CvOneColumn from "./components/templates/CvOneColumn";
import ZoomWrapper from "./components/zoomWrapper";
import CVTemplateSelector from "./components/cvTemplateSelector";
import CvHeaderBanner from "./components/templates/CvHeaderBanner";
import CvSidebarDark from "./components/templates/CvSideBarDark";
import CvTwoColumn from "./components/templates/CvTwoColumn";
import { useState, useCallback } from "react";
import { printComponent } from "./components/printCv";
import { useCv } from "./components/CvContext";
export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("OneColumn");
  const { data } = useCv();
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
      { title: "My CV", theme: "winter" }
    );
  }, [selectedTemplate, data]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col xl:grid xl:grid-cols-5 xl:gap-6 min-h-screen p-4 xl:p-6">
        {/* Form Section */}
        <div className="w-full xl:col-start-1 xl:col-span-2 xl:row-start-1 xl:row-span-1">
          <div className="h-full bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            <Form />
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-full xl:col-start-3 xl:col-span-2 xl:row-start-1 xl:row-span-1 mt-4 xl:mt-0 xl:sticky xl:top-6  xl:h-[calc(100vh-3rem)] flex flex-col">
          <div className="h-full bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-4">
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
        </div>

        {/* Template Selector Section */}
        <div className="w-full xl:col-start-5 xl:col-span-1 xl:row-start-1 xl:row-span-1 mt-4 xl:mt-0 xl:sticky xl:top-6 xl:h-[calc(100vh-3rem)]">
          <div className="h-full bg-gradient-to-b from-indigo-500/20 to-purple-600/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-4 flex flex-col">
            <div className="flex-1 overflow-hidden">
              <CVTemplateSelector onSelect={setSelectedTemplate} />
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={handlePrint}
                className="btn btn-primary w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-none shadow-lg text-white font-semibold"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                Print/Download CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
