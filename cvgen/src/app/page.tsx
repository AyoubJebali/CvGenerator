import Image from "next/image";
import Cvtest from "./components/Cvtest";
import Form from "./components/Form";
export default function Home() {
  return (
    <div className="flex h-screen bg-slate-900">
      <div className="w-1/2 p-4 border-r border-gray-200">
        <Form></Form>
      </div>
      <div className="w-1/2 p-4">
        <div className="h-screen flex flex-col items-center justify-center p-4">
          <h1 className="mb-4 text-center text-2xl font-bold">My CV</h1>
          <div className="flex-1 w-full max-w-4xl overflow-auto border border-gray-300">
            {/* <iframe
          src="/CV/page.html"
          className="w-full h-full border-none "
          title="CV"
        /> */}
            <Cvtest></Cvtest>
          </div>
        </div>
      </div>
    </div>
  );
}
