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
    <div className="collapse collapse-arrow bg-base-200 rounded-lg">
      <input type="checkbox" name="hobbies-accordion" />
      <div className="text-black collapse-title text-xl font-medium flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-puzzle-icon lucide-puzzle"><path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"/></svg>
        Hobbies
      </div>
      <div className="collapse-content">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="flex-grow">
                <HobbyInput
                  id={item.id}
                  hobby={item.hobby}
                  updateItem={updateItem}
                />
              </div>
              <button
                className="btn btn-outline btn-error btn-sm"
                type="button"
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="text-right mt-4">
          <button
            className="btn btn-primary"
            type="button"
            onClick={addToArray}
          >
            Add Hobby
          </button>
        </div>
      </div>
    </div>
  );
}
