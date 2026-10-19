"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type ZoomWrapperProps = {
  children: React.ReactNode;
  baseWidth?: number;
};

export default function ZoomWrapper({
  children,
  baseWidth = 794,
}: ZoomWrapperProps) {
  const [zoom, setZoom] = useState(1);
  const [autoFit, setAutoFit] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 2;

  const fitToWidth = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const horizontalPadding = 48;
    const availableWidth = Math.max(container.clientWidth - horizontalPadding, 280);
    const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, availableWidth / baseWidth));
    setZoom(nextZoom);
  }, [baseWidth]);

  const applyZoom = useCallback((nextValue: number) => {
    const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextValue));
    setAutoFit(false);
    setZoom(clamped);
  }, []);

  useEffect(() => {
    if (!autoFit) return;
    fitToWidth();
  }, [autoFit, fitToWidth]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      if (autoFit) fitToWidth();
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, [autoFit, fitToWidth]);

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden">
      <div className="mb-3 flex shrink-0 justify-center">
        <div className="flex items-center gap-2 rounded-2xl border border-outline-variant bg-surface-container/95 px-4 py-2 shadow-sm backdrop-blur-md">
          <button
            onClick={() => applyZoom(zoom - 0.1)}
            className="rounded-lg border border-outline-variant px-2 py-1 text-on-surface transition-colors hover:bg-surface-container-highest"
            aria-label="Zoom out"
          >
            -
          </button>
          <span className="min-w-[48px] text-center text-sm font-semibold text-on-surface">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => applyZoom(zoom + 0.1)}
            className="rounded-lg border border-outline-variant px-2 py-1 text-on-surface transition-colors hover:bg-surface-container-highest"
            aria-label="Zoom in"
          >
            +
          </button>
          <span className="mx-1 h-5 w-px bg-outline-variant/60" aria-hidden />
          <button
            onClick={() => {
              setAutoFit(false);
              setZoom(1);
            }}
            className="rounded-md px-2 py-1 text-xs font-semibold text-on-surface transition-colors hover:bg-surface-container-high"
          >
            100%
          </button>
          <button
            onClick={() => {
              setAutoFit(true);
              fitToWidth();
            }}
            className={`rounded-md px-2 py-1 text-xs font-semibold transition-colors ${
              autoFit
                ? "bg-gradient-to-br from-primary to-primary-container text-on-primary"
                : "text-on-surface hover:bg-surface-container-high"
            }`}
          >
            Fit
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex min-h-0 w-full flex-1 items-start justify-center overflow-auto px-4 pb-4"
      >
        <div
          className="origin-top bg-surface-container-lowest a4-shadow"
          style={{
            transform: `scale(${zoom})`,
            width: baseWidth,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
