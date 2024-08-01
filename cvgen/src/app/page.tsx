import Image from "next/image";
import Cvtest from "./components/cvtest";
import Form from "./components/create-cv-form";
export default function Home() {
  return (
    <div className="flex h-screen bg-slate-900">
      <div className="w-full p-4 border-r border-gray-200">
        <Form></Form>
      </div>
    </div>
  );
}
