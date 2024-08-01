"use client";
import { useState } from 'react';
import React from 'react'

const SkillInput = () => {
     // Initialize state to store the range value
  const [rangeValue, setRangeValue] = useState(50);

  // Handle the change event
  const handleRangeChange = (event:any) => {
    setRangeValue(event.target.value);
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
            <input type="range" name="proficiency" min={0} max="100" value={rangeValue} onChange={handleRangeChange}  className="range" step="25   " />
            <div className="flex w-full justify-between px-2 text-xs">
                <span>Beginner</span>
                <span>Moderate</span>
                <span>Good</span>
                <span>Very Good</span>
                <span>Excellent</span>
            </div>
        </div>
    )
}

export default SkillInput;