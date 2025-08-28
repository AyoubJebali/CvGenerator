"use client";

import { useState, useRef } from "react";

type ZoomWrapperProps = {
  children: React.ReactNode;
  baseWidth?: number; // width of CV in px, e.g. 800
};

export default function ZoomWrapper({ children, baseWidth = 800 }: ZoomWrapperProps) {
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col items-center gap-4 w-full h-full">
      
      

      {/* Zoomable Preview Area */}
      <div
        ref={containerRef}
        className="overflow-auto border rounded bg-base-200 shadow-inner p-4 w-full h-[70vh] md:h-[80vh] xl:h-[85vh]"
      >
        <div
          className="mx-auto origin-top"
          style={{
            transform: `scale(${zoom})`,
            width: baseWidth,
          }}
        >
          {children}
        </div>
      </div>
      {/* Zoom Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
          className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-200"
        >
          -
        </button>
        <span className="min-w-[50px] text-center">{Math.round(zoom * 100)}%</span>
        <button
          onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
          className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-200"
        >
          +
        </button>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-32 accent-blue-500"
        />
      </div>
    </div>
  );
}
