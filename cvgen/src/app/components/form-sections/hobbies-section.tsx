"use client";
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import HobbyInput from '../hobby-input';

interface Item {
  id: string;
  hobby: string;
}

export default function HobbiesSection() {
  const [items, setItems] = useState<Item[]>([]);

  const addToArray = () => {
    const newItem: Item = { id: uuidv4(), hobby: '' };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const updateItem = (id: string, hobby: string) => {
    setItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, hobby } : item
      )
    );
  };

  return (
    <div className="collapse collapse-arrow bg-base-200 rounded-lg">
      <input type="checkbox" name="hobbies-accordion" />
      <div className="text-black collapse-title text-xl font-medium">
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
