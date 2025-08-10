"use client";
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import StudyInput from '../study-input';

interface Item {
  id: string;
  period: string;
  degree: string;
  institution: string;
  honors: string;
}

export default function StudiesSection() {
  const [items, setItems] = useState<Item[]>([]);

  const addToArray = () => {
    const newItem: Item = { id: uuidv4(), period: '', degree: '', institution: '', honors: '' };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const updateItem = (id: string, period: string, degree: string, institution: string, honors: string) => {
    setItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, period, degree, institution, honors } : item
      )
    );
  };

  return (
    <div className="collapse mt-5 collapse-arrow bg-white text-white">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium text-black">
        Studies and Training
      </div>
      <div className="collapse-content bg-gray-100 rounded-lg shadow-lg text-black">
        {items.map((item) => (
          <div key={item.id} className="mb-4 p-4 border border-gray-300 rounded-lg">
            <StudyInput
              id={item.id}
              period={item.period}
              degree={item.degree}
              institution={item.institution}
              honors={item.honors}
              updateItem={updateItem}
            />
            <button
              className='btn btn-neutral float-right'
              type='button'
              onClick={() => deleteItem(item.id)}
            >
              Delete
            </button>
          </div>
        ))}
        <button
          className='btn btn-neutral float-right'
          type='button'
          onClick={addToArray}
        >
          Add Study/Training
        </button>
      </div>
    </div>
  );
}
