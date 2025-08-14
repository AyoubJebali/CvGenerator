"use client";
import React from 'react';

interface SkillInputProps {
  id: string;
  skill: string;
  updateItem: (id: string, skill: string) => void;
}

const SkillInput: React.FC<SkillInputProps> = ({ id, skill, updateItem }) => {
  const handleSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateItem(id, event.target.value);
  };

  return (
    <div className="form-control">
      <input
        type="text"
        name="skill"
        value={skill}
        className="input input-bordered w-full text-black"
        placeholder="Enter a skill"
        onChange={handleSkillChange}
      />
    </div>
  );
};

export default SkillInput;