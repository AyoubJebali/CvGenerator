import React, { useState } from 'react'
import SkillInput from './skill-input';
import { number } from 'zod';

export default function SkillSection() {
  const [numberOfSkills , setNumberOfSkills] = useState(0);
  const [indexArray , setIndexArray] = useState<number[]>([]);
  const addSkill = ()=>{
    setNumberOfSkills(numberOfSkills+1);
    setIndexArray([
      ...indexArray , 
        numberOfSkills]
    );
  }
  const handleDelete = (id:number) => {
    setIndexArray(
      indexArray.filter(a => a!=id)
    );
  }
  return (
    <div className="collapse mt-5 collapse-arrow bg-white text-white">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium text-black">
          Skills
        </div>
        <div className="collapse-content  bg-gray-100 rounded-lg shadow-lg text-black">
          <div className="form-control mb-4">
            <input
              type="text"
              id="skill"
              name="skill"
              className="input input-bordered w-full bg-white"
              placeholder="Enter your skill"
            />
          </div>
          {indexArray.map((item ,index) => (
        <div key={index}>
          <SkillInput  />
          <button className='btn float-right btn-neutral' onClick={() => handleDelete(index)}>delete</button>
        </div>
      ))}
          
          <button className='btn float-right btn-neutral' onClick={addSkill}>
            Add skill
          </button>
        </div>
      </div>
  )
}

