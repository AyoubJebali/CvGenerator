"use client";
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import HobbyInput from '../form-inputs/hobby-input';
import { useCv } from "../CvContext";
interface Item {
  id: string;
  hobby: string;
}

export default function HobbiesSection() {
  const { data, setData } = useCv();
  const [items, setItems] = useState<Item[]>([]);

  // Initialize items from context data on mount
  useEffect(() => {
    const initialItems = (data.hobbies || []).map(hobby => ({
      id: uuidv4(),
      hobby: hobby || "",
    }));
    setItems(initialItems);
  }, []);

  const addToArray = () => {
    const newItem: Item = { id: uuidv4(), hobby: '' };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const deleteItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    setData({ ...data, hobbies: updatedItems.map(item => item.hobby) });
  };

  const updateItem = (id: string, hobby: string) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, hobby } : item
    );
    setItems(updatedItems);
    setData({ ...data, hobbies: updatedItems.map(item => item.hobby) });
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
          items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="flex-grow">
                <HobbyInput
                  id={item.id}
                  hobby={item.hobby}
                  updateItem={updateItem}
                />
              </div>
              <button
                className="rounded-lg border border-outline-variant bg-surface-container-low px-3 py-1.5 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-high"
                type="button"
                onClick={() => deleteItem(item.id)}
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
