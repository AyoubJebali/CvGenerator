import React, { useState } from 'react';
import SkillInput from './skill-input';
import { v4 as uuidv4 } from 'uuid';

interface Item {
  id: string;
  skill: string;
}

export default function SkillSection() {
  const [items, setItems] = useState<Item[]>([]);

  const addToArray = () => {
    const newItem: Item = { id: uuidv4(), skill: '' };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const updateItem = (id: string, newString: string) => {
    setItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, skill: newString } : item
      )
    );
  };

  return (
    <div className="collapse collapse-arrow bg-base-200 rounded-lg">
      <input type="checkbox" name="skills-accordion" />
      <div className="collapse-title text-xl text-black font-medium">
        Skills
      </div>
      <div className="collapse-content">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="flex-grow">
                <SkillInput
                  id={item.id}
                  skill={item.skill}
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
            Add Skill
          </button>
        </div>
      </div>
    </div>
  );
}

