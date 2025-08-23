import Image from "next/image";
import Cvtest from "./components/cv-templates/cvtest";
import Form from "./components/create-cv-form";
import CvTemplateOneColumn from "./components/cv-templates/one-column-cv-template";
import ZoomWrapper from "./components/zoomWrapper";
export default function Home() {
  return (
    <div className="flex  xl:grid xl:grid-cols-3 xl:gap-0 min-h-screen bg-slate-900">
      <div className="w-full xl:col-start-1 xl:col-span-1 xl:row-start-1 xl:row-span-1 p-4">
        <Form></Form>
      </div>
      <div className="w-full xl:col-start-2 xl:col-span-1 xl:row-start-1 xl:row-span-1 p-4">
        <ZoomWrapper>
        <CvTemplateOneColumn></CvTemplateOneColumn>
      </ZoomWrapper>
      </div>
    </div>
  );
}
