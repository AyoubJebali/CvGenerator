"use client";
import Form from "./components/create-cv-form";
import CvTemplateOneColumn from "./components/cv-templates/one-column-cv-template";
import ZoomWrapper from "./components/zoomWrapper";
import CVTemplateSelector from "./components/CVTemplateSelector";
import { useState } from "react";
export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("modern");
  return (
    <div className="flex  xl:grid xl:grid-cols-3 xl:gap-0 min-h-screen bg-slate-900">
      <div className="w-full xl:col-start-1 xl:col-span-1 xl:row-start-1 xl:row-span-1 p-4">
        <Form></Form>
      </div>
      <div className="w-full xl:col-start-2 xl:col-span-1 xl:row-start-1 xl:row-span-1 p-4">
        <ZoomWrapper>
        <CvTemplateOneColumn></CvTemplateOneColumn>
          {/* Render different templates based on selection */}
          {/* {selectedTemplate === "modern" && <CvTemplateOneColumn />}
            {selectedTemplate === "classic" && <CvTemplateOneColumn />}
            {selectedTemplate === "minimal" && <CvTemplateOneColumn />} */}
      </ZoomWrapper>
      </div>
      <div className="w-full xl:col-start-3 xl:col-span-1 xl:row-start-1 xl:row-span-1 p-4">
        <CVTemplateSelector onSelect={setSelectedTemplate} />
      </div>
    </div>
  );
}
