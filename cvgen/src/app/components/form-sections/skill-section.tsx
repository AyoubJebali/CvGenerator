import React, { useState } from 'react';
import SkillInput from '../form-inputs/skill-input';
import { v4 as uuidv4 } from 'uuid';
import { useCv } from "../CvContext";
interface Item {
  id: string;
  skill: string;
  category: string;
}

export default function SkillSection() {
  const [items, setItems] = useState<Item[]>([]);
  const { data, setData } = useCv();
  const addToArray = () => {
    const newItem: Item = { id: uuidv4(), skill: '' , category: '' };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
    // Update the context data as well
    const updatedSkills = items.filter(item => item.id !== id);
    setData({ ...data, skills: updatedSkills });
  };

  const updateItem = (id: string, newSkill: string, newCategory: string) => {
    setItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, skill: newSkill, catergory: newCategory } : item
      )
    );

    // Update the context data as well
    const updatedSkills = items.map(item =>
  item.id === id ? { ...item, skill: newSkill, catergory: newCategory } : item 
  // make sure it's an object
);
    setData({ ...data, skills: updatedSkills });
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
                  category={item.catergory}
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

