"use client";
import React from 'react';
import HobbyInput from '../form-inputs/hobby-input';
import { useCv } from "../CvContext";

export default function HobbiesSection() {
  const { data, setData } = useCv();
  const items = (data.hobbies || []).map(hobby => hobby || "");

  const addToArray = () => {
    setData((prev) => ({ ...prev, hobbies: [...(prev.hobbies || []), ''] }));
  };

  const deleteItem = (id: string) => {
    const index = Number(id);
    if (Number.isNaN(index)) return;
    setData((prev) => ({
      ...prev,
      hobbies: (prev.hobbies || []).filter((_, idx) => idx !== index),
    }));
  };

  const updateItem = (id: string, hobby: string) => {
    const index = Number(id);
    if (Number.isNaN(index)) return;
    setData((prev) => ({
      ...prev,
      hobbies: (prev.hobbies || []).map((item, idx) => (idx === index ? hobby : item)),
    }));
  };

  return (
    <section className="editor-section p-5 md:p-7">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[34px] font-extrabold text-on-surface">Hobbies</h3>
        <button
          className="editor-action-btn"
          type="button"
          onClick={addToArray}
        >
          + Add Hobby
        </button>
      </div>
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container-high px-6 py-10 text-center">
            <p className="text-2xl font-medium text-on-surface-variant">Share your interests</p>
          </div>
        ) : (
          items.map((hobby, index) => (
            <div key={`hobby-${index}`} className="flex items-center gap-4">
              <div className="flex-grow">
                <HobbyInput
                  id={`${index}`}
                  hobby={hobby}
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
