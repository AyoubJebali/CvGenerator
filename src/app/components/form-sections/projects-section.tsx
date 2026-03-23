"use client";
import React, { useCallback } from "react";
import ProjectInput from "../form-inputs/project-input";
import { useCv } from "../CvContext";

export default function ProjectsSection() {
  const { data, setData } = useCv();
  const items = (Array.isArray(data.projects) ? data.projects : []).map((item) => ({
    title: item.title ?? "",
    start: item.start ?? "",
    end: item.end ?? "",
    details: Array.isArray(item.details) ? item.details.join("\n") : "",
  }));

  const addToArray = useCallback(() => {
    setData((prev) => ({
      ...prev,
      projects: [
        ...(Array.isArray(prev.projects) ? prev.projects : []),
        { title: "", start: "", end: "", details: [] },
      ],
    }));
  }, [setData]);

  const deleteItem = useCallback((id: string) => {
    const index = Number(id);
    if (Number.isNaN(index)) return;

    setData((prev) => ({
      ...prev,
      projects: (Array.isArray(prev.projects) ? prev.projects : []).filter((_, idx) => idx !== index),
    }));
  }, [setData]);

  const updateItem = useCallback((id: string, title: string, start: string, end: string, details: string) => {
    const index = Number(id);
    if (Number.isNaN(index)) return;

    setData((prev) => ({
      ...prev,
      projects: (Array.isArray(prev.projects) ? prev.projects : []).map((item, idx) =>
        idx === index
          ? {
              ...item,
              title,
              start,
              end,
              details: details.split("\n").map((line) => line.trim()).filter((line) => line !== ""),
            }
          : item
      ),
    }));
  }, [setData]);

  return (
    <section className="editor-section p-5 md:p-7">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[34px] font-extrabold text-on-surface">Projects</h3>
        <button
          className="editor-action-btn"
          type="button"
          onClick={addToArray}
        >
          + Add Project
        </button>
      </div>
      <div className="space-y-6">
        {items.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container-high px-6 py-10 text-center">
            <p className="text-2xl font-medium text-on-surface-variant">Show your best projects</p>
          </div>
        ) : (
          items.map((item, index) => (
            <div key={`project-${index}`} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
              <ProjectInput
                id={`${index}`}
                title={item.title}
                start={item.start}
                end={item.end}
                details={item.details}
                updateItem={updateItem}
              />
              <div className="text-right mt-2">
                <button
                  className="rounded-lg border border-outline-variant bg-surface-container-low px-3 py-1.5 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-high"
                  type="button"
                  onClick={() => deleteItem(`${index}`)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
