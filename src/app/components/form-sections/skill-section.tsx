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
        item.id === id ? { ...item, skill: newSkill, category: newCategory } : item
      )
    );

    // Update the context data as well
    const updatedSkills = items.map(item =>
  item.id === id ? { ...item, skill: newSkill, category: newCategory } : item 
  // make sure it's an object
);
    setData({ ...data, skills: updatedSkills });
  };

  return (
    <div className="collapse collapse-arrow bg-base-200 rounded-lg">
      <input type="checkbox" name="skills-accordion" />
      <div className="collapse-title text-xl text-black font-medium flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star-icon lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
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
                  category={item.category}
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

