"use client";
import { useState } from 'react';
import React from 'react'
interface NumberToLevel {
    [key: number]: string;
}

const SkillInput = () => {
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
  // Handle the change event
  const handleRangeChange = (event:any) => {
        let value:number = (event.target.value)-event.target.value%25 ;
        setRangeValue(value);
        setLevel(levels[value]);
  };
    return (
        <div>
            <input
                type="text"
                id="skill"
                name="skill"
                className="input input-bordered w-full bg-white"
                placeholder="Enter your skill"
            />
            <label>Level</label>
            <input type="range" name="proficiency" min={0} max="100" value={rangeValue} onChange={handleRangeChange}  className="range" step="25" />
            <div className="flex w-full justify-between px-2 text-xs">
                <span>{level}</span>
            </div>
        </div>
    )
}

export default SkillInput;