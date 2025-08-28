"use client";
import Form from "./components/create-cv-form";
import CvOneColumn from "./components/templates/CvOneColumn";
import ZoomWrapper from "./components/zoomWrapper";
import CVTemplateSelector from "./components/cvTemplateSelector";
import CvHeaderBanner from "./components/templates/CvHeaderBanner";
import CvSidebarDark from "./components/templates/CvSideBarDark";
import { useState } from "react";
export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("modern");
  return (
    <div className="flex xl:grid xl:grid-cols-5 xl:gap-4 min-h-screen bg-slate-900">
      <div className="w-full xl:col-start-1 xl:col-span-2 xl:row-start-1 xl:row-span-1 p-4">
        <Form></Form>
      </div>
      <div className="w-full xl:col-start-3 xl:col-span-2 xl:row-start-1 xl:row-span-1 p-4">
        <ZoomWrapper>
        {/* <CvSidebarDark></CvSidebarDark> */}
          {/* Render different templates based on selection */}
          {selectedTemplate === "modern" && <CvOneColumn />}
            {selectedTemplate === "classic" && <CvHeaderBanner />}
            {selectedTemplate === "minimal" && <CvSidebarDark />}
      </ZoomWrapper>
      </div>
      <div className="w-full xl:col-start-5 xl:col-span-1 xl:row-start-1 xl:row-span-1 p-4 xl:sticky xl:top-0 xl:h-screen overflow-y-auto">
        <CVTemplateSelector onSelect={setSelectedTemplate} />
      </div>
    </div>
  );
}
