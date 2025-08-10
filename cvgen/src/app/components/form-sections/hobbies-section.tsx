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
    <div className="collapse mt-5 collapse-arrow bg-white text-white">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium text-black">
        Hobbies
      </div>
      <div className="collapse-content bg-gray-100 rounded-lg shadow-lg text-black">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 mb-4">
            <div className="flex-grow">
              <HobbyInput
                id={item.id}
                hobby={item.hobby}
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
          Add Hobby
        </button>
      </div>
    </div>
  );
}
