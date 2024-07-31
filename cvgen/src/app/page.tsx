import Image from "next/image";
import Cvtest from "./components/Cvtest";
import Form from "./components/Create-CV-Form";
export default function Home() {
  return (
    <div className="flex h-screen bg-slate-900">
      <div className="w-full p-4 border-r border-gray-200">
        <Form></Form>
      </div>
    </div>
  );
}
