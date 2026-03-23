"use client";
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import StudyInput from '../form-inputs/study-input';
import { useCv } from "../CvContext";

interface Item {
  id: string;
  start: string;
  end: string;
  degree: string;
  institution: string;
  honors: string;
}

export default function StudiesSection() {
  const { data, setData } = useCv();
  // Initialize items from context data
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    // Map studies_training from context to items with id
    const initialItems = (data.studies_training || []).map((item, idx) => ({
      id: uuidv4(),
      start: item.start || "",
      end: item.end || "",
      degree: item.degree || "",
      institution: item.institution || "",
      honors: item.honors || "",
    }));
    setItems(initialItems);
  }, [data.studies_training]);

  const addToArray = () => {
    const newItem: Item = { id: uuidv4(), start: '', end: '', degree: '', institution: '', honors: '' };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const deleteItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    setData({ ...data, studies_training: updatedItems.map(({ id, ...rest }) => rest) });
  };

  const updateItem = (id: string, start: string, end: string, degree: string, institution: string, honors: string) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, start, end, degree, institution, honors } : item
    );
    setItems(updatedItems);
    setData({ ...data, studies_training: updatedItems.map(({ id, ...rest }) => rest) });
  };

  return (
    <section className="editor-section p-5 md:p-7">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[34px] font-extrabold text-on-surface">Education</h3>
        <button
          className="editor-action-btn"
          type="button"
          onClick={addToArray}
        >
          + Add Education
        </button>
      </div>
      {items.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container-high px-6 py-12 text-center">
          <p className="text-3xl font-semibold text-on-surface">Academic background is empty</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
              <StudyInput
                id={item.id}
                start={item.start}
                end={item.end}
                degree={item.degree}
                institution={item.institution}
                honors={item.honors}
                updateItem={updateItem}
              />
              <div className="text-right mt-2">
                <button
                  className="rounded-lg border border-outline-variant bg-surface-container-low px-3 py-1.5 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-high"
                  type="button"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
