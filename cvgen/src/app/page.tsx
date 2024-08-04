import Image from "next/image";
import Cvtest from "./components/cvtest";
import Form from "./components/create-cv-form";
export default function Home() {
  return (
    <div className="flex  xl:grid xl:grid-cols-3 xl:gap-0 min-h-screen bg-slate-900">
      <div className="w-full xl:col-start-2 xl:col-span-1 xl:row-start-1 xl:row-span-1 p-4">
        <Form></Form>
      </div>
    </div>
  );
}
