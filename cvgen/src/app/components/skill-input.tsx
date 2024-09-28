"use client";
import { useState } from 'react';
import React from 'react'

interface NumberToLevel {
    [key: number]: string;
}
interface Params {
    skill:string;
    updateItem : (id:string , str:string) => void;
    id: string ;
}
const SkillInput = ({skill , updateItem , id}:Params) => {
    
 // Initialize state to store the range value
  const [rangeValue, setRangeValue] = useState(50);
  const [level,setLevel]= useState("Good");
  let levels:NumberToLevel = {
    0:"Beginner",
    25:"Moderate",
    50:"Good",
    75:"Very Good",
    100:"Excellent"
  }
  const handleSkillChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    let value:string = event.target.value;
    updateItem(id,value);
    
  }

  // Handle the change event
  const handleRangeChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        let value:number = Number(event.target.value)- Number(event.target.value)%25 ;
        setRangeValue(value);
        setLevel(levels[value]);
  };
    return (
        <div className='form-control mb-4' >
            <input
                type="text"
                id="skill"
                name="skill"
                value={skill}
                className="input input-bordered w-full bg-white"
                placeholder="Enter your skill"
                onChange={handleSkillChange}
            />
            <label>Level</label>
            <div className=" inline-flex w-full justify-center px-2 text-base">
            <input type="range" name="proficiency" min={0} max="100" value={rangeValue} onChange={handleRangeChange}  className="range-xs range w-full mr-6 [--range-shdw:yellow]" step="25" />
                <div className='mx-5 w-fit whitespace-nowrap'>
                <span>{level}</span>
                </div>
            </div>
        </div>
    )
}

export default SkillInput;