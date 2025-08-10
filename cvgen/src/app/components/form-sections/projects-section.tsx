"use client";
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ProjectInput from '../project-input';

interface Item {
  id: string;
  period: string;
  details: string;
}

export default function ProjectsSection() {
  const [items, setItems] = useState<Item[]>([]);

  const addToArray = () => {
    const newItem: Item = { id: uuidv4(), period: '', details: '' };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const updateItem = (id: string, period: string, details: string) => {
    setItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, period, details } : item
      )
    );
  };

  return (
    <div className="collapse mt-5 collapse-arrow bg-white text-white">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium text-black">
        Projects and Experiences
      </div>
      <div className="collapse-content bg-gray-100 rounded-lg shadow-lg text-black">
        {items.map((item) => (
          <div key={item.id} className="mb-4 p-4 border border-gray-300 rounded-lg">
            <ProjectInput
              id={item.id}
              period={item.period}
              details={item.details}
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
          Add Project/Experience
        </button>
      </div>
    </div>
  );
}
