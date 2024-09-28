import React, { useState } from 'react'
import SkillInput from './skill-input';
import { number } from 'zod';
import { v4 as uuidv4 } from 'uuid';
interface ChildFormProps {
  indexArray:number[];
  addSkill:()=>void;
  handleDelete:(id:number)=>void;
}
interface Item {
  id: string;
  skill: string;
}
export default function SkillSection() {
  const [items, setItems] = useState<Item[]>([]);
  const [skillValue,setSkillValue] = useState<string>("");
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
    <div className="collapse mt-5 collapse-arrow bg-white text-white">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium text-black">
        Skills
      </div>
      <div className="collapse-content  bg-gray-100 rounded-lg shadow-lg text-black">

        {items.map((item) => (
          <div key={item.id}>
            <SkillInput skill={item.skill} updateItem={updateItem} id={item.id} />
            <button className='btn float-right btn-neutral' type='button' onClick={() => deleteItem(item.id)}>delete</button>
          </div>
        ))}

        <button className='btn float-right btn-neutral' type='button' onClick={addToArray}>
          Add skill
        </button>
      </div>
    </div>
  )
}

