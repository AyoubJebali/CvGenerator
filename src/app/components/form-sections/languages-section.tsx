"use client";
import React from "react";
import LanguageInput from "../form-inputs/language-input";
import { useCv } from "../CvContext";
import type { Language } from "@/types";

export default function LanguagesSection() {
  const { data, setData } = useCv();
  const items = (Array.isArray(data.languages) ? data.languages : []).map((item) => ({
    language: item.language ?? "",
    proficiency: item.proficiency ?? "",
  }));

  const addToArray = () => {
    setData((prev) => ({
      ...prev,
      languages: [...(Array.isArray(prev.languages) ? prev.languages : []), { language: "", proficiency: "" }],
    }));
  };

  const deleteItem = (id: string) => {
    const index = Number(id);
    if (Number.isNaN(index)) return;

    setData((prev) => ({
      ...prev,
      languages: (Array.isArray(prev.languages) ? prev.languages : []).filter((_, idx) => idx !== index),
    }));
  };

  const updateItem = (id: string, language: string, proficiency: string) => {
    const index = Number(id);
    if (Number.isNaN(index)) return;

    setData((prev) => ({
      ...prev,
      languages: (Array.isArray(prev.languages) ? prev.languages : []).map((item: Language, idx) =>
        idx === index ? { ...item, language, proficiency } : item
      ),
    }));
  };

  return (
    <section className="editor-section p-5 md:p-7">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[34px] font-extrabold text-on-surface">Languages</h3>
        <button
          className="editor-action-btn"
          type="button"
          onClick={addToArray}
        >
          + Add Language
        </button>
      </div>
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container-high px-6 py-10 text-center">
            <p className="text-2xl font-medium text-on-surface-variant">Add spoken languages</p>
          </div>
        ) : (
          items.map((item, index) => (
            <div key={`language-${index}`} className="flex items-center gap-4">
              <div className="flex-grow">
                <LanguageInput
                  id={`${index}`}
                  language={item.language}
                  proficiency={item.proficiency}
                  updateItem={updateItem}
                />
              </div>
              <button
                className="rounded-lg border border-outline-variant bg-surface-container-low px-3 py-1.5 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-high"
                type="button"
                onClick={() => deleteItem(`${index}`)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
