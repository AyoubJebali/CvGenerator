import Image from "next/image";

export default function Home() {
  return (
      <div className="flex h-screen bg-slate-900">
      <div className="w-1/2 p-4 border-r border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Forum</h2>
        {/* Forum content goes here */}
        <div className="collapse bg-white text-black">
        <input type="checkbox" /> 
        <div className="collapse-title text-xl font-medium">
          Focus me to see content
        </div>
        <div className="collapse-content">

        <form>
          <label htmlFor="inputData" className="block mb-2">Input Data:</label>
          <input
            type="text"
            id="inputData"
            name="inputData"
            className="block input input-bordered w-full max-w-xs bg-white mb-4"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
        </div>
        </div>
      </div>
      <div className="w-1/2 p-4">  
      <div className="h-screen flex flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-center text-2xl font-bold">My CV</h1>
      <div className="flex-1 w-full max-w-4xl overflow-hidden border border-gray-300">
        <iframe
          src="/CV/page.html"
          className="w-full h-full border-none "
          title="CV"
        />
      </div>
    </div>
      </div>
    </div>
  );
}
