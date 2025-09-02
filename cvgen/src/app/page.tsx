"use client";
import Form from "./components/create-cv-form";
import CvOneColumn from "./components/templates/CvOneColumn";
import ZoomWrapper from "./components/zoomWrapper";
import CVTemplateSelector from "./components/cvTemplateSelector";
import CvHeaderBanner from "./components/templates/CvHeaderBanner";
import CvSidebarDark from "./components/templates/CvSideBarDark";
import CvTwoColumn from "./components/templates/CvTwoColumn";
import { useState } from "react";

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("OneColumn");

  return (
    <div className="flex flex-col xl:grid xl:grid-cols-5 xl:gap-4 min-h-screen bg-slate-900">
      {/* Form Section */}
      <div className="w-full xl:col-start-1 xl:col-span-2 xl:row-start-1 xl:row-span-1 p-2 sm:p-4">
        <Form />
      </div>
      {/* Preview Section */}
      <div className="w-full xl:col-start-3 xl:col-span-2 xl:row-start-1 xl:row-span-1 p-2 sm:p-4">
        <ZoomWrapper>
          {selectedTemplate === "OneColumn" && <CvOneColumn />}
          {selectedTemplate === "HeaderBanner" && <CvHeaderBanner />}
          {selectedTemplate === "SidebarDark" && <CvSidebarDark />}
          {selectedTemplate === "TwoColumn" && <CvTwoColumn />}
        </ZoomWrapper>
      </div>
      {/* Template Selector Section */}
      <div className="w-full xl:col-start-5 xl:col-span-1 xl:row-start-1 xl:row-span-1 p-2 sm:p-4 xl:sticky xl:top-0 xl:h-screen overflow-y-auto">
        <CVTemplateSelector onSelect={setSelectedTemplate} />
      </div>
    </div>
  );
}
