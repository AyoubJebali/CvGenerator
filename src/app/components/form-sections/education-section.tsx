"use client";
import React, { useState } from 'react';
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
  const [items, setItems] = useState<Item[]>([]);
  const { data, setData } = useCv();
  const addToArray = () => {
    const newItem: Item = { id: uuidv4(), start: '', end: '', degree: '', institution: '', honors: '' };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
    // Update the context data as well
    setData({ ...data, studies_training: items.filter(item => item.id !== id) });
  };

  const updateItem = (id: string, start: string, end: string, degree: string, institution: string, honors: string) => {
    setItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, start, end, degree, institution, honors } : item
      )
    );

    // Update the context data as well
    const updatedStudies = items.map(item =>
      item.id === id ? { start, end, degree, institution, honors } : item
    );
    setData({ ...data, studies_training: updatedStudies });
  };

  return (
    <div className="collapse collapse-arrow bg-base-200 rounded-lg">
      <input type="checkbox" name="studies-accordion" />
      <div className="text-black collapse-title text-xl font-medium flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap-icon lucide-graduation-cap">
          <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/>
          <path d="M22 10v6"/>
          <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>
        </svg>
        Education and Training
      </div>
      <div className="collapse-content">
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="p-4 border border-base-300 rounded-lg">
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
                  className="btn btn-outline btn-error btn-sm"
                  type="button"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-right mt-4">
          <button
            className="btn btn-primary"
            type="button"
            onClick={addToArray}
          >
            Add Education/Training
          </button>
        </div>
      </div>
    </div>
  );
}
