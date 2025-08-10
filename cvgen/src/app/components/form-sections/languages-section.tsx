"use client";
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LanguageInput from '../language-input';

interface Item {
  id: string;
  language: string;
  proficiency: string;
}

export default function LanguagesSection() {
  const [items, setItems] = useState<Item[]>([]);

  const addToArray = () => {
    const newItem: Item = { id: uuidv4(), language: '', proficiency: '' };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const updateItem = (id: string, language: string, proficiency: string) => {
    setItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, language, proficiency } : item
      )
    );
  };

  return (
    <div className="collapse mt-5 collapse-arrow bg-white text-white">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium text-black">
        Languages
      </div>
      <div className="collapse-content bg-gray-100 rounded-lg shadow-lg text-black">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 mb-4">
            <div className="flex-grow">
              <LanguageInput
                id={item.id}
                language={item.language}
                proficiency={item.proficiency}
                updateItem={updateItem}
              />
            </div>
            <button
              className='btn btn-neutral'
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
          Add Language
        </button>
      </div>
    </div>
  );
}
